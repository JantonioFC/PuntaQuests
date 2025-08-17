import React from 'react';
import { useApp } from '../contexts/AppContext';
import { REGIONS } from '../constants/regions';

export const BackgroundImage: React.FC = () => {
  const { state } = useApp();
  
  // Default to Este region background if none selected
  const backgroundImage = state.selectedRegion?.background_image || REGIONS[0].background_image;
  const regionStyle = state.selectedRegion?.style || 'luxury';

  return (
    <div className="fixed inset-0 -z-10">
      <div
        className="w-full h-full bg-cover bg-center bg-no-repeat transition-all duration-1000 ease-in-out"
        style={{
          backgroundImage: `url(${backgroundImage})`,
        }}
      />
      {/* Adaptive overlay based on region style */}
      <div 
        className={`absolute inset-0 transition-all duration-1000 ${
          regionStyle === 'luxury' 
            ? 'bg-gradient-to-br from-blue-900/40 via-purple-900/30 to-pink-900/40' 
            : 'bg-gradient-to-br from-green-900/40 via-blue-900/30 to-gray-900/40'
        }`} 
      />
      {/* Additional overlay for text readability */}
      <div className="absolute inset-0 bg-black/20" />
    </div>
  );
};