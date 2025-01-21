// Importa React e i componenti necessari da Chakra UI
import React from 'react';
import { VStack, Spinner, Text } from '@chakra-ui/react';

// Definisce l'interfaccia per le props del componente
// colorPalette: stringa che determina il colore del loading spinner e del testo
interface LoadingStateProps {
  colorPalette: string;
}

// Componente funzionale che mostra uno stato di caricamento
// Utilizza la colorPalette passata come prop per stilizzare gli elementi
const LoadingState: React.FC<LoadingStateProps> = ({ colorPalette }) => {
  return (
    // VStack impila gli elementi verticalmente
    <VStack>
      {/* Spinner mostra l'animazione di caricamento
          - size='xl' lo rende più grande
          - color usa la colorPalette con tonalità 600 */}
      <Spinner size={'xl'} color={`${colorPalette}.600`} />

      {/* Testo "Loading..." stilizzato con lo stesso colore dello spinner */}
      <Text color={`${colorPalette}.600`}>Loading...</Text>
    </VStack>
  );
};

// Esporta il componente
export default LoadingState;