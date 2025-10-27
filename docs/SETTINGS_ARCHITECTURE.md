# Settings Architecture

## Component Hierarchy

```
Index.tsx
│
├─ AccordionNav
│  │
│  ├─ 📄 Document Setup
│  │  └─ DocumentSetupSettings
│  │     ├─ Paper Size selector
│  │     ├─ Page Count slider
│  │     ├─ Show Page Numbers checkbox
│  │     └─ Multi-Page Mode toggle
│  │
│  ├─ 📚 Multi-Page Builder (conditional: multiPageMode)
│  │  └─ PageBuilder
│  │     └─ Page management UI
│  │
│  ├─ 📝 Content (conditional: !multiPageMode)
│  │  └─ ContentSettings
│  │     ├─ Worksheet Type selector
│  │     ├─ Text input
│  │     └─ Content options
│  │
│  ├─ ✨ Content Generation (conditional: !multiPageMode)
│  │  └─ ContentGenerationSettings
│  │     ├─ Sight Words
│  │     ├─ Word Patterns
│  │     ├─ Sentence Templates
│  │     ├─ Name Practice
│  │     ├─ Custom Word Lists
│  │     └─ Random Generator
│  │
│  ├─ 🔤 Font & Typography (conditional: !multiPageMode && !emptyPaper)
│  │  └─ FontTypographySettings
│  │     ├─ FontSelector
│  │     │  ├─ Category tabs
│  │     │  ├─ Search input
│  │     │  └─ Font list
│  │     ├─ Font Size slider
│  │     └─ Text Case selector
│  │
│  ├─ 👁️ Text Appearance (conditional: !multiPageMode && !emptyPaper)
│  │  └─ TextAppearanceSettings
│  │     ├─ Tracing Opacity slider
│  │     ├─ Text Trace Style selector
│  │     ├─ Show Starting Dots checkbox
│  │     └─ Show Stroke Arrows checkbox
│  │
│  ├─ ↔️ Text Spacing (conditional: !multiPageMode && !emptyPaper)
│  │  └─ TextSpacingSettings
│  │     ├─ Letter Spacing slider
│  │     ├─ Word Spacing slider
│  │     ├─ Character Width selector
│  │     └─ Practice Lines slider
│  │
│  ├─ 📏 Guideline Layout
│  │  └─ GuidelineLayoutSettings
│  │     ├─ Guideline Style selector
│  │     ├─ Show Guidelines checkbox
│  │     │  ├─ Extend to Margins checkbox
│  │     │  └─ Show Margin Lines checkbox
│  │     └─ Vertical Alignment selector (if !emptyPaper)
│  │
│  └─ 🎨 Guideline Appearance
│     └─ GuidelineAppearanceSettings
│        ├─ Color Preset selector
│        ├─ Custom Color Pickers (if preset === 'custom')
│        ├─ Guideline Thickness slider
│        ├─ Emphasize Baseline checkbox
│        │  └─ Baseline Thickness slider (if emphasized)
│        ├─ Dashed Pattern checkbox
│        └─ Guideline Opacity slider
│
└─ WorksheetPreview
   └─ Canvas rendering
```

## Data Flow

```
┌─────────────────────────────────────────────────────────────┐
│                         Index.tsx                            │
│  ┌───────────────────────────────────────────────────────┐  │
│  │         useWorksheetPreferences Hook                   │  │
│  │  ┌─────────────────────────────────────────────────┐  │  │
│  │  │  preferences: WorksheetPreferences              │  │  │
│  │  │  updatePreference(key, value)                   │  │  │
│  │  │  savePreferences()                              │  │  │
│  │  │  loadPreferences()                              │  │  │
│  │  │  resetPreferences()                             │  │  │
│  │  └─────────────────────────────────────────────────┘  │  │
│  └───────────────────────────────────────────────────────┘  │
│                           │                                  │
│                           ├──────────────┬──────────────────┤
│                           ▼              ▼                  ▼
│                    ┌─────────────┐  ┌─────────┐   ┌──────────────┐
│                    │  Settings   │  │ Preview │   │   Actions    │
│                    │ Components  │  │ Canvas  │   │ (Save/Reset) │
│                    └─────────────┘  └─────────┘   └──────────────┘
│                           │
│         ┌─────────────────┼─────────────────┐
│         ▼                 ▼                 ▼
│  ┌────────────┐   ┌────────────┐   ┌────────────┐
│  │ Document   │   │   Font &   │   │ Guideline  │
│  │   Setup    │   │ Typography │   │   Layout   │
│  └────────────┘   └────────────┘   └────────────┘
│         │                 │                 │
│         └─────────────────┴─────────────────┘
│                           │
│                           ▼
│              updatePreference(key, value)
│                           │
│                           ▼
│              ┌─────────────────────────┐
│              │  WorksheetPreferences   │
│              │  (State Updated)        │
│              └─────────────────────────┘
│                           │
│                           ▼
│              ┌─────────────────────────┐
│              │   Preview Re-renders    │
│              │   with New Settings     │
│              └─────────────────────────┘
└─────────────────────────────────────────────────────────────┘
```

## Settings Dependency Map

```
Document Setup
├─ Affects: All other sections
└─ Dependencies: None

Multi-Page Builder
├─ Affects: Content, Font, Text sections (disables them)
└─ Dependencies: multiPageMode toggle

Content
├─ Affects: Font, Text sections (emptyPaper disables them)
└─ Dependencies: !multiPageMode

Content Generation
├─ Affects: Content (populates text)
└─ Dependencies: !multiPageMode

Font & Typography
├─ Affects: Text Appearance, Text Spacing
└─ Dependencies: !multiPageMode && !emptyPaper

Text Appearance
├─ Affects: Preview rendering
└─ Dependencies: !multiPageMode && !emptyPaper

Text Spacing
├─ Affects: Preview layout
└─ Dependencies: !multiPageMode && !emptyPaper

Guideline Layout
├─ Affects: Guideline Appearance
└─ Dependencies: None (always available)

Guideline Appearance
├─ Affects: Preview rendering
└─ Dependencies: showGuides (for visibility)
```

## State Management

```typescript
// Central state in Index.tsx
const {
  preferences,        // Current settings
  updatePreference,   // Update single setting
  savePreferences,    // Save to localStorage
  loadPreferences,    // Load from localStorage
  resetPreferences    // Reset to defaults
} = useWorksheetPreferences();

// Each component receives:
interface ComponentProps {
  preferences: WorksheetPreferences;
  updatePreference: <K extends keyof WorksheetPreferences>(
    key: K,
    value: WorksheetPreferences[K]
  ) => void;
}

// Components call updatePreference:
updatePreference('fontSize', 48);
updatePreference('guidelineColorStyle', 'custom');
updatePreference('showGuides', true);
```

## Rendering Pipeline

```
User Interaction
      │
      ▼
Component Event Handler
      │
      ▼
updatePreference(key, value)
      │
      ▼
State Update (React)
      │
      ├──────────────┬──────────────┐
      ▼              ▼              ▼
Settings UI    Preview Canvas   PDF Generator
Re-renders     Re-renders       (on demand)
      │              │              │
      ▼              ▼              ▼
Updated UI    Updated Preview  Generated PDF
```

## Color Management Flow

```
User selects color preset
      │
      ▼
┌─────────────────────────────────────┐
│ guidelineColorStyle = 'default'     │
│                    or 'rainbow'     │
│                    or 'pastel'      │
│                    or 'monochrome'  │
│                    or 'custom'      │
└─────────────────────────────────────┘
      │
      ├─────────────────┬─────────────────┐
      ▼                 ▼                 ▼
If 'custom'      If preset          Rendering
      │                 │                 │
      ▼                 ▼                 ▼
Show color      Use preset      Get colors from:
pickers         colors          - customGuidelineColors (if custom)
      │                 │       - GUIDELINE_COLOR_STYLES[preset]
      ▼                 │                 │
User picks      ────────┘                 │
custom colors                             │
      │                                   │
      ▼                                   │
customGuidelineColors ────────────────────┘
      │
      ▼
drawGuidelines(
  ...,
  guidelineColorStyle,
  customGuidelineColors,
  ...
)
```

## Conditional Rendering Logic

```
┌─────────────────────────────────────────────────────────┐
│                    Index.tsx                             │
├─────────────────────────────────────────────────────────┤
│                                                          │
│  Document Setup                    [Always shown]       │
│                                                          │
│  Multi-Page Builder                [If multiPageMode]   │
│                                                          │
│  Content                           [If !multiPageMode]  │
│                                                          │
│  Content Generation                [If !multiPageMode]  │
│                                                          │
│  Font & Typography                 [If !multiPageMode   │
│                                     && !emptyPaper]     │
│                                                          │
│  Text Appearance                   [If !multiPageMode   │
│                                     && !emptyPaper]     │
│                                                          │
│  Text Spacing                      [If !multiPageMode   │
│                                     && !emptyPaper]     │
│                                                          │
│  Guideline Layout                  [Always shown]       │
│                                                          │
│  Guideline Appearance              [Always shown]       │
│                                                          │
└─────────────────────────────────────────────────────────┘
```

## Component Responsibilities

```
┌──────────────────────────────────────────────────────────┐
│ DocumentSetupSettings                                     │
├──────────────────────────────────────────────────────────┤
│ • Paper size configuration                               │
│ • Page count management                                  │
│ • Page number visibility                                 │
│ • Multi-page mode toggle                                 │
└──────────────────────────────────────────────────────────┘

┌──────────────────────────────────────────────────────────┐
│ FontTypographySettings                                    │
├──────────────────────────────────────────────────────────┤
│ • Font category selection                                │
│ • Font search and selection                              │
│ • Font size adjustment                                   │
│ • Text case transformation                               │
└──────────────────────────────────────────────────────────┘

┌──────────────────────────────────────────────────────────┐
│ TextAppearanceSettings                                    │
├──────────────────────────────────────────────────────────┤
│ • Tracing opacity control                                │
│ • Text trace style (dotted, dashed, outline, solid)     │
│ • Starting dots visibility                               │
│ • Stroke direction arrows                                │
└──────────────────────────────────────────────────────────┘

┌──────────────────────────────────────────────────────────┐
│ TextSpacingSettings                                       │
├──────────────────────────────────────────────────────────┤
│ • Letter spacing adjustment                              │
│ • Word spacing adjustment                                │
│ • Character width (condensed/normal/expanded)           │
│ • Practice lines per set                                 │
└──────────────────────────────────────────────────────────┘

┌──────────────────────────────────────────────────────────┐
│ GuidelineLayoutSettings                                   │
├──────────────────────────────────────────────────────────┤
│ • Guideline style (standard/elementary/dotted/double)   │
│ • Show/hide guidelines                                   │
│ • Extend to margins option                               │
│ • Show margin boundaries                                 │
│ • Text vertical alignment                                │
└──────────────────────────────────────────────────────────┘

┌──────────────────────────────────────────────────────────┐
│ GuidelineAppearanceSettings                               │
├──────────────────────────────────────────────────────────┤
│ • Color preset selection                                 │
│ • Custom color pickers (when custom selected)           │
│ • Guideline thickness                                    │
│ • Baseline emphasis                                      │
│ • Dashed pattern option                                  │
│ • Global opacity control                                 │
└──────────────────────────────────────────────────────────┘
```

## Key Design Principles

1. **Single Responsibility**: Each component handles one logical group
2. **Conditional Display**: Hide irrelevant settings based on context
3. **Consistent Patterns**: All components follow same prop structure
4. **Clear Hierarchy**: Settings organized from general to specific
5. **No Redundancy**: Each setting appears in exactly one place
6. **Logical Grouping**: Related settings are co-located
7. **User-Centric**: Organization follows user workflow
8. **Type Safety**: Full TypeScript support throughout
