import React from 'react';
import StickyScene from './StickyScene';
import { STORY_CHAPTERS } from '../story/chapters';
import TravelScrollWord from './TravelScrollWord';

interface Chapter {
  id: number;
  step: string;
  year: string;
  title: string;
  lines: string[];
  metric?: string;
  image: string;
  alt: string;
  stageHint?: string;
}

const CHAPTERS: Chapter[] = [
  {
    id: 0,
    step: 'Step 1',
    year: 'Before code',
    title: 'Discipline first.',
    lines: [
      'National-level athletics taught me consistency beats talent.',
      'Show up. Repeat the reps. Stay calm under pressure.',
    ],
    metric: 'National-level athlete',
    image: '/story/clay-01-athlete.webp',
    alt: 'Claymorphic avatar mid-run with a stopwatch',
    stageHint: 'Intake',
  },
  {
    id: 1,
    step: 'Step 2',
    year: '2022 – 2026',
    title: 'Then the machine.',
    lines: [
      'At MAIT I traded a stopwatch for a compiler.',
      'The scoreboard became 616+ LeetCode problems.',
    ],
    metric: '616+ LeetCode solved',
    image: '/story/clay-02-code.webp',
    alt: 'Claymorphic avatar coding at a laptop',
    stageHint: 'Shape',
  },
  {
    id: 2,
    step: 'Step 3',
    year: 'Jun – Jul 2025',
    title: 'Models leave class.',
    lines: [
      'Tamizhan Skills RISE. Homework became product.',
      'Eight pipelines. 90%+ average accuracy.',
    ],
    metric: '8 pipelines · 90%+ accuracy',
    image: '/story/clay-03-models.webp',
    alt: 'Claymorphic avatar pointing at rising charts',
    stageHint: 'Shape → Ship',
  },
  {
    id: 3,
    step: 'Step 4',
    year: 'Feb – May 2026',
    title: 'Ship at scale.',
    lines: [
      'Ethara.ai. Geospatial pipelines that run themselves.',
      'Processing time down 80%+. Reporting 3× faster.',
    ],
    metric: '80%+ faster processing',
    image: '/story/clay-06-pipelines.webp',
    alt: 'Claymorphic avatar choosing the clean pipeline path',
    stageHint: 'Shape → Ship',
  },
  {
    id: 4,
    step: 'Step 5',
    year: 'Build',
    title: 'Teach it to read.',
    lines: [
      'DocuChat: answers grounded in the document.',
      'Retrieval first. Then the answer.',
    ],
    metric: 'DocuChat · semantic retrieval',
    image: '/story/clay-04-rag.webp',
    alt: 'Claymorphic avatar inspecting documents',
    stageHint: 'Index → Reason',
  },
  {
    id: 5,
    step: 'Step 6',
    year: 'Build',
    title: 'Then give it hands.',
    lines: [
      'An agent that calls live tools, not guesses.',
      'Retrieval. Reasoning. Action.',
    ],
    metric: 'Agents · MCP · live tools',
    image: '/story/clay-05-agent.webp',
    alt: 'Claymorphic avatar orchestrating agent nodes',
    stageHint: 'Reason → Act',
  },
  {
    id: 6,
    step: 'Step 7',
    year: 'Mindset',
    title: 'Skip the myths.',
    lines: [
      'Pretty charts are not a product.',
      'I measure what ships, and what moves the number.',
    ],
    metric: 'Proof over polish',
    image: '/story/clay-07-myths.webp',
    alt: 'Claymorphic avatar dismissing myth bubbles',
    stageHint: 'Ship',
  },
  {
    id: 7,
    step: 'Step 8',
    year: 'Now',
    title: "What's next.",
    lines: [
      'Looking for a team that ships AI products for real.',
      "Same athlete's consistency. Now aimed at code.",
    ],
    metric: 'Continue → Tools',
    image: '/story/clay-08-future.webp',
    alt: 'Claymorphic avatar looking toward the horizon',
    stageHint: 'Next',
  },
];

const meta = STORY_CHAPTERS[3];

const Journey: React.FC = () => {
  return (
    <StickyScene id="journey" count={CHAPTERS.length} heightPerChapter={105} mobileHeightPerChapter={80}>
      {({ active, progress, local, jumpTo }) => {
        const chapter = CHAPTERS[active];
        return (
          <>
            <TravelScrollWord word={meta.word} />
            <div className="absolute top-0 left-0 right-0 z-30 h-[3px] bg-white/5">
              <div
                className="h-full bg-gold-400 transition-[width] duration-150 ease-out"
                style={{ width: `${progress * 100}%` }}
              />
            </div>

            <div className="absolute top-[max(4.5rem,env(safe-area-inset-top))] md:top-20 left-0 right-0 z-30 px-5 sm:px-6 lg:px-10">
              <div className="max-w-6xl mx-auto flex items-center justify-between gap-3">
                <p className="font-mono text-[10px] sm:text-[11px] tracking-[0.22em] gold-text uppercase">
                  {meta.eyebrow}
                </p>
                <div className="flex items-center gap-1.5 sm:gap-2.5">
                  {CHAPTERS.map((c, i) => (
                    <button
                      key={c.id}
                      type="button"
                      onClick={() => jumpTo(i)}
                      aria-label={`Go to ${c.step}`}
                      aria-current={i === active ? 'true' : undefined}
                      className={`progress-dot h-2.5 sm:h-3 min-w-[10px] rounded-full transition-all duration-500 ${
                        i === active
                          ? 'progress-dot--active w-7 sm:w-9'
                          : i < active
                            ? 'progress-dot--done w-2.5 sm:w-3'
                            : 'w-2.5 sm:w-3'
                      }`}
                    />
                  ))}
                </div>
                <p className="font-mono text-[10px] sm:text-[11px] tracking-wider text-gray-500 tabular-nums">
                  {String(active + 1).padStart(2, '0')} / {String(CHAPTERS.length).padStart(2, '0')}
                </p>
              </div>
            </div>

            <div className="relative h-full max-w-6xl mx-auto px-5 sm:px-6 lg:px-10 pt-24 sm:pt-28 pb-16 sm:pb-20 flex items-center">
              <div className="w-full grid lg:grid-cols-[1.05fr_0.95fr] gap-8 lg:gap-14 items-center">
                <div className="relative min-h-[280px] sm:min-h-[320px]">
                  {CHAPTERS.map((c, i) => {
                    const isActive = i === active;
                    const isPast = i < active;
                    return (
                      <article
                        key={c.id}
                        aria-hidden={!isActive}
                        className={`transition-all duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] ${
                          isActive
                            ? 'relative opacity-100 translate-y-0'
                            : `absolute inset-0 pointer-events-none ${
                                isPast ? 'opacity-0 -translate-y-8' : 'opacity-0 translate-y-10'
                              }`
                        }`}
                      >
                        <p className="font-mono text-xs sm:text-sm gold-text mb-3 sm:mb-4 tracking-wide">
                          {c.step}
                          <span className="text-gray-600 mx-2 sm:mx-3">/</span>
                          <span className="text-gray-500">{c.year}</span>
                          {c.stageHint && (
                            <>
                              <span className="text-gray-600 mx-2 sm:mx-3">·</span>
                              <span className="text-gray-500">{c.stageHint}</span>
                            </>
                          )}
                        </p>
                        <h2 className="font-display text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white leading-[0.95] tracking-tight max-w-[12ch]">
                          {c.title}
                        </h2>
                        <div className="mt-6 sm:mt-8 space-y-3 sm:space-y-4 max-w-xl">
                          {c.lines.map((line, li) => {
                            const reveal = isActive && local > li * 0.28;
                            return (
                              <p
                                key={li}
                                className={`text-base sm:text-lg md:text-xl text-gray-300 leading-snug font-light transition-all duration-500 ${
                                  reveal ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-3'
                                }`}
                              >
                                {line}
                              </p>
                            );
                          })}
                        </div>
                        {c.metric && (
                          <p
                            className={`mt-7 sm:mt-9 inline-flex font-mono text-[11px] sm:text-xs tracking-wide gold-text border-b border-gold-400/35 pb-1 transition-opacity duration-500 ${
                              isActive && local > 0.45 ? 'opacity-100' : 'opacity-0'
                            }`}
                          >
                            {c.metric}
                          </p>
                        )}
                      </article>
                    );
                  })}
                </div>

                <div className="relative mx-auto w-full max-w-[420px] lg:max-w-none aspect-square">
                  <div
                    className="absolute inset-0 rounded-[2rem] opacity-40 blur-3xl pointer-events-none"
                    style={{
                      background:
                        'radial-gradient(circle at 50% 45%, rgba(233,172,63,0.22), transparent 62%)',
                    }}
                  />

                  {CHAPTERS.map((c, i) => {
                    if (Math.abs(i - active) > 1) return null;
                    const isActive = i === active;
                    const isPast = i < active;
                    return (
                      <div
                        key={c.id}
                        aria-hidden={!isActive}
                        className={`absolute inset-0 flex items-center justify-center transition-all duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] ${
                          isActive
                            ? 'opacity-100 scale-100 translate-y-0'
                            : isPast
                              ? 'opacity-0 scale-95 -translate-y-6'
                              : 'opacity-0 scale-95 translate-y-8'
                        }`}
                      >
                        <img
                          src={c.image}
                          alt={c.alt}
                          width={900}
                          height={900}
                          loading={i === 0 ? 'eager' : 'lazy'}
                          decoding="async"
                          className="w-[88%] h-[88%] object-contain select-none pointer-events-none drop-shadow-[0_18px_40px_rgba(0,0,0,0.4)]"
                          draggable={false}
                        />
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>

            <p className="absolute bottom-5 sm:bottom-8 left-0 right-0 text-center font-mono text-[10px] tracking-[0.25em] text-gray-600 pointer-events-none">
              SCROLL
            </p>
          </>
        );
      }}
    </StickyScene>
  );
};

export default Journey;
