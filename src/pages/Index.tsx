import React, { useState } from 'react';
import { useWorksheetPreferences } from '@/hooks/useWorksheetPreferences';
import { useFontLoader } from '@/hooks/useFontLoader';
import { generatePDF } from '@/utils/pdfGenerator';
import { WorksheetHeader } from '@/components/worksheet/WorksheetHeader';
import { ContentSettings } from '@/components/worksheet/ContentSettings';
import { FontSelector } from '@/components/worksheet/FontSelector';
import { PageSettings } from '@/components/worksheet/PageSettings';
import { WorksheetPreview } from '@/components/worksheet/WorksheetPreview';

const HandwritingWorksheetGenerator = () => {
  const {
    preferences,
    updatePreference,
    savePreferences,
    loadPreferences,
    resetPreferences
  } = useWorksheetPreferences();

  const [searchQuery, setSearchQuery] = useState('');

  const { filteredFonts, loadFont, fontsLoaded } = useFontLoader(
    preferences.selectedFont,
    preferences.fontCategory,
    searchQuery
  );

  const handleGeneratePDF = () => {
    generatePDF(preferences);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
      <div className="max-w-7xl mx-auto">
        <div className="bg-white rounded-2xl shadow-2xl p-6">
          <WorksheetHeader
            onSave={savePreferences}
            onLoad={loadPreferences}
            onReset={resetPreferences}
          />

          <div className="grid lg:grid-cols-3 gap-6">
            {/* Column 1: Content Settings */}
            <div className="space-y-4">
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
            </div>

            {/* Column 2: Page Settings */}
            <PageSettings
              preferences={preferences}
              updatePreference={updatePreference}
              onGeneratePDF={handleGeneratePDF}
            />

            {/* Column 3: Preview */}
            <WorksheetPreview
              preferences={preferences}
              fontsLoaded={fontsLoaded}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default HandwritingWorksheetGenerator;
