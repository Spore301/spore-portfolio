import { BlogForm } from '@/components/admin/BlogForm';
import { getBlogBySlug } from '@/lib/admin-blogs';
import { notFound } from 'next/navigation';

export default async function EditBlogPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const blog = await getBlogBySlug(slug);

  if (!blog) {
    notFound();
  }

  return <BlogForm initialData={blog} />;
}
