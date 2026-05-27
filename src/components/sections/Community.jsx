import FadeInUp from '../FadeInUp';
import { content } from '../../data/content';

export default function Community() {
  return (
    <section id="community" className="section">
      <div className="container">
        <FadeInUp>
          <div className="section-label">06 / COMMUNITY</div>
          <h2 className="section-title">The Local Tech Guy</h2>
          <p style={{
            color: 'var(--text-dim)', lineHeight: 1.75, maxWidth: 520,
            marginTop: 14, marginBottom: 52, fontSize: 15,
          }}>
            Outside of work, I'm the person friends and neighbors come to when
            they need help navigating the digital world.
          </p>
        </FadeInUp>

        <div className="community-grid">
          {content.community.map((item, i) => (
            <FadeInUp key={i} delay={i * 80}>
              <div className="community-item">
                <div className="community-icon">{item.icon}</div>
                <div>
                  <div style={{
                    fontFamily: "'Syne', sans-serif", fontWeight: 700,
                    fontSize: 16, color: 'var(--text)', marginBottom: 6,
                  }}>
                    {item.label}
                  </div>
                  <div style={{
                    color: 'var(--text-muted)', fontSize: 13, lineHeight: 1.65,
                  }}>
                    {item.desc}
                  </div>
                </div>
              </div>
            </FadeInUp>
          ))}
        </div>
      </div>
    </section>
  );
}
