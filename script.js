// Elite Running Coaching - JavaScript Functionality

let currentSlideIndex = 0;
const slides = document.querySelectorAll('.slide');
const dots = document.querySelectorAll('.slider-dot');

document.addEventListener('DOMContentLoaded', function() {
    // Initialize Feather Icons
    if (typeof feather !== 'undefined') {
        feather.replace();
    }

    // Initialize all functionality
    initNavigation();
    initScrollEffects();
    initFormHandling();
    initSmoothScrolling();
    initAnimations();
    initButtonHandlers();
    initPackageButtons();
    initNavbarScroll();

    // Initialize slideshow
    if (slides.length > 0) {
        showSlide(currentSlideIndex);
        // Start auto-slideshow
        setInterval(autoSlide, 5000);
    }

    // Global functions for slideshow controls
    window.changeSlide = changeSlide;
    window.currentSlide = currentSlideIndex;
    window.closeModal = closeModal;
});

// Slideshow functionality
function changeSlide(direction) {
    currentSlideIndex += direction;

    if (currentSlideIndex >= slides.length) {
        currentSlideIndex = 0;
    } else if (currentSlideIndex < 0) {
        currentSlideIndex = slides.length - 1;
    }

    showSlide(currentSlideIndex);
}

function currentSlide(index) {
    currentSlideIndex = index - 1;
    showSlide(currentSlideIndex);
}

function showSlide(index) {
    // Hide all slides
    slides.forEach(slide => slide.classList.remove('active'));
    dots.forEach(dot => dot.classList.remove('active'));

    // Show current slide
    if (slides[index]) {
        slides[index].classList.add('active');
    }
    if (dots[index]) {
        dots[index].classList.add('active');
    }
}

// Auto-advance slideshow
function autoSlide() {
    currentSlideIndex++;
    showSlide(currentSlideIndex);
}

// Button handlers for navigation
function initButtonHandlers() {
    // View Training Packages button
    const viewPackagesButtons = document.querySelectorAll('a[href="#packages"]');
    viewPackagesButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            const packagesSection = document.getElementById('packages');
            if (packagesSection) {
                packagesSection.scrollIntoView({ 
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Start Today button
    const startTodayButtons = document.querySelectorAll('a[href="#contact"]');
    startTodayButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            const contactSection = document.getElementById('contact');
            if (contactSection) {
                contactSection.scrollIntoView({ 
                    behavior: 'smooth',
                    block: 'start'
                });

                // Focus on the first form field after scroll
                setTimeout(() => {
                    const nameField = document.getElementById('name');
                    if (nameField) {
                        nameField.focus();
                    }
                }, 1000);
            }
        });
    });
}

// Navigation functionality
function initNavigation() {
    const navbar = document.getElementById('navbar');
    const navToggle = document.getElementById('nav-toggle');
    const navMenu = document.getElementById('nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');

    if (!navToggle || !navMenu) return;

    // Mobile menu toggle
    navToggle.addEventListener('click', function() {
        navToggle.classList.toggle('active');
        navMenu.classList.toggle('active');

        // Prevent body scroll when menu is open
        if (navMenu.classList.contains('active')) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }
    });

    // Close mobile menu when clicking on a link
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            navToggle.classList.remove('active');
            navMenu.classList.remove('active');
            document.body.style.overflow = '';
        });
    });

    // Close mobile menu when clicking outside
    document.addEventListener('click', function(e) {
        if (navbar && !navbar.contains(e.target)) {
            navToggle.classList.remove('active');
            navMenu.classList.remove('active');
            document.body.style.overflow = '';
        }
    });

    // Handle escape key for mobile menu
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            navToggle.classList.remove('active');
            navMenu.classList.remove('active');
            document.body.style.overflow = '';
        }
    });
}

// Scroll effects
function initScrollEffects() {
    const navbar = document.getElementById('navbar');
    const navLinks = document.querySelectorAll('.nav-link');
    const sections = document.querySelectorAll('section[id]');

    // Navbar scroll effect
    window.addEventListener('scroll', function() {
        if (navbar) {
            if (window.scrollY > 100) {
                navbar.classList.add('scrolled');
            } else {
                navbar.classList.remove('scrolled');
            }
        }

        // Update active navigation link
        updateActiveNavLink();
    });

    // Update active navigation link based on scroll position
    function updateActiveNavLink() {
        const scrollPosition = window.scrollY + 100;

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');

            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${sectionId}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }
}

// Smooth scrolling for navigation links
function initSmoothScrolling() {
    const navLinks = document.querySelectorAll('a[href^="#"]');

    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();

            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);

            if (targetSection) {
                const offsetTop = targetSection.offsetTop - 80; // Account for fixed navbar

                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// Form handling
function initFormHandling() {
    const contactForm = document.getElementById('contact-form');

    if (contactForm) {
        contactForm.addEventListener('submit', handleFormSubmission);

        // Real-time validation
        const inputs = contactForm.querySelectorAll('input, select, textarea');
        inputs.forEach(input => {
            input.addEventListener('blur', validateField);
            input.addEventListener('input', clearFieldError);
        });
    }
}

function handleFormSubmission(e) {
    e.preventDefault();

    const form = e.target;
    const submitBtn = form.querySelector('.submit-btn');
    const btnText = submitBtn.querySelector('.btn-text');
    const btnLoading = submitBtn.querySelector('.btn-loading');

    // Validate form
    if (!validateForm(form)) {
        return;
    }

    // Show loading state
    submitBtn.disabled = true;
    if (btnText) btnText.style.display = 'none';
    if (btnLoading) btnLoading.style.display = 'flex';

    // Simulate form submission (replace with actual endpoint)
    setTimeout(() => {
        showSuccessModal();
        form.reset();

        // Reset button state
        submitBtn.disabled = false;
        if (btnText) btnText.style.display = 'block';
        if (btnLoading) btnLoading.style.display = 'none';

        trackEvent('form_submission', {
            form_type: 'contact',
            timestamp: new Date().toISOString()
        });
    }, 2000);
}

function validateForm(form) {
    const requiredFields = form.querySelectorAll('[required]');
    let isValid = true;

    requiredFields.forEach(field => {
        if (!validateField({ target: field })) {
            isValid = false;
        }
    });

    return isValid;
}

function validateField(e) {
    const field = e.target;
    const value = field.value.trim();
    const fieldType = field.type;

    // Remove existing error
    clearFieldError(e);

    // Validation rules
    let isValid = true;
    let errorMessage = '';

    // Required field validation
    if (field.hasAttribute('required') && !value) {
        isValid = false;
        errorMessage = 'This field is required.';
    }

    // Email validation
    if (fieldType === 'email' && value) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(value)) {
            isValid = false;
            errorMessage = 'Please enter a valid email address.';
        }
    }

    // Phone validation
    if (fieldType === 'tel' && value) {
        const phoneRegex = /^[\+]?[1-9][\d]{0,15}$/;
        if (!phoneRegex.test(value.replace(/[\s\-\(\)]/g, ''))) {
            isValid = false;
            errorMessage = 'Please enter a valid phone number.';
        }
    }

    // Show error if validation fails
    if (!isValid) {
        showFieldError(field, errorMessage);
    }

    return isValid;
}

function showFieldError(field, message) {
    const fieldGroup = field.closest('.form-group');

    // Add error class
    field.classList.add('error');
    fieldGroup.classList.add('error');

    // Create error message element
    const errorElement = document.createElement('div');
    errorElement.className = 'field-error';
    errorElement.textContent = message;

    // Insert error message
    fieldGroup.appendChild(errorElement);

    // Add error styles if not present
    if (!document.querySelector('.error-styles')) {
        const style = document.createElement('style');
        style.className = 'error-styles';
        style.textContent = `
            .form-group.error input,
            .form-group.error select,
            .form-group.error textarea {
                border-color: var(--error-color);
                box-shadow: 0 0 0 3px rgba(239, 68, 68, 0.1);
            }
            .field-error {
                color: var(--error-color);
                font-size: 0.875rem;
                margin-top: 0.5rem;
                display: flex;
                align-items: center;
                gap: 0.5rem;
            }
            .field-error::before {
                content: '⚠';
                font-size: 1rem;
            }
        `;
        document.head.appendChild(style);
    }
}

function clearFieldError(e) {
    const field = e.target;
    const fieldGroup = field.closest('.form-group');

    // Remove error classes
    field.classList.remove('error');
    fieldGroup.classList.remove('error');

    // Remove error message
    const errorElement = fieldGroup.querySelector('.field-error');
    if (errorElement) {
        errorElement.remove();
    }
}

function initAnimations() {
    // Intersection Observer for scroll animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
            }
        });
    }, observerOptions);

    // Observe elements for animation
    const animatedElements = document.querySelectorAll(
        '.coach-card, .package-card, .step-card, .hero-stats, .section-header'
    );

    animatedElements.forEach(element => {
        observer.observe(element);
    });

    // Add animation styles
    if (!document.querySelector('.animation-styles')) {
        const style = document.createElement('style');
        style.className = 'animation-styles';
        style.textContent = `
            .coach-card,
            .package-card,
            .step-card,
            .hero-stats,
            .section-header {
                opacity: 0;
                transform: translateY(30px);
                transition: all 0.6s ease-out;
            }

            .animate-in {
                opacity: 1;
                transform: translateY(0);
            }

            .coach-card.animate-in {
                transition-delay: 0.2s;
            }

            .package-card.animate-in {
                transition-delay: 0.15s;
            }

            .step-card.animate-in {
                transition-delay: 0.3s;
            }

            @media (prefers-reduced-motion: reduce) {
                .coach-card,
                .package-card,
                .step-card,
                .hero-stats,
                .section-header {
                    opacity: 1;
                    transform: none;
                    transition: none;
                }
            }
        `;
        document.head.appendChild(style);
    }
}

// Package button handlers
function initPackageButtons() {
    const packageButtons = document.querySelectorAll('.package-btn');

    packageButtons.forEach(button => {
        button.addEventListener('click', function() {
            const packageCard = this.closest('.package-card');
            const packageName = packageCard.querySelector('.package-name').textContent;

            // Scroll to contact form and pre-fill package info
            const contactSection = document.getElementById('contact');
            const messageField = document.getElementById('message');

            if (contactSection && messageField) {
                // Pre-fill message with package interest
                const currentMessage = messageField.value;
                const packageMessage = `I'm interested in the ${packageName} package.`;

                if (!currentMessage.includes(packageMessage)) {
                    messageField.value = currentMessage 
                        ? `${currentMessage}\n\n${packageMessage}` 
                        : packageMessage;
                }

                // Scroll to contact form
                contactSection.scrollIntoView({ 
                    behavior: 'smooth',
                    block: 'start'
                });

                // Focus on form after scroll
                setTimeout(() => {
                    const nameField = document.getElementById('name');
                    if (nameField) nameField.focus();
                }, 1000);

                trackEvent('package_interest', {
                    package: packageName,
                    timestamp: new Date().toISOString()
                });
            }
        });
    });
}

// Navbar scroll effect
function initNavbarScroll() {
    const navbar = document.getElementById('navbar');

    window.addEventListener('scroll', throttle(() => {
        if (navbar) {
            if (window.scrollY > 100) {
                navbar.classList.add('scrolled');
            } else {
                navbar.classList.remove('scrolled');
            }
        }
    }, 16));
}

function showSuccessModal() {
    const modal = document.getElementById('success-modal');
    if (modal) {
        modal.style.display = 'block';
        document.body.style.overflow = 'hidden';
    }
}

function closeModal() {
    const modal = document.getElementById('success-modal');
    if (modal) {
        modal.style.display = 'none';
        document.body.style.overflow = 'auto';
    }
}

// Utility functions
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
    return function() {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
}

// Analytics and tracking (placeholder)
function trackEvent(eventName, eventData) {
    // In production, integrate with your analytics platform
    console.log('Event tracked:', eventName, eventData);
}

// Error handling
window.addEventListener('error', function(e) {
    console.error('JavaScript error:', e.error);
});

// Handle unhandled promise rejections
window.addEventListener('unhandledrejection', function(e) {
    console.error('Unhandled promise rejection:', e.reason);
});

// Keyboard navigation improvements
document.addEventListener('keydown', function(e) {
    // Skip to main content with keyboard
    if (e.key === 'Tab' && e.target === document.body) {
        const firstFocusable = document.querySelector('a, button, input, textarea, select, [tabindex]:not([tabindex="-1"])');
        if (firstFocusable) {
            firstFocusable.focus();
        }
    }
});

// Add screen reader only styles
if (!document.querySelector('.sr-only-styles')) {
    const style = document.createElement('style');
    style.className = 'sr-only-styles';
    style.textContent = `
        .sr-only {
            position: absolute;
            width: 1px;
            height: 1px;
            padding: 0;
            margin: -1px;
            overflow: hidden;
            clip: rect(0, 0, 0, 0);
            white-space: nowrap;
            border: 0;
        }
    `;
    document.head.appendChild(style);
}
