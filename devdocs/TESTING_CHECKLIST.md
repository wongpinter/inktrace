# Testing Checklist

## Pre-Testing Setup

- [ ] All files saved
- [ ] No TypeScript compilation errors
- [ ] Development server started successfully

## 1. Document Setup Section

### Paper Size
- [ ] Can select A4
- [ ] Can select Letter
- [ ] Can select Legal
- [ ] Can select A5
- [ ] Preview updates when changed

### Page Count
- [ ] Slider moves from 1 to 10
- [ ] Value displays correctly
- [ ] Preview shows correct number of pages

### Page Numbers
- [ ] Checkbox toggles on/off
- [ ] Page numbers appear/disappear in preview
- [ ] Page numbers show in PDF

### Multi-Page Mode
- [ ] Toggle switches on/off
- [ ] When ON: Multi-Page Builder section becomes active
- [ ] When ON: Content, Font, Text sections show disabled message
- [ ] When OFF: Normal sections are active

## 2. Multi-Page Builder Section

- [ ] Only shown when multi-page mode is enabled
- [ ] Can add new pages
- [ ] Can edit page content
- [ ] Can delete pages
- [ ] Can reorder pages
- [ ] Preview updates for each page

## 3. Content Section

- [ ] Only shown when multi-page mode is OFF
- [ ] Worksheet type selector works
- [ ] Text input updates preview
- [ ] Specific letters input works
- [ ] Alphabet case selector works
- [ ] Include numbers checkbox works
- [ ] Include symbols checkbox works
- [ ] Empty paper checkbox works
- [ ] Repeat text checkbox works

## 4. Content Generation Section

- [ ] Only shown when multi-page mode is OFF
- [ ] All tabs switch correctly (Sight Words, Patterns, Sentences, Names, Custom, Random)

### Sight Words Tab
- [ ] Dolch Pre-Primer generates words
- [ ] Dolch Primer generates words
- [ ] Dolch First Grade generates words
- [ ] Dolch Second Grade generates words
- [ ] Dolch Third Grade generates words
- [ ] Fry First 100 generates words
- [ ] Fry Second 100 generates words
- [ ] Fry Third 100 generates words
- [ ] Generated words appear in Content section

### Patterns Tab
- [ ] CVC pattern generates words
- [ ] CVCe pattern generates words
- [ ] CCVC pattern generates words
- [ ] CVCC pattern generates words
- [ ] Digraph pattern generates words
- [ ] Vowel Team pattern generates words

### Sentences Tab
- [ ] Each template generates 5 sentences
- [ ] Sentences use random words
- [ ] Sentences appear in Content section

### Names Tab
- [ ] Custom name input works
- [ ] Generate button creates repeated name
- [ ] Common name buttons work
- [ ] Generated names appear in Content section

### Custom Tab
- [ ] Can add custom words
- [ ] Can remove individual words
- [ ] Can import word list from file
- [ ] Can export word list to file
- [ ] Can clear all words
- [ ] Word count displays correctly

### Random Tab
- [ ] Easy difficulty generates 3-4 letter words
- [ ] Medium difficulty generates 5-6 letter words
- [ ] Hard difficulty generates 7+ letter words
- [ ] Word count slider works (5-30)
- [ ] Generated words appear in Content section

## 5. Font & Typography Section

- [ ] Only shown when multi-page mode is OFF and empty paper is OFF
- [ ] Font category tabs work (Educational, Handwriting, Cursive, etc.)
- [ ] Font search filters fonts
- [ ] Can select different fonts
- [ ] Font preview shows on hover
- [ ] Font size slider works (24-72px)
- [ ] Preview updates with new font size
- [ ] Text case selector works:
  - [ ] None (Original)
  - [ ] UPPERCASE
  - [ ] lowercase
  - [ ] Title Case

## 6. Text Appearance Section

- [ ] Only shown when multi-page mode is OFF and empty paper is OFF
- [ ] Tracing opacity slider works (10-100%)
- [ ] Preview shows opacity changes
- [ ] Text trace style selector works:
  - [ ] Dotted
  - [ ] Dashed
  - [ ] Outline Only
  - [ ] Solid (Light)
- [ ] Show starting dots checkbox works
- [ ] Show stroke arrows checkbox works

## 7. Text Spacing Section

- [ ] Only shown when multi-page mode is OFF and empty paper is OFF
- [ ] Letter spacing slider works (-5 to 20px)
- [ ] Word spacing slider works (0-20px)
- [ ] Character width selector works:
  - [ ] Condensed (Narrow)
  - [ ] Normal
  - [ ] Expanded (Wide)
- [ ] Practice lines slider works (1-5)
- [ ] Preview updates with spacing changes

## 8. Guideline Layout Section

- [ ] Always shown (not conditional)
- [ ] Guideline style selector works:
  - [ ] Standard (3 lines)
  - [ ] Elementary (4 lines)
  - [ ] Dotted Middle (3 lines)
  - [ ] Double Lines (2 lines)
- [ ] Show guidelines checkbox works
- [ ] When guidelines shown:
  - [ ] Extend to margins checkbox works
  - [ ] Show margin lines checkbox works
- [ ] Text vertical alignment selector works (if not empty paper):
  - [ ] Top of Line
  - [ ] Center of Line
  - [ ] Baseline (Recommended)

## 9. Guideline Appearance Section

- [ ] Always shown (not conditional)

### Color Preset
- [ ] Default (Gray) preset works
- [ ] Rainbow preset works
- [ ] Pastel preset works
- [ ] Monochrome (Black) preset works
- [ ] Custom preset works
- [ ] When Custom selected, color pickers appear

### Custom Colors (when Custom selected)
- [ ] Top line color picker works
- [ ] Middle line color picker works
- [ ] Baseline color picker works
- [ ] Bottom line color picker works
- [ ] Preview updates with custom colors

### Other Appearance Settings
- [ ] Guideline thickness slider works (0.25-3px)
- [ ] Emphasize baseline checkbox works
- [ ] When baseline emphasized:
  - [ ] Baseline thickness slider appears
  - [ ] Baseline thickness slider works (1-5px)
  - [ ] Preview shows thicker baseline
- [ ] Dashed pattern checkbox works
- [ ] Guideline opacity slider works (10-100%)

## 10. Preview Functionality

- [ ] Preview updates in real-time
- [ ] Preview shows correct paper size
- [ ] Preview shows correct number of pages
- [ ] Preview shows correct content
- [ ] Preview shows correct font
- [ ] Preview shows correct guidelines
- [ ] Preview shows correct colors
- [ ] Preview shows correct spacing
- [ ] Preview scrolls if content exceeds viewport

## 11. PDF Generation

- [ ] Download PDF button is enabled when content exists
- [ ] Download PDF button is disabled when no content
- [ ] Progress indicator shows during generation
- [ ] PDF downloads successfully
- [ ] PDF contains correct number of pages
- [ ] PDF shows correct content
- [ ] PDF shows correct font and size
- [ ] PDF shows correct guidelines
- [ ] PDF shows correct colors
- [ ] PDF shows page numbers (if enabled)
- [ ] PDF shows footer branding (if enabled)

## 12. Settings Persistence

- [ ] Click Save button
- [ ] Refresh page
- [ ] All settings are restored correctly
- [ ] Preview matches saved settings

## 13. Reset Functionality

- [ ] Click Reset button
- [ ] All settings return to defaults
- [ ] Preview updates to default state
- [ ] Can save after reset

## 14. Accordion Navigation

- [ ] All sections can be opened
- [ ] All sections can be closed
- [ ] Only one section open at a time (accordion behavior)
- [ ] Sections remember open/closed state during session
- [ ] Smooth animations when opening/closing

## 15. Responsive Behavior

- [ ] Layout works on desktop (1920px)
- [ ] Layout works on laptop (1366px)
- [ ] Layout works on tablet (768px)
- [ ] Sidebar scrolls independently
- [ ] Preview scrolls independently
- [ ] No horizontal scrolling

## 16. Edge Cases

### Empty States
- [ ] Empty paper mode hides text settings
- [ ] Multi-page mode with no pages shows message
- [ ] Content generation with no words shows message

### Boundary Values
- [ ] Font size at minimum (24px) works
- [ ] Font size at maximum (72px) works
- [ ] Page count at minimum (1) works
- [ ] Page count at maximum (10) works
- [ ] Opacity at minimum (10%) works
- [ ] Opacity at maximum (100%) works

### Special Characters
- [ ] Text with special characters renders correctly
- [ ] Text with emojis renders correctly
- [ ] Text with numbers renders correctly
- [ ] Text with punctuation renders correctly

### Long Content
- [ ] Very long text wraps correctly
- [ ] Very long text doesn't overflow
- [ ] Multiple pages handle long content
- [ ] PDF generation handles long content

## 17. Browser Compatibility

- [ ] Works in Chrome
- [ ] Works in Firefox
- [ ] Works in Safari
- [ ] Works in Edge

## 18. Performance

- [ ] Settings changes are instant (no lag)
- [ ] Preview updates smoothly
- [ ] PDF generation completes in reasonable time
- [ ] No memory leaks after extended use
- [ ] Smooth scrolling in preview

## 19. Accessibility

- [ ] All inputs have labels
- [ ] Checkboxes are keyboard accessible
- [ ] Sliders are keyboard accessible
- [ ] Dropdowns are keyboard accessible
- [ ] Tab order is logical
- [ ] Focus indicators are visible

## 20. Error Handling

- [ ] Invalid font loads fallback
- [ ] Missing content shows appropriate message
- [ ] Failed PDF generation shows error
- [ ] Failed save shows error
- [ ] Failed load shows error

## Issues Found

Document any issues here:

| Issue # | Section | Description | Severity | Status |
|---------|---------|-------------|----------|--------|
| 1 | | | | |
| 2 | | | | |
| 3 | | | | |

## Sign-Off

- [ ] All critical tests passed
- [ ] All major tests passed
- [ ] Minor issues documented
- [ ] Ready for production

**Tested by:** _______________
**Date:** _______________
**Browser:** _______________
**OS:** _______________

## Notes

Add any additional notes or observations here:
