import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaCommentDots, FaTimes, FaPaperPlane } from 'react-icons/fa';
import { personalInfo, skills, projects, certifications, socialLinks } from '../data/portfolioData';

const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { text: "Hi there! 👋 I'm Hamza's virtual assistant. What would you like to know about his portfolio or experience?", sender: 'bot' }
  ]);
  const [input, setInput] = useState('');
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = () => {
    if (!input.trim()) return;

    // Add user message
    const userMessage = { text: input, sender: 'user' };
    setMessages(prev => [...prev, userMessage]);
    setInput('');

    // Simulate bot response
    setTimeout(() => {
      let botResponse = "I'm still learning! But you can always contact Hamza directly at " + personalInfo.email;
      const lowerInput = input.toLowerCase();
      
      if (lowerInput.includes('experience') || lowerInput.includes('skill') || lowerInput.includes('technolog')) {
        const allSkills = [...skills.frontend, ...skills.backend, ...skills.tools].map(s => s.name).join(', ');
        botResponse = `Hamza is skilled in: ${allSkills}. He's a Full-Stack developer!`;
      } else if (lowerInput.includes('contact') || lowerInput.includes('email') || lowerInput.includes('phone') || lowerInput.includes('reach')) {
        botResponse = `You can email Hamza at ${personalInfo.email} or call him at ${personalInfo.phone}.`;
      } else if (lowerInput.includes('project') || lowerInput.includes('portfolio') || lowerInput.includes('work')) {
        const projectNames = projects.map(p => p.title).join(', ');
        botResponse = `Hamza has built ${projects.length} amazing projects, including: ${projectNames}. You can view them in the Projects section!`;
      } else if (lowerInput.includes('certificat') || lowerInput.includes('training')) {
        const certs = certifications.map(c => c.title).join(', ');
        botResponse = `Hamza holds certifications in: ${certs}.`;
      } else if (lowerInput.includes('who') || lowerInput.includes('about') || lowerInput.includes('hamza') || lowerInput.includes('description')) {
        botResponse = personalInfo.description;
      } else if (lowerInput.includes('hello') || lowerInput.includes('hi') || lowerInput.includes('hey')) {
        botResponse = "Hello! How can I help you explore Hamza's portfolio today? You can ask about his skills, projects, or contact info.";
      } else if (lowerInput.includes('social') || lowerInput.includes('linkedin') || lowerInput.includes('github')) {
        botResponse = `You can find him on LinkedIn: ${socialLinks.linkedin} and GitHub: ${socialLinks.github}.`;
      } else if (lowerInput.includes('location') || lowerInput.includes('where')) {
        botResponse = `Hamza is located in ${personalInfo.location}.`;
      } else {
        botResponse = "I might not have the exact answer for that, but you can explore the portfolio sections or email Hamza at " + personalInfo.email + " for more details!";
      }

      setMessages(prev => [...prev, { text: botResponse, sender: 'bot' }]);
    }, 1000);
  };

  return (
    <>
      {/* Chatbot Toggle Button */}
      <motion.button
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.96 }}
        onClick={() => setIsOpen(true)}
        className={`fixed bottom-8 md:bottom-8 right-4 md:right-8 z-[100] w-14 h-14 rounded-full bg-black dark:bg-white text-white dark:text-black shadow-[0_10px_40px_rgba(0,0,0,0.3)] dark:shadow-[0_10px_40px_rgba(255,255,255,0.15)] flex items-center justify-center transition ${isOpen ? 'hidden' : 'block'}`}
      >
        <FaCommentDots size={24} />
      </motion.button>

      {/* Chatbot Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -12, filter: "blur(4px)", transition: { duration: 0.15, ease: "easeOut" } }}
            className="fixed bottom-[10vh] md:bottom-24 right-4 md:right-8 z-[100] w-[calc(100vw-32px)] md:w-[320px] h-[60vh] md:h-[420px] flex flex-col bg-white dark:bg-[#0a0a0a] border border-gray-200 dark:border-[#222] rounded-[1.5rem] shadow-2xl overflow-hidden"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-4 border-b border-gray-100 dark:border-[#1a1a1a] bg-gray-50 dark:bg-[#111]">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-full bg-emerald-500/20 text-emerald-500 dark:text-emerald-400 flex items-center justify-center font-bold text-xs border border-emerald-500/30">
                  EH
                </div>
                <div>
                  <h3 className="text-sm font-bold text-black dark:text-white">Hamza's Assistant</h3>
                  <div className="flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                    <p className="text-[11px] font-medium text-gray-500 dark:text-gray-400">Online to help</p>
                  </div>
                </div>
              </div>
              <button 
                onClick={() => setIsOpen(false)}
                className="w-8 h-8 rounded-full flex items-center justify-center bg-gray-100 dark:bg-[#1a1a1a] text-gray-500 hover:text-black dark:hover:text-white transition-colors"
              >
                <FaTimes size={12} />
              </button>
            </div>

            {/* Messages */}
            <div className="flex-1 p-4 overflow-y-auto overscroll-contain flex flex-col gap-3 bg-white dark:bg-[#050505] scroll-smooth">
              {messages.map((msg, index) => (
                <motion.div 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  key={index} 
                  className={`max-w-[85%] p-3.5 rounded-2xl text-[13px] leading-relaxed shadow-sm ${
                    msg.sender === 'user' 
                      ? 'bg-black text-white self-end rounded-tr-sm dark:bg-white dark:text-black' 
                      : 'bg-gray-50 text-black self-start rounded-tl-sm border border-gray-100 dark:bg-[#111] dark:border-[#222] dark:text-gray-200'
                  }`}
                >
                  {msg.text}
                </motion.div>
              ))}
              <div ref={messagesEndRef} />
            </div>

            {/* Input */}
            <div className="p-3 border-t border-gray-100 dark:border-[#1a1a1a] bg-white dark:bg-[#0a0a0a]">
              <div className="flex items-center gap-2 bg-gray-50 dark:bg-[#111] rounded-xl p-1.5 border border-gray-200 dark:border-[#222]">
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                  placeholder="Ask me anything..."
                  className="flex-1 bg-transparent border-none outline-none px-3 py-1.5 text-[13px] text-black dark:text-white placeholder-gray-400"
                />
                <button 
                  onClick={handleSend}
                  disabled={!input.trim()}
                  className="w-8 h-8 flex items-center justify-center bg-black text-white dark:bg-white dark:text-black rounded-lg disabled:opacity-50 transition-opacity"
                >
                  <FaPaperPlane size={12} />
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Chatbot;
