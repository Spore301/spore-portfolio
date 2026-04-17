"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { supabase } from "@/lib/supabase";

const EASE_OUT_EXPO = [0.16, 1, 0.3, 1] as const;

interface Testimonial {
  id: string;
  author_name: string;
  author_role: string;
  content: string;
  avatar_url?: string;
}

export function Testimonials() {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(0);

  useEffect(() => {
    async function fetchTestimonials() {
      const { data, error } = await supabase
        .from("testimonials")
        .select("*")
        .eq("visible", true)
        .order("display_order", { ascending: true });

      if (data) {
        setTestimonials(data);
      } else if (error) {
        console.error("Failed to load testimonials", error);
      }
      setLoading(false);
    }

    fetchTestimonials();
  }, []);

  if (loading) return null;

  if (testimonials.length === 0) return null;

  const itemsPerPage = 3;
  const totalPages = Math.ceil(testimonials.length / itemsPerPage);

  const handlePrev = () => setPage(p => (p > 0 ? p - 1 : totalPages - 1));
  const handleNext = () => setPage(p => (p < totalPages - 1 ? p + 1 : 0));

  const visibleTestimonials = testimonials.slice(page * itemsPerPage, (page + 1) * itemsPerPage);

  return (
    <section className="bg-section-muted py-24 md:py-32">
      <div className="container mx-auto max-w-7xl px-6">
        {/* Header */}
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-end mb-16 md:mb-24 gap-8">
          <div className="max-w-xl">
            <div className="inline-flex items-center px-4 py-1.5 rounded-full border border-gray-300 text-xs font-mono uppercase tracking-widest font-medium mb-6 bg-white/50">
              Testimonials
            </div>
            <h2 className="text-display-sm font-semibold tracking-tight leading-tight">
              What do my clients say?
            </h2>
          </div>
          <div className="flex flex-col lg:items-end gap-6">
            <p className="text-gray-500 max-w-md text-base leading-relaxed pb-2 lg:text-right">
              Hear from the people and teams I have collaborated with to create engaging digital experiences and drive impact.
            </p>
            {totalPages > 1 && (
              <div className="flex items-center gap-4">
                <button
                  onClick={handlePrev}
                  className="w-14 h-14 md:w-16 md:h-16 rounded-full border border-black flex items-center justify-center hover:bg-black hover:text-white transition-colors duration-300 cursor-pointer"
                  aria-label="Previous testimonial"
                >
                  <ArrowLeft className="w-6 h-6 md:w-7 md:h-7" />
                </button>
                <button
                  onClick={handleNext}
                  className="w-14 h-14 md:w-16 md:h-16 rounded-full bg-black text-white flex items-center justify-center hover:bg-black/80 transition-colors duration-300 cursor-pointer"
                  aria-label="Next testimonial"
                >
                  <ArrowRight className="w-6 h-6 md:w-7 md:h-7" />
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Testimonial Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-0 mt-12 md:mt-24 border-t border-black/10 pt-16">
          {visibleTestimonials.map((testimonial, i) => (
            <motion.div
              key={testimonial.id}
              className={`flex flex-col ${i > 0 ? 'border-l border-black/80' : ''} ${i === visibleTestimonials.length - 1 ? 'md:border-r border-black/80' : ''} px-8 md:px-12 py-8 md:py-0 min-h-[320px] justify-between`}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: i * 0.15, ease: EASE_OUT_EXPO }}
            >
              <div className="text-xl md:text-2xl font-black text-black tracking-tighter mb-8 md:mb-12">&ldquo;</div>
              <p className="text-lg md:text-xl font-medium leading-relaxed mb-12 flex-grow text-gray-900">
                {testimonial.content}
              </p>
              <div className="flex items-center gap-4 mt-auto group/avatar">
                <div className="w-12 h-12 rounded-full bg-gray-300 overflow-hidden flex-shrink-0 transform transition-transform duration-500 ease-out group-hover/avatar:scale-110">
                  <img
                    src={testimonial.avatar_url || `https://i.pravatar.cc/150?u=${testimonial.author_name}`}
                    alt={testimonial.author_name}
                    className="w-full h-full object-cover grayscale opacity-80"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = `https://i.pravatar.cc/150?u=${testimonial.author_name}`;
                    }}
                  />
                </div>
                <div>
                  <h4 className="font-semibold text-black tracking-tight">{testimonial.author_name}</h4>
                  <p className="text-sm text-gray-500 font-medium">{testimonial.author_role}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
