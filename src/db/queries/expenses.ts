import client from '../index';
import type { Expense } from '@prisma/client';


export async function fetchExpenses(): Promise<Expense[]> {  // Function to fetch all posts from the database.
    return await client.expense.findMany({
        orderBy: [
            {
                date: 'desc',
            }
        ],
    })
}
