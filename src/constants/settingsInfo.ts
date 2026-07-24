// Information and descriptions for each settings category

export interface SettingsCategoryInfo {
  title: string;
  description: string;
  changes: string[];
}

export const SETTINGS_INFO: Record<string, SettingsCategoryInfo> = {
  guided: {
    title: 'Get started',
    description: 'Tell us who is using the worksheet and we will set font, spacing, and trace style for you. You can fine-tune anything afterwards.',
    changes: [
      'Choose tracing, letter formation, or cursive fluency',
      'Apply a guided set of settings in one click',
      'Keep your current text or start fresh'
    ]
  },
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
    title: 'Document',
    description: 'Configure worksheet document properties: paper, print quality, page count, page numbers, and multi-page mode.',
    changes: [
      'Paper size (A4, Letter, Legal, A5)',
      'Single-page page count',
      'Print quality (150, 300, 600 DPI)',
      'Page numbers visibility',
      'Multi-page mode toggle'
    ]
  },
  content: {
    title: 'Content',
    description: 'Define what appears on the worksheet, manually or through generated practice content.',
    changes: [
      'Worksheet type (text, letters, alphabet, numbers)',
      'Manual text or letters',
      'Empty paper mode',
      'Repeat text on multiple lines',
      'Sight words, word patterns, sentence templates, names, custom word lists, and random words'
    ]
  },
  text: {
    title: 'Text',
    description: 'Control how practice text looks and behaves for tracing.',
    changes: [
      'Font family, category, search, and preview',
      'Font size and text case',
      'Trace style and opacity',
      'Starting dots and stroke arrows',
      'Letter spacing, word spacing, character width, and practice lines'
    ]
  },
  json: {
    title: 'JSON settings',
    description: 'Copy your current worksheet settings as JSON, save them anywhere, or paste a JSON block to apply it. Useful for sharing recipes or restoring a previous setup.',
    changes: [
      'Copy current preferences to clipboard',
      'Paste a JSON block to apply selected settings',
      'Unknown keys are ignored, defaults preserved'
    ]
  },
  guidelines: {
    title: 'Guidelines',
    description: 'Configure handwriting guide spacing, layout, margins, and visual appearance in one place.',
    changes: [
      'Line spacing presets and custom spacing',
      'Guideline style (standard, elementary, dotted, two-line)',
      'Show/hide guidelines, margin lines, and full-margin guides',
      'Text vertical alignment',
      'Guideline colors, thickness, opacity, dashed pattern, and baseline emphasis'
    ]
  }
};
