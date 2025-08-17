import React from 'react';
import { MapPin, Sparkles, Waves } from 'lucide-react';
import { useApp } from '../contexts/AppContext';
import { useTranslation } from '../utils/i18n';
import { REGIONS } from '../constants/regions';

export const RegionSelector: React.FC = () => {
  const { state, dispatch } = useApp();
  const { t } = useTranslation(state.currentLanguage);

  const handleRegionSelect = (region: typeof REGIONS[0]) => {
    dispatch({ type: 'SET_REGION', payload: region });
  };

  return (
    <div className="w-full max-w-4xl mx-auto px-6">
      <div className="text-center mb-12">
        <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
          {t('selectRegion')}
        </h2>
        <p className="text-white/80 text-lg">
          {t('tagline')}
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {REGIONS.map((region) => (
          <div
            key={region.id}
            onClick={() => handleRegionSelect(region)}
            className={`group relative overflow-hidden rounded-2xl cursor-pointer transition-all duration-500 transform hover:scale-105 ${
              state.selectedRegion?.id === region.id
                ? 'ring-4 ring-white/50 shadow-2xl'
                : 'hover:shadow-xl'
            }`}
          >
            <div
              className="h-64 bg-cover bg-center"
              style={{ backgroundImage: `url(${region.background_image})` }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
            
            <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
              <div className="flex items-center mb-2">
                {region.style === 'luxury' ? (
                  <Sparkles className="w-6 h-6 mr-2 text-yellow-400" />
                ) : (
                  <Waves className="w-6 h-6 mr-2 text-blue-400" />
                )}
                <h3 className="text-xl font-bold">{region.name}</h3>
              </div>
              <p className="text-white/90 text-sm">
                {region.description}
              </p>
            </div>

            <div className={`absolute top-4 right-4 w-4 h-4 rounded-full border-2 border-white transition-all duration-300 ${
              state.selectedRegion?.id === region.id 
                ? 'bg-white scale-110' 
                : 'bg-transparent'
            }`} />
          </div>
        ))}
      </div>
    </div>
  );
};