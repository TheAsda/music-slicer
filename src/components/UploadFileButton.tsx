import { Box, Button } from '@chakra-ui/react';
import { useSetAtom } from 'jotai';
import { ChangeEventHandler, useRef } from 'react';
import { fileUrlAtom } from '../atoms';
import * as mmb from 'music-metadata-browser';
import { metadataAtom } from '../atoms';

export const UploadFileButton = () => {
  const inputRef = useRef<HTMLInputElement>(null);
  const setFileUrl = useSetAtom(fileUrlAtom);
  const setMetadata = useSetAtom(metadataAtom);

  const uploadFile = () => {
    inputRef.current?.click();
  };

  const onUpload: ChangeEventHandler<HTMLInputElement> = async (e) => {
    const file = e.target.files?.[0];
    if (!file) {
      return;
    }
    const metadata = await mmb.parseBlob(file);
    setMetadata({
      artist: metadata.common.artist,
      title: metadata.common.title,
    });

    const url = URL.createObjectURL(file);
    setFileUrl(url);
  };

  return (
    <>
      <Box
        as="input"
        display="none"
        type="file"
        ref={inputRef}
        accept="audio/mp3"
        onChange={onUpload}
      />
      <Button onClick={uploadFile}>Upload File</Button>
    </>
  );
};
