import { useEffect, useState } from 'react';
import { getMovies, getPeople, getTV } from './api/getTrendings';
import { MovieCard } from './components/MovieCard';
import { MediaType } from './types/movieTypes';
import { SimpleGrid, Card, Button, Spinner, Text, VStack } from "@chakra-ui/react";
import Typewriter from 'typewriter-effect';
import { SiThemoviedatabase } from "react-icons/si";
// import {
//   MenuContent,
//   MenuItem,
//   MenuRoot,
//   MenuTrigger,
// } from "./components/ui/menu"

function App() {
  const [topMovies, setTopMovies] = useState<MediaType[]>([]);
  const [topPeople, setTopPeople] = useState<MediaType[]>([]);
  const [topTVSeries, setTopTVSeries] = useState<MediaType[]>([]);
  const [selectedMediaType, setSelectedMediaType] = useState<'movie' | 'tv' | 'people'>('movie');

  useEffect(() => {
    const fetchData = async () => {
      const movies = await getMovies();
      const people = await getPeople();
      const tv = await getTV();

      setTopMovies(movies);
      setTopPeople(people);
      setTopTVSeries(tv);
    };

    fetchData();
  }, []);

  const handleMediaTypeChange = (type: 'movie' | 'tv' | 'people') => {
    setSelectedMediaType(type);
  };

  const renderCards = () => {
    switch (selectedMediaType) {
      case 'movie':
        return topMovies.length > 0 ? (
          topMovies.map((movie) => (
            <MovieCard key={movie.id} item={movie} />
          ))
        ) : (
          <VStack colorPalette="teal">
            <Spinner size={'xl'} color="colorPalette.600" />
            <Text color="colorPalette.600">Loading...</Text>
          </VStack>
        );
      case 'tv':
        return topTVSeries.length > 0 ? (
          topTVSeries.map((tvShow) => (
            <MovieCard key={tvShow.id} item={tvShow} />
          ))
        ) : (
          <VStack colorPalette="teal">
            <Spinner size={'xl'} color="colorPalette.600" />
            <Text color="colorPalette.600">Loading...</Text>
          </VStack>
        );
      case 'people':
        return topPeople.length > 0 ? (
          topPeople.map((person) => (
            <MovieCard key={person.id} item={person} />
          ))
        ) : (
          <VStack colorPalette="teal">
            <Spinner size={'xl'} color="colorPalette.600" />
            <Text color="colorPalette.600">Loading...</Text>
          </VStack>
        );
      default:
        return null;
    }
  };

  return (
    <>
      {/* <MenuRoot>
        <MenuTrigger asChild>
          <Button size="lg" variant="outline" border={'none'} borderRadius={'sm'} color={'cyan.50'} _hover={{ color: 'blackAlpha.950' }}>
            Menu
          </Button>
        </MenuTrigger>
        <MenuContent>
          <MenuItem asChild value="tmdb" _hover={{ cursor: 'pointer' }}>
            <a
              href="https://www.themoviedb.org/"
              target="_blank"
              rel="noreferrer"
            >
              Source
            </a>
          </MenuItem>
        </MenuContent>
      </MenuRoot> */}

      <Button
        onClick={() => handleMediaTypeChange('movie')}
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
        Trending Movies
      </Button>

      <Button
        onClick={() => handleMediaTypeChange('tv')}
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
        Trending TV Shows
      </Button>
      {/* <Button onClick={() => handleMediaTypeChange('people')}>Trending People</Button> */}

      <Card.Root backgroundColor={'transparent'} border={'none'} >
        <Card.Header
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <Text
            textAlign="center"
            fontSize={90}
            fontWeight="bold"
            color="cyan.50"
            mb={4}
            mt={1}
            letterSpacing="wider"
          >
            <Typewriter
              options={{
                strings: ['Welcome to'],
                autoStart: true,
                loop: true,
                delay: 200,
              }}
            />
          </Text>

          <Text
            textAlign="center"
            fontSize={175}
            color="cyan.50"
            mb={6}
            mt={1}
            display={'inline-block'}
            transition={'all 0.5s ease-in-out'}
            _hover={{ cursor: 'pointer', transform: 'scale(1.05)', opacity: 0.8 }}
          >
            <SiThemoviedatabase />
          </Text>
        </Card.Header>

        <SimpleGrid columns={4} minChildWidth="300px" gap={"30px"} justifyItems="center" mt={30} mb={30} border={'none'}>
          {renderCards()}
        </SimpleGrid>
      </Card.Root>
    </>
  );
}

export default App;