import { useState, useRef, useEffect } from 'react';
import { useLang } from '../context/LanguageContext';
import { useChat } from '../hooks/useChat';
import ChatMessage from '../components/ChatMessage';
import ConstituencyPanel from '../components/ConstituencyPanel';
import { Send, MessageSquare } from 'lucide-react';

export default function ChatPage({ selectedState, selectedConstituency, onConstituencyChange }) {
  const { lang, t } = useLang();
  const { messages, isTyping, sendMessage } = useChat(lang);
  const [input, setInput] = useState('');
  const messagesEndRef = useRef(null);

  // Suggested questions based on language
  const suggestions = [
    t('sq1'), t('sq2'), t('sq3'), t('sq4'), t('sq5'), t('sq6'),
  ];

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  const handleSend = () => {
    if (!input.trim()) return;
    sendMessage(input);
    setInput('');
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const handleSuggestion = (text) => {
    sendMessage(text);
  };

  return (
    <div className="chat-layout">
      <div className="chat-main" style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
        
        {/* Header */}
        <div className="chat-header" style={{ padding: 'var(--space-md) var(--space-lg)', borderBottom: '1px solid var(--border-subtle)', background: 'rgba(255,255,255,0.02)' }}>
          <h2 style={{ margin: 0, fontSize: '1.25rem', background: 'linear-gradient(135deg, var(--primary), #fff)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
            AI Chat Assistant
          </h2>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.8125rem', margin: '4px 0 0 0' }}>
            {t('chatEmptyDesc')}
          </p>
        </div>

        
        {/* Top Stat Cards (from Mockup 3) */}
        {selectedConstituency && (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 'var(--space-md)', padding: 'var(--space-md)', background: 'var(--bg-main)', zIndex: 10, borderBottom: '1px solid var(--border-subtle)' }}>
            <div className="glass-card" style={{ padding: 'var(--space-md)', position: 'relative' }}>
              <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', marginBottom: '4px' }}>Your constituency</div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div style={{ fontSize: '1.25rem', fontWeight: 600 }}>{selectedConstituency.name}</div>
                <button 
                  onClick={() => onConstituencyChange(null)}
                  style={{
                    fontSize: '0.65rem',
                    padding: '2px 8px',
                    borderRadius: '4px',
                    border: '1px solid rgba(255,153,51,0.5)',
                    background: 'rgba(255,153,51,0.1)',
                    color: 'var(--saffron)',
                    cursor: 'pointer'
                  }}
                >
                  {lang === 'hi' ? 'बदले' : 'Change'}
                </button>
              </div>
              <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>Lok Sabha • {selectedConstituency.code}</div>
            </div>
            <div className="glass-card" style={{ padding: 'var(--space-md)' }}>
              <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', marginBottom: '4px' }}>Registered voters</div>
              <div style={{ fontSize: '1.25rem', fontWeight: 600 }}>18.4L</div>
              <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>2024 electoral roll</div>
            </div>
            <div className="glass-card" style={{ padding: 'var(--space-md)' }}>
              <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', marginBottom: '4px' }}>2019 turnout</div>
              <div style={{ fontSize: '1.25rem', fontWeight: 600 }}>{selectedConstituency.turnout}%</div>
              <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>Above national avg.</div>
            </div>
          </div>
        )}

        {/* Messages */}
        <div className="chat-messages" style={{ flex: 1, overflowY: 'auto' }}>
          {messages.length === 0 && (
            <div className="chat-message assistant" style={{ marginTop: 'auto' }}>
              <div className="message-avatar assistant" style={{ background: 'var(--primary)' }}>AI</div>
              <div>
                <div className="message-bubble assistant" style={{ fontSize: '1.05rem', lineHeight: 1.5 }}>
                  {lang === 'hi' 
                    ? 'नमस्ते! मैं चुनाव साथी हूँ — भारत के चुनावों के लिए आपका मार्गदर्शक। मैं चुनाव प्रक्रिया, आपके निर्वाचन क्षेत्र, उम्मीदवारों, मतदाता पंजीकरण और बहुत कुछ के बारे में हिंदी या अंग्रेजी में आपके सवालों के जवाब दे सकता हूँ। आप क्या जानना चाहेंगे?' 
                    : 'Namaste! I\'m Chunav Saathi — your guide to India\'s elections. I can answer questions in Hindi or English about the election process, your constituency, candidates, voter registration, and much more. What would you like to know?'
                  }
                </div>
                <div style={{ fontSize: '0.75rem', color: 'var(--primary)', marginTop: '8px', opacity: 0.8 }}>
                  Powered by AlloyDB election data
                </div>
              </div>
            </div>
          )}

          {messages.map(msg => (
            <ChatMessage
              key={msg.id}
              message={msg}
              onAction={handleSuggestion}
            />
          ))}

          {isTyping && (
            <div className="chat-message assistant">
              <div className="message-avatar assistant">AI</div>
              <div className="message-bubble assistant">
                <div className="typing-indicator">
                  <div className="typing-dot" />
                  <div className="typing-dot" />
                  <div className="typing-dot" />
                </div>
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Bottom Section: Suggestions + Input */}
        <div style={{ padding: '0 var(--space-md)' }}>
          {messages.length === 0 && (
            <div style={{ marginBottom: 'var(--space-sm)' }}>
              <div style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--text-secondary)', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: 'var(--space-xs)' }}>
                {t('suggestedQuestions') || 'Suggested Questions'}
              </div>
              <div className="suggested-questions" style={{ display: 'flex', gap: '8px', overflowX: 'auto', paddingBottom: '8px' }}>
                {suggestions.map((q, i) => (
                  <button
                    key={i}
                    className="suggested-pill"
                    onClick={() => handleSuggestion(q)}
                    id={`suggestion-${i}`}
                    style={{ whiteSpace: 'nowrap' }}
                  >
                    {q}
                  </button>
                ))}
              </div>
            </div>
          )}
          
          <div className="chat-input-bar" style={{ padding: 'var(--space-sm) 0' }}>
          <div className="chat-input-wrapper">
            <MessageSquare size={18} style={{ color: 'var(--text-muted)', flexShrink: 0 }} />
            <input
              type="text"
              className="chat-input"
              placeholder={t('chatPlaceholder')}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              id="chat-input"
            />
            <button
              className="send-btn"
              onClick={handleSend}
              disabled={!input.trim() || isTyping}
              id="send-btn"
            >
              <Send size={18} />
            </button>
          </div>
        </div>
        </div>
      </div>

      {/* Right sidebar */}
      <ConstituencyPanel constituency={selectedConstituency} />
    </div>
  );
}
