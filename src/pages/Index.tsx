import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { WorksheetPreferences } from '@/types/worksheet';
import { useWorksheetPreferences } from '@/hooks/useWorksheetPreferences';
import { useFontLoader } from '@/hooks/useFontLoader';
import { generatePDF } from '@/utils/pdfGenerator';
import { getTotalPages } from '@/utils/pageSet';
import { applyPresetPreferences } from '@/utils/worksheetPreferences';
import { ContentSettings } from '@/components/worksheet/ContentSettings';
import { WorksheetPreview } from '@/components/worksheet/WorksheetPreview';
import { PageBuilder } from '@/components/worksheet/PageBuilder';
import { ContentGenerationSettings } from '@/components/worksheet/ContentGenerationSettings';
import { DocumentSetupSettings } from '@/components/worksheet/DocumentSetupSettings';
import { FontTypographySettings } from '@/components/worksheet/FontTypographySettings';
import { TextAppearanceSettings } from '@/components/worksheet/TextAppearanceSettings';
import { TextSpacingSettings } from '@/components/worksheet/TextSpacingSettings';
import { LineSpacingSettings } from '@/components/worksheet/LineSpacingSettings';
import { GuidelineLayoutSettings } from '@/components/worksheet/GuidelineLayoutSettings';
import { GuidelineAppearanceSettings } from '@/components/worksheet/GuidelineAppearanceSettings';
import { PresetSelector } from '@/components/worksheet/PresetSelector';
import { ProgressIndicator } from '@/components/ui/ProgressIndicator';
import { AccordionNav } from '@/components/ui/AccordionNav';
import { InfoTooltip } from '@/components/ui/InfoTooltip';
import { SETTINGS_INFO } from '@/constants/settingsInfo';
import { FileText, Type, Settings, Layout, Ruler, Zap } from 'lucide-react';

const HandwritingWorksheetGenerator = () => {
  const {
    preferences,
    updatePreference,
    replacePreferences,
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

  const handleSelectPreset = (presetPreferences: Partial<WorksheetPreferences>) => {
    replacePreferences(applyPresetPreferences(preferences, presetPreferences));
  };

  const handleGeneratePDF = async () => {
    setIsGenerating(true);
    setCurrentPage(0);
    
    try {
      // Determine total pages
      const totalPages = getTotalPages(preferences);
      
      // Simulate progress for each page
      for (let i = 1; i <= totalPages; i++) {
        setCurrentPage(i);
        await new Promise(resolve => setTimeout(resolve, 100));
      }
      
      await generatePDF(preferences);
      
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
        totalPages={getTotalPages(preferences)}
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
      
      <div className="min-h-screen bg-gray-50 overflow-x-hidden">
        {/* Header */}
        <header className="bg-white border-b border-gray-200 px-4 sm:px-6 py-4">
          <div className="max-w-[1600px] mx-auto flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center gap-3 min-w-0">
              <Link to="/" className="flex items-center gap-3 min-w-0" aria-label="Back to home">
                <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center shrink-0">
                  <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                  </svg>
                </div>
                <h1 className="text-lg sm:text-xl font-semibold text-gray-900 truncate">InkTrace</h1>
              </Link>
            </div>
            
            <div className="flex items-center gap-2 sm:gap-3 ml-auto flex-wrap justify-end">
              <button
                onClick={resetPreferences}
                className="px-3 sm:px-4 py-2 text-sm font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors flex items-center gap-2"
              >
                <svg className="w-4 h-4 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                </svg>
                <span className="hidden sm:inline">Reset</span>
              </button>
              <button
                onClick={savePreferences}
                className="px-3 sm:px-4 py-2 text-sm font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors flex items-center gap-2"
              >
                <svg className="w-4 h-4 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-3m-1 4l-3 3m0 0l-3-3m3 3V4" />
                </svg>
                <span className="hidden sm:inline">Save</span>
              </button>
              <button
                onClick={handleGeneratePDF}
                disabled={isDownloadDisabled}
                className="px-3 sm:px-6 py-2 text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 disabled:bg-gray-300 disabled:cursor-not-allowed rounded-lg transition-colors flex items-center gap-2"
                aria-label="Download PDF"
              >
                <svg className="w-4 h-4 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                </svg>
                <span className="hidden sm:inline">Download PDF</span>
              </button>
            </div>
          </div>
        </header>

        <div className="max-w-[1600px] mx-auto">
          <div className="grid lg:grid-cols-[380px_1fr] gap-0 lg:h-[calc(100vh-73px)]">
            {/* Left Sidebar: Accordion Navigation */}
            <div className="bg-white border-r border-gray-200 lg:h-full lg:overflow-hidden">
              <div className="settings-sidebar h-full overflow-y-auto overflow-x-hidden p-4 sm:p-6">
                <div className="space-y-3 pb-6">
                  <AccordionNav
                    defaultOpen="presets"
                    sections={[
                      {
                        id: 'presets',
                        title: (
                          <span className="flex items-center">
                            Quick Start Presets
                            <InfoTooltip {...SETTINGS_INFO.presets} />
                          </span>
                        ),
                        icon: <Zap className="w-5 h-5" />,
                        content: (
                          <PresetSelector
                            onSelectPreset={handleSelectPreset}
                          />
                        )
                      },
                      {
                        id: 'document',
                        title: (
                          <span className="flex items-center">
                            Document
                            <InfoTooltip {...SETTINGS_INFO.document} />
                          </span>
                        ),
                        icon: <Settings className="w-5 h-5" />,
                        content: (
                          <DocumentSetupSettings
                            preferences={preferences}
                            updatePreference={updatePreference}
                          />
                        )
                      },
                      {
                        id: 'multipage',
                        title: 'Pages',
                        icon: <Layout className="w-5 h-5" />,
                        content: preferences.multiPageMode ? (
                          <PageBuilder
                            preferences={preferences}
                            updatePreference={updatePreference}
                          />
                        ) : (
                          <p className="text-sm text-gray-500">Enable Multi-Page Mode in Document Setup to use this feature</p>
                        )
                      },
                      {
                        id: 'content',
                        title: (
                          <span className="flex items-center">
                            Content
                            <InfoTooltip {...SETTINGS_INFO.content} />
                          </span>
                        ),
                        icon: <FileText className="w-5 h-5" />,
                        content: !preferences.multiPageMode ? (
                          <div className="space-y-6">
                            <ContentSettings
                              preferences={preferences}
                              updatePreference={updatePreference}
                            />
                            {!preferences.emptyPaper && (
                              <div className="space-y-3 border-t border-gray-200 pt-4">
                                <h3 className="text-sm font-semibold text-gray-700">Generate practice content</h3>
                                <ContentGenerationSettings
                                  preferences={preferences}
                                  updatePreference={updatePreference}
                                />
                              </div>
                            )}
                          </div>
                        ) : (
                          <p className="text-sm text-gray-500">Content is managed in Pages.</p>
                        )
                      },
                      {
                        id: 'text',
                        title: (
                          <span className="flex items-center">
                            Text
                            <InfoTooltip {...SETTINGS_INFO.text} />
                          </span>
                        ),
                        icon: <Type className="w-5 h-5" />,
                        content: !preferences.multiPageMode && !preferences.emptyPaper ? (
                          <div className="space-y-6">
                            <div className="space-y-3">
                              <h3 className="text-sm font-semibold text-gray-700">Font and typography</h3>
                              <FontTypographySettings
                                preferences={preferences}
                                updatePreference={updatePreference}
                                searchQuery={searchQuery}
                                filteredFonts={filteredFonts}
                                onSearchChange={setSearchQuery}
                                onFontHover={loadFont}
                              />
                            </div>
                            <div className="space-y-3 border-t border-gray-200 pt-4">
                              <h3 className="text-sm font-semibold text-gray-700">Trace appearance</h3>
                              <TextAppearanceSettings
                                preferences={preferences}
                                updatePreference={updatePreference}
                              />
                            </div>
                            <div className="space-y-3 border-t border-gray-200 pt-4">
                              <h3 className="text-sm font-semibold text-gray-700">Spacing</h3>
                              <TextSpacingSettings
                                preferences={preferences}
                                updatePreference={updatePreference}
                              />
                            </div>
                          </div>
                        ) : (
                          <p className="text-sm text-gray-500">Text settings are hidden for empty paper and managed globally outside multi-page content.</p>
                        )
                      },
                      {
                        id: 'guidelines',
                        title: (
                          <span className="flex items-center">
                            Guidelines
                            <InfoTooltip {...SETTINGS_INFO.guidelines} />
                          </span>
                        ),
                        icon: <Ruler className="w-5 h-5" />,
                        content: (
                          <div className="space-y-6">
                            <div className="space-y-3">
                              <h3 className="text-sm font-semibold text-gray-700">Line spacing</h3>
                              <LineSpacingSettings
                                preferences={preferences}
                                updatePreference={updatePreference}
                              />
                            </div>
                            <div className="space-y-3 border-t border-gray-200 pt-4">
                              <h3 className="text-sm font-semibold text-gray-700">Layout</h3>
                              <GuidelineLayoutSettings
                                preferences={preferences}
                                updatePreference={updatePreference}
                              />
                            </div>
                            {preferences.showGuides && (
                              <div className="space-y-3 border-t border-gray-200 pt-4">
                                <h3 className="text-sm font-semibold text-gray-700">Appearance</h3>
                                <GuidelineAppearanceSettings
                                  preferences={preferences}
                                  updatePreference={updatePreference}
                                />
                              </div>
                            )}
                          </div>
                        )
                      }
                    ]}
                  />
                </div>
              </div>
            </div>

            {/* Right Side: Preview */}
            <div className="bg-gray-100 p-4 sm:p-8 lg:h-full lg:overflow-auto">
              <WorksheetPreview
                preferences={preferences}
                fontsLoaded={fontsLoaded}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default HandwritingWorksheetGenerator;
