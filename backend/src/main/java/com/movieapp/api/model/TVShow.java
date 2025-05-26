package com.movieapp.api.model;

import jakarta.persistence.*;
import lombok.Data;
import java.time.LocalDate;
import java.time.LocalDateTime;

@Data
@Entity
@Table(name = "tv_shows")
public class TVShow {
    @Id
    private Integer id;

    @Column(nullable = false)
    private String name;

    @Column(name = "original_name")
    private String originalName;

    @Column(name = "first_air_date")
    private LocalDate firstAirDate;

    @Column(name = "last_air_date")
    private LocalDate lastAirDate;

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

    private String languages;
    private String status;

    @Column(name = "number_of_episodes")
    private Integer numberOfEpisodes;

    @Column(name = "number_of_seasons")
    private Integer numberOfSeasons;

    @Column(name = "created_at")
    private LocalDateTime createdAt;
} 