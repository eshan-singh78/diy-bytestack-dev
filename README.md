# DIY ByteStack

**Don't just use it. Build it.**

DIY ByteStack is a free technical publication where developers understand everyday technologies by
rebuilding simplified versions themselves. The repository is the CMS: builds, language implementations
and chapters are reviewed in Git and deployed as a Next.js application.

Production site: [diy.bytestack.in](https://diy.bytestack.in)

## What is included

- Custom editorial homepage, build catalog, topic browser, build overviews, About page and 404
- Metadata-driven project search plus topic and difficulty filters
- Fumadocs MDX content pipeline, documentation search, sidebar tree, table of contents, code blocks and anchors
- A complete ten-chapter **Build Your Own HTTP Server in Python** demonstration guide
- Reusable `<Note>`, `<Why>`, `<Warning>`, `<TryIt>` and `<WhatHappened>` MDX components
- Previous/next navigation, step counts, language switching architecture and GitHub edit/issue links
- Responsive layout, accessible navigation, reduced-motion handling and mobile documentation navigation
- Metadata, canonical URLs, Open Graph/X card, `robots.txt`, `sitemap.xml` and TechArticle structured data
- A zero-database, Git-to-Vercel deployment model

## Technology stack

- Next.js 16 App Router
- React 19 and TypeScript
- Fumadocs Core/UI 16
- Fumadocs MDX 15
- MDX content files
- Tailwind CSS 4 as the Fumadocs style compiler, with a custom CSS design system
- Vercel deployment defaults

The application has no database, authentication, CMS backend or persistent runtime state.

## Local development

### Requirements

- Node.js 20.9 or newer
- npm 10 or newer

### Install and run

```bash
git clone https://github.com/eshan-singh78/diy-bytestack-dev.git
cd diy-bytestack-dev
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

### Validation

```bash
npm run lint
npm run typecheck
npm run build
```

Preview the production build locally with:

```bash
npm run start
```

## Repository map

```text
app/                         Next.js routes, metadata, search API and global styles
components/                  Shared site, catalog, guide and MDX components
content/builds/              Fumadocs MDX build implementations
  http-server/
    python/
      meta.json              Ordered chapter navigation
      01-introduction.mdx
      ...
      10-where-to-go-next.mdx
lib/builds.ts                Strongly typed build catalog and implementation availability
lib/site-config.ts           Production URL and external links
lib/source.ts                Fumadocs source loader
public/                      Static brand and social assets
```

Presentation and content are separate. `lib/builds.ts` controls catalog metadata and availability;
`content/builds/` contains the actual reader content.

## Add a build

1. Add a typed entry to `builds` in `lib/builds.ts`. Use a unique slug and order number.
2. Set `status` to `coming-soon` until at least one language implementation is complete.
3. Create `content/builds/<build-slug>/meta.json` and a folder for each available language.
4. Add the build slug to `content/builds/meta.json`.
5. When publishing, set `status: 'available'` and list only real implementations in `languages`.
6. Run all validation commands.

Do not create placeholder guide routes for unavailable languages. A coming-soon build has an overview,
but no reader route until its content exists.

## Add a language implementation

1. Create `content/builds/<build-slug>/<language>/`.
2. Add a `meta.json` with `"root": true`, a human-readable title, description and ordered `pages` array.
3. Add chapter MDX files. Use the same semantic chapter slug as other languages when chapters are equivalent.
4. Add the language identifier to the build's `languages` array in `lib/builds.ts`.

The language selector uses matching chapter slugs to preserve the current step. If a matching slug does
not exist, it opens the selected implementation's first chapter.

To support a language not already in the `languages` tuple, add its lowercase identifier in
`lib/builds.ts` and update `formatLanguage()` if its display capitalization is special.

## Add or reorder a chapter

Create a focused MDX file with frontmatter:

```mdx
---
title: Reading a Request
description: Read bytes and identify the end of the HTTP header section.
---

Chapter content starts here.
```

Use zero-padded filenames such as `06-reading-a-request.mdx`. Add or move its slug in the language
folder's `meta.json` `pages` array. That order drives the Fumadocs sidebar; filenames keep derived
previous/next navigation deterministic. Do not duplicate chapter arrays in React components.

## Use custom MDX components

The following components are globally available in every guide:

```mdx
<Why>
HTTP needs a transport before it can exchange protocol messages.
</Why>

<TryIt>
Change the listening port and reconnect.
</TryIt>

<Note>Useful supporting context.</Note>

<Warning>A boundary or safety concern.</Warning>

<WhatHappened>A concise explanation of the mechanism just exercised.</WhatHappened>
```

Their implementation is in `components/mdx-callout.tsx`, and registration is centralized in
`components/mdx.tsx`.

## Catalog states and featuring

- Use `status: 'coming-soon'` to keep a build visible without linking to nonexistent documentation.
- Use `status: 'available'` only after its listed implementations exist and build successfully.
- Set exactly one build's `featured` field to `true` to use it in the homepage feature section.
- Catalog cards, topics, counts, filters and overviews all read from `lib/builds.ts`.

## Site configuration

Edit `lib/site-config.ts` to change:

- site name and description
- production origin
- GitHub repository and issue tracker
- main ByteStack URL
- social metadata

External URLs should not be duplicated in components. Changing the repository value also updates
header/footer links and each chapter's edit and issue URLs.

## Search

The build directory searches the in-memory typed catalog across titles, descriptions, categories,
concepts, difficulty and languages.

The guide reader uses Fumadocs' self-hosted search endpoint at `app/api/search/route.ts`; the search
index comes directly from MDX structured data. No external search account is required.

## Deploy to Vercel

No `vercel.json` is required. The application uses standard Next.js behavior.

1. Push the repository to GitHub.
2. In Vercel, choose **Add New → Project** and import the repository.
3. Leave the detected framework as **Next.js**.
4. Leave the install command as `npm install` and build command as `npm run build`.
5. Deploy. No environment variables or database setup are required.

Every later push to the connected production branch triggers a new deployment.

### Connect `diy.bytestack.in`

1. Open the Vercel project and go to **Settings → Domains**.
2. Add `diy.bytestack.in`.
3. Vercel will show the required DNS record. Add that exact record with your DNS provider.
4. Wait for DNS verification and certificate issuance in Vercel.
5. Confirm that `https://diy.bytestack.in`, `/robots.txt` and `/sitemap.xml` respond correctly.

Do not copy a generic DNS value from this README; use the value Vercel shows for the project.

## Contributing

See [CONTRIBUTING.md](./CONTRIBUTING.md). Small clarity and correctness fixes are welcome. Please open
an issue before beginning a large new build or language implementation so scope and chapter structure
can be discussed.
