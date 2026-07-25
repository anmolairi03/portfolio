import React, { useCallback, useEffect, useRef, useState } from 'react';
import TerminalTyper from './TerminalTyper';
import ScreenCrack from './ScreenCrack';
import { createWhyAudio, playSmash, playTick, resumeAudio } from './whyAudio';
import { useGlassDebris } from '../../context/GlassDebrisContext';
import TravelScrollWord from '../TravelScrollWord';
import { subscribeScrollTick } from '../../hooks/scrollTick';
import { STORY_CHAPTERS } from '../../story/chapters';

const meta = STORY_CHAPTERS[1];

function sectionStoryProgress(el: HTMLElement): number {
  const rect = el.getBoundingClientRect();
  const view = window.innerHeight || 1;
  const travel = Math.max(1, el.offsetHeight - view);
  return Math.min(1, Math.max(0, -rect.top / travel));
}

function ease(u: number) {
  return u * u * (3 - 2 * u);
}

/** Scroll CRT story: type -> glitch + red-hot smoke -> shatter -> blackout. */
const WhyTerminal: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const screenRef = useRef<HTMLDivElement>(null);
  const audioRef = useRef<AudioContext | null>(null);
  const lastTickRef = useRef(-1);
  const debrisSpawnedRef = useRef(false);
  const { spawnFrom, clear, shards } = useGlassDebris();

  const [storyP, setStoryP] = useState(0);
  const [soundOn, setSoundOn] = useState(true);

  const ensureAudio = useCallback(() => {
    if (!audioRef.current) audioRef.current = createWhyAudio();
    void resumeAudio(audioRef.current);
    return audioRef.current;
  }, []);

  useEffect(() => {
    const unlock = () => ensureAudio();
    window.addEventListener('pointerdown', unlock, { once: true, passive: true });
    window.addEventListener('keydown', unlock, { once: true });
    return () => {
      window.removeEventListener('pointerdown', unlock);
      window.removeEventListener('keydown', unlock);
    };
  }, [ensureAudio]);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;

    return subscribeScrollTick(() => {
      const p = sectionStoryProgress(el);
      const bucket = Math.round(p * 120);
      if (bucket === lastTickRef.current) return;
      lastTickRef.current = bucket;
      setStoryP(bucket / 120);

      if (p < 0.84 && debrisSpawnedRef.current) {
        debrisSpawnedRef.current = false;
        clear();
      }
    });
  }, [clear]);

  const shatter = useCallback(() => {
    if (debrisSpawnedRef.current) return;
    debrisSpawnedRef.current = true;
    if (soundOn) playSmash(ensureAudio());

    const screen = screenRef.current;
    if (screen) {
      const r = screen.getBoundingClientRect();
      spawnFrom({ x: r.left + r.width * 0.5, y: r.top + r.height * 0.5 }, 26);
    }
  }, [ensureAudio, soundOn, spawnFrom]);

  // Beats: fine CRT first (power + type), then glitch, then red-hot, then shatter
  const powerT = ease(Math.min(1, storyP / 0.08));
  const typeT = Math.min(1, Math.max(0, (storyP - 0.08) / 0.42));
  // Stay healthy until typing is mostly done
  const heatT = ease(Math.min(1, Math.max(0, (storyP - 0.58) / 0.3)));
  // Glitch only after the tube has been fine for a beat
  const glitchT = Math.min(1, Math.max(0, (storyP - 0.52) / 0.28));
  const smashed = storyP >= 0.9;
  const blackout = smashed;
  const ledOn = storyP > 0.02;
  const overheating = heatT > 0.02 && !smashed;

  useEffect(() => {
    if (smashed) shatter();
  }, [smashed, shatter]);

  return (
    <section id="about" ref={sectionRef} data-theme="core" className="why-crt relative">
      <TravelScrollWord word={meta.word} />

      <div className="why-crt__pin">
        <div className="why-crt__stage">
          <p className="font-mono text-sm gold-text mb-3 tracking-wide relative z-10">
            {meta.eyebrow}
          </p>
          <p className="why-crt__hint font-mono text-[10px] tracking-[0.16em] uppercase text-gray-500 mb-5 relative z-10">
            Scroll to increase the load
          </p>
          <h2 className="sr-only">Why this builder</h2>

          <div
            className={`crt-monitor ${overheating ? 'is-overheating' : ''} ${glitchT > 0.08 ? 'is-glitching' : ''}`}
            style={{ '--crt-heat': heatT, '--crt-glitch': glitchT } as React.CSSProperties}
          >
            {/* Smoke rises from the chassis — outside clipped screen */}
            <div className="crt-smoke-field" aria-hidden="true">
              <span className="crt-smoke crt-smoke--a" />
              <span className="crt-smoke crt-smoke--b" />
              <span className="crt-smoke crt-smoke--c" />
            </div>

            <div className="crt-monitor__bezel">
              <div className="crt-monitor__chrome">
                <span
                  className={`crt-monitor__led ${ledOn ? 'is-on' : ''} ${heatT > 0.35 ? 'is-hot' : ''}`}
                />
                <span className="crt-monitor__brand font-mono">ANMOL / CRT-86</span>
                <div className="crt-monitor__controls">
                  <button
                    type="button"
                    className="crt-monitor__btn"
                    onClick={() => {
                      const next = !soundOn;
                      setSoundOn(next);
                      if (next) ensureAudio();
                    }}
                  >
                    {soundOn ? 'Sound on' : 'Sound off'}
                  </button>
                  {shards.length > 0 && (
                    <button type="button" className="crt-monitor__btn" onClick={clear}>
                      Sweep glass
                    </button>
                  )}
                </div>
              </div>

              <div
                ref={screenRef}
                className={`crt-monitor__screen ${glitchT > 0.08 ? 'is-glitching' : ''}`}
                style={
                  {
                    '--crt-power': powerT,
                    '--crt-heat': heatT,
                    '--crt-glitch': glitchT,
                  } as React.CSSProperties
                }
              >
                <div className="crt-monitor__scanlines" />
                <div className="crt-monitor__vignette" />

                <div className="crt-heat" aria-hidden="true">
                  <div className="crt-heat__bloom" />
                  <div className="crt-heat__haze" />
                </div>

                <div className="crt-glitch" aria-hidden="true">
                  <div className="crt-glitch__rgb crt-glitch__rgb--r" />
                  <div className="crt-glitch__rgb crt-glitch__rgb--b" />
                  <div className="crt-glitch__slice crt-glitch__slice--1" />
                  <div className="crt-glitch__slice crt-glitch__slice--2" />
                  <div className="crt-glitch__slice crt-glitch__slice--3" />
                  <div className="crt-glitch__roll" />
                  <div className="crt-glitch__noise" />
                  <div className="crt-glitch__static" />
                </div>

                <div className={`crt-monitor__text ${blackout ? 'is-hidden' : ''}`}>
                  <TerminalTyper
                    reveal={typeT}
                    onChar={() => {
                      if (soundOn && typeT > 0 && typeT < 1) playTick(ensureAudio());
                    }}
                  />
                </div>

                {heatT > 0.45 && !smashed && (
                  <div className="crt-heat__warning font-mono" aria-hidden="true">
                    THERMAL LIMIT
                  </div>
                )}
                <ScreenCrack visible={false} blackout={blackout} />
              </div>
            </div>

            <div className="crt-monitor__stand" />
            <div className="crt-monitor__base" />
          </div>

          {smashed && (
            <p className="why-crt__after font-mono text-xs text-gray-500 mt-8 text-center max-w-md mx-auto relative z-10">
              Thermal failure. Keep scrolling, or drag the glass out of the way.
            </p>
          )}
        </div>
      </div>
    </section>
  );
};

export default WhyTerminal;