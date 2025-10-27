import React from 'react';
import { WorksheetPreferences } from '@/types/worksheet';
import { WORKSHEET_PRESETS } from '@/constants/worksheet';
import { Palette, Pencil, BookOpen, GraduationCap, PenTool, Hand, FileText, Rainbow } from 'lucide-react';

interface PresetSelectorProps {
  onSelectPreset: (preferences: Partial<WorksheetPreferences>) => void;
}

// Icon mapping for presets
const presetIcons: Record<string, React.ReactNode> = {
  kindergarten: <Palette className="w-8 h-8 text-pink-500" />,
  earlyElementary: <Pencil className="w-8 h-8 text-orange-500" />,
  upperElementary: <BookOpen className="w-8 h-8 text-purple-500" />,
  middleSchool: <GraduationCap className="w-8 h-8 text-blue-500" />,
  cursivePractice: <PenTool className="w-8 h-8 text-amber-500" />,
  tracingWorksheet: <Hand className="w-8 h-8 text-yellow-500" />,
  emptyPractice: <FileText className="w-8 h-8 text-gray-500" />,
  colorfulKids: <Rainbow className="w-8 h-8 text-indigo-500" />
};

export const PresetSelector: React.FC<PresetSelectorProps> = ({ onSelectPreset }) => {
  return (
    <div className="space-y-3">
      <p className="text-xs text-gray-500">
        Quick start templates for common use cases
      </p>

      <div className="grid grid-cols-2 gap-2">
        {Object.entries(WORKSHEET_PRESETS).map(([key, preset]) => (
          <button
            key={key}
            onClick={() => onSelectPreset(preset.preferences)}
            className="flex flex-col items-center p-3 text-center border border-gray-200 rounded-lg hover:border-indigo-400 hover:bg-indigo-50 transition-all group"
            title={preset.description}
          >
            <div className="mb-2 group-hover:scale-110 transition-transform">
              {presetIcons[key]}
            </div>
            <span className="text-xs font-medium text-gray-700 group-hover:text-indigo-700">
              {preset.name}
            </span>
          </button>
        ))}
      </div>

      <p className="text-xs text-gray-500 italic">
        💡 Hover to see description, click to apply
      </p>
    </div>
  );
};
