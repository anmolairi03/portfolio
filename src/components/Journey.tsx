import React, { useCallback, useEffect, useRef, useState } from 'react';

interface Chapter {
  id: number;
  step: string;
  year: string;
  title: string;
  lines: string[];
  chips: string[];
  metric?: string;
  image: string;
  alt: string;
}

const CHAPTERS: Chapter[] = [
  {
    id: 0,
    step: 'Step 1',
    year: 'Before code',
    title: 'Discipline first.',
    lines: [
      'My first arena was a competition floor.',
      'National-level athletics taught me consistency beats talent.',
      'Show up. Repeat the reps. Stay calm under pressure.',
    ],
    chips: ['Stopwatch', 'Reps', 'Pressure', 'Nationals'],
    metric: 'National-level athlete',
    image: '/story/clay-01-athlete.webp',
    alt: 'Claymorphic avatar mid-run with a stopwatch',
  },
  {
    id: 1,
    step: 'Step 2',
    year: '2022 – 2026',
    title: 'Then the machine.',
    lines: [
      'At MAIT I traded a stopwatch for a compiler.',
      'DSA, systems, databases: each one a new sport.',
      'The scoreboard became 616+ LeetCode problems.',
    ],
    chips: ['MAIT', 'DSA', 'Systems', 'LeetCode'],
    metric: '616+ LeetCode solved',
    image: '/story/clay-02-code.webp',
    alt: 'Claymorphic avatar coding at a laptop',
  },
  {
    id: 2,
    step: 'Step 3',
    year: 'Jun – Jul 2025',
    title: 'Models leave class.',
    lines: [
      'Tamizhan Skills RISE. Homework became product.',
      'Eight predictive pipelines. 90%+ average accuracy.',
      'Dashboards that turned messy data into decisions.',
    ],
    chips: ['Pipelines', 'Accuracy', 'Dashboards', 'Decisions'],
    metric: '8 pipelines · 90%+ accuracy',
    image: '/story/clay-03-models.webp',
    alt: 'Claymorphic avatar pointing at rising charts',
  },
  {
    id: 3,
    step: 'Step 4',
    year: 'Feb – May 2026',
    title: 'Ship at scale.',
    lines: [
      'Ethara.ai. Geospatial pipelines that run themselves.',
      'Manual evaluation gone. Processing time down 80%+.',
      'Streamlit + PDF reporting. 3x faster compliance.',
    ],
    chips: ['Ethara.ai', 'Geospatial', 'Automation', 'Streamlit'],
    metric: '80%+ faster processing',
    image: '/story/clay-06-pipelines.webp',
    alt: 'Claymorphic avatar choosing the clean pipeline path',
  },
  {
    id: 4,
    step: 'Step 5',
    year: 'Build',
    title: 'Teach it to read.',
    lines: [
      'DocuChat: RAG over documents with FAISS + Gemini.',
      'Ask a question. Get the passage, not a guess.',
      'Retrieval first. Then the answer.',
    ],
    chips: ['RAG', 'FAISS', 'Gemini', 'Docs'],
    metric: 'DocuChat · semantic retrieval',
    image: '/story/clay-04-rag.webp',
    alt: 'Claymorphic avatar inspecting documents',
  },
  {
    id: 5,
    step: 'Step 6',
    year: 'Build',
    title: 'Then give it hands.',
    lines: [
      'An MCP agent that fetches live tools, not guesses.',
      'LangGraph for the loop. Real APIs for the action.',
      'Retrieval. Reasoning. Action.',
    ],
    chips: ['MCP', 'LangGraph', 'Agents', 'Tools'],
    metric: 'Agents · MCP · live tools',
    image: '/story/clay-05-agent.webp',
    alt: 'Claymorphic avatar orchestrating agent nodes',
  },
  {
    id: 6,
    step: 'Step 7',
    year: 'Mindset',
    title: 'Skip the myths.',
    lines: [
      'Pretty charts are not a product.',
      'Generic AI copy is not strategy.',
      'I measure what ships, and what moves the number.',
    ],
    chips: ['No fluff', 'Proof', 'Ship', 'Measure'],
    metric: 'Proof over polish',
    image: '/story/clay-07-myths.webp',
    alt: 'Claymorphic avatar dismissing myth bubbles',
  },
  {
    id: 7,
    step: 'Step 8',
    year: 'Now',
    title: "What's next.",
    lines: [
      'Looking for a team that ships AI products for real.',
      "Same athlete's consistency. Now aimed at code.",
      'The next chapter is open.',
    ],
    chips: ['Open roles', 'AI products', 'Ship', 'Team'],
    metric: 'Open to roles',
    image: '/story/clay-08-future.webp',
    alt: 'Claymorphic avatar looking toward the horizon',
  },
];

const Journey: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const [active, setActive] = useState(0);
  const [progress, setProgress] = useState(0);
  const [local, setLocal] = useState(0);

  useEffect(() => {
    let frame = 0;

    const update = () => {
      const section = sectionRef.current;
      if (!section) return;

      const rect = section.getBoundingClientRect();
      const scrollable = section.offsetHeight - window.innerHeight;
      if (scrollable <= 0) {
        setActive(0);
        setProgress(0);
        setLocal(0);
        return;
      }

      const scrolled = Math.min(Math.max(-rect.top, 0), scrollable);
      const ratio = scrolled / scrollable;
      const raw = ratio * CHAPTERS.length;
      const index = Math.min(CHAPTERS.length - 1, Math.floor(raw));
      setProgress(ratio);
      setActive(index);
      setLocal(Math.min(1, Math.max(0, raw - index)));
    };

    const onScroll = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(update);
    };

    update();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
    };
  }, []);

  const jumpTo = useCallback((index: number) => {
    const section = sectionRef.current;
    if (!section) return;
    const scrollable = section.offsetHeight - window.innerHeight;
    const top =
      window.scrollY +
      section.getBoundingClientRect().top +
      ((index + 0.12) / CHAPTERS.length) * scrollable;
    window.scrollTo({ top, behavior: 'smooth' });
  }, []);

  const chapter = CHAPTERS[active];

  return (
    <section
      id="journey"
      ref={sectionRef}
      data-theme="core"
      className="relative"
      style={{ height: `${CHAPTERS.length * 115}vh` }}
    >
      <div className="sticky top-0 h-[100svh] md:h-screen">
        <div className="absolute top-0 left-0 right-0 z-30 h-[3px] bg-white/5">
          <div
            className="h-full bg-gold-400 transition-[width] duration-150 ease-out"
            style={{ width: `${progress * 100}%` }}
          />
        </div>

        <div className="absolute top-[max(4.5rem,env(safe-area-inset-top))] md:top-20 left-0 right-0 z-30 px-5 sm:px-6 lg:px-10">
          <div className="max-w-6xl mx-auto flex items-center justify-between gap-3">
            <p className="font-mono text-[10px] sm:text-[11px] tracking-[0.22em] gold-text uppercase">
              Sequence
            </p>
            <div className="flex items-center gap-1.5 sm:gap-2.5">
              {CHAPTERS.map((c, i) => (
                <button
                  key={c.id}
                  type="button"
                  onClick={() => jumpTo(i)}
                  aria-label={`Go to ${c.step}`}
                  className={`h-1.5 sm:h-2 rounded-full transition-all duration-500 ${
                    i === active
                      ? 'w-7 sm:w-9 bg-gold-400'
                      : i < active
                        ? 'w-1.5 sm:w-2 bg-gold-400/50'
                        : 'w-1.5 sm:w-2 bg-white/20 hover:bg-white/40'
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
            {/* Copy sequence */}
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
                            isPast
                              ? 'opacity-0 -translate-y-8'
                              : 'opacity-0 translate-y-10'
                          }`
                    }`}
                  >
                    <p className="font-mono text-xs sm:text-sm gold-text mb-3 sm:mb-4 tracking-wide">
                      {c.step}
                      <span className="text-gray-600 mx-2 sm:mx-3">/</span>
                      <span className="text-gray-500">{c.year}</span>
                    </p>
                    <h2 className="font-display text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white leading-[0.95] tracking-tight max-w-[12ch]">
                      {c.title}
                    </h2>
                    <div className="mt-6 sm:mt-8 space-y-3 sm:space-y-4 max-w-xl">
                      {c.lines.map((line, li) => {
                        const reveal = isActive && local > li * 0.22;
                        return (
                          <p
                            key={li}
                            className={`text-base sm:text-lg md:text-xl text-gray-300 leading-snug font-light transition-all duration-500 ${
                              reveal
                                ? 'opacity-100 translate-y-0'
                                : 'opacity-0 translate-y-3'
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
                          isActive && local > 0.55 ? 'opacity-100' : 'opacity-0'
                        }`}
                      >
                        {c.metric}
                      </p>
                    )}
                  </article>
                );
              })}
            </div>

            {/* Character sequence */}
            <div className="relative mx-auto w-full max-w-[420px] lg:max-w-none aspect-square">
              <div
                className="absolute inset-0 rounded-[2rem] opacity-40 blur-3xl pointer-events-none"
                style={{
                  background:
                    'radial-gradient(circle at 50% 45%, rgba(233,172,63,0.22), transparent 62%)',
                }}
              />

              {CHAPTERS.map((c, i) => {
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
                      className="w-[88%] h-[88%] object-contain select-none pointer-events-none drop-shadow-[0_18px_40px_rgba(0,0,0,0.4)]"
                      draggable={false}
                    />
                  </div>
                );
              })}

              {/* Floating chips around character */}
              <div className="absolute inset-0 pointer-events-none">
                {chapter.chips.map((chip, i) => {
                  const positions = [
                    'top-[6%] left-[2%] sm:left-[-2%]',
                    'top-[18%] right-[0%] sm:right-[-4%]',
                    'bottom-[22%] left-[-2%] sm:left-[-6%]',
                    'bottom-[8%] right-[4%] sm:right-[-2%]',
                  ];
                  const show = local > 0.12 + i * 0.14;
                  return (
                    <span
                      key={`${chapter.id}-${chip}`}
                      className={`absolute ${positions[i]} font-mono text-[10px] sm:text-xs tracking-wide px-2.5 py-1 rounded-full border border-white/10 bg-[#1c1f26]/85 text-gray-200 backdrop-blur-sm transition-all duration-500 ${
                        show
                          ? 'opacity-100 translate-y-0'
                          : 'opacity-0 translate-y-2'
                      }`}
                      style={{ transitionDelay: `${i * 40}ms` }}
                    >
                      {chip}
                    </span>
                  );
                })}
              </div>
            </div>
          </div>
        </div>

        <p className="absolute bottom-5 sm:bottom-8 left-0 right-0 text-center font-mono text-[10px] tracking-[0.25em] text-gray-600 pointer-events-none">
          SCROLL
        </p>
      </div>
    </section>
  );
};

export default Journey;
