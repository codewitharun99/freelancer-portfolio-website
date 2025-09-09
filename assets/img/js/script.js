// Theme Management
class ThemeManager {
    constructor() {
        this.theme = localStorage.getItem('theme') || 'light';
        this.themeToggle = document.getElementById('theme-toggle');
        this.themeIcon = document.getElementById('theme-icon');

        this.init();
    }

    init() {
        this.setTheme(this.theme);
        this.themeToggle.addEventListener('click', () => this.toggleTheme());
    }

    setTheme(theme) {
        this.theme = theme;
        document.documentElement.setAttribute('data-theme', theme);
        localStorage.setItem('theme', theme);

        // Update icon
        if (theme === 'dark') {
            this.themeIcon.className = 'fas fa-sun';
        } else {
            this.themeIcon.className = 'fas fa-moon';
        }
    }

    toggleTheme() {
        const newTheme = this.theme === 'light' ? 'dark' : 'light';
        this.setTheme(newTheme);
    }
}

// Mobile Navigation
class MobileNavigation {
    constructor() {
        this.mobileMenu = document.getElementById('mobile-menu');
        this.navMenu = document.getElementById('nav-menu');
        this.navLinks = document.querySelectorAll('.nav-link');

        this.init();
    }

    init() {
        this.mobileMenu.addEventListener('click', () => this.toggleMenu());

        // Close menu when clicking on links
        this.navLinks.forEach(link => {
            link.addEventListener('click', () => this.closeMenu());
        });

        // Close menu when clicking outside
        document.addEventListener('click', (e) => {
            if (!this.mobileMenu.contains(e.target) && !this.navMenu.contains(e.target)) {
                this.closeMenu();
            }
        });
    }

    toggleMenu() {
        this.mobileMenu.classList.toggle('active');
        this.navMenu.classList.toggle('active');
    }

    closeMenu() {
        this.mobileMenu.classList.remove('active');
        this.navMenu.classList.remove('active');
    }
}

// Navbar Scroll Effect
class NavbarScrollEffect {
    constructor() {
        this.navbar = document.getElementById('navbar');
        this.init();
    }

    init() {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 50) {
                this.navbar.classList.add('scrolled');
            } else {
                this.navbar.classList.remove('scrolled');
            }
        });
    }
}

// Typing Animation
class TypingAnimation {
    constructor(element, texts, speed = 100, deleteSpeed = 50, pauseTime = 2000) {
        this.element = element;
        this.texts = texts;
        this.speed = speed;
        this.deleteSpeed = deleteSpeed;
        this.pauseTime = pauseTime;
        this.textIndex = 0;
        this.charIndex = 0;
        this.isDeleting = false;

        this.init();
    }

    init() {
        this.type();
    }

    type() {
        const currentText = this.texts[this.textIndex];

        if (this.isDeleting) {
            this.element.textContent = currentText.substring(0, this.charIndex - 1);
            this.charIndex--;
        } else {
            this.element.textContent = currentText.substring(0, this.charIndex + 1);
            this.charIndex++;
        }

        let typeSpeed = this.isDeleting ? this.deleteSpeed : this.speed;

        if (!this.isDeleting && this.charIndex === currentText.length) {
            typeSpeed = this.pauseTime;
            this.isDeleting = true;
        } else if (this.isDeleting && this.charIndex === 0) {
            this.isDeleting = false;
            this.textIndex = (this.textIndex + 1) % this.texts.length;
        }

        setTimeout(() => this.type(), typeSpeed);
    }
}

// Smooth Scrolling
class SmoothScrolling {
    constructor() {
        this.init();
    }

    init() {
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', (e) => {
                e.preventDefault();
                const target = document.querySelector(anchor.getAttribute('href'));
                if (target) {
                    const offsetTop = target.offsetTop - 80;
                    window.scrollTo({
                        top: offsetTop,
                        behavior: 'smooth'
                    });
                }
            });
        });
    }
}

// Scroll Animations
class ScrollAnimations {
    constructor() {
        this.observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };
        this.observer = new IntersectionObserver(
            (entries) => this.handleIntersection(entries),
            this.observerOptions
        );

        this.init();
    }

    init() {
        // Observe elements for animation
        const animateElements = document.querySelectorAll('.animate-on-scroll');
        animateElements.forEach(el => this.observer.observe(el));

        // Animate skill levels when about section is visible
        const aboutSection = document.getElementById('about');
        if (aboutSection) {
            this.observer.observe(aboutSection);
        }
    }

    handleIntersection(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animated');

                // Animate skill levels
                if (entry.target.id === 'about') {
                    this.animateSkillLevels();
                }
            }
        });
    }

    animateSkillLevels() {
        const skillLevels = document.querySelectorAll('.skill-level');
        skillLevels.forEach((level, index) => {
            setTimeout(() => {
                const percentage = level.getAttribute('data-level');
                level.style.width = `${percentage}%`;
            }, index * 100);
        });
    }
}

// Projects Filter
class ProjectsFilter {
    constructor() {
        this.filterButtons = document.querySelectorAll('.filter-btn');
        this.projectCards = document.querySelectorAll('.project-card');

        this.init();
    }

    init() {
        this.filterButtons.forEach(btn => {
            btn.addEventListener('click', () => this.filterProjects(btn));
        });
    }

filterProjects(activeBtn) {
    // Update active button
    this.filterButtons.forEach(btn => btn.classList.remove('active'));
    activeBtn.classList.add('active');

    const filter = activeBtn.getAttribute('data-filter');

    // Filter projects
    this.projectCards.forEach(card => {
        const category = card.getAttribute('data-category');

        if (filter === 'all' || category === filter) {
            card.classList.remove('hidden');
        } else {
            card.classList.add('hidden');
        }
    });
}
}

// Testimonials Slider
class TestimonialsSlider {
    constructor() {
        this.testimonials = document.querySelectorAll('.testimonial-card');
        this.dots = document.querySelectorAll('.dot');
        this.prevBtn = document.getElementById('prev-testimonial');
        this.nextBtn = document.getElementById('next-testimonial');
        this.currentSlide = 0;
        this.autoSlideInterval = null;

        this.init();
    }

    init() {
        this.prevBtn.addEventListener('click', () => this.prevSlide());
        this.nextBtn.addEventListener('click', () => this.nextSlide());

        this.dots.forEach((dot, index) => {
            dot.addEventListener('click', () => this.goToSlide(index));
        });

        this.startAutoSlide();

        // Pause auto-slide on hover
        const slider = document.querySelector('.testimonials-slider');
        slider.addEventListener('mouseenter', () => this.stopAutoSlide());
        slider.addEventListener('mouseleave', () => this.startAutoSlide());
    }

    goToSlide(index) {
        // Remove active class from all
        this.testimonials.forEach(testimonial => testimonial.classList.remove('active'));
        this.dots.forEach(dot => dot.classList.remove('active'));

        // Add active class to current
        this.testimonials[index].classList.add('active');
        this.dots[index].classList.add('active');

        this.currentSlide = index;
    }

    nextSlide() {
        const nextIndex = (this.currentSlide + 1) % this.testimonials.length;
        this.goToSlide(nextIndex);
    }

    prevSlide() {
        const prevIndex = (this.currentSlide - 1 + this.testimonials.length) % this.testimonials.length;
        this.goToSlide(prevIndex);
    }

    startAutoSlide() {
        this.autoSlideInterval = setInterval(() => this.nextSlide(), 5000);
    }

    stopAutoSlide() {
        if (this.autoSlideInterval) {
            clearInterval(this.autoSlideInterval);
        }
    }
}

// FAQ Accordion
class FAQAccordion {
    constructor() {
        this.faqItems = document.querySelectorAll('.faq-item');
        this.init();
    }

    init() {
        this.faqItems.forEach(item => {
            const question = item.querySelector('.faq-question');
            question.addEventListener('click', () => this.toggleFAQ(item));
        });
    }

    toggleFAQ(clickedItem) {
        const isActive = clickedItem.classList.contains('active');

        // Close all FAQ items
        this.faqItems.forEach(item => {
            item.classList.remove('active');
        });

        // Open clicked item if it wasn't active
        if (!isActive) {
            clickedItem.classList.add('active');
        }
    }
}

// Contact Form
class ContactForm {
    constructor() {
        this.form = document.getElementById('contact-form');
        this.submitBtn = this.form.querySelector('button[type="submit"]');

        // EmailJS configuration - Replace with your actual IDs
        this.emailjsConfig = {
            serviceID: 'YOUR_SERVICE_ID',
            templateID: 'YOUR_TEMPLATE_ID',
            userID: 'YOUR_USER_ID'          
        };

        this.init();
    }

    init() {
        // Initialize EmailJS
        if (typeof emailjs !== 'undefined') {
            emailjs.init(this.emailjsConfig.userID);
        }

        this.form.addEventListener('submit', (e) => this.handleSubmit(e));

        // Real-time validation
        const inputs = this.form.querySelectorAll('input, textarea, select');
        inputs.forEach(input => {
            input.addEventListener('blur', () => this.validateField(input));
            input.addEventListener('input', () => this.clearValidation(input));
        });
    }

    async handleSubmit(e) {
        e.preventDefault();

        if (!this.validateForm()) {
            return;
        }

        this.setLoadingState(true);

        try {
            // Check if EmailJS is available
            if (typeof emailjs === 'undefined') {
                throw new Error('EmailJS not loaded');
            }

            // Get form data
            const formData = new FormData(this.form);
            const templateParams = {
                from_name: formData.get('name'),
                from_email: formData.get('email'),
                subject: formData.get('subject'),
                budget: formData.get('budget'),
                message: formData.get('message')
            };

            // Send email via EmailJS
            await emailjs.send(
                this.emailjsConfig.serviceID,
                this.emailjsConfig.templateID,
                templateParams
            );

            this.showNotification('Message sent successfully! I\'ll get back to you soon.', 'success');
            this.form.reset();

        } catch (error) {
            console.error('Email Error:', error);
            this.showNotification('Thank you for your message! (Demo mode - EmailJS not configured)', 'info');
            this.form.reset();
        } finally {
            this.setLoadingState(false);
        }
    }

    validateForm() {
        const requiredFields = this.form.querySelectorAll('[required]');
        let isValid = true;

        requiredFields.forEach(field => {
            if (!this.validateField(field)) {
                isValid = false;
            }
        });

        return isValid;
    }

    validateField(field) {
        const value = field.value.trim();
        let isValid = true;

        // Clear previous validation
        this.clearValidation(field);

        // Required field validation
        if (field.hasAttribute('required') && !value) {
            this.setFieldError(field, 'This field is required');
            isValid = false;
        }

        // Email validation
        if (field.type === 'email' && value) {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(value)) {
                this.setFieldError(field, 'Please enter a valid email address');
                isValid = false;
            }
        }

        // Set success state if valid
        if (isValid && value) {
            field.classList.add('success');
        }

        return isValid;
    }

    setFieldError(field, message) {
        field.classList.add('error');

        // Remove existing error message
        const existingError = field.parentNode.querySelector('.error-message');
        if (existingError) {
            existingError.remove();
        }

        // Add error message
        const errorElement = document.createElement('span');
        errorElement.className = 'error-message';
        errorElement.textContent = message;
        field.parentNode.appendChild(errorElement);
    }

    clearValidation(field) {
        field.classList.remove('error', 'success');
        const errorMessage = field.parentNode.querySelector('.error-message');
        if (errorMessage) {
            errorMessage.remove();
        }
    }

    setLoadingState(loading) {
        if (loading) {
            this.submitBtn.classList.add('loading');
            this.submitBtn.disabled = true;
        } else {
            this.submitBtn.classList.remove('loading');
            this.submitBtn.disabled = false;
        }
    }

    showNotification(message, type = 'info') {
        // Remove existing notification
        const existingNotification = document.querySelector('.notification');
        if (existingNotification) {
            existingNotification.remove();
        }

        // Create notification
        const notification = document.createElement('div');
        notification.className = `notification ${type}`;
        notification.textContent = message;

        // Add to DOM
        document.body.appendChild(notification);

        // Show notification
        setTimeout(() => notification.classList.add('show'), 100);

        // Hide notification after 5 seconds
        setTimeout(() => {
            notification.classList.remove('show');
            setTimeout(() => notification.remove(), 300);
        }, 5000);
    }
}

// Back to Top Button
class BackToTop {
    constructor() {
        this.button = document.getElementById('back-to-top');
        this.init();
    }

    init() {
        window.addEventListener('scroll', () => this.toggleVisibility());
        this.button.addEventListener('click', () => this.scrollToTop());
    }

    toggleVisibility() {
        if (window.scrollY > 300) {
            this.button.classList.add('visible');
        } else {
            this.button.classList.remove('visible');
        }
    }

    scrollToTop() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    }
}

// Parallax Effects
class ParallaxEffects {
    constructor() {
        this.elements = document.querySelectorAll('.floating-element');
        this.init();
    }

    init() {
        window.addEventListener('scroll', () => this.updateParallax());
    }

    updateParallax() {
        const scrolled = window.pageYOffset;

        this.elements.forEach((element, index) => {
            const speed = 0.5 + (index * 0.1);
            const yPos = -(scrolled * speed);
            element.style.transform = `translateY(${yPos}px)`;
        });
    }
}

// Initialize all components when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    // Hide loader after a delay
    setTimeout(() => {
        const loader = document.getElementById('loader');
        if (loader) {
            loader.style.opacity = '0';
            setTimeout(() => {
                loader.style.display = 'none';
            }, 500);
        }
    }, 1000);

    // Initialize core components
    new ThemeManager();
    new MobileNavigation();
    new NavbarScrollEffect();
    new SmoothScrolling();
    new ScrollAnimations();
    new ProjectsFilter();
    new TestimonialsSlider();
    new FAQAccordion();
    new ContactForm();
    new BackToTop();
    new ParallaxEffects();

    // Initialize typing animation
    const typingElement = document.getElementById('typing-text');
    if (typingElement) {
        const texts = [
            'Full Stack Developer',
            'UI/UX Designer',
            'Problem Solver',
            'Tech Enthusiast'
        ];
        new TypingAnimation(typingElement, texts);
    }
});

// Utility Functions
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

function throttle(func, limit) {
    let inThrottle;
    return function () {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    }
}

// Performance optimized scroll handler
const optimizedScrollHandler = throttle(() => {
    // Handle scroll-based animations here if needed
}, 16); // ~60fps

window.addEventListener('scroll', optimizedScrollHandler);

