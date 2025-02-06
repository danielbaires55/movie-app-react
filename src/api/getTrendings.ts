/* eslint-disable @typescript-eslint/no-explicit-any */
import { ResponseTrendingType } from "../types/responseTypes";
// Importa il tipo `ResponseTrendingType`, che rappresenta la struttura della risposta dell'API per le richieste di trend.

// const API_KEY = import.meta.env.VITE_API_KEY;
const API_KEY = "04d35ad46e41458360d799f3c1a4b1ed";
// Recupera la chiave API da una variabile d'ambiente per accedere all'API TMDB.

// const BASE_URL = import.meta.env.VITE_BASE_URL;
const BASE_URL = "https://api.themoviedb.org/3/";
// Recupera l'URL base dell'API TMDB da una variabile d'ambiente.

// Funzione per ottenere i film di tendenza
export const getMovies = async () => {
    try {
        const result = await callApi("trending/movie/day");
        // Chiama la funzione generica `callApi` con il percorso specifico per i film di tendenza.
        return result; // Restituisce i risultati ottenuti
    } catch (error) {
        console.error("Errore nel recupero dei movies:", error);
        // Logga un errore in caso di problemi nella chiamata API.
        return []; // Ritorna un array vuoto in caso di errore
    }
};

// Funzione per ottenere le persone di tendenza
export const getPeople = async () => {
    try {
        const result = await callApi("trending/person/day");
        // Chiama la funzione generica `callApi` con il percorso specifico per le persone di tendenza.

        const people = result.map((person: any) => ({
            ...person, // Copia tutte le proprietà della persona
            title: person.name, // Aggiunge una proprietà `title` basata sul nome della persona
        }));

        return people; // Restituisce l'elenco delle persone con il titolo aggiunto
    } catch (error) {
        console.error("Errore nel recupero dei people:", error);
        // Logga un errore in caso di problemi nella chiamata API.
        return []; // Ritorna un array vuoto in caso di errore
    }
};

// Funzione per ottenere le serie TV di tendenza
export const getTV = async () => {
    try {
        const result = await callApi("trending/tv/day");
        // Chiama la funzione generica `callApi` con il percorso specifico per le serie TV di tendenza.
        return result; // Restituisce i risultati ottenuti
    } catch (error) {
        console.error("Errore nel recupero dei TV:", error);
        // Logga un errore in caso di problemi nella chiamata API.
        return []; // Ritorna un array vuoto in caso di errore
    }
};

// Funzione generica per chiamare l'API TMDB
const callApi = async (apiURL: string) => {
    try {
        const response = await fetch(`${BASE_URL}${apiURL}?api_key=${API_KEY}`);
        // Effettua una richiesta GET all'API TMDB combinando l'URL base, il percorso e la chiave API.

        if (!response.ok) throw new Error("Errore nella richiesta a TMDB");
        // Se la risposta non è valida (status code non nella gamma 200-299), lancia un'eccezione.

        const data: ResponseTrendingType = await response.json();
        // Converte la risposta JSON in un oggetto del tipo `ResponseTrendingType`.

        return data.results; // Restituisce solo la proprietà `results` della risposta
    } catch (error) {
        console.error("Errore nel recupero dei dati:", error);
        // Logga un errore se si verifica un problema durante la richiesta.
        return []; // Ritorna un array vuoto in caso di errore
    }
};