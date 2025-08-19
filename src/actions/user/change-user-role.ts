"use server";

import { auth } from "@/auth.config";
import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export const changeUserRole = async (userId: string, role: string) => {
  const sesion = await auth();

  if (sesion?.user.role !== "admin") {
    return {
      ok: false,
      message: "Must be authenticated like Admin.",
    };
  }

  try {
    const newRole = role === "admin" ? "admin" : "user";

    await prisma.user.update({
      where: { id: userId },
      data: {
        role: newRole,
      },
    });

    revalidatePath("/admin/users");

    return {
      ok: true,
      message: "User updated successfully.",
    };
  } catch (error) {
    console.log(error);
    return {
      ok: false,
      message: "Unable to update the role, check the logs.",
    };
  }
};
