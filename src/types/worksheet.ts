// Type definitions for the worksheet generator

export type WorksheetType = 'text' | 'letters' | 'alphabet' | 'numbers';
export type AlphabetCase = 'uppercase' | 'lowercase' | 'both';
export type PaperSize = 'a4' | 'letter' | 'legal' | 'a5';
export type GuidelineStyle = 'standard' | 'elementary' | 'dotted' | 'double';
export type FontCategory = 'all' | 'educational' | 'handwriting' | 'cursive' | 'display' | 'serif' | 'sansSerif' | 'monospace';
export type GuidelineColorStyle = 'default' | 'rainbow' | 'pastel' | 'monochrome';
export type TextTraceStyle = 'dotted' | 'dashed' | 'outline' | 'solid';

export interface PageConfig {
  id: string;
  worksheetType: WorksheetType;
  text: string;
  specificLetters: string;
  alphabetCase: AlphabetCase;
  includeNumbers: boolean;
  includeSymbols: boolean;
  emptyPaper: boolean;
  repeatText: boolean;
}

export interface WorksheetPreferences {
  // Global settings
  fontSize: number;
  lineCount: number;
  selectedFont: string;
  showGuides: boolean;
  fontCategory: FontCategory;
  paperSize: PaperSize;
  guidelineStyle: GuidelineStyle;
  guidelineThickness: number;
  fullMarginGuides: boolean;
  textOpacity: number;
  guidelineOpacity: number;
  guidelineColorStyle: GuidelineColorStyle;
  textTraceStyle: TextTraceStyle;
  letterSpacing: number;
  showStartingDots: boolean;
  showStrokeArrows: boolean;
  showPageNumbers: boolean;
  showFooter: boolean;
  footerText: string;
  
  // Multi-page mode
  multiPageMode: boolean;
  pages: PageConfig[];
  
  // Legacy single-page settings (for backward compatibility)
  text: string;
  pageCount: number;
  dottedFont: boolean;
  worksheetType: WorksheetType;
  specificLetters: string;
  alphabetCase: AlphabetCase;
  includeNumbers: boolean;
  includeSymbols: boolean;
  emptyPaper: boolean;
  repeatText: boolean;
}

export interface PaperSizeConfig {
  width: number;
  height: number;
  label: string;
}

export interface GuidelineStyleConfig {
  label: string;
  lines: number;
  dottedMiddle: boolean;
}
