import { openDB } from 'idb';
import type { Movie } from '../contexts/MovieContext';

const DB_NAME = 'cineroll-db';
const DB_VERSION = 1;
const MOVIES_STORE = 'movies';

const initDB = () =>
    openDB(DB_NAME, DB_VERSION, {
        upgrade(db) {
            if (!db.objectStoreNames.contains(MOVIES_STORE)) {
                db.createObjectStore(MOVIES_STORE, { keyPath: 'id' });
            }
        },
    });

export const getLocalMovies = async (): Promise<Movie[]> => {
    const db = await initDB();
    return db.getAll(MOVIES_STORE);
};

export const saveLocalMovie = async (movie: Movie) => {
    const db = await initDB();
    return db.put(MOVIES_STORE, movie);
};

export const deleteLocalMovie = async (id: string) => {
    const db = await initDB();
    return db.delete(MOVIES_STORE, id);
};