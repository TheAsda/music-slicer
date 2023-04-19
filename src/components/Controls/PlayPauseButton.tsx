import { Button } from '@chakra-ui/react';
import { useAtom } from 'jotai';
import { isPlayingAtom } from '../../atoms';

export const PlayPauseButton = () => {
  const [isPlaying, setIsPlaying] = useAtom(isPlayingAtom);

  const toggle = () => {
    setIsPlaying((s) => !s);
  };

  return <Button onClick={toggle}>{isPlaying ? 'Pause' : 'Play'}</Button>;
};
