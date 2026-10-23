import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    FaGithub, FaExternalLinkAlt, FaTooth,
    FaCloudSun, FaRegNewspaper, FaChalkboardTeacher,
    FaTasks, FaPaperPlane, FaShieldAlt, FaDatabase, FaTimes, FaArrowRight,
    FaJs, FaHtml5, FaCss3Alt, FaJava, FaAndroid, FaBug,
    FaGlobe, FaLaptopCode, FaLayerGroup, FaMobileAlt, FaServer
} from 'react-icons/fa';
import {
    SiFlutter, SiReact, SiNodedotjs, SiExpress, SiMysql, SiLaravel, SiPhp,
    SiTailwindcss, SiGit, SiFirebase, SiDart, SiNextdotjs, SiMongodb, SiSpringboot, SiTypescript
} from 'react-icons/si';
import { projects, socialLinks } from '../data/portfolioData';
import { useLanguage } from '../LanguageContext';

const techIconMap = {
    'ReactJS': SiReact,
    'React.js': SiReact,
    'React': SiReact,
    'Next.js': SiNextdotjs,
    'TailwindCSS': SiTailwindcss,
    'JavaScript': FaJs,
    'HTML': FaHtml5,
    'CSS': FaCss3Alt,
    'TypeScript': SiTypescript,
    'Node.js': SiNodedotjs,
    'Express.js': SiExpress,
    'Express': SiExpress,
    'Laravel': SiLaravel,
    'PHP': SiPhp,
    'Spring Boot': SiSpringboot,
    'Java': FaJava,
    'MySQL': SiMysql,
    'MongoDB': SiMongodb,
    'Firebase': SiFirebase,
    'Flutter': SiFlutter,
    'Dart': SiDart,
    'Android': FaAndroid,
    'Git': SiGit,
};

const iconMap = {
    FaTooth,
    SiFlutter,
    FaCloudSun,
    FaRegNewspaper,
    FaChalkboardTeacher,
    FaTasks,
    FaPaperPlane,
    FaShieldAlt,
    FaDatabase,
    FaBug,
};

const categoryIconMap = {
    frontend: FaLaptopCode,
    fullstack: FaLayerGroup,
    mobile: FaMobileAlt,
    backend: FaServer,
    web: FaGlobe,
};

/**
 * Animated category visual: big category icon with pulsing glow, rotating rings
 * and the project's technologies orbiting around it. Replaces project screenshots.
 */
const CategoryVisual = ({ project, size = 'card' }) => {
    const CategoryIcon = categoryIconMap[project.category] || FaGlobe;
    const orbit = project.technologies.filter((t) => techIconMap[t]).slice(0, 5);
    const big = size === 'modal';
    const radius = big ? 120 : 78;

    return (
        <div className={`relative flex items-center justify-center overflow-hidden bg-zinc-100 dark:bg-zinc-950 ${big ? 'h-full min-h-[260px]' : 'aspect-[16/10]'}`}>
            {/* dotted grid */}
            <div className="absolute inset-0 opacity-60 [background-size:22px_22px] [background-image:radial-gradient(#a1a1aa_1px,transparent_1px)] dark:[background-image:radial-gradient(#3f3f46_1px,transparent_1px)] [mask-image:radial-gradient(circle_at_center,#000_30%,transparent_75%)]" />

            {/* pulsing glow */}
            <motion.div
                className="absolute h-40 w-40 rounded-full bg-black/10 blur-3xl dark:bg-white/15"
                animate={{ scale: [1, 1.35, 1], opacity: [0.5, 1, 0.5] }}
                transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
            />

            {/* rotating rings */}
            <motion.div
                className="absolute rounded-full border border-dashed border-zinc-400/60 dark:border-white/20"
                style={{ width: radius * 2, height: radius * 2 }}
                animate={{ rotate: 360 }}
                transition={{ duration: 28, repeat: Infinity, ease: 'linear' }}
            />
            <motion.div
                className="absolute rounded-full border border-zinc-300/70 dark:border-white/10"
                style={{ width: radius * 1.35, height: radius * 1.35 }}
                animate={{ rotate: -360 }}
                transition={{ duration: 40, repeat: Infinity, ease: 'linear' }}
            />

            {/* orbiting tech icons */}
            <motion.div
                className="absolute"
                style={{ width: radius * 2, height: radius * 2 }}
                animate={{ rotate: 360 }}
                transition={{ duration: 28, repeat: Infinity, ease: 'linear' }}
            >
                {orbit.map((tech, i) => {
                    const TechIcon = techIconMap[tech];
                    const angle = (i / orbit.length) * Math.PI * 2 - Math.PI / 2;
                    const x = radius + Math.cos(angle) * radius;
                    const y = radius + Math.sin(angle) * radius;
                    return (
                        <motion.span
                            key={tech}
                            title={tech}
                            className="absolute flex h-8 w-8 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-zinc-200 bg-white text-sm text-zinc-700 shadow-md dark:border-white/15 dark:bg-zinc-900 dark:text-zinc-200"
                            style={{ left: x, top: y }}
                            animate={{ rotate: -360 }}
                            transition={{ duration: 28, repeat: Infinity, ease: 'linear' }}
                        >
                            <TechIcon />
                        </motion.span>
                    );
                })}
            </motion.div>

            {/* category icon */}
            <motion.div
                className={`relative z-10 flex items-center justify-center rounded-3xl bg-zinc-900 text-white shadow-2xl ring-1 ring-black/10 transition-transform duration-500 group-hover:scale-110 dark:bg-white dark:text-black ${big ? 'h-28 w-28 text-5xl' : 'h-20 w-20 text-3xl'}`}
                animate={{ y: [0, -8, 0], rotate: [-3, 3, -3] }}
                transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
            >
                <CategoryIcon aria-hidden />
            </motion.div>
        </div>
    );
};

const ProjectCard = ({ project, index, onOpen, categoryLabel }) => {
    const IconComponent = iconMap[project.icon] || FaTasks;
    const caseNumber = String(project.id).padStart(2, '0');

    return (
        <motion.article
            layout
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.98 }}
            transition={{ delay: index * 0.05, duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
            className="h-full"
        >
            <button
                type="button"
                onClick={() => onOpen(project)}
                className="group flex h-full w-full flex-col overflow-hidden rounded-2xl border border-zinc-200/80 bg-white text-left shadow-[0_1px_2px_rgba(0,0,0,0.04)] transition-all duration-500 hover:-translate-y-1 hover:border-zinc-300 hover:shadow-[0_24px_48px_-24px_rgba(0,0,0,0.35)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black/40 dark:border-white/10 dark:bg-[#0c0c0c] dark:hover:border-white/20 dark:focus-visible:ring-white/40"
            >
                <div className="relative overflow-hidden">
                    <CategoryVisual project={project} />

                    <div className="absolute left-4 top-4 flex items-center gap-2">
                        <span className="inline-flex items-center gap-2 rounded-full border border-zinc-200 bg-white/80 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.18em] text-zinc-800 backdrop-blur-md dark:border-white/15 dark:bg-black/45 dark:text-white/90">
                            <IconComponent className="text-[11px]" aria-hidden />
                            {categoryLabel}
                        </span>
                    </div>

                    <span className="absolute right-4 top-4 font-mono text-[11px] font-medium tracking-widest text-zinc-500 dark:text-white/70">
                        {caseNumber}
                    </span>

                    <div className="absolute bottom-4 right-4 flex h-10 w-10 items-center justify-center rounded-full bg-black text-white opacity-0 shadow-lg transition-all duration-300 group-hover:opacity-100 group-hover:translate-x-0 translate-x-2 dark:bg-white dark:text-black">
                        <FaArrowRight className="text-xs -rotate-45" aria-hidden />
                    </div>
                </div>

                <div className="flex flex-1 flex-col gap-3 p-5 md:p-6">
                    <h3 className="font-['Outfit'] text-lg font-semibold leading-snug tracking-tight text-zinc-900 line-clamp-2 dark:text-white md:text-xl">
                        {project.title}
                    </h3>
                    <p className="line-clamp-2 text-sm leading-relaxed text-zinc-500 dark:text-zinc-400">
                        {project.description}
                    </p>

                    <div className="mt-auto flex items-center justify-between pt-3">
                        <div className="flex items-center gap-1.5">
                            {project.technologies.slice(0, 4).map((tech) => {
                                const TechIcon = techIconMap[tech];
                                return (
                                    <span
                                        key={tech}
                                        title={tech}
                                        className="inline-flex h-8 w-8 items-center justify-center rounded-lg border border-zinc-200 bg-zinc-50 text-zinc-600 dark:border-white/10 dark:bg-white/5 dark:text-zinc-300"
                                    >
                                        {TechIcon ? <TechIcon className="text-sm" /> : <span className="text-[8px] font-bold uppercase">{tech.slice(0, 3)}</span>}
                                    </span>
                                );
                            })}
                            {project.technologies.length > 4 && (
                                <span className="pl-1 text-[11px] font-medium text-zinc-400">
                                    +{project.technologies.length - 4}
                                </span>
                            )}
                        </div>
                        <span className="text-[11px] font-semibold uppercase tracking-[0.16em] text-zinc-400 transition-colors group-hover:text-zinc-900 dark:group-hover:text-white">
                            View
                        </span>
                    </div>
                </div>
            </button>
        </motion.article>
    );
};

const ProjectModal = ({ project, onClose, t, categoryLabel }) => {
    const IconComponent = iconMap[project.icon] || FaTasks;

    useEffect(() => {
        const onKey = (e) => {
            if (e.key === 'Escape') onClose();
        };
        document.body.style.overflow = 'hidden';
        window.addEventListener('keydown', onKey);
        return () => {
            document.body.style.overflow = '';
            window.removeEventListener('keydown', onKey);
        };
    }, [onClose]);

    return (
        <motion.div
            role="dialog"
            aria-modal="true"
            aria-labelledby={`project-title-${project.id}`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-end justify-center p-0 sm:items-center sm:p-6 lg:p-10"
        >
            <button
                type="button"
                className="absolute inset-0 bg-black/70 backdrop-blur-md"
                aria-label="Close project details"
                onClick={onClose}
            />

            <motion.div
                initial={{ y: 40, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: 24, opacity: 0 }}
                transition={{ type: 'spring', stiffness: 280, damping: 32 }}
                className="relative flex h-[92vh] w-full max-w-6xl flex-col overflow-hidden rounded-t-3xl border border-white/10 bg-white dark:bg-[#0a0a0a] sm:h-auto sm:max-h-[88vh] sm:rounded-3xl"
            >
                <button
                    type="button"
                    onClick={onClose}
                    className="absolute right-4 top-4 z-20 inline-flex h-10 w-10 items-center justify-center rounded-full border border-zinc-200 bg-white/90 text-zinc-700 backdrop-blur-md transition hover:bg-zinc-100 dark:border-white/10 dark:bg-black/50 dark:text-white dark:hover:bg-white/10"
                    aria-label="Close"
                >
                    <FaTimes />
                </button>

                <div className="grid min-h-0 flex-1 overflow-hidden lg:grid-cols-[1.05fr_0.95fr]">
                    <div className="min-h-[260px] overflow-hidden bg-zinc-100 dark:bg-black">
                        <CategoryVisual project={project} size="modal" />
                    </div>

                    <div className="flex min-h-0 flex-col overflow-y-auto p-6 md:p-10">
                        <div className="mb-6 flex items-center gap-3">
                            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-zinc-900 text-white dark:bg-white dark:text-black">
                                <IconComponent className="text-xl" />
                            </div>
                            <div>
                                <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-zinc-400">
                                    {categoryLabel} · {String(project.id).padStart(2, '0')}
                                </p>
                                <h2
                                    id={`project-title-${project.id}`}
                                    className="mt-1 font-['Outfit'] text-2xl font-semibold tracking-tight text-zinc-900 dark:text-white md:text-3xl"
                                >
                                    {project.title}
                                </h2>
                            </div>
                        </div>

                        <div className="space-y-8">
                            <div>
                                <h3 className="mb-3 text-[11px] font-semibold uppercase tracking-[0.18em] text-zinc-400">
                                    Overview
                                </h3>
                                <p className="whitespace-pre-line text-[15px] leading-relaxed text-zinc-600 dark:text-zinc-300">
                                    {project.description}
                                </p>
                            </div>

                            <div>
                                <h3 className="mb-3 text-[11px] font-semibold uppercase tracking-[0.18em] text-zinc-400">
                                    Stack
                                </h3>
                                <div className="flex flex-wrap gap-2">
                                    {project.technologies.map((tech) => {
                                        const TechIcon = techIconMap[tech];
                                        return (
                                            <span
                                                key={tech}
                                                className="inline-flex items-center gap-2 rounded-full border border-zinc-200 bg-zinc-50 px-3 py-1.5 text-xs font-medium text-zinc-700 dark:border-white/10 dark:bg-white/5 dark:text-zinc-200"
                                            >
                                                {TechIcon && <TechIcon className="text-sm" />}
                                                {tech}
                                            </span>
                                        );
                                    })}
                                </div>
                            </div>

                            {project.team && (
                                <div>
                                    <h3 className="mb-3 text-[11px] font-semibold uppercase tracking-[0.18em] text-zinc-400">
                                        Team
                                    </h3>
                                    <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
                                        {project.team.map((member) => (
                                            <div
                                                key={member.name}
                                                className="flex items-center gap-3 rounded-xl border border-zinc-200 bg-zinc-50 p-2.5 dark:border-white/10 dark:bg-white/5"
                                            >
                                                <img
                                                    src={member.image}
                                                    alt=""
                                                    className="h-9 w-9 rounded-full object-cover"
                                                />
                                                <span className="text-sm font-medium text-zinc-800 dark:text-zinc-100">
                                                    {member.name}
                                                </span>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>

                        <div className="mt-auto flex flex-col gap-3 pt-10 sm:flex-row">
                            <a
                                href={project.github}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex flex-1 items-center justify-center gap-2 rounded-xl bg-zinc-900 px-5 py-3.5 text-sm font-semibold text-white transition hover:bg-black dark:bg-white dark:text-black dark:hover:bg-zinc-200"
                            >
                                <FaGithub />
                                {t.projects.viewCode}
                            </a>
                            {project.demo && (
                                <a
                                    href={project.demo}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="inline-flex flex-1 items-center justify-center gap-2 rounded-xl border border-zinc-200 px-5 py-3.5 text-sm font-semibold text-zinc-800 transition hover:bg-zinc-50 dark:border-white/15 dark:text-white dark:hover:bg-white/5"
                                >
                                    <FaExternalLinkAlt className="text-xs" />
                                    {t.projects.viewDemo}
                                </a>
                            )}
                        </div>
                    </div>
                </div>
            </motion.div>
        </motion.div>
    );
};

const Projects = () => {
    const { t } = useLanguage();
    const [filter, setFilter] = useState('all');
    const [activeProject, setActiveProject] = useState(null);

    const categories = [
        { id: 'all', name: t.projects.all },
        { id: 'frontend', name: t.projects.frontend },
        { id: 'fullstack', name: t.projects.fullstack },
        { id: 'mobile', name: t.projects.mobile || 'Mobile' },
        { id: 'backend', name: t.projects.backend || 'Backend' },
    ];

    const categoryLabel = (id) => categories.find((c) => c.id === id)?.name || id;

    const filteredProjects = filter === 'all'
        ? projects
        : projects.filter((project) => project.category === filter);

    return (
        <section id="projects" className="section-padding border-t border-zinc-200 bg-zinc-50 transition-colors duration-500 dark:border-zinc-900 dark:bg-black">
            <div className="mx-auto max-w-7xl px-6">
                <div className="mb-14 flex flex-col justify-between gap-8 md:flex-row md:items-end">
                    <motion.div
                        initial={{ opacity: 0, y: 16 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="max-w-xl"
                    >
                        <p className="mb-3 text-[11px] font-semibold uppercase tracking-[0.28em] text-zinc-400">
                            Selected work
                        </p>
                        <h2 className="font-['Outfit'] text-4xl font-semibold tracking-tight text-zinc-900 dark:text-white md:text-5xl">
                            {t.projects.title}{' '}
                            <span className="text-zinc-400 dark:text-zinc-600">{t.projects.titleHighlight}</span>
                        </h2>
                        {t.projects.subtitle && (
                            <p className="mt-4 max-w-md text-sm leading-relaxed text-zinc-500 dark:text-zinc-400">
                                {t.projects.subtitle}
                            </p>
                        )}
                    </motion.div>

                    <div className="flex flex-wrap gap-2" role="tablist" aria-label="Project categories">
                        {categories.map((category) => (
                            <button
                                key={category.id}
                                type="button"
                                role="tab"
                                aria-selected={filter === category.id}
                                onClick={() => setFilter(category.id)}
                                className={`rounded-full border px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.14em] transition-all ${
                                    filter === category.id
                                        ? 'border-zinc-900 bg-zinc-900 text-white dark:border-white dark:bg-white dark:text-black'
                                        : 'border-zinc-200 bg-white text-zinc-500 hover:border-zinc-400 hover:text-zinc-900 dark:border-zinc-800 dark:bg-transparent dark:hover:border-zinc-500 dark:hover:text-white'
                                }`}
                            >
                                {category.name}
                            </button>
                        ))}
                    </div>
                </div>

                <motion.div
                    layout
                    className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 lg:gap-7"
                >
                    <AnimatePresence mode="popLayout">
                        {filteredProjects.map((project, idx) => (
                            <ProjectCard
                                key={project.id}
                                project={project}
                                index={idx}
                                onOpen={setActiveProject}
                                categoryLabel={categoryLabel(project.category)}
                            />
                        ))}
                    </AnimatePresence>
                </motion.div>

                {filteredProjects.length === 0 && (
                    <p className="py-20 text-center text-sm uppercase tracking-[0.2em] text-zinc-400">
                        {t.projects.noProjects}
                    </p>
                )}

                <div className="mt-24 flex flex-col items-center border-t border-zinc-200 pt-16 dark:border-zinc-900">
                    <a
                        href={socialLinks.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group inline-flex items-center gap-5"
                    >
                        <span className="font-['Outfit'] text-3xl font-semibold tracking-tight text-zinc-900 transition group-hover:opacity-70 dark:text-white md:text-4xl">
                            {t.github.viewAll}
                        </span>
                        <span className="flex h-14 w-14 items-center justify-center rounded-full border border-zinc-900 text-zinc-900 transition group-hover:bg-zinc-900 group-hover:text-white dark:border-white dark:text-white dark:group-hover:bg-white dark:group-hover:text-black">
                            <FaGithub className="text-xl" />
                        </span>
                    </a>
                </div>
            </div>

            <AnimatePresence>
                {activeProject && (
                    <ProjectModal
                        project={activeProject}
                        onClose={() => setActiveProject(null)}
                        t={t}
                        categoryLabel={categoryLabel(activeProject.category)}
                    />
                )}
            </AnimatePresence>
        </section>
    );
};

export default Projects;
