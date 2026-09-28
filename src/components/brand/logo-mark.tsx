// Logo officiel KounKour — capuchon de graduation posé sur un livre ouvert,
// entièrement blanc à l'exception de l'étoile verte marocaine (accents
// "vert marocain avec modération", cahier des charges §4). Reproduit
// fidèlement la référence fournie par le propriétaire : aucune autre
// couleur que le blanc et le vert de l'étoile.
// `LogoMark` : version badge circulaire (en-tête, favicon, petits contextes).
// `LogoMarkNoBadge` : version détourée, pour l'écran de démarrage à fond
// bordeaux plein.

const STAR_GREEN = "#1F8A5F";
const PAPER = "#FFFDFE";
const EDGE = "rgba(36,16,25,0.18)";

function LogoGlyph() {
  const shape = { fill: PAPER, stroke: EDGE, strokeWidth: 0.8, strokeLinejoin: "round" as const };
  const textLine = { fill: "none", stroke: EDGE, strokeWidth: 1, strokeLinecap: "round" as const };

  return (
    <>
      {/* livre ouvert : tranche des pages, puis les deux pages */}
      <path
        d="M50 84 C 40 77 26 75 11 78 L 11 81 C 26 78 40 80 50 87 C 60 80 74 78 89 81 L 89 78 C 74 75 60 77 50 84 Z"
        {...shape}
      />
      <path d="M50 58 C 40 52 26 50 13 53 L 13 76 C 26 73 40 75 50 82 Z" {...shape} />
      <path d="M50 58 C 60 52 74 50 87 53 L 87 76 C 74 73 60 75 50 82 Z" {...shape} />
      <path d="M44 63 C 37 59 29 58 20 59.5" {...textLine} />
      <path d="M44 69 C 37 65 29 64 20 65.5" {...textLine} />
      <path d="M56 63 C 63 59 71 58 80 59.5" {...textLine} />
      <path d="M56 69 C 63 65 71 64 80 65.5" {...textLine} />
      {/* toque de graduation : calotte, plateau, bouton et gland */}
      <path d="M34 38 L34 49 C 40 54 60 54 66 49 L66 38 Z" {...shape} />
      <path d="M50 23 L82 34 L50 45 L18 34 Z" {...shape} />
      <path d="M50 34 L74 36.8" {...textLine} />
      <circle cx="50" cy="34" r="1.8" {...shape} />
      <path d="M74 36.8 L74 48" fill="none" stroke={PAPER} strokeWidth="1.6" strokeLinecap="round" />
      <rect x="72" y="47" width="4" height="7" rx="1.5" fill={PAPER} />
      {/* étoile marocaine */}
      <path
        d="M50 1 L52.35 7.76 L59.51 7.91 L53.8 12.24 L55.88 19.09 L50 15 L44.12 19.09 L46.2 12.24 L40.49 7.91 L47.65 7.76 Z"
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
      <g transform="translate(50,52) scale(0.9) translate(-50,-50)">
        <LogoGlyph />
      </g>
    </svg>
  );
}

// Version détourée (icône seule, sans badge circulaire), utilisée en grand
// format sur l'écran de démarrage à fond bordeaux plein.
export function LogoMarkNoBadge({ size = 120, className = "" }: { size?: number; className?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 100 100" className={className} role="img" aria-label="KounKour">
      <LogoGlyph />
    </svg>
  );
}
