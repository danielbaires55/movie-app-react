import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router';
import { getDetails } from '../api/details';
import { MovieDetailsType, TvDetailsType, PersonDetailsType } from '../types/detailsTypes';
import { Spinner, Box, Button, Text, Image, VStack, IconButton } from '@chakra-ui/react';
import { getMediaImage } from '../functions/functions';
import { MediaType } from '../types/movieTypes';
import { FaArrowLeft } from 'react-icons/fa';

const DetailsPage: React.FC = () => {
  const { media_type, id } = useParams<{ media_type: string; id: string }>();
  const [data, setData] = useState<MovieDetailsType | TvDetailsType | PersonDetailsType | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchData = async () => {
    try {
      setLoading(true);
      const details = await getDetails({ media_type, id: Number(id) });
      setData(details);
    } catch (err) {
      setError('Failed to fetch details. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [media_type, id]);

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
        <Spinner size="xl" />
      </Box>
    );
  }

  if (error) {
    return (
      <Box textAlign="center" mt="20">
        <Text fontSize="xl" color="red.500">{error}</Text>
        <Button mt="4" colorScheme="blue" onClick={fetchData}>Retry</Button>
      </Box>
    );
  }

  if (!data) {
    return <div>No details available.</div>;
  }

  const tempMediaType: MediaType = {
    ...data,
    media_type: media_type as 'movie' | 'tv' | 'person',
  };

  const imageUrl = getMediaImage(tempMediaType);

  const renderDetails = () => {
    switch (media_type) {
      case 'movie':
        const movie = data as MovieDetailsType;
        return (
          <Box p="4">
            <Box display="flex" justifyContent="center" alignItems="center" mb="4">
              <Image
                src={imageUrl as string}
                alt={movie.title}
                objectFit="cover"
                maxWidth="550px"
                maxHeight="700px"
                borderRadius="lg"
              />
            </Box>
            <Text fontSize="2xl" fontWeight="bold" textAlign="center">{movie.title}</Text>
            <Text mt="2" textAlign="center">{movie.overview}</Text>
            <VStack mt="4" align="start">
              <Text><strong>Release Date:</strong> {movie.release_date}</Text>
              <Text><strong>Genres:</strong> {movie.genres.map(genre => genre.name).join(', ')}</Text>
              <Text><strong>Rating:</strong> {movie.vote_average}</Text>
              <Text><strong>Runtime:</strong> {movie.runtime} minutes</Text>
              <Text><strong>Status:</strong> {movie.status}</Text>
              <Text><strong>Genres:</strong> {movie.genres.map(genre => genre.name).join(', ')}</Text>
            </VStack>
          </Box>
        );
      case 'tv':
        const tv = data as TvDetailsType;
        return (
          <Box p="4">
            <Box display="flex" justifyContent="center" alignItems="center" mb="4">
              <Image
                src={imageUrl as string}
                alt={tv.original_name}
                objectFit="cover"
                maxWidth="500px"
                maxHeight="700px"
                borderRadius="lg"
              />
            </Box>
            <Text fontSize="2xl" fontWeight="bold" textAlign="center">{tv.original_name}</Text>
            <Text mt="2" textAlign="center">{tv.overview}</Text>
            <VStack mt="4"  align="start">
              <Text><strong>First Air Date:</strong> {tv.first_air_date}</Text>
              <Text><strong>Last Air Date: </strong> {tv.last_air_date}</Text>
              <Text><strong>Genres:</strong> {tv.genres.map(genre => genre.name).join(', ')}</Text>
              <Text><strong>Rating:</strong> {tv.vote_average}</Text>
              <Text><strong>Languages:</strong> {tv.languages.join(', ')}</Text>
              <Text><strong>Genres:</strong> {tv.genres.map(genre => genre.name).join(', ')}</Text>
            </VStack>
          </Box>
        );
      case 'person':
        const person = data as PersonDetailsType;
        return (
          <Box p="4">
            <Box display="flex" justifyContent="center" alignItems="center" mb="4">
              <Image
                src={imageUrl as string}
                alt={person.name}
                objectFit="cover"
                maxWidth="500px"
                maxHeight="700px"
                borderRadius="lg"
              />
            </Box>
            <Text fontSize="2xl" fontWeight="bold" textAlign="center">{person.name}</Text>
            <Text mt="2" textAlign="center">{person.biography}</Text>
            <VStack mt="4" align="start">
              <Text><strong>Birthday:</strong> {person.birthday}</Text>
              <Text><strong>Known For:</strong> {person.known_for_department}</Text>
            </VStack>
          </Box>
        );
      default:
        return <div>Invalid media type.</div>;
    }
  };

  return (
    <Box position="relative">
      <IconButton
        children={<FaArrowLeft />}
        aria-label="Go back"
        onClick={() => history.back()}
        position="absolute"
        top="4"
        left="4"
        colorScheme="blue"
      />
      {renderDetails()}
    </Box>
  );
};
export default DetailsPage;