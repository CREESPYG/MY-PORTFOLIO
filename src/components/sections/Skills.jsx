import FadeInUp from '../FadeInUp';
import Card3D from '../Card3D';
import { content } from '../../data/content';

export default function Skills() {
  return (
    <section id="skills" className="section">
      <div className="container">
        <FadeInUp>
          <div className="section-label">04 / SKILLS</div>
          <h2 className="section-title">What I Know</h2>
          <p style={{
            color: 'var(--text-muted)', fontFamily: "'JetBrains Mono', monospace",
            fontSize: 13, marginTop: 10, marginBottom: 52,
          }}>
            Tools, traits & languages I work with every day
          </p>
        </FadeInUp>

        <div className="skills-grid">
          {content.skills.map((cluster, i) => (
            <FadeInUp key={i} delay={i * 100}>
              <Card3D style={{ padding: 32, height: '100%' }}>
                {/* Cluster header */}
                <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 20 }}>
                  <span style={{ fontSize: 26 }}>{cluster.icon}</span>
                  <div style={{
                    fontFamily: "'JetBrains Mono', monospace",
                    fontSize: 11, color: 'var(--amber)',
                    letterSpacing: '0.18em', textTransform: 'uppercase',
                  }}>
                    {cluster.cluster}
                  </div>
                </div>

                {/* Divider */}
                <div style={{
                  height: 1, background: 'var(--amber-dim)',
                  marginBottom: 20,
                }} />

                {/* Tags */}
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
                  {cluster.tags.map((tag, j) => (
                    <span key={j} className="tag">{tag}</span>
                  ))}
                </div>
              </Card3D>
            </FadeInUp>
          ))}
        </div>
      </div>
    </section>
  );
}
