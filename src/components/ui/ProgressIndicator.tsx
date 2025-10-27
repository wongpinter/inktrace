import React from 'react';
import { Loader2 } from 'lucide-react';

interface ProgressIndicatorProps {
  isGenerating: boolean;
  currentPage?: number;
  totalPages?: number;
}

export const ProgressIndicator: React.FC<ProgressIndicatorProps> = ({
  isGenerating,
  currentPage = 0,
  totalPages = 0
}) => {
  if (!isGenerating) return null;

  const progress = totalPages > 0 ? (currentPage / totalPages) * 100 : 0;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 animate-in fade-in duration-200">
      <div className="bg-white rounded-2xl shadow-2xl p-8 max-w-md w-full mx-4 animate-in zoom-in-95 duration-300">
        <div className="flex flex-col items-center gap-4">
          {/* Spinning loader */}
          <div className="relative">
            <Loader2 className="w-16 h-16 text-indigo-600 animate-spin" />
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-12 h-12 bg-indigo-100 rounded-full animate-pulse" />
            </div>
          </div>

          {/* Title */}
          <h3 className="text-xl font-bold text-gray-900">
            Generating PDF
          </h3>

          {/* Progress bar */}
          {totalPages > 0 && (
            <div className="w-full space-y-2">
              <div className="flex justify-between text-sm text-gray-600">
                <span>Page {currentPage} of {totalPages}</span>
                <span>{Math.round(progress)}%</span>
              </div>
              <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full transition-all duration-300 ease-out"
                  style={{ width: `${progress}%` }}
                />
              </div>
            </div>
          )}

          {/* Message */}
          <p className="text-sm text-gray-500 text-center">
            Please wait while we create your worksheet...
          </p>
        </div>
      </div>
    </div>
  );
};
