import { SampleKey } from "@/types";

export const SAMPLES: Record<SampleKey, { name: string; content: string }> = {
  readme: {
    name: "README.md",
    content: `# md.view — Developer Instant Markdown Studio

> A high-performance, developer-first Markdown workspace engineered for real-time document rendering, live side-by-side editing, syntax highlighting, and outline navigation.

[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](https://opensource.org/licenses/MIT)
[![Next.js 16](https://img.shields.io/badge/Framework-Next.js%2016-black.svg)](https://nextjs.org)
[![TypeScript](https://img.shields.io/badge/Language-TypeScript-blue.svg)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Styling-Tailwind%20v4-38bdf8.svg)](https://tailwindcss.com)

---

## 🌟 Key Features

- ⚡ **Instant Drag & Drop**: Drop any \`.md\`, \`.markdown\`, or \`.txt\` file anywhere on the browser window.
- 🎯 **3 Interactive View Modes**:
  - **Preview**: Highlighting & GitHub-styled rendering focus.
  - **Split View**: Synchronized live editing text editor on the left + rendered preview on the right.
  - **Raw Editor**: Fullscreen text editing space.
- 📑 **Dynamic Table of Contents**: Automatic ATX heading extraction with smooth click-to-scroll navigation.
- 🔍 **Live Search**: In-document string matching with instant text highlighting.
- 📋 **Code Snippet Toolbars**: Automatic syntax highlighting with single-click copy buttons and language badges.
- 📤 **Export Capabilities**: 1-click standalone HTML generator with embedded dark theme.

---

## 🚀 Quick Code Example

Here is how the custom heading parser works in Next.js + React:

\`\`\`typescript
import { slugify } from "@/lib/utils";

export interface HeadingItem {
  id: string;
  text: string;
  level: number;
}

export function parseHeadings(markdownText: string): HeadingItem[] {
  return markdownText
    .split("\\n")
    .filter((line) => line.startsWith("#"))
    .map((line) => {
      const level = line.match(/^#+/)?.[0].length || 1;
      const text = line.replace(/^#+\s*/, "").trim();
      return { id: slugify(text), text, level };
    });
}
\`\`\`

### 💡 Task List & Roadmap
- [x] Next.js App Router Architecture
- [x] GitHub-flavored Markdown (GFM Tables, Badges, Task lists)
- [x] Syntax-highlighted code blocks with copy triggers
- [x] Table of Contents Outline Sidebar
- [ ] Export to PDF document format
`,
  },
  technical: {
    name: "TECHNICAL_SPECS.md",
    content: `# Technical Architecture & Benchmarks

### 📊 Performance Comparison Matrix

| Component / Feature | Legacy Canvas HTML | Next.js 16 (App Router) | Speedup / Benefit |
| :--- | :--- | :--- | :--- |
| **Startup Latency** | ~350ms CDN load | **< 40ms Native** | **8.7x Faster** |
| **Parsing Engine** | Marked CDN script | **react-markdown + GFM** | Type-safe AST parsing |
| **Type Safety** | Implicit JS | **Strict TypeScript** | Zero runtime type errors |
| **UI Primitive** | Custom CSS classes | **shadcn/ui + Tailwind v4** | Modular & accessible |

---

### Python Data Processing Pipeline

\`\`\`python
from dataclasses import dataclass
from typing import List, Optional

@dataclass
class DocumentChunk:
    chunk_id: int
    content: str
    word_count: int
    tags: List[str]

    def is_large(self) -> bool:
        return self.word_count > 500

def process_markdown_file(file_path: str) -> Optional[DocumentChunk]:
    try:
        with open(file_path, "r", encoding="utf-8") as f:
            text = f.read()
            words = len(text.split())
            return DocumentChunk(chunk_id=1, content=text[:100], word_count=words, tags=["md", "tech"])
    except IOError as e:
        print(f"Failed to read file: {e}")
        return None

# Execution example
chunk = process_markdown_file("README.md")
if chunk:
    print(f"Chunk processed successfully with {chunk.word_count} words.")
\`\`\`

---

> **Tip**: You can switch between **Preview**, **Split**, and **Raw** modes using the view toggle buttons in the top navigation bar!
`,
  },
};
