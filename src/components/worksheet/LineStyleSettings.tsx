import React from 'react';
import { WorksheetPreferences, GuidelineColorStyle, TextTraceStyle } from '@/types/worksheet';
import { GUIDELINE_COLOR_STYLES, TEXT_TRACE_STYLES } from '@/constants/worksheet';

interface LineStyleSettingsProps {
  preferences: WorksheetPreferences;
  updatePreference: <K extends keyof WorksheetPreferences>(key: K, value: WorksheetPreferences[K]) => void;
}

export const LineStyleSettings: React.FC<LineStyleSettingsProps> = ({ preferences, updatePreference }) => {
  const {
    guidelineColorStyle,
    textTraceStyle,
    letterSpacing,
    showStartingDots,
    dottedFont
  } = preferences;

  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <label className="block text-sm font-semibold text-gray-700">
          Guideline Color Style
        </label>
        <select
          value={guidelineColorStyle}
          onChange={(e) => updatePreference('guidelineColorStyle', e.target.value as GuidelineColorStyle)}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 focus:outline-none text-sm bg-white transition-smooth"
        >
          {Object.entries(GUIDELINE_COLOR_STYLES).map(([key, { label }]) => (
            <option key={key} value={key}>{label}</option>
          ))}
        </select>
        <p className="text-xs text-gray-500 leading-relaxed">Choose colored guidelines to help with line awareness</p>
      </div>

      <div className="space-y-2">
        <label className="block text-sm font-semibold text-gray-700">
          Text Trace Style
        </label>
        <select
          value={textTraceStyle}
          onChange={(e) => updatePreference('textTraceStyle', e.target.value as TextTraceStyle)}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 focus:outline-none text-sm bg-white transition-smooth"
        >
          {Object.entries(TEXT_TRACE_STYLES).map(([key, { label }]) => (
            <option key={key} value={key}>{label}</option>
          ))}
        </select>
        <p className="text-xs text-gray-500 leading-relaxed">Different tracing styles for varied practice</p>
      </div>

      <div className="space-y-2">
        <label className="block text-sm font-semibold text-gray-700">
          Letter Spacing: {letterSpacing}px
        </label>
        <input
          type="range"
          min="0"
          max="30"
          step="2"
          value={letterSpacing}
          onChange={(e) => updatePreference('letterSpacing', Number(e.target.value))}
          className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
        />
        <p className="text-xs text-gray-500 leading-relaxed">Add extra space between letters for easier tracing</p>
      </div>

      <div className="flex items-start gap-3">
        <input
          type="checkbox"
          id="startingDots"
          checked={showStartingDots}
          onChange={(e) => updatePreference('showStartingDots', e.target.checked)}
          className="w-4 h-4 mt-0.5 text-indigo-600 rounded focus:ring-indigo-500 flex-shrink-0"
        />
        <label htmlFor="startingDots" className="text-sm font-semibold text-gray-700 cursor-pointer">
          Show Starting Dots
          <span className="block text-xs font-normal text-gray-500 leading-relaxed mt-0.5">Red dots indicate where to start writing</span>
        </label>
      </div>
    </div>
  );
};
