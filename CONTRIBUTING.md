# Contributing to DIY ByteStack

DIY ByteStack is a Git-based technical publication. Contributions can improve an explanation, fix a
technical mistake, add an implementation language, or propose a complete new build.

## Before you start

- Keep examples intentionally small and explain the boundary between learning code and production code.
- Prefer standard-library implementations when that makes the important mechanism easier to see.
- Do not add accounts, progress tracking, commercial calls to action, or unrelated product features.
- Open an issue before starting a large build so the content structure and scope can be agreed upon.

## Development workflow

```bash
npm install
npm run dev
```

Before opening a pull request, run:

```bash
npm run lint
npm run typecheck
npm run build
```

## Content contributions

Guide content lives under `content/builds/<build>/<language>/`. Use the existing HTTP Server/Python
guide as the reference for frontmatter, chapter ordering and custom MDX callouts. Keep one learning
step per chapter and add the chapter filename to the language folder's `meta.json`.

Build catalog descriptions and metadata live in `content/builds.json`. Edit the JSON entry there
when adding or updating a build; keep its slug and order unique.

Every pull request should explain what changed, why it is technically correct, and how it was tested.
