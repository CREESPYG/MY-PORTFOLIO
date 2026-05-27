import { useEffect, useRef, useCallback } from 'react';
import { animate, stagger } from 'animejs';
import HeroCanvas from '../HeroCanvas';
import { content } from '../../data/content';
import { useTheme } from '../ThemeContext';

const effects = ['flip', 'wave', 'elastic', 'glide', 'bounce'];

export default function Hero() {
  const nameRef = useRef(null);
  const spanRef = useRef(null);
  const effectIndex = useRef(0);
  const { theme } = useTheme();

  const runEffect = useCallback((effect) => {
    const el = spanRef.current;
    if (!el) return;
    const letters = el.querySelectorAll('.hero-char');
    if (!letters.length) return;

    const base = {
      targets: letters,
      duration: 800,
    };

    switch (effect) {
      case 'flip':
        animate({
          ...base,
          rotateY: [180, 0],
          delay: stagger(50),
          easing: 'easeOutBack',
        });
        break;
      case 'wave':
        animate({
          ...base,
          translateY: [
            { value: -20, duration: 400 },
            { value: 0, duration: 400 },
          ],
          delay: stagger(60),
          easing: 'easeInOutSine',
        });
        break;
      case 'elastic':
        animate({
          ...base,
          scaleX: [1, 1.8, 1],
          scaleY: [1, 0.6, 1],
          delay: stagger(40),
          easing: 'easeOutElastic(1, .5)',
        });
        break;
      case 'glide':
        animate({
          ...base,
          translateX: [
            { value: (_, i) => (i % 2 === 0 ? -50 : 50), duration: 350 },
            { value: 0, duration: 450 },
          ],
          opacity: [
            { value: 0.2, duration: 150 },
            { value: 1, duration: 650 },
          ],
          delay: stagger(30),
          easing: 'easeOutCubic',
        });
        break;
      case 'bounce':
        animate({
          ...base,
          translateY: [
            { value: (_, i) => -(40 + Math.random() * 40), duration: 450 },
            { value: 0, duration: 350 },
          ],
          rotate: [
            { value: (_, i) => (i % 2 === 0 ? 20 : -20), duration: 300 },
            { value: 0, duration: 500 },
          ],
          delay: stagger(40),
          easing: 'easeOutBounce',
        });
        break;
    }
  }, []);

  const handleNameClick = useCallback((e) => {
    e.stopPropagation();
    effectIndex.current = (effectIndex.current + 1) % effects.length;
    runEffect(effects[effectIndex.current]);
  }, [runEffect]);

  useEffect(() => {
    if (nameRef.current && !spanRef.current) {
      const chars = content.name.split('').map((ch) =>
        `<span class="hero-char" style="display:inline-block;white-space:pre">${ch === ' ' ? '\u00A0' : ch}</span>`
      ).join('');
      nameRef.current.innerHTML = chars;
      spanRef.current = nameRef.current;
    }
  }, []);

  useEffect(() => {
    if (spanRef.current && effectIndex.current > 0) {
      runEffect(effects[effectIndex.current]);
    }
  }, [theme.id, runEffect]);

  const eyebrowRef = useRef(null);
  const taglineRef = useRef(null);
  const actionsRef = useRef(null);
  const scrollRef = useRef(null);

  useEffect(() => {
    const els = [
      { el: eyebrowRef.current, delay: 250 },
      { el: taglineRef.current, delay: 750 },
      { el: actionsRef.current, delay: 1000 },
      { el: scrollRef.current, delay: 1400 },
    ];

    els.forEach(({ el, delay }) => {
      if (!el) return;
      setTimeout(() => {
        el.style.opacity = '1';
        el.style.transform = 'translateY(0)';
        el.style.transition = 'opacity 0.8s cubic-bezier(0.16,1,0.3,1), transform 0.8s cubic-bezier(0.16,1,0.3,1)';
      }, delay);
    });
  }, []);

  const scrollTo = (id) =>
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });

  return (
    <section id="hero" className="hero-section">
      <div className="hero-canvas">
        <HeroCanvas />
      </div>

      <div style={{
        position: 'absolute', inset: 0, zIndex: 1,
        background: 'radial-gradient(ellipse 70% 60% at 50% 45%, rgba(255,140,0,0.1) 0%, transparent 70%)',
        pointerEvents: 'none',
      }} />

      <div className="hero-content" style={{ zIndex: 10 }}>
        <div
          ref={eyebrowRef}
          className="hero-eyebrow"
          style={{ transform: 'translateY(20px)' }}
        >
          PORTFOLIO · 2026 · CHAT SUPPORT & TECH
        </div>

        <div style={{
          position: 'relative', width: '100%',
          display: 'flex', justifyContent: 'center',
        }}>
          <h1
            ref={nameRef}
            className="hero-name"
            onClick={handleNameClick}
            style={{ transform: 'translateY(30px)', cursor: 'pointer' }}
          >
            {content.name}
          </h1>
        </div>

        <p
          ref={taglineRef}
          className="hero-tagline"
          style={{ transform: 'translateY(20px)' }}
        >
          {content.tagline}
        </p>

        <div
          ref={actionsRef}
          className="hero-actions"
          style={{ transform: 'translateY(20px)' }}
        >
          <button
            className="btn-primary"
            onClick={() => scrollTo('experience')}
            data-hover
          >
            Explore My Work ↓
          </button>
          <button
            className="btn-outline"
            onClick={() => scrollTo('contact')}
            data-hover
          >
            Say Hello →
          </button>
        </div>
      </div>

      <div
        ref={scrollRef}
        className="hero-scroll-indicator"
        style={{ transform: 'translateY(10px)' }}
      >
        <span>SCROLL</span>
        <div className="scroll-line" />
      </div>

      <div style={{
        position: 'absolute', bottom: 0, left: 0, right: 0, height: 200,
        background: 'linear-gradient(to bottom, transparent, var(--bg))',
        zIndex: 5, pointerEvents: 'none',
      }} />
    </section>
  );
}
