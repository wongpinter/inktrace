// Utility functions for content generation

export const exportWordList = (words: string[], filename: string = 'word-list.txt') => {
  const content = words.join('\n');
  const blob = new Blob([content], { type: 'text/plain' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
};

export const importWordList = (file: File): Promise<string[]> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    
    reader.onload = (e) => {
      const content = e.target?.result as string;
      const words = content
        .split(/[\n,\s]+/)
        .map(word => word.trim())
        .filter(word => word.length > 0);
      resolve(words);
    };
    
    reader.onerror = () => {
      reject(new Error('Failed to read file'));
    };
    
    reader.readAsText(file);
  });
};

export const shuffleArray = <T>(array: T[]): T[] => {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
};

export const generateSentenceFromTemplate = (
  template: string,
  wordBank: Record<string, string[]>
): string => {
  let sentence = template;
  
  Object.entries(wordBank).forEach(([key, words]) => {
    const placeholder = `{${key}}`;
    if (sentence.includes(placeholder)) {
      const randomWord = words[Math.floor(Math.random() * words.length)];
      sentence = sentence.replace(placeholder, randomWord);
    }
  });
  
  return sentence;
};
