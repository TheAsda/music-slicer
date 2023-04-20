import { useAtomValue } from 'jotai';
import { metadataAtom } from '../atoms';
import { Text } from '@chakra-ui/react';

export const Title = () => {
  const metadata = useAtomValue(metadataAtom);

  const title =
    !metadata.title && !metadata.artist
      ? metadata.fileName
      : `${metadata.title} - ${metadata.artist}`;

  return <Text>{title}</Text>;
};
