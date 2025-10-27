import React from 'react';
import { Settings } from 'lucide-react';
import { WorksheetPreferences, PaperSize, GuidelineStyle } from '@/types/worksheet';
import { PAPER_SIZES, GUIDELINE_STYLES } from '@/constants/worksheet';
import { CollapsibleSection } from '@/components/ui/CollapsibleSection';

interface PageSettingsProps {
  preferences: WorksheetPreferences;
  updatePreference: <K extends keyof WorksheetPreferences>(key: K, value: WorksheetPreferences[K]) => void;
}

export const PageSettings: React.FC<PageSettingsProps> = ({ preferences, updatePreference }) => {
  const {
    paperSize,
    pageCount,
    fontSize,
    lineCount,
    guidelineStyle,
    guidelineThickness,
    showGuides,
    fullMarginGuides,
    textOpacity,
    guidelineOpacity
  } = preferences;

  return (
    <CollapsibleSection
      title="Page Setup"
      icon={<Settings className="w-4 h-4" />}
      gradient="bg-gradient-to-r from-green-50 to-emerald-50"
      iconColor="text-green-600"
      defaultOpen={true}
    >
        <div>
        <label className="block text-sm font-semibold text-gray-700 mb-2">
          Paper Size
        </label>
        <select
          value={paperSize}
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
          Number of Pages: {pageCount}
        </label>
        <input
          type="range"
          min="1"
          max="10"
          value={pageCount}
          onChange={(e) => updatePreference('pageCount', Number(e.target.value))}
          className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
        />
      </div>

      <div>
        <label className="block text-sm font-semibold text-gray-700 mb-2">
          Font Size: {fontSize}px
        </label>
        <input
          type="range"
          min="24"
          max="72"
          step="2"
          value={fontSize}
          onChange={(e) => updatePreference('fontSize', Number(e.target.value))}
          className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
        />
      </div>

      <div>
        <label className="block text-sm font-semibold text-gray-700 mb-2">
          Practice Lines: {lineCount}
        </label>
        <input
          type="range"
          min="1"
          max="5"
          value={lineCount}
          onChange={(e) => updatePreference('lineCount', Number(e.target.value))}
          className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
        />
      </div>

      <div>
        <label className="block text-sm font-semibold text-gray-700 mb-2">
          Guideline Style
        </label>
        <select
          value={guidelineStyle}
          onChange={(e) => updatePreference('guidelineStyle', e.target.value as GuidelineStyle)}
          className="w-full px-3 py-2 border-2 border-gray-300 rounded-lg focus:border-indigo-500 focus:outline-none text-sm"
        >
          {Object.entries(GUIDELINE_STYLES).map(([key, { label }]) => (
            <option key={key} value={key}>{label}</option>
          ))}
        </select>
      </div>

      <div>
        <label className="block text-sm font-semibold text-gray-700 mb-2">
          Guideline Thickness: {guidelineThickness.toFixed(2)}px
        </label>
        <input
          type="range"
          min="0.25"
          max="3"
          step="0.25"
          value={guidelineThickness}
          onChange={(e) => updatePreference('guidelineThickness', Number(e.target.value))}
          className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
        />
      </div>

      <div className="space-y-3 p-3 bg-gray-50 rounded-lg">
        <div className="flex items-center gap-3">
          <input
            type="checkbox"
            id="guides"
            checked={showGuides}
            onChange={(e) => updatePreference('showGuides', e.target.checked)}
            className="w-4 h-4 text-indigo-600 rounded focus:ring-indigo-500"
          />
          <label htmlFor="guides" className="text-sm font-medium text-gray-700 cursor-pointer">
            Show Guidelines
          </label>
        </div>

        {showGuides && (
          <div className="flex items-center gap-3 pl-7">
            <input
              type="checkbox"
              id="fullMargin"
              checked={fullMarginGuides}
              onChange={(e) => updatePreference('fullMarginGuides', e.target.checked)}
              className="w-4 h-4 text-indigo-600 rounded focus:ring-indigo-500"
            />
            <label htmlFor="fullMargin" className="text-sm text-gray-600 cursor-pointer">
              Extend to margins
            </label>
          </div>
        )}
      </div>

      <div className="space-y-2">
        <label className="block text-sm font-semibold text-gray-700">
          Tracing Opacity: {Math.round(textOpacity * 100)}%
        </label>
        <input
          type="range"
          min="0.1"
          max="1"
          step="0.1"
          value={textOpacity}
          onChange={(e) => updatePreference('textOpacity', Number(e.target.value))}
          className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
        />
        <p className="text-xs text-gray-500 leading-relaxed">How visible the tracing text appears</p>
      </div>

      <div className="pt-4 border-t border-gray-200 space-y-3">
        <h3 className="text-sm font-semibold text-gray-700">Footer Options</h3>
        
        <div className="flex items-center gap-3">
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

        <div className="flex items-start gap-3">
          <input
            type="checkbox"
            id="footer"
            checked={preferences.showFooter}
            onChange={(e) => updatePreference('showFooter', e.target.checked)}
            className="w-4 h-4 mt-0.5 text-indigo-600 rounded focus:ring-indigo-500 flex-shrink-0"
          />
          <label htmlFor="footer" className="text-sm text-gray-700 cursor-pointer flex-1">
            Show footer text
          </label>
        </div>

        {preferences.showFooter && (
          <div className="pl-7 space-y-1">
            <input
              type="text"
              value={preferences.footerText}
              onChange={(e) => updatePreference('footerText', e.target.value)}
              placeholder="Generated by..."
              className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 focus:outline-none text-sm bg-white transition-smooth"
            />
            <p className="text-xs text-gray-500 leading-relaxed">Customize your footer text</p>
          </div>
        )}
      </div>
    </CollapsibleSection>
  );
};
