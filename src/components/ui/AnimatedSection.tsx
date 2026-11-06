"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { cn } from "~/lib/cn";
import { fadeInUp } from "~/lib/motion";

interface AnimatedSectionProps {
  children: React.ReactNode;
  className?: string;
  id?: string;
}

export function AnimatedSection({ children, className, id }: AnimatedSectionProps) {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-25px" });

  return (
    <motion.section
      ref={ref}
      id={id}
      variants={fadeInUp}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      className={cn("py-10 md:py-16 px-4 md:px-6", className)}
    >
      {children}
    </motion.section>
  );
}
