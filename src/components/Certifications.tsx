import React from 'react';
import { Award, BarChart3, Cloud, Brain } from 'lucide-react';
import { ScrollAnimation } from './ScrollAnimations';

interface Cert {
  title: string;
  issuer: string;
  description: string;
  skills: string[];
  icon: React.ReactNode;
}

const Certifications: React.FC = () => {
  const certifications: Cert[] = [
    {
      title: 'Oracle Analytics Cloud 2025 Professional',
      issuer: 'Oracle',
      description:
        'Cloud data visualization, ML model deployment, and data modeling on Oracle Analytics Cloud.',
      skills: ['Data Viz', 'ML Deployment', 'Data Modeling'],
      icon: <BarChart3 className="w-7 h-7" />,
    },
    {
      title: 'Oracle Cloud Infrastructure 2025 AI Associate',
      issuer: 'Oracle',
      description:
        'OCI AI/ML portfolio with a focus on Generative AI and LLM infrastructure.',
      skills: ['OCI', 'Generative AI', 'LLM Infra'],
      icon: <Cloud className="w-7 h-7" />,
    },
    {
      title: 'Machine Learning Specialization',
      issuer: 'Coursera · Andrew Ng',
      description:
        'Supervised and unsupervised learning, and neural networks. The fundamentals, done properly.',
      skills: ['Supervised', 'Unsupervised', 'Neural Networks'],
      icon: <Brain className="w-7 h-7" />,
    },
  ];

  return (
    <section id="certifications" data-theme="core" className="py-24 relative overflow-hidden">
      <div className="scroll-word" aria-hidden="true">PROOF</div>
      <div className="container mx-auto px-6 lg:px-10 relative z-10">
        <ScrollAnimation animationType="fadeUp">
          <div className="max-w-2xl mb-16">
            <p className="font-mono text-sm gold-text mb-3">06 / credentials</p>
            <h2 className="font-display text-4xl md:text-5xl font-bold text-white mb-4">
              Certifications
            </h2>
            <p className="text-gray-400 leading-relaxed">
              Formal proof of the fundamentals: cloud, analytics, and machine learning.
            </p>
          </div>
        </ScrollAnimation>

        <div className="grid md:grid-cols-3 gap-8">
          {certifications.map((cert, index) => (
            <ScrollAnimation key={cert.title} animationType="fadeUp" delay={index * 120}>
              <div className="neu-raised rounded-3xl p-8 h-full flex flex-col group">
                <div className="w-16 h-16 rounded-2xl neu-inset flex items-center justify-center gold-text mb-6 group-hover:shadow-gold-glow transition-shadow duration-300">
                  {cert.icon}
                </div>

                <h3 className="font-display text-lg font-semibold text-white mb-2 leading-snug">
                  {cert.title}
                </h3>
                <p className="gold-text text-sm font-mono mb-4">{cert.issuer}</p>
                <p className="text-gray-400 text-sm leading-relaxed mb-6 flex-1">
                  {cert.description}
                </p>

                <div className="flex flex-wrap gap-2">
                  {cert.skills.map((s) => (
                    <span key={s} className="px-3 py-1.5 rounded-lg neu-inset text-xs text-gray-300">
                      {s}
                    </span>
                  ))}
                </div>
              </div>
            </ScrollAnimation>
          ))}
        </div>

        <ScrollAnimation animationType="fadeUp" delay={300}>
          <div className="flex items-center justify-center gap-3 mt-14 text-gray-500 text-sm">
            <Award className="w-5 h-5 gold-text" />
            Always adding to the shelf. Currently deepening LLM & agent tooling.
          </div>
        </ScrollAnimation>
      </div>
    </section>
  );
};

export default Certifications;
