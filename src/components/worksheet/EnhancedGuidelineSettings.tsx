import React from 'react';
import { WorksheetPreferences } from '@/types/worksheet';

interface EnhancedGuidelineSettingsProps {
  preferences: WorksheetPreferences;
  updatePreference: <K extends keyof WorksheetPreferences>(key: K, value: WorksheetPreferences[K]) => void;
}

export const EnhancedGuidelineSettings: React.FC<EnhancedGuidelineSettingsProps> = ({ preferences, updatePreference }) => {
  const updateCustomColor = (line: 'top' | 'middle' | 'baseline' | 'bottom', color: string) => {
    updatePreference('customGuidelineColors', {
      ...preferences.customGuidelineColors,
      [line]: color
    });
  };

  const updateOpacity = (line: 'top' | 'middle' | 'baseline' | 'bottom', opacity: number) => {
    updatePreference('guidelineOpacities', {
      ...preferences.guidelineOpacities,
      [line]: opacity
    });
  };

  return (
    <div className="space-y-4">
      {/* Custom Colors Toggle */}
      <div className="flex items-center gap-3">
        <input
          type="checkbox"
          id="customColors"
          checked={preferences.useCustomGuidelineColors}
          onChange={(e) => updatePreference('useCustomGuidelineColors', e.target.checked)}
          className="w-4 h-4 text-indigo-600 rounded focus:ring-indigo-500"
        />
        <label htmlFor="customColors" className="text-sm font-medium text-gray-700 cursor-pointer">
          Use custom guideline colors
        </label>
      </div>

      {/* Custom Color Pickers */}
      {preferences.useCustomGuidelineColors && (
        <div className="space-y-3 p-3 bg-gray-50 rounded-lg">
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

      {/* Individual Line Opacities */}
      <div className="space-y-3">
        <h4 className="text-sm font-semibold text-gray-700">Line Opacities</h4>

        <div>
          <label className="block text-xs font-medium text-gray-600 mb-1">
            Top: {Math.round(preferences.guidelineOpacities.top * 100)}%
          </label>
          <input
            type="range"
            min="0.1"
            max="1"
            step="0.1"
            value={preferences.guidelineOpacities.top}
            onChange={(e) => updateOpacity('top', Number(e.target.value))}
            className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
          />
        </div>

        <div>
          <label className="block text-xs font-medium text-gray-600 mb-1">
            Middle: {Math.round(preferences.guidelineOpacities.middle * 100)}%
          </label>
          <input
            type="range"
            min="0.1"
            max="1"
            step="0.1"
            value={preferences.guidelineOpacities.middle}
            onChange={(e) => updateOpacity('middle', Number(e.target.value))}
            className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
          />
        </div>

        <div>
          <label className="block text-xs font-medium text-gray-600 mb-1">
            Baseline: {Math.round(preferences.guidelineOpacities.baseline * 100)}%
          </label>
          <input
            type="range"
            min="0.1"
            max="1"
            step="0.1"
            value={preferences.guidelineOpacities.baseline}
            onChange={(e) => updateOpacity('baseline', Number(e.target.value))}
            className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
          />
        </div>

        <div>
          <label className="block text-xs font-medium text-gray-600 mb-1">
            Bottom: {Math.round(preferences.guidelineOpacities.bottom * 100)}%
          </label>
          <input
            type="range"
            min="0.1"
            max="1"
            step="0.1"
            value={preferences.guidelineOpacities.bottom}
            onChange={(e) => updateOpacity('bottom', Number(e.target.value))}
            className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
          />
        </div>
      </div>

      {/* Additional Options */}
      <div className="space-y-3 pt-3 border-t border-gray-200">
        <div className="flex items-center gap-3">
          <input
            type="checkbox"
            id="dashedGuidelines"
            checked={preferences.dashedGuidelines}
            onChange={(e) => updatePreference('dashedGuidelines', e.target.checked)}
            className="w-4 h-4 text-indigo-600 rounded focus:ring-indigo-500"
          />
          <label htmlFor="dashedGuidelines" className="text-sm text-gray-700 cursor-pointer">
            Dashed guideline pattern
          </label>
        </div>

        <div className="flex items-center gap-3">
          <input
            type="checkbox"
            id="marginLines"
            checked={preferences.showMarginLines}
            onChange={(e) => updatePreference('showMarginLines', e.target.checked)}
            className="w-4 h-4 text-indigo-600 rounded focus:ring-indigo-500"
          />
          <label htmlFor="marginLines" className="text-sm text-gray-700 cursor-pointer">
            Show margin lines (left/right boundaries)
          </label>
        </div>

        <div className="flex items-center gap-3">
          <input
            type="checkbox"
            id="emphasizeBaseline"
            checked={preferences.emphasizeBaseline}
            onChange={(e) => updatePreference('emphasizeBaseline', e.target.checked)}
            className="w-4 h-4 text-indigo-600 rounded focus:ring-indigo-500"
          />
          <label htmlFor="emphasizeBaseline" className="text-sm text-gray-700 cursor-pointer">
            Emphasize baseline (thicker)
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
    </div>
  );
};
