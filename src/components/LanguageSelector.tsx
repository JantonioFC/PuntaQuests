import React from 'react';
import { Globe } from 'lucide-react';
import { useApp } from '../contexts/AppContext';

const LANGUAGES = [
  { code: 'es' as const, name: 'Español', flag: '🇺🇾' },
  { code: 'en' as const, name: 'English', flag: '🇺🇸' },
  { code: 'pt' as const, name: 'Português', flag: '🇧🇷' }
];

export const LanguageSelector: React.FC = () => {
  const { state, dispatch } = useApp();

  return (
    <div className="fixed top-4 right-4 z-50">
      <div className="relative group">
        <button className="flex items-center space-x-2 bg-white/20 backdrop-blur-md border border-white/30 rounded-full px-4 py-2 text-white hover:bg-white/30 transition-all duration-300">
          <Globe size={18} />
          <span className="text-sm font-medium">
            {LANGUAGES.find(lang => lang.code === state.currentLanguage)?.flag}
          </span>
        </button>
        
        <div className="absolute right-0 top-full mt-2 bg-white/95 backdrop-blur-md border border-white/30 rounded-lg shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 min-w-[140px]">
          {LANGUAGES.map(language => (
            <button
              key={language.code}
              onClick={() => dispatch({ type: 'SET_LANGUAGE', payload: language.code })}
              className={`w-full px-4 py-2 text-left text-sm hover:bg-white/20 transition-colors duration-200 first:rounded-t-lg last:rounded-b-lg flex items-center space-x-3 ${
                state.currentLanguage === language.code ? 'bg-blue-500/20 text-blue-900' : 'text-gray-800'
              }`}
            >
              <span>{language.flag}</span>
              <span>{language.name}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};