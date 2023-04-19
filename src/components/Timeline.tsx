import { Grid, Spacer, Text } from '@chakra-ui/react';
import { useAtom, useAtomValue } from 'jotai';
import { audioAtom, currentTimeAtom, totalTimeAtom } from '../atoms';
import { formatTime } from '../utils/time';
import { Slider } from './Slider/Slider';
import { useState } from 'react';

export const Timeline = () => {
  const [currentTime, setCurrentTime] = useAtom(currentTimeAtom);
  const totalTime = useAtomValue(totalTimeAtom);
  const audio = useAtomValue(audioAtom);

  const [isDragging, setIsDragging] = useState(false);
  const [sliderTime, setSliderTime] = useState(0);

  return (
    <Grid gridTemplateRows="auto auto" gridTemplateColumns="100%" width="200px">
      <Slider
        value={(currentTime / Math.max(totalTime, 1)) * 100}
        onDragStart={() => {
          setIsDragging(true);
          setSliderTime(currentTime);
        }}
        onDrag={(value) => {
          setSliderTime(value);
        }}
        onDragEnd={(value) => {
          console.log(value);
          if (audio) {
            audio.currentTime = (value / 100) * totalTime;
            setCurrentTime(audio.currentTime);
          }
          setIsDragging(false);
        }}
      />
      <Grid gridTemplateColumns="auto 1fr auto" width="100%">
        <Text>{formatTime(isDragging ? sliderTime : currentTime)}</Text>
        <Spacer />
        <Text>{formatTime(totalTime)}</Text>
      </Grid>
    </Grid>
  );
};
