'use client';

import { useMemo, useState } from 'react';
import { BuildCard } from './build-card';
import type { Build, BuildCategory, BuildDifficulty } from '@/lib/builds';
import { categories, difficulties } from '@/lib/builds';

type CategoryFilter = 'All' | BuildCategory;
type DifficultyFilter = 'All' | BuildDifficulty;

export function BuildExplorer({
  items,
  mode = 'full',
  initialCategory = 'All',
}: {
  items: readonly Build[];
  mode?: 'full' | 'compact';
  initialCategory?: CategoryFilter;
}) {
  const [query, setQuery] = useState('');
  const [category, setCategory] = useState<CategoryFilter>(initialCategory);
  const [difficulty, setDifficulty] = useState<DifficultyFilter>('All');

  const filtered = useMemo(() => {
    const normalized = query.trim().toLowerCase();
    return items.filter((build) => {
      const searchable = [
        build.title,
        build.description,
        build.category,
        build.difficulty,
        ...build.concepts,
        ...build.languages,
      ].join(' ').toLowerCase();
      return (
        (!normalized || searchable.includes(normalized)) &&
        (category === 'All' || build.category === category) &&
        (difficulty === 'All' || build.difficulty === difficulty)
      );
    });
  }, [category, difficulty, items, query]);

  const clear = () => {
    setQuery('');
    setCategory('All');
    setDifficulty('All');
  };

  return (
    <div className="build-explorer">
      {mode === 'full' && (
        <div className="catalog-search">
          <label htmlFor="build-search">Search the catalog</label>
          <div className="search-input-wrap">
            <span aria-hidden="true">⌕</span>
            <input
              id="build-search"
              type="search"
              placeholder="HTTP, sockets, Python…"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
            />
          </div>
        </div>
      )}

      <div className="filter-group" aria-label="Filter by topic">
        <span className="filter-title">Topic</span>
        <div className="filter-list">
          {(['All', ...categories] as CategoryFilter[]).map((item) => (
            <button
              key={item}
              type="button"
              aria-pressed={category === item}
              onClick={() => setCategory(item)}
            >
              {item}
            </button>
          ))}
        </div>
      </div>

      {mode === 'full' && (
        <div className="filter-group" aria-label="Filter by difficulty">
          <span className="filter-title">Level</span>
          <div className="filter-list">
            {(['All', ...difficulties] as DifficultyFilter[]).map((item) => (
              <button
                key={item}
                type="button"
                aria-pressed={difficulty === item}
                onClick={() => setDifficulty(item)}
              >
                {item}
              </button>
            ))}
          </div>
        </div>
      )}

      <div className="results-line" aria-live="polite">
        <span>{String(filtered.length).padStart(2, '0')} builds</span>
        {(query || category !== 'All' || difficulty !== 'All') && (
          <button type="button" onClick={clear}>Clear filters ×</button>
        )}
      </div>

      {filtered.length ? (
        <div className="build-grid">
          {filtered.map((build) => <BuildCard key={build.slug} build={build} />)}
        </div>
      ) : (
        <div className="empty-state">
          <span className="yellow-square" aria-hidden="true" />
          <h2>No builds found.</h2>
          <p>Try a broader search or reset the filters.</p>
          <button className="button button-dark" type="button" onClick={clear}>Clear filters →</button>
        </div>
      )}
    </div>
  );
}
