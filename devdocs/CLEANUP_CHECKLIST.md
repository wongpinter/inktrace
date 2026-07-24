# Cleanup Checklist

## Files That Can Be Safely Deleted

These old component files have been replaced by the new reorganized components and are no longer referenced anywhere in the codebase:

### ❌ Can Delete
- [ ] `src/components/worksheet/PageSettings.tsx`
  - **Replaced by:** `DocumentSetupSettings.tsx` (document setup) + `GuidelineLayoutSettings.tsx` (guideline options)
  - **Status:** No longer imported or used

- [ ] `src/components/worksheet/EnhancedGuidelineSettings.tsx`
  - **Replaced by:** `GuidelineLayoutSettings.tsx` + `GuidelineAppearanceSettings.tsx`
  - **Status:** No longer imported or used

- [ ] `src/components/worksheet/LineStyleSettings.tsx`
  - **Replaced by:** `TextAppearanceSettings.tsx` + `GuidelineAppearanceSettings.tsx`
  - **Status:** No longer imported or used

### ✅ Keep (Still Used)
- ✅ `src/components/worksheet/ContentSettings.tsx` - Still used for content input
- ✅ `src/components/worksheet/ContentGenerationSettings.tsx` - Still used for content generation
- ✅ `src/components/worksheet/FontSelector.tsx` - Still used within FontTypographySettings
- ✅ `src/components/worksheet/PageBuilder.tsx` - Still used for multi-page mode
- ✅ `src/components/worksheet/WorksheetPreview.tsx` - Still used for preview

## Type Cleanup (Already Done)

### ✅ Removed from Types
- ✅ Removed `useCustomGuidelineColors` field from `WorksheetPreferences`
- ✅ Removed `guidelineOpacities` field from `WorksheetPreferences`
- ✅ Added `'custom'` to `GuidelineColorStyle` type

### ✅ Removed from Constants
- ✅ Removed `useCustomGuidelineColors: false` from `DEFAULT_PREFERENCES`
- ✅ Removed `guidelineOpacities` object from `DEFAULT_PREFERENCES`

## Function Signature Updates (Already Done)

### ✅ Updated Functions
- ✅ `drawGuidelines()` - Removed `useCustomColors` and `lineOpacities` parameters
- ✅ `drawTracingLine()` - Removed `useCustomColors` and `lineOpacities` parameters
- ✅ All calls to these functions updated in:
  - `src/utils/canvasDrawing.ts`
  - `src/utils/pdfGenerator.ts`

## Testing Checklist

Before deleting the old files, verify:

- [ ] Application starts without errors
- [ ] All accordion sections open/close correctly
- [ ] Document Setup section works:
  - [ ] Paper size changes
  - [ ] Page count slider
  - [ ] Page numbers toggle
  - [ ] Multi-page mode toggle
  
- [ ] Font & Typography section works:
  - [ ] Font selection
  - [ ] Font size slider
  - [ ] Text case dropdown
  
- [ ] Text Appearance section works:
  - [ ] Tracing opacity slider
  - [ ] Text trace style dropdown
  - [ ] Starting dots checkbox
  - [ ] Stroke arrows checkbox
  
- [ ] Text Spacing section works:
  - [ ] Letter spacing slider
  - [ ] Word spacing slider
  - [ ] Character width dropdown
  - [ ] Practice lines slider
  
- [ ] Guideline Layout section works:
  - [ ] Guideline style dropdown
  - [ ] Show guidelines checkbox
  - [ ] Extend to margins checkbox
  - [ ] Show margin lines checkbox
  - [ ] Vertical alignment dropdown
  
- [ ] Guideline Appearance section works:
  - [ ] Color preset dropdown (including "Custom")
  - [ ] Custom color pickers appear when "Custom" selected
  - [ ] Guideline thickness slider
  - [ ] Emphasize baseline checkbox
  - [ ] Baseline thickness slider (when emphasized)
  - [ ] Dashed pattern checkbox
  - [ ] Guideline opacity slider
  
- [ ] PDF generation works correctly
- [ ] Settings persist after page reload
- [ ] Preview updates in real-time

## Migration Notes for Users

If users have saved preferences with the old structure:

### Automatic Migration
The following will happen automatically:
- Old `useCustomGuidelineColors: true` → `guidelineColorStyle: 'custom'`
- Old `guidelineOpacities` → Ignored, uses global `guidelineOpacity`
- All other settings remain compatible

### Manual Steps (None Required)
Users don't need to do anything - their settings will continue to work!

## Rollback Plan

If issues are discovered:

1. **Keep the old files** until thoroughly tested in production
2. **Git revert** is available if needed
3. **Old component files** can be temporarily restored from git history

## Completion Status

- ✅ New components created (6 files)
- ✅ Types updated
- ✅ Constants updated
- ✅ Function signatures updated
- ✅ All function calls updated
- ✅ Main Index.tsx updated
- ✅ No TypeScript errors
- ⏳ Testing in progress
- ⏳ Old files ready for deletion (after testing)

## Commands to Delete Old Files

Once testing is complete, run:

```bash
# Delete old component files
rm src/components/worksheet/PageSettings.tsx
rm src/components/worksheet/EnhancedGuidelineSettings.tsx
rm src/components/worksheet/LineStyleSettings.tsx
```

Or use your IDE's delete function to remove these files.
