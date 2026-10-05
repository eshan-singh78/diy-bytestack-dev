export const siteConfig = {
  name: 'DIY ByteStack',
  shortName: 'DIY / BYTESTACK',
  tagline: "Don't just use it. Build it.",
  description:
    'Free engineering guides for understanding everyday technologies by rebuilding their important parts.',
  url: 'https://diy.bytestack.in',
  github: 'https://github.com/eshan-singh78/diy-bytestack-dev',
  issues: 'https://github.com/eshan-singh78/diy-bytestack-dev/issues',
  byteStack: 'https://bytestack.in',
  social: {
    xHandle: '@bytestack',
  },
} as const;

export function absoluteUrl(path = '/') {
  return new URL(path, siteConfig.url).toString();
}
