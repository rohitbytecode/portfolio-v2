"use client";

import { motion } from "framer-motion";
import { ArrowDown, ArrowRight, Copy, Check } from "lucide-react";
import { useState } from "react";
import { personalInfo } from "~/data/personal";
import { fadeInUp, staggerContainer } from "~/lib/motion";
import { GradientOrb } from "~/components/effects/GradientOrb";

export function Hero() {
  const [copied, setCopied] = useState(false);

  const copyEmail = () => {
    navigator.clipboard.writeText(personalInfo.email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section
      id="hero"
      className="relative flex min-h-screen items-center justify-center px-4 md:px-6 overflow-hidden"
    >
      {/* Mouse-tracking gradient orb */}
      <GradientOrb />

      {/* Bottom warm glow */}
      <div className="absolute inset-x-0 bottom-0 h-[40vh] hero-warm-glow pointer-events-none z-[1]" />

      <motion.div
        variants={staggerContainer}
        initial="hidden"
        animate="visible"
        className="relative z-10 mx-auto max-w-4xl text-center"
      >
        {/* Intro label */}
        <motion.p
          variants={fadeInUp}
          className="text-lg text-[#a1a1aa]"
        >
          Hey, I&apos;m
        </motion.p>

        {/* Name — THE focal point */}
        <motion.h1
          variants={fadeInUp}
          className="mt-2 text-5xl sm:text-6xl md:text-7xl font-bold tracking-tight text-[#fafafa] leading-[1.1]"
          style={{ textShadow: "0 0 60px rgba(239, 68, 68, 0.2)" }}
        >
          {personalInfo.name.toUpperCase()}
        </motion.h1>

        {/* Role badge */}
        <motion.div variants={fadeInUp} className="mt-4 flex justify-center">
          <span className="inline-flex items-center bg-red-500 text-white px-4 py-1.5 rounded-full text-sm font-medium">
            {personalInfo.title}
          </span>
        </motion.div>

        {/* Tagline */}
        <motion.p
          variants={fadeInUp}
          className="mt-6 text-xl sm:text-2xl text-[#a1a1aa] leading-relaxed"
        >
          I build and craft digital experiences{" "}
          <br className="hidden sm:block" />
          that deliver{" "}
          <span
            className="font-serif italic"
            style={{
              background: "linear-gradient(135deg, #ef4444, #f97316)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            real impact
          </span>
        </motion.p>

        {/* CTAs */}
        <motion.div
          variants={fadeInUp}
          className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <a
            href="#contact"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-red-500 text-white text-sm font-medium shadow-lg shadow-red-500/25 transition-all duration-300 hover:bg-red-600"
          >
            Let&apos;s Connect
            <ArrowRight size={16} />
          </a>

          <button
            onClick={copyEmail}
            className="inline-flex items-center gap-2 text-[#a1a1aa] text-sm hover:text-[#fafafa] active:scale-95 active:text-[#fafafa] transition-colors cursor-pointer"
          >
            {personalInfo.email}
            {copied ? (
              <Check size={14} className="text-red-400" />
            ) : (
              <Copy size={14} />
            )}
          </button>
        </motion.div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 1 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10"
      >
        <a href="#about" aria-label="Scroll down" className="group">
          <ArrowDown
            size={20}
            className="text-[#a1a1aa]/40 scroll-indicator group-hover:text-red-400 transition-colors"
          />
        </a>
      </motion.div>
    </section>
  );
}
