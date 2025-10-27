# Line Spacing Feature

## Overview
The line spacing feature allows users to select standard baseline-to-baseline measurements for handwriting worksheets based on educational standards.

## Educational Standards Implemented

### Baseline-to-Baseline Measurements

1. **Kindergarten (19mm)**
   - Zaner-Bloser standard
   - Largest spacing for beginning writers
   - Tall letter height: ~12.7mm

2. **Grades 1-3 (12.7mm / ½ inch)**
   - Standard for early elementary
   - D'Nealian and common educational standard
   - Appropriate for developing handwriting skills

3. **Grades 4-6 (8.7mm / 11/32 inch)**
   - Wide ruled standard
   - Upper elementary level
   - Matches standard wide-ruled notebook paper

4. **Wide Ruled (8.7mm)**
   - Standard wide ruled notebook paper
   - Suitable for grades 4 and up

5. **Narrow Ruled (6.4mm / ¼ inch)**
   - College ruled standard
   - For older students (grades 7+)
   - Smallest standard spacing

6. **Custom**
   - User-defined spacing from 6mm to 25mm
   - Allows flexibility for special needs or preferences

## Technical Implementation

### Type Definitions
- Added `LineSpacingPreset` type with preset options
- Added `lineSpacingPreset` and `customLineSpacing` to `WorksheetPreferences`

### Constants
- `LINE_SPACING_PRESETS`: Configuration object with all preset details
- `mmToPixels()`: Conversion function from millimeters to pixels at 96 DPI

### Components
- `LineSpacingSettings.tsx`: New settings panel for line spacing configuration
- Integrated into the main settings accordion in `Index.tsx`

### PDF Generation
- `getLineHeightFromPreset()`: Calculates line height based on selected preset
- Updated both text and empty paper modes to use preset-based spacing
- Replaces the previous fixed multiplier approach

## Usage

1. Navigate to the "Line Spacing" section in the settings panel
2. Select a preset from the dropdown menu
3. For custom spacing, select "Custom" and adjust the slider
4. The current spacing is displayed in both millimeters and pixels
5. Generate the worksheet to see the applied spacing

## Benefits

- **Standards Compliance**: Matches educational curriculum standards (Zaner-Bloser, D'Nealian)
- **Grade-Appropriate**: Easy selection of spacing appropriate for different grade levels
- **Flexibility**: Custom option allows for special requirements
- **Consistency**: Ensures worksheets match standard notebook paper
- **Professional**: Creates worksheets that align with classroom materials

## Future Enhancements

Potential improvements:
- Add more curriculum-specific presets (e.g., Handwriting Without Tears)
- Include tall letter height recommendations for each preset
- Add visual preview of spacing in the settings panel
- Support for metric vs. imperial unit display preferences
