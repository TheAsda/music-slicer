import { useAtomValue } from 'jotai';
import { sectionsAtom } from '../atoms';
import { Checkbox, HStack, Stack, Text } from '@chakra-ui/react';
import { formatTime } from '../utils/time';

export const SectionsList = () => {
  const sections = useAtomValue(sectionsAtom);

  return (
    <Stack>
      {sections.map((section, i) => (
        <HStack key={i}>
          <Checkbox />
          <Text>{`${formatTime(section.start)}-${formatTime(
            section.end
          )}`}</Text>
          <Text>{section.name}</Text>
        </HStack>
      ))}
    </Stack>
  );
};
