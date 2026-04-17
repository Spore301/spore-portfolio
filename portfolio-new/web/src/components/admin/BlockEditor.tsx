"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { GripVertical, Trash2, Plus, Image as ImageIcon, Type, Link as LinkIcon, ArrowUp, ArrowDown } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export type BlockType = 'text' | 'media' | 'cta';

export interface BaseBlock {
  id: string;
  type: BlockType;
}

export interface TextBlock extends BaseBlock {
  type: 'text';
  text: string;
  style: 'normal' | 'h2' | 'h3' | 'quote';
}

export interface MediaBlock extends BaseBlock {
  type: 'media';
  url: string;
  alt: string;
}

export interface CtaBlock extends BaseBlock {
  type: 'cta';
  label: string;
  link: string;
}

export type ContentBlock = TextBlock | MediaBlock | CtaBlock;

interface BlockEditorProps {
  blocks: ContentBlock[];
  onChange: (blocks: ContentBlock[]) => void;
}

export function BlockEditor({ blocks = [], onChange }: BlockEditorProps) {
  const [draggedIndex, setDraggedIndex] = useState<number | null>(null);

  const addBlock = (type: BlockType) => {
    const newId = Math.random().toString(36).substring(2, 9);
    let newBlock: ContentBlock;
    
    if (type === 'text') {
      newBlock = { id: newId, type: 'text', text: '', style: 'normal' };
    } else if (type === 'media') {
      newBlock = { id: newId, type: 'media', url: '', alt: '' };
    } else {
      newBlock = { id: newId, type: 'cta', label: '', link: '' };
    }

    onChange([...blocks, newBlock]);
  };

  const updateBlock = (id: string, updates: Partial<ContentBlock>) => {
    onChange(blocks.map(b => b.id === id ? { ...b, ...updates } as ContentBlock : b));
  };

  const removeBlock = (id: string) => {
    onChange(blocks.filter(b => b.id !== id));
  };

  const moveBlock = (index: number, direction: 'up' | 'down') => {
    if (direction === 'up' && index === 0) return;
    if (direction === 'down' && index === blocks.length - 1) return;

    const newBlocks = [...blocks];
    const targetIndex = direction === 'up' ? index - 1 : index + 1;
    [newBlocks[index], newBlocks[targetIndex]] = [newBlocks[targetIndex], newBlocks[index]];
    onChange(newBlocks);
  };

  const handleDragStart = (index: number) => {
    setDraggedIndex(index);
  };

  const handleDragOver = (e: React.DragEvent, index: number) => {
    e.preventDefault();
  };

  const handleDrop = (index: number) => {
    if (draggedIndex === null || draggedIndex === index) return;
    const newBlocks = [...blocks];
    const [moved] = newBlocks.splice(draggedIndex, 1);
    newBlocks.splice(index, 0, moved);
    onChange(newBlocks);
    setDraggedIndex(null);
  };

  const renderBlockEditor = (block: ContentBlock) => {
    if (block.type === 'text') {
      return (
        <div className="space-y-3">
          <div className="flex gap-4">
            <div className="flex-1 space-y-1">
              <Label className="text-xs text-muted-foreground">Content</Label>
              <Textarea 
                value={block.text} 
                onChange={(e) => updateBlock(block.id, { text: e.target.value })}
                placeholder="Write your text here..."
                rows={4}
              />
            </div>
            <div className="w-48 space-y-1">
              <Label className="text-xs text-muted-foreground">Style</Label>
              <Select value={block.style} onValueChange={(val: any) => updateBlock(block.id, { style: val })}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="normal">Normal Body</SelectItem>
                  <SelectItem value="h2">Heading 2</SelectItem>
                  <SelectItem value="h3">Heading 3</SelectItem>
                  <SelectItem value="quote">Blockquote</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>
      );
    }

    if (block.type === 'media') {
      return (
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-1">
            <Label className="text-xs text-muted-foreground">Image/Video URL</Label>
            <Input 
              value={block.url} 
              onChange={(e) => updateBlock(block.id, { url: e.target.value })}
              placeholder="https://..."
            />
          </div>
          <div className="space-y-1">
            <Label className="text-xs text-muted-foreground">Alt Text / Caption</Label>
            <Input 
              value={block.alt} 
              onChange={(e) => updateBlock(block.id, { alt: e.target.value })}
              placeholder="Describe the media..."
            />
          </div>
        </div>
      );
    }

    if (block.type === 'cta') {
      return (
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-1">
            <Label className="text-xs text-muted-foreground">Button Label</Label>
            <Input 
              value={block.label} 
              onChange={(e) => updateBlock(block.id, { label: e.target.value })}
              placeholder="e.g., Read More"
            />
          </div>
          <div className="space-y-1">
            <Label className="text-xs text-muted-foreground">Target URL</Label>
            <Input 
              value={block.link} 
              onChange={(e) => updateBlock(block.id, { link: e.target.value })}
              placeholder="https://..."
            />
          </div>
        </div>
      );
    }

    return null;
  };

  return (
    <div className="space-y-4">
      {blocks.length === 0 ? (
        <div className="p-8 border-2 border-dashed rounded-lg text-center bg-gray-50">
          <p className="text-sm text-gray-500 mb-4">No content blocks yet. Add one to get started.</p>
        </div>
      ) : (
        <div className="space-y-4">
          {blocks.map((block, index) => (
            <div
              key={block.id}
              draggable
              onDragStart={() => handleDragStart(index)}
              onDragOver={(e) => handleDragOver(e, index)}
              onDrop={() => handleDrop(index)}
            >
              <Card className={`transition-all ${draggedIndex === index ? 'opacity-50 border-primary' : ''}`}>
                <div className="flex">
                  <div className="flex flex-col items-center justify-center p-2 border-r bg-gray-50 text-gray-400 cursor-grab active:cursor-grabbing">
                    <GripVertical className="w-5 h-5" />
                  </div>
                  <div className="flex-1 p-4">
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center gap-2 text-sm font-medium uppercase tracking-wider text-gray-500">
                        {block.type === 'text' && <Type className="w-4 h-4" />}
                        {block.type === 'media' && <ImageIcon className="w-4 h-4" />}
                        {block.type === 'cta' && <LinkIcon className="w-4 h-4" />}
                        {block.type} Block
                      </div>
                      <div className="flex items-center gap-1">
                        <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => moveBlock(index, 'up')} disabled={index === 0}>
                          <ArrowUp className="w-4 h-4" />
                        </Button>
                        <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => moveBlock(index, 'down')} disabled={index === blocks.length - 1}>
                          <ArrowDown className="w-4 h-4" />
                        </Button>
                        <div className="w-px h-4 bg-gray-200 mx-1"></div>
                        <Button variant="ghost" size="icon" className="h-8 w-8 text-red-500 hover:text-red-600 hover:bg-red-50" onClick={() => removeBlock(block.id)}>
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                    {renderBlockEditor(block)}
                  </div>
                </div>
              </Card>
            </div>
          ))}
        </div>
      )}

      <div className="flex items-center justify-center gap-2 p-4 border rounded-lg bg-gray-50">
        <span className="text-sm font-medium text-gray-500 mr-2">Add new:</span>
        <Button type="button" variant="outline" size="sm" onClick={() => addBlock('text')}>
          <Type className="w-4 h-4 mr-2" /> Text
        </Button>
        <Button type="button" variant="outline" size="sm" onClick={() => addBlock('media')}>
          <ImageIcon className="w-4 h-4 mr-2" /> Media
        </Button>
        <Button type="button" variant="outline" size="sm" onClick={() => addBlock('cta')}>
          <LinkIcon className="w-4 h-4 mr-2" /> CTA Button
        </Button>
      </div>
    </div>
  );
}
