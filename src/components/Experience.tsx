import React from 'react';
import { chapterById } from '../story/chapters';
import { ScrollAnimation } from './ScrollAnimations';
import TravelScrollWord from './TravelScrollWord';
import ClayBlobs from './ClayBlobs';

const meta = chapterById('experience');

interface GrowthRun {
  company: string;
  role: string;
  period: string;
  stages: string;
  before: string;
  during: string;
  after: string;
  stack: string[];
}

const runs: GrowthRun[] = [
  {
    company: 'Tamizhan Skills RISE',
    role: 'Data Science Intern',
    period: 'Jun to Jul 2025',
    stages: 'Intake → Shape → Ship',
    before: 'I knew classroom models. Homework lived in notebooks.',
    during:
      'I architected eight end-to-end predictive pipelines across sectors with Python, Pandas, and Scikit-learn, plus an academic KPI dashboard.',
    after: '90%+ average accuracy. Homework became product. Measurement entered the loop.',
    stack: ['Python', 'Pandas', 'Scikit-learn', 'EDA', 'Dashboards'],
  },
  {
    company: 'Ethara.ai',
    role: 'Data & AI Intern',
    period: 'Feb to May 2026',
    stages: 'Shape → Ship',
    before: 'Geospatial evaluation was still manual. Reporting was slow.',
    during:
      'I engineered an automated Python + Pandas/NumPy pipeline for geospatial mapping and a Streamlit microservice with PDF compliance reporting.',
    after: '80%+ less processing time. 3× reporting efficiency. Manual evaluation gone.',
    stack: ['Python', 'Pandas', 'NumPy', 'Streamlit', 'Matplotlib', 'FPDF2'],
  },
];

const certs = [
  {
    title: 'Oracle Analytics Cloud 2025 Professional',
    issuer: 'Oracle',
    focus: 'Viz · ML deploy · modeling',
  },
  {
    title: 'OCI 2025 AI Associate',
    issuer: 'Oracle',
    focus: 'Generative AI · LLM infra',
  },
  {
    title: 'Machine Learning Specialization',
    issuer: 'Coursera · Andrew Ng',
    focus: 'Supervised · Unsupervised · NNs',
  },
];

const Experience: React.FC = () => {
  return (
    <section id="experience" data-theme="red" className="py-24 md:py-32 relative overflow-hidden">
      <TravelScrollWord word={meta.word} />

      {/* Claymorphic grid + throwable blobs */}
      <div className="clay-grid" aria-hidden="true">
        <div className="clay-grid__lines" />
      </div>
      <ClayBlobs />
      <p className="clay-blobs__hint font-mono text-[10px] tracking-[0.16em] uppercase">
        Drag a blob · fling to throw
      </p>

      <div className="container mx-auto px-6 lg:px-10 relative z-10">
        <ScrollAnimation animationType="bounceLeft">
          <div className="max-w-3xl mb-14 md:mb-20">
            <p className="font-mono text-sm gold-text mb-3">{meta.eyebrow}</p>
            <h2 className="font-display text-4xl sm:text-5xl md:text-6xl font-bold text-white leading-[0.95] mb-4">
              Internships that
              <br />
              <span className="gold-text">moved the numbers.</span>
            </h2>
            <p className="text-gray-400 text-lg leading-relaxed">
              Before, during, after. Real constraints, measured outcomes.
            </p>
          </div>
        </ScrollAnimation>

        <div className="space-y-16 md:space-y-24 max-w-4xl">
          {runs.map((run, i) => (
            <ScrollAnimation
              key={run.company}
              animationType="bounceLeft"
              delay={i * 80}
            >
              <article className="proof-card">
                <div className="flex flex-wrap items-baseline gap-x-4 gap-y-2 mb-6">
                  <h3 className="font-display text-2xl sm:text-3xl font-bold text-white">
                    {run.company}
                  </h3>
                  <span className="font-mono text-xs text-gray-500">{run.period}</span>
                </div>
                <p className="gold-text font-medium mb-2">{run.role}</p>
                <p className="font-mono text-[11px] tracking-[0.16em] uppercase text-gray-500 mb-8">
                  {run.stages}
                </p>

                <div className="grid md:grid-cols-3 gap-6 md:gap-8 mb-8">
                  <div>
                    <p className="font-mono text-[10px] tracking-[0.2em] uppercase text-gray-600 mb-2">
                      Before
                    </p>
                    <p className="text-gray-400 leading-relaxed">{run.before}</p>
                  </div>
                  <div>
                    <p className="font-mono text-[10px] tracking-[0.2em] uppercase gold-text mb-2">
                      During
                    </p>
                    <p className="text-gray-300 leading-relaxed">{run.during}</p>
                  </div>
                  <div>
                    <p className="font-mono text-[10px] tracking-[0.2em] uppercase text-gray-600 mb-2">
                      After
                    </p>
                    <p className="text-gray-400 leading-relaxed">{run.after}</p>
                  </div>
                </div>

                <div className="flex flex-wrap gap-2">
                  {run.stack.map((s) => (
                    <span
                      key={s}
                      className="px-3 py-1.5 rounded-xl neu-inset text-xs font-mono text-gray-300"
                    >
                      {s}
                    </span>
                  ))}
                </div>
              </article>
            </ScrollAnimation>
          ))}
        </div>

        <ScrollAnimation animationType="bounceLeft" delay={120}>
          <div className="mt-20 pt-12 border-t border-white/10 max-w-4xl">
            <p className="font-mono text-[11px] tracking-[0.18em] uppercase text-gray-500 mb-3">
              Calibrated instruments
            </p>
            <h3 className="font-display text-2xl text-white mb-8">Formal proof after field proof</h3>
            <ul className="space-y-5">
              {certs.map((c) => (
                <li
                  key={c.title}
                  className="flex flex-col sm:flex-row sm:items-baseline gap-1 sm:gap-6"
                >
                  <span className="font-mono text-xs gold-text shrink-0 sm:w-36">{c.issuer}</span>
                  <div>
                    <p className="text-white font-medium">{c.title}</p>
                    <p className="text-sm text-gray-500">{c.focus}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </ScrollAnimation>
      </div>
    </section>
  );
};

export default Experience;
