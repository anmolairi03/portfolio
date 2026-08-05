/** Shared portfolio narrative model. */

export type StageId = 'intake' | 'shape' | 'index' | 'reason' | 'act' | 'ship';

export interface StageVocab {
  id: StageId;
  label: string;
  short: string;
}

/** Grammar taught in Process and reused in Projects / Experience. */
export const STAGES: StageVocab[] = [
  { id: 'intake', label: 'Intake', short: 'Map the problem' },
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
 * Portfolio chapters.
 * Order matches App composition.
 */
export const STORY_CHAPTERS: StoryChapter[] = [
  { id: 'hero', label: 'Open', rail: 'Open', eyebrow: '00 / home', word: 'HOME' },
  { id: 'about', label: 'About', rail: 'About', eyebrow: '01 / about', word: 'ABOUT' },
  { id: 'skills', label: 'Tools', rail: 'Tools', eyebrow: '02 / skills', word: 'TOOLS' },
  { id: 'projects', label: 'Build', rail: 'Build', eyebrow: '03 / projects', word: 'BUILD' },
  { id: 'experience', label: 'Proof', rail: 'Proof', eyebrow: '04 / experience', word: 'PROOF' },
  { id: 'leetcode', label: 'LeetCode', rail: 'LeetCode', eyebrow: '05 / leetcode', word: 'REPS' },
  { id: 'contact', label: 'Next', rail: 'Next', eyebrow: '06 / contact', word: 'NEXT' },
];

export const STORY_IDS = STORY_CHAPTERS.map((c) => c.id);

export function chapterById(id: string): StoryChapter {
  return STORY_CHAPTERS.find((c) => c.id === id) ?? STORY_CHAPTERS[0];
}

export function stageLabel(id: StageId): string {
  return STAGES.find((s) => s.id === id)?.label ?? id;
}
