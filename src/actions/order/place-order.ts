'use server';

import { auth } from "@/auth.config";
import type { Address } from "@/interfaces/address.interface";
import type { Size } from "@/interfaces/product.interface";
import prisma from "@/lib/prisma";

interface ProductToOrder {
  productId: string
  quantity: number
  size: Size
}

export const placeOrder = async (productIds: ProductToOrder[], address: Address) => {

  const session = await auth();
  const userId = session?.user.id;

  if (!userId) {
    return {
      ok: false,
      message: 'No user session found'
    }
  }

  const products = await prisma.product.findMany({
    where: {
      id: {
        in: productIds.map((prod) => prod.productId)
      }
    }
  });

  const itemsInOrder = productIds.reduce((count, prod) => count + prod.quantity, 0);

  const { subTotal, tax, total } = productIds.reduce((totals, item) => {

    const productQuantity = item.quantity;
    const product = products.find(prod => prod.id === item.productId);

    if (!product) {
      throw new Error(`${item.productId} not exist`)
    }

    const subTotal = product.price * productQuantity;

    totals.subTotal += subTotal;
    totals.tax += subTotal * 0.15;
    totals.total += subTotal * 1.15;

    return totals
  }, { subTotal: 0, tax: 0, total: 0 });

  try {
    const prismaTransaction = await prisma.$transaction(async (tx) => {

      const updatedProductsPromises = products.map(product => {
        const productQuantity = productIds.filter(
          prod => prod.productId === product.id
        ).reduce((acc, item) => item.quantity + acc, 0);

        if (productQuantity === 0) {
          throw new Error(`${product.id} has not defined quantity`);
        }

        return tx.product.update({
          where: { id: product.id },
          data: {
            inStock: { decrement: productQuantity }
          }
        })
      });

      const updatedProducts = await Promise.all(updatedProductsPromises);

      updatedProducts.forEach(product => {
        if (product.inStock < 0) {
          throw new Error(`${product.title} does not have sufficient inventory.`)
        }
      });

      const order = await tx.order.create({
        data: {
          userId: userId,
          itemsInOrder: itemsInOrder,
          subTotal: subTotal,
          tax: tax,
          total: total,

          OrderItem: {
            createMany: {
              data: productIds.map(prod => ({
                quantity: prod.quantity,
                size: prod.size,
                productId: prod.productId,
                price: products.find(product => product.id === prod.productId)?.price ?? 0,
              })),
            },
          },
        },
      });

      const { country, ...restAddress } = address;
      const orderAddress = await tx.orderAddress.create({
        data: {
          ...restAddress,
          countryId: country,
          orderId: order.id,
        },
      }
      );

      return {
        updatedProducts: updatedProducts,
        order: order,
        orderAddress: orderAddress,
      };
    });

    return {
      ok: true,
      order: prismaTransaction.order,
      prismaTransaction: prismaTransaction,
    }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    return {
      ok: false,
      message: error?.message
    }
  }
}