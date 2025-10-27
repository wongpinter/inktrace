import React from 'react';
import { WorksheetPreferences, CharacterWidth } from '@/types/worksheet';

interface TextSpacingSettingsProps {
  preferences: WorksheetPreferences;
  updatePreference: <K extends keyof WorksheetPreferences>(key: K, value: WorksheetPreferences[K]) => void;
}

export const TextSpacingSettings: React.FC<TextSpacingSettingsProps> = ({ 
  preferences, 
  updatePreference 
}) => {
  if (preferences.emptyPaper) {
    return (
      <p className="text-sm text-gray-500">
        Text spacing settings are not available for empty paper mode.
      </p>
    );
  }

  return (
    <div className="space-y-4">
      <div>
        <label className="block text-sm font-semibold text-gray-700 mb-2">
          Letter Spacing: {preferences.letterSpacing}px
        </label>
        <input
          type="range"
          min="-5"
          max="20"
          step="1"
          value={preferences.letterSpacing}
          onChange={(e) => updatePreference('letterSpacing', Number(e.target.value))}
          className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
        />
        <p className="text-xs text-gray-500 mt-1">Space between individual letters</p>
      </div>

      <div>
        <label className="block text-sm font-semibold text-gray-700 mb-2">
          Word Spacing: {preferences.wordSpacing}px
        </label>
        <input
          type="range"
          min="0"
          max="20"
          step="1"
          value={preferences.wordSpacing}
          onChange={(e) => updatePreference('wordSpacing', Number(e.target.value))}
          className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
        />
        <p className="text-xs text-gray-500 mt-1">Additional space between words</p>
      </div>

      <div>
        <label className="block text-sm font-semibold text-gray-700 mb-2">
          Character Width
        </label>
        <select
          value={preferences.characterWidth}
          onChange={(e) => updatePreference('characterWidth', e.target.value as CharacterWidth)}
          className="w-full px-3 py-2 border-2 border-gray-300 rounded-lg focus:border-indigo-500 focus:outline-none text-sm"
        >
          <option value="condensed">Condensed (Narrow)</option>
          <option value="normal">Normal</option>
          <option value="expanded">Expanded (Wide)</option>
        </select>
      </div>

      <div>
        <label className="block text-sm font-semibold text-gray-700 mb-2">
          Practice Lines per Set: {preferences.lineCount}
        </label>
        <input
          type="range"
          min="1"
          max="5"
          value={preferences.lineCount}
          onChange={(e) => updatePreference('lineCount', Number(e.target.value))}
          className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
        />
        <p className="text-xs text-gray-500 mt-1">Number of practice lines for each text repetition</p>
      </div>
    </div>
  );
};
