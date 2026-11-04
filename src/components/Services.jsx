import { motion } from 'framer-motion';
import { FaCode, FaMobileAlt, FaShoppingCart, FaLaptopCode, FaRocket, FaPalette, FaArrowRight } from 'react-icons/fa';
import { MdWeb } from 'react-icons/md';
import { useLanguage } from '../LanguageContext';

const Services = () => {
    const { t } = useLanguage();

    const services = [
        {
            icon: FaCode,
            titleKey: 'fullstack',
            descKey: 'fullstackDesc',
            color: '#61DAFB',
            gradient: 'from-blue-500 to-cyan-500',
        },
        {
            icon: MdWeb,
            titleKey: 'websites',
            descKey: 'websitesDesc',
            color: '#F2C811',
            gradient: 'from-yellow-500 to-orange-500',
        },
        {
            icon: FaMobileAlt,
            titleKey: 'mobile',
            descKey: 'mobileDesc',
            color: '#6DB33F',
            gradient: 'from-green-500 to-emerald-500',
        },
        {
            icon: FaShoppingCart,
            titleKey: 'ecommerce',
            descKey: 'ecommerceDesc',
            color: '#FF2D20',
            gradient: 'from-red-500 to-pink-500',
        },
        {
            icon: FaLaptopCode,
            titleKey: 'landing',
            descKey: 'landingDesc',
            color: '#9333EA',
            gradient: 'from-purple-500 to-violet-500',
        },
        {
            icon: FaPalette,
            titleKey: 'design',
            descKey: 'designDesc',
            color: '#EC4899',
            gradient: 'from-pink-500 to-rose-500',
        },
    ];

    return (
        <section id="services" className="section-padding bg-white dark:bg-black border-t border-gray-200 dark:border-gray-800">
            <div className="max-w-7xl mx-auto">
                {/* Section Title */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mb-24"
                >
                    <h4 className="text-zinc-500 font-black uppercase tracking-[0.4em] text-[10px] mb-4">What I offer</h4>
                    <h2 className="text-5xl md:text-8xl font-black text-black dark:text-white mb-8 tracking-tighter leading-none">
                        {t.services.title} <br/>
                        <span className="text-zinc-300 dark:text-zinc-800 italic">{t.services.titleHighlight}</span>
                    </h2>
                    <div className="w-24 h-[2px] bg-black dark:bg-white mx-auto mb-10"></div>
                    <p className="text-gray-500 dark:text-gray-400 text-lg md:text-2xl max-w-3xl mx-auto font-medium leading-relaxed">
                        {t.services.subtitle}
                    </p>
                </motion.div>

                {/* Services Grid */}
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10">
                    {services.map((service, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                            className="relative group"
                        >
                            {/* Card */}
                            <div className="relative bg-white dark:bg-zinc-900/50 border border-zinc-100 dark:border-white/5 p-12 h-full overflow-hidden transition duration-500 rounded-[3rem] group-hover:shadow-3xl group-hover:scale-[1.02]">
                                {/* Icon Container */}
                                <div className="mb-10 relative">
                                    <div className={`w-20 h-20 rounded-3xl bg-zinc-50 dark:bg-zinc-800 flex items-center justify-center group-hover:bg-black group-hover:text-white dark:group-hover:bg-white dark:group-hover:text-black transition duration-500`}>
                                        <service.icon size={32} />
                                    </div>
                                    <div className="absolute -right-4 -top-4 text-7xl font-black opacity-[0.03] dark:opacity-[0.05] pointer-events-none group-hover:opacity-10 transition-opacity">
                                        {(index + 1).toString().padStart(2, '0')}
                                    </div>
                                </div>

                                {/* Content */}
                                <div className="relative z-10">
                                    <h3 className="text-2xl font-black text-black dark:text-white mb-6 uppercase tracking-tighter">
                                        {t.services[service.titleKey]}
                                    </h3>
                                    <p className="text-zinc-500 dark:text-zinc-400 text-sm leading-relaxed font-medium">
                                        {t.services[service.descKey]}
                                    </p>
                                </div>

                            </div>
                        </motion.div>
                    ))}
                </div>

                {/* Call to Action */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.4 }}
                    className="mt-16 text-center"
                >
                    <motion.a
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.96 }}
                        href="#contact"
                        className="inline-flex items-center gap-6 bg-black dark:bg-white text-white dark:text-black px-12 py-6 font-black text-xs uppercase tracking-[0.3em] transition duration-500 group rounded-full shadow-2xl"
                    >
                        <FaRocket className="text-xl group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                        {t.services.cta}
                    </motion.a>
                </motion.div>
            </div>
        </section>
    );
};

export default Services;
