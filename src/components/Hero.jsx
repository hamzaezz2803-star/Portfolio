import { motion, useScroll, useTransform, useMotionValue, useSpring } from 'framer-motion';
import { FaGithub, FaLinkedin, FaEnvelope, FaArrowRight, FaMapMarkerAlt, FaCode, FaTerminal, FaLayerGroup, FaPalette, FaHammer, FaRocket, FaMobileAlt, FaChartBar, FaDatabase } from 'react-icons/fa';
import { personalInfo, socialLinks } from '../data/portfolioData';
import heroImage from '../assets/hero-profile.png';
import { useLanguage } from '../LanguageContext';
import { useState, useEffect, useRef } from 'react';
import { ToolDock, ToolDockTile } from './ui/techstack';

import reactIcon from '../assets/reactjs3d.png';
import reactNativeIcon from '../assets/reactnatif3d.png';
import nodeIcon from '../assets/node.png';
import expressIcon from '../assets/express3d.png';
import laravelIcon from '../assets/laravel3d.png';
import springbootIcon from '../assets/SPRINGBOOT.png';
import mongodbIcon from '../assets/MONGODB.png';
import flutterIcon from '../assets/flutter3d.png';
import javaIcon from '../assets/java3d.png';
import gitIcon from '../assets/git.png';
import vsIcon from '../assets/vs.png';
import cursorIcon from '../assets/cursor3d.png';

const heroSkills = [
    { name: "ReactJS", image: reactIcon },
    { name: "Laravel", image: laravelIcon },
    { name: "NodeJS", image: nodeIcon },
    { name: "Flutter", image: flutterIcon },
    { name: "Spring Boot", image: springbootIcon },
    { name: "MongoDB", image: mongodbIcon },
    { name: "React Native", image: reactNativeIcon },
    { name: "Java", image: javaIcon },
    { name: "Express", image: expressIcon },
    { name: "Git", image: gitIcon },
    { name: "VS Code", image: vsIcon },
    { name: "Cursor", image: cursorIcon },
];

const heroDockItems = heroSkills.map((skill, i) => ({
    label: skill.name,
    icon: (
        <ToolDockTile className={i % 2 === 0 ? 'bg-white' : 'bg-zinc-900 border border-white/10'}>
            <img
                src={skill.image}
                alt=""
                draggable={false}
                className="w-[72%] h-[72%] object-contain"
            />
        </ToolDockTile>
    ),
}));

/* ─────────────────────────────────────────
   Tiny hook: track mouse position
───────────────────────────────────────── */
const useMouse = () => {
    const x = useMotionValue(0);
    const y = useMotionValue(0);
    useEffect(() => {
        const move = (e) => {
            x.set(e.clientX / window.innerWidth - 0.5);
            y.set(e.clientY / window.innerHeight - 0.5);
        };
        window.addEventListener('mousemove', move);
        return () => window.removeEventListener('mousemove', move);
    }, [x, y]);
    return { x, y };
};

/* ─────────────────────────────────────────
   Character-split animated title
───────────────────────────────────────── */
const SplitText = ({ text, className, style = {}, delay = 0 }) => {
    const [hasAnimated, setHasAnimated] = useState(() => {
        return sessionStorage.getItem(`has_animated_${text}`) === 'true';
    });

    useEffect(() => {
        if (!hasAnimated) {
            sessionStorage.setItem(`has_animated_${text}`, 'true');
        }
    }, [text, hasAnimated]);

    const chars = Array.from(text);
    return (
        <span className={className} aria-label={text} style={{ display: 'inline-block', overflow: 'hidden', ...style }}>
            {chars.map((ch, i) => (
                <motion.span
                    key={i}
                    initial={hasAnimated ? { y: '0%', opacity: 1 } : { y: '110%', opacity: 0 }}
                    animate={{ y: '0%', opacity: 1 }}
                    transition={{
                        duration: 0.7,
                        delay: delay + i * 0.04,
                        ease: [0.22, 1, 0.36, 1],
                    }}
                    className={`inline-block ${ch.trim() ? 'bg-zinc-950 dark:bg-white text-white dark:text-black px-1 md:px-[6px] mx-[1px] md:mx-[2px]' : 'w-4 md:w-8'}`}
                    style={{ whiteSpace: ch === ' ' ? 'pre' : 'normal' }}
                >
                    {ch}
                </motion.span>
            ))}
        </span>
    );
};

/* ─────────────────────────────────────────
   Floating tech elements around the image
───────────────────────────────────────── */
const FloatingElement = ({ icon: Icon, x, y, delay = 0, duration = 4, size = 'text-2xl' }) => (
    <motion.div
        className={`absolute z-30 pointer-events-none flex items-center justify-center bg-white/80 dark:bg-white/10 backdrop-blur-xl p-4 rounded-full border border-zinc-200 dark:border-white/20 shadow-[0_8px_32px_rgba(0,0,0,0.08)] dark:shadow-[0_8px_32px_rgba(0,0,0,0.3)]`}
        style={{ left: x, top: y }}
        initial={{ opacity: 0, scale: 0 }}
        animate={{ 
            opacity: 1, 
            scale: 1,
            y: [0, -20, 0],
            rotate: [0, 5, -5, 0]
        }}
        transition={{ 
            opacity: { delay, duration: 1 },
            scale: { delay, duration: 1 },
            y: { duration, repeat: Infinity, ease: "easeInOut" },
            rotate: { duration: duration * 1.5, repeat: Infinity, ease: "easeInOut" }
        }}
    >
        <div className={`${size} text-zinc-800 dark:text-white`}>
            <Icon />
        </div>
    </motion.div>
);

/* ─────────────────────────────────────────
   Noise canvas overlay
───────────────────────────────────────── */
const NoiseOverlay = () => (
    <svg className="absolute inset-0 w-full h-full pointer-events-none z-20 opacity-[0.035]" xmlns="http://www.w3.org/2000/svg">
        <filter id="noise">
            <feTurbulence type="fractalNoise" baseFrequency="0.65" numOctaves="3" stitchTiles="stitch" />
            <feColorMatrix type="saturate" values="0" />
        </filter>
        <rect width="100%" height="100%" filter="url(#noise)" />
    </svg>
);

/* ─────────────────────────────────────────
   Marquee strip
───────────────────────────────────────── */
const Marquee = ({ text, reverse = false }) => {
    const items = Array(8).fill(text);
    return (
        <div className="overflow-hidden whitespace-nowrap flex">
            <motion.div
                className="flex gap-12 shrink-0"
                animate={{ x: reverse ? ['0%', '50%'] : ['0%', '-50%'] }}
                transition={{ duration: 35, repeat: Infinity, ease: 'linear' }}
            >
                {[...items, ...items].map((item, i) => (
                    <span key={i} className="text-zinc-950 dark:text-white text-[11px] uppercase tracking-[0.4em] font-black">
                        {item} <span className="text-zinc-950/30 dark:text-white/50 mx-4">◆</span>
                    </span>
                ))}
            </motion.div>
        </div>
    );
};

/* ─────────────────────────────────────────
   Main Hero Component
───────────────────────────────────────── */
const Hero = ({ darkMode }) => {
    const { t } = useLanguage();
    const sectionRef = useRef(null);
    const mouse = useMouse();

    const springConfig = { stiffness: 80, damping: 20 };
    const mx = useSpring(useTransform(mouse.x, [-0.5, 0.5], [-12, 12]), springConfig);
    const my = useSpring(useTransform(mouse.y, [-0.5, 0.5], [-8, 8]), springConfig);
    const mxSlow = useSpring(useTransform(mouse.x, [-0.5, 0.5], [-6, 6]), springConfig);
    const mySlow = useSpring(useTransform(mouse.y, [-0.5, 0.5], [-4, 4]), springConfig);

    // Scroll-driven transforms
    const { scrollYProgress } = useScroll({ target: sectionRef, offset: ['start start', 'end start'] });
    const imgScale    = useTransform(scrollYProgress, [0, 1], [1, 1.12]);
    const imgOpacity  = useTransform(scrollYProgress, [0, 0.7], [1, 0]);
    const textY       = useTransform(scrollYProgress, [0, 1], ['0%', '-30%']);
    const nameScale   = useTransform(scrollYProgress, [0, 1], [1, 1.15]);
    const textOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
    const overlayOp   = useTransform(scrollYProgress, [0, 0.6], [0.55, 0.9]);
    const marqueeY    = useTransform(scrollYProgress, [0, 1], ['0%', '40%']);

    const scrollToProjects = () => document.querySelector('#projects')?.scrollIntoView({ behavior: 'smooth' });
    const scrollToContact  = () => document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' });

    const stats = [
        { value: '3+', label: 'Stages' },
        { value: '9+', label: 'Projets' },
        { value: '5', label: 'Années' },
    ];

    const bottomGradient = darkMode
        ? 'linear-gradient(to top, #000 0%, #000 10%, transparent 50%)'
        : 'linear-gradient(to top, #fff 0%, #fff 10%, transparent 50%)';

    const radialGradient = darkMode
        ? 'radial-gradient(circle at center, transparent 30%, rgba(0,0,0,0.8) 100%)'
        : 'radial-gradient(circle at center, transparent 30%, rgba(255,255,255,0.7) 100%)';

    const scrollLineBackground = darkMode
        ? 'linear-gradient(to bottom, rgba(255,255,255,0.5), transparent)'
        : 'linear-gradient(to bottom, rgba(0,0,0,0.3), transparent)';

    return (
        <section
            id="home"
            ref={sectionRef}
            className="relative min-h-[100svh] overflow-hidden bg-white dark:bg-black transition-colors duration-300"
        >
            {/* ── Grain ── */}
            <NoiseOverlay />

            {/* ── Solid background base ── */}
            <div className="absolute inset-0 z-0 bg-white dark:bg-black transition-colors duration-300" />

            {/* ── Center portrait image (z-40 puts it in front of text) ── */}
            <div className="absolute inset-0 z-40 flex justify-center items-end pointer-events-none pb-[35vh] md:pb-0">
                <motion.div
                    className="relative w-full h-full max-w-[700px]"
                    style={{
                        x: mxSlow,
                        y: mySlow,
                    }}
                >
                    <motion.img
                        src={heroImage}
                        alt=""
                        aria-hidden="true"
                        className={`w-full h-full object-contain object-bottom transition-all duration-300 ${
                            darkMode
                                ? "drop-shadow-[0_0_1px_rgba(255,255,255,1)] drop-shadow-[0_0_3px_rgba(255,255,255,1)] drop-shadow-[0_0_15px_rgba(255,255,255,0.4)]"
                                : "drop-shadow-[0_0_1px_rgba(0,0,0,0.15)] drop-shadow-[0_0_3px_rgba(0,0,0,0.1)] drop-shadow-[0_0_12px_rgba(0,0,0,0.06)]"
                        }`}
                        style={{
                            scale: imgScale,
                            opacity: imgOpacity,
                        }}
                        initial={{ opacity: 0, y: 40 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 1.2, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
                    />
                    
                    {/* Floating Tech Icons Around Image */}
                    <FloatingElement icon={FaCode} x="5%" y="40%" delay={1.5} />
                    <FloatingElement icon={FaTerminal} x="85%" y="35%" delay={1.8} />
                    <FloatingElement icon={FaLayerGroup} x="0%" y="65%" delay={2.1} />
                    <FloatingElement icon={FaPalette} x="90%" y="60%" delay={2.4} />
                    <FloatingElement icon={FaMobileAlt} x="10%" y="20%" delay={2.7} />
                    <FloatingElement icon={FaChartBar} x="80%" y="15%" delay={3.0} />
                    <FloatingElement icon={FaDatabase} x="45%" y="10%" delay={3.3} />
                    <FloatingElement icon={FaHammer} x="15%" y="75%" delay={3.6} size="text-xl" />
                    <FloatingElement icon={FaRocket} x="75%" y="78%" delay={3.9} size="text-xl" />

                    {/* Strong fade at the bottom to blend with background */}
                    <div
                        className="absolute inset-0 pointer-events-none transition-all duration-300"
                        style={{ background: bottomGradient }}
                    />
                </motion.div>
                
                {/* Radial vignette for cinematic blackness around edges */}
                <div
                    className="absolute inset-0 pointer-events-none transition-all duration-300"
                    style={{ background: radialGradient }}
                />
            </div>

            {/* ── Horizontal scan-line accent ── */}
            <motion.div
                className="absolute left-0 right-0 h-px bg-black/5 dark:bg-white/10 z-20"
                style={{ top: '35%' }}
                animate={{ scaleX: [0.6, 1, 0.6], opacity: [0.04, 0.12, 0.04] }}
                transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut' }}
            />

            {/* ── Top marquee strip ── */}
            <motion.div
                className="absolute top-0 left-0 right-0 py-3 border-b border-black/5 dark:border-white/5 z-30"
                style={{ y: marqueeY }}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 2.2 }}
            >
                <Marquee text="Full-Stack Developer · Casablanca · ReactJS · Laravel · Node.js · Flutter" />
            </motion.div>

            {/* ── GIANT Cinematic Title (Background Layer) ── */}
            <motion.div 
                className="absolute inset-0 z-20 flex flex-col items-center justify-center pointer-events-none px-4"
                style={{ y: textY, opacity: textOpacity }}
            >
                <div className="flex flex-col gap-0 md:gap-2 w-full">
                    <motion.div style={{ x: mx, y: my, scale: nameScale }} className="flex flex-col items-center justify-center text-center w-full gap-0 md:gap-2">
                        <SplitText
                            text="EZ-ZOUEK"
                            delay={0.5}
                            className="block font-black uppercase leading-[0.8] tracking-tighter w-full"
                            style={{ fontSize: 'clamp(2.5rem, 12vw, 9rem)' }}
                        />
                        <SplitText
                            text="HAMZA"
                            delay={0.7}
                            className="block font-black uppercase leading-[0.8] tracking-tighter w-full"
                            style={{
                                fontSize: 'clamp(2.5rem, 12vw, 9rem)',
                            }}
                        />
                    </motion.div>
                </div>
            </motion.div>

            {/* ═══════════════════════════════════════
                FOREGROUND CONTENT (Interactive Layer)
            ═══════════════════════════════════════ */}
            <motion.div
                className="relative z-50 min-h-[100svh] flex flex-col justify-between container-custom pt-32 pb-8 md:pb-16 pointer-events-none"
                style={{ y: textY, opacity: textOpacity }}
            >
                {/* ── Foreground Description ── */}
                <div className="hidden md:block mt-auto mb-auto">
                     <div style={{ height: 'clamp(7rem, 22vw, 20rem)' }}></div>
                </div>

                {/* Spacer for mobile to push things down */}
                <div className="flex-1 md:hidden" />

                <div className="flex flex-col gap-2 pointer-events-auto">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 1.3, duration: 0.8 }}
                        className="flex flex-col gap-4 mt-6 max-w-[280px] md:max-w-[320px]"
                    >
                        <div className="h-[2px] flex-grow-0 w-16 bg-zinc-950 dark:bg-white shadow-[0_0_10px_rgba(0,0,0,0.15)] dark:shadow-[0_0_10px_rgba(255,255,255,0.5)]" />
                        <p className="text-zinc-900 dark:text-white text-[11px] md:text-[12px] uppercase tracking-[0.2em] font-medium leading-[1.6] opacity-90 dark:drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]">
                            Software Engineering Student, Web & Mobile Developer, Co-founder of W&H Agency.
                        </p>
                    </motion.div>
                </div>

                {/* ── Interactive Tech Stack Dock ── */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 1.5, duration: 0.8 }}
                    className="w-full flex justify-center pointer-events-auto my-3 md:my-5 relative z-40"
                >
                    <ToolDock items={heroDockItems} size={54} label="Tech stack" />
                </motion.div>

                {/* ── Bottom row: stats + CTAs + social ── */}
                <div className="flex flex-col md:flex-row items-center md:items-end justify-between gap-10 mt-6 md:mt-10 w-full bg-white/70 dark:bg-black/60 md:bg-transparent md:dark:bg-transparent backdrop-blur-2xl md:backdrop-blur-none p-8 md:p-0 rounded-[2rem] md:rounded-none">

                    {/* Stats pills */}
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 1.7, duration: 0.8 }}
                        className="flex justify-between md:justify-start w-full md:w-auto gap-4 md:gap-12"
                    >
                        {stats.map((s, i) => (
                            <motion.div
                                key={i}
                                whileHover={{ y: -5 }}
                                className="flex flex-col items-center md:items-start transition-all duration-300"
                            >
                                <div className="text-zinc-950 dark:text-white font-black text-3xl md:text-5xl leading-none tracking-tighter">{s.value}</div>
                                <div className="text-zinc-950/40 dark:text-white/40 text-[10px] uppercase tracking-[0.2em] mt-2 font-bold">{s.label}</div>
                            </motion.div>
                        ))}
                    </motion.div>

                    {/* CTAs + socials */}
                    <div className="flex flex-col gap-8 items-center md:items-end w-full md:w-auto">
                        {/* CTA buttons */}
                        <div className="flex flex-col sm:flex-row justify-center md:justify-end gap-4 pointer-events-auto relative z-30 w-full">
                            <motion.button
                                whileHover={{ 
                                    backgroundColor: darkMode ? '#ffffff' : '#18181b', 
                                    color: darkMode ? '#000000' : '#ffffff', 
                                    scale: 1.05 
                                }}
                                whileTap={{ scale: 0.95 }}
                                onClick={scrollToProjects}
                                className="flex items-center justify-center gap-4 px-8 py-4 bg-zinc-950 dark:bg-white text-white dark:text-black font-black text-[11px] uppercase tracking-[0.2em] transition-all duration-500 rounded-full w-full sm:w-auto shadow-lg shadow-zinc-950/10 dark:shadow-none"
                            >
                                {t.hero.viewProjects}
                                <FaArrowRight className="text-[10px]" />
                            </motion.button>

                            <motion.button
                                whileHover={{ 
                                    backgroundColor: darkMode ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.05)', 
                                    scale: 1.05 
                                }}
                                whileTap={{ scale: 0.95 }}
                                onClick={scrollToContact}
                                className="flex items-center justify-center gap-4 px-8 py-4 border border-zinc-900/20 dark:border-white/20 text-zinc-900 dark:text-white font-black text-[11px] uppercase tracking-[0.2em] transition-all duration-500 rounded-full backdrop-blur-md w-full sm:w-auto"
                            >
                                {t.hero.contactMe}
                                <FaArrowRight className="text-[10px]" />
                            </motion.button>
                        </div>

                        {/* Social icons */}
                        <div className="flex justify-center md:justify-end gap-8 md:gap-6 relative z-30 pointer-events-auto md:mr-20">
                            {[
                                { icon: FaGithub,   link: socialLinks.github,              label: 'GitHub' },
                                { icon: FaLinkedin, link: socialLinks.linkedin,            label: 'LinkedIn' },
                                { icon: FaEnvelope, link: `mailto:${personalInfo.email}`,  label: 'Email' },
                            ].map((s, i) => (
                                <motion.a
                                    key={i}
                                    href={s.link}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    aria-label={s.label}
                                    whileHover={{ y: -4, color: darkMode ? '#ffffff' : '#000000' }}
                                    whileTap={{ scale: 0.9 }}
                                    className="text-zinc-400 dark:text-white/30 hover:text-zinc-950 dark:hover:text-white transition-colors text-2xl md:text-xl"
                                >
                                    <s.icon />
                                </motion.a>
                            ))}
                        </div>
                    </div>
                </div>
            </motion.div>

            {/* ── Scroll indicator ── */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 2.5 }}
                className="absolute bottom-8 left-1/2 -translate-x-1/2 z-40 flex flex-col items-center gap-2 hidden md:flex pointer-events-none"
            >
                <span className="text-zinc-950/30 dark:text-white/30 text-[9px] uppercase tracking-[0.4em]">{t.hero.scroll}</span>
                <motion.div
                    animate={{ scaleY: [0, 1, 0], y: [0, 8, 0] }}
                    transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
                    className="w-px h-14 origin-top"
                    style={{ background: scrollLineBackground }}
                />
            </motion.div>

        </section>
    );
};

export default Hero;
