"use client";

import React, { useState, useRef, useEffect } from 'react';
import { useChatbot } from '@/hooks/useChatbot';
import { Send, X, Trash2, Loader2, RotateCcw, Copy, Check } from 'lucide-react';
import { MessageContent } from './MessageContent';
import '@/styles/chatbot-markdown.css';

interface ChatbotProps {
  onClose?: () => void;
}

const STATUS_MESSAGES = [
  { text: 'Thinking', icon: '🧠' },
  { text: 'Analyzing', icon: '🔍' },
  { text: 'Processing', icon: '⚙️' },
  { text: 'Generating', icon: '✨' },
];

export const Chatbot: React.FC<ChatbotProps> = ({ onClose }) => {
  const [input, setInput] = useState('');
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);
  const [statusIndex, setStatusIndex] = useState(0);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const { messages, isLoading, isStreaming, error, sendMessage, clearMessages } = useChatbot();

  // Cycle through status messages while loading/streaming
  useEffect(() => {
    if (isLoading || isStreaming) {
      const interval = setInterval(() => {
        setStatusIndex((prev) => (prev + 1) % STATUS_MESSAGES.length);
      }, 2000);
      return () => clearInterval(interval);
    } else {
      setStatusIndex(0);
    }
  }, [isLoading, isStreaming]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  // Auto-resize textarea
  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.style.height = 'auto';
      inputRef.current.style.height = Math.min(inputRef.current.scrollHeight, 200) + 'px';
    }
  }, [input]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    await sendMessage(input);
    setInput('');
    if (inputRef.current) {
      inputRef.current.style.height = 'auto';
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  const handleClear = () => {
    if (window.confirm('Clear all messages?')) {
      clearMessages();
    }
  };

  const handleCopy = async (content: string, index: number) => {
    await navigator.clipboard.writeText(content);
    setCopiedIndex(index);
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  const handleRegenerate = async () => {
    const lastUserMessage = [...messages].reverse().find(m => m.role === 'user');
    if (lastUserMessage) {
      await sendMessage(lastUserMessage.content);
    }
  };

  return (
    <div className="flex flex-col h-full bg-[#0a1214]">
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-3 border-b border-[#1a2e38]">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#02996E] to-[#0895AE] flex items-center justify-center">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-white">
              <path d="M12 2a10 10 0 1 0 10 10A10 10 0 0 0 12 2zm0 18a8 8 0 1 1 8-8 8 8 0 0 1-8 8z"/>
              <circle cx="12" cy="12" r="3"/>
            </svg>
          </div>
          <div>
            <h3 className="text-white font-medium text-sm">NexSentia AI</h3>
          </div>
        </div>
        <div className="flex items-center gap-1">
          {messages.length > 0 && (
            <button
              onClick={handleClear}
              className="p-2 text-[#6b7f87] hover:text-white hover:bg-white/5 rounded-lg transition-colors"
              title="Clear conversation"
            >
              <Trash2 size={16} />
            </button>
          )}
          {onClose && (
            <button
              onClick={onClose}
              className="p-2 text-[#6b7f87] hover:text-white hover:bg-white/5 rounded-lg transition-colors"
              title="Close"
            >
              <X size={16} />
            </button>
          )}
        </div>
      </div>

      {/* Messages Area */}
      <div className="flex-1 overflow-y-auto chatbot-scrollbar">
        {messages.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full px-6 py-8">
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-[#02996E] to-[#0895AE] flex items-center justify-center mb-6">
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-white">
                <path d="M12 2a10 10 0 1 0 10 10A10 10 0 0 0 12 2zm0 18a8 8 0 1 1 8-8 8 8 0 0 1-8 8z"/>
                <circle cx="12" cy="12" r="3"/>
              </svg>
            </div>
            <h4 className="text-white font-medium text-lg mb-2">How can I help you today?</h4>
            <p className="text-[#6b7f87] text-sm text-center max-w-sm mb-8">
              Ask about weak signals, incidents, issues, or organizational metrics.
            </p>
            <div className="grid grid-cols-1 gap-2 w-full max-w-md">
              {[
                'Show me critical weak signals',
                'What are the top incidents?',
                'Summarize organizational health'
              ].map((suggestion, idx) => (
                <button
                  key={idx}
                  onClick={() => sendMessage(suggestion)}
                  className="text-left px-4 py-3 bg-[#0f1e24] hover:bg-[#162a33] border border-[#1a2e38] rounded-xl text-sm text-[#b8c5cc] transition-all hover:border-[#2a4a58]"
                >
                  {suggestion}
                </button>
              ))}
            </div>
          </div>
        ) : (
          <div className="py-4">
            {messages.map((msg, idx) => (
              <div
                key={idx}
                className={`group px-4 py-5 ${
                  msg.role === 'assistant' ? 'bg-[#0d181c]' : ''
                }`}
              >
                <div className="max-w-3xl mx-auto flex gap-4">
                  {/* Avatar */}
                  <div className="flex-shrink-0 pt-0.5">
                    {msg.role === 'user' ? (
                      <div className="w-7 h-7 rounded-full bg-[#2a4a58] flex items-center justify-center">
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" className="text-[#b8c5cc]">
                          <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
                        </svg>
                      </div>
                    ) : (
                      <div className="w-7 h-7 rounded-full bg-gradient-to-br from-[#02996E] to-[#0895AE] flex items-center justify-center">
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-white">
                          <circle cx="12" cy="12" r="3"/>
                        </svg>
                      </div>
                    )}
                  </div>

                  {/* Content */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1.5">
                      <span className="text-sm font-medium text-white">
                        {msg.role === 'user' ? 'You' : 'NexSentia AI'}
                      </span>
                      {msg.timestamp && (
                        <span className="text-xs text-[#4a5f69]">
                          {new Date(msg.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                        </span>
                      )}
                    </div>

                    <div className="text-[#d1dce3] text-[15px] leading-relaxed">
                      {msg.role === 'assistant' ? (
                        <>
                          <MessageContent
                            content={msg.content}
                            isStreaming={isStreaming && idx === messages.length - 1}
                          />
                          {/* Streaming status indicator */}
                          {isStreaming && idx === messages.length - 1 && (
                            <div className="flex items-center gap-2 mt-3 pt-3 border-t border-[#1a2e38]">
                              <div className="w-4 h-4 rounded-full border-2 border-[#469F88] border-t-transparent animate-spin" />
                              <span className="text-xs text-[#6b7f87]">
                                <span className="mr-1">{STATUS_MESSAGES[statusIndex].icon}</span>
                                {STATUS_MESSAGES[statusIndex].text}...
                              </span>
                            </div>
                          )}
                        </>
                      ) : (
                        <div className="whitespace-pre-wrap">{msg.content}</div>
                      )}
                    </div>

                    {/* Action buttons for assistant messages */}
                    {msg.role === 'assistant' && !isStreaming && (
                      <div className="flex items-center gap-1 mt-3 opacity-0 group-hover:opacity-100 transition-opacity">
                        <button
                          onClick={() => handleCopy(msg.content, idx)}
                          className="p-1.5 text-[#4a5f69] hover:text-[#b8c5cc] hover:bg-white/5 rounded-md transition-colors"
                          title="Copy"
                        >
                          {copiedIndex === idx ? <Check size={14} /> : <Copy size={14} />}
                        </button>
                        {idx === messages.length - 1 && (
                          <button
                            onClick={handleRegenerate}
                            className="p-1.5 text-[#4a5f69] hover:text-[#b8c5cc] hover:bg-white/5 rounded-md transition-colors"
                            title="Regenerate"
                          >
                            <RotateCcw size={14} />
                          </button>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}

            {/* Thinking indicator - shown before streaming starts */}
            {isLoading && !isStreaming && (
              <div className="px-4 py-5 bg-[#0d181c]">
                <div className="max-w-3xl mx-auto flex gap-4">
                  <div className="flex-shrink-0 pt-0.5">
                    <div className="w-7 h-7 rounded-full bg-gradient-to-br from-[#02996E] to-[#0895AE] flex items-center justify-center">
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-white">
                        <circle cx="12" cy="12" r="3"/>
                      </svg>
                    </div>
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1.5">
                      <span className="text-sm font-medium text-white">NexSentia AI</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="flex items-center gap-1">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#469F88] animate-bounce" style={{ animationDuration: '0.6s' }} />
                        <span className="w-1.5 h-1.5 rounded-full bg-[#469F88] animate-bounce" style={{ animationDuration: '0.6s', animationDelay: '0.15s' }} />
                        <span className="w-1.5 h-1.5 rounded-full bg-[#469F88] animate-bounce" style={{ animationDuration: '0.6s', animationDelay: '0.3s' }} />
                      </div>
                      <span className="text-sm text-[#6b7f87]">
                        <span className="mr-1">{STATUS_MESSAGES[statusIndex].icon}</span>
                        {STATUS_MESSAGES[statusIndex].text}...
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Error message */}
            {error && (
              <div className="px-4 py-3">
                <div className="max-w-3xl mx-auto">
                  <div className="flex items-center gap-2 p-3 bg-red-500/10 border border-red-500/20 rounded-lg text-red-400 text-sm">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <circle cx="12" cy="12" r="10"/>
                      <line x1="12" y1="8" x2="12" y2="12"/>
                      <line x1="12" y1="16" x2="12.01" y2="16"/>
                    </svg>
                    <span>{error}</span>
                  </div>
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>
        )}
      </div>

      {/* Input Area */}
      <div className="border-t border-[#1a2e38] p-4">
        <form onSubmit={handleSubmit} className="max-w-3xl mx-auto">
          <div className="relative flex items-end bg-[#0f1e24] border border-[#1a2e38] rounded-2xl focus-within:border-[#2a4a58] transition-colors">
            <textarea
              ref={inputRef}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Message NexSentia AI..."
              disabled={isLoading}
              rows={1}
              className="flex-1 px-4 py-3 bg-transparent text-white placeholder-[#4a5f69] text-sm resize-none outline-none disabled:opacity-50 max-h-[200px]"
            />
            <button
              type="submit"
              disabled={isLoading || !input.trim()}
              className="m-2 p-2 bg-[#469F88] hover:bg-[#3a8a76] text-white rounded-lg disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
            >
              {isLoading ? (
                <Loader2 size={18} className="animate-spin" />
              ) : (
                <Send size={18} />
              )}
            </button>
          </div>
          <p className="text-center text-[#3a4f5a] text-xs mt-2">
            NexSentia AI can make mistakes. Consider checking important information.
          </p>
        </form>
      </div>

      <style jsx>{`
        .chatbot-scrollbar::-webkit-scrollbar {
          width: 8px;
        }
        .chatbot-scrollbar::-webkit-scrollbar-track {
          background: transparent;
        }
        .chatbot-scrollbar::-webkit-scrollbar-thumb {
          background: #2a4a58;
          border-radius: 4px;
        }
        .chatbot-scrollbar::-webkit-scrollbar-thumb:hover {
          background: #3a5a68;
        }
      `}</style>
    </div>
  );
};
