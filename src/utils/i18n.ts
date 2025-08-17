export const translations = {
  es: {
    welcome: 'Bienvenido a Punta Quests',
    tagline: 'Del Este al Diablo',
    selectRegion: 'Selecciona tu región',
    selectInterests: 'Selecciona tus intereses',
    generateQuest: 'Generar Quest',
    currentQuest: 'Quest Actual',
    completeStep: 'Completar Paso',
    completed: 'Completado',
    estimatedTime: 'Tiempo estimado',
    minutes: 'minutos',
    difficulty: 'Dificultad',
    easy: 'Fácil',
    medium: 'Medio',
    hard: 'Difícil',
    interests: {
      gastronomy: 'Gastronomía',
      art: 'Arte',
      history: 'Historia',
      nature: 'Naturaleza',
      nightlife: 'Vida Nocturna',
      shopping: 'Compras',
      adventure: 'Aventura',
      culture: 'Cultura'
    },
    regions: {
      este: 'Punta del Este',
      diablo: 'Punta del Diablo / Rocha'
    },
    generating: 'Generando tu quest personalizada...',
    backToHome: 'Volver al inicio',
    openInMaps: 'Abrir en Maps',
    questCompleted: '¡Quest completada!',
    congratulations: '¡Felicitaciones! Has completado tu aventura.',
    startNewQuest: 'Comenzar nueva Quest'
  },
  en: {
    welcome: 'Welcome to Punta Quests',
    tagline: 'From East to Devil',
    selectRegion: 'Select your region',
    selectInterests: 'Select your interests',
    generateQuest: 'Generate Quest',
    currentQuest: 'Current Quest',
    completeStep: 'Complete Step',
    completed: 'Completed',
    estimatedTime: 'Estimated time',
    minutes: 'minutes',
    difficulty: 'Difficulty',
    easy: 'Easy',
    medium: 'Medium',
    hard: 'Hard',
    interests: {
      gastronomy: 'Gastronomy',
      art: 'Art',
      history: 'History',
      nature: 'Nature',
      nightlife: 'Nightlife',
      shopping: 'Shopping',
      adventure: 'Adventure',
      culture: 'Culture'
    },
    regions: {
      este: 'Punta del Este',
      diablo: 'Punta del Diablo / Rocha'
    },
    generating: 'Generating your personalized quest...',
    backToHome: 'Back to home',
    openInMaps: 'Open in Maps',
    questCompleted: 'Quest completed!',
    congratulations: 'Congratulations! You have completed your adventure.',
    startNewQuest: 'Start new Quest'
  },
  pt: {
    welcome: 'Bem-vindo ao Punta Quests',
    tagline: 'Do Leste ao Diabo',
    selectRegion: 'Selecione sua região',
    selectInterests: 'Selecione seus interesses',
    generateQuest: 'Gerar Quest',
    currentQuest: 'Quest Atual',
    completeStep: 'Completar Passo',
    completed: 'Completado',
    estimatedTime: 'Tempo estimado',
    minutes: 'minutos',
    difficulty: 'Dificuldade',
    easy: 'Fácil',
    medium: 'Médio',
    hard: 'Difícil',
    interests: {
      gastronomy: 'Gastronomia',
      art: 'Arte',
      history: 'História',
      nature: 'Natureza',
      nightlife: 'Vida Noturna',
      shopping: 'Compras',
      adventure: 'Aventura',
      culture: 'Cultura'
    },
    regions: {
      este: 'Punta del Este',
      diablo: 'Punta del Diablo / Rocha'
    },
    generating: 'Gerando sua quest personalizada...',
    backToHome: 'Voltar ao início',
    openInMaps: 'Abrir no Maps',
    questCompleted: 'Quest completada!',
    congratulations: 'Parabéns! Você completou sua aventura.',
    startNewQuest: 'Começar nova Quest'
  }
};

export const useTranslation = (language: 'es' | 'en' | 'pt') => {
  const t = (key: string) => {
    const keys = key.split('.');
    let value: any = translations[language];
    
    for (const k of keys) {
      value = value?.[k];
    }
    
    return value || key;
  };

  return { t };
};