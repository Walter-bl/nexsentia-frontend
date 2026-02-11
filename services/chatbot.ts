const BASE_URL = process.env.NEXT_PUBLIC_API_URL;

export interface ChatMessage {
  role: 'user' | 'assistant';
  content: string;
  timestamp?: Date;
}

export interface StreamEvent {
  type: 'metadata' | 'token' | 'done';
  content?: string;
  sessionId?: string;
  sources?: {
    signals?: number;
    incidents?: number;
    issues?: number;
    metrics?: number;
  };
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
      const response = await fetch(`${BASE_URL}/chatbot/chat-stream`, {
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

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const reader = response.body?.getReader();
      const decoder = new TextDecoder();

      if (!reader) {
        throw new Error('Response body is not readable');
      }

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        const chunk = decoder.decode(value);
        const lines = chunk.split('\n');

        for (const line of lines) {
          if (line.startsWith('data: ')) {
            const data = line.substring(6);
            try {
              const event: StreamEvent = JSON.parse(data);

              switch (event.type) {
                case 'metadata':
                  if (event.sessionId && event.sources) {
                    onMetadata(event.sessionId, event.sources);
                  }
                  break;
                case 'token':
                  if (event.content) {
                    onToken(event.content);
                  }
                  break;
                case 'done':
                  onComplete();
                  return;
              }
            } catch (e) {
              // Skip invalid JSON
            }
          }
        }
      }
    } catch (error) {
      onError(error instanceof Error ? error : new Error('Unknown error'));
    }
  }

  // Fallback REST method
  async sendMessage(
    message: string,
    sessionId?: string,
    conversationHistory?: ChatMessage[]
  ): Promise<ChatResponse> {
    const token = getAuthToken();
    const response = await fetch(`${BASE_URL}/chatbot/chat`, {
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

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return response.json();
  }
}

export default new ChatbotService();
