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
import { Switch } from '@/components/ui/switch';

export function TestimonialForm({ initialData = null }: { initialData?: any }) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const isEditing = !!initialData;

  const [formData, setFormData] = useState({
    id: initialData?.id || '',
    author_name: initialData?.author_name || '',
    author_role: initialData?.author_role || '',
    content: initialData?.content || '',
    avatar_url: initialData?.avatar_url || '',
    visible: initialData?.visible !== false,
  });

  const handleChange = (field: string, value: string | boolean) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const url = isEditing ? `/api/admin/testimonials/${formData.id}` : '/api/admin/testimonials';
      const method = isEditing ? 'PUT' : 'POST';

      // if creating, we don't send id
      const payload = { ...formData };
      if (!isEditing) delete payload.id;

      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      if (!res.ok) throw new Error('Failed to save testimonial');
      
      router.push('/admin/testimonials');
      router.refresh();
    } catch (error) {
      console.error(error);
      alert('Failed to save testimonial');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="container mx-auto max-w-5xl pb-24 px-8">
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-4">
          <Link href="/admin/testimonials">
            <Button variant="outline" size="icon" type="button"><ArrowLeft className="w-4 h-4" /></Button>
          </Link>
          <h1 className="text-3xl font-bold tracking-tight">
            {isEditing ? `Edit Testimonial` : 'Create Testimonial'}
          </h1>
        </div>
        <Button type="submit" disabled={loading}>
          <Save className="w-4 h-4 mr-2" />
          {loading ? 'Saving...' : 'Save Testimonial'}
        </Button>
      </div>

      <div className="grid grid-cols-1 gap-8">
        <Card>
          <CardHeader>
            <CardTitle>Details</CardTitle>
            <CardDescription>Content and author metadata.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Author Name</Label>
                <Input required value={formData.author_name} onChange={e => handleChange('author_name', e.target.value)} />
              </div>
              <div className="space-y-2">
                <Label>Author Role</Label>
                <Input value={formData.author_role} onChange={e => handleChange('author_role', e.target.value)} placeholder="e.g. CEO at ACME" />
              </div>
            </div>
            
            <div className="space-y-2">
              <Label>Testimonial Content</Label>
              <Textarea 
                  required 
                  value={formData.content} 
                  onChange={e => handleChange('content', e.target.value)} 
                  rows={5}
                  placeholder="The text of the testimonial..."
              />
            </div>

            <div className="space-y-2">
              <Label>Avatar Image URL (Optional)</Label>
              <Input value={formData.avatar_url} onChange={e => handleChange('avatar_url', e.target.value)} placeholder="https://..." />
            </div>

            <div className="flex flex-row items-center justify-between rounded-lg border p-4">
              <div className="space-y-0.5">
                <Label className="text-base">Visibility</Label>
                <p className="text-sm text-muted-foreground">
                  Should this testimonial be shown on the public site?
                </p>
              </div>
              <div className="flex items-center space-x-2">
                  <input type="checkbox" checked={formData.visible} onChange={(e) => handleChange('visible', e.target.checked)} className="w-5 h-5 accent-primary" />
              </div>
            </div>

          </CardContent>
        </Card>
      </div>
    </form>
  );
}
