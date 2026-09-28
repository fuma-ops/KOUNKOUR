import type { NavIcon } from "./nav-items";

const paths: Record<NavIcon, string> = {
  home: "M4 11.5 12 4l8 7.5M6 10v9h5v-5h2v5h5v-9",
  contests: "M6 4h12v16l-6-3-6 3V4Z",
  preparation: "M4 6h11a3 3 0 0 1 3 3v11H7a3 3 0 0 1-3-3V6Zm14 0h2v14h-2",
  community: "M4 5h16v10H9l-4 4V5Z",
  profile: "M12 12a4 4 0 1 0 0-8 4 4 0 0 0 0 8Zm-7 8a7 7 0 0 1 14 0",
};

export function NavIconGlyph({ icon, className = "" }: { icon: NavIcon; className?: string }) {
  return (
    <svg aria-hidden viewBox="0 0 24 24" fill="none" className={className}>
      <path d={paths[icon]} stroke="currentColor" strokeWidth="1.7" strokeLinejoin="round" strokeLinecap="round" />
    </svg>
  );
}
