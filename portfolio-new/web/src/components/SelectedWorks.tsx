"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import Link from "next/link";
import { supabase } from "@/lib/supabase";

const EASE_OUT_EXPO = [0.16, 1, 0.3, 1] as const;

interface Project {
  slug: string;
  title: string;
  category: string;
  hero?: {
    shortDescription?: string;
    tools?: string;
  };
}

export function SelectedWorks() {
  const [projects, setProjects] = useState<Project[]>([]);

  useEffect(() => {
    const fetchProjects = async () => {
      const { data } = await supabase
        .from("projects")
        .select("slug, title, category, hero")
        .eq("visible", true)
        .order("display_order", { ascending: true });
      if (data) setProjects(data);
    };
    fetchProjects();
  }, []);

  if (projects.length === 0) return null;

  return (
    <section className="py-24 md:py-32 container mx-auto max-w-7xl px-6">
      <div className="flex justify-between items-end mb-16 md:mb-24">
        <motion.h2
          className="text-display-sm font-semibold tracking-tight"
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: EASE_OUT_EXPO }}
        >
          Selected works
        </motion.h2>
        <Link
          href="/projects"
          className="hidden md:flex items-center text-sm font-bold uppercase tracking-widest group"
        >
          All Projects
          <span className="w-12 h-[1px] bg-black ml-4 group-hover:w-16 transition-all duration-300" />
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
        {projects.map((project, i) => (
          <motion.div
            key={project.slug}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.6, delay: i * 0.1, ease: EASE_OUT_EXPO }}
            className="h-full"
          >
            <Link href={`/projects/${project.slug}`} className="block h-full group">
              <article className="h-full border border-black/10 bg-white rounded-2xl overflow-hidden flex flex-col transition-all duration-500 hover:shadow-2xl hover:-translate-y-1">
                {/* Visual area */}
                <div className="aspect-[16/10] bg-white relative overflow-hidden group/visual">
                  <img 
                    src={`/assets/projects/project_abstract_${i % 3}.svg`} 
                    alt="Project preview" 
                    className="absolute inset-0 w-full h-full object-cover opacity-[0.08] group-hover:opacity-[0.15] transform transition-all duration-700 ease-out pointer-events-none group-hover:scale-105 group-hover:rotate-2 mix-blend-luminosity" 
                  />
                  {/* Layered grid pattern */}
                  <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808008_1px,transparent_1px),linear-gradient(to_bottom,#80808008_1px,transparent_1px)] bg-[size:20px_20px]" />
                  {/* Accent gradient blob */}
                  <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/3 w-[70%] aspect-square rounded-full bg-gradient-to-t from-black/[0.04] to-transparent blur-2xl group-hover:from-black/[0.08] transition-all duration-700" />
                  {/* Category badge floating */}
                  <div className="absolute top-5 left-5">
                    <span className="text-[12px] font-mono font-bold uppercase tracking-widest bg-black border border-white/10 px-4 py-2 rounded-full text-white">
                      {project.category}
                    </span>
                  </div>
                  {/* Title large in the visual area */}
                  <div className="absolute inset-0 flex items-end p-8 pb-6">
                    <h3 className="text-3xl md:text-4xl font-black tracking-tighter uppercase leading-[0.95] text-black/90 max-w-[90%]">
                      {project.title}
                    </h3>
                  </div>
                  {/* Arrow reveal */}
                  <div className="absolute top-5 right-5 w-10 h-10 rounded-full bg-black text-white flex items-center justify-center opacity-0 -translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300">
                    <ArrowUpRight className="w-4 h-4" />
                  </div>
                </div>

                {/* Info strip */}
                <div className="px-8 py-5 flex items-center justify-between border-t border-black/5">
                  <p className="text-sm text-neutral-500 line-clamp-1 flex-1 mr-4">
                    {project.hero?.shortDescription || "View case study"}
                  </p>
                  <div className="flex items-center gap-1.5 text-caption font-bold uppercase tracking-widest text-black/40 group-hover:text-black transition-colors shrink-0">
                    View
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </div>
                </div>
              </article>
            </Link>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
