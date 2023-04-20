import { PrimitiveAtom, useAtom, useAtomValue } from 'jotai';
import { Section, enabledSectionIdAtom, totalTimeAtom } from '../atoms';
import {
  Button,
  Checkbox,
  HStack,
  Popover,
  PopoverBody,
  PopoverContent,
  PopoverTrigger,
  Text,
} from '@chakra-ui/react';
import { formatTime } from '../utils/time';
import { SectionEditor } from './SectionEditor';

export interface SectionInfoProps {
  atom: PrimitiveAtom<Section>;
}

export const SectionInfo = (props: SectionInfoProps) => {
  const { atom } = props;

  const totalTime = useAtomValue(totalTimeAtom);
  const [section, setSection] = useAtom(atom);
  const [enabledSectionId, setEnabledSectionId] = useAtom(enabledSectionIdAtom);

  const isEnabled = enabledSectionId === section.id;

  const toggleEnabled = () => {
    setEnabledSectionId((s) => (s === section.id ? undefined : section.id));
  };

  return (
    <HStack>
      <Checkbox isChecked={isEnabled} onChange={toggleEnabled} />
      <Popover isLazy>
        <PopoverTrigger>
          <Button>Edit</Button>
        </PopoverTrigger>
        <PopoverContent>
          <PopoverBody>
            <SectionEditor
              initial={section}
              maxDuration={totalTime}
              onSave={setSection}
            />
          </PopoverBody>
        </PopoverContent>
      </Popover>
      <Text>{`${formatTime(section.start)}-${formatTime(section.end)}`}</Text>
      <Text>{section.name}</Text>
    </HStack>
  );
};
