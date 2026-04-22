import { useMemo } from 'react';
import { useLang } from '../context/LanguageContext';
import { PARTY_COLORS } from '../constants/electionData';
import { Trophy, TrendingUp, Users } from 'lucide-react';

/**
 * Generates a deterministic set of hex-like polygon points
 * based on a seed string (constituency name).
 */
function seededRandom(seed) {
  let h = 0;
  for (let i = 0; i < seed.length; i++) {
    h = Math.imul(31, h) + seed.charCodeAt(i) | 0;
  }
  return () => {
    h = Math.imul(h ^ (h >>> 16), 0x45d9f3b);
    h = Math.imul(h ^ (h >>> 13), 0x45d9f3b);
    h ^= h >>> 16;
    return (h >>> 0) / 0xFFFFFFFF;
  };
}

function generateHexPoints(cx, cy, r, sides = 6, rotDeg = 0) {
  const pts = [];
  for (let i = 0; i < sides; i++) {
    const angle = ((Math.PI * 2) / sides) * i + (rotDeg * Math.PI) / 180;
    pts.push(`${cx + r * Math.cos(angle)},${cy + r * Math.sin(angle)}`);
  }
  return pts.join(' ');
}

function StylizedMap({ constituency }) {
  const partyColor = PARTY_COLORS[constituency.party] || '#64748b';

  const hexes = useMemo(() => {
    const rand = seededRandom(constituency.name + constituency.code);
    const cells = [];
    const gridCols = 6;
    const gridRows = 5;
    const cellSize = 30;
    const originX = 15;
    const originY = 10;

    for (let row = 0; row < gridRows; row++) {
      for (let col = 0; col < gridCols; col++) {
        // Create an organic cluster shape centered in the grid
        const distFromCenter = Math.sqrt(Math.pow(col - gridCols / 2, 2) + Math.pow(row - gridRows / 2, 2));
        if (rand() < distFromCenter * 0.2) continue;

        const offsetX = row % 2 === 1 ? cellSize * 0.5 : 0;
        const cx = originX + col * cellSize + offsetX + cellSize / 2;
        const cy = originY + row * (cellSize * 0.85) + cellSize / 2;
        const r = cellSize * 0.4 + rand() * 5;
        const sides = 6;
        const rotation = rand() * 20;

        // Color intensity based on position
        const intensity = Math.max(0.3, 1 - distFromCenter * 0.15);

        cells.push({
          cx,
          cy,
          r,
          sides,
          rotation,
          intensity,
          delay: (row * gridCols + col) * 0.03,
        });
      }
    }
    return cells;
  }, [constituency.name, constituency.code]);

  return (
    <div className="stylized-map-container" style={{ border: `1px solid ${partyColor}20`, background: `linear-gradient(135deg, var(--bg-card), ${partyColor}05)` }}>
      <svg viewBox="0 0 210 160" className="stylized-map-svg">
        <defs>
          <radialGradient id={`glow-${constituency.code}`} cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor={partyColor} stopOpacity="0.3" />
            <stop offset="100%" stopColor={partyColor} stopOpacity="0" />
          </radialGradient>
        </defs>

        {/* Background glow */}
        <ellipse cx="105" cy="80" rx="90" ry="65" fill={`url(#glow-${constituency.code})`} />

        {/* Grid lines */}
        {[30, 60, 90, 120].map(y => (
          <line key={y} x1="10" y1={y} x2="200" y2={y} stroke="rgba(255,255,255,0.03)" strokeWidth="0.5" />
        ))}

        {/* Hexagonal cells */}
        {hexes.map((hex, i) => (
          <polygon
            key={i}
            points={generateHexPoints(hex.cx, hex.cy, hex.r, hex.sides, hex.rotation)}
            fill={partyColor}
            fillOpacity={hex.intensity * 0.8}
            stroke={partyColor}
            strokeOpacity={0.6}
            strokeWidth="0.5"
            className="hex-cell"
            style={{ 
              animationDelay: `${hex.delay}s`,
              filter: `drop-shadow(0 0 2px ${partyColor}40)`
            }}
          />
        ))}

        {/* Pulse center marker */}
        <circle cx="105" cy="80" r="4" fill="white" style={{ animation: 'pulseGlow 2s infinite' }} />
      </svg>
    </div>
  );
}

export default function ConstituencyPanel({ constituency }) {
  const { t, lang } = useLang();

  if (!constituency) {
    return (
      <div className="chat-sidebar">
        <div className="empty-state">
          <div className="empty-state-icon">🏛️</div>
          <div className="empty-state-title">Select a Constituency</div>
          <div className="empty-state-desc">
            Explore the map or ask about a specific area to see detailed voting data and demographics.
          </div>
        </div>
      </div>
    );
  }

  const partyColor = PARTY_COLORS[constituency.party] || '#64748b';
  const totalVotes = constituency.margin * 2.5;
  const winnerPct = ((constituency.margin / totalVotes + 0.5) * 100).toFixed(1);
  const runnerPct = (100 - parseFloat(winnerPct) - 8.2).toFixed(1);

  return (
    <div className="chat-sidebar">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
        <div>
          <h3 className="constituency-header" style={{ fontSize: '1.25rem', marginBottom: '2px' }}>{constituency.name}</h3>
          <div className="constituency-code" style={{ fontFamily: 'monospace', letterSpacing: '0.05em' }}>{constituency.code}</div>
        </div>
        <div style={{ 
          background: partyColor, 
          color: ['TDP', 'BSP'].includes(constituency.party) ? '#000' : '#fff',
          padding: '2px 10px',
          borderRadius: '4px',
          fontSize: '0.75rem',
          fontWeight: 800
        }}>
          {constituency.party}
        </div>
      </div>

      <StylizedMap constituency={constituency} />

      <div className="vote-share-section" style={{ marginTop: 'var(--space-md)' }}>
        <h4 style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.8125rem' }}>
          <TrendingUp size={14} /> {t('voteShare')} ({constituency.year})
        </h4>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginTop: '12px' }}>
          <VoteBar party={constituency.party} pct={winnerPct} color={partyColor} />
          <VoteBar party={lang === 'hi' ? 'प्रतिद्वंद्वी' : 'Runner-up'} pct={runnerPct} color="#475569" />
          <VoteBar party={lang === 'hi' ? 'अन्य' : 'Others'} pct="8.2" color="#1e293b" />
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'var(--space-md)' }}>
        <div className="stat-card" style={{ textAlign: 'left', background: 'rgba(255,255,255,0.02)' }}>
          <div className="stat-label" style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
            <Trophy size={10} /> Winner
          </div>
          <div style={{ fontWeight: 700, color: partyColor, fontSize: '0.9rem', marginTop: '4px' }}>{constituency.mp}</div>
        </div>
        <div className="stat-card" style={{ textAlign: 'left', background: 'rgba(255,255,255,0.02)' }}>
          <div className="stat-label">Margin</div>
          <div style={{ fontWeight: 700, fontSize: '0.9rem', marginTop: '4px' }}>{constituency.margin.toLocaleString('en-IN')}</div>
        </div>
      </div>

      <div className="stat-card" style={{ textAlign: 'center', background: 'rgba(255,153,51,0.05)', border: '1px solid var(--saffron-glow)' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}>
          <Users size={16} style={{ color: 'var(--saffron)' }} />
          <div className="stat-value" style={{ margin: 0 }}>{constituency.turnout}%</div>
        </div>
        <div className="stat-label" style={{ marginTop: '4px' }}>Voter Turnout</div>
      </div>

      <div className="quick-links">
        <h4>{t('quickLinks')}</h4>
        <div className="quick-link">{t('qlTimeline')} ↗</div>
        <div className="quick-link">{t('qlRegister')} ↗</div>
      </div>
    </div>
  );
}

function VoteBar({ party, pct, color }) {
  return (
    <div className="vote-bar-item">
      <div style={{ flex: 1 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px' }}>
          <span className="vote-bar-label" style={{ width: 'auto' }}>{party}</span>
          <span className="vote-bar-pct">{pct}%</span>
        </div>
        <div className="vote-bar-track" style={{ height: '6px' }}>
          <div className="vote-bar-fill" style={{ width: `${pct}%`, background: color }} />
        </div>
      </div>
    </div>
  );
}
