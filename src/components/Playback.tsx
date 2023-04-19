import { Box } from '@chakra-ui/react';
import { Controls } from './Controls';
import { Timeline } from './Timeline';
import { Audio } from './Audio';
import { Title } from './Metadata';

export const Playback = () => {
  return (
    <Box>
      <Title />
      <Timeline />
      <Controls />
      <Audio />
    </Box>
  );
};
