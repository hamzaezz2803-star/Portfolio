import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect, useRef } from 'react';
import { useLanguage } from '../LanguageContext';
import { ToolDock, ToolDockTile } from './ui/techstack';

// Import all custom 3D / tech images
import biIcon from '../assets/bi.png';
import csharpIcon from '../assets/csharp.png';
import gitIcon from '../assets/git.png';
import javaIcon from '../assets/java3d.png';
import nodeIcon from '../assets/node.png';
import reactIcon from '../assets/reactjs3d.png';
import reactNativeIcon from '../assets/reactnatif3d.png';
import vsIcon from '../assets/vs.png';
import laravelIcon from '../assets/laravel3d.png';
import flutterIcon from '../assets/flutter3d.png';
import expressIcon from '../assets/express3d.png';
import cursorIcon from '../assets/cursor3d.png';
import mongodbIcon from '../assets/MONGODB.png';
import springbootIcon from '../assets/SPRINGBOOT.png';
import intellijIcon from '../assets/sticker_intellijidea (2).png';

const allSkills = [
    { name: "ReactJS", image: reactIcon, color: "#61DAFB" },
    { name: "React Native", image: reactNativeIcon, color: "#61DAFB" },
    { name: "NodeJS", image: nodeIcon, color: "#339933" },
    { name: "Express", image: expressIcon, color: "#808080" },
    { name: "Laravel", image: laravelIcon, color: "#FF2D20" },
    { name: "Spring Boot", image: springbootIcon, color: "#6DB33F" },
    { name: "MongoDB", image: mongodbIcon, color: "#47A248" },
    { name: "Flutter", image: flutterIcon, color: "#02569B" },
    { name: "Java", image: javaIcon, color: "#f89820" },
    { name: "C#", image: csharpIcon, color: "#9b4f96" },
    { name: "Git", image: gitIcon, color: "#F05032" },
    { name: "Power BI", image: biIcon, color: "#F2C811" },
    { name: "VS Code", image: vsIcon, color: "#007ACC" },
    { name: "IntelliJ IDEA", image: intellijIcon, color: "#FE315D" },
    { name: "Cursor", image: cursorIcon, color: "#ffffff" },
];

const dockItems = allSkills.map((skill, i) => ({
    label: skill.name,
    icon: (
        <ToolDockTile className={i % 2 === 0 ? 'bg-white' : 'bg-zinc-900'}>
            <img
                src={skill.image}
                alt=""
                draggable={false}
                className="w-[72%] h-[72%] object-contain"
            />
        </ToolDockTile>
    ),
}));

const Skills = () => {
    const { t } = useLanguage();

    return (        <section id="skills" className="py-24 bg-white dark:bg-[#050505] transition-colors duration-500 overflow-hidden select-none">
            <div className="max-w-[100vw]">
                {/* Header Section */}
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 md:gap-12 mb-10 md:mb-24 px-6 md:px-14 lg:px-20 max-w-7xl mx-auto">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="max-w-3xl"
                    >
                        <h4 className="text-zinc-500 font-black uppercase tracking-[0.4em] text-[10px] mb-4">My Stack</h4>
                        <h2 className="text-5xl md:text-8xl font-black text-black dark:text-white leading-[0.9] tracking-tighter">
                            {t.skills.title} <br/>
                            <span className="text-zinc-300 dark:text-zinc-800 italic">{t.skills.titleHighlight}</span>
                        </h2>
                    </motion.div>

                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-gray-500 dark:text-gray-400 text-lg md:text-2xl max-w-md md:text-right font-medium leading-relaxed"
                    >
                        {t.skills.subtitle}
                    </motion.p>
                </div>

                {/* Tech Display */}
                <div className="relative px-4 md:px-10 pt-4 pb-8 md:pb-24 bg-zinc-50/50 dark:bg-zinc-900/10 border-y border-zinc-100 dark:border-white/5">
                    {/* Desktop ToolDock */}
                    <div className="hidden md:block max-w-6xl mx-auto">
                        <ToolDock items={dockItems} size={92} label="Tech stack" />
                    </div>

                    {/* Mobile Tech Grid */}
                    <div className="block md:hidden max-w-md mx-auto py-2">
                        <div className="grid grid-cols-3 gap-2.5">
                            {allSkills.map((skill, index) => (
                                <motion.div
                                    key={skill.name}
                                    initial={{ opacity: 0, y: 16 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 0.35, delay: index * 0.02 }}
                                    whileTap={{ scale: 0.94 }}
                                    className="group relative flex flex-col items-center justify-between p-3 min-h-[102px] rounded-2xl bg-white dark:bg-zinc-900/80 border border-zinc-200/80 dark:border-white/10 shadow-[0_2px_8px_rgba(0,0,0,0.04)] dark:shadow-[0_4px_16px_rgba(0,0,0,0.3)] backdrop-blur-sm overflow-hidden"
                                >
                                    {/* Brand color ambient glow */}
                                    <div
                                        className="absolute -top-5 w-16 h-16 rounded-full blur-xl pointer-events-none opacity-25 dark:opacity-35 transition-opacity"
                                        style={{ backgroundColor: skill.color }}
                                    />

                                    {/* 3D Icon Container */}
                                    <div className="relative w-12 h-12 flex items-center justify-center my-auto">
                                        <img
                                            src={skill.image}
                                            alt={skill.name}
                                            draggable={false}
                                            className="w-10 h-10 object-contain drop-shadow-[0_4px_8px_rgba(0,0,0,0.14)] dark:drop-shadow-[0_4px_12px_rgba(0,0,0,0.5)] group-hover:scale-105 transition-transform"
                                        />
                                    </div>

                                    {/* Tech Name Label */}
                                    <span className="relative z-10 text-[11px] font-semibold text-zinc-800 dark:text-zinc-200 tracking-tight text-center leading-tight line-clamp-1 w-full px-0.5">
                                        {skill.name}
                                    </span>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Skills;
