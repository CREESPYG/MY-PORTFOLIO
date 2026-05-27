import FadeInUp from '../FadeInUp';
import Card3D from '../Card3D';
import { content } from '../../data/content';

export default function About() {
  return (
    <section id="about" className="section">
      <div className="container">
        <FadeInUp>
          <div className="section-label">02 / ABOUT</div>
          <h2 className="section-title" style={{ marginBottom: 56 }}>Who I Am</h2>
        </FadeInUp>

        <div className="about-grid" style={{ marginBottom: 40 }}>
          {/* Bio Card */}
          <FadeInUp delay={100}>
            <Card3D style={{ padding: 40, height: '100%' }}>
              <div style={{
                fontSize: 11, fontFamily: "'JetBrains Mono', monospace",
                color: 'var(--amber)', marginBottom: 18, letterSpacing: '0.15em',
              }}>
                BIO
              </div>
              <p style={{ fontSize: 16, lineHeight: 1.8, color: 'var(--text-dim)' }}>
                {content.bio}
              </p>

              {/* Stats row */}
              <div style={{
                display: 'flex', gap: 16, flexWrap: 'wrap',
                marginTop: 28, paddingTop: 24,
                borderTop: '1px solid var(--amber-dim)',
              }}>
                {[['6+', 'Years Exp.'], ['150+', 'Daily Chats'], ['75%+', 'Retention']].map(([val, label]) => (
                  <div key={label} style={{ textAlign: 'center' }}>
                    <div style={{
                      fontFamily: "'Syne', sans-serif", fontWeight: 800,
                      fontSize: 24, color: 'var(--amber)',
                    }}>{val}</div>
                    <div style={{
                      fontFamily: "'JetBrains Mono', monospace",
                      fontSize: 10, color: 'var(--text-muted)', letterSpacing: '0.1em',
                    }}>{label}</div>
                  </div>
                ))}
              </div>
            </Card3D>
          </FadeInUp>

          {/* Vision Card */}
          <FadeInUp delay={200}>
            <Card3D style={{
              padding: 40, height: '100%',
              background: 'rgba(255,165,0,0.04)',
              borderColor: 'rgba(255,165,0,0.2)',
            }}>
              <div style={{
                fontSize: 11, fontFamily: "'JetBrains Mono', monospace",
                color: 'var(--amber)', marginBottom: 18, letterSpacing: '0.15em',
              }}>
                VISION
              </div>
              <p style={{ fontSize: 16, lineHeight: 1.8, color: 'var(--text-dim)' }}>
                {content.vision}
              </p>

              {/* Decorative element */}
              <div style={{
                marginTop: 28, paddingTop: 20,
                borderTop: '1px solid var(--amber-dim)',
                display: 'flex', alignItems: 'center', gap: 10,
              }}>
                <div style={{
                  width: 6, height: 6, borderRadius: '50%',
                  background: 'var(--amber)',
                  boxShadow: '0 0 10px var(--amber-glow)',
                  animation: 'pulse-dot 2s ease infinite',
                }} />
                <span style={{
                  fontSize: 12, color: 'var(--text-muted)',
                  fontFamily: "'JetBrains Mono', monospace",
                }}>
                  Building toward this · One day at a time
                </span>
              </div>
            </Card3D>
          </FadeInUp>
        </div>

        {/* Community mini-chips */}
        <FadeInUp delay={300}>
          <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
            {content.community.slice(0, 5).map((c, i) => (
              <div key={i} className="about-stat">
                <span style={{ fontSize: 18 }}>{c.icon}</span>
                <span>{c.label}</span>
              </div>
            ))}
          </div>
        </FadeInUp>
      </div>
    </section>
  );
}
