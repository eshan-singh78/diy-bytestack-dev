import { defineDocs } from 'fumadocs-mdx/macro';
import { loader } from 'fumadocs-core/source';
import { metaSchema, pageSchema } from 'fumadocs-core/source/schema';

const buildDocs = defineDocs({
  dir: 'content/builds',
  docs: { schema: pageSchema },
  meta: { schema: metaSchema },
});

export const source = loader({
  baseUrl: '/builds',
  source: buildDocs.toFumadocsSource(),
});

export function getGuidePages(buildSlug: string, language: string) {
  return source
    .getPages()
    .filter((page) => page.slugs[0] === buildSlug && page.slugs[1] === language)
    .sort((a, b) => a.path.localeCompare(b.path));
}
