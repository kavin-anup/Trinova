/**
 * ChatMessage.tsx
 * Renders a single chat bubble — either a "user" or "ai" message.
 * Converts Markdown-like bold (**text**) to <strong> and line-breaks to <br/>.
 */

import type { ChatMessage as ChatMessageType } from '../../hooks/useChatbot';

interface Props {
  message: ChatMessageType;
}

/** Converts **bold** and newlines to HTML */
function parseMarkdown(text: string): string {
  return text
    .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
    .replace(/\n/g, '<br/>');
}

export function ChatMessage({ message }: Props) {
  const isUser = message.role === 'user';

  return (
    <div
      className={`chatbot-message-row ${isUser ? 'chatbot-message-row--user' : 'chatbot-message-row--ai'}`}
    >
      {/* Avatar */}
      {!isUser && (
        <div className="chatbot-avatar chatbot-avatar--ai" aria-hidden="true">
          <img src="/logo.png" alt="Trinova AI" />
        </div>
      )}

      {/* Bubble */}
      <div
        className={`chatbot-bubble ${isUser ? 'chatbot-bubble--user' : 'chatbot-bubble--ai'}`}
        dangerouslySetInnerHTML={{ __html: parseMarkdown(message.text) }}
      />

      {/* User avatar placeholder */}
      {isUser && (
        <div className="chatbot-avatar chatbot-avatar--user" aria-hidden="true">
          <svg viewBox="0 0 24 24" fill="currentColor" width="18" height="18">
            <path d="M12 12c2.7 0 4.8-2.1 4.8-4.8S14.7 2.4 12 2.4 7.2 4.5 7.2 7.2 9.3 12 12 12zm0 2.4c-3.2 0-9.6 1.6-9.6 4.8v2.4h19.2v-2.4c0-3.2-6.4-4.8-9.6-4.8z" />
          </svg>
        </div>
      )}
    </div>
  );
}
