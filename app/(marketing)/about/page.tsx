import type { Metadata } from 'next';
import { createMetadata } from '@/lib/metadata';
import { siteConfig } from '@/lib/site-config';

export const metadata: Metadata = createMetadata({
  title: 'About',
  description: 'Why DIY ByteStack teaches technology by rebuilding its important parts.',
  path: '/about',
});

export default function AboutPage() {
  return (
    <article className="about-page shell">
      <header className="about-hero section-rule">
        <p className="eyebrow"><span>About / DIY ByteStack</span></p>
        <h1>Don&apos;t just use it.<br /><mark>Build it.</mark></h1>
      </header>
      <div className="about-grid section-rule">
        <p className="section-index">Why this exists</p>
        <div className="about-copy">
          <p className="large-copy">
            Understanding technology becomes easier when you implement the important pieces yourself.
          </p>
          <p>
            DIY ByteStack publishes concise, hands-on engineering guides for rebuilding simplified
            versions of the tools and systems developers use every day.
          </p>
          <ul>
            <li>Every guide is free.</li>
            <li>No signup is required.</li>
            <li>Implementations are intentionally simplified.</li>
            <li>The goal is understanding—not replacing production software.</li>
            <li>Content is developed openly on GitHub.</li>
          </ul>
          <p>
            Found something unclear, want to add a language, or have a build to teach? Community
            contributions are welcome through <a href={siteConfig.github} target="_blank" rel="noreferrer">GitHub ↗</a>.
          </p>
        </div>
      </div>
    </article>
  );
}
