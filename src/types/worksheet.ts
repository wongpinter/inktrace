// Type definitions for the worksheet generator

export type WorksheetType = 'text' | 'letters' | 'alphabet' | 'numbers';
export type AlphabetCase = 'uppercase' | 'lowercase' | 'both';
export type PaperSize = 'a4' | 'letter' | 'legal' | 'a5';
export type GuidelineStyle = 'standard' | 'elementary' | 'dotted' | 'double';
export type FontCategory = 'all' | 'educational' | 'handwriting' | 'cursive' | 'display' | 'serif' | 'sansSerif' | 'monospace';
export type GuidelineColorStyle = 'default' | 'rainbow' | 'pastel' | 'monochrome';
export type TextTraceStyle = 'dotted' | 'dashed' | 'outline' | 'solid';

export interface WorksheetPreferences {
  text: string;
  fontSize: number;
  lineCount: number;
  selectedFont: string;
  showGuides: boolean;
  fontCategory: FontCategory;
  paperSize: PaperSize;
  pageCount: number;
  dottedFont: boolean;
  guidelineStyle: GuidelineStyle;
  guidelineThickness: number;
  emptyPaper: boolean;
  repeatText: boolean;
  fullMarginGuides: boolean;
  textOpacity: number;
  guidelineOpacity: number;
  worksheetType: WorksheetType;
  specificLetters: string;
  alphabetCase: AlphabetCase;
  includeNumbers: boolean;
  includeSymbols: boolean;
  // New customizable line style options
  guidelineColorStyle: GuidelineColorStyle;
  textTraceStyle: TextTraceStyle;
  letterSpacing: number;
  showStartingDots: boolean;
  showStrokeArrows: boolean;
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
