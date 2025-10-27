import React, { useState, useRef, useEffect } from 'react';
import { HelpCircle, X } from 'lucide-react';
import { createPortal } from 'react-dom';

interface InfoTooltipProps {
  title: string;
  description: string;
  changes?: string[];
}

export const InfoTooltip: React.FC<InfoTooltipProps> = ({ title, description, changes }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [position, setPosition] = useState({ top: 0, left: 0 });
  const buttonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (isOpen && buttonRef.current) {
      const rect = buttonRef.current.getBoundingClientRect();
      setPosition({
        top: rect.bottom + window.scrollY + 8,
        left: rect.left + window.scrollX
      });
    }
  }, [isOpen]);

  return (
    <>
      <button
        ref={buttonRef}
        type="button"
        onClick={(e) => {
          e.stopPropagation();
          setIsOpen(!isOpen);
        }}
        className="ml-2 text-gray-400 hover:text-indigo-600 transition-colors"
        aria-label="More information"
      >
        <HelpCircle className="w-4 h-4" />
      </button>

      {isOpen && createPortal(
        <>
          {/* Backdrop */}
          <div 
            className="fixed inset-0 z-[9998]" 
            onClick={() => setIsOpen(false)}
          />
          
          {/* Popover */}
          <div 
            className="fixed z-[9999] w-80 p-4 bg-white rounded-lg shadow-xl border border-gray-200"
            style={{
              top: `${position.top}px`,
              left: `${position.left}px`,
              maxHeight: 'calc(100vh - 100px)',
              overflowY: 'auto'
            }}
          >
            <div className="flex items-start justify-between mb-2">
              <h4 className="text-sm font-semibold text-gray-900">{title}</h4>
              <button
                onClick={() => setIsOpen(false)}
                className="text-gray-400 hover:text-gray-600 flex-shrink-0"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
            
            <p className="text-xs text-gray-600 leading-relaxed mb-3">
              {description}
            </p>

            {changes && changes.length > 0 && (
              <div className="pt-3 border-t border-gray-100">
                <p className="text-xs font-semibold text-gray-700 mb-2">
                  Settings in this category:
                </p>
                <ul className="space-y-1">
                  {changes.map((change, index) => (
                    <li key={index} className="text-xs text-gray-600 flex items-start">
                      <span className="text-indigo-500 mr-1.5">•</span>
                      <span>{change}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </>,
        document.body
      )}
    </>
  );
};
