import React from 'react';
import { GraduationCap, Server, Bot, Trophy, Terminal } from 'lucide-react';
import { ScrollAnimation } from './ScrollAnimations';

const About: React.FC = () => {
  const focusAreas = [
    {
      icon: <Bot className="w-6 h-6" />,
      title: 'LLM & Agents',
      description: 'RAG pipelines, ReAct agents, and MCP tool integrations with LangChain & LangGraph.',
    },
    {
      icon: <Server className="w-6 h-6" />,
      title: 'Backend & Systems',
      description: 'Python/FastAPI services, REST APIs, and microservices backed by Postgres & Docker.',
    },
    {
      icon: <Terminal className="w-6 h-6" />,
      title: 'Data Pipelines',
      description: 'Scalable Pandas/NumPy pipelines and predictive modeling with Scikit-learn.',
    },
    {
      icon: <Trophy className="w-6 h-6" />,
      title: 'Athlete Mindset',
      description: 'National-level discipline: consistency, time management, and grace under pressure.',
    },
  ];

  return (
    <section id="about" data-theme="soft" className="py-24 relative overflow-hidden">
      <div className="scroll-word" aria-hidden="true">WHY</div>
      <div className="container mx-auto px-6 lg:px-10">
        <ScrollAnimation animationType="fadeUp">
          <div className="max-w-2xl mb-16">
            <p className="font-mono text-sm gold-text mb-3">01 / about</p>
            <h2 className="font-display text-4xl md:text-5xl font-bold text-white mb-4">
              Engineer by craft, <br />
              <span className="text-gray-500">athlete by discipline.</span>
            </h2>
          </div>
        </ScrollAnimation>

        <div className="grid lg:grid-cols-[1.1fr_0.9fr] gap-10 items-start">
          {/* Narrative */}
          <ScrollAnimation animationType="fadeLeft">
            <div className="neu-raised rounded-3xl p-8 md:p-10 space-y-5">
              <p className="text-gray-300 leading-relaxed text-lg">
                I&apos;m <span className="text-white font-medium">Anmol Airi</span>, a Computer
                Science graduate from Maharaja Agrasen Institute of Technology (2026). My work sits
                at the intersection of <span className="gold-text">applied AI</span> and
                <span className="gold-text"> backend engineering</span>: from retrieval-augmented
                generation systems to production-facing data pipelines.
              </p>
              <p className="text-gray-400 leading-relaxed">
                Across two internships I&apos;ve shipped real systems: automated geospatial data
                pipelines that cut processing time by 80%+, and eight end-to-end predictive modeling
                pipelines averaging 90%+ accuracy. On my own time, I build LLM apps with LangChain,
                FAISS, and the Gemini/Claude/OpenAI APIs.
              </p>
              <p className="text-gray-400 leading-relaxed">
                Before code, there was competition. As a national-level athlete I learned to show up,
                stay consistent, and perform under pressure. The same habits I bring to shipping
                software and grinding <span className="text-white">616+ LeetCode problems</span>.
              </p>

              <div className="flex flex-wrap gap-3 pt-2">
                {['Python', 'FastAPI', 'LangChain', 'RAG', 'PostgreSQL', 'Docker'].map((t) => (
                  <span
                    key={t}
                    className="px-4 py-2 rounded-xl neu-inset text-sm text-gray-300 font-mono"
                  >
                    {t}
                  </span>
                ))}
              </div>
            </div>
          </ScrollAnimation>

          {/* Education + focus */}
          <ScrollAnimation animationType="fadeRight">
            <div className="space-y-6">
              <div className="neu-raised rounded-3xl p-7">
                <div className="flex items-center gap-4 mb-5">
                  <div className="w-12 h-12 rounded-2xl neu-inset flex items-center justify-center gold-text">
                    <GraduationCap className="w-6 h-6" />
                  </div>
                  <h3 className="font-display text-xl font-semibold text-white">Education</h3>
                </div>
                <h4 className="text-white font-medium">B.Tech, Computer Science & Engineering</h4>
                <p className="text-gray-400 text-sm">Maharaja Agrasen Institute of Technology</p>
                <div className="flex items-center gap-4 mt-2 text-sm">
                  <span className="text-gray-500">2022 – 2026</span>
                  <span className="gold-text font-semibold">CGPA 8.15</span>
                </div>
                <div className="mt-4 pt-4 border-t border-white/5 text-sm text-gray-400">
                  Darshan Academy Public School · XII (92%) · X (92.4%)
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                {focusAreas.map((f, i) => (
                  <ScrollAnimation key={f.title} animationType="scale" delay={i * 80}>
                    <div className="neu-raised-sm rounded-2xl p-5 h-full">
                      <div className="gold-text mb-3">{f.icon}</div>
                      <h4 className="text-white text-sm font-semibold mb-1">{f.title}</h4>
                      <p className="text-gray-500 text-xs leading-relaxed">{f.description}</p>
                    </div>
                  </ScrollAnimation>
                ))}
              </div>
            </div>
          </ScrollAnimation>
        </div>
      </div>
    </section>
  );
};

export default About;
