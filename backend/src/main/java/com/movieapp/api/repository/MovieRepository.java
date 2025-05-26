package com.movieapp.api.repository;

import com.movieapp.api.model.Movie;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface MovieRepository extends JpaRepository<Movie, Integer> {
    List<Movie> findByTitleContainingIgnoreCase(String title);
    List<Movie> findByGenresContainingIgnoreCase(String genre);
    List<Movie> findByVoteAverageGreaterThanEqual(Double rating);
    List<Movie> findByPopularityGreaterThanEqual(Double popularity);
} 