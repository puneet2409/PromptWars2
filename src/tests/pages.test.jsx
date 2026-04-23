import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { LanguageProvider } from '../context/LanguageContext';
import MapPage from '../pages/MapPage';
import QuizPage from '../pages/QuizPage';
import TimelinePage from '../pages/TimelinePage';

const renderWithProvider = (component) => {
  return render(
    <LanguageProvider>
      {component}
    </LanguageProvider>
  );
};

describe('MapPage Component', () => {
  it('renders MapPage heading and instructions', () => {
    renderWithProvider(<MapPage />);
    expect(screen.getByText(/2019 National Results/i)).toBeInTheDocument();
  });
});

describe('QuizPage Component', () => {
  it('renders QuizPage heading', () => {
    renderWithProvider(<QuizPage />);
    expect(screen.getByText(/Election Knowledge Quiz/i)).toBeInTheDocument();
  });

  it('allows answering a quiz question and proceeding', () => {
    renderWithProvider(<QuizPage />);
    // Select an option
    const options = screen.getAllByRole('button', { name: /./i });
    if (options.length > 0) {
      fireEvent.click(options[0]);
    }
    
    // After answering, 'Next Question' or 'See Results' should appear
    const nextBtn = screen.queryByText(/Next Question/i) || screen.queryByText(/See Results/i);
    expect(nextBtn).toBeInTheDocument();
  });
});

describe('TimelinePage Component', () => {
  it('renders timeline milestones', () => {
    renderWithProvider(<TimelinePage />);
    expect(screen.getByText(/Election Timeline 2024/i)).toBeInTheDocument();
    // Check if at least one milestone year/date is rendered, e.g., 'Mar 16'
    expect(screen.getAllByText(/Mar 16/i).length).toBeGreaterThan(0);
  });
});
