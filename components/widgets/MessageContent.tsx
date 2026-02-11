import React from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

interface MessageContentProps {
  content: string;
  isStreaming?: boolean;
}

export const MessageContent: React.FC<MessageContentProps> = ({
  content,
  isStreaming = false
}) => {
  return (
    <div className="prose prose-invert prose-sm max-w-none message-content">
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        components={{
          // Headings
          h1: ({ node, ...props }) => (
            <h1 className="text-xl font-semibold text-white mt-6 mb-3 first:mt-0" {...props} />
          ),
          h2: ({ node, ...props }) => (
            <h2 className="text-lg font-semibold text-white mt-5 mb-2 first:mt-0" {...props} />
          ),
          h3: ({ node, ...props }) => (
            <h3 className="text-base font-semibold text-white mt-4 mb-2 first:mt-0" {...props} />
          ),

          // Paragraphs
          p: ({ node, ...props }) => (
            <p className="mb-4 last:mb-0 leading-7" {...props} />
          ),

          // Lists
          ul: ({ node, ...props }) => (
            <ul className="my-4 space-y-2 list-none" {...props} />
          ),
          ol: ({ node, ...props }) => (
            <ol className="my-4 space-y-2 list-decimal list-inside marker:text-[#6b7f87]" {...props} />
          ),
          li: ({ node, children, ...props }) => (
            <li className="flex items-start gap-3 leading-7">
              <span className="w-1.5 h-1.5 rounded-full bg-[#469F88] mt-[11px] shrink-0" />
              <span className="flex-1">{children}</span>
            </li>
          ),

          // Code blocks
          code: ({ node, inline, className, children, ...props }: any) => {
            const match = /language-(\w+)/.exec(className || '');
            const language = match ? match[1] : '';

            return !inline ? (
              <div className="my-4 rounded-xl overflow-hidden border border-[#1a2e38] bg-[#0a1214]">
                {language && (
                  <div className="flex items-center justify-between px-4 py-2 bg-[#0f1a1e] border-b border-[#1a2e38]">
                    <span className="text-xs text-[#6b7f87] font-medium">{language}</span>
                  </div>
                )}
                <pre className="p-4 overflow-x-auto">
                  <code className="text-[#e2e8f0] text-sm font-mono leading-relaxed" {...props}>
                    {children}
                  </code>
                </pre>
              </div>
            ) : (
              <code
                className="bg-[#1a2e38] text-[#7dd3c0] px-1.5 py-0.5 rounded-md text-sm font-mono"
                {...props}
              >
                {children}
              </code>
            );
          },

          // Blockquotes
          blockquote: ({ node, ...props }) => (
            <blockquote
              className="border-l-2 border-[#469F88] pl-4 py-1 my-4 text-[#9babb5]"
              {...props}
            />
          ),

          // Links
          a: ({ node, ...props }) => (
            <a
              className="text-[#7dd3c0] hover:text-[#a3e4d7] underline underline-offset-2 transition-colors"
              target="_blank"
              rel="noopener noreferrer"
              {...props}
            />
          ),

          // Tables
          table: ({ node, ...props }) => (
            <div className="overflow-x-auto my-4 rounded-xl border border-[#1a2e38]">
              <table className="min-w-full" {...props} />
            </div>
          ),
          thead: ({ node, ...props }) => (
            <thead className="bg-[#0f1a1e]" {...props} />
          ),
          th: ({ node, ...props }) => (
            <th
              className="px-4 py-3 text-left text-xs font-semibold text-[#b8c5cc] uppercase tracking-wider border-b border-[#1a2e38]"
              {...props}
            />
          ),
          tbody: ({ node, ...props }) => (
            <tbody className="divide-y divide-[#1a2e38]" {...props} />
          ),
          td: ({ node, ...props }) => (
            <td className="px-4 py-3 text-sm" {...props} />
          ),
          tr: ({ node, ...props }) => (
            <tr className="hover:bg-[#0f1a1e]/50 transition-colors" {...props} />
          ),

          // Strong/Bold
          strong: ({ node, ...props }) => (
            <strong className="font-semibold text-white" {...props} />
          ),

          // Emphasis/Italic
          em: ({ node, ...props }) => (
            <em className="italic text-[#b8c5cc]" {...props} />
          ),

          // Horizontal rule
          hr: ({ node, ...props }) => (
            <hr className="my-6 border-[#1a2e38]" {...props} />
          ),
        }}
      >
        {content}
      </ReactMarkdown>

      {isStreaming && (
        <span className="inline-block ml-0.5 w-2 h-5 bg-[#469F88] animate-pulse rounded-sm" />
      )}
    </div>
  );
};
