import FadeInUp from '../FadeInUp';
import Card3D from '../Card3D';
import { content } from '../../data/content';

const statusConfig = {
  live:     { color: '#22c55e', bg: 'rgba(34,197,94,0.1)',  border: 'rgba(34,197,94,0.35)',  label: '● LIVE' },
  learning: { color: '#60a5fa', bg: 'rgba(96,165,250,0.1)', border: 'rgba(96,165,250,0.35)', label: '◎ IN PROGRESS' },
  idea:     { color: '#a855f7', bg: 'rgba(168,85,247,0.1)', border: 'rgba(168,85,247,0.35)', label: '◈ CONCEPT' },
};

export default function Projects() {
  return (
    <section id="projects" className="section section-alt">
      <div className="container">
        <FadeInUp>
          <div className="section-label">05 / PROJECTS</div>
          <h2 className="section-title">Built With AI &amp; Vibes</h2>
          <p style={{
            color: 'var(--text-muted)', fontFamily: "'JetBrains Mono', monospace",
            fontSize: 13, marginTop: 10, marginBottom: 56,
          }}>
            I don't learn to code — I vibe code with AI agents to bring ideas to life
          </p>
        </FadeInUp>

        <div className="projects-grid">
          {content.projects.map((project, i) => {
            const status = statusConfig[project.status] || statusConfig.idea;
            const CardWrapper = ({ children }) =>
              project.link ? (
                <a href={project.link} target="_blank" rel="noopener noreferrer"
                  style={{ textDecoration: 'none', display: 'block', height: '100%' }}
                  data-hover>
                  {children}
                </a>
              ) : <>{children}</>;

            return (
              <FadeInUp key={i} delay={i * 140}>
                <CardWrapper>
                  <Card3D style={{
                    padding: 32, height: '100%',
                    display: 'flex', flexDirection: 'column',
                    cursor: project.link ? 'pointer' : 'default',
                  }}>
                    {/* Glow accent top */}
                    <div style={{
                      position: 'absolute', top: 0, left: 0, right: 0, height: 2,
                      background: `linear-gradient(90deg, transparent, ${status.color}, transparent)`,
                      opacity: 0.7, borderRadius: '16px 16px 0 0',
                    }} />

                    {/* Top row */}
                    <div style={{
                      display: 'flex', justifyContent: 'space-between',
                      alignItems: 'flex-start', marginBottom: 20,
                    }}>
                      <span style={{ fontSize: 38 }}>{project.emoji}</span>
                      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: 8 }}>
                        <span style={{
                          fontSize: 10, fontFamily: "'JetBrains Mono', monospace",
                          padding: '4px 10px', borderRadius: 4,
                          background: status.bg, color: status.color,
                          border: `1px solid ${status.border}`,
                          fontWeight: 600, letterSpacing: '0.05em',
                        }}>
                          {status.label}
                        </span>
                        {project.link && (
                          <span style={{
                            fontSize: 10, fontFamily: "'JetBrains Mono', monospace",
                            color: 'var(--amber)', opacity: 0.7, letterSpacing: '0.08em',
                          }}>
                            ↗ VIEW LIVE
                          </span>
                        )}
                      </div>
                    </div>

                    <h3 style={{
                      fontFamily: "'Syne', sans-serif", fontWeight: 700,
                      fontSize: 19, color: 'var(--text)', marginBottom: 12,
                      lineHeight: 1.3,
                    }}>
                      {project.title}
                    </h3>

                    <p style={{
                      color: 'var(--text-dim)', fontSize: 14,
                      lineHeight: 1.75, flex: 1, marginBottom: 24,
                    }}>
                      {project.desc}
                    </p>

                    {/* Divider */}
                    <div style={{ height: 1, background: 'var(--amber-dim)', marginBottom: 16 }} />

                    {/* Stack tags */}
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
                      {project.stack.map((t, j) => (
                        <span key={j} className="tag" style={{ fontSize: 11 }}>{t}</span>
                      ))}
                    </div>
                  </Card3D>
                </CardWrapper>
              </FadeInUp>
            );
          })}
        </div>

        {/* Vibe coding tagline */}
        <FadeInUp delay={500}>
          <div style={{
            marginTop: 48, textAlign: 'center',
            padding: '20px 32px',
            border: '1px solid var(--amber-dim)',
            borderRadius: 12,
            background: 'rgba(255,165,0,0.02)',
            display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 12,
          }}>
            <span style={{ fontSize: 20 }}>🤖</span>
            <span style={{
              fontFamily: "'JetBrains Mono', monospace", fontSize: 12,
              color: 'var(--text-muted)', letterSpacing: '0.08em',
            }}>
              All projects built using <span style={{ color: 'var(--amber)' }}>AI tools &amp; agents</span> — idea to deployment
            </span>
          </div>
        </FadeInUp>
      </div>
    </section>
  );
}
