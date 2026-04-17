import { NextResponse } from 'next/server';
import { deleteContactMessage } from '@/lib/admin-contacts';

export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    await deleteContactMessage(id);
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('API Error deleting contact message:', error);
    return NextResponse.json({ error: 'Failed to delete' }, { status: 500 });
  }
}
