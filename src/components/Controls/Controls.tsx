import { Flex } from '@chakra-ui/react';
import { AddSectionButton } from './AddSectionButton';
import { PlayPauseButton } from './PlayPauseButton';

export const Controls = () => {
  return (
    <Flex>
      <PlayPauseButton />
      <AddSectionButton />
    </Flex>
  );
};
