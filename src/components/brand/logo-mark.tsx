// Logo officiel KounKour — étoile marocaine verte entrelacée (contour), toque de
// graduation blanche (plateau, corps, gland) posée sur un livre ouvert.
// Reproduit exactement le tracé SVG fourni par le propriétaire (espace 200×160) :
// tout est blanc cassé (#FDF6F8) sauf l'étoile (contour vert #009639).
// `LogoMark` : version badge circulaire bordeaux (en-tête, favicon, petits
// contextes) — le glyphe se lit toujours sur le fond bordeaux du badge.
// `LogoMarkNoBadge` : version détourée (écran de démarrage), proportions natives.

// Glyphe dans son repère natif 200×160, paths repris tels quels de la référence.
function LogoGlyph() {
  return (
    <>
      {/* Étoile marocaine : pentagramme au contour vert (branches ajourées) */}
      <path
        d="M 100,5 L 115.5,51 L 75,21.5 L 125,21.5 L 84.5,51 Z"
        fill="none"
        stroke="#009639"
        strokeWidth={3.5}
        strokeLinejoin="round"
      />
      {/* Toque + livre, en blanc cassé */}
      <g fill="#FDF6F8">
        {/* plateau du mortier (losange) */}
        <polygon points="100,60 170,82 100,104 30,82" />
        {/* corps de la toque */}
        <path d="M 65,93 L 65,108 Q 100,126 135,108 L 135,93 Q 100,113 65,93 Z" />
        {/* gland : cordon + pompon */}
        <line x1={150} y1={88} x2={150} y2={115} stroke="#FDF6F8" strokeWidth={2.5} />
        <rect x={146.5} y={113} width={7} height={15} rx={3} />
        {/* livre ouvert */}
        <path d="M 15,130 C 45,123 75,120 100,135 C 125,120 155,123 185,130 C 155,147 125,155 100,145 C 75,155 45,147 15,130 Z" />
      </g>
    </>
  );
}

export function LogoMark({ size = 96, className = "" }: { size?: number; className?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 100 100" className={className} role="img" aria-label="KounKour">
      <defs>
        <linearGradient id="kounkour-logo-gradient-badge" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#7b113a" />
          <stop offset="100%" stopColor="#5d0c2b" />
        </linearGradient>
      </defs>
      <circle cx="50" cy="50" r="48" fill="url(#kounkour-logo-gradient-badge)" />
      {/* glyphe 200×160 ramené et centré dans le badge */}
      <g transform="translate(50,50) scale(0.40) translate(-100,-80)">
        <LogoGlyph />
      </g>
    </svg>
  );
}

// Version détourée (icône seule, sans badge circulaire), utilisée en grand
// format sur l'écran de démarrage à fond bordeaux.
export function LogoMarkNoBadge({ size = 150, className = "" }: { size?: number; className?: string }) {
  return (
    <svg
      width={size}
      height={size * 0.8}
      viewBox="0 0 200 160"
      className={className}
      role="img"
      aria-label="KounKour"
    >
      <LogoGlyph />
    </svg>
  );
}
