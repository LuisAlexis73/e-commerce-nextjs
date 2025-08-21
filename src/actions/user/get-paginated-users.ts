"use server";

import { auth } from "@/auth.config";
import prisma from "@/lib/prisma";

interface PaginationOptions {
  page?: number;
  take?: number;
}

export const getPaginatedUsers = async ({
  page = 1,
  take = 10,
}: PaginationOptions = {
  }) => {

  if (page < 1) page = 1;
  if (isNaN(Number(page))) page = 1;

  const session = await auth();

  if (session?.user.role !== "admin") {
    return {
      ok: false,
      message: "Must be admin.",
    };
  }

  const users = await prisma.user.findMany({
    orderBy: {
      createdAt: "desc",
    },
    take: take,
    skip: (page - 1) * take,
  });

  const totalCount = await prisma.user.count();
  const totalPages = Math.ceil(totalCount / take);

  return {
    ok: true,
    users: users,
    currentPage: page,
    totalPages: totalPages,
  };
};
