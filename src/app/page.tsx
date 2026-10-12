"use client";

import React, { useState, useRef, useEffect, useMemo, useCallback } from "react";
import { Header } from "@/components/Header";
import { Dropzone } from "@/components/Dropzone";
import { MarkdownViewer } from "@/components/MarkdownViewer";
import { RawEditor } from "@/components/RawEditor";
import { TableOfContents } from "@/components/TableOfContents";
import { PasteModal } from "@/components/PasteModal";
import { FullscreenOverlay } from "@/components/FullscreenOverlay";
import { Toast } from "@/components/Toast";
import { SAMPLES } from "@/lib/samples";
import {
  calculateDocumentStats,
  extractTocHeadings,
  exportToStandaloneHtml,
} from "@/lib/utils";
import type { ViewMode, SampleKey } from "@/types";

export default function Home() {
  const [markdownContent, setMarkdownContent] = useState<string | null>(null);
  const [fileName, setFileName] = useState<string | null>(null);
  const [fileSize, setFileSize] = useState<number | null>(null);
  const [viewMode, setViewMode] = useState<ViewMode>("preview");
  const [searchQuery, setSearchQuery] = useState("");
  const [isDragging, setIsDragging] = useState(false);
  const [isPasteModalOpen, setIsPasteModalOpen] = useState(false);
  const [toast, setToast] = useState<{ message: string | null; icon?: string }>({
    message: null,
  });

  const fileInputRef = useRef<HTMLInputElement>(null);
  const dragCounterRef = useRef(0);

  const showToast = useCallback((message: string, icon: string = "✓") => {
    setToast({ message, icon });
  }, []);

  // Compute document stats & outline headings dynamically
  const stats = useMemo(() => {
    if (markdownContent === null) return null;
    return calculateDocumentStats(markdownContent, fileSize || 0);
  }, [markdownContent, fileSize]);

  const tocItems = useMemo(() => {
    if (!markdownContent) return [];
    return extractTocHeadings(markdownContent);
  }, [markdownContent]);

  // File loading helper
  const handleLoadContent = useCallback(
    (content: string, name: string = "document.md", sizeInBytes?: number) => {
      const calculatedSize = sizeInBytes ?? new Blob([content]).size;
      setMarkdownContent(content);
      setFileName(name);
      setFileSize(calculatedSize);
      setSearchQuery("");
      showToast(`Loaded ${name}`, "✓");
    },
    [showToast]
  );

  // File upload input change handler
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const content = event.target?.result as string;
      handleLoadContent(content, file.name, file.size);
    };
    reader.onerror = () => {
      showToast("Error reading selected file", "⚠️");
    };
    reader.readAsText(file);

    // Reset input value so re-selecting same file triggers change event
    e.target.value = "";
  };

  // Sample loader trigger
  const handleLoadSample = (key: SampleKey) => {
    const sample = SAMPLES[key];
    if (sample) {
      handleLoadContent(sample.content, sample.name);
    }
  };

  // Drag and drop window listeners
  useEffect(() => {
    const handleDragEnter = (e: DragEvent) => {
      e.preventDefault();
      dragCounterRef.current += 1;
      setIsDragging(true);
    };

    const handleDragLeave = (e: DragEvent) => {
      e.preventDefault();
      dragCounterRef.current -= 1;
      if (dragCounterRef.current <= 0) {
        dragCounterRef.current = 0;
        setIsDragging(false);
      }
    };

    const handleDragOver = (e: DragEvent) => {
      e.preventDefault();
    };

    const handleDrop = (e: DragEvent) => {
      e.preventDefault();
      dragCounterRef.current = 0;
      setIsDragging(false);

      if (e.dataTransfer && e.dataTransfer.files && e.dataTransfer.files.length > 0) {
        const file = e.dataTransfer.files[0];
        const reader = new FileReader();
        reader.onload = (event) => {
          const content = event.target?.result as string;
          handleLoadContent(content, file.name, file.size);
        };
        reader.readAsText(file);
      }
    };

    window.addEventListener("dragenter", handleDragEnter);
    window.addEventListener("dragleave", handleDragLeave);
    window.addEventListener("dragover", handleDragOver);
    window.addEventListener("drop", handleDrop);

    return () => {
      window.removeEventListener("dragenter", handleDragEnter);
      window.removeEventListener("dragleave", handleDragLeave);
      window.removeEventListener("dragover", handleDragOver);
      window.removeEventListener("drop", handleDrop);
    };
  }, [handleLoadContent]);

  // Global Keyboard Shortcut: Pressing 'O' opens file browser when not typing in inputs
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const activeTag = document.activeElement?.tagName;
      if (e.key === "o" && !["INPUT", "TEXTAREA"].includes(activeTag || "")) {
        e.preventDefault();
        fileInputRef.current?.click();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  // Actions menu handlers
  const handleCopyRaw = () => {
    if (markdownContent) {
      navigator.clipboard.writeText(markdownContent);
      showToast("Copied raw markdown content", "✓");
    }
  };

  const handleExportHtml = () => {
    if (markdownContent && fileName) {
      // Create element offscreen to get HTML string
      const previewEl = document.querySelector(".markdown-body");
      const htmlString = previewEl ? previewEl.innerHTML : `<p>${markdownContent}</p>`;
      exportToStandaloneHtml(fileName, htmlString);
      showToast("Exported standalone HTML document", "↓");
    }
  };

  const handleResetHome = () => {
    setMarkdownContent(null);
    setFileName(null);
    setFileSize(null);
    setSearchQuery("");
  };

  return (
    <div className="bg-zinc-950 text-zinc-200 min-h-screen flex flex-col font-sans selection:bg-blue-600 selection:text-white">
      {/* Hidden File Input */}
      <input
        ref={fileInputRef}
        type="file"
        accept=".md,.markdown,.txt"
        className="hidden"
        onChange={handleFileChange}
      />

      {/* Header Bar */}
      <Header
        fileName={fileName}
        stats={stats}
        viewMode={viewMode}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        onViewModeChange={setViewMode}
        onUploadClick={() => fileInputRef.current?.click()}
        onOpenPasteModal={() => setIsPasteModalOpen(true)}
        onCopyRaw={handleCopyRaw}
        onExportHtml={handleExportHtml}
        onResetHome={handleResetHome}
      />

      {/* Main Workspace Area */}
      <main className="flex-1 flex flex-col relative w-full">
        {markdownContent === null ? (
          /* Empty State Dropzone */
          <Dropzone
            onFileSelectClick={() => fileInputRef.current?.click()}
            onLoadSample={handleLoadSample}
          />
        ) : (
          /* Markdown Viewer Workspace */
          <div className="flex-1 w-full max-w-7xl mx-auto px-4 py-6">
            <div className="flex gap-6 h-full items-start">
              {/* Table of Contents Outline Sidebar */}
              <TableOfContents items={tocItems} />

              {/* Main Content Workspace Grid */}
              <div className="flex-1 flex flex-col min-w-0">
                <div
                  className={`grid gap-6 ${
                    viewMode === "split"
                      ? "grid-cols-1 md:grid-cols-2"
                      : "grid-cols-1"
                  }`}
                >
                  {/* Raw Text Editor (Visible in Split or Raw mode) */}
                  {(viewMode === "split" || viewMode === "raw") && (
                    <RawEditor
                      content={markdownContent}
                      onChange={(val) => {
                        setMarkdownContent(val);
                        setFileSize(new Blob([val]).size);
                      }}
                    />
                  )}

                  {/* Rendered Preview Panel (Visible in Preview or Split mode) */}
                  {(viewMode === "preview" || viewMode === "split") && (
                    <MarkdownViewer
                      content={markdownContent}
                      searchQuery={searchQuery}
                    />
                  )}
                </div>
              </div>
            </div>
          </div>
        )}
      </main>

      {/* Fullscreen Drag Overlay */}
      <FullscreenOverlay isVisible={isDragging} />

      {/* Paste Text Modal */}
      <PasteModal
        isOpen={isPasteModalOpen}
        initialText={markdownContent || ""}
        onClose={() => setIsPasteModalOpen(false)}
        onApply={(text) => {
          handleLoadContent(text, "pasted-content.md");
          setIsPasteModalOpen(false);
        }}
      />

      {/* Action Toast Notifications */}
      <Toast
        message={toast.message}
        icon={toast.icon}
        onClose={() => setToast({ message: null })}
      />
    </div>
  );
}
