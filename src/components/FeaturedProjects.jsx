import { useState, useEffect, useCallback } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { FaChevronLeft, FaChevronRight, FaExpand, FaTimes, FaCheck } from 'react-icons/fa';
import { featuredProjects } from '../data/portfolioData';

const pad = (n) => String(n).padStart(2, '0');

/** Full-screen viewer for one project's screenshots. */
const Lightbox = ({ project, index, setIndex, onClose }) => {
    const total = project.gallery.length;
    const go = useCallback((d) => setIndex((i) => (i + d + total) % total), [setIndex, total]);

    useEffect(() => {
        const onKey = (e) => {
            if (e.key === 'Escape') onClose();
            if (e.key === 'ArrowRight') go(1);
            if (e.key === 'ArrowLeft') go(-1);
        };
        document.body.style.overflow = 'hidden';
        window.addEventListener('keydown', onKey);
        return () => {
            document.body.style.overflow = '';
            window.removeEventListener('keydown', onKey);
        };
    }, [go, onClose]);

    const shot = project.gallery[index];

    return (
        <motion.div
            role="dialog"
            aria-modal="true"
            aria-label={`${project.title} screenshots`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[110] flex flex-col bg-black/90 backdrop-blur-md"
        >
            <div className="flex items-center justify-between px-4 py-4 text-white sm:px-8">
                <p className="min-w-0 truncate text-sm">
                    <span className="font-mono text-white/50">{pad(index + 1)} / {pad(total)}</span>
                    <span className="ml-3 font-medium">{shot.caption}</span>
                </p>
                <button
                    type="button"
                    onClick={onClose}
                    aria-label="Close"
                    className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-white/15 transition hover:bg-white/10"
                >
                    <FaTimes />
                </button>
            </div>

            <div className="relative flex min-h-0 flex-1 items-center justify-center px-4 pb-8 sm:px-20">
                <AnimatePresence mode="wait">
                    <motion.img
                        key={shot.src}
                        src={shot.src}
                        alt={shot.caption}
                        initial={{ opacity: 0, scale: 0.985 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.2 }}
                        className="max-h-full max-w-full rounded-xl object-contain shadow-2xl"
                    />
                </AnimatePresence>
                {[-1, 1].map((d) => (
                    <button
                        key={d}
                        type="button"
                        onClick={() => go(d)}
                        aria-label={d < 0 ? 'Previous screenshot' : 'Next screenshot'}
                        className={`absolute top-1/2 hidden h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full border border-white/15 bg-black/40 text-white transition hover:bg-white/15 sm:inline-flex ${d < 0 ? 'left-5' : 'right-5'}`}
                    >
                        {d < 0 ? <FaChevronLeft /> : <FaChevronRight />}
                    </button>
                ))}
            </div>
        </motion.div>
    );
};

const FeaturedProject = ({ project, rank, reverse }) => {
    const [index, setIndex] = useState(0);
    const [open, setOpen] = useState(false);
    const total = project.gallery.length;
    const shot = project.gallery[index];
    const go = (d) => setIndex((i) => (i + d + total) % total);

    return (
        <motion.article
            initial={{ opacity: 0, y: 32 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="grid gap-8 rounded-3xl border border-zinc-200/80 bg-white p-4 shadow-[0_1px_2px_rgba(0,0,0,0.04)] dark:border-white/10 dark:bg-[#0c0c0c] sm:p-6 lg:grid-cols-[1.35fr_1fr] lg:gap-10 lg:p-8"
        >
            {/* Gallery */}
            <div className={`min-w-0 lg:sticky lg:top-24 lg:self-start ${reverse ? 'lg:order-2' : ''}`}>
                <div className="group relative overflow-hidden rounded-2xl border border-zinc-200 bg-zinc-100 dark:border-white/10 dark:bg-black">
                    <button
                        type="button"
                        onClick={() => setOpen(true)}
                        className="block aspect-[16/10] w-full cursor-zoom-in"
                        aria-label={`Open ${shot.caption} in full screen`}
                    >
                        <AnimatePresence mode="wait" initial={false}>
                            <motion.img
                                key={shot.src}
                                src={shot.src}
                                alt={`${project.title} — ${shot.caption}`}
                                loading="lazy"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                transition={{ duration: 0.25 }}
                                className="h-full w-full object-cover object-top"
                            />
                        </AnimatePresence>
                    </button>

                    <span className="pointer-events-none absolute right-3 top-3 inline-flex h-9 w-9 items-center justify-center rounded-full bg-black/60 text-xs text-white opacity-0 backdrop-blur transition group-hover:opacity-100">
                        <FaExpand aria-hidden />
                    </span>

                    <div className="pointer-events-none absolute inset-x-0 bottom-0 flex items-end justify-between gap-3 bg-gradient-to-t from-black/70 to-transparent px-4 pb-3 pt-10 text-white">
                        <span className="min-w-0 flex-1 truncate text-sm font-medium">{shot.caption}</span>
                        <span className="shrink-0 font-mono text-xs text-white/70">{pad(index + 1)} / {pad(total)}</span>
                    </div>

                    {[-1, 1].map((d) => (
                        <button
                            key={d}
                            type="button"
                            onClick={() => go(d)}
                            aria-label={d < 0 ? 'Previous screenshot' : 'Next screenshot'}
                            className={`absolute top-1/2 inline-flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-white/90 text-zinc-900 shadow-lg transition hover:bg-white sm:opacity-0 sm:group-hover:opacity-100 ${d < 0 ? 'left-3' : 'right-3'}`}
                        >
                            {d < 0 ? <FaChevronLeft className="text-xs" /> : <FaChevronRight className="text-xs" />}
                        </button>
                    ))}
                </div>

                {/* Thumbnails */}
                <div className="mt-3 flex gap-2 overflow-x-auto pb-1 [scrollbar-width:thin]">
                    {project.gallery.map((g, i) => (
                        <button
                            key={g.src}
                            type="button"
                            onClick={() => setIndex(i)}
                            aria-label={`Show ${g.caption}`}
                            aria-current={i === index}
                            className={`relative h-14 w-24 shrink-0 overflow-hidden rounded-lg border transition ${
                                i === index
                                    ? 'border-zinc-900 ring-1 ring-zinc-900 dark:border-white dark:ring-white'
                                    : 'border-zinc-200 opacity-60 hover:opacity-100 dark:border-white/10'
                            }`}
                        >
                            <img src={g.src} alt="" loading="lazy" className="h-full w-full object-cover object-top" />
                        </button>
                    ))}
                </div>
            </div>

            {/* Text */}
            <div className={`flex min-w-0 flex-col px-1 pb-2 sm:px-0 ${reverse ? 'lg:order-1' : ''}`}>
                <div className="mb-5 flex flex-wrap items-center gap-3">
                    <span className="inline-flex items-center rounded-full bg-zinc-900 px-3 py-1 font-mono text-[11px] font-semibold tracking-widest text-white dark:bg-white dark:text-black">
                        TOP {pad(rank)}
                    </span>
                    <span className="text-[11px] font-semibold uppercase tracking-[0.18em] text-zinc-400">
                        {project.context}
                    </span>
                </div>

                <h3 className="font-['Outfit'] text-2xl font-semibold tracking-tight text-zinc-900 dark:text-white md:text-3xl">
                    {project.title}
                </h3>
                <p className="mt-2 text-[15px] font-medium leading-relaxed text-zinc-700 dark:text-zinc-200">
                    {project.tagline}
                </p>
                <p className="mt-4 text-sm leading-relaxed text-zinc-500 dark:text-zinc-400">
                    {project.description}
                </p>

                <ul className="mt-6 space-y-3">
                    {project.highlights.map((h) => (
                        <li key={h} className="flex gap-3 text-sm leading-relaxed text-zinc-600 dark:text-zinc-300">
                            <span className="mt-[3px] inline-flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-zinc-900 text-[8px] text-white dark:bg-white dark:text-black">
                                <FaCheck aria-hidden />
                            </span>
                            {h}
                        </li>
                    ))}
                </ul>

                {project.technologies?.length > 0 && (
                    <div className="mt-6 flex flex-wrap gap-2">
                        {project.technologies.map((tech) => (
                            <span
                                key={tech}
                                className="rounded-full border border-zinc-200 bg-zinc-50 px-3 py-1.5 text-xs font-medium text-zinc-700 dark:border-white/10 dark:bg-white/5 dark:text-zinc-200"
                            >
                                {tech}
                            </span>
                        ))}
                    </div>
                )}
            </div>

            {createPortal(
                <AnimatePresence>
                    {open && <Lightbox project={project} index={index} setIndex={setIndex} onClose={() => setOpen(false)} />}
                </AnimatePresence>,
                document.body
            )}
        </motion.article>
    );
};

const FeaturedProjects = () => (
    <div className="space-y-8 lg:space-y-10">
        {featuredProjects.map((project, i) => (
            <FeaturedProject key={project.id} project={project} rank={i + 1} reverse={i % 2 === 1} />
        ))}
    </div>
);

export default FeaturedProjects;
