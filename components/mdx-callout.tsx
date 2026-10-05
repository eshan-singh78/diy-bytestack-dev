import type { ReactNode } from 'react';

type CalloutKind = 'note' | 'why' | 'warning' | 'try' | 'happened';

const labels: Record<CalloutKind, string> = {
  note: 'Note',
  why: 'Why?',
  warning: 'Warning',
  try: 'Try it',
  happened: 'What just happened?',
};

function Callout({ kind, children }: { kind: CalloutKind; children: ReactNode }) {
  return (
    <aside className={`mdx-callout callout-${kind}`}>
      <p className="callout-label"><span aria-hidden="true" />{labels[kind]}</p>
      <div>{children}</div>
    </aside>
  );
}

export function Note({ children }: { children: ReactNode }) {
  return <Callout kind="note">{children}</Callout>;
}

export function Why({ children }: { children: ReactNode }) {
  return <Callout kind="why">{children}</Callout>;
}

export function Warning({ children }: { children: ReactNode }) {
  return <Callout kind="warning">{children}</Callout>;
}

export function TryIt({ children }: { children: ReactNode }) {
  return <Callout kind="try">{children}</Callout>;
}

export function WhatHappened({ children }: { children: ReactNode }) {
  return <Callout kind="happened">{children}</Callout>;
}
