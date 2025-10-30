// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // Initialize all functionality
    initNavigation();
    initScrollAnimations();
    initFormHandling();
    initNavbarScroll();
    initSmoothScroll();
    initGalleryFilter();
    initFAQToggle();
    initLabHeroAnimations();
});

// Navigation functionality
function initNavigation() {
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.getElementById('nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');

    // Mobile menu toggle
    if (hamburger && navMenu) {
        hamburger.addEventListener('click', function() {
            hamburger.classList.toggle('active');
            navMenu.classList.toggle('active');
            
            // Animate hamburger bars
            const bars = hamburger.querySelectorAll('.bar');
            bars.forEach((bar, index) => {
                if (hamburger.classList.contains('active')) {
                    if (index === 0) bar.style.transform = 'rotate(-45deg) translate(-5px, 6px)';
                    if (index === 1) bar.style.opacity = '0';
                    if (index === 2) bar.style.transform = 'rotate(45deg) translate(-5px, -6px)';
                } else {
                    bar.style.transform = '';
                    bar.style.opacity = '1';
                }
            });
        });
    }

    // Close mobile menu when clicking on nav links
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            if (navMenu.classList.contains('active')) {
                hamburger.classList.remove('active');
                navMenu.classList.remove('active');
                
                // Reset hamburger bars
                const bars = hamburger.querySelectorAll('.bar');
                bars.forEach(bar => {
                    bar.style.transform = '';
                    bar.style.opacity = '1';
                });
            }
        });
    });

    // Close mobile menu when clicking outside
    document.addEventListener('click', function(event) {
        if (!hamburger.contains(event.target) && !navMenu.contains(event.target)) {
            if (navMenu.classList.contains('active')) {
                hamburger.classList.remove('active');
                navMenu.classList.remove('active');
                
                // Reset hamburger bars
                const bars = hamburger.querySelectorAll('.bar');
                bars.forEach(bar => {
                    bar.style.transform = '';
                    bar.style.opacity = '1';
                });
            }
        }
    });
}

// Smooth scroll functionality
function initSmoothScroll() {
    const navLinks = document.querySelectorAll('.nav-link');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const headerOffset = 70; // Height of fixed navbar
                const elementPosition = targetSection.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Smooth scroll for buttons with anchor links
    const buttons = document.querySelectorAll('button');
    buttons.forEach(button => {
        button.addEventListener('click', function() {
            const buttonText = this.textContent.trim();
            
            if (buttonText === 'View Our Work') {
                const workSection = document.querySelector('#work');
                if (workSection) {
                    const headerOffset = 70;
                    const elementPosition = workSection.getBoundingClientRect().top;
                    const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

                    window.scrollTo({
                        top: offsetPosition,
                        behavior: 'smooth'
                    });
                }
            }
            
            if (buttonText === 'Start Your Lab Project' || buttonText === 'Schedule a Consultation') {
                const contactSection = document.querySelector('#contact');
                if (contactSection) {
                    const headerOffset = 70;
                    const elementPosition = contactSection.getBoundingClientRect().top;
                    const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

                    window.scrollTo({
                        top: offsetPosition,
                        behavior: 'smooth'
                    });
                }
            }
        });
    });
}

// Navbar scroll effect
function initNavbarScroll() {
    const navbar = document.getElementById('navbar');
    
    window.addEventListener('scroll', function() {
        if (window.scrollY > 100) {
            navbar.style.background = 'rgba(255, 255, 255, 0.98)';
            navbar.style.boxShadow = '0 2px 25px rgba(0, 0, 0, 0.15)';
        } else {
            navbar.style.background = 'rgba(255, 255, 255, 0.95)';
            navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
        }
    });
}

// Scroll animations (AOS-style without external dependency)
function initScrollAnimations() {
    // Create intersection observer for scroll animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, observerOptions);

    // Add animation classes and observe elements
    const animatedElements = document.querySelectorAll(`
        .lab-card,
        .process-step,
        .client-item,
        .benefit-item,
        .work-item,
        .about-content,
        .hero-container,
        .contact-content
    `);

    animatedElements.forEach((element, index) => {
        // Add staggered animation delays
        element.style.transitionDelay = `${index * 0.1}s`;
        
        // Add fade-in class
        element.classList.add('fade-in');
        
        // Observe the element
        observer.observe(element);
    });

    // Special animations for specific sections
    const aboutSection = document.querySelector('.about');
    const contactSection = document.querySelector('.contact');
    
    if (aboutSection) {
        const aboutObserver = new IntersectionObserver(function(entries) {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const aboutText = entry.target.querySelector('.about-text');
                    const aboutImage = entry.target.querySelector('.about-image');
                    
                    if (aboutText) aboutText.classList.add('slide-in-left', 'visible');
                    if (aboutImage) aboutImage.classList.add('slide-in-right', 'visible');
                }
            });
        }, observerOptions);
        
        aboutObserver.observe(aboutSection);
    }

    // Hero section animation
    const heroSection = document.querySelector('.hero');
    if (heroSection) {
        const heroObserver = new IntersectionObserver(function(entries) {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const heroContent = entry.target.querySelector('.hero-content');
                    const heroImage = entry.target.querySelector('.hero-image');
                    
                    if (heroContent) heroContent.classList.add('slide-in-left', 'visible');
                    if (heroImage) heroImage.classList.add('slide-in-right', 'visible');
                }
            });
        }, observerOptions);
        
        heroObserver.observe(heroSection);
    }
}

// Form handling
function initFormHandling() {
    const contactForm = document.getElementById('contactForm');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form data
            const formData = new FormData(this);
            const formObject = {};
            
            // Convert FormData to object
            for (let [key, value] of formData.entries()) {
                formObject[key] = value;
            }
            
            // Validate form
            if (validateForm(formObject)) {
                // Show success message
                showSuccessMessage();
                
                // Reset form
                this.reset();
                
                // In a real application, you would send this data to a server
                console.log('Form data:', formObject);
            }
        });
    }
}

// Form validation
function validateForm(data) {
    let isValid = true;
    const errors = [];

    // Name validation
    if (!data.name || data.name.trim().length < 2) {
        errors.push('Please enter a valid name (at least 2 characters)');
        isValid = false;
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!data.email || !emailRegex.test(data.email)) {
        errors.push('Please enter a valid email address');
        isValid = false;
    }

    // Phone validation
    const phoneRegex = /^[\+]?[1-9][\d]{0,15}$/;
    if (!data.phone || !phoneRegex.test(data.phone.replace(/[\s\-\(\)]/g, ''))) {
        errors.push('Please enter a valid phone number');
        isValid = false;
    }

    // Interest validation
    if (!data.interest || data.interest === '') {
        errors.push('Please select your area of interest');
        isValid = false;
    }

    // Message validation
    if (!data.message || data.message.trim().length < 10) {
        errors.push('Please enter a message (at least 10 characters)');
        isValid = false;
    }

    // Show errors if any
    if (!isValid) {
        showErrorMessage(errors);
    }

    return isValid;
}

// Success message
function showSuccessMessage() {
    // Create and show success alert
    const successAlert = createAlert('success', 
        '<i class="fas fa-check-circle"></i> Thank you for your message! We\'ll get back to you soon.');
    
    document.body.appendChild(successAlert);
    
    // Remove alert after 5 seconds
    setTimeout(() => {
        successAlert.remove();
    }, 5000);
    
    // Scroll to top of form to show the alert
    document.querySelector('.contact').scrollIntoView({ 
        behavior: 'smooth', 
        block: 'start' 
    });
}

// Error message
function showErrorMessage(errors) {
    const errorMessages = errors.map(error => `<li>${error}</li>`).join('');
    
    const errorAlert = createAlert('error', 
        `<i class="fas fa-exclamation-circle"></i>
         <strong>Please fix the following errors:</strong>
         <ul style="margin: 10px 0; padding-left: 20px;">${errorMessages}</ul>`);
    
    document.body.appendChild(errorAlert);
    
    // Remove alert after 8 seconds for errors
    setTimeout(() => {
        errorAlert.remove();
    }, 8000);
    
    // Scroll to top of form to show the alert
    document.querySelector('.contact').scrollIntoView({ 
        behavior: 'smooth', 
        block: 'start' 
    });
}

// Create alert element
function createAlert(type, message) {
    const alert = document.createElement('div');
    alert.className = `custom-alert custom-alert-${type}`;
    alert.innerHTML = `
        <div class="alert-content">
            ${message}
            <button class="alert-close" onclick="this.parentElement.parentElement.remove()">
                <i class="fas fa-times"></i>
            </button>
        </div>
    `;
    
    // Add styles for the alert
    const style = document.createElement('style');
    style.textContent = `
        .custom-alert {
            position: fixed;
            top: 90px;
            right: 20px;
            z-index: 10000;
            max-width: 400px;
            border-radius: 8px;
            box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
            animation: slideInRight 0.3s ease;
        }
        
        .custom-alert-success {
            background: #d4edda;
            border: 1px solid #c3e6cb;
            color: #155724;
        }
        
        .custom-alert-error {
            background: #f8d7da;
            border: 1px solid #f5c6cb;
            color: #721c24;
        }
        
        .alert-content {
            padding: 15px 20px;
            display: flex;
            align-items: flex-start;
            gap: 10px;
        }
        
        .alert-close {
            background: none;
            border: none;
            cursor: pointer;
            color: inherit;
            padding: 5px;
            margin-left: auto;
            opacity: 0.7;
            transition: opacity 0.3s ease;
        }
        
        .alert-close:hover {
            opacity: 1;
        }
        
        @keyframes slideInRight {
            from {
                transform: translateX(100%);
                opacity: 0;
            }
            to {
                transform: translateX(0);
                opacity: 1;
            }
        }
        
        @media (max-width: 768px) {
            .custom-alert {
                left: 20px;
                right: 20px;
                max-width: none;
            }
        }
    `;
    
    if (!document.querySelector('style[data-alert-styles]')) {
        style.setAttribute('data-alert-styles', 'true');
        document.head.appendChild(style);
    }
    
    return alert;
}

// Utility function to debounce scroll events
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

// Enhanced scroll performance
const debouncedScrollHandler = debounce(function() {
    // Additional scroll-based functionality can be added here
}, 16); // ~60fps

window.addEventListener('scroll', debouncedScrollHandler);

// Add loading animation for images
function initImageLoading() {
    const images = document.querySelectorAll('img');
    
    images.forEach(img => {
        img.addEventListener('load', function() {
            this.style.opacity = '1';
        });
        
        // If image is already loaded
        if (img.complete) {
            img.style.opacity = '1';
        }
    });
}

// Initialize image loading
initImageLoading();

// Add hover effects for cards
function initCardHoverEffects() {
    const cards = document.querySelectorAll('.lab-card, .benefit-item, .work-item, .process-step');
    
    cards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = '';
        });
    });
}

// Initialize card hover effects
initCardHoverEffects();

// Performance monitoring
function initPerformanceMonitoring() {
    // Log page load performance
    window.addEventListener('load', function() {
        setTimeout(() => {
            const perfData = performance.getEntriesByType('navigation')[0];
            console.log(`Page load time: ${perfData.loadEventEnd - perfData.loadEventStart}ms`);
        }, 0);
    });
}

// Initialize performance monitoring
initPerformanceMonitoring();

// Accessibility enhancements
function initAccessibility() {
    // Add skip to content link
    const skipLink = document.createElement('a');
    skipLink.href = '#main-content';
    skipLink.textContent = 'Skip to main content';
    skipLink.className = 'skip-link';
    skipLink.style.cssText = `
        position: absolute;
        top: -40px;
        left: 6px;
        background: #000;
        color: #fff;
        padding: 8px;
        text-decoration: none;
        border-radius: 4px;
        z-index: 10001;
        transition: top 0.3s;
    `;
    
    skipLink.addEventListener('focus', function() {
        this.style.top = '6px';
    });
    
    skipLink.addEventListener('blur', function() {
        this.style.top = '-40px';
    });
    
    document.body.insertBefore(skipLink, document.body.firstChild);
    
    // Add main content landmark
    const main = document.querySelector('.hero');
    if (main) {
        main.id = 'main-content';
        main.setAttribute('role', 'main');
    }
}

// Initialize accessibility features
initAccessibility();

// Console welcome message
// Gallery Filter Functionality
function initGalleryFilter() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    const galleryItems = document.querySelectorAll('.gallery-item');
    
    if (filterButtons.length === 0) return; // Skip if no gallery on page
    
    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            const filter = this.getAttribute('data-filter');
            
            // Update active button
            filterButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');
            
            // Filter gallery items
            galleryItems.forEach(item => {
                const category = item.getAttribute('data-category');
                
                if (filter === 'all' || category === filter) {
                    item.style.display = 'block';
                    item.style.animation = 'fadeIn 0.5s ease';
                } else {
                    item.style.display = 'none';
                }
            });
        });
    });
}

// FAQ Toggle Functionality
function initFAQToggle() {
    const faqItems = document.querySelectorAll('.faq-item');
    
    if (faqItems.length === 0) return; // Skip if no FAQ on page
    
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        const answer = item.querySelector('.faq-answer');
        
        question.addEventListener('click', function() {
            const isActive = item.classList.contains('active');
            
            // Close all FAQ items
            faqItems.forEach(faqItem => {
                faqItem.classList.remove('active');
                const faqAnswer = faqItem.querySelector('.faq-answer');
                if (faqAnswer) {
                    faqAnswer.style.maxHeight = '0';
                }
            });
            
            // Open clicked item if it wasn't active
            if (!isActive) {
                item.classList.add('active');
                if (answer) {
                    answer.style.maxHeight = answer.scrollHeight + 'px';
                }
            }
        });
    });
}

// Lab Hero Animations
function initLabHeroAnimations() {
    const labHero = document.querySelector('.lab-hero');
    
    if (!labHero) return; // Skip if no lab hero on page
    
    const heroObserver = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const elements = entry.target.querySelectorAll('.lab-icon-large, .lab-hero-text, .lab-hero-image');
                elements.forEach((element, index) => {
                    setTimeout(() => {
                        element.style.opacity = '1';
                        element.style.transform = 'translateY(0)';
                    }, index * 200);
                });
            }
        });
    }, { threshold: 0.3 });
    
    // Set initial state
    const heroElements = labHero.querySelectorAll('.lab-icon-large, .lab-hero-text, .lab-hero-image');
    heroElements.forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(30px)';
        element.style.transition = 'all 0.6s ease';
    });
    
    heroObserver.observe(labHero);
}

// Enhanced Project Cards Animation
function initProjectCards() {
    const projectCards = document.querySelectorAll('.project-card, .lab-featured-card');
    
    projectCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = '';
        });
    });
}

// Initialize project cards
initProjectCards();

// Enhanced Equipment Items Hover
function initEquipmentItems() {
    const equipmentItems = document.querySelectorAll('.equipment-item');
    
    equipmentItems.forEach(item => {
        item.addEventListener('mouseenter', function() {
            const icon = this.querySelector('i');
            if (icon) {
                icon.style.transform = 'scale(1.2)';
            }
        });
        
        item.addEventListener('mouseleave', function() {
            const icon = this.querySelector('i');
            if (icon) {
                icon.style.transform = '';
            }
        });
    });
}

// Initialize equipment items
initEquipmentItems();

// Career Opportunities Animation
function initCareerItems() {
    const careerItems = document.querySelectorAll('.career-item');
    
    const careerObserver = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, { threshold: 0.1 });
    
    careerItems.forEach(item => {
        item.style.opacity = '0';
        item.style.transform = 'translateY(30px)';
        item.style.transition = 'all 0.6s ease';
        careerObserver.observe(item);
    });
}

// Initialize career items
initCareerItems();

// Stats Counter Animation
function initStatsCounter() {
    const statCards = document.querySelectorAll('.stat-card h3');
    
    const statsObserver = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const target = entry.target;
                const finalValue = target.textContent;
                const numericValue = parseInt(finalValue.replace(/\D/g, ''));
                
                if (!isNaN(numericValue)) {
                    animateCounter(target, 0, numericValue, finalValue.replace(/\d/g, ''));
                }
                
                statsObserver.unobserve(target);
            }
        });
    }, { threshold: 0.5 });
    
    statCards.forEach(card => {
        statsObserver.observe(card);
    });
}

function animateCounter(element, start, end, suffix) {
    const duration = 2000;
    const startTime = performance.now();
    
    function updateCounter(currentTime) {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
        
        const current = Math.floor(start + (end - start) * progress);
        element.textContent = current + suffix;
        
        if (progress < 1) {
            requestAnimationFrame(updateCounter);
        }
    }
    
    requestAnimationFrame(updateCounter);
}

// Initialize stats counter
initStatsCounter();

// Gallery Item Click Handler
function initGalleryClickHandler() {
    const galleryItems = document.querySelectorAll('.gallery-item');
    
    galleryItems.forEach(item => {
        item.addEventListener('click', function() {
            const img = this.querySelector('img');
            const overlay = this.querySelector('.gallery-overlay');
            
            if (img && overlay) {
                // Create modal for image viewing
                createImageModal(img.src, overlay.querySelector('h4').textContent);
            }
        });
    });
}

// Create Image Modal
function createImageModal(src, title) {
    const modal = document.createElement('div');
    modal.className = 'image-modal';
    modal.innerHTML = `
        <div class="modal-overlay" onclick="closeModal()">
            <div class="modal-content" onclick="event.stopPropagation()">
                <button class="modal-close" onclick="closeModal()">×</button>
                <img src="${src}" alt="${title}">
                <h3>${title}</h3>
            </div>
        </div>
    `;
    
    // Add modal styles
    const style = document.createElement('style');
    style.textContent = `
        .image-modal {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            z-index: 10000;
            animation: fadeIn 0.3s ease;
        }
        
        .modal-overlay {
            width: 100%;
            height: 100%;
            background: rgba(0, 0, 0, 0.9);
            display: flex;
            align-items: center;
            justify-content: center;
            padding: 2rem;
        }
        
        .modal-content {
            max-width: 90%;
            max-height: 90%;
            position: relative;
            animation: slideIn 0.3s ease;
        }
        
        .modal-content img {
            width: 100%;
            height: auto;
            border-radius: 10px;
        }
        
        .modal-content h3 {
            color: white;
            text-align: center;
            margin-top: 1rem;
            font-size: 1.2rem;
        }
        
        .modal-close {
            position: absolute;
            top: -40px;
            right: 0;
            background: none;
            border: none;
            color: white;
            font-size: 2rem;
            cursor: pointer;
            width: 40px;
            height: 40px;
            display: flex;
            align-items: center;
            justify-content: center;
            border-radius: 50%;
            background: rgba(255, 255, 255, 0.2);
            transition: background 0.3s ease;
        }
        
        .modal-close:hover {
            background: rgba(255, 255, 255, 0.3);
        }
        
        @keyframes fadeIn {
            from { opacity: 0; }
            to { opacity: 1; }
        }
        
        @keyframes slideIn {
            from { transform: scale(0.9); }
            to { transform: scale(1); }
        }
    `;
    
    if (!document.querySelector('style[data-modal-styles]')) {
        style.setAttribute('data-modal-styles', 'true');
        document.head.appendChild(style);
    }
    
    document.body.appendChild(modal);
    document.body.style.overflow = 'hidden';
}

// Close Modal Function
function closeModal() {
    const modal = document.querySelector('.image-modal');
    if (modal) {
        modal.remove();
        document.body.style.overflow = '';
    }
}

// Initialize gallery click handler
initGalleryClickHandler();

// Lab Modules Hover Effects
function initModuleCards() {
    const moduleCards = document.querySelectorAll('.module-card');
    
    moduleCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            const icon = this.querySelector('.module-icon');
            if (icon) {
                icon.style.transform = 'rotateY(180deg)';
            }
        });
        
        card.addEventListener('mouseleave', function() {
            const icon = this.querySelector('.module-icon');
            if (icon) {
                icon.style.transform = '';
            }
        });
    });
}

// Initialize module cards
initModuleCards();

// Equipment Category Expand/Collapse
function initEquipmentCategories() {
    const equipmentCategories = document.querySelectorAll('.equipment-category');
    
    equipmentCategories.forEach(category => {
        const heading = category.querySelector('h3');
        if (heading) {
            heading.style.cursor = 'pointer';
            heading.addEventListener('click', function() {
                const items = category.querySelector('.equipment-items');
                if (items) {
                    const isExpanded = category.classList.contains('expanded');
                    
                    if (isExpanded) {
                        items.style.maxHeight = '0';
                        items.style.overflow = 'hidden';
                        category.classList.remove('expanded');
                    } else {
                        items.style.maxHeight = items.scrollHeight + 'px';
                        category.classList.add('expanded');
                    }
                }
            });
            
            // Initialize collapsed state
            const items = category.querySelector('.equipment-items');
            if (items) {
                items.style.maxHeight = items.scrollHeight + 'px';
                category.classList.add('expanded');
            }
        }
    });
}

// Initialize equipment categories
initEquipmentCategories();

// Page Loading Performance
function initPerformanceOptimizations() {
    // Lazy loading for images
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src || img.src;
                    img.classList.remove('lazy');
                    observer.unobserve(img);
                }
            });
        });
        
        document.querySelectorAll('img[data-src]').forEach(img => {
            imageObserver.observe(img);
        });
    }
}

// Initialize performance optimizations
initPerformanceOptimizations();

console.log(`
🚀 eSkillLab Website
Government-Recognized Labs for Future Technologies
Built with modern web technologies for optimal performance and accessibility.

• Responsive Design ✓
• Smooth Animations ✓
• SEO Optimized ✓
• Accessible ✓
• Performance Optimized ✓
• Gallery Filtering ✓
• FAQ Toggles ✓
• Image Modal Viewer ✓
• Interactive Elements ✓
`);