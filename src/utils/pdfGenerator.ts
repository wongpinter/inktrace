import { jsPDF } from 'jspdf';
import { PAPER_SIZES, LINE_HEIGHT_MULTIPLIER, LINE_SET_HEIGHT_MULTIPLIER, TOP_LINE_RATIO, BASELINE_RATIO, LINE_SPACING_PRESETS, mmToPixels } from '@/constants/worksheet';
import { WorksheetPreferences } from '@/types/worksheet';
import { drawGuidelines, drawTracingLine, drawMarginLines } from './canvasDrawing';
import { getWorksheetContent } from './worksheetContent';
import { transformTextCase, getCharacterWidthScale, getVerticalOffset } from './textFormatting';

// Calculate line height based on spacing preset
const getLineHeightFromPreset = (preferences: WorksheetPreferences, fontSize: number): number => {
  // Fallback to default if preset is not defined (for backward compatibility)
  const preset = preferences.lineSpacingPreset || 'grade1-3';
  
  if (preset === 'custom') {
    const customSpacing = preferences.customLineSpacing || 12.7;
    const result = mmToPixels(customSpacing);
    console.log(`✓ Line spacing: custom (${customSpacing.toFixed(1)}mm) = ${Math.round(result)}px`);
    return result;
  }
  
  const spacingConfig = LINE_SPACING_PRESETS[preset];
  if (!spacingConfig) {
    // Fallback to multiplier-based calculation if preset not found
    const result = fontSize * LINE_HEIGHT_MULTIPLIER;
    console.log(`⚠ Line spacing: fallback ${Math.round(result)}px (fontSize ${fontSize} × ${LINE_HEIGHT_MULTIPLIER})`);
    return result;
  }
  
  const result = mmToPixels(spacingConfig.spacingMm);
  console.log(`✓ Line spacing: ${preset} (${spacingConfig.spacingMm}mm) = ${Math.round(result)}px`);
  return result;
};

// Helper function to measure text width as it will actually be rendered
const measureTextWidth = (
  ctx: CanvasRenderingContext2D,
  text: string,
  characterWidthScale: number,
  letterSpacing: number,
  wordSpacing: number
): number => {
  // Measure base text width
  let width = ctx.measureText(text).width;

  // Add letter spacing (applied to each character)
  if (letterSpacing > 0) {
    width += text.length * letterSpacing;
  }

  // Add word spacing (applied between words)  
  if (wordSpacing > 0) {
    const wordCount = text.split(' ').length - 1;
    width += wordCount * wordSpacing;
  }

  // Return the measured width - the characterWidthScale is handled
  // by the canvas transform during rendering, not in measurement
  return width;
};

export const drawPage = (
  ctx: CanvasRenderingContext2D,
  width: number,
  height: number,
  preferences: WorksheetPreferences,
  pageNumber?: number,
  totalPages?: number
) => {
  const {
    fontSize,
    lineCount,
    selectedFont,
    showGuides,
    guidelineStyle,
    guidelineThickness,
    emptyPaper,
    repeatText,
    fullMarginGuides,
    textOpacity,
    guidelineOpacity,
    text,
    worksheetType,
    specificLetters,
    alphabetCase,
    includeNumbers,
    includeSymbols,
    guidelineColorStyle,
    textTraceStyle,
    letterSpacing,
    showStartingDots,
    showPageNumbers,
    showFooter,
    footerText,
    wordSpacing,
    characterWidth,
    verticalAlignment,
    textCase,
    customGuidelineColors,
    dashedGuidelines,
    showMarginLines,
    emphasizeBaseline,
    baselineThickness
  } = preferences;

  ctx.fillStyle = '#ffffff';
  ctx.fillRect(0, 0, width, height);

  const margin = fullMarginGuides ? 20 : 50;
  const contentWidth = width - (margin * 2);
  const contentHeight = height - margin;

  // Draw header with branding
  if (showFooter && footerText) {
    const headerY = 15;
    ctx.font = '10px Arial, sans-serif';
    ctx.fillStyle = 'rgba(100, 100, 100, 0.6)';
    ctx.textAlign = 'left';
    ctx.fillText(`${footerText} (https://inktrace.wongpinter.com)`, margin, headerY);
  }

  // Use preset-based line spacing or fall back to multiplier
  const lineHeight = getLineHeightFromPreset(preferences, fontSize);

  // Draw margin lines if enabled
  if (showMarginLines) {
    drawMarginLines(ctx, margin, margin, contentWidth, contentHeight - margin, guidelineThickness);
  }

  let yPosition = margin + fontSize;

  if (emptyPaper) {
    // Use the same line spacing for empty paper
    const lineSetHeight = lineHeight;

    while (yPosition < contentHeight) {
      if (showGuides) {
        // Position guidelines so the baseline aligns with yPosition
        // Guideline baseline is at: topY + (lineHeight * BASELINE_RATIO)
        // So: topY = yPosition - (lineHeight * BASELINE_RATIO)
        const guidelineTopY = yPosition - (lineHeight * BASELINE_RATIO);
        
        drawGuidelines(
          ctx,
          margin,
          guidelineTopY,
          contentWidth,
          guidelineStyle,
          fontSize,
          guidelineThickness,
          guidelineOpacity,
          guidelineColorStyle,
          customGuidelineColors,
          dashedGuidelines,
          emphasizeBaseline,
          baselineThickness,
          lineHeight
        );
      }
      yPosition += lineSetHeight;
    }
  } else {
    const lineSetHeight = (lineHeight * (lineCount - 1)) + (fontSize * LINE_SET_HEIGHT_MULTIPLIER);

    // Calculate text formatting values
    const characterWidthScale = getCharacterWidthScale(characterWidth);
    const verticalOffset = getVerticalOffset(verticalAlignment, fontSize, lineHeight);

    ctx.font = `${fontSize}px "${selectedFont}"`;

    // Apply text case transformation
    let contentToDisplay = getWorksheetContent(
      worksheetType,
      text,
      specificLetters,
      alphabetCase,
      includeNumbers,
      includeSymbols
    );
    contentToDisplay = transformTextCase(contentToDisplay, textCase);

    if (repeatText) {
      while (yPosition < contentHeight) {
        const words = contentToDisplay.split(' ');
        let currentLine = '';

        for (let i = 0; i < words.length; i++) {
          const word = words[i];
          const testLine = currentLine + (currentLine ? ' ' : '') + word;

          // Measure text width with all formatting applied
          const testWidth = measureTextWidth(ctx, testLine, characterWidthScale, letterSpacing, wordSpacing);

          // Allow text to use slightly more than guideline width to fill the line better
          if (testWidth > contentWidth * 1.12 && currentLine) {
            drawTracingLine(ctx, currentLine, margin, yPosition, lineHeight, lineCount, fontSize, selectedFont, textOpacity, showGuides, guidelineStyle, guidelineThickness, guidelineOpacity, contentWidth, guidelineColorStyle, textTraceStyle, letterSpacing, showStartingDots, wordSpacing, characterWidthScale, verticalOffset, customGuidelineColors, dashedGuidelines, emphasizeBaseline, baselineThickness);
            yPosition += lineSetHeight;
            currentLine = word;

            if (yPosition >= contentHeight) break;
          } else {
            currentLine = testLine;
          }
        }

        if (currentLine && yPosition < contentHeight) {
          drawTracingLine(ctx, currentLine, margin, yPosition, lineHeight, lineCount, fontSize, selectedFont, textOpacity, showGuides, guidelineStyle, guidelineThickness, guidelineOpacity, contentWidth, guidelineColorStyle, textTraceStyle, letterSpacing, showStartingDots, wordSpacing, characterWidthScale, verticalOffset, customGuidelineColors, dashedGuidelines, emphasizeBaseline, baselineThickness);
          yPosition += lineSetHeight;
        } else {
          break;
        }
      }
    } else {
      const words = contentToDisplay.split(' ');
      let currentLine = '';

      for (let i = 0; i < words.length; i++) {
        const word = words[i];
        const testLine = currentLine + (currentLine ? ' ' : '') + word;

        // Measure text width with all formatting applied
        const testWidth = measureTextWidth(ctx, testLine, characterWidthScale, letterSpacing, wordSpacing);

        // Allow text to use slightly more than guideline width to fill the line better
        if (testWidth > contentWidth * 1.08 && currentLine) {
          drawTracingLine(ctx, currentLine, margin, yPosition, lineHeight, lineCount, fontSize, selectedFont, textOpacity, showGuides, guidelineStyle, guidelineThickness, guidelineOpacity, contentWidth, guidelineColorStyle, textTraceStyle, letterSpacing, showStartingDots, wordSpacing, characterWidthScale, verticalOffset, customGuidelineColors, dashedGuidelines, emphasizeBaseline, baselineThickness);
          yPosition += lineSetHeight;
          currentLine = word;

          if (yPosition >= contentHeight) break;
        } else {
          currentLine = testLine;
        }
      }

      if (currentLine && yPosition < contentHeight) {
        drawTracingLine(ctx, currentLine, margin, yPosition, lineHeight, lineCount, fontSize, selectedFont, textOpacity, showGuides, guidelineStyle, guidelineThickness, guidelineOpacity, contentWidth, guidelineColorStyle, textTraceStyle, letterSpacing, showStartingDots, wordSpacing, characterWidthScale, verticalOffset, customGuidelineColors, dashedGuidelines, emphasizeBaseline, baselineThickness);
      }
    }
  }

  // Draw footer with page numbers
  if (showPageNumbers && pageNumber && totalPages) {
    const footerY = height - 20;
    ctx.font = '10px Arial, sans-serif';
    ctx.fillStyle = 'rgba(100, 100, 100, 0.6)';
    ctx.textAlign = 'right';
    ctx.fillText(`Page ${pageNumber} of ${totalPages}`, width - margin, footerY);

    // Reset text align
    ctx.textAlign = 'left';
  }
};

export const generatePDF = (preferences: WorksheetPreferences) => {
  const { paperSize, multiPageMode, pages, pageCount } = preferences;
  const size = PAPER_SIZES[paperSize];

  // Use 300 DPI for print quality (instead of 96 DPI screen resolution)
  // Scale factor: 300 / 96 = 3.125
  const PRINT_SCALE = 3.125;

  const pdf = new jsPDF({
    orientation: size.width > size.height ? 'landscape' : 'portrait',
    unit: 'px',
    format: [size.width, size.height]
  });

  // Determine total pages
  const totalPages = multiPageMode ? pages.length : pageCount;

  for (let i = 0; i < totalPages; i++) {
    const canvas = document.createElement('canvas');
    // Render at higher resolution for print quality
    canvas.width = size.width * PRINT_SCALE;
    canvas.height = size.height * PRINT_SCALE;
    const ctx = canvas.getContext('2d');

    if (!ctx) continue;

    // Scale the context to render at higher resolution
    ctx.scale(PRINT_SCALE, PRINT_SCALE);

    // Enable high-quality rendering
    ctx.imageSmoothingEnabled = true;
    ctx.imageSmoothingQuality = 'high';

    // Create page-specific preferences
    let pagePreferences = preferences;
    if (multiPageMode && pages[i]) {
      // Merge global settings with page-specific content
      pagePreferences = {
        ...preferences,
        worksheetType: pages[i].worksheetType,
        text: pages[i].text,
        specificLetters: pages[i].specificLetters,
        alphabetCase: pages[i].alphabetCase,
        includeNumbers: pages[i].includeNumbers,
        includeSymbols: pages[i].includeSymbols,
        emptyPaper: pages[i].emptyPaper,
        repeatText: pages[i].repeatText
      };
    }

    // Draw page with page number
    drawPage(ctx, size.width, size.height, pagePreferences, i + 1, totalPages);

    // Use maximum quality for PNG export
    const imgData = canvas.toDataURL('image/png', 1.0);
    pdf.addImage(imgData, 'PNG', 0, 0, size.width, size.height, undefined, 'FAST');

    if (i < totalPages - 1) {
      pdf.addPage();
    }
  }

  pdf.save('handwriting-worksheet.pdf');
};
