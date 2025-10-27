import React from 'react';
import { Plus, Trash2, Copy, GripVertical, FileText } from 'lucide-react';
import { PageConfig, WorksheetType, AlphabetCase, WorksheetPreferences } from '@/types/worksheet';
import { CollapsibleSection } from '@/components/ui/CollapsibleSection';

interface PageBuilderProps {
  preferences: WorksheetPreferences;
  updatePreference: <K extends keyof WorksheetPreferences>(key: K, value: WorksheetPreferences[K]) => void;
}

export const PageBuilder: React.FC<PageBuilderProps> = ({ preferences, updatePreference }) => {
  const { multiPageMode, pages } = preferences;

  const createNewPage = (): PageConfig => ({
    id: `page-${Date.now()}`,
    worksheetType: 'text',
    text: '',
    specificLetters: 'Aa Bb Cc Dd',
    alphabetCase: 'both',
    includeNumbers: true,
    includeSymbols: true,
    emptyPaper: false,
    repeatText: false
  });

  const addPage = () => {
    updatePreference('pages', [...pages, createNewPage()]);
  };

  const duplicatePage = (index: number) => {
    const pageToDuplicate = pages[index];
    const newPage = { ...pageToDuplicate, id: `page-${Date.now()}` };
    const newPages = [...pages];
    newPages.splice(index + 1, 0, newPage);
    updatePreference('pages', newPages);
  };

  const deletePage = (index: number) => {
    if (pages.length > 1) {
      updatePreference('pages', pages.filter((_, i) => i !== index));
    }
  };

  const updatePage = (index: number, updates: Partial<PageConfig>) => {
    const newPages = [...pages];
    newPages[index] = { ...newPages[index], ...updates };
    updatePreference('pages', newPages);
  };

  const movePage = (index: number, direction: 'up' | 'down') => {
    if (
      (direction === 'up' && index === 0) ||
      (direction === 'down' && index === pages.length - 1)
    ) {
      return;
    }

    const newPages = [...pages];
    const targetIndex = direction === 'up' ? index - 1 : index + 1;
    [newPages[index], newPages[targetIndex]] = [newPages[targetIndex], newPages[index]];
    updatePreference('pages', newPages);
  };

  const toggleMultiPageMode = (enabled: boolean) => {
    if (enabled && pages.length === 0) {
      // Initialize with one page from current settings
      const initialPage: PageConfig = {
        id: `page-${Date.now()}`,
        worksheetType: preferences.worksheetType,
        text: preferences.text,
        specificLetters: preferences.specificLetters,
        alphabetCase: preferences.alphabetCase,
        includeNumbers: preferences.includeNumbers,
        includeSymbols: preferences.includeSymbols,
        emptyPaper: preferences.emptyPaper,
        repeatText: preferences.repeatText
      };
      updatePreference('pages', [initialPage]);
    }
    updatePreference('multiPageMode', enabled);
  };

  return (
    <CollapsibleSection
      title="Multi-Page Builder"
      icon={<FileText className="w-4 h-4" />}
      gradient="bg-gradient-to-r from-violet-50 to-fuchsia-50"
      iconColor="text-violet-600"
      defaultOpen={multiPageMode}
    >
      <div className="space-y-4">
        {/* Toggle Multi-Page Mode */}
        <div className="flex items-center gap-3 p-3 bg-violet-50 rounded-lg border border-violet-100">
          <input
            type="checkbox"
            id="multiPageMode"
            checked={multiPageMode}
            onChange={(e) => toggleMultiPageMode(e.target.checked)}
            className="w-4 h-4 text-violet-600 rounded focus:ring-violet-500 flex-shrink-0"
          />
          <label htmlFor="multiPageMode" className="text-sm font-medium text-gray-700 cursor-pointer">
            Enable Multi-Page Mode
            <span className="block text-xs font-normal text-gray-500 mt-0.5">
              Create different content for each page
            </span>
          </label>
        </div>

        {multiPageMode && (
          <>
            {/* Page List */}
            <div className="space-y-3">
              {pages.map((page, index) => (
                <div
                  key={page.id}
                  className="border border-gray-200 rounded-lg p-4 bg-white hover:border-violet-300 transition-smooth"
                >
                  {/* Page Header */}
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-2">
                      <GripVertical className="w-4 h-4 text-gray-400 cursor-move" />
                      <span className="font-semibold text-sm text-gray-700">
                        Page {index + 1}
                      </span>
                    </div>
                    <div className="flex items-center gap-1">
                      <button
                        onClick={() => movePage(index, 'up')}
                        disabled={index === 0}
                        className="p-1 text-gray-400 hover:text-gray-600 disabled:opacity-30 transition-smooth"
                        title="Move up"
                      >
                        ↑
                      </button>
                      <button
                        onClick={() => movePage(index, 'down')}
                        disabled={index === pages.length - 1}
                        className="p-1 text-gray-400 hover:text-gray-600 disabled:opacity-30 transition-smooth"
                        title="Move down"
                      >
                        ↓
                      </button>
                      <button
                        onClick={() => duplicatePage(index)}
                        className="p-1 text-blue-500 hover:text-blue-700 transition-smooth"
                        title="Duplicate page"
                      >
                        <Copy className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => deletePage(index)}
                        disabled={pages.length === 1}
                        className="p-1 text-red-500 hover:text-red-700 disabled:opacity-30 transition-smooth"
                        title="Delete page"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>

                  {/* Page Content */}
                  <div className="space-y-3">
                    <div>
                      <label className="block text-xs font-semibold text-gray-600 mb-1">
                        Worksheet Type
                      </label>
                      <select
                        value={page.worksheetType}
                        onChange={(e) => updatePage(index, { worksheetType: e.target.value as WorksheetType })}
                        className="w-full px-2 py-1.5 border border-gray-200 rounded-lg focus:border-violet-500 focus:ring-2 focus:ring-violet-100 focus:outline-none text-sm bg-white transition-smooth"
                      >
                        <option value="text">Custom Text</option>
                        <option value="letters">Specific Letters</option>
                        <option value="alphabet">Alphabet Practice</option>
                        <option value="numbers">Numbers & Symbols</option>
                      </select>
                    </div>

                    {page.worksheetType === 'text' && (
                      <div>
                        <label className="block text-xs font-semibold text-gray-600 mb-1">
                          Text Content
                        </label>
                        <textarea
                          value={page.text}
                          onChange={(e) => updatePage(index, { text: e.target.value })}
                          placeholder="Enter text..."
                          className="w-full h-16 px-2 py-1.5 border border-gray-200 rounded-lg focus:border-violet-500 focus:ring-2 focus:ring-violet-100 focus:outline-none resize-none text-sm bg-white transition-smooth"
                        />
                      </div>
                    )}

                    {page.worksheetType === 'letters' && (
                      <div>
                        <label className="block text-xs font-semibold text-gray-600 mb-1">
                          Letters to Practice
                        </label>
                        <input
                          type="text"
                          value={page.specificLetters}
                          onChange={(e) => updatePage(index, { specificLetters: e.target.value })}
                          placeholder="Aa Bb Cc"
                          className="w-full px-2 py-1.5 border border-gray-200 rounded-lg focus:border-violet-500 focus:ring-2 focus:ring-violet-100 focus:outline-none text-sm bg-white transition-smooth"
                        />
                      </div>
                    )}

                    <div className="flex items-center gap-2 text-xs">
                      <input
                        type="checkbox"
                        id={`empty-${page.id}`}
                        checked={page.emptyPaper}
                        onChange={(e) => updatePage(index, { emptyPaper: e.target.checked })}
                        className="w-3 h-3 text-violet-600 rounded"
                      />
                      <label htmlFor={`empty-${page.id}`} className="text-gray-600 cursor-pointer">
                        Empty paper
                      </label>
                      
                      <input
                        type="checkbox"
                        id={`repeat-${page.id}`}
                        checked={page.repeatText}
                        onChange={(e) => updatePage(index, { repeatText: e.target.checked })}
                        className="w-3 h-3 text-violet-600 rounded ml-3"
                      />
                      <label htmlFor={`repeat-${page.id}`} className="text-gray-600 cursor-pointer">
                        Repeat text
                      </label>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Add Page Button */}
            <button
              onClick={addPage}
              className="w-full flex items-center justify-center gap-2 px-4 py-3 border-2 border-dashed border-violet-300 rounded-lg text-violet-600 hover:bg-violet-50 hover:border-violet-400 transition-smooth font-medium text-sm"
            >
              <Plus className="w-4 h-4" />
              Add New Page
            </button>

            <div className="p-3 bg-blue-50 rounded-lg border border-blue-100">
              <p className="text-xs text-gray-700 leading-relaxed">
                <strong className="text-blue-700">💡 Tip:</strong> Each page can have different content. 
                Global settings (font, size, guidelines) apply to all pages.
              </p>
            </div>
          </>
        )}
      </div>
    </CollapsibleSection>
  );
};
