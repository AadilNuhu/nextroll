import { useState } from 'react';
import KanbanBoard from '../components/KanbanBoard';
import { useMovies } from '../contexts/MovieContext';
import { FiFilm, FiPlus, FiX } from 'react-icons/fi';

const inputClass =
    'w-full rounded-lg border border-slate-700 bg-slate-900/50 p-3 text-white outline-none transition-colors focus:border-pink-500';

const Dashboard = () => {
    const { movies, loading, addMovie } = useMovies();
    const [showAdd, setShowAdd] = useState(false);
    const [title, setTitle] = useState('');
    const [year, setYear] = useState('');
    const [posterUrl, setPosterUrl] = useState('');
    const [rating, setRating] = useState<number | null>(null);
    const [notes, setNotes] = useState('');

    const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;
        const reader = new FileReader();
        reader.onloadend = () => setPosterUrl(reader.result as string);
        reader.readAsDataURL(file);
    };

    const resetForm = () => {
        setTitle('');
        setYear('');
        setPosterUrl('');
        setRating(null);
        setNotes('');
        setShowAdd(false);
    };

    const handleAdd = (e: React.FormEvent) => {
        e.preventDefault();
        if (!title.trim()) return;

        addMovie({
            title: title.trim(),
            year: parseInt(year) || new Date().getFullYear(),
            poster_url: posterUrl,
            status: 'not_watched',
            rating,
            notes: notes.trim(),
        });
        resetForm();
    };

    return (
        <div className="flex flex-col gap-6">
            <div className="flex flex-col gap-4 rounded-2xl border border-white/5 bg-slate-800/40 p-6 backdrop-blur-md sm:flex-row sm:items-center sm:justify-between">
                <div>
                    <h1 className="bg-clip-text text-transparent bg-gradient-to-r from-pink-400 to-purple-400 text-2xl font-bold md:text-3xl">
                        My Movie Library
                    </h1>
                    <p className="mt-1 text-sm text-slate-400">
                        {movies.length === 0
                            ? 'Track, rate, and organize your movies — all stored on this device.'
                            : `${movies.length} ${movies.length === 1 ? 'movie' : 'movies'} in your library.`}
                    </p>
                </div>
                <button
                    onClick={() => setShowAdd(!showAdd)}
                    className="inline-flex shrink-0 items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-pink-600 to-purple-600 px-5 py-3 font-bold text-white shadow-lg shadow-pink-500/20 transition-colors hover:from-pink-500 hover:to-purple-500"
                >
                    {showAdd ? <FiX className="h-4 w-4" /> : <FiPlus className="h-4 w-4" />}
                    {showAdd ? 'Cancel' : 'Add Movie'}
                </button>
            </div>

            {showAdd && (
                <form onSubmit={handleAdd} className="glass-panel animate-fade-in rounded-2xl p-5 md:p-6">
                    <h2 className="mb-5 text-lg font-bold text-white">Add a movie</h2>
                    <div className="grid gap-5 md:grid-cols-[1fr_auto]">
                        <div className="space-y-4">
                            <div>
                                <label htmlFor="movie-title" className="mb-1 block text-sm font-medium text-slate-300">
                                    Title
                                </label>
                                <input
                                    id="movie-title"
                                    type="text"
                                    required
                                    placeholder="e.g. Inception"
                                    className={inputClass}
                                    value={title}
                                    onChange={(e) => setTitle(e.target.value)}
                                />
                            </div>
                            <div className="grid gap-4 sm:grid-cols-2">
                                <div>
                                    <label htmlFor="movie-year" className="mb-1 block text-sm font-medium text-slate-300">
                                        Year
                                    </label>
                                    <input
                                        id="movie-year"
                                        type="number"
                                        placeholder="e.g. 2010"
                                        className={inputClass}
                                        value={year}
                                        onChange={(e) => setYear(e.target.value)}
                                    />
                                </div>
                                <div>
                                    <label htmlFor="movie-rating" className="mb-1 block text-sm font-medium text-slate-300">
                                        Rating
                                    </label>
                                    <select
                                        id="movie-rating"
                                        className={inputClass}
                                        value={rating ?? ''}
                                        onChange={(e) => setRating(e.target.value ? parseInt(e.target.value) : null)}
                                    >
                                        <option value="">No rating</option>
                                        {[1, 2, 3, 4, 5].map((n) => (
                                            <option key={n} value={n}>
                                                {n} {n === 1 ? 'Star' : 'Stars'}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                            </div>
                            <div>
                                <label htmlFor="movie-notes" className="mb-1 block text-sm font-medium text-slate-300">
                                    Notes
                                </label>
                                <textarea
                                    id="movie-notes"
                                    placeholder="Jot down your thoughts about this movie..."
                                    className={`${inputClass} h-20 resize-none`}
                                    value={notes}
                                    onChange={(e) => setNotes(e.target.value)}
                                />
                            </div>
                        </div>

                        <div className="flex items-start gap-4 md:w-44 md:flex-col">
                            <div className="flex-1">
                                <label htmlFor="movie-poster" className="mb-1 block text-sm font-medium text-slate-300">
                                    Poster
                                </label>
                                <input
                                    id="movie-poster"
                                    type="file"
                                    accept="image/*"
                                    onChange={handleImageUpload}
                                    className="w-full text-sm text-slate-300 file:mr-3 file:rounded-full file:border-0 file:bg-pink-500/20 file:px-4 file:py-2 file:font-semibold file:text-pink-400 hover:file:bg-pink-500/30"
                                />
                            </div>
                            {posterUrl && (
                                <img
                                    src={posterUrl}
                                    alt="Poster preview"
                                    className="h-24 w-16 shrink-0 rounded-lg object-cover shadow-md"
                                />
                            )}
                        </div>
                    </div>

                    <div className="mt-6 flex justify-end gap-3">
                        <button
                            type="button"
                            onClick={resetForm}
                            className="rounded-lg px-4 py-2 text-sm font-medium text-slate-300 transition-colors hover:bg-white/10"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            className="rounded-lg bg-gradient-to-r from-pink-600 to-purple-600 px-5 py-2 text-sm font-bold text-white shadow-lg shadow-pink-500/20 transition-colors hover:from-pink-500 hover:to-purple-500"
                        >
                            Add to library
                        </button>
                    </div>
                </form>
            )}

            {loading ? (
                <div className="flex flex-col items-center justify-center gap-3 rounded-2xl py-20 text-slate-400">
                    <div className="h-8 w-8 animate-spin rounded-full border-2 border-pink-500 border-t-transparent" />
                    <p className="text-sm">Loading your library…</p>
                </div>
            ) : movies.length === 0 && !showAdd ? (
                <div className="glass-panel animate-fade-in flex flex-col items-center gap-4 rounded-2xl px-6 py-16 text-center">
                    <span className="grid h-16 w-16 place-items-center rounded-2xl bg-gradient-to-br from-pink-500/20 to-purple-500/20 ring-1 ring-white/10">
                        <FiFilm className="h-7 w-7 text-pink-400" />
                    </span>
                    <div>
                        <h2 className="text-xl font-bold text-white">Your library is empty</h2>
                        <p className="mx-auto mt-1 max-w-sm text-sm text-slate-400">
                            Add your first movie to start tracking what you've watched and what's next. Everything is
                            saved on this device, so nextRoll works fully offline.
                        </p>
                    </div>
                    <button
                        onClick={() => setShowAdd(true)}
                        className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-pink-600 to-purple-600 px-5 py-3 font-bold text-white shadow-lg shadow-pink-500/20 transition-colors hover:from-pink-500 hover:to-purple-500"
                    >
                        <FiPlus className="h-4 w-4" /> Add your first movie
                    </button>
                </div>
            ) : (
                <KanbanBoard />
            )}
        </div>
    );
};

export default Dashboard;