import type { MetadataRoute } from 'next';
import { builds } from '@/lib/builds';
import { source } from '@/lib/source';
import { absoluteUrl } from '@/lib/site-config';

export default function sitemap(): MetadataRoute.Sitemap {
  const updatedAt = new Date();
  const staticPages = [
    { path: '/', priority: 1, changeFrequency: 'weekly' as const },
    { path: '/builds', priority: 0.9, changeFrequency: 'weekly' as const },
    { path: '/topics', priority: 0.7, changeFrequency: 'monthly' as const },
    { path: '/about', priority: 0.5, changeFrequency: 'monthly' as const },
  ];

  return [
    ...staticPages.map((page) => ({
      url: absoluteUrl(page.path),
      lastModified: updatedAt,
      changeFrequency: page.changeFrequency,
      priority: page.priority,
    })),
    ...builds.map((build) => ({
      url: absoluteUrl(`/builds/${build.slug}`),
      lastModified: updatedAt,
      changeFrequency: 'monthly' as const,
      priority: build.status === 'available' ? 0.9 : 0.6,
    })),
    ...source.getPages().map((page) => ({
      url: absoluteUrl(page.url),
      lastModified: updatedAt,
      changeFrequency: 'monthly' as const,
      priority: 0.8,
    })),
  ];
}
