"use server"

import { revalidatePath } from "next/cache";
import client from "../../db";





export async function createExpense({ title, price, segment, date, userId }:{
    title: string,
    price: number,
    segment: string,
    date: string,
    userId: number,
}) {
  try {
    const newExpense = await client.expense.create({
      data: {
        title,
        price,
        segment,
        date,
        userId,
      },
    });
    return newExpense;
  } catch (error) {
    throw new Error("Error creating expense: " + error);
  }
  finally{
    revalidatePath('/home')
  }
}

