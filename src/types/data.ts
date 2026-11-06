export interface PersonalInfo {
  name: string;
  title: string;
  tagline: string;
  bio: string;
  email: string;
  location: string;
  profileImage: string;
  resumeUrl: string;
  socials: SocialLink[];
}

export interface SocialLink {
  platform: string;
  url: string;
  icon: string;
}

export interface ProjectHighlight {
  icon: string;
  label: string;
  detail: string;
}

export interface Project {
  id: string;
  title: string;
  description: string;
  techStack: string[];
  liveUrl?: string;
  githubUrl?: string;
  npmUrl?: string;
  image: string;
  featured: boolean;
  disabled?: boolean;
  highlights?: ProjectHighlight[];
}

export interface Experience {
  id: string;
  company: string;
  role: string;
  period: string;
  location: string;
  website?: string;
  highlights: string[];
  techUsed: string[];
}

export interface SkillCategory {
  category: string;
  skills: Skill[];
}

export interface Skill {
  name: string;
  icon: string;
}

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  company: string;
  text: string;
  avatar?: string;
  profileUrl?: string;
}

export interface SiteConfig {
  title: string;
  description: string;
  url: string;
  ogImage: string;
  author: string;
}

export interface NavItem {
  label: string;
  href: string;
}

export interface BlogPostMeta {
  slug: string;
  title: string;
  description: string;
  date: string;
  readTime: string;
  tags: string[];
  coverImage?: string;
  published: boolean;
}

export interface BlogPostFull extends BlogPostMeta {
  content: string;
  wordCount: number;
}
