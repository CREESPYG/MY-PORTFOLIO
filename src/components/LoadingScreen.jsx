import { useEffect, useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTheme } from './ThemeContext';
import { playLoadingSound } from '../utils/audio';

function AmberEmbers() {
  const embers = useMemo(() =>
    Array.from({ length: 40 }).map(() => ({
      left: Math.random() * 100 + '%',
      delay: Math.random() * 5 + 's',
      duration: 3 + Math.random() * 4 + 's',
      size: 2 + Math.random() * 5 + 'px',
      drift: (Math.random() - 0.5) * 120 + 'px',
    })), []);
  return (
    <div style={{ position: 'absolute', inset: 0, overflow: 'hidden', pointerEvents: 'none' }}>
      {embers.map((d, i) => (
        <div key={i} className="loading-ember" style={{
          left: d.left, animationDelay: d.delay,
          animationDuration: d.duration, width: d.size, height: d.size,
          '--drift': d.drift,
        }} />
      ))}
    </div>
  );
}

function RainDrops() {
  const drops = useMemo(() =>
    Array.from({ length: 60 }).map(() => ({
      left: Math.random() * 100 + '%',
      delay: Math.random() * 4 + 's',
      duration: 1.2 + Math.random() * 1.8 + 's',
      height: 12 + Math.random() * 24 + 'px',
    })), []);
  return (
    <div className="loading-rain-container">
      <div className="loading-rain-bg" />
      {drops.map((d, i) => (
        <div key={i} className="loading-rain-drop" style={{
          left: d.left, animationDelay: d.delay,
          animationDuration: d.duration, height: d.height,
        }} />
      ))}
    </div>
  );
}

function PixelAssembler() {
  const gridSize = 12;
  const cells = useMemo(() => {
    const arr = [];
    for (let row = 0; row < gridSize; row++) {
      for (let col = 0; col < gridSize; col++) {
        arr.push({
          row, col,
          delay: ((row * gridSize + col) / (gridSize * gridSize)) * 2.5 + Math.random() * 0.3 + 's',
          flicker: Math.random() * 2 + 's',
        });
      }
    }
    return arr;
  }, []);
  return (
    <div className="loading-pixel-container">
      <div className="loading-pixel-grid" style={{
        gridTemplateColumns: `repeat(${gridSize}, 1fr)`,
      }}>
        {cells.map((c, i) => (
          <div key={i} className="loading-pixel-cell" style={{
            animationDelay: c.delay, '--flicker': c.flicker,
          }} />
        ))}
      </div>
    </div>
  );
}

function NeonBars() {
  const bars = useMemo(() =>
    Array.from({ length: 12 }).map((_, i) => ({
      bottom: 5 + i * 8 + '%',
      delay: i * 0.1 + 's',
      duration: 1.2 + Math.random() * 1 + 's',
      width: 60 + Math.random() * 40 + '%',
    })), []);
  return (
    <div className="loading-neon-container">
      <div className="loading-neon-sun" />
      <div className="loading-neon-grid" />
      {bars.map((d, i) => (
        <div key={i} className="loading-neon-bar" style={{
          bottom: d.bottom, animationDelay: d.delay,
          animationDuration: d.duration, width: d.width,
        }} />
      ))}
      <div className="loading-neon-palm" />
    </div>
  );
}

export default function LoadingScreen({ onComplete }) {
  const [progress, setProgress] = useState(0);
  const [done, setDone] = useState(false);
  const { theme, loadingTheme } = useTheme();

  const activeThemeId = loadingTheme?.id || theme.id;

  useEffect(() => {
    playLoadingSound(activeThemeId);

    const steps = [
      { target: 30, delay: 100 },
      { target: 60, delay: 300 },
      { target: 85, delay: 200 },
      { target: 100, delay: 400 },
    ];

    let current = 0;
    let total = 0;

    const run = () => {
      if (current >= steps.length) {
        setTimeout(() => {
          setDone(true);
          setTimeout(onComplete, 600);
        }, 300);
        return;
      }
      const step = steps[current];
      total += step.delay;
      setTimeout(() => {
        setProgress(step.target);
        current++;
        run();
      }, total);
      total = 0;
    };

    run();
  }, [onComplete, activeThemeId]);

  const themeEffect =
    activeThemeId === 'pixel' ? <PixelAssembler /> :
    activeThemeId === 'gta' ? <NeonBars /> :
    activeThemeId === 'rain' ? <RainDrops /> :
    <AmberEmbers />;

  return (
    <AnimatePresence>
      {!done && (
        <motion.div
          className="loading-screen"
          exit={{ opacity: 0, scale: 1.04 }}
          transition={{ duration: 0.6, ease: 'easeInOut' }}
        >
          {themeEffect}

          <div style={{
            position: 'absolute', inset: 0,
            backgroundImage: `linear-gradient(rgba(255,165,0,0.04) 1px, transparent 1px),
                              linear-gradient(90deg, rgba(255,165,0,0.04) 1px, transparent 1px)`,
            backgroundSize: '40px 40px',
          }} />

          <motion.div
            className="loading-logo"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            ARIF
          </motion.div>

          <motion.div
            className="loading-text"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
          >
            {activeThemeId === 'pixel' ? 'Loading Pixel World' :
             activeThemeId === 'gta' ? 'Initializing Vice City' :
             activeThemeId === 'rain' ? 'Summoning the Storm' :
             'Initializing Experience'}
          </motion.div>

          <motion.div
            className="loading-bar-track"
            initial={{ opacity: 0, scaleX: 0 }}
            animate={{ opacity: 1, scaleX: 1 }}
            transition={{ delay: 0.3, duration: 0.4 }}
          >
            <div
              className="loading-bar-fill"
              style={{ width: `${progress}%` }}
            />
          </motion.div>

          <motion.div
            style={{
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: 11,
              color: 'rgba(255,165,0,0.5)',
              letterSpacing: '0.2em',
            }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            {progress}%
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
