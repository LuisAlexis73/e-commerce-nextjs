"use server";

import prisma from "@/lib/prisma";

export const getProductBySlug = async (slug: string) => {
  try {
    const product = await prisma.product.findFirst({
      where: {
        slug: slug,
      },
      include: {
        productImage: true,
      },
    });

    if (!product) {
      throw null;
    }

    return {
      ...product,
      images: product.productImage.map((image) => image.url),
    };
  } catch (error) {
    console.error(error);
    throw new Error("Error fetching product by slug");
  }
};
