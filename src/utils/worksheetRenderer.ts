import { BASELINE_RATIO, LINE_HEIGHT_MULTIPLIER, LINE_SET_HEIGHT_MULTIPLIER, LINE_SPACING_PRESETS, mmToPixels } from '@/constants/worksheet';
import { PaperSizeConfig, WorksheetPreferences } from '@/types/worksheet';
import { drawGuidelines, drawTracingLine, drawMarginLines, drawWorksheetHeader } from './canvasDrawing';
import { getWorksheetContent } from './worksheetContent';
import { transformTextCase, getCharacterWidthScale, getVerticalOffset } from './textFormatting';

export interface RenderWorksheetPageInput {
  ctx: CanvasRenderingContext2D;
  page: WorksheetPreferences;
  paper: PaperSizeConfig;
  pageNumber?: number;
  totalPages?: number;
}

// Calculate line height based on spacing preset
const getLineHeightFromPreset = (preferences: WorksheetPreferences, fontSize: number): number => {
  // Fallback to default if preset is not defined (for backward compatibility)
  const preset = preferences.lineSpacingPreset || 'grade1-3';
  
  if (preset === 'custom') {
    const customSpacing = preferences.customLineSpacing || 12.7;
    return mmToPixels(customSpacing);
  }
  
  const spacingConfig = LINE_SPACING_PRESETS[preset];
  if (!spacingConfig) {
    // Fallback to multiplier-based calculation if preset not found
    return fontSize * LINE_HEIGHT_MULTIPLIER;
  }
  
  return mmToPixels(spacingConfig.spacingMm);
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

  return width * characterWidthScale;
};

export const renderWorksheetPage = ({
  ctx,
  page,
  paper,
  pageNumber,
  totalPages
}: RenderWorksheetPageInput) => {
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
    wordSpacing,
    characterWidth,
    verticalAlignment,
    textCase,
    customGuidelineColors,
    dashedGuidelines,
    showMarginLines,
    emphasizeBaseline,
    baselineThickness
  } = page;

  const { width, height } = paper;

  ctx.fillStyle = '#ffffff';
  ctx.fillRect(0, 0, width, height);

  const margin = fullMarginGuides ? 20 : 50;
  const contentWidth = width - (margin * 2);
  const contentHeight = height - margin;

  // Draw clean informative header
  const headerHeight = 20;
  if (showFooter) {
    drawWorksheetHeader(ctx, width, margin, selectedFont, true);
  }

  // Use preset-based line spacing or fall back to multiplier
  const lineHeight = getLineHeightFromPreset(page, fontSize);

  // Draw margin lines if enabled
  if (showMarginLines) {
    drawMarginLines(ctx, margin, margin, contentWidth, contentHeight - margin, guidelineThickness);
  }

  // Start content below header
  const topMargin = showFooter ? headerHeight + 10 : margin;
  let yPosition = topMargin + fontSize;

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
