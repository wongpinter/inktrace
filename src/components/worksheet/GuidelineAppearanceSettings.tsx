import React from 'react';
import { WorksheetPreferences, GuidelineColorStyle } from '@/types/worksheet';
import { GUIDELINE_COLOR_STYLES } from '@/constants/worksheet';

interface GuidelineAppearanceSettingsProps {
  preferences: WorksheetPreferences;
  updatePreference: <K extends keyof WorksheetPreferences>(key: K, value: WorksheetPreferences[K]) => void;
}

export const GuidelineAppearanceSettings: React.FC<GuidelineAppearanceSettingsProps> = ({ 
  preferences, 
  updatePreference 
}) => {
  const updateCustomColor = (line: 'top' | 'middle' | 'baseline' | 'bottom', color: string) => {
    updatePreference('customGuidelineColors', {
      ...preferences.customGuidelineColors,
      [line]: color
    });
  };

  const isCustomColorMode = preferences.guidelineColorStyle === 'custom';

  return (
    <div className="space-y-4">
      <div>
        <label className="block text-sm font-semibold text-gray-700 mb-2">
          Guideline Color Preset
        </label>
        <select
          value={preferences.guidelineColorStyle}
          onChange={(e) => updatePreference('guidelineColorStyle', e.target.value as GuidelineColorStyle)}
          className="w-full px-3 py-2 border-2 border-gray-300 rounded-lg focus:border-indigo-500 focus:outline-none text-sm"
        >
          {Object.entries(GUIDELINE_COLOR_STYLES).map(([key, { label }]) => (
            <option key={key} value={key}>{label}</option>
          ))}
          <option value="custom">Custom Colors</option>
        </select>
      </div>

      {/* Custom Color Pickers */}
      {isCustomColorMode && (
        <div className="space-y-3 p-3 bg-gray-50 rounded-lg">
          <p className="text-xs font-medium text-gray-600 mb-2">Custom Line Colors</p>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-medium text-gray-600 mb-1">Top Line</label>
              <input
                type="color"
                value={preferences.customGuidelineColors.top}
                onChange={(e) => updateCustomColor('top', e.target.value)}
                className="w-full h-8 rounded cursor-pointer"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-600 mb-1">Middle Line</label>
              <input
                type="color"
                value={preferences.customGuidelineColors.middle}
                onChange={(e) => updateCustomColor('middle', e.target.value)}
                className="w-full h-8 rounded cursor-pointer"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-600 mb-1">Baseline</label>
              <input
                type="color"
                value={preferences.customGuidelineColors.baseline}
                onChange={(e) => updateCustomColor('baseline', e.target.value)}
                className="w-full h-8 rounded cursor-pointer"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-600 mb-1">Bottom Line</label>
              <input
                type="color"
                value={preferences.customGuidelineColors.bottom}
                onChange={(e) => updateCustomColor('bottom', e.target.value)}
                className="w-full h-8 rounded cursor-pointer"
              />
            </div>
          </div>
        </div>
      )}

      <div>
        <label className="block text-sm font-semibold text-gray-700 mb-2">
          Guideline Thickness: {preferences.guidelineThickness.toFixed(2)}px
        </label>
        <input
          type="range"
          min="0.25"
          max="3"
          step="0.25"
          value={preferences.guidelineThickness}
          onChange={(e) => updatePreference('guidelineThickness', Number(e.target.value))}
          className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
        />
      </div>

      <div className="space-y-3 p-3 bg-gray-50 rounded-lg">
        <div className="flex items-center gap-3">
          <input
            type="checkbox"
            id="emphasizeBaseline"
            checked={preferences.emphasizeBaseline}
            onChange={(e) => updatePreference('emphasizeBaseline', e.target.checked)}
            className="w-4 h-4 text-indigo-600 rounded focus:ring-indigo-500"
          />
          <label htmlFor="emphasizeBaseline" className="text-sm text-gray-700 cursor-pointer">
            Emphasize baseline (make it thicker)
          </label>
        </div>

        {preferences.emphasizeBaseline && (
          <div className="pl-7">
            <label className="block text-xs font-medium text-gray-600 mb-1">
              Baseline Thickness: {preferences.baselineThickness.toFixed(2)}px
            </label>
            <input
              type="range"
              min="1"
              max="5"
              step="0.25"
              value={preferences.baselineThickness}
              onChange={(e) => updatePreference('baselineThickness', Number(e.target.value))}
              className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
            />
          </div>
        )}
      </div>

      <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
        <input
          type="checkbox"
          id="dashedGuidelines"
          checked={preferences.dashedGuidelines}
          onChange={(e) => updatePreference('dashedGuidelines', e.target.checked)}
          className="w-4 h-4 text-indigo-600 rounded focus:ring-indigo-500"
        />
        <label htmlFor="dashedGuidelines" className="text-sm text-gray-700 cursor-pointer">
          Use dashed guideline pattern
        </label>
      </div>

      <div>
        <label className="block text-sm font-semibold text-gray-700 mb-2">
          Guideline Opacity: {Math.round(preferences.guidelineOpacity * 100)}%
        </label>
        <input
          type="range"
          min="0.1"
          max="1"
          step="0.1"
          value={preferences.guidelineOpacity}
          onChange={(e) => updatePreference('guidelineOpacity', Number(e.target.value))}
          className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
        />
        <p className="text-xs text-gray-500 mt-1">Overall visibility of all guidelines</p>
      </div>
    </div>
  );
};
