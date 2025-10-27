import React from 'react';
import { WorksheetPreferences, TextCase } from '@/types/worksheet';
import { FontSelector } from './FontSelector';

interface FontTypographySettingsProps {
  preferences: WorksheetPreferences;
  updatePreference: <K extends keyof WorksheetPreferences>(key: K, value: WorksheetPreferences[K]) => void;
  searchQuery: string;
  filteredFonts: string[];
  onSearchChange: (query: string) => void;
  onFontHover: (font: string) => void;
}

export const FontTypographySettings: React.FC<FontTypographySettingsProps> = ({ 
  preferences, 
  updatePreference,
  searchQuery,
  filteredFonts,
  onSearchChange,
  onFontHover
}) => {
  if (preferences.emptyPaper) {
    return (
      <p className="text-sm text-gray-500">
        Font settings are not available for empty paper mode.
      </p>
    );
  }

  return (
    <div className="space-y-4">
      <div>
        <label className="block text-sm font-semibold text-gray-700 mb-2">
          Font Selection
        </label>
        <FontSelector
          selectedFont={preferences.selectedFont}
          fontCategory={preferences.fontCategory}
          searchQuery={searchQuery}
          filteredFonts={filteredFonts}
          onFontChange={(font) => updatePreference('selectedFont', font)}
          onCategoryChange={(category) => updatePreference('fontCategory', category)}
          onSearchChange={onSearchChange}
          onFontHover={onFontHover}
        />
      </div>

      <div className="pt-4 border-t border-gray-200">
        <label className="block text-sm font-semibold text-gray-700 mb-2">
          Font Size: {preferences.fontSize}px
        </label>
        <input
          type="range"
          min="24"
          max="72"
          step="2"
          value={preferences.fontSize}
          onChange={(e) => updatePreference('fontSize', Number(e.target.value))}
          className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
        />
      </div>

      <div>
        <label className="block text-sm font-semibold text-gray-700 mb-2">
          Text Case Transform
        </label>
        <select
          value={preferences.textCase}
          onChange={(e) => updatePreference('textCase', e.target.value as TextCase)}
          className="w-full px-3 py-2 border-2 border-gray-300 rounded-lg focus:border-indigo-500 focus:outline-none text-sm"
        >
          <option value="none">None (Original)</option>
          <option value="uppercase">UPPERCASE</option>
          <option value="lowercase">lowercase</option>
          <option value="titlecase">Title Case</option>
        </select>
      </div>
    </div>
  );
};
