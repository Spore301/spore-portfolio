import { ProjectForm } from '@/components/admin/ProjectForm';
import { getProjectBySlug } from '@/lib/admin-projects';
import { notFound } from 'next/navigation';

export default async function EditProjectPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const project = await getProjectBySlug(slug);

  if (!project) {
    notFound();
  }

  return (
    <div className="pt-8">
      <ProjectForm initialData={project} />
    </div>
  );
}
