import { CharacterWidth, VerticalAlignment, TextCase } from '@/types/worksheet';

/**
 * Get character width scale based on character width setting
 */
export const getCharacterWidthScale = (characterWidth: CharacterWidth): number => {
  switch (characterWidth) {
    case 'condensed':
      return 0.85;
    case 'normal':
      return 1.0;
    case 'expanded':
      return 1.15;
    default:
      return 1.0;
  }
};

/**
 * Get vertical offset based on vertical alignment setting
 */
export const getVerticalOffset = (
  verticalAlignment: VerticalAlignment,
  fontSize: number,
  lineHeight: number
): number => {
  switch (verticalAlignment) {
    case 'top':
      return fontSize * 0.2;
    case 'center':
      return 0;
    case 'baseline':
      return -fontSize * 0.1;
    default:
      return 0;
  }
};

/**
 * Transform text case based on text case setting
 */
export const transformTextCase = (text: string, textCase: TextCase): string => {
  switch (textCase) {
    case 'uppercase':
      return text.toUpperCase();
    case 'lowercase':
      return text.toLowerCase();
    case 'titlecase':
      return text.replace(/\w\S*/g, (txt) => 
        txt.charAt(0).toUpperCase() + txt.substring(1).toLowerCase()
      );
    case 'none':
    default:
      return text;
  }
};

/**
 * Apply text formatting to canvas context
 */
export const applyTextFormatting = (
  ctx: CanvasRenderingContext2D,
  characterWidth: CharacterWidth
) => {
  const scale = getCharacterWidthScale(characterWidth);
  if (scale !== 1.0) {
    ctx.save();
    ctx.scale(scale, 1);
  }
};

/**
 * Restore canvas context after text formatting
 */
export const restoreTextFormatting = (
  ctx: CanvasRenderingContext2D,
  characterWidth: CharacterWidth
) => {
  const scale = getCharacterWidthScale(characterWidth);
  if (scale !== 1.0) {
    ctx.restore();
  }
};
