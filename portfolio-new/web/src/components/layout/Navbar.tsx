"use client";

import Link from "next/link";
import { motion, useScroll } from "framer-motion";
import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";

const EASE_OUT_EXPO = [0.16, 1, 0.3, 1] as const;

export function Navbar() {
  const { scrollY } = useScroll();
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    return scrollY.onChange((latest) => {
      setIsScrolled(latest > 50);
    });
  }, [scrollY]);

  const navLinks = [
    { href: "/projects", label: "Work" },
    { href: "/blogs", label: "Blog" },
    { href: "#about", label: "About" },
    { href: "/Debargha_CV.pdf", label: "Resume", external: true },
    { href: "#contact", label: "Contact" },
  ];

  return (
    <motion.header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        isScrolled ? "bg-white/90 backdrop-blur-md py-4 shadow-sm" : "bg-transparent py-6"
      )}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.8, ease: EASE_OUT_EXPO }}
    >
      <div className="container mx-auto px-6 max-w-7xl flex items-center justify-between">
        <Link href="/" className="text-xl font-bold tracking-tighter uppercase relative group hover:scale-[1.02] hover:-translate-y-0.5 transition-transform duration-300 inline-block">
          DEBARGHA
          <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-black transition-all duration-300 group-hover:w-full" />
        </Link>
        <nav className="hidden md:flex items-center space-x-8 text-sm font-medium tracking-wide uppercase">
          {navLinks.map((link) => (
            link.external ? (
              <a
                key={link.label}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-gray-500 transition-colors duration-200"
              >
                {link.label}
              </a>
            ) : (
              <Link
                key={link.label}
                href={link.href}
                className="hover:text-gray-500 transition-colors duration-200"
              >
                {link.label}
              </Link>
            )
          ))}
        </nav>
      </div>
    </motion.header>
  );
}
