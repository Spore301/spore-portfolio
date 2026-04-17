import { NextResponse } from 'next/server';
import { getBlogBySlug, updateBlog, deleteBlog } from '@/lib/admin-blogs';

export async function GET(req: Request, { params }: { params: Promise<{ slug: string }> }) {
  try {
    const { slug } = await params;
    const data = await getBlogBySlug(slug);
    if (!data) return NextResponse.json({ error: 'Not found' }, { status: 404 });
    return NextResponse.json(data);
  } catch (error: any) {
    return NextResponse.json({ error: error.message || 'Failed to fetch blog' }, { status: 500 });
  }
}

export async function PUT(req: Request, { params }: { params: Promise<{ slug: string }> }) {
  try {
    const { slug } = await params;
    const body = await req.json();
    const updatedBlog = await updateBlog(slug, body);
    return NextResponse.json(updatedBlog);
  } catch (error: any) {
    console.error(`API Error in PUT /api/admin/blogs/${await params.then(p => p.slug)}:`, error);
    return NextResponse.json({ error: error.message || 'Failed to update blog' }, { status: 500 });
  }
}

export async function PATCH(req: Request, { params }: { params: Promise<{ slug: string }> }) {
  try { // specific for partial updates like visibility/published
    const { slug } = await params;
    const body = await req.json();
    const updatedBlog = await updateBlog(slug, body);
    return NextResponse.json(updatedBlog);
  } catch (error: any) {
    console.error(`API Error in PATCH /api/admin/blogs/${await params.then(p => p.slug)}:`, error);
    return NextResponse.json({ error: error.message || 'Failed to toggle published status' }, { status: 500 });
  }
}

export async function DELETE(req: Request, { params }: { params: Promise<{ slug: string }> }) {
  try {
    const { slug } = await params;
    await deleteBlog(slug);
    return NextResponse.json({ success: true });
  } catch (error: any) {
    console.error(`API Error in DELETE /api/admin/blogs/${await params.then(p => p.slug)}:`, error);
    return NextResponse.json({ error: error.message || 'Failed to delete blog' }, { status: 500 });
  }
}
