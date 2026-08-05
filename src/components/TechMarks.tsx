import React from 'react';
import {
  FileSearch,
  Binary,
  Sparkles,
  Workflow,
  Bot,
  Boxes,
  Braces,
  Database,
  Network,
  Cpu,
  Code2,
  Layers,
  Link2,
  Container,
  type LucideIcon,
} from 'lucide-react';

const TECH_ICONS: Record<string, LucideIcon> = {
  rag: FileSearch,
  faiss: Binary,
  'hugging face': Layers,
  gemini: Sparkles,
  'gemini 2.5 flash': Sparkles,
  'gemini api': Sparkles,
  langchain: Workflow,
  langgraph: Network,
  streamlit: Boxes,
  mcp: Bot,
  asyncio: Cpu,
  python: Code2,
  pandas: Database,
  numpy: Binary,
  fastapi: Braces,
  postgresql: Database,
  redis: Database,
  docker: Container,
  pydantic: Braces,
  default: Boxes,
};

export function techIcon(name: string): LucideIcon {
  const key = name.toLowerCase();
  for (const [k, icon] of Object.entries(TECH_ICONS)) {
    if (key.includes(k)) return icon;
  }
  return TECH_ICONS.default;
}

export const TechMark: React.FC<{ name: string; className?: string }> = ({
  name,
  className = 'w-5 h-5',
}) => {
  const Icon = techIcon(name);
  return <Icon className={className} strokeWidth={1.75} aria-hidden />;
};

/** Big project identity using Lucide symbols */
export const ProjectSymbol: React.FC<{
  project: 'docuchat' | 'mcp-agent' | 'url-shortener';
  className?: string;
}> = ({ project, className = '' }) => {
  if (project === 'url-shortener') {
    return (
      <div className={`relative flex items-center justify-center ${className}`}>
        <div className="absolute w-40 h-40 rounded-full bg-gold-400/15 blur-2xl" />
        <Link2 className="w-28 h-28 sm:w-36 sm:h-36 gold-text relative z-10" strokeWidth={1.25} />
        <Database className="absolute bottom-8 right-10 w-12 h-12 text-gray-500 opacity-70" strokeWidth={1.5} />
        <Container className="absolute top-10 left-12 w-10 h-10 gold-text opacity-80" strokeWidth={1.5} />
      </div>
    );
  }

  if (project === 'docuchat') {
    return (
      <div className={`relative flex items-center justify-center ${className}`}>
        <div className="absolute w-40 h-40 rounded-full bg-gold-400/15 blur-2xl" />
        <FileSearch className="w-28 h-28 sm:w-36 sm:h-36 gold-text relative z-10" strokeWidth={1.25} />
        <Binary className="absolute bottom-8 right-10 w-12 h-12 text-gray-500 opacity-70" strokeWidth={1.5} />
        <Sparkles className="absolute top-10 left-12 w-10 h-10 gold-text opacity-80" strokeWidth={1.5} />
      </div>
    );
  }

  return (
    <div className={`relative flex items-center justify-center ${className}`}>
      <div className="absolute w-40 h-40 rounded-full bg-gold-400/15 blur-2xl" />
      <Bot className="w-28 h-28 sm:w-36 sm:h-36 gold-text relative z-10" strokeWidth={1.25} />
      <Network className="absolute bottom-8 left-10 w-12 h-12 text-gray-500 opacity-70" strokeWidth={1.5} />
      <Workflow className="absolute top-10 right-12 w-10 h-10 gold-text opacity-80" strokeWidth={1.5} />
    </div>
  );
};
