import FadeInUp from '../FadeInUp';
import Card3D from '../Card3D';
import { content } from '../../data/content';

export default function Contact() {
  return (
    <section id="contact" className="section">
      <div className="container">
        <FadeInUp>
          <div className="section-label">08 / CONTACT</div>
          <h2 className="section-title">Let's Connect</h2>
          <p style={{
            color: 'var(--text-dim)', marginTop: 14, marginBottom: 56,
            fontSize: 15,
          }}>
            Whether it's work, a project, or just help — I'm reachable.
          </p>
        </FadeInUp>

        {/* Contact Cards - Grid */}
        <div style={{
          display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
          gap: 24, marginBottom: 48
        }}>
          {/* LinkedIn Profile Preview Card */}
          <FadeInUp delay={100}>
            <a href={content.contact.linkedin} target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'none' }} data-hover>
              <Card3D style={{ overflow: 'hidden', padding: 0, height: '100%', display: 'flex', flexDirection: 'column' }}>
                {/* Cover Photo */}
                <div style={{
                  height: 120,
                  backgroundImage: 'url(/linkedin_cover.png)',
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                  borderBottom: '1px solid var(--amber-dim)',
                  position: 'relative'
                }}>
                  {/* Profile Picture */}
                  <div style={{
                    position: 'absolute', bottom: -40, left: 24,
                    width: 80, height: 80, borderRadius: '50%',
                    background: 'var(--bg)', border: '4px solid var(--bg)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    boxShadow: '0 8px 24px rgba(0,0,0,0.5)', overflow: 'hidden'
                  }}>
                    <img src="/linkedin_profile.png" alt="Profile" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                  </div>
                  {/* LinkedIn Icon Badge */}
                  <div style={{
                    position: 'absolute', top: 16, right: 16,
                    background: '#0a66c2', color: '#fff',
                    padding: '4px 10px', borderRadius: 4,
                    fontFamily: "'Inter', sans-serif", fontWeight: 700, fontSize: 12,
                    display: 'flex', alignItems: 'center', gap: 6,
                    boxShadow: '0 4px 12px rgba(10,102,194,0.3)'
                  }}>
                    <span style={{ fontSize: 14 }}>in</span>
                    <span>LinkedIn</span>
                  </div>
                </div>
                
                {/* Profile Details */}
                <div style={{ padding: '52px 24px 24px 24px', flex: 1, display: 'flex', flexDirection: 'column' }}>
                  <h3 style={{ fontFamily: "'Syne', sans-serif", fontSize: 22, color: 'var(--text)', marginBottom: 6, fontWeight: 700 }}>
                    {content.name}
                  </h3>
                  <p style={{ color: 'var(--text-dim)', fontSize: 13, lineHeight: 1.5, marginBottom: 20 }}>
                    {content.tagline}
                  </p>
                  <div style={{
                    display: 'flex', gap: 16, color: 'var(--text-muted)',
                    fontSize: 11, fontFamily: "'JetBrains Mono', monospace",
                    marginTop: 'auto', paddingTop: 16, borderTop: '1px solid var(--amber-deep)'
                  }}>
                    <span>📍 {content.contact.location}</span>
                    <span style={{ color: '#0a66c2' }}>🔗 View Profile ↗</span>
                  </div>
                </div>
              </Card3D>
            </a>
          </FadeInUp>

          {/* Email Card */}
          <FadeInUp delay={200}>
            <a href={`mailto:${content.contact.email}`} style={{ textDecoration: 'none' }} data-hover>
              <Card3D style={{
                padding: '40px 32px', height: '100%',
                display: 'flex', flexDirection: 'column',
                justifyContent: 'center', alignItems: 'center', textAlign: 'center'
              }}>
                <div style={{ fontSize: 48, marginBottom: 24, filter: 'drop-shadow(0 0 16px var(--amber-glow))' }}>
                  ✉️
                </div>
                <div style={{
                  fontFamily: "'JetBrains Mono', monospace", fontSize: 11,
                  color: 'var(--amber)', letterSpacing: '0.15em', marginBottom: 12
                }}>
                  SEND AN EMAIL
                </div>
                <div style={{ color: 'var(--text)', fontSize: 16, fontWeight: 500, letterSpacing: '0.02em' }}>
                  {content.contact.email}
                </div>
              </Card3D>
            </a>
          </FadeInUp>
        </div>

        {/* CTA */}
        <FadeInUp delay={350}>
          <div style={{
            marginTop: 24, textAlign: 'center',
            padding: '48px 32px',
            border: '1px solid var(--amber-dim)',
            borderRadius: 16,
            background: 'rgba(255,165,0,0.02)',
            position: 'relative', overflow: 'hidden',
          }}>
            {/* Background glow */}
            <div style={{
              position: 'absolute', inset: 0,
              background: 'radial-gradient(ellipse 60% 80% at 50% 100%, rgba(255,165,0,0.06), transparent)',
              pointerEvents: 'none',
            }} />

            <div style={{
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: 11, color: 'var(--amber)', letterSpacing: '0.3em',
              marginBottom: 16,
            }}>
              OPEN TO OPPORTUNITIES
            </div>
            <h3 style={{
              fontFamily: "'Syne', sans-serif", fontWeight: 800,
              fontSize: 'clamp(24px, 4vw, 36px)', color: 'var(--text)',
              marginBottom: 16, letterSpacing: '-0.02em',
            }}>
              Ready to Work Together?
            </h3>
            <p style={{
              color: 'var(--text-dim)', fontSize: 15, marginBottom: 32,
              maxWidth: 440, margin: '0 auto 32px', lineHeight: 1.6
            }}>
              I bring 6+ years of customer experience, genuine curiosity, and a
              strong work ethic to every role.
            </p>
            <a href={`mailto:${content.contact.email}`} data-hover>
              <button className="btn-primary">Send Me a Message ↗</button>
            </a>
          </div>
        </FadeInUp>
      </div>
    </section>
  );
}
