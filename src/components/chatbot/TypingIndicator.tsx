/**
 * TypingIndicator.tsx
 * Animated "AI is thinking..." dots shown while waiting for a reply.
 */

export function TypingIndicator() {
  return (
    <div className="chatbot-message-row chatbot-message-row--ai">
      <div className="chatbot-avatar chatbot-avatar--ai" aria-hidden="true">
        <img src="/logo.png" alt="Trinova AI" />
      </div>
      <div className="chatbot-bubble chatbot-bubble--ai chatbot-bubble--typing" aria-label="AI is typing">
        <span className="chatbot-dot" />
        <span className="chatbot-dot" />
        <span className="chatbot-dot" />
      </div>
    </div>
  );
}
