import { Link } from 'react-router';
import {
    FiArrowRight,
    FiCheckCircle,
    FiColumns,
    FiEdit3,
    FiFilm,
    FiLock,
    FiPlus,
    FiStar,
    FiWifiOff,
} from 'react-icons/fi';
import { useMovies } from '../contexts/MovieContext';

const primaryBtn =
    'inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-pink-600 to-purple-600 px-6 py-3.5 font-bold text-white shadow-lg shadow-pink-500/30 transition-all hover:-translate-y-0.5 hover:from-pink-500 hover:to-purple-500';
const ghostBtn =
    'inline-flex items-center justify-center gap-2 rounded-xl border border-white/10 bg-white/5 px-6 py-3.5 font-semibold text-slate-200 transition-all hover:-translate-y-0.5 hover:bg-white/10';

const posters = [
    {
        title: 'Dune',
        year: '2021',
        src: '/posters/dune.jpg',
        top: '0%',
        right: '4%',
        rotate: -7,
        delay: '0s',
    },
    {
        title: 'Inception',
        year: '2010',
        src: '/posters/inception.jpg',
        top: '14%',
        right: '17%',
        rotate: 0,
        delay: '1.2s',
    },
    {
        title: 'Parasite',
        year: '2019',
        src: '/posters/parasite.jpg',
        top: '28%',
        right: '30%',
        rotate: 7,
        delay: '2.4s',
    },
];

const features = [
    {
        icon: FiWifiOff,
        title: 'Works offline',
        desc: 'No internet, no server, no problem. Your library lives in this browser and is ready whenever you are.',
    },
    {
        icon: FiColumns,
        title: 'Track every status',
        desc: 'Organize movies into Not Watched, Currently Watching, and Watched — drag and drop at any time.',
    },
    {
        icon: FiStar,
        title: 'Rate & review',
        desc: 'Crown your favorites with a star rating and keep personal notes for every film you watch.',
    },
    {
        icon: FiLock,
        title: 'Private by design',
        desc: 'No account, no tracking, no cloud. Everything you add stays on this device, under your control.',
    },
];

const steps = [
    {
        icon: FiPlus,
        title: 'Add a movie',
        desc: 'Type in a title, add a poster from your device, and it is saved instantly.',
    },
    {
        icon: FiEdit3,
        title: 'Move it along',
        desc: 'Drag cards between Not Watched, Currently Watching, and Watched as you progress.',
    },
    {
        icon: FiCheckCircle,
        title: 'Rate & remember',
        desc: 'Add star ratings and notes to build your personal cinematic journal.',
    },
];

const Landing = () => {
    useMovies()

    return (
        <div className="flex flex-col gap-20 pb-8 md:gap-28">
            <section className="glass-panel animate-fade-in relative overflow-hidden rounded-3xl p-8 md:p-14">
                <div className="relative grid items-center gap-12 md:grid-cols-[1.1fr_1fr]">
                    <div>
                        <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs uppercase tracking-[0.2em] text-slate-300">
                            <FiFilm className="text-pink-400" /> Your personal movie vault
                        </span>
                        <h1 className="font-display mt-6 text-4xl font-bold leading-[1.05] tracking-tight md:text-6xl lg:text-7xl">
                            Every film you love,{' '}
                            <span className="text-gradient">organized beautifully.</span>
                        </h1>
                        <p className="mt-6 max-w-xl text-base leading-relaxed text-slate-400 md:text-lg">
                            nextRoll is a private, offline-first movie tracker. Queue what&apos;s next, rate what you&apos;ve
                            seen, and take notes all saved on this device. No account required.
                        </p>
                        <div className="mt-8 flex flex-col md:flex-row gap-3">
                            <Link to="/library" className={`${primaryBtn} w-full`}>
                                Start tracking <FiArrowRight />
                            </Link>

                            <a href="#features" className={`${ghostBtn} w-full`}>
                                See how it works
                            </a>
                        </div>
                        <div className="mt-9 flex flex-wrap items-center gap-x-6 gap-y-3 text-sm text-slate-500">
                            <span className="flex items-center gap-2">
                                <FiWifiOff className="text-emerald-400" /> 100% offline
                            </span>
                            <span className="flex items-center gap-2">
                                <FiLock className="text-emerald-400" /> No account
                            </span>
                            
                        </div>
                    </div>

                    <div className="relative hidden h-80 md:block">
                        {posters.map((p) => (
                            <div
                                key={p.title}
                                className="absolute"
                                style={{ top: p.top, right: p.right, transform: `rotate(${p.rotate}deg)` }}
                            >
                                <div className="animate-float w-44" style={{ animationDelay: p.delay }}>
                                    <div className="relative aspect-[2/3] overflow-hidden rounded-2xl shadow-2xl ring-1 ring-white/20">
                                        <img
                                            src={p.src}
                                            alt={`${p.title} movie poster`}
                                            loading="lazy"
                                            className="h-full w-full object-cover"
                                        />
                                        <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent p-4 pt-12">
                                            <p className="text-base font-bold tracking-tight text-white drop-shadow-md">
                                                {p.title}
                                            </p>
                                            <p className="text-xs font-medium text-white/80">{p.year}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            <section id="features" className="scroll-mt-24">
                <div className="mx-auto mb-12 max-w-2xl text-center">
                    <p className="text-xs font-semibold uppercase tracking-[0.25em] text-pink-400">Why nextRoll</p>
                    <h2 className="font-display mt-3 text-3xl font-bold tracking-tight md:text-5xl">
                        Designed for film lovers
                    </h2>
                    <p className="mt-4 text-slate-400">
                        A focused tool that gets out of your way — so you spend more time watching and less time
                        managing.
                    </p>
                </div>

                <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
                    {features.map((feature) => (
                        <div
                            key={feature.title}
                            className="glass-panel group rounded-2xl p-6 transition-all hover:-translate-y-1 hover:border-pink-500/40"
                        >
                            <span className="mb-5 grid h-12 w-12 place-items-center rounded-xl bg-gradient-to-br from-pink-500/20 to-purple-500/20 ring-1 ring-white/10 transition-transform group-hover:scale-110">
                                <feature.icon className="h-6 w-6 text-pink-400" />
                            </span>
                            <h3 className="text-lg font-bold">{feature.title}</h3>
                            <p className="mt-2 text-sm leading-relaxed text-slate-400">{feature.desc}</p>
                        </div>
                    ))}
                </div>
            </section>

            <section id="how" className="scroll-mt-24">
                <div className="mx-auto mb-12 max-w-2xl text-center">
                    <p className="text-xs font-semibold uppercase tracking-[0.25em] text-purple-400">How it works</p>
                    <h2 className="font-display mt-3 text-3xl font-bold tracking-tight md:text-5xl">
                        From idea to rewatch, in three steps
                    </h2>
                </div>

                <div className="grid gap-6 md:grid-cols-3">
                    {steps.map((step, index) => (
                        <div key={step.title} className="glass-panel relative rounded-2xl p-6 pt-10">
                            <span className="absolute -top-4 left-6 grid h-9 w-9 place-items-center rounded-full bg-gradient-to-br from-pink-600 to-purple-600 font-bold text-white shadow-lg shadow-pink-500/30">
                                {index + 1}
                            </span>
                            <step.icon className="mb-4 h-7 w-7 text-pink-400" />
                            <h3 className="text-lg font-bold">{step.title}</h3>
                            <p className="mt-2 text-sm leading-relaxed text-slate-400">{step.desc}</p>
                        </div>
                    ))}
                </div>
            </section>

            <section className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-pink-600 via-purple-600 to-indigo-600 px-8 py-14 text-center shadow-2xl shadow-pink-500/20 md:py-18">
                <div className="mx-auto max-w-2xl">
                    <h2 className="font-display text-3xl font-bold tracking-tight text-white md:text-5xl">
                        Ready to start your movie journey?
                    </h2>
                    <p className="mx-auto mt-4 max-w-md text-white/90">
                        Open your library and add your first film. It&apos;s free, private, and works completely offline.
                    </p>
                    <Link
                        to="/library"
                        className="mt-8 inline-flex items-center gap-2 rounded-xl bg-white px-7 py-3.5 font-bold text-slate-900 shadow-xl transition-all hover:-translate-y-0.5 hover:bg-slate-100"
                    >
                        Open my library <FiArrowRight />
                    </Link>
                </div>
            </section>

            <footer className="pb-2 text-center text-sm text-slate-600">
                nextRoll — built for movie lovers. Runs entirely on this device; your library never leaves it.
            </footer>
        </div>
    );
};

export default Landing;