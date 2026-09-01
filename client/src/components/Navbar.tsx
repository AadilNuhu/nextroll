import { Link, NavLink } from 'react-router';
import { FiDatabase, FiFilm } from 'react-icons/fi';

const Navbar = () => {
    return (
        <nav className="glass-panel sticky rounded-full mx-2 top-1 z-50 flex items-center justify-between px-4 py-3 md:px-6 md:py-4">
            <Link to="/" aria-label="nextRoll home" className="flex items-center gap-3">
                <span className="grid h-9 w-9 place-items-center rounded-xl bg-gradient-to-br from-pink-500 to-purple-500 text-white shadow-lg shadow-pink-500/20">
                    <FiFilm className="h-4 w-4" />
                </span>
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-pink-500 to-purple-500 text-xl font-bold md:text-2xl">
                    nextRoll
                </span>
            </Link>

            <div className="flex items-center gap-3 md:gap-4">
                <span className="hidden items-center gap-2 text-xs text-slate-400 sm:flex md:text-sm">
                    <FiDatabase className="shrink-0 text-emerald-400" />
                    <span>Saved on this device</span>
                </span>
                <NavLink
                    to="/library"
                    className={({ isActive }) =>
                        `inline-flex items-center gap-2 rounded-xl px-4 py-2 text-sm font-bold transition-colors ${
                            isActive
                                ? 'bg-gradient-to-r from-pink-600 to-purple-600 text-white shadow-lg shadow-pink-500/20'
                                : 'border border-white/10 bg-white/5 text-slate-200 hover:bg-white/10'
                        }`
                    }
                >
                    <FiFilm className="h-4 w-4" /> My Library
                </NavLink>
            </div>
        </nav>
    );
};

export default Navbar;