"use client";

import { motion } from "framer-motion";
import { ArrowRight, Github, Linkedin, Mail } from "lucide-react";
import Link from "next/link";

const EASE_OUT_EXPO = [0.16, 1, 0.3, 1] as const;

export function Footer() {
  return (
    <footer className="bg-[#0f0f0f] text-white pt-24 pb-8 px-6 border-t border-white/10" id="contact">
      <div className="container mx-auto max-w-7xl">

        {/* Top Section */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-24 gap-12">
          <motion.h2
            className="text-display-sm font-semibold tracking-tight leading-tight text-white"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: EASE_OUT_EXPO }}
          >
            Let's Connect<br />There
          </motion.h2>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: EASE_OUT_EXPO }}
          >
            <Link
              href="mailto:debarghabandyopadhyayofficial@gmail.com"
              className="group flex items-center bg-[#1a1a1a] rounded-full p-2 pr-8 hover:bg-[#222] transition-colors duration-300 border border-white/5"
            >
              <div className="bg-[#2a2a2a] rounded-full w-14 h-14 flex items-center justify-center mr-6 group-hover:bg-white group-hover:text-black transition-colors duration-300">
                <ArrowRight className="w-6 h-6" />
              </div>
              <span className="text-lg font-medium tracking-wide">Hire Me Now!</span>
            </Link>
          </motion.div>
        </div>

        <div className="w-full h-[1px] bg-white/10 mb-16" />

        {/* Middle Grid Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8 mb-24">
          {/* Brand / Bio */}
          <div className="lg:col-span-1 flex flex-col items-start text-left">
            <Link href="/" className="text-3xl font-bold tracking-tight mb-6 flex items-center gap-3">
              <div className="w-8 h-8 bg-white text-black flex items-center justify-center rounded-sm font-black text-xl">D</div>
              Debargha
            </Link>
            <p className="text-gray-400 text-sm leading-relaxed mb-8 max-w-[280px]">
              Product & UX Designer focusing on business analysis, product strategy & 0→1 builds.
            </p>
            <div className="flex items-center gap-5 text-gray-400">
              <a href="https://github.com/Spore-301" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors duration-200">
                <Github className="w-5 h-5" />
              </a>
              <a href="https://www.linkedin.com/in/debarghabandyopadhyayofficial" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors duration-200">
                <Linkedin className="w-5 h-5" />
              </a>
              <a href="mailto:debarghabandyopadhyayofficial@gmail.com" className="hover:text-white transition-colors duration-200">
                <Mail className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Address */}
          <div className="flex flex-col text-left">
            <h4 className="text-white font-semibold mb-6 text-sm">Address</h4>
            <p className="text-gray-400 text-sm leading-relaxed">
              Bengaluru,<br />
              Karnataka, India
            </p>
          </div>

          {/* Email */}
          <div className="flex flex-col text-left">
            <h4 className="text-white font-semibold mb-6 text-sm">Email Address</h4>
            <a href="mailto:debarghabandyopadhyayofficial@gmail.com" className="text-gray-400 hover:text-white transition-colors duration-200 text-sm break-all leading-relaxed mb-2">
              debarghabandyopadhyay<br />official@gmail.com
            </a>
          </div>

          {/* Phone */}
          <div className="flex flex-col text-left">
            <h4 className="text-white font-semibold mb-6 text-sm flex justify-between w-full">
              Phone Number
            </h4>
            <p className="text-gray-400 text-sm mb-12">
              +91 8167336506 (Work)
            </p>

            {/* Internal Links pushed to bottom of 4th col in desktop */}
            <div className="flex gap-8 text-sm text-gray-300">
              <Link href="#work" className="hover:text-white transition-colors duration-200">Work</Link>
              <Link href="#about" className="hover:text-white transition-colors duration-200">About</Link>
              <Link href="/projects" className="hover:text-white transition-colors duration-200">Projects</Link>
            </div>
          </div>
        </div>

        <div className="w-full h-[1px] bg-white/10 mb-8" />

        {/* Bottom Section */}
        <div className="flex items-center justify-center text-xs text-gray-500">
          <p>All rights reserved @Debargha</p>
        </div>

      </div>
    </footer>
  );
}
