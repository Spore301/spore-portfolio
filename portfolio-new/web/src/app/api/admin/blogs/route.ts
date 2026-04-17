import { NextResponse } from 'next/server';
import { getBlogs, createBlog } from '@/lib/admin-blogs';

export async function GET() {
  try {
    const data = await getBlogs();
    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch blogs' }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const newBlog = await createBlog(body);
    return NextResponse.json(newBlog, { status: 201 });
  } catch (error: any) {
    console.error('API Error in POST /api/admin/blogs:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
