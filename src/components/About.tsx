import React from 'react';
import { GraduationCap, Mail, MapPin, Phone } from 'lucide-react';
import { chapterById } from '../story/chapters';
import { SITE_LINKS } from '../story/links';
import { safeHref } from '../hooks/useRoute';
import { ScrollAnimation } from './ScrollAnimations';
import TravelScrollWord from './TravelScrollWord';

const meta = chapterById('about');

const ABOUT_TEXT = `Hi, I'm Anmol Airi, a CSE student at Maharaja Agrasen Institute of Technology (MAIT '26). I build applied AI and backend services with Python, FastAPI, RAG pipelines, and LLM tooling. Before code, national-level athletics taught me consistency under pressure. That same discipline shows up in 600+ LeetCode reps and internships where accuracy and latency were measured, not assumed. Clean interfaces, grounded answers, and systems that hold in production.`;

const About: React.FC = () => {
  return (
    <section id="about" data-theme="core" className="py-24 md:py-32 relative overflow-hidden">
      <TravelScrollWord word={meta.word} />

      <div className="container mx-auto px-6 lg:px-10 relative z-10">
        <ScrollAnimation animationType="bounceLeft">
          <div className="max-w-3xl mb-12 md:mb-14">
            <p className="font-mono text-sm gold-text mb-3">{meta.eyebrow}</p>
            <h2 className="font-display text-4xl sm:text-5xl md:text-6xl font-bold text-white leading-[0.95]">
              About me
            </h2>
          </div>
        </ScrollAnimation>

        <div className="grid lg:grid-cols-[1.35fr_0.65fr] gap-5 md:gap-6 items-stretch mb-10 md:mb-12">
          <ScrollAnimation animationType="fadeUp">
            <div className="neu-raised rounded-3xl p-6 md:p-8 h-full">
              <p className="text-lg md:text-xl text-gray-300 leading-relaxed whitespace-pre-line">
                {ABOUT_TEXT}
              </p>
            </div>
          </ScrollAnimation>

          <ScrollAnimation animationType="fadeRight" delay={120}>
            <aside className="neu-raised rounded-3xl p-6 md:p-7 h-full flex flex-col gap-5">
              <div className="w-full aspect-square max-w-[14rem] mx-auto lg:mx-0 rounded-2xl neu-inset overflow-hidden flex items-center justify-center bg-gradient-to-br from-gold-400/20 to-ink-base">
                <span className="font-display text-6xl font-bold gold-text select-none">A</span>
              </div>
              <div>
                <h3 className="font-display text-lg font-semibold text-white mb-3">
                  Contact Information
                </h3>
                <ul className="space-y-3">
                  <li>
                    <a
                      href={safeHref(SITE_LINKS.email)}
                      className="flex items-center gap-2.5 text-sm text-gold-400 hover:text-gold-300 transition-colors break-all"
                    >
                      <Mail className="w-4 h-4 shrink-0" />
                      anmolandananay@gmail.com
                    </a>
                  </li>
                  <li>
                    <a
                      href={safeHref(SITE_LINKS.phone)}
                      className="flex items-center gap-2.5 text-sm text-gold-400 hover:text-gold-300 transition-colors"
                    >
                      <Phone className="w-4 h-4 shrink-0" />
                      {SITE_LINKS.phoneLabel}
                    </a>
                  </li>
                  <li className="flex items-center gap-2.5 text-sm text-gray-400">
                    <MapPin className="w-4 h-4 shrink-0" />
                    {SITE_LINKS.location}
                  </li>
                </ul>
              </div>
            </aside>
          </ScrollAnimation>
        </div>

        <ScrollAnimation animationType="fadeUp" delay={80}>
          <div>
            <h3 className="font-display text-2xl md:text-3xl font-bold text-white mb-4">
              Education
            </h3>
            <div className="neu-raised rounded-3xl p-5 md:p-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div className="border-l-4 border-gold-400 pl-4">
                <p className="font-display text-lg md:text-xl font-semibold text-white">
                  B.Tech in Computer Science and Engineering
                </p>
                <p className="mt-1.5 flex items-center gap-2 text-sm text-gray-400">
                  <GraduationCap className="w-4 h-4 shrink-0 gold-text" />
                  Maharaja Agrasen Institute of Technology
                </p>
              </div>
              <span className="font-mono text-xs tracking-wider text-gray-500 uppercase sm:text-right">
                2022 to 2026
              </span>
            </div>
          </div>
        </ScrollAnimation>
      </div>
    </section>
  );
};

export default About;
