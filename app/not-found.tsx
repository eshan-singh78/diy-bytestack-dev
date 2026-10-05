import Link from 'next/link';
import { MarketingShell } from '@/components/marketing-shell';

export default function NotFound() {
  return (
    <MarketingShell>
      <section className="not-found shell" id="main-content">
        <p className="eyebrow"><span>Error / 404</span></p>
        <span className="not-found-code">404</span>
        <h1>This part isn&apos;t built yet.</h1>
        <p>The route exists only in theory. Head back to the catalog and build something real.</p>
        <Link className="button button-dark" href="/builds">Explore builds →</Link>
      </section>
    </MarketingShell>
  );
}
