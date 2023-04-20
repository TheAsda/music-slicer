import {
  MouseEventHandler,
  TouchEventHandler,
  useEffect,
  useRef,
  useState,
} from 'react';
import { clamp } from '../../utils/math';
import { SliderHandle } from './SliderHandle';
import { SliderLine } from './SliderLine';
import { getClientX } from '../../utils/event';

export interface SliderSection {
  start: number;
  end: number;
  color: string;
}

export interface SliderProps {
  /** Value from 0 to 100 */
  value: number;
  onDragStart?: () => void;
  onDragEnd?: (value: number) => void;
  onDrag?: (value: number) => void;
  section?: SliderSection;
}

export const Slider = (props: SliderProps) => {
  const { value, onDragStart, onDragEnd, onDrag, section } = props;

  const circleRef = useRef<SVGCircleElement>(null);
  const lineRef = useRef<SVGPathElement>(null);

  const [isDragging, setIsDragging] = useState(false);

  const startX = useRef(0);
  const startValue = useRef(0);
  const [totalX, setTotalX] = useState(1);
  const [delta, setDelta] = useState(0);

  const startDrag: MouseEventHandler & TouchEventHandler = (e) => {
    startX.current = 'clientX' in e ? e.clientX : e.touches[0].clientX;
    startValue.current = value;
    setIsDragging(true);
    onDragStart?.();
  };

  const deltaRef = useRef(delta);
  deltaRef.current = delta;

  const displayedValue = clamp(
    isDragging ? startValue.current + delta : value,
    0,
    100
  );

  useEffect(() => {
    if (!isDragging) {
      return;
    }

    onDrag?.(displayedValue);

    const onMouseMove = (e: MouseEvent | TouchEvent) => {
      const deltaX = getClientX(e) - startX.current;
      setDelta((deltaX / totalX) * 100);
    };

    const onMouseUp = () => {
      onDragEnd?.(displayedValue);
      setDelta(0);
      setIsDragging(false);
    };

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('touchmove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
    document.addEventListener('touchend', onMouseUp);
    document.body.style.userSelect = 'none';

    return () => {
      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('touchmove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
      document.removeEventListener('touchend', onMouseUp);
      document.body.style.userSelect = 'initial';
    };
  }, [isDragging, displayedValue]);

  useEffect(() => {
    const updateTotal = () => {
      setTotalX(lineRef.current?.getBoundingClientRect().width ?? 1);
    };
    updateTotal();
    document.addEventListener('resize', updateTotal);
    return () => {
      return document.removeEventListener('resize', updateTotal);
    };
  }, []);

  return (
    <svg viewBox="0 0 100 5" overflow="visible">
      <SliderLine ref={lineRef} />
      {section && (
        <SliderLine
          start={section.start}
          end={section.end}
          color={section.color}
        />
      )}
      <SliderHandle
        ref={circleRef}
        value={displayedValue}
        onDragStart={startDrag}
      />
    </svg>
  );
};
