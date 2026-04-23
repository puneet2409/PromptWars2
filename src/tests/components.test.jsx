import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import ChatMessage from '../components/ChatMessage';
import ConstituencyPanel from '../components/ConstituencyPanel';
import NavBar from '../components/NavBar';
import { LanguageProvider } from '../context/LanguageContext';

describe('ChatMessage Component', () => {
  it('renders user message correctly', () => {
    const message = { role: 'user', text: 'Hello AI' };
    render(<ChatMessage message={message} />);
    expect(screen.getByText('Hello AI')).toBeInTheDocument();
    expect(screen.getByText('U')).toBeInTheDocument();
  });

  it('renders assistant message correctly with actions', () => {
    const mockAction = vi.fn();
    const message = {
      role: 'assistant',
      title: 'Greetings',
      text: 'Hello User',
      actions: ['What is EVM?', 'Vote Info'],
    };
    render(<ChatMessage message={message} onAction={mockAction} />);
    
    expect(screen.getByText('Greetings')).toBeInTheDocument();
    expect(screen.getByText('Hello User')).toBeInTheDocument();
    expect(screen.getByText('What is EVM? ↗')).toBeInTheDocument();
    
    fireEvent.click(screen.getByText('What is EVM? ↗'));
    expect(mockAction).toHaveBeenCalledWith('What is EVM?');
  });
});

describe('NavBar Component', () => {
  it('renders and toggles language', () => {
    render(
      <LanguageProvider>
        <NavBar />
      </LanguageProvider>
    );
    expect(screen.getAllByText(/Chunav Saathi/i).length).toBeGreaterThan(0);
    const langBtns = screen.getAllByRole('button', { name: /EN|हिं/i });
    expect(langBtns.length).toBeGreaterThan(0);
  });
});

describe('ConstituencyPanel Component', () => {
  it('renders empty state when no constituency selected', () => {
    render(
      <LanguageProvider>
        <ConstituencyPanel selectedConstituency={null} />
      </LanguageProvider>
    );
    expect(screen.getByText(/Select a constituency/i)).toBeInTheDocument();
  });

  it('renders constituency data when selected', () => {
    const mockData = {
      name: 'Test PC',
      code: 'TPC-01',
      state: 'Test State',
      party: 'Test Party',
      margin: 10000,
      year: 2019,
      mp: 'John Doe',
      turnout: 75,
    };
    render(
      <LanguageProvider>
        <ConstituencyPanel constituency={mockData} />
      </LanguageProvider>
    );
    expect(screen.getByText('Test PC')).toBeInTheDocument();
    expect(screen.getAllByText('Test Party').length).toBeGreaterThan(0);
  });
});
