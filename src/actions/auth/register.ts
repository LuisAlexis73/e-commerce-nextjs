'use server'

import prisma from "@/lib/prisma";
import bcryptjs from 'bcryptjs';

export const registerUser = async (name: string, email: string, password: string) => {
  try {
    const user = await prisma.user.create({
      data: {
        name: name,
        email: email.toLowerCase(),
        password: bcryptjs.hashSync(password)
      },
      select: {
        id: true,
        name: true,
        email: true
      }
    })

    return {
      user,
      ok: true,
      message: 'User register successfully'
    }
  } catch (error) {
    console.log(error);
    return {
      ok: false,
      message: 'Error register user.'
    }
  }
}