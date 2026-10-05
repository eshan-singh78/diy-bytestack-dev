'use client';

import { usePathname, useRouter } from 'next/navigation';
import type { BuildLanguage } from '@/lib/builds';
import { formatLanguage } from '@/lib/builds';

export function LanguageSelector({
  buildSlug,
  language,
  implementations,
  chapters,
}: {
  buildSlug: string;
  language: string;
  implementations: readonly BuildLanguage[];
  chapters: Record<string, string[]>;
}) {
  const pathname = usePathname();
  const router = useRouter();

  function changeLanguage(nextLanguage: string) {
    const currentChapter = pathname.split('/').filter(Boolean).at(-1) ?? '';
    const targetChapter = chapters[nextLanguage]?.includes(currentChapter)
      ? currentChapter
      : chapters[nextLanguage]?.[0];
    if (targetChapter) router.push(`/builds/${buildSlug}/${nextLanguage}/${targetChapter}`);
  }

  return (
    <label className="language-select">
      <span>Implementation</span>
      <select
        aria-label="Guide language"
        value={language}
        onChange={(event) => changeLanguage(event.target.value)}
      >
        {implementations.map((item) => (
          <option value={item} key={item}>{formatLanguage(item)}</option>
        ))}
      </select>
    </label>
  );
}
