// Information and descriptions for each settings category

export interface SettingsCategoryInfo {
  title: string;
  description: string;
  changes: string[];
}

export const SETTINGS_INFO: Record<string, SettingsCategoryInfo> = {
  presets: {
    title: 'Quick Start Presets',
    description: 'Pre-configured templates optimized for different grade levels and use cases. Click any preset to instantly apply all its settings. You can customize individual settings afterwards.',
    changes: [
      'Font size and style',
      'Line spacing (baseline-to-baseline)',
      'Guideline style and appearance',
      'Text opacity and trace style',
      'Letter and word spacing',
      'Print quality settings'
    ]
  },
  document: {
    title: 'Document Setup',
    description: 'Configure the basic document properties including paper size, page count, and print quality. These settings affect the overall layout and output quality of your worksheet.',
    changes: [
      'Paper size (A4, Letter, Legal, A5)',
      'Number of pages to generate',
      'Print quality (150, 300, 600 DPI)',
      'Page numbers visibility',
      'Multi-page mode toggle'
    ]
  },
  content: {
    title: 'Content Settings',
    description: 'Define what text or characters appear on your worksheet. Choose between custom text, specific letters, full alphabet, or numbers and symbols.',
    changes: [
      'Worksheet type (text, letters, alphabet, numbers)',
      'Custom text input',
      'Specific letters to practice',
      'Alphabet case (uppercase, lowercase, both)',
      'Include numbers and symbols',
      'Empty paper mode',
      'Repeat text on multiple lines'
    ]
  },
  generation: {
    title: 'Content Generation',
    description: 'Automatically generate practice content using sight words, word patterns, or custom word lists. Perfect for creating varied practice materials.',
    changes: [
      'Sight word lists (Dolch, Fry)',
      'Word patterns (CVC, CVCE, etc.)',
      'Custom word lists',
      'Name practice mode',
      'Sentence templates',
      'Random word generation'
    ]
  },
  font: {
    title: 'Font & Typography',
    description: 'Select the font style for your worksheet. Educational fonts are designed specifically for handwriting practice, while other categories offer variety.',
    changes: [
      'Font family selection',
      'Font category filter',
      'Font search',
      'Font preview'
    ]
  },
  appearance: {
    title: 'Text Appearance',
    description: 'Control how the text looks on the worksheet. Adjust opacity for tracing practice or choose different trace styles for varied difficulty.',
    changes: [
      'Text opacity (0-100%)',
      'Trace style (dotted, dashed, outline, solid)',
      'Starting dots for letter formation',
      'Stroke direction arrows'
    ]
  },
  spacing: {
    title: 'Text Spacing',
    description: 'Fine-tune the spacing between letters and words, and adjust character width. These settings help accommodate different handwriting styles and motor skill levels.',
    changes: [
      'Letter spacing (-5 to 20px)',
      'Word spacing (0 to 20px)',
      'Character width (condensed, normal, expanded)',
      'Practice lines per set (1-5)'
    ]
  },
  lineSpacing: {
    title: 'Line Spacing',
    description: 'Set the baseline-to-baseline distance using educational standards. Different grade levels require different spacing to support motor skill development.',
    changes: [
      'Kindergarten spacing (19mm)',
      'Grades 1-3 spacing (12.7mm)',
      'Grades 4-6 spacing (8.7mm)',
      'Narrow ruled spacing (6.4mm)',
      'Custom spacing (6-25mm)'
    ]
  },
  guidelineLayout: {
    title: 'Guideline Layout',
    description: 'Choose the guideline structure that best supports your students. Different styles provide varying levels of support for letter formation.',
    changes: [
      'Guideline style (standard, elementary, dotted, two-line)',
      'Show/hide guidelines',
      'Extend to page margins',
      'Show margin boundaries',
      'Text vertical alignment'
    ]
  },
  guidelineAppearance: {
    title: 'Guideline Appearance',
    description: 'Customize how guidelines look. Use colors to help students distinguish between different lines, or adjust thickness and opacity for visual clarity.',
    changes: [
      'Guideline color style (default, rainbow, pastel, monochrome)',
      'Custom colors for each line',
      'Guideline thickness',
      'Guideline opacity',
      'Dashed guidelines option',
      'Emphasize baseline',
      'Baseline thickness'
    ]
  }
};
