import { NextResponse } from 'next/server';
import { updateSection } from '@/lib/admin-sections';

export async function PUT(req: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    const body = await req.json();
    const updated = await updateSection(id, body);
    return NextResponse.json(updated);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to update section' }, { status: 500 });
  }
}

export async function PATCH(req: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    const { is_visible } = await req.json();
    const updated = await updateSection(id, { is_visible });
    return NextResponse.json(updated);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to toggle visibility' }, { status: 500 });
  }
}
