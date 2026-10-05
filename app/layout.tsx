import type { Metadata, Viewport } from 'next';
import { RootProvider } from 'fumadocs-ui/provider/next';
import { siteConfig } from '@/lib/site-config';
import './global.css';

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: 'DIY ByteStack — Learn by Building',
    template: '%s | DIY ByteStack',
  },
  description: siteConfig.description,
  applicationName: siteConfig.name,
  authors: [{ name: 'ByteStack', url: siteConfig.byteStack }],
  creator: 'ByteStack',
  publisher: 'ByteStack',
  icons: { icon: '/favicon.svg' },
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#f5f5f2',
};

export default function RootLayout({ children }: LayoutProps<'/'>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <a className="skip-link" href="#main-content">Skip to content</a>
        <RootProvider theme={{ enabled: false }}>{children}</RootProvider>
      </body>
    </html>
  );
}
