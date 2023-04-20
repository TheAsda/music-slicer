import {
  Button,
  Popover,
  PopoverBody,
  PopoverContent,
  PopoverTrigger,
  useDisclosure,
} from '@chakra-ui/react';
import { SectionEditor } from '../SectionEditor';
import { useAtomValue, useSetAtom } from 'jotai';
import { Section, sectionsAtom, totalTimeAtom } from '../../atoms';

export const AddSectionButton = () => {
  const totalTime = useAtomValue(totalTimeAtom);
  const setSections = useSetAtom(sectionsAtom);

  const { isOpen, onClose, onOpen } = useDisclosure();

  const addSection = (section: Section) => {
    setSections((s) => [...s, section]);
    onClose();
  };

  return (
    <Popover isOpen={isOpen} onClose={onClose} onOpen={onOpen} isLazy>
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
