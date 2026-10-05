import Link from 'next/link';

export function Brand({ compact = false }: { compact?: boolean }) {
  return (
    <Link className="brand" href="/" aria-label="DIY ByteStack home">
      <span className="brand-main">BYTESTACK</span>
      <span className="brand-diy">DIY</span>
      {!compact && <span className="brand-rule" aria-hidden="true" />}
    </Link>
  );
}
