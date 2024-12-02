
import { MediaType } from "./movieTypes";

export type ResponseTrendingType = {
    results: MediaType[];
    page: number;
    total_pages: number;
    total_results: number;
    media_type: MediaType;
};