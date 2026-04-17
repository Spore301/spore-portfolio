import { getProjects, ProjectData } from "@/lib/data/projects";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

export default async function Projects() {
    const projectsData = await getProjects();

    return (
        <div className="container mx-auto px-6 max-w-7xl pt-8 pb-24">
            <div className="flex flex-col lg:flex-row justify-between items-start lg:items-end mb-16 md:mb-24 gap-8 animate-in fade-in slide-in-from-bottom-8 duration-700">
                <div className="max-w-xl">
                    <div className="inline-flex items-center px-4 py-1.5 rounded-full border border-gray-300 text-xs font-mono uppercase tracking-widest font-medium mb-6">
                        Portfolio
                    </div>
                    <h1 className="text-display-sm font-semibold tracking-tight leading-tight">
                        A curated selection of my digital product designs
                    </h1>
                </div>
                <p className="text-gray-500 max-w-md text-base leading-relaxed pb-2">
                    Explore my latest projects spanning UI/UX design, technical prototyping, and comprehensive product strategy.
                </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
                {projectsData.map((project, i) => (
                    <div
                        key={project.slug}
                        className="h-full animate-in fade-in slide-in-from-bottom-4 duration-700 fill-mode-both" 
                        style={{ animationDelay: `${i * 100}ms` }}
                    >
                        <Link href={`/projects/${project.slug}`} className="block h-full group">
                            <article className="h-full border border-black/10 bg-white rounded-2xl overflow-hidden flex flex-col transition-all duration-500 hover:shadow-2xl hover:-translate-y-1">
                                {/* Visual area */}
                                <div className="aspect-[16/10] bg-neutral-50 relative overflow-hidden">
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
                                    <div className="flex items-center gap-1.5 text-[10px] md:text-sm font-bold uppercase tracking-widest text-black/40 group-hover:text-black transition-colors shrink-0">
                                        View
                                        <ArrowUpRight className="w-3.5 h-3.5" />
                                    </div>
                                </div>
                            </article>
                        </Link>
                    </div>
                ))}
            </div>
        </div>
    );
}
