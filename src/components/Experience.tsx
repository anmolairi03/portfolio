import React from 'react';
import { Calendar, MapPin, Briefcase, Trophy, Zap, Code2 } from 'lucide-react';
import { ScrollAnimation } from './ScrollAnimations';

interface Role {
  title: string;
  company: string;
  period: string;
  location: string;
  achievements: string[];
  stack: string[];
}

const Experience: React.FC = () => {
  const roles: Role[] = [
    {
      title: 'Data & AI Intern',
      company: 'Ethara.ai',
      period: 'Feb 2026 – May 2026',
      location: 'Remote',
      achievements: [
        'Engineered an automated Python app + scalable Pandas/NumPy pipeline for geospatial mapping, eliminating manual evaluation and cutting processing time by 80%+.',
        'Deployed an interactive Streamlit microservice for real-time statistical analysis, paired with automated PDF compliance reporting (Matplotlib, FPDF2). 3x reporting efficiency.',
      ],
      stack: ['Python', 'Pandas', 'NumPy', 'Streamlit', 'Matplotlib', 'FPDF2'],
    },
    {
      title: 'Data Science Intern',
      company: 'Tamizhan Skills RISE',
      period: 'Jun 2025 – Jul 2025',
      location: 'Remote',
      achievements: [
        'Architected and deployed 8 end-to-end predictive modeling pipelines across sectors using Python, Pandas, and Scikit-learn, achieving 90%+ average accuracy.',
        'Built an interactive academic analytics dashboard to visualize KPIs, accelerating data-driven decisions on complex datasets.',
      ],
      stack: ['Python', 'Pandas', 'Scikit-learn', 'EDA', 'KPI Dashboards'],
    },
  ];

  const stats = [
    { value: '80%+', label: 'Faster pipelines', icon: <Zap className="w-5 h-5" /> },
    { value: '90%+', label: 'Model accuracy', icon: <Briefcase className="w-5 h-5" /> },
    { value: '616+', label: 'LeetCode solved', icon: <Code2 className="w-5 h-5" /> },
    { value: 'Nat’l', label: 'Level athlete', icon: <Trophy className="w-5 h-5" /> },
  ];

  const achievements = [
    'National-level athlete: competitive discipline, time management, and consistency under pressure.',
    '616+ problems solved on LeetCode across Arrays, Dynamic Programming, Graphs, Trees, and Strings.',
  ];

  return (
    <section id="experience" data-theme="red" className="py-24 relative overflow-hidden">
      <div className="scroll-word" aria-hidden="true">IMPACT</div>
      <div className="container mx-auto px-6 lg:px-10 relative z-10">
        <ScrollAnimation animationType="fadeUp">
          <div className="max-w-2xl mb-16">
            <p className="font-mono text-sm gold-text mb-3">05 / experience</p>
            <h2 className="font-display text-5xl md:text-7xl font-bold text-white mb-5 leading-[0.95]">
              Less manual work.
              <br />
              <span className="gold-text">More momentum.</span>
            </h2>
          </div>
        </ScrollAnimation>

        {/* Stat band */}
        <ScrollAnimation animationType="fadeUp" delay={100}>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-5 mb-16">
            {stats.map((s, i) => (
              <ScrollAnimation key={s.label} animationType="scale" delay={i * 80}>
                <div className="neu-raised rounded-2xl p-6 text-center">
                  <div className="w-11 h-11 rounded-xl neu-inset flex items-center justify-center gold-text mx-auto mb-3">
                    {s.icon}
                  </div>
                  <div className="font-display text-2xl font-bold text-white">{s.value}</div>
                  <div className="text-xs text-gray-500 mt-1">{s.label}</div>
                </div>
              </ScrollAnimation>
            ))}
          </div>
        </ScrollAnimation>

        {/* Internships */}
        <div className="grid lg:grid-cols-2 gap-8 mb-14">
          {roles.map((role, i) => (
            <ScrollAnimation key={role.company} animationType="fadeUp" delay={i * 150}>
              <div className="neu-raised rounded-3xl p-8 md:p-10 h-full flex flex-col">
                <div className="flex items-start justify-between mb-6">
                  <div className="w-14 h-14 rounded-2xl neu-inset flex items-center justify-center gold-text">
                    <Briefcase className="w-6 h-6" />
                  </div>
                  <span className="px-4 py-1.5 rounded-full neu-inset font-mono text-xs text-teal-400">
                    Internship
                  </span>
                </div>

                <h3 className="font-display text-2xl font-bold text-white">{role.title}</h3>
                <p className="gold-text font-medium mb-4">{role.company}</p>

                <div className="flex flex-wrap gap-4 text-sm text-gray-500 mb-6">
                  <span className="flex items-center gap-1.5">
                    <Calendar className="w-4 h-4" /> {role.period}
                  </span>
                  <span className="flex items-center gap-1.5">
                    <MapPin className="w-4 h-4" /> {role.location}
                  </span>
                </div>

                <ul className="space-y-3 mb-8">
                  {role.achievements.map((a, ai) => (
                    <li key={ai} className="flex items-start gap-3 text-sm text-gray-300 leading-relaxed">
                      <Zap className="w-4 h-4 gold-text mt-0.5 shrink-0" />
                      <span>{a}</span>
                    </li>
                  ))}
                </ul>

                <div className="flex flex-wrap gap-2.5 mt-auto">
                  {role.stack.map((s) => (
                    <span key={s} className="px-3.5 py-1.5 rounded-xl neu-inset text-xs font-mono text-gray-300">
                      {s}
                    </span>
                  ))}
                </div>
              </div>
            </ScrollAnimation>
          ))}
        </div>

        {/* Achievements */}
        <ScrollAnimation animationType="fadeUp" delay={200}>
          <div className="neu-raised rounded-3xl p-8 md:p-10">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-12 h-12 rounded-2xl neu-inset flex items-center justify-center gold-text">
                <Trophy className="w-6 h-6" />
              </div>
              <h3 className="font-display text-xl font-semibold text-white">Achievements</h3>
            </div>
            <div className="grid md:grid-cols-2 gap-5">
              {achievements.map((a, i) => (
                <div key={i} className="neu-inset rounded-2xl p-5 text-gray-300 text-sm leading-relaxed">
                  {a}
                </div>
              ))}
            </div>
          </div>
        </ScrollAnimation>
      </div>
    </section>
  );
};

export default Experience;
