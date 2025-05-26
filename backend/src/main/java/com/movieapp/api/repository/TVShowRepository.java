package com.movieapp.api.repository;

import com.movieapp.api.model.TVShow;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface TVShowRepository extends JpaRepository<TVShow, Integer> {
    List<TVShow> findByNameContainingIgnoreCase(String name);
    List<TVShow> findByGenresContainingIgnoreCase(String genre);
    List<TVShow> findByVoteAverageGreaterThanEqual(Double rating);
    List<TVShow> findByPopularityGreaterThanEqual(Double popularity);
    List<TVShow> findByStatus(String status);
} 