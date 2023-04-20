import { clamp } from '../utils/clamp';

export interface UseDurationProps {
  value: number;
  onChange: (value: number) => void;
  max: number;
}

export const useDuration = (props: UseDurationProps) => {
  const { value, onChange, max } = props;

  const minutes = Math.floor(value / 60);
  const seconds = value % 60;

  const updateMinutes = (minutes: number) => {
    onChange(clamp(seconds + minutes * 60, 0, max));
  };

  const updateSeconds = (seconds: number) => {
    onChange(clamp(minutes * 60 + clamp(seconds, 0, 60), 0, max));
  };

  return {
    minutes,
    updateMinutes,
    seconds,
    updateSeconds,
  };
};
