"use client";

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { ArrowLeft, Save } from 'lucide-react';
import Link from 'next/link';
import { BlockEditor } from './BlockEditor';

export function ProjectForm({ initialData = null }: { initialData?: any }) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const isEditing = !!initialData;

  // Initialize state with default schema structure or existing data
  const [formData, setFormData] = useState({
    slug: initialData?.slug || '',
    title: initialData?.title || '',
    category: initialData?.category || '',
    hero: initialData?.hero || { shortDescription: '', image: '', role: '', duration: '', tools: '', context: '' },
    problem: initialData?.problem || { context: '', painPoints: [] },
    idea: initialData?.idea || { description: '', diagramImage: '' },
    architecture: initialData?.architecture || { input: '', processing: [], output: [] },
    design_decisions: initialData?.design_decisions || { decisions: [] },
    interface: initialData?.interface || { heroImage: '', dashboardImage: '', sitemapImage: '', flowImage: '' },
    prototype: initialData?.prototype || { githubLink: '', demoLink: '', architectureLink: '' },
    impact: initialData?.impact || { metrics: [] },
    learnings: initialData?.learnings || [],
    next_steps: initialData?.next_steps || [],
    next_project_slug: initialData?.next_project_slug || '',
    content_blocks: initialData?.content_blocks || []
  });

  useEffect(() => {
    if (!isEditing) {
      const storedData = sessionStorage.getItem('llmProjectData');
      if (storedData) {
        try {
          const parsed = JSON.parse(storedData);
          setFormData(prev => ({ ...prev, ...parsed }));
          // Clear it so it doesn't prefill next time
          sessionStorage.removeItem('llmProjectData');
        } catch (e) {
          console.error("Failed to parse llm project data");
        }
      }
    }
  }, [isEditing]);

  const handleChange = (section: string, field: string | null, value: any) => {
    if (section === 'root' && field) {
      setFormData(prev => ({ ...prev, [field]: value }));
    } else if (field === null) {
      // Specifically for root arrays or complex objects assigned directly to section
      setFormData(prev => ({ ...prev, [section]: value }));
    } else {
      setFormData(prev => ({
        ...prev,
        [section]: {
          ...(prev as any)[section],
          [field]: value
        }
      }));
    }
  };

  const handeArrayChange = (section: string, field: string | null, value: string) => {
      // Split newline separated string into array
      const arr = value.split('\n').filter(i => i.trim() !== '');
      
      if (section === 'root' && field) {
          setFormData(prev => ({ ...prev, [field]: arr }));
      } else if (field) {
          setFormData(prev => ({
              ...prev,
              [section]: {
                  ...(prev as any)[section],
                  [field]: arr
              }
          }));
      } else {
          // Direct array at root level like 'learnings'
          setFormData(prev => ({ ...prev, [section]: arr }));
      }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const url = isEditing ? `/api/admin/projects/${formData.slug}` : '/api/admin/projects';
      const method = isEditing ? 'PUT' : 'POST';

      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (!res.ok) throw new Error('Failed to save project');
      
      router.push('/admin');
      router.refresh();
    } catch (error) {
      console.error(error);
      alert('Failed to save project');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="container mx-auto max-w-5xl pb-24 px-8">
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-4">
          <Link href="/admin">
            <Button variant="outline" size="icon"><ArrowLeft className="w-4 h-4" /></Button>
          </Link>
          <h1 className="text-3xl font-bold tracking-tight">
            {isEditing ? `Edit ${formData.title}` : 'Create New Project'}
          </h1>
        </div>
        <Button type="submit" disabled={loading}>
          <Save className="w-4 h-4 mr-2" />
          {loading ? 'Saving...' : 'Save Project'}
        </Button>
      </div>

      <div className="grid grid-cols-1 gap-8">
        {/* Core Info */}
        <Card>
          <CardHeader>
            <CardTitle>Core Details</CardTitle>
            <CardDescription>The fundamental routing and display info.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Title</Label>
                <Input required value={formData.title} onChange={e => handleChange('root', 'title', e.target.value)} />
              </div>
              <div className="space-y-2">
                <Label>Slug (URL path)</Label>
                <Input required disabled={isEditing} value={formData.slug} onChange={e => handleChange('root', 'slug', e.target.value)} />
              </div>
            </div>
            <div className="space-y-2">
              <Label>Category</Label>
              <Input required value={formData.category} onChange={e => handleChange('root', 'category', e.target.value)} />
            </div>
            <div className="space-y-2">
              <Label>Next Project Slug</Label>
              <Input value={formData.next_project_slug} onChange={e => handleChange('root', 'next_project_slug', e.target.value)} />
            </div>
          </CardContent>
        </Card>

        {/* Hero Section */}
        <Card>
          <CardHeader>
            <CardTitle>Hero Section</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label>Short Description</Label>
              <Textarea value={formData.hero.shortDescription} onChange={e => handleChange('hero', 'shortDescription', e.target.value)} />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2"><Label>Role</Label><Input value={formData.hero.role} onChange={e => handleChange('hero', 'role', e.target.value)} /></div>
              <div className="space-y-2"><Label>Duration</Label><Input value={formData.hero.duration} onChange={e => handleChange('hero', 'duration', e.target.value)} /></div>
              <div className="space-y-2"><Label>Tools</Label><Input value={formData.hero.tools} onChange={e => handleChange('hero', 'tools', e.target.value)} /></div>
              <div className="space-y-2"><Label>Context</Label><Input value={formData.hero.context} onChange={e => handleChange('hero', 'context', e.target.value)} /></div>
            </div>
          </CardContent>
        </Card>

        {/* Problem & Solution */}
        <Card>
          <CardHeader>
             <CardTitle>Problem & Idea</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
             <div className="space-y-2">
                <Label>Problem Context</Label>
                <Textarea value={formData.problem.context} onChange={e => handleChange('problem', 'context', e.target.value)} />
             </div>
             <div className="space-y-2">
                <Label>Pain Points (One per line)</Label>
                <Textarea 
                    value={formData.problem.painPoints.join('\n')} 
                    onChange={e => handeArrayChange('problem', 'painPoints', e.target.value)} 
                    placeholder="User gets confused&#10;System is slow" 
                    rows={4} 
                />
             </div>
             <div className="space-y-2 pt-4 border-t">
                <Label>Solution / Idea Description</Label>
                <Textarea value={formData.idea.description} onChange={e => handleChange('idea', 'description', e.target.value)} />
             </div>
          </CardContent>
        </Card>

        {/* Architecture */}
        <Card>
          <CardHeader>
             <CardTitle>System Architecture</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
             <div className="space-y-2">
                <Label>Input</Label>
                <Input value={formData.architecture.input} onChange={e => handleChange('architecture', 'input', e.target.value)} />
             </div>
             <div className="grid grid-cols-2 gap-4">
                 <div className="space-y-2">
                    <Label>Processing Steps (One per line)</Label>
                    <Textarea value={formData.architecture.processing.join('\n')} onChange={e => handeArrayChange('architecture', 'processing', e.target.value)} />
                 </div>
                 <div className="space-y-2">
                    <Label>Output Steps (One per line)</Label>
                    <Textarea value={formData.architecture.output.join('\n')} onChange={e => handeArrayChange('architecture', 'output', e.target.value)} />
                 </div>
             </div>
          </CardContent>
        </Card>

        {/* Learnings & Next Steps */}
        <Card>
          <CardHeader>
             <CardTitle>Learnings & Next Steps</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
             <div className="grid grid-cols-2 gap-4">
                 <div className="space-y-2">
                    <Label>Key Learnings (One per line)</Label>
                    <Textarea value={formData.learnings.join('\n')} onChange={e => handeArrayChange('learnings', null, e.target.value)} rows={5} />
                 </div>
                 <div className="space-y-2">
                    <Label>Next Steps (One per line)</Label>
                    <Textarea value={formData.next_steps.join('\n')} onChange={e => handeArrayChange('next_steps', null, e.target.value)} rows={5} />
                 </div>
             </div>
          </CardContent>
        </Card>
        {/* Dynamic Content Blocks */}
        <Card>
          <CardHeader>
             <CardTitle>Dynamic Content Blocks (Optional)</CardTitle>
             <CardDescription>Append flexible text, media, or CTAs directly into the project page.</CardDescription>
          </CardHeader>
          <CardContent>
             <BlockEditor blocks={formData.content_blocks} onChange={blocks => handleChange('content_blocks', null, blocks)} />
          </CardContent>
        </Card>
      </div>

    </form>
  );
}
