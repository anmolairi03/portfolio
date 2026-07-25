/** Shared Mess → Ship narrative model for the whole portfolio. */

export type StageId = 'intake' | 'shape' | 'index' | 'reason' | 'act' | 'ship';

export interface StageVocab {
  id: StageId;
  label: string;
  short: string;
}

/** Grammar taught in Process and reused in Projects / Experience. */
export const STAGES: StageVocab[] = [
  { id: 'intake', label: 'Intake', short: 'Map the mess' },
  { id: 'shape', label: 'Shape', short: 'Make it repeatable' },
  { id: 'index', label: 'Index', short: 'Make knowledge findable' },
  { id: 'reason', label: 'Reason', short: 'Reason on evidence' },
  { id: 'act', label: 'Act', short: 'Give it hands' },
  { id: 'ship', label: 'Ship', short: 'Deliver and measure' },
];

export interface StoryChapter {
  id: string;
  label: string;
  rail: string;
  eyebrow: string;
  word: string;
}

/**
 * Continuous build-log chapters.
 * Order matches App composition and ScrollProgress.
 */
export const STORY_CHAPTERS: StoryChapter[] = [
  { id: 'hero', label: 'Open', rail: 'Open', eyebrow: '00 / open the log', word: 'HOME' },
  { id: 'about', label: 'Why', rail: 'Why', eyebrow: '01 / why this builder', word: 'WHY' },
  { id: 'process', label: 'Method', rail: 'Method', eyebrow: '02 / the method', word: 'CHAIN' },
  { id: 'journey', label: 'Path', rail: 'Path', eyebrow: '03 / personal run', word: 'PATH' },
  { id: 'skills', label: 'Tools', rail: 'Tools', eyebrow: '04 / tools on the bench', word: 'TOOLS' },
  { id: 'projects', label: 'Build', rail: 'Build', eyebrow: '05 / full chains', word: 'BUILD' },
  { id: 'experience', label: 'Proof', rail: 'Proof', eyebrow: '06 / under pressure', word: 'PROOF' },
  { id: 'now', label: 'Now', rail: 'Now', eyebrow: '07 / currently building', word: 'NOW' },
  { id: 'contact', label: 'Next', rail: 'Next', eyebrow: '08 / next chapter', word: 'NEXT' },
];

export const STORY_IDS = STORY_CHAPTERS.map((c) => c.id);

export function stageLabel(id: StageId): string {
  return STAGES.find((s) => s.id === id)?.label ?? id;
}
