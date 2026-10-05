import Link from 'next/link';
import { Brand } from './brand';
import { siteConfig } from '@/lib/site-config';

const links = [
  { href: '/builds', label: 'Builds' },
  { href: '/topics', label: 'Topics' },
  { href: '/about', label: 'About' },
] as const;

export function SiteHeader() {
  return (
    <header className="site-header">
      <div className="site-header-inner shell">
        <Brand />
        <nav className="desktop-nav" aria-label="Primary navigation">
          {links.map((link) => (
            <Link key={link.href} href={link.href}>{link.label}</Link>
          ))}
          <a href={siteConfig.github} target="_blank" rel="noreferrer">GitHub ↗</a>
          <a href={siteConfig.byteStack} target="_blank" rel="noreferrer">ByteStack ↗</a>
        </nav>
        <details className="mobile-nav">
          <summary aria-label="Open navigation">Menu <span aria-hidden="true">＋</span></summary>
          <nav aria-label="Mobile navigation">
            {links.map((link) => (
              <Link key={link.href} href={link.href}>{link.label}</Link>
            ))}
            <a href={siteConfig.github} target="_blank" rel="noreferrer">GitHub ↗</a>
            <a href={siteConfig.byteStack} target="_blank" rel="noreferrer">ByteStack ↗</a>
          </nav>
        </details>
      </div>
    </header>
  );
}
