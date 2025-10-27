import { PaperSizeConfig, GuidelineStyleConfig, FontCategory, WorksheetPreferences } from '@/types/worksheet';

export const STORAGE_KEY = 'handwriting-worksheet-preferences';

// Canvas drawing constants
export const BASELINE_RATIO = 0.65;
export const TOP_LINE_RATIO = 0.35;
export const LINE_HEIGHT_MULTIPLIER = 1.8;
export const LINE_SET_HEIGHT_MULTIPLIER = 1.5;

// Line spacing presets based on educational standards
// Baseline-to-baseline measurements in millimeters
export const LINE_SPACING_PRESETS = {
  kindergarten: {
    spacingMm: 19,
    label: 'Kindergarten (19mm)',
    description: 'Zaner-Bloser standard for kindergarten',
    gradeLevel: 'K'
  },
  'grade1-3': {
    spacingMm: 12.7,
    label: 'Grades 1-3 (12.7mm / ½")',
    description: 'Standard for early elementary',
    gradeLevel: '1-3'
  },
  'grade4-6': {
    spacingMm: 8.7,
    label: 'Grades 4-6 (8.7mm / 11/32")',
    description: 'Wide ruled for upper elementary',
    gradeLevel: '4-6'
  },
  'wide-ruled': {
    spacingMm: 8.7,
    label: 'Wide Ruled (8.7mm)',
    description: 'Standard wide ruled notebook paper',
    gradeLevel: '4+'
  },
  'narrow-ruled': {
    spacingMm: 6.4,
    label: 'Narrow Ruled (6.4mm / ¼")',
    description: 'College ruled for older students',
    gradeLevel: '7+'
  },
  custom: {
    spacingMm: 12.7,
    label: 'Custom',
    description: 'Set your own spacing',
    gradeLevel: undefined
  }
};

// Convert millimeters to pixels at 96 DPI (standard screen resolution)
export const mmToPixels = (mm: number): number => {
  return (mm * 96) / 25.4;
};

export const PAPER_SIZES: Record<string, PaperSizeConfig> = {
  a4: { width: 794, height: 1122, label: 'A4 (210 × 297 mm)' },
  letter: { width: 816, height: 1056, label: 'Letter (8.5 × 11 in)' },
  legal: { width: 816, height: 1344, label: 'Legal (8.5 × 14 in)' },
  a5: { width: 559, height: 794, label: 'A5 (148 × 210 mm)' }
};

export const GUIDELINE_STYLES: Record<string, GuidelineStyleConfig> = {
  standard: { label: 'Standard (3 lines)', lines: 3, dottedMiddle: false },
  elementary: { label: 'Elementary (4 lines)', lines: 4, dottedMiddle: false },
  dotted: { label: 'Dotted Middle (3 lines)', lines: 3, dottedMiddle: true },
  double: { label: 'Double Lines (2 lines)', lines: 2, dottedMiddle: false }
};

export const GOOGLE_FONTS = {
  educational: [
    'Edu QLD Beginner', 'Edu SA Beginner', 'Edu VIC WA NT Beginner',
    'Edu NSW ACT Foundation', 'Edu TAS Beginner', 'Schoolbell',
    'Architects Daughter', 'Patrick Hand', 'Kalam', 'Gochi Hand',
    'Neucha', 'Handlee', 'Pangolin', 'Sriracha', 'Mali'
  ],
  handwriting: [
    'Caveat', 'Dancing Script', 'Pacifico', 'Satisfy', 'Cookie',
    'Great Vibes', 'Allura', 'Kaushan Script', 'Homemade Apple',
    'Permanent Marker', 'Indie Flower', 'Shadows Into Light',
    'Amatic SC', 'Reenie Beanie', 'Gloria Hallelujah', 'Covered By Your Grace',
    'Rock Salt', 'Just Another Hand', 'Dawning of a New Day'
  ],
  cursive: [
    'Tangerine', 'Alex Brush', 'Marck Script', 'Pinyon Script',
    'Mr Dafoe', 'Niconne', 'Sofia', 'Rouge Script', 'Calligraffitti',
    'Bad Script', 'Euphoria Script', 'Yellowtail', 'Sacramento',
    'Ruthie', 'Waiting for the Sunrise', 'Stalemate', 'Petit Formal Script'
  ],
  display: [
    'Lobster', 'Fredoka One', 'Righteous', 'Bangers', 'Chewy',
    'Passion One', 'Bungee', 'Monoton', 'Abril Fatface', 'Ultra',
    'Alfa Slab One', 'Patua One', 'Staatliches', 'Titan One',
    'Fredericka the Great', 'Bungee Shade', 'Creepster'
  ],
  serif: [
    'Merriweather', 'Playfair Display', 'Lora', 'Crimson Text',
    'PT Serif', 'Libre Baskerville', 'Vollkorn', 'Cardo',
    'Arvo', 'Bitter', 'Roboto Slab', 'Zilla Slab', 'Spectral',
    'Alegreya', 'Old Standard TT', 'Cormorant', 'EB Garamond'
  ],
  sansSerif: [
    'Roboto', 'Open Sans', 'Lato', 'Montserrat', 'Raleway',
    'Poppins', 'Nunito', 'Ubuntu', 'Mukta', 'Rubik',
    'Work Sans', 'Noto Sans', 'Oxygen', 'Quicksand', 'Barlow',
    'Josefin Sans', 'Comfortaa', 'Varela Round', 'Cabin'
  ],
  monospace: [
    'Roboto Mono', 'Source Code Pro', 'Courier Prime', 'Space Mono',
    'IBM Plex Mono', 'Inconsolata', 'Ubuntu Mono', 'Fira Mono',
    'PT Mono', 'Overpass Mono', 'Anonymous Pro', 'VT323'
  ]
};

export const CATEGORY_LABELS: Record<FontCategory, string> = {
  all: 'All Fonts',
  educational: 'Educational',
  handwriting: 'Handwriting',
  cursive: 'Cursive',
  display: 'Display',
  serif: 'Serif',
  sansSerif: 'Sans Serif',
  monospace: 'Monospace'
};

export const GUIDELINE_COLOR_STYLES = {
  default: {
    label: 'Default (Gray)',
    colors: {
      top: 'rgba(153, 153, 153, 1)',
      middle: 'rgba(204, 204, 204, 1)',
      baseline: 'rgba(153, 153, 153, 1)',
      bottom: 'rgba(153, 153, 153, 1)'
    }
  },
  rainbow: {
    label: 'Rainbow',
    colors: {
      top: 'rgba(255, 99, 71, 1)',      // Red
      middle: 'rgba(255, 165, 0, 1)',   // Orange
      baseline: 'rgba(50, 205, 50, 1)', // Green
      bottom: 'rgba(30, 144, 255, 1)'   // Blue
    }
  },
  pastel: {
    label: 'Pastel',
    colors: {
      top: 'rgba(255, 182, 193, 1)',    // Light pink
      middle: 'rgba(221, 160, 221, 1)', // Plum
      baseline: 'rgba(176, 224, 230, 1)', // Powder blue
      bottom: 'rgba(152, 251, 152, 1)'  // Pale green
    }
  },
  monochrome: {
    label: 'Monochrome (Black)',
    colors: {
      top: 'rgba(0, 0, 0, 1)',
      middle: 'rgba(100, 100, 100, 1)',
      baseline: 'rgba(0, 0, 0, 1)',
      bottom: 'rgba(0, 0, 0, 1)'
    }
  }
};

export const TEXT_TRACE_STYLES = {
  dotted: { label: 'Dotted', dashPattern: [2, 3] },
  dashed: { label: 'Dashed', dashPattern: [8, 4] },
  outline: { label: 'Outline Only', dashPattern: [] },
  solid: { label: 'Solid (Light)', dashPattern: [] }
};

export const DEFAULT_PREFERENCES: WorksheetPreferences = {
  // Global settings
  fontSize: 48,
  lineCount: 3,
  selectedFont: 'Edu QLD Beginner',
  showGuides: true,
  fontCategory: 'educational',
  paperSize: 'a4',
  guidelineStyle: 'elementary',
  guidelineThickness: 0.5,
  fullMarginGuides: false,
  textOpacity: 0.3,
  guidelineOpacity: 1,
  guidelineColorStyle: 'default',
  textTraceStyle: 'dotted',
  letterSpacing: 0,
  showStartingDots: false,
  showStrokeArrows: false,
  showPageNumbers: true,
  showFooter: true,
  footerText: 'Generated by InkTrace',

  // Text formatting
  wordSpacing: 5,
  characterWidth: 'normal',
  verticalAlignment: 'baseline',
  textCase: 'none',
  
  // Line spacing
  lineSpacingPreset: 'grade1-3',
  customLineSpacing: 12.7,

  // Enhanced guideline options
  customGuidelineColors: {
    top: '#999999',
    middle: '#cccccc',
    baseline: '#999999',
    bottom: '#999999'
  },
  dashedGuidelines: false,
  showMarginLines: false,
  emphasizeBaseline: false,
  baselineThickness: 1.5,

  // Content generation
  contentGeneration: {
    customWordList: [],
    useNamePractice: false,
    practiceName: '',
    useSentenceTemplate: false,
    sentenceTemplate: '',
    randomWordCount: 10
  },

  // Multi-page mode
  multiPageMode: false,
  pages: [],

  // Legacy single-page settings
  text: 'The quick brown fox jumps over the lazy dog',
  pageCount: 1,
  dottedFont: true,
  worksheetType: 'text',
  specificLetters: 'Aa Bb Cc Dd',
  alphabetCase: 'both',
  includeNumbers: true,
  includeSymbols: true,
  emptyPaper: false,
  repeatText: false
};
