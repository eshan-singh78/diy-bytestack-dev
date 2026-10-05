import Link from 'next/link';
import type { Build } from '@/lib/builds';

export function BuildCard({ build }: { build: Build }) {
  const index = String(build.order).padStart(2, '0');
  const available = build.status === 'available';
  return (
    <article className={`build-card ${available ? '' : 'is-coming'}`}>
      <div className="build-card-top">
        <span className="build-number">{index}</span>
        <span className={`status-label ${available ? 'available' : ''}`}>
          {available ? 'Available now' : 'Coming soon'}
        </span>
      </div>
      <div>
        <p className="micro-label">Build your own</p>
        <h3>{build.shortTitle}</h3>
        <p className="build-description">{build.description}</p>
      </div>
      <dl className="build-facts">
        <div><dt>Topic</dt><dd>{build.category}</dd></div>
        <div><dt>Level</dt><dd>{build.difficulty}</dd></div>
        <div><dt>Time</dt><dd>{build.duration}</dd></div>
      </dl>
      {available ? (
        <Link className="text-link" href={`/builds/${build.slug}`}>Start build →</Link>
      ) : (
        <span className="text-link muted-link">In the workshop</span>
      )}
    </article>
  );
}
