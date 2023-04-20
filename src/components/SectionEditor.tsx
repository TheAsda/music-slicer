import { Button, Flex, Grid, Input, Text, useToast } from '@chakra-ui/react';
import { useState } from 'react';
import { DurationInput } from './DurationInput';
import { Section } from '../atoms';

export interface SectionEditorProps {
  maxDuration: number;
  initial?: Section;
  onSave: (value: Section) => void;
}

export const SectionEditor = (props: SectionEditorProps) => {
  const { maxDuration, initial, onSave } = props;

  const [start, setStart] = useState(initial?.start ?? 0);
  const [end, setEnd] = useState(initial?.end ?? 0);
  const [name, setName] = useState(initial?.name ?? '');

  const toast = useToast();

  const save = () => {
    if (name.length === 0) {
      toast({
        title: 'Name is empty',
        status: 'error',
      });
      return;
    }
    if (start >= end) {
      toast({
        title: 'End time must be after start time',
        status: 'error',
      });
      return;
    }
    onSave({
      start,
      end,
      name,
    });
  };

  return (
    <Grid gridTemplateColumns="1fr" gap="2">
      <Flex alignItems="center" justifyContent="start" gap="1">
        <DurationInput value={start} onChange={setStart} max={maxDuration} />
        <Text fontSize="xl" fontWeight="bold">
          -
        </Text>
        <DurationInput value={end} onChange={setEnd} max={maxDuration} />
      </Flex>
      <Flex gap="2">
        <Input
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          isInvalid={name.length === 0}
        />
        <Button onClick={save}>Save</Button>
      </Flex>
    </Grid>
  );
};
