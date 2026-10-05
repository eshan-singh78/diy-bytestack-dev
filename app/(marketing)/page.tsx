import Link from 'next/link';
import type { Metadata } from 'next';
import { BuildExplorer } from '@/components/build-explorer';
import { builds } from '@/lib/builds';
import { createMetadata } from '@/lib/metadata';
import { siteConfig } from '@/lib/site-config';

export const metadata: Metadata = createMetadata({
  title: "Don't Just Use It. Build It.",
  description: siteConfig.description,
  path: '/',
});

const processSteps = [
  ['01', 'Choose', "Pick something you've always wanted to understand."],
  ['02', 'Pick a language', 'Choose from the implementations available for that build.'],
  ['03', 'Build', 'Follow the guide and implement each important piece yourself.'],
  ['04', 'Understand', 'Finish with a working miniature and understand why the real technology works.'],
] as const;

export default function HomePage() {
  const featured = builds.find((build) => build.featured) ?? builds[0];

  return (
    <>
      <section className="hero shell section-rule">
        <div className="hero-copy">
          <p className="eyebrow"><span>DIY / BYTESTACK</span><span>Free engineering guides</span></p>
          <h1>Don&apos;t just<br />use it.<br /><mark>Build it.</mark></h1>
          <p className="hero-lede">
            Understand the software you use every day by rebuilding the important parts yourself.
          </p>
          <p className="hero-support">
            Build simplified versions of real technologies, follow the implementation step by step,
            and understand what is actually happening underneath.
          </p>
          <div className="button-row">
            <Link className="button button-dark" href="/builds">Explore builds →</Link>
            <Link className="button button-light" href="#what-is-diy">What is DIY?</Link>
          </div>
        </div>
        <aside className="hero-checklist" aria-labelledby="how-diy-works">
          <p className="eyebrow" id="how-diy-works">How DIY works</p>
          <ol>
            <li><span className="check-square" aria-hidden="true">✓</span>Pick something to build</li>
            <li><span className="check-square" aria-hidden="true">✓</span>Choose your language</li>
            <li><span className="check-square" aria-hidden="true">✓</span>Follow the build steps</li>
            <li><span className="check-square" aria-hidden="true">✓</span>Understand how it works</li>
          </ol>
          <p className="repeat-line">Build / Break / Understand / Repeat</p>
        </aside>
      </section>

      <section className="info-strip" aria-label="DIY ByteStack facts">
        <div className="shell info-strip-grid">
          <div><span className="yellow-square" aria-hidden="true" /><strong>Free</strong><span>No signup</span></div>
          <div><span className="yellow-square" aria-hidden="true" /><strong>Open</strong><span>GitHub based</span></div>
          <div><span className="yellow-square" aria-hidden="true" /><strong>Hands-on</strong><span>Build from scratch</span></div>
        </div>
      </section>

      <section className="editorial-section shell section-rule" id="what-is-diy">
        <div><p className="section-index">01 / What is DIY?</p></div>
        <div className="editorial-copy">
          <h2>What is DIY?</h2>
          <p className="large-copy">DIY ByteStack is a collection of practical engineering guides designed around one idea:</p>
          <p>You understand technology differently once you build it yourself.</p>
          <p>
            Instead of only explaining how HTTP, Git, databases, shells or containers work, we guide
            you through implementing small versions of them.
          </p>
          <p className="highlight-statement"><span>Learn by building.</span></p>
        </div>
      </section>

      <section className="catalog-section shell section-rule">
        <div className="section-heading-row">
          <div>
            <p className="section-index">02 / The catalog</p>
            <h2>Start building</h2>
          </div>
          <p>Pick a technology. Choose an implementation. Build the important parts yourself.</p>
        </div>
        <BuildExplorer items={builds} mode="compact" />
        <div className="section-end-link"><Link className="text-link" href="/builds">Browse the complete catalog →</Link></div>
      </section>

      <section className="featured-section">
        <div className="shell featured-grid">
          <div className="featured-meta">
            <p className="section-index inverse">Featured build / {String(featured.order).padStart(2, '0')}</p>
            <span className="featured-language">Python</span>
          </div>
          <div className="featured-copy">
            <p className="micro-label">Build your own</p>
            <h2>{featured.shortTitle}</h2>
            <p>From opening a TCP socket to serving your first HTTP response.</p>
            <div className="concept-list">
              {featured.concepts.map((concept) => <span key={concept}>{concept}</span>)}
            </div>
            <Link className="text-link inverse-link" href={`/builds/${featured.slug}`}>Start building →</Link>
          </div>
        </div>
      </section>

      <section className="process-section shell section-rule">
        <div className="section-heading-row">
          <div>
            <p className="section-index">03 / The method</p>
            <h2>How it works</h2>
          </div>
        </div>
        <ol className="process-grid">
          {processSteps.map(([number, title, copy]) => (
            <li key={number}>
              <span>{number}</span>
              <h3>{title}</h3>
              <p>{copy}</p>
            </li>
          ))}
        </ol>
      </section>

      <section className="philosophy-section shell section-rule">
        <div className="philosophy-heading">
          <p className="section-index">04 / The philosophy</p>
          <h2>No 12-hour video.<br />No 80-slide deck.<br /><mark>Just build it.</mark></h2>
        </div>
        <div className="philosophy-grid">
          <div><span>01</span><h3>Read</h3><p>Understand one small concept.</p></div>
          <div><span>02</span><h3>Code</h3><p>Implement that concept yourself.</p></div>
          <div><span>03</span><h3>Break</h3><p>Experiment, modify it and see what happens.</p></div>
        </div>
        <p className="repeat-bottom">Repeat until you&apos;ve built the thing.</p>
      </section>

      <section className="open-source-section shell section-rule">
        <div>
          <p className="section-index">05 / Open source</p>
          <h2>Built in the open.</h2>
        </div>
        <div className="open-source-copy">
          <p>Every DIY ByteStack guide lives in GitHub.</p>
          <ul>
            <li><strong>Found a mistake?</strong> Improve the guide.</li>
            <li><strong>Want another language?</strong> Build the implementation.</li>
            <li><strong>Want to teach something?</strong> Contribute a build.</li>
          </ul>
          <div className="button-row">
            <a className="button button-dark" href={siteConfig.github} target="_blank" rel="noreferrer">View on GitHub ↗</a>
            <a className="button button-light" href={`${siteConfig.github}/blob/main/CONTRIBUTING.md`} target="_blank" rel="noreferrer">Contributing guide ↗</a>
          </div>
        </div>
      </section>

      <section className="final-cta">
        <div className="shell final-cta-inner">
          <div>
            <p className="section-index inverse">Your turn</p>
            <h2>What do you<br />want to build?</h2>
          </div>
          <div>
            <p>Pick something interesting and start taking it apart.</p>
            <Link className="button button-accent" href="/builds">Explore builds →</Link>
          </div>
        </div>
      </section>
    </>
  );
}
