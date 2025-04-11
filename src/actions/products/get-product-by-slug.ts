'use server'

import prisma from "@/lib/prisma"

export const getProductBySlug = async (slug: string) => {
  try {

    // Get product by slug
    const product = await prisma.product.findUnique({
      where: {
        slug: slug,
      },
      include: {
        productImage: {
          select: {
            url: true,
          }
        }
      }
    })

    if (!product) {
      throw new Error('Product not found')
    }

    return {
      ...product,
      images: product.productImage.map((image) => image.url)
    }

  } catch (error) {
    console.error(error);
    throw new Error('Error fetching product by slug');
  }
}