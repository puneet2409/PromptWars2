import { useState } from 'react';
import { useLang } from '../context/LanguageContext';
import { STATES, CONSTITUENCIES } from '../constants/electionData';

export default function OnboardingPage({ onComplete, onSkip }) {
  const { lang, toggleLang, t } = useLang();
  const [selectedState, setSelectedState] = useState('');
  const [selectedConstituency, setSelectedConstituency] = useState('');

  const stateConstituencies = CONSTITUENCIES[selectedState] || [];

  const handleStart = () => {
    const constituency = stateConstituencies.find(c => c.name === selectedConstituency) || null;
    onComplete(selectedState, constituency);
  };

  return (
    <div className="onboarding-page">
      <div className="onboarding-card">
        <div className="onboarding-logo">CS</div>
        <h1 className="onboarding-title">{t('onboardTitle')}</h1>
        <p className="onboarding-desc">{t('onboardDesc')}</p>

        {/* Language selector */}
        <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 'var(--space-xl)' }}>
          <div className="lang-toggle">
            <button
              className={`lang-btn ${lang === 'en' ? 'active' : ''}`}
              onClick={() => lang !== 'en' && toggleLang()}
              id="onboard-lang-en"
            >
              English
            </button>
            <button
              className={`lang-btn ${lang === 'hi' ? 'active' : ''}`}
              onClick={() => lang !== 'hi' && toggleLang()}
              id="onboard-lang-hi"
            >
              हिंदी
            </button>
          </div>
        </div>

        <div className="form-group">
          <label className="form-label" htmlFor="state-select">{t('selectState')}</label>
          <select
            id="state-select"
            className="form-select"
            value={selectedState}
            onChange={(e) => {
              setSelectedState(e.target.value);
              setSelectedConstituency('');
            }}
          >
            <option value="">{t('statePlaceholder')}</option>
            {STATES.map(state => (
              <option key={state} value={state}>{state}</option>
            ))}
          </select>
        </div>

        {stateConstituencies.length > 0 && (
          <div className="form-group">
            <label className="form-label" htmlFor="constituency-select">{t('selectConstituency')}</label>
            <select
              id="constituency-select"
              className="form-select"
              value={selectedConstituency}
              onChange={(e) => setSelectedConstituency(e.target.value)}
            >
              <option value="">{t('constituencyPlaceholder')}</option>
              {stateConstituencies.map(c => (
                <option key={c.code} value={c.name}>{c.name} ({c.code})</option>
              ))}
            </select>
          </div>
        )}

        <button
          className="btn-primary"
          onClick={handleStart}
          disabled={!selectedState}
          id="start-btn"
        >
          {t('startBtn')} →
        </button>

        <button className="btn-secondary" onClick={onSkip} id="skip-btn">
          {t('skipBtn')}
        </button>
      </div>
    </div>
  );
}
