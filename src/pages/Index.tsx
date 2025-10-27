import React, { useState } from 'react';
import { useWorksheetPreferences } from '@/hooks/useWorksheetPreferences';
import { useFontLoader } from '@/hooks/useFontLoader';
import { generatePDF } from '@/utils/pdfGenerator';
import { WorksheetHeader } from '@/components/worksheet/WorksheetHeader';
import { ContentSettings } from '@/components/worksheet/ContentSettings';
import { FontSelector } from '@/components/worksheet/FontSelector';
import { PageSettings, TextFormattingSettings } from '@/components/worksheet/PageSettings';
import { WorksheetPreview } from '@/components/worksheet/WorksheetPreview';
import { LineStyleSettings } from '@/components/worksheet/LineStyleSettings';
import { PageBuilder } from '@/components/worksheet/PageBuilder';
import { ProgressIndicator } from '@/components/ui/ProgressIndicator';

const HandwritingWorksheetGenerator = () => {
  const {
    preferences,
    updatePreference,
    savePreferences,
    loadPreferences,
    resetPreferences
  } = useWorksheetPreferences();

  const [searchQuery, setSearchQuery] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [currentPage, setCurrentPage] = useState(0);

  const { filteredFonts, loadFont, fontsLoaded } = useFontLoader(
    preferences.selectedFont,
    preferences.fontCategory,
    searchQuery
  );

  const handleGeneratePDF = async () => {
    setIsGenerating(true);
    setCurrentPage(0);
    
    try {
      // Determine total pages
      const totalPages = preferences.multiPageMode ? preferences.pages.length : preferences.pageCount;
      
      // Simulate progress for each page
      for (let i = 1; i <= totalPages; i++) {
        setCurrentPage(i);
        await new Promise(resolve => setTimeout(resolve, 100));
      }
      
      generatePDF(preferences);
      
      // Keep showing for a moment after completion
      await new Promise(resolve => setTimeout(resolve, 500));
    } finally {
      setIsGenerating(false);
      setCurrentPage(0);
    }
  };

  const isDownloadDisabled = preferences.multiPageMode 
    ? preferences.pages.length === 0
    : (!preferences.text && preferences.worksheetType === 'text' && !preferences.emptyPaper) ||
      (preferences.worksheetType === 'numbers' && !preferences.includeNumbers && !preferences.includeSymbols);

  return (
    <>
      <ProgressIndicator 
        isGenerating={isGenerating}
        currentPage={currentPage}
        totalPages={preferences.multiPageMode ? preferences.pages.length : preferences.pageCount}
      />
      
      <style>{`
        .settings-sidebar::-webkit-scrollbar {
          display: none;
        }
        .settings-sidebar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
      
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 p-4 md:p-6">
        <div className="max-w-[1400px] mx-auto">
        <div className="bg-white rounded-2xl shadow-elevated overflow-visible">
          <WorksheetHeader
            onSave={savePreferences}
            onLoad={loadPreferences}
            onReset={resetPreferences}
            onDownload={handleGeneratePDF}
            pageCount={preferences.multiPageMode ? preferences.pages.length : preferences.pageCount}
            isDownloadDisabled={isDownloadDisabled}
          />

          <div className="grid lg:grid-cols-[420px_1fr] gap-0 border-t border-gray-100 lg:h-[calc(100vh-180px)]">
            {/* Left Sidebar: All Settings */}
            <div className="border-r border-gray-100 bg-gradient-to-b from-gray-50 to-white lg:h-full lg:overflow-hidden">
              <div className="settings-sidebar h-full overflow-y-auto overflow-x-hidden px-6 py-6">
                <div className="space-y-5 pb-6">
                <PageBuilder
                  preferences={preferences}
                  updatePreference={updatePreference}
                />

                {!preferences.multiPageMode && (
                  <ContentSettings
                    preferences={preferences}
                    updatePreference={updatePreference}
                  />
                )}

                {!preferences.emptyPaper && !preferences.multiPageMode && (
                  <FontSelector
                    selectedFont={preferences.selectedFont}
                    fontCategory={preferences.fontCategory}
                    searchQuery={searchQuery}
                    filteredFonts={filteredFonts}
                    onFontChange={(font) => updatePreference('selectedFont', font)}
                    onCategoryChange={(category) => updatePreference('fontCategory', category)}
                    onSearchChange={setSearchQuery}
                    onFontHover={loadFont}
                  />
                )}

                <PageSettings
                  preferences={preferences}
                  updatePreference={updatePreference}
                />

                <TextFormattingSettings
                  preferences={preferences}
                  updatePreference={updatePreference}
                />

                <LineStyleSettings
                  preferences={preferences}
                  updatePreference={updatePreference}
                />
              </div>
              </div>
            </div>

            {/* Right Side: Preview */}
            <div className="bg-white p-6 lg:p-8">
              <WorksheetPreview
                preferences={preferences}
                fontsLoaded={fontsLoaded}
              />
            </div>
          </div>
        </div>
      </div>
      </div>
    </>
  );
};

export default HandwritingWorksheetGenerator;
