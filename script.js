document.addEventListener('DOMContentLoaded', function() {
    const preloader = document.getElementById('preloader');
    const preloaderLetters = document.querySelectorAll('.preloader-letter');
    const preloaderProgressBar = document.querySelector('.preloader-progress-bar');
    
    function initPreloader() {
        preloaderLetters.forEach((letter, index) => {
            letter.style.animationDelay = `${index * 0.1}s`;
        });
        
        setTimeout(() => {
            preloaderProgressBar.style.width = '100%';
        }, 100);
        
        setTimeout(() => {
            preloader.style.opacity = '0';
            preloader.style.visibility = 'hidden';
            document.body.style.overflow = 'visible';
        }, 2500);
    }
    
    const cursorDot = document.getElementById('cursor-dot');
    const cursorOutline = document.getElementById('cursor-outline');
    
    function initCustomCursor() {
        document.addEventListener('mousemove', (e) => {
            const posX = e.clientX;
            const posY = e.clientY;
            
            cursorDot.style.left = `${posX}px`;
            cursorDot.style.top = `${posY}px`;
            
            cursorOutline.animate({
                left: `${posX}px`,
                top: `${posY}px`
            }, { duration: 300, fill: 'forwards' });
        });
        
        const hoverElements = document.querySelectorAll('a, button, .skill-card, .project-card, .nav-link, .category-tab, .filter-btn');
        
        hoverElements.forEach(element => {
            element.addEventListener('mouseenter', () => {
                cursorDot.style.transform = 'translate(-50%, -50%) scale(1.5)';
                cursorDot.style.backgroundColor = 'var(--primary-color)';
                cursorOutline.style.transform = 'translate(-50%, -50%) scale(1.2)';
                cursorOutline.style.borderColor = 'var(--primary-color)';
                cursorOutline.style.opacity = '0.8';
            });
            
            element.addEventListener('mouseleave', () => {
                cursorDot.style.transform = 'translate(-50%, -50%) scale(1)';
                cursorDot.style.backgroundColor = 'var(--primary-color)';
                cursorOutline.style.transform = 'translate(-50%, -50%) scale(1)';
                cursorOutline.style.borderColor = 'var(--primary-color)';
                cursorOutline.style.opacity = '0.5';
            });
        });
        
        document.addEventListener('mousedown', () => {
            cursorDot.style.transform = 'translate(-50%, -50%) scale(0.8)';
            cursorOutline.style.transform = 'translate(-50%, -50%) scale(0.9)';
        });
        
        document.addEventListener('mouseup', () => {
            cursorDot.style.transform = 'translate(-50%, -50%) scale(1)';
            cursorOutline.style.transform = 'translate(-50%, -50%) scale(1)';
        });
    }
    
    const navToggle = document.getElementById('nav-toggle');
    const navMenu = document.getElementById('nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');
    const sections = document.querySelectorAll('section');
    
    function initNavigation() {
        navToggle.addEventListener('click', () => {
            navMenu.classList.toggle('active');
            navToggle.classList.toggle('active');
            document.body.style.overflow = navMenu.classList.contains('active') ? 'hidden' : 'visible';
        });
        
        navLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const targetId = link.getAttribute('href');
                const targetSection = document.querySelector(targetId);
                
                navLinks.forEach(l => l.classList.remove('active'));
                link.classList.add('active');
                
                if (window.innerWidth <= 992) {
                    navMenu.classList.remove('active');
                    navToggle.classList.remove('active');
                    document.body.style.overflow = 'visible';
                }
                
                window.scrollTo({
                    top: targetSection.offsetTop - 80,
                    behavior: 'smooth'
                });
            });
        });
        
        window.addEventListener('scroll', () => {
            let current = '';
            
            sections.forEach(section => {
                const sectionTop = section.offsetTop;
                const sectionHeight = section.clientHeight;
                
                if (scrollY >= (sectionTop - 200)) {
                    current = section.getAttribute('id');
                }
            });
            
            navLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === `#${current}`) {
                    link.classList.add('active');
                }
            });
            
            const navbar = document.querySelector('.navbar');
            if (window.scrollY > 100) {
                navbar.style.backgroundColor = 'rgba(10, 10, 15, 0.95)';
                navbar.style.backdropFilter = 'blur(20px)';
                navbar.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.3)';
            } else {
                navbar.style.backgroundColor = 'rgba(10, 10, 15, 0.9)';
                navbar.style.backdropFilter = 'blur(10px)';
                navbar.style.boxShadow = 'none';
            }
        });
    }
    
    const themeToggle = document.getElementById('theme-toggle');
    const themeIcon = themeToggle.querySelector('.theme-icon');
    const langToggle = document.getElementById('lang-toggle');
    const langText = langToggle.querySelector('.lang-text');
    
    function initThemeToggle() {
        const savedTheme = localStorage.getItem('theme') || 'dark';
        document.documentElement.setAttribute('data-theme', savedTheme);
        updateThemeIcon(savedTheme);
        
        themeToggle.addEventListener('click', () => {
            const currentTheme = document.documentElement.getAttribute('data-theme');
            const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
            
            document.documentElement.setAttribute('data-theme', newTheme);
            localStorage.setItem('theme', newTheme);
            updateThemeIcon(newTheme);
        });
    }
    
    function updateThemeIcon(theme) {
        if (theme === 'light') {
            themeIcon.classList.remove('fa-moon');
            themeIcon.classList.add('fa-sun');
        } else {
            themeIcon.classList.remove('fa-sun');
            themeIcon.classList.add('fa-moon');
        }
    }
    
    function initLanguageToggle() {
        const savedLang = localStorage.getItem('lang') || 'id';
        updateLanguage(savedLang);
        
        langToggle.addEventListener('click', () => {
            const currentLang = document.documentElement.getAttribute('lang') || 'id';
            const newLang = currentLang === 'id' ? 'en' : 'id';
            
            document.documentElement.setAttribute('lang', newLang);
            localStorage.setItem('lang', newLang);
            updateLanguage(newLang);
            updateContentLanguage(newLang);
        });
    }
    
    function updateLanguage(lang) {
        langText.textContent = lang.toUpperCase();
    }
    
    const translations = {
        id: {
            home: "Beranda",
            about: "Tentang",
            skills: "Keahlian",
            projects: "Proyek",
            experience: "Pengalaman",
            contact: "Kontak",
            heroTitle1: "Membangun Solusi",
            heroTitle2: "Digital Masa Depan",
            heroDesc: "Saya <strong>M. Syalman Al Farizi (Neverlabs)</strong>, lulusan mahasiswa SMK yang bersemangat dalam teknologi, pengembangan web, dan jaringan komputer. Siap berkontribusi di dunia teknologi modern.",
            viewProjects: "Lihat Proyek",
            contactMe: "Hubungi Saya",
            aboutTitle: "Profil <span class='highlight'>Neverlabs</span>",
            aboutSubtitle: "Lulusan mahasiswa SMK yang passionate di bidang teknologi dengan pengalaman praktis di berbagai bidang.",
            skillsTitle: "Kemampuan <span class='highlight'>Teknis</span>",
            skillsSubtitle: "Keterampilan yang saya kuasai melalui pembelajaran di sekolah, kursus online, dan pengalaman praktik.",
            projectsTitle: "Karya <span class='highlight'>Terpilih</span>",
            projectsSubtitle: "Beberapa proyek yang telah saya selesaikan selama belajar pemrograman dan teknologi.",
            experienceTitle: "Jalur <span class='highlight'>Pengalaman</span>",
            experienceSubtitle: "Perjalanan saya dalam belajar dan berkontribusi di bidang teknologi.",
            contactTitle: "Mari <span class='highlight'>Bekerjasama</span>",
            contactSubtitle: "Tertarik bekerja sama atau memiliki pertanyaan? Jangan ragu untuk menghubungi saya."
        },
        en: {
            home: "Home",
            about: "About",
            skills: "Skills",
            projects: "Projects",
            experience: "Experience",
            contact: "Contact",
            heroTitle1: "Building Future",
            heroTitle2: "Digital Solutions",
            heroDesc: "I'm <strong>M. Syalman Al Farizi (Neverlabs)</strong>, a passionate 12th-grade vocational high school student in technology, web development, and computer networks. Ready to contribute to the modern tech world.",
            viewProjects: "View Projects",
            contactMe: "Contact Me",
            aboutTitle: "Profile <span class='highlight'>Neverlabs</span>",
            aboutSubtitle: "A passionate vocational high school student with practical experience in various technology fields.",
            skillsTitle: "Technical <span class='highlight'>Expertise</span>",
            skillsSubtitle: "Skills I've mastered through school learning, online courses, and practical experience.",
            projectsTitle: "Selected <span class='highlight'>Works</span>",
            projectsSubtitle: "Some projects I've completed while learning programming and technology.",
            experienceTitle: "Experience <span class='highlight'>Journey</span>",
            experienceSubtitle: "My journey in learning and contributing to the technology field.",
            contactTitle: "Let's <span class='highlight'>Collaborate</span>",
            contactSubtitle: "Interested in working together or have questions? Feel free to contact me."
        }
    };
    
    function updateContentLanguage(lang) {
        const t = translations[lang];
        
        document.querySelectorAll('[data-i18n]').forEach(element => {
            const key = element.getAttribute('data-i18n');
            if (t[key]) {
                if (element.tagName === 'INPUT' || element.tagName === 'TEXTAREA') {
                    element.placeholder = t[key];
                } else {
                    element.innerHTML = t[key];
                }
            }
        });
        
        const heroTitleLines = document.querySelectorAll('.title-line');
        if (heroTitleLines.length >= 2) {
            heroTitleLines[0].textContent = t.heroTitle1;
            heroTitleLines[1].innerHTML = t.heroTitle2;
        }
        
        const heroDesc = document.querySelector('.hero-description');
        if (heroDesc) heroDesc.innerHTML = t.heroDesc;
        
        const viewProjectsBtn = document.querySelector('.hero-actions .btn-primary span');
        if (viewProjectsBtn) viewProjectsBtn.textContent = t.viewProjects;
        
        const contactMeBtn = document.querySelector('.hero-actions .btn-secondary span');
        if (contactMeBtn) contactMeBtn.textContent = t.contactMe;
        
        const aboutTitle = document.querySelector('.about-section .section-title');
        if (aboutTitle) aboutTitle.innerHTML = t.aboutTitle;
        
        const aboutSubtitle = document.querySelector('.about-section .section-subtitle');
        if (aboutSubtitle) aboutSubtitle.textContent = t.aboutSubtitle;
        
        const skillsTitle = document.querySelector('.skills-section .section-title');
        if (skillsTitle) skillsTitle.innerHTML = t.skillsTitle;
        
        const skillsSubtitle = document.querySelector('.skills-section .section-subtitle');
        if (skillsSubtitle) skillsSubtitle.textContent = t.skillsSubtitle;
        
        const projectsTitle = document.querySelector('.projects-section .section-title');
        if (projectsTitle) projectsTitle.innerHTML = t.projectsTitle;
        
        const projectsSubtitle = document.querySelector('.projects-section .section-subtitle');
        if (projectsSubtitle) projectsSubtitle.textContent = t.projectsSubtitle;
        
        const experienceTitle = document.querySelector('.experience-section .section-title');
        if (experienceTitle) experienceTitle.innerHTML = t.experienceTitle;
        
        const experienceSubtitle = document.querySelector('.experience-section .section-subtitle');
        if (experienceSubtitle) experienceSubtitle.textContent = t.experienceSubtitle;
        
        const contactTitle = document.querySelector('.contact-section .section-title');
        if (contactTitle) contactTitle.innerHTML = t.contactTitle;
        
        const contactSubtitle = document.querySelector('.contact-section .section-subtitle');
        if (contactSubtitle) contactSubtitle.textContent = t.contactSubtitle;
        
        navLinks.forEach((link, index) => {
            const navText = link.querySelector('.nav-text');
            if (navText) {
                switch(index) {
                    case 0: navText.textContent = t.home; break;
                    case 1: navText.textContent = t.about; break;
                    case 2: navText.textContent = t.skills; break;
                    case 3: navText.textContent = t.projects; break;
                    case 4: navText.textContent = t.experience; break;
                    case 5: navText.textContent = t.contact; break;
                }
            }
        });
    }
    
    const statNumbers = document.querySelectorAll('.stat-number');
    
    function initStatsCounter() {
        const observerOptions = {
            threshold: 0.5,
            rootMargin: '0px 0px -50px 0px'
        };
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const statNumber = entry.target;
                    const target = parseInt(statNumber.getAttribute('data-count'));
                    const duration = 2000;
                    const increment = target / (duration / 16);
                    let current = 0;
                    
                    const timer = setInterval(() => {
                        current += increment;
                        if (current >= target) {
                            current = target;
                            clearInterval(timer);
                        }
                        statNumber.textContent = Math.floor(current);
                    }, 16);
                    
                    observer.unobserve(statNumber);
                }
            });
        }, observerOptions);
        
        statNumbers.forEach(stat => observer.observe(stat));
    }
    
    const categoryTabs = document.querySelectorAll('.category-tab');
    const categoryContents = document.querySelectorAll('.category-content');
    const skillProgressBars = document.querySelectorAll('.progress-fill');
    
    function initSkillsSection() {
        categoryTabs.forEach(tab => {
            tab.addEventListener('click', () => {
                const category = tab.getAttribute('data-category');
                
                categoryTabs.forEach(t => t.classList.remove('active'));
                tab.classList.add('active');
                
                categoryContents.forEach(content => {
                    content.classList.remove('active');
                    if (content.id === `${category}-content`) {
                        content.classList.add('active');
                    }
                });
            });
        });
        
        const observerOptions = {
            threshold: 0.3,
            rootMargin: '0px 0px -50px 0px'
        };
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    skillProgressBars.forEach(bar => {
                        const width = bar.getAttribute('data-width');
                        bar.style.width = `${width}%`;
                    });
                    observer.unobserve(entry.target);
                }
            });
        }, observerOptions);
        
        const skillsSection = document.getElementById('skills');
        observer.observe(skillsSection);
    }
    
    const filterButtons = document.querySelectorAll('.filter-btn');
    const projectCards = document.querySelectorAll('.project-card');
    
    function initProjectsFilter() {
        filterButtons.forEach(button => {
            button.addEventListener('click', () => {
                const filter = button.getAttribute('data-filter');
                
                filterButtons.forEach(btn => btn.classList.remove('active'));
                button.classList.add('active');
                
                projectCards.forEach(card => {
                    const categories = card.getAttribute('data-category').split(' ');
                    
                    if (filter === 'all' || categories.includes(filter)) {
                        card.style.display = 'block';
                        setTimeout(() => {
                            card.style.opacity = '1';
                            card.style.transform = 'translateY(0)';
                        }, 10);
                    } else {
                        card.style.opacity = '0';
                        card.style.transform = 'translateY(20px)';
                        setTimeout(() => {
                            card.style.display = 'none';
                        }, 300);
                    }
                });
            });
        });
    }
    
    const contactForm = document.getElementById('contactForm');
    
    function initContactForm() {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const submitBtn = this.querySelector('.btn-submit');
            const originalText = submitBtn.querySelector('span').textContent;
            const submitIcon = submitBtn.querySelector('i');
            
            submitBtn.querySelector('span').textContent = 'Mengirim...';
            submitIcon.classList.remove('fa-paper-plane');
            submitIcon.classList.add('fa-spinner', 'fa-spin');
            submitBtn.disabled = true;
            
            const formData = new FormData(this);
            const formDataObj = Object.fromEntries(formData.entries());
            
            setTimeout(() => {
                console.log('Form submitted:', formDataObj);
                
                submitBtn.querySelector('span').textContent = 'Terkirim!';
                submitIcon.classList.remove('fa-spinner', 'fa-spin');
                submitIcon.classList.add('fa-check');
                
                setTimeout(() => {
                    submitBtn.querySelector('span').textContent = originalText;
                    submitIcon.classList.remove('fa-check');
                    submitIcon.classList.add('fa-paper-plane');
                    submitBtn.disabled = false;
                    contactForm.reset();
                }, 2000);
            }, 1500);
        });
    }
    
    function initFloatingShapes() {
        const shapes = document.querySelectorAll('.shape');
        
        shapes.forEach((shape, index) => {
            const randomX = Math.random() * 20 - 10;
            const randomY = Math.random() * 20 - 10;
            const randomDuration = 20 + Math.random() * 10;
            const randomDelay = Math.random() * 5;
            
            shape.style.animation = `
                float ${randomDuration}s ease-in-out ${randomDelay}s infinite
            `;
            
            shape.addEventListener('mouseenter', () => {
                shape.style.transform = `translate(${randomX}px, ${randomY}px) scale(1.2)`;
            });
            
            shape.addEventListener('mouseleave', () => {
                shape.style.transform = `translate(${randomX}px, ${randomY}px) scale(1)`;
            });
        });
    }
    
    function initScrollAnimations() {
        const animateElements = document.querySelectorAll('.skill-card, .project-card, .timeline-card, .info-card');
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animate-in');
                    observer.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        });
        
        animateElements.forEach(element => {
            observer.observe(element);
        });
        
        const scrollIndicator = document.querySelector('.scroll-indicator');
        window.addEventListener('scroll', () => {
            if (window.scrollY > 100) {
                scrollIndicator.style.opacity = '0';
                scrollIndicator.style.visibility = 'hidden';
            } else {
                scrollIndicator.style.opacity = '0.7';
                scrollIndicator.style.visibility = 'visible';
            }
        });
    }
    
    function initParticles() {
        const particlesContainer = document.getElementById('particles');
        const particleCount = 50;
        
        for (let i = 0; i < particleCount; i++) {
            const particle = document.createElement('div');
            particle.className = 'particle';
            
            const size = Math.random() * 3 + 1;
            const posX = Math.random() * 100;
            const posY = Math.random() * 100;
            const duration = 20 + Math.random() * 20;
            const delay = Math.random() * 5;
            
            particle.style.width = `${size}px`;
            particle.style.height = `${size}px`;
            particle.style.left = `${posX}%`;
            particle.style.top = `${posY}%`;
            particle.style.background = `var(--gradient-primary)`;
            particle.style.opacity = Math.random() * 0.3 + 0.1;
            particle.style.borderRadius = '50%';
            particle.style.position = 'absolute';
            particle.style.animation = `float ${duration}s ease-in-out ${delay}s infinite`;
            
            particlesContainer.appendChild(particle);
        }
    }
    
    const downloadCvBtn = document.getElementById('download-cv');
    
    function initResumeDownload() {
        const resumeButtons = document.querySelectorAll('.nav-resume-btn, #download-cv');
        
        resumeButtons.forEach(button => {
            button.addEventListener('click', (e) => {
                e.preventDefault();
                
                const originalText = button.querySelector('span').textContent;
                const originalIcon = button.querySelector('i');
                
                button.querySelector('span').textContent = 'Mengunduh...';
                originalIcon.classList.remove('fa-download');
                originalIcon.classList.add('fa-spinner', 'fa-spin');
                
                setTimeout(() => {
                    button.querySelector('span').textContent = 'Terkirim!';
                    originalIcon.classList.remove('fa-spinner', 'fa-spin');
                    originalIcon.classList.add('fa-check');
                    
                    const link = document.createElement('a');
                    link.href = 'cv/M_Syalman_Al_Farizi_CV.pdf';
                    link.download = 'M_Syalman_Al_Farizi_CV.pdf';
                    document.body.appendChild(link);
                    link.click();
                    document.body.removeChild(link);
                    
                    setTimeout(() => {
                        button.querySelector('span').textContent = originalText;
                        originalIcon.classList.remove('fa-check');
                        originalIcon.classList.add('fa-download');
                    }, 2000);
                }, 1500);
            });
        });
    }
    
    function initFormAnimations() {
        const formInputs = document.querySelectorAll('.form-input, .form-textarea');
        
        formInputs.forEach(input => {
            input.addEventListener('focus', () => {
                input.parentElement.classList.add('focused');
            });
            
            input.addEventListener('blur', () => {
                if (!input.value) {
                    input.parentElement.classList.remove('focused');
                }
            });
            
            if (input.value) {
                input.parentElement.classList.add('focused');
            }
        });
    }
    
    function initCodeAnimation() {
        const codeWindow = document.querySelector('.code-window');
        const codeLines = document.querySelectorAll('.window-content pre code');
        
        codeWindow.addEventListener('mouseenter', () => {
            codeLines.forEach((line, index) => {
                setTimeout(() => {
                    line.style.opacity = '1';
                    line.style.transform = 'translateX(0)';
                }, index * 50);
            });
        });
        
        codeWindow.addEventListener('mouseleave', () => {
            codeLines.forEach(line => {
                line.style.opacity = '0.8';
                line.style.transform = 'translateX(-5px)';
            });
        });
    }
    
    function initSmoothScrolling() {
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function(e) {
                e.preventDefault();
                
                const targetId = this.getAttribute('href');
                if (targetId === '#') return;
                
                const targetElement = document.querySelector(targetId);
                if (targetElement) {
                    window.scrollTo({
                        top: targetElement.offsetTop - 80,
                        behavior: 'smooth'
                    });
                }
            });
        });
    }
    
    function initMobileMenuClose() {
        document.addEventListener('click', (e) => {
            const isNavToggle = navToggle.contains(e.target);
            const isNavMenu = navMenu.contains(e.target);
            
            if (!isNavToggle && !isNavMenu && navMenu.classList.contains('active')) {
                navMenu.classList.remove('active');
                navToggle.classList.remove('active');
                document.body.style.overflow = 'visible';
            }
        });
    }
    
    const projectDetailOverlay = document.getElementById('project-detail-overlay');
    const projectDetailContent = document.getElementById('project-detail-content');
    const projectDetailClose = document.getElementById('project-detail-close');
    const viewDetailsButtons = document.querySelectorAll('.view-details');
    const footerProjectLinks = document.querySelectorAll('.footer-links a[data-project]');
    
    const projectsData = {
        'tictactoe': {
            title: 'Tic Tac Toe Games',
            category: 'Game • Web',
            description: 'Tic Tac Toe Games berbasis web dengan fitur multiplayer lokal, AI Q-learning, dan pelatihan AI secara bertahap.',
            longDescription: 'Tic Tac Toe Games ini adalah implementasi modern dari game klasik dengan antarmuka yang menarik dan responsif. Proyek ini menampilkan kemampuan dalam DOM manipulation, algoritma AI sederhana, dan pengelolaan state tanpa library eksternal.',
            features: [
                'Multiplayer lokal untuk 2 pemain (player dan komputer)',
                'AI Learning (Q-learning) berlatih dari hasil data permainan',
                'Sistem tracking score dengan LocalStorage',
                'Animasi smooth untuk gerakan dan kemenangan',
                'Design responsif yang bekerja di semua device',
                'Mode gelap untuk keterampilan yg elegan'
            ],
            technologies: ['HTML5', 'CSS3', 'JavaScript', 'LocalStorage'],
            github: 'https://github.com/neveerlabs/Tic-Tac-Toe',
            demo: 'https://neveerlabs.github.io/Tic-Tac-Toe/',
            image: 'images/tictactoe.jpg',
            date: 'Januari 2026'
        },
        'telegram-bot': {
            title: 'VioraID',
            category: 'Bot • Automasi',
            description: 'Bot Komunitas Telegram dengan berbagai fitur utility seperti pengingat, konversi, handle grup, dan automasi lainnya.',
            longDescription: 'Bot Komunitas Telegram ini adalah proyek automasi yang membantu admin dan pengguna dalam berbagai tugas sehari-hari. Bot dapat diintegrasikan dengan berbagai API eksternal untuk menyediakan informasi real-time dan melakukan automasi.',
            features: [
                'Sistem pengingat dengan notifikasi terjadwal',
                'Integrasi respon Ai',
                'Informasi harga saham',
                'mencegah adanya bot lain didalam grup',
                'Pencarian Wikipedia dan informasi umum',
                'Automasi pesan grup/channel',
                'Database SQLite untuk penyimpanan data'
            ],
            technologies: ['Python3.13+', 'Telegram API', 'SQLite', 'PIL', 'Pyrogram', 'google-gemini', 'Requests', 'APScheduler'],
            image: 'images/telegram-bot.jpg',
            demo: null,
            date: 'Februari 2025'
        },
        'github-setup': {
            title: 'Tocket',
            category: 'Tool • Automasi',
            description: 'Tool CLI untuk setup otomatis repository GitHub dengan konfigurasi standar dan best practices.',
            longDescription: 'Tool CLI ini dibuat untuk mengotomatisasi proses setup repository GitHub yang seringkali repetitive. Dengan tool ini, developer dapat dengan cepat menginisialisasi proyek baru dengan struktur folder standar, license, README, dan konfigurasi Git.',
            features: [
                'Setup otomatis repository GitHub baru',
                'Pilihan berbagai template proyek (Web, Python, Node.js)',
                'Generasi otomatis README.md dengan badge',
                'Konfigurasi Git dengan branch protection rules',
                'Setup GitHub Actions untuk CI/CD',
                'Manajemen secret dan environment variables',
                'Integrasi dengan GitHub API'
            ],
            technologies: ['Python3.13+', 'Rich', 'Requests', 'OS', 'Bash', 'Git', 'GitHub API', 'CryptoGraphy', 'YAML'],
            github: 'https://github.com/neveerlabs/Tocket',
            demo: null,
            image: 'images/tocket.png',
            date: 'Desember 2025'
        },
        'ponpes-community': {
            title: 'Web Komunitas Pondok Pesantren',
            category: 'Web • Komunitas',
            description: 'Website komunitas untuk pondok pesantren dengan fitur artikel, jadwal, galeri, dan forum diskusi.',
            longDescription: 'Website ini dikembangkan untuk membantu komunitas pondok pesantren dalam berkomunikasi dan berbagi informasi kepada orang tua santri. Fitur utamanya termasuk sistem manajemen konten untuk artikel, absensi kegiatan, galeri multimedia, dan forum diskusi yang aman.',
            features: [
                'Sistem manajemen konten (CMS) untuk artikel',
                'Absensi kegiatan ngaji harian',
                'Galeri foto dan video dengan kategori',
                'Forum diskusi dengan moderasi',
                'Sistem user authentication dan authorization',
                'Dashboard admin dengan statistik',
                'Design responsif dan mobile-friendly'
            ],
            technologies: ['HTML', 'CSS', 'JavaScript', 'Express.js', 'MariaDB', 'Bootstrap'],
            github: 'https://github.com/neveerlabs/web',
            demo: null,
            image: 'images/ponpes-web.jpg',
            date: 'Desember 2026 - Sekarang'
        },
        'portfolio-v1': {
            title: 'Neverlabs Portfolio',
            category: 'Web • Portfolio',
            description: 'Versi pertama website portofolio Neverlabs dengan design responsive dan animasi CSS dasar. Website ini menjadi fondasi untuk pengembangan portofolio yang lebih kompleks.',
            longDescription: 'Ini adalah versi pertama dari website portfolio saya, yang menampilkan kemampuan dasar dalam pengembangan web frontend. Website ini memiliki desain yang bersih, responsif, dan interaktif dengan animasi CSS murni.',
            features: [
                'Design responsif dengan mobile-first approach',
                'Animasi CSS murni dengan JavaScript',
                'Smooth scrolling navigation',
                'Dark/light mode toggle',
                'Form kontak dengan validasi',
                'Project showcase dengan filter',
                'Optimasi performa dan SEO dasar'
            ],
            technologies: ['HTML5', 'CSS3', 'JavaScript', 'Responsive Design'],
            github: 'https://github.com/neveerlabs/Portfolio',
            demo: 'https://neveerlabs.github.io/Portfolio/',
            image: 'images/portfolio-v1.jpg',
            date: 'Januari 2026'
        },
        'network-monitor': {
            title: 'Xcrack-ng',
            category: 'Tool • Jaringan',
            description: 'Tool eksploitasi jaringan, monitoring client, brute force device, dan serangan malware, rainsomware, trojan.',
            longDescription: 'Tool Xcrack-ng ini dikembangkan untuk membuat serangan lewat jaringan LAN (WIFI) palsu. Tool ini dapat mendeteksi device yang terhubung, mengambil data perangkat, mengirim serangan ke device yg terhubung, dan memberikan alert ketika terjadi masalah jaringan atau serangan balik.',
            features: [
                'Scanning network untuk device yang terhubung',
                'Monitoring ping dan latency real-time',
                'Penggabungan device client (korban)',
                'Logging network activity',
                'Alert system untuk downtime',
                'Web dashboard untuk monitoring',
                'API untuk integrasi dengan sistem lain'
            ],
            technologies: ['Python3.13+', 'Flask', 'HTML', 'CSS', 'JavaScript', 'Bootsrap', 'OS', 'SQLite', 'Socket', 'Ping3', 'Chart.js'],
            github: null,
            demo: null,
            image: 'images/network-monitor.jpg',
            date: 'Mei 2025'
        }
    };
    
    function initProjectDetails() {
        function showProjectDetail(projectId) {
            const project = projectsData[projectId];
            if (!project) return;
            
            const lang = document.documentElement.getAttribute('lang') || 'id';
            
            let demoButton = '';
            if (project.demo) {
                demoButton = `<a href="${project.demo}" class="btn btn-primary" target="_blank">
                    <i class="fas fa-external-link-alt"></i>
                    <span>${lang === 'id' ? 'Lihat Demo' : 'View Demo'}</span>
                </a>`;
            }
            
            projectDetailContent.innerHTML = `
                <div class="project-detail-header">
                    <div class="project-detail-badge">${project.category}</div>
                    <h1 class="project-detail-title">${project.title}</h1>
                    <div class="project-detail-meta">
                        <div class="project-detail-meta-item">
                            <i class="fas fa-calendar"></i>
                            <span>${project.date}</span>
                        </div>
                        <div class="project-detail-meta-item">
                            <i class="fas fa-code"></i>
                            <span>${project.technologies.length} Teknologi</span>
                        </div>
                    </div>
                </div>
                
                <div class="project-detail-image">
                    <img src="${project.image}" alt="${project.title}" onerror="this.src='https://images.unsplash.com/photo-1555066931-4365d14bab8c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'">
                </div>
                
                <div class="project-detail-description">
                    <p>${project.longDescription}</p>
                </div>
                
                <div class="project-detail-section">
                    <h3>${lang === 'id' ? 'Fitur Utama' : 'Key Features'}</h3>
                    <ul class="project-detail-features">
                        ${project.features.map(feature => `<li>${feature}</li>`).join('')}
                    </ul>
                </div>
                
                <div class="project-detail-section">
                    <h3>${lang === 'id' ? 'Teknologi yang Digunakan' : 'Technologies Used'}</h3>
                    <div class="project-detail-tech">
                        ${project.technologies.map(tech => `<span class="tech-tag">${tech}</span>`).join('')}
                    </div>
                </div>
                
                <div class="project-detail-links">
                    <a href="${project.github}" class="btn btn-secondary" target="_blank">
                        <i class="fab fa-github"></i>
                        <span>${lang === 'id' ? 'Lihat Kode' : 'View Code'}</span>
                    </a>
                    ${demoButton}
                </div>
            `;
            
            projectDetailOverlay.classList.add('active');
            document.body.style.overflow = 'hidden';
            
            const projectPageTitle = document.getElementById('project-page-title');
            projectPageTitle.textContent = project.title;
        }
        
        viewDetailsButtons.forEach(button => {
            button.addEventListener('click', () => {
                const projectId = button.getAttribute('data-project');
                showProjectDetail(projectId);
            });
        });
        
        footerProjectLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const projectId = link.getAttribute('data-project');
                showProjectDetail(projectId);
            });
        });
        
        projectDetailClose.addEventListener('click', () => {
            projectDetailOverlay.classList.remove('active');
            document.body.style.overflow = 'visible';
        });
        
        projectDetailOverlay.addEventListener('click', (e) => {
            if (e.target === projectDetailOverlay) {
                projectDetailOverlay.classList.remove('active');
                document.body.style.overflow = 'visible';
            }
        });
        
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && projectDetailOverlay.classList.contains('active')) {
                projectDetailOverlay.classList.remove('active');
                document.body.style.overflow = 'visible';
            }
        });
    }
    
    function initThreeJS() {
        if (typeof THREE === 'undefined') {
            console.log('Three.js not loaded');
            return;
        }
        
        const container = document.getElementById('threejs-container');
        if (!container) return;
        
        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(75, container.clientWidth / container.clientHeight, 0.1, 1000);
        const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
        
        renderer.setSize(container.clientWidth, container.clientHeight);
        renderer.setClearColor(0x000000, 0);
        container.appendChild(renderer.domElement);
        
        const geometry = new THREE.IcosahedronGeometry(1, 1);
        const material = new THREE.MeshStandardMaterial({ 
            color: 0x6366f1,
            metalness: 0.7,
            roughness: 0.2,
            transparent: true,
            opacity: 0.7
        });
        const icosahedron = new THREE.Mesh(geometry, material);
        scene.add(icosahedron);
        
        const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
        scene.add(ambientLight);
        
        const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
        directionalLight.position.set(5, 5, 5);
        scene.add(directionalLight);
        
        camera.position.z = 3;
        
        let mouseX = 0;
        let mouseY = 0;
        
        document.addEventListener('mousemove', (e) => {
            mouseX = (e.clientX / window.innerWidth) * 2 - 1;
            mouseY = -(e.clientY / window.innerHeight) * 2 + 1;
        });
        
        function animate() {
            requestAnimationFrame(animate);
            
            icosahedron.rotation.x += 0.005;
            icosahedron.rotation.y += 0.005;
            
            icosahedron.rotation.x += mouseY * 0.01;
            icosahedron.rotation.y += mouseX * 0.01;
            
            renderer.render(scene, camera);
        }
        
        function handleResize() {
            camera.aspect = container.clientWidth / container.clientHeight;
            camera.updateProjectionMatrix();
            renderer.setSize(container.clientWidth, container.clientHeight);
        }
        
        window.addEventListener('resize', handleResize);
        animate();
    }
    
    const scrollProgress = document.createElement('div');
    scrollProgress.className = 'scroll-progress';
    document.body.appendChild(scrollProgress);
    
    function initScrollProgress() {
        window.addEventListener('scroll', () => {
            const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
            const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
            const scrolled = (winScroll / height) * 100;
            scrollProgress.style.width = scrolled + '%';
        });
    }
    
    function initClipboard() {
        document.querySelectorAll('.detail-value, .info-text').forEach(element => {
            if (element.textContent.includes('@') || element.textContent.includes('+62')) {
                element.style.cursor = 'pointer';
                element.title = 'Klik untuk menyalin';
                
                element.addEventListener('click', () => {
                    const text = element.textContent;
                    navigator.clipboard.writeText(text).then(() => {
                        const originalText = element.textContent;
                        element.textContent = 'Tersalin!';
                        element.style.color = 'var(--success-color)';
                        
                        setTimeout(() => {
                            element.textContent = originalText;
                            element.style.color = '';
                        }, 2000);
                    });
                });
            }
        });
    }
    
    function initNotifications() {
        window.addEventListener('online', () => {
            showNotification('Kembali online!', 'success');
        });
        
        window.addEventListener('offline', () => {
            showNotification('Anda sedang offline. Beberapa fitur mungkin tidak berfungsi.', 'warning');
        });
    }
    
    function showNotification(message, type) {
        const notification = document.createElement('div');
        notification.className = `notification notification-${type}`;
        notification.textContent = message;
        
        document.body.appendChild(notification);
        
        setTimeout(() => {
            notification.style.animation = 'slideOut 0.3s ease';
            setTimeout(() => {
                document.body.removeChild(notification);
            }, 300);
        }, 3000);
    }
    
    function initPerformance() {
        const images = document.querySelectorAll('img');
        images.forEach(img => {
            img.loading = 'lazy';
            img.addEventListener('load', () => {
                img.classList.add('loaded');
            });
        });
        
        const imageObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    const src = img.getAttribute('data-src');
                    if (src) {
                        img.setAttribute('src', src);
                        img.removeAttribute('data-src');
                    }
                    imageObserver.unobserve(img);
                }
            });
        }, {
            rootMargin: '50px 0px',
            threshold: 0.1
        });
        
        document.querySelectorAll('img[data-src]').forEach(img => imageObserver.observe(img));
    }
    
    function initPortfolio() {
        initPreloader();
        initCustomCursor();
        initNavigation();
        initThemeToggle();
        initLanguageToggle();
        initStatsCounter();
        initSkillsSection();
        initProjectsFilter();
        initContactForm();
        initFloatingShapes();
        initScrollAnimations();
        initParticles();
        initResumeDownload();
        initFormAnimations();
        initCodeAnimation();
        initSmoothScrolling();
        initMobileMenuClose();
        initProjectDetails();
        initScrollProgress();
        initClipboard();
        initNotifications();
        initPerformance();
        
        try {
            initThreeJS();
        } catch (error) {
            console.log('Three.js initialization failed:', error);
        }
        
        window.addEventListener('load', () => {
            document.body.classList.add('loaded');
            const savedLang = localStorage.getItem('lang') || 'id';
            updateContentLanguage(savedLang);
        });
    }
    
    initPortfolio();
    
    window.addEventListener('resize', () => {
        if (window.innerWidth > 992) {
            navMenu.classList.remove('active');
            navToggle.classList.remove('active');
            document.body.style.overflow = 'visible';
        }
    });
    
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            const navMenu = document.getElementById('nav-menu');
            const navToggle = document.getElementById('nav-toggle');
            const projectDetailOverlay = document.getElementById('project-detail-overlay');
            
            if (navMenu.classList.contains('active')) {
                navMenu.classList.remove('active');
                navToggle.classList.remove('active');
                document.body.style.overflow = 'visible';
            }
            
            if (projectDetailOverlay.classList.contains('active')) {
                projectDetailOverlay.classList.remove('active');
                document.body.style.overflow = 'visible';
            }
        }
    });
    
    let lastScrollTop = 0;
    window.addEventListener('scroll', () => {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        if (Math.abs(scrollTop - lastScrollTop) > 50) {
            const particles = document.querySelectorAll('.particle');
            particles.forEach(particle => {
                particle.style.animationPlayState = 'paused';
            });
            
            setTimeout(() => {
                particles.forEach(particle => {
                    particle.style.animationPlayState = 'running';
                });
            }, 100);
            
            lastScrollTop = scrollTop;
        }
    });
    
    if ('serviceWorker' in navigator) {
        window.addEventListener('load', () => {
            navigator.serviceWorker.register('/sw.js').catch(error => {
                console.log('Service Worker registration failed:', error);
            });
        });
    }
    
    function setViewportUnits() {
        const vh = window.innerHeight * 0.01;
        const vw = window.innerWidth * 0.01;
        document.documentElement.style.setProperty('--vh', `${vh}px`);
        document.documentElement.style.setProperty('--vw', `${vw}px`);
    }
    
    window.addEventListener('resize', setViewportUnits);
    window.addEventListener('orientationchange', setViewportUnits);
    setViewportUnits();
    
    window.addEventListener('beforeprint', () => {
        const cursorDot = document.getElementById('cursor-dot');
        const cursorOutline = document.getElementById('cursor-outline');
        if (cursorDot) cursorDot.style.display = 'none';
        if (cursorOutline) cursorOutline.style.display = 'none';
    });
    
    window.addEventListener('afterprint', () => {
        const cursorDot = document.getElementById('cursor-dot');
        const cursorOutline = document.getElementById('cursor-outline');
        if (cursorDot) cursorDot.style.display = 'block';
        if (cursorOutline) cursorOutline.style.display = 'block';
    });
    
    window.portfolioDebug = {
        reload: () => window.location.reload(),
        theme: (theme) => {
            document.documentElement.setAttribute('data-theme', theme);
            localStorage.setItem('theme', theme);
        },
        lang: (lang) => {
            document.documentElement.setAttribute('lang', lang);
            localStorage.setItem('lang', lang);
            updateLanguage(lang);
            updateContentLanguage(lang);
        },
        stats: () => {
            document.querySelectorAll('.stat-number').forEach(stat => {
                stat.textContent = stat.getAttribute('data-count');
            });
        },
        showProject: (projectId) => {
            const projectDetailOverlay = document.getElementById('project-detail-overlay');
            const project = projectsData[projectId];
            if (project && projectDetailOverlay) {
                const viewDetailsBtn = document.querySelector(`.view-details[data-project="${projectId}"]`);
                if (viewDetailsBtn) viewDetailsBtn.click();
            }
        }
    };
});
