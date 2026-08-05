import React from 'react';
import {
  Code2,
  Server,
  Brain,
  Sparkles,
  Wrench,
  type LucideIcon,
} from 'lucide-react';
import { chapterById } from '../story/chapters';
import { ScrollAnimation } from './ScrollAnimations';
import { TechMark } from './TechMarks';
import TravelScrollWord from './TravelScrollWord';

const meta = chapterById('skills');

const groups: { label: string; items: string[]; Icon: LucideIcon }[] = [
  {
    label: 'Languages',
    items: ['Python', 'SQL', 'JavaScript', 'HTML', 'CSS'],
    Icon: Code2,
  },
  {
    label: 'CS Fundamentals',
    items: [
      'Data Structures & Algorithms',
      'OOP',
      'DBMS',
      'Operating Systems',
      'Computer Networks',
    ],
    Icon: Brain,
  },
  {
    label: 'Backend & Systems',
    items: [
      'FastAPI',
      'REST APIs',
      'Streamlit',
      'Model Context Protocol (MCP)',
      'MySQL',
      'PostgreSQL',
      'Redis',
      'Docker',
      'Git',
      'Microservices Architecture',
    ],
    Icon: Server,
  },
  {
    label: 'AI / ML / LLMs',
    items: [
      'LangChain',
      'LangGraph',
      'Hugging Face',
      'Ollama',
      'Claude API',
      'Gemini API',
      'OpenAI API',
      'LLaMA-3',
      'RAG Pipelines',
      'FAISS',
      'Vector Databases',
      'TensorFlow',
      'Keras',
      'Scikit-learn',
      'NLTK',
      'OpenCV',
      'Prompt Engineering',
      'ReAct Agents',
    ],
    Icon: Sparkles,
  },
  {
    label: 'Tools',
    items: ['Jupyter', 'VS Code', 'Tableau', 'Power BI', 'Pandas', 'NumPy'],
    Icon: Wrench,
  },
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
              What I work
              <br />
              <span className="text-gray-500">with every day.</span>
            </h2>
            <p className="text-gray-400 text-lg leading-relaxed max-w-xl">
              Languages, fundamentals, backend systems, AI tooling, and the stack I use to ship.
            </p>
          </div>
        </ScrollAnimation>

        <div className="grid md:grid-cols-2 gap-5 max-w-5xl">
          {groups.map((group, i) => (
            <ScrollAnimation
              key={group.label}
              animationType={i % 2 === 0 ? 'bounceLeft' : 'bounceRight'}
              delay={i * 70}
              className={i === groups.length - 1 && groups.length % 2 === 1 ? 'md:col-span-2' : undefined}
            >
              <div className="tools-card h-full">
                <div className="flex items-start gap-4 mb-4">
                  <span className="w-12 h-12 rounded-2xl neu-inset flex items-center justify-center gold-text shrink-0">
                    <group.Icon className="w-6 h-6" strokeWidth={1.75} />
                  </span>
                  <h3 className="font-display text-xl font-bold text-white pt-2">{group.label}</h3>
                </div>
                <div className="flex flex-wrap gap-2">
                  {group.items.map((s) => (
                    <span
                      key={s}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-mono text-gray-200 border border-white/10 bg-white/5"
                    >
                      <TechMark name={s} className="w-3.5 h-3.5 gold-text" />
                      {s}
                    </span>
                  ))}
                </div>
              </div>
            </ScrollAnimation>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Skills;
