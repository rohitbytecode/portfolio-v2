import { SkillCategory } from "~/types/data";

const DI = "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons";
const SI = "https://cdn.simpleicons.org";

export const skillCategories: SkillCategory[] = [
  {
    category: "Languages",
    skills: [
      { name: "TypeScript", icon: `${DI}/typescript/typescript-original.svg` },
      { name: "JavaScript", icon: `${DI}/javascript/javascript-original.svg` },
      { name: "Java", icon: `${DI}/java/java-original.svg` },
      { name: "SQL", icon: `${DI}/azuresqldatabase/azuresqldatabase-original.svg` },
      { name: "HTML5", icon: `${DI}/html5/html5-original.svg` },
      { name: "CSS3", icon: `${DI}/css3/css3-original.svg` },
    ],
  },
  {
    category: "Frameworks & Libraries",
    skills: [
      { name: "Node.js", icon: `${DI}/nodejs/nodejs-original.svg` },
      { name: "Express.js", icon: `${SI}/express/white` },
      { name: "React.js", icon: `${DI}/react/react-original.svg` },
      { name: "Next.js", icon: `${SI}/nextdotjs/white` },
      { name: "NestJS", icon: `${DI}/nestjs/nestjs-original.svg` },
      { name: "Socket.IO", icon: `${SI}/socketdotio/white` },
      { name: "Prisma", icon: `${SI}/prisma/white` },
      { name: "Drizzle ORM", icon: `${SI}/drizzle/white` },
      { name: "Tailwind CSS", icon: `${DI}/tailwindcss/tailwindcss-original.svg` },
      { name: "Vite", icon: `${DI}/vitejs/vitejs-original.svg` },
      { name: "Qt", icon: `${DI}/qt/qt-original.svg` },
      { name: "QML", icon: `${DI}/qt/qt-original.svg` },
    ],
  },
  {
    category: "Databases",
    skills: [
      { name: "PostgreSQL", icon: `${DI}/postgresql/postgresql-original.svg` },
      { name: "MongoDB", icon: `${DI}/mongodb/mongodb-original.svg` },
      { name: "MySQL", icon: `${DI}/mysql/mysql-original.svg` },
      { name: "Redis", icon: `${DI}/redis/redis-original.svg` },
      { name: "Supabase", icon: `${SI}/supabase/white` },
    ],
  },
  {
    category: "Tools & Platforms",
    skills: [
      { name: "Git", icon: `${DI}/git/git-original.svg` },
      { name: "GitHub", icon: `${SI}/github/white` },
      { name: "Docker", icon: `${DI}/docker/docker-original.svg` },
      { name: "AWS", icon: `${DI}/amazonwebservices/amazonwebservices-original.svg` },
      { name: "Linux", icon: `${DI}/linux/linux-original.svg` },
      { name: "Nginx", icon: `${DI}/nginx/nginx-original.svg` },
      { name: "PM2", icon: `${SI}/pm2/white` },
      { name: "GitHub Actions", icon: `${SI}/githubactions/white` },
      { name: "Vercel", icon: `${SI}/vercel/white` },
      { name: "Turborepo", icon: `${SI}/turborepo/white` },
      { name: "pnpm", icon: `${SI}/pnpm/white` },
      { name: "npm", icon: `${DI}/npm/npm-original-wordmark.svg` },
      { name: "Postman", icon: `${DI}/postman/postman-original.svg` },
      { name: "Prometheus", icon: `${DI}/prometheus/prometheus-original.svg` },
      { name: "OpenTelemetry", icon: `${SI}/opentelemetry/white` },
      { name: "Pino", icon: `${SI}/pino/white` },
      { name: "Caddy", icon: `${SI}/caddy/white` },
      { name: "Certbot", icon: `${SI}/letsencrypt/white` },
      { name: "FFmpeg", icon: `${SI}/ffmpeg/white` },
      { name: "VS Code", icon: `${DI}/vscode/vscode-original.svg` },
    ],
  },
  {
    category: "Engineering Expertise",
    skills: [
      { name: "REST APIs", icon: `${SI}/openapiinitiative/white` },
      { name: "WebSockets", icon: `${SI}/socketdotio/white` },
      { name: "JWT Authentication", icon: `${SI}/jsonwebtokens/white` },
      { name: "RBAC", icon: `${SI}/auth0/white` },
      { name: "Multi-tenancy", icon: `${DI}/kubernetes/kubernetes-plain.svg` },
      { name: "CI/CD", icon: `${SI}/githubactions/white` },
      { name: "Reverse Proxies", icon: `${DI}/nginx/nginx-original.svg` },
      { name: "System Design", icon: `${SI}/diagramsdotnet/white` },
      { name: "Real-time Systems", icon: `${SI}/apachekafka/white` },
      { name: "Observability", icon: `${SI}/opentelemetry/white` },
    ],
  },
];
