import { ButtonGroup, Input, Text } from '@chakra-ui/react';
import { PatternFormat } from 'react-number-format';
import { useDuration } from '../hooks/useDuration';

export interface DurationInputProps {
  value: number;
  onChange: (value: number) => void;
  max: number;
}

export const DurationInput = (props: DurationInputProps) => {
  const { value, onChange, max } = props;

  const { minutes, updateMinutes, seconds, updateSeconds } = useDuration({
    value,
    onChange,
    max,
  });

  return (
    <ButtonGroup isAttached>
      <PatternFormat
        variant="unstyled"
        customInput={Input}
        format="##"
        placeholder="00"
        width="2ch"
        value={minutes}
        onValueChange={({ floatValue }) => {
          updateMinutes(floatValue ?? 0);
        }}
      />
      <Text>:</Text>
      <PatternFormat
        variant="unstyled"
        customInput={Input}
        format="##"
        placeholder="00"
        width="2ch"
        value={seconds}
        onValueChange={({ floatValue }) => {
          updateSeconds(floatValue ?? 0);
        }}
      />
    </ButtonGroup>
  );
};
