import { GUIDELINE_STYLES, BASELINE_RATIO, TOP_LINE_RATIO, MIDLINE_RATIO, DESCENDER_RATIO, ASCENDER_RATIO, X_HEIGHT_RATIO, LINE_HEIGHT_MULTIPLIER, GUIDELINE_COLOR_STYLES, TEXT_TRACE_STYLES } from '@/constants/worksheet';
import { GuidelineStyle, GuidelineColorStyle, TextTraceStyle } from '@/types/worksheet';

export const drawGuidelines = (
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  width: number,
  style: GuidelineStyle,
  fontSize: number,
  guidelineThickness: number,
  guidelineOpacity: number,
  colorStyle: GuidelineColorStyle = 'default',
  customColors?: { top: string; middle: string; baseline: string; bottom: string },
  dashedPattern: boolean = false,
  emphasizeBaseline: boolean = false,
  baselineThickness: number = 1.5,
  lineHeight?: number
) => {
  const styleConfig = GUIDELINE_STYLES[style];
  const { lines, dottedMiddle, useEducationalProportions, showDescenderSpace } = styleConfig;
  const colors = colorStyle === 'custom' && customColors 
    ? customColors 
    : GUIDELINE_COLOR_STYLES[colorStyle]?.colors || GUIDELINE_COLOR_STYLES.default.colors;
  
  // Use lineHeight if provided, otherwise fall back to fontSize
  const guidelineHeight = lineHeight || fontSize;
  
  const topLineY = y;
  const bottomLineY = y + guidelineHeight;
  const totalHeight = bottomLineY - topLineY;
  
  for (let i = 0; i < lines; i++) {
    let currentY: number = 0;
    let lineColor: string = '';
    let lineType: 'top' | 'middle' | 'baseline' | 'bottom' = 'top';
    let currentThickness = guidelineThickness;
    
    if (lines === 2) {
      currentY = i === 0 ? topLineY : bottomLineY;
      lineColor = i === 0 ? colors.top : colors.bottom;
      lineType = i === 0 ? 'top' : 'bottom';
    } else if (lines === 3) {
      if (i === 0) {
        currentY = topLineY;
        lineColor = colors.top;
        lineType = 'top';
      } else if (i === 1) {
        currentY = topLineY + (totalHeight * BASELINE_RATIO);
        lineColor = colors.baseline;
        lineType = 'baseline';
      } else {
        currentY = bottomLineY;
        lineColor = colors.bottom;
        lineType = 'bottom';
      }
    } else if (lines === 4) {
      if (useEducationalProportions) {
        // Educational 3:3:2 ratio (ascender:x-height:descender)
        // Line 0: Descender line (bottom)
        // Line 1: Baseline
        // Line 2: Midline (dotted)
        // Line 3: Headline (top)
        if (i === 0) {
          currentY = bottomLineY; // Descender line
          lineColor = colors.bottom;
          lineType = 'bottom';
        } else if (i === 1) {
          currentY = topLineY + (totalHeight * DESCENDER_RATIO); // Baseline
          lineColor = colors.baseline;
          lineType = 'baseline';
        } else if (i === 2) {
          currentY = topLineY + (totalHeight * (DESCENDER_RATIO + X_HEIGHT_RATIO)); // Midline
          lineColor = colors.middle;
          lineType = 'middle';
        } else {
          currentY = topLineY; // Headline
          lineColor = colors.top;
          lineType = 'top';
        }
      } else {
        // Legacy proportions
        if (i === 0) {
          currentY = topLineY;
          lineColor = colors.top;
          lineType = 'top';
        } else if (i === 1) {
          currentY = topLineY + (totalHeight * TOP_LINE_RATIO);
          lineColor = colors.middle;
          lineType = 'middle';
        } else if (i === 2) {
          currentY = topLineY + (totalHeight * BASELINE_RATIO);
          lineColor = colors.baseline;
          lineType = 'baseline';
        } else {
          currentY = bottomLineY;
          lineColor = colors.bottom;
          lineType = 'bottom';
        }
      }
    }
    
    // Apply opacity to the color
    let colorWithOpacity: string;
    if (lineColor.startsWith('#')) {
      // Convert hex to rgba
      const r = parseInt(lineColor.slice(1, 3), 16);
      const g = parseInt(lineColor.slice(3, 5), 16);
      const b = parseInt(lineColor.slice(5, 7), 16);
      colorWithOpacity = `rgba(${r}, ${g}, ${b}, ${guidelineOpacity})`;
    } else {
      colorWithOpacity = lineColor.replace(/[\d.]+\)$/, `${guidelineOpacity})`);
    }
    
    ctx.strokeStyle = colorWithOpacity;
    
    // Apply baseline emphasis
    if (emphasizeBaseline && lineType === 'baseline') {
      currentThickness = baselineThickness;
    }
    
    ctx.lineWidth = currentThickness;
    
    // Apply dash pattern
    if (dashedPattern) {
      ctx.setLineDash([5, 5]);
    } else if (dottedMiddle && ((i === 1 && lines === 3) || (i === 1 && lines === 4))) {
      ctx.setLineDash([3, 3]);
    } else {
      ctx.setLineDash([]);
    }
    
    ctx.beginPath();
    ctx.moveTo(x, currentY);
    ctx.lineTo(x + width, currentY);
    ctx.stroke();
  }
  
  ctx.setLineDash([]);
};

export const drawMarginLines = (
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  width: number,
  height: number,
  thickness: number = 1
) => {
  ctx.strokeStyle = 'rgba(200, 200, 200, 0.5)';
  ctx.lineWidth = thickness;
  ctx.setLineDash([10, 5]);
  
  // Left margin
  ctx.beginPath();
  ctx.moveTo(x, y);
  ctx.lineTo(x, y + height);
  ctx.stroke();
  
  // Right margin
  ctx.beginPath();
  ctx.moveTo(x + width, y);
  ctx.lineTo(x + width, y + height);
  ctx.stroke();
  
  ctx.setLineDash([]);
};

export const drawTracedText = (
  ctx: CanvasRenderingContext2D,
  text: string,
  x: number,
  y: number,
  textOpacity: number,
  traceStyle: TextTraceStyle,
  letterSpacing: number,
  showStartingDots: boolean,
  fontSize: number
) => {
  ctx.save();
  
  const style = TEXT_TRACE_STYLES[traceStyle];
  
  if (letterSpacing > 0) {
    // Draw each character with custom spacing
    let currentX = x;
    for (let i = 0; i < text.length; i++) {
      const char = text[i];
      
      if (showStartingDots && char.trim()) {
        // Draw starting dot
        ctx.fillStyle = 'rgba(255, 0, 0, 0.6)';
        ctx.beginPath();
        ctx.arc(currentX + 2, y - fontSize * 0.3, 3, 0, Math.PI * 2);
        ctx.fill();
      }
      
      // Draw the character
      if (traceStyle === 'solid') {
        ctx.fillStyle = `rgba(0, 0, 0, ${textOpacity})`;
        ctx.fillText(char, currentX, y);
      } else if (traceStyle === 'outline') {
        ctx.strokeStyle = `rgba(0, 0, 0, ${textOpacity * 0.8})`;
        ctx.lineWidth = 1.5;
        ctx.setLineDash([]);
        ctx.strokeText(char, currentX, y);
      } else {
        // Dotted or dashed
        ctx.strokeStyle = `rgba(0, 0, 0, ${textOpacity * 0.8})`;
        ctx.fillStyle = `rgba(0, 0, 0, ${textOpacity * 0.3})`;
        ctx.lineWidth = 1;
        ctx.setLineDash(style.dashPattern);
        ctx.strokeText(char, currentX, y);
        if (traceStyle === 'dotted') {
          ctx.fillText(char, currentX, y);
        }
      }
      
      const charWidth = ctx.measureText(char).width;
      currentX += charWidth + letterSpacing;
    }
  } else {
    // Draw text normally without custom spacing
    if (showStartingDots && text.trim()) {
      ctx.fillStyle = 'rgba(255, 0, 0, 0.6)';
      ctx.beginPath();
      ctx.arc(x + 2, y - fontSize * 0.3, 3, 0, Math.PI * 2);
      ctx.fill();
    }
    
    if (traceStyle === 'solid') {
      ctx.fillStyle = `rgba(0, 0, 0, ${textOpacity})`;
      ctx.fillText(text, x, y);
    } else if (traceStyle === 'outline') {
      ctx.strokeStyle = `rgba(0, 0, 0, ${textOpacity * 0.8})`;
      ctx.lineWidth = 1.5;
      ctx.setLineDash([]);
      ctx.strokeText(text, x, y);
    } else {
      ctx.strokeStyle = `rgba(0, 0, 0, ${textOpacity * 0.8})`;
      ctx.fillStyle = `rgba(0, 0, 0, ${textOpacity * 0.3})`;
      ctx.lineWidth = 1;
      ctx.setLineDash(style.dashPattern);
      ctx.strokeText(text, x, y);
      if (traceStyle === 'dotted') {
        ctx.fillText(text, x, y);
      }
    }
  }
  
  ctx.restore();
};

export const drawTracingLine = (
  ctx: CanvasRenderingContext2D,
  text: string,
  x: number,
  y: number,
  lineHeight: number,
  lineCount: number,
  fontSize: number,
  selectedFont: string,
  textOpacity: number,
  showGuides: boolean,
  guidelineStyle: GuidelineStyle,
  guidelineThickness: number,
  guidelineOpacity: number,
  contentWidth: number,
  guidelineColorStyle: GuidelineColorStyle,
  textTraceStyle: TextTraceStyle,
  letterSpacing: number,
  showStartingDots: boolean,
  wordSpacing: number = 0,
  characterWidthScale: number = 1.0,
  verticalOffset: number = 0,
  customColors?: { top: string; middle: string; baseline: string; bottom: string },
  dashedGuidelines: boolean = false,
  emphasizeBaseline: boolean = false,
  baselineThickness: number = 1.5
) => {
  // Use lineHeight for guideline calculations to match the actual guideline spacing
  const guidelineHeight = lineHeight || fontSize;
  
  // The text baseline should align with the guideline baseline
  // Guideline baseline is at: guidelineTopY + (guidelineHeight * BASELINE_RATIO)
  // Text is drawn at: baselineY + verticalOffset
  // So: guidelineTopY + (guidelineHeight * BASELINE_RATIO) = y - verticalOffset
  // Therefore: guidelineTopY = y - verticalOffset - (guidelineHeight * BASELINE_RATIO)
  const baselineY = y;
  const guidelineTopY = baselineY - verticalOffset - (guidelineHeight * BASELINE_RATIO);
  
  for (let i = 0; i < lineCount; i++) {
    const currentTopY = guidelineTopY + (i * lineHeight);
    const currentBaselineY = baselineY + (i * lineHeight);
    
    if (showGuides) {
      drawGuidelines(
        ctx, 
        x, 
        currentTopY, 
        contentWidth, 
        guidelineStyle, 
        fontSize, 
        guidelineThickness, 
        guidelineOpacity, 
        guidelineColorStyle,
        customColors,
        dashedGuidelines,
        emphasizeBaseline,
        baselineThickness,
        lineHeight
      );
    }
    
    if (i === 0) {
      ctx.save();
      
      // Apply character width scaling
      if (characterWidthScale !== 1.0) {
        ctx.scale(characterWidthScale, 1);
      }
      
      ctx.font = `${fontSize}px "${selectedFont}"`;
      
      // Apply word spacing if needed
      let adjustedX = characterWidthScale !== 1.0 ? x / characterWidthScale : x;
      
      if (wordSpacing > 0) {
        // Draw text with custom word spacing
        const words = text.split(' ');
        let currentX = adjustedX;
        
        for (let w = 0; w < words.length; w++) {
          const word = words[w];
          drawTracedText(ctx, word, currentX, currentBaselineY, textOpacity, textTraceStyle, letterSpacing, showStartingDots, fontSize);
          
          const wordWidth = ctx.measureText(word).width;
          currentX += wordWidth + wordSpacing;
        }
      } else {
        // Draw text normally
        drawTracedText(ctx, text, adjustedX, currentBaselineY, textOpacity, textTraceStyle, letterSpacing, showStartingDots, fontSize);
      }
      
      ctx.restore();
    }
  }
};


/**
 * Draw a beautiful informative header for the worksheet
 */
export const drawWorksheetHeader = (
  ctx: CanvasRenderingContext2D,
  width: number,
  margin: number,
  fontName: string,
  showBranding: boolean = true
) => {
  if (!showBranding) return;

  const headerHeight = 35;
  const headerY = 10;
  
  ctx.save();
  
  // Draw subtle gradient background
  const gradient = ctx.createLinearGradient(0, 0, 0, headerHeight);
  gradient.addColorStop(0, 'rgba(99, 102, 241, 0.04)');
  gradient.addColorStop(1, 'rgba(99, 102, 241, 0.01)');
  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, width, headerHeight);
  
  // Draw elegant bottom border with gradient
  const borderGradient = ctx.createLinearGradient(0, headerHeight, width, headerHeight);
  borderGradient.addColorStop(0, 'rgba(99, 102, 241, 0.1)');
  borderGradient.addColorStop(0.5, 'rgba(99, 102, 241, 0.25)');
  borderGradient.addColorStop(1, 'rgba(99, 102, 241, 0.1)');
  ctx.strokeStyle = borderGradient;
  ctx.lineWidth = 1.5;
  ctx.beginPath();
  ctx.moveTo(0, headerHeight);
  ctx.lineTo(width, headerHeight);
  ctx.stroke();
  
  // Left side: Logo and Brand
  const leftX = margin;
  let currentX = leftX;
  
  // Draw pen icon with shadow
  ctx.shadowColor = 'rgba(99, 102, 241, 0.3)';
  ctx.shadowBlur = 3;
  ctx.shadowOffsetX = 1;
  ctx.shadowOffsetY = 1;
  ctx.font = '20px Arial, sans-serif';
  ctx.fillStyle = 'rgba(99, 102, 241, 1)';
  ctx.textAlign = 'left';
  ctx.fillText('✎', currentX, headerY + 16);
  ctx.shadowBlur = 0;
  ctx.shadowOffsetX = 0;
  ctx.shadowOffsetY = 0;
  currentX += 28;
  
  // Brand name with bold monospace
  ctx.font = 'bold 15px "Courier New", Courier, monospace';
  ctx.fillStyle = 'rgba(30, 30, 30, 0.95)';
  ctx.fillText('InkTrace', currentX, headerY + 15);
  currentX += ctx.measureText('InkTrace').width + 10;
  
  // Separator
  ctx.fillStyle = 'rgba(150, 150, 150, 0.4)';
  ctx.fillText('|', currentX, headerY + 15);
  currentX += 15;
  
  // URL with monospace
  ctx.font = '10px "Courier New", Courier, monospace';
  ctx.fillStyle = 'rgba(100, 100, 100, 0.75)';
  ctx.fillText('inktrace.wongpinter.com', currentX, headerY + 15);
  
  // Right side: Font information box
  const rightX = width - margin;
  const boxWidth = 180;
  const boxX = rightX - boxWidth;
  const boxY = headerY + 2;
  const boxHeight = 22;
  
  // Draw subtle box background
  ctx.fillStyle = 'rgba(255, 255, 255, 0.6)';
  ctx.fillRect(boxX, boxY, boxWidth, boxHeight);
  
  // Box border
  ctx.strokeStyle = 'rgba(99, 102, 241, 0.2)';
  ctx.lineWidth = 1;
  ctx.strokeRect(boxX, boxY, boxWidth, boxHeight);
  
  // Font label
  ctx.textAlign = 'left';
  ctx.font = '9px "Courier New", Courier, monospace';
  ctx.fillStyle = 'rgba(100, 100, 100, 0.8)';
  ctx.fillText('FONT:', boxX + 8, boxY + 10);
  
  // Font name - truncate if too long
  ctx.font = 'bold 11px "Courier New", Courier, monospace';
  ctx.fillStyle = 'rgba(40, 40, 40, 0.9)';
  let displayFont = fontName;
  if (ctx.measureText(displayFont).width > boxWidth - 50) {
    while (ctx.measureText(displayFont + '...').width > boxWidth - 50 && displayFont.length > 0) {
      displayFont = displayFont.slice(0, -1);
    }
    displayFont += '...';
  }
  ctx.fillText(displayFont, boxX + 8, boxY + 19);
  
  ctx.restore();
};
