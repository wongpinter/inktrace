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
    <div className="space-y-5">
      <div className="flex items-center gap-2.5">
        <div className="p-1.5 bg-indigo-100 rounded-lg">
          <svg className="w-4 h-4 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
          </svg>
        </div>
        <h2 className="text-base font-bold text-gray-900">Preview</h2>
      </div>
      
      {!emptyPaper && (
        <div className="mb-4 p-4 bg-gradient-to-r from-gray-50 to-slate-50 rounded-xl border border-gray-100">
          <p className="text-xs font-medium text-gray-600 mb-2">Selected Font:</p>
          <p 
            className="text-2xl truncate"
            style={{ fontFamily: selectedFont }}
          >
            {previewText}
          </p>
        </div>
      )}
      
      <div className="border border-gray-200 rounded-xl overflow-hidden bg-white shadow-soft">
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
      
      <div className="p-4 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl border border-blue-100">
        <p className="text-xs text-gray-700 leading-relaxed">
          <strong className="text-indigo-700 font-semibold">💡 Tips:</strong><br/>
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
