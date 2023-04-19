import { useAtomValue } from 'jotai';
import { metadataAtom } from '../atoms';
import { Text } from '@chakra-ui/react';

export const Title = () => {
  const metadata = useAtomValue(metadataAtom);

  return (
    <Text>
      {metadata.title ?? 'Unknown'} - {metadata.artist ?? 'Unknown artist'}
    </Text>
  );
};
