import { GUIDELINE_STYLES, BASELINE_RATIO, TOP_LINE_RATIO, LINE_HEIGHT_MULTIPLIER, GUIDELINE_COLOR_STYLES, TEXT_TRACE_STYLES } from '@/constants/worksheet';
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
  colorStyle: GuidelineColorStyle = 'default'
) => {
  const { lines, dottedMiddle } = GUIDELINE_STYLES[style];
  const colors = GUIDELINE_COLOR_STYLES[colorStyle].colors;
  
  const topLineY = y;
  const bottomLineY = y + fontSize;
  const totalHeight = bottomLineY - topLineY;
  
  ctx.lineWidth = guidelineThickness;

  for (let i = 0; i < lines; i++) {
    let currentY;
    let lineColor;
    
    if (lines === 2) {
      currentY = i === 0 ? topLineY : bottomLineY;
      lineColor = i === 0 ? colors.top : colors.bottom;
    } else if (lines === 3) {
      if (i === 0) {
        currentY = topLineY;
        lineColor = colors.top;
      } else if (i === 1) {
        currentY = topLineY + (totalHeight * BASELINE_RATIO);
        lineColor = colors.baseline;
      } else {
        currentY = bottomLineY;
        lineColor = colors.bottom;
      }
    } else if (lines === 4) {
      if (i === 0) {
        currentY = topLineY;
        lineColor = colors.top;
      } else if (i === 1) {
        currentY = topLineY + (totalHeight * TOP_LINE_RATIO);
        lineColor = colors.middle;
      } else if (i === 2) {
        currentY = topLineY + (totalHeight * BASELINE_RATIO);
        lineColor = colors.baseline;
      } else {
        currentY = bottomLineY;
        lineColor = colors.bottom;
      }
    }
    
    // Apply opacity to the color
    const colorWithOpacity = lineColor!.replace(/[\d.]+\)$/, `${guidelineOpacity})`);
    ctx.strokeStyle = colorWithOpacity;
    
    if (dottedMiddle && ((i === 1 && lines === 3) || (i === 1 && lines === 4))) {
      ctx.setLineDash([3, 3]);
    } else {
      ctx.setLineDash([]);
    }
    
    ctx.beginPath();
    ctx.moveTo(x, currentY!);
    ctx.lineTo(x + width, currentY!);
    ctx.stroke();
  }
  
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
  showStartingDots: boolean
) => {
  const guidelineTopY = y - fontSize * TOP_LINE_RATIO;
  const baselineY = guidelineTopY + (fontSize * BASELINE_RATIO);
  
  for (let i = 0; i < lineCount; i++) {
    const currentTopY = guidelineTopY + (i * lineHeight);
    const currentBaselineY = baselineY + (i * lineHeight);
    
    if (showGuides) {
      drawGuidelines(ctx, x, currentTopY, contentWidth, guidelineStyle, fontSize, guidelineThickness, guidelineOpacity, guidelineColorStyle);
    }
    
    if (i === 0) {
      ctx.font = `${fontSize}px "${selectedFont}"`;
      
      // Use the text trace style
      drawTracedText(ctx, text, x, currentBaselineY, textOpacity, textTraceStyle, letterSpacing, showStartingDots, fontSize);
    }
  }
};
