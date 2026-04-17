import { NextResponse } from 'next/server';
import { getSections, updateSectionsOrder } from '@/lib/admin-sections';

export async function GET() {
  try {
    const data = await getSections();
    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch sections' }, { status: 500 });
  }
}

export async function PATCH(req: Request) {
  try {
    const { order } = await req.json();
    if (order && Array.isArray(order)) {
      await updateSectionsOrder(order);
      return NextResponse.json({ success: true });
    }
    return NextResponse.json({ error: 'Invalid payload' }, { status: 400 });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to update order' }, { status: 500 });
  }
}
