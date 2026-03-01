// Main JavaScript for Student Intel Management Platform

document.addEventListener('DOMContentLoaded', function() {
    // Initialize all components
    initStickyHeader();
    initDropdownMenus();
    initSearchFunctionality();
    initNotificationSystem();
    initFloatingCards();
    initFeatureCards();
    initStatsCounter();
    initTestimonialSlider();
    initScrollAnimations();
    initSubscriptionForm();
    initMobileMenu();
    initThemeSwitcher();
    initBackToTop();
    initPreloader();
});

// Sticky Header with Scroll Effect
function initStickyHeader() {
    const header = document.querySelector('.header');
    let lastScrollY = window.scrollY;
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 100) {
            header.classList.add('scrolled');
            
            // Hide/show header on scroll direction
            if (window.scrollY > lastScrollY) {
                header.style.transform = 'translateY(-100%)';
            } else {
                header.style.transform = 'translateY(0)';
            }
        } else {
            header.classList.remove('scrolled');
            header.style.transform = 'translateY(0)';
        }
        
        lastScrollY = window.scrollY;
    });
}

// Advanced Dropdown Menus
function initDropdownMenus() {
    const dropdowns = document.querySelectorAll('.dropdown');
    
    dropdowns.forEach(dropdown => {
        const link = dropdown.querySelector('.nav-link');
        const menu = dropdown.querySelector('.dropdown-menu');
        
        // Show dropdown on hover
        dropdown.addEventListener('mouseenter', () => {
            menu.style.opacity = '1';
            menu.style.visibility = 'visible';
            menu.style.transform = 'translateY(0)';
        });
        
        // Hide dropdown when mouse leaves
        dropdown.addEventListener('mouseleave', () => {
            menu.style.opacity = '0';
            menu.style.visibility = 'hidden';
            menu.style.transform = 'translateY(10px)';
        });
        
        // Touch devices support
        link.addEventListener('click', (e) => {
            if (window.innerWidth <= 768) {
                e.preventDefault();
                const isActive = menu.style.visibility === 'visible';
                
                // Close all other dropdowns
                document.querySelectorAll('.dropdown-menu').forEach(otherMenu => {
                    if (otherMenu !== menu) {
                        otherMenu.style.opacity = '0';
                        otherMenu.style.visibility = 'hidden';
                        otherMenu.style.transform = 'translateY(10px)';
                    }
                });
                
                // Toggle current dropdown
                if (!isActive) {
                    menu.style.opacity = '1';
                    menu.style.visibility = 'visible';
                    menu.style.transform = 'translateY(0)';
                } else {
                    menu.style.opacity = '0';
                    menu.style.visibility = 'hidden';
                    menu.style.transform = 'translateY(10px)';
                }
            }
        });
    });
    
    // Close dropdowns when clicking outside
    document.addEventListener('click', (e) => {
        if (!e.target.closest('.dropdown')) {
            document.querySelectorAll('.dropdown-menu').forEach(menu => {
                menu.style.opacity = '0';
                menu.style.visibility = 'hidden';
                menu.style.transform = 'translateY(10px)';
            });
        }
    });
}

// Search Functionality with Debounce
function initSearchFunctionality() {
    const searchBox = document.querySelector('.search-box input');
    const searchBtn = document.querySelector('.search-btn');
    
    // Mock search data (in real app, this would come from API)
    const mockData = [
        'Student Profiles', 'Course Management', 'Attendance Records', 
        'Grade Analytics', 'Performance Reports', 'Assignment Tracking',
        'Teacher Resources', 'Parent Portal', 'Scheduling System'
    ];
    
    let searchTimeout;
    
    searchBox.addEventListener('input', (e) => {
        clearTimeout(searchTimeout);
        
        searchTimeout = setTimeout(() => {
            const query = e.target.value.toLowerCase().trim();
            
            if (query.length > 2) {
                showSearchResults(query);
            } else {
                hideSearchResults();
            }
        }, 300);
    });
    
    searchBtn.addEventListener('click', () => {
        const query = searchBox.value.trim();
        if (query) {
            performSearch(query);
        }
    });
    
    function showSearchResults(query) {
        // Remove existing results
        hideSearchResults();
        
        const filteredResults = mockData.filter(item => 
            item.toLowerCase().includes(query)
        );
        
        if (filteredResults.length > 0) {
            const resultsContainer = document.createElement('div');
            resultsContainer.className = 'search-results';
            resultsContainer.innerHTML = `
                <div class="search-results-header">
                    <h4>Search Results</h4>
                    <span>${filteredResults.length} results found</span>
                </div>
                <div class="search-results-list">
                    ${filteredResults.map(result => `
                        <div class="search-result-item">
                            <i class="fas fa-search"></i>
                            <span>${result}</span>
                        </div>
                    `).join('')}
                </div>
            `;
            
            // Add styles for search results
            const style = document.createElement('style');
            style.textContent = `
                .search-results {
                    position: absolute;
                    top: 100%;
                    left: 0;
                    right: 0;
                    background: white;
                    border-radius: 12px;
                    box-shadow: 0 20px 25px rgba(0,0,0,0.15), 0 10px 10px rgba(0,0,0,0.04);
                    margin-top: 10px;
                    z-index: 1000;
                    overflow: hidden;
                }
                .search-results-header {
                    padding: 1rem 1.5rem;
                    border-bottom: 1px solid #e9ecef;
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                }
                .search-results-header h4 {
                    margin: 0;
                    font-size: 1rem;
                    color: #1d3557;
                }
                .search-results-header span {
                    font-size: 0.85rem;
                    color: #6c757d;
                }
                .search-results-list {
                    max-height: 300px;
                    overflow-y: auto;
                }
                .search-result-item {
                    padding: 1rem 1.5rem;
                    display: flex;
                    align-items: center;
                    gap: 1rem;
                    cursor: pointer;
                    transition: all 0.3s ease;
                }
                .search-result-item:hover {
                    background: #f8f9fa;
                }
                .search-result-item i {
                    color: #4361ee;
                    width: 16px;
                }
            `;
            
            document.head.appendChild(style);
            document.querySelector('.search-box').appendChild(resultsContainer);
            
            // Add click handlers for results
            resultsContainer.querySelectorAll('.search-result-item').forEach(item => {
                item.addEventListener('click', () => {
                    searchBox.value = item.querySelector('span').textContent;
                    hideSearchResults();
                    performSearch(searchBox.value);
                });
            });
        }
    }
    
    function hideSearchResults() {
        const existingResults = document.querySelector('.search-results');
        if (existingResults) {
            existingResults.remove();
        }
    }
    
    function performSearch(query) {
        // Show search modal or redirect to search page
        showNotification(`Searching for: "${query}"`, 'info');
        
        // In a real application, you would make an API call here
        console.log('Performing search for:', query);
    }
}

// Notification System
function initNotificationSystem() {
    const notificationBtn = document.querySelector('.notification-btn');
    const notificationBadge = document.querySelector('.notification-badge');
    
    // Mock notifications
    const notifications = [
        {
            id: 1,
            title: 'New Assignment Posted',
            message: 'Mathematics assignment due next Friday',
            time: '5 min ago',
            type: 'academic',
            read: false
        },
        {
            id: 2,
            title: 'Attendance Alert',
            message: '3 students marked absent today',
            time: '1 hour ago',
            type: 'attendance',
            read: false
        },
        {
            id: 3,
            title: 'System Update',
            message: 'New features available in Student Analytics',
            time: '2 hours ago',
            type: 'system',
            read: true
        }
    ];
    
    notificationBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        toggleNotificationPanel();
    });
    
    function toggleNotificationPanel() {
        const existingPanel = document.querySelector('.notification-panel');
        
        if (existingPanel) {
            existingPanel.remove();
            return;
        }
        
        const panel = document.createElement('div');
        panel.className = 'notification-panel';
        panel.innerHTML = `
            <div class="notification-header">
                <h3>Notifications</h3>
                <span class="notification-count">${notifications.filter(n => !n.read).length} unread</span>
            </div>
            <div class="notification-list">
                ${notifications.map(notification => `
                    <div class="notification-item ${notification.read ? 'read' : 'unread'}" data-id="${notification.id}">
                        <div class="notification-icon">
                            <i class="fas fa-${getNotificationIcon(notification.type)}"></i>
                        </div>
                        <div class="notification-content">
                            <h4>${notification.title}</h4>
                            <p>${notification.message}</p>
                            <span class="notification-time">${notification.time}</span>
                        </div>
                        ${!notification.read ? '<div class="notification-dot"></div>' : ''}
                    </div>
                `).join('')}
            </div>
            <div class="notification-footer">
                <button class="mark-all-read">Mark all as read</button>
                <button class="view-all">View all notifications</button>
            </div>
        `;
        
        // Add styles for notification panel
        const style = document.createElement('style');
        style.textContent = `
            .notification-panel {
                position: absolute;
                top: 100%;
                right: 0;
                width: 380px;
                background: white;
                border-radius: 12px;
                box-shadow: 0 20px 25px rgba(0,0,0,0.15), 0 10px 10px rgba(0,0,0,0.04);
                margin-top: 10px;
                z-index: 1000;
                overflow: hidden;
            }
            .notification-header {
                padding: 1.5rem;
                border-bottom: 1px solid #e9ecef;
                display: flex;
                justify-content: space-between;
                align-items: center;
            }
            .notification-header h3 {
                margin: 0;
                font-size: 1.2rem;
                color: #1d3557;
            }
            .notification-count {
                background: #e63946;
                color: white;
                padding: 0.3rem 0.7rem;
                border-radius: 50px;
                font-size: 0.8rem;
                font-weight: 600;
            }
            .notification-list {
                max-height: 400px;
                overflow-y: auto;
            }
            .notification-item {
                padding: 1.2rem 1.5rem;
                display: flex;
                align-items: flex-start;
                gap: 1rem;
                cursor: pointer;
                transition: all 0.3s ease;
                position: relative;
                border-bottom: 1px solid #f8f9fa;
            }
            .notification-item:hover {
                background: #f8f9fa;
            }
            .notification-item.unread {
                background: #f0f7ff;
            }
            .notification-icon {
                width: 40px;
                height: 40px;
                border-radius: 50%;
                background: #4361ee;
                color: white;
                display: flex;
                align-items: center;
                justify-content: center;
                flex-shrink: 0;
            }
            .notification-content h4 {
                margin: 0 0 0.3rem 0;
                font-size: 0.95rem;
                color: #1d3557;
            }
            .notification-content p {
                margin: 0 0 0.5rem 0;
                font-size: 0.85rem;
                color: #6c757d;
                line-height: 1.4;
            }
            .notification-time {
                font-size: 0.75rem;
                color: #a0aec0;
            }
            .notification-dot {
                position: absolute;
                top: 1.2rem;
                right: 1.5rem;
                width: 8px;
                height: 8px;
                background: #e63946;
                border-radius: 50%;
            }
            .notification-footer {
                padding: 1rem 1.5rem;
                border-top: 1px solid #e9ecef;
                display: flex;
                justify-content: space-between;
            }
            .notification-footer button {
                background: none;
                border: none;
                color: #4361ee;
                font-size: 0.85rem;
                cursor: pointer;
                padding: 0.5rem;
                border-radius: 4px;
                transition: all 0.3s ease;
            }
            .notification-footer button:hover {
                background: #f8f9fa;
            }
        `;
        
        document.head.appendChild(style);
        document.querySelector('.notification-btn').appendChild(panel);
        
        // Add event listeners
        panel.querySelector('.mark-all-read').addEventListener('click', markAllAsRead);
        panel.querySelectorAll('.notification-item').forEach(item => {
            item.addEventListener('click', () => markAsRead(item.dataset.id));
        });
        
        // Close panel when clicking outside
        document.addEventListener('click', closeNotificationPanel);
    }
    
    function closeNotificationPanel(e) {
        if (!e.target.closest('.notification-btn') && !e.target.closest('.notification-panel')) {
            const panel = document.querySelector('.notification-panel');
            if (panel) panel.remove();
            document.removeEventListener('click', closeNotificationPanel);
        }
    }
    
    function markAsRead(id) {
        const notification = notifications.find(n => n.id == id);
        if (notification && !notification.read) {
            notification.read = true;
            updateNotificationBadge();
            
            const item = document.querySelector(`.notification-item[data-id="${id}"]`);
            if (item) {
                item.classList.remove('unread');
                item.classList.add('read');
                const dot = item.querySelector('.notification-dot');
                if (dot) dot.remove();
            }
        }
    }
    
    function markAllAsRead() {
        notifications.forEach(notification => {
            notification.read = true;
        });
        updateNotificationBadge();
        
        document.querySelectorAll('.notification-item').forEach(item => {
            item.classList.remove('unread');
            item.classList.add('read');
            const dot = item.querySelector('.notification-dot');
            if (dot) dot.remove();
        });
    }
    
    function updateNotificationBadge() {
        const unreadCount = notifications.filter(n => !n.read).length;
        if (unreadCount > 0) {
            notificationBadge.textContent = unreadCount;
            notificationBadge.style.display = 'flex';
        } else {
            notificationBadge.style.display = 'none';
        }
    }
    
    function getNotificationIcon(type) {
        const icons = {
            academic: 'book',
            attendance: 'user-clock',
            system: 'cog',
            default: 'bell'
        };
        return icons[type] || icons.default;
    }
}

// Enhanced Floating Cards Animation
function initFloatingCards() {
    const floatingCards = document.querySelectorAll('.floating-card');
    
    floatingCards.forEach((card, index) => {
        // Add random slight variations to animation
        const delay = index * 0.5;
        const duration = 6 + (index * 0.5);
        
        card.style.animation = `float ${duration}s ease-in-out ${delay}s infinite`;
        
        // Add interactive effects
        card.addEventListener('mouseenter', () => {
            card.style.animationPlayState = 'paused';
            card.style.transform = 'translateY(-20px) scale(1.05)';
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.animationPlayState = 'running';
            card.style.transform = 'translateY(0) scale(1)';
        });
        
        // Add click effect
        card.addEventListener('click', () => {
            card.style.transform = 'translateY(-10px) scale(0.95)';
            setTimeout(() => {
                card.style.transform = 'translateY(-20px) scale(1.05)';
            }, 150);
            
            showNotification(`Opening ${card.querySelector('h3').textContent}`, 'info');
        });
    });
}

// Feature Cards Interactive Effects
function initFeatureCards() {
    const featureCards = document.querySelectorAll('.feature-card');
    
    featureCards.forEach(card => {
        // Add tilt effect on mouse move
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            const angleY = (x - centerX) / 25;
            const angleX = (centerY - y) / 25;
            
            card.style.transform = `perspective(1000px) rotateX(${angleX}deg) rotateY(${angleY}deg) translateY(-10px)`;
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateY(-10px)';
        });
        
        // Add click to expand functionality
        card.addEventListener('click', () => {
            const isExpanded = card.classList.contains('expanded');
            
            // Close all other expanded cards
            document.querySelectorAll('.feature-card.expanded').forEach(otherCard => {
                if (otherCard !== card) {
                    otherCard.classList.remove('expanded');
                }
            });
            
            // Toggle current card
            card.classList.toggle('expanded', !isExpanded);
        });
    });
}

// Animated Stats Counter
function initStatsCounter() {
    const statNumbers = document.querySelectorAll('.stat-number');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const statNumber = entry.target;
                const target = parseInt(statNumber.textContent.replace(/[^0-9]/g, ''));
                const suffix = statNumber.textContent.replace(/[0-9]/g, '');
                
                animateCounter(statNumber, 0, target, 2000, suffix);
                observer.unobserve(statNumber);
            }
        });
    }, { threshold: 0.5 });
    
    statNumbers.forEach(stat => observer.observe(stat));
    
    function animateCounter(element, start, end, duration, suffix) {
        let startTimestamp = null;
        const step = (timestamp) => {
            if (!startTimestamp) startTimestamp = timestamp;
            const progress = Math.min((timestamp - startTimestamp) / duration, 1);
            
            // Easing function for smooth animation
            const easeOutQuart = 1 - Math.pow(1 - progress, 4);
            const value = Math.floor(easeOutQuart * (end - start) + start);
            
            element.textContent = value.toLocaleString() + suffix;
            
            if (progress < 1) {
                window.requestAnimationFrame(step);
            }
        };
        window.requestAnimationFrame(step);
    }
}

// Testimonial Slider
function initTestimonialSlider() {
    const testimonialCards = document.querySelectorAll('.testimonial-card');
    let currentIndex = 0;
    
    // Only initialize if we have multiple testimonials
    if (testimonialCards.length <= 1) return;
    
    // Create navigation dots
    const testimonialSection = document.querySelector('.testimonials .container');
    const dotsContainer = document.createElement('div');
    dotsContainer.className = 'testimonial-dots';
    
    testimonialCards.forEach((_, index) => {
        const dot = document.createElement('button');
        dot.className = `testimonial-dot ${index === 0 ? 'active' : ''}`;
        dot.addEventListener('click', () => showTestimonial(index));
        dotsContainer.appendChild(dot);
    });
    
    testimonialSection.appendChild(dotsContainer);
    
    // Add styles for dots
    const style = document.createElement('style');
    style.textContent = `
        .testimonial-dots {
            display: flex;
            justify-content: center;
            gap: 0.5rem;
            margin-top: 2rem;
        }
        .testimonial-dot {
            width: 12px;
            height: 12px;
            border-radius: 50%;
            border: none;
            background: #e9ecef;
            cursor: pointer;
            transition: all 0.3s ease;
        }
        .testimonial-dot.active {
            background: #4361ee;
            transform: scale(1.2);
        }
        .testimonial-dot:hover {
            background: #adb5bd;
        }
    `;
    document.head.appendChild(style);
    
    // Auto-rotate testimonials
    setInterval(() => {
        currentIndex = (currentIndex + 1) % testimonialCards.length;
        showTestimonial(currentIndex);
    }, 5000);
    
    function showTestimonial(index) {
        // Hide all testimonials
        testimonialCards.forEach(card => {
            card.style.opacity = '0';
            card.style.transform = 'translateX(20px)';
            card.style.display = 'none';
        });
        
        // Show selected testimonial
        testimonialCards[index].style.display = 'block';
        setTimeout(() => {
            testimonialCards[index].style.opacity = '1';
            testimonialCards[index].style.transform = 'translateX(0)';
        }, 50);
        
        // Update dots
        document.querySelectorAll('.testimonial-dot').forEach((dot, i) => {
            dot.classList.toggle('active', i === index);
        });
        
        currentIndex = index;
    }
    
    // Initialize first testimonial
    showTestimonial(0);
}

// Scroll Animations
function initScrollAnimations() {
    const animatedElements = document.querySelectorAll('.feature-card, .stat-card, .testimonial-card');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
            }
        });
    }, { threshold: 0.1 });
    
    animatedElements.forEach(element => observer.observe(element));
    
    // Add CSS for animations
    const style = document.createElement('style');
    style.textContent = `
        .feature-card, .stat-card, .testimonial-card {
            opacity: 0;
            transform: translateY(30px);
            transition: all 0.6s ease;
        }
        .feature-card.animate-in, .stat-card.animate-in, .testimonial-card.animate-in {
            opacity: 1;
            transform: translateY(0);
        }
        
        /* Stagger animation for feature cards */
        .features-grid .feature-card:nth-child(1) { transition-delay: 0.1s; }
        .features-grid .feature-card:nth-child(2) { transition-delay: 0.2s; }
        .features-grid .feature-card:nth-child(3) { transition-delay: 0.3s; }
        .features-grid .feature-card:nth-child(4) { transition-delay: 0.4s; }
        .features-grid .feature-card:nth-child(5) { transition-delay: 0.5s; }
        .features-grid .feature-card:nth-child(6) { transition-delay: 0.6s; }
        
        /* Expanded feature card styles */
        .feature-card.expanded {
            grid-column: 1 / -1;
            transform: translateY(-10px) scale(1.02);
            z-index: 10;
        }
    `;
    document.head.appendChild(style);
}

// Subscription Form
function initSubscriptionForm() {
    const subscribeForm = document.querySelector('.subscribe-form');
    const emailInput = subscribeForm.querySelector('input');
    const subscribeBtn = subscribeForm.querySelector('.subscribe-btn');
    
    subscribeForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const email = emailInput.value.trim();
        
        if (validateEmail(email)) {
            // Simulate API call
            subscribeBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i>';
            subscribeBtn.disabled = true;
            
            setTimeout(() => {
                showNotification('Successfully subscribed to our newsletter!', 'success');
                emailInput.value = '';
                subscribeBtn.innerHTML = '<i class="fas fa-paper-plane"></i>';
                subscribeBtn.disabled = false;
            }, 1500);
        } else {
            showNotification('Please enter a valid email address', 'error');
            emailInput.focus();
        }
    });
    
    function validateEmail(email) {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email);
    }
}

// Mobile Menu
function initMobileMenu() {
    const header = document.querySelector('.header-container');
    const nav = document.querySelector('.main-nav');
    
    // Create mobile menu button
    const mobileMenuBtn = document.createElement('button');
    mobileMenuBtn.className = 'mobile-menu-btn';
    mobileMenuBtn.innerHTML = '<span></span><span></span><span></span>';
    mobileMenuBtn.setAttribute('aria-label', 'Toggle menu');
    
    header.appendChild(mobileMenuBtn);
    
    // Add styles for mobile menu
    const style = document.createElement('style');
    style.textContent = `
        .mobile-menu-btn {
            display: none;
            flex-direction: column;
            justify-content: space-between;
            width: 30px;
            height: 21px;
            background: none;
            border: none;
            cursor: pointer;
            padding: 0;
        }
        .mobile-menu-btn span {
            display: block;
            height: 3px;
            width: 100%;
            background: #1d3557;
            border-radius: 3px;
            transition: all 0.3s ease;
        }
        .mobile-menu-btn.active span:nth-child(1) {
            transform: translateY(9px) rotate(45deg);
        }
        .mobile-menu-btn.active span:nth-child(2) {
            opacity: 0;
        }
        .mobile-menu-btn.active span:nth-child(3) {
            transform: translateY(-9px) rotate(-45deg);
        }
        
        @media (max-width: 768px) {
            .mobile-menu-btn {
                display: flex;
            }
            .main-nav {
                position: fixed;
                top: 70px;
                left: 0;
                right: 0;
                background: white;
                box-shadow: 0 10px 15px rgba(0,0,0,0.1);
                padding: 1rem;
                transform: translateY(-100%);
                opacity: 0;
                visibility: hidden;
                transition: all 0.3s ease;
                z-index: 999;
            }
            .main-nav.active {
                transform: translateY(0);
                opacity: 1;
                visibility: visible;
            }
            .nav-list {
                flex-direction: column;
                gap: 0;
            }
            .nav-item {
                width: 100%;
            }
            .nav-link {
                padding: 1rem;
                border-radius: 8px;
                margin-bottom: 0.5rem;
            }
            .dropdown-menu {
                position: static;
                width: 100%;
                box-shadow: none;
                opacity: 1;
                visibility: visible;
                transform: none;
                padding: 0;
                background: #f8f9fa;
                border-radius: 8px;
                margin-top: 0.5rem;
            }
        }
    `;
    document.head.appendChild(style);
    
    // Toggle mobile menu
    mobileMenuBtn.addEventListener('click', () => {
        mobileMenuBtn.classList.toggle('active');
        nav.classList.toggle('active');
    });
    
    // Close menu when clicking on a link
    nav.addEventListener('click', (e) => {
        if (e.target.tagName === 'A') {
            mobileMenuBtn.classList.remove('active');
            nav.classList.remove('active');
        }
    });
}

// Theme Switcher
function initThemeSwitcher() {
    // Create theme switcher button
    const themeBtn = document.createElement('button');
    themeBtn.className = 'theme-switcher';
    themeBtn.innerHTML = '<i class="fas fa-moon"></i>';
    themeBtn.setAttribute('aria-label', 'Toggle theme');
    
    document.querySelector('.header-actions').appendChild(themeBtn);
    
    // Check for saved theme or prefer-color-scheme
    const savedTheme = localStorage.getItem('theme') || 
                      (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
    
    if (savedTheme === 'dark') {
        document.body.classList.add('dark-theme');
        themeBtn.innerHTML = '<i class="fas fa-sun"></i>';
    }
    
    // Add styles for dark theme
    const style = document.createElement('style');
    style.textContent = `
        .theme-switcher {
            background: none;
            border: none;
            color: #1d3557;
            font-size: 1.2rem;
            cursor: pointer;
            padding: 0.5rem;
            border-radius: 50%;
            transition: all 0.3s ease;
        }
        .theme-switcher:hover {
            background: #e9ecef;
        }
        
        .dark-theme {
            --dark: #f8f9fa;
            --light: #1a1d23;
            --gray-light: #2d3748;
            background: #1a1d23;
            color: #e2e8f0;
        }
        .dark-theme .header {
            background: rgba(26, 29, 35, 0.95);
        }
        .dark-theme .feature-card,
        .dark-theme .testimonial-card,
        .dark-theme .floating-card {
            background: #2d3748;
            color: #e2e8f0;
        }
        .dark-theme .search-box {
            background: #2d3748;
        }
        .dark-theme .search-box input {
            color: #e2e8f0;
        }
        .dark-theme .search-box input::placeholder {
            color: #a0aec0;
        }
    `;
    document.head.appendChild(style);
    
    // Toggle theme
    themeBtn.addEventListener('click', () => {
        document.body.classList.toggle('dark-theme');
        
        if (document.body.classList.contains('dark-theme')) {
            localStorage.setItem('theme', 'dark');
            themeBtn.innerHTML = '<i class="fas fa-sun"></i>';
        } else {
            localStorage.setItem('theme', 'light');
            themeBtn.innerHTML = '<i class="fas fa-moon"></i>';
        }
    });
}

// Back to Top Button
function initBackToTop() {
    const backToTopBtn = document.createElement('button');
    backToTopBtn.className = 'back-to-top';
    backToTopBtn.innerHTML = '<i class="fas fa-chevron-up"></i>';
    backToTopBtn.setAttribute('aria-label', 'Back to top');
    
    document.body.appendChild(backToTopBtn);
    
    // Add styles
    const style = document.createElement('style');
    style.textContent = `
        .back-to-top {
            position: fixed;
            bottom: 2rem;
            right: 2rem;
            width: 50px;
            height: 50px;
            background: #4361ee;
            color: white;
            border: none;
            border-radius: 50%;
            cursor: pointer;
            opacity: 0;
            visibility: hidden;
            transform: translateY(20px);
            transition: all 0.3s ease;
            z-index: 1000;
            display: flex;
            align-items: center;
            justify-content: center;
            box-shadow: 0 4px 6px rgba(0,0,0,0.1);
        }
        .back-to-top.visible {
            opacity: 1;
            visibility: visible;
            transform: translateY(0);
        }
        .back-to-top:hover {
            background: #3a56d4;
            transform: translateY(-3px);
        }
    `;
    document.head.appendChild(style);
    
    // Show/hide button based on scroll position
    window.addEventListener('scroll', () => {
        if (window.scrollY > 500) {
            backToTopBtn.classList.add('visible');
        } else {
            backToTopBtn.classList.remove('visible');
        }
    });
    
    // Scroll to top when clicked
    backToTopBtn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

// Preloader
function initPreloader() {
    const preloader = document.createElement('div');
    preloader.className = 'preloader';
    preloader.innerHTML = `
        <div class="preloader-content">
            <div class="preloader-spinner"></div>
            <div class="preloader-text">Loading Student Intel</div>
        </div>
    `;
    
    document.body.appendChild(preloader);
    
    // Add styles
    const style = document.createElement('style');
    style.textContent = `
        .preloader {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: #4361ee;
            display: flex;
            align-items: center;
            justify-content: center;
            z-index: 9999;
            transition: opacity 0.5s ease, visibility 0.5s ease;
        }
        .preloader-content {
            text-align: center;
            color: white;
        }
        .preloader-spinner {
            width: 50px;
            height: 50px;
            border: 3px solid rgba(255,255,255,0.3);
            border-top: 3px solid white;
            border-radius: 50%;
            animation: spin 1s linear infinite;
            margin: 0 auto 1rem;
        }
        .preloader-text {
            font-size: 1.2rem;
            font-weight: 500;
        }
        @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
        }
        .preloader.loaded {
            opacity: 0;
            visibility: hidden;
        }
    `;
    document.head.appendChild(style);
    
    // Hide preloader when page is loaded
    window.addEventListener('load', () => {
        setTimeout(() => {
            preloader.classList.add('loaded');
            setTimeout(() => {
                preloader.remove();
            }, 500);
        }, 1000);
    });
}

// Global Notification Function
function showNotification(message, type = 'info') {
    // Remove existing notification
    const existingNotification = document.querySelector('.global-notification');
    if (existingNotification) {
        existingNotification.remove();
    }
    
    const notification = document.createElement('div');
    notification.className = `global-notification ${type}`;
    notification.innerHTML = `
        <div class="notification-message">
            <i class="fas fa-${getNotificationIconByType(type)}"></i>
            <span>${message}</span>
        </div>
        <button class="notification-close">
            <i class="fas fa-times"></i>
        </button>
    `;
    
    document.body.appendChild(notification);
    
    // Add styles
    if (!document.querySelector('#notification-styles')) {
        const style = document.createElement('style');
        style.id = 'notification-styles';
        style.textContent = `
            .global-notification {
                position: fixed;
                top: 100px;
                right: 2rem;
                background: white;
                padding: 1rem 1.5rem;
                border-radius: 12px;
                box-shadow: 0 10px 15px rgba(0,0,0,0.1);
                display: flex;
                align-items: center;
                gap: 1rem;
                z-index: 10000;
                transform: translateX(400px);
                opacity: 0;
                transition: all 0.3s ease;
                max-width: 400px;
            }
            .global-notification.show {
                transform: translateX(0);
                opacity: 1;
            }
            .global-notification.info {
                border-left: 4px solid #4361ee;
            }
            .global-notification.success {
                border-left: 4px solid #4cc9f0;
            }
            .global-notification.error {
                border-left: 4px solid #e63946;
            }
            .notification-message {
                display: flex;
                align-items: center;
                gap: 0.7rem;
                flex: 1;
            }
            .notification-message i {
                font-size: 1.2rem;
            }
            .global-notification.info .notification-message i {
                color: #4361ee;
            }
            .global-notification.success .notification-message i {
                color: #4cc9f0;
            }
            .global-notification.error .notification-message i {
                color: #e63946;
            }
            .notification-close {
                background: none;
                border: none;
                color: #6c757d;
                cursor: pointer;
                padding: 0.3rem;
                border-radius: 4px;
                transition: all 0.3s ease;
            }
            .notification-close:hover {
                background: #f8f9fa;
                color: #1d3557;
            }
        `;
        document.head.appendChild(style);
    }
    
    // Show notification
    setTimeout(() => {
        notification.classList.add('show');
    }, 100);
    
    // Auto hide after 5 seconds
    const autoHide = setTimeout(() => {
        hideNotification(notification);
    }, 5000);
    
    // Close button
    notification.querySelector('.notification-close').addEventListener('click', () => {
        clearTimeout(autoHide);
        hideNotification(notification);
    });
    
    function hideNotification(notificationElement) {
        notificationElement.classList.remove('show');
        setTimeout(() => {
            if (notificationElement.parentNode) {
                notificationElement.remove();
            }
        }, 300);
    }
    
    function getNotificationIconByType(type) {
        const icons = {
            info: 'info-circle',
            success: 'check-circle',
            error: 'exclamation-circle'
        };
        return icons[type] || 'info-circle';
    }
}

// Utility function for smooth scrolling to sections
function smoothScrollTo(target) {
    const element = document.querySelector(target);
    if (element) {
        const headerHeight = document.querySelector('.header').offsetHeight;
        const targetPosition = element.offsetTop - headerHeight;
        
        window.scrollTo({
            top: targetPosition,
            behavior: 'smooth'
        });
    }
}

// Add click handlers for navigation links
document.addEventListener('DOMContentLoaded', function() {
    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = this.getAttribute('href');
            if (target !== '#') {
                smoothScrollTo(target);
            }
        });
    });
    
    // Add interactive effects to buttons
    document.querySelectorAll('.btn').forEach(button => {
        button.addEventListener('click', function(e) {
            // Create ripple effect
            const ripple = document.createElement('span');
            const rect = this.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            const x = e.clientX - rect.left - size / 2;
            const y = e.clientY - rect.top - size / 2;
            
            ripple.style.width = ripple.style.height = size + 'px';
            ripple.style.left = x + 'px';
            ripple.style.top = y + 'px';
            ripple.classList.add('ripple');
            
            this.appendChild(ripple);
            
            // Remove ripple after animation
            setTimeout(() => {
                ripple.remove();
            }, 600);
        });
    });
});

// Add ripple effect styles
const rippleStyles = document.createElement('style');
rippleStyles.textContent = `
    .btn {
        position: relative;
        overflow: hidden;
    }
    .ripple {
        position: absolute;
        border-radius: 50%;
        background: rgba(255, 255, 255, 0.7);
        transform: scale(0);
        animation: ripple-animation 0.6s linear;
        pointer-events: none;
    }
    @keyframes ripple-animation {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
`;
document.head.appendChild(rippleStyles);