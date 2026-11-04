import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { certifications } from '../data/portfolioData';
import { FaReact, FaPython, FaAward, FaCalendarAlt, FaTimes, FaExternalLinkAlt, FaCheckCircle, FaDownload } from 'react-icons/fa';

const iconMap = {
    FaPython: FaPython,
    FaReact: FaReact,
};

/* ─── Lightbox ─── */
const Lightbox = ({ cert, onClose }) => {
    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-12"
        >
            {/* Backdrop */}
            <div
                className="absolute inset-0 bg-black/95 backdrop-blur-xl"
                onClick={onClose}
            />

            {/* Close btn */}
            <button
                onClick={onClose}
                className="absolute top-6 right-6 md:top-8 md:right-8 z-[110] p-3 bg-white/10 border border-white/10 rounded-full text-white hover:bg-white/25 transition"
            >
                <FaTimes size={20} />
            </button>

            <motion.div
                initial={{ scale: 0.95, opacity: 0, y: 20 }}
                animate={{ scale: 1, opacity: 1, y: 0 }}
                exit={{ scale: 0.95, opacity: 0, y: 20 }}
                className="relative w-full max-w-5xl z-10 flex flex-col md:flex-row bg-white dark:bg-zinc-900 rounded-[2rem] overflow-hidden shadow-2xl"
            >
                {/* Image */}
                <div className="w-full md:w-3/5 relative aspect-video md:aspect-auto">
                    <img
                        src={cert.image}
                        alt={cert.title}
                        className="w-full h-full object-cover"
                    />
                </div>

                {/* Details */}
                <div className="w-full md:w-2/5 p-8 flex flex-col justify-center bg-gray-50 dark:bg-zinc-900">
                    <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded-full mb-4 w-fit">
                        <span className="text-xs font-bold uppercase tracking-wider">{cert.platform}</span>
                    </div>

                    <h2 className="text-2xl md:text-3xl font-black text-black dark:text-white mb-2">
                        {cert.title}
                    </h2>

                    <div className="flex items-center gap-2 text-gray-500 dark:text-gray-400 text-sm font-medium mb-6">
                        <FaCalendarAlt />
                        <span>{cert.date}</span>
                    </div>

                    <p className="text-gray-600 dark:text-gray-300 text-sm md:text-base leading-relaxed mb-8">
                        {cert.description}
                    </p>

                    <div className="flex flex-col gap-3">
                        <div className="flex items-center gap-2 text-emerald-500 mb-2">
                            <FaCheckCircle size={16} />
                            <span className="text-sm font-bold">Verified Certificate</span>
                        </div>
                        <a
                            href={cert.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center justify-center gap-2 w-full px-6 py-3 bg-black dark:bg-white text-white dark:text-black font-bold rounded-xl hover:opacity-90 transition-opacity"
                        >
                            <FaDownload />
                            Download
                        </a>
                    </div>
                </div>
            </motion.div>
        </motion.div>
    );
};

/* ─── Certificate Card ─── */
const CertCard = ({ cert, index }) => {
    const [isOpen, setIsOpen] = useState(false);
    const IconComponent = iconMap[cert.icon] || FaAward;

    return (
        <>
            <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                onClick={() => setIsOpen(true)}
                className="group relative bg-white dark:bg-zinc-900 border border-gray-200 dark:border-zinc-800 rounded-[33px] md:rounded-[37px] p-4 md:p-5 flex flex-col md:flex-row gap-6 items-center cursor-pointer hover:shadow-xl dark:hover:shadow-2xl dark:hover:shadow-black/50 transition duration-300 hover:-translate-y-1"
            >
                {/* Thumbnail */}
                <div className="w-full md:w-64 aspect-[4/3] rounded-2xl overflow-hidden relative flex-shrink-0 outline outline-1 -outline-offset-1 outline-black/10 dark:outline-white/10">
                    <img
                        src={cert.image}
                        alt={cert.title}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors duration-300" />
                    
                    {/* Hover Overlay Icon */}
                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-black/30 backdrop-blur-sm">
                        <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center text-black shadow-lg">
                            <FaExternalLinkAlt size={18} />
                        </div>
                    </div>
                </div>

                {/* Content */}
                <div className="flex-1 flex flex-col justify-center w-full">
                    <div className="flex items-center justify-between mb-3">
                        <div className="inline-flex items-center gap-2 px-3 py-1 bg-gray-100 dark:bg-zinc-800 text-gray-800 dark:text-gray-200 rounded-lg text-xs font-bold uppercase tracking-wider">
                            <IconComponent size={14} className="text-black dark:text-white" />
                            {cert.platform}
                        </div>
                        <div className="flex items-center gap-1.5 text-emerald-500 bg-emerald-50 dark:bg-emerald-500/10 px-2.5 py-1 rounded-md">
                            <FaCheckCircle size={12} />
                            <span className="text-xs font-bold uppercase tracking-wider">Verified</span>
                        </div>
                    </div>

                    <h3 className="text-xl md:text-2xl font-black text-black dark:text-white mb-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                        {cert.title}
                    </h3>
                    
                    <div className="flex items-center gap-2 text-gray-500 dark:text-gray-400 text-sm font-medium mb-4">
                        <FaCalendarAlt size={14} />
                        <span>{cert.date}</span>
                    </div>

                    <p className="text-gray-600 dark:text-gray-400 text-sm line-clamp-2">
                        {cert.description}
                    </p>
                </div>
            </motion.div>

            <AnimatePresence>
                {isOpen && <Lightbox cert={cert} onClose={() => setIsOpen(false)} />}
            </AnimatePresence>
        </>
    );
};

/* ─── Main Section ─── */
const Certificates = () => {
    return (
        <section id="certificates" className="py-20 md:py-32 bg-gray-50 dark:bg-black transition-colors duration-500">
            <div className="max-w-5xl mx-auto px-6">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="mb-16 text-center md:text-left flex flex-col md:flex-row items-center md:items-end justify-between gap-6"
                >
                    <div>
                        <h2 className="text-4xl md:text-6xl font-black text-black dark:text-white uppercase tracking-tighter leading-none mb-4">
                            My <span className="text-gray-400 dark:text-gray-600 italic">Certifications</span>
                        </h2>
                        <div className="w-20 h-1.5 bg-black dark:bg-white mx-auto md:mx-0"></div>
                    </div>
                    
                    <p className="text-gray-600 dark:text-gray-400 max-w-md text-sm md:text-base font-medium">
                        Continuous validation of my skills through recognized certifying training courses.
                    </p>
                </motion.div>

                {/* Cards */}
                <div className="grid grid-cols-1 gap-6">
                    {certifications.map((cert, index) => (
                        <CertCard key={cert.id} cert={cert} index={index} />
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Certificates;
