import React, { useCallback, useEffect, useState } from 'react';
import { ExternalLink, Trophy, Target, Flame, RefreshCw } from 'lucide-react';
import { chapterById } from '../story/chapters';
import { SITE_LINKS } from '../story/links';
import { safeHref } from '../hooks/useRoute';
import {
  buildHeatmapDays,
  difficultyPct,
  fetchLeetCodeStats,
  LEETCODE_FALLBACK,
  type LeetCodeStats,
} from '../lib/leetcode';
import { ScrollAnimation } from './ScrollAnimations';
import TravelScrollWord from './TravelScrollWord';

const meta = chapterById('leetcode');

const LEVEL_COLORS = [
  'bg-white/[0.06]',
  'bg-gold-400/25',
  'bg-gold-400/45',
  'bg-gold-400/70',
  'bg-gold-400',
] as const;

const LeetCode: React.FC = () => {
  const [stats, setStats] = useState<LeetCodeStats>(LEETCODE_FALLBACK);
  const [live, setLive] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const loadStats = useCallback(async (bustCache = false) => {
    setLoading(true);
    setError(false);
    try {
      const result = await fetchLeetCodeStats(undefined, { bustCache });
      setStats(result.stats);
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
    void loadStats(false);
  }, [loadStats]);

  const heatmap = buildHeatmapDays(stats.submissionCalendar);
  const difficulties = [
    {
      label: 'Easy',
      solved: stats.easySolved,
      total: stats.totalEasy,
      color: 'from-emerald-500/80 to-emerald-400/40',
      bar: 'bg-emerald-400',
    },
    {
      label: 'Medium',
      solved: stats.mediumSolved,
      total: stats.totalMedium,
      color: 'from-amber-500/80 to-amber-400/40',
      bar: 'bg-amber-400',
    },
    {
      label: 'Hard',
      solved: stats.hardSolved,
      total: stats.totalHard,
      color: 'from-rose-500/80 to-rose-400/40',
      bar: 'bg-rose-400',
    },
  ];

  return (
    <section id="leetcode" data-theme="sand" className="py-24 md:py-32 relative overflow-hidden">
      <TravelScrollWord word={meta.word} />

      <div className="container mx-auto px-6 lg:px-10 relative z-10">
        <ScrollAnimation animationType="bounceLeft">
          <div className="max-w-3xl mb-12 md:mb-14">
            <p className="font-mono text-sm gold-text mb-3">{meta.eyebrow}</p>
            <h2 className="font-display text-4xl sm:text-5xl md:text-6xl font-bold text-white leading-[0.95] mb-4">
              LeetCode
            </h2>
            <p className="text-lg text-gray-300 leading-relaxed max-w-2xl">
              Live stats synced from{' '}
              <a
                href={safeHref(SITE_LINKS.leetcode)}
                target="_blank"
                rel="noopener noreferrer"
                className="gold-text hover:underline"
              >
                @{SITE_LINKS.leetcodeUsername}
              </a>
              . Consistent practice: show up and do the reps.
            </p>
          </div>
        </ScrollAnimation>

        <ScrollAnimation animationType="fadeUp">
          <div className="neu-raised rounded-3xl p-5 sm:p-8 border border-white/5 relative overflow-hidden">
            {loading && (
              <div className="absolute inset-0 z-20 flex items-center justify-center bg-ink-base/70 backdrop-blur-sm rounded-3xl">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full border-2 border-gold-400 border-t-transparent animate-spin" />
                  <p className="font-mono text-sm text-gray-400">Loading LeetCode stats…</p>
                </div>
              </div>
            )}

            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
              <div className="flex items-center gap-4">
                {stats.avatar ? (
                  <img
                    src={stats.avatar}
                    alt={stats.username}
                    className="w-14 h-14 rounded-2xl object-cover neu-inset"
                    width={56}
                    height={56}
                  />
                ) : (
                  <div className="w-14 h-14 rounded-2xl neu-inset flex items-center justify-center gold-text">
                    <svg
                      viewBox="0 0 24 24"
                      className="w-7 h-7"
                      fill="currentColor"
                      aria-hidden="true"
                    >
                      <path d="M13.483 0a1.374 1.374 0 0 0-.961.438L7.116 6.226l-3.854 4.126a5.266 5.266 0 0 0-1.209 2.104 5.35 5.35 0 0 0-.125.513 5.527 5.527 0 0 0 .062 2.362 5.83 5.83 0 0 0 .349 1.017 5.938 5.938 0 0 0 1.271 1.818l4.277 4.193.039.038c2.248 2.165 5.852 2.133 8.063-.074l2.396-2.392c.54-.54.54-1.414.003-1.955a1.378 1.378 0 0 0-1.951-.003l-2.396 2.392a3.021 3.021 0 0 1-4.205.038l-.02-.019-4.276-4.193c-.652-.64-.972-1.469-.948-2.263a2.68 2.68 0 0 1 .066-.523 2.545 2.545 0 0 1 .619-1.164L9.13 8.114c1.058-1.134 3.204-1.27 4.43-.278l3.501 2.831c.593.48 1.461.387 1.94-.207a1.384 1.384 0 0 0-.207-1.943l-3.5-2.831c-.8-.647-1.766-1.045-2.774-1.202l2.015-2.158A1.384 1.384 0 0 0 13.483 0zm-2.866 12.815a1.38 1.38 0 0 0-1.38 1.382 1.38 1.38 0 0 0 1.38 1.382H20.79a1.38 1.38 0 0 0 1.38-1.382 1.38 1.38 0 0 0-1.38-1.382z" />
                    </svg>
                  </div>
                )}
                <div>
                  <p className="font-display text-xl font-bold text-white">
                    {stats.realName || stats.username}
                  </p>
                  <p className="font-mono text-xs text-gray-500">
                    leetcode.com/u/{stats.username}
                    {live ? (
                      <span className="ml-2 text-emerald-400">● live</span>
                    ) : error ? (
                      <span className="ml-2 text-amber-400">○ cached</span>
                    ) : null}
                  </p>
                </div>
              </div>
              <div className="flex flex-wrap items-center gap-2 self-start sm:self-auto">
                <button
                  type="button"
                  onClick={() => void loadStats(true)}
                  disabled={loading}
                  className="inline-flex items-center gap-2 neu-interactive px-5 py-2.5 rounded-xl text-sm font-semibold text-ink-base bg-gradient-to-r from-gold-400 to-gold-500 disabled:opacity-60 disabled:cursor-not-allowed"
                  aria-label="Refresh live LeetCode stats"
                >
                  <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
                  Refresh
                </button>
                <a
                  href={safeHref(SITE_LINKS.leetcode)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 neu-interactive px-5 py-2.5 rounded-xl text-sm font-semibold text-ink-base bg-gradient-to-r from-gold-400 to-gold-500"
                >
                  View profile
                  <ExternalLink className="w-4 h-4" />
                </a>
              </div>
            </div>

            <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4 mb-8">
              <StatCard
                icon={<Trophy className="w-4 h-4" />}
                label="Solved"
                value={stats.totalSolved.toLocaleString()}
                hint={`of ${stats.totalQuestions.toLocaleString()}`}
              />
              <StatCard
                icon={<Target className="w-4 h-4" />}
                label="Acceptance"
                value={`${stats.acceptanceRate.toFixed(1)}%`}
                hint="all submissions"
              />
              <StatCard
                icon={<Flame className="w-4 h-4" />}
                label="Ranking"
                value={stats.ranking ? `#${stats.ranking.toLocaleString()}` : 'N/A'}
                hint="global"
              />
              <StatCard
                icon={<Trophy className="w-4 h-4" />}
                label="Contribution"
                value={String(stats.contributionPoints)}
                hint="points"
              />
            </div>

            <div className="grid md:grid-cols-3 gap-4 mb-10">
              {difficulties.map((d) => {
                const pct = difficultyPct(d.solved, d.total);
                return (
                  <div key={d.label} className="neu-inset rounded-2xl p-4">
                    <div className="flex items-baseline justify-between mb-2">
                      <span className="font-mono text-xs tracking-wider uppercase text-gray-400">
                        {d.label}
                      </span>
                      <span className="font-display text-lg font-bold text-white">
                        {d.solved}
                        <span className="text-gray-500 text-sm font-normal"> / {d.total}</span>
                      </span>
                    </div>
                    <div className="h-2 rounded-full bg-white/5 overflow-hidden">
                      <div
                        className={`h-full rounded-full ${d.bar} transition-all duration-700`}
                        style={{ width: `${pct}%` }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>

            {heatmap.some((d) => d.count > 0) && (
              <div>
                <p className="font-mono text-xs tracking-wider uppercase text-gray-500 mb-3">
                  Submission calendar
                </p>
                <div className="overflow-x-auto pb-2">
                  <div
                    className="grid grid-flow-col gap-[3px] min-w-[640px]"
                    style={{ gridTemplateRows: 'repeat(7, 11px)' }}
                  >
                    {heatmap.map((day) => (
                      <div
                        key={day.date.toISOString()}
                        title={`${day.date.toDateString()}: ${day.count} submission${day.count === 1 ? '' : 's'}`}
                        className={`w-[11px] h-[11px] rounded-[2px] ${LEVEL_COLORS[day.level]}`}
                      />
                    ))}
                  </div>
                </div>
                <div className="flex items-center gap-1.5 mt-3 justify-end text-[10px] text-gray-500 font-mono">
                  <span>Less</span>
                  {LEVEL_COLORS.map((c) => (
                    <span key={c} className={`w-2.5 h-2.5 rounded-[2px] ${c}`} aria-hidden />
                  ))}
                  <span>More</span>
                </div>
              </div>
            )}
          </div>
        </ScrollAnimation>
      </div>
    </section>
  );
};

function StatCard({
  icon,
  label,
  value,
  hint,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
  hint: string;
}) {
  return (
    <div className="neu-inset rounded-2xl p-4">
      <div className="flex items-center gap-2 text-gold-400 mb-2">
        {icon}
        <span className="font-mono text-[10px] tracking-wider uppercase text-gray-400">{label}</span>
      </div>
      <p className="font-display text-2xl md:text-3xl font-bold text-white leading-none mb-1">
        {value}
      </p>
      <p className="text-xs text-gray-500">{hint}</p>
    </div>
  );
}

export default LeetCode;
