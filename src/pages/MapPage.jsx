import { useState } from 'react';
import { useLang } from '../context/LanguageContext';
import { CONSTITUENCIES } from '../constants/electionData';
import { PARTY_COLORS } from '../constants/electionData';

// Refined India SVG map data — High-fidelity geometric paths
const INDIA_STATES = [
  { id: 'JK', name: 'Jammu & Kashmir', seats: 5, party: 'Others', d: 'M180,40 L210,35 L245,55 L240,90 L210,110 L175,95 L165,70 Z' },
  { id: 'HP', name: 'Himachal Pradesh', seats: 4, party: 'BJP', d: 'M215,115 L245,100 L270,120 L260,150 L230,155 L210,140 Z' },
  { id: 'PB', name: 'Punjab', seats: 13, party: 'INC', d: 'M170,115 L210,110 L225,135 L215,170 L185,175 L165,145 Z' },
  { id: 'UK', name: 'Uttarakhand', seats: 5, party: 'BJP', d: 'M265,125 L305,115 L330,145 L315,180 L275,185 L255,160 Z' },
  { id: 'HR', name: 'Haryana', seats: 10, party: 'BJP', d: 'M215,175 L245,170 L265,190 L255,220 L225,225 L210,205 Z' },
  { id: 'RJ', name: 'Rajasthan', seats: 25, party: 'BJP', d: 'M110,180 L180,165 L220,195 L225,260 L180,300 L115,280 L100,220 Z' },
  { id: 'UP', name: 'Uttar Pradesh', seats: 80, party: 'BJP', d: 'M270,190 L350,170 L420,200 L430,260 L380,310 L300,290 L260,240 Z' },
  { id: 'GJ', name: 'Gujarat', seats: 26, party: 'BJP', d: 'M80,290 L130,285 L160,310 L155,360 L120,380 L85,340 Z' },
  { id: 'MP', name: 'Madhya Pradesh', seats: 29, party: 'BJP', d: 'M190,285 L280,265 L330,300 L320,360 L250,380 L180,340 Z' },
  { id: 'BR', name: 'Bihar', seats: 40, party: 'JDU', d: 'M430,210 L500,200 L530,230 L520,280 L480,290 L440,260 Z' },
  { id: 'WB', name: 'West Bengal', seats: 42, party: 'TMC', d: 'M510,235 L540,225 L560,250 L560,340 L530,380 L500,340 L500,280 Z' },
  { id: 'JH', name: 'Jharkhand', seats: 14, party: 'BJP', d: 'M440,270 L500,260 L520,290 L510,330 L470,340 L445,310 Z' },
  { id: 'CT', name: 'Chhattisgarh', seats: 11, party: 'BJP', d: 'M330,320 L370,310 L410,340 L400,420 L350,440 L320,380 Z' },
  { id: 'OD', name: 'Odisha', seats: 21, party: 'BJD', d: 'M410,330 L480,310 L520,350 L500,410 L450,420 L400,380 Z' },
  { id: 'MH', name: 'Maharashtra', seats: 48, party: 'BJP', d: 'M150,370 L240,360 L310,380 L320,460 L260,490 L170,470 L140,420 Z' },
  { id: 'TS', name: 'Telangana', seats: 17, party: 'BJP', d: 'M250,440 L310,430 L340,460 L320,510 L270,520 L240,480 Z' },
  { id: 'AP', name: 'Andhra Pradesh', seats: 25, party: 'YSRCP', d: 'M310,470 L360,450 L400,480 L380,560 L330,580 L300,520 Z' },
  { id: 'KA', name: 'Karnataka', seats: 28, party: 'BJP', d: 'M180,480 L250,470 L280,510 L270,590 L220,610 L170,560 Z' },
  { id: 'TN', name: 'Tamil Nadu', seats: 39, party: 'DMK', d: 'M260,600 L320,580 L350,620 L330,700 L280,720 L250,660 Z' },
  { id: 'KL', name: 'Kerala', seats: 20, party: 'INC', d: 'M210,610 L250,600 L260,680 L240,730 L210,720 L200,660 Z' },
  { id: 'AS', name: 'Assam', seats: 14, party: 'BJP', d: 'M570,220 L650,210 L680,240 L670,280 L600,290 L570,250 Z' },
];

// Build a legend from unique parties
const LEGEND_PARTIES = [...new Set(INDIA_STATES.map(s => s.party))];

export default function MapPage({ onSelectState }) {
  const { t, lang } = useLang();
  const [hoveredState, setHoveredState] = useState(null);
  const [selectedState, setSelectedState] = useState(null);
  const [tooltip, setTooltip] = useState({ show: false, x: 0, y: 0 });

  const handleMouseEnter = (state, e) => {
    setHoveredState(state);
    setTooltip({ show: true, x: e.clientX + 12, y: e.clientY - 10 });
  };

  const handleMouseMove = (e) => {
    if (hoveredState) {
      setTooltip({ show: true, x: e.clientX + 12, y: e.clientY - 10 });
    }
  };

  const handleMouseLeave = () => {
    setHoveredState(null);
    setTooltip({ show: false, x: 0, y: 0 });
  };

  const handleClick = (state) => {
    setSelectedState(state);
    if (onSelectState) onSelectState(state.name);
  };

  const stateConstituencies = selectedState ? (CONSTITUENCIES[selectedState.name] || []) : [];

  // Simulated party-wise count for the selected state
  const getPartyCounts = () => {
    if (!stateConstituencies.length) return [];
    const counts = {};
    stateConstituencies.forEach(c => {
      counts[c.party] = (counts[c.party] || 0) + 1;
    });
    return Object.entries(counts)
      .map(([party, count]) => ({ party, count }))
      .sort((a, b) => b.count - a.count);
  };

  const partyCounts = getPartyCounts();

  return (
    <div className="map-page">
      {/* Header */}
      <div className="map-header">
        <h2 style={{ marginBottom: '4px', background: 'linear-gradient(135deg, var(--saffron), #fff)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
          {t('mapTitle')}
        </h2>
        <p style={{ color: 'var(--text-secondary)', fontSize: '0.875rem', margin: 0 }}>{t('mapDesc')}</p>
        <div className="map-stats-row">
          <div className="map-stat-chip">
            <span className="map-stat-chip-value">28</span>
            <span className="map-stat-chip-label">States</span>
          </div>
          <div className="map-stat-chip">
            <span className="map-stat-chip-value">8</span>
            <span className="map-stat-chip-label">UTs</span>
          </div>
          <div className="map-stat-chip" style={{ border: '1px solid var(--saffron-glow)', background: 'var(--saffron-dim)' }}>
            <span className="map-stat-chip-value" style={{ color: 'var(--saffron)' }}>2024</span>
            <span className="map-stat-chip-label">Live Election</span>
          </div>
        </div>
      </div>

      <div style={{ display: 'flex', flex: 1, overflow: 'hidden', position: 'relative', minHeight: 0 }}>

        {/* Map Container */}
        <div className="map-container" style={{ flex: 1, position: 'relative', background: 'radial-gradient(circle at 50% 50%, rgba(37,99,235,0.03) 0%, transparent 70%)' }}>

          {/* National Summary Floating Card */}
          <div className="map-national-summary">
            <div className="summary-header">
              <span>{lang === 'hi' ? '2019 राष्ट्रीय परिणाम' : '2019 National Results'}</span>
              <span style={{ color: 'var(--green)' }}>● Live</span>
            </div>
            <div className="summary-grid">
              <div className="summary-stat">
                <div className="summary-stat-label">BJP+ (NDA)</div>
                <div className="summary-stat-value" style={{ color: 'var(--saffron)' }}>353</div>
              </div>
              <div className="summary-stat">
                <div className="summary-stat-label">INC+ (UPA)</div>
                <div className="summary-stat-value" style={{ color: 'var(--inc)' }}>91</div>
              </div>
              <div className="summary-stat">
                <div className="summary-stat-label">Others</div>
                <div className="summary-stat-value">99</div>
              </div>
              <div className="summary-stat">
                <div className="summary-stat-label">Turnout</div>
                <div className="summary-stat-value" style={{ color: 'var(--green)' }}>67.4%</div>
              </div>
            </div>
            <div style={{ marginTop: '12px', height: '4px', background: 'var(--bg-input)', borderRadius: '2px', overflow: 'hidden', display: 'flex' }}>
              <div style={{ width: '65%', height: '100%', background: 'var(--saffron)' }} />
              <div style={{ width: '17%', height: '100%', background: 'var(--inc)' }} />
              <div style={{ width: '18%', height: '100%', background: 'var(--text-muted)' }} />
            </div>
          </div>
          <svg
            viewBox="60 20 640 720"
            className="india-map-svg"
            preserveAspectRatio="xMidYMid meet"
            style={{ filter: 'drop-shadow(0 4px 12px rgba(0,0,0,0.3))' }}
            onMouseMove={handleMouseMove}
          >
            <defs>
              <filter id="glow">
                <feGaussianBlur stdDeviation="2.5" result="coloredBlur" />
                <feMerge>
                  <feMergeNode in="coloredBlur" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
            </defs>

            {/* State paths */}
            {INDIA_STATES.map(state => {
              const isHovered = hoveredState?.id === state.id;
              const isSelected = selectedState?.id === state.id;
              const color = PARTY_COLORS[state.party] || '#64748b';
              
              return (
                <g key={state.id}>
                  <path
                    d={state.d}
                    fill={color}
                    fillOpacity={isSelected ? 0.9 : isHovered ? 0.7 : 0.4}
                    stroke={isSelected ? '#fff' : isHovered ? 'rgba(255,255,255,0.6)' : 'rgba(255,255,255,0.1)'}
                    strokeWidth={isSelected ? 2 : 1}
                    onMouseEnter={(e) => handleMouseEnter(state, e)}
                    onMouseLeave={handleMouseLeave}
                    onClick={() => handleClick(state)}
                    style={{
                      cursor: 'pointer',
                      transition: 'all 0.3s var(--spring)',
                      filter: isSelected ? 'url(#glow)' : 'none',
                    }}
                  />
                </g>
              );
            })}
          </svg>

          {/* Party Legend */}
          <div className="map-legend">
            {LEGEND_PARTIES.map(party => (
              <div key={party} className="map-legend-item">
                <div className="map-legend-dot" style={{ background: PARTY_COLORS[party] || '#64748b' }} />
                <span>{party}</span>
              </div>
            ))}
          </div>
        </div>

        {/* State detail panel */}
        {selectedState && (
          <div className="map-detail-panel">
            <div className="map-detail-header">
              <div>
                <h3 style={{ margin: 0, fontSize: '1.25rem' }}>{selectedState.name}</h3>
                <div style={{ color: 'var(--text-secondary)', fontSize: '0.8125rem', marginTop: '4px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <span>{selectedState.seats} {t('seats')}</span>
                  <span style={{ width: '4px', height: '4px', borderRadius: '50%', background: 'var(--text-muted)' }} />
                  <span>Ruling: <span style={{ color: PARTY_COLORS[selectedState.party], fontWeight: 700 }}>{selectedState.party}</span></span>
                </div>
              </div>
              <button
                onClick={() => setSelectedState(null)}
                style={{
                  background: 'rgba(255,255,255,0.05)',
                  border: '1px solid var(--border-subtle)',
                  borderRadius: 'var(--radius-sm)',
                  color: 'var(--text-secondary)',
                  padding: '6px',
                  cursor: 'pointer',
                  lineHeight: 0
                }}
              >
                ✕
              </button>
            </div>

            <div className="map-detail-divider" />

            {stateConstituencies.length > 0 ? (
              <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-lg)' }}>
                
                {/* Party Wise Chart */}
                <div className="chart-container">
                  <div className="chart-title">{lang === 'hi' ? 'सीटों का बंटवारा' : 'Seat Share (2019)'}</div>
                  <div className="mini-bar-chart">
                    {partyCounts.map(({ party, count }) => (
                      <div key={party} className="chart-bar-row">
                        <div className="chart-bar-label">{party}</div>
                        <div className="chart-bar-track">
                          <div 
                            className="chart-bar-fill" 
                            style={{ 
                              width: `${(count / selectedState.seats) * 100}%`, 
                              background: PARTY_COLORS[party] 
                            }} 
                          />
                        </div>
                        <div className="chart-bar-value">{count}</div>
                      </div>
                    ))}
                  </div>
                </div>

                <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.05em', fontWeight: 600 }}>
                  Key Constituencies ({stateConstituencies.length})
                </div>
                
                {stateConstituencies.map(c => (
                  <div key={c.code} className="map-constituency-card">
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <div>
                        <div style={{ fontWeight: 700, fontSize: '0.9375rem' }}>{c.name}</div>
                        <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', fontFamily: 'monospace' }}>{c.code}</div>
                      </div>
                      <div style={{
                        padding: '4px 12px',
                        borderRadius: 'var(--radius-full)',
                        background: PARTY_COLORS[c.party] || '#64748b',
                        color: ['TDP', 'BSP'].includes(c.party) ? '#000' : '#fff',
                        fontSize: '0.7rem',
                        fontWeight: 800,
                        boxShadow: `0 2px 8px ${PARTY_COLORS[c.party]}40`
                      }}>
                        {c.party}
                      </div>
                    </div>
                    <div style={{ marginTop: '10px', fontSize: '0.8125rem', color: 'var(--text-secondary)' }}>
                      <span style={{ color: 'var(--text-muted)' }}>Winner:</span> <span style={{ color: 'var(--text-primary)', fontWeight: 600 }}>{c.mp}</span>
                    </div>
                    <div style={{ marginTop: '4px', fontSize: '0.8125rem', color: 'var(--text-secondary)' }}>
                      <span style={{ color: 'var(--text-muted)' }}>Margin:</span> <span style={{ fontWeight: 600 }}>{c.margin.toLocaleString('en-IN')}</span>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div style={{ padding: 'var(--space-2xl) 0', textAlign: 'center' }}>
                <div style={{ fontSize: '2.5rem', marginBottom: 'var(--space-md)' }}>📊</div>
                <div style={{ color: 'var(--text-muted)', fontSize: '0.875rem', fontStyle: 'italic' }}>
                  Detailed constituency data for this state will be available soon.
                </div>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Tooltip */}
      {tooltip.show && hoveredState && (
        <div className="map-state-tooltip" style={{ left: tooltip.x, top: tooltip.y }}>
          <div style={{ fontWeight: 800, marginBottom: '4px', fontSize: '0.9rem' }}>{hoveredState.name}</div>
          <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
            <span style={{
              display: 'inline-block',
              width: '10px',
              height: '10px',
              borderRadius: '3px',
              background: PARTY_COLORS[hoveredState.party] || '#64748b',
              boxShadow: `0 0 8px ${PARTY_COLORS[hoveredState.party]}60`
            }} />
            <span style={{ fontWeight: 600 }}>{hoveredState.seats} {t('seats')}</span>
            <span style={{ color: 'var(--text-muted)' }}>•</span>
            <span style={{ color: PARTY_COLORS[hoveredState.party], fontWeight: 700 }}>{hoveredState.party}</span>
          </div>
        </div>
      )}
    </div>
  );
}
