// Logo officiel KounKour — capuchon de graduation posé sur un livre ouvert,
// surmonté de l'étoile verte marocaine (accents "vert marocain avec
// modération", cahier des charges §4).
// `LogoMark` : version badge circulaire (en-tête, favicon, petits contextes).
// `LogoMarkNoBadge` : version claire (toque blanche), pour l'écran de
// démarrage à fond bordeaux plein.

const CAP_COLOR = "#241019";
const ACCENT = "#C73578";
const STAR_GREEN = "#1F8A5F";
const PAPER = "#FFFDFE";

function LogoGlyph({ light = false }: { light?: boolean }) {
  const capFill = light ? PAPER : CAP_COLOR;
  const capOutline = light ? { stroke: CAP_COLOR, strokeWidth: 1.6, strokeLinejoin: "round" as const } : {};

  return (
    <>
      {/* livre ouvert */}
      <path d="M50 84 C 36 76 24 62 28 44 C 38 54 46 68 50 84 Z" fill={PAPER} />
      <path d="M50 84 C 64 76 76 62 72 44 C 62 54 54 68 50 84 Z" fill={PAPER} />
      <line x1="50" y1="82" x2="50" y2="48" stroke="#8D174B" strokeWidth="1.2" opacity="0.35" />
      {/* ruban / marque-page */}
      <path d="M47 83 L53 83 L53 94 L50 90 L47 94 Z" fill={ACCENT} />
      {/* bande de la toque */}
      <path d="M41 37 L59 37 L55.5 51 L44.5 51 Z" fill={PAPER} />
      {/* toque de graduation */}
      <path d="M50 28 L74 38 L50 48 L26 38 Z" fill={capFill} {...capOutline} />
      <circle cx="50" cy="37.5" r="2.2" fill={capFill} {...capOutline} />
      <path d="M51 38 C 59 40 63 45 64 51" fill="none" stroke={ACCENT} strokeWidth="1.8" strokeLinecap="round" />
      <ellipse cx="64.5" cy="53.5" rx="2.6" ry="4" fill={ACCENT} transform="rotate(15 64.5 53.5)" />
      {/* étoile marocaine */}
      <path
        d="M50 2 L53.6 11.2 L63.3 12 L55.9 18.2 L58.3 27.6 L50 22.4 L41.7 27.6 L44.1 18.2 L36.7 12 L46.4 11.2 Z"
        fill={STAR_GREEN}
      />
    </>
  );
}

export function LogoMark({ size = 96, className = "" }: { size?: number; className?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 100 100" className={className} role="img" aria-label="KounKour">
      <defs>
        <linearGradient id="kounkour-logo-gradient-badge" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#8D174B" />
          <stop offset="100%" stopColor="#C73578" />
        </linearGradient>
      </defs>
      <circle cx="50" cy="50" r="48" fill="url(#kounkour-logo-gradient-badge)" />
      <g transform="translate(50,52) scale(0.92) translate(-50,-50)">
        <LogoGlyph />
      </g>
    </svg>
  );
}

// Version claire (toque blanche à liseré fin), utilisée en grand format sur
// l'écran de démarrage à fond bordeaux plein.
export function LogoMarkNoBadge({ size = 120, className = "" }: { size?: number; className?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 100 100" className={className} role="img" aria-label="KounKour">
      <LogoGlyph light />
    </svg>
  );
}
