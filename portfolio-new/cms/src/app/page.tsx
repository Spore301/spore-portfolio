"use client";

import { useEffect, useState, useRef } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { PlusCircle, Edit, Eye, EyeOff, Loader2, GripVertical, Save } from 'lucide-react';

interface Project {
  slug: string;
  title: string;
  category: string;
  visible: boolean;
  display_order: number;
  hero?: { shortDescription?: string };
}

export default function DashboardPage() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [togglingSlug, setTogglingSlug] = useState<string | null>(null);
  const [draggedIndex, setDraggedIndex] = useState<number | null>(null);
  const [dragOverIndex, setDragOverIndex] = useState<number | null>(null);
  const [orderChanged, setOrderChanged] = useState(false);
  const [savingOrder, setSavingOrder] = useState(false);

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    try {
      const res = await fetch('/api/projects');
      const data = await res.json();
      setProjects(data);
    } catch (error) {
      console.error('Failed to fetch projects:', error);
    } finally {
      setLoading(false);
    }
  };

  const toggleVisibility = async (slug: string, currentVisible: boolean) => {
    setTogglingSlug(slug);
    try {
      const res = await fetch(`/api/projects/${slug}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ visible: !currentVisible }),
      });
      if (!res.ok) throw new Error('Failed to toggle visibility');
      setProjects(prev =>
        prev.map(p => p.slug === slug ? { ...p, visible: !currentVisible } : p)
      );
    } catch (error) {
      console.error('Failed to toggle visibility:', error);
    } finally {
      setTogglingSlug(null);
    }
  };

  // --- Drag and Drop ---
  const handleDragStart = (index: number) => {
    setDraggedIndex(index);
  };

  const handleDragOver = (e: React.DragEvent, index: number) => {
    e.preventDefault();
    if (draggedIndex === null || draggedIndex === index) return;
    setDragOverIndex(index);
  };

  const handleDrop = (index: number) => {
    if (draggedIndex === null || draggedIndex === index) {
      setDraggedIndex(null);
      setDragOverIndex(null);
      return;
    }

    const updated = [...projects];
    const [moved] = updated.splice(draggedIndex, 1);
    updated.splice(index, 0, moved);

    setProjects(updated);
    setDraggedIndex(null);
    setDragOverIndex(null);
    setOrderChanged(true);
  };

  const handleDragEnd = () => {
    setDraggedIndex(null);
    setDragOverIndex(null);
  };

  const saveOrder = async () => {
    setSavingOrder(true);
    try {
      const order = projects.map((p, i) => ({ slug: p.slug, display_order: i }));
      const res = await fetch('/api/projects', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ order }),
      });
      if (!res.ok) throw new Error('Failed to save order');
      setOrderChanged(false);
    } catch (error) {
      console.error('Failed to save order:', error);
    } finally {
      setSavingOrder(false);
    }
  };

  if (loading) {
    return (
      <div className="container mx-auto p-8 max-w-5xl flex items-center justify-center min-h-[50vh]">
        <Loader2 className="w-6 h-6 animate-spin text-muted-foreground" />
      </div>
    );
  }

  return (
    <div className="container mx-auto p-8 max-w-5xl">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Projects CMS</h1>
          <p className="text-muted-foreground mt-1">Manage your portfolio case studies and data.</p>
        </div>
        <div className="flex items-center gap-3">
          {orderChanged && (
            <Button onClick={saveOrder} disabled={savingOrder} variant="secondary">
              {savingOrder ? (
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
              ) : (
                <Save className="w-4 h-4 mr-2" />
              )}
              Save Order
            </Button>
          )}
          <Link href="/projects/new">
            <Button>
              <PlusCircle className="w-4 h-4 mr-2" />
              New Project
            </Button>
          </Link>
        </div>
      </div>

      {orderChanged && (
        <div className="mb-6 px-4 py-3 rounded-lg bg-amber-50 border border-amber-200 text-amber-800 text-sm font-medium">
          You have unsaved ordering changes. Click "Save Order" to persist.
        </div>
      )}

      {projects.length === 0 ? (
        <div className="text-center p-12 border rounded-xl bg-muted/50">
          <h3 className="text-lg font-medium">No projects found</h3>
          <p className="text-muted-foreground mt-2 mb-6">Get started by creating your first portfolio project.</p>
          <Link href="/projects/new">
            <Button>Create Project</Button>
          </Link>
        </div>
      ) : (
        <div className="flex flex-col gap-3">
          {projects.map((project, index) => (
            <div
              key={project.slug}
              draggable
              onDragStart={() => handleDragStart(index)}
              onDragOver={(e) => handleDragOver(e, index)}
              onDrop={() => handleDrop(index)}
              onDragEnd={handleDragEnd}
              className={`transition-all duration-200 ${
                draggedIndex === index ? 'opacity-40 scale-[0.98]' : ''
              } ${
                dragOverIndex === index ? 'translate-y-1' : ''
              }`}
            >
              <Card
                className={`transition-all duration-200 ${
                  !project.visible ? 'opacity-50 border-dashed' : ''
                }`}
              >
                <div className="flex items-center gap-4 p-5">
                  {/* Drag Handle */}
                  <div className="cursor-grab active:cursor-grabbing text-muted-foreground hover:text-foreground transition-colors shrink-0">
                    <GripVertical className="w-5 h-5" />
                  </div>

                  {/* Order Number */}
                  <div className="w-8 h-8 rounded-full bg-muted flex items-center justify-center shrink-0">
                    <span className="text-xs font-bold text-muted-foreground">{index + 1}</span>
                  </div>

                  {/* Project Info */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <h3 className="font-semibold text-base truncate">{project.title}</h3>
                      {!project.visible && (
                        <span className="shrink-0 text-[10px] font-mono uppercase tracking-wider px-2 py-0.5 rounded bg-muted text-muted-foreground border">
                          Hidden
                        </span>
                      )}
                    </div>
                    <p className="text-sm text-muted-foreground truncate">
                      {project.category} &middot; /{project.slug}
                    </p>
                  </div>

                  {/* Actions */}
                  <div className="flex items-center gap-1 shrink-0">
                    <Button
                      variant="ghost"
                      size="icon"
                      disabled={togglingSlug === project.slug}
                      onClick={() => toggleVisibility(project.slug, project.visible)}
                      title={project.visible ? 'Hide from portfolio' : 'Show on portfolio'}
                    >
                      {togglingSlug === project.slug ? (
                        <Loader2 className="w-4 h-4 animate-spin" />
                      ) : project.visible ? (
                        <Eye className="w-4 h-4" />
                      ) : (
                        <EyeOff className="w-4 h-4" />
                      )}
                    </Button>
                    <Link href={`/projects/${project.slug}`}>
                      <Button variant="ghost" size="icon">
                        <Edit className="w-4 h-4" />
                      </Button>
                    </Link>
                  </div>
                </div>
              </Card>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
