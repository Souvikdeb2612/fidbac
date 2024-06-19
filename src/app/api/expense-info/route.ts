import { NextResponse } from 'next/server';
import { fetchExpenseInfo } from '@/db/queries/expenses';

export async function GET(request:any) {
    const { searchParams } = new URL(request.url);
    const userId = searchParams.get('userId');

    if (!userId) {
        return NextResponse.json({ error: 'User ID is required' }, { status: 400 });
    }

    try {
        const thisWeekData = await fetchExpenseInfo(userId);
        return NextResponse.json(thisWeekData);
    } catch (error) {
        console.error('Failed to fetch this week expenses:', error);
        return NextResponse.json({ error: 'Failed to fetch this week expenses' }, { status: 500 });
    }
}
