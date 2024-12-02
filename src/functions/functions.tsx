
import { MediaType } from "../types/movieTypes";

//Img
export const base_url = import.meta.env.VITE_IMG_BASE_URL;

export const getImagePath = (
    base_url: string,
    path: string | null | undefined
): string | null => {
    if (!path) return null;
    return `${base_url}${path}`;
};

export const getMediaImage = (item: MediaType): string => {
    const placeholderImage = 'https://via.placeholder.com/300x450';

    if (!item) {
        return placeholderImage;
    }

    switch (item.media_type) {
        case 'movie':
        case 'tv':
            return getImagePath(base_url,  item.poster_path) || placeholderImage;

        case 'person':           
            return getImagePath(base_url, item.profile_path) || placeholderImage;
            
        default:
            return placeholderImage;
    }
};
;