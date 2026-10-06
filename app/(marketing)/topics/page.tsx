import Link from 'next/link';
import type { Metadata } from 'next';
import { builds, categories, categorySlug } from '@/lib/builds';
import { createMetadata } from '@/lib/metadata';

export const metadata: Metadata = createMetadata({
  title: 'Topics',
  description: 'Explore DIY ByteStack builds by engineering topic.',
  path: '/topics',
});

export default function TopicsPage() {
  return (
    <>
      <header className="page-hero topics-page-hero shell section-rule">
        <p className="eyebrow"><span>Browse / By subject</span></p>
        <h1>Topics</h1>
        <p>Start with the part of the stack<br />you want to understand.</p>
      </header>
      <section className="shell topics-grid topics-index-grid" aria-label="Build topics">
        {categories.map((category, index) => {
          const topicBuilds = builds.filter((build) => build.category === category);
          const available = topicBuilds.filter((build) => build.status === 'available').length;
          return (
            <Link key={category} className="topic-card" href={`/builds?topic=${categorySlug(category)}`}>
              <span className="topic-index">{String(index + 1).padStart(2, '0')}</span>
              <h2>{category}</h2>
              <dl>
                <div><dt>Total</dt><dd>{topicBuilds.length}</dd></div>
                <div><dt>Available</dt><dd>{available}</dd></div>
                <div><dt>Coming soon</dt><dd>{topicBuilds.length - available}</dd></div>
              </dl>
              <span className="text-link">View builds →</span>
            </Link>
          );
        })}
      </section>
    </>
  );
}
