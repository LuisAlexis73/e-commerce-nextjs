'use server'

import { Gender } from "@/generated/prisma";
import prisma from "@/lib/prisma"

interface PaginationOptions {
  page?: number;
  take?: number;
  gender?: Gender;
}

export const getPaginatedProductsWithImages = async ({ page = 1, take = 12, gender }: PaginationOptions) => {

  if (isNaN(Number(page))) page = 1;
  if (page < 1) page = 1;

  try {
    // Get all Products
    const products = await prisma.product.findMany({
      take: take,
      skip: (page - 1) * take,
      include: {
        productImage: {
          take: 2,
          select: {
            url: true,
          }
        }
      },
      where: {
        gender: gender,
      }
    })

    // Get total pages
    const totalCount = await prisma.product.count({
      where: {
        gender: gender,
      }
    })
    const totalPages = Math.ceil(totalCount / take)

    return {
      currentPage: page,
      totalPages: totalPages,
      products: products.map((product) => ({
        ...product,
        images: product.productImage.map((image) => image.url)
      })),
    }

  } catch (error) {
    console.error(error);
    throw new Error('Error fetching products')
  }
}