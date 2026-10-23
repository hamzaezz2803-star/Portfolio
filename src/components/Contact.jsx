import { useState } from 'react';
import { motion } from 'framer-motion';
import { FaEnvelope, FaPhone, FaMapMarkerAlt } from 'react-icons/fa';
import { FaArrowRightLong } from 'react-icons/fa6';
import toast from 'react-hot-toast';
import { useLanguage } from '../LanguageContext';
import { personalInfo } from '../data/portfolioData';

const Contact = () => {
    const { t } = useLanguage();
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        subject: '',
        message: '',
    });
    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        const FORMSPREE_ENDPOINT = 'https://formspree.io/f/xljjearb';

        try {
            const response = await fetch(FORMSPREE_ENDPOINT, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            if (response.ok) {
                toast.success(t?.contact?.form?.success || 'Message envoyé avec succès !');
                setFormData({ name: '', email: '', subject: '', message: '' });
            } else {
                const data = await response.json().catch(() => null);
                if (data && data.errors && data.errors.length > 0) {
                    toast.error(data.errors.map((err) => err.message).join(', '));
                } else {
                    toast.error(t?.contact?.form?.error || "Une erreur est survenue lors de l'envoi.");
                }
            }
        } catch (error) {
            console.error('Formspree Error:', error);
            toast.error(t?.contact?.form?.error || "Une erreur est survenue lors de l'envoi.");
        } finally {
            setLoading(false);
        }
    };

    const contactInfo = [
        {
            icon: FaEnvelope,
            title: t.contact.contactInfo.email || "Email us",
            value: personalInfo.email,
            link: `mailto:${personalInfo.email}`,
        },
        {
            icon: FaPhone,
            title: t.contact.contactInfo.phone || "Call us",
            value: personalInfo.phone,
            link: `tel:${personalInfo.phone}`,
        },
        {
            icon: FaMapMarkerAlt,
            title: t.contact.contactInfo.location || "Our location",
            value: personalInfo.location,
            link: '#',
        },
    ];

    return (
        <section id="contact" className="relative py-24 md:py-32 bg-white dark:bg-black overflow-hidden transition-colors duration-500 min-h-screen flex items-center justify-center">
            
            {/* --- Glowing Emerald Orb Background --- */}
            <div className="absolute top-[2%] left-1/2 -translate-x-1/2 w-[90vw] md:w-[60vw] h-[400px] bg-teal-500/20 dark:bg-[#1a4a38] blur-[100px] md:blur-[150px] rounded-full pointer-events-none z-0 opacity-60 dark:opacity-40" />

            {/* --- Massive Faded Background Text --- */}
            <div className="absolute top-[5%] left-1/2 -translate-x-1/2 w-full text-center pointer-events-none select-none z-0">
                <motion.h1 
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1.2, ease: "easeOut" }}
                    viewport={{ once: true }}
                    className="text-[20vw] font-black uppercase tracking-tighter leading-none bg-clip-text text-transparent bg-gradient-to-b from-black/20 to-transparent dark:from-white/30 dark:to-transparent blur-[6px] md:blur-[8px]"
                >
                    CONTACT
                </motion.h1>
            </div>

            <div className="max-w-6xl mx-auto px-6 relative z-10 w-full mt-10">
                <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-start">
                    
                    {/* --- Left Column: Info --- */}
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8, ease: "easeOut" }}
                        className="flex flex-col pt-4"
                    >
                        {/* Pill Badge */}
                        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-gray-200 dark:border-[#222] bg-white dark:bg-[#0a0a0a] shadow-sm mb-6 w-fit">
                            <div className="w-[18px] h-[18px] rounded-full flex items-center justify-center bg-gray-100 dark:bg-[#1a1a1a] border border-gray-200 dark:border-[#333]">
                                <div className="w-[6px] h-[6px] rounded-full bg-gray-400 dark:bg-gray-500" />
                            </div>
                            <span className="text-xs font-semibold text-gray-700 dark:text-gray-300 pr-1">
                                Contact
                            </span>
                        </div>

                        {/* Title & Subtitle */}
                        <h2 className="text-4xl md:text-[3rem] font-bold text-black dark:text-white tracking-tight leading-tight mb-3">
                            Get in touch
                        </h2>
                        <p className="text-gray-500 dark:text-[#888] text-[15px] mb-10 max-w-[320px] leading-relaxed">
                            Have questions or ready to transform your business with AI automation?
                        </p>

                        {/* Contact Cards Stack */}
                        <div className="flex flex-col gap-3">
                            {contactInfo.map((info, index) => (
                                <motion.a
                                    key={index}
                                    href={info.link}
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 0.5, delay: index * 0.1 }}
                                    whileHover={{ scale: 1.01 }}
                                    whileTap={{ scale: 0.99 }}
                                    className="group flex items-center p-3 md:p-4 rounded-[1.25rem] bg-gray-50 dark:bg-[#0a0a0a] border border-gray-200 dark:border-[#1a1a1a] hover:border-gray-300 dark:hover:border-[#333] transition-all cursor-pointer"
                                >
                                    {/* Icon Box */}
                                    <div className="w-12 h-12 flex items-center justify-center rounded-[12px] bg-white dark:bg-[#161616] border border-gray-100 dark:border-[#222] text-gray-600 dark:text-gray-300 transition-colors shadow-sm">
                                        <info.icon size={16} />
                                    </div>
                                    
                                    {/* Text Info */}
                                    <div className="ml-4 flex-1">
                                        <p className="text-[13px] font-bold text-black dark:text-white mb-0.5 tracking-wide">
                                            {info.title}
                                        </p>
                                        <p className="text-[13px] font-medium text-gray-500 dark:text-[#888]">
                                            {info.value}
                                        </p>
                                    </div>

                                    {/* Arrow Button */}
                                    <div className="w-9 h-9 flex items-center justify-center rounded-full bg-white dark:bg-[#161616] border border-gray-100 dark:border-[#222] text-gray-400 dark:text-gray-500 group-hover:text-black dark:group-hover:text-white transition-colors ml-4 shadow-sm">
                                        <FaArrowRightLong size={12} className="-rotate-45" />
                                    </div>
                                </motion.a>
                            ))}
                        </div>
                    </motion.div>

                    {/* --- Right Column: Form Container --- */}
                    <motion.div
                        initial={{ opacity: 0, x: 30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
                        className="relative mt-4 md:mt-8"
                    >
                        {/* Outer Glow for Form (Matches image) */}
                        <div className="absolute -inset-1 bg-gradient-to-b from-gray-200/50 to-transparent dark:from-white/5 dark:to-transparent rounded-[2rem] blur-sm z-0"></div>
                        
                        <form 
                            onSubmit={handleSubmit} 
                            className="relative z-10 bg-white dark:bg-[#050505] p-3 md:p-4 rounded-[1.75rem] border border-gray-200 dark:border-[#222] shadow-2xl flex flex-col gap-2.5"
                        >
                            <div className="grid md:grid-cols-2 gap-2.5">
                                <input
                                    type="text"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleChange}
                                    required
                                    placeholder={t?.contact?.form?.namePlaceholder || "Name"}
                                    className="w-full bg-gray-50 dark:bg-[#111111] border border-transparent dark:border-[#1a1a1a] rounded-[1rem] px-5 py-4 focus:outline-none focus:border-gray-300 dark:focus:border-[#333] transition-colors text-black dark:text-white placeholder-gray-400 dark:placeholder-[#666] text-sm font-medium"
                                />
                                
                                <input
                                    type="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    required
                                    placeholder={t?.contact?.form?.emailPlaceholder || "Email"}
                                    className="w-full bg-gray-50 dark:bg-[#111111] border border-transparent dark:border-[#1a1a1a] rounded-[1rem] px-5 py-4 focus:outline-none focus:border-gray-300 dark:focus:border-[#333] transition-colors text-black dark:text-white placeholder-gray-400 dark:placeholder-[#666] text-sm font-medium"
                                />
                            </div>

                            <input
                                type="text"
                                name="subject"
                                value={formData.subject}
                                onChange={handleChange}
                                required
                                placeholder={t?.contact?.form?.subjectPlaceholder || "Subject"}
                                className="w-full bg-gray-50 dark:bg-[#111111] border border-transparent dark:border-[#1a1a1a] rounded-[1rem] px-5 py-4 focus:outline-none focus:border-gray-300 dark:focus:border-[#333] transition-colors text-black dark:text-white placeholder-gray-400 dark:placeholder-[#666] text-sm font-medium"
                            />
                            
                            <textarea
                                name="message"
                                value={formData.message}
                                onChange={handleChange}
                                required
                                rows="5"
                                placeholder={t?.contact?.form?.messagePlaceholder || "Message"}
                                className="w-full bg-gray-50 dark:bg-[#111111] border border-transparent dark:border-[#1a1a1a] rounded-[1rem] px-5 py-4 focus:outline-none focus:border-gray-300 dark:focus:border-[#333] transition-colors text-black dark:text-white placeholder-gray-400 dark:placeholder-[#666] text-sm font-medium resize-none"
                            ></textarea>

                            <motion.button
                                whileHover={{ scale: 1.01 }}
                                whileTap={{ scale: 0.99 }}
                                type="submit"
                                disabled={loading}
                                className="w-full mt-1 py-4 bg-black dark:bg-white text-white dark:text-black font-bold text-[15px] rounded-[1rem] flex items-center justify-center gap-2 transition-all shadow-lg disabled:opacity-70"
                            >
                                {loading ? (
                                    <div className="w-5 h-5 border-2 border-white dark:border-black border-t-transparent rounded-full animate-spin"></div>
                                ) : (
                                    t?.contact?.form?.send || "Submit"
                                )}
                            </motion.button>
                        </form>
                    </motion.div>

                </div>
            </div>
        </section>
    );
};

export default Contact;
