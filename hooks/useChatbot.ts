import { useState, useCallback, useRef } from 'react';
import chatbotService, { ChatMessage } from '@/services/chatbot';

export const useChatbot = () => {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [sessionId, setSessionId] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isStreaming, setIsStreaming] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const streamingMessageRef = useRef<string>('');
  const isProcessingRef = useRef(false);

  const sendMessage = useCallback(
    async (message: string, useStreaming = true) => {
      if (!message.trim()) return;

      // Prevent duplicate submissions
      if (isProcessingRef.current) return;
      isProcessingRef.current = true;

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

        // Set streaming after adding the message
        setIsStreaming(true);

        await chatbotService.sendMessageStream(
          message,
          // onToken
          (token: string) => {
            streamingMessageRef.current += token;
            setMessages((prev) => {
              const newMessages = [...prev];
              if (newMessages.length > 0) {
                newMessages[newMessages.length - 1].content =
                  streamingMessageRef.current;
              }
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
            isProcessingRef.current = false;
          },
          // onError
          (err: Error) => {
            setError(err.message);
            setIsLoading(false);
            setIsStreaming(false);
            isProcessingRef.current = false;
            // Remove the empty assistant message
            setMessages((prev) => prev.slice(0, -1));
          },
          sessionId || undefined,
          messages
        );

        // Safety fallback - reset states after await completes
        // This handles edge cases where callbacks might not fire
        setIsLoading(false);
        setIsStreaming(false);
        isProcessingRef.current = false;
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
          isProcessingRef.current = false;
        }
      }
    },
    [messages, sessionId]
  );

  const clearMessages = useCallback(() => {
    setMessages([]);
    setSessionId(null);
    setError(null);
    isProcessingRef.current = false;
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
