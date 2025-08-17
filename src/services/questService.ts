import { Quest, UserInterests, Location } from '../types';

interface GenerateQuestParams {
  region: 'este' | 'diablo';
  interests: UserInterests;
  language: 'es' | 'en' | 'pt';
}

// Mock AI Quest Generation Service
export const generateQuest = async (params: GenerateQuestParams): Promise<Quest> => {
  // Simulate API call delay
  await new Promise(resolve => setTimeout(resolve, 2000));

  const selectedInterests = Object.keys(params.interests)
    .filter(key => params.interests[key as keyof UserInterests]);

  // Mock quest data based on region
  const questData = params.region === 'este' 
    ? generateEsteQuest(selectedInterests, params.language)
    : generateDiabloQuest(selectedInterests, params.language);

  return {
    id: `quest-${Date.now()}`,
    ...questData,
    region: params.region,
    interests: selectedInterests,
    language: params.language,
    created_at: new Date().toISOString()
  };
};

const generateEsteQuest = (interests: string[], language: 'es' | 'en' | 'pt') => {
  const questTitles = {
    es: "El Secreto del Glamour Perdido",
    en: "The Secret of Lost Glamour",
    pt: "O Segredo do Glamour Perdido"
  };

  const questDescriptions = {
    es: "Una misteriosa leyenda urbana habla de un tesoro escondido en los rincones más elegantes de Punta del Este. Sigue las pistas a través de lugares icónicos y descubre secretos que solo los locales conocen.",
    en: "A mysterious urban legend speaks of a treasure hidden in the most elegant corners of Punta del Este. Follow the clues through iconic places and discover secrets that only locals know.",
    pt: "Uma lenda urbana misteriosa fala de um tesouro escondido nos cantos mais elegantes de Punta del Este. Siga as pistas através de lugares icônicos e descubra segredos que apenas os locais conhecem."
  };

  const locations: Location[] = [
    { lat: -34.9648, lng: -54.9441, name: "La Mano", address: "Parada 1, Punta del Este" },
    { lat: -34.9677, lng: -54.9498, name: "Casapueblo", address: "Punta Ballena" },
    { lat: -34.9591, lng: -54.8965, name: "Puerto de Punta del Este", address: "Puerto" },
    { lat: -34.8913, lng: -54.9441, name: "José Ignacio", address: "José Ignacio" }
  ];

  return {
    title: questTitles[language],
    description: questDescriptions[language],
    difficulty: 'medium' as const,
    estimated_duration: 180,
    steps: [
      {
        id: 'step-1',
        order: 1,
        title: language === 'es' ? "El Punto de Partida Icónico" : language === 'en' ? "The Iconic Starting Point" : "O Ponto de Partida Icônico",
        description: language === 'es' ? "Dirígete a La Mano, el símbolo más reconocible de Punta del Este. Toca la escultura y observa las coordenadas grabadas en su base." : 
                     language === 'en' ? "Head to La Mano, the most recognizable symbol of Punta del Este. Touch the sculpture and observe the coordinates engraved on its base." :
                     "Dirija-se para La Mano, o símbolo mais reconhecível de Punta del Este. Toque a escultura e observe as coordenadas gravadas em sua base.",
        action: language === 'es' ? "Fotografía tu mano junto a La Mano" : language === 'en' ? "Photograph your hand next to La Mano" : "Fotografe sua mão ao lado de La Mano",
        location: locations[0],
        completed: false
      },
      {
        id: 'step-2',
        order: 2,
        title: language === 'es' ? "El Palacio del Artista" : language === 'en' ? "The Artist's Palace" : "O Palácio do Artista",
        description: language === 'es' ? "Viaja a Casapueblo, la obra maestra de Carlos Páez Vilaró. Busca el mirador secreto donde el artista solía contemplar los atardeceres." : 
                     language === 'en' ? "Travel to Casapueblo, Carlos Páez Vilaró's masterpiece. Look for the secret viewpoint where the artist used to contemplate sunsets." :
                     "Viaje para Casapueblo, a obra-prima de Carlos Páez Vilaró. Procure o miradouro secreto onde o artista costumava contemplar os pores do sol.",
        action: language === 'es' ? "Encuentra y fotografía la firma del artista en el mirador" : language === 'en' ? "Find and photograph the artist's signature at the viewpoint" : "Encontre e fotografe a assinatura do artista no miradouro",
        location: locations[1],
        completed: false
      }
    ]
  };
};

const generateDiabloQuest = (interests: string[], language: 'es' | 'en' | 'pt') => {
  const questTitles = {
    es: "Los Guardianes de la Costa Salvaje",
    en: "Guardians of the Wild Coast",
    pt: "Os Guardiões da Costa Selvagem"
  };

  const questDescriptions = {
    es: "Dicen que los antiguos pescadores dejaron mensajes secretos en las rocas de la costa. Emprende una aventura por los lugares más auténticos de Rocha y descubre los secretos que el océano susurra al viento.",
    en: "They say that ancient fishermen left secret messages in the coastal rocks. Embark on an adventure through the most authentic places in Rocha and discover the secrets that the ocean whispers to the wind.",
    pt: "Dizem que os pescadores antigos deixaram mensagens secretas nas rochas da costa. Embarque numa aventura pelos lugares mais autênticos de Rocha e descubra os segredos que o oceano sussurra ao vento."
  };

  const locations: Location[] = [
    { lat: -34.0553, lng: -53.5461, name: "Cabo Polonio", address: "Cabo Polonio" },
    { lat: -33.9467, lng: -53.4914, name: "Punta del Diablo", address: "Punta del Diablo" },
    { lat: -34.2764, lng: -53.7769, name: "Santa Teresa", address: "Parque Nacional Santa Teresa" }
  ];

  return {
    title: questTitles[language],
    description: questDescriptions[language],
    difficulty: 'hard' as const,
    estimated_duration: 240,
    steps: [
      {
        id: 'step-1',
        order: 1,
        title: language === 'es' ? "El Faro de los Secretos" : language === 'en' ? "The Lighthouse of Secrets" : "O Farol dos Segredos",
        description: language === 'es' ? "Llega a Cabo Polonio cuando el sol esté bajo. Sube al faro histórico y busca las marcas dejadas por los antiguos navegantes." : 
                     language === 'en' ? "Arrive at Cabo Polonio when the sun is low. Climb the historic lighthouse and look for marks left by ancient navigators." :
                     "Chegue a Cabo Polonio quando o sol estiver baixo. Suba no farol histórico e procure as marcas deixadas pelos navegadores antigos.",
        action: language === 'es' ? "Cuenta las focas desde la cima del faro" : language === 'en' ? "Count the seals from the top of the lighthouse" : "Conte as focas do topo do farol",
        location: locations[0],
        completed: false
      }
    ]
  };
};