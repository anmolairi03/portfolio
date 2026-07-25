import React from 'react';
import { Rocket, Compass, Wrench } from 'lucide-react';
import { STORY_CHAPTERS } from '../story/chapters';
import { ScrollAnimation } from './ScrollAnimations';
import TravelScrollWord from './TravelScrollWord';

const meta = STORY_CHAPTERS[7];

const exploring = [
  {
    title: 'Deeper agent tooling',
    body: 'Pushing MCP further: more reliable tool loops, clearer failure modes, less brittle auth.',
    Icon: Wrench,
  },
  {
    title: 'Retrieval that stays honest',
    body: 'Better chunking, evaluation, and grounding so DocuChat-style systems answer from evidence.',
    Icon: Compass,
  },
  {
    title: 'Production shape',
    body: 'FastAPI services, Dockerized pipelines, and interfaces a teammate can run without me.',
    Icon: Rocket,
  },
];

const Now: React.FC = () => {
  return (
    <section id="now" data-theme="sand" className="py-24 md:py-32 relative overflow-hidden">
      <TravelScrollWord word={meta.word} />

      <div className="container mx-auto px-6 lg:px-10 relative z-10">
        <div className="grid lg:grid-cols-[1.1fr_0.9fr] gap-12 lg:gap-16 items-center">
          <div>
            <ScrollAnimation animationType="bounceLeft">
              <p className="font-mono text-sm gold-text mb-3">{meta.eyebrow}</p>
              <h2 className="font-display text-4xl sm:text-5xl md:text-6xl font-bold text-white leading-[0.95] mb-5">
                The story is
                <br />
                <span className="gold-text">still being written.</span>
              </h2>
              <p className="text-gray-400 text-lg leading-relaxed max-w-xl mb-10">
                Past is what shipped. Present is what I am tightening. Future is the next system
                that has to earn its keep.
              </p>
            </ScrollAnimation>

            <div className="space-y-6">
              {exploring.map((item, i) => (
                <ScrollAnimation
                  key={item.title}
                  animationType={i % 2 === 0 ? 'bounceLeft' : 'bounceRight'}
                  delay={i * 70}
                >
                  <div className="flex gap-4 items-start pl-1">
                    <span className="w-11 h-11 rounded-xl neu-inset flex items-center justify-center gold-text shrink-0">
                      <item.Icon className="w-5 h-5" strokeWidth={1.75} />
                    </span>
                    <div>
                      <h3 className="font-display text-xl text-white mb-1">{item.title}</h3>
                      <p className="text-gray-400 leading-relaxed">{item.body}</p>
                    </div>
                  </div>
                </ScrollAnimation>
              ))}
            </div>

            <ScrollAnimation animationType="bounceRight" delay={200}>
              <div className="mt-12 flex flex-wrap gap-8 font-mono text-xs tracking-wide text-gray-500">
                <div>
                  <p className="text-gray-600 mb-1">Past</p>
                  <p className="text-gray-300">Internships · DocuChat · MCP</p>
                </div>
                <div>
                  <p className="gold-text mb-1">Present</p>
                  <p className="text-gray-300">Agents · retrieval · ship craft</p>
                </div>
                <div>
                  <p className="text-gray-600 mb-1">Future</p>
                  <p className="text-gray-300">The next product worth building</p>
                </div>
              </div>
            </ScrollAnimation>
          </div>

          <ScrollAnimation animationType="bounceRight">
            <div className="relative max-w-md mx-auto">
              <div className="relative rounded-[2rem] neu-inset p-4 overflow-hidden">
                <img
                  src="/story/clay-05-agent.webp"
                  alt="Claymorphic builder orchestrating agent tools"
                  width={900}
                  height={900}
                  loading="lazy"
                  decoding="async"
                  className="w-full object-contain"
                />
                <div className="absolute top-5 left-5 w-12 h-12 rounded-2xl bg-[#be332b] text-[#fff8e8] flex items-center justify-center shadow-lg">
                  <Rocket className="w-6 h-6" />
                </div>
                <div className="absolute bottom-6 right-6 w-11 h-11 rounded-full bg-[#e9ac3f] text-[#23262e] flex items-center justify-center shadow-lg">
                  <Compass className="w-5 h-5" />
                </div>
              </div>
              <p className="mt-4 text-center font-mono text-[10px] tracking-[0.2em] text-gray-600">
                OPEN CHAPTER · AGENTS IN MOTION
              </p>
            </div>
          </ScrollAnimation>
        </div>
      </div>
    </section>
  );
};

export default Now;
