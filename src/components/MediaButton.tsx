
import React from 'react';
import { Button } from '@chakra-ui/react';

// Definisce l'interfaccia per le props del componente
interface MediaButtonProps {
  onClick: () => void;  // Funzione da eseguire al click del bottone
  label: string;        // Testo da mostrare nel bottone
}
const MediaButton: React.FC<MediaButtonProps> = ({ onClick, label }) => {
  return (
    <Button
      onClick={onClick}
      size="lg"
      colorScheme="teal"
      variant="outline"
      borderRadius="full"
      px={8}
      py={6}
      mt={5}
      ml={2}
      fontWeight="bold"
      borderWidth={0.5}
      borderColor={'border.info'}
      _hover={{
        bg: 'bg.inverted',
        color: 'gray.950',
        transform: 'scale(1.05)',
        boxShadow: 'lg',
      }}
      _active={{
        bg: 'teal.200',
        transform: 'scale(0.95)',
      }}
      transition="all 0.3s ease"
    >
      {label}
    </Button>
  );
};

export default MediaButton;