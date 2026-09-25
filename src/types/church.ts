export interface ChurchEvent {
  id: string;
  title: string;
  category: 'culto' | 'juventude' | 'mulheres' | 'criancas' | 'especial' | 'missoes';
  date: string; // ISO format or YYYY-MM-DD
  time: string; // "19:30"
  dayOfWeek: string; // "Terça-feira", "Domingo", etc.
  description: string;
  location: string;
  speaker?: string;
  theme?: string;
  bannerImage?: string;
  isSpecial?: boolean;
  requiresRegistration?: boolean;
}

export interface LiveBroadcast {
  id: string;
  title: string;
  preacher: string;
  theme: string;
  status: 'live' | 'upcoming' | 'recorded';
  scheduledTime?: string;
  videoUrl?: string; // YouTube or video stream
  thumbnail: string;
  date: string;
  views: number;
  duration?: string;
  bibleVerse?: {
    passage: string;
    text: string;
  };
  sermonPoints?: string[];
}

export interface LiveChatMessage {
  id: string;
  userName: string;
  avatarSeed: string;
  message: string;
  timestamp: string;
  isPastoral?: boolean;
  city?: string;
}

export interface PrayerRequest {
  id: string;
  authorName: string;
  city: string;
  category: 'saude' | 'familia' | 'espiritual' | 'financeiro' | 'urgente' | 'outro';
  request: string;
  date: string;
  prayersCount: number;
  isPrivate: boolean;
}

export interface Ministry {
  id: string;
  name: string;
  subtitle: string;
  description: string;
  leader: string;
  meetingTime: string;
  image: string;
  color: string;
}
