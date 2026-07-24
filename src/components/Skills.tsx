import React from 'react';
import { Code2, Cpu, Bot, Wrench, Layers } from 'lucide-react';
import { ScrollAnimation } from './ScrollAnimations';

interface SkillGroup {
  icon: React.ReactNode;
  title: string;
  featured?: boolean;
  skills: string[];
}

const Skills: React.FC = () => {
  const groups: SkillGroup[] = [
    {
      icon: <Bot className="w-6 h-6" />,
      title: 'AI / ML / LLMs',
      featured: true,
      skills: [
        'LangChain', 'LangGraph', 'RAG Pipelines', 'FAISS', 'Vector DBs',
        'Hugging Face', 'Ollama', 'Claude API', 'Gemini API', 'OpenAI API',
        'LLaMA-3', 'ReAct Agents', 'Prompt Engineering', 'TensorFlow', 'Keras',
        'Scikit-learn', 'NLTK', 'OpenCV',
      ],
    },
    {
      icon: <Code2 className="w-6 h-6" />,
      title: 'Languages',
      skills: ['Python', 'SQL', 'JavaScript', 'HTML', 'CSS'],
    },
    {
      icon: <Layers className="w-6 h-6" />,
      title: 'Backend & Systems',
      skills: [
        'FastAPI', 'REST APIs', 'Streamlit', 'MCP', 'Microservices',
        'MySQL', 'PostgreSQL', 'Docker', 'Git',
      ],
    },
    {
      icon: <Cpu className="w-6 h-6" />,
      title: 'CS Fundamentals',
      skills: ['DSA', 'OOP', 'DBMS', 'Operating Systems', 'Computer Networks'],
    },
    {
      icon: <Wrench className="w-6 h-6" />,
      title: 'Tools & Analytics',
      skills: ['Jupyter', 'VS Code', 'Pandas', 'NumPy', 'Tableau', 'Power BI'],
    },
  ];

  return (
    <section id="skills" data-theme="ivory" className="py-24 relative overflow-hidden">
      <div className="scroll-word" aria-hidden="true">STACK</div>
      <div className="container mx-auto px-6 lg:px-10 relative z-10">
        <ScrollAnimation animationType="fadeUp">
          <div className="max-w-2xl mb-16">
            <p className="font-mono text-sm gold-text mb-3">03 / toolkit</p>
            <h2 className="font-display text-4xl md:text-5xl font-bold text-white mb-4">
              The stack I build with
            </h2>
            <p className="text-gray-400 leading-relaxed">
              A working toolkit, not a wish list. Everything here has shipped in a project,
              internship, or a late-night build.
            </p>
          </div>
        </ScrollAnimation>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 auto-rows-fr">
          {groups.map((group, index) => (
            <ScrollAnimation
              key={group.title}
              animationType="fadeUp"
              delay={index * 100}
              className={group.featured ? 'md:col-span-2 lg:row-span-2' : ''}
            >
              <div className="neu-raised rounded-3xl p-8 h-full flex flex-col">
                <div className="flex items-center gap-4 mb-6">
                  <div
                    className={`w-12 h-12 rounded-2xl neu-inset flex items-center justify-center ${
                      group.featured ? 'gold-text' : 'text-teal-400'
                    }`}
                  >
                    {group.icon}
                  </div>
                  <h3 className="font-display text-xl font-semibold text-white">{group.title}</h3>
                  {group.featured && (
                    <span className="ml-auto font-mono text-xs px-3 py-1 rounded-full neu-inset gold-text">
                      core focus
                    </span>
                  )}
                </div>

                <div className="flex flex-wrap gap-2.5">
                  {group.skills.map((skill) => (
                    <span
                      key={skill}
                      className={`px-4 py-2 rounded-xl neu-interactive text-sm cursor-default ${
                        group.featured ? 'text-gray-200' : 'text-gray-300'
                      }`}
                    >
                      {skill}
                    </span>
                  ))}
                </div>

                {group.featured && (
                  <p className="text-gray-500 text-sm mt-auto pt-6 leading-relaxed">
                    From retrieval-augmented generation to autonomous agents. This is where I spend
                    most of my time.
                  </p>
                )}
              </div>
            </ScrollAnimation>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Skills;
