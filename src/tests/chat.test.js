import { describe, it, expect } from 'vitest';
import { getResponse, isHindi } from '../services/knowledgeBase';

describe('Knowledge Base Chat Engine', () => {
  it('detects Hindi text', () => {
    expect(isHindi('ईवीएम क्या है?')).toBe(true);
    expect(isHindi('What is EVM?')).toBe(false);
  });

  it('responds to constituency question in English', () => {
    const response = getResponse('Who won Varanasi in 2019?', 'en');
    expect(response.title).toContain('Varanasi');
    expect(response.text).toContain('Modi');
  });

  it('responds to EVM question in English', () => {
    const response = getResponse('What is EVM?', 'en');
    expect(response.title).toContain('EVM');
    expect(response.text).toContain('traditional paper ballots');
  });

  it('responds to NOTA question in Hindi', () => {
    const response = getResponse('नोटा क्या है?', 'hi');
    expect(response.title).toContain('NOTA');
    expect(response.lang).toBe('hi');
  });

  it('responds to voter registration question', () => {
    const response = getResponse('How do I register to vote?', 'en');
    expect(response.text).toContain('Form 6');
  });

  it('returns fallback for unknown questions', () => {
    const response = getResponse('Tell me about quantum physics', 'en');
    expect(response.title).toContain('help');
    expect(response.actions.length).toBeGreaterThan(0);
  });

  it('responds to Lok Sabha results query', () => {
    const response = getResponse('2019 Lok Sabha results', 'en');
    expect(response.title).toContain('2019');
    expect(response.text).toContain('543');
  });
});
