"use client";

import { useState, type ReactNode } from "react";

export function Tabs({
  items,
}: {
  items: { key: string; label: string; content: ReactNode }[];
}) {
  const [active, setActive] = useState(items[0]?.key);

  return (
    <div>
      <div
        role="tablist"
        className="flex gap-1 overflow-x-auto border-b border-[var(--color-border)] [scrollbar-width:none]"
      >
        {items.map((item) => {
          const isActive = item.key === active;
          return (
            <button
              key={item.key}
              role="tab"
              aria-selected={isActive}
              onClick={() => setActive(item.key)}
              className={`min-h-11 shrink-0 border-b-2 px-3 text-sm font-medium transition-colors ${
                isActive
                  ? "border-[var(--color-primary)] text-[var(--color-primary)]"
                  : "border-transparent text-[var(--color-text-muted)] hover:text-[var(--color-text)]"
              }`}
            >
              {item.label}
            </button>
          );
        })}
      </div>
      <div className="pt-4">{items.find((item) => item.key === active)?.content}</div>
    </div>
  );
}
