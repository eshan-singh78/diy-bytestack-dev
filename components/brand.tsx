import Link from 'next/link';

export function Brand({
  compact = false,
  linked = true,
}: {
  compact?: boolean;
  linked?: boolean;
}) {
  const content = (
    <>
      <span className="brand-main">BYTESTACK</span>
      <span className="brand-diy">DIY</span>
      {!compact && <span className="brand-rule" aria-hidden="true" />}
    </>
  );

  if (!linked) return <span className="brand">{content}</span>;

  return (
    <Link className="brand" href="/" aria-label="DIY ByteStack home">
      {content}
    </Link>
  );
}
