/* eslint-disable no-useless-catch */
import { MovieDetailsType, TvDetailsType } from "../types/detailsTypes";
// Importa i tipi TypeScript che definiscono la struttura dei dettagli di film, serie TV e persone.

const BASE_URL = "http://localhost:8080/api";
// Recupera l'URL base dell'API TMDB da una variabile d'ambiente.

export const getDetails = async ({ media_type, id }: { media_type: string; id: number }): Promise<MovieDetailsType | TvDetailsType> => {
  // Funzione asincrona per ottenere i dettagli di un film, una serie TV o una persona.
  // Accetta un oggetto con due proprietà:
  // - `media_type`: Specifica il tipo di media ("movie", "tv", "person").
  // - `id`: L'identificativo univoco del media.

  try {
    const endpoint = media_type === "movie" ? "movies" : media_type;
    const response = await fetch(`${BASE_URL}/${endpoint}/${id}`);
    // Esegue una richiesta HTTP GET all'endpoint di TMDB usando l'URL costruito.

    if (!response.ok) throw new Error("Errore nella richiesta al backend");
    // Controlla se la risposta non è valida (status code non nella gamma 200-299).
    // In caso di errore, lancia un'eccezione con un messaggio.

    const data = await response.json();
    // Se la risposta è valida, estrae i dati JSON dalla risposta.

    return data;
    // Restituisce i dati ottenuti come risultato della funzione.

  } catch (error) {
    throw error;
    // In caso di errore (ad esempio, rete non disponibile o risposta non valida),
    // l'errore viene rilanciato per essere gestito dal chiamante.
  }
};