import { renderHook, act } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { useChat } from '../hooks/useChat';

// Mock global fetch
global.fetch = vi.fn();

describe('useChat Hook', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('initializes with empty messages and not typing', () => {
    const { result } = renderHook(() => useChat('en'));
    
    expect(result.current.messages).toEqual([]);
    expect(result.current.isTyping).toBe(false);
  });

  it('does not send empty messages', async () => {
    const { result } = renderHook(() => useChat('en'));
    
    await act(async () => {
      await result.current.sendMessage('   ');
    });

    expect(result.current.messages).toHaveLength(0);
    expect(global.fetch).not.toHaveBeenCalled();
  });

  it('sends message and handles successful API response', async () => {
    const mockResponse = {
      title: 'EVM Info',
      text: 'EVM stands for Electronic Voting Machine.',
      actions: ['Next question']
    };

    global.fetch.mockResolvedValueOnce({
      json: async () => mockResponse
    });

    const { result } = renderHook(() => useChat('en'));

    await act(async () => {
      await result.current.sendMessage('What is EVM?');
    });

    expect(global.fetch).toHaveBeenCalledWith('/api/chat', expect.any(Object));
    expect(result.current.messages).toHaveLength(2);
    
    // Check user message
    expect(result.current.messages[0]).toMatchObject({
      role: 'user',
      text: 'What is EVM?'
    });

    // Check assistant message
    expect(result.current.messages[1]).toMatchObject({
      role: 'assistant',
      title: 'EVM Info',
      text: 'EVM stands for Electronic Voting Machine.',
      actions: ['Next question']
    });
  });

  it('handles API errors gracefully', async () => {
    global.fetch.mockRejectedValueOnce(new Error('Network error'));

    const { result } = renderHook(() => useChat('en'));

    await act(async () => {
      await result.current.sendMessage('Hello');
    });

    expect(result.current.messages).toHaveLength(2);
    expect(result.current.messages[1]).toMatchObject({
      role: 'assistant',
      title: 'Network Error'
    });
  });

  it('clears messages', async () => {
    const { result } = renderHook(() => useChat('en'));

    // First, populate it by manually sending a message (and mocking a response)
    global.fetch.mockResolvedValueOnce({ json: async () => ({}) });
    await act(async () => {
      await result.current.sendMessage('Test');
    });
    
    expect(result.current.messages).toHaveLength(2);

    // Then clear it
    act(() => {
      result.current.clearMessages();
    });

    expect(result.current.messages).toHaveLength(0);
  });
});
