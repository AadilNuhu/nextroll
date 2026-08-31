import { useState } from 'react';
import { useMovies } from '../contexts/MovieContext';
import type { Movie } from '../contexts/MovieContext';
import { FiTrash2, FiEdit2, FiCheck, FiFilm } from 'react-icons/fi';
import { FaStar } from 'react-icons/fa';

const MoviePoster = ({ movie }: { movie: Movie }) => {
    const [failed, setFailed] = useState(false);

    if (!movie.poster_url || failed) {
        return (
            <div
                aria-hidden="true"
                className="grid h-24 w-16 shrink-0 place-items-center rounded-lg bg-gradient-to-br from-pink-600/25 to-purple-600/25 ring-1 ring-white/10"
            >
                <FiFilm className="h-6 w-6 text-white/40" />
            </div>
        );
    }

    return (
        <img
            src={movie.poster_url}
            alt={movie.title}
            loading="lazy"
            onError={() => setFailed(true)}
            className="h-24 w-16 shrink-0 rounded-lg object-cover shadow-md"
        />
    );
};

const MovieCard = ({ movie }: { movie: Movie }) => {
    const { updateMovie, removeMovie } = useMovies();
    const [isEditing, setIsEditing] = useState(false);
    const [title, setTitle] = useState(movie.title);
    const [year, setYear] = useState(movie.year.toString());
    const [rating, setRating] = useState<number | null>(movie.rating);
    const [notes, setNotes] = useState(movie.notes || '');

    const handleDragStart = (e: React.DragEvent) => {
        e.dataTransfer.setData('movieId', movie.id);
        e.dataTransfer.effectAllowed = 'move';
    };

    const handleStatusChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        updateMovie(movie.id, { status: e.target.value as Movie['status'] });
    };

    const handleSave = () => {
        updateMovie(movie.id, {
            title: title.trim() || movie.title,
            year: parseInt(year) || movie.year,
            rating,
            notes: notes.trim(),
        });
        setIsEditing(false);
    };

    return (
        <div
            draggable
            onDragStart={handleDragStart}
            className="group relative flex cursor-grab items-start gap-4 rounded-xl border border-white/5 bg-slate-900/60 p-3 shadow-lg transition-all hover:border-pink-500/50 hover:bg-slate-800/80 active:cursor-grabbing"
        >
            <MoviePoster movie={movie} />
            <div className="min-w-0 flex-1 py-1 pr-8">
                {isEditing ? (
                    <div className="flex flex-col gap-2">
                        <input
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            aria-label="Title"
                            className="w-full rounded border border-slate-600 bg-slate-800 p-1 text-sm text-white"
                        />
                        <div className="flex gap-2">
                            <input
                                value={year}
                                onChange={(e) => setYear(e.target.value)}
                                aria-label="Year"
                                className="w-1/3 rounded border border-slate-600 bg-slate-800 p-1 text-sm text-white"
                            />
                            <select
                                value={rating ?? ''}
                                onChange={(e) => setRating(e.target.value ? parseInt(e.target.value) : null)}
                                aria-label="Rating"
                                className="w-2/3 rounded border border-slate-600 bg-slate-800 p-1 text-sm text-white"
                            >
                                <option value="">No Rating</option>
                                {[1, 2, 3, 4, 5].map((n) => (
                                    <option key={n} value={n}>
                                        {n} {n === 1 ? 'Star' : 'Stars'}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <textarea
                            value={notes}
                            onChange={(e) => setNotes(e.target.value)}
                            aria-label="Notes"
                            placeholder="Add notes..."
                            className="h-16 w-full resize-none rounded border border-slate-600 bg-slate-800 p-1 text-sm text-white"
                        />
                    </div>
                ) : (
                    <div>
                        <h3 className="line-clamp-1 font-bold text-slate-200">{movie.title}</h3>
                        <div className="mt-0.5 flex items-center gap-2">
                            <p className="text-sm text-slate-400">{movie.year}</p>
                            {movie.rating && (
                                <div className="flex text-xs text-yellow-400">
                                    {[...Array(movie.rating)].map((_, i) => (
                                        <FaStar key={i} />
                                    ))}
                                </div>
                            )}
                        </div>
                        {movie.notes && (
                            <p className="mt-1 line-clamp-2 text-xs italic text-slate-500">"{movie.notes}"</p>
                        )}
                    </div>
                )}

                <select
                    value={movie.status}
                    onChange={handleStatusChange}
                    onClick={(e) => e.stopPropagation()}
                    aria-label="Status"
                    className="mt-2 w-full rounded border border-slate-600 bg-slate-800 p-1 text-xs text-white md:hidden"
                >
                    <option value="not_watched">Not Watched</option>
                    <option value="watching">Watching</option>
                    <option value="watched">Have Watched</option>
                </select>
            </div>

            <div className="absolute right-2 top-2 flex gap-2 opacity-100 transition-opacity md:opacity-0 md:group-hover:opacity-100">
                {isEditing ? (
                    <button
                        onClick={handleSave}
                        aria-label="Save changes"
                        className="rounded-lg border border-green-500/20 bg-green-500/20 p-2 text-green-400 transition-colors hover:bg-green-500 hover:text-white"
                    >
                        <FiCheck size={14} />
                    </button>
                ) : (
                    <button
                        onClick={() => setIsEditing(true)}
                        aria-label={`Edit ${movie.title}`}
                        className="rounded-lg border border-blue-500/20 bg-blue-500/20 p-2 text-blue-400 transition-colors hover:bg-blue-500 hover:text-white"
                    >
                        <FiEdit2 size={14} />
                    </button>
                )}
                <button
                    onClick={() => removeMovie(movie.id)}
                    aria-label={`Delete ${movie.title}`}
                    className="rounded-lg border border-red-500/20 bg-red-500/20 p-2 text-red-400 transition-colors hover:bg-red-500 hover:text-white"
                >
                    <FiTrash2 size={14} />
                </button>
            </div>
        </div>
    );
};

export default MovieCard;