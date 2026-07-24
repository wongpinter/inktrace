import React from 'react';
import { WorksheetPreferences } from '@/types/worksheet';
import { Hand, Pencil, PenTool } from 'lucide-react';

interface GuidedRecipesProps {
  onSelectPreset: (preferences: Partial<WorksheetPreferences>) => void;
}

interface Recipe {
  key: string;
  title: string;
  description: string;
  preset: Partial<WorksheetPreferences>;
  icon: React.ReactNode;
  accent: string;
}

const recipes: Recipe[] = [
  {
    key: 'tracing',
    title: 'Tracing practice',
    description: 'For ages 4-6. Big letters, dotted trace, generous spacing.',
    preset: {
      worksheetType: 'letters',
      text: 'Aa Bb Cc Dd Ee Ff Gg Hh',
      specificLetters: 'Aa Bb Cc Dd Ee Ff Gg Hh',
      fontSize: 60,
      lineSpacingPreset: 'kindergarten',
      lineCount: 2,
      guidelineStyle: 'dotted',
      textOpacity: 0.5,
      textTraceStyle: 'dotted',
      letterSpacing: 2,
      showStartingDots: true
    },
    icon: <Hand className="w-6 h-6 text-yellow-500" />,
    accent: 'border-yellow-200 bg-yellow-50 hover:border-yellow-400'
  },
  {
    key: 'letters',
    title: 'Letter formation',
    description: 'For grades 1-3. Educational guidelines and 12.7mm spacing.',
    preset: {
      worksheetType: 'letters',
      text: 'Aa Bb Cc Dd Ee Ff Gg Hh',
      specificLetters: 'Aa Bb Cc Dd Ee Ff Gg Hh',
      fontSize: 48,
      lineSpacingPreset: 'grade1-3',
      lineCount: 3,
      guidelineStyle: 'elementary',
      textOpacity: 0.3,
      textTraceStyle: 'dotted',
      letterSpacing: 0
    },
    icon: <Pencil className="w-6 h-6 text-orange-500" />,
    accent: 'border-orange-200 bg-orange-50 hover:border-orange-400'
  },
  {
    key: 'cursive',
    title: 'Cursive fluency',
    description: 'For grades 4+. Cursive font, wide-ruled, 8.7mm spacing.',
    preset: {
      worksheetType: 'text',
      text: 'The quick brown fox jumps over the lazy dog',
      fontSize: 36,
      lineSpacingPreset: 'grade4-6',
      lineCount: 3,
      guidelineStyle: 'elementary',
      textOpacity: 0.25,
      textTraceStyle: 'dotted',
      letterSpacing: 0,
      selectedFont: 'Dancing Script'
    },
    icon: <PenTool className="w-6 h-6 text-amber-500" />,
    accent: 'border-amber-200 bg-amber-50 hover:border-amber-400'
  }
];

export const GuidedRecipes: React.FC<GuidedRecipesProps> = ({ onSelectPreset }) => {
  return (
    <div className="space-y-3">
      <p className="text-xs text-gray-500">
        New here? Pick what kind of worksheet you want and we will set everything up.
      </p>
      <div className="space-y-2">
        {recipes.map(recipe => (
          <button
            key={recipe.key}
            onClick={() => onSelectPreset(recipe.preset)}
            className={`w-full text-left p-3 border rounded-lg transition-colors group ${recipe.accent}`}
          >
            <div className="flex items-start gap-3">
              <div className="mt-0.5 group-hover:scale-110 transition-transform">
                {recipe.icon}
              </div>
              <div className="min-w-0">
                <div className="text-sm font-semibold text-gray-900">
                  {recipe.title}
                </div>
                <div className="text-xs text-gray-600 mt-0.5 leading-snug">
                  {recipe.description}
                </div>
              </div>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
};
