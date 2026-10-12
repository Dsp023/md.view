"use client";

import React, { useState, useRef, useEffect } from "react";
import {
  FileText,
  Search,
  X,
  Upload,
  Clipboard,
  MoreVertical,
  Download,
  Trash2,
  Eye,
  Columns,
  Code2,
} from "lucide-react";
import type { ViewMode, DocumentStats } from "@/types";

interface HeaderProps {
  fileName: string | null;
  stats: DocumentStats | null;
  viewMode: ViewMode;
  searchQuery: string;
  onSearchChange: (q: string) => void;
  onViewModeChange: (mode: ViewMode) => void;
  onUploadClick: () => void;
  onOpenPasteModal: () => void;
  onCopyRaw: () => void;
  onExportHtml: () => void;
  onResetHome: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  fileName,
  stats,
  viewMode,
  searchQuery,
  onSearchChange,
  onViewModeChange,
  onUploadClick,
  onOpenPasteModal,
  onCopyRaw,
  onExportHtml,
  onResetHome,
}) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const searchInputRef = useRef<HTMLInputElement>(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Keyboard shortcut: Ctrl+F / Cmd+F to focus search input
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key === "f") {
        if (fileName) {
          e.preventDefault();
          searchInputRef.current?.focus();
          searchInputRef.current?.select();
        }
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [fileName]);

  return (
    <header className="sticky top-0 z-40 bg-zinc-950/90 backdrop-blur-md border-b border-zinc-800/80 px-4 py-2.5 transition-all">
      <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-3">
        {/* Brand & File Info Pill */}
        <div className="flex items-center gap-3">
          <button
            onClick={onResetHome}
            className="flex items-center gap-2 group text-left focus:outline-none"
            title="Return to Home"
          >
            <div className="w-8 h-8 rounded-lg bg-zinc-900 border border-zinc-700/80 flex items-center justify-center text-blue-400 font-mono text-sm font-bold shadow-sm shadow-black/50 group-hover:border-blue-500 transition-colors">
              MD
            </div>
            <span className="font-mono text-xs tracking-wider font-semibold text-zinc-100 hidden sm:inline group-hover:text-blue-400 transition-colors">
              [md.view]
            </span>
          </button>

          {/* File Metrics Pill */}
          {fileName && stats && (
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-zinc-900/90 border border-zinc-800 text-xs text-zinc-300 shadow-sm animate-fade-in">
              <FileText className="w-3.5 h-3.5 text-blue-400 shrink-0" />
              <span
                className="font-mono font-medium text-zinc-200 truncate max-w-[140px] sm:max-w-[220px]"
                title={fileName}
              >
                {fileName}
              </span>
              <span className="text-zinc-600">|</span>
              <span className="text-zinc-400 text-[11px]">
                {stats.formattedSize} • {stats.wordCount.toLocaleString()} words •{" "}
                {stats.readTimeMinutes}m read
              </span>
            </div>
          )}
        </div>

        {/* Center: In-document Search Input */}
        {fileName && (
          <div className="hidden md:flex items-center relative flex-1 max-w-xs mx-2">
            <Search className="w-3.5 h-3.5 text-zinc-500 absolute left-2.5 top-2.5 pointer-events-none" />
            <input
              ref={searchInputRef}
              type="text"
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              placeholder="Search document... (Ctrl+F)"
              className="w-full bg-zinc-900/80 border border-zinc-800 focus:border-blue-500 rounded-lg py-1.5 pl-8 pr-7 text-xs text-zinc-200 placeholder-zinc-500 focus:outline-none transition-all"
            />
            {searchQuery && (
              <button
                onClick={() => onSearchChange("")}
                className="absolute right-2 text-zinc-400 hover:text-white text-xs p-0.5"
                title="Clear search"
              >
                <X className="w-3 h-3" />
              </button>
            )}
          </div>
        )}

        {/* Action Controls */}
        <div className="flex items-center gap-2">
          {/* View Mode Toggle Group */}
          {fileName && (
            <div className="hidden sm:inline-flex bg-zinc-900 border border-zinc-800 p-0.5 rounded-lg text-xs">
              <button
                onClick={() => onViewModeChange("preview")}
                className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-md font-medium transition-all ${
                  viewMode === "preview"
                    ? "bg-zinc-800 text-zinc-100 shadow-sm"
                    : "text-zinc-400 hover:text-zinc-200"
                }`}
              >
                <Eye className="w-3 h-3" />
                Preview
              </button>
              <button
                onClick={() => onViewModeChange("split")}
                className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-md font-medium transition-all ${
                  viewMode === "split"
                    ? "bg-zinc-800 text-zinc-100 shadow-sm"
                    : "text-zinc-400 hover:text-zinc-200"
                }`}
              >
                <Columns className="w-3 h-3" />
                Split
              </button>
              <button
                onClick={() => onViewModeChange("raw")}
                className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-md font-medium transition-all ${
                  viewMode === "raw"
                    ? "bg-zinc-800 text-zinc-100 shadow-sm"
                    : "text-zinc-400 hover:text-zinc-200"
                }`}
              >
                <Code2 className="w-3 h-3" />
                Raw
              </button>
            </div>
          )}

          {/* Upload Button */}
          <button
            onClick={onUploadClick}
            title="Open file (Shortcut: O)"
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-500 text-white font-medium text-xs shadow-sm transition-all active:scale-95"
          >
            <Upload className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Upload</span>
          </button>

          {/* Paste Raw Markdown Button */}
          <button
            onClick={onOpenPasteModal}
            title="Paste raw Markdown text"
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-zinc-900 hover:bg-zinc-800 text-zinc-300 border border-zinc-800 text-xs transition-colors"
          >
            <Clipboard className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Paste</span>
          </button>

          {/* More Actions Dropdown */}
          {fileName && (
            <div className="relative" ref={menuRef}>
              <button
                onClick={() => setMenuOpen((prev) => !prev)}
                title="More Actions"
                className="p-1.5 sm:px-2.5 sm:py-1.5 rounded-lg bg-zinc-900 hover:bg-zinc-800 text-zinc-400 hover:text-zinc-200 border border-zinc-800 text-xs transition-colors"
              >
                <MoreVertical className="w-4 h-4" />
              </button>

              {menuOpen && (
                <div className="absolute right-0 mt-2 w-48 rounded-xl bg-zinc-900 border border-zinc-800 shadow-2xl py-1 text-xs z-50 animate-in fade-in zoom-in-95 duration-100">
                  <button
                    onClick={() => {
                      onCopyRaw();
                      setMenuOpen(false);
                    }}
                    className="w-full text-left px-3 py-2 text-zinc-300 hover:bg-zinc-800 flex items-center gap-2 transition-colors"
                  >
                    <Clipboard className="w-3.5 h-3.5 text-zinc-400" />
                    Copy Raw Content
                  </button>
                  <button
                    onClick={() => {
                      onExportHtml();
                      setMenuOpen(false);
                    }}
                    className="w-full text-left px-3 py-2 text-zinc-300 hover:bg-zinc-800 flex items-center gap-2 transition-colors"
                  >
                    <Download className="w-3.5 h-3.5 text-zinc-400" />
                    Export Standalone HTML
                  </button>
                  <div className="h-px bg-zinc-800 my-1" />
                  <button
                    onClick={() => {
                      onResetHome();
                      setMenuOpen(false);
                    }}
                    className="w-full text-left px-3 py-2 text-red-400 hover:bg-zinc-800 flex items-center gap-2 transition-colors"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                    Clear & Close File
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </header>
  );
};
