import React, { useEffect } from 'react';
import { AppProvider, useApp } from './contexts/AppContext';
import { BackgroundImage } from './components/BackgroundImage';
import { LanguageSelector } from './components/LanguageSelector';
import { Header } from './components/Header';
import { RegionSelector } from './components/RegionSelector';
import { InterestsSelector } from './components/InterestsSelector';
import { QuestGenerator } from './components/QuestGenerator';
import { QuestView } from './components/QuestView';

const AppContent: React.FC = () => {
  const { state } = useApp();

  // Determine current screen based on app state
  const getCurrentScreen = () => {
    if (state.currentQuest) {
      return 'quest';
    }
    if (state.selectedRegion && Object.values(state.userInterests).some(Boolean)) {
      return 'generator';
    }
    if (state.selectedRegion) {
      return 'interests';
    }
    return 'region';
  };

  const currentScreen = getCurrentScreen();

  return (
    <div className="min-h-screen relative overflow-hidden">
      <BackgroundImage />
      <LanguageSelector />
      
      <div className="relative z-10 min-h-screen flex flex-col">
        {currentScreen !== 'quest' && <Header />}
        
        <main className="flex-1 flex items-center justify-center py-8">
          <div className="w-full">
            {currentScreen === 'region' && <RegionSelector />}
            {currentScreen === 'interests' && <InterestsSelector />}
            {currentScreen === 'generator' && <QuestGenerator />}
            {currentScreen === 'quest' && <QuestView />}
          </div>
        </main>

        {currentScreen !== 'quest' && (
          <footer className="text-center py-6 text-white/60 text-sm">
            <p>© 2025 Punta Quests - Descubre Uruguay de una nueva forma</p>
          </footer>
        )}
      </div>
    </div>
  );
};

function App() {
  return (
    <AppProvider>
      <AppContent />
    </AppProvider>
  );
}

export default App;