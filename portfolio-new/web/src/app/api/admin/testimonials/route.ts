import { NextResponse } from 'next/server';
import { getTestimonials, createTestimonial, updateTestimonialOrder } from '@/lib/admin-testimonials';

// GET all testimonials
export async function GET() {
  try {
    const data = await getTestimonials();
    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch testimonials' }, { status: 500 });
  }
}

// POST new testimonial
export async function POST(req: Request) {
  try {
    const body = await req.json();
    const newTestimonial = await createTestimonial(body);
    return NextResponse.json(newTestimonial, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to create testimonial' }, { status: 500 });
  }
}

// PATCH update order of multiple testimonials
export async function PATCH(req: Request) {
  try {
    const { order } = await req.json();
    if (order && Array.isArray(order)) {
      await updateTestimonialOrder(order);
      return NextResponse.json({ success: true });
    }
    return NextResponse.json({ error: 'Invalid order data' }, { status: 400 });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to update order' }, { status: 500 });
  }
}
