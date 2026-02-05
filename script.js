// ===== DOM Elements =====
const navbar = document.getElementById('navbar');
const navToggle = document.getElementById('navToggle');
const navMenu = document.getElementById('navMenu');
const themeToggle = document.getElementById('themeToggle');
const themeIcon = document.getElementById('themeIcon');
const langToggle = document.getElementById('langToggle');
const heroImage = document.getElementById('heroImage');

// ===== Theme Management =====
const getPreferredTheme = () => {
    const saved = localStorage.getItem('optimuspc-theme');
    if (saved) return saved;
    return window.matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark';
};

const setTheme = (theme) => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('optimuspc-theme', theme);
    themeIcon.textContent = theme === 'dark' ? '🌙' : '☀️';
    
    // Update hero image based on theme
    if (heroImage) {
        heroImage.src = theme === 'dark' ? 'images/theme-dark.png' : 'images/theme-light.png';
    }
};

// Initialize theme
setTheme(getPreferredTheme());

// Theme toggle handler
themeToggle.addEventListener('click', () => {
    const current = document.documentElement.getAttribute('data-theme');
    setTheme(current === 'dark' ? 'light' : 'dark');
});

// ===== Language Toggle =====
langToggle.addEventListener('click', () => {
    if (window.i18n) {
        window.i18n.toggleLanguage();
    }
});

// ===== Navbar Scroll Effect =====
let lastScroll = 0;

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
    
    lastScroll = currentScroll;
});

// ===== Mobile Navigation Toggle =====
navToggle.addEventListener('click', () => {
    navToggle.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// Close mobile menu when clicking a link
document.querySelectorAll('.nav-link, .nav-btn-primary').forEach(link => {
    link.addEventListener('click', () => {
        navToggle.classList.remove('active');
        navMenu.classList.remove('active');
    });
});

// ===== Screenshots Tabs =====
const screenshotBtns = document.querySelectorAll('.screenshot-nav-btn');
const screenshotSlides = document.querySelectorAll('.screenshot-slide');

screenshotBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        const tab = btn.dataset.tab;
        
        // Remove active from all
        screenshotBtns.forEach(b => b.classList.remove('active'));
        screenshotSlides.forEach(s => s.classList.remove('active'));
        
        // Add active to current
        btn.classList.add('active');
        document.querySelector(`[data-slide="${tab}"]`).classList.add('active');
    });
});

// ===== FAQ Accordion =====
const faqItems = document.querySelectorAll('.faq-item');

faqItems.forEach(item => {
    const trigger = item.querySelector('.faq-trigger');
    
    trigger.addEventListener('click', () => {
        // Close others
        faqItems.forEach(i => {
            if (i !== item) i.classList.remove('active');
        });
        
        // Toggle current
        item.classList.toggle('active');
    });
});

// ===== Smooth Scroll =====
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// ===== Intersection Observer for Animations =====
const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.1
};

const animateOnScroll = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
            animateOnScroll.unobserve(entry.target);
        }
    });
}, observerOptions);

// Apply to animatable elements
document.querySelectorAll('.feature-card, .comparison-card, .faq-item').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    animateOnScroll.observe(el);
});

// ===== Comparison Bars Animation =====
const barsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const bars = entry.target.querySelectorAll('.bar-fill');
            bars.forEach((bar, index) => {
                setTimeout(() => {
                    bar.style.width = bar.style.getPropertyValue('--value');
                }, index * 200);
            });
            barsObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.3 });

document.querySelectorAll('.comparison-card').forEach(card => {
    const bars = card.querySelectorAll('.bar-fill');
    bars.forEach(bar => {
        bar.style.width = '0';
    });
    barsObserver.observe(card);
});

// ===== Stagger Animation for Grids =====
const staggerObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const children = entry.target.children;
            Array.from(children).forEach((child, index) => {
                child.style.transitionDelay = `${index * 0.08}s`;
            });
            staggerObserver.unobserve(entry.target);
        }
    });
}, observerOptions);

document.querySelectorAll('.features-grid, .comparison-grid').forEach(grid => {
    staggerObserver.observe(grid);
});

// ===== Handle Window Resize =====
let resizeTimer;
window.addEventListener('resize', () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => {
        if (window.innerWidth > 768) {
            navToggle.classList.remove('active');
            navMenu.classList.remove('active');
        }
    }, 250);
});

// ===== Console Easter Egg =====
console.log('%c🚀 OptimusPC v3.4', 'font-size: 24px; font-weight: bold;');
console.log('%cOptimize your PC to maximum performance', 'font-size: 14px; color: #888;');

