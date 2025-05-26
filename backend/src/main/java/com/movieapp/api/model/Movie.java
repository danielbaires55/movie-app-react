package com.movieapp.api.model;

import jakarta.persistence.*;
import lombok.Data;
import java.time.LocalDate;
import java.time.LocalDateTime;

@Data
@Entity
@Table(name = "movies")
public class Movie {
    @Id
    private Integer id;

    @Column(nullable = false)
    private String title;

    @Column(name = "original_title")
    private String originalTitle;

    @Column(name = "release_date")
    private LocalDate releaseDate;

    @Column(name = "vote_average")
    private Double voteAverage;

    @Column(columnDefinition = "TEXT")
    private String overview;

    @Column
    private Double popularity;

    @Column(name = "poster_path")
    private String posterPath;

    @Column(name = "backdrop_path")
    private String backdropPath;

    @Column(length = 500)
    private String genres;

    private Integer runtime;
    private String status;

    @Column(name = "created_at")
    private LocalDateTime createdAt;
} 