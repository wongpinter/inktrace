import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';

interface CollapsibleSectionProps {
  title: string;
  icon: React.ReactNode;
  gradient: string;
  iconColor: string;
  children: React.ReactNode;
  defaultOpen?: boolean;
}

export const CollapsibleSection: React.FC<CollapsibleSectionProps> = ({
  title,
  icon,
  gradient,
  iconColor,
  children,
  defaultOpen = true
}) => {
  const [isOpen, setIsOpen] = useState(defaultOpen);

  return (
    <div className="bg-white rounded-xl border border-gray-200 shadow-soft overflow-hidden hover-lift transition-smooth">
      {/* Section Header - Clickable */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`w-full flex items-center justify-between px-4 py-3 ${gradient} border-b border-gray-200 transition-smooth hover:opacity-90`}
      >
        <div className="flex items-center gap-2.5">
          <div className={`p-1.5 bg-white rounded-lg shadow-sm transition-bounce ${isOpen ? 'rotate-0' : '-rotate-12'}`}>
            <div className={iconColor}>
              {icon}
            </div>
          </div>
          <h2 className="text-sm font-bold text-gray-900 uppercase tracking-wide">
            {title}
          </h2>
        </div>
        <ChevronDown 
          className={`w-5 h-5 text-gray-600 transition-transform duration-300 ${isOpen ? 'rotate-180' : 'rotate-0'}`}
        />
      </button>

      {/* Section Content - Collapsible */}
      <div
        className={`transition-all duration-300 ease-in-out ${
          isOpen ? 'max-h-[2000px] opacity-100' : 'max-h-0 opacity-0 overflow-hidden'
        }`}
      >
        <div className="p-5 space-y-4">
          {children}
        </div>
      </div>
    </div>
  );
};
