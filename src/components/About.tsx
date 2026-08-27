import React, { useCallback, useEffect, useState } from 'react';
import { ExternalLink, GraduationCap, Linkedin, Mail, MapPin, Phone, RefreshCw } from 'lucide-react';
import { chapterById } from '../story/chapters';
import { SITE_LINKS } from '../story/links';
import { safeHref } from '../hooks/useRoute';
import { fetchLinkedInProfile, LINKEDIN_FALLBACK, LINKEDIN_FALLBACK_ABOUT } from '../lib/linkedin';
import { ScrollAnimation } from './ScrollAnimations';
import TravelScrollWord from './TravelScrollWord';

const meta = chapterById('about');

const About: React.FC = () => {
  const [profile, setProfile] = useState(LINKEDIN_FALLBACK);
  const [live, setLive] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const loadProfile = useCallback(async (bustCache = false) => {
    setLoading(true);
    setError(false);
    try {
      const result = await fetchLinkedInProfile(undefined, { bustCache });
      setProfile(result.profile);
      setLive(result.live);
      setError(!result.live);
    } catch {
      setError(true);
      setLive(false);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    void loadProfile(false);
  }, [loadProfile]);

  return (
    <section id="about" data-theme="core" className="py-24 md:py-32 relative overflow-hidden">
      <TravelScrollWord word={meta.word} />

      <div className="container mx-auto px-6 lg:px-10 relative z-10">
        <ScrollAnimation animationType="bounceLeft">
          <div className="max-w-3xl mb-12 md:mb-14">
            <p className="font-mono text-sm gold-text mb-3">{meta.eyebrow}</p>
            <h2 className="font-display text-4xl sm:text-5xl md:text-6xl font-bold text-white leading-[0.95] mb-4">
              About me
            </h2>
            <p className="text-lg text-gray-300 leading-relaxed max-w-2xl">
              Synced from{' '}
              <a
                href={safeHref(SITE_LINKS.linkedin)}
                target="_blank"
                rel="noopener noreferrer"
                className="gold-text hover:underline"
              >
                linkedin.com/in/{SITE_LINKS.linkedinUsername}
              </a>
              {live ? (
                <span className="ml-2 text-emerald-400 text-sm font-mono">● live</span>
              ) : error ? (
                <span className="ml-2 text-amber-400 text-sm font-mono">○ cached</span>
              ) : null}
            </p>
          </div>
        </ScrollAnimation>

        <div className="grid lg:grid-cols-[1.35fr_0.65fr] gap-5 md:gap-6 items-stretch mb-10 md:mb-12">
          <ScrollAnimation animationType="fadeUp">
            <div className="neu-raised rounded-3xl p-6 md:p-8 h-full relative overflow-hidden">
              {loading && (
                <div className="absolute inset-0 z-20 flex items-center justify-center bg-ink-base/70 backdrop-blur-sm rounded-3xl">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full border-2 border-gold-400 border-t-transparent animate-spin" />
                    <p className="font-mono text-sm text-gray-400">Loading LinkedIn profile…</p>
                  </div>
                </div>
              )}

              <div className="flex flex-wrap items-center gap-2 mb-5">
                <button
                  type="button"
                  onClick={() => void loadProfile(true)}
                  disabled={loading}
                  className="inline-flex items-center gap-2 neu-interactive px-5 py-2.5 rounded-xl text-sm font-semibold text-ink-base bg-gradient-to-r from-gold-400 to-gold-500 disabled:opacity-60 disabled:cursor-not-allowed"
                  aria-label="Refresh LinkedIn profile"
                >
                  <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
                  Refresh
                </button>
                <a
                  href={safeHref(SITE_LINKS.linkedin)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 neu-interactive px-5 py-2.5 rounded-xl text-sm font-semibold text-ink-base bg-gradient-to-r from-gold-400 to-gold-500"
                >
                  View LinkedIn
                  <ExternalLink className="w-4 h-4" />
                </a>
              </div>

              <p className="text-lg md:text-xl text-gray-300 leading-relaxed whitespace-pre-line">
                {LINKEDIN_FALLBACK_ABOUT}
              </p>
            </div>
          </ScrollAnimation>

          <ScrollAnimation animationType="fadeRight" delay={120}>
            <aside className="neu-raised rounded-3xl overflow-hidden h-full flex flex-col">
              <div className="relative w-full aspect-[4/1.15] min-h-[5.5rem] bg-gradient-to-br from-gold-400/20 to-ink-base">
                {profile.bannerImage ? (
                  <img
                    src={profile.bannerImage}
                    alt=""
                    className="absolute inset-0 w-full h-full object-cover"
                    loading="lazy"
                  />
                ) : (
                  <div className="absolute inset-0 bg-gradient-to-r from-gold-400/15 via-white/5 to-gold-500/10" />
                )}
              </div>

              <div className="p-6 md:p-7 flex flex-col gap-5 -mt-10 relative z-10">
                <div className="w-full max-w-[8.5rem] mx-auto lg:mx-0 aspect-square rounded-2xl neu-inset overflow-hidden flex items-center justify-center bg-gradient-to-br from-gold-400/20 to-ink-base ring-4 ring-ink-base/80">
                  {profile.profileImage ? (
                    <img
                      src={profile.profileImage}
                      alt={profile.name}
                      className="w-full h-full object-cover"
                      width={136}
                      height={136}
                      loading="lazy"
                    />
                  ) : (
                    <span className="font-display text-6xl font-bold gold-text select-none">A</span>
                  )}
                </div>

                <div className="text-center lg:text-left">
                  <p className="font-display text-xl font-bold text-white">{profile.name}</p>
                  {profile.headline ? (
                    <p className="mt-1 text-sm text-gray-400 leading-relaxed">{profile.headline}</p>
                  ) : null}
                </div>

                <div>
                  <h3 className="font-display text-lg font-semibold text-white mb-3">
                    Contact Information
                  </h3>
                  <ul className="space-y-3">
                    <li>
                      <a
                        href={safeHref(SITE_LINKS.linkedin)}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2.5 text-sm text-gold-400 hover:text-gold-300 transition-colors"
                      >
                        <Linkedin className="w-4 h-4 shrink-0" />
                        linkedin.com/in/{SITE_LINKS.linkedinUsername}
                      </a>
                    </li>
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
