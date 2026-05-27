import FadeInUp from '../FadeInUp';
import Card3D from '../Card3D';
import { content } from '../../data/content';

export default function Experience() {
  const { experience: exp } = content;

  return (
    <section id="experience" className="section section-alt">
      <div className="container">
        <FadeInUp>
          <div className="section-label">03 / EXPERIENCE</div>
          <h2 className="section-title" style={{ marginBottom: 64 }}>Work History</h2>
        </FadeInUp>

        <div className="exp-timeline">
          {/* Timeline spine */}
          <div className="exp-line-col">
            <div className="exp-dot" />
            <div className="exp-line" />
          </div>

          {/* Experience Card */}
          <FadeInUp delay={100} style={{ flex: 1, paddingBottom: 60 }}>
            <Card3D style={{ padding: 44 }}>

              {/* Top accent line */}
              <div style={{
                position: 'absolute', top: 0, left: 0, right: 0, height: 2,
                background: 'linear-gradient(90deg, var(--amber), transparent)',
                borderRadius: '16px 16px 0 0',
              }} />

              {/* Header row */}
              <div style={{
                display: 'flex', justifyContent: 'space-between',
                alignItems: 'flex-start', flexWrap: 'wrap', gap: 14,
                marginBottom: 8,
              }}>
                <div>
                  <h3 style={{
                    fontFamily: "'Syne', sans-serif", fontWeight: 700,
                    fontSize: 26, color: 'var(--text)',
                  }}>
                    {exp.role}
                  </h3>
                  <p style={{
                    color: 'var(--amber)', fontSize: 14, marginTop: 6,
                    fontFamily: "'JetBrains Mono', monospace",
                  }}>
                    {exp.company} · {exp.location}
                  </p>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: 8 }}>
                  <span style={{
                    fontFamily: "'JetBrains Mono', monospace", fontSize: 12,
                    color: 'var(--text-muted)', padding: '7px 16px',
                    border: '1px solid var(--amber-dim)', borderRadius: 6,
                    whiteSpace: 'nowrap',
                  }}>
                    {exp.period}
                  </span>
                  <span style={{
                    fontFamily: "'JetBrains Mono', monospace", fontSize: 11,
                    color: 'var(--amber)', padding: '4px 12px',
                    background: 'rgba(255,165,0,0.08)',
                    border: '1px solid rgba(255,165,0,0.25)', borderRadius: 6,
                    whiteSpace: 'nowrap',
                  }}>
                    {exp.years}
                  </span>
                </div>
              </div>

              <p style={{
                color: 'var(--text-dim)', lineHeight: 1.75,
                marginBottom: 28, fontSize: 15, marginTop: 16,
              }}>
                {exp.desc}
              </p>

              {/* Bullet highlights */}
              <div style={{
                marginBottom: 28,
                padding: '20px 24px',
                background: 'rgba(255,165,0,0.03)',
                borderRadius: 10,
                border: '1px solid var(--amber-dim)',
              }}>
                <div style={{
                  fontFamily: "'JetBrains Mono', monospace",
                  fontSize: 10, color: 'var(--amber)', letterSpacing: '0.2em',
                  marginBottom: 14,
                }}>
                  KEY RESPONSIBILITIES
                </div>
                <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 10 }}>
                  {exp.highlights.map((h, i) => (
                    <li key={i} style={{
                      display: 'flex', gap: 12, alignItems: 'flex-start',
                      color: 'var(--text-dim)', fontSize: 14, lineHeight: 1.6,
                    }}>
                      <span style={{
                        color: 'var(--amber)', fontSize: 16, flexShrink: 0, marginTop: 1,
                      }}>›</span>
                      {h}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Stats chips */}
              <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
                {exp.stats.map((s, i) => (
                  <div key={i} style={{
                    padding: '9px 20px', borderRadius: 8,
                    background: 'rgba(255,165,0,0.08)',
                    border: '1px solid rgba(255,165,0,0.3)',
                    fontFamily: "'JetBrains Mono', monospace",
                    fontSize: 13, color: 'var(--amber)',
                    transition: 'all 0.2s',
                  }}
                    onMouseEnter={e => {
                      e.currentTarget.style.background = 'rgba(255,165,0,0.15)';
                      e.currentTarget.style.boxShadow = '0 0 16px rgba(255,165,0,0.2)';
                    }}
                    onMouseLeave={e => {
                      e.currentTarget.style.background = 'rgba(255,165,0,0.08)';
                      e.currentTarget.style.boxShadow = 'none';
                    }}
                  >
                    {s}
                  </div>
                ))}
              </div>
            </Card3D>
          </FadeInUp>
        </div>

        {/* Currently employed badge */}
        <FadeInUp delay={200}>
          <div style={{
            display: 'flex', alignItems: 'center', gap: 10,
            marginLeft: 54, marginTop: -20,
          }}>
            <div style={{
              width: 8, height: 8, borderRadius: '50%',
              background: '#22c55e',
              boxShadow: '0 0 12px rgba(34,197,94,0.5)',
              animation: 'pulse-dot 2s ease infinite',
            }} />
            <span style={{
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: 11, color: '#22c55e', letterSpacing: '0.1em',
            }}>
              CURRENTLY EMPLOYED · JULY 2019 – PRESENT
            </span>
          </div>
        </FadeInUp>
      </div>
    </section>
  );
}
