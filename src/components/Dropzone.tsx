"use client";

import React from "react";
import { UploadCloud, Plus, FileCode2, Sparkles } from "lucide-react";
import type { SampleKey } from "@/types";

interface DropzoneProps {
  onFileSelectClick: () => void;
  onLoadSample: (key: SampleKey) => void;
}

export const Dropzone: React.FC<DropzoneProps> = ({
  onFileSelectClick,
  onLoadSample,
}) => {
  return (
    <div className="flex-1 flex flex-col items-center justify-center p-6 text-center max-w-4xl mx-auto w-full my-auto transition-all">
      <div
        onClick={onFileSelectClick}
        className="w-full border-2 border-dashed border-zinc-800 hover:border-blue-500/80 bg-zinc-900/40 hover:bg-zinc-900/80 rounded-2xl p-10 sm:p-14 cursor-pointer transition-all duration-200 group flex flex-col items-center justify-center relative shadow-xl"
      >
        <div className="w-16 h-16 rounded-2xl bg-zinc-800/80 border border-zinc-700/60 flex items-center justify-center mb-5 text-blue-400 group-hover:scale-110 group-hover:text-blue-300 transition-all duration-300 shadow-md">
          <UploadCloud className="w-8 h-8" />
        </div>

        <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-white mb-2">
          Drop your Markdown file here
        </h2>
        <p className="text-sm text-zinc-400 max-w-md mb-6 leading-relaxed">
          Drag and drop any{" "}
          <code className="text-blue-400 bg-zinc-800/80 border border-zinc-700/50 px-1.5 py-0.5 rounded text-xs font-mono">
            .md
          </code>
          ,{" "}
          <code className="text-blue-400 bg-zinc-800/80 border border-zinc-700/50 px-1.5 py-0.5 rounded text-xs font-mono">
            .markdown
          </code>
          , or{" "}
          <code className="text-blue-400 bg-zinc-800/80 border border-zinc-700/50 px-1.5 py-0.5 rounded text-xs font-mono">
            .txt
          </code>{" "}
          file, or click anywhere inside to browse.
        </p>

        <span className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-zinc-800 hover:bg-zinc-700 text-zinc-200 text-xs font-medium border border-zinc-700 transition-colors">
          <Plus className="w-4 h-4 text-blue-400" />
          Select from device
        </span>
      </div>

      {/* Quick Interactive Samples */}
      <div className="mt-8 flex flex-col items-center">
        <p className="text-xs uppercase tracking-wider font-semibold text-zinc-500 mb-3 flex items-center gap-1.5">
          <Sparkles className="w-3.5 h-3.5 text-blue-400" />
          Or try an interactive sample:
        </p>
        <div className="flex flex-wrap items-center justify-center gap-2.5">
          <button
            onClick={() => onLoadSample("readme")}
            className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg bg-zinc-900 border border-zinc-800 hover:border-zinc-700 text-xs text-zinc-300 hover:text-white transition-all hover:bg-zinc-800/80 shadow-sm"
          >
            <FileCode2 className="w-3.5 h-3.5 text-blue-400" />
            Project README & Badges
          </button>
          <button
            onClick={() => onLoadSample("technical")}
            className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg bg-zinc-900 border border-zinc-800 hover:border-zinc-700 text-xs text-zinc-300 hover:text-white transition-all hover:bg-zinc-800/80 shadow-sm"
          >
            ⚡ Code Blocks & Benchmarks
          </button>
        </div>
      </div>
    </div>
  );
};
