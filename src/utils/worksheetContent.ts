import { WorksheetType, AlphabetCase } from '@/types/worksheet';

export const getWorksheetContent = (
  worksheetType: WorksheetType,
  text: string,
  specificLetters: string,
  alphabetCase: AlphabetCase,
  includeNumbers: boolean,
  includeSymbols: boolean
): string => {
  switch (worksheetType) {
    case 'text':
      return text;
    case 'letters':
      return specificLetters;
    case 'alphabet': {
      const uppercase = 'A B C D E F G H I J K L M N O P Q R S T U V W X Y Z';
      const lowercase = 'a b c d e f g h i j k l m n o p q r s t u v w x y z';
      if (alphabetCase === 'uppercase') return uppercase;
      if (alphabetCase === 'lowercase') return lowercase;
      return `${uppercase}   ${lowercase}`;
    }
    case 'numbers': {
      let content = '';
      if (includeNumbers) content += '0 1 2 3 4 5 6 7 8 9';
      if (includeSymbols) {
        if (content) content += '   ';
        content += '! @ # $ % ^ & * ( ) - + = [ ] { } ; : \' " , . < > ? /';
      }
      return content;
    }
    default:
      return text;
  }
};
