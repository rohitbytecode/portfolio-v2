"use client";

import { motion } from "framer-motion";
import { ExternalLink } from "lucide-react";
import { experience } from "~/data/experience";
import { AnimatedSection } from "~/components/ui/AnimatedSection";
import { SectionHeading } from "~/components/ui/SectionHeading";
import { staggerContainer, staggerItem } from "~/lib/motion";

export function Experience() {
  return (
    <AnimatedSection id="experience">
      <div className="mx-auto max-w-4xl">
        <SectionHeading title="Experience" subtitle="My professional journey" />
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="relative space-y-8"
        >
          {/* Glowing timeline line */}
          <div className="absolute left-[7px] top-2 bottom-2 w-[2px] timeline-line" />

          {experience.map((exp) => (
            <motion.div key={exp.id} variants={staggerItem} className="relative pl-10">
              {/* Pulsing timeline dot */}
              <div className="absolute left-0 top-3 h-[16px] w-[16px] rounded-full border-2 border-red-500 bg-[#0a0a0a] timeline-dot" />

              <div className="glass glass-hover rounded-xl p-6 transition-all duration-300 hover:shadow-[0_0_30px_rgba(239,68,68,0.1)]">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1">
                  <h3 className="text-lg font-semibold text-[#fafafa]">{exp.role}</h3>
                  <span className="text-sm text-[#a1a1aa]/60 font-mono">{exp.period}</span>
                </div>
                <div className="flex items-center gap-2 mt-1">
                  {exp.website ? (
                    <a
                      href={exp.website}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm font-medium text-red-400 hover:text-red-300 transition-colors inline-flex items-center gap-1"
                    >
                      {exp.company}
                      <ExternalLink className="h-3 w-3" />
                    </a>
                  ) : (
                    <p className="text-sm font-medium text-red-400">{exp.company}</p>
                  )}
                  <span className="text-[#a1a1aa]/40">•</span>
                  <span className="text-sm text-[#a1a1aa]/60">{exp.location}</span>
                </div>
                <ul className="mt-4 space-y-2">
                  {exp.highlights.map((highlight, i) => (
                    <li key={i} className="text-sm text-[#a1a1aa] leading-relaxed flex gap-2">
                      <span className="text-red-500/50 shrink-0">&bull;</span>
                      {highlight}
                    </li>
                  ))}
                </ul>
                <div className="mt-4 flex flex-wrap gap-2">
                  {exp.techUsed.map((tech) => (
                    <span
                      key={tech}
                      className="rounded-full bg-white/5 border border-white/10 px-2.5 py-0.5 text-xs text-[#a1a1aa] font-mono"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </AnimatedSection>
  );
}
