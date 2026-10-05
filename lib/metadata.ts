import type { Metadata } from 'next';
import { absoluteUrl, siteConfig } from './site-config';

export function createMetadata({
  title,
  description,
  path,
}: {
  title: string;
  description: string;
  path: string;
}): Metadata {
  const canonical = absoluteUrl(path);
  return {
    title,
    description,
    alternates: { canonical },
    openGraph: {
      type: 'website',
      siteName: siteConfig.name,
      title,
      description,
      url: canonical,
      images: [{ url: absoluteUrl('/og.png'), width: 1200, height: 630, alt: siteConfig.tagline }],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [absoluteUrl('/og.png')],
    },
  };
}
