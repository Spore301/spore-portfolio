import { supabase } from '@/lib/supabase';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
// We should use a markdown renderer here.
// But as a barebones fallback, we can use dangerouslySetInnerHTML or just output text
import Markdown from 'react-markdown';
import { BlockRenderer } from '@/components/BlockRenderer';

async function getBlog(slug: string) {
  const { data, error } = await supabase
    .from('blogs')
    .select('*')
    .eq('slug', slug)
    .eq('published', true)
    .single();

  if (error || !data) {
    return null;
  }
  return data;
}

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const blog = await getBlog(slug);

  if (!blog) {
    notFound();
  }

  return (
    <div className="flex flex-col min-h-screen bg-white">
      <div className="container mx-auto max-w-3xl px-6 pt-24 pb-12">
        <Link href="/blogs" className="inline-flex items-center text-sm font-medium text-gray-500 hover:text-black transition-colors mb-12">
          <ArrowLeft className="w-4 h-4 mr-2" /> Back to writing
        </Link>
        <h1 className="text-4xl md:text-6xl font-bold tracking-[-0.03em] leading-tight mb-8">
          {blog.title}
        </h1>
        <div className="flex items-center gap-4 text-gray-500 font-medium mb-12">
          <span>{new Date(blog.created_at).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</span>
        </div>
        
        {blog.cover_image && (
          <div className="w-full aspect-video bg-gray-100 rounded-2xl overflow-hidden mb-16">
            <img src={blog.cover_image} alt={blog.title} className="w-full h-full object-cover" />
          </div>
        )}

        <div className="prose prose-lg prose-gray max-w-none md:prose-xl">
          <Markdown>{blog.content_md}</Markdown>
        </div>

        <BlockRenderer blocks={blog.content_blocks || []} />
      </div>
    </div>
  );
}
