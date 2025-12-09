export interface Game {
  id: string;
  name: string;
  description: string;
  shortDescription: string;
  icon: string;
  color: string;
  gradient: string;
  features: string[];
  difficulty: 'Easy' | 'Medium' | 'Hard';
  popularity: number;
  isNew?: boolean;
  isFeatured?: boolean;
}

export interface GameCategory {
  id: string;
  name: string;
  games: Game[];
}

export interface PlatformFeature {
  id: string;
  title: string;
  description: string;
  icon: string;
  color: string;
}
