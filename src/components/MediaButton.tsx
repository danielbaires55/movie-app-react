
import React from 'react';
import { Button } from '@chakra-ui/react';

interface MediaButtonProps {
  onClick: () => void;
  label: string;
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
      borderWidth="2px"
      _hover={{
        bg: 'teal.100',
        color: 'teal.800',
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