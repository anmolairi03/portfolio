import React, { useEffect, useState } from 'react';
import { Github, Linkedin, Mail, Code2, ArrowRight, MapPin } from 'lucide-react';
import ThreeAvatar from './ThreeAvatar';

const Hero: React.FC = () => {
  const [mousePosition, setMousePosition] = useState({ x: 50, y: 50 });
  const [isLoaded, setIsLoaded] = useState(false);
  const [roleIndex, setRoleIndex] = useState(0);

  const roles = ['LLM Applications', 'RAG Pipelines', 'FastAPI Backends', 'ReAct Agents'];

  useEffect(() => {
    setIsLoaded(true);

    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth) * 100,
        y: (e.clientY / window.innerHeight) * 100,
      });
    };

    window.addEventListener('mousemove', handleMouseMove);
    const roleTimer = setInterval(() => {
      setRoleIndex((i) => (i + 1) % roles.length);
    }, 2200);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      clearInterval(roleTimer);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const stats = [
    { value: '616+', label: 'LeetCode solved' },
    { value: '2', label: 'AI internships' },
    { value: "MAIT '26", label: 'CSE graduate' },
  ];

  const socials = [
    { href: 'https://github.com/anmolairi03/', icon: Github, label: 'GitHub' },
    { href: 'http://www.linkedin.com/in/anmol809', icon: Linkedin, label: 'LinkedIn' },
    { href: 'https://leetcode.com/u/zeus408809/', icon: Code2, label: 'LeetCode' },
    { href: 'mailto:anmolandanay@gmail.com', icon: Mail, label: 'Email' },
  ];

  return (
    <section
      id="hero"
      data-theme="core"
      className="min-h-screen flex items-center relative overflow-hidden pt-28 pb-16"
    >
      <div className="scroll-word" aria-hidden="true">SHIP</div>
      {/* Subtle gold spotlight following the cursor */}
      <div
        className="pointer-events-none absolute inset-0 opacity-40 transition-opacity duration-500"
        style={{
          background: `radial-gradient(600px circle at ${mousePosition.x}% ${mousePosition.y}%, rgba(233, 172, 63, 0.08), transparent 45%)`,
        }}
      />
      {/* Faint dot grid texture */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage: 'radial-gradient(#ffffff 1px, transparent 1px)',
          backgroundSize: '28px 28px',
        }}
      />

      <div className="container mx-auto px-6 lg:px-10 relative z-10">
        <div className="grid lg:grid-cols-[1.1fr_0.9fr] gap-12 items-center">
          {/* Left: copy */}
          <div className="text-left">
            <div
              className={`inline-flex items-center gap-2 px-4 py-2 rounded-full neu-inset text-sm text-gray-400 mb-8 transition-all duration-700 ${
                isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
              }`}
            >
              <MapPin className="w-4 h-4 gold-text" />
              New Delhi, India
              <span className="w-1.5 h-1.5 rounded-full bg-teal-400 animate-gold-pulse ml-1" />
              <span className="text-gray-500">Open to roles</span>
            </div>

            <p
              className={`font-mono text-sm gold-text mb-4 transition-all duration-700 delay-100 ${
                isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
              }`}
            >
              &gt; hi, I&apos;m
            </p>

            <h1
              className={`font-display text-6xl md:text-8xl font-bold text-white leading-[0.95] mb-6 transition-all duration-700 delay-200 ${
                isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
              }`}
            >
              Anmol
              <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-gold-300 via-gold-500 to-gold-600">
                Airi
              </span>
            </h1>

            <h2
              className={`text-2xl md:text-3xl text-gray-200 font-medium mb-6 h-10 transition-all duration-700 delay-300 ${
                isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
              }`}
            >
              I build{' '}
              <span key={roleIndex} className="gold-text inline-block animate-[fadeIn_0.5s_ease]">
                {roles[roleIndex]}
              </span>
            </h2>

            <p
              className={`text-gray-400 text-lg leading-relaxed max-w-xl mb-10 transition-all duration-700 delay-[400ms] ${
                isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
              }`}
            >
              CSE graduate specializing in <span className="text-gray-200">applied AI</span>:
              shipping LLM apps, RAG pipelines, and Python/FastAPI backends across two internships.
              I bring the discipline of a national-level athlete to every line of code.
              <span className="block mt-3 text-sm text-gray-500">
                Curious how I actually build these systems?{' '}
                <button
                  type="button"
                  onClick={() => document.getElementById('process')?.scrollIntoView({ behavior: 'smooth' })}
                  className="gold-text underline underline-offset-4 hover:text-gold-300"
                >
                  Walk through my process ↓
                </button>
              </span>
            </p>

            {/* CTAs */}
            <div
              className={`flex flex-wrap gap-4 mb-12 transition-all duration-700 delay-500 ${
                isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
              }`}
            >
              <button
                onClick={() => document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })}
                className="group neu-interactive px-7 py-4 rounded-2xl font-semibold text-ink-base bg-gradient-to-r from-gold-400 to-gold-500 flex items-center gap-2"
                style={{ boxShadow: '6px 6px 12px #191b21, -6px -6px 12px #2d313b' }}
              >
                View my work
                <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
              </button>
              <button
                onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
                className="neu-interactive px-7 py-4 rounded-2xl font-semibold text-gray-200 flex items-center gap-2"
              >
                <Mail className="w-5 h-5 gold-text" />
                Get in touch
              </button>
            </div>

            {/* Stats + socials */}
            <div
              className={`flex flex-wrap items-center gap-8 transition-all duration-700 delay-[600ms] ${
                isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
              }`}
            >
              <div className="flex gap-6">
                {stats.map((s) => (
                  <div key={s.label}>
                    <div className="font-display text-2xl font-bold text-white">{s.value}</div>
                    <div className="text-xs text-gray-500">{s.label}</div>
                  </div>
                ))}
              </div>
              <div className="flex gap-3">
                {socials.map((s) => (
                  <a
                    key={s.label}
                    href={s.href}
                    target="_blank"
                    rel="noreferrer"
                    aria-label={s.label}
                    className="neu-interactive w-11 h-11 rounded-xl flex items-center justify-center text-gray-400 hover:text-gold-400"
                  >
                    <s.icon size={18} />
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Right: avatar in a neumorphic well */}
          <div className="relative flex justify-center items-center">
            <div
              className={`relative rounded-full p-6 neu-inset transition-all duration-1000 ${
                isLoaded ? 'opacity-100 scale-100' : 'opacity-0 scale-90'
              }`}
            >
              <ThreeAvatar mousePosition={mousePosition} onWave={() => {}} />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
