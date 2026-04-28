// Arte de portada generado por hash del ID del post.
// Mientras no haya imágenes reales, produce algo único y reconocible por post.
function hashStr(seed: string): number {
  let h = 0;
  for (let i = 0; i < seed.length; i++) h = (h * 31 + seed.charCodeAt(i)) >>> 0;
  return h;
}

interface Props {
  seed: string;
  accent: string;
  glyph: string;
  className?: string;
}

export function PlaceholderArt({ seed, accent, glyph, className = 'placeholder-art' }: Props) {
  const h = hashStr(seed);
  const lines = Array.from({ length: 14 }, (_, i) => {
    const w = 30 + ((h >>> (i * 3)) & 0xff) % 240;
    const y = 6 + i * 16;
    return <rect key={i} x={0} y={y} width={w} height={2} fill="#3a3e2e" opacity={0.5 + (i % 3) * 0.15} />;
  });

  return (
    <svg className={className} viewBox="0 0 480 220" preserveAspectRatio="none">
      <defs>
        <linearGradient id={`g-${seed}`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%"   stopColor="#262921" />
          <stop offset="100%" stopColor="#1a1d12" />
        </linearGradient>
      </defs>
      <rect width={480} height={220} fill={`url(#g-${seed})`} />
      {lines}
      <text
        x="50%" y="50%" textAnchor="middle" dominantBaseline="middle"
        fill={accent} opacity={0.18} fontSize={180}
        fontFamily="Helvetica, sans-serif" fontWeight={900}
      >
        {glyph}
      </text>
      <text x="50%" y="92%" textAnchor="middle" fill="#5a6450" fontSize={9} fontFamily="VT323, monospace" letterSpacing={3}>
        ━━━ COVER PLACEHOLDER · {seed.toUpperCase()} ━━━
      </text>
    </svg>
  );
}
