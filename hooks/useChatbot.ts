import { useState, useCallback, useRef } from 'react';
import chatbotService, { ChatMessage } from '@/services/chatbot';

export const useChatbot = () => {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [sessionId, setSessionId] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isStreaming, setIsStreaming] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const streamingMessageRef = useRef<string>('');

  const sendMessage = useCallback(
    async (message: string, useStreaming = true) => {
      if (!message.trim()) return;

      // Add user message
      const userMessage: ChatMessage = {
        role: 'user',
        content: message,
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, userMessage]);
      setIsLoading(true);
      setError(null);

      if (useStreaming) {
        // Use streaming
        setIsStreaming(true);
        streamingMessageRef.current = '';

        // Add empty assistant message that will be filled
        setMessages((prev) => [
          ...prev,
          {
            role: 'assistant',
            content: '',
            timestamp: new Date(),
          },
        ]);

        await chatbotService.sendMessageStream(
          message,
          // onToken
          (token: string) => {
            streamingMessageRef.current += token;
            setMessages((prev) => {
              const newMessages = [...prev];
              newMessages[newMessages.length - 1].content =
                streamingMessageRef.current;
              return newMessages;
            });
          },
          // onMetadata
          (newSessionId: string, sources: any) => {
            setSessionId(newSessionId);
            console.log('Sources:', sources);
          },
          // onComplete
          () => {
            setIsLoading(false);
            setIsStreaming(false);
          },
          // onError
          (err: Error) => {
            setError(err.message);
            setIsLoading(false);
            setIsStreaming(false);
            // Remove the empty assistant message
            setMessages((prev) => prev.slice(0, -1));
          },
          sessionId || undefined,
          messages
        );
      } else {
        // Use REST API (fallback)
        try {
          const response = await chatbotService.sendMessage(
            message,
            sessionId || undefined,
            messages
          );

          const assistantMessage: ChatMessage = {
            role: 'assistant',
            content: response.response,
            timestamp: response.timestamp,
          };
          setMessages((prev) => [...prev, assistantMessage]);
          setSessionId(response.sessionId);
        } catch (err: any) {
          setError(err.message || 'Failed to send message');
          setMessages((prev) => prev.slice(0, -1));
        } finally {
          setIsLoading(false);
        }
      }
    },
    [messages, sessionId]
  );

  const clearMessages = useCallback(() => {
    setMessages([]);
    setSessionId(null);
    setError(null);
  }, []);

  return {
    messages,
    sessionId,
    isLoading,
    isStreaming,
    error,
    sendMessage,
    clearMessages,
  };
};
