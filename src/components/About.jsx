import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaGraduationCap, FaBriefcase, FaCalendar, FaMapMarkerAlt, FaChevronRight, FaChevronLeft, FaCode, FaRocket, FaTerminal } from 'react-icons/fa';
import { useLanguage } from '../LanguageContext';
import { projects, personalInfo } from '../data/portfolioData';
import TerminalTyping from './TerminalTyping';
import profileImg from '../assets/profile.jpg';

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
            {/* 1. Profile Card & Terminal Biography (2-Column Layout) */}
            <div className="py-10 px-6 md:px-12 max-w-[80rem] mx-auto flex flex-col lg:flex-row gap-8 lg:gap-14">
                
                {/* Left Column: Animated Sticky Profile Card */}
                <div className="w-full lg:w-1/3 flex-shrink-0 relative">
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true, margin: "-100px" }}
                        className="sticky top-32"
                    >
                        <motion.div 
                            whileHover={{ scale: 1.02, rotateY: 5, rotateX: 2, z: 50 }}
                            transition={{ type: "spring", stiffness: 200, damping: 20 }}
                            className="rounded-[3rem] overflow-hidden border border-gray-100 dark:border-white/5 shadow-3xl relative group cursor-pointer bg-zinc-900"
                            style={{ transformStyle: "preserve-3d", perspective: 1200 }}
                        >
                            <img 
                                src={profileImg} 
                                alt={personalInfo.name} 
                                className="w-full aspect-[4/5] object-cover grayscale group-hover:grayscale-0 transition-[filter] duration-1000 ease-in-out"
                            />
                            {/* Inner Shadow / Gradient */}
                            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent opacity-90 group-hover:opacity-70 transition-opacity duration-700" />
                            
                            <motion.div 
                                style={{ transform: "translateZ(60px)" }}
                                className="absolute bottom-6 left-6 right-6 flex flex-col gap-3"
                            >
                                <div className="w-16 h-[2px] bg-white mb-2 transform origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-700" />
                                <h3 className="text-white text-3xl font-black uppercase tracking-tighter leading-[0.9]">
                                    {personalInfo.name.split(' ')[0]} <br/> {personalInfo.name.split(' ')[1]}
                                </h3>
                                <p className="text-white/50 text-[10px] font-black uppercase tracking-[0.4em] mt-2">
                                    Software Engineer
                                </p>
                            </motion.div>
                        </motion.div>
                    </motion.div>
                </div>

                {/* Right Column: Terminal Typing Effect */}
                <div className="w-full lg:w-2/3 flex flex-col">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="mb-8"
                    >
                        <h2 className="text-xs uppercase tracking-[0.5em] text-gray-400 mb-4 font-black">
                            {t.about.bioTitle}
                        </h2>
                        <div className="w-12 h-[2px] bg-black dark:bg-white"></div>
                    </motion.div>

                    <TerminalTyping text={t.about.bio} speed={30} />
                </div>
            </div>

            {/* 2. Horizontal Interactive Timeline (Full Width) */}
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

                {/* 3. Logical Dynamic Stats (Full Width) */}
                <div className="mt-40">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        <StatItem
                            number={internalProjectsCount}
                            label={t.about.stats.projects}
                            icon={<FaRocket />}
                            glowColor="from-teal-500/20 to-emerald-500/10"
                            borderColor="group-hover:border-teal-500/50"
                            iconColor="text-teal-400"
                        />
                        <StatItem
                            number={internShipsCount}
                            label={t.about.stats.internships}
                            icon={<FaBriefcase />}
                            glowColor="from-blue-500/20 to-indigo-500/10"
                            borderColor="group-hover:border-blue-500/50"
                            iconColor="text-blue-400"
                        />
                        <StatItem
                            number="5"
                            label={t.about.stats.years}
                            icon={<FaCalendar />}
                            glowColor="from-purple-500/20 to-violet-500/10"
                            borderColor="group-hover:border-purple-500/50"
                            iconColor="text-purple-400"
                        />
                    </div>
                </div>
            </div>
        </section>
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

const StatItem = ({ number, label, icon, glowColor, borderColor, iconColor }) => (
    <motion.div
        whileHover={{ y: -8, scale: 1.02 }}
        transition={{ type: "spring", stiffness: 300, damping: 20 }}
        className="group relative bg-zinc-50/50 dark:bg-zinc-900/30 backdrop-blur-2xl p-10 flex flex-col rounded-[2.5rem] border border-zinc-200/50 dark:border-white/5 overflow-hidden transition duration-500 shadow-[0_8px_32px_rgba(0,0,0,0.02)] dark:shadow-[0_8px_32px_rgba(0,0,0,0.2)]"
    >
        {/* Glow backdrop on hover */}
        <div className={`absolute inset-0 bg-gradient-to-br ${glowColor} opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none z-0`} />
        
        {/* Border accent glow */}
        <div className={`absolute inset-x-0 bottom-0 h-[3px] bg-gradient-to-r ${glowColor.replace('/20', '').replace('/10', '')} transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left z-10`} />

        <div className="flex items-center justify-between mb-8 relative z-10">
            {/* Minimal Icon Box */}
            <div className={`w-14 h-14 rounded-2xl bg-white dark:bg-white/5 border border-zinc-100 dark:border-white/10 flex items-center justify-center ${iconColor} transition-colors group-hover:scale-110 duration-500 shadow-sm`}>
                <div className="text-2xl">{icon}</div>
            </div>
            
            {/* Subtle Label Tag */}
            <span className="text-[10px] font-black uppercase tracking-[0.25em] text-zinc-400 dark:text-zinc-500 bg-zinc-100/50 dark:bg-white/5 px-4 py-2 rounded-full border border-zinc-200/20 dark:border-white/5">
                Stat
            </span>
        </div>

        {/* Big Number */}
        <div className="text-5xl md:text-7xl font-black text-black dark:text-white mb-2 tracking-tighter leading-none relative z-10 group-hover:translate-x-1 transition-transform duration-500">
            {number}
        </div>

        {/* Descriptive Label */}
        <div className="text-[11px] font-black uppercase tracking-[0.2em] text-zinc-500 dark:text-zinc-400 mt-2 relative z-10">
            {label}
        </div>
    </motion.div>
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
