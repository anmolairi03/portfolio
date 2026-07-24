import React, { useCallback, useEffect, useState } from 'react';

interface Stage {
  id: string;
  step: string;
  phase: string;
  title: string;
  body: string;
  stack: string[];
  proof: string;
  clay: 'mess' | 'pipe' | 'find' | 'think' | 'hands' | 'ship';
}

const STAGES: Stage[] = [
  {
    id: 'mess',
    step: '01',
    phase: 'Intake',
    title: 'Map the mess',
    body:
      'Raw PDFs, unlabeled sheets, hand evaluations. I start by naming the question the data has to answer before any model code exists.',
    stack: ['Pandas', 'NumPy', 'EDA', 'SQL'],
    proof: 'Replaced manual geospatial evaluation at Ethara.ai',
    clay: 'mess',
  },
  {
    id: 'pipeline',
    step: '02',
    phase: 'Shape',
    title: 'Make it repeatable',
    body:
      'Cleaning and transforms leave the notebook and become a pipeline that runs the same way every time. That is where the hours disappear.',
    stack: ['Python', 'Pandas', 'Docker'],
    proof: '80%+ less processing time',
    clay: 'pipe',
  },
  {
    id: 'retrieval',
    step: '03',
    phase: 'Index',
    title: 'Make knowledge findable',
    body:
      'Text becomes vectors. Hugging Face embeddings + FAISS so the system retrieves the right passage instead of guessing from memory.',
    stack: ['Hugging Face', 'FAISS', 'RAG'],
    proof: 'DocuChat semantic search',
    clay: 'find',
  },
  {
    id: 'reasoning',
    step: '04',
    phase: 'Reason',
    title: 'Reason on evidence',
    body:
      'Context in, hallucination out. LangChain and LangGraph keep multi-turn answers anchored to sources.',
    stack: ['LangChain', 'LangGraph', 'Gemini'],
    proof: 'Context-aware document analysis',
    clay: 'think',
  },
  {
    id: 'tools',
    step: '05',
    phase: 'Act',
    title: 'Give it hands',
    body:
      'MCP servers let the agent call real tools and live APIs. Talking is not enough. Action is the product.',
    stack: ['MCP', 'ReAct', 'AsyncIO'],
    proof: 'Agent with live external retrieval',
    clay: 'hands',
  },
  {
    id: 'ship',
    step: '06',
    phase: 'Ship',
    title: 'Deliver and measure',
    body:
      'FastAPI or Streamlit for humans. Metrics for proof. Ship something someone can use, then check the numbers.',
    stack: ['FastAPI', 'Streamlit', 'Postgres'],
    proof: '3x reporting · 90%+ model accuracy',
    clay: 'ship',
  },
];

/** Soft claymorphic SVG glyphs for each stage */
const ClayGlyph: React.FC<{ kind: Stage['clay']; active: boolean; uid: string }> = ({
  kind,
  active,
  uid,
}) => {
  const fill = active ? '#e9ac3f' : '#3a3f4a';
  const shade = active ? '#c48a2a' : '#2a2e36';
  const hi = active ? '#f5d28a' : '#4a5160';
  const filterId = `clay-${uid}`;

  const common = (
    <>
      <defs>
        <filter id={filterId} x="-20%" y="-20%" width="140%" height="140%">
          <feDropShadow dx="0" dy="3" stdDeviation="2.5" floodColor="#000" floodOpacity="0.35" />
        </filter>
      </defs>
    </>
  );

  if (kind === 'mess') {
    return (
      <svg viewBox="0 0 80 80" className="w-full h-full" aria-hidden>
        {common}
        <g filter={`url(#${filterId})`}>
          <rect x="14" y="18" width="28" height="36" rx="8" fill={fill} />
          <rect x="18" y="24" width="20" height="3" rx="1.5" fill={shade} opacity="0.55" />
          <rect x="18" y="32" width="16" height="3" rx="1.5" fill={shade} opacity="0.45" />
          <rect x="18" y="40" width="18" height="3" rx="1.5" fill={shade} opacity="0.4" />
          <ellipse cx="52" cy="48" rx="16" ry="12" fill={hi} opacity="0.85" />
          <circle cx="46" cy="44" r="3" fill={shade} opacity="0.35" />
          <circle cx="56" cy="50" r="2.5" fill={shade} opacity="0.3" />
          <circle cx="50" cy="52" r="2" fill={shade} opacity="0.25" />
        </g>
      </svg>
    );
  }

  if (kind === 'pipe') {
    return (
      <svg viewBox="0 0 80 80" className="w-full h-full" aria-hidden>
        {common}
        <g filter={`url(#${filterId})`}>
          <rect x="10" y="34" width="22" height="12" rx="6" fill={fill} />
          <rect x="30" y="34" width="20" height="12" rx="6" fill={hi} />
          <rect x="48" y="34" width="22" height="12" rx="6" fill={fill} />
          <circle cx="22" cy="40" r="3.5" fill={shade} opacity="0.4" />
          <circle cx="40" cy="40" r="3.5" fill={shade} opacity="0.35" />
          <circle cx="58" cy="40" r="3.5" fill={shade} opacity="0.4" />
        </g>
      </svg>
    );
  }

  if (kind === 'find') {
    return (
      <svg viewBox="0 0 80 80" className="w-full h-full" aria-hidden>
        {common}
        <g filter={`url(#${filterId})`}>
          <circle cx="36" cy="36" r="18" fill={fill} />
          <circle cx="36" cy="36" r="10" fill={shade} opacity="0.35" />
          <rect
            x="48"
            y="48"
            width="8"
            height="22"
            rx="4"
            fill={hi}
            transform="rotate(40 52 59)"
          />
        </g>
      </svg>
    );
  }

  if (kind === 'think') {
    return (
      <svg viewBox="0 0 80 80" className="w-full h-full" aria-hidden>
        {common}
        <g filter={`url(#${filterId})`}>
          <ellipse cx="40" cy="34" rx="22" ry="18" fill={fill} />
          <circle cx="32" cy="32" r="3" fill={shade} />
          <circle cx="48" cy="32" r="3" fill={shade} />
          <path d="M32 42c3 4 13 4 16 0" stroke={shade} strokeWidth="3" fill="none" strokeLinecap="round" />
          <circle cx="28" cy="56" r="5" fill={hi} />
          <circle cx="40" cy="60" r="4" fill={hi} opacity="0.8" />
          <circle cx="50" cy="56" r="3.5" fill={hi} opacity="0.65" />
        </g>
      </svg>
    );
  }

  if (kind === 'hands') {
    return (
      <svg viewBox="0 0 80 80" className="w-full h-full" aria-hidden>
        {common}
        <g filter={`url(#${filterId})`}>
          <circle cx="40" cy="40" r="10" fill={hi} />
          <circle cx="18" cy="28" r="8" fill={fill} />
          <circle cx="62" cy="28" r="8" fill={fill} />
          <circle cx="18" cy="52" r="8" fill={fill} />
          <circle cx="62" cy="52" r="8" fill={fill} />
          <path d="M26 32l8 5M54 32l-8 5M26 48l8-5M54 48l-8-5" stroke={shade} strokeWidth="3" strokeLinecap="round" />
        </g>
      </svg>
    );
  }

  return (
    <svg viewBox="0 0 80 80" className="w-full h-full" aria-hidden>
      {common}
      <g filter={`url(#${filterId})`}>
        <rect x="22" y="18" width="36" height="44" rx="10" fill={fill} />
        <rect x="28" y="26" width="24" height="16" rx="4" fill={shade} opacity="0.35" />
        <circle cx="40" cy="52" r="4" fill={hi} />
        <path d="M30 14h20l4 6H26l4-6z" fill={hi} />
      </g>
    </svg>
  );
};

const BuildProcess: React.FC = () => {
  const [active, setActive] = useState(0);
  const [playing, setPlaying] = useState(true);
  const stage = STAGES[active];

  useEffect(() => {
    if (!playing) return;
    const id = window.setInterval(() => {
      setActive((i) => (i + 1) % STAGES.length);
    }, 4200);
    return () => window.clearInterval(id);
  }, [playing, active]);

  const select = useCallback((index: number) => {
    setPlaying(false);
    setActive(index);
  }, []);

  return (
    <section id="process" data-theme="core" className="relative py-24 md:py-32 overflow-hidden">
      <div
        className="pointer-events-none absolute inset-0 opacity-60"
        style={{
          background:
            'radial-gradient(ellipse 70% 50% at 20% 30%, rgba(233,172,63,0.08), transparent 55%), radial-gradient(ellipse 50% 40% at 85% 70%, rgba(255,255,255,0.03), transparent 50%)',
        }}
      />

      <div className="relative max-w-6xl mx-auto px-5 sm:px-6 lg:px-10">
        <div className="mb-10 md:mb-14 max-w-2xl">
          <p className="font-mono text-[10px] sm:text-xs tracking-[0.2em] gold-text mb-3 uppercase">
            02 / Build lab
          </p>
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-white leading-tight">
            A claymorphic signal chain
          </h2>
          <p className="mt-4 text-gray-400 text-base sm:text-lg leading-relaxed">
            Not a slide deck. Tap a node on the chain. Watch the stage light up. Same path every
            real project takes from mess to ship.
          </p>
        </div>

        <div className="grid lg:grid-cols-[1.05fr_0.95fr] gap-10 lg:gap-14 items-start">
          {/* Interactive chain */}
          <div className="relative">
            <div className="absolute left-[39px] sm:left-[47px] top-8 bottom-8 w-[3px] rounded-full bg-white/10" />
            <div
              className="absolute left-[39px] sm:left-[47px] top-8 w-[3px] rounded-full bg-gold-400/80 transition-all duration-700 ease-out"
              style={{ height: `calc(${(active / Math.max(STAGES.length - 1, 1)) * 100}% - 0px)` }}
            />

            <ul className="relative space-y-3 sm:space-y-4">
              {STAGES.map((s, i) => {
                const on = i === active;
                const done = i < active;
                return (
                  <li key={s.id}>
                    <button
                      type="button"
                      onClick={() => select(i)}
                      className={`w-full text-left flex items-center gap-4 sm:gap-5 rounded-2xl px-3 py-3 sm:px-4 sm:py-3.5 transition-all duration-500 ${
                        on
                          ? 'neu-raised bg-[#262a32]'
                          : 'hover:bg-white/[0.03]'
                      }`}
                    >
                      <span
                        className={`relative z-10 shrink-0 w-14 h-14 sm:w-[4.5rem] sm:h-[4.5rem] rounded-2xl flex items-center justify-center transition-transform duration-500 ${
                          on ? 'scale-105' : 'scale-100'
                        }`}
                        style={{
                          background: on ? '#2c313b' : '#252830',
                          boxShadow: on
                            ? '6px 6px 14px #1a1c22, -5px -5px 12px #30343e'
                            : '4px 4px 10px #1a1c22, -3px -3px 8px #2c3038',
                        }}
                      >
                        <span className="w-10 h-10 sm:w-12 sm:h-12">
                          <ClayGlyph kind={s.clay} active={on || done} uid={`rail-${s.id}`} />
                        </span>
                      </span>

                      <span className="min-w-0 flex-1">
                        <span className="flex items-baseline gap-2 mb-0.5">
                          <span className="font-mono text-[10px] tracking-wider text-gray-500">
                            {s.step}
                          </span>
                          <span
                            className={`font-mono text-[10px] tracking-[0.16em] uppercase ${
                              on ? 'gold-text' : 'text-gray-600'
                            }`}
                          >
                            {s.phase}
                          </span>
                        </span>
                        <span
                          className={`block font-display text-lg sm:text-xl font-semibold leading-snug ${
                            on ? 'text-white' : 'text-gray-400'
                          }`}
                        >
                          {s.title}
                        </span>
                      </span>

                      <span
                        className={`hidden sm:block h-2 w-2 rounded-full shrink-0 transition-colors ${
                          on ? 'bg-gold-400' : done ? 'bg-gold-400/40' : 'bg-white/15'
                        }`}
                      />
                    </button>
                  </li>
                );
              })}
            </ul>

            <div className="mt-5 flex items-center gap-3">
              <button
                type="button"
                onClick={() => setPlaying((p) => !p)}
                className="font-mono text-[10px] tracking-[0.18em] uppercase px-3 py-2 rounded-xl border border-white/10 text-gray-400 hover:text-white hover:border-white/25 transition-colors"
              >
                {playing ? 'Pause autoplay' : 'Resume autoplay'}
              </button>
              <p className="font-mono text-[10px] text-gray-600 tracking-wide">
                {String(active + 1).padStart(2, '0')} / {String(STAGES.length).padStart(2, '0')}
              </p>
            </div>
          </div>

          {/* Detail panel */}
          <div
            className="relative rounded-[1.75rem] p-6 sm:p-8 lg:sticky lg:top-28"
            style={{
              background: '#262a32',
              boxShadow:
                '10px 10px 24px #1a1c22, -8px -8px 20px #30343e, inset 0 1px 0 rgba(255,255,255,0.04)',
            }}
          >
            <div className="flex items-start justify-between gap-4 mb-6">
              <div>
                <p className="font-mono text-[11px] tracking-[0.2em] gold-text uppercase mb-2">
                  Stage {stage.step}
                </p>
                <h3 className="font-display text-3xl sm:text-4xl font-bold text-white leading-tight">
                  {stage.title}
                </h3>
              </div>
              <div
                className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl shrink-0 flex items-center justify-center"
                style={{
                  background: '#2c313b',
                  boxShadow: 'inset 4px 4px 10px #1e2128, inset -3px -3px 8px #383e4a',
                }}
              >
                <span className="w-12 h-12 sm:w-14 sm:h-14">
                  <ClayGlyph kind={stage.clay} active uid={`detail-${stage.id}`} />
                </span>
              </div>
            </div>

            <p className="text-gray-300 text-base sm:text-lg leading-relaxed mb-6">{stage.body}</p>

            <p className="font-mono text-xs gold-text border-b border-gold-400/30 pb-1 inline-flex mb-6">
              {stage.proof}
            </p>

            <div className="flex flex-wrap gap-2 mb-8">
              {stage.stack.map((tech) => (
                <span
                  key={tech}
                  className="px-3 py-1.5 rounded-xl font-mono text-[11px] text-gray-300"
                  style={{
                    background: '#22252c',
                    boxShadow: 'inset 2px 2px 5px #181a1f, inset -2px -2px 5px #2c3038',
                  }}
                >
                  {tech}
                </span>
              ))}
            </div>

            {active === STAGES.length - 1 && (
              <button
                type="button"
                onClick={() =>
                  document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })
                }
                className="inline-flex items-center gap-2 px-5 py-3 rounded-2xl bg-gold-400 text-[#1a1c22] font-semibold text-sm hover:brightness-105 transition"
              >
                See it in the projects →
              </button>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default BuildProcess;
