import { useState, useEffect } from 'react';
import { WorksheetPreferences } from '@/types/worksheet';
import { STORAGE_KEY, DEFAULT_PREFERENCES } from '@/constants/worksheet';
import { useToast } from '@/hooks/use-toast';

export const useWorksheetPreferences = () => {
  const { toast } = useToast();
  const [preferences, setPreferences] = useState<WorksheetPreferences>(DEFAULT_PREFERENCES);

  // Load preferences on mount
  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        try {
          const parsed = JSON.parse(saved);
          setPreferences({ ...DEFAULT_PREFERENCES, ...parsed });
        } catch (parseError) {
          console.error('Failed to parse saved preferences:', parseError);
          // Corrupted data - clear it
          localStorage.removeItem(STORAGE_KEY);
        }
      }
    } catch (storageError) {
      console.error('Failed to access localStorage on mount:', storageError);
      // Continue with defaults if storage is inaccessible
    }
  }, []);

  const savePreferences = () => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(preferences));
      toast({
        title: "Preferences Saved",
        description: "Your settings have been saved successfully.",
      });
    } catch (error) {
      console.error('Failed to save preferences:', error);
      toast({
        title: "Save Failed",
        description: "Could not save settings. Browser storage may be full or inaccessible.",
        variant: "destructive",
      });
    }
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
    try {
      setPreferences(DEFAULT_PREFERENCES);
      localStorage.removeItem(STORAGE_KEY);
      toast({
        title: "Preferences Reset",
        description: "All settings have been reset to defaults.",
      });
    } catch (error) {
      console.error('Failed to reset preferences:', error);
      // Still update state even if localStorage fails
      setPreferences(DEFAULT_PREFERENCES);
      toast({
        title: "Partial Reset",
        description: "Settings reset in memory, but could not clear storage.",
        variant: "destructive",
      });
    }
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
