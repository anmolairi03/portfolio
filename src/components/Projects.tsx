import React, { useState } from 'react';
import { Github, ArrowUpRight, ChevronLeft, ChevronRight } from 'lucide-react';
import { chapterById, type StageId } from '../story/chapters';
import { ScrollAnimation } from './ScrollAnimations';
import { ProjectSymbol, TechMark } from './TechMarks';
import TravelScrollWord from './TravelScrollWord';

interface Beat {
  label: string;
  text: string;
}

interface ProjectChapter {
  id: 'docuchat' | 'mcp-agent' | 'url-shortener';
  index: string;
  title: string;
  tagline: string;
  stages: StageId[];
  problem: string;
  beats: Beat[];
  stack: string[];
  why: string;
  github: string;
  theme: 'sand' | 'ivory' | 'red';
}

const PROJECTS: ProjectChapter[] = [
  {
    id: 'url-shortener',
    index: 'Build 01',
    title: 'URL Shortener',
    tagline: 'Shape → Act → Ship',
    stages: ['shape', 'act', 'ship'],
    theme: 'red',
    problem:
      'Long links need a reliable short path: collision-safe codes, fast redirects, and click tracking that does not hammer the database.',
    beats: [
      {
        label: 'The problem',
        text: 'A shortener is not toy CRUD. Codes collide, caches go stale, and every redirect has to stay measurable.',
      },
      {
        label: 'So I built',
        text: 'A full-stack shortener with FastAPI, PostgreSQL, and Redis: collision-safe short codes and Pydantic-validated REST endpoints (POST /shorten, GET /{short_code}).',
      },
      {
        label: 'What broke',
        text: 'Repeat traffic hitting Postgres on every redirect. Without a cache layer, latency and load climbed for no good reason.',
      },
      {
        label: 'What I figured out',
        text: 'Cache-aside Redis with TTL for hot redirects, HTTP 302 so click tracking stays accurate, and Docker Compose with health checks so FastAPI waits on its datastores.',
      },
      {
        label: 'What I learned',
        text: 'System design shows up in the boring path: validation, caching, redirects, and containers that start in the right order.',
      },
    ],
    stack: ['FastAPI', 'PostgreSQL', 'Redis', 'Streamlit', 'Docker', 'Pydantic'],
    why: 'A shortener that ships needs REST, a cache-aside layer, and services that come up healthy together.',
    github: 'https://github.com/anmolairi03',
  },
  {
    id: 'mcp-agent',
    index: 'Build 02',
    title: 'MCP Agent',
    tagline: 'Reason → Act → Ship',
    stages: ['reason', 'act', 'ship'],
    theme: 'ivory',
    problem:
      'A model that can only talk is half a system. I needed an agent that could reach outside its training data.',
    beats: [
      {
        label: 'The problem',
        text: 'Static answers die when the world moves. Tool use was the missing half of the product.',
      },
      {
        label: 'So I built',
        text: 'An autonomous agent on LangGraph and LangChain with Model Context Protocol servers for live retrieval.',
      },
      {
        label: 'What broke',
        text: 'Control flow and auth. Without careful async orchestration, tools stalled or over-called.',
      },
      {
        label: 'What I figured out',
        text: 'Plan, call, observe, repeat. AsyncIO kept the loop non-blocking while MCP kept tools real.',
      },
      {
        label: 'What I learned',
        text: 'Action is the product. Reasoning only matters when it can change something outside the chat.',
      },
    ],
    stack: ['LangGraph', 'LangChain', 'Gemini API', 'MCP', 'AsyncIO'],
    why: 'To give the agent hands I needed MCP, ReAct-style control, and secure API access.',
    github: 'https://github.com/anmolairi03',
  },
  {
    id: 'docuchat',
    index: 'Build 03',
    title: 'DocuChat',
    tagline: 'Index → Reason → Ship',
    stages: ['index', 'reason', 'ship'],
    theme: 'sand',
    problem:
      'Documents were sitting unread. People needed answers grounded in the file, not a confident guess.',
    beats: [
      {
        label: 'The problem',
        text: 'Uploading a PDF and hoping a model remembers it is not a product. Hallucinations were the default.',
      },
      {
        label: 'So I built',
        text: 'A RAG pipeline: Hugging Face embeddings into FAISS, then LangChain and Gemini 2.5 Flash for multi-turn, source-aware chat.',
      },
      {
        label: 'What broke',
        text: 'Context windows and chunk boundaries. Bad splits meant the right passage never arrived.',
      },
      {
        label: 'What I figured out',
        text: 'Retrieval first. Then the answer. Streamlit made the loop usable for someone uploading a real file.',
      },
      {
        label: 'What I learned',
        text: 'Useful AI is less about clever prompts and more about getting the right evidence into the room.',
      },
    ],
    stack: ['RAG', 'FAISS', 'Hugging Face', 'Gemini 2.5 Flash', 'LangChain', 'Streamlit'],
    why: 'To ship DocuChat I needed retrieval infrastructure, not another chat wrapper.',
    github: 'https://github.com/anmolairi03',
  },
];

const meta = chapterById('projects');

const Projects: React.FC = () => {
  return (
    <>
      <section id="projects" data-theme="red" className="pt-24 md:pt-28 relative overflow-hidden">
        <div className="clay-grid" aria-hidden="true">
          <div className="clay-grid__lines" />
        </div>
        <TravelScrollWord word={meta.word} />
        <div className="container mx-auto px-6 lg:px-10 relative z-10 pb-10">
          <ScrollAnimation animationType="bounceLeft">
            <div className="max-w-3xl">
              <p className="font-mono text-sm gold-text mb-3">{meta.eyebrow}</p>
              <h2 className="font-display text-4xl sm:text-5xl md:text-6xl font-bold text-white leading-[0.95] mb-4">
                Projects I&apos;ve
                <br />
                <span className="gold-text">designed and shipped.</span>
              </h2>
              <p className="text-gray-400 text-lg leading-relaxed max-w-2xl">
                Backend systems and AI apps built end to end: the problem, the architecture, what
                failed, and what held. Stacks appear because the work needed them.
              </p>
            </div>
          </ScrollAnimation>
        </div>
      </section>

      <div className="build-taper-rule" data-theme="red" aria-hidden="true">
        <svg viewBox="0 0 200 6" preserveAspectRatio="none" focusable="false">
          <polygon points="0,3 100,0 200,3 100,6" fill="rgba(255, 248, 232, 0.92)" />
        </svg>
      </div>

      {PROJECTS.map((project) => (
        <ProjectSlides key={project.id} project={project} />
      ))}

      <div className="pb-20 px-6 lg:px-10" data-theme="sand">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-center gap-4">
          <p className="text-gray-500 text-sm">More experiments live on GitHub</p>
          <a
            href="https://github.com/anmolairi03"
            target="_blank"
            rel="noreferrer"
            className="neu-interactive px-6 py-3.5 rounded-2xl font-semibold text-gray-200 inline-flex items-center gap-2"
          >
            <Github className="w-5 h-5 gold-text" />
            github.com/anmolairi03
            <ArrowUpRight className="w-4 h-4" />
          </a>
        </div>
      </div>
    </>
  );
};

const ProjectSlides: React.FC<{ project: ProjectChapter }> = ({ project }) => {
  const beats = project.beats;
  const [active, setActive] = useState(0);
  const beat = beats[active];
  const progress = beats.length > 1 ? active / (beats.length - 1) : 0;

  const go = (dir: number) =>
    setActive((i) => Math.min(beats.length - 1, Math.max(0, i + dir)));

  const onKeyNav = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowRight') {
      e.preventDefault();
      go(1);
    } else if (e.key === 'ArrowLeft') {
      e.preventDefault();
      go(-1);
    }
  };

  return (
    <section
      data-theme={project.theme}
      className={`relative py-20 md:py-28 overflow-hidden ${
        project.id === 'url-shortener' ? '' : 'border-t border-white/5'
      }`}
    >
      {project.theme === 'red' && (
        <div className="clay-grid" aria-hidden="true">
          <div className="clay-grid__lines" />
        </div>
      )}
      <div
        className="max-w-6xl mx-auto px-5 sm:px-6 lg:px-10 outline-none relative z-10"
        tabIndex={0}
        role="group"
        aria-roledescription="carousel"
        aria-label={`${project.title} story beats`}
        onKeyDown={onKeyNav}
      >
        <div className="w-full grid lg:grid-cols-[0.95fr_1.05fr] gap-10 lg:gap-16 items-center">
          <div>
            <div className="flex items-center gap-3 mb-4">
              <p className="font-mono text-xs gold-text tracking-wide">{project.index}</p>
              <span className="text-gray-600">·</span>
              <p className="font-mono text-xs text-gray-500">{project.tagline}</p>
            </div>
            <h3 className="font-display text-4xl sm:text-5xl font-bold text-white mb-3">
              {project.title}
            </h3>
            <p className="text-gray-400 leading-relaxed mb-6 max-w-md">{project.problem}</p>

            <div className="flex flex-wrap gap-2 mb-8">
              {project.stages.map((s) => (
                <span
                  key={s}
                  className="px-3 py-1 rounded-full border border-gold-400/30 font-mono text-[10px] tracking-wider uppercase gold-text"
                >
                  {s}
                </span>
              ))}
            </div>

            <div className="flex items-center gap-4 mb-6">
              <button
                type="button"
                onClick={() => go(-1)}
                disabled={active === 0}
                aria-label="Previous beat"
                className="neu-interactive w-11 h-11 rounded-full flex items-center justify-center text-gray-200 disabled:opacity-30 disabled:cursor-not-allowed transition"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>

              <div className="flex gap-2">
                {beats.map((_, i) => (
                  <button
                    key={i}
                    type="button"
                    onClick={() => setActive(i)}
                    aria-label={`Go to beat ${i + 1}`}
                    aria-current={i === active}
                    className={`progress-dot h-1.5 rounded-full transition-all ${
                      i === active ? 'progress-dot--active w-8' : 'w-3'
                    }`}
                  />
                ))}
              </div>

              <button
                type="button"
                onClick={() => go(1)}
                disabled={active === beats.length - 1}
                aria-label="Next beat"
                className="neu-interactive w-11 h-11 rounded-full flex items-center justify-center text-gray-200 disabled:opacity-30 disabled:cursor-not-allowed transition"
              >
                <ChevronRight className="w-5 h-5" />
              </button>

              <span className="font-mono text-[11px] text-gray-500 ml-1">
                {String(active + 1).padStart(2, '0')} / {String(beats.length).padStart(2, '0')}
              </span>
            </div>

            <div className="h-[3px] w-full max-w-xs bg-white/10 rounded-full mb-8">
              <div
                className="h-full bg-gold-400/80 rounded-full transition-[width] duration-300"
                style={{ width: `${((active + 1) / beats.length) * 100}%` }}
              />
            </div>

            <div key={`${project.id}-copy-${active}`} className="project-beat">
              <p className="font-mono text-[11px] tracking-[0.18em] uppercase text-gray-500 mb-3">
                {beat.label}
              </p>
              <p className="text-xl sm:text-2xl text-gray-200 leading-snug font-light max-w-lg min-h-[4.5rem]">
                {beat.text}
              </p>
            </div>

            <div className="mt-8">
              <p className="text-sm text-gray-400 mb-4">{project.why}</p>
              <div className="flex flex-wrap gap-3">
                {project.stack.map((s) => (
                  <div
                    key={s}
                    className="flex items-center gap-2 px-3 py-2 rounded-2xl neu-inset gold-text"
                    title={s}
                  >
                    <TechMark name={s} className="w-7 h-7" />
                    <span className="text-xs font-mono text-gray-300">{s}</span>
                  </div>
                ))}
              </div>
              {active === beats.length - 1 && (
                <a
                  href={project.github}
                  target="_blank"
                  rel="noreferrer"
                  className="mt-5 inline-flex items-center gap-2 font-mono text-xs gold-text tracking-wide"
                >
                  <Github size={14} /> View on GitHub
                </a>
              )}
            </div>
          </div>

          <div
            className="relative aspect-square max-w-md mx-auto w-full"
            style={{
              transform: `scale(${0.9 + progress * 0.1})`,
            }}
          >
            <div className="absolute inset-6 rounded-[2rem] neu-inset flex items-center justify-center p-8">
              <ProjectSymbol project={project.id} className="w-full h-full max-w-[280px]" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Projects;
