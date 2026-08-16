export interface Collection {
  id: string;
  slug: string;
  title: string;
  code: string;
  description: string;
  dateRange: string;
  studyIds: string[];
  order: number;
  location?: string;
}

export interface Study {
  id: string;
  slug: string;
  collectionId: string;
  title: string;
  code: string;
  description: string;
  entryIds: string[];
  threadIds: string[];
  relatedStudyIds: string[];
  order: number;
  status?: 'Active' | 'Archived' | 'Ongoing';
}

export type ContentBlockType =
  | 'text'
  | 'image'
  | 'fragment'
  | 'reference'
  | 'specimen'
  | 'quote'
  | 'two-column';

export interface ContentBlock {
  id: string;
  type: ContentBlockType;
  content?: string;
  imageUrl?: string;
  caption?: string;
  alt?: string;
  source?: string;
  referenceUrl?: string;
  fragments?: { id: string; timestamp?: string; note: string; tag?: string }[];
  leftColumn?: string;
  rightColumn?: string;
}

export interface Entry {
  id: string;
  slug: string;
  entryNumber: string; // e.g. "001", "004", "014"
  title: string;
  collectionId: string;
  studyId: string;
  revision: string; // e.g. "REV 00", "REV 01"
  createdDate: string; // e.g. "2026.07.07"
  lastModifiedDate?: string;
  publishedDate: string;
  location: string;
  threadIds: string[];
  relatedStudyIds: string[];
  contentBlocks: ContentBlock[];
  visibility: 'published' | 'draft' | 'hidden';
  summary?: string;
}

export interface Thread {
  id: string;
  slug: string;
  name: string;
  description: string;
  count?: number;
}

export type WorkMediaType =
  | 'Essay'
  | 'Photography'
  | 'Visual Study'
  | 'Mixed Media'
  | 'Spatial Installation';

export interface CuratedWork {
  id: string;
  slug: string;
  title: string;
  subtitle: string;
  date: string;
  mediumType: WorkMediaType;
  heroImage: string;
  heroImageAlt: string;
  excerpt: string;
  longContent: string[];
  additionalMedia?: {
    id: string;
    url: string;
    caption?: string;
    layout?: 'full' | 'split' | 'inset';
    alt?: string;
  }[];
  relatedStudySlugs?: string[];
  relatedEntrySlugs?: string[];
  featuredOnHome: boolean;
  homeLayout: {
    scale: 'dominant' | 'standard' | 'compact';
    alignment: 'left' | 'center' | 'right';
    aspectRatio?: 'landscape' | 'portrait' | 'square' | 'wide';
  };
}

export interface ProfessionalItem {
  id: string;
  category: 'role' | 'project' | 'exhibition' | 'publication' | 'collaboration';
  title: string;
  organization?: string;
  role?: string;
  periodOrYear: string;
  location?: string;
  description: string;
  link?: string;
  tags?: string[];
}

export interface PhilosophySection {
  heading: string;
  subheading?: string;
  paragraphs: string[];
}

export interface AuthorProfile {
  name: string;
  cjkName: string;
  title: string;
  bioShort: string;
  bioLong: string[];
  philosophy: PhilosophySection[];
  contactEmail: string;
  socials: { label: string; handle: string; url: string }[];
  locations: string[];
}
