import { SkillCategory } from "~/types/data";

const DI = "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons";
const SI = "https://cdn.simpleicons.org";

export const skillCategories: SkillCategory[] = [
  {
    category: "Languages",
    skills: [
      { name: "JavaScript", icon: `${DI}/javascript/javascript-original.svg` },
      { name: "TypeScript", icon: `${DI}/typescript/typescript-original.svg` },
      { name: "Python", icon: `${DI}/python/python-original.svg` },
      { name: "HTML5", icon: `${DI}/html5/html5-original.svg` },
      { name: "CSS3", icon: `${DI}/css3/css3-original.svg` },
      { name: "Solidity", icon: `${SI}/solidity/white` },
    ],
  },
  {
    category: "Frameworks & Libraries",
    skills: [
      { name: "React", icon: `${DI}/react/react-original.svg` },
      { name: "Next.js", icon: `${SI}/nextdotjs/white` },
      { name: "NestJS", icon: `${DI}/nestjs/nestjs-original.svg` },
      { name: "Node.js", icon: `${DI}/nodejs/nodejs-original.svg` },
      { name: "Tailwind CSS", icon: `${DI}/tailwindcss/tailwindcss-original.svg` },
      { name: "Framer Motion", icon: `${SI}/framer/0055FF` },
      { name: "Prisma", icon: `${SI}/prisma/5A67D8` },
    ],
  },
  {
    category: "Databases",
    skills: [
      { name: "PostgreSQL", icon: `${DI}/postgresql/postgresql-original.svg` },
      { name: "MongoDB", icon: `${DI}/mongodb/mongodb-original.svg` },
      { name: "Redis", icon: `${DI}/redis/redis-original.svg` },
    ],
  },
  {
    category: "Tools & Platforms",
    skills: [
      { name: "Git", icon: `${DI}/git/git-original.svg` },
      { name: "Docker", icon: `${DI}/docker/docker-original.svg` },
      { name: "AWS", icon: `${DI}/amazonwebservices/amazonwebservices-original-wordmark.svg` },
      { name: "Vercel", icon: `${SI}/vercel/white` },
      { name: "Linux", icon: `${DI}/linux/linux-original.svg` },
      { name: "Figma", icon: `${DI}/figma/figma-original.svg` },
      { name: "Cloudflare", icon: `${DI}/cloudflare/cloudflare-original.svg` },
      { name: "GraphQL", icon: `${DI}/graphql/graphql-plain.svg` },
    ],
  },
];
