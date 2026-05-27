let audioCtx;

function getContext() {
  if (typeof window !== 'undefined') {
    if (!audioCtx) {
      audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    }
    return audioCtx;
  }
  return null;
}

export function playLoadingSound(themeId) {
  try {
    const ctx = getContext();
    if (!ctx) return;
    if (ctx.state === 'suspended') ctx.resume();

    const now = ctx.currentTime;

    if (themeId === 'pixel') {
      // 8-bit grid assembly sound: rhythmic clicks ascending
      const notes = [262, 330, 392, 523, 659, 784];
      notes.forEach((freq, i) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'square';
        osc.frequency.setValueAtTime(freq, now + i * 0.1);
        gain.gain.setValueAtTime(0.08, now + i * 0.1);
        gain.gain.exponentialRampToValueAtTime(0.01, now + i * 0.1 + 0.06);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(now + i * 0.1);
        osc.stop(now + i * 0.1 + 0.06);
      });
      // Power-up ending chord
      const chord = ctx.createOscillator();
      const cGain = ctx.createGain();
      chord.type = 'square';
      chord.frequency.setValueAtTime(784, now + 0.6);
      cGain.gain.setValueAtTime(0.12, now + 0.6);
      cGain.gain.exponentialRampToValueAtTime(0.01, now + 0.85);
      chord.connect(cGain);
      cGain.connect(ctx.destination);
      chord.start(now + 0.6);
      chord.stop(now + 0.85);
    } else if (themeId === 'rain') {
      // Continuous rain: overlapping droplets at random intervals
      for (let i = 0; i < 20; i++) {
        const t = now + Math.random() * 1.0;
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'sine';
        const freq = 700 + Math.random() * 1800;
        osc.frequency.setValueAtTime(freq, t);
        osc.frequency.exponentialRampToValueAtTime(freq * 0.2, t + 0.05);
        gain.gain.setValueAtTime(0.025 + Math.random() * 0.035, t);
        gain.gain.exponentialRampToValueAtTime(0.001, t + 0.05);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(t);
        osc.stop(t + 0.05);
      }
      // Low thunder rumble
      const rumble = ctx.createOscillator();
      const rGain = ctx.createGain();
      rumble.type = 'sine';
      rumble.frequency.setValueAtTime(50 + Math.random() * 25, now + 0.2);
      rumble.frequency.exponentialRampToValueAtTime(35, now + 1.0);
      rGain.gain.setValueAtTime(0.06, now + 0.2);
      rGain.gain.exponentialRampToValueAtTime(0.01, now + 1.0);
      rumble.connect(rGain);
      rGain.connect(ctx.destination);
      rumble.start(now + 0.2);
      rumble.stop(now + 1.0);
    } else if (themeId === 'gta') {
      // Synthwave bass kick + arpeggiated lead
      const kick = ctx.createOscillator();
      const kGain = ctx.createGain();
      kick.type = 'sine';
      kick.frequency.setValueAtTime(100, now);
      kick.frequency.exponentialRampToValueAtTime(40, now + 0.2);
      kGain.gain.setValueAtTime(0.2, now);
      kGain.gain.exponentialRampToValueAtTime(0.01, now + 0.2);
      kick.connect(kGain);
      kGain.connect(ctx.destination);
      kick.start(now);
      kick.stop(now + 0.2);
      // Arpeggiated synth lead
      const leadNotes = [262, 330, 392, 523, 659, 784, 1047];
      leadNotes.forEach((freq, i) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'sawtooth';
        osc.frequency.setValueAtTime(freq, now + 0.15 + i * 0.08);
        gain.gain.setValueAtTime(0.03, now + 0.15 + i * 0.08);
        gain.gain.exponentialRampToValueAtTime(0.01, now + 0.15 + i * 0.08 + 0.1);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(now + 0.15 + i * 0.08);
        osc.stop(now + 0.15 + i * 0.08 + 0.1);
      });
    } else {
      // Warm amber ambience: layered golden chimes
      for (let i = 0; i < 3; i++) {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'sine';
        const baseFreq = 400 + i * 200;
        osc.frequency.setValueAtTime(baseFreq, now + i * 0.2);
        osc.frequency.exponentialRampToValueAtTime(baseFreq * 2, now + i * 0.2 + 0.6);
        gain.gain.setValueAtTime(0.02, now + i * 0.2);
        gain.gain.linearRampToValueAtTime(0.05, now + i * 0.2 + 0.15);
        gain.gain.exponentialRampToValueAtTime(0.01, now + i * 0.2 + 0.6);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(now + i * 0.2);
        osc.stop(now + i * 0.2 + 0.6);
      }
      // Warm pad underneath
      const pad = ctx.createOscillator();
      const pGain = ctx.createGain();
      pad.type = 'sine';
      pad.frequency.setValueAtTime(110, now);
      pGain.gain.setValueAtTime(0.03, now);
      pGain.gain.exponentialRampToValueAtTime(0.01, now + 0.8);
      pad.connect(pGain);
      pGain.connect(ctx.destination);
      pad.start(now);
      pad.stop(now + 0.8);
    }
  } catch (e) {
    // Ignore audio errors
  }
}

export function playClickSound(themeId) {
  try {
    const ctx = getContext();
    if (!ctx) return;
    if (ctx.state === 'suspended') ctx.resume();

    const osc = ctx.createOscillator();
    const gainNode = ctx.createGain();

    osc.connect(gainNode);
    gainNode.connect(ctx.destination);

    const now = ctx.currentTime;

    if (themeId === 'pixel') {
      // 8-bit arcade blip
      osc.type = 'square';
      osc.frequency.setValueAtTime(600, now);
      osc.frequency.exponentialRampToValueAtTime(1200, now + 0.1);
      gainNode.gain.setValueAtTime(0.08, now);
      gainNode.gain.exponentialRampToValueAtTime(0.01, now + 0.1);
      osc.start(now);
      osc.stop(now + 0.1);
    } else if (themeId === 'rain') {
      // Realistic water droplet: high ping + splash noise
      const osc2 = ctx.createOscillator();
      const gain2 = ctx.createGain();
      osc2.type = 'sine';
      osc2.frequency.setValueAtTime(2400, now);
      osc2.frequency.exponentialRampToValueAtTime(400, now + 0.05);
      gain2.gain.setValueAtTime(0.06, now);
      gain2.gain.exponentialRampToValueAtTime(0.001, now + 0.05);
      osc2.connect(gain2);
      gain2.connect(ctx.destination);
      osc2.start(now);
      osc2.stop(now + 0.05);
      // Second splash resonance
      const osc3 = ctx.createOscillator();
      const gain3 = ctx.createGain();
      osc3.type = 'sine';
      osc3.frequency.setValueAtTime(1600, now + 0.02);
      osc3.frequency.exponentialRampToValueAtTime(300, now + 0.07);
      gain3.gain.setValueAtTime(0.03, now + 0.02);
      gain3.gain.exponentialRampToValueAtTime(0.001, now + 0.07);
      osc3.connect(gain3);
      gain3.connect(ctx.destination);
      osc3.start(now + 0.02);
      osc3.stop(now + 0.07);
    } else if (themeId === 'gta') {
      // Heavy synth UI thud
      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(150, now);
      osc.frequency.exponentialRampToValueAtTime(40, now + 0.15);
      gainNode.gain.setValueAtTime(0.15, now);
      gainNode.gain.exponentialRampToValueAtTime(0.01, now + 0.15);
      osc.start(now);
      osc.stop(now + 0.15);
    } else {
      // Default sleek high-tech click
      osc.type = 'sine';
      osc.frequency.setValueAtTime(1200, now);
      gainNode.gain.setValueAtTime(0.05, now);
      gainNode.gain.exponentialRampToValueAtTime(0.01, now + 0.05);
      osc.start(now);
      osc.stop(now + 0.05);
    }
  } catch (e) {
    // Ignore if audio isn't supported or fails
  }
}
