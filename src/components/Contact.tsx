import React, { useState } from 'react';
import { Mail, Phone, Send, Github, Linkedin, Code2, Download, MapPin } from 'lucide-react';
import { STORY_CHAPTERS } from '../story/chapters';
import { ScrollAnimation } from './ScrollAnimations';
import TravelScrollWord from './TravelScrollWord';

const meta = STORY_CHAPTERS[8];

const Contact: React.FC = () => {
  const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const body = encodeURIComponent(`${formData.message}\n\n- ${formData.name} (${formData.email})`);
    const subject = encodeURIComponent(formData.subject || 'Next chapter');
    window.location.href = `mailto:anmolandanay@gmail.com?subject=${subject}&body=${body}`;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const contactItems = [
    {
      icon: <Mail className="w-5 h-5" />,
      label: 'Email',
      value: 'anmolandanay@gmail.com',
      href: 'mailto:anmolandanay@gmail.com',
    },
    {
      icon: <Phone className="w-5 h-5" />,
      label: 'Phone',
      value: '+91 8700048336',
      href: 'tel:+918700048336',
    },
    {
      icon: <Linkedin className="w-5 h-5" />,
      label: 'LinkedIn',
      value: 'linkedin.com/in/anmol809',
      href: 'http://www.linkedin.com/in/anmol809',
    },
    {
      icon: <Github className="w-5 h-5" />,
      label: 'GitHub',
      value: 'github.com/anmolairi03',
      href: 'https://github.com/anmolairi03/',
    },
    {
      icon: <Code2 className="w-5 h-5" />,
      label: 'LeetCode',
      value: '616+ solved',
      href: 'https://leetcode.com/u/zeus408809/',
    },
    {
      icon: <MapPin className="w-5 h-5" />,
      label: 'Location',
      value: 'New Delhi, India',
      href: undefined,
    },
  ];

  const inputBase =
    'w-full px-4 py-3.5 rounded-2xl neu-inset bg-transparent text-white placeholder-gray-500 focus:outline-none focus:shadow-neu-pressed transition-shadow';

  return (
    <section id="contact" data-theme="soft" className="py-24 md:py-32 relative overflow-hidden">
      <TravelScrollWord word={meta.word} />

      <div className="container mx-auto px-6 lg:px-10 relative z-10">
        <ScrollAnimation animationType="bounceLeft">
          <div className="max-w-3xl mb-14 md:mb-16">
            <p className="font-mono text-sm gold-text mb-3">{meta.eyebrow}</p>
            <h2 className="font-display text-4xl sm:text-5xl md:text-6xl font-bold text-white leading-[0.95] mb-5">
              This is what I&apos;ve built so far.
              <br />
              <span className="text-gray-500">The next thing is still being built.</span>
            </h2>
            <p className="text-xl text-gray-300 leading-relaxed max-w-2xl">
              Maybe we build it together.
            </p>
          </div>
        </ScrollAnimation>

        <div className="grid lg:grid-cols-2 gap-8">
          <ScrollAnimation animationType="fadeLeft">
            <div className="space-y-6">
              <div className="neu-raised rounded-3xl p-8">
                <a
                  href="/Anmol_Airi_Resume_Data_Analyst.pdf"
                  download="Anmol_Airi_Resume.pdf"
                  className="group neu-interactive w-full px-6 py-4 rounded-2xl font-semibold text-ink-base bg-gradient-to-r from-gold-400 to-gold-500 flex items-center justify-center gap-2"
                  style={{ boxShadow: '6px 6px 12px #191b21, -6px -6px 12px #2d313b' }}
                >
                  <Download className="w-5 h-5 group-hover:translate-y-0.5 transition-transform" />
                  Download resume
                </a>
              </div>

              <div className="grid sm:grid-cols-2 gap-4">
                {contactItems.map((item) => {
                  const inner = (
                    <div className="neu-raised-sm rounded-2xl p-5 h-full flex items-center gap-4 group">
                      <div className="w-11 h-11 rounded-xl neu-inset flex items-center justify-center gold-text shrink-0">
                        {item.icon}
                      </div>
                      <div className="min-w-0">
                        <p className="text-xs text-gray-500">{item.label}</p>
                        <p className="text-sm text-gray-200 truncate group-hover:gold-text transition-colors">
                          {item.value}
                        </p>
                      </div>
                    </div>
                  );
                  return item.href ? (
                    <a key={item.label} href={item.href} target="_blank" rel="noreferrer">
                      {inner}
                    </a>
                  ) : (
                    <div key={item.label}>{inner}</div>
                  );
                })}
              </div>
            </div>
          </ScrollAnimation>

          <ScrollAnimation animationType="fadeRight">
            <form onSubmit={handleSubmit} className="neu-raised rounded-3xl p-8 space-y-5">
              <p className="font-mono text-[11px] tracking-[0.16em] uppercase text-gray-500 mb-1">
                Start the next chapter
              </p>
              <div className="grid sm:grid-cols-2 gap-5">
                <div>
                  <label htmlFor="name" className="block text-sm text-gray-400 mb-2">
                    Name
                  </label>
                  <input
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className={inputBase}
                    placeholder="Your name"
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm text-gray-400 mb-2">
                    Email
                  </label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className={inputBase}
                    placeholder="you@email.com"
                  />
                </div>
              </div>
              <div>
                <label htmlFor="subject" className="block text-sm text-gray-400 mb-2">
                  Subject
                </label>
                <input
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  required
                  className={inputBase}
                  placeholder="What should we build?"
                />
              </div>
              <div>
                <label htmlFor="message" className="block text-sm text-gray-400 mb-2">
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows={5}
                  className={`${inputBase} resize-none`}
                  placeholder="Tell me about the mess you want shipped…"
                />
              </div>
              <button
                type="submit"
                className="group neu-interactive w-full px-6 py-4 rounded-2xl font-semibold text-ink-base bg-gradient-to-r from-gold-400 to-gold-500 flex items-center justify-center gap-2"
                style={{ boxShadow: '6px 6px 12px #191b21, -6px -6px 12px #2d313b' }}
              >
                Send message
                <Send size={18} className="group-hover:translate-x-1 transition-transform" />
              </button>
            </form>
          </ScrollAnimation>
        </div>
      </div>
    </section>
  );
};

export default Contact;
