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
            <h1 className="text-lg font-bold text-white mt-4 mb-2" {...props} />
          ),
          h2: ({ node, ...props }) => (
            <h2 className="text-base font-bold text-white mt-3 mb-2" {...props} />
          ),
          h3: ({ node, ...props }) => (
            <h3 className="text-sm font-semibold text-[#8AF1B9] mt-3 mb-2" {...props} />
          ),

          // Paragraphs
          p: ({ node, ...props }) => (
            <p className="mb-3 last:mb-0 leading-relaxed" {...props} />
          ),

          // Lists
          ul: ({ node, ...props }) => (
            <ul className="space-y-2 my-3 pl-4" {...props} />
          ),
          ol: ({ node, ...props }) => (
            <ol className="space-y-2 my-3 pl-4 list-decimal" {...props} />
          ),
          li: ({ node, ...props }) => (
            <li className="flex items-start gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-[#469F88] mt-2 shrink-0" />
              <span className="flex-1" {...props} />
            </li>
          ),

          // Code blocks
          code: ({ node, inline, className, children, ...props }: any) => {
            const match = /language-(\w+)/.exec(className || '');
            return !inline ? (
              <pre className="bg-[#0D1D23] border border-[#469F88]/30 rounded-lg p-3 my-3 overflow-x-auto">
                <code className="text-[#8AF1B9] text-xs font-mono" {...props}>
                  {children}
                </code>
              </pre>
            ) : (
              <code
                className="bg-[#0D1D23] text-[#8AF1B9] px-1.5 py-0.5 rounded text-xs font-mono"
                {...props}
              >
                {children}
              </code>
            );
          },

          // Blockquotes
          blockquote: ({ node, ...props }) => (
            <blockquote
              className="border-l-4 border-[#469F88] pl-4 py-2 my-3 bg-[#469F88]/10 rounded-r-lg"
              {...props}
            />
          ),

          // Links
          a: ({ node, ...props }) => (
            <a
              className="text-[#469F88] hover:text-[#5AB99E] underline underline-offset-2 transition-colors"
              target="_blank"
              rel="noopener noreferrer"
              {...props}
            />
          ),

          // Tables
          table: ({ node, ...props }) => (
            <div className="overflow-x-auto my-3">
              <table
                className="min-w-full border border-[#1E3A47] rounded-lg overflow-hidden"
                {...props}
              />
            </div>
          ),
          thead: ({ node, ...props }) => (
            <thead className="bg-[#1E3A47]" {...props} />
          ),
          th: ({ node, ...props }) => (
            <th
              className="px-4 py-2 text-left text-xs font-semibold text-[#8AF1B9] border-b border-[#469F88]/30"
              {...props}
            />
          ),
          td: ({ node, ...props }) => (
            <td
              className="px-4 py-2 text-sm border-b border-[#1E3A47]"
              {...props}
            />
          ),

          // Strong/Bold
          strong: ({ node, ...props }) => (
            <strong className="font-bold text-white" {...props} />
          ),

          // Emphasis/Italic
          em: ({ node, ...props }) => (
            <em className="italic text-[#D2DCE5]" {...props} />
          ),

          // Horizontal rule
          hr: ({ node, ...props }) => (
            <hr className="my-4 border-[#1E3A47]" {...props} />
          ),
        }}
      >
        {content}
      </ReactMarkdown>

      {isStreaming && (
        <span className="inline-block ml-1 w-0.5 h-4 bg-[#469F88] animate-pulse" />
      )}
    </div>
  );
};
