"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useInView, animate } from "framer-motion";
import { ArrowRight, ArrowUpRight, Briefcase, Compass, LineChart, PenTool } from "lucide-react";
import { SelectedWorks } from "@/components/SelectedWorks";
import { Testimonials } from "@/components/Testimonials";
import { ContactSection } from "@/components/ContactSection";
import Link from "next/link";
import { Card, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";

// Animation constants from design system
const EASE_OUT_EXPO = [0.16, 1, 0.3, 1] as const;
const DURATION_SLOW = 0.8;
const DURATION_BASE = 0.6;

function Counter({ from, to }: { from: number; to: number }) {
  const nodeRef = useRef<HTMLSpanElement>(null);
  const inView = useInView(nodeRef, { once: true });

  useEffect(() => {
    if (inView) {
      const controls = animate(from, to, {
        duration: 2,
        onUpdate(value) {
          if (nodeRef.current) {
            nodeRef.current.textContent = Math.round(value).toString();
          }
        }
      });
      return () => controls.stop();
    }
  }, [from, to, inView]);

  return <span ref={nodeRef} />;
}

const fadeUp = {
  initial: { opacity: 0, y: 40 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: DURATION_SLOW, ease: EASE_OUT_EXPO }
};

const fadeIn = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: DURATION_SLOW, ease: EASE_OUT_EXPO }
};

const staggerContainer = {
  animate: {
    transition: { staggerChildren: 0.1 }
  }
};

export default function HomePageClient({ blogs }: { blogs: any[] }) {
  const currentSections = ["Hero", "Stats", "Tools", "Projects", "Services", "Experience", "Testimonials", "Contact", "Blogs"];

  const services = [
    {
      title: "Product Management",
      icon: <Briefcase className="w-8 h-8 mb-6 stroke-1 text-black group-hover:text-white transition-colors duration-300" />,
      desc: "Defining product vision, collaborating with cross-functional teams, and owning the end-to-end product lifecycle for digital experiences.",
      details: "As a Product Manager, I oversee the entire product lifecycle from ideation to launch. I collaborate closely with engineering, design, and marketing teams to ensure that we deliver products that solve real user problems while aligning with core business objectives. My process involves market research, roadmapping, backlog prioritization, and iterative testing to consistently elevate the digital experience."
    },
    {
      title: "Product Strategy",
      icon: <Compass className="w-8 h-8 mb-6 stroke-1 text-black group-hover:text-white transition-colors duration-300" />,
      desc: "Aligning user needs with business goals to build scalable products, identify automation opportunities, and drive measurable impact.",
      details: "Great products require a solid foundation. My product strategy methodology focuses on bridging the gap between user intent and business viability. I conduct in-depth competitive analyses, identify friction points in existing workflows, and pinpoint automation opportunities. By establishing clear KPIs and a long-term vision, I ensure that the product scales effectively and drives sustainable growth."
    },
    {
      title: "Business Analysis",
      icon: <LineChart className="w-8 h-8 mb-6 stroke-1 text-black group-hover:text-white transition-colors duration-300" />,
      desc: "Understanding complex workflows, identifying friction points, and mapping out efficient digital transformation initiatives.",
      details: "Through rigorous business analysis, I dissect complex organizational workflows to uncover inefficiencies and bottlenecks. I specialize in mapping out optimized processes, translating abstract business requirements into concrete technical specifications, and architecting digital systems that reduce manual overhead and improve operational efficiency."
    },
    {
      title: "UI/UX Design",
      icon: <PenTool className="w-8 h-8 mb-6 stroke-1 text-black group-hover:text-white transition-colors duration-300" />,
      desc: "Creating user-centric interfaces, evolving brand systems, and executing pixel-perfect implementation from wireframes to prototyping.",
      details: "I design intuitive, aesthetic, and accessible user interfaces. From low-fidelity wireframes to high-fidelity interactive prototypes, my UX process is deeply rooted in user research and behavioral psychology. I craft comprehensive design systems and ensure pixel-perfect execution, delivering experiences that are not only beautiful but also highly functional."
    }
  ];

  const experiences = [
    { role: "UI/UX Designer", org: "Abacus Digital", desc: "Designing user-centric interfaces for digital transformation platforms and translating complex workflows into scalable UI systems.", year: "2025 - Now" },
    { role: "AI Product Designer Intern", org: "ProCodeOne", desc: "Designed user workflows and interface concepts for AI-powered product prototypes and automation tools.", year: "2025" },
    { role: "UI/UX Designer", org: "Aurorabyte Technologies", desc: "Redesigned the company's digital interface and improved usability across its flagship application.", year: "2024 - 2025" },
    { role: "Freelance Designer", org: "Self-Employed", desc: "Delivered UI designs, marketing graphics, and branding materials for multiple clients internationally.", year: "2021 - Now" }
  ];

  const tools = [
    { name: "Figma", src: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/figma/figma-original.svg" },
    { name: "Adobe XD", src: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/xd/xd-plain.svg" },
    { name: "Photoshop", src: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/photoshop/photoshop-plain.svg" },
    { name: "Illustrator", src: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/illustrator/illustrator-plain.svg" },
    { name: "After Effects", src: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/aftereffects/aftereffects-original.svg" },
    { name: "Premiere Pro", src: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/premierepro/premierepro-plain.svg" },
    { name: "HTML", src: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/html5/html5-original.svg" },
    { name: "CSS", src: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/css3/css3-original.svg" },
    { name: "JavaScript", src: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/javascript/javascript-original.svg" },
    { name: "React", src: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/react/react-original.svg" },
    { name: "Node", src: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/nodejs/nodejs-original.svg" },
    { name: "Playwright", src: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/playwright/playwright-original.svg" },
    { name: "Webflow", src: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/webflow/webflow-original.svg" },
    { name: "Wix Studio", src: "https://cdn.simpleicons.org/wix/000000" },
    { name: "WordPress", src: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/wordpress/wordpress-plain.svg" }
  ];

  return (
    <div className="flex flex-col min-h-screen">
      {currentSections.map((name, index) => {
        if (name === "Hero") {
          return (
            <section key={index} className="px-6 py-24 md:py-32 container mx-auto max-w-7xl pt-24 md:pt-32 pb-24 border-b border-gray-200">
              <div className="flex flex-col">
                <motion.p
                  className="text-lg md:text-xl font-medium text-gray-600 mb-6 md:mb-8"
                  initial={fadeIn.initial}
                  animate={fadeIn.animate}
                  transition={fadeIn.transition}
                >
                  Hello! I'm Debargha.
                </motion.p>
                <div className="relative z-10">
                  <img src="/assets/hero_gradient_blob.svg" className="absolute -top-[50%] -right-[20%] w-[120%] opacity-40 mix-blend-multiply pointer-events-none animate-[pulse_12s_ease-in-out_infinite] scale-150" alt="" />
                  <img src="/assets/hero_shape_01.svg" className="absolute -top-10 right-0 md:right-10 w-48 h-48 opacity-60 pointer-events-none" style={{ animation: 'float 8s ease-in-out infinite' }} alt="" />
                  <style>{`@keyframes float { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(-20px); } }`}</style>
                  
                  <motion.h1
                    className="text-display-xl font-semibold tracking-tight leading-none max-w-[95%] mb-16 relative z-20"
                    variants={staggerContainer}
                    initial="initial"
                    animate="animate"
                  >
                    <motion.div variants={fadeUp} className="inline-block">Designing digital</motion.div><br />
                    <motion.div variants={fadeUp} className="inline-block">product with emphasis</motion.div><br />
                    <motion.div variants={fadeUp} className="inline-block">
                      on <span className="text-gray-400 hover:text-black transition-colors duration-300">visual design</span>
                    </motion.div>
                  </motion.h1>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-12 gap-12 items-center w-full">
                  <motion.div
                    className="md:col-span-5 lg:col-span-4"
                    initial={fadeUp.initial}
                    animate={fadeUp.animate}
                    transition={{ ...fadeUp.transition, delay: 0.3 }}
                  >
                    <Link
                      href="#contact"
                      className="inline-flex items-center space-x-3 bg-black text-white rounded-full px-8 py-4 text-lg font-medium hover:bg-black/80 transition-colors duration-300 group"
                    >
                      <span>Let's Talk</span>
                      <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
                    </Link>
                  </motion.div>
                  <motion.div
                    className="md:col-span-7 lg:col-span-5 lg:col-start-8"
                    initial={fadeUp.initial}
                    animate={fadeUp.animate}
                    transition={{ ...fadeUp.transition, delay: 0.4 }}
                  >
                    <p className="text-lg text-gray-500 leading-relaxed">
                      A multidisciplinary designer combining system thinking and technical prototyping to achieve engaging digital experiences.
                    </p>
                  </motion.div>
                </div>
              </div>
            </section>
          );
        }

        if (name === "Stats") {
          return (
            <section key={index} className="bg-section-muted">
              <div className="container mx-auto max-w-7xl px-6 py-24 md:py-32">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-0">
                  {[
                    { value: 3, suffix: "+", label: "Years of Professional Experience", delay: 0.1 },
                    { value: 450, suffix: "+", label: "Total Behance Portfolio Views", delay: 0.3, mt: "md:mt-32" },
                    { value: 13, suffix: "+", label: "Project Appreciations Received", delay: 0.2, mt: "md:mt-16" }
                  ].map((stat, idx) => (
                    <motion.div
                      key={idx}
                      className={`relative flex flex-col justify-between border-l border-black/80 px-8 md:px-12 h-[200px] md:h-[280px] ${stat.mt || 'mt-12 md:mt-0'}`}
                      initial={{ opacity: 0, y: 60 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: DURATION_SLOW, delay: stat.delay, ease: EASE_OUT_EXPO }}
                    >
                      <div className="h-full flex items-center md:items-start pt-0 md:pt-[15%]">
                        <h3 className="text-6xl md:text-8xl font-black tracking-tight">
                          <Counter from={0} to={stat.value} />{stat.suffix}
                        </h3>
                      </div>
                      <p className="text-sm font-medium text-black max-w-[200px] leading-relaxed">
                        {stat.label}
                      </p>
                    </motion.div>
                  ))}
                </div>
              </div>
            </section>
          );
        }

        if (name === "Tools") {
          return (
            <section key={index} className="py-12 md:py-16 bg-white overflow-hidden relative border-b border-gray-100 flex items-center">
              <div className="absolute left-0 top-0 bottom-0 w-24 md:w-48 bg-gradient-to-r from-white to-transparent z-10 pointer-events-none" />
              <div className="absolute right-0 top-0 bottom-0 w-24 md:w-48 bg-gradient-to-l from-white to-transparent z-10 pointer-events-none" />
              <div className="flex w-max animate-marquee hover:animation-paused gap-4">
                {[...Array(2)].map((_, i) => (
                  <div key={i} className="flex gap-4 px-2">
                    {tools.map((tool, idx) => (
                      <div
                        key={`${i}-${idx}`}
                        className="flex items-center justify-center space-x-3 px-8 py-4 bg-gray-50 border border-gray-100 rounded-full min-w-max"
                      >
                        <img src={tool.src} alt={`${tool.name} logo`} className="w-6 h-6 object-contain" loading="lazy" />
                        <span className="text-lg font-medium text-black tracking-tight whitespace-nowrap">{tool.name}</span>
                      </div>
                    ))}
                  </div>
                ))}
              </div>
            </section>
          );
        }

        if (name === "Services") {
          return (
            <section key={index} className="py-24 md:py-32 container mx-auto max-w-7xl px-6" id="about">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-12">
                <div className="lg:col-span-5 flex flex-col">
                  <div className="inline-flex items-center border border-gray-200 rounded-full px-4 py-1.5 text-xs font-mono uppercase tracking-widest font-medium mb-8 w-fit">
                    Services
                  </div>
                  <motion.h2
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: DURATION_SLOW, ease: EASE_OUT_EXPO }}
                    className="text-display-sm font-semibold tracking-tight leading-tight mb-6"
                  >
                    A Comprehensive look<br />at what we offer and<br />how we deliver
                  </motion.h2>
                  <motion.p
                    className="text-gray-500 text-lg md:text-xl font-medium max-w-sm mb-12 leading-relaxed"
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: DURATION_SLOW, delay: 0.1, ease: EASE_OUT_EXPO }}
                  >
                    A comprehensive look at our services and how we deliver them
                  </motion.p>
                </div>
                <div className="lg:col-span-7">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 h-full">
                    {services.map((item, idx) => (
                      <Dialog key={idx}>
                        <motion.div
                          initial={{ opacity: 0, y: 40 }}
                          whileInView={{ opacity: 1, y: 0 }}
                          viewport={{ once: true, margin: "-50px" }}
                          transition={{ duration: DURATION_BASE, delay: idx * 0.1, ease: EASE_OUT_EXPO }}
                        >
                          <DialogTrigger className="w-full text-left appearance-none outline-none focus:outline-none focus:ring-0">
                            <Card className="h-[300px] border border-gray-100 bg-white hover:bg-[#111] hover:text-white transition-all duration-300 flex flex-col justify-between overflow-hidden relative shadow-sm hover:shadow-xl rounded-2xl group cursor-pointer p-8 text-left">
                              <div className="absolute -top-12 -right-12 w-48 h-48 border border-white/10 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
                              <div className="absolute top-24 -right-24 w-64 h-64 border border-white/10 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
                              <div>
                                {item.icon ? item.icon : <div className="w-12 h-[1px] bg-black mb-8 group-hover:bg-white transition-colors duration-300" />}
                                <CardTitle className="text-xl font-medium tracking-tight mb-4 group-hover:text-white transition-colors duration-300">
                                  {item.title}
                                </CardTitle>
                                <p className="text-gray-500 text-sm leading-relaxed font-light group-hover:text-gray-300 transition-colors duration-300 relative z-10">
                                  {item.desc}
                                </p>
                              </div>
                              <div className="flex justify-end relative z-10 pt-4">
                                <ArrowRight className="w-6 h-6 text-black group-hover:-translate-y-1 group-hover:text-white group-hover:-rotate-45 transition-all duration-300" />
                              </div>
                            </Card>
                          </DialogTrigger>
                        </motion.div>
                        <DialogContent className="sm:max-w-[425px]">
                          <DialogHeader>
                            <DialogTitle className="text-2xl font-bold tracking-tight mb-4">{item.title}</DialogTitle>
                            <DialogDescription className="text-base text-gray-700 leading-relaxed font-normal">
                              {item.details}
                            </DialogDescription>
                          </DialogHeader>
                        </DialogContent>
                      </Dialog>
                    ))}
                  </div>
                </div>
              </div>
            </section>
          );
        }

        if (name === "Experience") {
          return (
            <section key={index} className="py-24 md:py-32 bg-section-subtle" id="experience">
              <div className="container mx-auto max-w-7xl px-6">
                <div className="flex flex-col lg:flex-row justify-between items-start lg:items-end mb-16 md:mb-24 gap-8">
                  <div className="max-w-xl">
                    <div className="inline-flex items-center px-4 py-1.5 rounded-full border border-gray-300 text-xs font-mono uppercase tracking-widest font-medium mb-6">
                      Experience
                    </div>
                    <h2 className="text-display-sm font-semibold tracking-tight leading-tight">
                      A Yearly snapshot of my creative growth
                    </h2>
                  </div>
                  <p className="text-gray-500 max-w-md text-base leading-relaxed pb-2">
                    An annual summary that summarizes my creative journey and development throughout the years.
                  </p>
                </div>
                <div className="w-full">
                  {experiences.map((exp, idx) => (
                    <div
                      key={idx}
                      className={`group flex flex-col md:flex-row justify-between items-start md:items-center transition-colors duration-300 hover:bg-gray-200/50 p-6 -mx-6 px-6 md:p-10 md:-mx-10 md:px-10 border-t ${idx === experiences.length - 1 ? 'border-b' : ''} border-gray-200`}
                    >
                      <div className="max-w-2xl">
                        <h3 className="text-xl md:text-2xl font-medium mb-2 text-black transition-colors">
                          {exp.role} at {exp.org}
                        </h3>
                        <p className="text-gray-500 text-sm md:text-base leading-relaxed">{exp.desc}</p>
                      </div>
                      <div className="mt-6 md:mt-0 flex items-center md:pl-8">
                        <span className="text-4xl md:text-5xl font-medium tracking-tighter text-black">{exp.year}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </section>
          );
        }

        if (name === "Testimonials") {
          return <div key={index}><Testimonials /></div>;
        }

        if (name === "Contact") {
          return <div key={index}><ContactSection /></div>;
        }

        if (name === "Projects") {
          return <div key={index}><SelectedWorks /></div>;
        }

        if (name === "Blogs" && blogs.length > 0) {
          return (
            <section key={index} className="py-24 md:py-32 bg-white" id="blogs">
              <div className="container mx-auto max-w-7xl px-6">
                <div className="flex justify-between items-end mb-16">
                  <div>
                    <div className="inline-flex items-center px-4 py-1.5 rounded-full border border-gray-300 text-xs font-mono uppercase tracking-widest font-medium mb-6">
                      Writing
                    </div>
                    <h2 className="text-display-sm font-semibold tracking-tight">Recent Notebook Entries</h2>
                  </div>
                  <Link href="/blogs" className="hidden md:flex items-center text-sm font-medium hover:text-gray-600 transition-colors">
                    View all posts <ArrowRight className="w-4 h-4 ml-2" />
                  </Link>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                  {blogs.map((post) => (
                    <Link key={post.slug} href={`/blogs/${post.slug}`} className="group block">
                      <div className="aspect-[4/3] w-full bg-gray-100 rounded-2xl overflow-hidden mb-6 relative">
                        {post.cover_image && (
                          <img
                            src={post.cover_image}
                            alt={post.title}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                          />
                        )}
                      </div>
                      <div className="flex items-center gap-3 text-xs text-gray-500 font-medium mb-3">
                        <span>{new Date(post.created_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</span>
                      </div>
                      <h3 className="text-xl font-medium tracking-tight mb-2 group-hover:underline">{post.title}</h3>
                      {post.description && <p className="text-gray-500 text-sm line-clamp-2">{post.description}</p>}
                    </Link>
                  ))}
                </div>
              </div>
            </section>
          );
        }

        return null;
      })}
    </div>
  );
}
