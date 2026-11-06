"use client";

import { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Wrench } from "lucide-react";
import { personalInfo } from "~/data/personal";
import { AnimatedSection } from "~/components/ui/AnimatedSection";
import { SectionHeading } from "~/components/ui/SectionHeading";

const stats = [
  { value: "4+", label: "Years Experience" },
  { value: "20+", label: "Projects Delivered" },
  { value: "20+", label: "Happy Clients" },
];

interface AboutProps {
  profileImages?: string[];
}

export function About({ profileImages = [] }: AboutProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const imageCount = profileImages.length;
  const hasMultiple = imageCount > 1;

  const nextImage = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % imageCount);
  }, [imageCount]);

  // Auto-advance every 3s when multiple images
  useEffect(() => {
    if (!hasMultiple) return;
    const timer = setInterval(nextImage, 3000);
    return () => clearInterval(timer);
  }, [hasMultiple, nextImage]);

  return (
    <AnimatedSection id="about">
      <div className="mx-auto max-w-4xl">
        <SectionHeading title="About Me" subtitle="Get to know me better" />
        <div className="grid gap-10 md:grid-cols-2 items-center">
          {/* Profile photo / carousel */}
          <div className="aspect-square rounded-2xl bg-white/5 border border-white/10 relative overflow-hidden group">
            <div className="absolute -inset-1 rounded-2xl bg-gradient-to-br from-red-500/20 to-orange-500/20 blur-xl opacity-50 z-0" />

            {imageCount === 0 ? (
              <div className="relative z-10 w-full h-full flex items-center justify-center">
                <span className="text-[#a1a1aa]/60 text-sm font-mono">
                  Profile Photo
                </span>
              </div>
            ) : (
              <div className="relative z-10 w-full h-full">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={currentIndex}
                    initial={hasMultiple ? { opacity: 0, scale: 1.05 } : false}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.97 }}
                    transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
                    className="absolute inset-0"
                  >
                    <Image
                      src={profileImages[currentIndex]}
                      alt={`Profile photo ${currentIndex + 1}`}
                      fill
                      className="object-cover rounded-2xl"
                      sizes="(max-width: 768px) 100vw, 50vw"
                      priority={currentIndex === 0}
                    />
                  </motion.div>
                </AnimatePresence>

                {/* Dot indicators */}
                {hasMultiple && (
                  <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 z-20">
                    {profileImages.map((_, i) => (
                      <button
                        key={i}
                        onClick={() => setCurrentIndex(i)}
                        className={`h-2 rounded-full transition-all duration-300 ${
                          i === currentIndex
                            ? "bg-white w-6"
                            : "bg-white/40 hover:bg-white/60 w-2"
                        }`}
                        aria-label={`Go to image ${i + 1}`}
                      />
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>

          <div>
            <p className="text-[#a1a1aa] leading-relaxed text-base">
              {personalInfo.bio}
            </p>
            <div className="mt-8 grid grid-cols-2 gap-4">
              {stats.map((stat) => (
                <div
                  key={stat.label}
                  className="glass rounded-lg p-4 text-center transition-all duration-300 hover:shadow-[0_0_20px_rgba(239,68,68,0.15)]"
                >
                  <p className="text-2xl font-bold text-[#fafafa]">
                    {stat.value}
                  </p>
                  <p className="text-sm text-[#a1a1aa]/60 mt-1">
                    {stat.label}
                  </p>
                </div>
              ))}

              {/* Building Tools card */}
              <a
                href="#projects"
                className="glass rounded-lg p-4 text-center transition-all duration-300 hover:shadow-[0_0_20px_rgba(239,68,68,0.15)] group/card flex flex-col items-center justify-center"
              >
                <Wrench className="w-6 h-6 text-red-400 group-hover/card:rotate-12 transition-transform duration-300" />
                <p className="text-sm text-[#a1a1aa]/60 mt-2">
                  Building Useful Tools
                </p>
              </a>
            </div>
          </div>
        </div>
      </div>
    </AnimatedSection>
  );
}
