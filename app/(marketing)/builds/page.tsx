import type { Metadata } from 'next';
import { BuildExplorer } from '@/components/build-explorer';
import { builds, categories, type BuildCategory } from '@/lib/builds';
import { createMetadata } from '@/lib/metadata';

export const metadata: Metadata = createMetadata({
  title: 'Builds',
  description: 'Browse every DIY ByteStack engineering build and choose what to rebuild next.',
  path: '/builds',
});

function getInitialCategory(topic?: string): 'All' | BuildCategory {
  if (!topic) return 'All';
  return categories.find((category) => category.toLowerCase().replaceAll(' ', '-') === topic) ?? 'All';
}

export default async function BuildsPage({
  searchParams,
}: {
  searchParams: Promise<{ topic?: string }>;
}) {
  const { topic } = await searchParams;
  return (
    <>
      <header className="page-hero shell section-rule">
        <p className="eyebrow"><span>Catalog / {String(builds.length).padStart(2, '0')} builds</span></p>
        <h1>Builds</h1>
        <p>Pick something you use every day.<br />Then rebuild the important parts.</p>
      </header>
      <section className="shell directory-section">
        <BuildExplorer items={builds} initialCategory={getInitialCategory(topic)} />
      </section>
    </>
  );
}
