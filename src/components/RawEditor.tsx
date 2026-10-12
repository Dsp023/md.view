"use client";

import React from "react";
import { Edit3 } from "lucide-react";

interface RawEditorProps {
  content: string;
  onChange: (newContent: string) => void;
}

export const RawEditor: React.FC<RawEditorProps> = ({ content, onChange }) => {
  const lineCount = content.split("\n").length;

  return (
    <div className="flex flex-col bg-zinc-900/80 border border-zinc-800 rounded-xl overflow-hidden shadow-xl w-full">
      <div className="bg-zinc-950/80 px-4 py-2 border-b border-zinc-800/80 flex items-center justify-between text-xs text-zinc-400">
        <span className="font-mono font-medium flex items-center gap-1.5 text-zinc-300">
          <Edit3 className="w-3.5 h-3.5 text-blue-400" />
          Source Markdown
        </span>
        <span className="text-[11px] text-zinc-500 font-mono">
          {lineCount} {lineCount === 1 ? "line" : "lines"} • Live Edit
        </span>
      </div>
      <textarea
        value={content}
        onChange={(e) => onChange(e.target.value)}
        className="w-full h-[76vh] bg-transparent p-5 font-mono text-xs text-zinc-200 leading-relaxed resize-none focus:outline-none focus:ring-0 selection:bg-blue-600 selection:text-white"
        placeholder="Type or paste markdown content here..."
        spellCheck={false}
      />
    </div>
  );
};
