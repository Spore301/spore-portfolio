import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

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

export function BlockRenderer({ blocks }: { blocks: ContentBlock[] }) {
  if (!blocks || blocks.length === 0) return null;

  return (
    <div className="flex flex-col gap-12 my-16">
      {blocks.map((block) => {
        if (block.type === 'text') {
          switch (block.style) {
            case 'h2':
              return <h2 key={block.id} className="text-3xl md:text-4xl font-semibold tracking-tight">{block.text}</h2>;
            case 'h3':
              return <h3 key={block.id} className="text-2xl md:text-3xl font-medium tracking-tight mt-4">{block.text}</h3>;
            case 'quote':
              return (
                <blockquote key={block.id} className="pl-6 border-l-2 border-black text-xl md:text-2xl font-medium text-gray-600 italic my-8">
                  "{block.text}"
                </blockquote>
              );
            case 'normal':
            default:
              return (
                <p key={block.id} className="text-lg text-gray-600 leading-relaxed whitespace-pre-wrap">
                  {block.text}
                </p>
              );
          }
        }

        if (block.type === 'media') {
          // If it's a video vs image, we could do more complex checking. 
          // Assuming images for now.
          return (
            <div key={block.id} className="w-full relative rounded-2xl overflow-hidden bg-gray-100 my-8">
              <img 
                src={block.url} 
                alt={block.alt || 'Media content'} 
                className="w-full h-auto max-h-[80vh] object-cover"
                loading="lazy"
              />
              {block.alt && (
                 <p className="text-sm text-center text-gray-500 mt-4">{block.alt}</p>
              )}
            </div>
          );
        }

        if (block.type === 'cta') {
          return (
            <div key={block.id} className="my-8">
              <Link 
                href={block.link || '#'} 
                target={block.link?.startsWith('http') ? '_blank' : undefined}
                className="inline-flex items-center space-x-3 bg-black text-white rounded-full px-8 py-4 text-lg font-medium hover:bg-black/80 transition-colors group"
              >
                <span>{block.label}</span>
                <ArrowUpRight className="w-5 h-5 group-hover:-translate-y-1 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          );
        }

        return null;
      })}
    </div>
  );
}
