import { NextRequest, NextResponse } from 'next/server';
import { updateProject, deleteProject, toggleProjectVisibility } from '@/lib/projects';

export async function PUT(req: NextRequest, { params }: { params: Promise<{ slug: string }> }) {
  try {
      const { slug } = await params;
      const data = await req.json();
      const updatedProject = await updateProject(slug, data);
      return NextResponse.json(updatedProject);
  } catch (error: any) {
      return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function PATCH(req: NextRequest, { params }: { params: Promise<{ slug: string }> }) {
  try {
      const { slug } = await params;
      const { visible } = await req.json();
      const updatedProject = await toggleProjectVisibility(slug, visible);
      return NextResponse.json(updatedProject);
  } catch (error: any) {
      return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest, { params }: { params: Promise<{ slug: string }> }) {
    try {
        const { slug } = await params;
        await deleteProject(slug);
        return NextResponse.json({ success: true });
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
