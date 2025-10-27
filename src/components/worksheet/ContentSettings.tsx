import React from 'react';
import { FileText } from 'lucide-react';
import { WorksheetPreferences, WorksheetType, AlphabetCase } from '@/types/worksheet';

interface ContentSettingsProps {
  preferences: WorksheetPreferences;
  updatePreference: <K extends keyof WorksheetPreferences>(key: K, value: WorksheetPreferences[K]) => void;
}

export const ContentSettings: React.FC<ContentSettingsProps> = ({ preferences, updatePreference }) => {
  const {
    emptyPaper,
    worksheetType,
    text,
    specificLetters,
    alphabetCase,
    includeNumbers,
    includeSymbols,
    dottedFont,
    repeatText
  } = preferences;

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2 text-indigo-600 font-semibold mb-4">
        <FileText className="w-5 h-5" />
        <h2 className="text-base">Content Settings</h2>
      </div>

      <div className="flex items-center gap-3 p-3 bg-blue-50 rounded-lg">
        <input
          type="checkbox"
          id="emptyPaper"
          checked={emptyPaper}
          onChange={(e) => updatePreference('emptyPaper', e.target.checked)}
          className="w-5 h-5 text-indigo-600 rounded focus:ring-indigo-500"
        />
        <label htmlFor="emptyPaper" className="text-sm font-semibold text-gray-700">
          Generate Empty Practice Paper
        </label>
      </div>

      {!emptyPaper && (
        <>
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Worksheet Type
            </label>
            <select
              value={worksheetType}
              onChange={(e) => updatePreference('worksheetType', e.target.value as WorksheetType)}
              className="w-full px-3 py-2 border-2 border-gray-300 rounded-lg focus:border-indigo-500 focus:outline-none text-sm mb-3"
            >
              <option value="text">Custom Text</option>
              <option value="letters">Specific Letters</option>
              <option value="alphabet">Alphabet Practice</option>
              <option value="numbers">Numbers & Symbols</option>
            </select>

            {worksheetType === 'text' && (
              <textarea
                value={text}
                onChange={(e) => updatePreference('text', e.target.value)}
                placeholder="Enter text for the worksheet..."
                className="w-full h-24 px-3 py-2 border-2 border-gray-300 rounded-lg focus:border-indigo-500 focus:outline-none resize-none text-sm"
              />
            )}

            {worksheetType === 'letters' && (
              <div>
                <label className="block text-xs text-gray-600 mb-1">
                  Enter letters to practice (separated by spaces)
                </label>
                <input
                  type="text"
                  value={specificLetters}
                  onChange={(e) => updatePreference('specificLetters', e.target.value)}
                  placeholder="Aa Bb Cc Dd"
                  className="w-full px-3 py-2 border-2 border-gray-300 rounded-lg focus:border-indigo-500 focus:outline-none text-sm"
                />
              </div>
            )}

            {worksheetType === 'alphabet' && (
              <div className="space-y-2">
                <label className="block text-xs font-semibold text-gray-700">
                  Letter Case
                </label>
                <div className="flex gap-2">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="radio"
                      name="alphabetCase"
                      value="uppercase"
                      checked={alphabetCase === 'uppercase'}
                      onChange={(e) => updatePreference('alphabetCase', e.target.value as AlphabetCase)}
                      className="text-indigo-600"
                    />
                    <span className="text-sm">Uppercase</span>
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="radio"
                      name="alphabetCase"
                      value="lowercase"
                      checked={alphabetCase === 'lowercase'}
                      onChange={(e) => updatePreference('alphabetCase', e.target.value as AlphabetCase)}
                      className="text-indigo-600"
                    />
                    <span className="text-sm">Lowercase</span>
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="radio"
                      name="alphabetCase"
                      value="both"
                      checked={alphabetCase === 'both'}
                      onChange={(e) => updatePreference('alphabetCase', e.target.value as AlphabetCase)}
                      className="text-indigo-600"
                    />
                    <span className="text-sm">Both</span>
                  </label>
                </div>
              </div>
            )}

            {worksheetType === 'numbers' && (
              <div className="space-y-2">
                <label className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={includeNumbers}
                    onChange={(e) => updatePreference('includeNumbers', e.target.checked)}
                    className="w-4 h-4 text-indigo-600 rounded"
                  />
                  <span className="text-sm font-semibold">Include Numbers (0-9)</span>
                </label>
                <label className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={includeSymbols}
                    onChange={(e) => updatePreference('includeSymbols', e.target.checked)}
                    className="w-4 h-4 text-indigo-600 rounded"
                  />
                  <span className="text-sm font-semibold">Include Symbols</span>
                </label>
              </div>
            )}
          </div>

          <div className="flex items-center gap-3">
            <input
              type="checkbox"
              id="dotted"
              checked={dottedFont}
              onChange={(e) => updatePreference('dottedFont', e.target.checked)}
              className="w-5 h-5 text-indigo-600 rounded focus:ring-indigo-500"
            />
            <label htmlFor="dotted" className="text-sm font-semibold text-gray-700">
              Dotted Font (for tracing)
            </label>
          </div>

          <div className="flex items-center gap-3">
            <input
              type="checkbox"
              id="repeat"
              checked={repeatText}
              onChange={(e) => updatePreference('repeatText', e.target.checked)}
              className="w-5 h-5 text-indigo-600 rounded focus:ring-indigo-500"
            />
            <label htmlFor="repeat" className="text-sm font-semibold text-gray-700">
              Repeat Text for Full Page
            </label>
          </div>
        </>
      )}
    </div>
  );
};
