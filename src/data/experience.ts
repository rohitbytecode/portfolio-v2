import { Experience } from "~/types/data";

export const experience: Experience[] = [
  {
    id: "exp-1",
    company: "Stantech AI",
    role: "Senior Frontend Engineer",
    period: "Apr 2025 - Present",
    location: "Gurugram",
    website: "https://www.stantech.ai/",
    highlights: [
      "Led frontend development of a no-code form builder SaaS enabling MSMEs to build customizable dynamic forms",
      "Designed reusable, responsive component libraries, accelerating feature delivery across teams",
      "Implemented real-time validation and conditional logic in form builders, reducing user errors",
      "Built performant dashboard with virtualized lists and infinite scroll, handling 100+ form entries without UI lag",
    ],
    techUsed: ["React", "TypeScript", "Next.js", "Tailwind CSS", "JavaScript"],
  },
  {
    id: "exp-2",
    company: "Quantx Technology Pvt. Ltd.",
    role: "Senior Frontend Developer",
    period: "Oct 2024 - Apr 2025",
    location: "Gurugram",
    website: "http://quantxindia.com/",
    highlights: [
      "Integrated TradingView Advanced Charting Library to provide interactive financial charts with technical indicators",
      "Developed and optimized a real-time trading platform using React, TypeScript, and WebSockets for high-frequency data updates",
      "Implemented a docking layout using Dockview, allowing all trading components to be draggable, resizable, and organized within dockable panels",
    ],
    techUsed: ["React", "TypeScript", "WebSockets", "TradingView", "Dockview"],
  },
  {
    id: "exp-3",
    company: "HKS Manpower Pvt. Ltd.",
    role: "Senior Frontend Engineer",
    period: "Mar 2023 - Oct 2024",
    location: "Gurugram",
    website: "https://hksmanpower.com/",
    highlights: [
      "Led frontend architecture decisions, improving scalability and development efficiency",
      "Reduced engineering workload by 20% by building a production-ready React & React Native boilerplate",
      "Improved website load time by 30% through bundle optimization and performance tuning",
      "Designed a WebSocket-based real-time chat system with PDF sharing",
      "Enabled large file uploads (100GB+) with automated retry and failure recovery",
    ],
    techUsed: ["React", "React Native", "TypeScript", "WebSockets", "Node.js"],
  },
  {
    id: "exp-4",
    company: "Healthmug Pvt. Ltd.",
    role: "Frontend Developer",
    period: "Oct 2021 - Mar 2023",
    location: "Delhi",
    website: "https://www.healthmug.com/",
    highlights: [
      "Core contributor to the Healthmug iOS application, from initial development to production release",
      "Architected shared business logic to minimize re-renders and unnecessary network calls",
      "Used Redux Toolkit & RTK Query for efficient caching and state management",
      "Implemented WebRTC video calling, handling low-latency communication and network edge cases",
    ],
    techUsed: ["React Native", "Redux Toolkit", "RTK Query", "WebRTC", "TypeScript"],
  },
];
