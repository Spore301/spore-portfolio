"use client";

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { PlusCircle, Edit, Eye, EyeOff, Loader2, GripVertical, Save, Trash2 } from 'lucide-react';

interface Testimonial {
  id: string;
  author_name: string;
  author_role: string;
  content: string;
  visible: boolean;
  display_order: number;
}

export default function TestimonialsDashboard() {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [loading, setLoading] = useState(true);
  const [togglingId, setTogglingId] = useState<string | null>(null);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  
  const [draggedIndex, setDraggedIndex] = useState<number | null>(null);
  const [dragOverIndex, setDragOverIndex] = useState<number | null>(null);
  const [orderChanged, setOrderChanged] = useState(false);
  const [savingOrder, setSavingOrder] = useState(false);

  useEffect(() => {
    fetchTestimonials();
  }, []);

  const fetchTestimonials = async () => {
    try {
      const res = await fetch('/api/admin/testimonials');
      const data = await res.json();
      setTestimonials(data);
    } catch (error) {
      console.error('Failed to fetch testimonials:', error);
    } finally {
      setLoading(false);
    }
  };

  const toggleVisibility = async (id: string, currentVisible: boolean) => {
    setTogglingId(id);
    try {
      const res = await fetch(`/api/admin/testimonials/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ visible: !currentVisible }),
      });
      if (!res.ok) throw new Error('Failed to toggle visibility');
      setTestimonials(prev =>
        prev.map(p => p.id === id ? { ...p, visible: !currentVisible } : p)
      );
    } catch (error) {
      console.error('Failed to toggle visibility:', error);
    } finally {
      setTogglingId(null);
    }
  };

  const deleteTestimonial = async (id: string) => {
    if(!confirm("Are you sure you want to delete this testimonial?")) return;
    setDeletingId(id);
    try {
        const res = await fetch(`/api/admin/testimonials/${id}`, { method: 'DELETE' });
        if(!res.ok) throw new Error("Failed to delete");
        setTestimonials(prev => prev.filter(t => t.id !== id));
    } catch (error) {
        console.error(error);
    } finally {
        setDeletingId(null);
    }
  }

  // --- Drag and Drop ---
  const handleDragStart = (index: number) => setDraggedIndex(index);
  
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
    const updated = [...testimonials];
    const [moved] = updated.splice(draggedIndex, 1);
    updated.splice(index, 0, moved);
    setTestimonials(updated);
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
      const order = testimonials.map((t, i) => ({ id: t.id, display_order: i }));
      const res = await fetch('/api/admin/testimonials', {
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
      <div className="container mx-auto p-4 flex items-center justify-center min-h-[50vh]">
        <Loader2 className="w-6 h-6 animate-spin text-muted-foreground" />
      </div>
    );
  }

  return (
    <div className="container mx-auto max-w-5xl px-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Testimonials CMS</h1>
          <p className="text-muted-foreground mt-1">Manage client and colleague feedback.</p>
        </div>
        <div className="flex items-center gap-3">
          {orderChanged && (
            <Button onClick={saveOrder} disabled={savingOrder} variant="secondary">
              {savingOrder ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : <Save className="w-4 h-4 mr-2" />}
              Save Order
            </Button>
          )}
          <Link href="/admin/testimonials/new">
            <Button>
              <PlusCircle className="w-4 h-4 mr-2" />
              New Testimonial
            </Button>
          </Link>
        </div>
      </div>

      {orderChanged && (
        <div className="mb-6 px-4 py-3 rounded-lg bg-amber-50 border border-amber-200 text-amber-800 text-sm font-medium">
          You have unsaved ordering changes. Click "Save Order" to persist.
        </div>
      )}

      {testimonials.length === 0 ? (
        <div className="text-center p-12 border rounded-xl bg-muted/50">
          <h3 className="text-lg font-medium">No testimonials found</h3>
          <p className="text-muted-foreground mt-2 mb-6">Add feedback from your clients to show here.</p>
          <Link href="/admin/testimonials/new">
            <Button>Add Testimonial</Button>
          </Link>
        </div>
      ) : (
        <div className="flex flex-col gap-3">
          {testimonials.map((testimonial, index) => (
            <div
              key={testimonial.id}
              draggable
              onDragStart={() => handleDragStart(index)}
              onDragOver={(e) => handleDragOver(e, index)}
              onDrop={() => handleDrop(index)}
              onDragEnd={handleDragEnd}
              className={`transition-all duration-200 ${
                draggedIndex === index ? 'opacity-40 scale-[0.98]' : ''
              } ${dragOverIndex === index ? 'translate-y-1' : ''}`}
            >
              <Card className={`transition-all duration-200 ${!testimonial.visible ? 'opacity-50 border-dashed' : ''}`}>
                <div className="flex items-center gap-4 p-5">
                  <div className="cursor-grab active:cursor-grabbing text-muted-foreground hover:text-foreground shrink-0">
                    <GripVertical className="w-5 h-5" />
                  </div>
                  <div className="w-8 h-8 rounded-full bg-muted flex items-center justify-center shrink-0">
                    <span className="text-xs font-bold text-muted-foreground">{index + 1}</span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <h3 className="font-semibold text-base truncate">{testimonial.author_name}</h3>
                      {!testimonial.visible && (
                        <span className="shrink-0 text-[10px] uppercase px-2 py-0.5 rounded bg-muted">Hidden</span>
                      )}
                    </div>
                    <p className="text-sm text-muted-foreground truncate">{testimonial.author_role}</p>
                    <p className="text-xs text-muted-foreground mt-1 line-clamp-1 italic">"{testimonial.content}"</p>
                  </div>
                  <div className="flex items-center gap-1 shrink-0">
                    <Button variant="ghost" size="icon" disabled={togglingId === testimonial.id} onClick={() => toggleVisibility(testimonial.id, testimonial.visible)}>
                      {togglingId === testimonial.id ? <Loader2 className="w-4 h-4 animate-spin" /> : testimonial.visible ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
                    </Button>
                    <Link href={`/admin/testimonials/${testimonial.id}`}>
                      <Button variant="ghost" size="icon"><Edit className="w-4 h-4" /></Button>
                    </Link>
                    <Button variant="ghost" size="icon" className="text-red-500 hover:text-red-600 hover:bg-red-50" disabled={deletingId === testimonial.id} onClick={() => deleteTestimonial(testimonial.id)}>
                        {deletingId === testimonial.id ? <Loader2 className="w-4 h-4 animate-spin" /> : <Trash2 className="w-4 h-4" />}
                    </Button>
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
