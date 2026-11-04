import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaSun, FaMoon, FaBars, FaTimes, FaEnvelope, FaChevronDown } from 'react-icons/fa';
import { personalInfo } from '../data/portfolioData';
import { useLanguage } from '../LanguageContext';

// Cross-fades an icon when its state changes (scale 0.25 -> 1, blur 4px -> 0)
const SwapIcon = ({ id, children }) => (
    <span className="relative grid place-items-center">
        <AnimatePresence initial={false} mode="popLayout">
            <motion.span
                key={id}
                initial={{ scale: 0.25, opacity: 0, filter: 'blur(4px)' }}
                animate={{ scale: 1, opacity: 1, filter: 'blur(0px)' }}
                exit={{ scale: 0.25, opacity: 0, filter: 'blur(4px)' }}
                transition={{ type: 'spring', duration: 0.3, bounce: 0 }}
                className="grid place-items-center"
            >
                {children}
            </motion.span>
        </AnimatePresence>
    </span>
);

const Navbar = ({ darkMode, toggleDarkMode }) => {
    const { t } = useLanguage();

    // Active section state for highlighting the current section in the vertical nav
    const [activeSection, setActiveSection] = useState('home');
    const [scrolled, setScrolled] = useState(false);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 20);

            // Simple active section detection
            const sections = document.querySelectorAll('section[id]');
            let current = 'home';
            sections.forEach((section) => {
                const sectionTop = section.offsetTop;
                if (window.scrollY >= sectionTop - 200) {
                    current = section.getAttribute('id');
                }
            });
            setActiveSection(current);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);


    const navLinks = [
        { name: t.nav.home, href: '#home' },
        { name: t.nav.about, href: '#about' },
        { name: t.nav.skills, href: '#skills' },
        { name: t.nav.projects, href: '#projects' },
        { name: t.nav.services, href: '#services' },
        { name: t.nav.faq, href: '#faq' },
        { name: t.nav.contact, href: '#contact' },
    ];

    const scrollToSection = (href) => {
        const element = document.querySelector(href);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
        }
    };


    return (
        <>
            <motion.nav
                initial={{ y: -100 }}
                animate={{ y: 0 }}
                transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                className={`fixed top-0 left-0 right-0 z-[100] transition-[height,padding] duration-300 w-full flex items-center ${scrolled ? 'h-[70px] md:py-3' : 'pt-10 md:pt-12 lg:pt-16'}`}
            >
                <div className="w-full max-w-[1440px] mx-auto px-0 md:px-6 lg:px-12 transition-[padding] duration-300">
                    <div className={`w-full flex items-center justify-between transition-[height,padding,background-color,border-color,box-shadow,border-radius] duration-300 ${
                        scrolled
                            ? 'h-[70px] md:h-auto px-6 md:px-8 py-0 md:py-4 rounded-none md:rounded-[2rem] bg-white/75 dark:bg-black/75 backdrop-blur-[12px] md:backdrop-blur-2xl border-b border-zinc-200/50 dark:border-white/10 md:border md:shadow-[0_8px_32px_rgba(0,0,0,0.4)]'
                            : 'h-auto py-2 md:py-4 px-6 md:px-8 rounded-none md:rounded-[2rem] bg-transparent border-b border-transparent md:border-transparent'
                    }`}>

                        {/* Logo */}
                        <motion.div
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.96 }}
                            className="text-xl md:text-2xl font-black cursor-pointer tracking-tighter transition-colors duration-500 flex items-center gap-2 text-zinc-950 dark:text-white"
                            onClick={() => scrollToSection('#home')}
                        >
                            <span className="w-2 h-2 rounded-full bg-emerald-400 shadow-[0_0_8px_rgba(52,211,153,0.8)] inline-block" />
                            EH.
                        </motion.div>

                        {/* Center Nav Links — only visible when scrolled */}
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: scrolled ? 1 : 0, scale: scrolled ? 1 : 0.95, pointerEvents: scrolled ? 'auto' : 'none' }}
                            transition={{ duration: 0.3 }}
                            className="hidden md:flex items-center gap-1 bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 rounded-full px-2 py-1.5"
                        >
                            {navLinks.map((link, index) => {
                                const isActive = activeSection === link.href.substring(1);
                                return (
                                    <motion.button
                                        key={index}
                                        onClick={() => scrollToSection(link.href)}
                                        whileHover={{ scale: 1.05 }}
                                        whileTap={{ scale: 0.96 }}
                                        className={`relative px-4 py-1.5 text-[10px] font-black uppercase tracking-[0.2em] rounded-full transition duration-300 ${
                                            isActive
                                                ? 'text-white dark:text-black'
                                                : 'text-zinc-500 dark:text-white/50 hover:text-zinc-950 dark:hover:text-white'
                                        }`}
                                    >
                                        {isActive && (
                                            <motion.div
                                                layoutId="active-pill"
                                                className="absolute inset-0 bg-zinc-950 dark:bg-white rounded-full"
                                                transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                                            />
                                        )}
                                        <span className="relative z-10">{link.name}</span>
                                    </motion.button>
                                );
                            })}
                        </motion.div>

                        {/* Right Side Actions */}
                        <div className="flex items-center gap-3">
                            {/* Dark Mode Toggle */}
                            <motion.button
                                whileTap={{ scale: 0.96 }}
                                onClick={toggleDarkMode}
                                aria-label={darkMode ? 'Switch to light mode' : 'Switch to dark mode'}
                                className={`p-2.5 rounded-full transition duration-300 ${
                                    scrolled
                                        ? 'text-zinc-800 dark:text-white/70 hover:text-zinc-950 dark:hover:text-white bg-black/5 dark:bg-white/5 border border-zinc-200 dark:border-white/10'
                                        : 'text-zinc-800 dark:text-white bg-zinc-950/10 dark:bg-black/20 border border-zinc-800/10 dark:border-white/10 backdrop-blur-md'
                                }`}
                            >
                                <SwapIcon id={darkMode ? 'sun' : 'moon'}>
                                    {darkMode ? <FaSun size={16} /> : <FaMoon size={16} />}
                                </SwapIcon>
                            </motion.button>

                            {/* Contact CTA — only when scrolled */}
                            <motion.button
                                initial={{ opacity: 0, scale: 0.8 }}
                                animate={{ opacity: scrolled ? 1 : 0, scale: scrolled ? 1 : 0.8, pointerEvents: scrolled ? 'auto' : 'none' }}
                                transition={{ duration: 0.3 }}
                                onClick={() => scrollToSection('#contact')}
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.96 }}
                                className="hidden sm:flex items-center gap-2 px-5 py-2 bg-zinc-950 dark:bg-white text-white dark:text-black font-black text-[10px] uppercase tracking-[0.2em] rounded-full transition duration-300 hover:bg-zinc-800 dark:hover:bg-white/90"
                            >
                                <FaEnvelope size={10} />
                                Hire me
                            </motion.button>
                            {/* Mobile Hamburger Button */}
                            <motion.button
                                whileTap={{ scale: 0.96 }}
                                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                                aria-label={mobileMenuOpen ? 'Close menu' : 'Open menu'}
                                aria-expanded={mobileMenuOpen}
                                className={`md:hidden p-2.5 rounded-full transition duration-300 flex items-center justify-center pointer-events-auto ${
                                    scrolled
                                        ? 'text-zinc-800 dark:text-white/70 hover:text-zinc-950 dark:hover:text-white bg-black/5 dark:bg-white/5 border border-zinc-200 dark:border-white/10'
                                        : 'text-white bg-zinc-950/80 dark:bg-black/40 border border-zinc-800 dark:border-white/10 backdrop-blur-xl'
                                }`}
                            >
                                <SwapIcon id={mobileMenuOpen ? 'close' : 'open'}>
                                    {mobileMenuOpen ? <FaTimes size={18} /> : <FaBars size={18} />}
                                </SwapIcon>
                            </motion.button>
                        </div>
                    </div>
                </div>
            </motion.nav>            {/* Mobile Menu Dropdown */}
            <AnimatePresence>
                {mobileMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: 12, filter: 'blur(4px)' }}
                        animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                        exit={{ opacity: 0, y: -12, filter: 'blur(4px)', transition: { duration: 0.15, ease: 'easeOut' } }}
                        transition={{ duration: 0.3, ease: 'easeOut' }}
                        className="fixed inset-x-4 top-20 z-[90] bg-white/95 dark:bg-black/95 backdrop-blur-3xl border border-zinc-200/50 dark:border-white/10 rounded-[36px] p-6 shadow-2xl md:hidden"
                    >
                        <div className="flex flex-col gap-2">
                            {navLinks.map((link, index) => {
                                const isActive = activeSection === link.href.substring(1);
                                return (
                                    <button
                                        key={index}
                                        onClick={() => {
                                            scrollToSection(link.href);
                                            setMobileMenuOpen(false);
                                        }}
                                        className={`px-4 py-4 text-xs font-black uppercase tracking-[0.2em] rounded-xl text-left transition ${
                                            isActive
                                                ? 'bg-zinc-950 dark:bg-white text-white dark:text-black'
                                                : 'text-zinc-600 dark:text-white/50 hover:bg-zinc-100 dark:hover:bg-white/10 hover:text-zinc-950 dark:hover:text-white'
                                        }`}
                                    >
                                        {link.name}
                                    </button>
                                );
                            })}
                            <button
                                onClick={() => {
                                    scrollToSection('#contact');
                                    setMobileMenuOpen(false);
                                }}
                                className="mt-4 px-4 py-4 bg-zinc-950 dark:bg-white text-white dark:text-black font-black text-xs uppercase tracking-[0.2em] rounded-xl flex items-center justify-center gap-3 transition-colors hover:bg-zinc-800 dark:hover:bg-zinc-200"
                            >
                                <FaEnvelope size={14} />
                                Hire me
                            </button>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Vertical Right Navigation removed as requested */}
        </>
    );
};

export default Navbar;
