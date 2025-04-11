'use server'
import prisma from "@/lib/prisma"

export const getStockBySlug = async (slug: string) => {
  try {
    const stock = await prisma.product.findFirst({
      where: {
        slug,
      },
      select: {
        inStock: true,
      }
    })

    if (!stock) {
      throw new Error('Stock not found')
    }

    return stock.inStock;
  } catch (error) {
    console.error(error);
    throw new Error('Error fetching stock by slug');
  }
}