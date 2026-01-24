document.addEventListener('DOMContentLoaded', function() {
    // ============================================
    // Preloader
    // ============================================
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
    
    // ============================================
    // Custom Cursor
    // ============================================
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
    
    // ============================================
    // Navigation
    // ============================================
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
    
    // ============================================
    // Theme Toggle
    // ============================================
    const themeToggle = document.getElementById('theme-toggle');
    const themeIcon = themeToggle.querySelector('.theme-icon');
    
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
    
    // ============================================
    // Animated Stats Counter
    // ============================================
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
    
    // ============================================
    // Skills Section
    // ============================================
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
    
    // ============================================
    // Projects Filtering
    // ============================================
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
    
    // ============================================
    // Testimonials Slider
    // ============================================
    const sliderTrack = document.querySelector('.slider-track');
    const sliderDots = document.querySelectorAll('.slider-dot');
    const prevBtn = document.querySelector('.slider-prev');
    const nextBtn = document.querySelector('.slider-next');
    
    function initTestimonialsSlider() {
        let currentSlide = 0;
        const totalSlides = sliderDots.length;
        const slideWidth = 100;
        
        function updateSlider() {
            sliderTrack.style.transform = `translateX(-${currentSlide * slideWidth}%)`;
            
            sliderDots.forEach((dot, index) => {
                if (index === currentSlide) {
                    dot.classList.add('active');
                } else {
                    dot.classList.remove('active');
                }
            });
        }
        
        sliderDots.forEach((dot, index) => {
            dot.addEventListener('click', () => {
                currentSlide = index;
                updateSlider();
            });
        });
        
        prevBtn.addEventListener('click', () => {
            currentSlide = (currentSlide - 1 + totalSlides) % totalSlides;
            updateSlider();
        });
        
        nextBtn.addEventListener('click', () => {
            currentSlide = (currentSlide + 1) % totalSlides;
            updateSlider();
        });
        
        let startX = 0;
        let endX = 0;
        
        sliderTrack.addEventListener('touchstart', (e) => {
            startX = e.touches[0].clientX;
        });
        
        sliderTrack.addEventListener('touchmove', (e) => {
            endX = e.touches[0].clientX;
        });
        
        sliderTrack.addEventListener('touchend', () => {
            const diff = startX - endX;
            const threshold = 50;
            
            if (Math.abs(diff) > threshold) {
                if (diff > 0) {
                    currentSlide = (currentSlide + 1) % totalSlides;
                } else {
                    currentSlide = (currentSlide - 1 + totalSlides) % totalSlides;
                }
                updateSlider();
            }
        });
        
        setInterval(() => {
            currentSlide = (currentSlide + 1) % totalSlides;
            updateSlider();
        }, 5000);
    }
    
    // ============================================
    // Contact Form
    // ============================================
    const contactForm = document.getElementById('contactForm');
    
    function initContactForm() {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const submitBtn = this.querySelector('.btn-submit');
            const originalText = submitBtn.querySelector('span').textContent;
            const submitIcon = submitBtn.querySelector('i');
            
            submitBtn.querySelector('span').textContent = 'Sending...';
            submitIcon.classList.remove('fa-paper-plane');
            submitIcon.classList.add('fa-spinner', 'fa-spin');
            submitBtn.disabled = true;
            
            const formData = new FormData(this);
            const formDataObj = Object.fromEntries(formData.entries());
            
            setTimeout(() => {
                console.log('Form submitted:', formDataObj);
                
                submitBtn.querySelector('span').textContent = 'Message Sent!';
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
    
    // ============================================
    // Floating Shapes Animation
    // ============================================
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
    
    // ============================================
    // Scroll Animations
    // ============================================
    function initScrollAnimations() {
        const animateElements = document.querySelectorAll('.skill-card, .project-card, .timeline-card, .info-card, .testimonial-card');
        
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
    
    // ============================================
    // Particles Background
    // ============================================
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
    
    // ============================================
    // Resume Download
    // ============================================
    function initResumeDownload() {
        const resumeButtons = document.querySelectorAll('.nav-resume-btn, .btn-secondary');
        
        resumeButtons.forEach(button => {
            if (button.textContent.includes('Resume') || button.textContent.includes('CV')) {
                button.addEventListener('click', (e) => {
                    e.preventDefault();
                    
                    const originalText = button.querySelector('span').textContent;
                    const originalIcon = button.querySelector('i');
                    
                    button.querySelector('span').textContent = 'Downloading...';
                    originalIcon.classList.remove('fa-download');
                    originalIcon.classList.add('fa-spinner', 'fa-spin');
                    
                    setTimeout(() => {
                        button.querySelector('span').textContent = 'Downloaded!';
                        originalIcon.classList.remove('fa-spinner', 'fa-spin');
                        originalIcon.classList.add('fa-check');
                        
                        const link = document.createElement('a');
                        link.href = '#';
                        link.download = 'Alex_Carter_Resume.pdf';
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
            }
        });
    }
    
    // ============================================
    // Form Input Animations
    // ============================================
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
    
    // ============================================
    // Code Syntax Highlighting Animation
    // ============================================
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
    
    // ============================================
    // Smooth Scrolling
    // ============================================
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
    
    // ============================================
    // Mobile Menu Close on Click Outside
    // ============================================
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
    
    // ============================================
    // Initialize All Functions
    // ============================================
    function initPortfolio() {
        initPreloader();
        initCustomCursor();
        initNavigation();
        initThemeToggle();
        initStatsCounter();
        initSkillsSection();
        initProjectsFilter();
        initTestimonialsSlider();
        initContactForm();
        initFloatingShapes();
        initScrollAnimations();
        initParticles();
        initResumeDownload();
        initFormAnimations();
        initCodeAnimation();
        initSmoothScrolling();
        initMobileMenuClose();
        
        window.addEventListener('load', () => {
            document.body.classList.add('loaded');
        });
    }
    
    initPortfolio();
});

// Add CSS animations
const style = document.createElement('style');
style.textContent = `
    @keyframes float {
        0%, 100% { transform: translateY(0) rotate(0deg); }
        50% { transform: translateY(-20px) rotate(180deg); }
    }
    
    .animate-in {
        animation: fadeInUp 0.6s ease forwards;
        opacity: 0;
        transform: translateY(30px);
    }
    
    @keyframes fadeInUp {
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
    
    .skill-card, .project-card, .timeline-card, .info-card, .testimonial-card {
        opacity: 0;
    }
    
    .focused .form-label {
        transform: translateY(-25px);
        font-size: 0.9rem;
        color: var(--primary-color);
    }
    
    .form-label {
        transition: all 0.3s ease;
        display: block;
        margin-bottom: 8px;
    }
    
    .preloader-letter {
        background: var(--gradient-primary);
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
        background-clip: text;
    }
    
    .particle {
        will-change: transform;
    }
    
    @media (max-width: 768px) {
        .hero-visual {
            transform: none !important;
        }
    }
    
    [data-theme="light"] {
        --dark-bg: #ffffff;
        --darker-bg: #f5f5f7;
        --card-bg: #ffffff;
        --card-bg-light: #f8f9fa;
        --text-primary: #1a1a1a;
        --text-secondary: #666666;
        --text-muted: #888888;
        --border-color: rgba(0, 0, 0, 0.1);
        --border-light: rgba(0, 0, 0, 0.08);
    }
    
    [data-theme="light"] .navbar {
        background-color: rgba(255, 255, 255, 0.95);
    }
    
    [data-theme="light"] body::before {
        background: radial-gradient(circle at 20% 50%, rgba(99, 102, 241, 0.05) 0%, transparent 50%),
                    radial-gradient(circle at 80% 20%, rgba(14, 165, 233, 0.05) 0%, transparent 50%);
    }
    
    [data-theme="light"] .code-window {
        background-color: #f8f9fa;
    }
    
    [data-theme="light"] .window-header {
        background-color: #e9ecef;
    }
    
    .cursor-dot, .cursor-outline {
        pointer-events: none;
        position: fixed;
        z-index: 9999;
        mix-blend-mode: difference;
    }
    
    .btn-submit:disabled {
        opacity: 0.7;
        cursor: not-allowed;
    }
    
    .fa-spin {
        animation: spin 1s linear infinite;
    }
    
    @keyframes spin {
        0% { transform: rotate(0deg); }
        100% { transform: rotate(360deg); }
    }
`;
document.head.appendChild(style);

// Initialize theme
if (!document.documentElement.hasAttribute('data-theme')) {
    document.documentElement.setAttribute('data-theme', 'dark');
}

// Add resize handler
window.addEventListener('resize', () => {
    if (window.innerWidth > 992) {
        const navMenu = document.getElementById('nav-menu');
        const navToggle = document.getElementById('nav-toggle');
        navMenu.classList.remove('active');
        navToggle.classList.remove('active');
        document.body.style.overflow = 'visible';
    }
});

// Add keyboard navigation
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        const navMenu = document.getElementById('nav-menu');
        const navToggle = document.getElementById('nav-toggle');
        navMenu.classList.remove('active');
        navToggle.classList.remove('active');
        document.body.style.overflow = 'visible';
    }
    
    if (e.key === 'Tab') {
        const cursorDot = document.getElementById('cursor-dot');
        cursorDot.style.opacity = '0.5';
        
        setTimeout(() => {
            cursorDot.style.opacity = '1';
        }, 100);
    }
});

// Performance optimization
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

// Initialize service worker for PWA
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('/sw.js').catch(error => {
            console.log('Service Worker registration failed:', error);
        });
    });
}

// Add viewport units fix for mobile
function setViewportUnits() {
    const vh = window.innerHeight * 0.01;
    const vw = window.innerWidth * 0.01;
    document.documentElement.style.setProperty('--vh', `${vh}px`);
    document.documentElement.style.setProperty('--vw', `${vw}px`);
}

window.addEventListener('resize', setViewportUnits);
window.addEventListener('orientationchange', setViewportUnits);
setViewportUnits();

// Add print styles
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

// Add loading optimization
const images = document.querySelectorAll('img');
images.forEach(img => {
    img.loading = 'lazy';
    img.addEventListener('load', () => {
        img.classList.add('loaded');
    });
});

// Add intersection observer for images
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

// Add performance metrics
window.addEventListener('load', () => {
    const loadTime = performance.now();
    console.log(`Page loaded in ${loadTime}ms`);
    
    if (loadTime > 3000) {
        const heavyElements = document.querySelectorAll('.floating-shapes, .particles-container');
        heavyElements.forEach(el => {
            if (window.innerWidth < 768) {
                el.style.display = 'none';
            }
        });
    }
});

// Add error handling
window.addEventListener('error', (e) => {
    console.error('Error occurred:', e.error);
});

// Add offline detection
window.addEventListener('online', () => {
    document.body.classList.remove('offline');
    showNotification('Back online!', 'success');
});

window.addEventListener('offline', () => {
    document.body.classList.add('offline');
    showNotification('You are offline. Some features may not work.', 'warning');
});

function showNotification(message, type) {
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.textContent = message;
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        padding: 15px 25px;
        background: var(--gradient-primary);
        color: white;
        border-radius: var(--radius-md);
        z-index: 10000;
        animation: slideIn 0.3s ease;
    `;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.style.animation = 'slideOut 0.3s ease';
        setTimeout(() => {
            document.body.removeChild(notification);
        }, 300);
    }, 3000);
}

// Add CSS for notifications
const notificationStyles = document.createElement('style');
notificationStyles.textContent = `
    @keyframes slideIn {
        from {
            transform: translateX(100%);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    @keyframes slideOut {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(100%);
            opacity: 0;
        }
    }
    
    .notification-success {
        background: var(--gradient-primary) !important;
    }
    
    .notification-warning {
        background: linear-gradient(135deg, #f59e0b 0%, #fbbf24 100%) !important;
    }
    
    .offline .navbar {
        background: linear-gradient(135deg, #ef4444 0%, #dc2626 100%) !important;
    }
`;
document.head.appendChild(notificationStyles);

// Add clipboard functionality for email
document.querySelectorAll('.detail-value, .info-text').forEach(element => {
    if (element.textContent.includes('@')) {
        element.style.cursor = 'pointer';
        element.title = 'Click to copy';
        
        element.addEventListener('click', () => {
            const text = element.textContent;
            navigator.clipboard.writeText(text).then(() => {
                const originalText = element.textContent;
                element.textContent = 'Copied!';
                element.style.color = 'var(--success-color)';
                
                setTimeout(() => {
                    element.textContent = originalText;
                    element.style.color = '';
                }, 2000);
            });
        });
    }
});

// Add scroll progress indicator
const scrollProgress = document.createElement('div');
scrollProgress.className = 'scroll-progress';
scrollProgress.style.cssText = `
    position: fixed;
    top: 0;
    left: 0;
    width: 0%;
    height: 3px;
    background: var(--gradient-primary);
    z-index: 1001;
    transition: width 0.1s ease;
`;
document.body.appendChild(scrollProgress);

window.addEventListener('scroll', () => {
    const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
    const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const scrolled = (winScroll / height) * 100;
    scrollProgress.style.width = scrolled + '%';
});

// Add hover effects for all interactive elements
document.querySelectorAll('a, button, [role="button"]').forEach(element => {
    element.addEventListener('mouseenter', () => {
        element.style.transform = 'translateY(-2px)';
    });
    
    element.addEventListener('mouseleave', () => {
        element.style.transform = 'translateY(0)';
    });
});

// Add focus styles for accessibility
document.addEventListener('focusin', (e) => {
    if (e.target.matches('a, button, input, textarea, select')) {
        e.target.style.outline = '2px solid var(--primary-color)';
        e.target.style.outlineOffset = '2px';
    }
});

document.addEventListener('focusout', (e) => {
    if (e.target.matches('a, button, input, textarea, select')) {
        e.target.style.outline = 'none';
    }
});

// Add reduced motion support
const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
if (reduceMotion.matches) {
    document.querySelectorAll('*').forEach(el => {
        el.style.animationDuration = '0.001ms !important';
        el.style.animationIterationCount = '1 !important';
        el.style.transitionDuration = '0.001ms !important';
    });
}

// Initialize all animations after load
window.addEventListener('load', () => {
    document.body.classList.add('page-loaded');
    
    setTimeout(() => {
        document.querySelectorAll('.animate-on-load').forEach(el => {
            el.classList.add('animated');
        });
    }, 100);
});

// Export functions for debugging
window.portfolioDebug = {
    reload: () => window.location.reload(),
    theme: (theme) => {
        document.documentElement.setAttribute('data-theme', theme);
        localStorage.setItem('theme', theme);
    },
    stats: () => {
        document.querySelectorAll('.stat-number').forEach(stat => {
            stat.textContent = stat.getAttribute('data-count');
        });
    }
};
