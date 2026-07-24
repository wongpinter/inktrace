import React from 'react';
import { Link } from 'react-router-dom';
import { BookOpen, FileText, Type, Ruler, Settings, Layout, ExternalLink, ChevronDown, ChevronUp } from 'lucide-react';

interface CaseItem {
  title: string;
  text: string;
}

interface WikiSetting {
  name: string;
  type: string;
  what: string;
  options?: string;
  cases?: CaseItem[];
  recommendation?: string;
}

interface WikiSection {
  id: string;
  icon: React.ReactNode;
  title: string;
  description: string;
  settings: WikiSetting[];
}

const sections: WikiSection[] = [
  {
    id: 'document',
    icon: <Settings className="w-5 h-5 text-indigo-600" />,
    title: 'Document',
    description: 'Paper size, print quality, page count, footer, multi-page mode.',
    settings: [
      {
        name: 'Paper Size',
        type: 'a4 | letter | legal | a5',
        what: 'Sets the physical sheet size. A4 (210×297mm) for rest of world, Letter (8.5×11in) for US/Canada. Legal is taller, A5 makes half-sheets.',
        options: 'A4: 210×297mm — standard outside US. Letter: 216×279mm — US/Canada. Legal: 216×356mm — longer documents. A5: 148×210mm — half-page.',
        cases: [
          { title: 'Classroom set', text: 'Letter (US) or A4 (everywhere else). 300 DPI. 25 pages.' },
          { title: 'Take-home pack', text: 'A5 with 5 pages. 150 DPI for small file size.' },
          { title: 'Wall poster', text: 'Letter or A4, single page, 600 DPI for maximum quality.' }
        ],
        recommendation: 'A4 with High (300 DPI) for most. Switch to Letter only for US/Canada printing.'
      },
      {
        name: 'Print Quality',
        type: 'standard | high | ultra',
        what: 'DPI resolution for PDF export. Standard=150, High=300, Ultra=600 DPI.',
        options: 'Standard (150 DPI) — small files, screen-only. High (300 DPI) — classroom printing. Ultra (600 DPI) — professional publishing.',
        cases: [
          { title: '30 copies for class', text: 'High (300 DPI). 150 DPI may show pixelation on print.' },
          { title: 'Home printing', text: 'Ultra (600 DPI). Crispest output even on consumer printers.' },
          { title: 'Google Classroom', text: 'Standard (150 DPI). Smaller files, faster upload.' }
        ],
        recommendation: 'High (300 DPI) covers all classroom needs. Ultra only when quality > file size.'
      },
      {
        name: 'Page Count',
        type: '1–10',
        what: 'Number of identical pages in single-page mode. Each page is the same. For different content per page, enable multi-page mode.',
        cases: [
          { title: 'Quick warm-up', text: '1 page.' },
          { title: 'Weekly packet', text: '5 pages.' },
          { title: 'Full lesson set', text: '10 pages for a week of practice.' }
        ]
      },
      {
        name: 'Show Page Numbers',
        type: 'on/off',
        what: 'Adds "Page X of Y" at bottom-right of each PDF page.',
        cases: [
          { title: 'Workbook', text: 'ON — keeps pages in order when printing a multi-page packet.' },
          { title: 'Handout', text: 'OFF — single page, no need for numbers.' }
        ]
      },
      {
        name: 'Multi-Page Mode',
        type: 'on/off',
        what: 'When ON, page count is replaced with a page builder. Each page can have different text, letters, or numbers.',
        cases: [
          { title: 'Progression worksheet', text: 'ON — page 1 trace letters, page 2 copy words, page 3 free writing.' },
          { title: 'Single-type set', text: 'OFF — all pages identical, set page count instead.' }
        ]
      }
    ]
  },
  {
    id: 'pages',
    icon: <Layout className="w-5 h-5 text-indigo-600" />,
    title: 'Pages',
    description: 'Page list management in multi-page mode.',
    settings: [
      {
        name: 'Page operations',
        type: 'add | duplicate | delete | reorder',
        what: 'Add pages at the end, duplicate a page after the current one, delete a page (min 1), or reorder via arrow buttons.',
      },
      {
        name: 'Per-page content',
        type: 'text | letters | alphabet | numbers',
        what: 'Each page has its own worksheet type and text content. Global settings (font, guidelines, spacing) stay the same.',
        cases: [
          { title: 'Letter progression (3 pages)', text: 'Page 1: letters "Aa Bb Cc Dd" repeat. Page 2: text "cat bat rat sat mat". Page 3: text "I see a big fat cat sitting on a mat."' },
          { title: 'Name + sentences (2 pages)', text: 'Page 1: text "Liam Liam Liam" repeat. Page 2: text "My name is Liam. I like to run."' },
          { title: 'Mixed drill (5 pages)', text: 'Page 1: alphabet uppercase. Page 2: alphabet lowercase. Page 3: letters "Aa Bb Cc". Page 4: numbers. Page 5: sight words.' }
        ]
      }
    ]
  },
  {
    id: 'content',
    icon: <FileText className="w-5 h-5 text-indigo-600" />,
    title: 'Content',
    description: 'What text appears on the worksheet. Includes auto-generated practice content.',
    settings: [
      {
        name: 'Worksheet Type',
        type: 'text | letters | alphabet | numbers',
        what: 'Controls content type. Text = custom sentences. Letters = specific pairs. Alphabet = full A-Z. Numbers = digits and/or symbols.',
        cases: [
          { title: 'Daily sentence practice', text: 'text. Enter "The quick brown fox jumps over the lazy dog" — all letters practiced.' },
          { title: 'New letter introduction', text: 'letters. Enter "Aa Bb Cc" — focus on new letters for the week.' },
          { title: 'Warm-up drill', text: 'alphabet. Both uppercase and lowercase before actual writing.' },
          { title: 'Math handwriting', text: 'numbers. Include both digits and symbols for a comprehensive math sheet.' }
        ]
      },
      {
        name: 'Empty Paper',
        type: 'on/off',
        what: 'ON = removes all text, shows only guidelines across the page. Text-related settings are hidden when ON.',
        cases: [
          { title: 'Free writing', text: 'ON — let students write their own stories or answers.' },
          { title: 'Dictation exercise', text: 'ON — teacher reads aloud, student writes what they hear.' }
        ]
      },
      {
        name: 'Repeat Text',
        type: 'on/off',
        what: 'ON = the same text loops and fills every line set. OFF = text flows naturally, stops when done.',
        cases: [
          { title: 'Drill single letter', text: 'ON — repeat "Aa" 50 times to really cement formation.' },
          { title: 'Natural writing', text: 'OFF — sentence flows and ends naturally, leaving extra space.' }
        ]
      },
      {
        name: 'Sight Words',
        type: 'Dolch (preprimer–3rd) | Fry (100–300)',
        what: 'Auto-fills text with a complete sight word list for the selected grade level.',
        options: 'Dolch: 40–52 words per level (K-3). Fry: 100 words per level (K-3).',
        cases: [
          { title: 'Match reading list', text: 'Select Dolch Primer words to match the weekly reading list.' }
        ]
      },
      {
        name: 'Word Patterns',
        type: 'CVC | CVCe | CCVC | CVCC | Digraphs | Vowel Teams',
        what: 'Generates word list from phonics pattern categories.',
        cases: [
          { title: 'Kindergarten phonics', text: 'CVC words: cat, dog, sun, bed, pig for short vowel practice.' },
          { title: 'Grade 1 blends', text: 'CCVC words: stop, plan, frog, slip for beginning blend practice.' }
        ]
      },
      {
        name: 'Sentence Templates',
        type: 'pre-built templates',
        what: 'Click a template like "The {adjective} {noun} {verb} {adverb}." to generate 5 unique sentences.',
      },
      {
        name: 'Name Practice',
        type: 'free text + common names',
        what: 'Type a name and generate 10 repetitions. Also lists common names for quick selection.',
        cases: [{ title: 'Start of term', text: 'Generate name practice worksheets for each student in class. Most requested worksheet type for K.' }]
      },
      {
        name: 'Custom Word List',
        type: 'manual + import/export',
        what: 'Type words separated by spaces or commas. Import from .txt file. Export current list to .txt.',
        cases: [{ title: 'Spelling homework', text: 'Paste weekly 10 spelling words, add to worksheet, assign as handwriting + spelling homework.' }]
      }
    ]
  },
  {
    id: 'text',
    icon: <Type className="w-5 h-5 text-indigo-600" />,
    title: 'Text',
    description: 'Font, trace style, size, spacing, case, and alignment.',
    settings: [
      {
        name: 'Font Family',
        type: '100+ fonts across 7 categories',
        what: 'Typeface for practice text. Educational fonts match curriculum letter shapes. Cursive for joined writing.',
        cases: [
          { title: 'School handwriting', text: 'Educational category — Edu QLD Beginner matches Queensland curriculum letter shapes.' },
          { title: 'Cursive practice', text: 'Cursive category — Dancing Script for joined letter practice.' }
        ],
        recommendation: 'Start with Edu QLD Beginner for general handwriting. Switch to Dancing Script for cursive.'
      },
      {
        name: 'Font Size',
        type: '8–120 px',
        what: 'Size of practice text. Larger = fewer words per page, easier strokes.',
        options: '48–60px: K (ages 4-6). 36–48px: Grades 1-3. 26–36px: Grades 4-6. 14–26px: Middle school+.',
        cases: [
          { title: 'Early writer (K)', text: '60px. Big targets for limited fine motor control.' },
          { title: 'Developing writer (G1-3)', text: '48px. Good balance of visibility and words per page.' },
          { title: 'Fluent writer (G4+)', text: '26px. Fits more practice text on one page.' }
        ]
      },
      {
        name: 'Trace Style',
        type: 'dotted | dashed | outline | solid | thin',
        what: 'How the practice text is rendered: dots, dashes, hollow outlines, solid fill, or fine dashes.',
        cases: [
          { title: 'First tracing (K)', text: 'dotted. Fine dots provide clear guidance for each stroke.' },
          { title: 'Pen tracing (G4+)', text: 'thin. Minimal visual clutter, just a hint of guidance.' },
          { title: 'Read-and-copy', text: 'solid. More like a model — student reads, then writes below.' }
        ],
        recommendation: 'dotted for K-2, solid or thin for G3+.'
      },
      {
        name: 'Text Opacity',
        type: '0–100%',
        what: 'How visible the tracing text is.',
        options: '10-20%: faint guide. 30-40%: balanced. 50-70%: prominent. 100%: solid.',
        cases: [
          { title: 'Standard trace', text: '30%. Student can see the trace but their own writing sits on top.' },
          { title: 'Copy-the-model', text: '100%. Use as "copy this" exercise, not trace-over.' },
          { title: 'Nearly independent', text: '15%. Safety net — trace is almost invisible.' }
        ],
        recommendation: '30% for tracing. 100% for copy exercises.'
      },
      {
        name: 'Starting Dots',
        type: 'on/off',
        what: 'Small red dot at each letter\u2019s starting position. Teaches correct stroke start.',
        cases: [
          { title: 'K-1 letter formation', text: 'ON. Essential for teaching where each letter begins.' },
          { title: 'Grade 2+', text: 'OFF. Students already know letter starts.' }
        ]
      },
      {
        name: 'Letter Spacing',
        type: '-5 to 20 px',
        what: 'Extra space between characters. Negative tightens (cursive), positive loosens (beginners).',
        cases: [
          { title: 'Cursive practice', text: '-2. Negative spacing pulls letters closer for joined writing.' },
          { title: 'Early writers (K)', text: '2. Prevents letter crowding.' },
          { title: 'Standard practice', text: '0. Normal font spacing.' }
        ],
        recommendation: '0 for standard, -2 for cursive, 2-4 for beginners.'
      },
      {
        name: 'Word Spacing',
        type: '0–20 px',
        what: 'Extra space between words. Wider spacing helps distinguish word boundaries.',
        cases: [
          { title: 'Early readers', text: '10. Wide spacing helps distinguish individual words.' },
          { title: 'Default', text: '5. Clear word separation without wasting space.' }
        ],
        recommendation: '5 for most. 10+ for early readers.'
      },
      {
        name: 'Character Width',
        type: 'condensed | normal | expanded',
        what: 'Scales characters horizontally. Condensed = 0.85×, Normal = 1.0×, Expanded = 1.15×.',
        cases: [
          { title: 'Beginners', text: 'expanded. More horizontal space per letter for easier tracing.' },
          { title: 'Cursive', text: 'condensed. Tighter text for joined writing.' }
        ],
        recommendation: 'normal for most. expanded for beginners.'
      },
      {
        name: 'Practice Lines',
        type: '1–5',
        what: 'Lines per set: 1 tracing line + N-1 blank lines after it. More blank lines = more independent practice.',
        cases: [
          { title: 'Just trace', text: '1. One tracing line, no copying. For very early learners.' },
          { title: 'Trace then copy', text: '3. Trace once, then write from memory twice. Most common classroom pattern.' },
          { title: 'Maximum practice', text: '5. Trace then try repeatedly.' }
        ],
        recommendation: '3 for standard practice.'
      },
      {
        name: 'Text Case',
        type: 'none | uppercase | lowercase | titlecase',
        what: 'Transforms text case before rendering.',
        cases: [
          { title: 'General practice', text: 'lowercase. 90% of handwriting is lowercase letters.' },
          { title: 'Capital drill', text: 'uppercase. When learning capital letter formation.' },
          { title: 'Proper nouns', text: 'titlecase. Teaching capitalization rules alongside handwriting.' }
        ],
        recommendation: 'lowercase for general practice.'
      },
      {
        name: 'Vertical Alignment',
        type: 'baseline | center | top',
        what: 'Where text sits relative to guidelines. Baseline = on the line (standard). Center = centred. Top = near headline.',
        recommendation: 'baseline for all standard practice.'
      }
    ]
  },
  {
    id: 'guidelines',
    icon: <Ruler className="w-5 h-5 text-indigo-600" />,
    title: 'Guidelines',
    description: 'Line spacing, guide style, colors, margins, and baseline emphasis.',
    settings: [
      {
        name: 'Line Spacing',
        type: 'kindergarten | grade1-3 | grade4-6 | wide-ruled | narrow-ruled | custom',
        what: 'Baseline-to-baseline distance in mm. More space = easier to write in, fewer lines per page.',
        options: 'Kindergarten: 19mm. Grade 1-3: 12.7mm. Grade 4-6: 8.7mm (wide ruled). Narrow Ruled: 6.4mm (college ruled). Custom: 6-25mm.',
        cases: [
          { title: 'Beginning writers (K)', text: 'kindergarten (19mm). Big letters for limited motor control.' },
          { title: 'Standard elementary', text: 'grade1-3 (12.7mm). Matches standard handwriting paper.' },
          { title: 'Upper elementary', text: 'grade4-6 (8.7mm). Matches their notebook paper.' },
          { title: 'Middle/High school', text: 'narrow-ruled (6.4mm). College-ruled standard.' }
        ],
        recommendation: 'Match the student\'s grade level. Presets follow Zaner-Bloser standards.'
      },
      {
        name: 'Guideline Style',
        type: 'standard | elementary | dotted | double',
        what: 'Line structure per row. Dotted Midline (4 lines) is most popular for K-2. Two-line (2 lines) is transitional.',
        options: 'Standard: 3 lines. Elementary: 4 lines with solid midline. Dotted Midline: 4 lines with dotted midline. Two-Line: headline and baseline only.',
        cases: [
          { title: 'K-2 handwriting', text: 'dotted midline. The dotted line trains lowercase letter height. Most popular.' },
          { title: 'Grades 2-3', text: 'elementary. Solid midline version after dotted is mastered.' },
          { title: 'Transitioning to unlined', text: 'two-line. Minimal guidance, encourages independence.' }
        ],
        recommendation: 'dotted midline for K-2. elementary for 2-3. two-line for 3+.'
      },
      {
        name: 'Show Guides',
        type: 'on/off',
        what: 'Master toggle. OFF = blank white paper, hides all guideline appearance settings.',
        cases: [
          { title: 'Standard practice', text: 'ON. All worksheet types.' },
          { title: 'Test paper', text: 'OFF. Final assessment or independent writing.' }
        ]
      },
      {
        name: 'Extend to Margins',
        type: 'on/off',
        what: 'ON = 20px margins (max writing space). OFF = 50px standard margins.',
        cases: [
          { title: 'Maximum space', text: 'ON. 20px margin leaves room for binding/holes.' },
          { title: 'Teacher corrections', text: 'OFF. Standard margins for notes and corrections.' }
        ]
      },
      {
        name: 'Guideline Color',
        type: 'default | rainbow | pastel | monochrome | custom',
        what: 'Colour scheme. Rainbow colours each line differently — helps students describe "on the green line".',
        cases: [
          { title: 'Standard', text: 'default. Professional, works for all ages.' },
          { title: 'K-1 spatial cues', text: 'rainbow. Each line has distinct colour for spatial reference.' },
          { title: 'Photocopying', text: 'monochrome. High-contrast black lines copy cleanly.' }
        ],
        recommendation: 'default for most. rainbow for K-1.'
      },
      {
        name: 'Guideline Thickness',
        type: '0.1–3 px',
        what: 'Stroke width of guideline lines.',
      },
      {
        name: 'Guideline Opacity',
        type: '0–100%',
        what: 'Line visibility. 100% = fully opaque guidelines. Lower opacity = transitional step toward unlined.',
      },
      {
        name: 'Emphasize Baseline',
        type: 'on/off',
        what: 'Makes the baseline thicker than other lines. Baseline is the most important reference — letters sit on it.',
        cases: [
          { title: 'Floating letters', text: 'ON. Thick baseline anchor helps students who write letters above the line.' },
          { title: 'Consistent writers', text: 'OFF. Students who already keep letters on the line.' }
        ],
        recommendation: 'ON for K-2. OFF once baseline placement is mastered.'
      }
    ]
  }
];

const Wiki: React.FC = () => {
  const [openSection, setOpenSection] = React.useState<string | null>('document');
  const [openSettings, setOpenSettings] = React.useState<Record<string, boolean>>({});

  const toggleSection = (id: string) => {
    setOpenSection(openSection === id ? null : id);
    setOpenSettings({});
  };

  const toggleSetting = (id: string) => {
    setOpenSettings(prev => ({ ...prev, [id]: !prev[id] }));
  };

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900">
      <header className="px-6 py-5 border-b border-gray-200 bg-white/80 backdrop-blur sticky top-0 z-10">
        <div className="max-w-5xl mx-auto flex items-center justify-between">
          <Link to="/" className="flex items-center gap-3">
            <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center">
              <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
              </svg>
            </div>
            <span className="text-lg font-semibold">InkTrace</span>
          </Link>
          <nav className="flex items-center gap-4 text-sm">
            <Link to="/" className="text-gray-600 hover:text-indigo-600">Home</Link>
            <Link to="/settings-guide" className="text-gray-600 hover:text-indigo-600">Guide</Link>
            <Link to="/builder" className="px-3 py-1.5 font-medium text-white bg-indigo-600 hover:bg-indigo-700 rounded-lg">
              Open builder
            </Link>
          </nav>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-6 py-12">
        <div className="mb-10">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">InkTrace Settings Wiki</h1>
          <p className="text-gray-600 text-lg">
            Comprehensive reference for every worksheet setting. Includes real teaching cases and recommendations.
          </p>
          <p className="text-sm text-gray-500 mt-1">
            This wiki is designed for both humans and LLMs to read. Each setting includes what it does, available options, classroom use cases, and recommended defaults.
          </p>
        </div>

        <div className="space-y-4">
          {sections.map(section => (
            <div key={section.id} className="border border-gray-200 rounded-xl bg-white overflow-hidden">
              <button
                onClick={() => toggleSection(section.id)}
                className="w-full flex items-center justify-between px-6 py-4 hover:bg-gray-50 transition-colors text-left"
              >
                <div className="flex items-center gap-3">
                  {section.icon}
                  <div>
                    <h2 className="text-lg font-semibold text-gray-900">{section.title}</h2>
                    <p className="text-sm text-gray-500">{section.description}</p>
                  </div>
                </div>
                {openSection === section.id
                  ? <ChevronUp className="w-5 h-5 text-gray-400 shrink-0" />
                  : <ChevronDown className="w-5 h-5 text-gray-400 shrink-0" />}
              </button>

              {openSection === section.id && (
                <div className="px-6 pb-6 border-t border-gray-100">
                  <div className="space-y-6 mt-6">
                    {section.settings.map(setting => {
                      const settingId = `${section.id}-${setting.name.replace(/\s+/g, '-')}`;
                      const isOpen = openSettings[settingId];
                      return (
                        <div key={setting.name} className="border-l-2 border-indigo-200 pl-4">
                          <div className="flex items-start justify-between gap-4 flex-wrap">
                            <h3 className="font-semibold text-gray-900">{setting.name}</h3>
                            <span className="text-xs font-mono text-indigo-600 bg-indigo-50 px-2 py-0.5 rounded shrink-0">{setting.type}</span>
                          </div>
                          <p className="mt-1.5 text-sm text-gray-700">{setting.what}</p>

                          {setting.options && (
                            <details className="mt-2">
                              <summary className="text-xs text-gray-400 cursor-pointer hover:text-gray-600 font-medium">Options</summary>
                              <p className="text-xs text-gray-500 mt-1">{setting.options}</p>
                            </details>
                          )}

                          {setting.cases && setting.cases.length > 0 && (
                            <button
                              onClick={() => toggleSetting(settingId)}
                              className="mt-2 inline-flex items-center gap-1 text-xs text-indigo-600 hover:text-indigo-800 font-medium"
                            >
                              <BookOpen className="w-3 h-3" />
                              {isOpen ? 'Hide cases' : `${setting.cases.length} case${setting.cases.length > 1 ? 's' : ''}`}
                            </button>
                          )}

                          {isOpen && setting.cases && (
                            <div className="mt-2 space-y-2">
                              {setting.cases.map((c, i) => (
                                <div key={i} className="p-2 bg-indigo-50 rounded text-xs">
                                  <span className="font-semibold text-indigo-700">{c.title}:</span>{' '}
                                  <span className="text-gray-600">{c.text}</span>
                                </div>
                              ))}
                            </div>
                          )}

                          {setting.recommendation && (
                            <p className="mt-2 text-xs text-emerald-700 bg-emerald-50 p-2 rounded">
                              <strong>Recommendation:</strong> {setting.recommendation}
                            </p>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

        <div className="mt-12 p-6 border border-gray-200 rounded-xl bg-white text-center">
          <p className="text-sm text-gray-600">
            This wiki is also available as markdown files for use with LLMs.
          </p>
          <a
            href="https://github.com/wongpinter/inktrace/blob/main/docs/wiki/WIKI_INDEX.md"
            target="_blank"
            rel="noreferrer noopener"
            className="mt-2 inline-flex items-center gap-1.5 text-sm font-medium text-indigo-600 hover:text-indigo-800"
          >
            Browse source on GitHub <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </div>
      </main>

      <footer className="border-t border-gray-200 py-6 text-center text-sm text-gray-500">
        <p>&copy; {new Date().getFullYear()} InkTrace. Free for personal and commercial use.</p>
      </footer>
    </div>
  );
};

export default Wiki;
