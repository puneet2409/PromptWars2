import { useState } from 'react';
import { useLang } from '../context/LanguageContext';
import { ELECTION_TIMELINE } from '../constants/electionData';
import { Clock, CheckCircle2, Circle } from 'lucide-react';

export default function TimelinePage() {
  const { t, lang } = useLang();
  const [activeIndex, setActiveIndex] = useState(6); // Default to Counting/Formation

  return (
    <div className="timeline-page">
      <div style={{ textAlign: 'center', marginBottom: 'var(--space-2xl)' }}>
        <h2 style={{ 
          fontSize: '2rem', 
          marginBottom: 'var(--space-sm)',
          background: 'linear-gradient(135deg, var(--saffron), #fff)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          backgroundClip: 'text'
        }}>
          {t('timelineTitle')}
        </h2>
        <p style={{ color: 'var(--text-secondary)' }}>{t('timelineDesc')}</p>
      </div>

      <div className="timeline-line">
        {ELECTION_TIMELINE.map((item, i) => {
          const isCompleted = item.status === 'completed' || i < activeIndex;
          const isActive = i === activeIndex;
          
          return (
            <div 
              key={i} 
              className={`timeline-item ${isActive ? 'active' : ''}`}
              onClick={() => setActiveIndex(i)}
              style={{ cursor: 'pointer' }}
            >
              <div className={`timeline-dot ${isCompleted ? 'completed' : ''} ${isActive ? 'active' : ''}`}>
                {isCompleted ? <CheckCircle2 size={14} /> : isActive ? <Clock size={14} /> : <Circle size={14} />}
              </div>
              
              <div className={`glass-card ${isActive ? 'active' : ''}`} style={{ 
                borderLeft: isActive ? '4px solid var(--saffron)' : '1px solid var(--border-card)',
                transition: 'all 0.3s var(--ease-out)',
                background: isActive ? 'rgba(255,153,51,0.05)' : 'var(--bg-glass)'
              }}>
                <div className="timeline-date">{item.date}</div>
                <div className="timeline-event" style={{ color: isActive ? 'var(--saffron)' : 'var(--text-primary)' }}>
                  {item.event}
                </div>
                {isActive && (
                  <div className="timeline-desc" style={{ animation: 'fadeIn 0.5s ease' }}>
                    {item.desc}
                  </div>
                )}
                {!isActive && (
                  <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '4px' }}>
                    {lang === 'hi' ? 'विवरण देखने के लिए क्लिक करें' : 'Click to see details'}
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Summary Footer Stats */}
      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', 
        gap: 'var(--space-lg)',
        marginTop: 'var(--space-2xl)'
      }}>
        <div className="glass-card" style={{ textAlign: 'center', padding: 'var(--space-xl)' }}>
          <div style={{ fontSize: '2rem', fontWeight: 800, color: 'var(--saffron)' }}>7</div>
          <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', textTransform: 'uppercase', letterSpacing: '0.1em', fontWeight: 600 }}>
            Polling Phases
          </div>
        </div>
        <div className="glass-card" style={{ textAlign: 'center', padding: 'var(--space-xl)' }}>
          <div style={{ fontSize: '2rem', fontWeight: 800, color: 'var(--green)' }}>543</div>
          <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', textTransform: 'uppercase', letterSpacing: '0.1em', fontWeight: 600 }}>
            Total Seats
          </div>
        </div>
        <div className="glass-card" style={{ textAlign: 'center', padding: 'var(--space-xl)' }}>
          <div style={{ fontSize: '2rem', fontWeight: 800, color: 'var(--chakra-blue)' }}>96.8Cr</div>
          <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', textTransform: 'uppercase', letterSpacing: '0.1em', fontWeight: 600 }}>
            Eligible Voters
          </div>
        </div>
      </div>
    </div>
  );
}
