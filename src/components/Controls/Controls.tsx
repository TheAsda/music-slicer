import { ButtonGroup } from '@chakra-ui/react';
import { AddSectionButton } from './AddSectionButton';
import { PlayPauseButton } from './PlayPauseButton';

export const Controls = () => {
  return (
    <ButtonGroup>
      <PlayPauseButton />
      <AddSectionButton />
    </ButtonGroup>
  );
};
