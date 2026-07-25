/** Web Audio helpers for the Why CRT scene. */

export function createWhyAudio(): AudioContext | null {
  try {
    return new AudioContext();
  } catch {
    return null;
  }
}

export async function resumeAudio(ctx: AudioContext | null) {
  if (!ctx) return;
  if (ctx.state === 'suspended') {
    try {
      await ctx.resume();
    } catch {
      /* ignore */
    }
  }
}

/** Soft key-click for phosphor typing. */
export function playTick(ctx: AudioContext | null) {
  if (!ctx) return;
  const t = ctx.currentTime;
  const o = ctx.createOscillator();
  const g = ctx.createGain();
  const f = ctx.createBiquadFilter();
  o.type = 'square';
  o.frequency.value = 920 + Math.random() * 240;
  f.type = 'bandpass';
  f.frequency.value = 1400;
  f.Q.value = 2.2;
  g.gain.value = 0.045;
  o.connect(f);
  f.connect(g);
  g.connect(ctx.destination);
  o.start(t);
  g.gain.exponentialRampToValueAtTime(0.0001, t + 0.045);
  o.stop(t + 0.05);
}

/** Glass smash + CRT thump. */
export function playSmash(ctx: AudioContext | null) {
  if (!ctx) return;
  const t = ctx.currentTime;

  // Low thump
  const o = ctx.createOscillator();
  const g = ctx.createGain();
  o.type = 'sawtooth';
  o.frequency.setValueAtTime(110, t);
  o.frequency.exponentialRampToValueAtTime(28, t + 0.35);
  g.gain.setValueAtTime(0.16, t);
  g.gain.exponentialRampToValueAtTime(0.0001, t + 0.4);
  o.connect(g);
  g.connect(ctx.destination);
  o.start(t);
  o.stop(t + 0.42);

  // Noise burst (glass)
  const seconds = 0.35;
  const buffer = ctx.createBuffer(1, Math.floor(ctx.sampleRate * seconds), ctx.sampleRate);
  const data = buffer.getChannelData(0);
  for (let i = 0; i < data.length; i++) {
    data[i] = (Math.random() * 2 - 1) * Math.pow(1 - i / data.length, 1.6);
  }
  const src = ctx.createBufferSource();
  src.buffer = buffer;
  const ng = ctx.createGain();
  const bp = ctx.createBiquadFilter();
  bp.type = 'highpass';
  bp.frequency.value = 900;
  ng.gain.setValueAtTime(0.22, t);
  ng.gain.exponentialRampToValueAtTime(0.0001, t + 0.35);
  src.connect(bp);
  bp.connect(ng);
  ng.connect(ctx.destination);
  src.start(t);
}
