import { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { FaTimes, FaArrowRight } from 'react-icons/fa';
import GlassFolder from './ui/glass-folder-cards';
import { FeaturedProject } from './FeaturedProjects';
import { featuredProjects } from '../data/portfolioData';
import { useLanguage } from '../LanguageContext';

const pad = (n) => String(n).padStart(2, '0');

/** Tracks the `dark` class App.jsx toggles on <html>, so the glass follows the site theme. */
const useIsDark = () => {
    const [dark, setDark] = useState(() => document.documentElement.classList.contains('dark'));
    useEffect(() => {
        const root = document.documentElement;
        const mo = new MutationObserver(() => setDark(root.classList.contains('dark')));
        mo.observe(root, { attributes: true, attributeFilter: ['class'] });
        return () => mo.disconnect();
    }, []);
    return dark;
};

/** 340px folders, shrunk to fit narrow phones (16px gutters). */
const useFolderWidth = () => {
    const get = () => Math.min(340, Math.max(260, window.innerWidth - 48));
    const [w, setW] = useState(get);
    useEffect(() => {
        const onResize = () => setW(get());
        window.addEventListener('resize', onResize);
        return () => window.removeEventListener('resize', onResize);
    }, []);
    return w;
};

/** Up to 4 screenshots spread across the gallery; the last one sits at the front of the stack. */
const pickFiles = (gallery) => {
    const n = Math.min(4, gallery.length);
    const picks = Array.from({ length: n }, (_, i) => Math.round(((i + 1) * (gallery.length - 1)) / n));
    return [...new Set(picks)].map((gi) => ({
        name: gallery[gi].caption,
        meta: `${pad(gi + 1)}/${pad(gallery.length)}`,
        image: gallery[gi].src,
        galleryIndex: gi,
    }));
};

// folder labels have ~200px: use `shortTitle` from the data when set, else the part before " — "
const shortTitle = (project) => project.shortTitle ?? project.title.split(' — ')[0];
const shortContext = (context) => context.split(' · ').pop();

/** Full-screen sheet with the project's description, highlights and screenshot gallery. */
const ProjectDetails = ({ project, rank, startIndex, onClose }) => {
    useEffect(() => {
        const onKey = (e) => e.key === 'Escape' && onClose();
        const prev = document.body.style.overflow;
        document.body.style.overflow = 'hidden';
        window.addEventListener('keydown', onKey);
        return () => {
            document.body.style.overflow = prev;
            window.removeEventListener('keydown', onKey);
        };
    }, [onClose]);

    return (
        <motion.div
            role="dialog"
            aria-modal="true"
            aria-label={project.title}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-[105] overflow-y-auto overscroll-contain bg-black/60 backdrop-blur-md"
            onClick={(e) => e.target === e.currentTarget && onClose()}
        >
            <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-20" onClick={(e) => e.target === e.currentTarget && onClose()}>
                <motion.div
                    initial={{ opacity: 0, y: 40, scale: 0.98 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 24, scale: 0.98 }}
                    transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                    className="relative"
                >
                    <button
                        type="button"
                        onClick={onClose}
                        aria-label="Close"
                        className="absolute -top-12 right-0 inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/20 bg-black/40 text-white transition hover:bg-white/15"
                    >
                        <FaTimes />
                    </button>
                    <FeaturedProject project={project} rank={rank} initialIndex={startIndex} />
                </motion.div>
            </div>
        </motion.div>
    );
};

const ProjectFolders = () => {
    const { t } = useLanguage();
    const dark = useIsDark();
    const width = useFolderWidth();
    const [active, setActive] = useState(null); // { i, start }

    const viewDetails = t.projects.viewDetails ?? 'View details';
    const close = () => setActive(null);

    return (
        <>
            <div className="grid grid-cols-1 items-start justify-items-center gap-x-10 gap-y-20 pt-16 md:grid-cols-2 xl:grid-cols-3">
                {featuredProjects.map((project, i) => (
                    <div key={project.id} className="flex w-full max-w-[340px] flex-col items-center">
                        <GlassFolder
                            label={shortTitle(project)}
                            meta={`${pad(project.gallery.length)} captures`}
                            tone={dark ? 'dark' : 'light'}
                            image={project.cover ?? (project.gallery[1] ?? project.gallery[0]).src}
                            files={pickFiles(project.gallery)}
                            action="more"
                            menu={[{ label: viewDetails, onSelect: () => setActive({ i, start: 0 }) }]}
                            labelPlacement="bottom-left"
                            width={width}
                            appearDelay={i * 140}
                            onFileSelect={(file) => setActive({ i, start: file.galleryIndex ?? 0 })}
                        />

                        <div className="mt-8 w-full px-1">
                            <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-zinc-400">
                                <span className="font-mono">TOP {pad(i + 1)}</span> · {shortContext(project.context)}
                            </p>
                            <p className="mt-2 line-clamp-2 text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">
                                {project.tagline}
                            </p>
                            <button
                                type="button"
                                onClick={() => setActive({ i, start: 0 })}
                                className="group mt-4 inline-flex items-center gap-2 rounded-full border border-zinc-900 px-4 py-2 text-sm font-medium text-zinc-900 transition hover:bg-zinc-900 hover:text-white dark:border-white dark:text-white dark:hover:bg-white dark:hover:text-black"
                            >
                                {viewDetails}
                                <FaArrowRight className="text-xs transition-transform group-hover:translate-x-0.5" aria-hidden />
                            </button>
                        </div>
                    </div>
                ))}
            </div>

            <p className="mt-16 text-center font-mono text-[11px] uppercase tracking-[0.18em] text-zinc-400">
                {t.projects.folderHint ?? 'Hover to lean · Click to open · Pick a screenshot'}
            </p>

            {createPortal(
                <AnimatePresence>
                    {active && (
                        <ProjectDetails
                            key={featuredProjects[active.i].id}
                            project={featuredProjects[active.i]}
                            rank={active.i + 1}
                            startIndex={active.start}
                            onClose={close}
                        />
                    )}
                </AnimatePresence>,
                document.body
            )}
        </>
    );
};

export default ProjectFolders;
