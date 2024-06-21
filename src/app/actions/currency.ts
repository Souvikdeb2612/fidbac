
"use server"

import client from '../../db';

export async function updateCurrency({userId, currency}:{userId: number, currency: string}) {
  
    try {
    const updatedUser = await client.user.update({
      where: { id: userId },
      data: { currency },
    });
    return updatedUser;
  } catch (error) {
    console.error("Error updating currency:", error);
    throw error;
  }
}
