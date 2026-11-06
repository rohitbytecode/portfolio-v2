import { Experience } from "~/types/data";

export const experience: Experience[] = [
  {
    id: "exp-1",
    company: "BMTech Pvt. Ltd.",
    role: "CTO",
    period: "April 2026 - present",
    location: "Surat, GJ",
    website: "https://bmtech.in",
    highlights: [
      "Independently managed the company's entire technology division, overseeing end-to-end product development and technical operations.",
      "Developed an automated business prospect discovery and lead intelligence system using Supabase Edge Functions and Cloudflare Workers.",
      "Managed cloud infrastructure, deployment workflows, database migrations, security configurations, and production maintenance.",
    ],
    techUsed: ["Next.js", "TypeScript", "Lenis", "Supabase", "PostgreSQL", "Cloudflare Workers", "OpenStreetMap", "Scalar API Reference"],
  },

  {
    id: "exp-2",
    company: "Malavia Hospital",
    role: "Software Engineer",
    period: "Apr 2024 - Present",
    location: "Surat, GJ",
    website: "http://www.malaviahospital.in",
    highlights: [
      "Developed and maintained a Healthcare Insurance Claims Management System using React, TypeScript, Node.js, Express, and MongoDB.",
      "Owned the complete software development lifecycle from implementation and testing to deployment and production maintenance.",
      "Implemented JWT authentication, RBAC, and WebSocket-based concurrency control to prevent conflicting edits during simultaneous claim processing.",
      "Built financial settlement workflows supporting discounts, payer contracts, TDS deductions, and vendor settlements, improving auditability.",
    ],
    techUsed: ["React", "TypeScript", "Node.js", "MongoDB", "Socket.IO", "Nginx", "PM2", "Prometheus", "OpenTelemetry", "Docker"],
  },
];
