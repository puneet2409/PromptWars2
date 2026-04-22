import { useLang } from '../context/LanguageContext';
import { MessageSquare, Map, Clock, HelpCircle, ChevronLeft } from 'lucide-react';

export default function NavBar({ activeTab, onTabChange, constituency, onReset }) {
  const { lang, toggleLang, t } = useLang();

  const tabs = [
    { id: 'chat', label: t('navChat') || 'Chat assistant', icon: MessageSquare },
    { id: 'map', label: t('navMap') || 'Explore data', icon: Map },
    { id: 'timeline', label: t('navTimeline') || 'Election timeline', icon: Clock },
    { id: 'quiz', label: t('navQuiz') || 'Knowledge quiz', icon: HelpCircle },
  ];

  return (
    <nav className="navbar" id="main-nav">
      <div className="navbar-left">
        <button 
          className="back-btn" 
          onClick={onReset} 
          title="Return to selection"
          style={{
            background: 'rgba(255, 255, 255, 0.05)',
            border: '1px solid var(--border-subtle)',
            borderRadius: 'var(--radius-md)',
            padding: 'var(--space-xs) var(--space-sm)',
            marginRight: 'var(--space-md)',
            color: 'var(--text-secondary)',
            display: 'flex',
            alignItems: 'center',
            gap: '4px',
            fontSize: '0.75rem',
            fontWeight: 500,
            cursor: 'pointer',
            transition: 'all 0.2s ease',
            height: 'fit-content'
          }}
          onMouseOver={(e) => e.currentTarget.style.background = 'rgba(255, 255, 255, 0.1)'}
          onMouseOut={(e) => e.currentTarget.style.background = 'rgba(255, 255, 255, 0.05)'}
        >
          <ChevronLeft size={16} />
          {lang === 'hi' ? 'पीछे' : 'Back'}
        </button>

        <div className="navbar-brand" onClick={onReset} style={{ cursor: 'pointer' }} title="Go to Home/Onboarding">
          <div className="navbar-logo">CS</div>
          <div>
            <div className="navbar-title">{t('appName')}</div>
            {constituency && (
              <div className="navbar-subtitle">
                {constituency.name} constituency · {lang === 'hi' ? 'हिंदी' : 'Hindi'} / {lang === 'en' ? 'English' : 'अंग्रेज़ी'}
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="navbar-actions">
        <div className="tab-bar">
          {tabs.map(tab => (
            <button
              key={tab.id}
              id={`tab-${tab.id}`}
              className={`tab-btn ${activeTab === tab.id ? 'active' : ''}`}
              onClick={() => onTabChange(tab.id)}
            >
              {tab.label}
            </button>
          ))}
        </div>

        <div className="lang-toggle">
          <button
            className={`lang-btn ${lang === 'en' ? 'active' : ''}`}
            onClick={() => lang !== 'en' && toggleLang()}
            id="lang-en"
          >
            EN
          </button>
          <button
            className={`lang-btn ${lang === 'hi' ? 'active' : ''}`}
            onClick={() => lang !== 'hi' && toggleLang()}
            id="lang-hi"
          >
            हिं
          </button>
        </div>
      </div>
    </nav>
  );
}
