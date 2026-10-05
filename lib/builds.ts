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

export const builds = [
  {
    slug: 'http-server',
    title: 'Build Your Own HTTP Server',
    shortTitle: 'HTTP Server',
    description:
      'Understand sockets, TCP and HTTP by implementing a small HTTP server yourself.',
    category: 'Networking',
    difficulty: 'Foundation',
    duration: '3–4 hours',
    status: 'available',
    concepts: ['TCP', 'Sockets', 'HTTP', 'Headers', 'Routing', 'MIME Types'],
    languages: ['python'],
    featured: true,
    order: 1,
    whatYoullUnderstand: [
      'TCP sockets',
      'HTTP requests',
      'HTTP responses',
      'Headers',
      'Status codes',
      'MIME types',
      'Routing',
      'Static files',
    ],
    whatYoullBuild:
      'A small HTTP/1.x-style server that accepts TCP connections, parses basic requests, generates responses, routes URLs and serves simple files.',
  },
  {
    slug: 'shell',
    title: 'Build Your Own Shell',
    shortTitle: 'Shell',
    description:
      'Understand processes, commands, pipes and streams by building a tiny Unix-like shell.',
    category: 'Operating Systems',
    difficulty: 'Foundation',
    duration: '4–6 hours',
    status: 'coming-soon',
    concepts: ['Processes', 'Commands', 'Pipes', 'Streams'],
    languages: [],
    featured: false,
    order: 2,
    whatYoullUnderstand: ['Processes', 'Standard streams', 'Pipes', 'Command parsing'],
    whatYoullBuild: 'A tiny interactive shell that launches programs and connects their streams.',
  },
  {
    slug: 'database',
    title: 'Build Your Own Database',
    shortTitle: 'Database',
    description:
      'Explore persistence, indexing and storage engines by creating a tiny database.',
    category: 'Databases',
    difficulty: 'Intermediate',
    duration: '6–8 hours',
    status: 'coming-soon',
    concepts: ['Storage', 'Indexes', 'Pages', 'Queries'],
    languages: [],
    featured: false,
    order: 3,
    whatYoullUnderstand: ['Storage engines', 'Indexes', 'Persistence', 'Query execution'],
    whatYoullBuild: 'A small persistent key-value database with a basic index.',
  },
  {
    slug: 'dns-resolver',
    title: 'Build Your Own DNS Resolver',
    shortTitle: 'DNS Resolver',
    description:
      'Understand how domain names become IP addresses by implementing DNS resolution yourself.',
    category: 'Networking',
    difficulty: 'Intermediate',
    duration: '4–5 hours',
    status: 'coming-soon',
    concepts: ['DNS', 'UDP', 'Packets', 'Caching'],
    languages: [],
    featured: false,
    order: 4,
    whatYoullUnderstand: ['DNS packets', 'Recursive resolution', 'UDP', 'Caching'],
    whatYoullBuild: 'A resolver that asks nameservers for address records and decodes their replies.',
  },
  {
    slug: 'git',
    title: 'Build Your Own Git',
    shortTitle: 'Git',
    description:
      'Understand objects, commits, trees and version history by recreating the core ideas behind Git.',
    category: 'Developer Tools',
    difficulty: 'Intermediate',
    duration: '6–8 hours',
    status: 'coming-soon',
    concepts: ['Objects', 'Commits', 'Trees', 'History'],
    languages: [],
    featured: false,
    order: 5,
    whatYoullUnderstand: ['Content addressing', 'Blobs', 'Trees', 'Commits'],
    whatYoullBuild: 'A miniature content-addressed version-control tool.',
  },
  {
    slug: 'container',
    title: 'Build Your Own Container',
    shortTitle: 'Container',
    description:
      'Explore namespaces, isolation and processes by building a tiny container runtime.',
    category: 'Linux',
    difficulty: 'Advanced',
    duration: '8–10 hours',
    status: 'coming-soon',
    concepts: ['Namespaces', 'Isolation', 'Processes', 'Filesystems'],
    languages: [],
    featured: false,
    order: 6,
    whatYoullUnderstand: ['Namespaces', 'Process isolation', 'Root filesystems', 'Resource boundaries'],
    whatYoullBuild: 'A tiny Linux-only process isolation runtime.',
  },
  {
    slug: 'torrent-client',
    title: 'Build Your Own Torrent Client',
    shortTitle: 'Torrent Client',
    description:
      'Learn peer-to-peer networking by implementing the essential parts of a BitTorrent client.',
    category: 'Networking',
    difficulty: 'Advanced',
    duration: '8–10 hours',
    status: 'coming-soon',
    concepts: ['Peers', 'Trackers', 'Pieces', 'Bencoding'],
    languages: [],
    featured: false,
    order: 7,
    whatYoullUnderstand: ['Peer discovery', 'Piece exchange', 'Bencoding', 'Integrity checks'],
    whatYoullBuild: 'A small client that discovers peers and downloads verified pieces.',
  },
  {
    slug: 'media-player',
    title: 'Build Your Own Media Player',
    shortTitle: 'Media Player',
    description:
      'Explore media decoding, playback and buffering by creating a simplified media player.',
    category: 'Multimedia',
    difficulty: 'Intermediate',
    duration: '6–8 hours',
    status: 'coming-soon',
    concepts: ['Decoding', 'Playback', 'Buffers', 'Timing'],
    languages: [],
    featured: false,
    order: 8,
    whatYoullUnderstand: ['Containers', 'Codecs', 'Buffering', 'Playback clocks'],
    whatYoullBuild: 'A simplified player that decodes and schedules a small media stream.',
  },
] as const satisfies readonly Build[];

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
