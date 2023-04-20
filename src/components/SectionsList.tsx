import { Checkbox, HStack, Stack, Text } from '@chakra-ui/react';
import { useAtom } from 'jotai';
import { sectionsAtom } from '../atoms';
import { formatTime } from '../utils/time';

export const SectionsList = () => {
  const [sections, setSections] = useAtom(sectionsAtom);

  const toggleEnabled = (index: number) => {
    setSections((s) =>
      s.map((section, i) =>
        i === index ? { ...section, enabled: !section.enabled } : section
      )
    );
  };

  return (
    <Stack>
      {sections.map((section, i) => (
        <HStack key={i}>
          <Checkbox
            isChecked={section.enabled}
            onChange={() => toggleEnabled(i)}
          />
          <Text>{`${formatTime(section.start)}-${formatTime(
            section.end
          )}`}</Text>
          <Text>{section.name}</Text>
        </HStack>
      ))}
    </Stack>
  );
};
