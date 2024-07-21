import { NextResponse } from 'next/server';
import { fetchTransactions } from '@/db/queries/transaction';

export async function GET(request: any) {
    const { searchParams } = new URL(request.url);
    const userId = searchParams.get('userId');
    const month = searchParams.get('month'); 
    const page = searchParams.get('page'); 
    const pageSize = searchParams.get('pageSize'); 

    if (!userId || !month) {
        return NextResponse.json({ error: 'User ID and month are required' }, { status: 400 });
    }

    if (!page || !pageSize) {
        return NextResponse.json({ error: 'User page and pageSize are required' }, { status: 400 });
    }

    try {
        const transactions = await fetchTransactions(userId, month, Number(page), Number(pageSize));
        return NextResponse.json(transactions);
    } catch (error) {
        console.error('Failed to fetch transactions:', error);
        return NextResponse.json({ error: 'Failed to fetch transactions' }, { status: 500 });
    }
}
