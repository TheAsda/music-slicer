import { Box } from '@chakra-ui/react';
import { Controls } from './Controls/Controls';
import { Timeline } from './Timeline';
import { Audio } from './Audio';
import { Title } from './Metadata';
import { SectionsList } from './SectionsList';

export const Playback = () => {
  return (
    <Box>
      <Title />
      <Timeline />
      <Controls />
      <Audio />
      <SectionsList />
    </Box>
  );
};
