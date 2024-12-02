import { useEffect, useState } from 'react';
import { getMovies, getPeople, getTV } from './api/getTrendings';
import { MovieCard } from './components/MovieCard';
import { MediaType } from './types/movieTypes';
import { SimpleGrid, Card, Button, Spinner, Text, VStack } from "@chakra-ui/react";
import Typewriter from 'typewriter-effect';
import { SiThemoviedatabase } from "react-icons/si";
import MediaButton from './components/MediaButton';
import LoadingState from './components/LoadingState';

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
          <LoadingState colorPalette="teal" />
        );
      case 'tv':
        return topTVSeries.length > 0 ? (
          topTVSeries.map((tvShow) => (
            <MovieCard key={tvShow.id} item={tvShow} />
          ))
        ) : (
          <LoadingState colorPalette="teal" />
        );
      case 'people':
        return topPeople.length > 0 ? (
          topPeople.map((person) => (
            <MovieCard key={person.id} item={person} />
          ))
        ) : (
          <LoadingState colorPalette="teal" />
        );
      default:
        return null;
    }
  };

  return (
    <>
      {/*Media Buttons*/}
      <MediaButton
        onClick={() => handleMediaTypeChange('movie')}
        label="Trending Movies"
      />

      <MediaButton
        onClick={() => handleMediaTypeChange('tv')}
        label="Trending TV Shows"
      />

      <MediaButton
        onClick={() => handleMediaTypeChange('people')}
        label="Trending People"
      />


      {/*Cards*/}

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