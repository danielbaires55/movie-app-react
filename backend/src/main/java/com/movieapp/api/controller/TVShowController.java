package com.movieapp.api.controller;

import com.movieapp.api.model.TVShow;
import com.movieapp.api.repository.TVShowRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/tv")
@CrossOrigin(origins = "http://localhost:5173")
public class TVShowController {

    @Autowired
    private TVShowRepository tvShowRepository;

    @GetMapping
    public List<TVShow> getAllTVShows() {
        return tvShowRepository.findAll();
    }

    @GetMapping("/{id}")
    public ResponseEntity<TVShow> getTVShowById(@PathVariable Integer id) {
        return tvShowRepository.findById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @GetMapping("/search")
    public List<TVShow> searchTVShows(
            @RequestParam(required = false) String name,
            @RequestParam(required = false) String genre,
            @RequestParam(required = false) Double rating,
            @RequestParam(required = false) Double popularity,
            @RequestParam(required = false) String status) {
        
        if (name != null) {
            return tvShowRepository.findByNameContainingIgnoreCase(name);
        } else if (genre != null) {
            return tvShowRepository.findByGenresContainingIgnoreCase(genre);
        } else if (rating != null) {
            return tvShowRepository.findByVoteAverageGreaterThanEqual(rating);
        } else if (popularity != null) {
            return tvShowRepository.findByPopularityGreaterThanEqual(popularity);
        } else if (status != null) {
            return tvShowRepository.findByStatus(status);
        }
        return tvShowRepository.findAll();
    }

    @PostMapping
    public TVShow createTVShow(@RequestBody TVShow tvShow) {
        return tvShowRepository.save(tvShow);
    }

    @PutMapping("/{id}")
    public ResponseEntity<TVShow> updateTVShow(@PathVariable Integer id, @RequestBody TVShow tvShowDetails) {
        return tvShowRepository.findById(id)
                .map(existingTVShow -> {
                    existingTVShow.setName(tvShowDetails.getName());
                    existingTVShow.setOriginalName(tvShowDetails.getOriginalName());
                    existingTVShow.setFirstAirDate(tvShowDetails.getFirstAirDate());
                    existingTVShow.setLastAirDate(tvShowDetails.getLastAirDate());
                    existingTVShow.setVoteAverage(tvShowDetails.getVoteAverage());
                    existingTVShow.setOverview(tvShowDetails.getOverview());
                    existingTVShow.setPopularity(tvShowDetails.getPopularity());
                    existingTVShow.setPosterPath(tvShowDetails.getPosterPath());
                    existingTVShow.setBackdropPath(tvShowDetails.getBackdropPath());
                    existingTVShow.setGenres(tvShowDetails.getGenres());
                    existingTVShow.setLanguages(tvShowDetails.getLanguages());
                    existingTVShow.setStatus(tvShowDetails.getStatus());
                    existingTVShow.setNumberOfEpisodes(tvShowDetails.getNumberOfEpisodes());
                    existingTVShow.setNumberOfSeasons(tvShowDetails.getNumberOfSeasons());
                    return ResponseEntity.ok(tvShowRepository.save(existingTVShow));
                })
                .orElse(ResponseEntity.notFound().build());
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteTVShow(@PathVariable Integer id) {
        return tvShowRepository.findById(id)
                .map(tvShow -> {
                    tvShowRepository.delete(tvShow);
                    return ResponseEntity.ok().build();
                })
                .orElse(ResponseEntity.notFound().build());
    }
} 