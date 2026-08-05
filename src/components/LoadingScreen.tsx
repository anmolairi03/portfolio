import React, { useEffect } from 'react';
import { ArrowRight } from 'lucide-react';
import SparkCatchGame from './loader/SparkCatchGame';

interface LoadingScreenProps {
  /** Assets finished loading. */
  ready: boolean;
  progress: number;
  /** User chose to leave the loader and view the site. */
  onEnter: () => void;
}

/**
 * Boot overlay with a mini game. Stays up until the visitor presses Enter portfolio,
 * so a long load never forces them to stare at a bar.
 */
const LoadingScreen: React.FC<LoadingScreenProps> = ({ ready, progress, onEnter }) => {
  useEffect(() => {
    document.body.classList.add('is-booting');
    const splash = document.getElementById('boot-splash');
    if (splash) splash.remove();
    return () => {
      document.body.classList.remove('is-booting');
    };
  }, []);

  return (
    <div className="site-loader" role="dialog" aria-modal="true" aria-label="Loading portfolio">
      <div className="site-loader__panel">
        <p className="site-loader__brand font-mono">ANMOL / BOOT</p>
        <h1 className="site-loader__title">
          {ready ? 'Systems ready' : 'Loading systems'}
        </h1>
        <p className="site-loader__sub font-mono">
          {ready ? 'Take your time. The game keeps running' : 'Fonts · scene · interfaces'}
        </p>

        <div
          className="site-loader__track"
          role="progressbar"
          aria-valuenow={Math.min(100, progress)}
          aria-valuemin={0}
          aria-valuemax={100}
        >
          <span
            className={`site-loader__fill ${ready ? 'is-full' : ''}`}
            style={{ width: `${Math.max(8, progress)}%` }}
          />
        </div>

        <p className="site-loader__pct font-mono" aria-live="polite">
          {ready ? 'LOADED 100%' : `${String(Math.min(99, progress)).padStart(2, '0')}%`}
        </p>

        <SparkCatchGame />

        <div className="site-loader__enter">
          <button
            type="button"
            className="site-loader__enter-btn"
            onClick={onEnter}
            disabled={!ready}
          >
            {ready ? 'Enter portfolio' : 'Loading…'}
            {ready && <ArrowRight className="w-4 h-4" aria-hidden="true" />}
          </button>
          <p className="site-loader__enter-note font-mono">
            {ready
              ? 'Or keep playing. Nothing is waiting on you'
              : 'Button unlocks when everything has loaded'}
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoadingScreen;