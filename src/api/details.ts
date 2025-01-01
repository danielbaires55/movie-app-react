import { MovieDetailsType, TvDetailsType, PersonDetailsType } from "../types/detailsTypes";

const API_KEY = import.meta.env.VITE_API_KEY;
const BASE_URL = import.meta.env.VITE_BASE_URL;

export const getDetails = async ({ media_type, id }: { media_type: string; id: number }): Promise<MovieDetailsType | TvDetailsType | PersonDetailsType> => {
  try {
    const response = await fetch(`${BASE_URL}${media_type}/${id}?api_key=${API_KEY}`);
    if (!response.ok) throw new Error("Errore nella richiesta a TMDB");
    const data = await response.json();
    return data;
  } catch (error) {
    throw error;
  }
};