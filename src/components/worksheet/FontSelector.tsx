import React from 'react';
import { Search } from 'lucide-react';
import { CATEGORY_LABELS } from '@/constants/worksheet';
import { FontCategory } from '@/types/worksheet';

interface FontSelectorProps {
  selectedFont: string;
  fontCategory: FontCategory;
  searchQuery: string;
  filteredFonts: string[];
  onFontChange: (font: string) => void;
  onCategoryChange: (category: FontCategory) => void;
  onSearchChange: (query: string) => void;
  onFontHover: (font: string) => void;
}

export const FontSelector: React.FC<FontSelectorProps> = ({
  selectedFont,
  fontCategory,
  searchQuery,
  filteredFonts,
  onFontChange,
  onCategoryChange,
  onSearchChange,
  onFontHover
}) => {
  return (
    <div>
      <label className="block text-sm font-semibold text-gray-700 mb-2">
        Font Category
      </label>
      <div className="flex flex-wrap gap-1.5 mb-2">
        {Object.keys(CATEGORY_LABELS).map(category => (
          <button
            key={category}
            onClick={() => {
              onCategoryChange(category as FontCategory);
              onSearchChange('');
            }}
            className={`px-2 py-1 rounded text-xs font-medium transition ${
              fontCategory === category
                ? 'bg-indigo-600 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            {CATEGORY_LABELS[category as FontCategory]}
          </button>
        ))}
      </div>

      <div className="relative mb-2">
        <Search className="absolute left-2.5 top-2.5 w-4 h-4 text-gray-400" />
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          placeholder="Search fonts..."
          className="w-full pl-8 pr-3 py-2 border-2 border-gray-300 rounded-lg focus:border-indigo-500 focus:outline-none text-sm"
        />
      </div>

      <select
        value={selectedFont}
        onChange={(e) => onFontChange(e.target.value)}
        className="w-full px-3 py-2 border-2 border-gray-300 rounded-lg focus:border-indigo-500 focus:outline-none text-sm"
        size={4}
      >
        {filteredFonts.map(font => (
          <option 
            key={font} 
            value={font} 
            style={{ fontFamily: font, fontSize: '16px', padding: '4px' }}
            onMouseEnter={() => onFontHover(font)}
          >
            {font}
          </option>
        ))}
      </select>
    </div>
  );
};
