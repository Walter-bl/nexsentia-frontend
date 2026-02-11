const BASE_URL = process.env.NEXT_PUBLIC_API_URL;

export interface ChatMessage {
  role: 'user' | 'assistant';
  content: string;
  timestamp?: Date;
}

export interface StreamEvent {
  type: 'metadata' | 'token' | 'done' | 'error';
  content?: string;
  sessionId?: string;
  sources?: {
    signals?: number;
    incidents?: number;
    issues?: number;
    metrics?: number;
  };
  error?: string;
}

export interface ChatResponse {
  response: string;
  sessionId: string;
  timestamp: Date;
  sources?: {
    signals?: number;
    incidents?: number;
    issues?: number;
    metrics?: number;
  };
}

const getAuthToken = (): string | null => localStorage.getItem("accessToken");

const getErrorMessage = (status: number, statusText?: string): string => {
  switch (status) {
    case 401:
      return 'Session expired. Please log in again.';
    case 403:
      return 'You do not have permission to use the chatbot.';
    case 404:
      return 'Chatbot service not found. Please try again later.';
    case 429:
      return 'Too many requests. Please wait a moment and try again.';
    case 500:
      return 'Server error. Our team has been notified.';
    case 502:
    case 503:
    case 504:
      return 'Service temporarily unavailable. Please try again in a few moments.';
    default:
      return statusText || `Request failed (Error ${status})`;
  }
};

class ChatbotService {
  /**
   * Stream chat responses using SSE
   * @param message - User message
   * @param onToken - Callback for each token received
   * @param onMetadata - Callback for metadata (sessionId, sources)
   * @param onComplete - Callback when streaming completes
   * @param onError - Callback for errors
   * @param sessionId - Optional session ID
   * @param conversationHistory - Optional conversation history
   */
  async sendMessageStream(
    message: string,
    onToken: (token: string) => void,
    onMetadata: (sessionId: string, sources: any) => void,
    onComplete: () => void,
    onError: (error: Error) => void,
    sessionId?: string,
    conversationHistory?: ChatMessage[]
  ): Promise<void> {
    try {
      const token = getAuthToken();

      if (!token) {
        throw new Error('Please log in to use the chatbot.');
      }

      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 60000); // 60 second timeout

      let response: Response;
      try {
        response = await fetch(`${BASE_URL}/chatbot/chat-stream`, {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            message,
            sessionId,
            conversationHistory,
          }),
          signal: controller.signal,
        });
      } catch (fetchError: any) {
        clearTimeout(timeoutId);
        if (fetchError.name === 'AbortError') {
          throw new Error('Request timed out. Please try again.');
        }
        throw new Error('Unable to connect to the server. Please check your internet connection.');
      }

      clearTimeout(timeoutId);

      if (!response.ok) {
        const errorMessage = getErrorMessage(response.status, response.statusText);
        throw new Error(errorMessage);
      }

      const reader = response.body?.getReader();
      const decoder = new TextDecoder();

      if (!reader) {
        throw new Error('Unable to read response. Please try again.');
      }

      let buffer = '';

      while (true) {
        const { done, value } = await reader.read();
        if (done) {
          // If we exit without receiving 'done' event, call onComplete
          onComplete();
          break;
        }

        buffer += decoder.decode(value, { stream: true });
        const lines = buffer.split('\n');
        buffer = lines.pop() || ''; // Keep incomplete line in buffer

        for (const line of lines) {
          if (line.startsWith('data: ')) {
            const data = line.substring(6).trim();
            if (!data) continue;

            try {
              const event: StreamEvent = JSON.parse(data);

              switch (event.type) {
                case 'metadata':
                  if (event.sessionId) {
                    onMetadata(event.sessionId, event.sources || {});
                  }
                  break;
                case 'token':
                  if (event.content) {
                    onToken(event.content);
                  }
                  break;
                case 'error':
                  throw new Error(event.error || 'An error occurred while processing your request.');
                case 'done':
                  onComplete();
                  return;
              }
            } catch (parseError) {
              // Skip invalid JSON lines (could be keep-alive or other data)
              if (parseError instanceof SyntaxError) continue;
              throw parseError;
            }
          }
        }
      }
    } catch (error) {
      const errorMessage = error instanceof Error
        ? error.message
        : 'An unexpected error occurred. Please try again.';
      onError(new Error(errorMessage));
    }
  }

  // Fallback REST method
  async sendMessage(
    message: string,
    sessionId?: string,
    conversationHistory?: ChatMessage[]
  ): Promise<ChatResponse> {
    const token = getAuthToken();

    if (!token) {
      throw new Error('Please log in to use the chatbot.');
    }

    let response: Response;
    try {
      response = await fetch(`${BASE_URL}/chatbot/chat`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          message,
          sessionId,
          conversationHistory,
        }),
      });
    } catch (fetchError) {
      throw new Error('Unable to connect to the server. Please check your internet connection.');
    }

    if (!response.ok) {
      const errorMessage = getErrorMessage(response.status, response.statusText);
      throw new Error(errorMessage);
    }

    return response.json();
  }
}

export default new ChatbotService();
