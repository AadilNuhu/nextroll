import { useMovies } from '../contexts/MovieContext';
import type { Movie } from '../contexts/MovieContext';
import MovieCard from './MovieCard';

const KanbanBoard = () => {
    const { movies, updateMovie } = useMovies();

    const handleDragOver = (e: React.DragEvent) => {
        e.preventDefault();
    };

    const handleDrop = (e: React.DragEvent, status: Movie['status']) => {
        e.preventDefault();
        const id = e.dataTransfer.getData('movieId');
        if (id) {
            updateMovie(id, { status });
        }
    };

    const columns: { id: Movie['status']; title: string; color: string; badge: string }[] = [
        {
            id: 'not_watched',
            title: 'Not Watched',
            color: 'border-slate-500',
            badge: 'bg-slate-500/20 text-slate-300',
        },
        {
            id: 'watching',
            title: 'Currently Watching',
            color: 'border-pink-500',
            badge: 'bg-pink-500/20 text-pink-300',
        },
        {
            id: 'watched',
            title: 'Have Watched',
            color: 'border-purple-500',
            badge: 'bg-purple-500/20 text-purple-300',
        },
    ];

    return (
        <div className="mobile-kanban-container flex h-full items-start gap-6 md:flex-row">
            {columns.map((col, index) => {
                const columnMovies = movies.filter((m) => m.status === col.id);

                return (
                    <div
                        key={col.id}
                        onDragOver={handleDragOver}
                        onDrop={(e) => handleDrop(e, col.id)}
                        className={`mobile-kanban-column glass-panel animate-fade-in flex min-h-[400px] flex-1 flex-col gap-4 rounded-xl border-t-4 ${col.color} p-4`}
                        style={{ animationDelay: `${index * 0.15}s` }}
                    >
                        <div className="flex items-center justify-between">
                            <h2 className="text-lg font-bold">{col.title}</h2>
                            <span className={`rounded-full px-2.5 py-1 text-xs font-bold ${col.badge}`}>
                                {columnMovies.length}
                            </span>
                        </div>

                        <div className="flex flex-col gap-4">
                            {columnMovies.map((movie) => (
                                <MovieCard key={movie.id} movie={movie} />
                            ))}
                            {columnMovies.length === 0 && (
                                <div className="rounded-lg border border-dashed border-slate-700 px-4 py-10 text-center text-sm text-slate-500">
                                    No movies here yet
                                </div>
                            )}
                        </div>
                    </div>
                );
            })}
        </div>
    );
};

export default KanbanBoard;