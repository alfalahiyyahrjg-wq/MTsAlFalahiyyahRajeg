// Main JavaScript file for MTs Al Falahiyyah Rajeg website
// Initialization and feature management

document.addEventListener('DOMContentLoaded', function() {
    // Initialize all features in order
    initCommonFeatures();
    initMobileFeatures();
    initHamburgerMenu();
    initDarkModeToggle();
    initTooltips();
    addLoadingAnimations();
    fixAllPages();
});

// Common Features (Desktop & Mobile)
function initCommonFeatures() {
    initRealTimeClock();
    initSmoothScrolling();
    initAnimations();
    initFormValidation();
    initGalleryFilter();
    initImageLazyLoading();
    initPageSpecificFeatures();
}

// Mobile-Specific Features
function initMobileFeatures() {
    initTouchGestures();
    initFormMobileOptimization();
    initImageOptimization();
    initConnectionDetection();
    initPerformanceMonitoring();
    initMobileMenuFix();
}

// Mobile Navigation with Touch Support
function initHamburgerMenu() {
    const hamburger = document.getElementById('hamburger');
    const navList = document.getElementById('navList');
    const mainNav = document.getElementById('mainNav');
    const body = document.body;

    if (!hamburger || !navList || !mainNav) return;

    // Single function to toggle menu
    function toggleMenu(e) {
        e.stopPropagation();
        hamburger.classList.toggle('active');
        mainNav.classList.toggle('active');
        body.classList.toggle('menu-open');
    }

    // Click event for hamburger (works on both desktop and mobile)
    hamburger.addEventListener('click', toggleMenu);

    // Close menu when clicking on nav links
    const navLinks = navList.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            // Don't prevent default - let the link navigate naturally
            hamburger.classList.remove('active');
            mainNav.classList.remove('active');
            body.classList.remove('menu-open');
        });
    });

    // Close menu when clicking outside
    document.addEventListener('click', function(e) {
        if (mainNav.classList.contains('active') &&
            !mainNav.contains(e.target) &&
            !hamburger.contains(e.target)) {
            hamburger.classList.remove('active');
            mainNav.classList.remove('active');
            body.classList.remove('menu-open');
        }
    });

    // Close menu on escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && mainNav.classList.contains('active')) {
            hamburger.classList.remove('active');
            mainNav.classList.remove('active');
            body.classList.remove('menu-open');
        }
    });

    // Add swipe gestures for better mobile UX
    initMobileSwipeGestures(hamburger, mainNav, body);
}

// Swipe gestures for mobile navigation
function initMobileSwipeGestures(hamburger, nav, body) {
    let touchStartX = 0;
    let touchEndX = 0;

    document.addEventListener('touchstart', function(e) {
        touchStartX = e.changedTouches[0].screenX;
    });

    document.addEventListener('touchend', function(e) {
        touchEndX = e.changedTouches[0].screenX;
        handleSwipe();
    });

    function handleSwipe() {
        const swipeThreshold = 50;

        if (touchEndX < touchStartX - swipeThreshold) {
            // Swipe left - close menu if open
            if (nav && nav.classList.contains('active')) {
                hamburger.classList.remove('active');
                nav.classList.remove('active');
                body.classList.remove('menu-open');
            }
        }

        if (touchEndX > touchStartX + swipeThreshold) {
            // Swipe right - open menu if closed
            if (nav && !nav.classList.contains('active')) {
                hamburger.classList.add('active');
                nav.classList.add('active');
                body.classList.add('menu-open');
            }
        }
    }
}

// Fix hamburger menu on mobile
function initMobileMenuFix() {
    const hamburger = document.getElementById('hamburger');
    const navList = document.getElementById('navList');
    
    if (hamburger && navList) {
        // Force show hamburger on mobile
        if (window.innerWidth <= 768) {
            hamburger.style.display = 'flex';
        }
        
        // Handle window resize
        window.addEventListener('resize', function() {
            if (window.innerWidth <= 768) {
                hamburger.style.display = 'flex';
            } else {
                hamburger.style.display = 'none';
                navList.classList.remove('active');
                hamburger.classList.remove('active');
                document.body.classList.remove('menu-open');
            }
        });
    }
}

// Touch Gesture Support
function initTouchGestures() {
    const touchElements = document.querySelectorAll(
        '.btn-primary, .nav-link, .content-card, .gallery-item, .tip-item'
    );
    
    touchElements.forEach(element => {
        element.addEventListener('touchstart', function() {
            this.classList.add('touch-active');
        });
        
        element.addEventListener('touchend', function() {
            this.classList.remove('touch-active');
        });
        
        // Prevent context menu on mobile
        element.addEventListener('contextmenu', function(e) {
            if ('ontouchstart' in window) {
                e.preventDefault();
            }
        });
    });
    
    // Prevent zoom on double tap for buttons
    document.addEventListener('touchstart', function(e) {
        if (e.target.classList.contains('btn-primary')) {
            e.preventDefault();
        }
    }, { passive: false });
}

// Form Optimization for Mobile
function initFormMobileOptimization() {
    const form = document.getElementById('school-registration-form');
    if (!form) return;
    
    // Show appropriate keyboard for input types
    const emailInput = form.querySelector('input[type="email"]');
    const telInput = form.querySelector('input[type="tel"]');
    const numberInput = form.querySelector('input[type="number"]');
    
    if (emailInput) {
        emailInput.setAttribute('autocapitalize', 'off');
        emailInput.setAttribute('autocorrect', 'off');
    }
    
    if (telInput) {
        telInput.setAttribute('inputmode', 'tel');
        telInput.setAttribute('pattern', '[0-9]*');
    }
    
    if (numberInput) {
        numberInput.setAttribute('inputmode', 'numeric');
    }
    
    // Focus management for better UX
    const inputs = form.querySelectorAll('input, select, textarea');
    inputs.forEach((input, index) => {
        input.addEventListener('focus', function() {
            setTimeout(() => {
                this.scrollIntoView({ behavior: 'smooth', block: 'center' });
            }, 300);
        });
        
        // Add next/previous navigation
        if (index < inputs.length - 1) {
            input.addEventListener('keypress', function(e) {
                if (e.key === 'Enter' && !this.matches('textarea')) {
                    e.preventDefault();
                    inputs[index + 1].focus();
                }
            });
        }
    });
}

// Image Optimization for Mobile
function initImageOptimization() {
    const isMobile = window.innerWidth <= 768;
    
    if (isMobile) {
        const lazyImages = document.querySelectorAll('img[data-src]');
        
        if ('IntersectionObserver' in window) {
            const imageObserver = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        const img = entry.target;
                        img.src = img.dataset.src;
                        img.classList.add('loaded');
                        imageObserver.unobserve(img);
                    }
                });
            });
            
            lazyImages.forEach(img => {
                img.classList.add('lazy-load');
                imageObserver.observe(img);
            });
        } else {
            lazyImages.forEach(img => {
                img.src = img.dataset.src;
            });
        }
        
        // Optimize based on connection
        if ('connection' in navigator) {
            const connection = navigator.connection;
            
            if (connection.saveData || connection.effectiveType.includes('2g')) {
                const images = document.querySelectorAll('img');
                images.forEach(img => {
                    const dataLowsrc = img.getAttribute('data-low-src');
                    if (dataLowsrc) {
                        img.src = dataLowsrc;
                    }
                });
            }
        }
    }
}

// Connection Detection
function initConnectionDetection() {
    const warningElement = document.createElement('div');
    warningElement.className = 'connection-warning';
    warningElement.innerHTML = '<i class="fas fa-wifi-slash"></i> Anda sedang offline. Beberapa fitur mungkin tidak tersedia.';
    document.body.appendChild(warningElement);
    
    window.addEventListener('online', updateConnectionStatus);
    window.addEventListener('offline', updateConnectionStatus);
    
    function updateConnectionStatus() {
        if (!navigator.onLine) {
            warningElement.style.display = 'block';
            document.body.classList.add('offline');
        } else {
            warningElement.style.display = 'none';
            document.body.classList.remove('offline');
        }
    }
    
    updateConnectionStatus();
}

// Performance Monitoring for Mobile
function initPerformanceMonitoring() {
    if (window.innerWidth > 768) return;
    
    window.addEventListener('load', function() {
        const loadTime = performance.timing.loadEventEnd - performance.timing.navigationStart;
        
        if (loadTime > 3000) {
            console.warn('Page load time is slow on mobile: ' + loadTime + 'ms');
        }
    });
    
    let scrollTimeout;
    window.addEventListener('scroll', function() {
        clearTimeout(scrollTimeout);
        
        scrollTimeout = setTimeout(() => {
            document.body.classList.remove('scrolling');
        }, 100);
        
        document.body.classList.add('scrolling');
    });
}

// Real-time clock function
function initRealTimeClock() {
    function updateRealTime() {
        const now = new Date();
        const options = { 
            weekday: 'long', 
            year: 'numeric', 
            month: 'long', 
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit'
        };
        
        const formattedDate = now.toLocaleDateString('id-ID', options);
        const realTimeElements = document.querySelectorAll('#real-time, .real-time');
        
        realTimeElements.forEach(element => {
            if (element) {
                element.textContent = formattedDate;
            }
        });
    }
    
    setInterval(updateRealTime, 1000);
    updateRealTime();
}

// Smooth scrolling for navigation links
function initSmoothScrolling() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#' || !targetId.startsWith('#')) return;
            
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

// Animation initialization
function initAnimations() {
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible', 'fade-in');
                
                if (entry.target.classList.contains('content-card') || 
                    entry.target.classList.contains('gallery-item') ||
                    entry.target.classList.contains('contact-item')) {
                    const index = Array.from(entry.target.parentElement.children).indexOf(entry.target);
                    entry.target.style.transitionDelay = `${index * 0.1}s`;
                }
            }
        });
    }, observerOptions);
    
    document.querySelectorAll('.content-card, .about-card, .vision-box, .mission-box, .contact-item, .gallery-item').forEach(element => {
        observer.observe(element);
    });
}

// Form validation
function initFormValidation() {
    const form = document.getElementById('school-registration-form');
    if (!form) return;
    
    const notification = document.getElementById('form-notification');
    
    const birthdateInput = document.getElementById('birthdate');
    if (birthdateInput) {
        const today = new Date();
        const minDate = new Date(today.getFullYear() - 18, today.getMonth(), today.getDate());
        const maxDate = new Date(today.getFullYear() - 13, today.getMonth(), today.getDate());
        
        birthdateInput.min = minDate.toISOString().split('T')[0];
        birthdateInput.max = maxDate.toISOString().split('T')[0];
    }
    
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        let isValid = true;
        const requiredFields = form.querySelectorAll('[required]');
        
        requiredFields.forEach(field => {
            if (!field.value.trim()) {
                isValid = false;
                field.classList.add('error');
            } else {
                field.classList.remove('error');
            }
        });
        
        const dataAccuracyCheckbox = document.getElementById('data-accuracy');
        if (dataAccuracyCheckbox && !dataAccuracyCheckbox.checked) {
            isValid = false;
            dataAccuracyCheckbox.parentElement.classList.add('error');
        } else if (dataAccuracyCheckbox) {
            dataAccuracyCheckbox.parentElement.classList.remove('error');
        }
        
        if (!isValid) {
            showNotification('Harap lengkapi semua bidang yang wajib diisi!', 'error');
            return;
        }
        
        const submitBtn = form.querySelector('.btn-submit');
        const originalText = submitBtn.innerHTML;
        submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Mengirim...';
        submitBtn.disabled = true;
        
        setTimeout(() => {
            showNotification('Pendaftaran berhasil dikirim! Anda akan menerima email konfirmasi dalam waktu 1x24 jam.', 'success');
            
            setTimeout(() => {
                form.reset();
                if (notification) notification.style.display = 'none';
                submitBtn.innerHTML = originalText;
                submitBtn.disabled = false;
            }, 5000);
        }, 2000);
    });
    
    form.addEventListener('reset', function() {
        if (notification) notification.style.display = 'none';
        const allInputs = form.querySelectorAll('input, select, textarea');
        allInputs.forEach(input => {
            input.classList.remove('error');
        });
        const checkbox = document.getElementById('data-accuracy');
        if (checkbox) checkbox.parentElement.classList.remove('error');
    });
    
    const inputs = form.querySelectorAll('input, select, textarea');
    inputs.forEach(input => {
        input.addEventListener('input', function() {
            if (this.value.trim()) {
                this.classList.remove('error');
                this.classList.add('success');
            } else {
                this.classList.remove('success');
            }
        });
        
        input.addEventListener('blur', function() {
            if (this.hasAttribute('required') && !this.value.trim()) {
                this.classList.add('error');
            }
        });
    });
    
    function showNotification(message, type) {
        if (!notification) return;
        
        notification.textContent = message;
        notification.className = 'form-notification ' + type;
        notification.style.display = 'block';
        
        notification.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        
        setTimeout(() => {
            notification.style.display = 'none';
        }, 5000);
    }
}

// Gallery filter functionality
function initGalleryFilter() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    const galleryItems = document.querySelectorAll('.gallery-item');
    
    if (filterButtons.length === 0 || galleryItems.length === 0) return;
    
    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            filterButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');
            
            const filterValue = this.getAttribute('data-filter');
            
            galleryItems.forEach(item => {
                if (filterValue === 'all' || item.getAttribute('data-category') === filterValue) {
                    item.style.display = 'block';
                    setTimeout(() => {
                        item.style.opacity = '1';
                        item.style.transform = 'scale(1)';
                    }, 10);
                } else {
                    item.style.opacity = '0';
                    item.style.transform = 'scale(0.8)';
                    setTimeout(() => {
                        item.style.display = 'none';
                    }, 300);
                }
            });
        });
    });
}

// Lazy loading for images
function initImageLazyLoading() {
    const images = document.querySelectorAll('img[data-src]');
    
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src;
                    img.classList.remove('loading');
                    imageObserver.unobserve(img);
                }
            });
        });
        
        images.forEach(img => {
            imageObserver.observe(img);
            img.classList.add('loading');
        });
    } else {
        images.forEach(img => {
            img.src = img.dataset.src;
        });
    }
}

// Dark Mode Toggle
function initDarkModeToggle() {
    const darkModeToggle = document.querySelector('.dark-mode-toggle-input');
    if (!darkModeToggle) return;
    
    const prefersDarkScheme = window.matchMedia('(prefers-color-scheme: dark)');
    const savedTheme = localStorage.getItem('theme');
    
    if (savedTheme === 'dark' || (!savedTheme && prefersDarkScheme.matches)) {
        document.body.classList.add('dark-mode');
        darkModeToggle.checked = true;
    }
    
    darkModeToggle.addEventListener('change', function() {
        if (this.checked) {
            document.body.classList.add('dark-mode');
            localStorage.setItem('theme', 'dark');
        } else {
            document.body.classList.remove('dark-mode');
            localStorage.setItem('theme', 'light');
        }
    });
}

// Page-specific features
function initPageSpecificFeatures() {
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    const navLinks = document.querySelectorAll('.nav-link');
    
    navLinks.forEach(link => {
        const linkHref = link.getAttribute('href');
        if (linkHref === currentPage || (currentPage === '' && linkHref === 'index.html')) {
            link.classList.add('active');
        } else {
            link.classList.remove('active');
        }
    });
    
    const interactiveElements = document.querySelectorAll('.content-card, .info-card, .about-card, .contact-item, .gallery-item');
    interactiveElements.forEach(element => {
        element.addEventListener('mouseenter', function() {
            this.style.transition = 'all 0.3s ease';
        });
    });
    
    if (window.location.pathname.includes('index.html') || window.location.pathname.endsWith('/')) {
        const heroText = document.querySelector('.hero-text h2');
        if (heroText && heroText.textContent.includes('Selamat Datang')) {
            addTypingEffect(heroText);
        }
    }
}

// Typing effect for hero text
function addTypingEffect(element) {
    const text = element.textContent;
    element.textContent = '';
    
    let i = 0;
    const typeWriter = () => {
        if (i < text.length) {
            element.textContent += text.charAt(i);
            i++;
            setTimeout(typeWriter, 50);
        }
    };
    
    setTimeout(typeWriter, 1000);
}

// Add loading animations
function addLoadingAnimations() {
    const ctaButtons = document.querySelectorAll('.btn-primary, .online-form-link');
    ctaButtons.forEach(button => {
        button.classList.add('pulse');
        
        button.addEventListener('mouseenter', function() {
            this.classList.remove('pulse');
        });
        
        button.addEventListener('mouseleave', function() {
            setTimeout(() => {
                this.classList.add('pulse');
            }, 5000);
        });
    });
}

// Initialize tooltips
function initTooltips() {
    const elementsWithTooltip = document.querySelectorAll('[data-tooltip]');
    
    elementsWithTooltip.forEach(element => {
        element.addEventListener('mouseenter', function() {
            const tooltipText = this.getAttribute('data-tooltip');
            const tooltip = document.createElement('div');
            tooltip.className = 'tooltip';
            tooltip.textContent = tooltipText;
            document.body.appendChild(tooltip);
            
            const rect = this.getBoundingClientRect();
            tooltip.style.left = `${rect.left + rect.width / 2 - tooltip.offsetWidth / 2}px`;
            tooltip.style.top = `${rect.top - tooltip.offsetHeight - 10}px`;
            
            this.tooltipElement = tooltip;
        });
        
        element.addEventListener('mouseleave', function() {
            if (this.tooltipElement) {
                this.tooltipElement.remove();
                this.tooltipElement = null;
            }
        });
    });
}

// Fix for all pages
function fixAllPages() {
    // Fix hamburger menu
    const hamburger = document.getElementById('hamburger');
    const navList = document.getElementById('navList');
    
    if (hamburger && navList) {
        // Ensure hamburger is visible on mobile
        if (window.innerWidth <= 768) {
            hamburger.style.display = 'flex';
        }
    }
    
    // Auto-scroll to form section on form.html
    if (window.location.pathname.includes('form.html')) {
        setTimeout(() => {
            const formContent = document.getElementById('form-content');
            if (formContent) {
                // Get the header height to scroll below it
                const header = document.querySelector('.site-header');
                const headerHeight = header ? header.offsetHeight : 0;
                
                // Scroll smoothly to content
                window.scrollTo({
                    top: formContent.offsetTop - headerHeight - 20,
                    behavior: 'smooth'
                });
            }
        }, 300); // Wait for page to fully load
    }
    
    // Fix buttons - ensure they navigate properly
    const buttons = document.querySelectorAll('.btn-primary, .online-form-link');
    buttons.forEach(button => {
        button.style.cursor = 'pointer';
        button.style.pointerEvents = 'auto';
        button.style.display = 'inline-flex';
        // Don't prevent default - let the link navigate naturally
        button.addEventListener('click', function(e) {
            // For links, let them work normally
            if (this.tagName === 'A' && this.href) {
                // Just let it navigate, no prevention needed
                return true;
            }
        });
    });
    
    // Fix image loading errors
    const images = document.querySelectorAll('.gallery-image img');
    images.forEach(img => {
        img.onerror = function() {
            this.style.display = 'none';
            this.parentElement.innerHTML = '<div class="image-placeholder">Image Not Found</div>';
        };
    });
}

// Debug function for hamburger menu
function debugHamburger() {
    const hamburger = document.getElementById('hamburger');
    const navList = document.getElementById('navList');
    
    console.log('=== DEBUG HAMBURGER ===');
    console.log('Window width:', window.innerWidth);
    console.log('Hamburger exists:', !!hamburger);
    console.log('NavList exists:', !!navList);
    console.log('Hamburger display:', hamburger ? window.getComputedStyle(hamburger).display : 'N/A');
    console.log('======================');
}

// Add keyboard navigation support
document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
        const tooltips = document.querySelectorAll('.tooltip');
        tooltips.forEach(tooltip => tooltip.remove());
    }
    
    if (e.key === 'Tab') {
        document.body.classList.add('keyboard-navigation');
    }
});

document.addEventListener('mousedown', function() {
    document.body.classList.remove('keyboard-navigation');
});

// Initialize on page load
window.addEventListener('load', function() {
    // Hide loading overlay faster on form.html
    const loadingOverlay = document.getElementById('loadingOverlay');
    if (loadingOverlay) {
        if (window.location.pathname.includes('form.html')) {
            // Quickly hide on form page
            loadingOverlay.style.opacity = '0';
            loadingOverlay.style.pointerEvents = 'none';
            setTimeout(() => {
                loadingOverlay.style.display = 'none';
            }, 200);
        } else {
            loadingOverlay.style.display = 'none';
        }
    }
    
    document.body.classList.remove('loading');
    
    const urlParams = new URLSearchParams(window.location.search);
    if (urlParams.get('success') === 'true') {
        const notification = document.getElementById('form-notification');
        if (notification) {
            showNotification('Form berhasil dikirim! Terima kasih atas pendaftaran Anda.', 'success');
        }
    }
    
    // Debug info
    debugHamburger();
});

// Global notification function
window.showNotification = function(message, type) {
    const notification = document.getElementById('form-notification') || 
                       document.querySelector('.form-notification');
    
    if (!notification) {
        const newNotification = document.createElement('div');
        newNotification.id = 'global-notification';
        newNotification.className = 'form-notification';
        document.body.appendChild(newNotification);
        
        newNotification.textContent = message;
        newNotification.className = 'form-notification ' + type;
        newNotification.style.display = 'block';
        
        setTimeout(() => {
            newNotification.style.display = 'none';
        }, 5000);
        
        return;
    }
    
    notification.textContent = message;
    notification.className = 'form-notification ' + type;
    notification.style.display = 'block';
    
    setTimeout(() => {
        notification.style.display = 'none';
    }, 5000);
};

// Add CSS for tooltips and dark mode
const styleSheet = document.createElement('style');
styleSheet.textContent = `
    /* Tooltip styles */
    .tooltip {
        position: fixed;
        background: var(--dark-color);
        color: white;
        padding: 8px 12px;
        border-radius: 4px;
        font-size: 0.9rem;
        z-index: 10000;
        pointer-events: none;
        white-space: nowrap;
        box-shadow: 0 2px 8px rgba(0,0,0,0.2);
    }
    
    .tooltip:after {
        content: '';
        position: absolute;
        top: 100%;
        left: 50%;
        margin-left: -5px;
        border-width: 5px;
        border-style: solid;
        border-color: var(--dark-color) transparent transparent transparent;
    }
    
    /* Mobile touch feedback */
    .touch-active {
        transform: scale(0.98) !important;
        opacity: 0.9 !important;
    }
    
    /* Menu open state */
    body.menu-open {
        overflow: hidden;
    }
    
    /* Mobile connection warning */
    .connection-warning {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        background: var(--error-color);
        color: white;
        padding: 10px;
        text-align: center;
        z-index: 9998;
        display: none;
        font-size: 0.9rem;
    }
    
    .connection-warning i {
        margin-right: 8px;
    }
    
    /* Scrolling performance indicator */
    body.scrolling * {
        animation-play-state: paused !important;
    }
    
    /* Prevent text selection on interactive elements */
    .btn-primary {
        -webkit-user-select: none;
        user-select: none;
        -webkit-tap-highlight-color: transparent;
    }

    .nav-link {
        -webkit-tap-highlight-color: transparent;
    }
    
    /* Loading overlay for mobile */
    .loading-overlay {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(255, 255, 255, 0.95);
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 9999;
        display: none;
    }
    
    .loading-overlay.active {
        display: flex;
    }
    
    /* Landscape specific */
    @media (max-width: 768px) and (orientation: landscape) {
        .main-nav {
            padding-top: 60px;
        }
        
        .hero-section {
            min-height: auto !important;
        }
    }
    
    /* Dark mode styles */
    .dark-mode .tooltip {
        background: var(--light-color);
        color: var(--dark-color);
    }
    
    .dark-mode .tooltip:after {
        border-color: var(--light-color) transparent transparent transparent;
    }
    
    .dark-mode-toggle {
        display: flex;
        align-items: center;
        margin-left: 20px;
    }
    
    .dark-mode-toggle-input {
        display: none;
    }
    
    .dark-mode-toggle-label {
        display: block;
        width: 60px;
        height: 30px;
        background: var(--primary-color);
        border-radius: 15px;
        position: relative;
        cursor: pointer;
    }
    
    .dark-mode-toggle-label i {
        position: absolute;
        top: 50%;
        transform: translateY(-50%);
        font-size: 14px;
        color: white;
    }
    
    .dark-mode-toggle-label .fa-sun {
        left: 8px;
    }
    
    .dark-mode-toggle-label .fa-moon {
        right: 8px;
    }
    
    .dark-mode-toggle-ball {
        position: absolute;
        top: 3px;
        left: 3px;
        width: 24px;
        height: 24px;
        background: white;
        border-radius: 50%;
        transition: transform 0.3s ease;
    }
    
    .dark-mode-toggle-input:checked + .dark-mode-toggle-label .dark-mode-toggle-ball {
        transform: translateX(30px);
    }
    
    /* Dark mode styles */
    body.dark-mode {
        background-color: #0f172a;
        color: #cbd5e1;
    }
    
    body.dark-mode .content-card,
    body.dark-mode .info-card,
    body.dark-mode .about-card,
    body.dark-mode .vision-box,
    body.dark-mode .mission-box,
    body.dark-mode .contact-item,
    body.dark-mode .gallery-item,
    body.dark-mode .touring-form,
    body.dark-mode .form-info,
    body.dark-mode .gallery-intro,
    body.dark-mode .form-intro,
    body.dark-mode .about-intro,
    body.dark-mode .hero-section,
    body.dark-mode .site-header,
    body.dark-mode .tip-item {
        background-color: #1e293b;
        color: #cbd5e1;
    }
    
    body.dark-mode .content-card p,
    body.dark-mode .info-list li,
    body.dark-mode .about-text p,
    body.dark-mode .gallery-info p,
    body.dark-mode .info-item p,
    body.dark-mode .tip-content p {
        color: #cbd5e1;
    }
    
    body.dark-mode .form-group input,
    body.dark-mode .form-group select,
    body.dark-mode .form-group textarea {
        background-color: #334155;
        border-color: #475569;
        color: #e2e8f0;
    }
    
    body.dark-mode .filter-btn {
        background-color: #1e293b;
        color: #cbd5e1;
        border-color: #475569;
    }
    
    body.dark-mode .filter-btn:hover,
    body.dark-mode .filter-btn.active {
        background-color: var(--secondary-color);
        color: white;
    }
    
    body.dark-mode .site-footer {
        background-color: #0a0f1c;
    }
    
    /* Form validation styles */
    .form-group input.error,
    .form-group select.error,
    .form-group textarea.error {
        border-color: var(--error-color) !important;
        box-shadow: 0 0 0 3px rgba(239, 68, 68, 0.1) !important;
    }
    
    .form-group input.success,
    .form-group select.success,
    .form-group textarea.success {
        border-color: var(--success-color) !important;
    }
    
    .checkbox-group.error label {
        color: var(--error-color) !important;
    }
    
    body.dark-mode .form-group input.error,
    body.dark-mode .form-group select.error,
    body.dark-mode .form-group textarea.error {
        border-color: var(--error-color) !important;
    }
    
    /* Keyboard navigation styles */
    .keyboard-navigation *:focus {
        outline: 2px solid var(--accent-color) !important;
        outline-offset: 2px !important;
    }
`;
document.head.appendChild(styleSheet);

// Fix untuk iOS Safari
if (navigator.userAgent.match(/iPhone|iPad|iPod/i)) {
    document.addEventListener('touchstart', function() {}, {passive: true});
}