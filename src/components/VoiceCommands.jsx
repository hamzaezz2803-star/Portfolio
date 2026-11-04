import { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaMicrophone, FaMicrophoneSlash, FaVolumeUp } from 'react-icons/fa';
import { useLanguage } from '../LanguageContext';

const VoiceCommands = ({ darkMode, toggleDarkMode }) => {
    const { t } = useLanguage();
    const [isListening, setIsListening] = useState(false);
    const [transcript, setTranscript] = useState('');
    const [feedback, setFeedback] = useState('');
    const [showFeedback, setShowFeedback] = useState(false);
    const [isSupported, setIsSupported] = useState(false);
    const recognitionRef = useRef(null);

    const showFeedbackMessage = useCallback((message) => {
        setFeedback(message);
        setShowFeedback(true);
        setTimeout(() => setShowFeedback(false), 3000);
    }, []);

    const scrollToSection = useCallback((sectionId) => {
        const element = document.getElementById(sectionId);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    }, []);

    const fillContactForm = useCallback((field, value) => {
        const input = document.querySelector(`input[name="${field}"], textarea[name="${field}"]`);
        if (input) {
            input.value = value;
            input.dispatchEvent(new Event('input', { bubbles: true }));
            return true;
        }
        return false;
    }, []);

    const handleVoiceCommand = useCallback((command) => {
        console.log('Voice command received:', command);

        // ===== NAVIGATION COMMANDS =====
        if (command.includes('home') || command.includes('top')) {
            scrollToSection('home');
            showFeedbackMessage('🏠 Going to Home');
        } else if (command.includes('about')) {
            scrollToSection('about');
            showFeedbackMessage('👤 Going to About');
        } else if (command.includes('skill')) {
            scrollToSection('skills');
            showFeedbackMessage('💻 Going to Skills');
        } else if (command.includes('project')) {
            scrollToSection('projects');
            showFeedbackMessage('🚀 Going to Projects');
        } else if (command.includes('service')) {
            scrollToSection('services');
            showFeedbackMessage('⚡ Going to Services');
        } else if (command.includes('certificate')) {
            scrollToSection('certificates');
            showFeedbackMessage('🏆 Going to Certificates');
        } else if (command.includes('contact')) {
            scrollToSection('contact');
            showFeedbackMessage('📧 Going to Contact');
        } else if (command.includes('location') || command.includes('map') || command.includes('availability') || command.includes('casa')) {
            scrollToSection('location');
            showFeedbackMessage('🌍 Going to Location & Availability');
        }

        // ===== DARK MODE COMMANDS =====
        else if (command.includes('dark') || command.includes('night') || command.includes('black')) {
            if (!darkMode) {
                toggleDarkMode();
                showFeedbackMessage('🌙 Dark mode activated!');
            } else {
                showFeedbackMessage('🌙 Already in dark mode!');
            }
        }
        else if (command.includes('light') || command.includes('white') || command.includes('day') || command.includes('bright') || command.includes('sun') || command.includes('normal')) {
            if (darkMode) {
                toggleDarkMode();
                showFeedbackMessage('☀️ Light mode activated!');
            } else {
                showFeedbackMessage('☀️ Already in light mode!');
            }
        }
        else if (command.includes('toggle') || command.includes('switch') || command.includes('change theme')) {
            toggleDarkMode();
            showFeedbackMessage(darkMode ? '☀️ Switched to Light mode!' : '🌙 Switched to Dark mode!');
        }

        // ===== SKILL INTERACTIONS =====
        else if (command.includes('show frontend') || command.includes('frontend skills')) {
            scrollToSection('skills');
            showFeedbackMessage('💻 Showing Frontend skills!');
        } else if (command.includes('show backend') || command.includes('backend skills')) {
            scrollToSection('skills');
            showFeedbackMessage('⚙️ Showing Backend skills!');
        } else if (command.includes('show mobile') || command.includes('mobile skills')) {
            scrollToSection('skills');
            showFeedbackMessage('📱 Showing Mobile skills!');
        }

        // ===== CONTACT FORM COMMANDS =====
        else if (command.includes('fill name') || command.includes('my name is')) {
            const name = command.replace(/fill name|my name is/g, '').trim();
            if (name && fillContactForm('name', name)) {
                showFeedbackMessage(`✍️ Name filled: ${name}`);
            } else {
                showFeedbackMessage('❌ Could not fill name. Go to contact section first!');
            }
        } else if (command.includes('fill email') || command.includes('my email is')) {
            const email = command.replace(/fill email|my email is/g, '').trim();
            if (email && fillContactForm('email', email)) {
                showFeedbackMessage(`✉️ Email filled: ${email}`);
            } else {
                showFeedbackMessage('❌ Could not fill email. Go to contact section first!');
            }
        } else if (command.includes('send message') || command.includes('submit form')) {
            const submitBtn = document.querySelector('button[type="submit"]');
            if (submitBtn) {
                submitBtn.click();
                showFeedbackMessage('📤 Sending message...');
            } else {
                showFeedbackMessage('❌ Submit button not found!');
            }
        }

        // ===== SOCIAL MEDIA & LINKS =====
        else if (command.includes('open github') || command.includes('visit github')) {
            window.open('https://github.com/HAMZAZAWAK17', '_blank');
            showFeedbackMessage('🐙 Opening GitHub profile!');
        } else if (command.includes('open linkedin') || command.includes('visit linkedin')) {
            showFeedbackMessage('💼 Opening LinkedIn! (Add your LinkedIn URL)');
        } else if (command.includes('download resume') || command.includes('get resume')) {
            showFeedbackMessage('📄 Resume download feature coming soon!');
        }

        // ===== SCROLL COMMANDS =====
        else if (command.includes('scroll down')) {
            window.scrollBy({ top: 500, behavior: 'smooth' });
            showFeedbackMessage('⬇️ Scrolling down...');
        } else if (command.includes('scroll up')) {
            window.scrollBy({ top: -500, behavior: 'smooth' });
            showFeedbackMessage('⬆️ Scrolling up...');
        } else if (command.includes('scroll to bottom')) {
            window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' });
            showFeedbackMessage('⬇️ Scrolling to bottom!');
        } else if (command.includes('scroll to top')) {
            window.scrollTo({ top: 0, behavior: 'smooth' });
            showFeedbackMessage('⬆️ Scrolling to top!');
        }

        // ===== EASTER EGGS 🎉 =====
        else if (command.includes('hello') || command.includes('hi')) {
            showFeedbackMessage('👋 Hello! I\'m Hamza\'s AI assistant. Try "help" for commands!');
        } else if (command.includes('who are you') || command.includes('what are you')) {
            showFeedbackMessage('🤖 I\'m a voice-controlled portfolio! Say "help" for magic commands!');
        } else if (command.includes('tell me a joke')) {
            const jokes = [
                '😄 Why do programmers prefer dark mode? Because light attracts bugs!',
                '😂 Why did the developer go broke? Because he used up all his cache!',
                '🤣 How many programmers does it take to change a light bulb? None, that\'s a hardware problem!',
                '😆 A SQL query walks into a bar, walks up to two tables and asks... "Can I join you?"',
                '🤓 Why do Java developers wear glasses? Because they don\'t C#!',
                '😅 What\'s a programmer\'s favorite hangout? The Foo Bar!'
            ];
            showFeedbackMessage(jokes[Math.floor(Math.random() * jokes.length)]);
        } else if (command.includes('secret') || command.includes('easter egg')) {
            showFeedbackMessage('🥚 Secrets: "matrix", "konami", "tell joke", "dark mode", "fill form"!');
        } else if (command.includes('matrix')) {
            showFeedbackMessage('🟢 Wake up, Neo... The Matrix has you... Follow the white rabbit. 🐰');
        } else if (command.includes('konami') || command.includes('cheat code')) {
            showFeedbackMessage('🎮 ⬆️⬆️⬇️⬇️⬅️➡️⬅️➡️🅱️🅰️ - 30 lives unlocked! (Just kidding 😄)');
        } else if (command.includes('hire') || command.includes('recruit')) {
            scrollToSection('contact');
            showFeedbackMessage('💼 Great choice! Let\'s get in touch! I\'m ready to work!');
        } else if (command.includes('impressive') || command.includes('amazing') || command.includes('cool') || command.includes('awesome')) {
            showFeedbackMessage('😊 Thank you! Hamza worked hard on this! Want to hire him?');
        } else if (command.includes('help') || command.includes('what can you do')) {
            showFeedbackMessage('💡 Try: "dark mode", "go to projects", "fill name John", "tell joke", "scroll down"!');
        } else if (command.includes('thank you') || command.includes('thanks')) {
            showFeedbackMessage('😊 You\'re welcome! Happy to help!');
        } else if (command.includes('good job') || command.includes('well done')) {
            showFeedbackMessage('🎉 Thanks! Hamza appreciates your kind words!');
        } else if (command.includes('are you real') || command.includes('are you ai')) {
            showFeedbackMessage('🤖 I\'m a voice assistant powered by Web Speech API! Pretty cool, right?');
        } else if (command.includes('sing') || command.includes('sing a song')) {
            showFeedbackMessage('🎵 I\'m a little teapot, short and stout... Just kidding! I can\'t sing! 😅');
        } else if (command.includes('dance')) {
            showFeedbackMessage('💃 *Dancing in binary* 01000100 01100001 01101110 01100011 01100101!');
        } else {
            showFeedbackMessage('🤔 Command not recognized. Try "help" for available commands!');
        }
    }, [darkMode, toggleDarkMode, scrollToSection, showFeedbackMessage, fillContactForm]);

    useEffect(() => {
        // Check if browser supports Web Speech API
        if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
            setIsSupported(true);
            const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
            recognitionRef.current = new SpeechRecognition();

            recognitionRef.current.continuous = false;
            recognitionRef.current.interimResults = false;
            recognitionRef.current.lang = 'en-US';

            recognitionRef.current.onresult = (event) => {
                const command = event.results[0][0].transcript.toLowerCase();
                setTranscript(command);
                handleVoiceCommand(command);
            };

            recognitionRef.current.onerror = (event) => {
                console.error('Speech recognition error:', event.error);
                setIsListening(false);
                showFeedbackMessage('❌ Error: Could not understand. Try again!');
            };

            recognitionRef.current.onend = () => {
                setIsListening(false);
            };
        }

        return () => {
            if (recognitionRef.current) {
                recognitionRef.current.stop();
            }
        };
    }, [handleVoiceCommand, showFeedbackMessage]);

    const toggleListening = () => {
        if (!isSupported) {
            showFeedbackMessage('❌ Voice commands not supported in this browser');
            return;
        }

        if (isListening) {
            recognitionRef.current.stop();
            setIsListening(false);
        } else {
            try {
                recognitionRef.current.start();
                setIsListening(true);
                setTranscript('');
                showFeedbackMessage('🎤 Listening... Speak now!');
            } catch (error) {
                console.error('Error starting recognition:', error);
                showFeedbackMessage('❌ Could not start listening');
            }
        }
    };

    if (!isSupported) {
        return null;
    }

    return (
        <>
            {/* Voice Command Button */}
            <motion.button
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 1.5, type: 'spring', stiffness: 260, damping: 20 }}
                onClick={toggleListening}
                className={`fixed bottom-32 right-10 z-[100] w-16 h-16 rounded-full shadow-3xl transition duration-700 border border-zinc-100 dark:border-white/5 flex items-center justify-center ${isListening
                    ? 'bg-black text-white'
                    : 'bg-white dark:bg-zinc-900 text-black dark:text-white'
                    }`}
                whileHover={{ scale: 1.1, rotate: 12 }}
                whileTap={{ scale: 0.96 }}
                title="Voice Commands"
            >
                <div className="relative">
                    {isListening ? (
                        <FaMicrophone className="text-3xl" />
                    ) : (
                        <FaMicrophone className="text-3xl opacity-40 hover:opacity-100 transition-opacity" />
                    )}

                    {/* Listening Pulse Rings */}
                    {isListening && (
                        <>
                            <motion.div
                                className="absolute inset-0 -m-2 rounded-full border-2 border-red-400"
                                animate={{
                                    scale: [1, 2, 1],
                                    opacity: [0.6, 0, 0.6],
                                }}
                                transition={{
                                    duration: 2,
                                    repeat: Infinity,
                                    ease: 'easeInOut',
                                }}
                            />
                            <motion.div
                                className="absolute inset-0 -m-2 rounded-full border-2 border-red-400"
                                animate={{
                                    scale: [1, 2.5, 1],
                                    opacity: [0.3, 0, 0.3],
                                }}
                                transition={{
                                    duration: 2,
                                    repeat: Infinity,
                                    ease: 'easeInOut',
                                    delay: 0.5,
                                }}
                            />
                        </>
                    )}
                </div>
            </motion.button>

            {/* Feedback Notification */}
            <AnimatePresence>
                {showFeedback && (
                    <motion.div
                        initial={{ opacity: 0, x: 50, filter: 'blur(10px)' }}
                        animate={{ opacity: 1, x: 0, filter: 'blur(0px)' }}
                        exit={{ opacity: 0, x: 50, filter: 'blur(10px)' }}
                        className="fixed bottom-48 right-8 z-50 max-w-sm"
                    >
                        <div className="bg-black dark:bg-white text-white dark:text-black px-6 py-4 rounded-xl shadow-2xl border-2 border-gray-800 dark:border-gray-200 flex items-center gap-4 min-w-[200px]">
                            <div className={`p-2 rounded-lg ${isListening ? 'bg-red-500/10' : 'bg-green-500/10'}`}>
                                <FaVolumeUp className={`text-xl ${isListening ? 'text-red-500' : 'text-green-500'} animate-pulse`} />
                            </div>
                            <div>
                                <p className="text-[10px] uppercase tracking-widest font-black opacity-50 mb-0.5">{t.hero.available ? 'Assistant' : 'Assistant'}</p>
                                <p className="font-bold text-sm leading-tight">{feedback}</p>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Transcript Display (Sleek Bottom Bar) */}
            <AnimatePresence>
                {transcript && (
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 10 }}
                        className="fixed bottom-8 left-1/2 -translate-x-1/2 z-40 bg-black/90 dark:bg-white/90 text-white dark:text-black px-8 py-3 rounded-full text-sm font-mono backdrop-blur-md border border-gray-800 dark:border-gray-200 shadow-2xl flex items-center gap-3"
                    >
                        <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                        <span className="opacity-60">Speech recognized:</span>
                        <span className="font-bold uppercase tracking-wide italic">"{transcript}"</span>
                    </motion.div>
                )}
            </AnimatePresence>


        </>
    );
};

export default VoiceCommands;
