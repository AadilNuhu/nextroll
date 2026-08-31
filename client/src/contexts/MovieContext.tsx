import { createContext, useContext, useEffect, useState } from 'react';
import type { ReactNode } from 'react';
import { getLocalMovies, saveLocalMovie, deleteLocalMovie } from '../services/db';

export interface Movie {
    id: string;
    title: string;
    year: number;
    poster_url: string;
    status: 'not_watched' | 'watching' | 'watched';
    rating: number | null;
    notes: string;
}

interface MovieContextType {
    movies: Movie[];
    loading: boolean;
    addMovie: (movie: Omit<Movie, 'id'>) => Promise<void>;
    updateMovie: (id: string, updates: Partial<Movie>) => Promise<void>;
    removeMovie: (id: string) => Promise<void>;
}

const MovieContext = createContext<MovieContextType | undefined>(undefined);

export const MovieProvider = ({ children }: { children: ReactNode }) => {
    const [movies, setMovies] = useState<Movie[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        getLocalMovies()
            .then(setMovies)
            .finally(() => setLoading(false));
    }, []);

    const refresh = async () => {
        setMovies(await getLocalMovies());
    };

    const addMovie = async (movieData: Omit<Movie, 'id'>) => {
        await saveLocalMovie({ ...movieData, id: crypto.randomUUID() });
        await refresh();
    };

    const updateMovie = async (id: string, updates: Partial<Movie>) => {
        const local = await getLocalMovies();
        const movie = local.find((m: Movie) => m.id === id);
        if (!movie) return;
        await saveLocalMovie({ ...movie, ...updates });
        await refresh();
    };

    const removeMovie = async (id: string) => {
        await deleteLocalMovie(id);
        await refresh();
    };

    return (
        <MovieContext.Provider value={{ movies, loading, addMovie, updateMovie, removeMovie }}>
            {children}
        </MovieContext.Provider>
    );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useMovies = () => {
    const context = useContext(MovieContext);
    if (!context) throw new Error('useMovies must be used within MovieProvider');
    return context;
};