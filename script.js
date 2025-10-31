/*
================================================
eSkillLab - script.js
COMMENT: Main JavaScript file for the eSkillLab website.
- Handles mobile navigation.
- Adds sticky header effect on scroll.
- Manages 'Back to Top' button visibility.
- Triggers scroll-reveal animations.
- LOADS THE GLOBAL FOOTER.
- Contains page-specific logic.
================================================
*/

'use strict';

document.addEventListener('DOMContentLoaded', () => {

    /*
    ---------------------------------
    1. Mobile Navigation
    ---------------------------------
    */
    const hamburgerBtn = document.getElementById('hamburger-button');
    const navMenu = document.getElementById('nav-menu');
    const header = document.getElementById('header');

    if (hamburgerBtn && navMenu) {
        hamburgerBtn.addEventListener('click', () => {
            // Toggle active classes
            hamburgerBtn.classList.toggle('active');
            navMenu.classList.toggle('active');
            
            // Toggle ARIA expanded attribute
            const isExpanded = hamburgerBtn.getAttribute('aria-expanded') === 'true';
            hamburgerBtn.setAttribute('aria-expanded', !isExpanded);
            
            // Toggle body scroll lock
            document.body.classList.toggle('nav-open');
        });
        
        // Close menu when a link is clicked
        navMenu.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                if (navMenu.classList.contains('active')) {
                    hamburgerBtn.classList.remove('active');
                    navMenu.classList.remove('active');
                    hamburgerBtn.setAttribute('aria-expanded', 'false');
                    document.body.classList.remove('nav-open');
                }
            });
        });
    }

    /*
    ---------------------------------
    2. Sticky Header on Scroll
    ---------------------------------
    */
    if (header) {
        const stickyThreshold = 50; // Pixels to scroll before header becomes sticky
        window.addEventListener('scroll', () => {
            if (window.scrollY > stickyThreshold) {
                header.classList.add('scrolled');
            } else {
                header.classList.remove('scrolled');
            }
        });
    }

    /*
    ---------------------------------
    3. Back to Top Button
    ---------------------------------
    */
    const backToTopBtn = document.querySelector('.back-to-top');
    if (backToTopBtn) {
        const visibleThreshold = 300; // Pixels to scroll before button appears
        window.addEventListener('scroll', () => {
            if (window.scrollY > visibleThreshold) {
                backToTopBtn.classList.add('visible');
            } else {
                backToTopBtn.classList.remove('visible');
            }
        });
        
        // Smooth scroll to top
        backToTopBtn.addEventListener('click', (e) => {
            e.preventDefault();
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }
    
    /*
    ---------------------------------
    4. Global Footer Loader
    ---------------------------------
    */
    // COMMENT: This function fetches footer.html, injects it into the
    //          placeholder, and then runs scripts related to the footer.
    const loadFooter = async () => {
        const footerPlaceholder = document.getElementById('footer-placeholder');
        if (!footerPlaceholder) {
            // No placeholder found, so just run the scroll observer
            // and page scripts. This ensures pages without the
            // placeholder (like our one-off designs) still work.
            initializePageScripts();
            return;
        }

        try {
            const response = await fetch('footer.html');
            if (!response.ok) {
                throw new Error(`Failed to fetch footer: ${response.statusText}`);
            }
            const footerHTML = await response.text();
            footerPlaceholder.innerHTML = footerHTML;

            // --- Scripts to run AFTER footer is loaded ---

            // 1. Set Current Year in Footer
            const currentYearSpan = document.getElementById('current-year');
            if (currentYearSpan) {
                currentYearSpan.textContent = new Date().getFullYear();
            }

            // 2. Set 'active' link in Footer Navigation
            let currentPage = window.location.pathname.split('/').pop();
            if (currentPage === '' || !currentPage) {
                currentPage = 'index.html'; // Default to index
            }

            const footerLinks = footerPlaceholder.querySelectorAll('.footer-nav a');
            footerLinks.forEach(link => {
                const linkPage = link.getAttribute('href').split('/').pop();
                if (linkPage === currentPage) {
                    link.setAttribute('aria-current', 'page');
                }
            });

        } catch (error) {
            console.error('Error loading footer:', error);
            footerPlaceholder.innerHTML = '<p style="text-align: center; color: #ff6b6b; padding: 2rem;">Error loading footer content.</p>';
        }

        // 3. Initialize other page scripts AFTER footer is loaded
        initializePageScripts();
    };
    
    // Run the footer loader function
    loadFooter();


    /*
    ---------------------------------
    5. Scroll-Reveal & Page-Specific Scripts
    ---------------------------------
    */
    // COMMENT: We wrap these in a function so we can call them
    //          *after* the footer has loaded, ensuring all
    //          elements are on the page.
    function initializePageScripts() {
        
        // A. Scroll-Reveal Animations
        const animationObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('is-visible');
                    observer.unobserve(entry.target); // Only animate once
                }
            });
        }, {
            threshold: 0.1 // Trigger when 10% of the element is visible
        });
        
        // Observe all elements with the 'fade-in-up' class
        document.querySelectorAll('.fade-in-up').forEach(el => {
            animationObserver.observe(el);
        });

        /*
        ================================================
        PAGE-SPECIFIC SCRIPTS (WORK.HTML)
        ================================================
        */

        // B. Portfolio Stats Counter
        const statCards = document.querySelectorAll('.stat-card');
        
        if (statCards.length > 0) {
            const animateCounter = (element) => {
                const target = parseInt(element.getAttribute('data-target'));
                const duration = 2000; // 2 seconds
                const increment = target / (duration / 16); // 16ms per frame
                let current = 0;

                const timer = setInterval(() => {
                    current += increment;
                    if (current >= target) {
                        clearInterval(timer);
                        current = target;
                        // Format large numbers (e.g., 50000 -> 50,000)
                        element.textContent = target.toLocaleString('en-US');
                    } else {
                        element.textContent = Math.floor(current).toLocaleString('en-US');
                    }
                }, 16);
            };

            const statsObserver = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        const statNumber = entry.target.querySelector('.stat-number[data-target]');
                        if (statNumber && !statNumber.classList.contains('animated')) {
                            statNumber.classList.add('animated');
                            animateCounter(statNumber);
                        }
                    }
                });
            }, { threshold: 0.5 }); // Trigger when 50% of the card is visible

            statCards.forEach(stat => {
                statsObserver.observe(stat);
            });
        }

        // C. Project Gallery Filter
        const filterButtons = document.querySelectorAll('.filter-btn');
        const galleryItems = document.querySelectorAll('.gallery-item');

        if (filterButtons.length > 0 && galleryItems.length > 0) {
            
            filterButtons.forEach(button => {
                button.addEventListener('click', () => {
                    const filter = button.getAttribute('data-filter');
                    
                    // Update button active state
                    filterButtons.forEach(btn => {
                        btn.classList.remove('active');
                        btn.setAttribute('aria-pressed', 'false');
                    });
                    button.classList.add('active');
                    button.setAttribute('aria-pressed', 'true');
                    
                    // Filter gallery items
                    galleryItems.forEach(item => {
                        const itemCategory = item.getAttribute('data-category');
                        if (filter === 'all' || itemCategory === filter) {
                            item.style.display = 'block';
                        } else {
                            item.style.display = 'none';
                        }
                    });
                });
            });
        }
    }
    // Note: initializePageScripts() is called inside the loadFooter function
    // to ensure correct execution order.

});
