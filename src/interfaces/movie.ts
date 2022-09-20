import { Genre } from "./genre";

export interface Movie {
    id: number;
    title: string;
    adult: boolean;
    overview: string;
    releaseDate: string;
    originalTitle: string;
    originalLanguage: string;
    posterPath: string;
    genres: Genre[];
}
