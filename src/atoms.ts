import { atom } from 'jotai';

export const fileUrlAtom = atom<string | undefined>(undefined);
export const isPlayingAtom = atom(false);
export const currentTimeAtom = atom(0);
export const totalTimeAtom = atom(0);
export const metadataAtom = atom<{ artist?: string; title?: string }>({});
export const audioAtom = atom<HTMLAudioElement | null>(null);

export interface Section {
  start: number;
  end: number;
  name: string;
}

export const sectionsAtom = atom<Section[]>([]);
