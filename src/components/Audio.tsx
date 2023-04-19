import { useAtom, useAtomValue, useSetAtom } from 'jotai';
import { useCallback, useEffect, useRef } from 'react';
import {
  audioAtom,
  currentTimeAtom,
  fileUrlAtom,
  isPlayingAtom,
  totalTimeAtom,
} from '../atoms';

export const Audio = () => {
  const fileUrl = useAtomValue(fileUrlAtom);

  const [audio, setAudio] = useAtom(audioAtom);

  const [isPlaying, setIsPlaying] = useAtom(isPlayingAtom);
  const setCurrentTime = useSetAtom(currentTimeAtom);
  const setTotalTime = useSetAtom(totalTimeAtom);

  const updateTimeRef = useRef<number>();
  const updateTime = useCallback(() => {
    const currentTime = audio?.currentTime;
    if (currentTime === undefined) {
      return;
    }
    setCurrentTime(currentTime);
    updateTimeRef.current = requestAnimationFrame(updateTime);
  }, [audio]);

  useEffect(() => {
    if (isPlaying) {
      audio?.play();
    } else {
      audio?.pause();
    }
    updateTimeRef.current = requestAnimationFrame(updateTime);
  }, [audio, isPlaying, updateTime]);

  useEffect(() => {
    const playHandler = () => {
      setIsPlaying(true);
    };
    const pauseHandler = () => {
      setIsPlaying(false);
    };
    const loadHandler = () => {
      if (!audio) {
        return;
      }
      const totalTime = audio.duration;
      if (totalTime === undefined) {
        return;
      }
      setTotalTime(totalTime);
    };

    audio?.addEventListener('play', playHandler);
    audio?.addEventListener('pause', pauseHandler);
    audio?.addEventListener('loadedmetadata', loadHandler);

    return () => {
      audio?.removeEventListener('play', playHandler);
      audio?.removeEventListener('pause', pauseHandler);
      audio?.removeEventListener('loadedmetadata', loadHandler);
    };
  }, [audio]);

  return <audio src={fileUrl} ref={(ref) => setAudio(ref)} />;
};
