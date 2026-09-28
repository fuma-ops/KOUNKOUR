// Logo KounKour — livre ouvert surmonté d'une étoile.
// `LogoMark` : version badge circulaire (en-tête, favicon, petits contextes).
// `LogoMarkNoBadge` : version détourée (icône seule), utilisée en grand
// format sur l'écran de démarrage — reproduit fidèlement la référence
// finale fournie par le propriétaire.

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
      <g transform="translate(-10, -8) scale(0.83)">
        <path d="M60 66 C 44 55 30 40 35 22 C 45 32 55 46 60 66 Z" fill="#FFFDFE" opacity="0.96" />
        <path d="M60 66 C 76 55 90 40 85 22 C 75 32 65 46 60 66 Z" fill="#FFFDFE" opacity="0.96" />
        <path
          d="M60 14 L63.4 22.6 L72.5 23.3 L65.5 29.2 L67.8 38.1 L60 33.1 L52.2 38.1 L54.5 29.2 L47.5 23.3 L56.6 22.6 Z"
          fill="#FFFDFE"
        />
      </g>
    </svg>
  );
}

// Version détourée (icône seule), utilisée en grand format sur l'écran de
// démarrage — reproduit la référence finale fournie par le propriétaire :
// livre au contour blanc, dégradé bordeaux, étoile solide détachée au-dessus.
export function LogoMarkNoBadge({ size = 120, className = "" }: { size?: number; className?: string }) {
  return (
    <svg width={size} height={size * 0.9} viewBox="0 0 120 108" className={className} role="img" aria-label="KounKour">
      <defs>
        <linearGradient id="kounkour-logo-gradient-icon" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#8D174B" />
          <stop offset="100%" stopColor="#D6428C" />
        </linearGradient>
      </defs>
      <path
        d="M60 76 C 40 62 24 44 30 20 C 42 32 54 50 60 76 Z"
        fill="url(#kounkour-logo-gradient-icon)"
        stroke="#FFFDFE"
        strokeWidth="3"
        strokeLinejoin="round"
      />
      <path
        d="M60 76 C 80 62 96 44 90 20 C 78 32 66 50 60 76 Z"
        fill="url(#kounkour-logo-gradient-icon)"
        stroke="#FFFDFE"
        strokeWidth="3"
        strokeLinejoin="round"
      />
      <path
        d="M60 16 L64.3 26.3 L75.4 27.2 L67 34.6 L69.7 45.5 L60 39.6 L50.3 45.5 L53 34.6 L44.6 27.2 L55.7 26.3 Z"
        fill="#7A1440"
      />
    </svg>
  );
}
