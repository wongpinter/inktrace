import React from 'react';
import { WorksheetPreferences } from '@/types/worksheet';
import { WORKSHEET_PRESETS } from '@/constants/worksheet';

interface PresetSelectorProps {
  onSelectPreset: (preferences: Partial<WorksheetPreferences>) => void;
}

export const PresetSelector: React.FC<PresetSelectorProps> = ({ onSelectPreset }) => {
  return (
    <div className="space-y-4">
      <div>
        <h3 className="text-sm font-semibold text-gray-700 mb-3">Quick Start Presets</h3>
        <p className="text-xs text-gray-500 mb-4">
          Choose a preset to quickly configure your worksheet for common use cases
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        {Object.entries(WORKSHEET_PRESETS).map(([key, preset]) => (
          <button
            key={key}
            onClick={() => onSelectPreset(preset.preferences)}
            className="flex items-start p-4 text-left border-2 border-gray-200 rounded-lg hover:border-indigo-400 hover:bg-indigo-50 transition-all group"
          >
            <div className="text-3xl mr-3 group-hover:scale-110 transition-transform">
              {preset.icon}
            </div>
            <div className="flex-1">
              <h4 className="text-sm font-semibold text-gray-800 group-hover:text-indigo-700">
                {preset.name}
              </h4>
              <p className="text-xs text-gray-600 mt-1">
                {preset.description}
              </p>
            </div>
          </button>
        ))}
      </div>

      <div className="p-3 bg-amber-50 rounded-lg border border-amber-200">
        <p className="text-xs text-amber-800">
          <span className="font-semibold">💡 Tip:</span> After selecting a preset, you can customize any settings to match your specific needs.
        </p>
      </div>
    </div>
  );
};
