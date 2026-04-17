import { supabase } from '@/lib/supabase';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

async function getPublishedBlogs() {
  const { data, error } = await supabase
    .from('blogs')
    .select('*')
    .eq('published', true)
    .order('created_at', { ascending: false });

  if (error) {
    console.error(error);
    return [];
  }
  return data;
}

export default async function BlogsPage() {
  const blogs = await getPublishedBlogs();

  return (
    <div className="flex flex-col min-h-screen">
      <section className="px-6 py-12 md:py-20 container mx-auto max-w-7xl pt-24 md:pt-32 pb-24 border-b border-gray-200">
        <h1 className="text-5xl sm:text-6xl md:text-7xl font-semibold tracking-[-0.04em] leading-[1.0] max-w-[95%] mb-8">
          Writings & Thoughts
        </h1>
        <p className="text-xl text-gray-500 font-medium max-w-2xl">
          Deep dives into product management, system design, brutalist aesthetics, and development.
        </p>
      </section>

      <section className="py-24 bg-[#fafafa]">
        <div className="container mx-auto max-w-4xl px-6">
          <div className="flex flex-col gap-12">
            {blogs.map((blog) => (
              <Link key={blog.slug} href={`/blogs/${blog.slug}`} className="group block">
                <article className="border-b border-gray-200 pb-12 transition-colors hover:border-black">
                  {blog.cover_image && (
                    <div className="w-full h-64 md:h-96 bg-gray-200 mb-8 overflow-hidden rounded-xl">
                      <img src={blog.cover_image} alt={blog.title} className="w-full h-full object-cover grayscale transition-transform duration-700 group-hover:scale-105" />
                    </div>
                  )}
                  <div className="flex items-center gap-4 text-sm font-medium text-gray-500 mb-4">
                    <span>{new Date(blog.created_at).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</span>
                  </div>
                  <h2 className="text-3xl md:text-4xl font-semibold tracking-tight text-black mb-4 group-hover:text-gray-600 transition-colors">
                    {blog.title}
                  </h2>
                  <p className="text-lg text-gray-600 mb-6 leading-relaxed">
                    {blog.description}
                  </p>
                  <div className="flex items-center text-black font-medium">
                    Read Article <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                  </div>
                </article>
              </Link>
            ))}

            {blogs.length === 0 && (
              <p className="text-gray-500 text-lg">No posts published yet. Check back soon.</p>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}
