// Logo officiel KounKour — toque de graduation (mortier + gland) posée sur un
// livre ouvert, surmontée de l'étoile marocaine verte entrelacée. Reproduit
// fidèlement la référence fournie par le propriétaire : tout est blanc sauf
// l'étoile, seule touche de vert ("vert marocain avec modération", cahier des
// charges §4).
// `LogoMark` : version badge circulaire bordeaux (en-tête, favicon, petits
// contextes) — le glyphe blanc se lit toujours sur le fond bordeaux du badge.
// `LogoMarkNoBadge` : version détourée, pour l'écran de démarrage à fond
// bordeaux plein.

const STAR_GREEN = "#159356";
const PAPER = "#FFFDFE";
const SHADE = "#E4C9D5"; // épaisseur / ombre douce du mortier
const SEP = "rgba(90,12,45,0.30)"; // liseré de séparation, lisible sur bordeaux

function LogoGlyph() {
  const shape = { fill: PAPER, stroke: SEP, strokeWidth: 0.6, strokeLinejoin: "round" as const };

  return (
    <>
      {/* Étoile marocaine : pentagramme entrelacé (branches pleines, centre
          ajouré via fill-rule evenodd) — seul élément coloré. */}
      <path
        fillRule="evenodd"
        fill={STAR_GREEN}
        d="M50 1.5 L57.94 25.92 L37.16 10.83 L62.84 10.83 L42.06 25.92 Z"
      />

      {/* Livre ouvert : deux pages */}
      <path {...shape} d="M50 61 C 38 55 24 54 12 58 L 15 72 C 27 68 40 69 50 75 Z" />
      <path {...shape} d="M50 61 C 62 55 76 54 88 58 L 85 72 C 73 68 60 69 50 75 Z" />

      {/* Corps de la toque (partie sur la tête), niché dans le livre, derrière le plateau */}
      <path {...shape} d="M33 45 L67 45 L62 67 C 57 70 43 70 38 67 Z" />
      {/* Ombre en V sous le débord du plateau */}
      <path fill={SHADE} opacity={0.9} d="M34 47 L50 56 L66 47 L66 49 L50 58 L34 49 Z" />

      {/* Épaisseur du plateau (dessous, arêtes avant) */}
      <path fill={SHADE} d="M17 42 L50 54 L83 42 L83 45 L50 57 L17 45 Z" />
      {/* Plateau du mortier (losange) */}
      <path {...shape} d="M50 30 L83 42 L50 54 L17 42 Z" />

      {/* Gland : cordon du centre du plateau vers l'angle droit, puis pompon */}
      <path d="M50 40 L83 42 L83 60" fill="none" stroke={PAPER} strokeWidth="1.6" strokeLinecap="round" />
      <path {...shape} strokeWidth={0.4} d="M80.4 59 L85.6 59 L84 69 L82 69 Z" />
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
      <g transform="translate(50,52) scale(0.86) translate(-50,-50)">
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
