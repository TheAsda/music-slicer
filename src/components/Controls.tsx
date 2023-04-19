import { Button, Flex } from '@chakra-ui/react';
import { useAtom } from 'jotai';
import { isPlayingAtom } from '../atoms';

export const Controls = () => {
  const [isPlaying, setIsPlaying] = useAtom(isPlayingAtom);

  const toggle = () => {
    setIsPlaying((s) => !s);
  };

  return (
    <Flex>
      <Button>Repeat</Button>
      <Button onClick={toggle}>{isPlaying ? 'Pause' : 'Play'}</Button>
      <Button>Add</Button>
    </Flex>
  );
};
