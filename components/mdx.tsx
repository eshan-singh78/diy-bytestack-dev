import defaultMdxComponents from 'fumadocs-ui/mdx';
import type { MDXComponents } from 'mdx/types';
import { Note, TryIt, Warning, WhatHappened, Why } from './mdx-callout';

export function getMDXComponents(components?: MDXComponents) {
  return {
    ...defaultMdxComponents,
    Note,
    Why,
    Warning,
    TryIt,
    WhatHappened,
    ...components,
  } satisfies MDXComponents;
}

export const useMDXComponents = getMDXComponents;

declare global {
  type MDXProvidedComponents = ReturnType<typeof getMDXComponents>;
}
