
import { useEffect, useState } from "react";
import { getMovies, getPeople, getTV } from "./api/getTrendings";
import { MovieCard } from "./components/MovieCard";
import { MediaType } from "./types/movieTypes";
import { SimpleGrid, Card, Text, Flex } from "@chakra-ui/react";
import { TextField, Box } from "@mui/material";
import { SiThemoviedatabase } from "react-icons/si";
import MediaButton from "./components/MediaButton";
import LoadingState from "./components/LoadingState";
import { FaSadTear } from "react-icons/fa";

// Interfaccia per la gestione degli errori del form
interface FormErrors {
  searchTerm?: string;
}

// Interfaccia per lo stato della ricerca
interface SearchState {
  searchTerm: string;
  errors: FormErrors;
}

function App() {
  const [topMovies, setTopMovies] = useState<MediaType[]>([]);
  const [topPeople, setTopPeople] = useState<MediaType[]>([]);
  const [topTVSeries, setTopTVSeries] = useState<MediaType[]>([]);
  const [selectedMediaType, setSelectedMediaType] = useState<
    "movie" | "tv" | "people"
  >("movie");

  const [searchState, setSearchState] = useState<SearchState>({
    searchTerm: "",
    errors: {},
  });

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

  //Validazione
  const validate = (value: string): FormErrors => {
    const errors: FormErrors = {};

    if (value.length > 50) {
      errors.searchTerm = "La ricerca non può superare i 50 caratteri";
    }

    if (value.trim() && value.length < 2) {
      errors.searchTerm = "Inserisci almeno 2 caratteri";
    }

    if (/^\s+$/.test(value)) {
      errors.searchTerm = "La ricerca non può contenere solo spazi";
    }

    return errors;
  };

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    const newErrors = validate(value);

    setSearchState({
      searchTerm: value,
      errors: newErrors,
    });
  };

  const handleMediaTypeChange = (type: "movie" | "tv" | "people") => {
    setSelectedMediaType(type);
    setSearchState({
      searchTerm: "",
      errors: {},
    });
  };

  const getFilteredContent = () => {
    let currentContent: MediaType[] = [];

    switch (selectedMediaType) {
      case "movie":
        currentContent = topMovies;
        break;
      case "tv":
        currentContent = topTVSeries;
        break;
      case "people":
        currentContent = topPeople;
        break;
    }

    if (Object.keys(searchState.errors).length > 0 || !searchState.searchTerm) {
      return currentContent;
    }

    return currentContent.filter(
      (item) =>
        item.title
          ?.toLowerCase()
          .includes(searchState.searchTerm.toLowerCase()) ||
        item.name?.toLowerCase().includes(searchState.searchTerm.toLowerCase())
    );
  };

  const renderCards = () => {
    const filteredContent = getFilteredContent();

    if (filteredContent.length === 0 && !searchState.searchTerm) {
      return <LoadingState colorPalette="teal" />;
    }

    if (
      filteredContent.length === 0 &&
      searchState.searchTerm &&
      !searchState.errors.searchTerm
    ) {
      return (
        <Flex
          color="cyan.50"
          fontSize="xl"
          textAlign="center"
          width="100%"
          alignItems="center"
          justifyContent="center"
        >         
          <Text>Nessun risultato trovato per "{searchState.searchTerm}"</Text>
          <FaSadTear style={{ marginLeft: "8px" }} />
        </Flex>
      );
    }

    return filteredContent.map((item) => (
      <MovieCard key={item.id} item={item} />
    ));
  };

  return (
    <>
      <MediaButton
        onClick={() => handleMediaTypeChange("movie")}
        label="Trending Movies"
      />
      <MediaButton
        onClick={() => handleMediaTypeChange("tv")}
        label="Trending TV Shows"
      />
      <MediaButton
        onClick={() => handleMediaTypeChange("people")}
        label="Trending People"
      />

      <Card.Root backgroundColor={"transparent"} border={"none"}>
        <Card.Header
          display="flex"
          alignItems="center"
          justifyContent="center"
          flexDirection="column"
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

          </Text>
          <Text
            textAlign="center"
            fontSize={245}
            color="cyan.50"
            mb={6}
            mt={1}
            display={"inline-block"}
            transition={"all 0.5s ease-in-out"}
            _hover={{
              cursor: "pointer",
              transform: "scale(1.05)",
              opacity: 0.8,
            }}
          >
            <SiThemoviedatabase />
          </Text>

          {/* Form */}
          <Box sx={{ width: "50%", minWidth: 300, mb: 4 }}>
            <TextField
              fullWidth
              placeholder={`Cerca ${
                selectedMediaType === "movie"
                  ? "film"
                  : selectedMediaType === "tv"
                  ? "serie TV"
                  : "persone"
              }...`}
              value={searchState.searchTerm}
              onChange={handleSearchChange}
              error={!!searchState.errors.searchTerm}
              helperText={searchState.errors.searchTerm}
              variant="outlined"
              sx={{
                "& .MuiOutlinedInput-root": {
                  "& fieldset": {
                    borderColor: "rgba(255, 255, 255, 0.3)",
                  },
                  "&:hover fieldset": {
                    borderColor: "rgba(255, 255, 255, 0.5)",
                  },
                  "&.Mui-focused fieldset": {
                    borderColor: "#00B5D8",
                  },
                  backgroundColor: "rgba(255, 255, 255, 0.1)",
                },
                "& .MuiInputBase-input": {
                  color: "white",
                  "&::placeholder": {
                    color: "rgba(255, 255, 255, 0.7)",
                    opacity: 1,
                  },
                },
                "& .MuiFormHelperText-root": {
                  color: "#FC8181",
                  marginLeft: 0,
                },
              }}
            />
          </Box>
        </Card.Header>

        <SimpleGrid
          columns={4}
          minChildWidth="300px"
          gap={"30px"}
          justifyItems="center"
          mt={30}
          mb={30}
          border={"none"}
        >
          {renderCards()}
        </SimpleGrid>
      </Card.Root>
    </>
  );
}

export default App;
