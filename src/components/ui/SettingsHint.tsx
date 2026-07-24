import React from 'react';

interface SettingsHintProps {
  children: React.ReactNode;
}

export const SettingsHint: React.FC<SettingsHintProps> = ({ children }) => {
  return (
    <p className="text-xs text-gray-500 mt-1 leading-snug">
      {children}
    </p>
  );
};
