import { NextResponse } from 'next/server';
import { getContactMessages } from '@/lib/admin-contacts';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    const messages = await getContactMessages();
    return NextResponse.json(messages);
  } catch (error) {
    console.error('API Error fetching contact messages:', error);
    return NextResponse.json({ error: 'Failed to fetch' }, { status: 500 });
  }
}
