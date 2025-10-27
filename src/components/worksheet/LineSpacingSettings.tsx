import React from 'react';
import { WorksheetPreferences, LineSpacingPreset } from '@/types/worksheet';
import { LINE_SPACING_PRESETS, mmToPixels } from '@/constants/worksheet';

interface LineSpacingSettingsProps {
  preferences: WorksheetPreferences;
  updatePreference: <K extends keyof WorksheetPreferences>(key: K, value: WorksheetPreferences[K]) => void;
}

// Visual preview component for line spacing
const SpacingPreview: React.FC<{ spacingMm: number; label: string; isActive: boolean }> = ({ 
  spacingMm, 
  label, 
  isActive 
}) => {
  // Scale down for preview (1mm = 2px in preview)
  const previewHeight = spacingMm * 2;
  const maxHeight = 50; // Maximum preview height
  const scaledHeight = Math.min(previewHeight, maxHeight);
  
  return (
    <div className={`flex flex-col items-center p-2 rounded-lg transition-all ${
      isActive ? 'bg-indigo-50 border-2 border-indigo-300' : 'bg-gray-50 border border-gray-200'
    }`}>
      <div className="text-xs font-medium text-gray-700 mb-1">{label}</div>
      <div className="relative" style={{ height: `${scaledHeight}px`, width: '60px' }}>
        {/* Baseline */}
        <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-red-400"></div>
        {/* Top line */}
        <div className="absolute top-0 left-0 right-0 h-0.5 bg-gray-400"></div>
        {/* Sample letter 'a' */}
        <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 text-gray-400 font-serif" 
             style={{ fontSize: `${scaledHeight * 0.6}px`, lineHeight: `${scaledHeight}px` }}>
          a
        </div>
      </div>
      <div className="text-xs text-gray-500 mt-1">{spacingMm}mm</div>
    </div>
  );
};

export const LineSpacingSettings: React.FC<LineSpacingSettingsProps> = ({ 
  preferences, 
  updatePreference 
}) => {
  const currentPreset = LINE_SPACING_PRESETS[preferences.lineSpacingPreset];
  const isCustom = preferences.lineSpacingPreset === 'custom';
  
  // Calculate actual spacing in mm
  const actualSpacingMm = isCustom 
    ? preferences.customLineSpacing 
    : currentPreset.spacingMm;
  
  // Convert to pixels for display
  const spacingPixels = Math.round(mmToPixels(actualSpacingMm));

  return (
    <div className="space-y-4">
      <div>
        <label className="block text-sm font-semibold text-gray-700 mb-2">
          Baseline-to-Baseline Spacing
        </label>
        <select
          value={preferences.lineSpacingPreset}
          onChange={(e) => updatePreference('lineSpacingPreset', e.target.value as LineSpacingPreset)}
          className="w-full px-3 py-2 border-2 border-gray-300 rounded-lg focus:border-indigo-500 focus:outline-none text-sm"
        >
          {Object.entries(LINE_SPACING_PRESETS).map(([key, config]) => (
            <option key={key} value={key}>
              {config.label}
            </option>
          ))}
        </select>
        <p className="text-xs text-gray-500 mt-1">
          {currentPreset.description}
          {currentPreset.gradeLevel && ` • Grade ${currentPreset.gradeLevel}`}
        </p>
        <div className="mt-2 p-2 bg-gray-50 rounded border border-gray-200">
          <p className="text-xs text-gray-600">
            <span className="font-semibold">Current spacing:</span> {actualSpacingMm.toFixed(1)}mm ({spacingPixels}px)
          </p>
        </div>
      </div>

      {isCustom && (
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Custom Spacing: {preferences.customLineSpacing.toFixed(1)}mm
          </label>
          <input
            type="range"
            min="6"
            max="25"
            step="0.5"
            value={preferences.customLineSpacing}
            onChange={(e) => updatePreference('customLineSpacing', Number(e.target.value))}
            className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
          />
          <div className="flex justify-between text-xs text-gray-500 mt-1">
            <span>6mm (narrow)</span>
            <span>25mm (extra wide)</span>
          </div>
        </div>
      )}

      {/* Visual Spacing Comparison */}
      <div className="p-3 bg-gradient-to-br from-indigo-50 to-blue-50 rounded-lg border border-indigo-200">
        <h4 className="text-xs font-semibold text-indigo-900 mb-3">Visual Spacing Comparison</h4>
        <div className="grid grid-cols-3 gap-2">
          <SpacingPreview 
            spacingMm={19} 
            label="K" 
            isActive={preferences.lineSpacingPreset === 'kindergarten'} 
          />
          <SpacingPreview 
            spacingMm={12.7} 
            label="1-3" 
            isActive={preferences.lineSpacingPreset === 'grade1-3'} 
          />
          <SpacingPreview 
            spacingMm={8.7} 
            label="4-6" 
            isActive={preferences.lineSpacingPreset === 'grade4-6' || preferences.lineSpacingPreset === 'wide-ruled'} 
          />
        </div>
        <div className="grid grid-cols-3 gap-2 mt-2">
          <SpacingPreview 
            spacingMm={6.4} 
            label="7+" 
            isActive={preferences.lineSpacingPreset === 'narrow-ruled'} 
          />
          {isCustom && (
            <SpacingPreview 
              spacingMm={preferences.customLineSpacing} 
              label="Custom" 
              isActive={true} 
            />
          )}
        </div>
      </div>

      <div className="p-3 bg-blue-50 rounded-lg border border-blue-200">
        <h4 className="text-xs font-semibold text-blue-900 mb-2">Educational Standards</h4>
        <ul className="text-xs text-blue-800 space-y-1">
          <li>• Kindergarten: 19mm (Zaner-Bloser)</li>
          <li>• Grades 1-3: 12.7mm (½ inch)</li>
          <li>• Grades 4-6: 8.7mm (11/32 inch, wide ruled)</li>
          <li>• Grades 7+: 6.4mm (¼ inch, narrow ruled)</li>
        </ul>
      </div>
    </div>
  );
};
