// ===== Wait for DOM to be ready =====
document.addEventListener('DOMContentLoaded', function() {
    
    // ===== DOM Elements =====
    const navbar = document.getElementById('navbar');
    const navToggle = document.getElementById('navToggle');
    const navMenu = document.getElementById('navMenu');
    const themeToggle = document.getElementById('themeToggle');
    const themeIcon = document.getElementById('themeIcon');
    const langToggle = document.getElementById('langToggle');
    const heroImage = document.getElementById('heroImage');

    // ===== Theme Management =====
    function getPreferredTheme() {
        const saved = localStorage.getItem('optimuspc-theme');
        if (saved) return saved;
        return window.matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark';
    }

    function setTheme(theme) {
        document.documentElement.setAttribute('data-theme', theme);
        localStorage.setItem('optimuspc-theme', theme);
        if (themeIcon) {
            themeIcon.textContent = theme === 'dark' ? '🌙' : '☀️';
        }
        if (heroImage) {
            heroImage.src = theme === 'dark' ? 'images/theme-dark.png' : 'images/theme-light.png';
        }
    }

    // Initialize theme
    setTheme(getPreferredTheme());

    // Theme toggle handler
    if (themeToggle) {
        themeToggle.addEventListener('click', function() {
            const current = document.documentElement.getAttribute('data-theme');
            setTheme(current === 'dark' ? 'light' : 'dark');
        });
    }

    // ===== Language Toggle =====
    if (langToggle) {
        langToggle.addEventListener('click', function() {
            if (window.i18n && typeof window.i18n.toggleLanguage === 'function') {
                window.i18n.toggleLanguage();
            }
        });
    }

    // ===== Navbar Scroll Effect =====
    window.addEventListener('scroll', function() {
        const currentScroll = window.pageYOffset || document.documentElement.scrollTop;
        
        if (navbar) {
            if (currentScroll > 50) {
                navbar.classList.add('scrolled');
            } else {
                navbar.classList.remove('scrolled');
            }
        }
    });

    // ===== Enhanced Mobile Navigation =====
    if (navToggle && navMenu) {
        navToggle.addEventListener('click', function() {
            const isOpen = navToggle.classList.toggle('active');
            navMenu.classList.toggle('active');
            document.body.classList.toggle('nav-open');
            
            // Update ARIA attributes
            navToggle.setAttribute('aria-expanded', isOpen);
            
            // Focus management for accessibility
            if (isOpen) {
                // Focus first menu item
                const firstMenuItem = navMenu.querySelector('.nav-link');
                if (firstMenuItem) {
                    setTimeout(() => firstMenuItem.focus(), 100);
                }
            }
        });
    }

    // Close mobile menu when clicking outside
    document.addEventListener('click', function(e) {
        if (navToggle && navMenu && 
            navToggle.classList.contains('active') &&
            !navMenu.contains(e.target) && 
            !navToggle.contains(e.target)) {
            navToggle.classList.remove('active');
            navMenu.classList.remove('active');
            document.body.classList.remove('nav-open');
            navToggle.setAttribute('aria-expanded', 'false');
        }
    });

    // Keyboard navigation for mobile menu
    document.addEventListener('keydown', function(e) {
        if (navToggle && navMenu && navToggle.classList.contains('active')) {
            if (e.key === 'Escape') {
                navToggle.classList.remove('active');
                navMenu.classList.remove('active');
                document.body.classList.remove('nav-open');
                navToggle.setAttribute('aria-expanded', 'false');
                navToggle.focus();
            }
        }
    });

    // Close mobile menu when clicking a link
    var navLinks = document.querySelectorAll('.nav-link, .nav-btn-primary');
    for (var i = 0; i < navLinks.length; i++) {
        navLinks[i].addEventListener('click', function() {
            if (navToggle) navToggle.classList.remove('active');
            if (navMenu) navMenu.classList.remove('active');
            document.body.classList.remove('nav-open');
        });
    }

    // ===== Screenshots Tabs =====
    var screenshotBtns = document.querySelectorAll('.screenshot-nav-btn');
    var screenshotSlides = document.querySelectorAll('.screenshot-slide');

    for (var j = 0; j < screenshotBtns.length; j++) {
        screenshotBtns[j].addEventListener('click', function() {
            var tab = this.getAttribute('data-tab');
            
            // Remove active from all buttons
            for (var k = 0; k < screenshotBtns.length; k++) {
                screenshotBtns[k].classList.remove('active');
            }
            
            // Remove active from all slides
            for (var l = 0; l < screenshotSlides.length; l++) {
                screenshotSlides[l].classList.remove('active');
            }
            
            // Add active to clicked button
            this.classList.add('active');
            
            // Add active to corresponding slide
            var targetSlide = document.querySelector('[data-slide="' + tab + '"]');
            if (targetSlide) {
                targetSlide.classList.add('active');
            }
        });
    }

    // ===== FAQ Accordion =====
    var faqItems = document.querySelectorAll('.faq-item');

    for (var m = 0; m < faqItems.length; m++) {
        var trigger = faqItems[m].querySelector('.faq-trigger');
        
        if (trigger) {
            (function(item) {
                trigger.addEventListener('click', function() {
                    // Close others
                    for (var n = 0; n < faqItems.length; n++) {
                        if (faqItems[n] !== item) {
                            faqItems[n].classList.remove('active');
                        }
                    }
                    // Toggle current
                    item.classList.toggle('active');
                });
            })(faqItems[m]);
        }
    }

    // ===== Smooth Scroll =====
    var anchors = document.querySelectorAll('a[href^="#"]');
    for (var o = 0; o < anchors.length; o++) {
        anchors[o].addEventListener('click', function(e) {
            var href = this.getAttribute('href');
            if (href === '#' || href === '') return;
            
            var target = document.querySelector(href);
            
            if (target) {
                e.preventDefault();
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    }

    // ===== Intersection Observer for Animations =====
    if ('IntersectionObserver' in window) {
        var observerOptions = {
            root: null,
            rootMargin: '0px',
            threshold: 0.1
        };

        var animateOnScroll = new IntersectionObserver(function(entries) {
            entries.forEach(function(entry) {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animate-in');
                    animateOnScroll.unobserve(entry.target);
                }
            });
        }, observerOptions);

        // Apply to animatable elements
        var animatables = document.querySelectorAll('.feature-card, .comparison-card, .faq-item, .screenshot-slide');
        for (var p = 0; p < animatables.length; p++) {
            animatables[p].classList.add('animate-ready');
            animateOnScroll.observe(animatables[p]);
        }

        // ===== Comparison Bars Animation =====
        var barsObserver = new IntersectionObserver(function(entries) {
            entries.forEach(function(entry) {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animate-bars');
                    barsObserver.unobserve(entry.target);
                }
            });
        }, { threshold: 0.3 });

        var comparisonCards = document.querySelectorAll('.comparison-card');
        for (var q = 0; q < comparisonCards.length; q++) {
            barsObserver.observe(comparisonCards[q]);
        }
    }

    // ===== Handle Window Resize =====
    var resizeTimer;
    window.addEventListener('resize', function() {
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(function() {
            if (window.innerWidth > 768) {
                if (navToggle) navToggle.classList.remove('active');
                if (navMenu) navMenu.classList.remove('active');
                document.body.classList.remove('nav-open');
            }
        }, 250);
    });

    // ===== Feedback Modal System =====
    const feedbackModal = document.getElementById('feedbackModal');
    const feedbackBtnFooter = document.getElementById('feedbackBtnFooter');
    const floatingFeedbackBtn = document.getElementById('floatingFeedbackBtn');
    const feedbackNavBtn = document.getElementById('feedbackNavBtn');
    const closeFeedbackBtn = document.getElementById('closeFeedbackBtn');
    const cancelFeedbackBtn = document.getElementById('cancelFeedbackBtn');
    const feedbackForm = document.getElementById('feedbackForm');
    const submitFeedbackBtn = document.getElementById('submitFeedbackBtn');
    const feedbackStatus = document.getElementById('feedbackStatus');
    const feedbackMessage = document.getElementById('feedbackMessage');
    const charCount = document.getElementById('charCount');

    // Discord Webhook URL
    const DISCORD_WEBHOOK_URL = 'https://discord.com/api/webhooks/1469066793669759098/DtBxho4OqUjkoREsZofMIZu0gCif0EtOwOBzw4WYkTes6bCtX5kAWY92kLHymSpglCKu';

    // Character counter
    if (feedbackMessage && charCount) {
        feedbackMessage.addEventListener('input', function() {
            const len = this.value.length;
            charCount.textContent = len;
            if (len > 500) {
                charCount.style.color = '#ef4444';
            } else {
                charCount.style.color = '';
            }
        });
    }

    function openFeedbackModal() {
        if (feedbackModal) {
            feedbackModal.classList.remove('hidden');
            document.body.style.overflow = 'hidden';
        }
    }

    function closeFeedbackModal() {
        if (feedbackModal) {
            feedbackModal.classList.add('hidden');
            document.body.style.overflow = '';
            if (feedbackForm) feedbackForm.reset();
            if (charCount) charCount.textContent = '0';
            if (feedbackStatus) {
                feedbackStatus.textContent = '';
                feedbackStatus.className = 'feedback-status';
            }
        }
    }

    function showFeedbackStatus(message, type = 'success') {
        if (feedbackStatus) {
            feedbackStatus.textContent = message;
            feedbackStatus.className = `feedback-status ${type}`;
        }
    }

    async function submitFeedback(e) {
        e.preventDefault();

        const message = document.getElementById('feedbackMessage').value.trim();
        const email = document.getElementById('feedbackEmail').value.trim();
        const typeRadio = document.querySelector('input[name="feedbackType"]:checked');
        const type = typeRadio ? typeRadio.value : 'general';

        if (!message) {
            showFeedbackStatus('Please enter your message', 'error');
            return;
        }

        submitFeedbackBtn.disabled = true;
        showFeedbackStatus('Sending your feedback...', 'loading');

        try {
            const embed = {
                title: `📨 New ${type === 'bug' ? '🐛 Bug Report' : type === 'feature' ? '⭐ Feature Request' : type === 'suggestion' ? '💡 Suggestion' : '💬 Feedback'}`,
                description: message,
                color: type === 'bug' ? 0xEF4444 : type === 'feature' ? 0xF59E0B : type === 'suggestion' ? 0x22C55E : 0x6496FF,
                fields: [
                    {
                        name: 'Type',
                        value: type.charAt(0).toUpperCase() + type.slice(1),
                        inline: true
                    },
                    {
                        name: 'Contact Email',
                        value: email || 'Not provided',
                        inline: true
                    },
                    {
                        name: 'Timestamp',
                        value: new Date().toISOString(),
                        inline: false
                    }
                ],
                footer: {
                    text: 'OptimusPC Feedback System'
                }
            };

            const response = await fetch(DISCORD_WEBHOOK_URL, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    embeds: [embed]
                })
            });

            if (response.ok || response.status === 204) {
                showFeedbackStatus('✅ Thank you! Your feedback has been received and will be reviewed by our team.', 'success');
                setTimeout(closeFeedbackModal, 2500);
            } else {
                throw new Error('Failed to send feedback');
            }
        } catch (error) {
            console.error('Feedback submission error:', error);
            showFeedbackStatus('❌ Error sending feedback. Please try again later.', 'error');
        } finally {
            submitFeedbackBtn.disabled = false;
        }
    }

    // Event Listeners
    if (feedbackBtnFooter) {
        feedbackBtnFooter.addEventListener('click', openFeedbackModal);
    }

    if (floatingFeedbackBtn) {
        floatingFeedbackBtn.addEventListener('click', openFeedbackModal);
    }

    if (feedbackNavBtn) {
        feedbackNavBtn.addEventListener('click', openFeedbackModal);
    }

    if (closeFeedbackBtn) {
        closeFeedbackBtn.addEventListener('click', closeFeedbackModal);
    }

    if (cancelFeedbackBtn) {
        cancelFeedbackBtn.addEventListener('click', closeFeedbackModal);
    }

    if (feedbackModal) {
        feedbackModal.addEventListener('click', (e) => {
            if (e.target === feedbackModal) {
                closeFeedbackModal();
            }
        });
    }

    if (feedbackForm) {
        feedbackForm.addEventListener('submit', submitFeedback);
    }

    // ===== Console Easter Egg =====
    console.log('%c🚀 OptimusPC v3.4', 'font-size: 24px; font-weight: bold;');
    console.log('%cOptimize your PC to maximum performance', 'font-size: 14px; color: #888;');

});
