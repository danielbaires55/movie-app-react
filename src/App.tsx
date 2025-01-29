import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { getMovies, getPeople, getTV } from "./api/getTrendings";
import { MovieCard } from "./components/MovieCard";
import { MediaType } from "./types/movieTypes";
import { SimpleGrid, Card, Text, Flex } from "@chakra-ui/react";
import { TextField, Box } from "@mui/material";
import { SiThemoviedatabase } from "react-icons/si";
import MediaButton from "./components/MediaButton";
import LoadingState from "./components/LoadingState";
import { FaSadTear } from "react-icons/fa";

type SearchForm = {
  searchTerm: string;
};

function App() {
  const [topMovies, setTopMovies] = useState<MediaType[]>([]);
  const [topPeople, setTopPeople] = useState<MediaType[]>([]);
  const [topTVSeries, setTopTVSeries] = useState<MediaType[]>([]);
  const [selectedMediaType, setSelectedMediaType] = useState<
    "movie" | "tv" | "people"
  >("movie");

  // Init di React Hook Form
  const {
    register,
    watch,
    formState: { errors },
    reset
  } = useForm<SearchForm>({
    mode: "onChange",
    defaultValues: { searchTerm: "" }
  });

  const searchTerm = watch("searchTerm");

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

  const handleMediaTypeChange = (type: "movie" | "tv" | "people") => {
    setSelectedMediaType(type);
    reset({ searchTerm: "" }); // Resetta il form al cambio media type
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

    if (errors.searchTerm || !searchTerm) {
      return currentContent;
    }

    return currentContent.filter(
      (item) =>
        item.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.name?.toLowerCase().includes(searchTerm.toLowerCase())
    );
  };

  // validazione
  const validateSearchTerm = (value: string) => {
    if (value.length > 50) return "La ricerca non può superare i 50 caratteri";
    if (value.trim() && value.length < 2) return "Inserisci almeno 2 caratteri";
    if (/^\s+$/.test(value)) return "La ricerca non può contenere solo spazi";
    return true;
  };

  const renderCards = () => {
    const filteredContent = getFilteredContent();

    if (filteredContent.length === 0 && !searchTerm) {
      return <LoadingState colorPalette="teal" />;
    }

    if (filteredContent.length === 0 && searchTerm && !errors.searchTerm) {
      return (
        <Flex
          color="cyan.50"
          fontSize="xl"
          textAlign="center"
          width="100%"
          alignItems="center"
          justifyContent="center"
        >         
          <Text>Nessun risultato trovato per "{searchTerm}"</Text>
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
              {...register("searchTerm", {
                validate: validateSearchTerm
              })}
              placeholder={`Cerca ${
                selectedMediaType === "movie"
                  ? "film"
                  : selectedMediaType === "tv"
                  ? "serie TV"
                  : "persone"
              }...`}
              error={!!errors.searchTerm}
              helperText={errors.searchTerm?.message}
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