"use client";

import { Mail, MapPin } from "lucide-react";
import { personalInfo } from "~/data/personal";
import { AnimatedSection } from "~/components/ui/AnimatedSection";
import { SectionHeading } from "~/components/ui/SectionHeading";
import { Button } from "~/components/ui/Button";

export function Contact() {
  return (
    <AnimatedSection id="contact">
      <div className="mx-auto max-w-2xl text-center">
        <SectionHeading
          title="Get in Touch"
          subtitle="Have a project in mind or just want to say hello?"
        />
        <div className="flex flex-col items-center gap-4">
          <div className="flex items-center gap-2 text-[#a1a1aa]">
            <Mail size={18} className="text-red-400/60" />
            <a
              href={`mailto:${personalInfo.email}`}
              className="hover:text-red-400 transition-all duration-300 hover:drop-shadow-[0_0_8px_rgba(239,68,68,0.5)]"
            >
              {personalInfo.email}
            </a>
          </div>
          <div className="flex items-center gap-2 text-[#a1a1aa]">
            <MapPin size={18} className="text-red-400/60" />
            <span>{personalInfo.location}</span>
          </div>
          <div className="mt-6 flex gap-4">
            {personalInfo.socials.map((social) => (
              <a
                key={social.platform}
                href={social.url}
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2 text-sm glass rounded-lg text-[#a1a1aa] hover:text-red-400 transition-all duration-300 hover:shadow-[0_0_20px_rgba(239,68,68,0.2)] hover:border-red-500/30"
              >
                {social.platform}
              </a>
            ))}
          </div>
          <div className="mt-6">
            <Button href={`mailto:${personalInfo.email}`} variant="primary" size="lg">
              <Mail size={18} className="mr-2" />
              Send me an email
            </Button>
          </div>
        </div>
      </div>
    </AnimatedSection>
  );
}
