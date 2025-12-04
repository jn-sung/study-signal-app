export interface Notebook {
  id: string;
  title: string;
  coverColor: string;
  lastEdited: string;
}

export interface Stamp {
  id: number;
  achieved: boolean;
  date?: string;
}

export enum SoundType {
  RAIN = 'RAIN',
  FIRE = 'FIRE',
  CAFE = 'CAFE',
  LIBRARY = 'LIBRARY'
}

export interface SoundTrack {
  type: SoundType;
  label: string;
  icon: string;
}

export type ModalType = 'NONE' | 'MAP' | 'SOUND' | 'CREATE_NOTEBOOK';

export interface UserLocation {
  id: string;
  x: number;
  y: number;
  isActive: boolean;
  message?: string;
}
