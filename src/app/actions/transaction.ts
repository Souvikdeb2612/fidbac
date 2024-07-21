"use server";

import client from "../../db";

export async function createTransaction({
  title,
  amount,
  category,
  date,
  userId,
  type
}: {
  title: string;
  amount: number;
  category: string;
  date: string;
  userId: number;
  type: string
}) {
  try {
    const newTransaction = await client.transaction.create({
      data: {
        title,
        amount,
        category,
        type,
        date,
        userId,
      },
    });
    return newTransaction;
  } catch (error) {
    throw new Error("Error creating transaction: " + error);
  }
}

export async function deleteTransaction(id: number) {
  try {
    const deletedTransaction = await client.transaction.delete({
      where: { id },
    });
    return deletedTransaction;
  } catch (error) {
    throw new Error("Error deleting transaction: " + error);
  }
}
