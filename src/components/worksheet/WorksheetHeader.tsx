import React from 'react';
import { Type, Save, Upload, RotateCcw, Download } from 'lucide-react';

interface WorksheetHeaderProps {
  onSave: () => void;
  onLoad: () => void;
  onReset: () => void;
  onDownload: () => void;
  pageCount: number;
  isDownloadDisabled: boolean;
}

export const WorksheetHeader: React.FC<WorksheetHeaderProps> = ({ 
  onSave, 
  onLoad, 
  onReset, 
  onDownload, 
  pageCount,
  isDownloadDisabled 
}) => {
  return (
    <div className="flex items-center justify-between mb-6 flex-wrap gap-4">
      <div className="flex items-center gap-3">
        <Type className="w-8 h-8 text-indigo-600" />
        <h1 className="text-3xl font-bold text-gray-800">Handwriting Worksheet Generator</h1>
      </div>
      <div className="flex items-center gap-2 flex-wrap">
        <button
          onClick={onDownload}
          disabled={isDownloadDisabled}
          className="flex items-center gap-2 px-5 py-2.5 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition text-sm font-bold shadow-md"
          title="Download worksheet as PDF"
        >
          <Download className="w-5 h-5" />
          Download {pageCount} Page{pageCount > 1 ? 's' : ''} PDF
        </button>
        <div className="w-px h-8 bg-gray-300"></div>
        <button
          onClick={onSave}
          className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition text-sm font-medium"
          title="Save current settings"
        >
          <Save className="w-4 h-4" />
          Save
        </button>
        <button
          onClick={onLoad}
          className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition text-sm font-medium"
          title="Load saved settings"
        >
          <Upload className="w-4 h-4" />
          Load
        </button>
        <button
          onClick={onReset}
          className="flex items-center gap-2 px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition text-sm font-medium"
          title="Reset to defaults"
        >
          <RotateCcw className="w-4 h-4" />
          Reset
        </button>
      </div>
    </div>
  );
};
