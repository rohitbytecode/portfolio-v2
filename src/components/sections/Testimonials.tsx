"use client";

import { motion } from "framer-motion";
import { testimonials } from "~/data/testimonials";
import { AnimatedSection } from "~/components/ui/AnimatedSection";
import { SectionHeading } from "~/components/ui/SectionHeading";
import { TestimonialCard } from "~/components/ui/TestimonialCard";
import { staggerContainer, staggerItem } from "~/lib/motion";

const rotations = [-1.5, 1, -0.5, 1.5];

export function Testimonials() {
  return (
    <AnimatedSection id="testimonials">
      <div className="mx-auto max-w-6xl">
        <SectionHeading title="Testimonials" subtitle="What people say about working with me" />
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid gap-4 md:grid-cols-2 lg:grid-cols-3"
        >
          {testimonials.map((testimonial, i) => (
            <motion.div
              key={testimonial.id}
              variants={staggerItem}
              className={i === 0 ? "lg:col-span-2" : ""}
            >
              <TestimonialCard
                testimonial={testimonial}
                rotation={rotations[i % rotations.length]}
              />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </AnimatedSection>
  );
}
