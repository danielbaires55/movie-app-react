// Importa il tipo MediaType che definisce la struttura dei dati del media
import { MediaType } from "../types/movieTypes";
// Importa la funzione per ottenere l'URL dell'immagine del media
import { getMediaImage } from "../functions/functions";
// Importa i componenti UI necessari da Chakra UI
import { Card, Image, Box, Button } from "@chakra-ui/react";
// Importa il componente Link per la navigazione tra le pagine
import { Link } from 'react-router-dom';

// Definisce il tipo delle props che il componente accetta
// item: un oggetto di tipo MediaType che contiene i dettagli del film/serie
type MovieCardProps = {
  item: MediaType;
};

// Definisce il componente MovieCard che mostra una card per un film o una serie TV
export const MovieCard = ({ item }: MovieCardProps) => {
  const imageUrl = getMediaImage(item);

  return (
    <Card.Root
      cursor="pointer"
      width="320px"
      height="480px"
      borderRadius="lg"
      boxShadow="xl"
      transition="all 0.2s ease-in-out"
      border="none"
      _hover={{
        transform: "scale(1.05)",
        boxShadow: "2xl",
      }}
      overflow="hidden"
      position="relative"
    >
      <Image
        src={imageUrl as string}
        alt={item.title || item.name}
        objectFit="cover"
        width="100%"
        height="100%"
      />
      <Box
        position="absolute"
        bottom="0"
        width="100%"
        padding="4"
        textAlign="center"
      >
        <Link to={`/details/${item.media_type}/${item.id}`}>
          <Button
            variant="outline"
            colorScheme="blue"
            backgroundColor="rgba(255, 255, 255, 0.2)"
            backdropFilter="blur(0.5px)"
            _hover={{
              borderColor: "blue.700",
              backgroundColor: "rgba(255, 255, 255, 0.5)",
            }}
            border="none"
          >
            More Details
          </Button>
        </Link>
      </Box>
    </Card.Root>
  );
};