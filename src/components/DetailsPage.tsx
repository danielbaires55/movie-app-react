/* eslint-disable no-case-declarations */
// Importa le dipendenze necessarie
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getDetails } from '../api/details';
import { MovieDetailsType, TvDetailsType } from '../types/detailsTypes';
import { Box, Container, Heading, Text, Image, Button, VStack, HStack, Badge, Spinner, Center, SimpleGrid } from '@chakra-ui/react';
import { getMediaImage } from '../functions/functions';

// Componente principale per la pagina dei dettagli
const DetailsPage = () => {
  const { media_type, id } = useParams<{ media_type: string; id: string }>();
  const navigate = useNavigate();
  const [details, setDetails] = useState<MovieDetailsType | TvDetailsType | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      if (!media_type || !id) {
        setError("Parametri mancanti");
        setLoading(false);
        return;
      }

      try {
        const data = await getDetails({ media_type, id: parseInt(id) });
        setDetails(data);
        setError(null);
      } catch (err) {
        setError("Errore nel caricamento dei dettagli");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [media_type, id]);

  if (loading) {
    return (
      <Center h="100vh">
        <Spinner size="xl" />
      </Center>
    );
  }

  if (error || !details) {
    return (
      <Center h="100vh">
        <VStack gap={4}>
          <Text color="red.500">{error || "Dettagli non trovati"}</Text>
          <Button onClick={() => navigate("/")}>Torna alla Home</Button>
        </VStack>
      </Center>
    );
  }

  const isMovie = media_type === "movie";
  const title = isMovie ? (details as MovieDetailsType).title : (details as TvDetailsType).original_name;
  const releaseDate = isMovie ? (details as MovieDetailsType).release_date : (details as TvDetailsType).first_air_date;
  const overview = details.overview || "Nessuna descrizione disponibile";
  const voteAverage = (details as any).voteAverage || (details as any).vote_average || 0;
  const genres = (details as any).genres || "";
  const languages = (details as any).languages || "";
  const runtime = (details as any).runtime;
  const status = (details as any).status || "";

  // Formatta la data in formato italiano
  const formatDate = (dateString: string) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    return date.toLocaleDateString('it-IT', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <Container maxW="container.xl" py={8}>
      <Button mb={4} onClick={() => navigate("/")}>
        ← Torna alla Home
      </Button>

      <Box bg="white" borderRadius="lg" overflow="hidden" boxShadow="xl">
        <Box p={6}>
          <HStack gap={8} align="start">
            <Box flexShrink={0}>
              <Image
                src={getMediaImage({ media_type, ...details })}
                alt={title}
                borderRadius="md"
                boxSize="300px"
                objectFit="cover"
              />
            </Box>

            <VStack align="start" gap={4} flex={1}>
              <Heading size="xl">{title}</Heading>

              <HStack wrap="wrap" gap={2}>
                <Badge colorScheme="blue" fontSize="md" px={2} py={1}>
                  {isMovie ? "Film" : "Serie TV"}
                </Badge>
                <Badge colorScheme="green" fontSize="md" px={2} py={1}>
                  Voto: {voteAverage.toFixed(1)}
                </Badge>
                {releaseDate && (
                  <Badge colorScheme="purple" fontSize="md" px={2} py={1}>
                    {formatDate(releaseDate)}
                  </Badge>
                )}
                {status && (
                  <Badge colorScheme="orange" fontSize="md" px={2} py={1}>
                    {status}
                  </Badge>
                )}
                {runtime && (
                  <Badge colorScheme="teal" fontSize="md" px={2} py={1}>
                    {runtime} min
                  </Badge>
                )}
              </HStack>

              <Box w="100%" borderBottom="1px" borderColor="gray.200" my={2} />

              <VStack align="start" gap={2}>
                {genres && (
                  <Box>
                    <Text fontWeight="bold" mb={1}>Generi:</Text>
                    <HStack wrap="wrap" gap={2}>
                      {genres.split(", ").map((genre, index) => (
                        <Badge key={index} colorScheme="pink" fontSize="sm">
                          {genre}
                        </Badge>
                      ))}
                    </HStack>
                  </Box>
                )}

                {languages && (
                  <Box>
                    <Text fontWeight="bold" mb={1}>Lingue:</Text>
                    <HStack wrap="wrap" gap={2}>
                      {languages.split(", ").map((language, index) => (
                        <Badge key={index} colorScheme="cyan" fontSize="sm">
                          {language}
                        </Badge>
                      ))}
                    </HStack>
                  </Box>
                )}
              </VStack>

              <Box w="100%" borderBottom="1px" borderColor="gray.200" my={2} />

              <Box>
                <Text fontWeight="bold" mb={2}>Trama:</Text>
                <Text color="gray.600" fontSize="lg" lineHeight="tall">
                  {overview}
                </Text>
              </Box>
            </VStack>
          </HStack>
        </Box>
      </Box>
    </Container>
  );
};

export default DetailsPage;