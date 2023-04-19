import { Grid, Spacer, Text } from '@chakra-ui/react';
import { useAtomValue } from 'jotai';
import { currentTimeAtom, totalTimeAtom } from '../atoms';
import { formatTime } from '../utils/time';

export const Timeline = () => {
  const currentTime = useAtomValue(currentTimeAtom);
  const totalTime = useAtomValue(totalTimeAtom);

  return (
    <Grid gridTemplateRows="auto auto" gridTemplateColumns="100%" width="200px">
      <svg></svg>
      <Grid gridTemplateColumns="auto 1fr auto" width="100%">
        <Text>{formatTime(currentTime)}</Text>
        <Spacer />
        <Text>{formatTime(totalTime)}</Text>
      </Grid>
    </Grid>
  );
};
