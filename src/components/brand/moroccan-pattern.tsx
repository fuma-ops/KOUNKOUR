// Motif géométrique marocain (étoile à 8 branches, style zellige) — touche
// locale demandée sur les côtés de l'écran de démarrage.
export function MoroccanPatternStrip({
  side,
  className = "",
  color = "#8D174B",
}: {
  side: "left" | "right";
  className?: string;
  color?: string;
}) {
  const patternId = `zellige-${side}`;

  return (
    <svg
      className={className}
      width="100%"
      height="100%"
      preserveAspectRatio="none"
      aria-hidden
    >
      <defs>
        <pattern id={patternId} width="34" height="34" patternUnits="userSpaceOnUse">
          <g fill="none" stroke={color} strokeWidth="1">
            <rect x="7" y="7" width="20" height="20" opacity="0.55" />
            <path d="M17 3 L31 17 L17 31 L3 17 Z" opacity="0.55" />
          </g>
        </pattern>
        <linearGradient id={`${patternId}-fade`} x1={side === "left" ? "1" : "0"} y1="0" x2={side === "left" ? "0" : "1"} y2="0">
          <stop offset="0%" stopColor="white" stopOpacity="0" />
          <stop offset="100%" stopColor="white" stopOpacity="1" />
        </linearGradient>
        <mask id={`${patternId}-mask`}>
          <rect width="100%" height="100%" fill={`url(#${patternId}-fade)`} />
        </mask>
      </defs>
      <rect width="100%" height="100%" fill={`url(#${patternId})`} mask={`url(#${patternId}-mask)`} />
    </svg>
  );
}
