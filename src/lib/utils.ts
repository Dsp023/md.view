import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import type { DocumentStats, TocItem } from "@/types";

/**
 * Combines Tailwind CSS classes using `clsx` and resolves conflicts with `tailwind-merge`.
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Calculates document metrics (word count, char count, read time, formatted size).
 */
export function calculateDocumentStats(
  text: string,
  sizeInBytes: number
): DocumentStats {
  const trimmed = text.trim();
  const charCount = text.length;
  const words = trimmed.length > 0 ? trimmed.split(/\s+/).filter(Boolean).length : 0;
  const readTimeMinutes = Math.max(1, Math.ceil(words / 200));

  let formattedSize = "0 B";
  if (sizeInBytes < 1024) {
    formattedSize = `${sizeInBytes} B`;
  } else if (sizeInBytes < 1024 * 1024) {
    formattedSize = `${(sizeInBytes / 1024).toFixed(1)} KB`;
  } else {
    formattedSize = `${(sizeInBytes / (1024 * 1024)).toFixed(1)} MB`;
  }

  return {
    wordCount: words,
    charCount,
    readTimeMinutes,
    formattedSize,
  };
}

/**
 * Converts a string into an HTML id attribute safe slug.
 * e.g., "⚡ Quick Start Example" -> "quick-start-example"
 */
export function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^\w\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-");
}

/**
 * Parses markdown text line-by-line to extract Headings (# H1, ## H2, ### H3)
 * for the Table of Contents sidebar.
 */
export function extractTocHeadings(markdownText: string): TocItem[] {
  const lines = markdownText.split("\n");
  const tocItems: TocItem[] = [];
  let inCodeBlock = false;

  for (const line of lines) {
    const trimmed = line.trim();

    // Toggle code block state so we ignore # inside code snippets
    if (trimmed.startsWith("```")) {
      inCodeBlock = !inCodeBlock;
      continue;
    }

    if (inCodeBlock) continue;

    // Match ATX headings: # H1, ## H2, ### H3
    const headingMatch = trimmed.match(/^(#{1,3})\s+(.+)$/);
    if (headingMatch) {
      const level = headingMatch[1].length;
      const text = headingMatch[2].replace(/[*_~`]/g, "").trim();
      const id = slugify(text);

      if (text) {
        tocItems.push({ id, text, level });
      }
    }
  }

  return tocItems;
}

/**
 * Generates and triggers download of a standalone styled HTML document.
 */
export function exportToStandaloneHtml(filename: string, htmlContent: string) {
  const title = filename.replace(/\.(md|markdown|txt)$/i, "");
  const fullHtml = `<!DOCTYPE html>
<html lang="en" class="dark">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${title} - md.view Export</title>
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.9.0/styles/github-dark.min.css">
  <style>
    body {
      font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
      background-color: #09090b;
      color: #e4e4e7;
      line-height: 1.7;
      max-width: 860px;
      margin: 40px auto;
      padding: 0 24px;
    }
    h1, h2, h3, h4 { color: #fafafa; font-weight: 600; margin-top: 1.5em; margin-bottom: 0.5em; }
    h1 { border-bottom: 1px solid #27272a; padding-bottom: 0.4em; }
    h2 { border-bottom: 1px solid #27272a; padding-bottom: 0.3em; }
    a { color: #60a5fa; text-decoration: underline; }
    code { font-family: monospace; background: #27272a; color: #f43f5e; padding: 2px 6px; border-radius: 4px; }
    pre { background: #121215; padding: 16px; border-radius: 8px; overflow-x: auto; border: 1px solid #27272a; }
    pre code { background: transparent; color: inherit; padding: 0; }
    table { width: 100%; border-collapse: collapse; margin: 20px 0; border: 1px solid #27272a; }
    th, td { border: 1px solid #27272a; padding: 10px 14px; text-align: left; }
    th { background: #18181b; }
    blockquote { border-left: 3px solid #3b82f6; background: #18181b80; padding: 12px 16px; margin: 16px 0; border-radius: 0 8px 8px 0; }
  </style>
</head>
<body>
  <article class="markdown-body">
    ${htmlContent}
  </article>
</body>
</html>`;

  const blob = new Blob([fullHtml], { type: "text/html;charset=utf-8;" });
  const url = URL.createObjectURL(blob);
  const anchor = document.createElement("a");
  anchor.href = url;
  anchor.download = `${title}.html`;
  anchor.click();
  URL.revokeObjectURL(url);
}
