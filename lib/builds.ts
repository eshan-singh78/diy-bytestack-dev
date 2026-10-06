import buildContent from '@/content/builds.json';

export const categories = [
  'Networking',
  'Databases',
  'Operating Systems',
  'Developer Tools',
  'Linux',
  'Multimedia',
] as const;

export const difficulties = ['Foundation', 'Intermediate', 'Advanced'] as const;
export const languages = ['python', 'go', 'rust', 'c', 'javascript'] as const;

export type BuildCategory = (typeof categories)[number];
export type BuildDifficulty = (typeof difficulties)[number];
export type BuildLanguage = (typeof languages)[number];
export type BuildStatus = 'available' | 'coming-soon';

export interface Build {
  slug: string;
  title: string;
  shortTitle: string;
  description: string;
  category: BuildCategory;
  difficulty: BuildDifficulty;
  duration: string;
  status: BuildStatus;
  concepts: string[];
  languages: BuildLanguage[];
  featured: boolean;
  order: number;
  whatYoullUnderstand: string[];
  whatYoullBuild: string;
}

function isOneOf<T extends string>(value: unknown, options: readonly T[]): value is T {
  return typeof value === 'string' && options.some((option) => option === value);
}

function isStringArray(value: unknown): value is string[] {
  return Array.isArray(value) && value.every((item) => typeof item === 'string');
}

function isLanguageArray(value: unknown): value is BuildLanguage[] {
  return Array.isArray(value) && value.every((item) => isOneOf(item, languages));
}

function isBuild(value: unknown): value is Build {
  if (typeof value !== 'object' || value === null) return false;
  const build = value as Record<string, unknown>;
  return (
    typeof build.slug === 'string' &&
    typeof build.title === 'string' &&
    typeof build.shortTitle === 'string' &&
    typeof build.description === 'string' &&
    isOneOf(build.category, categories) &&
    isOneOf(build.difficulty, difficulties) &&
    typeof build.duration === 'string' &&
    (build.status === 'available' || build.status === 'coming-soon') &&
    isStringArray(build.concepts) &&
    isLanguageArray(build.languages) &&
    typeof build.featured === 'boolean' &&
    typeof build.order === 'number' &&
    Number.isFinite(build.order) &&
    isStringArray(build.whatYoullUnderstand) &&
    typeof build.whatYoullBuild === 'string'
  );
}

function loadBuilds(data: unknown): Build[] {
  if (!Array.isArray(data)) {
    throw new Error('Build catalog must be an array in content/builds.json.');
  }

  const slugs = new Set<string>();
  const orders = new Set<number>();
  const entries = data.map((entry, index) => {
    if (!isBuild(entry)) {
      throw new Error(`Invalid build catalog entry at index ${index} in content/builds.json.`);
    }
    if (slugs.has(entry.slug)) {
      throw new Error(`Duplicate build slug "${entry.slug}" in content/builds.json.`);
    }
    if (orders.has(entry.order)) {
      throw new Error(`Duplicate build order "${entry.order}" in content/builds.json.`);
    }
    slugs.add(entry.slug);
    orders.add(entry.order);
    return entry;
  });

  return entries.sort((a, b) => a.order - b.order);
}

export const builds = loadBuilds(buildContent);

export function getBuild(slug: string) {
  return builds.find((build) => build.slug === slug);
}

export function categorySlug(category: BuildCategory) {
  return category.toLowerCase().replaceAll(' ', '-');
}

export function formatLanguage(language: BuildLanguage | string) {
  if (language === 'javascript') return 'JavaScript';
  return language.charAt(0).toUpperCase() + language.slice(1);
}
