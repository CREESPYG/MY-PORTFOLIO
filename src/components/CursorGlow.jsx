import { useEffect, useRef, useState } from 'react';

export default function CursorGlow() {
  const dotRef = useRef(null);
  const ringRef = useRef(null);
  const [pos, setPos] = useState({ x: -100, y: -100 });
  const ringPos = useRef({ x: -100, y: -100 });
  const rafRef = useRef(null);

  useEffect(() => {
    const move = (e) => {
      setPos({ x: e.clientX, y: e.clientY });
    };

    const animateRing = () => {
      ringPos.current.x += (pos.x - ringPos.current.x) * 0.12;
      ringPos.current.y += (pos.y - ringPos.current.y) * 0.12;
      if (ringRef.current) {
        ringRef.current.style.left = ringPos.current.x + 'px';
        ringRef.current.style.top = ringPos.current.y + 'px';
      }
      rafRef.current = requestAnimationFrame(animateRing);
    };

    document.addEventListener('mousemove', move);
    rafRef.current = requestAnimationFrame(animateRing);

    return () => {
      document.removeEventListener('mousemove', move);
      cancelAnimationFrame(rafRef.current);
    };
  }, [pos.x, pos.y]);

  return (
    <>
      <div
        ref={dotRef}
        className="cursor-dot"
        style={{ left: pos.x, top: pos.y }}
      />
      <div ref={ringRef} className="cursor-ring" />
    </>
  );
}
