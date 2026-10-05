import Link from 'next/link';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { builds, formatLanguage, getBuild } from '@/lib/builds';
import { createMetadata } from '@/lib/metadata';

export function generateStaticParams() {
  return builds.map((build) => ({ slug: build.slug }));
}

export async function generateMetadata({ params }: PageProps<'/builds/[slug]'>): Promise<Metadata> {
  const { slug } = await params;
  const build = getBuild(slug);
  if (!build) notFound();
  return createMetadata({
    title: build.title,
    description: build.description,
    path: `/builds/${build.slug}`,
  });
}

export default async function BuildOverviewPage({ params }: PageProps<'/builds/[slug]'>) {
  const { slug } = await params;
  const build = getBuild(slug);
  if (!build) notFound();

  return (
    <article className="build-overview">
      <header className="build-overview-hero shell section-rule">
        <div className="overview-kicker">
          <span>Build / {String(build.order).padStart(2, '0')}</span>
          <span>{build.category}</span>
          <span>{build.difficulty}</span>
          <span>{build.duration}</span>
        </div>
        <p className="micro-label">Build your own</p>
        <h1>{build.shortTitle}</h1>
        <p className="overview-description">{build.description}</p>
      </header>

      <section className="overview-grid shell section-rule">
        <div>
          <p className="section-index">01 / Outcomes</p>
          <h2>What you&apos;ll understand</h2>
        </div>
        <ul className="understand-list">
          {build.whatYoullUnderstand.map((item, index) => (
            <li key={item}><span>{String(index + 1).padStart(2, '0')}</span>{item}</li>
          ))}
        </ul>
      </section>

      <section className="overview-grid shell section-rule">
        <div>
          <p className="section-index">02 / Deliverable</p>
          <h2>What you&apos;ll build</h2>
        </div>
        <div className="overview-prose">
          <p>{build.whatYoullBuild}</p>
          <p className="honesty-note"><span className="yellow-square" aria-hidden="true" />Built for understanding—not production use.</p>
        </div>
      </section>

      <section className="language-section shell section-rule">
        <div>
          <p className="section-index">03 / Implementation</p>
          <h2>Choose your language</h2>
        </div>
        {build.languages.length ? (
          <div className="language-grid">
            {build.languages.map((language) => (
              <Link key={language} className="language-card" href={`/builds/${build.slug}/${language}/01-introduction`}>
                <span className="language-index">01</span>
                <span className="language-name">{formatLanguage(language)}</span>
                <span>Start with {formatLanguage(language)} →</span>
              </Link>
            ))}
            <p className="more-languages">More implementations coming soon.</p>
          </div>
        ) : (
          <div className="coming-panel">
            <span className="yellow-square" aria-hidden="true" />
            <h3>Guide in progress.</h3>
            <p>This build is in the workshop. Its first complete implementation will appear here when it is ready.</p>
            <Link className="text-link" href="/builds">Explore available builds →</Link>
          </div>
        )}
      </section>
    </article>
  );
}
