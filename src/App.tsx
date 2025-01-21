import { useEffect, useState } from 'react'; // React hooks per la gestione dello stato e degli effetti collaterali
import { getMovies, getPeople, getTV } from './api/getTrendings'; // Funzioni API per ottenere i dati dei film, delle persone e delle serie TV
import { MovieCard } from './components/MovieCard'; // Componente per rappresentare un singolo film/elemento multimediale
import { MediaType } from './types/movieTypes'; // Tipo TypeScript per i dati multimediali
import { SimpleGrid, Card, Button, Spinner, Text, VStack } from "@chakra-ui/react"; // Componenti Chakra UI per creare l'interfaccia
import Typewriter from 'typewriter-effect'; // Componente per un effetto di scrittura animato
import { SiThemoviedatabase } from "react-icons/si"; // Icona dal set di React Icons
import MediaButton from './components/MediaButton'; // Pulsanti per selezionare i tipi di media
import LoadingState from './components/LoadingState'; // Componente per mostrare uno stato di caricamento

function App() {
  // Stati per memorizzare i dati delle API
  const [topMovies, setTopMovies] = useState<MediaType[]>([]);
  const [topPeople, setTopPeople] = useState<MediaType[]>([]);
  const [topTVSeries, setTopTVSeries] = useState<MediaType[]>([]);

  // Stato per tenere traccia del tipo di media selezionato
  const [selectedMediaType, setSelectedMediaType] = useState<'movie' | 'tv' | 'people'>('movie');

  // Effetto per caricare i dati delle API quando il componente viene montato
  useEffect(() => {
    const fetchData = async () => {
      const movies = await getMovies(); // Recupera i dati dei film
      const people = await getPeople(); // Recupera i dati delle persone
      const tv = await getTV(); // Recupera i dati delle serie TV

      // Aggiorna gli stati con i dati ottenuti
      setTopMovies(movies);
      setTopPeople(people);
      setTopTVSeries(tv);
    };

    fetchData();
  }, []); // Array vuoto come dipendenza significa che viene eseguito solo al montaggio del componente

  // Funzione per gestire il cambio del tipo di media
  const handleMediaTypeChange = (type: 'movie' | 'tv' | 'people') => {
    setSelectedMediaType(type);
  };

  // Funzione per renderizzare le card in base al tipo di media selezionato
  const renderCards = () => {
    switch (selectedMediaType) {
      case 'movie':
        return topMovies.length > 0 ? (
          topMovies.map((movie) => (
            <MovieCard key={movie.id} item={movie} /> // Renderizza una card per ogni film
          ))
        ) : (
          <LoadingState colorPalette="teal" /> // Mostra uno stato di caricamento se i dati non sono ancora pronti
        );
      case 'tv':
        return topTVSeries.length > 0 ? (
          topTVSeries.map((tvShow) => (
            <MovieCard key={tvShow.id} item={tvShow} /> // Renderizza una card per ogni serie TV
          ))
        ) : (
          <LoadingState colorPalette="teal" />
        );
      case 'people':
        return topPeople.length > 0 ? (
          topPeople.map((person) => (
            <MovieCard key={person.id} item={person} /> // Renderizza una card per ogni persona
          ))
        ) : (
          <LoadingState colorPalette="teal" />
        );
      default:
        return null; // Caso di fallback
    }
  };

  return (
    <>
      {/* Pulsanti per selezionare il tipo di media */}
      <MediaButton
        onClick={() => handleMediaTypeChange('movie')}
        label="Trending Movies"
      />
      <MediaButton
        onClick={() => handleMediaTypeChange('tv')}
        label="Trending TV Shows"
      />
      {/* Il pulsante per le persone*/}
       <MediaButton
        onClick={() => handleMediaTypeChange('people')}
        label="Trending People"
      /> 

      {/* Struttura principale della pagina */}
      <Card.Root backgroundColor={'transparent'} border={'none'}>
        {/* Intestazione con testo animato e icona */}
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
            <SiThemoviedatabase /> {/* Icona personalizzata */}
          </Text>
        </Card.Header>

        {/* Griglia per mostrare le card */}
        <SimpleGrid columns={4} minChildWidth="300px" gap={"30px"} justifyItems="center" mt={30} mb={30} border={'none'}>
          {renderCards()} {/* Chiamata alla funzione per mostrare le card */}
        </SimpleGrid>
      </Card.Root>
    </>
  );
}

export default App;