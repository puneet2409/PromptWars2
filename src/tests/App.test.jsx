import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import App from '../App';
import { LanguageProvider } from '../context/LanguageContext';

// Mock matchMedia for components that might use it
Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: vi.fn().mockImplementation(query => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: vi.fn(), // Deprecated
    removeListener: vi.fn(), // Deprecated
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
    dispatchEvent: vi.fn(),
  })),
});

describe('App Component (Routing & Integration)', () => {
  it('renders onboarding initially', () => {
    render(
      <LanguageProvider>
        <App />
      </LanguageProvider>
    );
    expect(screen.getByText(/Welcome to Chunav Saathi/i)).toBeInTheDocument();
  });

  it('can navigate to Map page and then Chat page', async () => {
    render(
      <LanguageProvider>
        <App />
      </LanguageProvider>
    );
    
    // Skip onboarding
    const skipBtn = screen.getByText(/Skip/i);
    fireEvent.click(skipBtn);

    // After start, defaults to 'map' view
    expect(await screen.findByText(/National Results/i)).toBeInTheDocument();

    // Navigate to Chat
    const chatNavBtn = screen.getByRole('button', { name: /Chat/i });
    fireEvent.click(chatNavBtn);

    // Chat page should be visible
    expect(await screen.findByText(/AI Chat/i)).toBeInTheDocument();
  });

  it('can navigate to Quiz page', async () => {
    render(
      <LanguageProvider>
        <App />
      </LanguageProvider>
    );
    const skipBtn = screen.getByText(/Skip/i);
    if(skipBtn) fireEvent.click(skipBtn);

    const quizNavBtn = screen.getByRole('button', { name: /Quiz/i });
    fireEvent.click(quizNavBtn);

    expect(await screen.findByRole('heading', { name: /Election Knowledge Quiz/i })).toBeInTheDocument();
  });
});
