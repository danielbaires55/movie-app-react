package com.movieapp.api.controller;

import com.movieapp.api.model.Movie;
import com.movieapp.api.repository.MovieRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/movies")
@CrossOrigin(origins = "http://localhost:5173")
public class MovieController {

    @Autowired
    private MovieRepository movieRepository;

    @GetMapping
    public List<Movie> getAllMovies() {
        return movieRepository.findAll();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Movie> getMovieById(@PathVariable Integer id) {
        return movieRepository.findById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @GetMapping("/search")
    public List<Movie> searchMovies(
            @RequestParam(required = false) String title,
            @RequestParam(required = false) String genre,
            @RequestParam(required = false) Double rating,
            @RequestParam(required = false) Double popularity) {
        
        if (title != null) {
            return movieRepository.findByTitleContainingIgnoreCase(title);
        } else if (genre != null) {
            return movieRepository.findByGenresContainingIgnoreCase(genre);
        } else if (rating != null) {
            return movieRepository.findByVoteAverageGreaterThanEqual(rating);
        } else if (popularity != null) {
            return movieRepository.findByPopularityGreaterThanEqual(popularity);
        }
        return movieRepository.findAll();
    }

    @PostMapping
    public Movie createMovie(@RequestBody Movie movie) {
        return movieRepository.save(movie);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Movie> updateMovie(@PathVariable Integer id, @RequestBody Movie movieDetails) {
        return movieRepository.findById(id)
                .map(existingMovie -> {
                    existingMovie.setTitle(movieDetails.getTitle());
                    existingMovie.setOriginalTitle(movieDetails.getOriginalTitle());
                    existingMovie.setReleaseDate(movieDetails.getReleaseDate());
                    existingMovie.setVoteAverage(movieDetails.getVoteAverage());
                    existingMovie.setOverview(movieDetails.getOverview());
                    existingMovie.setPopularity(movieDetails.getPopularity());
                    existingMovie.setPosterPath(movieDetails.getPosterPath());
                    existingMovie.setBackdropPath(movieDetails.getBackdropPath());
                    existingMovie.setGenres(movieDetails.getGenres());
                    existingMovie.setRuntime(movieDetails.getRuntime());
                    existingMovie.setStatus(movieDetails.getStatus());
                    return ResponseEntity.ok(movieRepository.save(existingMovie));
                })
                .orElse(ResponseEntity.notFound().build());
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteMovie(@PathVariable Integer id) {
        return movieRepository.findById(id)
                .map(movie -> {
                    movieRepository.delete(movie);
                    return ResponseEntity.ok().build();
                })
                .orElse(ResponseEntity.notFound().build());
    }
} 