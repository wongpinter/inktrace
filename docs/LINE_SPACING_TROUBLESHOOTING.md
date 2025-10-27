# Line Spacing Troubleshooting Guide

## Issue: Line spacing changes not visible in preview

### Root Causes Identified and Fixed

1. **Missing Fallback Values**
   - Old saved preferences in localStorage didn't have `lineSpacingPreset` or `customLineSpacing`
   - Added fallback values in `getLineHeightFromPreset()` function
   - Default preset: `'grade1-3'` (12.7mm)
   - Default custom spacing: `12.7` mm

2. **Preview Not Re-rendering**
   - Added explicit dependencies to WorksheetPreview useEffect
   - Now includes `preferences.lineSpacingPreset` and `preferences.customLineSpacing`
   - Ensures preview updates when line spacing changes

3. **Debug Logging Added**
   - Console logs show which preset is being used
   - Displays mm to pixel conversion
   - Helps identify if values are being applied correctly

### Testing the Fix

1. **Clear Browser Cache** (if needed):
   ```javascript
   // In browser console:
   localStorage.removeItem('handwriting-worksheet-preferences');
   location.reload();
   ```

2. **Test Each Preset**:
   - Kindergarten (19mm) - Should show very wide spacing
   - Grades 1-3 (12.7mm) - Medium spacing (default)
   - Grades 4-6 (8.7mm) - Narrower spacing
   - Narrow Ruled (6.4mm) - Tightest spacing
   - Custom - Adjustable from 6mm to 25mm

3. **Check Console Logs**:
   - Open browser DevTools (F12)
   - Look for messages like: `Line spacing: grade1-3 12.7mm = 48px`
   - Verify the pixel values change when you select different presets

4. **Visual Verification**:
   - Switch between presets
   - Preview should update immediately
   - Lines should be visibly closer or farther apart
   - Empty paper mode should also reflect changes

### Expected Behavior

- **Kindergarten (19mm)**: ~72px spacing - very wide, suitable for large handwriting
- **Grades 1-3 (12.7mm)**: ~48px spacing - standard early elementary
- **Grades 4-6 (8.7mm)**: ~33px spacing - matches wide-ruled notebook paper
- **Narrow Ruled (6.4mm)**: ~24px spacing - college ruled, tight spacing

### If Issues Persist

1. **Check Browser Console** for errors
2. **Verify localStorage** has been cleared
3. **Check that mmToPixels function** is working:
   ```javascript
   // In console:
   (12.7 * 96) / 25.4  // Should equal ~48
   ```
4. **Ensure preferences are being passed** to preview component
5. **Try different paper sizes** - some may show changes more clearly

### Files Modified

- `src/types/worksheet.ts` - Added LineSpacingPreset type
- `src/constants/worksheet.ts` - Added LINE_SPACING_PRESETS and mmToPixels
- `src/components/worksheet/LineSpacingSettings.tsx` - New settings component
- `src/utils/pdfGenerator.ts` - Updated to use preset-based spacing
- `src/components/worksheet/WorksheetPreview.tsx` - Added dependencies for re-rendering
- `src/pages/Index.tsx` - Added LineSpacingSettings to accordion

### Migration Notes

Users with existing saved preferences will automatically get:
- Default preset: `'grade1-3'` (12.7mm)
- Default custom spacing: `12.7` mm
- No data loss - all other preferences preserved
