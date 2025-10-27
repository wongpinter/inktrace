import { useState, useEffect, useMemo } from 'react';
import { GOOGLE_FONTS } from '@/constants/worksheet';
import { FontCategory } from '@/types/worksheet';

export const useFontLoader = (selectedFont: string, fontCategory: FontCategory, searchQuery: string) => {
  const [fontsLoaded, setFontsLoaded] = useState(new Set<string>());

  const allFonts = useMemo(() => Object.values(GOOGLE_FONTS).flat(), []);

  const filteredFonts = useMemo(() => {
    const fonts = fontCategory === 'all' ? allFonts : (GOOGLE_FONTS[fontCategory] || []);
    if (!searchQuery) return fonts;
    return fonts.filter(font => 
      font.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [fontCategory, searchQuery, allFonts]);

  const loadFont = (fontName: string) => {
    if (fontsLoaded.has(fontName) || !fontName) return;

    const link = document.createElement('link');
    link.href = `https://fonts.googleapis.com/css2?family=${fontName.replace(/ /g, '+')}:wght@400;700&display=swap`;
    link.rel = 'stylesheet';
    document.head.appendChild(link);

    link.onload = () => {
      setFontsLoaded(prev => new Set(prev).add(fontName));
    };
    setFontsLoaded(prev => new Set(prev).add(fontName));
  };

  useEffect(() => {
    loadFont(selectedFont);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedFont]);

  return { filteredFonts, loadFont, fontsLoaded };
};
