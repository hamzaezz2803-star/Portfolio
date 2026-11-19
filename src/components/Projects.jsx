import { motion } from 'framer-motion';
import { FaGithub } from 'react-icons/fa';
import { socialLinks } from '../data/portfolioData';
import { useLanguage } from '../LanguageContext';
import ProjectFolders from './ProjectFolders';

const Projects = () => {
    const { t } = useLanguage();

    return (
        <section id="projects" className="section-padding border-t border-zinc-200 bg-zinc-50 transition-colors duration-500 dark:border-zinc-900 dark:bg-black">
            <div className="mx-auto max-w-7xl px-6">
                <motion.div
                    initial={{ opacity: 0, y: 16 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="mb-14 max-w-2xl"
                >
                    <p className="mb-3 text-[11px] font-semibold uppercase tracking-[0.28em] text-zinc-400">
                        Selected work
                    </p>
                    <h2 className="font-['Outfit'] text-4xl font-semibold tracking-tight text-zinc-900 dark:text-white md:text-5xl">
                        {t.projects.title}{' '}
                        <span className="text-zinc-400 dark:text-zinc-600">{t.projects.titleHighlight}</span>
                    </h2>
                    {t.projects.subtitle && (
                        <p className="mt-4 text-[15px] leading-relaxed text-zinc-500 dark:text-zinc-400">
                            {t.projects.subtitle}
                        </p>
                    )}
                </motion.div>

                <ProjectFolders />

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
        </section>
    );
};

export default Projects;
