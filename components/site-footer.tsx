import Link from 'next/link';
import { Brand } from './brand';
import { siteConfig } from '@/lib/site-config';

export function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="shell footer-grid">
        <div className="footer-intro">
          <Brand compact />
          <p>Don&apos;t just use it.<br />Build it.</p>
        </div>
        <div>
          <p className="micro-label">Explore</p>
          <Link href="/builds">Builds</Link>
          <Link href="/topics">Topics</Link>
          <Link href="/about">About</Link>
        </div>
        <div>
          <p className="micro-label">Elsewhere</p>
          <a href={siteConfig.github} target="_blank" rel="noreferrer">GitHub ↗</a>
          <a href={siteConfig.byteStack} target="_blank" rel="noreferrer">ByteStack ↗</a>
        </div>
      </div>
      <div className="shell footer-bottom">
        <span>DIY BYTESTACK</span>
        <span>BUILT BY BYTESTACK.</span>
      </div>
    </footer>
  );
}
