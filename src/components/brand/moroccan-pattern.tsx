// Motifs géométriques marocains (style zellige) — touche locale demandée
// par le propriétaire : amas d'étoiles en coin + bandeau vague en bas.

export function MoroccanCornerPattern({
  corner,
  className = "",
  color = "#F4C6DB",
}: {
  corner: "top-left" | "top-right";
  className?: string;
  color?: string;
}) {
  const flip = corner === "top-right";
  const motif = (cx: number, cy: number, r: number, opacity: number) => (
    <g key={`${cx}-${cy}-${r}`} stroke={color} strokeWidth="1.4" fill="none" opacity={opacity}>
      <rect x={cx - r * 0.6} y={cy - r * 0.6} width={r * 1.2} height={r * 1.2} />
      <path
        d={`M${cx} ${cy - r} L${cx + r} ${cy} L${cx} ${cy + r} L${cx - r} ${cy} Z`}
      />
    </g>
  );

  return (
    <svg
      viewBox="0 0 220 220"
      className={className}
      style={{ transform: flip ? "scaleX(-1)" : undefined }}
      aria-hidden
    >
      {motif(30, 30, 60, 0.9)}
      {motif(120, 20, 40, 0.55)}
      {motif(30, 130, 38, 0.4)}
    </svg>
  );
}

export function MoroccanWaveBand({ className = "" }: { className?: string }) {
  const patternId = "zellige-wave";

  return (
    <svg
      viewBox="0 0 400 140"
      preserveAspectRatio="none"
      className={className}
      aria-hidden
    >
      <defs>
        <linearGradient id="wave-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#7A1440" />
          <stop offset="100%" stopColor="#D6428C" />
        </linearGradient>
        <pattern id={patternId} width="26" height="26" patternUnits="userSpaceOnUse">
          <g stroke="#FFFDFE" strokeWidth="1" fill="none" opacity="0.18">
            <rect x="5" y="5" width="16" height="16" />
            <path d="M13 2 L24 13 L13 24 L2 13 Z" />
          </g>
        </pattern>
        <clipPath id="wave-clip">
          <path d="M0,55 C100,15 300,90 400,45 L400,140 L0,140 Z" />
        </clipPath>
      </defs>
      <path d="M0,55 C100,15 300,90 400,45 L400,140 L0,140 Z" fill="url(#wave-gradient)" />
      <rect width="400" height="140" fill={`url(#${patternId})`} clipPath="url(#wave-clip)" />
    </svg>
  );
}
