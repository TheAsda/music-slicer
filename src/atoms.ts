import { atom } from 'jotai';

export const fileUrlAtom = atom<string | undefined>(undefined);
export const isPlayingAtom = atom(false);
export const currentTimeAtom = atom(0);
export const totalTimeAtom = atom(0);
export const metadataAtom = atom<{
  artist?: string;
  title?: string;
  fileName: string;
  id: string;
}>({ fileName: 'File', id: 'id' });
export const audioAtom = atom<HTMLAudioElement | null>(null);

export interface Section {
  start: number;
  end: number;
  name: string;
  color: string;
  id: string;
}

export const sectionsAtom = atom<Section[]>([]);
export const enabledSectionIdAtom = atom<string | undefined>(undefined);
