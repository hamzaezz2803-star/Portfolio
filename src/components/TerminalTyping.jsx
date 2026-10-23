import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FaTerminal } from 'react-icons/fa';

const TerminalTyping = ({ text, speed = 50 }) => {
    const [displayedText, setDisplayedText] = useState('');
    const [currentIndex, setCurrentIndex] = useState(0);
    const [showCursor, setShowCursor] = useState(true);

    // Reset when text changes
    useEffect(() => {
        setDisplayedText('');
        setCurrentIndex(0);
    }, [text]);

    // Typing effect
    useEffect(() => {
        if (currentIndex < text.length) {
            const timeout = setTimeout(() => {
                setDisplayedText(prev => prev + text[currentIndex]);
                setCurrentIndex(prev => prev + 1);
            }, speed);
            return () => clearTimeout(timeout);
        }
    }, [currentIndex, text, speed]);

    // Blinking cursor
    useEffect(() => {
        const interval = setInterval(() => {
            setShowCursor(prev => !prev);
        }, 530);
        return () => clearInterval(interval);
    }, []);

    const isDone = currentIndex >= text.length;

    const renderFormattedText = (str) => {
        if (!str) return null;
        const parts = str.split(/(\*\*[^*]*\*\*|\*\*[^*]*$)/g);
        return parts.map((part, index) => {
            if (part.startsWith('**') && part.endsWith('**') && part.length >= 4) {
                return (
                    <strong key={index} className="text-white font-bold">
                        {part.slice(2, -2)}
                    </strong>
                );
            }
            if (part.startsWith('**')) {
                return (
                    <strong key={index} className="text-white font-bold">
                        {part.slice(2)}
                    </strong>
                );
            }
            return part;
        });
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="w-full"
        >
            {/* Terminal Window */}
            <div
                className="rounded-2xl overflow-hidden shadow-2xl"
                style={{
                    background: 'linear-gradient(135deg, #0d0d0f 0%, #111318 100%)',
                    border: '1px solid rgba(255,255,255,0.07)',
                    boxShadow: '0 0 0 1px rgba(255,255,255,0.04), 0 24px 48px rgba(0,0,0,0.6), 0 0 80px rgba(74,222,128,0.03)',
                }}
            >
                {/* Title Bar */}
                <div
                    className="flex items-center gap-3 px-4 py-3"
                    style={{
                        background: 'linear-gradient(90deg, rgba(255,255,255,0.05) 0%, rgba(255,255,255,0.02) 100%)',
                        borderBottom: '1px solid rgba(255,255,255,0.06)',
                    }}
                >
                    {/* Traffic lights */}
                    <div className="flex items-center gap-1.5">
                        <div className="w-3 h-3 rounded-full" style={{ background: '#FF5F57', boxShadow: '0 0 6px #FF5F57aa' }} />
                        <div className="w-3 h-3 rounded-full" style={{ background: '#FFBD2E', boxShadow: '0 0 6px #FFBD2Eaa' }} />
                        <div className="w-3 h-3 rounded-full" style={{ background: '#28C840', boxShadow: '0 0 6px #28C840aa' }} />
                    </div>

                    {/* Tab */}
                    <div
                        className="flex items-center gap-2 px-3 py-1 rounded-md ml-2"
                        style={{
                            background: 'rgba(255,255,255,0.06)',
                            border: '1px solid rgba(255,255,255,0.08)',
                        }}
                    >
                        <FaTerminal className="text-[10px]" style={{ color: '#4ade80' }} />
                        <span className="font-mono text-[11px] text-gray-300 tracking-wide">about_me.sh</span>
                    </div>

                    {/* Status pill */}
                    <div className="ml-auto flex items-center gap-1.5">
                        <div
                            className={`w-1.5 h-1.5 rounded-full transition-colors duration-500 ${isDone ? '' : 'animate-pulse'}`}
                            style={{ background: isDone ? '#4ade80' : '#facc15', boxShadow: isDone ? '0 0 6px #4ade80' : '0 0 6px #facc15' }}
                        />
                        <span className="font-mono text-[10px] tracking-widest uppercase" style={{ color: 'rgba(255,255,255,0.3)' }}>
                            {isDone ? 'Done' : 'Running'}
                        </span>
                    </div>
                </div>

                {/* Terminal Body */}
                <div className="p-5 font-mono text-sm leading-relaxed overflow-y-auto custom-scrollbar" style={{ maxHeight: '340px', minHeight: '220px' }}>
                    {/* Prompt line */}
                    <div className="flex items-center gap-2 mb-3 flex-wrap">
                        <span className="font-bold" style={{ color: '#4ade80' }}>➜</span>
                        <span className="font-bold" style={{ color: '#60a5fa' }}>~</span>
                        <span style={{ color: 'rgba(255,255,255,0.2)' }}>$</span>
                        <span style={{ color: 'rgba(255,255,255,0.75)' }}>cat</span>
                        <span style={{ color: '#facc15' }}>about_me.txt</span>
                    </div>

                    {/* Output */}
                    <div
                        className="whitespace-pre-wrap break-words leading-relaxed"
                        style={{ color: 'rgba(255,255,255,0.82)', fontSize: '13px', lineHeight: '1.75' }}
                    >
                        {displayedText}
                        <span
                            className={`inline-block w-[7px] h-[14px] ml-0.5 align-middle transition-opacity duration-75 ${showCursor ? 'opacity-100' : 'opacity-0'}`}
                            style={{ background: '#4ade80', boxShadow: '0 0 8px rgba(74,222,128,0.7)', borderRadius: '1px' }}
                        />
                    </div>

                    {/* Next prompt when done */}
                    {isDone && (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.4 }}
                            className="flex items-center gap-2 mt-4"
                        >
                            <span className="font-bold" style={{ color: '#4ade80' }}>➜</span>
                            <span className="font-bold" style={{ color: '#60a5fa' }}>~</span>
                            <span style={{ color: 'rgba(255,255,255,0.2)' }}>$</span>
                            <span
                                className="animate-pulse inline-block w-[7px] h-[14px] align-middle"
                                style={{ background: 'rgba(255,255,255,0.3)', borderRadius: '1px' }}
                            />
                        </motion.div>
                    )}
                </div>

                {/* Bottom bar */}
                <div
                    className="px-5 py-2 flex items-center justify-between"
                    style={{
                        borderTop: '1px solid rgba(255,255,255,0.05)',
                        background: 'rgba(0,0,0,0.2)',
                    }}
                >
                    <div className="flex items-center gap-4 font-mono text-[10px] uppercase tracking-widest" style={{ color: 'rgba(255,255,255,0.2)' }}>
                        <span>bash</span>
                        <span>UTF-8</span>
                        <span className="hidden sm:inline">Ln {text.split('\n').length}</span>
                    </div>
                    <span className="font-mono text-[10px] uppercase tracking-widest" style={{ color: '#4ade80', opacity: 0.7 }}>
                        main
                    </span>
                </div>
            </div>
        </motion.div>
    );
};

export default TerminalTyping;
