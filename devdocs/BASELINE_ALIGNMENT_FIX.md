# Baseline Alignment Fix

## Problem
When changing line spacing presets, the text didn't follow the guideline baseline. The text position remained fixed while the guidelines expanded or contracted around it.

## Root Cause
The guideline positioning was calculated using `fontSize` instead of the actual `lineHeight` (guideline height):

```typescript
// BEFORE (incorrect):
const guidelineTopY = y - fontSize * TOP_LINE_RATIO;
const baselineY = guidelineTopY + (fontSize * BASELINE_RATIO);
```

This meant:
- Guidelines were sized by `lineHeight` (correct)
- But positioned relative to `fontSize` (incorrect)
- Text didn't align with the guideline baseline

## Solution

### 1. Text Mode (`drawTracingLine`)
Calculate guideline position so the baseline aligns with text:

```typescript
// AFTER (correct):
const guidelineHeight = lineHeight || fontSize;
const baselineY = y;
const guidelineTopY = baselineY - verticalOffset - (guidelineHeight * BASELINE_RATIO);
```

### 2. Empty Paper Mode (`pdfGenerator`)
Position guidelines consistently:

```typescript
// AFTER (correct):
const guidelineTopY = yPosition - (lineHeight * BASELINE_RATIO);
```

## Result
✅ Text now sits on the guideline baseline regardless of line spacing
✅ Changing presets expands/contracts guidelines around the text
✅ Consistent behavior in both text and empty paper modes
