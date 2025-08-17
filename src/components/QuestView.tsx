import React from 'react';
import { 
  MapPin, 
  Clock, 
  Star, 
  CheckCircle, 
  Circle, 
  ArrowLeft,
  ExternalLink,
  Trophy 
} from 'lucide-react';
import { useApp } from '../contexts/AppContext';
import { useTranslation } from '../utils/i18n';

export const QuestView: React.FC = () => {
  const { state, dispatch } = useApp();
  const { t } = useTranslation(state.currentLanguage);

  if (!state.currentQuest) return null;

  const completedSteps = state.currentQuest.steps.filter(step => step.completed).length;
  const totalSteps = state.currentQuest.steps.length;
  const isCompleted = completedSteps === totalSteps;
  const progressPercentage = (completedSteps / totalSteps) * 100;

  const handleCompleteStep = (stepId: string) => {
    dispatch({ type: 'COMPLETE_STEP', payload: stepId });
  };

  const handleBackToHome = () => {
    dispatch({ type: 'SET_QUEST', payload: null });
    dispatch({ type: 'SET_REGION', payload: null });
  };

  const openInMaps = (location: { lat: number; lng: number; name: string }) => {
    const url = `https://www.google.com/maps/search/?api=1&query=${location.lat},${location.lng}`;
    window.open(url, '_blank');
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'easy': return 'text-green-400';
      case 'medium': return 'text-yellow-400';
      case 'hard': return 'text-red-400';
      default: return 'text-gray-400';
    }
  };

  if (isCompleted) {
    return (
      <div className="w-full max-w-4xl mx-auto px-6">
        <div className="bg-white/15 backdrop-blur-md border border-white/30 rounded-3xl p-8 text-center">
          <Trophy className="w-20 h-20 mx-auto mb-6 text-yellow-400" />
          <h2 className="text-3xl font-bold text-white mb-4">
            {t('questCompleted')}
          </h2>
          <p className="text-white/80 text-lg mb-8">
            {t('congratulations')}
          </p>
          
          <div className="space-y-4">
            <button
              onClick={handleBackToHome}
              className="w-full px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-xl font-semibold hover:from-blue-600 hover:to-purple-700 transition-all duration-300"
            >
              {t('startNewQuest')}
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full max-w-4xl mx-auto px-6">
      {/* Header */}
      <div className="flex items-center mb-6">
        <button
          onClick={handleBackToHome}
          className="mr-4 p-2 rounded-full bg-white/20 backdrop-blur-md border border-white/30 text-white hover:bg-white/30 transition-all duration-300"
        >
          <ArrowLeft size={20} />
        </button>
        <div className="flex-1">
          <h1 className="text-2xl md:text-3xl font-bold text-white mb-2">
            {state.currentQuest.title}
          </h1>
          <p className="text-white/80">
            {state.currentQuest.description}
          </p>
        </div>
      </div>

      {/* Quest Info */}
      <div className="bg-white/15 backdrop-blur-md border border-white/30 rounded-2xl p-6 mb-6">
        <div className="flex flex-wrap gap-4 mb-4">
          <div className="flex items-center text-white/90">
            <Clock className="w-5 h-5 mr-2" />
            <span>{state.currentQuest.estimated_duration} {t('minutes')}</span>
          </div>
          <div className={`flex items-center ${getDifficultyColor(state.currentQuest.difficulty)}`}>
            <Star className="w-5 h-5 mr-2" />
            <span>{t(state.currentQuest.difficulty)}</span>
          </div>
          <div className="flex items-center text-white/90">
            <MapPin className="w-5 h-5 mr-2" />
            <span>{totalSteps} pasos</span>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="w-full bg-white/20 rounded-full h-3 mb-2">
          <div 
            className="bg-gradient-to-r from-blue-400 to-purple-500 h-3 rounded-full transition-all duration-500"
            style={{ width: `${progressPercentage}%` }}
          />
        </div>
        <p className="text-white/80 text-sm">
          {completedSteps} de {totalSteps} pasos completados
        </p>
      </div>

      {/* Steps */}
      <div className="space-y-4">
        {state.currentQuest.steps.map((step, index) => (
          <div
            key={step.id}
            className={`bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-6 transition-all duration-300 ${
              step.completed ? 'bg-green-500/20 border-green-500/30' : 'hover:bg-white/15'
            }`}
          >
            <div className="flex items-start space-x-4">
              <div className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center ${
                step.completed 
                  ? 'bg-green-500 text-white' 
                  : 'bg-white/20 text-white border-2 border-white/30'
              }`}>
                {step.completed ? (
                  <CheckCircle size={20} />
                ) : (
                  <span className="text-sm font-bold">{step.order}</span>
                )}
              </div>

              <div className="flex-1">
                <h3 className="text-lg font-bold text-white mb-2">
                  {step.title}
                </h3>
                <p className="text-white/80 mb-4">
                  {step.description}
                </p>
                
                <div className="bg-white/5 rounded-lg p-4 mb-4">
                  <p className="text-white/90 text-sm mb-2">
                    <strong>Acción:</strong> {step.action}
                  </p>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center text-white/80 text-sm">
                      <MapPin className="w-4 h-4 mr-1" />
                      <span>{step.location.name}</span>
                    </div>
                    <button
                      onClick={() => openInMaps(step.location)}
                      className="flex items-center space-x-1 text-blue-400 hover:text-blue-300 text-sm"
                    >
                      <ExternalLink size={14} />
                      <span>{t('openInMaps')}</span>
                    </button>
                  </div>
                </div>

                {!step.completed && (
                  <button
                    onClick={() => handleCompleteStep(step.id)}
                    className="w-full px-4 py-2 bg-gradient-to-r from-green-500 to-blue-500 text-white rounded-lg font-semibold hover:from-green-600 hover:to-blue-600 transition-all duration-300"
                  >
                    {t('completeStep')}
                  </button>
                )}

                {step.completed && (
                  <div className="w-full px-4 py-2 bg-green-500/20 text-green-300 rounded-lg font-semibold text-center">
                    ✓ {t('completed')}
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};