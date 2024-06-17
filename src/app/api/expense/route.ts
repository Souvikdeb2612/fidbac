import { NextResponse } from 'next/server';
import { fetchExpenses } from '@/db/queries/expenses';

export async function GET(request: any) {
    const { searchParams } = new URL(request.url);
    const userId = searchParams.get('userId');
    const month = searchParams.get('month'); // Ensure you get the month parameter

    if (!userId || !month) {
        return NextResponse.json({ error: 'User ID and month are required' }, { status: 400 });
    }

    try {
        const expenses = await fetchExpenses(userId, month);
        return NextResponse.json(expenses);
    } catch (error) {
        console.error('Failed to fetch expenses:', error);
        return NextResponse.json({ error: 'Failed to fetch expenses' }, { status: 500 });
    }
}
