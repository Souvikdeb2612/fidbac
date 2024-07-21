import { NextResponse } from 'next/server';
import { getCurrency } from '../../../db/queries/currency';


export async function GET(request: any) {
    const { searchParams } = new URL(request.url);
    const userId = searchParams.get('userId');
    try {
        const currency = await getCurrency(Number(userId));
        return NextResponse.json({currency});
    } catch (error) {
        console.error('Failed to fetch currency:', error);
        return NextResponse.json({ error: 'Failed to fetch currency' }, { status: 500 });
    }
}
