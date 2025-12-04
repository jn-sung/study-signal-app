import { Notebook, SoundType, SoundTrack, Stamp } from './types';

export const INITIAL_NOTEBOOKS: Notebook[] = [
  {
    id: '1',
    title: '확률과 통계',
    coverColor: 'bg-blue-200',
    lastEdited: '2023-10-25',
  },
  {
    id: '2',
    title: '인공지능',
    coverColor: 'bg-indigo-200',
    lastEdited: '2023-10-26',
  },
];

export const INITIAL_STAMPS: Stamp[] = Array.from({ length: 10 }, (_, i) => ({
  id: i + 1,
  achieved: i < 3, // Mocking first 3 as achieved
  date: i < 3 ? `2023-10-${24 + i}` : undefined,
}));

export const SOUND_TRACKS: SoundTrack[] = [
  { type: SoundType.RAIN, label: '빗소리', icon: '🌧️' },
  { type: SoundType.FIRE, label: '장작 소리', icon: '🔥' },
  { type: SoundType.CAFE, label: '카페 소음', icon: '☕' },
  { type: SoundType.LIBRARY, label: '도서관', icon: '📚' },
];

export const QUOTES = [
  "작은 점이 모여 선이 됩니다.",
  "오늘 켠 불빛이 내일의 별이 됩니다.",
  "혼자가 아니에요, 우리가 함께 공부하고 있습니다.",
];