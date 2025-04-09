export interface Project {
  id: number;
  title: string;
  description: string;
  image: string;
  techStack: string[];
  githubUrl: string;
  liveUrl: string;
}

export interface Skill {
  name: string;
  icon: string;
  level: number;
  description: string;
}