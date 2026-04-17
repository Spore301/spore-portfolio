import { NextRequest, NextResponse } from 'next/server';
import { createProject, getProjects, updateProjectOrder } from '@/lib/admin-projects';

export async function GET() {
  try {
    const projects = await getProjects();
    return NextResponse.json(projects);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const data = await req.json();
    const newProject = await createProject(data);
    return NextResponse.json(newProject, { status: 201 });
  } catch (error: any) {
    console.error('API Error in POST /api/admin/projects:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function PATCH(req: NextRequest) {
  try {
    const { order } = await req.json();
    await updateProjectOrder(order);
    return NextResponse.json({ success: true });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

