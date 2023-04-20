import { VStack } from '@chakra-ui/react';
import { Audio } from './Audio';
import { Controls } from './Controls/Controls';
import { Title } from './Metadata';
import { SectionsList } from './SectionsList';
import { Timeline } from './Timeline';

export const Playback = () => {
  return (
    <VStack>
      <Title />
      <Timeline />
      <Controls />
      <Audio />
      <SectionsList />
    </VStack>
  );
};
