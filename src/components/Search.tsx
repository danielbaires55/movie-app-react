import React, { useState } from "react";
import { 
  FormControl, 
  TextField, 
  Button, 
  Box
} from "@mui/material";
import { Masonry } from '@mui/lab';
import { MediaType } from '../types/movieTypes'; 
import { getMovies, getTV } from '../api/getTrendings';
import { MovieCard } from "../components/MovieCard";

interface FormErrors {
  query?: string;
}

function Search() {
  const [query, setQuery] = useState<string>("");
  const [errors, setErrors] = useState<FormErrors>({});
  const [filteredResults, setFilteredResults] = useState<MediaType[]>([]);
  const [mediaType, setMediaType] = useState<'movie' | 'tv'>('movie');

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    setQuery(value);
  };

  const validate = () => {
    const newErrors: FormErrors = {};

    if (!query) {
      newErrors.query = "La query è obbligatoria";
    } else if (query.length < 2) {
      newErrors.query = "La query deve avere almeno 2 caratteri";
    }

    return newErrors;
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const validationErrors = validate();

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    try {
      const data = mediaType === 'movie' ?  await getMovies() :  await getTV();
      
      const filtered = data.filter(item => 
        item.title.toLowerCase().includes(query.toLowerCase())
      );

      setFilteredResults(filtered);
    } catch (error) {
      console.error("Errore durante la ricerca:", error);
    }
  };

  const toggleMediaType = () => {
    setMediaType(prev => prev === 'movie' ? 'tv' : 'movie');
  };

  return (
    <Box sx={{ maxWidth: 800, margin: "auto" }}>
      <Box 
        component="form" 
        onSubmit={handleSubmit} 
        sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}
      >
        <FormControl fullWidth>
          <TextField
            label="Ricerca"
            variant="outlined"
            name="query"
            value={query}
            onChange={handleChange}
            error={!!errors.query}
            helperText={errors.query}
            color="primary"
          />
        </FormControl>
        <Button
          variant="contained"
          color="secondary"
          onClick={toggleMediaType}
          sx={{ height: '56px' }}
        >
          {mediaType === 'movie' ? 'TV Shows' : 'Movies'}
        </Button>
        <Button
          type="submit"
          variant="contained"
          color="primary"
          sx={{ height: '56px' }}
        >
          Cerca
        </Button>
      </Box>

      <Masonry columns={3} spacing={2}>
        {filteredResults.map(item => (
          <MovieCard key={item.id} item={item} />
        ))}
      </Masonry>
    </Box>
  );
}

export default Search;