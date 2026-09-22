import type { LocalizedField } from '../utils/localization';

export const ProductStage = {
  Building: 'building',
  ActiveBuild: 'active-build',
  Discovery: 'discovery'
} as const;

export type ProductStage = (typeof ProductStage)[keyof typeof ProductStage];

export interface Product {
  id: string;
  name: string;
  icon: string;
  role: LocalizedField<string>;
  description: LocalizedField<string>;
  stage: ProductStage;
  tags: LocalizedField<string[]>;
  url?: string;
  availability?: LocalizedField<string>;
}

// Experience related types
export interface Experience {
  title: LocalizedField<string>;
  company: LocalizedField<string>;
  companyLogo: string;
  city: LocalizedField<string>;
  description: LocalizedField<string>;
  achievements: LocalizedField<string[]>;
  startDate: string;
  endDate: LocalizedField<string>;
  education?: LocalizedField<string>;
  promotionPath?: LocalizedField<string[]>;
  promotionMonth?: LocalizedField<string>;
}

// Certification related types
export interface Certification {
  id: string;
  name: string;
  code: string;
  provider: string;
  status: 'completed' | 'in-progress' | 'planned';
  completedDate?: string;
  expectedDate?: string;
  progress?: number;
  description: string;
  skills: string[];
  credentialUrl: string;
  badgeUrl: string;
  level: 'Fundamentals' | 'Associate' | 'Expert';
  category: string;
}

// Language related types
export type Language = 'en' | 'pl';

export interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
  get: <T = unknown>(key: string, fallback?: T) => T;
}

export interface TranslationObject {
  [key: string]: TranslationValue;
}

export type TranslationValue =
  string | number | boolean | null | TranslationObject | TranslationValue[];

export type Translations = Record<string, TranslationObject>;

// Component props types
export interface ExperienceCardProps {
  experience: Experience;
}

export interface CertificationCardProps {
  certification: Certification;
}
