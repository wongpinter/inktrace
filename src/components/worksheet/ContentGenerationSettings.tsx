import React, { useState, useRef } from 'react';
import { WorksheetPreferences, SightWordList, WordPattern, DifficultyLevel } from '@/types/worksheet';
import { DOLCH_SIGHT_WORDS, FRY_SIGHT_WORDS, WORD_PATTERNS, SENTENCE_TEMPLATES, TEMPLATE_WORDS, COMMON_NAMES, DIFFICULTY_LEVELS } from '@/constants/contentGeneration';
import { exportWordList, importWordList } from '@/utils/contentGeneration';
import { Sparkles, List, FileText, User, Shuffle, Download, Upload } from 'lucide-react';

interface ContentGenerationSettingsProps {
  preferences: WorksheetPreferences;
  updatePreference: <K extends keyof WorksheetPreferences>(key: K, value: WorksheetPreferences[K]) => void;
}

export const ContentGenerationSettings: React.FC<ContentGenerationSettingsProps> = ({ 
  preferences, 
  updatePreference 
}) => {
  const [activeTab, setActiveTab] = useState<'sightwords' | 'patterns' | 'sentences' | 'names' | 'custom' | 'random'>('sightwords');
  const [customWordInput, setCustomWordInput] = useState('');
  const fileInputRef = useRef<HTMLInputElement>(null);

  const updateContentGeneration = (updates: Partial<typeof preferences.contentGeneration>) => {
    updatePreference('contentGeneration', {
      ...preferences.contentGeneration,
      ...updates
    });
  };

  const generateFromSightWords = (list: SightWordList) => {
    let words: string[] = [];
    
    if (list.startsWith('dolch-')) {
      const level = list.replace('dolch-', '') as keyof typeof DOLCH_SIGHT_WORDS;
      words = DOLCH_SIGHT_WORDS[level] || [];
    } else if (list.startsWith('fry-')) {
      const level = list.replace('fry-', '') as keyof typeof FRY_SIGHT_WORDS;
      words = FRY_SIGHT_WORDS[level] || [];
    }
    
    updatePreference('text', words.join(' '));
    updateContentGeneration({ sightWordList: list });
  };

  const generateFromPattern = (pattern: WordPattern) => {
    const words = WORD_PATTERNS[pattern]?.examples || [];
    updatePreference('text', words.join(' '));
    updateContentGeneration({ wordPattern: pattern });
  };

  const generateFromTemplate = (template: string) => {
    const sentences: string[] = [];
    for (let i = 0; i < 5; i++) {
      let sentence = template;
      sentence = sentence.replace('{adjective}', TEMPLATE_WORDS.adjective[Math.floor(Math.random() * TEMPLATE_WORDS.adjective.length)]);
      sentence = sentence.replace('{noun}', TEMPLATE_WORDS.noun[Math.floor(Math.random() * TEMPLATE_WORDS.noun.length)]);
      sentence = sentence.replace('{verb}', TEMPLATE_WORDS.verb[Math.floor(Math.random() * TEMPLATE_WORDS.verb.length)]);
      sentence = sentence.replace('{adverb}', TEMPLATE_WORDS.adverb[Math.floor(Math.random() * TEMPLATE_WORDS.adverb.length)]);
      sentence = sentence.replace('{place}', TEMPLATE_WORDS.place[Math.floor(Math.random() * TEMPLATE_WORDS.place.length)]);
      sentence = sentence.replace('{name}', TEMPLATE_WORDS.name[Math.floor(Math.random() * TEMPLATE_WORDS.name.length)]);
      sentences.push(sentence);
    }
    updatePreference('text', sentences.join(' '));
    updateContentGeneration({ useSentenceTemplate: true, sentenceTemplate: template });
  };

  const generateNamePractice = (name: string) => {
    if (!name.trim()) return;
    const repeated = Array(10).fill(name.trim()).join(' ');
    updatePreference('text', repeated);
    updateContentGeneration({ useNamePractice: true, practiceName: name.trim() });
  };

  const addCustomWords = () => {
    if (!customWordInput.trim()) return;
    const words = customWordInput.split(/[\s,]+/).filter(w => w.length > 0);
    const newList = [...preferences.contentGeneration.customWordList, ...words];
    updateContentGeneration({ customWordList: newList });
    updatePreference('text', newList.join(' '));
    setCustomWordInput('');
  };

  const removeCustomWord = (index: number) => {
    const newList = preferences.contentGeneration.customWordList.filter((_, i) => i !== index);
    updateContentGeneration({ customWordList: newList });
    if (newList.length > 0) {
      updatePreference('text', newList.join(' '));
    }
  };

  const generateRandomWords = (difficulty: DifficultyLevel, count: number) => {
    const config = DIFFICULTY_LEVELS[difficulty];
    const allWords: string[] = [];
    
    config.patterns.forEach(pattern => {
      const patternWords = WORD_PATTERNS[pattern as WordPattern]?.examples || [];
      allWords.push(...patternWords);
    });
    
    const shuffled = allWords.sort(() => Math.random() - 0.5);
    const selected = shuffled.slice(0, count);
    
    updatePreference('text', selected.join(' '));
    updateContentGeneration({ randomWordDifficulty: difficulty, randomWordCount: count });
  };

  const handleExportWords = () => {
    if (preferences.contentGeneration.customWordList.length > 0) {
      exportWordList(preferences.contentGeneration.customWordList);
    }
  };

  const handleImportWords = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    try {
      const words = await importWordList(file);
      const newList = [...preferences.contentGeneration.customWordList, ...words];
      updateContentGeneration({ customWordList: newList });
      updatePreference('text', newList.join(' '));
    } catch (error) {
      console.error('Failed to import word list:', error);
    }

    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const clearCustomWords = () => {
    updateContentGeneration({ customWordList: [] });
    updatePreference('text', '');
  };

  return (
    <div className="space-y-4">
      <div className="flex gap-2 flex-wrap">
        <button
          onClick={() => setActiveTab('sightwords')}
          className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors ${
            activeTab === 'sightwords' 
              ? 'bg-indigo-100 text-indigo-700' 
              : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
          }`}
        >
          <List className="w-3 h-3 inline mr-1" />
          Sight Words
        </button>
        <button
          onClick={() => setActiveTab('patterns')}
          className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors ${
            activeTab === 'patterns' 
              ? 'bg-indigo-100 text-indigo-700' 
              : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
          }`}
        >
          <Sparkles className="w-3 h-3 inline mr-1" />
          Patterns
        </button>
        <button
          onClick={() => setActiveTab('sentences')}
          className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors ${
            activeTab === 'sentences' 
              ? 'bg-indigo-100 text-indigo-700' 
              : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
          }`}
        >
          <FileText className="w-3 h-3 inline mr-1" />
          Sentences
        </button>
        <button
          onClick={() => setActiveTab('names')}
          className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors ${
            activeTab === 'names' 
              ? 'bg-indigo-100 text-indigo-700' 
              : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
          }`}
        >
          <User className="w-3 h-3 inline mr-1" />
          Names
        </button>
        <button
          onClick={() => setActiveTab('custom')}
          className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors ${
            activeTab === 'custom' 
              ? 'bg-indigo-100 text-indigo-700' 
              : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
          }`}
        >
          Custom
        </button>
        <button
          onClick={() => setActiveTab('random')}
          className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors ${
            activeTab === 'random' 
              ? 'bg-indigo-100 text-indigo-700' 
              : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
          }`}
        >
          <Shuffle className="w-3 h-3 inline mr-1" />
          Random
        </button>
      </div>

      <div className="mt-4">
        {activeTab === 'sightwords' && (
          <div className="space-y-3">
            <h3 className="text-sm font-semibold text-gray-700">Dolch Sight Words</h3>
            <div className="grid grid-cols-2 gap-2">
              <button
                onClick={() => generateFromSightWords('dolch-preprimer')}
                className="px-3 py-2 text-xs bg-white border-2 border-gray-200 rounded-lg hover:border-indigo-400 hover:bg-indigo-50 transition-colors text-left"
              >
                <div className="font-medium">Pre-Primer</div>
                <div className="text-gray-500">40 words</div>
              </button>
              <button
                onClick={() => generateFromSightWords('dolch-primer')}
                className="px-3 py-2 text-xs bg-white border-2 border-gray-200 rounded-lg hover:border-indigo-400 hover:bg-indigo-50 transition-colors text-left"
              >
                <div className="font-medium">Primer</div>
                <div className="text-gray-500">52 words</div>
              </button>
              <button
                onClick={() => generateFromSightWords('dolch-first')}
                className="px-3 py-2 text-xs bg-white border-2 border-gray-200 rounded-lg hover:border-indigo-400 hover:bg-indigo-50 transition-colors text-left"
              >
                <div className="font-medium">First Grade</div>
                <div className="text-gray-500">41 words</div>
              </button>
              <button
                onClick={() => generateFromSightWords('dolch-second')}
                className="px-3 py-2 text-xs bg-white border-2 border-gray-200 rounded-lg hover:border-indigo-400 hover:bg-indigo-50 transition-colors text-left"
              >
                <div className="font-medium">Second Grade</div>
                <div className="text-gray-500">46 words</div>
              </button>
              <button
                onClick={() => generateFromSightWords('dolch-third')}
                className="px-3 py-2 text-xs bg-white border-2 border-gray-200 rounded-lg hover:border-indigo-400 hover:bg-indigo-50 transition-colors text-left"
              >
                <div className="font-medium">Third Grade</div>
                <div className="text-gray-500">41 words</div>
              </button>
            </div>

            <h3 className="text-sm font-semibold text-gray-700 pt-3">Fry Sight Words</h3>
            <div className="grid grid-cols-2 gap-2">
              <button
                onClick={() => generateFromSightWords('fry-first100')}
                className="px-3 py-2 text-xs bg-white border-2 border-gray-200 rounded-lg hover:border-indigo-400 hover:bg-indigo-50 transition-colors text-left"
              >
                <div className="font-medium">First 100</div>
                <div className="text-gray-500">Most common</div>
              </button>
              <button
                onClick={() => generateFromSightWords('fry-second100')}
                className="px-3 py-2 text-xs bg-white border-2 border-gray-200 rounded-lg hover:border-indigo-400 hover:bg-indigo-50 transition-colors text-left"
              >
                <div className="font-medium">Second 100</div>
                <div className="text-gray-500">Common</div>
              </button>
              <button
                onClick={() => generateFromSightWords('fry-third100')}
                className="px-3 py-2 text-xs bg-white border-2 border-gray-200 rounded-lg hover:border-indigo-400 hover:bg-indigo-50 transition-colors text-left"
              >
                <div className="font-medium">Third 100</div>
                <div className="text-gray-500">Intermediate</div>
              </button>
            </div>
          </div>
        )}

        {activeTab === 'patterns' && (
          <div className="space-y-3">
            <h3 className="text-sm font-semibold text-gray-700">Word Patterns</h3>
            <div className="space-y-2">
              {Object.entries(WORD_PATTERNS).map(([key, { label }]) => (
                <button
                  key={key}
                  onClick={() => generateFromPattern(key as WordPattern)}
                  className="w-full px-3 py-2 text-xs bg-white border-2 border-gray-200 rounded-lg hover:border-indigo-400 hover:bg-indigo-50 transition-colors text-left"
                >
                  <div className="font-medium">{label}</div>
                  <div className="text-gray-500 text-xs mt-0.5">
                    {WORD_PATTERNS[key as WordPattern].examples.slice(0, 5).join(', ')}...
                  </div>
                </button>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'sentences' && (
          <div className="space-y-3">
            <h3 className="text-sm font-semibold text-gray-700">Sentence Templates</h3>
            <p className="text-xs text-gray-500">Click a template to generate 5 random sentences</p>
            <div className="space-y-2">
              {SENTENCE_TEMPLATES.map((template, index) => (
                <button
                  key={index}
                  onClick={() => generateFromTemplate(template)}
                  className="w-full px-3 py-2 text-xs bg-white border-2 border-gray-200 rounded-lg hover:border-indigo-400 hover:bg-indigo-50 transition-colors text-left"
                >
                  {template}
                </button>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'names' && (
          <div className="space-y-3">
            <h3 className="text-sm font-semibold text-gray-700">Name Practice</h3>
            <div className="space-y-2">
              <input
                type="text"
                placeholder="Enter a name..."
                value={preferences.contentGeneration.practiceName}
                onChange={(e) => updateContentGeneration({ practiceName: e.target.value })}
                className="w-full px-3 py-2 border-2 border-gray-300 rounded-lg focus:border-indigo-500 focus:outline-none text-sm"
              />
              <button
                onClick={() => generateNamePractice(preferences.contentGeneration.practiceName)}
                disabled={!preferences.contentGeneration.practiceName.trim()}
                className="w-full px-4 py-2 text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 disabled:bg-gray-300 disabled:cursor-not-allowed rounded-lg transition-colors"
              >
                Generate Name Practice
              </button>
            </div>

            <h4 className="text-xs font-semibold text-gray-600 pt-2">Common Names</h4>
            <div className="grid grid-cols-3 gap-2">
              {COMMON_NAMES.map((name) => (
                <button
                  key={name}
                  onClick={() => generateNamePractice(name)}
                  className="px-2 py-1.5 text-xs bg-white border border-gray-200 rounded hover:border-indigo-400 hover:bg-indigo-50 transition-colors"
                >
                  {name}
                </button>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'custom' && (
          <div className="space-y-3">
            <h3 className="text-sm font-semibold text-gray-700">Custom Word List</h3>
            <div className="space-y-2">
              <textarea
                placeholder="Enter words separated by spaces or commas..."
                value={customWordInput}
                onChange={(e) => setCustomWordInput(e.target.value)}
                className="w-full px-3 py-2 border-2 border-gray-300 rounded-lg focus:border-indigo-500 focus:outline-none text-sm"
                rows={3}
              />
              <button
                onClick={addCustomWords}
                disabled={!customWordInput.trim()}
                className="w-full px-4 py-2 text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 disabled:bg-gray-300 disabled:cursor-not-allowed rounded-lg transition-colors"
              >
                Add Words
              </button>
            </div>

            <div className="flex gap-2">
              <input
                ref={fileInputRef}
                type="file"
                accept=".txt"
                onChange={handleImportWords}
                className="hidden"
              />
              <button
                onClick={() => fileInputRef.current?.click()}
                className="flex-1 px-3 py-2 text-xs font-medium text-gray-700 bg-white border-2 border-gray-300 rounded-lg hover:border-indigo-400 hover:bg-indigo-50 transition-colors flex items-center justify-center gap-1"
              >
                <Upload className="w-3 h-3" />
                Import
              </button>
              <button
                onClick={handleExportWords}
                disabled={preferences.contentGeneration.customWordList.length === 0}
                className="flex-1 px-3 py-2 text-xs font-medium text-gray-700 bg-white border-2 border-gray-300 rounded-lg hover:border-indigo-400 hover:bg-indigo-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center justify-center gap-1"
              >
                <Download className="w-3 h-3" />
                Export
              </button>
              <button
                onClick={clearCustomWords}
                disabled={preferences.contentGeneration.customWordList.length === 0}
                className="flex-1 px-3 py-2 text-xs font-medium text-red-600 bg-white border-2 border-red-300 rounded-lg hover:border-red-400 hover:bg-red-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                Clear
              </button>
            </div>

            {preferences.contentGeneration.customWordList.length > 0 && (
              <div className="mt-4">
                <h4 className="text-xs font-semibold text-gray-600 mb-2">
                  Your Words ({preferences.contentGeneration.customWordList.length})
                </h4>
                <div className="flex flex-wrap gap-2 max-h-40 overflow-y-auto">
                  {preferences.contentGeneration.customWordList.map((word, index) => (
                    <span
                      key={index}
                      className="inline-flex items-center gap-1 px-2 py-1 bg-indigo-100 text-indigo-700 rounded text-xs"
                    >
                      {word}
                      <button
                        onClick={() => removeCustomWord(index)}
                        className="hover:text-indigo-900"
                      >
                        ×
                      </button>
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

        {activeTab === 'random' && (
          <div className="space-y-3">
            <h3 className="text-sm font-semibold text-gray-700">Random Word Generator</h3>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Difficulty Level
              </label>
              <div className="space-y-2">
                {Object.entries(DIFFICULTY_LEVELS).map(([key, { label }]) => (
                  <button
                    key={key}
                    onClick={() => generateRandomWords(key as DifficultyLevel, preferences.contentGeneration.randomWordCount)}
                    className="w-full px-3 py-2 text-xs bg-white border-2 border-gray-200 rounded-lg hover:border-indigo-400 hover:bg-indigo-50 transition-colors text-left"
                  >
                    {label}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Number of Words: {preferences.contentGeneration.randomWordCount}
              </label>
              <input
                type="range"
                min="5"
                max="30"
                step="5"
                value={preferences.contentGeneration.randomWordCount}
                onChange={(e) => updateContentGeneration({ randomWordCount: Number(e.target.value) })}
                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
