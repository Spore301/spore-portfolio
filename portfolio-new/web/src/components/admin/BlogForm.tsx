"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { ArrowLeft, Save } from 'lucide-react';
import Link from 'next/link';
import { BlockEditor } from './BlockEditor';

export function BlogForm({ initialData = null }: { initialData?: any }) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const isEditing = !!initialData;

  const [formData, setFormData] = useState({
    slug: initialData?.slug || '',
    title: initialData?.title || '',
    description: initialData?.description || '',
    content_md: initialData?.content_md || '',
    content_blocks: initialData?.content_blocks || [],
    cover_image: initialData?.cover_image || '',
    published: initialData?.published !== false,
  });

  const handleChange = (field: string, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const url = isEditing ? `/api/admin/blogs/${formData.slug}` : '/api/admin/blogs';
      const method = isEditing ? 'PUT' : 'POST';

      const payload = { ...formData };
      if (!isEditing && payload.published) {
         // Optionally set published_at here, or let the DB handle it if needed
         (payload as any).published_at = new Date().toISOString();
      }

      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        const errorData = await res.json().catch(() => ({}));
        throw new Error(errorData.error || `Failed to save blog: ${res.statusText}`);
      }
      
      router.push('/admin/blogs');
      router.refresh();
    } catch (error: any) {
      console.error(error);
      alert(`Failed to save blog: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="container mx-auto max-w-5xl pb-24 px-8">
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-4">
          <Link href="/admin/blogs">
            <Button variant="outline" size="icon" type="button"><ArrowLeft className="w-4 h-4" /></Button>
          </Link>
          <h1 className="text-3xl font-bold tracking-tight">
            {isEditing ? `Edit Post` : 'Create Blog Post'}
          </h1>
        </div>
        <Button type="submit" disabled={loading}>
          <Save className="w-4 h-4 mr-2" />
          {loading ? 'Saving...' : 'Save Post'}
        </Button>
      </div>

      <div className="grid grid-cols-1 gap-8">
        <Card>
          <CardHeader>
            <CardTitle>Post Information</CardTitle>
            <CardDescription>Core details about this blog post.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Title</Label>
                <Input required value={formData.title} onChange={e => handleChange('title', e.target.value)} />
              </div>
              <div className="space-y-2">
                <Label>Slug (URL friendly)</Label>
                <Input required disabled={isEditing} value={formData.slug} onChange={e => handleChange('slug', e.target.value)} placeholder="e.g. my-first-post" />
              </div>
            </div>
            
            <div className="space-y-2">
              <Label>Description</Label>
              <Textarea 
                  value={formData.description} 
                  onChange={e => handleChange('description', e.target.value)} 
                  rows={2}
                  placeholder="Short summary for the index page..."
              />
            </div>

            <div className="space-y-2">
              <Label>Cover Image URL (Optional)</Label>
              <Input value={formData.cover_image} onChange={e => handleChange('cover_image', e.target.value)} placeholder="https://..." />
            </div>



            <div className="space-y-4 pt-6 border-t mt-8">
              <div className="flex flex-col gap-1 mb-4">
                <Label className="text-xl">Dynamic Content Blocks</Label>
                <p className="text-sm text-muted-foreground">Build your post visually by adding and arranging text, media, and buttons.</p>
              </div>
              <BlockEditor 
                  blocks={formData.content_blocks} 
                  onChange={blocks => handleChange('content_blocks', blocks)} 
              />
            </div>

            <div className="flex flex-row items-center justify-between rounded-lg border p-4">
              <div className="space-y-0.5">
                <Label className="text-base">Published Status</Label>
                <p className="text-sm text-muted-foreground">
                  Should this post be visible to the public?
                </p>
              </div>
              <div className="flex items-center space-x-2">
                  <input type="checkbox" checked={formData.published} onChange={(e) => handleChange('published', e.target.checked)} className="w-5 h-5 accent-primary" />
              </div>
            </div>

          </CardContent>
        </Card>
      </div>
    </form>
  );
}
