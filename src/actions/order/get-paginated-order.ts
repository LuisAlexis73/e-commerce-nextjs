"use server";

import { auth } from "@/auth.config";
import prisma from "@/lib/prisma";

interface PaginationOptions {
  page?: number;
  take?: number;
}

export const getPaginatedOrders = async ({
  page = 1,
  take = 10,
}: PaginationOptions = {
  }) => {
  if (isNaN(Number(page))) page = 1;
  if (page < 1) page = 1;

  const session = await auth();

  if (session?.user.role !== "admin") {
    return {
      ok: false,
      message: "Must be admin.",
    };
  }

  const orders = await prisma.order.findMany({
    orderBy: {
      createdAt: "desc",
    },
    include: {
      OrderAddress: {
        select: {
          firstName: true,
          lastName: true,
        },
      },
    },
    take: take,
    skip: (page - 1) * take,
  });

  const totalCount = await prisma.order.count();
  const totalPages = Math.ceil(totalCount / take);

  return {
    ok: true,
    orders: orders,
    currentPage: page,
    totalPages: totalPages,
  };
};
