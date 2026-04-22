import { useState, useCallback } from 'react';

export function useChat(lang) {
  const [messages, setMessages] = useState([]);
  const [isTyping, setIsTyping] = useState(false);

  const sendMessage = useCallback(async (text) => {
    if (!text.trim()) return;

    // Add user message
    const userMsg = { role: 'user', text: text.trim(), id: Date.now() };
    setMessages(prev => [...prev, userMsg]);
    setIsTyping(true);

    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: text, lang })
      });
      
      const response = await res.json();
      
      if (response.error) {
        throw new Error(response.error);
      }

      const assistantMsg = {
        role: 'assistant',
        title: response.title || 'Response',
        text: response.text || 'Something went wrong.',
        actions: response.actions || [],
        id: Date.now() + 1,
      };
      setMessages(prev => [...prev, assistantMsg]);
    } catch (error) {
      console.error(error);
      const assistantMsg = {
        role: 'assistant',
        title: 'Network Error',
        text: 'Sorry, I am unable to connect to the server right now.',
        actions: ['Try again'],
        id: Date.now() + 1,
      };
      setMessages(prev => [...prev, assistantMsg]);
    } finally {
      setIsTyping(false);
    }
  }, [lang]);

  const clearMessages = useCallback(() => {
    setMessages([]);
  }, []);

  return { messages, isTyping, sendMessage, clearMessages };
}
