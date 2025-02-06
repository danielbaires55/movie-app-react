/* eslint-disable @typescript-eslint/no-explicit-any */
import { useQuery } from "@tanstack/react-query";
import { ResponseTrendingType } from "../types/responseTypes";

const API_KEY = "04d35ad46e41458360d799f3c1a4b1ed";
const BASE_URL = "https://api.themoviedb.org/3/";

// Funzione generica per chiamare l'API TMDB
const fetchFromApi = async (endpoint: string) => {
    try {
        const response = await fetch(`${BASE_URL}${endpoint}?api_key=${API_KEY}`);
        if (!response.ok) throw new Error("Errore nella richiesta a TMDB");
        const data: ResponseTrendingType = await response.json();
        return data.results;
    } catch (error) {
        console.error("Errore nel recupero dei dati:", error);
        throw error;
    }
};

// Hook per ottenere i film di tendenza
export const useTrendingMovies = () => {
    return useQuery({
        queryKey: ["trending", "movies"],
        queryFn: () => fetchFromApi("trending/movie/day"),
        staleTime: 1000 * 60 * 5, // I dati rimangono freschi per 5 minuti
        gcTime: 1000 * 60 * 10, // I dati vengono mantenuti in cache per 10 minuti
    });
};

// Hook per ottenere le persone di tendenza
export const useTrendingPeople = () => {
    return useQuery({
        queryKey: ["trending", "people"],
        queryFn: async () => {
            const people = await fetchFromApi("trending/person/day");
            return people.map((person: any) => ({
                ...person,
                title: person.name,
            }));
        },
        staleTime: 1000 * 60 * 5,
        gcTime: 1000 * 60 * 10,
    });
};

// Hook per ottenere le serie TV di tendenza
export const useTrendingTV = () => {
    return useQuery({
        queryKey: ["trending", "tv"],
        queryFn: () => fetchFromApi("trending/tv/day"),
        staleTime: 1000 * 60 * 5,
        gcTime: 1000 * 60 * 10,
    });
};
