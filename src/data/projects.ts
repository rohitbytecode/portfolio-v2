import { Project } from "~/types/data";

export const projects: Project[] = [
  {
    id: "resumefreepro",
    title: "ResumeFreePro",
    description:
      "Build a job-winning resume in under 10 minutes. AI-powered suggestions, ATS-optimized templates, and instant PDF export — completely free, no sign-up required. Rated 4.8/5 by 1,250+ users.",
    techStack: ["Next.js", "TypeScript", "Tailwind CSS", "React", "AI / NLP", "PDF Generation"],
    liveUrl: "https://resumefreepro.com",
    image: "/projects/resumefreepro.jpg",
    featured: true,
    highlights: [
      {
        icon: "Sparkles",
        label: "AI-Powered Writing",
        detail: "Smart suggestions tailored to the job description",
      },
      {
        icon: "ShieldCheck",
        label: "ATS-Optimized",
        detail: "Passes automated screening at top companies",
      },
      {
        icon: "Zap",
        label: "Instant PDF Export",
        detail: "Download a polished resume in one click",
      },
      {
        icon: "Users",
        label: "1,250+ Users",
        detail: "Rated 4.8/5 — trusted by job seekers worldwide",
      },
    ],
  },
  {
    id: "create-modern-react",
    title: "create-modern-react",
    description:
      "A CLI tool that scaffolds production-ready React + TypeScript + Tailwind apps in seconds. Ships with Vite, SWC, Shadcn/ui, 25+ ESLint rules, and optional Redux / React Hook Form / Ant Design — all configurable via interactive prompts.",
    techStack: ["Node.js", "React", "TypeScript", "Vite", "Tailwind CSS"],
    npmUrl: "https://www.npmjs.com/package/create-modern-react",
    githubUrl: "https://github.com/abhay-rana/create-modern-react",
    liveUrl: "https://stackblitz.com/~/github.com/abhay-rana/create-modern-react",
    image: "/projects/create-modern-react.jpg",
    featured: true,
  },
  {
    id: "healthmug",
    title: "HealthMug",
    description:
      "India's leading online healthcare platform with 100K+ products across Ayurveda, Homeopathy, and wellness categories. Features real-time inventory, PAN India delivery, and free expert consultation.",
    techStack: ["React", "Node.js", "MongoDB", "Express", "Redux"],
    liveUrl: "https://www.healthmug.com",
    image: "/projects/healthmug.jpg",
    featured: true,
  },
  {
    id: "coming-soon-1",
    title: "Coming Soon",
    description:
      "An exciting new project is currently in development. Stay tuned for updates.",
    techStack: ["???"],
    image: "/projects/placeholder.jpg",
    featured: false,
    disabled: true,
  },
  {
    id: "coming-soon-2",
    title: "Coming Soon",
    description:
      "Another innovative project is on the way. Check back soon.",
    techStack: ["???"],
    image: "/projects/placeholder.jpg",
    featured: false,
    disabled: true,
  },
];
