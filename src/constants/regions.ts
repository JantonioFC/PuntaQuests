import { Region } from '../types';

export const REGIONS: Region[] = [
  {
    id: 'este',
    name: 'Punta del Este',
    description: 'Del glamour sofisticado al descubrimiento chic',
    background_image: 'https://images.pexels.com/photos/1174732/pexels-photo-1174732.jpeg?auto=compress&cs=tinysrgb&w=1920&h=1080&fit=crop',
    style: 'luxury'
  },
  {
    id: 'diablo',
    name: 'Punta del Diablo / Rocha',
    description: 'Aventura bohemia y conexión natural',
    background_image: 'https://images.pexels.com/photos/1020016/pexels-photo-1020016.jpeg?auto=compress&cs=tinysrgb&w=1920&h=1080&fit=crop',
    style: 'adventure'
  }
];

export const INTERESTS_OPTIONS = [
  'gastronomy',
  'art',
  'history',
  'nature',
  'nightlife',
  'shopping',
  'adventure',
  'culture'
] as const;