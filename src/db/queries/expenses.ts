import client from '../index';
import { startOfMonth, endOfMonth, parse } from 'date-fns'; // Import date-fns functions

export async function fetchExpenses(userId: string, month: string) {
    // Parse month string to Date object
    const parsedMonth = parse(month, 'MMMM', new Date());

    // Calculate start and end of month
    const startDate = startOfMonth(parsedMonth);
    const endDate = endOfMonth(parsedMonth);

    try {
        const expenses = await client.expense.findMany({
            where: {
                userId: Number(userId),
                date: {
                    gte: startDate,
                    lt: endDate,
                },
            },
            orderBy: [
                {
                    date: 'desc',
                }
            ],
        });

        return expenses;
    } catch (error) {
        console.error('Error fetching expenses:', error);
        throw new Error('Failed to fetch expenses');
    }
}
