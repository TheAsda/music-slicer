import { Center, ChakraProvider } from '@chakra-ui/react';
import { useAtomValue } from 'jotai';
import { fileUrlAtom } from './atoms';
import { Playback } from './components/Playback';
import { UploadFileButton } from './components/UploadFileButton';

export const App = () => {
  const fileUrl = useAtomValue(fileUrlAtom);

  return (
    <ChakraProvider>
      {fileUrl ? (
        <Playback />
      ) : (
        <Center>
          <UploadFileButton />
        </Center>
      )}
    </ChakraProvider>
  );
};
