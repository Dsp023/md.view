"use client";

import React from "react";
import { Hash, List } from "lucide-react";
import type { TocItem } from "@/types";

interface TableOfContentsProps {
  items: TocItem[];
}

export const TableOfContents: React.FC<TableOfContentsProps> = ({ items }) => {
  const handleScrollToHeading = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <aside className="hidden lg:block w-64 shrink-0 sticky top-20 bg-zinc-900/60 border border-zinc-800/80 rounded-xl p-4 max-h-[85vh] overflow-y-auto shadow-lg">
      <div className="flex items-center justify-between pb-3 border-b border-zinc-800/80 mb-3">
        <span className="text-xs font-semibold uppercase tracking-wider text-zinc-400 flex items-center gap-1.5">
          <List className="w-3.5 h-3.5 text-blue-400" />
          Outline
        </span>
        <span className="text-[11px] font-mono text-zinc-500">
          {items.length} {items.length === 1 ? "item" : "items"}
        </span>
      </div>

      {items.length === 0 ? (
        <p className="text-zinc-500 italic text-[11px]">No headings found</p>
      ) : (
        <nav className="space-y-1 text-xs text-zinc-400">
          {items.map((item, index) => {
            const indentClass =
              item.level === 1
                ? "font-medium text-zinc-200"
                : item.level === 2
                ? "pl-3 text-zinc-400"
                : "pl-6 text-zinc-500";

            return (
              <button
                key={`${item.id}-${index}`}
                onClick={() => handleScrollToHeading(item.id)}
                className={`w-full text-left block py-1 hover:text-blue-400 truncate rounded transition-colors ${indentClass}`}
                title={item.text}
              >
                <span className="inline-flex items-center gap-1">
                  <Hash className="w-3 h-3 opacity-40 shrink-0" />
                  <span className="truncate">{item.text}</span>
                </span>
              </button>
            );
          })}
        </nav>
      )}
    </aside>
  );
};
