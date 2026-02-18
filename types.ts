
export type ProjectStatus = 'idea' | 'en_desarrollo' | 'mvp' | 'v2';

export interface ProjectRoadmap {
  mvp: string[];
  v2: string[];
}

export interface Project {
  slug: string;
  title: string;
  shortDescription: string;
  problem: string;
  plannedFeatures: string[];
  stackPlanned: string[];
  status: ProjectStatus;
  roadmap: ProjectRoadmap;
  repoUrl: string;
  demoUrl: string;
  highlights: string;
  screenshots: string[];
}

export interface BlogPostContent {
  type: 'text' | 'code' | 'image' | 'video';
  value: string;
  language?: string; // Para bloques de código
  caption?: string; // Para imágenes/vídeos
}

export interface BlogPost {
  slug: string;
  title: string;
  date: string;
  tags: string[];
  excerpt: string;
  readTime: string;
  coverImage: string;
  content: BlogPostContent[];
}
