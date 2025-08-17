import React from 'react';
import { Wand2, ArrowRight } from 'lucide-react';
import { useApp } from '../contexts/AppContext';
import { useTranslation } from '../utils/i18n';
import { generateQuest } from '../services/questService';

export const QuestGenerator: React.FC = () => {
  const { state, dispatch } = useApp();
  const { t } = useTranslation(state.currentLanguage);

  const handleGenerateQuest = async () => {
    if (!state.selectedRegion) return;

    dispatch({ type: 'SET_GENERATING', payload: true });
    
    try {
      const quest = await generateQuest({
        region: state.selectedRegion.id,
        interests: state.userInterests,
        language: state.currentLanguage,
      });
      
      dispatch({ type: 'SET_QUEST', payload: quest });
    } catch (error) {
      console.error('Error generating quest:', error);
    } finally {
      dispatch({ type: 'SET_GENERATING', payload: false });
    }
  };

  const canGenerate = state.selectedRegion && 
    Object.values(state.userInterests).some(Boolean) && 
    !state.isGeneratingQuest;

  if (state.isGeneratingQuest) {
    return (
      <div className="w-full max-w-2xl mx-auto px-6">
        <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-8 text-center">
          <div className="animate-spin w-16 h-16 mx-auto mb-6">
            <Wand2 className="w-full h-full text-white" />
          </div>
          <h3 className="text-2xl font-bold text-white mb-4">
            {t('generating')}
          </h3>
          <div className="w-full bg-white/20 rounded-full h-2 mb-4">
            <div className="bg-gradient-to-r from-blue-400 to-purple-400 h-2 rounded-full animate-pulse" style={{ width: '60%' }} />
          </div>
          <p className="text-white/80">
            Creando una aventura única para ti...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full max-w-2xl mx-auto px-6">
      <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-8 text-center">
        <Wand2 className="w-16 h-16 mx-auto mb-6 text-white" />
        
        <h3 className="text-2xl font-bold text-white mb-4">
          {t('generateQuest')}
        </h3>
        
        <p className="text-white/80 mb-6">
          Tu aventura personalizada está lista para ser creada
        </p>

        {state.selectedRegion && (
          <div className="mb-6 p-4 bg-white/5 rounded-lg">
            <p className="text-white/90 text-sm mb-2">
              <strong>Región:</strong> {state.selectedRegion.name}
            </p>
            <p className="text-white/90 text-sm">
              <strong>Intereses:</strong> {
                Object.keys(state.userInterests)
                  .filter(key => state.userInterests[key as keyof typeof state.userInterests])
                  .map(key => t(`interests.${key}`))
                  .join(', ')
              }
            </p>
          </div>
        )}

        <button
          onClick={handleGenerateQuest}
          disabled={!canGenerate}
          className={`group relative px-8 py-4 rounded-xl font-semibold text-lg transition-all duration-300 transform hover:scale-105 ${
            canGenerate
              ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white hover:from-blue-600 hover:to-purple-700 shadow-lg hover:shadow-xl'
              : 'bg-gray-500/50 text-gray-300 cursor-not-allowed'
          }`}
        >
          <span className="flex items-center">
            {t('generateQuest')}
            <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </span>
        </button>
      </div>
    </div>
  );
};