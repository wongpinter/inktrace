import React, { useState } from 'react';
import { useWorksheetPreferences } from '@/hooks/useWorksheetPreferences';
import { useFontLoader } from '@/hooks/useFontLoader';
import { generatePDF } from '@/utils/pdfGenerator';
import { WorksheetHeader } from '@/components/worksheet/WorksheetHeader';
import { ContentSettings } from '@/components/worksheet/ContentSettings';
import { FontSelector } from '@/components/worksheet/FontSelector';
import { PageSettings } from '@/components/worksheet/PageSettings';
import { WorksheetPreview } from '@/components/worksheet/WorksheetPreview';
import { LineStyleSettings } from '@/components/worksheet/LineStyleSettings';
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
      // Simulate progress for each page
      for (let i = 1; i <= preferences.pageCount; i++) {
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

  const isDownloadDisabled =
    (!preferences.text && preferences.worksheetType === 'text' && !preferences.emptyPaper) ||
    (preferences.worksheetType === 'numbers' && !preferences.includeNumbers && !preferences.includeSymbols);

  return (
    <>
      <ProgressIndicator 
        isGenerating={isGenerating}
        currentPage={currentPage}
        totalPages={preferences.pageCount}
      />
      
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 p-4 md:p-6">
        <div className="max-w-[1400px] mx-auto">
        <div className="bg-white rounded-2xl shadow-elevated overflow-hidden">
          <WorksheetHeader
            onSave={savePreferences}
            onLoad={loadPreferences}
            onReset={resetPreferences}
            onDownload={handleGeneratePDF}
            pageCount={preferences.pageCount}
            isDownloadDisabled={isDownloadDisabled}
          />

          <div className="grid lg:grid-cols-[420px_1fr] gap-0 border-t border-gray-100">
            {/* Left Sidebar: All Settings */}
            <div className="relative border-r border-gray-100 bg-gradient-to-b from-gray-50 to-white">
              <div className="p-6 max-h-[calc(100vh-100px)] overflow-y-auto overflow-x-hidden" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
                <style>{`
                  div::-webkit-scrollbar {
                    display: none;
                  }
                `}</style>
                <div className="space-y-5 pb-8">
                <ContentSettings
                  preferences={preferences}
                  updatePreference={updatePreference}
                />

                {!preferences.emptyPaper && (
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

                <LineStyleSettings
                  preferences={preferences}
                  updatePreference={updatePreference}
                />
              </div>
              </div>
              
              {/* Scroll fade indicator at bottom */}
              <div className="absolute bottom-0 left-0 right-0 h-12 bg-gradient-to-t from-gray-50 to-transparent pointer-events-none z-10"></div>
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
