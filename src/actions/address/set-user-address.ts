'use server';

import type { Address } from "@/interfaces/address.interface";
import prisma from "@/lib/prisma";

export const setUSerAddress = async (address: Address, userId: string) => {
  try {
    const newAddress = await createOrReplaceAddress(address, userId);

    return {
      ok: true,
      address: newAddress,
    }
  } catch (error) {
    console.error('Error setting user address:', error);

    return {
      ok: false,
      message: 'Failed to set user address',
    }
  }
}

const createOrReplaceAddress = async (address: Address, userId: string) => {
  try {
    const storedAddress = await prisma.userAddress.findUnique({
      where: { userId }
    })

    const addressToSave = {
      userId: userId,
      address: address.address,
      address2: address.address2,
      countryId: address.country,
      city: address.city,
      firstName: address.firstName,
      lastName: address.lastName,
      phone: address.phone,
      postalCode: address.postalCode,
    };

    if (!storedAddress) {
      const newAddress = await prisma.userAddress.create({
        data: addressToSave
      })

      return newAddress
    }

    const updateAddress = await prisma.userAddress.update({
      where: { userId },
      data: addressToSave
    })

    return updateAddress
  } catch (error) {
    console.error(error);
    throw new Error('Address could not be saved');
  }
}