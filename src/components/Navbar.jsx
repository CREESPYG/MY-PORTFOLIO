import { useEffect, useState } from 'react';
import { useTheme } from './ThemeContext';

const navLinks = ['about', 'experience', 'skills', 'projects', 'community', 'contact'];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('');
  const [themeOpen, setThemeOpen] = useState(false);
  const { theme, setThemeId, themes } = useTheme();

  useEffect(() => {
    const close = () => setThemeOpen(false);
    document.addEventListener('click', close);
    return () => document.removeEventListener('click', close);
  }, []);

  useEffect(() => {
    const scrollHandler = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', scrollHandler);

    const sections = navLinks.map(id => document.getElementById(id));
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { rootMargin: '-30% 0px -60% 0px' }
    );

    sections.forEach(s => s && observer.observe(s));

    return () => {
      window.removeEventListener('scroll', scrollHandler);
      sections.forEach(s => s && observer.unobserve(s));
    };
  }, []);

  const scrollTo = (id) =>
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });

  return (
    <nav className={`navbar ${scrolled ? 'scrolled' : ''}`}>
      <div className="nav-logo" onClick={() => scrollTo('hero')} data-hover>
        ARIF <span className="nav-dot" />
      </div>

      <ul className="nav-links">
        {navLinks.map((l) => (
          <li key={l}>
            <button
              className={`nav-link ${activeSection === l ? 'active' : ''}`}
              onClick={() => scrollTo(l)}
              data-hover
            >
              {l}
            </button>
          </li>
        ))}
      </ul>

      <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
        <div style={{ position: 'relative' }}>
          <button
            className="nav-cta"
            onClick={(e) => { e.stopPropagation(); setThemeOpen(!themeOpen); }}
            data-hover
          >
            Theme ▾
          </button>

          {themeOpen && (
            <div
              onClick={(e) => e.stopPropagation()}
              style={{
                position: 'absolute', top: '100%', right: 0, marginTop: 6,
                background: 'rgba(6, 6, 10, 0.95)',
                backdropFilter: 'blur(16px)',
                border: '1px solid var(--amber-dim)',
                borderRadius: 10, padding: 6, minWidth: 190,
                boxShadow: '0 12px 40px rgba(0,0,0,0.5)',
                zIndex: 999,
              }}
            >
              {Object.values(themes).map((t) => (
                <button
                  key={t.id}
                  onClick={() => { setThemeId(t.id); setThemeOpen(false); }}
                  style={{
                    display: 'flex', alignItems: 'center', gap: 10, width: '100%',
                    background: t.id === theme.id ? `${t.color}15` : 'transparent',
                    border: 'none', padding: '9px 14px', borderRadius: 8,
                    fontFamily: "'JetBrains Mono', monospace", fontSize: 11,
                    color: t.id === theme.id ? t.color : '#888',
                    cursor: 'pointer', textAlign: 'left',
                    transition: 'all 0.15s',
                  }}
                  onMouseEnter={(e) => { e.currentTarget.style.background = `${t.color}10`; e.currentTarget.style.color = t.color; }}
                  onMouseLeave={(e) => { e.currentTarget.style.background = t.id === theme.id ? `${t.color}15` : 'transparent'; e.currentTarget.style.color = t.id === theme.id ? t.color : '#888'; }}
                >
                  <div style={{
                    width: 10, height: 10, borderRadius: '50%',
                    background: t.color, boxShadow: `0 0 6px ${t.color}88`,
                  }} />
                  {t.name}
                </button>
              ))}
            </div>
          )}
        </div>

        <button
          className="nav-cta"
          onClick={() => scrollTo('contact')}
          data-hover
        >
          Contact
        </button>
      </div>
    </nav>
  );
}
