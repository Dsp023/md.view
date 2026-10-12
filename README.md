<div align="center">

# 📑 md.view

**A modern, lightning-fast Markdown viewer & interactive workspace.**

[![Next.js](https://img.shields.io/badge/Next.js-16.3.8-000000?style=for-the-badge&logo=nextdotjs&logoColor=white)](https://nextjs.org)
[![React](https://img.shields.io/badge/React-19-20232a?style=for-the-badge&logo=react&logoColor=61dafb)](https://react.dev)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-3178c6?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-v4-38bdf8?style=for-the-badge&logo=tailwindcss&logoColor=white)](https://tailwindcss.com)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg?style=for-the-badge)](https://opensource.org/licenses/MIT)

<p align="center">
  <a href="#-features">Features</a> •
  <a href="#-interactive-view-modes">View Modes</a> •
  <a href="#-keyboard-shortcuts">Shortcuts</a> •
  <a href="#-tech-stack">Tech Stack</a> •
  <a href="#-getting-started">Getting Started</a> •
  <a href="#-project-structure">Project Structure</a>
</p>

</div>

---

## 💡 Overview

**md.view** is an aesthetic, privacy-first developer Markdown studio built with Next.js 16 (Turbopack), React 19, and Tailwind CSS v4. It turns any Markdown file, documentation, or raw notes into a beautifully styled, searchable, and navigable reading experience in milliseconds—running completely client-side in your browser.

No servers, no tracking, and no file uploads to external services. Your documents never leave your device.

---

## ✨ Features

- ⚡ **Global Drag & Drop**: Drop any `.md`, `.markdown`, or `.txt` file anywhere onto the browser window to open it instantly.
- 📋 **Paste from Clipboard**: Quick modal to paste raw Markdown directly without needing to save a file first.
- 🔀 **3 Flexible View Modes**:
  - **Preview**: Distraction-free, GitHub-styled rendered document.
  - **Split View**: Synchronized live raw editor on the left and rendered preview on the right.
  - **Raw Editor**: Clean monospace code editor.
- 📑 **Dynamic Table of Contents (TOC)**: Automatically extracts `H1`–`H6` headings with hierarchical indentation and smooth click-to-scroll navigation.
- 🔍 **In-Document Search**: High-performance search with live matching, instant highlight overlays, and keyboard focus.
- 💻 **Syntax Highlighting**: Built-in syntax highlighting for 100+ programming languages powered by `highlight.js` with one-click code copy and language badges.
- 📊 **Real-Time Document Metrics**: Live stats bar calculating file size, total word count, and estimated reading time.
- 📤 **Standalone HTML Export**: Export rendered documents as self-contained HTML files with embedded styling ready for sharing and offline archiving.
- 🛡️ **Sanitized & Secure**: Robust XSS prevention using `DOMPurify` to ensure safe rendering of untrusted markdown inputs.

---

## 🖥️ Interactive View Modes

| Mode | Icon | Description |
| :--- | :---: | :--- |
| **Preview** | 👁️ | Distraction-free reader view styled with modern typography, custom tables, task lists, and syntax blocks. |
| **Split View** | ◫ | Side-by-side workspace: live editing textarea on the left paired with real-time reactive markdown preview on the right. |
| **Raw Editor** | 💻 | Dedicated monospace editor for inspecting and editing raw Markdown syntax. |

---

## ⌨️ Keyboard Shortcuts

| Shortcut | Action |
| :--- | :--- |
| <kbd>O</kbd> | Open system file dialog (when not focused on a text input) |
| <kbd>Ctrl</kbd> + <kbd>F</kbd> / <kbd>Cmd</kbd> + <kbd>F</kbd> | Focus in-document search bar |
| <kbd>Esc</kbd> | Close active modal or dismiss drag overlay |

---

## 🛠️ Tech Stack

- **Framework**: [Next.js 16](https://nextjs.org) (App Router + Turbopack)
- **UI Library**: [React 19](https://react.dev)
- **Styling**: [Tailwind CSS v4](https://tailwindcss.com)
- **Language**: [TypeScript 5](https://www.typescriptlang.org)
- **Markdown Pipeline**:
  - [`react-markdown`](https://github.com/remarkjs/react-markdown) — React markdown parser
  - [`remark-gfm`](https://github.com/remarkjs/remark-gfm) — GitHub Flavored Markdown (tables, task lists, strikethroughs)
  - [`rehype-highlight`](https://github.com/rehypejs/rehype-highlight) — Code block syntax highlighting
  - [`highlight.js`](https://highlightjs.org/) — Syntax engine
- **Security**: [`dompurify`](https://github.com/cure53/DOMPurify) — Client-side HTML sanitization
- **Icons**: [`lucide-react`](https://lucide.dev)

---

## 🚀 Getting Started

### Prerequisites

- **Node.js** `v18.18+` or `v20+` (Node.js 22 recommended)
- **npm**, **yarn**, **pnpm**, or **bun**

### Installation

1. **Clone the repository**:
   ```bash
   git clone https://github.com/Dsp023/md.view.git
   cd md.view
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Start the local development server**:
   ```bash
   npm run dev
   ```

4. **Open in browser**:
   Navigate to [http://localhost:3000](http://localhost:3000) to start viewing Markdown files.

---

## 🏗️ Available Scripts

| Command | Description |
| :--- | :--- |
| `npm run dev` | Starts the Next.js development server with Turbopack |
| `npm run build` | Compiles and builds the production application |
| `npm run start` | Runs the compiled production server |
| `npm run lint` | Runs ESLint to inspect code quality |

---

## 📂 Project Structure

```text
md.view/
├── public/                     # Static assets & icons
│   ├── favicon.ico             # Multi-size ICO
│   ├── favicon.svg             # Vector SVG favicon
│   ├── icon-192.png            # PWA standard icon
│   └── icon-512.png            # PWA splash icon
├── src/
│   ├── app/
│   │   ├── globals.css         # Tailwind v4 theme & markdown prose styles
│   │   ├── layout.tsx          # Root layout & application metadata
│   │   ├── page.tsx            # Main studio application state & layout
│   │   ├── icon.svg            # Next.js App Router vector icon
│   │   └── apple-icon.png      # Apple touch icon
│   ├── components/
│   │   ├── Dropzone.tsx        # File drag-and-drop & preset sample loader
│   │   ├── FullscreenOverlay.tsx# Drag-over visual backdrop
│   │   ├── Header.tsx          # App bar, search input & view-mode switcher
│   │   ├── MarkdownViewer.tsx  # GFM markdown renderer with code toolbars
│   │   ├── PasteModal.tsx      # Raw markdown paste dialog
│   │   ├── RawEditor.tsx       # Monospace raw text editor
│   │   ├── TableOfContents.tsx # Dynamic heading outline navigation
│   │   └── Toast.tsx           # Floating action feedback notifications
│   ├── lib/
│   │   ├── samples.ts          # Preset sample markdown documents
│   │   └── utils.ts            # Heading parser, metrics calculator & HTML exporter
│   └── types/
│       └── index.ts            # TypeScript interfaces & type definitions
├── package.json
├── tsconfig.json
└── README.md
```

---

## 📄 License

This project is licensed under the [MIT License](LICENSE).
