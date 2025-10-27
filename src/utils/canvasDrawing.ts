import { GUIDELINE_STYLES, BASELINE_RATIO, TOP_LINE_RATIO, LINE_HEIGHT_MULTIPLIER } from '@/constants/worksheet';
import { GuidelineStyle } from '@/types/worksheet';

export const drawGuidelines = (
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  width: number,
  style: GuidelineStyle,
  fontSize: number,
  guidelineThickness: number,
  guidelineOpacity: number
) => {
  const { lines, dottedMiddle } = GUIDELINE_STYLES[style];
  
  const topLineY = y;
  const bottomLineY = y + fontSize;
  const totalHeight = bottomLineY - topLineY;
  
  ctx.lineWidth = guidelineThickness;

  for (let i = 0; i < lines; i++) {
    let currentY;
    
    if (lines === 2) {
      currentY = i === 0 ? topLineY : bottomLineY;
    } else if (lines === 3) {
      if (i === 0) currentY = topLineY;
      else if (i === 1) currentY = topLineY + (totalHeight * BASELINE_RATIO);
      else currentY = bottomLineY;
    } else if (lines === 4) {
      if (i === 0) currentY = topLineY;
      else if (i === 1) currentY = topLineY + (totalHeight * TOP_LINE_RATIO);
      else if (i === 2) currentY = topLineY + (totalHeight * BASELINE_RATIO);
      else currentY = bottomLineY;
    }
    
    if (i === 0 || (i === lines - 1 && lines > 1)) {
      ctx.strokeStyle = `rgba(153, 153, 153, ${guidelineOpacity})`;
      ctx.setLineDash([]);
    } else if (dottedMiddle && (i === 1 && lines === 3) || (i === 1 && lines === 4)) {
      ctx.strokeStyle = `rgba(204, 204, 204, ${guidelineOpacity})`;
      ctx.setLineDash([3, 3]);
    } else {
      ctx.strokeStyle = `rgba(204, 204, 204, ${guidelineOpacity})`;
      ctx.setLineDash([]);
    }
    
    ctx.beginPath();
    ctx.moveTo(x, currentY!);
    ctx.lineTo(x + width, currentY!);
    ctx.stroke();
  }
  
  ctx.setLineDash([]);
};

export const drawDottedText = (
  ctx: CanvasRenderingContext2D,
  text: string,
  x: number,
  y: number,
  textOpacity: number
) => {
  ctx.save();
  ctx.strokeStyle = `rgba(0, 0, 0, ${textOpacity * 0.8})`;
  ctx.fillStyle = `rgba(0, 0, 0, ${textOpacity * 0.3})`;
  ctx.lineWidth = 1;
  ctx.setLineDash([2, 3]);
  
  ctx.strokeText(text, x, y);
  ctx.fillText(text, x, y);
  
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
  dottedFont: boolean,
  textOpacity: number,
  showGuides: boolean,
  guidelineStyle: GuidelineStyle,
  guidelineThickness: number,
  guidelineOpacity: number,
  contentWidth: number
) => {
  const guidelineTopY = y - fontSize * TOP_LINE_RATIO;
  const baselineY = guidelineTopY + (fontSize * BASELINE_RATIO);
  
  for (let i = 0; i < lineCount; i++) {
    const currentTopY = guidelineTopY + (i * lineHeight);
    const currentBaselineY = baselineY + (i * lineHeight);
    
    if (showGuides) {
      drawGuidelines(ctx, x, currentTopY, contentWidth, guidelineStyle, fontSize, guidelineThickness, guidelineOpacity);
    }
    
    if (i === 0) {
      ctx.font = `${fontSize}px "${selectedFont}"`;
      if (dottedFont) {
        drawDottedText(ctx, text, x, currentBaselineY, textOpacity);
      } else {
        ctx.fillStyle = `rgba(0, 0, 0, ${textOpacity})`;
        ctx.fillText(text, x, currentBaselineY);
      }
    }
  }
};
