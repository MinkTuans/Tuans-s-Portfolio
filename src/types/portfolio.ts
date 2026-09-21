export interface SkillItem {
  id: string;
  name: string;
  category: string;
  roleOrContext?: string;
  isCore?: boolean;
}

export interface SkillCategory {
  id: string;
  title: string;
  description: string;
  skills: SkillItem[];
}

export interface ProjectCaseStudy {
  id: string;
  slug: string;
  name: string;
  projectType: string; // e.g. "Group Project – 5 Members"
  timeframe: string;   // e.g. "05/2026 - NOW"
  tagline: string;
  role: string;
  overview: string;
  whatIWorkedOn: string;
  technologies: string[];
  keyFeatures: string[];
  myContribution: string[]; // "WHAT I ACTUALLY BUILT" - direct verifiable code & architecture
  resultAndStatus: string;
  githubUrl?: string;
  liveDemoUrl?: string;
  architectureNotes?: string[];
  isFeatured: boolean;
}

export interface ExperienceItem {
  id: string;
  company: string;
  timeframe: string;
  position: string;
  technologies: string[];
  accomplishments: string[];
  context: string;
}

export interface SkillContributionMapping {
  id: string;
  skill: string;
  project: string;
  category: "Frontend" | "Backend" | "Database & Cloud" | "Realtime & Tools" | "AI";
  contribution: string;
}

export interface ContactInfo {
  phone: string;
  email: string;
  location: string;
  birthDate: string;
  github: string;
  githubUsername: string;
}

export interface CareerObjectives {
  shortTerm: string;
  longTerm: string;
}

export interface EducationItem {
  major: string;
  school: string;
  timeframe: string;
  gpa: string;
}

export interface ProfileInfo {
  fullName: string;
  role: string;
  accentTitle: string;
  conciseBio: string;
  careerObjectives?: CareerObjectives;
  coreSkills: string[];
  avatarUrl: string;
  contact: ContactInfo;
}

export interface GitHubRepo {
  id: number;
  name: string;
  description: string | null;
  html_url: string;
  language: string | null;
  stargazers_count: number;
  forks_count: number;
  updated_at: string;
  topics?: string[];
  homepage?: string | null;
}

export interface PortfolioData {
  profile: ProfileInfo;
  education?: EducationItem;
  skillCategories: SkillCategory[];
  projects: ProjectCaseStudy[];
  experience: ExperienceItem[];
  skillContributions: SkillContributionMapping[];
  lastUpdated: string;
}


