import React from 'react';
import { WorksheetPreferences, GuidelineStyle, VerticalAlignment } from '@/types/worksheet';
import { GUIDELINE_STYLES } from '@/constants/worksheet';

interface GuidelineLayoutSettingsProps {
  preferences: WorksheetPreferences;
  updatePreference: <K extends keyof WorksheetPreferences>(key: K, value: WorksheetPreferences[K]) => void;
}

export const GuidelineLayoutSettings: React.FC<GuidelineLayoutSettingsProps> = ({ 
  preferences, 
  updatePreference 
}) => {
  return (
    <div className="space-y-4">
      <div>
        <label className="block text-sm font-semibold text-gray-700 mb-2">
          Guideline Style
        </label>
        <select
          value={preferences.guidelineStyle}
          onChange={(e) => updatePreference('guidelineStyle', e.target.value as GuidelineStyle)}
          className="w-full px-3 py-2 border-2 border-gray-300 rounded-lg focus:border-indigo-500 focus:outline-none text-sm"
        >
          {Object.entries(GUIDELINE_STYLES).map(([key, { label }]) => (
            <option key={key} value={key}>{label}</option>
          ))}
        </select>
      </div>

      <div className="space-y-3 p-3 bg-gray-50 rounded-lg">
        <div className="flex items-center gap-3">
          <input
            type="checkbox"
            id="showGuides"
            checked={preferences.showGuides}
            onChange={(e) => updatePreference('showGuides', e.target.checked)}
            className="w-4 h-4 text-indigo-600 rounded focus:ring-indigo-500"
          />
          <label htmlFor="showGuides" className="text-sm font-medium text-gray-700 cursor-pointer">
            Show guidelines
          </label>
        </div>

        {preferences.showGuides && (
          <>
            <div className="flex items-center gap-3 pl-7">
              <input
                type="checkbox"
                id="fullMargin"
                checked={preferences.fullMarginGuides}
                onChange={(e) => updatePreference('fullMarginGuides', e.target.checked)}
                className="w-4 h-4 text-indigo-600 rounded focus:ring-indigo-500"
              />
              <label htmlFor="fullMargin" className="text-sm text-gray-600 cursor-pointer">
                Extend guidelines to page margins
              </label>
            </div>

            <div className="flex items-center gap-3 pl-7">
              <input
                type="checkbox"
                id="marginLines"
                checked={preferences.showMarginLines}
                onChange={(e) => updatePreference('showMarginLines', e.target.checked)}
                className="w-4 h-4 text-indigo-600 rounded focus:ring-indigo-500"
              />
              <label htmlFor="marginLines" className="text-sm text-gray-600 cursor-pointer">
                Show left/right margin boundaries
              </label>
            </div>
          </>
        )}
      </div>

      {!preferences.emptyPaper && (
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Text Vertical Alignment
          </label>
          <select
            value={preferences.verticalAlignment}
            onChange={(e) => updatePreference('verticalAlignment', e.target.value as VerticalAlignment)}
            className="w-full px-3 py-2 border-2 border-gray-300 rounded-lg focus:border-indigo-500 focus:outline-none text-sm"
          >
            <option value="top">Top of Line</option>
            <option value="center">Center of Line</option>
            <option value="baseline">Baseline (Recommended)</option>
          </select>
          <p className="text-xs text-gray-500 mt-1">How text sits on the guidelines</p>
        </div>
      )}
    </div>
  );
};
