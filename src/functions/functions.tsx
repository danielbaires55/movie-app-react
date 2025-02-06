import { MediaType } from "../types/movieTypes"; 
// Importa il tipo TypeScript `MediaType` per definire i tipi di dati accettati dalla funzione `getMediaImage`

// URL base per le immagini, recuperato da una variabile d'ambiente tramite `import.meta.env`
export const base_url = "https://image.tmdb.org/t/p/w500";

// Funzione per ottenere il percorso completo dell'immagine
export const getImagePath = (
    base_url: string, // URL base per le immagini
    path: string | null | undefined // Percorso parziale dell'immagine (può essere nullo o indefinito)
): string | null => {
    if (!path) return null; // Se `path` non è definito, ritorna `null`
    return `${base_url}${path}`; // Combina l'URL base con il percorso dell'immagine
};

// Funzione per ottenere l'immagine di un elemento multimediale (film, serie TV o persona)
export const getMediaImage = (item: MediaType): string => {
    const placeholderImage = 'https://upload.wikimedia.org/wikipedia/commons/1/14/No_Image_Available.jpg'; 
    // Immagine di placeholder usata quando non è disponibile un'immagine valida

    if (!item) {
        return placeholderImage; // Se l'elemento non è definito, ritorna il placeholder
    }

    // Gestione dei diversi tipi di media
    switch (item.media_type) {
        case 'movie': // Per i film
        case 'tv': // Per le serie TV
            return getImagePath(base_url, item.poster_path) || placeholderImage; 
            // Usa `poster_path` per costruire l'URL dell'immagine; fallback al placeholder se non disponibile

        case 'person': // Per le persone
            return getImagePath(base_url, item.profile_path) || placeholderImage; 
            // Usa `profile_path` per costruire l'URL dell'immagine; fallback al placeholder se non disponibile
            
        default:
            return placeholderImage; // Ritorna il placeholder per tipi di media sconosciuti
    }
};