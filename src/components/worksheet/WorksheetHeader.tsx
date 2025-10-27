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
    <div className="flex items-center justify-between p-6 flex-wrap gap-4 bg-gradient-to-r from-white to-gray-50">
      <div className="flex items-center gap-3">
        <div className="p-2 bg-indigo-100 rounded-xl">
          <Type className="w-7 h-7 text-indigo-600" />
        </div>
        <h1 className="text-2xl md:text-3xl font-bold text-gray-900 tracking-tight">
          Handwriting Worksheet Generator
        </h1>
      </div>
      <div className="flex items-center gap-2 flex-wrap">
        <button
          onClick={onDownload}
          disabled={isDownloadDisabled}
          className="flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-indigo-600 to-indigo-700 text-white rounded-xl hover:from-indigo-700 hover:to-indigo-800 disabled:from-gray-300 disabled:to-gray-400 disabled:cursor-not-allowed transition-smooth text-sm font-semibold shadow-soft hover:shadow-md"
          title="Download worksheet as PDF"
        >
          <Download className="w-4 h-4" />
          Download {pageCount} Page{pageCount > 1 ? 's' : ''} PDF
        </button>
        <div className="w-px h-8 bg-gray-200"></div>
        <button
          onClick={onSave}
          className="flex items-center gap-2 px-4 py-2 bg-emerald-600 text-white rounded-xl hover:bg-emerald-700 transition-smooth text-sm font-medium shadow-soft hover:shadow-md"
          title="Save current settings"
        >
          <Save className="w-4 h-4" />
          Save
        </button>
        <button
          onClick={onLoad}
          className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-smooth text-sm font-medium shadow-soft hover:shadow-md"
          title="Load saved settings"
        >
          <Upload className="w-4 h-4" />
          Load
        </button>
        <button
          onClick={onReset}
          className="flex items-center gap-2 px-4 py-2 bg-gray-600 text-white rounded-xl hover:bg-gray-700 transition-smooth text-sm font-medium shadow-soft hover:shadow-md"
          title="Reset to defaults"
        >
          <RotateCcw className="w-4 h-4" />
          Reset
        </button>
      </div>
    </div>
  );
};
