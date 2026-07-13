/**
 * ChatInput.tsx
 * The message input row: a growing textarea + a send button.
 * Enter submits, Shift+Enter adds a newline.
 */

interface Props {
  value: string;
  onChange: (value: string) => void;
  onSend: () => void;
  onKeyDown: (e: React.KeyboardEvent<HTMLTextAreaElement>) => void;
  isLoading: boolean;
}

export function ChatInput({ value, onChange, onSend, onKeyDown, isLoading }: Props) {
  return (
    <div className="chatbot-input-row">
      <textarea
        id="chatbot-input"
        className="chatbot-input"
        placeholder="Type your message…"
        value={value}
        rows={1}
        disabled={isLoading}
        aria-label="Chat message input"
        onChange={(e) => onChange(e.target.value)}
        onKeyDown={onKeyDown}
      />
      <button
        id="chatbot-send-btn"
        className={`chatbot-send-btn ${isLoading ? 'chatbot-send-btn--loading' : ''}`}
        onClick={onSend}
        disabled={isLoading || !value.trim()}
        aria-label="Send message"
        title="Send message"
      >
        {isLoading ? (
          /* Spinner icon */
          <svg className="chatbot-spinner" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
            <path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83" />
          </svg>
        ) : (
          /* Send icon */
          <svg viewBox="0 0 24 24" fill="currentColor" width="20" height="20">
            <path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z" />
          </svg>
        )}
      </button>
    </div>
  );
}
