"use client";

import { motion } from "framer-motion";
import { projects } from "~/data/projects";
import { AnimatedSection } from "~/components/ui/AnimatedSection";
import { SectionHeading } from "~/components/ui/SectionHeading";
import { ProjectCard } from "~/components/ui/ProjectCard";
import { staggerContainer, staggerItem } from "~/lib/motion";

export function Projects() {
  const featured = projects.filter((p) => p.featured);
  const other = projects.filter((p) => !p.featured);

  return (
    <AnimatedSection id="projects">
      <div className="mx-auto max-w-6xl">
        <SectionHeading title="Projects" subtitle="A selection of my recent work" />
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid gap-6 md:grid-cols-2 lg:grid-cols-3"
        >
          {featured.map((project, i) => (
            <motion.div
              key={project.id}
              variants={staggerItem}
              className={i === 0 ? "md:col-span-2" : ""}
            >
              <ProjectCard project={project} featured={i === 0} className="h-full" />
            </motion.div>
          ))}
          {other.map((project) => (
            <motion.div key={project.id} variants={staggerItem}>
              <ProjectCard project={project} className="h-full" />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </AnimatedSection>
  );
}
