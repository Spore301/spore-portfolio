"use client";

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { PlusCircle, Edit, Eye, EyeOff, Loader2, Save, Trash2 } from 'lucide-react';

interface Blog {
  slug: string;
  title: string;
  published: boolean;
  created_at: string;
}

export default function BlogsDashboard() {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [loading, setLoading] = useState(true);
  const [togglingSlug, setTogglingSlug] = useState<string | null>(null);
  const [deletingSlug, setDeletingSlug] = useState<string | null>(null);

  useEffect(() => {
    fetchBlogs();
  }, []);

  const fetchBlogs = async () => {
    try {
      const res = await fetch('/api/admin/blogs');
      const data = await res.json();
      setBlogs(data);
    } catch (error) {
      console.error('Failed to fetch blogs:', error);
    } finally {
      setLoading(false);
    }
  };

  const togglePublished = async (slug: string, currentPublished: boolean) => {
    setTogglingSlug(slug);
    try {
      const res = await fetch(`/api/admin/blogs/${slug}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ published: !currentPublished }),
      });
      if (!res.ok) throw new Error('Failed to toggle visibility');
      setBlogs(prev =>
        prev.map(p => p.slug === slug ? { ...p, published: !currentPublished } : p)
      );
    } catch (error) {
      console.error('Failed to toggle visibility:', error);
    } finally {
      setTogglingSlug(null);
    }
  };

  const deleteBlog = async (slug: string) => {
    if(!confirm("Are you sure you want to delete this blog post?")) return;
    setDeletingSlug(slug);
    try {
        const res = await fetch(`/api/admin/blogs/${slug}`, { method: 'DELETE' });
        if(!res.ok) throw new Error("Failed to delete");
        setBlogs(prev => prev.filter(t => t.slug !== slug));
    } catch (error) {
        console.error(error);
    } finally {
        setDeletingSlug(null);
    }
  }

  if (loading) {
    return (
      <div className="container mx-auto p-4 flex items-center justify-center min-h-[50vh]">
        <Loader2 className="w-6 h-6 animate-spin text-muted-foreground" />
      </div>
    );
  }

  return (
    <div className="container mx-auto max-w-5xl px-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Blogs CMS</h1>
          <p className="text-muted-foreground mt-1">Manage articles and markdown posts.</p>
        </div>
        <div className="flex items-center gap-3">
          <Link href="/admin/blogs/new">
            <Button>
              <PlusCircle className="w-4 h-4 mr-2" />
              New Post
            </Button>
          </Link>
        </div>
      </div>

      {blogs.length === 0 ? (
        <div className="text-center p-12 border rounded-xl bg-muted/50">
          <h3 className="text-lg font-medium">No blog posts found</h3>
          <p className="text-muted-foreground mt-2 mb-6">Create your first markdown article.</p>
          <Link href="/admin/blogs/new">
            <Button>Write Post</Button>
          </Link>
        </div>
      ) : (
        <div className="flex flex-col gap-3">
          {blogs.map((blog) => (
            <Card key={blog.slug} className={`transition-all duration-200 ${!blog.published ? 'opacity-50 border-dashed' : ''}`}>
              <div className="flex items-center gap-4 p-5">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <h3 className="font-semibold text-base truncate">{blog.title}</h3>
                    {!blog.published && (
                      <span className="shrink-0 text-[10px] uppercase px-2 py-0.5 rounded bg-muted">Draft</span>
                    )}
                  </div>
                  <p className="text-sm text-muted-foreground mt-1">
                    /{blog.slug} &middot; {new Date(blog.created_at).toLocaleDateString()}
                  </p>
                </div>
                <div className="flex items-center gap-1 shrink-0">
                  <Button variant="ghost" size="icon" disabled={togglingSlug === blog.slug} onClick={() => togglePublished(blog.slug, blog.published)}>
                    {togglingSlug === blog.slug ? <Loader2 className="w-4 h-4 animate-spin" /> : blog.published ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
                  </Button>
                  <Link href={`/admin/blogs/${blog.slug}`}>
                    <Button variant="ghost" size="icon"><Edit className="w-4 h-4" /></Button>
                  </Link>
                  <Button variant="ghost" size="icon" className="text-red-500 hover:text-red-600 hover:bg-red-50" disabled={deletingSlug === blog.slug} onClick={() => deleteBlog(blog.slug)}>
                      {deletingSlug === blog.slug ? <Loader2 className="w-4 h-4 animate-spin" /> : <Trash2 className="w-4 h-4" />}
                  </Button>
                </div>
              </div>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
