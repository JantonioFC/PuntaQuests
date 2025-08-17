import React from 'react';
import { 
  UtensilsCrossed, 
  Palette, 
  BookOpen, 
  TreePine, 
  Music, 
  ShoppingBag, 
  Mountain, 
  Camera 
} from 'lucide-react';
import { useApp } from '../contexts/AppContext';
import { useTranslation } from '../utils/i18n';
import { INTERESTS_OPTIONS } from '../constants/regions';

const INTEREST_ICONS = {
  gastronomy: UtensilsCrossed,
  art: Palette,
  history: BookOpen,
  nature: TreePine,
  nightlife: Music,
  shopping: ShoppingBag,
  adventure: Mountain,
  culture: Camera,
};

export const InterestsSelector: React.FC = () => {
  const { state, dispatch } = useApp();
  const { t } = useTranslation(state.currentLanguage);

  const toggleInterest = (interest: keyof typeof state.userInterests) => {
    dispatch({
      type: 'SET_INTERESTS',
      payload: {
        ...state.userInterests,
        [interest]: !state.userInterests[interest],
      },
    });
  };

  const selectedCount = Object.values(state.userInterests).filter(Boolean).length;

  return (
    <div className="w-full max-w-4xl mx-auto px-6">
      <div className="text-center mb-8">
        <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
          {t('selectInterests')}
        </h2>
        <p className="text-white/80 text-lg">
          {selectedCount > 0 
            ? `${selectedCount} ${selectedCount === 1 ? 'interés seleccionado' : 'intereses seleccionados'}`
            : 'Selecciona al menos un interés'
          }
        </p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {INTERESTS_OPTIONS.map((interest) => {
          const Icon = INTEREST_ICONS[interest];
          const isSelected = state.userInterests[interest];
          
          return (
            <button
              key={interest}
              onClick={() => toggleInterest(interest)}
              className={`group relative p-6 rounded-xl transition-all duration-300 transform hover:scale-105 ${
                isSelected
                  ? 'bg-white/25 backdrop-blur-md border-2 border-white/50 shadow-lg'
                  : 'bg-white/10 backdrop-blur-md border border-white/20 hover:bg-white/20'
              }`}
            >
              <div className="flex flex-col items-center text-white">
                <Icon 
                  size={32} 
                  className={`mb-3 transition-all duration-300 ${
                    isSelected ? 'text-white scale-110' : 'text-white/80 group-hover:text-white'
                  }`}
                />
                <span className="text-sm font-medium text-center">
                  {t(`interests.${interest}`)}
                </span>
              </div>
              
              <div className={`absolute top-2 right-2 w-5 h-5 rounded-full border-2 border-white transition-all duration-300 ${
                isSelected 
                  ? 'bg-white scale-110' 
                  : 'bg-transparent scale-100'
              }`}>
                {isSelected && (
                  <div className="w-full h-full flex items-center justify-center">
                    <div className="w-2 h-2 bg-blue-600 rounded-full" />
                  </div>
                )}
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
};