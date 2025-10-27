import { jsPDF } from 'jspdf';
import { PAPER_SIZES, LINE_HEIGHT_MULTIPLIER, LINE_SET_HEIGHT_MULTIPLIER, TOP_LINE_RATIO } from '@/constants/worksheet';
import { WorksheetPreferences } from '@/types/worksheet';
import { drawGuidelines, drawTracingLine } from './canvasDrawing';
import { getWorksheetContent } from './worksheetContent';

export const drawPage = (
  ctx: CanvasRenderingContext2D,
  width: number,
  height: number,
  preferences: WorksheetPreferences
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
    showStartingDots
  } = preferences;

  ctx.fillStyle = '#ffffff';
  ctx.fillRect(0, 0, width, height);

  const margin = fullMarginGuides ? 20 : 50;
  const contentWidth = width - (margin * 2);
  const contentHeight = height - margin;
  
  let yPosition = margin + fontSize;

  if (emptyPaper) {
    const lineSetHeight = fontSize * 2;
    
    while (yPosition < contentHeight) {
      if (showGuides) {
        drawGuidelines(ctx, margin, yPosition - fontSize * TOP_LINE_RATIO, contentWidth, guidelineStyle, fontSize, guidelineThickness, guidelineOpacity, guidelineColorStyle);
      }
      yPosition += lineSetHeight;
    }
  } else {
    const lineHeight = fontSize * LINE_HEIGHT_MULTIPLIER;
    const lineSetHeight = (lineHeight * (lineCount - 1)) + (fontSize * LINE_SET_HEIGHT_MULTIPLIER);
    
    ctx.font = `${fontSize}px "${selectedFont}"`;
    
    const contentToDisplay = getWorksheetContent(
      worksheetType,
      text,
      specificLetters,
      alphabetCase,
      includeNumbers,
      includeSymbols
    );
    
    if (repeatText) {
      while (yPosition < contentHeight) {
        const words = contentToDisplay.split(' ');
        let currentLine = '';

        for (let i = 0; i < words.length; i++) {
          const word = words[i];
          const testLine = currentLine + (currentLine ? ' ' : '') + word;
          const metrics = ctx.measureText(testLine);
          
          if (metrics.width > contentWidth && currentLine) {
            drawTracingLine(ctx, currentLine, margin, yPosition, lineHeight, lineCount, fontSize, selectedFont, textOpacity, showGuides, guidelineStyle, guidelineThickness, guidelineOpacity, contentWidth, guidelineColorStyle, textTraceStyle, letterSpacing, showStartingDots);
            yPosition += lineSetHeight;
            currentLine = word;
            
            if (yPosition >= contentHeight) break;
          } else {
            currentLine = testLine;
          }
        }
        
        if (currentLine && yPosition < contentHeight) {
          drawTracingLine(ctx, currentLine, margin, yPosition, lineHeight, lineCount, fontSize, selectedFont, textOpacity, showGuides, guidelineStyle, guidelineThickness, guidelineOpacity, contentWidth, guidelineColorStyle, textTraceStyle, letterSpacing, showStartingDots);
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
        const metrics = ctx.measureText(testLine);
        
        if (metrics.width > contentWidth && currentLine) {
          drawTracingLine(ctx, currentLine, margin, yPosition, lineHeight, lineCount, fontSize, selectedFont, textOpacity, showGuides, guidelineStyle, guidelineThickness, guidelineOpacity, contentWidth, guidelineColorStyle, textTraceStyle, letterSpacing, showStartingDots);
          yPosition += lineSetHeight;
          currentLine = word;
          
          if (yPosition >= contentHeight) break;
        } else {
          currentLine = testLine;
        }
      }
      
      if (currentLine && yPosition < contentHeight) {
        drawTracingLine(ctx, currentLine, margin, yPosition, lineHeight, lineCount, fontSize, selectedFont, textOpacity, showGuides, guidelineStyle, guidelineThickness, guidelineOpacity, contentWidth, guidelineColorStyle, textTraceStyle, letterSpacing, showStartingDots);
      }
    }
  }
};

export const generatePDF = (preferences: WorksheetPreferences) => {
  const { paperSize, pageCount } = preferences;
  const size = PAPER_SIZES[paperSize];
  
  // Use 300 DPI for print quality (instead of 96 DPI screen resolution)
  // Scale factor: 300 / 96 = 3.125
  const PRINT_SCALE = 3.125;
  
  const pdf = new jsPDF({
    orientation: size.width > size.height ? 'landscape' : 'portrait',
    unit: 'px',
    format: [size.width, size.height]
  });
  
  for (let i = 0; i < pageCount; i++) {
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
    
    drawPage(ctx, size.width, size.height, preferences);
    
    // Use maximum quality for PNG export
    const imgData = canvas.toDataURL('image/png', 1.0);
    pdf.addImage(imgData, 'PNG', 0, 0, size.width, size.height, undefined, 'FAST');
    
    if (i < pageCount - 1) {
      pdf.addPage();
    }
  }
  
  pdf.save('handwriting-worksheet.pdf');
};
