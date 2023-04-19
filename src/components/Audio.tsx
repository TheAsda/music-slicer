import { useAtom, useAtomValue, useSetAtom } from 'jotai';
import { useCallback, useEffect, useRef } from 'react';
import {
  currentTimeAtom,
  fileUrlAtom,
  isPlayingAtom,
  totalTimeAtom,
} from '../atoms';

export const Audio = () => {
  const fileUrl = useAtomValue(fileUrlAtom);

  const ref = useRef<HTMLAudioElement>(null);

  const [isPlaying, setIsPlaying] = useAtom(isPlayingAtom);
  const setCurrentTime = useSetAtom(currentTimeAtom);
  const setTotalTime = useSetAtom(totalTimeAtom);

  const updateTimeRef = useRef<number>();
  const updateTime = useCallback(() => {
    const currentTime = ref.current?.currentTime;
    if (!currentTime) {
      return;
    }
    setCurrentTime(currentTime);
    updateTimeRef.current = requestAnimationFrame(updateTime);
  }, []);

  useEffect(() => {
    if (isPlaying) {
      ref.current?.play();
      updateTimeRef.current = requestAnimationFrame(updateTime);
    } else {
      ref.current?.pause();
      if (updateTimeRef.current !== undefined) {
        cancelAnimationFrame(updateTimeRef.current);
      }
    }
  }, [isPlaying, updateTime]);

  useEffect(() => {
    const playHandler = () => {
      setIsPlaying(true);
    };
    const pauseHandler = () => {
      setIsPlaying(false);
    };
    const loadHandler = () => {
      if (!ref.current) {
        return;
      }
      const totalTime = ref.current.duration;
      if (totalTime === undefined) {
        return;
      }
      setTotalTime(totalTime);
    };

    ref.current?.addEventListener('play', playHandler);
    ref.current?.addEventListener('pause', pauseHandler);
    ref.current?.addEventListener('loadedmetadata', loadHandler);

    return () => {
      ref.current?.removeEventListener('play', playHandler);
      ref.current?.removeEventListener('pause', pauseHandler);
      ref.current?.removeEventListener('loadedmetadata', loadHandler);
    };
  }, []);

  return <audio src={fileUrl} ref={ref} />;
};
