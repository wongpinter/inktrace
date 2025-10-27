import React from 'react';
import { Palette } from 'lucide-react';
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
    <div className="bg-white rounded-xl border border-gray-200 shadow-soft overflow-hidden">
      {/* Section Header */}
      <div className="flex items-center gap-2.5 px-4 py-3 bg-gradient-to-r from-orange-50 to-amber-50 border-b border-gray-200">
        <div className="p-1.5 bg-white rounded-lg shadow-sm">
          <Palette className="w-4 h-4 text-orange-600" />
        </div>
        <h2 className="text-sm font-bold text-gray-900 uppercase tracking-wide">Line Styles</h2>
      </div>

      {/* Section Content */}
      <div className="p-4 space-y-4">
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Guideline Color Style
          </label>
          <select
            value={guidelineColorStyle}
            onChange={(e) => updatePreference('guidelineColorStyle', e.target.value as GuidelineColorStyle)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:border-indigo-500 focus:outline-none text-sm"
          >
            {Object.entries(GUIDELINE_COLOR_STYLES).map(([key, { label }]) => (
              <option key={key} value={key}>{label}</option>
            ))}
          </select>
          <p className="text-xs text-gray-500 mt-1">Choose colored guidelines to help with line awareness</p>
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Text Trace Style
          </label>
          <select
            value={textTraceStyle}
            onChange={(e) => updatePreference('textTraceStyle', e.target.value as TextTraceStyle)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:border-indigo-500 focus:outline-none text-sm"
          >
            {Object.entries(TEXT_TRACE_STYLES).map(([key, { label }]) => (
              <option key={key} value={key}>{label}</option>
            ))}
          </select>
          <p className="text-xs text-gray-500 mt-1">Different tracing styles for varied practice</p>
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
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
          <p className="text-xs text-gray-500 mt-1">Add extra space between letters for easier tracing</p>
        </div>

        <div className="flex items-center gap-3">
          <input
            type="checkbox"
            id="startingDots"
            checked={showStartingDots}
            onChange={(e) => updatePreference('showStartingDots', e.target.checked)}
            className="w-4 h-4 text-indigo-600 rounded focus:ring-indigo-500"
          />
          <label htmlFor="startingDots" className="text-sm font-semibold text-gray-700">
            Show Starting Dots
            <span className="block text-xs font-normal text-gray-500">Red dots indicate where to start writing</span>
          </label>
        </div>

      </div>
    </div>
  );
};
