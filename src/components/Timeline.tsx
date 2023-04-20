import { Grid, Spacer, Text } from '@chakra-ui/react';
import { useAtom, useAtomValue } from 'jotai';
import {
  audioAtom,
  currentTimeAtom,
  enabledSectionIdAtom,
  sectionsAtom,
  totalTimeAtom,
} from '../atoms';
import { formatTime } from '../utils/time';
import { Slider } from './Slider/Slider';
import { useEffect, useMemo, useState } from 'react';
import { percent } from '../utils/math';

export const Timeline = () => {
  const [currentTime, setCurrentTime] = useAtom(currentTimeAtom);
  const totalTime = useAtomValue(totalTimeAtom);
  const audio = useAtomValue(audioAtom);
  const sections = useAtomValue(sectionsAtom);
  const enabledSectionId = useAtomValue(enabledSectionIdAtom);

  const [isDragging, setIsDragging] = useState(false);
  const [sliderTime, setSliderTime] = useState(0);

  const rewind = (time: number) => {
    if (audio) {
      audio.currentTime = (time / 100) * totalTime;
    }
    setCurrentTime(time);
  };

  const enabledSection = useMemo(
    () => sections.find((s) => s.id === enabledSectionId),
    [sections, enabledSectionId]
  );

  useEffect(() => {
    if (!enabledSection) {
      return;
    }
    if (currentTime < enabledSection.start) {
      rewind(enabledSection.start);
      return;
    }
    if (currentTime > enabledSection.end) {
      rewind(enabledSection.start);
      return;
    }
  }, [enabledSection, currentTime]);

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
          rewind(value);
          setIsDragging(false);
        }}
        section={
          enabledSection
            ? {
                start: percent(enabledSection.start, totalTime),
                end: percent(enabledSection.end, totalTime),
                color: enabledSection.color,
              }
            : undefined
        }
      />
      <Grid gridTemplateColumns="auto 1fr auto" width="100%">
        <Text>{formatTime(isDragging ? sliderTime : currentTime)}</Text>
        <Spacer />
        <Text>{formatTime(totalTime)}</Text>
      </Grid>
    </Grid>
  );
};
