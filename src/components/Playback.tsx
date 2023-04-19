import { Box } from '@chakra-ui/react';
import { Controls } from './Controls';
import { Timeline } from './Timeline';
import { Audio } from './Audio';

export const Playback = () => {
  return (
    <Box>
      <Timeline />
      <Controls />
      <Audio />
    </Box>
  );
};
