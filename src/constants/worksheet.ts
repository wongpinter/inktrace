import { PaperSizeConfig, GuidelineStyleConfig, FontCategory, WorksheetPreferences } from '@/types/worksheet';

export const STORAGE_KEY = 'handwriting-worksheet-preferences';

// Canvas drawing constants
export const BASELINE_RATIO = 0.65;
export const TOP_LINE_RATIO = 0.35;
export const LINE_HEIGHT_MULTIPLIER = 1.8;
export const LINE_SET_HEIGHT_MULTIPLIER = 1.5;

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

export const DEFAULT_PREFERENCES: WorksheetPreferences = {
  text: 'The quick brown fox jumps over the lazy dog',
  fontSize: 48,
  lineCount: 3,
  selectedFont: 'Edu QLD Beginner',
  showGuides: true,
  fontCategory: 'educational',
  paperSize: 'a4',
  pageCount: 1,
  dottedFont: true,
  guidelineStyle: 'elementary',
  guidelineThickness: 0.5,
  emptyPaper: false,
  repeatText: false,
  fullMarginGuides: false,
  textOpacity: 0.3,
  guidelineOpacity: 1,
  worksheetType: 'text',
  specificLetters: 'Aa Bb Cc Dd',
  alphabetCase: 'both',
  includeNumbers: true,
  includeSymbols: true
};
