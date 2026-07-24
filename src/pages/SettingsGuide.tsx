import React from 'react';
import { Link } from 'react-router-dom';
import { FileText, Type, Ruler, Settings, Layout, Sparkles, ExternalLink, ChevronDown, ChevronUp } from 'lucide-react';

interface SettingGroup {
  id: string;
  icon: React.ReactNode;
  title: string;
  summary: string;
  settings: {
    name: string;
    type: string;
    what: string;
    why: string;
    options?: string;
  }[];
}

const groups: SettingGroup[] = [
  {
    id: 'document',
    icon: <Settings className="w-5 h-5 text-indigo-600" />,
    title: 'Document',
    summary: 'Paper size, print quality, page count, and multi-page mode.',
    settings: [
      {
        name: 'Paper Size',
        type: 'A4 | Letter | Legal | A5',
        what: 'Sets the physical sheet size of your worksheet and PDF.',
        why: 'A4 is standard outside the US. Letter (8.5"x11") is standard in the US. Legal is taller for longer worksheets. A5 makes half-page practice sheets.',
        options: 'A4 (210×297mm), Letter (8.5×11in), Legal (8.5×14in), A5 (148×210mm)'
      },
      {
        name: 'Print Quality',
        type: 'Standard | High | Ultra',
        what: 'Controls the DPI resolution of the exported PDF.',
        why: 'Higher DPI produces sharper prints but larger file sizes. Use High (300 DPI) for most printing. Use Standard for screen-only or quick drafts. Use Ultra for professional publishing.',
        options: 'Standard (150 DPI), High (300 DPI), Ultra (600 DPI)'
      },
      {
        name: 'Page Count',
        type: '1 to 10',
        what: 'Number of identical pages in single-page mode.',
        why: 'Lets you create multiple copies of the same worksheet for a class. Each page shares the same content. For different content per page, enable multi-page mode.'
      },
      {
        name: 'Show Page Numbers',
        type: 'on/off',
        what: 'Adds "Page X of Y" at the bottom of each PDF page.',
        why: 'Useful when printing multiple pages for a class or workbook. Hide for single-page handouts.'
      },
      {
        name: 'Multi-Page Mode',
        type: 'on/off',
        what: 'Lets you create different content on each page.',
        why: 'When enabled, page count is replaced with a page builder for individual page management. Each page can have its own text, letters, or numbers.'
      }
    ]
  },
  {
    id: 'pages',
    icon: <Layout className="w-5 h-5 text-indigo-600" />,
    title: 'Pages',
    summary: 'Page list management in multi-page mode.',
    settings: [
      {
        name: 'Page List',
        type: 'add, duplicate, reorder, delete',
        what: 'Shows all pages in your worksheet. Each page can be individually configured.',
        why: 'Use when you need different content per page: start with letter formation, move to words, then sentences. Reorder by dragging the handle buttons.'
      },
      {
        name: 'Per-Page Content',
        type: 'text | letters | alphabet | numbers',
        what: 'Each page can have its own worksheet type and text content.',
        why: 'Global settings (font, guidelines, spacing) apply to all pages. Only content changes between pages. Keep visual consistency while varying practice material.'
      }
    ]
  },
  {
    id: 'content',
    icon: <FileText className="w-5 h-5 text-indigo-600" />,
    title: 'Content',
    summary: 'What text appears on the worksheet and how it is generated.',
    settings: [
      {
        name: 'Worksheet Type',
        type: 'Text | Letters | Alphabet | Numbers',
        what: 'Controls what kind of content appears on the worksheet lines.',
        why: 'Choose "Text" for custom sentences. "Letters" for practicing specific letter pairs. "Alphabet" for full uppercase/lowercase drills. "Numbers" for digit and symbol tracing.'
      },
      {
        name: 'Text Content',
        type: 'free text',
        what: 'The actual text to trace when Worksheet Type is Text.',
        why: 'Use short sentences or word lists. Text wraps to the next line when it reaches the page width. The more text you enter, the more lines are shown.'
      },
      {
        name: 'Empty Paper',
        type: 'on/off',
        what: 'Removes all text and shows only guidelines.',
        why: 'Useful for free handwriting practice, dictation exercises, or letting students write their own words. All text-related settings are hidden when this is on.'
      },
      {
        name: 'Repeat Text',
        type: 'on/off',
        what: 'Repeats the same text on every line set until the page is full.',
        why: 'Great for drilling a specific letter, word, or sentence. When off, the text flows naturally from line to line.'
      },
      {
        name: 'Practice Content Generation',
        type: 'sight words, patterns, sentences, names, custom',
        what: 'Auto-generates practice content from built-in word lists and templates.',
        why: 'Generate content in one click instead of typing it yourself. Includes Dolch and Fry sight word lists, phonics word patterns (CVC, CVCe, etc.), sentence templates, name practice, and random word sets.'
      }
    ]
  },
  {
    id: 'text',
    icon: <Type className="w-5 h-5 text-indigo-600" />,
    title: 'Text',
    summary: 'Font, size, trace style, opacity, spacing, and case.',
    settings: [
      {
        name: 'Font Family',
        type: '100+ Google Fonts',
        what: 'The typeface used for the practice text.',
        why: 'Educational handwriting fonts like "Edu QLD Beginner" follow curriculum letter shapes. Cursive fonts teach joined handwriting. Serif and sans-serif work for general practice. Pick one that matches your teaching method.'
      },
      {
        name: 'Font Size',
        type: '8 to 120 px',
        what: 'Size of the practice text.',
        why: 'Large sizes (48-60px) work for early writers still developing motor control. Medium sizes (28-42px) suit developing writers. Small sizes (14-26px) fit more text per page for fluent writers.'
      },
      {
        name: 'Text Case',
        type: 'None | Uppercase | Lowercase | Titlecase',
        what: 'Transforms the text case before rendering.',
        why: 'Titlecase capitalises the first letter of each word. Uppercase drills capital letter formation. Lowercase is best for most handwriting practice.'
      },
      {
        name: 'Trace Style',
        type: 'Dotted | Dashed | Outline | Solid | Thin',
        what: 'How the practice text is rendered for tracing.',
        why: 'Dotted gives small dots to follow — easiest for beginners. Dashed has longer dashes for intermediate practice. Outline shows hollow letters. Solid prints normally (read-only). Thin dashed is for pen tracing with less visual clutter.'
      },
      {
        name: 'Text Opacity',
        type: '0% to 100%',
        what: 'How visible the tracing text is.',
        why: 'Low opacity (10-30%) keeps text visible but fades behind the student\u2019s stroke. Higher opacity (40-60%) gives more guidance. 100% is solid, like reading text.'
      },
      {
        name: 'Starting Dots',
        type: 'on/off',
        what: 'Shows a small red dot at each letter\u2019s starting position.',
        why: 'Teaches correct letter formation by showing where to start each stroke. Essential for early handwriting instruction (grades K-2).'
      },
      {
        name: 'Letter Spacing',
        type: '-5 to 20 px',
        what: 'Extra space between each character.',
        why: 'Wider spacing (2-5px) gives more room for each letter, helping beginners who need space. Negative spacing (-2 to -1 tightens text for fluent writers working on cursive joins.'
      },
      {
        name: 'Word Spacing',
        type: '0 to 20 px',
        what: 'Extra space between each word.',
        why: 'Wider spacing helps distinguish word boundaries for early readers. Default works for most practice. Maximum spacing emphasizes individual words.'
      },
      {
        name: 'Character Width',
        type: 'Condensed | Normal | Expanded',
        what: 'Horizontally stretches or compresses characters.',
        why: 'Condensed fits more text per line. Expanded gives wider character shapes for easier tracing. Normal is the font\u2019s natural width.'
      },
      {
        name: 'Practice Lines',
        type: '1 to 5',
        what: 'Number of lines in each line set (one tracing line + blank lines).',
        why: '1 line = one trace line. 2 lines = trace then copy. 3+ lines = trace then practice multiple times. More lines give more independent practice space.'
      },
      {
        name: 'Vertical Alignment',
        type: 'Top | Center | Baseline',
        what: 'Where text sits relative to the guideline set.',
        why: 'Baseline (recommended) aligns text so it sits on the main guideline. Center centres text within the guideline space. Top positions text near the headline.'
      }
    ]
  },
  {
    id: 'guidelines',
    icon: <Ruler className="w-5 h-5 text-indigo-600" />,
    title: 'Guidelines',
    summary: 'Line spacing, guide style, colors, margins, and baseline emphasis.',
    settings: [
      {
        name: 'Line Spacing Preset',
        type: 'Kindergarten | Grades 1-3 | Grades 4-6 | Wide | Narrow | Custom',
        what: 'Baseline-to-baseline distance in millimetres.',
        why: 'Kindergarten (19mm) is generous for beginners. Grades 1-3 (12.7mm) is standard for early elementary. Grades 4-6 (8.7mm) matches wide ruled paper. Narrow Ruled (6.4mm) is college ruled for older students. Custom lets you dial in any spacing from 6mm to 25mm.'
      },
      {
        name: 'Guideline Style',
        type: 'Standard | Elementary | Dotted | Two-Line',
        what: 'The structure of guidelines on each line: how many lines and their proportions.',
        why: 'Elementary (4 lines) uses educational 3:3:2 proportions with headline, dotted midline, baseline, and descender line. Dotted Midline highlights the x-height boundary. Standard (3 lines) is simpler. Two-Line reduces visual noise for transitioning students.'
      },
      {
        name: 'Show Guides',
        type: 'on/off',
        what: 'Toggles all guideline lines on or off.',
        why: 'Turn off for advanced students or free writing practice. Turning off also hides all guideline appearance settings.'
      },
      {
        name: 'Extend to Margins',
        type: 'on/off',
        what: 'Extends guidelines to the full page width (narrower margins).',
        why: 'Useful when students need maximum writing space. Turn off for standard margins that leave room for teacher notes.'
      },
      {
        name: 'Margin Lines',
        type: 'on/off',
        what: 'Shows dashed vertical lines for left and right margins.',
        why: 'Helps students keep handwriting within the writing area. Useful for early elementary where spatial awareness is still developing.'
      },
      {
        name: 'Guideline Color',
        type: 'Default | Rainbow | Pastel | Monochrome | Custom',
        what: 'Colour scheme for the guideline lines.',
        why: 'Default (gray) is standard and readable. Rainbow colours each line differently (red top, green baseline) to help students distinguish lines. Pastel is softer. Monochrome uses black. Custom lets you set individual line colours.'
      },
      {
        name: 'Guideline Thickness',
        type: '0.1 to 3 px',
        what: 'The stroke width of all guideline lines.',
        why: 'Thicker lines (1-2px) are more visible for younger students. Thinner lines (0.5px) are less visually intrusive.'
      },
      {
        name: 'Guideline Opacity',
        type: '0% to 100%',
        what: 'How visible the guideline lines are.',
        why: 'Full opacity provides maximum structure. Lower opacity (50-70%) keeps guides available but encourages students to rely less on them.'
      },
      {
        name: 'Dashed Guidelines',
        type: 'on/off',
        what: 'Changes all guideline lines from solid to dashed.',
        why: 'Dashed guidelines are less visually dominant and encourage students to write with less reliance on lines. A transitional step toward unlined paper.'
      },
      {
        name: 'Emphasize Baseline',
        type: 'on/off',
        what: 'Makes the baseline thicker than other lines.',
        why: 'The baseline is the most important reference line: letters sit on it. Emphasising it helps students keep their writing aligned, avoiding floating or dipping letters.'
      },
      {
        name: 'Baseline Thickness',
        type: '0.1 to 5 px',
        what: 'How thick the baseline is when emphasis is on.',
        why: 'A thicker baseline (1.5-3px) becomes a clear reference for letter placement. Set high enough to be noticeable but not so high it distracts.'
      }
    ]
  }
];

const SettingsGuide: React.FC = () => {
  const [openGroup, setOpenGroup] = React.useState<string | null>('document');

  const toggleGroup = (id: string) => {
    setOpenGroup(openGroup === id ? null : id);
  };

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900">
      <header className="px-6 py-5 border-b border-gray-200 bg-white sticky top-0 z-10">
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Link to="/" className="flex items-center gap-3">
              <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center">
                <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                </svg>
              </div>
              <span className="text-lg font-semibold">InkTrace</span>
            </Link>
          </div>
          <nav className="flex items-center gap-4 text-sm">
            <Link to="/" className="text-gray-600 hover:text-indigo-600 transition-colors">
              Home
            </Link>
            <Link
              to="/builder"
              className="px-3 py-1.5 text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 rounded-lg transition-colors"
            >
              Open builder
            </Link>
          </nav>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-6 py-12">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Settings Guide</h1>
        <p className="text-gray-600 mb-10 text-lg">
          Every setting in InkTrace explained: what it does, why you would change it, and how it affects your worksheet.
        </p>

        <div className="space-y-4">
          {groups.map(group => (
            <div
              key={group.id}
              className="border border-gray-200 rounded-xl bg-white overflow-hidden"
            >
              <button
                onClick={() => toggleGroup(group.id)}
                className="w-full flex items-center justify-between px-6 py-4 hover:bg-gray-50 transition-colors text-left"
              >
                <div className="flex items-center gap-3">
                  {group.icon}
                  <div>
                    <h2 className="text-lg font-semibold text-gray-900">{group.title}</h2>
                    <p className="text-sm text-gray-500">{group.summary}</p>
                  </div>
                </div>
                {openGroup === group.id ? (
                  <ChevronUp className="w-5 h-5 text-gray-400 shrink-0" />
                ) : (
                  <ChevronDown className="w-5 h-5 text-gray-400 shrink-0" />
                )}
              </button>

              {openGroup === group.id && (
                <div className="px-6 pb-6 border-t border-gray-100">
                  <div className="space-y-8 mt-6">
                    {group.settings.map(setting => (
                      <div key={setting.name} className="border-l-2 border-indigo-200 pl-4">
                        <div className="flex items-start justify-between gap-4 flex-wrap">
                          <h3 className="font-semibold text-gray-900">{setting.name}</h3>
                          <span className="text-xs font-mono text-indigo-600 bg-indigo-50 px-2 py-0.5 rounded">
                            {setting.type}
                          </span>
                        </div>
                        <p className="mt-1.5 text-sm text-gray-600">{setting.what}</p>
                        <p className="mt-0.5 text-sm text-gray-500">{setting.why}</p>
                        {setting.options && (
                          <details className="mt-2">
                            <summary className="text-xs text-gray-400 cursor-pointer hover:text-gray-600">
                              Options
                            </summary>
                            <p className="text-xs text-gray-500 mt-1">{setting.options}</p>
                          </details>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

        <div className="mt-12 p-6 border border-indigo-200 rounded-xl bg-indigo-50 text-center">
          <p className="text-gray-700">
            <strong>Tip:</strong> Use the <strong>JSON settings</strong> section in the builder to export your current
            settings or paste a shared configuration.
          </p>
          <Link
            to="/builder"
            className="mt-3 inline-flex items-center gap-1.5 text-sm font-medium text-indigo-600 hover:text-indigo-800 transition-colors"
          >
            Go to builder <ExternalLink className="w-3.5 h-3.5" />
          </Link>
        </div>
      </main>

      <footer className="border-t border-gray-200 py-6 text-center text-sm text-gray-500">
        <p>&copy; {new Date().getFullYear()} InkTrace. Free for personal and commercial use.</p>
      </footer>
    </div>
  );
};

export default SettingsGuide;
