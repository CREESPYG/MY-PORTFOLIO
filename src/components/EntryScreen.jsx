import { useMemo, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTheme, themes } from './ThemeContext';

const themeList = Object.values(themes);

const greetingWords = "Hi I'm Md Arif Ansari".split(' ');
const welcomeWords = "Hope you are doing well, Welcome to My Portfolio".split(' ');

export default function EntryScreen({ onThemeSelect }) {
  const { theme } = useTheme();
  const [selectedId, setSelectedId] = useState(null);

  const handleSelect = (id) => {
    setSelectedId(id);
    setTimeout(() => onThemeSelect(id), 500);
  };

  return (
    <div className="entry-screen">
      <div className="entry-grid" />

      <motion.div
        className="entry-content"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
      >
        <motion.div className="entry-greeting">
          {greetingWords.map((word, i) => (
            <motion.span
              key={i}
              className="entry-word"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 + i * 0.12, duration: 0.5, ease: 'easeOut' }}
            >
              {word}
            </motion.span>
          ))}
        </motion.div>

        <motion.p
          className="entry-welcome"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9, duration: 0.5 }}
        >
          {welcomeWords.map((word, i) => (
            <motion.span
              key={i}
              className="entry-word-inline"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.9 + i * 0.06, duration: 0.3 }}
            >
              {word}
            </motion.span>
          ))}
        </motion.p>

        <motion.p
          className="entry-prompt"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2.2, duration: 0.6 }}
        >
          Select your theme
        </motion.p>

        <motion.div
          className="entry-themes"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 2.6, duration: 0.6 }}
        >
          {themeList.map((t, i) => (
            <motion.button
              key={t.id}
              className={`entry-theme-card ${selectedId === t.id ? 'selected' : ''}`}
              onClick={() => handleSelect(t.id)}
              style={{
                '--theme-color': t.color,
                '--theme-color-secondary': t.colorSecondary,
              }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 2.8 + i * 0.1, duration: 0.4 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <span className="entry-theme-dot" style={{ background: t.color }} />
              <span className="entry-theme-name">{t.name}</span>
            </motion.button>
          ))}
        </motion.div>
      </motion.div>

      <AnimatePresence>
        {selectedId && (
          <motion.div
            className="entry-fade"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
          />
        )}
      </AnimatePresence>
    </div>
  );
}
