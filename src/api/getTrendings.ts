/* eslint-disable @typescript-eslint/no-explicit-any */
import { useQuery } from "@tanstack/react-query";
import { ResponseTrendingType } from "../types/responseTypes";

const BASE_URL = "http://localhost:8080/api";

// Funzione generica per chiamare l'API
const fetchFromApi = async (endpoint: string, mediaType: string) => {
    try {
        const response = await fetch(`${BASE_URL}${endpoint}`);
        if (!response.ok) throw new Error("Errore nella richiesta al backend");
        const data = await response.json();
        // Aggiungo il media_type a ogni elemento
        return data.map((item: any) => ({ ...item, media_type: mediaType }));
    } catch (error) {
        console.error("Errore nel recupero dei dati:", error);
        throw error;
    }
};

// Hook per ottenere i film di tendenza
export const useTrendingMovies = () => {
    return useQuery({
        queryKey: ["trending", "movies"],
        queryFn: () => fetchFromApi("/movies", "movie"),
        staleTime: 1000 * 60 * 5, // I dati rimangono freschi per 5 minuti
        gcTime: 1000 * 60 * 10, // I dati vengono mantenuti in cache per 10 minuti
    });
};

// Hook per ottenere le serie TV di tendenza
export const useTrendingTV = () => {
    return useQuery({
        queryKey: ["trending", "tv"],
        queryFn: () => fetchFromApi("/tv", "tv"),
        staleTime: 1000 * 60 * 5,
        gcTime: 1000 * 60 * 10,
    });
};
