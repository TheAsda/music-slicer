import {
  Button,
  Popover,
  PopoverBody,
  PopoverContent,
  PopoverTrigger,
} from '@chakra-ui/react';
import { SectionEditor } from '../SectionEditor';

export const AddSectionButton = () => {
  return (
    <Popover>
      <PopoverTrigger>
        <Button>Add</Button>
      </PopoverTrigger>
      <PopoverContent>
        <PopoverBody>
          <SectionEditor />
        </PopoverBody>
      </PopoverContent>
    </Popover>
  );
};
