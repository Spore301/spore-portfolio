import { ProjectForm } from '@/components/ProjectForm';
import { getProjectBySlug } from '@/lib/projects';
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
