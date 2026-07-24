import React, { useState, useMemo } from 'react';
import { WorksheetPreferences } from '@/types/worksheet';
import { Code, Clipboard, ClipboardCheck } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface JsonSettingsProps {
  preferences: WorksheetPreferences;
  replacePreferences: (next: WorksheetPreferences) => void;
}

const KNOWN_KEYS: ReadonlyArray<keyof WorksheetPreferences> = [
  'fontSize',
  'lineCount',
  'selectedFont',
  'showGuides',
  'fontCategory',
  'paperSize',
  'guidelineStyle',
  'guidelineThickness',
  'fullMarginGuides',
  'textOpacity',
  'guidelineOpacity',
  'guidelineColorStyle',
  'textTraceStyle',
  'letterSpacing',
  'showStartingDots',
  'showStrokeArrows',
  'showPageNumbers',
  'showFooter',
  'footerText',
  'wordSpacing',
  'characterWidth',
  'verticalAlignment',
  'textCase',
  'lineSpacingPreset',
  'customLineSpacing',
  'printQuality',
  'customGuidelineColors',
  'dashedGuidelines',
  'showMarginLines',
  'emphasizeBaseline',
  'baselineThickness',
  'contentGeneration',
  'multiPageMode',
  'pages',
  'text',
  'pageCount',
  'dottedFont',
  'worksheetType',
  'specificLetters',
  'alphabetCase',
  'includeNumbers',
  'includeSymbols',
  'emptyPaper',
  'repeatText'
];

const sanitizePartial = (raw: unknown): Partial<WorksheetPreferences> => {
  if (!raw || typeof raw !== 'object' || Array.isArray(raw)) {
    return {};
  }
  const result: Partial<WorksheetPreferences> = {};
  for (const [key, value] of Object.entries(raw as Record<string, unknown>)) {
    if ((KNOWN_KEYS as ReadonlyArray<string>).includes(key)) {
      (result as Record<string, unknown>)[key] = value;
    }
  }
  return result;
};

export const JsonSettings: React.FC<JsonSettingsProps> = ({
  preferences,
  replacePreferences
}) => {
  const { toast } = useToast();
  const [draft, setDraft] = useState('');
  const [copied, setCopied] = useState(false);

  const exportText = useMemo(() => JSON.stringify(preferences, null, 2), [preferences]);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(exportText);
      setCopied(true);
      toast({
        title: 'Copied',
        description: 'Settings JSON copied to clipboard.'
      });
      window.setTimeout(() => setCopied(false), 2000);
    } catch (error) {
      console.error('Copy failed:', error);
      toast({
        title: 'Copy Failed',
        description: 'Could not access clipboard.',
        variant: 'destructive'
      });
    }
  };

  const handleApply = () => {
    if (!draft.trim()) {
      toast({
        title: 'Nothing to apply',
        description: 'Paste a settings JSON block first.',
        variant: 'destructive'
      });
      return;
    }

    let parsed: unknown;
    try {
      parsed = JSON.parse(draft);
    } catch (error) {
      toast({
        title: 'Invalid JSON',
        description: 'Could not parse the pasted settings.',
        variant: 'destructive'
      });
      return;
    }

    const partial = sanitizePartial(parsed);
    const knownKeyCount = Object.keys(partial).length;
    if (knownKeyCount === 0) {
      toast({
        title: 'No recognized settings',
        description: 'The JSON did not include any known settings keys.',
        variant: 'destructive'
      });
      return;
    }

    replacePreferences({ ...preferences, ...partial });
    setDraft('');
    toast({
      title: 'Settings applied',
      description: `Applied ${knownKeyCount} settings.`
    });
  };

  return (
    <div className="space-y-3">
      <p className="text-xs text-gray-500">
        Copy your current settings as JSON to save or share, or paste JSON to apply.
      </p>

      <div>
        <div className="flex items-center justify-between mb-1">
          <label className="block text-xs font-semibold text-gray-700">
            Current settings
          </label>
          <button
            onClick={handleCopy}
            className="inline-flex items-center gap-1 px-2 py-1 text-xs font-medium text-gray-700 bg-white border border-gray-300 rounded hover:border-indigo-400 hover:text-indigo-700 transition-colors"
          >
            {copied ? (
              <ClipboardCheck className="w-3 h-3" />
            ) : (
              <Clipboard className="w-3 h-3" />
            )}
            {copied ? 'Copied' : 'Copy'}
          </button>
        </div>
        <pre className="text-[11px] leading-snug font-mono bg-gray-50 border border-gray-200 rounded p-2 max-h-40 overflow-auto whitespace-pre break-all">
          {exportText}
        </pre>
      </div>

      <div>
        <label className="block text-xs font-semibold text-gray-700 mb-1">
          Paste settings
        </label>
        <textarea
          value={draft}
          onChange={(event) => setDraft(event.target.value)}
          placeholder='{"fontSize": 60, "lineSpacingPreset": "kindergarten"}'
          rows={4}
          className="w-full text-[11px] font-mono px-2 py-1.5 border border-gray-300 rounded focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 focus:outline-none"
        />
        <button
          onClick={handleApply}
          className="mt-2 w-full flex items-center justify-center gap-2 px-3 py-2 text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 rounded transition-colors"
        >
          <Code className="w-3.5 h-3.5" />
          Apply JSON
        </button>
      </div>
    </div>
  );
};
