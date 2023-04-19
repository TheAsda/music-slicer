import { atom } from 'jotai';

export const fileUrlAtom = atom<string | undefined>(undefined);

export const isPlayingAtom = atom(false);
export const currentTimeAtom = atom(0);
export const totalTimeAtom = atom(0);
export const metadataAtom = atom<{ artist?: string; title?: string }>({});
