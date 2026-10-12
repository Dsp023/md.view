"use client";

import React from "react";
import { UploadCloud } from "lucide-react";

interface FullscreenOverlayProps {
  isVisible: boolean;
}

export const FullscreenOverlay: React.FC<FullscreenOverlayProps> = ({
  isVisible,
}) => {
  if (!isVisible) return null;

  return (
    <div className="pointer-events-none fixed inset-0 z-50 bg-blue-950/80 backdrop-blur-sm border-4 border-dashed border-blue-400 flex flex-col items-center justify-center animate-in fade-in duration-150">
      <div className="w-20 h-20 rounded-2xl bg-blue-500/20 text-blue-300 flex items-center justify-center mb-4">
        <UploadCloud className="w-10 h-10 animate-bounce text-blue-400" />
      </div>
      <h3 className="text-2xl font-bold text-white tracking-tight">
        Drop your Markdown file now
      </h3>
      <p className="text-sm text-blue-200 mt-1 font-mono">
        Instant reload & GFM rendering
      </p>
    </div>
  );
};
