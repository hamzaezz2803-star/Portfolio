// Project Images
import dentistCover from '../assets/Projects-images/Dentaire/coverprjt.png';
import dentist1 from '../assets/Projects-images/Dentaire/image.png';
import dentist2 from '../assets/Projects-images/Dentaire/image copy.png';
import dentist3 from '../assets/Projects-images/Dentaire/image copy 2.png';
import dentist4 from '../assets/Projects-images/Dentaire/image copy 3.png';
import dentist5 from '../assets/Projects-images/Dentaire/image copy 4.png';

import pcmCover from '../assets/Projects-images/PCM/valeryoncover.png';
import pcm1 from '../assets/Projects-images/PCM/1774948086730.jpg';
import pcm2 from '../assets/Projects-images/PCM/1774948086733.jpg';
import pcm3 from '../assets/Projects-images/PCM/1774948087038.jpg';
import pcm4 from '../assets/Projects-images/PCM/1774948087445.jpg';
import pcm5 from '../assets/Projects-images/PCM/1774948087676.jpg';

import profileSaad from '../assets/github-profiles/draissisaad.png';
import profileHamza from '../assets/github-profiles/hamzazawak.jpg';
import profileWissal from '../assets/github-profiles/wissalbadri.jpg';

import weatherappImg from '../assets/weatherapp.png';
import newsappImg from '../assets/newsapp.png';
import gestionformaImg from '../assets/gestionforma.png';

import crowdCover from '../assets/Projects-images/crowd-debuging/Screenshot 2026-05-22 073601.png';
import crowd1 from '../assets/Projects-images/crowd-debuging/Screenshot 2026-05-22 073628.png';
import crowd2 from '../assets/Projects-images/crowd-debuging/Screenshot 2026-05-22 073646.png';
import crowd3 from '../assets/Projects-images/crowd-debuging/Screenshot 2026-05-22 073714.png';
import crowd4 from '../assets/Projects-images/crowd-debuging/Screenshot 2026-05-22 073841.png';
import crowd5 from '../assets/Projects-images/crowd-debuging/Screenshot 2026-05-22 073856.png';
import crowd6 from '../assets/Projects-images/crowd-debuging/Screenshot 2026-05-22 083629.png';
import crowd7 from '../assets/Projects-images/crowd-debuging/Screenshot 2026-05-22 083654.png';
import crowd8 from '../assets/Projects-images/crowd-debuging/Screenshot 2026-05-22 083800.png';
import crowd9 from '../assets/Projects-images/crowd-debuging/Screenshot 2026-05-22 083816.png';

import hrCover from '../assets/hr_management/image.png';
import hr1 from '../assets/hr_management/image copy.png';
import hr2 from '../assets/hr_management/image copy 2.png';
import hr3 from '../assets/hr_management/image copy 3.png';
import hr4 from '../assets/hr_management/image copy 4.png';
import hr5 from '../assets/hr_management/image copy 5.png';
import hr6 from '../assets/hr_management/image copy 6.png';

// General Images
import personalImg from '../assets/Gemini_Generated_Image_2725dz2725dz2725.png';
import certImg from '../assets/certificateorangepython.png';
import certPdf from '../assets/PYTHONCERTIF.pdf';

export const personalInfo = {
    name: "Ezzouek Hamza",
    title: "FULL-STACK DEVELOPER / SOFTWARE ENGINEERING STUDENT",
    description: "I am Ezzouek Hamza, a passionate full-stack developer with a background in mobile development, currently in my fifth and final year of engineering studies in Data Science and Computer Development. I am passionate about designing, developing, and deploying complete, scalable, and innovative web solutions. As an aspiring software engineer, I am eager to apply my technical skills, gain hands-on experience, contribute to meaningful projects, and continuously grow in a dynamic and challenging professional environment.",
    email: "workh6403@gmail.com",
    phone: "+212 640 347045",
    location: "Casablanca, Morocco",
    image: personalImg,
    cvLink: "#",
};

export const skills = {
    frontend: [
        { name: "HTML", icon: "FaHtml5" },
        { name: "CSS", icon: "FaCss3Alt" },
        { name: "JavaScript", icon: "FaJs" },
        { name: "Bootstrap", icon: "FaBootstrap" },
        { name: "TailwindCSS", icon: "SiTailwindcss" },
        { name: "ReactJS", icon: "FaReact" },
    ],
    backend: [
        { name: "PHP", icon: "FaPhp" },
        { name: "Laravel", icon: "FaLaravel" },
        { name: "MySQL", icon: "SiMysql" },
        { name: "MongoDB", icon: "SiMongodb" },
        { name: "NodeJS", icon: "FaNodeJs" },
        { name: "Express", icon: "SiExpress" },
        { name: "Java", icon: "FaJava" },
        { name: "XML", icon: "FaCode" },
    ],
    tools: [
        { name: "C#", icon: "SiCsharp" },
        { name: ".NET", icon: "SiDotnet" },
        { name: "UML", icon: "FaDiagramProject" },
        { name: "GanttProject", icon: "FaTasks" },
        { name: "Figma", icon: "FaFigma" },
        { name: "Canva", icon: "SiCanva" },
    ],
    management: [
        { name: "Agile", icon: "FaProjectDiagram" },
        { name: "Scrum", icon: "FaUsers" },
    ],
};

export const projects = [
    {
        id: 1,
        title: "Dentist Website",
        description: "Website for a modern dental clinic with appointment scheduling management.",
        image: dentistCover,
        gallery: [
            dentist1,
            dentist2,
            dentist3,
            dentist4,
            dentist5,
        ],
        icon: "FaTooth",
        technologies: ["JavaScript", "HTML", "CSS", "PHP"],
        github: "https://github.com/HAMZAZAWAK17/dentiste",
        category: "frontend",
    },
    {
        id: 2,
        title: "PCM - Collaborative Project",
        description: "Comprehensive management and communication solution for businesses, developed in a team.",
        image: pcmCover,
        gallery: [
            pcm1,
            pcm2,
            pcm3,
            pcm4,
            pcm5,
        ],
        team: [
            { name: "Saad Draissi", image: profileSaad },
            { name: "Hamza Zawak", image: profileHamza },
            { name: "Wissal Badri", image: profileWissal },
        ],
        icon: "FaTasks",
        technologies: ["React", "Node.js", "MongoDB", "Express"],
        github: "https://github.com/HAMZAZAWAK17/PCM",
        category: "fullstack",
    },
    {
        id: 3,
        title: "Weather Map App",
        description: "Interactive weather map application.",
        image: weatherappImg,
        icon: "FaCloudSun",
        technologies: ["Dart", "Flutter"],
        github: "https://github.com/HAMZAZAWAK17/WethearMap",
        category: "mobile",
    },
    {
        id: 4,
        title: "News App",
        description: "Real-time news application.",
        image: newsappImg,
        icon: "FaRegNewspaper",
        technologies: ["Dart", "Flutter"],
        github: "https://github.com/HAMZAZAWAK17/News-app",
        category: "mobile",
    },
    {
        id: 5,
        title: "Formateur Management",
        description: "Management system for trainers.",
        image: gestionformaImg,
        icon: "FaChalkboardTeacher",
        technologies: ["JavaScript", "PHP", "MySQL"],
        github: "https://github.com/HAMZAZAWAK17/FormateurManagement-hamza-soufiane",
        category: "fullstack",
    },
    {
        id: 6,
        title: "Email Sender API",
        description: "Developed a backend email-sending service using Node.js, Express.js, and Nodemailer that allows users to send emails through a REST API endpoint. The system processes JSON requests containing recipient details, subject, and message content, then securely sends emails via Gmail SMTP integration. Implemented request handling, asynchronous email delivery, and error management for reliable communication services.",
        image: "https://images.unsplash.com/photo-1563986768609-322da13575f3?w=500&h=300&fit=crop",
        icon: "FaPaperPlane",
        technologies: ["JavaScript", "Node.js", "Express"],
        github: "https://github.com/HAMZAZAWAK17/Email-Sender",
        category: "backend",
    },
    {
        id: 7,
        title: "Rate Limiter",
        description: "Developed a backend security feature using Node.js, Express.js, and express-rate-limit to protect API endpoints from excessive requests and potential abuse. Implemented IP-based rate limiting to restrict users to a fixed number of requests within a defined time window, improving server stability, performance, and basic protection against spam or brute-force attacks.",
        image: "https://images.unsplash.com/photo-1555949963-ff9fe0c870eb?w=500&h=300&fit=crop",
        icon: "FaShieldAlt",
        technologies: ["JavaScript", "Node.js"],
        github: "https://github.com/HAMZAZAWAK17/rate_limiter",
        category: "backend",
    },
    {
        id: 8,
        title: "App Sqlite TP",
        description: "Android mobile application using SQLite.",
        image: "https://images.unsplash.com/photo-1526498460520-4c246339dccb?w=500&h=300&fit=crop",
        icon: "FaDatabase",
        technologies: ["Java", "Android"],
        github: "https://github.com/HAMZAZAWAK17/AppSqlliteTp",
        category: "mobile",
    },
    {
        id: 9,
        title: "CrowdDebug",
        description: "Community platform for collaborative debugging in real-time with live chat, reputation system, and analytical dashboard.",
        image: crowdCover,
        gallery: [
            crowdCover,
            crowd1,
            crowd2,
            crowd3,
            crowd4,
            crowd5,
            crowd6,
            crowd7,
            crowd8,
            crowd9,
        ],
        icon: "FaBug",
        technologies: ["Laravel", "PHP", "TailwindCSS", "MySQL"],
        github: "https://github.com/HAMZAZAWAK17/CrowdDebug",
        category: "fullstack",
    },
    {
        id: 10,
        title: "HR Management",
        description: "Comprehensive human resources management system to optimize the tracking of employees, contracts, and leaves.",
        image: hrCover,
        gallery: [
            hrCover,
            hr1,
            hr2,
            hr3,
            hr4,
            hr5,
            hr6,
        ],
        icon: "FaTasks",
        technologies: ["React", "Node.js", "Express", "MySQL"],
        github: "https://github.com/HAMZAZAWAK17/HR-Management",
        category: "fullstack",
    },
];

export const certifications = [
    {
        id: 1,
        title: "Python Training",
        platform: "Orange Digital Center",
        date: "February 04 - 05, 2026",
        description: "Certificate of active participation in the Python training program organized by Orange Digital Center Club Ben M'Sik.",
        image: certImg,
        icon: "FaPython",
        link: certPdf,
    },
];

export const languages = [
    { name: "Arabic", level: "Native language", percentage: 100 },
    { name: "English", level: "Upper-Intermediate", percentage: 75 },
    { name: "French", level: "Upper-Intermediate", percentage: 75 },
];

export const interests = [
    { name: "Kickboxing", icon: "MdSportsKabaddi" },
    { name: "Football", icon: "MdSportsSoccer" },
    { name: "Travel", icon: "MdTravelExplore" },
];

export const socialLinks = {
    github: "https://github.com/HAMZAZAWAK17?tab=repositories",
    linkedin: "https://linkedin.com/in/ezzouekhamza",
    twitter: "https://twitter.com/ezzouekhamza",
    instagram: "https://instagram.com/ezzouekhamza",
};
