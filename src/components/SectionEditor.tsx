import {
  Box,
  Button,
  ButtonGroup,
  Flex,
  Grid,
  Input,
  InputGroup,
  Spacer,
  Text,
} from '@chakra-ui/react';
import { PatternFormat } from 'react-number-format';

export const SectionEditor = () => {
  return (
    <Grid gridTemplateColumns="1fr" gap="2">
      <Flex alignItems="center" justifyContent="start">
        <ButtonGroup isAttached>
          <PatternFormat
            variant="unstyled"
            customInput={Input}
            format="##"
            placeholder="00"
            width="2ch"
          />
          <Text>:</Text>
          <PatternFormat
            variant="unstyled"
            customInput={Input}
            format="##"
            placeholder="00"
            width="2ch"
          />
        </ButtonGroup>
        <Text fontSize="xl" fontWeight="bold">
          {` - `}
        </Text>
        <ButtonGroup isAttached>
          <PatternFormat
            variant="unstyled"
            customInput={Input}
            format="##"
            placeholder="00"
            width="2ch"
          />
          <Text>:</Text>
          <PatternFormat
            variant="unstyled"
            customInput={Input}
            format="##"
            placeholder="00"
            width="2ch"
          />
        </ButtonGroup>
      </Flex>
      <Input placeholder="Name" />
      <Button>Add</Button>
    </Grid>
  );
};
