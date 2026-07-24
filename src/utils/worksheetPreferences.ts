import { DEFAULT_PREFERENCES } from '@/constants/worksheet';
import { WorksheetPreferences } from '@/types/worksheet';

export const mergeSavedPreferences = (saved: unknown): WorksheetPreferences => {
  if (!saved || typeof saved !== 'object') {
    return DEFAULT_PREFERENCES;
  }

  const partial = saved as Partial<WorksheetPreferences>;

  return {
    ...DEFAULT_PREFERENCES,
    ...partial,
    customGuidelineColors: {
      ...DEFAULT_PREFERENCES.customGuidelineColors,
      ...partial.customGuidelineColors
    },
    contentGeneration: {
      ...DEFAULT_PREFERENCES.contentGeneration,
      ...partial.contentGeneration
    },
    pages: Array.isArray(partial.pages) ? partial.pages : DEFAULT_PREFERENCES.pages
  };
};

export const applyPresetPreferences = (
  preferences: WorksheetPreferences,
  preset: Partial<WorksheetPreferences>
): WorksheetPreferences => {
  return {
    ...preferences,
    ...preset,
    customGuidelineColors: {
      ...preferences.customGuidelineColors,
      ...preset.customGuidelineColors
    },
    contentGeneration: {
      ...preferences.contentGeneration,
      ...preset.contentGeneration
    }
  };
};
