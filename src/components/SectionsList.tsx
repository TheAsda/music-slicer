import { Stack } from '@chakra-ui/react';
import { useAtomValue } from 'jotai';
import { splitAtom } from 'jotai/utils';
import { sectionsAtom } from '../atoms';
import { SectionInfo } from './SectionInfo';

const sectionAtomsAtom = splitAtom(sectionsAtom);

export const SectionsList = () => {
  const sectionAtoms = useAtomValue(sectionAtomsAtom);

  return (
    <Stack>
      {sectionAtoms.map((atom) => (
        <SectionInfo atom={atom} key={atom.toString()} />
      ))}
    </Stack>
  );
};
