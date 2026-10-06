import type { BaseLayoutProps } from 'fumadocs-ui/layouts/shared';
import { Brand } from '@/components/brand';
import { siteConfig } from './site-config';

export function guideLayoutOptions(): BaseLayoutProps {
  return {
    nav: {
      title: <Brand compact linked={false} />,
      url: '/',
    },
    links: [
      { text: 'Builds', url: '/builds' },
      { text: 'Topics', url: '/topics' },
      { text: 'About', url: '/about' },
      { text: 'GitHub ↗', url: siteConfig.github, external: true },
    ],
    githubUrl: siteConfig.github,
    themeSwitch: { enabled: false },
  };
}
