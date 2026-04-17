import { getProjectBySlug, getNextProject, getProjects } from "@/lib/data/projects";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowRight, ArrowUpRight, Github, ExternalLink, FileText, ArrowLeft } from "lucide-react";
import { MetricChart } from "@/components/ui/metric-chart";
import { BlockRenderer } from "@/components/BlockRenderer";

export async function generateStaticParams() {
  const projects = await getProjects();
  return projects.map((project) => ({
    slug: project.slug,
  }));
}

// Helper components for dashboard UI
function DashboardWidget({ title, value, icon, span = 1 }: { title: string; value?: string; icon?: React.ReactNode; span?: number }) {
    if (!value) return null;
    const colSpan = span === 2 ? "col-span-2" : "col-span-1";
    return (
        <div className={`bg-white border border-neutral-200 rounded-2xl p-6 flex flex-col justify-between shadow-sm ${colSpan}`}>
            <h3 className="text-xs font-bold uppercase tracking-widest text-neutral-500 mb-4 flex items-center gap-2">
                {icon} {title}
            </h3>
            <p className="font-mono text-sm font-medium text-black line-clamp-3" title={value}>{value}</p>
        </div>
    );
}

function DashboardCard({ title, children, className = "", spanClass = "lg:col-span-12" }: { title: string; children: React.ReactNode; className?: string; spanClass?: string }) {
    return (
        <div className={`${spanClass} border border-neutral-200 rounded-2xl p-8 shadow-sm ${className}`}>
           <h3 className="text-xs font-bold uppercase tracking-widest opacity-70 mb-8 pb-4 border-b border-inherit bg-clip-border text-inherit">{title}</h3>
           {children}
        </div>
    );
}

// Reusable Bar Chart Graphic Simulator
function BarChartSimulator() {
    return (
        <div className="h-20 flex items-end justify-between gap-1 w-full mt-6">
            {[...Array(15)].map((_, idx) => {
                 const height = Math.max(20, Math.random() * 100);
                 const opacity = (idx / 15) * 0.6 + 0.4;
                 return (
                    <div 
                        key={idx} 
                        className="w-full bg-emerald-500 rounded-t-sm transition-all duration-500"
                        style={{ height: `${height}%`, opacity }}
                    ></div>
                 );
            })}
        </div>
    );
}

export default async function ProjectPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const resolvedParams = await params;
  const project = await getProjectBySlug(resolvedParams.slug);

  if (!project) {
    notFound();
  }

  const nextProject = await getNextProject(resolvedParams.slug);

  return (
    <article className="min-h-screen bg-[#fafafa] text-black">
        {/* Top Navigation Bar Mimicking Dashboard Header */}
        <div className="border-b border-neutral-200 bg-white sticky top-0 z-40 shadow-sm">
            <div className="container mx-auto px-6 py-4 flex items-center justify-between max-w-[1400px]">
                <div className="flex items-center gap-4 text-sm font-bold tracking-widest uppercase">
                    <Link href="/projects" className="text-neutral-500 hover:text-black transition-colors flex items-center gap-2">
                        <ArrowLeft className="w-4 h-4" /> Back to Projects
                    </Link>
                </div>
                <div className="flex items-center gap-3">
                     <span className="text-xs font-bold uppercase tracking-widest text-neutral-400 hidden sm:block">Status</span>
                     <div className="text-xs font-mono uppercase bg-emerald-50 border border-emerald-200 text-emerald-600 px-3 py-1.5 rounded-full flex items-center gap-2">
                         <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></div>
                         Completed
                     </div>
                </div>
            </div>
        </div>

        <div className="container mx-auto px-6 pt-12 max-w-[1400px] mb-24">
            
            {/* Header Bento Layer */}
            <header className="grid grid-cols-1 lg:grid-cols-12 gap-6 mb-6">
                <div className="lg:col-span-8 bg-white border border-neutral-200 rounded-2xl p-8 md:p-12 flex flex-col min-h-[400px] shadow-sm relative overflow-hidden">
                    <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none"></div>

                    <div className="relative z-10 max-w-3xl flex-1 flex flex-col">
                        <div className="w-fit mb-8">
                             <span className="text-xs font-mono uppercase bg-black text-white px-3 py-1.5 rounded-md inline-block">
                                 {project.category}
                             </span>
                        </div>
                        <h1 className="text-5xl md:text-7xl lg:text-8xl font-black tracking-tighter uppercase mb-6 leading-[0.9]">
                            {project.title}
                        </h1>
                        <p className="text-xl md:text-2xl text-neutral-600 font-medium leading-relaxed max-w-2xl mt-auto">
                            {project.hero.shortDescription}
                        </p>
                    </div>
                </div>

                {/* Meta Widgets */}
                <div className="lg:col-span-4 grid grid-cols-2 gap-6 h-full">
                    <DashboardWidget title="Role" value={project.hero.role} icon={<div className="w-2 h-2 rounded-full bg-blue-500" />} />
                    <DashboardWidget title="Duration" value={project.hero.duration} icon={<div className="w-2 h-2 rounded-full bg-amber-500" />} />
                    <DashboardWidget title="Tools" value={project.hero.tools} span={2} icon={<div className="w-2 h-2 rounded-full bg-violet-500" />} />
                    <DashboardWidget title="Context" value={project.hero.context} span={2} icon={<div className="w-2 h-2 rounded-full bg-rose-500" />} />
                </div>
            </header>

            {/* Problem & Solution Bento Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 mb-6">
                {project.problem.context && (
                    <DashboardCard title="The Problem" spanClass={project.idea.description ? "lg:col-span-6" : "lg:col-span-12"} className="bg-white">
                        <p className="text-xl md:text-2xl font-medium leading-relaxed mb-8 text-black">
                            {project.problem.context}
                        </p>
                        {project.problem.painPoints.length > 0 && (
                            <div className="space-y-4">
                                {project.problem.painPoints.map((point, i) => (
                                    <div key={i} className="flex gap-4 items-start p-4 bg-neutral-50 border border-neutral-100 rounded-xl">
                                        <span className="text-neutral-400 font-mono text-sm shrink-0 mt-0.5">0{i + 1}</span>
                                        <span className="font-medium text-neutral-800">{point}</span>
                                    </div>
                                ))}
                            </div>
                        )}
                    </DashboardCard>
                )}

                {project.idea.description && (
                    <DashboardCard title="The Solution" spanClass={project.problem.context ? "lg:col-span-6" : "lg:col-span-12"} className="bg-black text-white border-black relative overflow-hidden">
                        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-white/[0.03] rounded-full blur-[80px] -translate-y-1/2 translate-x-1/3 pointer-events-none"></div>
                        <p className="text-xl md:text-2xl font-medium leading-relaxed text-neutral-300 relative z-10">
                            {project.idea.description}
                        </p>
                    </DashboardCard>
                )}
            </div>

            {/* Impact Metrics Visualizers */}
            {project.impact.metrics.length > 0 && (
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
                    {project.impact.metrics.map((metric, i) => (
                        <div key={i} className="bg-white border border-neutral-200 rounded-2xl p-8 flex flex-col justify-between shadow-sm group hover:border-[#89CFF0] transition-colors">
                            <div>
                                <h3 className="text-xs font-bold uppercase tracking-widest text-neutral-400 mb-4 flex items-center justify-between">
                                    {metric.label}
                                    <ArrowUpRight className="w-4 h-4 text-[#89CFF0] opacity-0 group-hover:opacity-100 transition-opacity" />
                                </h3>
                                <div className="text-5xl md:text-6xl font-black tracking-tighter mb-2">{metric.value}</div>
                                {metric.subValue && <div className="text-sky-700 font-mono text-xs bg-sky-50 border border-sky-100 inline-block px-2 py-1 rounded-md">{metric.subValue}</div>}
                            </div>
                            
                            <MetricChart seed={i + 1} />
                        </div>
                    ))}
                </div>
            )}

            {/* System Architecture Schematic */}
            {project.architecture.input && (
                <div className="bg-white border border-neutral-200 rounded-2xl p-8 md:p-12 mb-6 shadow-sm">
                    <h3 className="text-xs font-bold uppercase tracking-widest text-neutral-400 mb-12 pb-4 border-b border-neutral-100">Architecture Schematic</h3>
                    
                    <div className="flex flex-col lg:flex-row items-center justify-between gap-12 relative px-4 md:px-12">
                        {/* Connecting Line (Desktop) */}
                        <div className="hidden lg:block absolute top-[64px] left-[15%] right-[15%] h-px border-t border-dashed border-neutral-300 z-0"></div>

                        {/* Input Node */}
                        <div className="relative z-10 bg-white w-full lg:w-auto flex flex-col items-center">
                            <div className="w-32 h-32 rounded-2xl border border-neutral-300 flex flex-col items-center justify-center mb-6 bg-neutral-50 shadow-sm relative">
                                <span className="font-mono text-[10px] uppercase text-neutral-400 mb-2">Source</span>
                                <span className="font-bold tracking-tight">Input</span>
                            </div>
                            <p className="font-mono text-xs bg-white border border-neutral-200 px-4 py-3 rounded-xl max-w-[220px] text-center shadow-sm text-neutral-600">
                                {project.architecture.input}
                            </p>
                        </div>

                        {/* Processing Node */}
                        <div className="relative z-10 bg-white w-full lg:w-auto flex flex-col items-center">
                            <div className="w-32 h-32 rounded-2xl border-2 border-sky-200 bg-sky-50 text-sky-600 flex flex-col items-center justify-center mb-6 shadow-xl shadow-sky-200/20">
                                <span className="font-mono text-[10px] uppercase text-sky-400 mb-2">Engine</span>
                                <span className="font-bold tracking-tight">Processing</span>
                            </div>
                            <div className="flex flex-col gap-2 max-w-[240px] w-full text-center">
                                {project.architecture.processing.map((proc, i) => (
                                    <span key={i} className="font-mono text-xs bg-neutral-900 text-white px-4 py-3 rounded-xl shadow-sm text-left flex gap-2 w-full">
                                        <span className="text-neutral-500 shrink-0">{i + 1}_</span>
                                        <span>{proc}</span>
                                    </span>
                                ))}
                            </div>
                        </div>

                        {/* Output Node */}
                        <div className="relative z-10 bg-white w-full lg:w-auto flex flex-col items-center">
                            <div className="w-32 h-32 rounded-2xl border-2 border-black bg-black text-white flex flex-col items-center justify-center mb-6 shadow-xl relative">
                                <span className="font-mono text-[10px] uppercase text-neutral-400 mb-2">Target</span>
                                <span className="font-bold tracking-tight">Output</span>
                            </div>
                            <div className="flex flex-col gap-2 max-w-[220px] w-full text-center">
                                {project.architecture.output.map((out, i) => (
                                    <span key={i} className="font-mono text-xs bg-sky-50/50 border border-sky-100 text-sky-800 px-4 py-3 rounded-xl shadow-sm">
                                        {out}
                                    </span>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* Bottom Details Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 mb-12">
                
                {/* Strategic Decisions & Learnings */}
                {(project.designDecisions.decisions.length > 0 || project.learnings.length > 0) && (
                    <div className="lg:col-span-8 space-y-6">
                        {project.designDecisions.decisions.length > 0 && (
                            <DashboardCard title="Design Decisions" className="bg-white">
                                <ol className="space-y-8">
                                    {project.designDecisions.decisions.map((decision, i) => (
                                        <li key={i} className="pl-6 border-l-2 border-black relative">
                                            <div className="absolute -left-[5px] top-2 w-2 h-2 rounded-full bg-black"></div>
                                            <h3 className="text-lg font-bold mb-2 tracking-tight">{decision.title}</h3>
                                            {decision.description && (
                                                <p className="text-neutral-600 font-medium text-sm leading-relaxed">{decision.description}</p>
                                            )}
                                        </li>
                                    ))}
                                </ol>
                            </DashboardCard>
                        )}

                        {project.learnings.length > 0 && (
                            <DashboardCard title="Key Learnings" className="bg-white">
                                <ul className="space-y-3">
                                    {project.learnings.map((learning, i) => (
                                        <li key={i} className="flex gap-4 items-start bg-neutral-50 px-5 py-4 border border-neutral-100 rounded-xl">
                                            <div className="w-5 h-5 rounded-full bg-black text-white flex items-center justify-center shrink-0 mt-0.5 text-xs">✓</div>
                                            <span className="text-neutral-800 font-medium text-sm leading-relaxed">{learning}</span>
                                        </li>
                                    ))}
                                </ul>
                            </DashboardCard>
                        )}
                    </div>
                )}

                {/* Sidebar: Resources & Future Integrations */}
                <div className="lg:col-span-4 space-y-6">
                    {(project.prototype.githubLink || project.prototype.demoLink || project.prototype.architectureLink) && (
                        <div className="bg-black text-white rounded-2xl p-8 shadow-sm">
                            <h3 className="text-xs font-bold uppercase tracking-widest text-neutral-400 mb-8 pb-4 border-b border-white/10">Resources</h3>
                            <div className="flex flex-col gap-4">
                                {project.prototype.githubLink && (
                                    <a href={project.prototype.githubLink} target="_blank" rel="noopener noreferrer" className="flex items-center justify-between p-5 bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl transition-all duration-300 group">
                                        <div className="flex flex-col">
                                            <span className="font-bold tracking-tight mb-1 flex items-center gap-2"><Github className="w-4 h-4"/> GitHub Repo</span>
                                            <span className="text-xs text-neutral-400 font-mono">Source code</span>
                                        </div>
                                        <ArrowUpRight className="w-5 h-5 text-neutral-500 group-hover:text-white transition-colors" />
                                    </a>
                                )}
                                {project.prototype.demoLink && (
                                    <a href={project.prototype.demoLink} target="_blank" rel="noopener noreferrer" className="flex items-center justify-between p-5 bg-emerald-500/20 hover:bg-emerald-500/30 border border-emerald-500/40 rounded-xl transition-all duration-300 group">
                                        <div className="flex flex-col">
                                            <span className="font-bold tracking-tight mb-1 text-emerald-400 flex items-center gap-2"><ExternalLink className="w-4 h-4"/> Live Demo</span>
                                            <span className="text-xs text-emerald-500/70 font-mono">Production</span>
                                        </div>
                                        <ArrowUpRight className="w-5 h-5 text-emerald-400 group-hover:text-emerald-300 transition-colors" />
                                    </a>
                                )}
                                {project.prototype.architectureLink && (
                                    <a href={project.prototype.architectureLink} target="_blank" rel="noopener noreferrer" className="flex items-center justify-between p-5 bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl transition-all duration-300 group">
                                        <div className="flex flex-col">
                                            <span className="font-bold tracking-tight mb-1 flex items-center gap-2"><FileText className="w-4 h-4"/> Architecture</span>
                                            <span className="text-xs text-neutral-400 font-mono">System docs</span>
                                        </div>
                                        <ArrowUpRight className="w-5 h-5 text-neutral-500 group-hover:text-white transition-colors" />
                                    </a>
                                )}
                            </div>
                        </div>
                    )}

                    {project.nextSteps.length > 0 && (
                        <div className="bg-white border border-neutral-200 rounded-2xl p-8 shadow-sm">
                            <h3 className="text-xs font-bold uppercase tracking-widest text-neutral-400 mb-8 pb-4 border-b border-neutral-100">Future Iterations</h3>
                            <div className="space-y-3">
                                {project.nextSteps.map((step, i) => (
                                    <div key={i} className="px-4 py-3 bg-neutral-100 border border-neutral-200 text-neutral-600 rounded-lg text-sm font-mono font-medium" title={step}>
                                        <span className="text-neutral-400 mr-2">→</span> {step}
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            </div>

            {/* Interface Visuals Dashboard Screen */}
            {(project.interface.heroImage || project.interface.sitemapImage || project.interface.flowImage) && (
                <div className="bg-white border border-neutral-200 p-8 md:p-12 rounded-2xl w-full shadow-sm">
                    <h3 className="text-xs font-bold uppercase tracking-widest text-neutral-400 mb-8 pb-4 border-b border-neutral-100">Interface Previews</h3>
                    
                    <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
                        {project.interface.heroImage && (
                            <div className="md:col-span-12 w-full aspect-[16/9] md:aspect-[21/9] bg-neutral-100 border border-neutral-200 rounded-xl flex items-center justify-center overflow-hidden">
                                <span className="text-neutral-400 font-mono text-xs font-bold tracking-widest">[PRIMARY_VIEWPORT]</span>
                            </div>
                        )}

                        {(project.interface.sitemapImage || project.interface.flowImage) && (
                            <>
                                <div className="md:col-span-6 w-full aspect-[4/3] bg-neutral-100 border border-neutral-200 rounded-xl flex items-center justify-center overflow-hidden">
                                    <span className="text-neutral-400 font-mono text-xs font-bold tracking-widest">[SECONDARY_PANEL_1]</span>
                                </div>
                                <div className="md:col-span-6 w-full aspect-[4/3] bg-neutral-100 border border-neutral-200 rounded-xl flex items-center justify-center overflow-hidden">
                                    <span className="text-neutral-400 font-mono text-xs font-bold tracking-widest">[SECONDARY_PANEL_2]</span>
                                </div>
                            </>
                        )}
                    </div>
                </div>
            )}

            {/* Dynamic Content Blocks */}
            {project.contentBlocks && project.contentBlocks.length > 0 && (
                <div className="mt-12">
                    <BlockRenderer blocks={project.contentBlocks} />
                </div>
            )}
        </div>

        {/* Next Project Brutalist Nav Footer */}
        {nextProject && (
            <div className="bg-black text-white relative overflow-hidden group">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.05)_0%,transparent_100%)] pointer-events-none"></div>
                
                <Link href={`/projects/${nextProject.slug}`} className="block container mx-auto px-6 py-24 md:py-32 max-w-[1400px] relative z-10 transition-colors duration-500">
                    <div className="flex flex-col md:flex-row md:items-end justify-between gap-12">
                        <div>
                            <span className="text-sm font-bold uppercase tracking-widest text-neutral-400 group-hover:text-emerald-400 mb-8 block transition-colors">Up Next</span>
                            <h2 className="text-5xl md:text-7xl lg:text-[8rem] font-black tracking-tighter uppercase leading-[0.9] group-hover:-translate-y-2 transition-transform duration-500 max-w-4xl">
                                {nextProject.title}
                            </h2>
                        </div>
                        <div className="shrink-0 relative w-16 h-16 md:w-28 md:h-28 hidden md:flex items-center justify-center">
                            <div className="absolute inset-0 border border-white/20 rounded-full group-hover:scale-110 group-hover:border-emerald-400 transition-all duration-500"></div>
                            <ArrowRight className="w-8 h-8 md:w-12 md:h-12 text-white group-hover:text-emerald-400 group-hover:translate-x-4 transition-all duration-500" />
                        </div>
                    </div>
                </Link>
            </div>
        )}
    </article>
  );
}
