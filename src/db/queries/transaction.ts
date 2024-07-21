import client from '@/db';
import { startOfMonth, endOfMonth, parse, subWeeks, subMonths } from 'date-fns'; // Import date-fns functions
import { startOfWeek, endOfWeek } from 'date-fns';

export async function fetchTransactions(userId:string, month:string, page = 1, pageSize = 10) {
    const parsedMonth = parse(month, 'MMMM', new Date());
    const startDate = startOfMonth(parsedMonth);
    const endDate = endOfMonth(parsedMonth);

    try {
        const transactions = await client.transaction.findMany({
            where: {
                userId: Number(userId),
                date: {
                    gte: startDate,
                    lt: endDate,
                },
            },
            orderBy: [{ date: 'desc' }],
            skip: (page - 1) * pageSize,
            take: pageSize,
        });
        

        const totalTransactions = await client.transaction.count({
            where: {
                userId: Number(userId),
                date: {
                    gte: startDate,
                    lt: endDate,
                },
            },
        });

        return {
            transactions,
            total: totalTransactions,
        };
    } catch (error) {
        console.error('Error fetching transactions:', error);
        throw new Error('Failed to fetch transactions');
    }
}

export async function fetchTransactionInfo(userId: string) {
    // Calculate start and end of the current week
    const startDateThisWeek = startOfWeek(new Date(), { weekStartsOn: 1 }); // Assuming Monday is the start of the week
    const endDateThisWeek = endOfWeek(new Date(), { weekStartsOn: 1 });

    // Calculate start and end of the previous week
    const startDateLastWeek = startOfWeek(subWeeks(new Date(), 1), { weekStartsOn: 1 });
    const endDateLastWeek = endOfWeek(subWeeks(new Date(), 1), { weekStartsOn: 1 });

    // Calculate start and end of the current month
    const startDateThisMonth = startOfMonth(new Date());
    const endDateThisMonth = endOfMonth(new Date());

    // Calculate start and end of the previous month
    const startDateLastMonth = startOfMonth(subMonths(new Date(), 1));
    const endDateLastMonth = endOfMonth(subMonths(new Date(), 1));

    try {
        // Fetch transactions for the current week
        const transactionsThisWeek = await client.transaction.findMany({
            where: {
                userId: Number(userId),
                type: 'expense',
                date: {
                    gte: startDateThisWeek,
                    lte: endDateThisWeek,
                },
            },
            orderBy: [
                {
                    date: 'desc',
                }
            ],
        });

        // Fetch transactions for the previous week
        const transactionsLastWeek = await client.transaction.findMany({
            where: {
                userId: Number(userId),
                type: 'expense',
                date: {
                    gte: startDateLastWeek,
                    lte: endDateLastWeek,
                },
            },
            orderBy: [
                {
                    date: 'desc',
                }
            ],
        });

        // Fetch transactions for the current month
        const transactionsThisMonth = await client.transaction.findMany({
            where: {
                userId: Number(userId),
                type: 'expense',
                date: {
                    gte: startDateThisMonth,
                    lte: endDateThisMonth,
                },
            },
            orderBy: [
                {
                    date: 'desc',
                }
            ],
        });

        // Fetch transactions for the previous month
        const transactionsLastMonth = await client.transaction.findMany({
            where: {
                userId: Number(userId),
                type: 'expense',
                date: {
                    gte: startDateLastMonth,
                    lte: endDateLastMonth,
                },
            },
            orderBy: [
                {
                    date: 'desc',
                }
            ],
        });

        // Calculate total transactions for this week
        const totalThisWeek = transactionsThisWeek.reduce((acc, transaction) => acc + transaction.amount, 0);

        // Calculate total transactions for last week
        const totalLastWeek = transactionsLastWeek.reduce((acc, transaction) => acc + transaction.amount, 0);

        // Calculate percentage increase for this week
        const percentageChangeWeek = totalLastWeek ? ((totalThisWeek - totalLastWeek) / totalLastWeek) * 100 : 100;

        // Calculate total transactions for this month
        const totalThisMonth = transactionsThisMonth.reduce((acc, transaction) => acc + transaction.amount, 0);

        // Calculate total transactions for last month
        const totalLastMonth = transactionsLastMonth.reduce((acc, transaction) => acc + transaction.amount, 0);

        // Calculate percentage increase for this month
        const percentageChangeMonth = totalLastMonth ? ((totalThisMonth - totalLastMonth) / totalLastMonth) * 100 : 100;

        return {
            weekly: {
                total: totalThisWeek.toFixed(2), // Format to two decimal places
                percentageChange: percentageChangeWeek.toFixed(2), // Format to two decimal places
            },
            monthly: {
                total: totalThisMonth.toFixed(2), // Format to two decimal places
                percentageChange: percentageChangeMonth.toFixed(2), // Format to two decimal places
            }
        };
    } catch (error) {
        console.error('Error fetching transactions:', error);
        throw new Error('Failed to fetch transactions');
    }
}