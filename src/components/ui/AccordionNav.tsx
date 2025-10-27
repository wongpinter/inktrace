import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';

interface AccordionSection {
  id: string;
  title: string;
  icon: React.ReactNode;
  content: React.ReactNode;
}

interface AccordionNavProps {
  sections: AccordionSection[];
  defaultOpen?: string;
}

export const AccordionNav: React.FC<AccordionNavProps> = ({ sections, defaultOpen }) => {
  const [openSection, setOpenSection] = useState<string>(defaultOpen || sections[0]?.id || '');

  const toggleSection = (id: string) => {
    setOpenSection(openSection === id ? '' : id);
  };

  return (
    <div className="space-y-2">
      {sections.map((section) => {
        const isOpen = openSection === section.id;
        
        return (
          <div key={section.id} className="border border-gray-200 rounded-lg overflow-hidden bg-white">
            <button
              onClick={() => toggleSection(section.id)}
              className="w-full flex items-center justify-between px-4 py-3 hover:bg-gray-50 transition-colors"
            >
              <div className="flex items-center gap-3">
                <span className="text-indigo-600">{section.icon}</span>
                <span className="font-medium text-gray-900">{section.title}</span>
              </div>
              <ChevronDown 
                className={`w-5 h-5 text-gray-500 transition-transform ${isOpen ? 'rotate-180' : ''}`}
              />
            </button>
            
            {isOpen && (
              <div className="px-4 py-4 border-t border-gray-100 bg-gray-50">
                {section.content}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
};
