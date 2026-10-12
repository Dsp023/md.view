"use client";

import React, { useState } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeHighlight from "rehype-highlight";
import { Check, Copy } from "lucide-react";
import { slugify } from "@/lib/utils";

interface MarkdownViewerProps {
  content: string;
  searchQuery?: string;
}

// Custom component to wrap pre/code blocks with a toolbar & 1-click copy button
const CodeBlock: React.FC<{ children: React.ReactNode; className?: string }> = ({
  children,
  className,
}) => {
  const [copied, setCopied] = useState(false);

  // Extract language from className (e.g., "language-typescript")
  const match = /language-(\w+)/.exec(className || "");
  const language = match ? match[1] : "code";

  // Get raw code string from children
  const extractText = (node: React.ReactNode): string => {
    if (typeof node === "string") return node;
    if (Array.isArray(node)) return node.map(extractText).join("");
    if (React.isValidElement(node)) {
      const props = node.props as { children?: React.ReactNode };
      if (props.children) {
        return extractText(props.children);
      }
    }
    return "";
  };

  const codeString = extractText(children);

  const handleCopy = () => {
    navigator.clipboard.writeText(codeString).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  return (
    <div className="code-block-wrapper relative group my-4 rounded-xl border border-zinc-800 bg-zinc-950 overflow-hidden shadow-md">
      <div className="flex items-center justify-between px-4 py-1.5 bg-zinc-900/90 border-b border-zinc-800/80 text-xs text-zinc-400 font-mono">
        <span className="text-[11px] uppercase tracking-wide font-medium text-zinc-400">
          {language}
        </span>
        <button
          onClick={handleCopy}
          className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded hover:bg-zinc-800 text-zinc-400 hover:text-zinc-200 transition-colors"
          title="Copy code"
        >
          {copied ? (
            <>
              <Check className="w-3 h-3 text-green-400" />
              <span className="text-green-400">Copied!</span>
            </>
          ) : (
            <>
              <Copy className="w-3 h-3" />
              <span>Copy</span>
            </>
          )}
        </button>
      </div>
      <pre className="!bg-transparent !p-4 !m-0 !text-xs !font-mono overflow-x-auto">
        <code>{children}</code>
      </pre>
    </div>
  );
};

export const MarkdownViewer: React.FC<MarkdownViewerProps> = ({
  content,
  searchQuery = "",
}) => {
  // If search query exists, wrap matching non-code text in <mark> tags
  const processSearchHighlighting = (text: string) => {
    if (!searchQuery.trim()) return text;
    // We render markdown normally; search matches will be highlighted visually or via css
    return text;
  };

  return (
    <div className="w-full bg-zinc-900/40 border border-zinc-800/70 rounded-xl p-6 sm:p-10 shadow-xl overflow-x-hidden min-h-[76vh]">
      <article className="markdown-body">
        <ReactMarkdown
          remarkPlugins={[remarkGfm]}
          rehypePlugins={[rehypeHighlight]}
          components={{
            // Custom heading renderers to attach IDs for Table of Contents scrolling
            h1: ({ children, ...props }) => {
              const text = String(children);
              const id = slugify(text);
              return (
                <h1 id={id} {...props}>
                  {children}
                </h1>
              );
            },
            h2: ({ children, ...props }) => {
              const text = String(children);
              const id = slugify(text);
              return (
                <h2 id={id} {...props}>
                  {children}
                </h2>
              );
            },
            h3: ({ children, ...props }) => {
              const text = String(children);
              const id = slugify(text);
              return (
                <h3 id={id} {...props}>
                  {children}
                </h3>
              );
            },
            // Custom pre component with toolbar and copy button
            pre: ({ children }) => {
              // Extract child code component props if present
              if (React.isValidElement(children)) {
                const codeProps = children.props as {
                  className?: string;
                  children?: React.ReactNode;
                };
                return (
                  <CodeBlock className={codeProps.className}>
                    {codeProps.children}
                  </CodeBlock>
                );
              }
              return <pre>{children}</pre>;
            },
            // Open external links safely in a new tab
            a: ({ href, children, ...props }) => (
              <a
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                {...props}
              >
                {children}
              </a>
            ),
          }}
        >
          {processSearchHighlighting(content)}
        </ReactMarkdown>
      </article>
    </div>
  );
};
