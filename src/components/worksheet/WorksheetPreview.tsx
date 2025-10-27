import React, { useRef, useEffect } from 'react';
import { WorksheetPreferences } from '@/types/worksheet';
import { PAPER_SIZES } from '@/constants/worksheet';
import { drawPage } from '@/utils/pdfGenerator';
import { getWorksheetContent } from '@/utils/worksheetContent';

interface WorksheetPreviewProps {
  preferences: WorksheetPreferences;
  fontsLoaded: Set<string>;
}

export const WorksheetPreview: React.FC<WorksheetPreviewProps> = ({ preferences, fontsLoaded }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const {
    selectedFont,
    text,
    emptyPaper,
    worksheetType,
    specificLetters,
    alphabetCase,
    paperSize
  } = preferences;

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    const width = 700;
    const aspect = PAPER_SIZES[paperSize].height / PAPER_SIZES[paperSize].width;
    const height = width * aspect;
    
    canvas.width = width;
    canvas.height = height;

    ctx.save();
    const scale = width / PAPER_SIZES[paperSize].width;
    ctx.scale(scale, scale);
    
    drawPage(ctx, PAPER_SIZES[paperSize].width, PAPER_SIZES[paperSize].height, preferences);
    
    ctx.restore();
  }, [preferences, fontsLoaded, paperSize]);

  const getPreviewText = () => {
    if (emptyPaper) return '';
    
    switch (worksheetType) {
      case 'text':
        return text || selectedFont;
      case 'letters':
        return specificLetters;
      case 'alphabet':
        return 'ABC abc';
      case 'numbers':
        return '123 !@#';
      default:
        return text;
    }
  };

  const previewText = getPreviewText();

  return (
    <div className="space-y-4">
      <label className="block text-lg font-semibold text-indigo-600">
        Preview
      </label>
      
      {!emptyPaper && (
        <div className="mb-3 p-3 bg-gray-50 rounded-lg">
          <p className="text-xs font-semibold text-gray-700 mb-1">Selected Font:</p>
          <p 
            className="text-2xl truncate"
            style={{ fontFamily: selectedFont }}
          >
            {previewText}
          </p>
        </div>
      )}
      
      <div className="border-2 border-gray-300 rounded-lg overflow-hidden bg-white shadow-inner">
        <canvas
          ref={canvasRef}
          className="w-full h-auto"
        />
        {!text && !emptyPaper && worksheetType === 'text' && (
          <div className="flex items-center justify-center h-64 text-gray-400 text-sm p-4 text-center">
            {worksheetType === 'text' ? 'Enter text (or select empty paper mode) to see a preview' : 'Select worksheet options to see a preview'}
          </div>
        )}
      </div>
      
      <div className="p-3 bg-blue-50 rounded-lg">
        <p className="text-xs text-gray-600">
          <strong>Tips:</strong><br/>
          • The first line is for tracing; {preferences.lineCount - 1} blank {preferences.lineCount - 1 > 1 ? 'lines' : 'line'} follow{preferences.lineCount - 1 > 1 ? '' : 's'}.<br/>
          • Use 'Dotted Font' for a classic tracing look.<br/>
          • Try rainbow guidelines for colorful practice!<br/>
          • Letter spacing helps with fine motor skills.<br/>
          • All pages will be combined into a single PDF.
        </p>
      </div>
    </div>
  );
};
