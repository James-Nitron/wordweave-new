export type Plan = "FREE" | "PREMIUM";

export interface DailyWord {
  id: string;
  userId: string;
  word: string;
  translations: string[];
  language: string;
  date: Date;
}

export interface History {
  id: string;
  userId: string;
  word: string;
  translations: string[];
  language: string;
  seenAt: Date;
}

export interface User {
  id: string;
  plan: Plan;
  createdAt: Date;
  color: string;
  languages: string[];
  selectedLanguage: string;
  isNewUser: boolean;
  dailyWord?: DailyWord | null;
  history: History[];
}
