import { useEffect, useRef, useState } from 'react';

// ── Scroll 3D Section Wrapper ────────────────────────────────
// Wraps sections with scroll-driven 3D parallax + reveal
export default function ScrollReveal3D({
  children,
  depth = 60,       // how far the element comes from in Z
  tiltX = 6,        // max X tilt degrees
  delay = 0,
  style = {},
  className = '',
}) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    // Intersection for reveal
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setVisible(true);
      },
      { threshold: 0.08 }
    );
    obs.observe(el);

    // Scroll for parallax
    const onScroll = () => {
      const rect = el.getBoundingClientRect();
      const winH = window.innerHeight;
      // progress: 0 = element at bottom of viewport, 1 = element at top
      const p = Math.max(0, Math.min(1, 1 - rect.top / winH));
      setProgress(p);
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();

    return () => {
      obs.disconnect();
      window.removeEventListener('scroll', onScroll);
    };
  }, []);

  // Parallax Y offset (slower than scroll = depth illusion)
  const parallaxY = visible ? (progress - 0.5) * -18 : 0;
  const rotX = visible ? (progress - 0.6) * tiltX : 0;

  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible
          ? `perspective(1200px) rotateX(${rotX}deg) translateY(${parallaxY}px) translateZ(0)`
          : `perspective(1200px) rotateX(${tiltX * 1.5}deg) translateY(${depth}px) translateZ(-${depth}px)`,
        transition: `opacity 0.85s ease ${delay}ms, transform 0.85s cubic-bezier(0.16, 1, 0.3, 1) ${delay}ms`,
        transformStyle: 'preserve-3d',
        willChange: 'transform, opacity',
        ...style,
      }}
    >
      {children}
    </div>
  );
}
