export const translations = {
    fr: {
        // Navbar
        nav: {
            home: "Accueil",
            about: "À propos",
            skills: "Compétences",
            projects: "Projets",
            services: "Services",
            faq: "FAQ",
            contact: "Contact",
            email: "Email",
        },

        // Hero
        hero: {
            greeting: "Bonjour, je suis Hamza",
            title1: "Développeur",
            title2: "Full-Stack",
            subtitle: "& Étudiant en génie logiciel",
            location: "Basé à Casablanca, Maroc",
            available: "DISPONIBLE",
            viewProjects: "Voir mes projets",
            contactMe: "Me contacter",
            scroll: "Scroll",
            badge: "Full-Stack Developer",
        },

        // About
        about: {
            title: "Expérience &",
            titleHighlight: "Formation",
            bioTitle: "Qui suis-je ?",
            bio: "Je suis **Ezzouek Hamza**, développeur full-stack passionné avec des bases en développement mobile, actuellement en **cinquième et dernière année du cycle d'ingénieur en sciences des données et développement informatique**. Je suis passionné par la conception, le développement et le déploiement de solutions web complètes, évolutives et innovantes. En tant que futur ingénieur logiciel, je suis désireux d'appliquer mes compétences techniques, d'acquérir une expérience pratique, de contribuer à des projets d'envergure et d'évoluer continuellement dans un environnement professionnel dynamique et stimulant.",
            subtitle: "Mon parcours professionnel et académique, illustrant mon évolution dans le domaine du développement informatique.",
            experiences: "Expériences professionnelles",
            formation: "Formation",
            stats: {
                years: "Années d'études",
                internships: "Stages",
                projects: "Projets réalisés",
                technologies: "Technologies",
            },
            experiencesList: [
                {
                    year: 'Avril 2025 – Juillet 2025',
                    title: 'Stage de fin d\'études',
                    company: 'MuntadaCom - Compagnie Marocaine',
                    subtitle: 'Spécialisée en Digitalisation des Processus',
                    location: 'Casablanca',
                    description: 'Développement d\'une application web de gestion RH avec React.js pour le frontend, Node.js et Express.js pour le backend, et MySQL pour la base de données.',
                    technologies: ['React.js', 'Node.js', 'Express.js', 'MySQL'],
                },
                {
                    year: 'Décembre 2024 - Mars 2025',
                    title: 'Stage',
                    company: 'Laboratoire d\'études transversales',
                    subtitle: 'en droit, Économie et Management des affaires',
                    location: 'Casablanca',
                    description: 'Conception et développement d\'une application web destinée à présenter les services et activités d\'un laboratoire. Réalisée avec React.js et Laravel.',
                    technologies: ['React.js', 'Laravel', 'PHP'],
                },
                {
                    year: 'Février 2024 – Mai 2024',
                    title: 'Stage de fin d\'études',
                    company: 'All Formations',
                    subtitle: '',
                    location: 'France',
                    description: 'Développement d\'une application web fullstack pour l\'adoption d\'animaux avec ReactJS et Laravel. Gestion de projet avec Git.',
                    technologies: ['ReactJS', 'TailwindCSS', 'Laravel', 'MySQL', 'Git'],
                },
            ],
            educationList: [
                {
                    year: '2024-2025',
                    title: 'Licence professionnelle Génie Logiciel',
                    institution: 'ESTEM',
                    location: 'Casablanca',
                    description: 'Formation spécialisée en génie logiciel couvrant les méthodologies de développement, architectures logicielles et technologies avancées.',
                },
                {
                    year: '2022-2024',
                    title: 'Technicien en développement informatique',
                    institution: 'OFPPT centre de formation professionnelle',
                    location: 'Casablanca',
                    description: 'Formation complète en développement informatique couvrant les technologies web, bases de données et méthodologies de développement.',
                },
                {
                    year: '2020-2021',
                    title: 'Baccalauréat en science physique',
                    institution: 'Groupe scolaire Ouhoud',
                    location: 'Casablanca',
                    description: 'Formation scientifique de base en sciences physiques.',
                },
            ],
        },

        // Skills
        skills: {
            title: "Technologies &",
            titleHighlight: "Outils",
            subtitle: "Stack technique que je maîtrise pour créer des solutions complètes",
            categories: {
                frontend: "Frontend",
                backend: "Backend",
                database: "Base de données",
                mobile: "Mobile",
                tools: "Outils",
                management: "Gestion de projet",
            },
            stats: {
                technologies: "Technologies",
                projects: "Projets",
                years: "Années d'études",
                passion: "Passion",
            },
        },

        // Services
        services: {
            title: "Mes",
            titleHighlight: "Services",
            subtitle: "Solutions professionnelles que je peux vous offrir pour concrétiser vos projets",
            fullstack: "Sites Full-Stack",
            fullstackDesc: "Développement complet d'applications web avec React.js, Node.js, et bases de données. Solutions évolutives et performantes de A à Z.",
            websites: "Sites Web Présentatifs",
            websitesDesc: "Création de sites vitrines modernes et élégants pour présenter votre entreprise, vos services ou votre portfolio de manière professionnelle.",
            mobile: "Applications Mobile",
            mobileDesc: "Développement d'applications mobiles natives et cross-platform avec React Native et Flutter pour iOS et Android.",
            ecommerce: "Sites E-commerce",
            ecommerceDesc: "Conception de boutiques en ligne complètes avec gestion des produits, paiements sécurisés et interface utilisateur intuitive.",
            landing: "Landing Pages",
            landingDesc: "Création de pages d'atterrissage optimisées pour la conversion, avec design attractif et appels à l'action efficaces.",
            design: "Design & UI/UX",
            designDesc: "Conception d'interfaces utilisateur modernes et intuitives, avec une attention particulière à l'expérience utilisateur et l'esthétique.",
            cta: "Discutons de votre projet",
        },

        // GitHub
        github: {
            titlePrefix: "Activité",
            titleHighlight: "GitHub",
            subtitle: "Mes contributions et projets open-source",
            stats: {
                repos: "Dépôts",
                followers: "Abonnés",
                following: "Abonnements",
                stars: "Étoiles",
            },
            chartTitle: "Graphique de contributions",
            year: "Année",
            viewDetails: "Voir les détails sur GitHub",
            topLanguages: "Langages les plus utilisés",
            popularRepos: "Dépôts Populaires",
            viewAll: "Voir tous mes projets sur GitHub",
        },

        // Projects
        projects: {
            title: "Mes",
            titleHighlight: "Projets",
            subtitle: "Découvrez mes projets académiques et personnels",
            all: "Tous",
            frontend: "Frontend",
            fullstack: "Full-Stack",
            mobile: "Mobile",
            backend: "Backend",
            inProgress: "En cours",
            noProjects: "Aucun projet dans cette catégorie",
            viewDemo: "Voir démo",
            viewCode: "Voir code",
        },

        // Contact
        contact: {
            title: "Me",
            titleHighlight: "Contacter",
            subtitle: "N'hésitez pas à me contacter pour toute opportunité ou collaboration",
            info: "Informations de contact",
            social: "Réseaux sociaux",
            form: {
                name: "Nom complet",
                namePlaceholder: "Votre nom",
                email: "Email",
                emailPlaceholder: "votre@email.com",
                subject: "Sujet",
                subjectPlaceholder: "Sujet du message",
                message: "Message",
                messagePlaceholder: "Votre message...",
                send: "Envoyer le message",
                sending: "Envoi en cours...",
                success: "Message envoyé avec succès ! Je vous répondrai bientôt.",
                error: "Une erreur est survenue. Veuillez réessayer ou me contacter directement par email.",
            },
            contactInfo: {
                email: "Email",
                phone: "Téléphone",
                location: "Localisation",
            },
        },

        // FAQ
        faq: {
            badge: "FAQ",
            title: "Vos questions,",
            titleHighlight: "mes réponses.",
            subtitle: "Découvrez tout ce qu'il faut savoir sur mes compétences techniques, ma disponibilité et ma méthode de travail.",
            questions: [
                {
                    q: "Quelles technologies maîtrisez-vous le plus ?",
                    a: "Je suis spécialisé en développement Full-Stack avec ReactJS, Node.js, Express.js, PHP, et Laravel. Côté bases de données, j'utilise MySQL et MongoDB. J'ai aussi une expérience en développement mobile avec Flutter et Android Java."
                },
                {
                    q: "Êtes-vous disponible pour un stage ou un emploi à plein temps ?",
                    a: "Oui, absolument ! Je recherche actuellement des opportunités de stage de fin d'études, de poste à plein temps ou de projets en freelance. Je suis basé à Casablanca et ouvert au télétravail ou à une mobilité internationale."
                },
                {
                    q: "Comment se déroule le développement d'un projet web ?",
                    a: "Je suis une méthodologie Agile & Scrum : modélisation de l'architecture (UML/Figma), développement itératif du frontend et du backend, intégration sécurisée des API, phases de tests et livraison continue avec suivi."
                },
                {
                    q: "Pouvez-vous vous intégrer à une équipe ou reprendre un projet existant ?",
                    a: "Tout à fait. J'ai l'habitude de travailler en équipe avec Git (GitHub/GitLab), le découpage de tâches sur Trello/GanttProject, ainsi que le refactoring et l'optimisation de codebases existantes."
                },
                {
                    q: "Quel est le délai moyen pour la réalisation d'un projet ?",
                    a: "Les délais dépendent de l'envergure du projet. Une landing page ou un site vitrine nécessite entre 3 et 7 jours, tandis qu'une application web sur-mesure ou SaaS demande généralement entre 2 et 6 semaines."
                },
                {
                    q: "Comment pouvons-nous démarrer une collaboration ?",
                    a: "Vous pouvez m'envoyer un message via le formulaire de contact juste ci-dessous, m'écrire par e-mail à hamzaezz2803@gmail.com, ou me contacter sur LinkedIn pour discuter de vos besoins."
                }
            ]
        },

        // Location & Availability
        location: {
            title: "Localisation &",
            titleHighlight: "Disponibilité",
            subtitle: "Basé à Casablanca, disponible pour des opportunités locales et internationales.",
            status: "Statut Actuel",
            available: "Disponible pour de nouvelles opportunités",
            localTime: "Heure Locale (Casablanca)",
            remote: "Télétravail : Oui (100%)",
            mobility: "Mobilité : Internationale",
            openFor: "Ouvert à : CDI, Stage, Freelance",
        },
        // Footer
        footer: {
            description: "Développeur Full-Stack passionné par la création de solutions web modernes et performantes.",
            quickLinks: "Liens rapides",
            contactTitle: "Contact",
            rights: "Tous droits réservés.",
            madeWith: "Fait avec",
            and: "et ReactJS",
        },
    },

    en: {
        // Navbar
        nav: {
            home: "Home",
            about: "About",
            skills: "Skills",
            projects: "Projects",
            services: "Services",
            faq: "FAQ",
            contact: "Contact",
            email: "Email",
        },

        // Hero
        hero: {
            greeting: "Hello, I'm Hamza",
            title1: "Full-Stack",
            title2: "Developer",
            subtitle: "& Software Engineering Student",
            location: "Based in Casablanca, Morocco",
            available: "AVAILABLE",
            viewProjects: "View my projects",
            contactMe: "Contact me",
            scroll: "Scroll",
            badge: "Full-Stack Developer",
        },

        // About
        about: {
            title: "Experience &",
            titleHighlight: "Education",
            bioTitle: "Who am I?",
            bio: "I am **Ezzouek Hamza**, a passionate full-stack developer with a background in mobile development, currently in my **fifth and final year of engineering studies in Data Science and Computer Development**. I am passionate about designing, developing, and deploying complete, scalable, and innovative web solutions. As an aspiring software engineer, I am eager to apply my technical skills, gain hands-on experience, contribute to meaningful projects, and continuously grow in a dynamic and challenging professional environment.",
            subtitle: "My professional and academic journey, illustrating my evolution in the field of software development.",
            experiences: "Professional Experience",
            formation: "Education",
            stats: {
                years: "Years of study",
                internships: "Internships",
                projects: "Completed projects",
                technologies: "Technologies",
            },
            experiencesList: [
                {
                    year: 'April 2025 – July 2025',
                    title: 'End of Studies Internship',
                    company: 'MuntadaCom - Moroccan Company',
                    subtitle: 'Specialized in Process Digitalization',
                    location: 'Casablanca',
                    description: 'Development of an HR web application with React.js for the frontend, Node.js and Express.js for the backend, and MySQL for the database.',
                    technologies: ['React.js', 'Node.js', 'Express.js', 'MySQL'],
                },
                {
                    year: 'December 2024 - March 2025',
                    title: 'Internship',
                    company: 'Laboratory of Transversal Studies',
                    subtitle: 'in Law, Economics and Business Management',
                    location: 'Casablanca',
                    description: 'Design and development of a web application to present the services and activities of a laboratory. Built with React.js and Laravel.',
                    technologies: ['React.js', 'Laravel', 'PHP'],
                },
                {
                    year: 'February 2024 – May 2024',
                    title: 'End of Studies Internship',
                    company: 'All Formations',
                    subtitle: '',
                    location: 'France',
                    description: 'Development of a fullstack web application for animal adoption with ReactJS and Laravel. Project management with Git.',
                    technologies: ['ReactJS', 'TailwindCSS', 'Laravel', 'MySQL', 'Git'],
                },
            ],
            educationList: [
                {
                    year: '2024-2025',
                    title: 'Professional License in Software Engineering',
                    institution: 'ESTEM',
                    location: 'Casablanca',
                    description: 'Specialized training in software engineering covering development methodologies, software architectures, and advanced technologies.',
                },
                {
                    year: '2022-2024',
                    title: 'IT Development Technician',
                    institution: 'OFPPT Professional Training Center',
                    location: 'Casablanca',
                    description: 'Complete training in IT development covering web technologies, databases, and development methodologies.',
                },
                {
                    year: '2020-2021',
                    title: 'High School Diploma in Physical Sciences',
                    institution: 'Groupe Scolaire Ouhoud',
                    location: 'Casablanca',
                    description: 'Basic scientific training in physical sciences.',
                },
            ],
        },

        // Skills
        skills: {
            title: "Technologies &",
            titleHighlight: "Tools",
            subtitle: "Technical stack I master to create complete solutions",
            categories: {
                frontend: "Frontend",
                backend: "Backend",
                database: "Database",
                mobile: "Mobile",
                tools: "Tools",
                management: "Project Management",
            },
            stats: {
                technologies: "Technologies",
                projects: "Projects",
                years: "Years of study",
                passion: "Passion",
            },
        },

        // Services
        services: {
            title: "My",
            titleHighlight: "Services",
            subtitle: "Professional solutions I can offer to bring your projects to life",
            fullstack: "Full-Stack Sites",
            fullstackDesc: "Complete web application development with React.js, Node.js, and databases. Scalable and high-performance solutions from A to Z.",
            websites: "Presentation Websites",
            websitesDesc: "Creation of modern and elegant showcase websites to present your company, services, or portfolio professionally.",
            mobile: "Mobile Applications",
            mobileDesc: "Development of native and cross-platform mobile applications with React Native and Flutter for iOS and Android.",
            ecommerce: "E-commerce Sites",
            ecommerceDesc: "Design of complete online stores with product management, secure payments, and intuitive user interface.",
            landing: "Landing Pages",
            landingDesc: "Creation of conversion-optimized landing pages with attractive design and effective calls to action.",
            design: "Design & UI/UX",
            designDesc: "Design of modern and intuitive user interfaces, with special attention to user experience and aesthetics.",
            cta: "Let's discuss your project",
        },

        // GitHub
        github: {
            titlePrefix: "GitHub",
            titleHighlight: "Activity",
            subtitle: "My contributions and open-source projects",
            stats: {
                repos: "Repositories",
                followers: "Followers",
                following: "Following",
                stars: "Total Stars",
            },
            chartTitle: "Contribution Graph",
            year: "Year",
            viewDetails: "View details on GitHub",
            topLanguages: "Most Used Languages",
            popularRepos: "Popular Repositories",
            viewAll: "View all my projects on GitHub",
        },

        // Projects
        projects: {
            title: "My",
            titleHighlight: "Projects",
            subtitle: "Discover my academic and personal projects",
            all: "All",
            frontend: "Frontend",
            fullstack: "Full-Stack",
            mobile: "Mobile",
            backend: "Backend",
            inProgress: "In Progress",
            noProjects: "No projects in this category",
            viewDemo: "View demo",
            viewCode: "View code",
        },

        // Contact
        contact: {
            title: "",
            titleHighlight: "Contact Me",
            subtitle: "Feel free to contact me for any opportunity or collaboration",
            info: "Contact Information",
            social: "Social Networks",
            form: {
                name: "Full Name",
                namePlaceholder: "Your name",
                email: "Email",
                emailPlaceholder: "your@email.com",
                subject: "Subject",
                subjectPlaceholder: "Message subject",
                message: "Message",
                messagePlaceholder: "Your message...",
                send: "Send message",
                sending: "Sending...",
                success: "Message sent successfully! I will reply soon.",
                error: "An error occurred. Please try again or contact me directly by email.",
            },
            contactInfo: {
                email: "Email",
                phone: "Phone",
                location: "Location",
            },
        },

        // FAQ
        faq: {
            badge: "FAQ",
            title: "Your Guide to",
            titleHighlight: "working together.",
            subtitle: "Find quick answers to common questions about my technical skills, availability, and development process.",
            questions: [
                {
                    q: "What technologies do you specialize in?",
                    a: "I specialize in Full-Stack development using ReactJS, Node.js, Express.js, PHP, and Laravel. For databases, I work with MySQL and MongoDB. I also have mobile development experience with Flutter and Java for Android."
                },
                {
                    q: "Are you available for full-time roles or internships?",
                    a: "Yes, absolutely! I am currently looking for end-of-studies internships, full-time positions, or freelance opportunities. I am based in Casablanca, Morocco, and open to remote work or international relocation."
                },
                {
                    q: "What is your approach to developing custom web applications?",
                    a: "I follow an Agile & Scrum workflow: designing user interfaces in Figma, planning system architecture with UML, iterative frontend & backend development, secure API integrations, testing, and continuous deployment."
                },
                {
                    q: "Can you collaborate with an existing team or code base?",
                    a: "Definitely. I am experienced in team collaboration using Git (GitHub/GitLab), task breakdown on Trello/GanttProject, and reading, refactoring, or extending existing codebases cleanly."
                },
                {
                    q: "What is the typical timeline for completing a project?",
                    a: "Timelines depend on project complexity. A landing page or showcase website takes 3-7 days, while a full-stack web application or SaaS platform usually ranges from 2 to 6 weeks with regular progress updates."
                },
                {
                    q: "How can we initiate a project or contact you?",
                    a: "You can reach out directly using the contact form below, send an email to hamzaezz2803@gmail.com, or connect with me via LinkedIn to discuss your project requirements."
                }
            ]
        },

        // Location & Availability
        location: {
            title: "Location &",
            titleHighlight: "Availability",
            subtitle: "Based in Casablanca, available for local and international opportunities.",
            status: "Current Status",
            available: "Available for new opportunities",
            localTime: "Local Time (Casablanca)",
            remote: "Remote Work: Yes (100%)",
            mobility: "Mobility: International",
            openFor: "Open to: Full-time, Internship, Freelance",
        },
        // Footer
        footer: {
            description: "Full-Stack Developer passionate about creating modern and high-performance web solutions.",
            quickLinks: "Quick Links",
            contactTitle: "Contact",
            rights: "All rights reserved.",
            madeWith: "Made with",
            and: "and ReactJS",
        },
    },
};
