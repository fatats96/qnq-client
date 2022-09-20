import { Movie } from "./movie";

export interface Genre {
    id: number;
    genreId: number;
    name: string;
    movies: Movie[];
}