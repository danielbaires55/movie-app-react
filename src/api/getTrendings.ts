
import { ResponseTrendingType } from "../types/responseTypes";

const API_KEY = import.meta.env.VITE_API_KEY;
const BASE_URL = import.meta.env.VITE_BASE_URL;

export const getMovies = async () => {
    try {
        const response = await fetch(`${BASE_URL}trending/movie/day?api_key=${API_KEY}`);
        if (!response.ok) throw new Error("Errore nella richiesta a TMDB");
        const data: ResponseTrendingType = await response.json();
        return data.results; 
    } catch (error) {
        console.error("Errore nel recupero dei movies:", error);
        console.log('API Key:', API_KEY);
        console.log('Base URL:', BASE_URL);
        return [];
    }
};

export const getPeople = async () => {
    try {
    const response = await fetch(`${BASE_URL}trending/person/day?api_key=${API_KEY}`);
        if (!response.ok) throw new Error("Errore nella richiesta a TMDB");
        const data: ResponseTrendingType = await response.json();
        return data.results;
    } catch (error) {
        console.error("Errore nel recupero dei people:", error);
        return [];
    }
};

export const getTV = async () => {
    try {
        const response = await fetch(`${BASE_URL}trending/tv/day?api_key=${API_KEY}`);
        if (!response.ok) throw new Error("Errore nella richiesta a TMDB");
        const data: ResponseTrendingType = await response.json();
        return data.results;
    } catch (error) {
        console.error("Errore nel recupero dei TV:", error);
        return [];
    }
};