import { PAPER_SIZES, PRINT_QUALITY_SETTINGS } from '@/constants/worksheet';
import { WorksheetPreferences } from '@/types/worksheet';
import { getEffectivePage, getTotalPages } from './pageSet';
import { renderWorksheetPage } from './worksheetRenderer';

type PrintCanvasContext = CanvasRenderingContext2D & {
  textRendering?: string;
  fontSmooth?: string;
};

export const generatePDF = async (preferences: WorksheetPreferences) => {
  const { paperSize, printQuality } = preferences;
  const size = PAPER_SIZES[paperSize];

  // Get print quality settings
  const qualitySettings = PRINT_QUALITY_SETTINGS[printQuality || 'high'];
  const PRINT_SCALE = qualitySettings.scale;

  const { jsPDF } = await import('jspdf');
  const pdf = new jsPDF({
    orientation: size.width > size.height ? 'landscape' : 'portrait',
    unit: 'px',
    format: [size.width, size.height]
  });

  // Determine total pages
  const totalPages = getTotalPages(preferences);

  for (let i = 0; i < totalPages; i++) {
    const canvas = document.createElement('canvas');
    // Render at higher resolution for print quality
    canvas.width = size.width * PRINT_SCALE;
    canvas.height = size.height * PRINT_SCALE;
    const ctx = canvas.getContext('2d');

    if (!ctx) continue;

    // Scale the context to render at higher resolution
    ctx.scale(PRINT_SCALE, PRINT_SCALE);

    // Enable high-quality rendering for print
    ctx.imageSmoothingEnabled = true;
    ctx.imageSmoothingQuality = 'high';
    
    const printCtx = ctx as PrintCanvasContext;

    // Optimize text rendering for print quality
    if ('textRendering' in printCtx) {
      printCtx.textRendering = 'geometricPrecision';
    }
    
    // Enable font smoothing
    if ('fontSmooth' in printCtx) {
      printCtx.fontSmooth = 'always';
    }

    // Draw page with page number
    renderWorksheetPage({
      ctx,
      paper: size,
      page: getEffectivePage(preferences, i),
      pageNumber: i + 1,
      totalPages
    });

    // Use JPEG with high quality for better file size while maintaining print quality
    // JPEG at 0.95 quality provides excellent results with much smaller file size
    const imgData = canvas.toDataURL('image/jpeg', 0.95);
    pdf.addImage(imgData, 'JPEG', 0, 0, size.width, size.height, undefined, 'FAST');

    if (i < totalPages - 1) {
      pdf.addPage();
    }
  }

  pdf.save('handwriting-worksheet.pdf');
};
