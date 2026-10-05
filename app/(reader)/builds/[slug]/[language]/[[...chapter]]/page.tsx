import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound, redirect } from 'next/navigation';
import { createRelativeLink } from 'fumadocs-ui/mdx';
import {
  DocsBody,
  DocsDescription,
  DocsPage,
  DocsTitle,
} from 'fumadocs-ui/layouts/docs/page';
import { getMDXComponents } from '@/components/mdx';
import { formatLanguage, getBuild } from '@/lib/builds';
import { getGuidePages, source } from '@/lib/source';
import { siteConfig } from '@/lib/site-config';

type GuideParams = {
  slug: string;
  language: string;
  chapter?: string[];
};

function getGuidePage(params: GuideParams) {
  return source.getPage([params.slug, params.language, ...(params.chapter ?? [])]);
}

export function generateStaticParams() {
  return source.getPages().map((page) => ({
    slug: page.slugs[0],
    language: page.slugs[1],
    chapter: page.slugs.slice(2),
  }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<GuideParams>;
}): Promise<Metadata> {
  const resolved = await params;
  const page = getGuidePage(resolved);
  const build = getBuild(resolved.slug);
  if (!page || !build) return {};
  const title = `${page.data.title} — ${build.shortTitle} in ${formatLanguage(resolved.language)}`;
  return {
    title,
    description: page.data.description,
    alternates: { canonical: page.url },
    openGraph: {
      type: 'article',
      title,
      description: page.data.description,
      url: page.url,
      images: ['/og.png'],
    },
  };
}

export default async function GuidePage({ params }: { params: Promise<GuideParams> }) {
  const resolved = await params;
  const build = getBuild(resolved.slug);
  if (!build || build.status !== 'available' || !build.languages.some((item) => item === resolved.language)) notFound();

  const pages = getGuidePages(resolved.slug, resolved.language);
  if (!resolved.chapter?.length) {
    const first = pages[0];
    if (!first) notFound();
    redirect(first.url);
  }

  const page = getGuidePage(resolved);
  if (!page) notFound();

  const index = pages.findIndex((item) => item.url === page.url);
  const previous = index > 0 ? pages[index - 1] : undefined;
  const next = index >= 0 && index < pages.length - 1 ? pages[index + 1] : undefined;
  const MDX = page.data.body;
  const editUrl = `${siteConfig.github}/edit/main/content/builds/${page.path}`;
  const issueUrl = `${siteConfig.issues}/new?title=${encodeURIComponent(`Guide feedback: ${page.data.title}`)}&body=${encodeURIComponent(`Page: ${page.url}\n\nWhat should change?\n`)}`;
  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'TechArticle',
    headline: page.data.title,
    description: page.data.description,
    url: `${siteConfig.url}${page.url}`,
    isPartOf: { '@type': 'CreativeWorkSeries', name: build.title },
    publisher: { '@type': 'Organization', name: 'ByteStack', url: siteConfig.byteStack },
    proficiencyLevel: build.difficulty,
  };

  return (
    <DocsPage toc={page.data.toc}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData).replaceAll('<', '\\u003c') }}
      />
      <div className="guide-step-line">
        <span>Build / {String(build.order).padStart(2, '0')}</span>
        <span>{formatLanguage(resolved.language)}</span>
        <span>Step {index + 1} of {pages.length}</span>
      </div>
      <DocsTitle>{page.data.title}</DocsTitle>
      <DocsDescription>{page.data.description}</DocsDescription>
      <DocsBody>
        <MDX components={getMDXComponents({ a: createRelativeLink(source, page) })} />
      </DocsBody>

      <nav className="chapter-navigation" aria-label="Chapter navigation">
        <div>
          {previous ? (
            <Link href={previous.url}><span>← Previous</span><strong>{previous.data.title}</strong></Link>
          ) : <span />}
        </div>
        <div className="chapter-next">
          {next ? (
            <Link href={next.url}><span>Next →</span><strong>{next.data.title}</strong></Link>
          ) : (
            <Link href={`/builds/${build.slug}`}><span>Build complete →</span><strong>Return to overview</strong></Link>
          )}
        </div>
      </nav>

      <footer className="guide-page-footer">
        <span>Something unclear?</span>
        <a href={editUrl} target="_blank" rel="noreferrer">Edit this page ↗</a>
        <a href={issueUrl} target="_blank" rel="noreferrer">Report an issue ↗</a>
      </footer>
    </DocsPage>
  );
}
