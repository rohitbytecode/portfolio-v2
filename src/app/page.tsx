import { CursorFollower } from "~/components/effects/CursorFollower";
import { Hero } from "~/components/sections/Hero";
import { About } from "~/components/sections/About";
import { Projects } from "~/components/sections/Projects";
import { TechStack } from "~/components/sections/TechStack";
import { Experience } from "~/components/sections/Experience";
import { Blog } from "~/components/sections/Blog";
import { Testimonials } from "~/components/sections/Testimonials";
import { ResumeCTA } from "~/components/sections/ResumeCTA";
import { Contact } from "~/components/sections/Contact";
import { getLatestPosts } from "~/lib/blog";
import { getProfileImages } from "~/lib/profile";

export default function Home() {
  return (
    <>
      <CursorFollower />
      <Hero />
      <About profileImages={getProfileImages()} />
      <Projects />
      <TechStack />
      <Experience />
      <Blog posts={getLatestPosts(4)} />
      <Testimonials />
      <ResumeCTA />
      <Contact />
    </>
  );
}
