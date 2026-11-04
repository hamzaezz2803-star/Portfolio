import { motion } from 'framer-motion';
import { FaHeart, FaGithub, FaLinkedin, FaEnvelope, FaArrowUp } from 'react-icons/fa';
import { personalInfo, socialLinks } from '../data/portfolioData';

const Footer = () => {
    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const currentYear = new Date().getFullYear();

    return (
        <footer className="bg-black text-white relative border-t border-white/5">
            <div className="max-w-[1400px] mx-auto px-6 md:px-12 py-24 relative z-10">
                <div className="grid md:grid-cols-3 gap-8 mb-8">
                    {/* About */}
                    <div className="md:col-span-1">
                        <h3 className="text-4xl font-black mb-6 tracking-tighter uppercase">EH.</h3>
                        <p className="text-zinc-500 mb-8 max-w-sm text-sm leading-relaxed font-medium">
                            Full-Stack Developer passionate about building modern, high-performance, and user-centric web solutions.
                        </p>
                        <div className="flex gap-4">
                            {[
                                { icon: FaGithub, link: socialLinks.github },
                                { icon: FaLinkedin, link: socialLinks.linkedin },
                                { icon: FaEnvelope, link: `mailto:${personalInfo.email}` },
                            ].map((social, index) => (
                                <motion.a
                                    key={index}
                                    whileHover={{ y: -5, scale: 1.1 }}
                                    href={social.link}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="p-4 bg-white/5 border border-white/10 text-white hover:bg-white hover:text-black transition rounded-xl"
                                >
                                    <social.icon size={20} />
                                </motion.a>
                            ))}
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h4 className="text-[10px] font-black mb-6 uppercase tracking-[0.4em] text-zinc-600">Navigation</h4>
                        <ul className="space-y-4">
                            {['Home', 'About', 'Skills', 'Projects', 'Contact'].map((link, index) => (
                                <li key={index}>
                                    <a
                                        href={`#${link.toLowerCase()}`}
                                        className="text-white font-black uppercase text-[11px] tracking-widest hover:italic transition opacity-60 hover:opacity-100"
                                    >
                                        {link}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Contact Info */}
                    <div>
                        <h4 className="text-[10px] font-black mb-6 uppercase tracking-[0.4em] text-zinc-600">Contact</h4>
                        <ul className="space-y-4">
                            <li className="text-white font-black uppercase text-[11px] tracking-widest opacity-60">{personalInfo.email}</li>
                            <li className="text-white font-black uppercase text-[11px] tracking-widest opacity-60">{personalInfo.phone}</li>
                            <li className="text-white font-black uppercase text-[11px] tracking-widest opacity-60">{personalInfo.location}</li>
                        </ul>
                    </div>
                </div>

                {/* Divider */}
                <div className="border-t border-white/5 pt-12">
                    <div className="flex flex-col md:flex-row justify-between items-center gap-6">
                        <p className="text-zinc-500 text-[10px] font-black uppercase tracking-widest">
                            © {currentYear} {personalInfo.name}. All Rights Reserved.
                        </p>
                        <p className="text-zinc-500 text-[10px] font-black uppercase tracking-widest flex items-center gap-3">
                            Built with <FaHeart className="text-white" /> by Hamza
                        </p>
                    </div>
                </div>
            </div>

            {/* Scroll to Top Button */}
            <motion.button
                whileHover={{ scale: 1.1, y: -5 }}
                whileTap={{ scale: 0.96 }}
                onClick={scrollToTop}
                className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-16 h-16 bg-white text-black flex items-center justify-center rounded-full shadow-2xl transition hover:bg-zinc-200"
            >
                <FaArrowUp size={24} />
            </motion.button>
        </footer>
    );
};

export default Footer;
