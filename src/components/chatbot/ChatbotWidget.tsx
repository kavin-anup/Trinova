/**
 * ChatbotWidget.tsx
 * The main chatbot floating widget.
 * Composed of:
 *  - A FAB (Floating Action Button) that opens/closes the chat window
 *  - Chat header with logo + company name + close button
 *  - Scrollable message area
 *  - Error banner
 *  - Input row (ChatInput)
 *
 * All state is managed by the useChatbot() hook.
 */

import { useChatbot } from '../../hooks/useChatbot';
import { ChatMessage } from './ChatMessage';
import { ChatInput } from './ChatInput';
import { TypingIndicator } from './TypingIndicator';
import './ChatbotWidget.css';

export function ChatbotWidget() {
  const {
    isOpen,
    toggleOpen,
    messages,
    inputValue,
    setInputValue,
    isLoading,
    error,
    sendMessage,
    handleKeyDown,
    bottomRef,
  } = useChatbot();

  return (
    <>
      {/* ─── Chat panel ─────────────────────────────────────── */}
      <div
        id="chatbot-panel"
        className={`chatbot-panel ${isOpen ? 'chatbot-panel--open' : ''}`}
        role="dialog"
        aria-label="Trinova AI Chat"
        aria-modal="true"
      >
        {/* Header */}
        <div className="chatbot-header">
          <div className="chatbot-header-brand">
            <img
              src="/logo.png"
              alt="Trinova AI logo"
              className="chatbot-header-logo"
              onError={(e) => ((e.currentTarget as HTMLImageElement).style.display = 'none')}
            />
            <div>
              <p className="chatbot-header-name">Trinova AI</p>
              <p className="chatbot-header-status">
                <span className="chatbot-status-dot" aria-hidden="true" />
                Online · AI Assistant
              </p>
            </div>
          </div>
          <button
            id="chatbot-close-btn"
            className="chatbot-close-btn"
            onClick={toggleOpen}
            aria-label="Close chat"
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" width="18" height="18">
              <path d="M18 6L6 18M6 6l12 12" strokeLinecap="round" />
            </svg>
          </button>
        </div>

        {/* Message area */}
        <div className="chatbot-messages" role="log" aria-live="polite" aria-relevant="additions">
          {messages.map((msg) => (
            <ChatMessage key={msg.id} message={msg} />
          ))}
          {isLoading && <TypingIndicator />}
          <div ref={bottomRef} />
        </div>

        {/* Error banner */}
        {error && (
          <div className="chatbot-error" role="alert">
            {error}
          </div>
        )}

        {/* Input area */}
        <div className="chatbot-footer">
          <ChatInput
            value={inputValue}
            onChange={setInputValue}
            onSend={sendMessage}
            onKeyDown={handleKeyDown}
            isLoading={isLoading}
          />
          <p className="chatbot-powered-by">Powered by Google Gemini</p>
        </div>
      </div>

      {/* ─── FAB toggle button ──────────────────────────────── */}
      <button
        id="chatbot-fab"
        className={`chatbot-fab ${isOpen ? 'chatbot-fab--open' : ''}`}
        onClick={toggleOpen}
        aria-label={isOpen ? 'Close AI chat' : 'Open AI chat'}
        title={isOpen ? 'Close chat' : 'Chat with Trinova AI'}
      >
        {/* Chat icon */}
        <span className={`chatbot-fab-icon chatbot-fab-icon--chat ${isOpen ? 'chatbot-fab-icon--hidden' : ''}`}>
          <svg viewBox="0 0 24 24" fill="currentColor" width="26" height="26">
            <path d="M20 2H4c-1.1 0-2 .9-2 2v18l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm-2 12H6v-2h12v2zm0-3H6V9h12v2zm0-3H6V6h12v2z" />
          </svg>
        </span>
        {/* Close (X) icon */}
        <span className={`chatbot-fab-icon chatbot-fab-icon--close ${!isOpen ? 'chatbot-fab-icon--hidden' : ''}`}>
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" width="22" height="22">
            <path d="M18 6L6 18M6 6l12 12" strokeLinecap="round" />
          </svg>
        </span>

        {/* Pulse ring (shown only when chat is closed) */}
        {!isOpen && <span className="chatbot-fab-pulse" aria-hidden="true" />}
      </button>
    </>
  );
}
