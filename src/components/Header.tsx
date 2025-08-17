import React from 'react';
import { Compass } from 'lucide-react';
import { useApp } from '../contexts/AppContext';
import { useTranslation } from '../utils/i18n';

export const Header: React.FC = () => {
  const { state } = useApp();
  const { t } = useTranslation(state.currentLanguage);

  return (
    <header className="w-full max-w-4xl mx-auto px-6 py-8">
      <div className="text-center">
        <div className="flex items-center justify-center mb-4">
          <div className="relative">
            <Compass className="w-16 h-16 text-white animate-pulse" />
            <div className="absolute inset-0 w-16 h-16 bg-gradient-to-br from-blue-400/30 to-purple-500/30 rounded-full blur-xl" />
          </div>
        </div>
        
        <h1 className="text-4xl md:text-6xl font-bold text-white mb-4 tracking-tight">
          Punta Quests
        </h1>
        
        <p className="text-xl md:text-2xl text-white/90 font-light italic">
          {t('tagline')}
        </p>
        
        <div className="mt-6 w-24 h-1 mx-auto bg-gradient-to-r from-blue-400 to-purple-500 rounded-full" />
      </div>
    </header>
  );
};