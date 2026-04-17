"use client";

import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { GripVertical, Save, Eye, EyeOff, Loader2, Link as LinkIcon, Edit } from 'lucide-react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';

interface Section {
  id: string;
  section_name: string;
  is_visible: boolean;
  display_order: number;
  style_config: any;
}

export default function SectionsDashboard() {
  const [sections, setSections] = useState<Section[]>([]);
  const [loading, setLoading] = useState(true);
  const [orderChanged, setOrderChanged] = useState(false);
  const [savingOrder, setSavingOrder] = useState(false);
  const [togglingId, setTogglingId] = useState<string | null>(null);

  const [draggedIndex, setDraggedIndex] = useState<number | null>(null);
  const [dragOverIndex, setDragOverIndex] = useState<number | null>(null);
  
  const [editingSection, setEditingSection] = useState<Section | null>(null);
  const [styleConfigInput, setStyleConfigInput] = useState<string>('');
  const [savingStyle, setSavingStyle] = useState(false);

  useEffect(() => {
    fetchSections();
  }, []);

  const fetchSections = async () => {
    try {
      const res = await fetch('/api/admin/sections');
      const data = await res.json();
      setSections(data);
    } catch (error) {
      console.error('Failed to fetch sections:', error);
    } finally {
      setLoading(false);
    }
  };

  const toggleVisibility = async (id: string, currentVisible: boolean) => {
    setTogglingId(id);
    try {
      const res = await fetch(`/api/admin/sections/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ is_visible: !currentVisible }),
      });
      if (!res.ok) throw new Error('Failed to toggle visibility');
      setSections(prev =>
        prev.map(s => s.id === id ? { ...s, is_visible: !currentVisible } : s)
      );
    } catch (error) {
      console.error('Failed to toggle visibility:', error);
    } finally {
      setTogglingId(null);
    }
  };

  const saveStyleConfig = async () => {
     if(!editingSection) return;
     setSavingStyle(true);
     try {
         let parsedConfig = {};
         if (styleConfigInput.trim()) {
            parsedConfig = JSON.parse(styleConfigInput);
         }
         const res = await fetch(`/api/admin/sections/${editingSection.id}`, {
             method: 'PUT',
             headers: { 'Content-Type': 'application/json' },
             body: JSON.stringify({ style_config: parsedConfig })
         });
         
         if(!res.ok) throw new Error("Failed to save styles");
         
         setSections(prev => prev.map(s => s.id === editingSection.id ? { ...s, style_config: parsedConfig } : s));
         setEditingSection(null);
     } catch(err) {
         alert("Invalid JSON format or server error.");
     } finally {
         setSavingStyle(false);
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
    const updated = [...sections];
    const [moved] = updated.splice(draggedIndex, 1);
    updated.splice(index, 0, moved);
    setSections(updated);
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
      const order = sections.map((s, i) => ({ id: s.id, display_order: i }));
      const res = await fetch('/api/admin/sections', {
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
          <h1 className="text-3xl font-bold tracking-tight">Homepage Sections</h1>
          <p className="text-muted-foreground mt-1">Manage the layout and styling of your main webpage.</p>
        </div>
        <div className="flex items-center gap-3">
          {orderChanged && (
            <Button onClick={saveOrder} disabled={savingOrder} variant="secondary">
              {savingOrder ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : <Save className="w-4 h-4 mr-2" />}
              Save Order
            </Button>
          )}
        </div>
      </div>

      {orderChanged && (
        <div className="mb-6 px-4 py-3 rounded-lg bg-amber-50 border border-amber-200 text-amber-800 text-sm font-medium">
          You have unsaved ordering changes. Click "Save Order" to persist.
        </div>
      )}

      {sections.length === 0 ? (
        <div className="text-center p-12 border rounded-xl bg-muted/50">
           <p className="text-muted-foreground">No sections loaded. Make sure you seeded the database.</p>
        </div>
      ) : (
        <div className="flex flex-col gap-3">
          {sections.map((section, index) => (
            <div
              key={section.id}
              draggable
              onDragStart={() => handleDragStart(index)}
              onDragOver={(e) => handleDragOver(e, index)}
              onDrop={() => handleDrop(index)}
              onDragEnd={handleDragEnd}
              className={`transition-all duration-200 ${draggedIndex === index ? 'opacity-40 scale-[0.98]' : ''} ${dragOverIndex === index ? 'translate-y-1' : ''}`}
            >
              <Card className={`transition-all duration-200 ${!section.is_visible ? 'opacity-50 border-dashed' : ''}`}>
                <div className="flex items-center gap-4 p-5">
                  <div className="cursor-grab active:cursor-grabbing text-muted-foreground shrink-0"><GripVertical className="w-5 h-5" /></div>
                  <div className="flex-1 min-w-0 flex items-center gap-3">
                    <h3 className="font-semibold text-base">{section.section_name}</h3>
                    {!section.is_visible && <span className="text-[10px] uppercase bg-muted px-2 py-0.5 rounded">Hidden</span>}
                  </div>
                  <div className="flex items-center gap-2 shrink-0">
                    <Button variant="ghost" size="icon" disabled={togglingId === section.id} onClick={() => toggleVisibility(section.id, section.is_visible)}>
                      {togglingId === section.id ? <Loader2 className="w-4 h-4 animate-spin" /> : section.is_visible ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
                    </Button>
                    <Dialog open={editingSection?.id === section.id} onOpenChange={(val) => {
                        if(val) {
                           setEditingSection(section);
                           setStyleConfigInput(JSON.stringify(section.style_config || {}, null, 2));
                        } else {
                           setEditingSection(null);
                        }
                    }}>
                      <DialogTrigger render={<Button variant="ghost" size="icon" />}>
                         <Edit className="w-4 h-4" />
                      </DialogTrigger>
                      <DialogContent>
                         <DialogHeader>
                            <DialogTitle>Edit Styles: {section.section_name}</DialogTitle>
                            <DialogDescription>Modify the style configuration (JSON) for this section.</DialogDescription>
                         </DialogHeader>
                         <div className="py-4 space-y-4">
                             <div className="space-y-2">
                                 <Label>Style JSON Payload</Label>
                                 <Textarea className="font-mono text-xs" rows={10} value={styleConfigInput} onChange={(e) => setStyleConfigInput(e.target.value)} />
                             </div>
                             <div className="flex justify-end gap-2">
                                 <Button variant="outline" onClick={() => setEditingSection(null)}>Cancel</Button>
                                 <Button onClick={saveStyleConfig} disabled={savingStyle}>{savingStyle ? 'Saving...' : 'Save Styles'}</Button>
                             </div>
                         </div>
                      </DialogContent>
                    </Dialog>
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
