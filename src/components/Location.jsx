import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FaClock, FaMapMarkerAlt, FaGlobe, FaLaptopHouse, FaCheckCircle } from 'react-icons/fa';
import { useLanguage } from '../LanguageContext';

const Location = () => {
    const { t } = useLanguage();
    const [time, setTime] = useState(new Date());

    useEffect(() => {
        const timer = setInterval(() => {
            setTime(new Date());
        }, 1000);
        return () => clearInterval(timer);
    }, []);

    // Format time for Casablanca (UTC+1 usually, but let's just use local time for the demo as it's for the same timezone in Morocco)
    // Actually, to be precise, we can use Intl.DateTimeFormat
    const formatTime = (date) => {
        return new Intl.DateTimeFormat('fr-FR', {
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit',
            timeZone: 'Africa/Casablanca'
        }).format(date);
    };

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.2
            }
        }
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: { 
            opacity: 1, 
            y: 0,
            transition: { duration: 0.6, ease: [0.6, 0.05, 0.01, 0.9] }
        }
    };

    return (
        <section id="location" className="py-24 bg-white dark:bg-black transition-colors duration-300">
            <div className="max-w-[1400px] mx-auto px-6 md:px-12 lg:px-16">
                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-100px" }}
                    className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center"
                >
                    {/* Left Side: Map & Location */}
                    <motion.div variants={itemVariants} className="relative">
                        <div className="mb-16">
                            <h4 className="text-zinc-500 font-black uppercase tracking-[0.4em] text-[10px] mb-4">Availability</h4>
                            <h2 className="text-5xl md:text-8xl font-black text-black dark:text-white mb-8 tracking-tighter leading-none">
                                {t.location.title} <br/>
                                <span className="text-zinc-300 dark:text-zinc-800 italic">{t.location.titleHighlight}</span>
                            </h2>
                            <div className="w-24 h-[2px] bg-black dark:bg-white mb-10"></div>
                            <p className="text-zinc-500 dark:text-zinc-400 text-lg md:text-2xl max-w-xl font-medium leading-relaxed">
                                {t.location.subtitle}
                            </p>
                        </div>

                        {/* Interactive Google Map */}
                        <div className="relative aspect-square md:aspect-video w-full bg-zinc-50 dark:bg-zinc-900 border border-zinc-100 dark:border-white/5 rounded-[3rem] shadow-3xl overflow-hidden group">
                            <iframe
                                title="Casablanca Map"
                                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d106361.35515233!2d-7.66939462557438!3d33.57226315801966!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xda7cd4778a113b1%3A0x10cb9d6a570618b0!2sCasablanca!5e0!3m2!1sfr!2sma!4v1710345678901!5m2!1sfr!2sma"
                                className="w-full h-full grayscale contrast-125 opacity-70 dark:opacity-60 dark:invert transition duration-1000 group-hover:opacity-100 group-hover:grayscale-0 group-hover:dark:invert-0"
                                allowFullScreen=""
                                loading="lazy"
                                referrerPolicy="no-referrer-when-downgrade"
                            ></iframe>
                            
                            {/* Floating Marker Label */}
                            <div className="absolute bottom-10 right-10 bg-white/10 backdrop-blur-3xl px-8 py-4 rounded-full border border-white/20 text-[10px] text-white font-black uppercase tracking-[0.3em] shadow-2xl transition duration-700 group-hover:scale-105 group-hover:bg-white group-hover:text-black">
                                Casablanca, Morocco
                            </div>
                        </div>
                    </motion.div>

                    {/* Right Side: Clock & Availability */}
                    <motion.div variants={itemVariants} className="space-y-8">
                        {/* Digital Clock Card */}
                        <div className="bg-zinc-900/50 dark:bg-zinc-900/30 border border-zinc-100 dark:border-white/5 p-12 rounded-[3rem] relative overflow-hidden group backdrop-blur-3xl shadow-3xl">
                           {/* Decorative Numbers Background */}
                           <div className="absolute top-0 right-0 text-[15rem] font-black text-white/5 select-none leading-none -mr-16 -mt-16 italic">
                                {time.getHours()}
                           </div>
                           
                            <div className="relative z-10">
                                <div className="flex items-center gap-4 text-zinc-500 mb-8 uppercase tracking-[0.4em] text-[10px] font-black">
                                    <div className="w-8 h-[1px] bg-zinc-800" />
                                    {t.location.localTime}
                                </div>
                                <div className="text-7xl md:text-9xl font-black text-black dark:text-white tracking-tighter mb-6 tabular-nums leading-none">
                                    {formatTime(time)}
                                </div>
                                <p className="text-zinc-500 font-black text-[10px] uppercase tracking-[0.2em]">
                                    Greenwich Mean Time (GMT+1)
                                </p>
                            </div>
                        </div>

                        {/* Availability Details */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {[
                                { icon: null, text: t.location.available, label: t.location.status, status: true },
                                { icon: FaLaptopHouse, text: t.location.remote, label: 'Work Model' },
                                { icon: FaGlobe, text: t.location.mobility, label: 'Mobility' },
                                { icon: FaCheckCircle, text: t.location.openFor, label: 'Opportunity' }
                            ].map((item, idx) => (
                                <div key={idx} className="p-10 bg-white dark:bg-zinc-900/20 border border-zinc-100 dark:border-white/5 rounded-[2.5rem] hover:bg-black dark:hover:bg-white transition duration-500 group/card">
                                    <div className="flex items-center gap-3 mb-6">
                                        {item.status ? (
                                            <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
                                        ) : item.icon && (
                                            <item.icon className="text-zinc-400 group-hover/card:text-zinc-200 transition-colors" />
                                        )}
                                        <span className="text-[10px] font-black uppercase tracking-[0.3em] text-zinc-400 group-hover/card:text-zinc-500">
                                            {item.label}
                                        </span>
                                    </div>
                                    <p className="text-sm font-black text-black dark:text-white group-hover/card:text-white dark:group-hover/card:text-black uppercase tracking-widest leading-relaxed">
                                        {item.text}
                                    </p>
                                </div>
                            ))}
                        </div>
                    </motion.div>
                </motion.div>
            </div>
        </section>
    );
};

export default Location;
