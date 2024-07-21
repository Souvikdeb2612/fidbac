import { NextResponse } from 'next/server';
import { fetchTransactionInfo } from '@/db/queries/transaction';

export async function GET(request:any) {
    const { searchParams } = new URL(request.url);
    const userId = searchParams.get('userId');

    if (!userId) {
        return NextResponse.json({ error: 'User ID is required' }, { status: 400 });
    }

    try {
        const thisWeekData = await fetchTransactionInfo(userId);
        return NextResponse.json(thisWeekData);
    } catch (error) {
        console.error('Failed to fetch this week transactions:', error);
        return NextResponse.json({ error: 'Failed to fetch this week transactions' }, { status: 500 });
    }
}
