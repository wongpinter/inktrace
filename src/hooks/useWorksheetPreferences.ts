import { useState, useEffect } from 'react';
import { WorksheetPreferences } from '@/types/worksheet';
import { STORAGE_KEY, DEFAULT_PREFERENCES } from '@/constants/worksheet';
import { useToast } from '@/hooks/use-toast';

export const useWorksheetPreferences = () => {
  const { toast } = useToast();
  const [preferences, setPreferences] = useState<WorksheetPreferences>(DEFAULT_PREFERENCES);

  // Load preferences on mount
  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        setPreferences({ ...DEFAULT_PREFERENCES, ...parsed });
      } catch (error) {
        console.error('Failed to load preferences on mount:', error);
      }
    }
  }, []);

  const savePreferences = () => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(preferences));
    toast({
      title: "Preferences Saved",
      description: "Your settings have been saved successfully.",
    });
  };

  const loadPreferences = () => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        setPreferences({ ...DEFAULT_PREFERENCES, ...parsed });
        toast({
          title: "Preferences Loaded",
          description: "Your saved settings have been restored.",
        });
      }
    } catch (error) {
      console.error('Failed to load preferences:', error);
      toast({
        title: "Load Failed",
        description: "Could not load saved preferences.",
        variant: "destructive",
      });
    }
  };

  const resetPreferences = () => {
    setPreferences(DEFAULT_PREFERENCES);
    localStorage.removeItem(STORAGE_KEY);
    toast({
      title: "Preferences Reset",
      description: "All settings have been reset to defaults.",
    });
  };

  const updatePreference = <K extends keyof WorksheetPreferences>(
    key: K,
    value: WorksheetPreferences[K]
  ) => {
    setPreferences(prev => ({ ...prev, [key]: value }));
  };

  return {
    preferences,
    updatePreference,
    savePreferences,
    loadPreferences,
    resetPreferences
  };
};
