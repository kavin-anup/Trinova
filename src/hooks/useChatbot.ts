/**
 * useChatbot.ts
 * Custom hook that manages chatbot state with session tracking,
 * browser/device metadata collection, and conversation logging.
 */

import { useState, useRef, useCallback, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

export type MessageRole = 'user' | 'ai';

export interface ChatMessage {
  id: string;
  role: MessageRole;
  text: string;
  timestamp: Date;
}

interface HistoryTurn {
  role: 'user' | 'model';
  parts: Array<{ text: string }>;
}

const WELCOME_MESSAGE: ChatMessage = {
  id: 'welcome',
  role: 'ai',
  text: "Hi there! 👋 I'm **Trinova AI Assistant**. I can help you learn about our embedded systems, AI integration, IoT, and EMS solutions.\n\nHow can I help you today?",
  timestamp: new Date(),
};

/** Detect basic browser name from user agent */
function detectBrowser(): string {
  const ua = navigator.userAgent;
  if (ua.includes('Edg/')) return 'Edge';
  if (ua.includes('Chrome')) return 'Chrome';
  if (ua.includes('Firefox')) return 'Firefox';
  if (ua.includes('Safari')) return 'Safari';
  return 'Other';
}

/** Detect device type */
function detectDevice(): string {
  return /Mobi|Android|iPhone|iPad/i.test(navigator.userAgent) ? 'Mobile' : 'Desktop';
}

export function useChatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([WELCOME_MESSAGE]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Persistent session ID — survives re-renders but resets on new tab
  const sessionIdRef = useRef<string>(sessionStorage.getItem('chatbot_session_id') || (() => {
    const id = uuidv4();
    sessionStorage.setItem('chatbot_session_id', id);
    return id;
  })());

  // Unique conversation ID per chatbot open session
  const conversationIdRef = useRef<string>(uuidv4());

  // Gemini-format history for multi-turn conversations
  const historyRef = useRef<HistoryTurn[]>([]);
  const bottomRef = useRef<HTMLDivElement>(null);

  // Collect device metadata once
  const metadataRef = useRef({
    browser: detectBrowser(),
    device: detectDevice(),
    referrer: document.referrer || '',
    pageUrl: window.location.pathname,
  });

  // Auto-scroll to bottom whenever messages change or chat opens
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => {
        bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
      }, 50);
    }
  }, [messages, isOpen]);

  const toggleOpen = useCallback(() => {
    setIsOpen((prev) => !prev);
    setError(null);
    // Reset conversation ID on each open to track separate conversations
    if (!isOpen) {
      conversationIdRef.current = uuidv4();
    }
  }, [isOpen]);

  const sendMessage = useCallback(async () => {
    const text = inputValue.trim();
    if (!text || isLoading) return;

    setError(null);
    setInputValue('');

    const userMessage: ChatMessage = {
      id: `user-${Date.now()}`,
      role: 'user',
      text,
      timestamp: new Date(),
    };
    setMessages((prev) => [...prev, userMessage]);
    setIsLoading(true);

    historyRef.current = [
      ...historyRef.current,
      { role: 'user', parts: [{ text }] },
    ];

    try {
      const response = await fetch(`${API_URL}/chat`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: text,
          history: historyRef.current.slice(0, -1),
          sessionId: sessionIdRef.current,
          conversationId: conversationIdRef.current,
          pageUrl: metadataRef.current.pageUrl,
          browser: metadataRef.current.browser,
          device: metadataRef.current.device,
          referrer: metadataRef.current.referrer,
        }),
      });

      const data = await response.json();

      if (!response.ok || !data.success) {
        throw new Error(data.error || 'Server error. Please try again.');
      }

      const aiReply = data.reply as string;

      const aiMessage: ChatMessage = {
        id: `ai-${Date.now()}`,
        role: 'ai',
        text: aiReply,
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, aiMessage]);

      historyRef.current = [
        ...historyRef.current,
        { role: 'model', parts: [{ text: aiReply }] },
      ];
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : 'Unknown error';
      const friendly = message.includes('fetch')
        ? '⚠️ Could not reach the AI service. Please check your connection and try again.'
        : message || '⚠️ Something went wrong. Please try again.';
      setError(friendly);
      historyRef.current = historyRef.current.slice(0, -1);
    } finally {
      setIsLoading(false);
    }
  }, [inputValue, isLoading]);

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
      if (e.key === 'Enter' && !e.shiftKey) {
        e.preventDefault();
        sendMessage();
      }
    },
    [sendMessage]
  );

  return {
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
  };
}
