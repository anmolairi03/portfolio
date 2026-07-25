import React from 'react';
import { STORY_CHAPTERS } from '../story/chapters';

interface StorySpineProps {
  progress: number;
  activeId: string;
}

/**
 * One continuous storytelling rail from hero through contact.
 * Grows with page scroll; chapter nodes light as you pass them.
 */
const StorySpine: React.FC<StorySpineProps> = ({ progress, activeId }) => {
  const activeIndex = Math.max(
    0,
    STORY_CHAPTERS.findIndex((c) => c.id === activeId)
  );

  return (
    <div className="story-spine" aria-hidden="true">
      <div className="story-spine__track">
        <div
          className="story-spine__fill"
          style={{ height: `${Math.min(100, Math.max(0, progress * 100))}%` }}
        />
      </div>
      <ul className="story-spine__nodes">
        {STORY_CHAPTERS.map((chapter, i) => {
          const state =
            i < activeIndex ? 'is-done' : i === activeIndex ? 'is-active' : 'is-ahead';
          return (
            <li key={chapter.id} className={`story-spine__node ${state}`}>
              <span className="story-spine__dot" />
              <span className="story-spine__label">{chapter.label}</span>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default StorySpine;
