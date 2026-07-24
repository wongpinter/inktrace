import { PageConfig, WorksheetPreferences } from '@/types/worksheet';

const pageId = () => `page-${Date.now()}`;

export const createBlankPage = (): PageConfig => ({
  id: pageId(),
  worksheetType: 'text',
  text: '',
  specificLetters: 'Aa Bb Cc Dd',
  alphabetCase: 'both',
  includeNumbers: true,
  includeSymbols: true,
  emptyPaper: false,
  repeatText: false
});

export const createPageFromPreferences = (preferences: WorksheetPreferences): PageConfig => ({
  id: pageId(),
  worksheetType: preferences.worksheetType,
  text: preferences.text,
  specificLetters: preferences.specificLetters,
  alphabetCase: preferences.alphabetCase,
  includeNumbers: preferences.includeNumbers,
  includeSymbols: preferences.includeSymbols,
  emptyPaper: preferences.emptyPaper,
  repeatText: preferences.repeatText
});

export const getTotalPages = (preferences: WorksheetPreferences): number => {
  return preferences.multiPageMode ? preferences.pages.length : preferences.pageCount;
};

export const getEffectivePage = (
  preferences: WorksheetPreferences,
  index: number
): WorksheetPreferences => {
  if (!preferences.multiPageMode || !preferences.pages[index]) {
    return preferences;
  }

  const page = preferences.pages[index];

  return {
    ...preferences,
    worksheetType: page.worksheetType,
    text: page.text,
    specificLetters: page.specificLetters,
    alphabetCase: page.alphabetCase,
    includeNumbers: page.includeNumbers,
    includeSymbols: page.includeSymbols,
    emptyPaper: page.emptyPaper,
    repeatText: page.repeatText
  };
};
