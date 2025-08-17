export interface User {
  id: string;
  email: string;
  preferred_language: 'es' | 'en' | 'pt';
  created_at: string;
}

export interface Quest {
  id: string;
  title: string;
  description: string;
  region: 'este' | 'diablo';
  difficulty: 'easy' | 'medium' | 'hard';
  estimated_duration: number; // in minutes
  interests: string[];
  steps: QuestStep[];
  language: 'es' | 'en' | 'pt';
  created_at: string;
}

export interface QuestStep {
  id: string;
  order: number;
  title: string;
  description: string;
  action: string;
  location: Location;
  completed: boolean;
  image_url?: string;
}

export interface Location {
  lat: number;
  lng: number;
  name: string;
  address?: string;
  place_id?: string;
}

export interface UserInterests {
  gastronomy: boolean;
  art: boolean;
  history: boolean;
  nature: boolean;
  nightlife: boolean;
  shopping: boolean;
  adventure: boolean;
  culture: boolean;
}

export interface Region {
  id: 'este' | 'diablo';
  name: string;
  description: string;
  background_image: string;
  style: 'luxury' | 'adventure';
}