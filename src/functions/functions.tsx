import { MediaType } from "../types/movieTypes"; 
// Importa il tipo TypeScript `MediaType` per definire i tipi di dati accettati dalla funzione `getMediaImage`

// URL base per le immagini di TMDB
const BASE_IMAGE_URL = "https://image.tmdb.org/t/p/w500";

// Funzione per ottenere il percorso dell'immagine
export const getImagePath = (path: string | null | undefined): string => {
    if (!path) return "/placeholder.jpg";
    return `${BASE_IMAGE_URL}${path}`;
};

// Funzione per ottenere l'immagine del media
export const getMediaImage = (item: any): string => {
    if (!item) return "/placeholder.jpg";
    // Usa posterPath se esiste, altrimenti poster_path
    const path = item.posterPath || item.poster_path;
    return getImagePath(path);
};