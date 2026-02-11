"use client";

import React, { useState, useRef, useEffect } from 'react';
import { useChatbot } from '@/hooks/useChatbot';
import { Send, X, Trash2, Loader2 } from 'lucide-react';
import { MessageContent } from './MessageContent';
import '@/styles/chatbot-markdown.css';

interface ChatbotProps {
  onClose?: () => void;
}

export const Chatbot: React.FC<ChatbotProps> = ({ onClose }) => {
  const [input, setInput] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const { messages, isLoading, isStreaming, error, sendMessage, clearMessages } = useChatbot();

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    // Auto-focus input on mount
    inputRef.current?.focus();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    await sendMessage(input);
    setInput('');
  };

  const handleClear = () => {
    if (window.confirm('Clear all messages?')) {
      clearMessages();
    }
  };

  return (
    <div className="flex flex-col h-full bg-[#0D1D23]">
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-[#1E3A47]">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-gradient-to-r from-[#02996E] to-[#0895AE] flex items-center justify-center">
            <span className="text-white text-lg">🤖</span>
          </div>
          <div>
            <h3 className="text-white font-semibold text-sm">NexSentia AI Assistant</h3>
            <p className="text-[#71858C] text-xs">Ask about signals, incidents, or issues</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          {messages.length > 0 && (
            <button
              onClick={handleClear}
              className="p-2 text-[#71858C] hover:text-white hover:bg-white/5 rounded-lg transition-colors"
              title="Clear messages"
            >
              <Trash2 size={18} />
            </button>
          )}
          {onClose && (
            <button
              onClick={onClose}
              className="p-2 text-[#71858C] hover:text-white hover:bg-white/5 rounded-lg transition-colors"
              title="Close chatbot"
            >
              <X size={18} />
            </button>
          )}
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.length === 0 && (
          <div className="flex flex-col items-center justify-center h-full text-center px-4">
            <div className="w-16 h-16 rounded-full bg-gradient-to-r from-[#02996E]/20 to-[#0895AE]/20 flex items-center justify-center mb-4">
              <span className="text-3xl">💬</span>
            </div>
            <h4 className="text-white font-medium mb-2">Start a conversation</h4>
            <p className="text-[#71858C] text-sm max-w-xs">
              Ask me anything about weak signals, incidents, issues, or organizational metrics.
            </p>
            <div className="mt-6 space-y-2 w-full max-w-xs">
              <button
                onClick={() => sendMessage('Show me critical weak signals')}
                className="w-full text-left px-4 py-2 bg-white/5 hover:bg-white/10 rounded-lg text-sm text-[#D2DCE5] transition-colors"
              >
                Show me critical weak signals
              </button>
              <button
                onClick={() => sendMessage('What are the top incidents?')}
                className="w-full text-left px-4 py-2 bg-white/5 hover:bg-white/10 rounded-lg text-sm text-[#D2DCE5] transition-colors"
              >
                What are the top incidents?
              </button>
              <button
                onClick={() => sendMessage('Summarize organizational health')}
                className="w-full text-left px-4 py-2 bg-white/5 hover:bg-white/10 rounded-lg text-sm text-[#D2DCE5] transition-colors"
              >
                Summarize organizational health
              </button>
            </div>
          </div>
        )}

        {messages.map((msg, idx) => (
          <div
            key={idx}
            className={`flex gap-3 ${msg.role === 'user' ? 'flex-row-reverse' : ''} animate-fadeIn`}
          >
            <div className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0">
              {msg.role === 'user' ? (
                <div className="w-full h-full rounded-full bg-[#469F88] flex items-center justify-center text-white text-sm">
                  👤
                </div>
              ) : (
                <div className="w-full h-full rounded-full bg-gradient-to-r from-[#02996E] to-[#0895AE] flex items-center justify-center text-white text-sm">
                  🤖
                </div>
              )}
            </div>
            <div
              className={`flex-1 max-w-[80%] ${
                msg.role === 'user' ? 'items-end' : 'items-start'
              }`}
            >
              <div
                className={`px-4 py-3 rounded-2xl ${
                  msg.role === 'user'
                    ? 'bg-gradient-to-r from-[#02996E] to-[#0895AE] text-white rounded-br-sm'
                    : 'bg-[#1E3A47] text-[#D2DCE5] rounded-bl-sm'
                }`}
              >
                {msg.role === 'assistant' ? (
                  <MessageContent
                    content={msg.content}
                    isStreaming={isStreaming && idx === messages.length - 1}
                  />
                ) : (
                  <div className="text-sm leading-relaxed">{msg.content}</div>
                )}
              </div>
              {msg.timestamp && (
                <p className="text-[#71858C] text-[10px] mt-1 px-1">
                  {new Date(msg.timestamp).toLocaleTimeString()}
                </p>
              )}
            </div>
          </div>
        ))}

        {error && (
          <div className="flex items-center gap-2 p-3 bg-red-500/10 border border-red-500/20 rounded-lg text-red-400 text-sm">
            <span>⚠️</span>
            <span>{error}</span>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <form onSubmit={handleSubmit} className="p-4 border-t border-[#1E3A47]">
        <div className="flex gap-2">
          <input
            ref={inputRef}
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Type your message..."
            disabled={isLoading}
            className="flex-1 px-4 py-3 bg-[#1E3A47] text-white placeholder-[#71858C] rounded-xl text-sm outline-none focus:ring-2 focus:ring-[#469F88] disabled:opacity-50 disabled:cursor-not-allowed transition-all"
          />
          <button
            type="submit"
            disabled={isLoading || !input.trim()}
            className="px-6 py-3 bg-gradient-to-r from-[#02996E] to-[#0895AE] text-white rounded-xl font-medium text-sm disabled:opacity-50 disabled:cursor-not-allowed hover:brightness-110 active:scale-95 transition-all flex items-center gap-2"
          >
            {isLoading ? (
              <Loader2 size={18} className="animate-spin" />
            ) : (
              <Send size={18} />
            )}
          </button>
        </div>
      </form>

      <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-fadeIn {
          animation: fadeIn 0.3s ease-in;
        }

        /* Custom scrollbar */
        .overflow-y-auto::-webkit-scrollbar {
          width: 6px;
        }

        .overflow-y-auto::-webkit-scrollbar-track {
          background: #1E3A47;
          border-radius: 3px;
        }

        .overflow-y-auto::-webkit-scrollbar-thumb {
          background: #469F88;
          border-radius: 3px;
        }

        .overflow-y-auto::-webkit-scrollbar-thumb:hover {
          background: #5AB99E;
        }
      `}</style>
    </div>
  );
};
