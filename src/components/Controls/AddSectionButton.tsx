import {
  Button,
  Popover,
  PopoverBody,
  PopoverContent,
  PopoverTrigger,
} from '@chakra-ui/react';
import { SectionEditor } from '../SectionEditor';
import { useAtomValue, useSetAtom } from 'jotai';
import { Section, sectionsAtom, totalTimeAtom } from '../../atoms';

export const AddSectionButton = () => {
  const totalTime = useAtomValue(totalTimeAtom);
  const setSections = useSetAtom(sectionsAtom);

  const addSection = (section: Section) => {
    setSections((s) => [...s, section]);
  };

  return (
    <Popover>
      <PopoverTrigger>
        <Button>Add</Button>
      </PopoverTrigger>
      <PopoverContent>
        <PopoverBody>
          <SectionEditor maxDuration={totalTime} onSave={addSection} />
        </PopoverBody>
      </PopoverContent>
    </Popover>
  );
};
