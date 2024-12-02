
import React from 'react';
import { VStack, Spinner, Text } from '@chakra-ui/react';

interface LoadingStateProps {
  colorPalette: string;
}

const LoadingState: React.FC<LoadingStateProps> = ({ colorPalette }) => {
  return (
    <VStack colorPalette={colorPalette}>
      <Spinner size={'xl'} color={`${colorPalette}.600`} />
      <Text color={`${colorPalette}.600`}>Loading...</Text>
    </VStack>
  );
};

export default LoadingState;