# 3D Portfolio — Md Arif Ansari

An interactive, theme-switchable 3D portfolio built with **React**, **Three.js** (React Three Fiber), and **Framer Motion**. Features four unique themes with custom loading screens, sound effects, 3D particle backgrounds, and animejs text animations.

![Tech Stack](https://img.shields.io/badge/React-19-61DAFB?logo=react) ![Three.js](https://img.shields.io/badge/Three.js-R3F-000000?logo=three.js) ![Framer Motion](https://img.shields.io/badge/Framer_Motion-11-0055FF?logo=framer) ![Vite](https://img.shields.io/badge/Vite-8-646CFF?logo=vite)

---

## ✨ Features

- **4 Thematic Worlds** — Amber Glow, Pixel Cyberpunk, GTA 6 Vice City, Rain Drop — each with unique colors, fonts, borders, and loading effects.
- **Entry Welcome Screen** — Greeting with animated text and theme selection before the main experience loads.
- **Per-Theme Loading Screens** — Theme-specific loading visuals (ember particles, rain streaks, pixel grid assembly, synthwave neon bars) with matching Web Audio API sounds.
- **3D Background & Hero Canvases** — Real-time Three.js particle fields, floating geometry, and theme-reactive scenes.
- **Animejs Text Effects** — Click the hero name to cycle through 5 animations: flip, wave, elastic, glide, bounce.
- **Theme-Specific Click Sounds** — Every click plays a unique synth blip, water droplet, neon thud, or chime.
- **Theme Persistence** — Saved to `localStorage`, restored on next visit.
- **Fully Responsive** — Works across desktop, tablet, and mobile.
- **Editable Content** — All portfolio text lives in a single `src/data/content.js` file.

---

## 🎨 Themes

| Theme | Colors | Font | Loading Effect | Sound |
|---|---|---|---|---|
| **Amber Glow** | Orange / Dark | Syne + Inter | Floating ember particles | Golden chime + warm pad |
| **Pixel Cyberpunk** | Cyan + Magenta / Near-black | Press Start 2P | 12×12 grid pixel assembly | 8-bit arpeggio + power chord |
| **GTA 6 Vice City** | Pink + Cyan / Deep purple | Bangers + Inter | Synthwave sun, grid, neon bars, palm silhouette | Bass kick + sawtooth arpeggio |
| **Rain Drop** | Sky blue + Deep blue / Stormy navy | Syne + Inter | Rain streak particles | 20 overlapping droplets + thunder rumble |

---

## 🚀 Getting Started

### Prerequisites
- Node.js 18+
- npm

### Install & Run
```bash
npm install
npm run dev
```

### Build for Production
```bash
npm run build
npm run preview
```

---

## 🧩 Project Structure

```
src/
├── components/
│   ├── ThemeContext.jsx       — Theme definitions, persistence, provider
│   ├── EntryScreen.jsx        — Welcome screen with theme selection
│   ├── LoadingScreen.jsx      — Per-theme loading visuals + progress
│   ├── BackgroundCanvas.jsx   — 3D background particle system
│   ├── HeroCanvas.jsx         — 3D hero scene (geometry, stars, etc.)
│   ├── Navbar.jsx             — Navigation bar + theme dropdown
│   ├── CursorGlow.jsx         — Custom cursor follower
│   └── sections/
│       ├── Hero.jsx           — Hero section with animejs text effects
│       ├── About.jsx
│       ├── Experience.jsx
│       ├── Skills.jsx
│       ├── Projects.jsx
│       ├── Community.jsx
│       ├── Education.jsx
│       └── Contact.jsx
├── styles/
│   └── index.css              — Global styles, theme CSS vars, keyframes
├── utils/
│   └── audio.js               — Web Audio API click + loading sounds
├── data/
│   └── content.js             — Editable portfolio text
├── App.jsx                    — App shell with entry → loading → content flow
└── main.jsx                   — Entry point
```

---

## 🔧 Configuration

### Editing Portfolio Content
All text is in `src/data/content.js`:
```js
export const content = {
  name: 'MD ARIF ANSARI',
  tagline: 'Full-Stack Developer',
  about: ['...'],
  // ...
};
```

### Adding a New Theme
1. Add an entry in `themes` object inside `ThemeContext.jsx`
2. Add CSS variables under a `body.theme-<id>` block in `index.css`
3. Add a loading effect component (or reuse one) in `LoadingScreen.jsx`
4. Add sounds in `src/utils/audio.js`
5. Add the theme to `Navbar.jsx` theme dropdown
6. Add theme-specific background/hero 3D effects in `BackgroundCanvas.jsx` and `HeroCanvas.jsx`

---

## 🛠 Tech Stack

| Library | Purpose |
|---|---|
| [React 19](https://react.dev) | UI framework |
| [Vite 8](https://vitejs.dev) | Build tool |
| [Three.js](https://threejs.org) / [R3F](https://docs.pmnd.rs/react-three-fiber) | 3D rendering |
| [@react-three/drei](https://github.com/pmndrs/drei) | R3F helpers |
| [Framer Motion 12](https://www.framer.com/motion/) | Animations |
| [animejs v4](https://animejs.com) | Text character effects |

---

## 📄 License

MIT — free to use, modify, and distribute.
