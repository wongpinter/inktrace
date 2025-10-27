import React from 'react';
import { WorksheetPreferences, TextTraceStyle } from '@/types/worksheet';
import { TEXT_TRACE_STYLES } from '@/constants/worksheet';

interface TextAppearanceSettingsProps {
  preferences: WorksheetPreferences;
  updatePreference: <K extends keyof WorksheetPreferences>(key: K, value: WorksheetPreferences[K]) => void;
}

export const TextAppearanceSettings: React.FC<TextAppearanceSettingsProps> = ({ 
  preferences, 
  updatePreference 
}) => {
  if (preferences.emptyPaper) {
    return (
      <p className="text-sm text-gray-500">
        Text appearance settings are not available for empty paper mode.
      </p>
    );
  }

  return (
    <div className="space-y-4">
      <div>
        <label className="block text-sm font-semibold text-gray-700 mb-2">
          Tracing Opacity: {Math.round(preferences.textOpacity * 100)}%
        </label>
        <input
          type="range"
          min="0.1"
          max="1"
          step="0.1"
          value={preferences.textOpacity}
          onChange={(e) => updatePreference('textOpacity', Number(e.target.value))}
          className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
        />
        <p className="text-xs text-gray-500 mt-1">How visible the tracing text appears</p>
      </div>

      <div>
        <label className="block text-sm font-semibold text-gray-700 mb-2">
          Text Trace Style
        </label>
        <select
          value={preferences.textTraceStyle}
          onChange={(e) => updatePreference('textTraceStyle', e.target.value as TextTraceStyle)}
          className="w-full px-3 py-2 border-2 border-gray-300 rounded-lg focus:border-indigo-500 focus:outline-none text-sm"
        >
          {Object.entries(TEXT_TRACE_STYLES).map(([key, { label }]) => (
            <option key={key} value={key}>{label}</option>
          ))}
        </select>
      </div>

      <div className="space-y-3 p-3 bg-gray-50 rounded-lg">
        <div className="flex items-center gap-3">
          <input
            type="checkbox"
            id="startingDots"
            checked={preferences.showStartingDots}
            onChange={(e) => updatePreference('showStartingDots', e.target.checked)}
            className="w-4 h-4 text-indigo-600 rounded focus:ring-indigo-500"
          />
          <label htmlFor="startingDots" className="text-sm text-gray-700 cursor-pointer">
            Show starting dots
          </label>
        </div>

        <div className="flex items-center gap-3">
          <input
            type="checkbox"
            id="strokeArrows"
            checked={preferences.showStrokeArrows}
            onChange={(e) => updatePreference('showStrokeArrows', e.target.checked)}
            className="w-4 h-4 text-indigo-600 rounded focus:ring-indigo-500"
          />
          <label htmlFor="strokeArrows" className="text-sm text-gray-700 cursor-pointer">
            Show stroke direction arrows
          </label>
        </div>
      </div>
    </div>
  );
};
