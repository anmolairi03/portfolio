import React, { useEffect, useMemo, useRef } from 'react';

export const SCRIPT = [
  '> boot://identity',
  '> curiosity --first',
  '> discipline --from athletics',
  '> load MAIT_CSE cgpa=8.15',
  '> leetcode=616+',
  '> craft=applied_ai',
  '> STATUS: systems that survive reality',
  '> _',
];

const FULL = SCRIPT.join('\n');

interface TerminalTyperProps {
  /** 0–1 scroll-driven reveal of the script. */
  reveal: number;
  onChar?: () => void;
}

/** Scroll-storytelling terminal text — characters unlock with `reveal`. */
const TerminalTyper: React.FC<TerminalTyperProps> = ({ reveal, onChar }) => {
  const count = Math.min(FULL.length, Math.max(0, Math.floor(reveal * FULL.length)));
  const prevRef = useRef(0);
  const onCharRef = useRef(onChar);
  onCharRef.current = onChar;

  useEffect(() => {
    if (count > prevRef.current) {
      onCharRef.current?.();
    }
    prevRef.current = count;
  }, [count]);

  const lines = useMemo(() => {
    const slice = FULL.slice(0, count);
    return slice.length ? slice.split('\n') : [''];
  }, [count]);

  const done = count >= FULL.length;

  return (
    <div className="crt-typer" aria-live="polite">
      {lines.map((line, i) => (
        <div key={i} className="crt-typer__line">
          {line}
          {i === lines.length - 1 && !done && <span className="crt-typer__cursor" />}
        </div>
      ))}
    </div>
  );
};

export default TerminalTyper;
