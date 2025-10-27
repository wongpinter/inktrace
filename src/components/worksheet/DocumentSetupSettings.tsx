import React from 'react';
import { WorksheetPreferences, PaperSize } from '@/types/worksheet';
import { PAPER_SIZES } from '@/constants/worksheet';

interface DocumentSetupSettingsProps {
  preferences: WorksheetPreferences;
  updatePreference: <K extends keyof WorksheetPreferences>(key: K, value: WorksheetPreferences[K]) => void;
}

export const DocumentSetupSettings: React.FC<DocumentSetupSettingsProps> = ({ 
  preferences, 
  updatePreference 
}) => {
  return (
    <div className="space-y-4">
      <div>
        <label className="block text-sm font-semibold text-gray-700 mb-2">
          Paper Size
        </label>
        <select
          value={preferences.paperSize}
          onChange={(e) => updatePreference('paperSize', e.target.value as PaperSize)}
          className="w-full px-3 py-2 border-2 border-gray-300 rounded-lg focus:border-indigo-500 focus:outline-none text-sm"
        >
          {Object.entries(PAPER_SIZES).map(([key, { label }]) => (
            <option key={key} value={key}>{label}</option>
          ))}
        </select>
      </div>

      <div>
        <label className="block text-sm font-semibold text-gray-700 mb-2">
          Number of Pages: {preferences.pageCount}
        </label>
        <input
          type="range"
          min="1"
          max="10"
          value={preferences.pageCount}
          onChange={(e) => updatePreference('pageCount', Number(e.target.value))}
          className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
        />
      </div>

      <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
        <input
          type="checkbox"
          id="pageNumbers"
          checked={preferences.showPageNumbers}
          onChange={(e) => updatePreference('showPageNumbers', e.target.checked)}
          className="w-4 h-4 text-indigo-600 rounded focus:ring-indigo-500 flex-shrink-0"
        />
        <label htmlFor="pageNumbers" className="text-sm text-gray-700 cursor-pointer">
          Show page numbers
        </label>
      </div>

      <div className="flex items-center gap-3 p-3 bg-indigo-50 rounded-lg border border-indigo-200">
        <input
          type="checkbox"
          id="multiPageMode"
          checked={preferences.multiPageMode}
          onChange={(e) => updatePreference('multiPageMode', e.target.checked)}
          className="w-4 h-4 text-indigo-600 rounded focus:ring-indigo-500 flex-shrink-0"
        />
        <label htmlFor="multiPageMode" className="text-sm font-medium text-indigo-900 cursor-pointer">
          Enable Multi-Page Builder Mode
        </label>
      </div>
      
      {preferences.multiPageMode && (
        <p className="text-xs text-gray-500 leading-relaxed">
          Multi-page mode is active. Use the Multi-Page Builder section to manage individual pages.
        </p>
      )}
    </div>
  );
};
