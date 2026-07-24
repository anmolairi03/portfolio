import React from 'react';
import { Github, ArrowUpRight, FileSearch, Workflow, Zap } from 'lucide-react';
import { ScrollAnimation } from './ScrollAnimations';

interface Project {
  index: string;
  title: string;
  tagline: string;
  icon: React.ReactNode;
  description: string;
  highlights: string[];
  stack: string[];
  github: string;
}

const Projects: React.FC = () => {
  const projects: Project[] = [
    {
      index: 'P.01',
      title: 'DocuChat',
      tagline: 'RAG-powered document Q&A',
      icon: <FileSearch className="w-7 h-7" />,
      description:
        'A retrieval-augmented generation pipeline that lets you upload a document and have a real, context-aware conversation with it. Grounded answers, not hallucinations.',
      highlights: [
        'Semantic search over uploads with Hugging Face embeddings + a FAISS vector store',
        'Multi-turn, context-aware analysis orchestrated with LangChain + Gemini 2.5 Flash',
        'Interactive Streamlit frontend for real-time PDF upload and querying',
      ],
      stack: ['RAG', 'FAISS', 'Hugging Face', 'Gemini 2.5 Flash', 'LangChain', 'Streamlit'],
      github: 'https://github.com/anmolairi03',
    },
    {
      index: 'P.02',
      title: 'MCP Agent',
      tagline: 'Autonomous AI agent with tool use',
      icon: <Workflow className="w-7 h-7" />,
      description:
        'An autonomous agent that plans, calls external tools, and retrieves live data, built on the Model Context Protocol so it can reach beyond its training data.',
      highlights: [
        'Agent architected with LangGraph + LangChain for reasoning and control flow',
        'MCP servers integrated for real-time external data retrieval',
        'Asynchronous, non-blocking task automation with AsyncIO + secure API auth',
      ],
      stack: ['LangGraph', 'LangChain', 'Gemini API', 'MCP', 'AsyncIO'],
      github: 'https://github.com/anmolairi03',
    },
  ];

  return (
    <section id="projects" data-theme="sand" className="py-24 relative overflow-hidden">
      <div className="scroll-word" aria-hidden="true">BUILD</div>
      <div className="container mx-auto px-6 lg:px-10 relative z-10">
        <ScrollAnimation animationType="fadeUp">
          <div className="max-w-2xl mb-16">
            <p className="font-mono text-sm gold-text mb-3">04 / selected work</p>
            <h2 className="font-display text-5xl md:text-7xl font-bold text-white mb-5 leading-[0.95]">
              Retrieval becomes
              <br />
              <span className="gold-text">reasoning.</span>
            </h2>
            <p className="text-gray-400 leading-relaxed">
              Two systems, one idea: give software useful context, then let it act with intent.
            </p>
          </div>
        </ScrollAnimation>

        <div className="grid lg:grid-cols-2 gap-8">
          {projects.map((project, i) => (
            <ScrollAnimation key={project.title} animationType="fadeUp" delay={i * 150}>
              <div className="neu-raised rounded-3xl p-8 md:p-10 h-full flex flex-col group">
                <div className="flex items-start justify-between mb-6">
                  <div className="w-16 h-16 rounded-2xl neu-inset flex items-center justify-center gold-text">
                    {project.icon}
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="font-mono text-xs text-gray-500">{project.index}</span>
                    <a
                      href={project.github}
                      target="_blank"
                      rel="noreferrer"
                      aria-label={`${project.title} on GitHub`}
                      className="neu-interactive w-11 h-11 rounded-xl flex items-center justify-center text-gray-400 hover:text-gold-400"
                    >
                      <Github size={18} />
                    </a>
                  </div>
                </div>

                <h3 className="font-display text-2xl font-bold text-white mb-1 group-hover:gold-text transition-colors">
                  {project.title}
                </h3>
                <p className="gold-text text-sm font-mono mb-5">{project.tagline}</p>

                <p className="text-gray-400 leading-relaxed mb-6">{project.description}</p>

                <ul className="space-y-3 mb-8">
                  {project.highlights.map((h, hi) => (
                    <li key={hi} className="flex items-start gap-3 text-sm text-gray-300">
                      <Zap className="w-4 h-4 gold-text mt-0.5 shrink-0" />
                      <span>{h}</span>
                    </li>
                  ))}
                </ul>

                <div className="flex flex-wrap gap-2.5 mt-auto">
                  {project.stack.map((s) => (
                    <span
                      key={s}
                      className="px-3.5 py-1.5 rounded-xl neu-inset text-xs font-mono text-gray-300"
                    >
                      {s}
                    </span>
                  ))}
                </div>
              </div>
            </ScrollAnimation>
          ))}
        </div>

        <ScrollAnimation animationType="fadeUp" delay={300}>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-14">
            <p className="text-gray-500 text-sm">More experiments live on my GitHub</p>
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
        </ScrollAnimation>
      </div>
    </section>
  );
};

export default Projects;
