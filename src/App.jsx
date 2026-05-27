import { useState, useCallback, useEffect } from 'react';
import './styles/index.css';

import { ThemeProvider, useTheme } from './components/ThemeContext';
import BackgroundCanvas from './components/BackgroundCanvas';

import EntryScreen   from './components/EntryScreen';
import LoadingScreen from './components/LoadingScreen';
import CursorGlow    from './components/CursorGlow';
import Navbar        from './components/Navbar';

import Hero       from './components/sections/Hero';
import About      from './components/sections/About';
import Experience from './components/sections/Experience';
import Skills     from './components/sections/Skills';
import Projects   from './components/sections/Projects';
import Community  from './components/sections/Community';
import Education  from './components/sections/Education';
import Contact    from './components/sections/Contact';
import { playClickSound } from './utils/audio';

const scrollTo = (id) =>
  document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });

function AppContent() {
  const { theme } = useTheme();

  useEffect(() => {
    const handleClick = (e) => {
      if (e.target.closest('button, a, .card-3d, .nav-link, .tag')) {
        playClickSound(theme.id);
      }
    };
    document.addEventListener('click', handleClick);
    return () => document.removeEventListener('click', handleClick);
  }, [theme.id]);

  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <About />
        <Experience />
        <Skills />
        <Projects />
        <Community />
        <Education />
        <Contact />
      </main>
      <footer className="footer">
        <span className="footer-logo">MD ARIF ANSARI</span>
        <span className="footer-copy">
          Built by learning · Vibe coded with curiosity · 2026
        </span>
        <button
          className="back-to-top"
          onClick={() => scrollTo('hero')}
          data-hover
        >
          ↑ Back to top
        </button>
      </footer>
    </>
  );
}

function AppShell() {
  const { isLoading, finishSwitch, setThemeDirect } = useTheme();
  const [phase, setPhase] = useState('entry'); // 'entry' | 'loading' | 'ready'

  const handleThemeSelect = useCallback((id) => {
    setThemeDirect(id);
    setPhase('loading');
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, [setThemeDirect]);

  const handleFirstLoadComplete = useCallback(() => {
    setPhase('ready');
  }, []);

  const handleSwitchLoadComplete = useCallback(() => {
    finishSwitch();
  }, [finishSwitch]);

  useEffect(() => {
    if (isLoading) window.scrollTo({ top: 0, behavior: 'instant' });
  }, [isLoading]);

  if (phase === 'entry') {
    return <EntryScreen onThemeSelect={handleThemeSelect} />;
  }

  if (phase === 'loading') {
    return (
      <>
        <BackgroundCanvas />
        <CursorGlow />
        <LoadingScreen key="first" onComplete={handleFirstLoadComplete} />
        <div style={{ opacity: 0, pointerEvents: 'none' }}>
          <AppContent />
        </div>
      </>
    );
  }

  if (isLoading) {
    return (
      <>
        <BackgroundCanvas />
        <CursorGlow />
        <LoadingScreen key="switch" onComplete={handleSwitchLoadComplete} />
      </>
    );
  }

  return (
    <>
      <BackgroundCanvas />
      <CursorGlow />
      <AppContent />
    </>
  );
}

export default function App() {
  return (
    <ThemeProvider>
      <AppShell />
    </ThemeProvider>
  );
}
