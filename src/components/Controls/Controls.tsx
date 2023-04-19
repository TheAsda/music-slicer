import { Button, Flex } from '@chakra-ui/react';
import { PlayPauseButton } from './PlayPauseButton';
import { AddSectionButton } from './AddSectionButton';

export const Controls = () => {
  return (
    <Flex>
      <Button>Repeat</Button>
      <PlayPauseButton />
      <AddSectionButton />
    </Flex>
  );
};
