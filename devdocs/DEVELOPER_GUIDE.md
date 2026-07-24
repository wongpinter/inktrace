# Developer Guide: New Settings Organization

## Quick Reference

### Component Mapping

| Old Component | New Component(s) | Purpose |
|--------------|------------------|---------|
| `PageSettings.tsx` | `DocumentSetupSettings.tsx` + `GuidelineLayoutSettings.tsx` | Split document setup from guideline layout |
| `EnhancedGuidelineSettings.tsx` | `GuidelineLayoutSettings.tsx` + `GuidelineAppearanceSettings.tsx` | Split layout from appearance |
| `LineStyleSettings.tsx` | `TextAppearanceSettings.tsx` + `GuidelineAppearanceSettings.tsx` | Split text from guideline styling |
| N/A | `FontTypographySettings.tsx` | New: Font + typography together |
| N/A | `TextSpacingSettings.tsx` | New: All spacing controls together |

### Import Changes

#### Before
```typescript
import { PageSettings, TextFormattingSettings } from '@/components/worksheet/PageSettings';
import { EnhancedGuidelineSettings } from '@/components/worksheet/EnhancedGuidelineSettings';
import { LineStyleSettings } from '@/components/worksheet/LineStyleSettings';
```

#### After
```typescript
import { DocumentSetupSettings } from '@/components/worksheet/DocumentSetupSettings';
import { FontTypographySettings } from '@/components/worksheet/FontTypographySettings';
import { TextAppearanceSettings } from '@/components/worksheet/TextAppearanceSettings';
import { TextSpacingSettings } from '@/components/worksheet/TextSpacingSettings';
import { GuidelineLayoutSettings } from '@/components/worksheet/GuidelineLayoutSettings';
import { GuidelineAppearanceSettings } from '@/components/worksheet/GuidelineAppearanceSettings';
```

## Type Changes

### GuidelineColorStyle

#### Before
```typescript
type GuidelineColorStyle = 'default' | 'rainbow' | 'pastel' | 'monochrome';

// Separate boolean flag
useCustomGuidelineColors: boolean;
```

#### After
```typescript
type GuidelineColorStyle = 'default' | 'rainbow' | 'pastel' | 'monochrome' | 'custom';

// No separate flag needed - 'custom' is just another option
```

### WorksheetPreferences

#### Removed Fields
```typescript
// ❌ REMOVED
useCustomGuidelineColors: boolean;
guidelineOpacities: {
  top: number;
  middle: number;
  baseline: number;
  bottom: number;
};
```

#### Kept Fields
```typescript
// ✅ KEPT
guidelineOpacity: number; // Single global opacity
customGuidelineColors: {
  top: string;
  middle: string;
  baseline: string;
  bottom: string;
}; // Used when guidelineColorStyle === 'custom'
```

## Function Signature Changes

### drawGuidelines()

#### Before (15 parameters)
```typescript
drawGuidelines(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  width: number,
  style: GuidelineStyle,
  fontSize: number,
  guidelineThickness: number,
  guidelineOpacity: number,
  colorStyle: GuidelineColorStyle = 'default',
  useCustomColors: boolean = false,  // ❌ REMOVED
  customColors?: { ... },
  lineOpacities?: { ... },  // ❌ REMOVED
  dashedPattern: boolean = false,
  emphasizeBaseline: boolean = false,
  baselineThickness: number = 1.5
)
```

#### After (13 parameters)
```typescript
drawGuidelines(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  width: number,
  style: GuidelineStyle,
  fontSize: number,
  guidelineThickness: number,
  guidelineOpacity: number,
  colorStyle: GuidelineColorStyle = 'default',
  customColors?: { ... },  // Used when colorStyle === 'custom'
  dashedPattern: boolean = false,
  emphasizeBaseline: boolean = false,
  baselineThickness: number = 1.5
)
```

### drawTracingLine()

#### Before (27 parameters)
```typescript
drawTracingLine(
  // ... other params ...
  useCustomColors: boolean = false,  // ❌ REMOVED
  customColors?: { ... },
  lineOpacities?: { ... },  // ❌ REMOVED
  dashedGuidelines: boolean = false,
  emphasizeBaseline: boolean = false,
  baselineThickness: number = 1.5
)
```

#### After (25 parameters)
```typescript
drawTracingLine(
  // ... other params ...
  customColors?: { ... },  // Used when colorStyle === 'custom'
  dashedGuidelines: boolean = false,
  emphasizeBaseline: boolean = false,
  baselineThickness: number = 1.5
)
```

## Usage Examples

### Checking for Custom Colors

#### Before
```typescript
if (preferences.useCustomGuidelineColors) {
  // Use custom colors
}
```

#### After
```typescript
if (preferences.guidelineColorStyle === 'custom') {
  // Use custom colors
}
```

### Getting Guideline Colors

#### Before
```typescript
const colors = preferences.useCustomGuidelineColors && preferences.customGuidelineColors
  ? preferences.customGuidelineColors
  : GUIDELINE_COLOR_STYLES[preferences.guidelineColorStyle].colors;
```

#### After
```typescript
const colors = preferences.guidelineColorStyle === 'custom' && preferences.customGuidelineColors
  ? preferences.customGuidelineColors
  : GUIDELINE_COLOR_STYLES[preferences.guidelineColorStyle]?.colors || GUIDELINE_COLOR_STYLES.default.colors;
```

### Calling drawGuidelines

#### Before
```typescript
drawGuidelines(
  ctx,
  x,
  y,
  width,
  guidelineStyle,
  fontSize,
  guidelineThickness,
  guidelineOpacity,
  guidelineColorStyle,
  useCustomGuidelineColors,  // ❌ REMOVED
  customGuidelineColors,
  guidelineOpacities,  // ❌ REMOVED
  dashedGuidelines,
  emphasizeBaseline,
  baselineThickness
);
```

#### After
```typescript
drawGuidelines(
  ctx,
  x,
  y,
  width,
  guidelineStyle,
  fontSize,
  guidelineThickness,
  guidelineOpacity,
  guidelineColorStyle,
  customGuidelineColors,  // Automatically used when colorStyle === 'custom'
  dashedGuidelines,
  emphasizeBaseline,
  baselineThickness
);
```

## Component Props

All new components follow the same pattern:

```typescript
interface ComponentNameSettingsProps {
  preferences: WorksheetPreferences;
  updatePreference: <K extends keyof WorksheetPreferences>(
    key: K, 
    value: WorksheetPreferences[K]
  ) => void;
}
```

### FontTypographySettings Additional Props
```typescript
interface FontTypographySettingsProps extends BaseProps {
  searchQuery: string;
  filteredFonts: string[];
  onSearchChange: (query: string) => void;
  onFontHover: (font: string) => void;
}
```

## Adding New Settings

### Step 1: Determine the Right Component

Ask yourself:
- Is it about the document structure? → `DocumentSetupSettings`
- Is it about font selection or text transformation? → `FontTypographySettings`
- Is it about how text looks? → `TextAppearanceSettings`
- Is it about spacing? → `TextSpacingSettings`
- Is it about guideline structure? → `GuidelineLayoutSettings`
- Is it about guideline colors/style? → `GuidelineAppearanceSettings`

### Step 2: Add to Types

```typescript
// src/types/worksheet.ts
export interface WorksheetPreferences {
  // ... existing fields ...
  myNewSetting: string;  // Add your new field
}
```

### Step 3: Add Default Value

```typescript
// src/constants/worksheet.ts
export const DEFAULT_PREFERENCES: WorksheetPreferences = {
  // ... existing defaults ...
  myNewSetting: 'default value',
};
```

### Step 4: Add UI Control

```typescript
// In the appropriate component
<div>
  <label className="block text-sm font-semibold text-gray-700 mb-2">
    My New Setting
  </label>
  <input
    type="text"
    value={preferences.myNewSetting}
    onChange={(e) => updatePreference('myNewSetting', e.target.value)}
    className="w-full px-3 py-2 border-2 border-gray-300 rounded-lg focus:border-indigo-500 focus:outline-none text-sm"
  />
</div>
```

### Step 5: Use in Rendering

```typescript
// src/utils/canvasDrawing.ts or pdfGenerator.ts
const { myNewSetting } = preferences;
// Use myNewSetting in your rendering logic
```

## Best Practices

### 1. Keep Components Focused
Each component should handle ONE logical group of settings. Don't mix unrelated settings.

### 2. Use Consistent Styling
Follow the existing patterns:
- Labels: `text-sm font-semibold text-gray-700 mb-2`
- Inputs: `w-full px-3 py-2 border-2 border-gray-300 rounded-lg focus:border-indigo-500 focus:outline-none text-sm`
- Checkboxes: `w-4 h-4 text-indigo-600 rounded focus:ring-indigo-500`

### 3. Add Helper Text
For complex settings, add explanatory text:
```typescript
<p className="text-xs text-gray-500 mt-1">
  Brief explanation of what this setting does
</p>
```

### 4. Conditional Display
Hide settings that don't apply:
```typescript
if (preferences.emptyPaper) {
  return (
    <p className="text-sm text-gray-500">
      This setting is not available for empty paper mode.
    </p>
  );
}
```

### 5. Group Related Checkboxes
```typescript
<div className="space-y-3 p-3 bg-gray-50 rounded-lg">
  <div className="flex items-center gap-3">
    <input type="checkbox" ... />
    <label>Option 1</label>
  </div>
  <div className="flex items-center gap-3">
    <input type="checkbox" ... />
    <label>Option 2</label>
  </div>
</div>
```

## Testing Checklist

When modifying settings:

- [ ] TypeScript compiles without errors
- [ ] Settings persist after page reload
- [ ] Preview updates in real-time
- [ ] PDF generation works correctly
- [ ] All related settings work together
- [ ] Conditional display logic works
- [ ] Default values are sensible
- [ ] UI is responsive and accessible

## Common Pitfalls

### ❌ Don't: Split related settings
```typescript
// BAD: Letter spacing in one component, word spacing in another
```

### ✅ Do: Keep related settings together
```typescript
// GOOD: All spacing settings in TextSpacingSettings
```

### ❌ Don't: Create redundant controls
```typescript
// BAD: Both global opacity AND individual line opacities
```

### ✅ Do: Use single, clear controls
```typescript
// GOOD: Single global opacity that applies to all lines
```

### ❌ Don't: Use unclear section names
```typescript
// BAD: "Advanced Options", "Miscellaneous"
```

### ✅ Do: Use descriptive, purpose-driven names
```typescript
// GOOD: "Text Appearance", "Guideline Layout"
```

## Questions?

If you're unsure where a setting belongs:
1. Look at what the setting controls
2. Find the component that handles that aspect
3. If no component fits, consider if a new logical group is needed
4. Discuss with the team before creating new components
