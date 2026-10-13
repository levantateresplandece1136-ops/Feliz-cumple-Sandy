export type ViewTab = 'cinematic' | 'acrostic' | 'cake' | 'memories' | 'dedication' | 'game';

export interface Episode {
  id: number;
  numberLabel: string;
  letter: string;
  letterWord: string;
  title: string;
  subtitle?: string;
  mainLines: string[];
  quoteVerse?: {
    text: string;
    reference: string;
  };
  moonPhaseLabel: string;
  shadowOffsetX: string; // e.g., "-78%", "-55%", "34%", "78%"
  audioCue: 'heartbeat' | 'melody' | 'chime' | 'piano' | 'celebration';
  highlightText?: string;
}

export interface AcrosticLetter {
  letter: string;
  word: string;
  meaning: string;
  description: string;
  scripture: {
    text: string;
    reference: string;
  };
  attributes: string[];
}

export interface BirthdayWish {
  id: string;
  author: string;
  relationship: string;
  text: string;
  createdAt: string;
  candleColor: string;
  isPreloaded?: boolean;
}

export interface MemoryItem {
  id: string;
  title: string;
  period: string;
  location: string;
  description: string;
  quote?: string;
  category: 'infancia' | 'musica' | 'familia' | 'maternidad' | 'docencia';
  iconName: string;
}

export interface GameLevel {
  id: number;
  stageName: string;
  title: string;
  subtitle: string;
  iconName: string;
  themeColor: string;
  recognitionTitle: string;
  recognitionText: string;
  quoteVerse: {
    text: string;
    reference: string;
  };
  badgeUnlocked: string;
  badgeDescription: string;
  badgeIcon: string;
  mechanicType: 'collect_stars' | 'melody_sequence' | 'courage_path' | 'love_rain' | 'wisdom_connect' | 'final_trophy';
  instructions: string;
}
