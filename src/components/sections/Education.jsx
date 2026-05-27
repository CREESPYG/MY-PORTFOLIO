import FadeInUp from '../FadeInUp';
import Card3D from '../Card3D';
import { content } from '../../data/content';

export default function Education() {
  return (
    <section id="education" className="section section-alt">
      <div className="container">
        <FadeInUp>
          <div className="section-label">07 / EDUCATION</div>
          <h2 className="section-title" style={{ marginBottom: 72 }}>Learning Path</h2>
        </FadeInUp>

        <div style={{ position: 'relative' }}>
          {/* Timeline line base */}
          <div className="edu-timeline-line" />
          
          {/* Scrolling laser light on the timeline */}
          <div className="edu-laser-line" />

          {/* Grid of education items */}
          <div className="edu-grid">
            {content.education.map((item, i) => (
              <FadeInUp key={i} delay={i * 130}>
                <div className="edu-item">
                  <div className="edu-node" />
                  <Card3D style={{ padding: '24px 20px', background: 'rgba(255,255,255,0.01)', border: '1px solid var(--amber-dim)' }}>
                    <div className="edu-year">{item.year}</div>
                    <div className="edu-title">{item.title}</div>
                    <div className="edu-org">{item.org}</div>
                  </Card3D>
                </div>
              </FadeInUp>
            ))}
          </div>
        </div>

        {/* Currently learning note */}
        <FadeInUp delay={400}>
          <div style={{
            marginTop: 64, padding: '20px 28px',
            borderRadius: 12, border: '1px solid var(--amber-dim)',
            background: 'rgba(255,165,0,0.03)',
            display: 'flex', alignItems: 'center', gap: 14,
          }}>
            <span style={{ fontSize: 22 }}>🚀</span>
            <div>
              <div style={{
                fontFamily: "'Syne', sans-serif", fontWeight: 600,
                fontSize: 14, color: 'var(--text)', marginBottom: 4,
              }}>
                Currently Self-Learning
              </div>
              <div style={{
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: 12, color: 'var(--text-muted)',
              }}>
                React · JavaScript · AI Tools · Web Development · 2026 → Present
              </div>
            </div>
          </div>
        </FadeInUp>
      </div>
    </section>
  );
}
