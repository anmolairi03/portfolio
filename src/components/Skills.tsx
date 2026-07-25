import React from 'react';
import {
  FileSearch,
  Bot,
  Gauge,
  LineChart,
  Code2,
  Server,
  Brain,
  type LucideIcon,
} from 'lucide-react';
import { STORY_CHAPTERS } from '../story/chapters';
import { ScrollAnimation } from './ScrollAnimations';
import { TechMark } from './TechMarks';
import TravelScrollWord from './TravelScrollWord';

const meta = STORY_CHAPTERS[4];

const links: {
  forProject: string;
  stack: string[];
  note: string;
  jump: string;
  Icon: LucideIcon;
  accent: string;
}[] = [
  {
    forProject: 'DocuChat',
    stack: ['Python', 'FAISS', 'LangChain', 'Gemini'],
    note: 'Retrieval before chat chrome.',
    jump: 'projects',
    Icon: FileSearch,
    accent: '#a83325',
  },
  {
    forProject: 'MCP Agent',
    stack: ['LangGraph', 'MCP', 'Gemini API'],
    note: 'Live tools, not a static prompt.',
    jump: 'projects',
    Icon: Bot,
    accent: '#b4552a',
  },
  {
    forProject: 'Ethara.ai',
    stack: ['Python', 'Pandas', 'Streamlit'],
    note: 'Geospatial pipelines that ship.',
    jump: 'experience',
    Icon: Gauge,
    accent: '#be332b',
  },
  {
    forProject: 'Tamizhan Skills',
    stack: ['Scikit-learn', 'Pandas', 'EDA'],
    note: 'Eight models. Measured accuracy.',
    jump: 'experience',
    Icon: LineChart,
    accent: '#171713',
  },
];

const bench: { label: string; items: string[]; Icon: LucideIcon }[] = [
  { label: 'Languages', items: ['Python', 'SQL', 'JavaScript'], Icon: Code2 },
  { label: 'Systems', items: ['FastAPI', 'PostgreSQL', 'Docker'], Icon: Server },
  { label: 'Fundamentals', items: ['DSA', 'OOP', 'DBMS'], Icon: Brain },
];

const Skills: React.FC = () => {
  return (
    <section id="skills" data-theme="ivory" className="py-24 md:py-32 relative overflow-hidden">
      <TravelScrollWord word={meta.word} />

      <div className="container mx-auto px-6 lg:px-10 relative z-10">
        <ScrollAnimation animationType="bounceLeft">
          <div className="max-w-3xl mb-14 md:mb-16">
            <p className="font-mono text-sm gold-text mb-3">{meta.eyebrow}</p>
            <h2 className="font-display text-4xl sm:text-5xl md:text-6xl font-bold text-white leading-[0.95] mb-4">
              Tools appear when
              <br />
              <span className="text-gray-500">the work demands them.</span>
            </h2>
            <p className="text-gray-400 text-lg leading-relaxed max-w-xl">
              Each kit came from a real build. Tap a row to jump there.
            </p>
          </div>
        </ScrollAnimation>

        <div className="grid md:grid-cols-2 gap-5 max-w-5xl">
          {links.map((link, i) => (
            <ScrollAnimation
              key={link.forProject}
              animationType={i % 2 === 0 ? 'bounceLeft' : 'bounceRight'}
              delay={i * 70}
            >
              <button
                type="button"
                onClick={() =>
                  document.getElementById(link.jump)?.scrollIntoView({ behavior: 'smooth' })
                }
                className="tools-card w-full text-left group"
              >
                <div className="flex items-start gap-4 mb-4">
                  <span
                    className="w-14 h-14 rounded-2xl flex items-center justify-center shrink-0"
                    style={{
                      background: link.accent,
                      color: link.accent === '#171713' ? '#e9e5da' : '#fff8e8',
                      boxShadow: '4px 4px 0 rgba(0,0,0,0.12)',
                    }}
                  >
                    <link.Icon className="w-7 h-7" strokeWidth={1.75} />
                  </span>
                  <div>
                    <h3 className="font-display text-xl font-bold text-white group-hover:gold-text transition-colors">
                      {link.forProject}
                    </h3>
                    <p className="text-sm text-gray-500 mt-1">
                      {link.note} <span className="gold-text">→</span>
                    </p>
                  </div>
                </div>

                <div className="flex flex-wrap gap-2">
                  {link.stack.map((s) => (
                    <span
                      key={s}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-mono text-gray-200 border border-white/10 bg-white/5"
                    >
                      <TechMark name={s} className="w-3.5 h-3.5 gold-text" />
                      {s}
                    </span>
                  ))}
                </div>
              </button>
            </ScrollAnimation>
          ))}
        </div>

        <ScrollAnimation animationType="bounceLeft" delay={160}>
          <div className="mt-16 pt-10 border-t border-white/10 max-w-5xl">
            <p className="font-mono text-[11px] tracking-[0.18em] uppercase text-gray-500 mb-6">
              Always on the bench
            </p>
            <div className="grid sm:grid-cols-3 gap-5">
              {bench.map((b) => (
                <div key={b.label} className="tools-card">
                  <b.Icon className="w-6 h-6 gold-text mb-3" strokeWidth={1.75} />
                  <h3 className="font-display text-lg text-white mb-2">{b.label}</h3>
                  <p className="text-gray-400 text-sm leading-relaxed">{b.items.join(' · ')}</p>
                </div>
              ))}
            </div>
          </div>
        </ScrollAnimation>
      </div>
    </section>
  );
};

export default Skills;
