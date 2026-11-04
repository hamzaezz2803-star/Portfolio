import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaPlus, FaMinus } from 'react-icons/fa';
import { useLanguage } from '../LanguageContext';

const Faq = () => {
    const { t } = useLanguage();
    const [openIndex, setOpenIndex] = useState(0); // First item open by default like modern UIs

    const toggleFaq = (index) => {
        setOpenIndex(openIndex === index ? null : index);
    };

    return (
        <section id="faq" className="relative py-24 md:py-32 bg-white dark:bg-black overflow-hidden transition-colors duration-500">
            {/* Ambient Background Glow */}
            <div className="absolute top-1/2 left-0 -translate-y-1/2 w-[500px] h-[500px] bg-emerald-500/10 dark:bg-emerald-500/5 blur-[140px] rounded-full pointer-events-none z-0" />
            
            <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10 w-full">
                <div className="grid lg:grid-cols-12 gap-12 lg:gap-16 items-start">
                    
                    {/* --- Left Column: Title & Tag (Watermelon UI Style) --- */}
                    <motion.div 
                        initial={{ opacity: 0, x: -30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8, ease: "easeOut" }}
                        className="lg:col-span-5 flex flex-col pt-2 lg:sticky lg:top-32"
                    >
                        {/* FAQ Tag Badge */}
                        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-gray-200 dark:border-[#222] bg-white dark:bg-[#0a0a0a] shadow-sm mb-6 w-fit">
                            <div className="w-[18px] h-[18px] rounded-full flex items-center justify-center bg-gray-100 dark:bg-[#1a1a1a] border border-gray-200 dark:border-[#333]">
                                <div className="w-[6px] h-[6px] rounded-full bg-emerald-500" />
                            </div>
                            <span className="text-xs font-mono font-bold tracking-widest text-gray-700 dark:text-gray-300 uppercase pr-1">
                                {t.faq?.badge || "FAQ"}
                            </span>
                        </div>

                        {/* Large Headline */}
                        <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-black dark:text-white tracking-tight leading-[1.08] mb-6 font-outfit">
                            {t.faq?.title || "Your Guide to"}{' '}
                            <span className="block text-gray-400 dark:text-[#666]">
                                {t.faq?.titleHighlight || "working together."}
                            </span>
                        </h2>

                        <p className="text-gray-600 dark:text-[#888] text-base md:text-lg leading-relaxed max-w-md font-normal">
                            {t.faq?.subtitle || "Find quick answers to common questions about my technical skills, availability, and development process."}
                        </p>
                    </motion.div>

                    {/* --- Right Column: Accordion List --- */}
                    <motion.div 
                        initial={{ opacity: 0, x: 30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
                        className="lg:col-span-7 flex flex-col divide-y divide-gray-200 dark:divide-[#1a1a1a] border-t border-b border-gray-200 dark:border-[#1a1a1a]"
                    >
                        {t.faq?.questions?.map((item, index) => {
                            const isOpen = openIndex === index;
                            const qNumber = `Q${index + 1}`;

                            return (
                                <div key={index} className="py-6 md:py-8 transition-colors">
                                    <button
                                        onClick={() => toggleFaq(index)}
                                        className="w-full flex items-center justify-between text-left group gap-4 focus:outline-none"
                                        aria-expanded={isOpen}
                                    >
                                        <div className="flex items-center gap-6 md:gap-8 flex-1 pr-2">
                                            {/* Q1, Q2... Index */}
                                            <span className="text-xs font-mono font-bold text-gray-400 dark:text-[#555] tracking-wider min-w-[2rem]">
                                                {qNumber}
                                            </span>
                                            
                                            {/* Question Text */}
                                            <h3 className="text-base md:text-xl font-bold text-black dark:text-white group-hover:text-emerald-500 dark:group-hover:text-emerald-400 transition-colors leading-snug">
                                                {item.q}
                                            </h3>
                                        </div>

                                        {/* Plus/Minus Icon Button */}
                                        <div className={`w-9 h-9 md:w-10 md:h-10 rounded-xl flex items-center justify-center border transition duration-300 flex-shrink-0 ${
                                            isOpen
                                                ? 'bg-black text-white dark:bg-white dark:text-black border-black dark:border-white shadow-md'
                                                : 'bg-gray-100 dark:bg-[#111] text-gray-600 dark:text-gray-400 border-gray-200 dark:border-[#222] group-hover:border-gray-400 dark:group-hover:border-[#333]'
                                        }`}>
                                            {isOpen ? <FaMinus size={11} /> : <FaPlus size={11} />}
                                        </div>
                                    </button>

                                    {/* Expanded Answer */}
                                    <AnimatePresence initial={false}>
                                        {isOpen && (
                                            <motion.div
                                                initial={{ opacity: 0, height: 0 }}
                                                animate={{ opacity: 1, height: 'auto' }}
                                                exit={{ opacity: 0, height: 0 }}
                                                transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                                                className="overflow-hidden"
                                            >
                                                <div className="pl-[2.75rem] md:pl-[4rem] pr-4 md:pr-12 pt-4 pb-2">
                                                    <p className="text-gray-600 dark:text-[#999] text-sm md:text-base leading-relaxed font-medium">
                                                        {item.a}
                                                    </p>
                                                </div>
                                            </motion.div>
                                        )}
                                    </AnimatePresence>
                                </div>
                            );
                        })}
                    </motion.div>

                </div>
            </div>
        </section>
    );
};

export default Faq;
