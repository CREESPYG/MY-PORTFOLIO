import React, { createContext, useContext, useState, useCallback } from 'react';

const ThemeContext = createContext();

export const themes = {
  amber: {
    id: 'amber',
    name: 'Amber Glow',
    color: '#FFA500',
    colorSecondary: '#FF4500',
    bg: '#06060a',
  },
  pixel: {
    id: 'pixel',
    name: 'Pixel Cyberpunk',
    color: '#00d2ff',
    colorSecondary: '#ff00ff',
    bg: '#050508',
  },
  gta: {
    id: 'gta',
    name: 'GTA 6 Vice City',
    color: '#ff2a75',
    colorSecondary: '#00f0ff',
    bg: '#1a0b2e',
  },
  rain: {
    id: 'rain',
    name: 'Rain Drop',
    color: '#38bdf8',
    colorSecondary: '#0ea5e9',
    bg: '#0a0e1a',
  },
};

function getSavedTheme() {
  try {
    const saved = localStorage.getItem('portfolio-theme');
    if (saved && themes[saved]) return saved;
  } catch {}
  return 'amber';
}

// Apply initial theme before any render
(function initTheme() {
  const saved = getSavedTheme();
  document.body.className = `theme-${saved}`;
})();

export function ThemeProvider({ children }) {
  const [themeId, setThemeId] = useState(getSavedTheme);
  const [pendingThemeId, setPendingThemeId] = useState(null);

  const switchTheme = useCallback((id) => {
    if (id === themeId || pendingThemeId) return;
    // Apply new theme CSS vars immediately so loading screen matches
    Object.keys(themes).forEach((t) => document.body.classList.remove(`theme-${t}`));
    document.body.classList.add(`theme-${id}`);
    setPendingThemeId(id);
  }, [themeId, pendingThemeId]);

  const setThemeDirect = useCallback((id) => {
    Object.keys(themes).forEach((t) => document.body.classList.remove(`theme-${t}`));
    document.body.classList.add(`theme-${id}`);
    try { localStorage.setItem('portfolio-theme', id); } catch {}
    setThemeId(id);
  }, []);

  const finishSwitch = useCallback(() => {
    if (!pendingThemeId) return;
    const id = pendingThemeId;
    setThemeId(id);
    try { localStorage.setItem('portfolio-theme', id); } catch {}
    setPendingThemeId(null);
  }, [pendingThemeId]);

  const isLoading = pendingThemeId !== null;
  const loadingTheme = pendingThemeId ? themes[pendingThemeId] : null;

  return (
    <ThemeContext.Provider value={{
      theme: themes[themeId],
      setThemeId: switchTheme,
      setThemeDirect,
      themes,
      isLoading,
      loadingTheme,
      finishSwitch,
    }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  return useContext(ThemeContext);
}
