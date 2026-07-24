import { DIFFICULTY_LEVELS, DOLCH_SIGHT_WORDS, FRY_SIGHT_WORDS, TEMPLATE_WORDS, WORD_PATTERNS } from '@/constants/contentGeneration';
import { DifficultyLevel, SightWordList, WordPattern } from '@/types/worksheet';

export const getSightWordText = (list: SightWordList): string => {
  if (list.startsWith('dolch-')) {
    const level = list.replace('dolch-', '') as keyof typeof DOLCH_SIGHT_WORDS;
    return (DOLCH_SIGHT_WORDS[level] || []).join(' ');
  }

  const level = list.replace('fry-', '') as keyof typeof FRY_SIGHT_WORDS;
  return (FRY_SIGHT_WORDS[level] || []).join(' ');
};

export const getPatternText = (pattern: WordPattern): string => {
  return (WORD_PATTERNS[pattern]?.examples || []).join(' ');
};

const pickRandom = (words: string[], random = Math.random): string => {
  return words[Math.floor(random() * words.length)];
};

export const generateSentenceText = (
  template: string,
  count = 5,
  random = Math.random
): string => {
  return Array.from({ length: count }, () => {
    return template
      .replace('{adjective}', pickRandom(TEMPLATE_WORDS.adjective, random))
      .replace('{noun}', pickRandom(TEMPLATE_WORDS.noun, random))
      .replace('{verb}', pickRandom(TEMPLATE_WORDS.verb, random))
      .replace('{adverb}', pickRandom(TEMPLATE_WORDS.adverb, random))
      .replace('{place}', pickRandom(TEMPLATE_WORDS.place, random))
      .replace('{name}', pickRandom(TEMPLATE_WORDS.name, random));
  }).join(' ');
};

export const generateNamePracticeText = (name: string, repetitions = 10): string => {
  return Array(repetitions).fill(name.trim()).join(' ');
};

export const parseWordListInput = (input: string): string[] => {
  return input.split(/[\s,]+/).filter(word => word.length > 0);
};

export const generateRandomWordText = (
  difficulty: DifficultyLevel,
  count: number,
  random = Math.random
): string => {
  const config = DIFFICULTY_LEVELS[difficulty];
  const words = config.patterns.flatMap(pattern => WORD_PATTERNS[pattern as WordPattern]?.examples || []);
  const shuffled = [...words];

  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }

  return shuffled.slice(0, count).join(' ');
};
