import type { ReactNode } from 'react';
import { notFound } from 'next/navigation';
import { DocsLayout } from 'fumadocs-ui/layouts/docs';
import { LanguageSelector } from '@/components/language-selector';
import { getBuild } from '@/lib/builds';
import { guideLayoutOptions } from '@/lib/layout.shared';
import { getGuidePages, source } from '@/lib/source';

export default async function GuideLayout({
  children,
  params,
}: {
  children: ReactNode;
  params: Promise<{ slug: string; language: string }>;
}) {
  const { slug, language } = await params;
  const build = getBuild(slug);
  if (!build || build.status !== 'available' || !build.languages.some((item) => item === language)) notFound();

  const chapters = Object.fromEntries(
    build.languages.map((item) => [
      item,
      getGuidePages(slug, item).map((page) => page.slugs.at(-1) ?? ''),
    ]),
  );

  return (
    <div className="guide-scope" id="main-content">
      <DocsLayout
        tree={source.getPageTree()}
        {...guideLayoutOptions()}
        tabs={false}
        sidebar={{
          defaultOpenLevel: 4,
          banner: (
            <div className="guide-sidebar-banner" key="guide-sidebar-banner">
              <p>Build your own</p>
              <strong>{build.shortTitle}</strong>
              <LanguageSelector
                buildSlug={slug}
                language={language}
                implementations={build.languages}
                chapters={chapters}
              />
            </div>
          ),
        }}
      >
        {children}
      </DocsLayout>
    </div>
  );
}
