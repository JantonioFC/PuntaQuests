import React, { createContext, useContext, useReducer, ReactNode } from 'react';
import { Quest, Region, UserInterests } from '../types';

interface AppState {
  currentLanguage: 'es' | 'en' | 'pt';
  selectedRegion: Region | null;
  userInterests: UserInterests;
  currentQuest: Quest | null;
  isGeneratingQuest: boolean;
  user: any;
}

type AppAction =
  | { type: 'SET_LANGUAGE'; payload: 'es' | 'en' | 'pt' }
  | { type: 'SET_REGION'; payload: Region | null }
  | { type: 'SET_INTERESTS'; payload: UserInterests }
  | { type: 'SET_QUEST'; payload: Quest | null }
  | { type: 'SET_GENERATING'; payload: boolean }
  | { type: 'SET_USER'; payload: any }
  | { type: 'COMPLETE_STEP'; payload: string };

const initialState: AppState = {
  currentLanguage: 'es',
  selectedRegion: null,
  userInterests: {
    gastronomy: false,
    art: false,
    history: false,
    nature: false,
    nightlife: false,
    shopping: false,
    adventure: false,
    culture: false,
  },
  currentQuest: null,
  isGeneratingQuest: false,
  user: null,
};

function appReducer(state: AppState, action: AppAction): AppState {
  switch (action.type) {
    case 'SET_LANGUAGE':
      return { ...state, currentLanguage: action.payload };
    case 'SET_REGION':
      return { ...state, selectedRegion: action.payload };
    case 'SET_INTERESTS':
      return { ...state, userInterests: action.payload };
    case 'SET_QUEST':
      return { ...state, currentQuest: action.payload };
    case 'SET_GENERATING':
      return { ...state, isGeneratingQuest: action.payload };
    case 'SET_USER':
      return { ...state, user: action.payload };
    case 'COMPLETE_STEP':
      if (!state.currentQuest) return state;
      const updatedQuest = {
        ...state.currentQuest,
        steps: state.currentQuest.steps.map(step =>
          step.id === action.payload ? { ...step, completed: true } : step
        ),
      };
      return { ...state, currentQuest: updatedQuest };
    default:
      return state;
  }
}

const AppContext = createContext<{
  state: AppState;
  dispatch: React.Dispatch<AppAction>;
} | null>(null);

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within AppProvider');
  }
  return context;
};

interface AppProviderProps {
  children: ReactNode;
}

export const AppProvider: React.FC<AppProviderProps> = ({ children }) => {
  const [state, dispatch] = useReducer(appReducer, initialState);

  return (
    <AppContext.Provider value={{ state, dispatch }}>
      {children}
    </AppContext.Provider>
  );
};