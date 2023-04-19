import { Grid, Spacer, Text } from '@chakra-ui/react';
import { useAtom, useAtomValue } from 'jotai';
import { audioAtom, currentTimeAtom, totalTimeAtom } from '../atoms';
import { formatTime } from '../utils/time';
import { MouseEventHandler, useEffect, useRef, useState } from 'react';
import { clamp } from '../utils/clamp';

export const Timeline = () => {
  const [currentTime, setCurrentTime] = useAtom(currentTimeAtom);
  const totalTime = useAtomValue(totalTimeAtom);
  const circleRef = useRef<SVGCircleElement>(null);
  const timelineRef = useRef<SVGPathElement>(null);
  const audio = useAtomValue(audioAtom);

  const [isDragging, setIsDragging] = useState(false);

  const startX = useRef(0);
  const startTime = useRef(0);
  const [deltaTime, setDeltaTime] = useState(0);

  const startDrag: MouseEventHandler = (e) => {
    startX.current = e.clientX;
    startTime.current = currentTime;
    setIsDragging(true);
    console.log('Drag started');
  };

  const deltaTimeRef = useRef(deltaTime);
  deltaTimeRef.current = deltaTime;

  useEffect(() => {
    if (!isDragging) {
      return;
    }

    const onMouseMove = (e: MouseEvent) => {
      const total = timelineRef.current?.getBoundingClientRect().width;
      if (!total) {
        return;
      }
      const delta = e.clientX - startX.current;
      setDeltaTime((delta / total) * totalTime);
    };

    const onMouseUp = () => {
      if (audio) {
        audio.currentTime = startTime.current + deltaTimeRef.current;
        setCurrentTime(audio.currentTime);
      }
      setDeltaTime(0);
      setIsDragging(false);
    };

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
    document.body.style.userSelect = 'none';

    return () => {
      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
      document.body.style.userSelect = 'initial';
    };
  }, [isDragging, totalTime]);

  const displayedTime = clamp(
    isDragging ? startTime.current + deltaTime : currentTime,
    0,
    totalTime
  );
  const cx = (displayedTime / Math.max(totalTime, 1)) * 60;

  return (
    <Grid gridTemplateRows="auto auto" gridTemplateColumns="100%" width="200px">
      <svg viewBox="0 0 60 5">
        <path
          style={{
            fill: '#434543',
            fillOpacity: '.228522',
          }}
          d="M.5 1.775h59v1.449H.5z"
          ref={timelineRef}
        />
        <circle
          style={{
            fill: '#434549',
            stroke: '#000',
            strokeWidth: '.465',
            cursor: 'pointer',
          }}
          cx={cx.toString()}
          cy="2.5"
          r="2"
          ref={circleRef}
          onMouseDown={startDrag}
        />
      </svg>
      <Grid gridTemplateColumns="auto 1fr auto" width="100%">
        <Text>{formatTime(displayedTime)}</Text>
        <Spacer />
        <Text>{formatTime(totalTime)}</Text>
      </Grid>
    </Grid>
  );
};
