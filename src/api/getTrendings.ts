
import { ResponseTrendingType } from "../types/responseTypes";

const API_KEY = import.meta.env.VITE_API_KEY;
const BASE_URL = import.meta.env.VITE_BASE_URL;

export const getMovies = async () => {
    try {
        const result = await callApi("trending/movie/day");
        return result;
    } catch (error) {
        console.error("Errore nel recupero dei movies:", error);
        return [];
    }
};

export const getPeople = async () => {
    try {
        const result = await callApi("trending/person/day");
        const people = result.map((person: any) => ({
            ...person,
            title: person.name,
        }));

        return people;
    } catch (error) {
        console.error("Errore nel recupero dei people:", error);
        return [];
    }
};

export const getTV = async () => {
    try {
        const result = await callApi("trending/tv/day");
        return result;
    } catch (error) {
        console.error("Errore nel recupero dei TV:", error);
        return [];
    }
};

const callApi = async (apiURL: string) => {
    try {
        const response = await fetch(`${BASE_URL}${apiURL}?api_key=${API_KEY}`);
        if (!response.ok) throw new Error("Errore nella richiesta a TMDB");
        const data: ResponseTrendingType = await response.json();
        return data.results;
    } catch (error) {
        console.error("Errore nel recupero dei TV:", error);
        return [];
    }
}