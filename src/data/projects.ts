import { Project } from "~/types/data";

export const projects: Project[] = [
  {
    id: "claim-management-system",
    category: "Healtcare SaaS",
    title: "Claim Management System",
    description:
      "Multi-tenant healthcare SaaS with RBAC, WebSockets, real-time notifications, AWS deployment, Docker, PM2 and Nginx.",
    techStack: ["AWS", "Docker", "WebSockets", "PM2", "Nginx", "RBAC"],
    demo: "https://claims.rohitdmore.in",
    liveUrl: "https://claims.rohitdmore.in",
    liveUrlUnavailable: true,
    github: "https://github.com/rohitbytecode/malavia-claims-v2",
    githubUrl: "https://github.com/rohitbytecode/malavia-claims-v2",
    image: "/projects/placeholder.jpg",
    featured: true,
    highlights: [
      {
        icon: "ShieldCheck",
        label: "Multi-Tenant SaaS",
        detail: "Role-based access control with secure healthcare data isolation",
      },
      {
        icon: "Zap",
        label: "Real-Time Notifications",
        detail: "WebSockets integration for instant claims updates and alerts",
      },
      {
        icon: "Sparkles",
        label: "Cloud Deployed",
        detail: "Production AWS deployment with Docker and Nginx",
      },
      {
        icon: "Users",
        label: "High Availability",
        detail: "Managed with PM2 runtime for zero-downtime reliability",
      },
    ],
  },
  {
    id: "hospital-management-system",
    category: "Healtcare",
    title: "Hospital Management System",
    description:
      "Hospital management platform with appointment scheduling, patient portal and responsive UI.",
    techStack: ["Node.js", "Express", "Patient Portal", "Scheduling", "REST API"],
    demo: "https://hms.rohitdmore.in",
    liveUrl: "https://hms.rohitdmore.in",
    github: "https://github.com/rohitbytecode/hms-backend-node",
    githubUrl: "https://github.com/rohitbytecode/hms-backend-node",
    image: "/projects/placeholder.jpg",
    featured: true,
  },
  {
    id: "grabit-ecommerce",
    category: "E-Commerce",
    title: "GrabIt E-Commerce",
    description:
      "Modern grocery e-commerce platform featuring authentication, product catalog and shopping experience.",
    techStack: ["React", "Node.js", "Authentication", "Catalog", "Shopping Cart"],
    demo: "https://grabit.rohitdmore.in",
    liveUrl: "https://grabit.rohitdmore.in",
    github: "https://github.com/rohitbytecode/GrabIt",
    githubUrl: "https://github.com/rohitbytecode/GrabIt",
    image: "/projects/placeholder.jpg",
    featured: true,
  },
  {
    id: "qr-code-generator",
    category: "Tools",
    title: "QR Code Generator",
    description:
      "CLI-based QR code generator with configurable environment support for backend workflows.",
    techStack: ["Node.js", "CLI", "TypeScript", "Backend Workflows"],
    github: "https://github.com/rohitbytecode/qr-generator",
    githubUrl: "https://github.com/rohitbytecode/qr-generator",
    image: "/projects/placeholder.jpg",
    featured: false,
  },
  {
    id: "darkmatter",
    category: "Security",
    title: "DarkMatter",
    description:
      "Educational ransomware prototype built in an isolated lab environment to study attack behaviour.",
    techStack: ["Cybersecurity", "Malware Analysis", "Lab Research", "Security"],
    github: "https://github.com/rohitbytecode/DarkMatter-rware-study",
    githubUrl: "https://github.com/rohitbytecode/DarkMatter-rware-study",
    image: "/projects/placeholder.jpg",
    featured: false,
  },
  {
    id: "snapit",
    category: "E-Commerce",
    title: "SnapIt",
    description:
      "Full-stack e-commerce application with authentication, RBAC, product management and order workflow.",
    techStack: ["Full-Stack", "RBAC", "Product Management", "Order Workflow"],
    github: "https://github.com/rohitbytecode/snapit",
    githubUrl: "https://github.com/rohitbytecode/snapit",
    image: "/projects/placeholder.jpg",
    featured: false,
  },
  {
    id: "filmcraft",
    category: "Tools",
    title: "FilmCraft",
    description:
      "Desktop video editing application UI built with C++, Qt and QML.",
    techStack: ["C++", "Qt", "QML", "Desktop App"],
    github: "https://github.com/Vardaan-Studio/Filmcraft",
    githubUrl: "https://github.com/Vardaan-Studio/Filmcraft",
    image: "/projects/placeholder.jpg",
    featured: false,
  },
  {
    id: "pdf-sorting-tool",
    category: "Tools",
    title: "PDF Sorting Tool",
    description:
      "Utility for rearranging odd and even PDF pages automatically.",
    techStack: ["Python", "CLI", "PDF Processing", "Automation"],
    github: "https://github.com/rohitbytecode/pdf-sorting-tool",
    githubUrl: "https://github.com/rohitbytecode/pdf-sorting-tool",
    image: "/projects/placeholder.jpg",
    featured: false,
  },
  {
    id: "vaultmap",
    title: "VaultMap - GitHub repo visualizer",
    description:
      "An exciting new project is currently in development. Stay tuned for updates.",
    techStack: ["???"],
    image: "/projects/placeholder.jpg",
    featured: false,
    disabled: true,
  },
  {
    id: "horizon",
    title: "Horizon - Reverse proxy",
    description:
      "Another innovative project is on the way. Check back soon.",
    techStack: ["???"],
    image: "/projects/placeholder.jpg",
    featured: false,
    disabled: true,
  },
];
