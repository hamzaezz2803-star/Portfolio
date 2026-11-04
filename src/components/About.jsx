import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence, useInView, useScroll, useTransform, useReducedMotion, animate } from 'framer-motion';
import { FaGraduationCap, FaBriefcase, FaCalendar, FaMapMarkerAlt, FaChevronRight, FaChevronLeft, FaRocket, FaCode } from 'react-icons/fa';
import { useLanguage } from '../LanguageContext';
import { projects, personalInfo } from '../data/portfolioData';
import TerminalTyping from './TerminalTyping';
import portraitImg from '../assets/Portrait masculin noir et blanc détouré.png';

const About = () => {
    const { t } = useLanguage();
    const [currentIndex, setCurrentIndex] = useState(0);

    // Dynamic Stats Calculation
    const experiences = t.about.experiencesList || [];
    const formations = t.about.educationList || [];
    const internalProjectsCount = projects.length;
    const internShipsCount = experiences.filter(exp => exp.title.toLowerCase().includes('stage') || exp.title.toLowerCase().includes('internship')).length;

    const combinedTimeline = [
        ...experiences.map(exp => ({ ...exp, type: 'experience' })),
        ...formations.map(edu => ({ ...edu, type: 'education' }))
    ].sort((a, b) => {
        const yearA = parseInt(a.year.match(/\d{4}/)?.[0] || 0);
        const yearB = parseInt(b.year.match(/\d{4}/)?.[0] || 0);
        return yearB - yearA;
    });

    const nextStep = () => {
        if (currentIndex < combinedTimeline.length - 1) {
            setCurrentIndex(prev => prev + 1);
        }
    };

    const prevStep = () => {
        if (currentIndex > 0) {
            setCurrentIndex(prev => prev - 1);
        }
    };

    return (
        <section id="about" className="bg-white dark:bg-black border-t border-gray-200 dark:border-gray-800 transition-colors duration-500 overflow-hidden">
            {/* 1. Cinematic "About me" banner: torn marquee strip behind a sticker-cut portrait */}
            <AboutBanner />

            {/* 2. Who am I: identity + terminal biography */}
            <div className="pt-16 pb-10 px-6 md:px-12 max-w-[80rem] mx-auto grid grid-cols-1 lg:grid-cols-[1fr_2fr] gap-10 lg:gap-14">
                <motion.div
                    initial={{ opacity: 0, y: 12, filter: 'blur(4px)' }}
                    whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.3, ease: 'easeOut' }}
                    className="flex flex-col"
                >
                    <h2 className="text-xs uppercase tracking-[0.5em] text-gray-400 mb-4 font-black">
                        {t.about.bioTitle}
                    </h2>
                    <div className="w-12 h-[2px] bg-red-500 mb-8"></div>

                    <h3 className="text-5xl md:text-6xl font-black uppercase tracking-tighter leading-[0.85] text-black dark:text-white">
                        {personalInfo.name.split(' ')[0]}<br />
                        <span className="text-transparent [-webkit-text-stroke:1.5px_#000] dark:[-webkit-text-stroke:1.5px_#fff]">
                            {personalInfo.name.split(' ')[1]}
                        </span>
                    </h3>

                    <ul className="mt-8 flex flex-col gap-3 text-[11px] font-black uppercase tracking-[0.2em] text-zinc-500 dark:text-zinc-400">
                        <li className="flex items-center gap-3">
                            <FaCode className="text-red-500" />
                            Full-Stack Developer
                        </li>
                        <li className="flex items-center gap-3">
                            <FaGraduationCap className="text-red-500" />
                            Software Engineering Student
                        </li>
                        <li className="flex items-center gap-3">
                            <FaMapMarkerAlt className="text-red-500" />
                            {personalInfo.location}
                        </li>
                    </ul>
                </motion.div>

                <div className="flex flex-col min-w-0">
                    <TerminalTyping text={t.about.bio} speed={30} />
                </div>
            </div>

            {/* 3. Horizontal Interactive Timeline (Full Width) */}
            <div className="py-16 px-6 md:px-12 max-w-6xl mx-auto">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mb-16"
                >
                    <h2 className="text-4xl md:text-6xl font-black text-black dark:text-white mb-6 tracking-tighter leading-none">
                        {t.about.title} <br/>
                        <span className="opacity-10 italic">{t.about.titleHighlight}</span>
                    </h2>
                    <div className="w-16 h-[2px] bg-black dark:bg-white mx-auto mb-6"></div>
                    <p className="text-gray-500 dark:text-gray-400 text-base md:text-xl max-w-2xl mx-auto font-medium leading-relaxed">
                        {t.about.subtitle}
                    </p>
                </motion.div>

                <div className="relative group/timeline">
                    {/* Navigation Buttons */}
                    <div className="flex justify-between items-center md:absolute md:top-1/2 md:-translate-y-1/2 md:-left-8 md:-right-8 z-30 pointer-events-none mb-8 md:mb-0">
                        <NavButton onClick={prevStep} disabled={currentIndex === 0} icon={<FaChevronLeft />} />
                        <NavButton onClick={nextStep} disabled={currentIndex === combinedTimeline.length - 1} icon={<FaChevronRight />} />
                    </div>

                    <div className="min-h-[380px] md:min-h-[420px] flex items-center justify-center relative">
                        <AnimatePresence mode="wait">
                            <motion.div
                                key={currentIndex}
                                initial={{ opacity: 0, scale: 0.95, filter: "blur(10px)" }}
                                animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
                                exit={{ opacity: 0, scale: 1.05, filter: "blur(10px)" }}
                                transition={{ type: "spring", stiffness: 200, damping: 25 }}
                                className="w-full max-w-4xl"
                            >
                                <TimelineCard item={combinedTimeline[currentIndex]} />
                            </motion.div>
                        </AnimatePresence>
                    </div>

                    <div className="mt-12 flex justify-center items-center gap-3">
                        {combinedTimeline.map((_, index) => (
                            <button
                                key={index}
                                onClick={() => setCurrentIndex(index)}
                                className={`h-1 transition-[width,background-color] duration-500 rounded-full ${index === currentIndex
                                    ? 'w-12 bg-black dark:bg-white'
                                    : 'w-4 bg-gray-300 dark:bg-gray-700 hover:bg-gray-400 dark:hover:bg-gray-600'
                                    }`}
                            />
                        ))}
                    </div>
                </div>

                {/* 4. Logical Dynamic Stats (Full Width) */}
                <div className="mt-40">
                    <div className="flex items-end justify-between mb-8">
                        <h2 className="text-xs uppercase tracking-[0.5em] text-gray-400 font-black">
                            {t.about.stats.heading}
                        </h2>
                        <div className="hidden md:block flex-1 h-px bg-zinc-200 dark:bg-white/10 ml-8 mb-1" />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 rounded-[2rem] border border-zinc-200 dark:border-white/10 bg-zinc-50/50 dark:bg-zinc-950 overflow-hidden divide-y md:divide-y-0 md:divide-x divide-zinc-200 dark:divide-white/10">
                        <StatItem
                            index="01"
                            number={internalProjectsCount}
                            suffix="+"
                            label={t.about.stats.projects}
                            icon={<FaRocket />}
                            accent="text-teal-500 dark:text-teal-400"
                            bar="bg-teal-500"
                            glow="from-teal-500/10"
                        />
                        <StatItem
                            index="02"
                            number={internShipsCount}
                            label={t.about.stats.internships}
                            icon={<FaBriefcase />}
                            accent="text-blue-500 dark:text-blue-400"
                            bar="bg-blue-500"
                            glow="from-blue-500/10"
                        />
                        <StatItem
                            index="03"
                            number={5}
                            label={t.about.stats.years}
                            icon={<FaCalendar />}
                            accent="text-purple-500 dark:text-purple-400"
                            bar="bg-purple-500"
                            glow="from-purple-500/10"
                        />
                    </div>
                </div>
            </div>
        </section>
    );
};

/* ─────────────────────────────────────────
   About banner
───────────────────────────────────────── */

// Deterministic jagged edge so the "torn paper" shape is stable between renders
const tornPath = (seed) => {
    const steps = 80;
    let d = 'M0,20';
    for (let i = 0; i <= steps; i++) {
        const r = Math.abs(Math.sin((i + 1) * 12.9898 + seed * 78.233) * 43758.5453) % 1;
        d += ` L${(i * 1000) / steps},${(2 + r * 14).toFixed(1)}`;
    }
    return `${d} L1000,20 Z`;
};

const TornEdge = ({ seed, flip = false, className = '' }) => (
    <svg
        viewBox="0 0 1000 20"
        preserveAspectRatio="none"
        aria-hidden="true"
        className={`block w-full h-4 md:h-5 ${flip ? 'rotate-180' : ''} ${className}`}
    >
        <path d={tornPath(seed)} fill="currentColor" />
    </svg>
);

const MarqueeRow = ({ text, className = '', slow = false }) => {
    const items = Array(6).fill(text);
    return (
        <div className="flex overflow-hidden whitespace-nowrap select-none" aria-hidden="true">
            <div className={`flex shrink-0 ${slow ? 'animate-marquee-slow' : 'animate-marquee'}`}>
                {[...items, ...items].map((item, i) => (
                    <span key={i} className={`flex items-center shrink-0 ${className}`}>
                        {item}
                        <span className="mx-[0.35em] text-[0.45em] text-red-500">✦</span>
                    </span>
                ))}
            </div>
        </div>
    );
};

const AboutBanner = () => {
    const ref = useRef(null);
    const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] });
    const stripY = useTransform(scrollYProgress, [0, 1], ['30px', '-30px']);
    const portraitY = useTransform(scrollYProgress, [0, 1], ['40px', '-20px']);

    return (
        <div ref={ref} className="relative h-[420px] md:h-[600px] overflow-hidden">
            <span className="sr-only">About me</span>

            {/* Back strip: outlined text, tilted the other way */}
            <motion.div style={{ y: stripY }} className="absolute inset-x-[-5%] top-[14%] md:top-[12%] -rotate-[4deg] text-zinc-200 dark:text-zinc-900">
                <TornEdge seed={3} />
                <div className="bg-current py-2 md:py-3">
                    <MarqueeRow
                        slow
                        text="WHO AM I"
                        className="text-white dark:text-black font-black uppercase tracking-tighter leading-none text-[2.5rem] md:text-[4.5rem]"
                    />
                </div>
                <TornEdge seed={7} flip />
            </motion.div>

            {/* Main strip: giant "ABOUT ME" scrolling right → left */}
            <div className="absolute inset-x-[-5%] top-1/2 -translate-y-1/2 rotate-[2deg] text-zinc-950 dark:text-zinc-100 drop-shadow-[0_20px_40px_rgba(0,0,0,0.25)]">
                <TornEdge seed={11} />
                <div className="bg-current py-3 md:py-5">
                    <MarqueeRow
                        text="ABOUT ME"
                        className="text-white dark:text-black font-black uppercase tracking-tighter leading-[0.85] text-[4.5rem] md:text-[9rem]"
                    />
                </div>
                <TornEdge seed={19} flip />
            </div>

            {/* Sticker-cut portrait in front of the strip (wrapper centers it; motion owns transform) */}
            <div className="absolute inset-x-0 bottom-[-2%] h-[72%] md:h-[95%] flex justify-center z-10 pointer-events-none">
                <motion.div
                    style={{ y: portraitY }}
                    initial={{ opacity: 0, scale: 0.96 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true, margin: '-80px' }}
                    transition={{ duration: 0.6, ease: [0.2, 0, 0, 1] }}
                    className="h-full aspect-square"
                >
                    <img
                        src={portraitImg}
                        alt={personalInfo.name}
                        loading="lazy"
                        className="h-full w-full object-contain object-bottom [filter:drop-shadow(4px_0_0_#ef4444)_drop-shadow(-4px_0_0_#ef4444)_drop-shadow(0_-4px_0_#ef4444)_drop-shadow(0_24px_32px_rgba(0,0,0,0.45))]"
                    />
                </motion.div>
            </div>

            {/* Corner labels */}
            <div className="absolute top-6 left-6 md:left-12 z-20 text-[10px] font-black uppercase tracking-[0.4em] text-zinc-400">
                01 — {personalInfo.name}
            </div>
            <div className="absolute bottom-6 right-6 md:right-12 z-20 hidden md:flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.4em] text-zinc-400">
                <FaMapMarkerAlt className="text-red-500" />
                {personalInfo.location}
            </div>

            {/* Fade the bottom edge into the section */}
            <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-white dark:from-black to-transparent z-10 pointer-events-none" />
        </div>
    );
};

const NavButton = ({ onClick, disabled, icon }) => (
    <button
        onClick={onClick}
        disabled={disabled}
        className={`p-5 md:p-8 bg-white dark:bg-black border border-black/10 dark:border-white/10 text-black dark:text-white pointer-events-auto transition duration-500 rounded-full shadow-xl ${disabled ? 'opacity-0 scale-50' : 'opacity-100 hover:scale-110 hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black'
            }`}
    >
        {icon}
    </button>
);

// Counts up from 0 the first time the stat scrolls into view
const CountUp = ({ value }) => {
    const ref = useRef(null);
    const inView = useInView(ref, { once: true, margin: '-60px' });
    const reduceMotion = useReducedMotion();
    const [display, setDisplay] = useState(0);

    useEffect(() => {
        if (!inView) return;
        const controls = animate(0, value, {
            duration: reduceMotion ? 0 : 1.2,
            ease: [0.2, 0, 0, 1],
            onUpdate: (v) => setDisplay(Math.round(v)),
        });
        return () => controls.stop();
    }, [inView, value, reduceMotion]);

    return <span ref={ref}>{String(display).padStart(2, '0')}</span>;
};

const StatItem = ({ index, number, suffix, label, icon, accent, bar, glow }) => (
    <div className="group relative p-8 md:p-10 flex flex-col overflow-hidden">
        {/* Accent glow on hover */}
        <div className={`absolute inset-0 bg-gradient-to-br ${glow} to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none`} />

        <div className="relative flex items-center justify-between mb-10">
            <span className="text-[11px] font-black tracking-[0.3em] text-zinc-400 dark:text-zinc-600 tabular-nums">
                {index}
            </span>
            <span className={`text-xl ${accent}`}>{icon}</span>
        </div>

        <div className="relative flex items-start text-7xl md:text-8xl font-black tracking-tighter leading-none text-black dark:text-white tabular-nums">
            <CountUp value={number} />
            {suffix && <span className={`text-4xl md:text-5xl ml-1 ${accent}`}>{suffix}</span>}
        </div>

        <div className="relative mt-6 text-[11px] font-black uppercase tracking-[0.2em] text-zinc-500 dark:text-zinc-400">
            {label}
        </div>

        {/* Progress rule that draws in on view */}
        <div className="relative mt-8 h-px w-full bg-zinc-200 dark:bg-white/10 overflow-hidden">
            <motion.div
                initial={{ scaleX: 0 }}
                whileInView={{ scaleX: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 1.2, ease: [0.2, 0, 0, 1], delay: 0.2 }}
                className={`absolute inset-0 origin-left ${bar}`}
            />
        </div>
    </div>
);

const TimelineCard = ({ item }) => {
    const isExp = item.type === 'experience';

    return (
        <div className="relative p-8 md:p-12 bg-zinc-50 dark:bg-zinc-900/30 border border-black/5 dark:border-white/5 rounded-[3rem] overflow-hidden group">
            <div className="absolute -top-20 -right-20 opacity-[0.02] dark:opacity-[0.04] pointer-events-none transition-transform duration-1000 group-hover:scale-110">
                {isExp ? <FaBriefcase size={300} className="md:size-[500px]" /> : <FaGraduationCap size={300} className="md:size-[500px]" />}
            </div>

            <div className="relative z-10">
                <div className="flex flex-wrap items-center gap-3 md:gap-4 mb-6 md:mb-8">
                    <span className="px-4 md:px-6 py-1.5 md:py-2 bg-black dark:bg-white text-white dark:text-black font-black uppercase tracking-widest text-[10px] md:text-xs">
                        {item.year}
                    </span>
                    <span className={`px-4 md:px-6 py-1.5 md:py-2 border-2 border-black dark:border-white font-black uppercase tracking-widest text-[9px] md:text-[10px] ${isExp ? 'text-blue-500' : 'text-purple-500'}`}>
                        {isExp ? 'Experience' : 'Education'}
                    </span>
                    <div className="flex items-center gap-2 text-[10px] md:text-xs font-bold text-gray-400 ml-auto">
                        <FaMapMarkerAlt />
                        {item.location}
                    </div>
                </div>

                <h3 className="text-2xl md:text-4xl font-black text-black dark:text-white mb-4 tracking-tighter leading-tight md:leading-none">
                    {item.title}
                </h3>

                <div className="flex items-center gap-3 md:gap-4 text-sm md:text-xl font-bold text-gray-600 dark:text-gray-300 mb-4 md:mb-6">
                    <div className="w-8 md:w-12 h-1 bg-black dark:bg-white" />
                    {isExp ? item.company : item.institution}
                </div>

                <p className="text-gray-500 dark:text-gray-400 text-sm md:text-base leading-relaxed mb-6 md:mb-8 max-w-3xl font-medium">
                    {item.description}
                </p>

                {isExp && item.technologies && (
                    <div className="flex flex-wrap gap-2 md:gap-3">
                        {item.technologies.map((tech, i) => (
                            <span
                                key={i}
                                className="px-3 md:px-4 py-1 md:py-1.5 bg-white dark:bg-black border-2 border-black dark:border-white text-[8px] md:text-[10px] font-black uppercase tracking-widest text-black dark:text-white hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black transition-colors"
                            >
                                {tech}
                            </span>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default About;
