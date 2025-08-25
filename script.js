// Enhanced Portfolio JavaScript with Animations
class ModernPortfolio {
    constructor() {
        this.init();
        this.setupAnimations();
        this.setupInteractions();
        this.setupParticles();
    }

    init() {
        // DOM Elements
        this.navbar = document.getElementById('navbar');
        this.mobileMenuBtn = document.getElementById('mobile-menu-btn');
        this.mobileMenu = document.getElementById('mobile-menu');
        
        // Event Listeners
        this.setupNavigation();
        this.setupScrollEffects();
        this.setupFormHandling();
    }

    setupNavigation() {
        // Mobile menu toggle
        this.mobileMenuBtn.addEventListener('click', () => {
            this.mobileMenu.classList.toggle('hidden');
            this.animateMobileMenuIcon();
        });

        // Smooth scrolling for navigation links
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', (e) => {
                e.preventDefault();
                const target = document.querySelector(anchor.getAttribute('href'));
                if (target) {
                    this.smoothScrollTo(target);
                    this.mobileMenu.classList.add('hidden');
                }
            });
        });

        // Active navigation highlighting
        this.setupActiveNavigation();
    }

    smoothScrollTo(target) {
        const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - 80;
        window.scrollTo({
            top: targetPosition,
            behavior: 'smooth'
        });
    }

    animateMobileMenuIcon() {
        const icon = this.mobileMenuBtn.querySelector('i');
        if (this.mobileMenu.classList.contains('hidden')) {
            icon.className = 'fas fa-bars text-xl';
        } else {
            icon.className = 'fas fa-times text-xl';
        }
    }

    setupActiveNavigation() {
        const sections = document.querySelectorAll('section[id]');
        const navLinks = document.querySelectorAll('.nav-link, .mobile-nav-link');

        window.addEventListener('scroll', () => {
            let current = '';
            sections.forEach(section => {
                const sectionTop = section.getBoundingClientRect().top;
                if (sectionTop <= 150) {
                    current = section.getAttribute('id');
                }
            });

            navLinks.forEach(link => {
                link.classList.remove('text-primary', 'bg-primary/10');
                if (link.getAttribute('href') === `#${current}`) {
                    link.classList.add('text-primary', 'bg-primary/10');
                }
            });
        });
    }

    setupScrollEffects() {
        // Navbar background change on scroll
        window.addEventListener('scroll', () => {
            const scrollY = window.scrollY;
            
            if (scrollY > 100) {
                this.navbar.style.background = 'rgba(15, 23, 42, 0.95)';
                this.navbar.style.backdropFilter = 'blur(20px)';
            } else {
                this.navbar.style.background = 'rgba(15, 23, 42, 0.8)';
                this.navbar.style.backdropFilter = 'blur(15px)';
            }
        });

        // Parallax effect for background lines
        this.setupParallaxLines();
    }

    setupParallaxLines() {
        const lines = document.querySelectorAll('.line');
        
        window.addEventListener('scroll', () => {
            const scrollTop = window.pageYOffset;
            
            lines.forEach((line, index) => {
                const speed = 0.5 + (index * 0.1);
                const yPos = -(scrollTop * speed);
                line.style.transform = `translateY(${yPos}px)`;
            });
        });
    }

    setupAnimations() {
        // Intersection Observer for scroll animations
        this.setupScrollAnimations();
        
        // Skill bar animations
        this.setupSkillBars();
        
        // Typing effect for hero text
        this.setupTypingEffect();
        
        // Floating animations for decorative elements
        this.setupFloatingElements();
    }

    setupScrollAnimations() {
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animate-in');
                    
                    // Stagger animations for child elements
                    const staggerElements = entry.target.querySelectorAll('[class*="stagger-"]');
                    staggerElements.forEach(el => {
                        el.classList.add('animate-in');
                    });
                }
            });
        }, observerOptions);

        // Observe elements with animation classes
        const animatedElements = document.querySelectorAll('.fade-in-up, .fade-in-left, .fade-in-right');
        animatedElements.forEach(element => {
            observer.observe(element);
        });
    }

    setupSkillBars() {
        const skillObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const skillBars = entry.target.querySelectorAll('.skill-progress');
                    skillBars.forEach((bar, index) => {
                        setTimeout(() => {
                            const width = bar.getAttribute('data-width');
                            bar.style.width = width + '%';
                            
                            // Add counter animation
                            this.animateCounter(bar.previousElementSibling.querySelector('.text-primary, .text-secondary, .text-accent'), parseInt(width));
                        }, index * 200);
                    });
                }
            });
        }, { threshold: 0.5 });

        const aboutSection = document.getElementById('about');
        if (aboutSection) {
            skillObserver.observe(aboutSection);
        }
    }

    animateCounter(element, target) {
        let current = 0;
        const increment = target / 50;
        const timer = setInterval(() => {
            current += increment;
            element.textContent = Math.round(current) + '%';
            
            if (current >= target) {
                element.textContent = target + '%';
                clearInterval(timer);
            }
        }, 30);
    }

    setupTypingEffect() {
        const heroTitle = document.querySelector('.hero-text h1 span');
        if (heroTitle) {
            const text = 'Chathurika Senavirathna';
            const words = text.split(' ');
            let wordIndex = 0;
            let charIndex = 0;
            
            heroTitle.textContent = '';
            
            const typeWriter = () => {
                if (wordIndex < words.length) {
                    if (charIndex < words[wordIndex].length) {
                        heroTitle.textContent += words[wordIndex].charAt(charIndex);
                        charIndex++;
                        setTimeout(typeWriter, 100);
                    } else {
                        heroTitle.textContent += ' ';
                        wordIndex++;
                        charIndex = 0;
                        setTimeout(typeWriter, 200);
                    }
                }
            };
            
            setTimeout(typeWriter, 1000);
        }
    }

    setupFloatingElements() {
        const floatingElements = document.querySelectorAll('.float, .float-delay');
        
        floatingElements.forEach(element => {
            // Add random rotation animation
            const randomRotation = Math.random() * 360;
            element.style.animationDelay = Math.random() * 2 + 's';
            element.style.transform += ` rotate(${randomRotation}deg)`;
        });
    }

    setupInteractions() {
        // Magnetic effect for buttons
        this.setupMagneticButtons();
        
        // Hover effects for project cards
        this.setupProjectCards();
        
        // Interactive cursor
        this.setupCursor();
        
        // Particle system
        this.setupParticleSystem();
    }

    setupMagneticButtons() {
        const buttons = document.querySelectorAll('.btn-modern');
        
        buttons.forEach(button => {
            button.addEventListener('mousemove', (e) => {
                const rect = button.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;
                
                const centerX = rect.width / 2;
                const centerY = rect.height / 2;
                
                const deltaX = (x - centerX) / centerX;
                const deltaY = (y - centerY) / centerY;
                
                button.style.transform = `translate(${deltaX * 10}px, ${deltaY * 10}px) scale(1.05)`;
            });
            
            button.addEventListener('mouseleave', () => {
                button.style.transform = 'translate(0px, 0px) scale(1)';
            });
        });
    }

    setupProjectCards() {
        const projectCards = document.querySelectorAll('.glass');
        
        projectCards.forEach(card => {
            card.addEventListener('mouseenter', () => {
                card.style.transform = 'translateY(-10px) scale(1.02)';
            });
            
            card.addEventListener('mouseleave', () => {
                card.style.transform = 'translateY(0px) scale(1)';
            });
        });
    }

    setupCursor() {
        let cursor = document.createElement('div');
        cursor.className = 'cursor';
        cursor.style.cssText = `
            position: fixed;
            width: 20px;
            height: 20px;
            background: radial-gradient(circle, rgba(99, 102, 241, 0.8), transparent);
            border-radius: 50%;
            pointer-events: none;
            z-index: 9999;
            mix-blend-mode: difference;
            transition: transform 0.1s ease;
        `;
        document.body.appendChild(cursor);

        let trail = [];
        for (let i = 0; i < 5; i++) {
            let dot = document.createElement('div');
            dot.className = 'cursor-trail';
            dot.style.cssText = `
                position: fixed;
                width: ${8 - i * 1}px;
                height: ${8 - i * 1}px;
                background: rgba(99, 102, 241, ${0.5 - i * 0.1});
                border-radius: 50%;
                pointer-events: none;
                z-index: 9998;
                transition: all 0.${i + 1}s ease;
            `;
            document.body.appendChild(dot);
            trail.push(dot);
        }

        document.addEventListener('mousemove', (e) => {
            cursor.style.left = e.clientX - 10 + 'px';
            cursor.style.top = e.clientY - 10 + 'px';
            
            trail.forEach((dot, index) => {
                setTimeout(() => {
                    dot.style.left = e.clientX - (4 - index * 0.5) + 'px';
                    dot.style.top = e.clientY - (4 - index * 0.5) + 'px';
                }, index * 50);
            });
        });

        // Hide cursor on mobile
        if (window.innerWidth <= 768) {
            cursor.style.display = 'none';
            trail.forEach(dot => dot.style.display = 'none');
        }
    }

    setupParticleSystem() {
        const canvas = document.createElement('canvas');
        canvas.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            pointer-events: none;
            z-index: 1;
            opacity: 0.3;
        `;
        document.body.appendChild(canvas);

        const ctx = canvas.getContext('2d');
        const particles = [];
        
        const resizeCanvas = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        };
        
        window.addEventListener('resize', resizeCanvas);
        resizeCanvas();

        class Particle {
            constructor() {
                this.x = Math.random() * canvas.width;
                this.y = Math.random() * canvas.height;
                this.vx = (Math.random() - 0.5) * 0.5;
                this.vy = (Math.random() - 0.5) * 0.5;
                this.radius = Math.random() * 2 + 1;
                this.opacity = Math.random() * 0.5 + 0.2;
            }

            update() {
                this.x += this.vx;
                this.y += this.vy;

                if (this.x < 0 || this.x > canvas.width) this.vx = -this.vx;
                if (this.y < 0 || this.y > canvas.height) this.vy = -this.vy;
            }

            draw() {
                ctx.beginPath();
                ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
                ctx.fillStyle = `rgba(99, 102, 241, ${this.opacity})`;
                ctx.fill();
            }
        }

        // Create particles
        for (let i = 0; i < 50; i++) {
            particles.push(new Particle());
        }

        const animate = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            
            particles.forEach(particle => {
                particle.update();
                particle.draw();
            });
            
            // Connect nearby particles
            particles.forEach((particle, i) => {
                particles.slice(i + 1).forEach(otherParticle => {
                    const distance = Math.hypot(
                        particle.x - otherParticle.x,
                        particle.y - otherParticle.y
                    );
                    
                    if (distance < 100) {
                        ctx.beginPath();
                        ctx.moveTo(particle.x, particle.y);
                        ctx.lineTo(otherParticle.x, otherParticle.y);
                        ctx.strokeStyle = `rgba(99, 102, 241, ${0.1 * (1 - distance / 100)})`;
                        ctx.lineWidth = 1;
                        ctx.stroke();
                    }
                });
            });
            
            requestAnimationFrame(animate);
        };
        
        animate();
    }

    setupParticles() {
        // Create floating geometric shapes
        const shapes = ['triangle', 'square', 'circle'];
        const colors = ['#6366f1', '#8b5cf6', '#06b6d4'];
        
        for (let i = 0; i < 10; i++) {
            const shape = document.createElement('div');
            const shapeType = shapes[Math.floor(Math.random() * shapes.length)];
            const color = colors[Math.floor(Math.random() * colors.length)];
            
            shape.className = `floating-shape ${shapeType}`;
            shape.style.cssText = `
                position: absolute;
                width: ${Math.random() * 20 + 10}px;
                height: ${Math.random() * 20 + 10}px;
                background: ${color};
                opacity: 0.1;
                border-radius: ${shapeType === 'circle' ? '50%' : '0'};
                left: ${Math.random() * 100}%;
                top: ${Math.random() * 100}%;
                animation: float ${Math.random() * 10 + 5}s ease-in-out infinite;
                animation-delay: ${Math.random() * 5}s;
                pointer-events: none;
                z-index: 0;
            `;
            
            document.querySelector('#home').appendChild(shape);
        }
    }

    setupFormHandling() {
        const form = document.getElementById('contact-form');
        if (!form) return;

        form.addEventListener('submit', (e) => {
            e.preventDefault();
            this.handleFormSubmission(form);
        });

        // Real-time validation
        const inputs = form.querySelectorAll('input, textarea');
        inputs.forEach(input => {
            input.addEventListener('blur', () => this.validateField(input));
            input.addEventListener('input', () => this.clearFieldError(input));
        });
    }

    handleFormSubmission(form) {
        const button = form.querySelector('button[type="submit"]');
        const originalText = button.innerHTML;
        
        // Validate all fields
        const isValid = this.validateForm(form);
        if (!isValid) return;

        // Show loading state
        button.innerHTML = '<i class="fas fa-spinner fa-spin mr-2"></i>Sending...';
        button.disabled = true;
        button.classList.add('opacity-75');

        // Simulate API call
        setTimeout(() => {
            button.innerHTML = '<i class="fas fa-check mr-2"></i>Message Sent!';
            button.classList.remove('opacity-75');
            button.classList.add('bg-green-500');
            
            // Show success notification
            this.showNotification('Message sent successfully! I\'ll get back to you soon.', 'success');
            
            // Reset form
            setTimeout(() => {
                button.innerHTML = originalText;
                button.disabled = false;
                button.classList.remove('bg-green-500');
                form.reset();
            }, 2000);
        }, 1500);
    }

    validateForm(form) {
        const inputs = form.querySelectorAll('input[required], textarea[required]');
        let isValid = true;

        inputs.forEach(input => {
            if (!this.validateField(input)) {
                isValid = false;
            }
        });

        return isValid;
    }

    validateField(field) {
        const value = field.value.trim();
        const type = field.type;
        let isValid = true;
        let message = '';

        // Clear previous errors
        this.clearFieldError(field);

        if (!value) {
            isValid = false;
            message = 'This field is required';
        } else if (type === 'email' && !this.isValidEmail(value)) {
            isValid = false;
            message = 'Please enter a valid email address';
        }

        if (!isValid) {
            this.showFieldError(field, message);
        }

        return isValid;
    }

    isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    showFieldError(field, message) {
        field.classList.add('border-red-500', 'border-2');
        
        let errorDiv = field.parentNode.querySelector('.error-message');
        if (!errorDiv) {
            errorDiv = document.createElement('div');
            errorDiv.className = 'error-message text-red-400 text-sm mt-1';
            field.parentNode.appendChild(errorDiv);
        }
        errorDiv.textContent = message;
    }

    clearFieldError(field) {
        field.classList.remove('border-red-500', 'border-2');
        const errorDiv = field.parentNode.querySelector('.error-message');
        if (errorDiv) {
            errorDiv.remove();
        }
    }

    showNotification(message, type = 'info') {
        const notification = document.createElement('div');
        const bgColor = type === 'success' ? 'bg-green-500' : type === 'error' ? 'bg-red-500' : 'bg-blue-500';
        const icon = type === 'success' ? 'fa-check' : type === 'error' ? 'fa-times' : 'fa-info';
        
        notification.className = `fixed top-4 right-4 ${bgColor} text-white px-6 py-3 rounded-lg shadow-lg z-50 transform translate-x-full transition-transform duration-300`;
        notification.innerHTML = `<i class="fas ${icon} mr-2"></i>${message}`;
        
        document.body.appendChild(notification);
        
        // Animate in
        setTimeout(() => {
            notification.classList.remove('translate-x-full');
        }, 100);
        
        // Remove after 4 seconds
        setTimeout(() => {
            notification.classList.add('translate-x-full');
            setTimeout(() => {
                if (document.body.contains(notification)) {
                    document.body.removeChild(notification);
                }
            }, 300);
        }, 4000);
    }

    // Performance optimization
    debounce(func, wait) {
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

    throttle(func, limit) {
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

    // Easter eggs and fun interactions
    setupEasterEggs() {
        let konamiCode = [];
        const expectedCode = [38, 38, 40, 40, 37, 39, 37, 39, 66, 65];

        document.addEventListener('keydown', (e) => {
            konamiCode.push(e.keyCode);
            if (konamiCode.length > expectedCode.length) {
                konamiCode.shift();
            }
            
            if (JSON.stringify(konamiCode) === JSON.stringify(expectedCode)) {
                this.activateEasterEgg();
            }
        });

        // Console messages
        console.log('%c🎨 Welcome to Kavinda\'s Portfolio!', 'color: #6366f1; font-size: 24px; font-weight: bold;');
        console.log('%c🌟 Built with love from Sri Lanka', 'color: #8b5cf6; font-size: 16px;');
        console.log('%c💡 Try the Konami code: ↑↑↓↓←→←→BA', 'color: #06b6d4; font-size: 12px;');
    }

    activateEasterEgg() {
        // Create rainbow effect
        document.body.style.animation = 'rainbow 3s ease-in-out';
        
        // Create celebration particles
        this.createCelebrationEffect();
        
        // Show special message
        this.showNotification('🎉 Ayubowan! You found the secret! Welcome to my portfolio!', 'success');
        
        // Play sound effect (if available)
        this.playSuccessSound();
        
        setTimeout(() => {
            document.body.style.animation = '';
        }, 3000);
    }

    createCelebrationEffect() {
        const colors = ['#6366f1', '#8b5cf6', '#06b6d4', '#f59e0b', '#ef4444'];
        
        for (let i = 0; i < 30; i++) {
            setTimeout(() => {
                const confetti = document.createElement('div');
                confetti.style.cssText = `
                    position: fixed;
                    top: -10px;
                    left: ${Math.random() * 100}%;
                    width: 10px;
                    height: 10px;
                    background: ${colors[Math.floor(Math.random() * colors.length)]};
                    border-radius: ${Math.random() > 0.5 ? '50%' : '0'};
                    z-index: 9999;
                    pointer-events: none;
                    animation: confettiFall 3s ease-out forwards;
                `;
                
                document.body.appendChild(confetti);
                
                setTimeout(() => {
                    if (document.body.contains(confetti)) {
                        document.body.removeChild(confetti);
                    }
                }, 3000);
            }, i * 100);
        }
    }

    playSuccessSound() {
        // Create a simple success sound using Web Audio API
        try {
            const audioContext = new (window.AudioContext || window.webkitAudioContext)();
            const oscillator = audioContext.createOscillator();
            const gainNode = audioContext.createGain();
            
            oscillator.connect(gainNode);
            gainNode.connect(audioContext.destination);
            
            oscillator.frequency.setValueAtTime(587.33, audioContext.currentTime); // D5
            oscillator.frequency.setValueAtTime(698.46, audioContext.currentTime + 0.1); // F5
            oscillator.frequency.setValueAtTime(783.99, audioContext.currentTime + 0.2); // G5
            
            gainNode.gain.setValueAtTime(0.3, audioContext.currentTime);
            gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.5);
            
            oscillator.start(audioContext.currentTime);
            oscillator.stop(audioContext.currentTime + 0.5);
        } catch (e) {
            console.log('Audio not supported');
        }
    }

    // Initialize performance monitoring
    setupPerformanceMonitoring() {
        // Monitor frame rate
        let lastTime = performance.now();
        let frameCount = 0;
        
        const checkFPS = () => {
            const now = performance.now();
            frameCount++;
            
            if (now - lastTime >= 1000) {
                const fps = Math.round((frameCount * 1000) / (now - lastTime));
                if (fps < 30) {
                    console.warn('Low FPS detected:', fps);
                    // Reduce animations if performance is poor
                    this.reduceAnimations();
                }
                frameCount = 0;
                lastTime = now;
            }
            
            requestAnimationFrame(checkFPS);
        };
        
        requestAnimationFrame(checkFPS);
    }

    reduceAnimations() {
        document.documentElement.classList.add('reduce-motion');
    }

    // Clean up function
    destroy() {
        // Remove event listeners and clean up resources
        window.removeEventListener('scroll', this.handleScroll);
        window.removeEventListener('resize', this.handleResize);
        
        // Clear any ongoing animations or intervals
        if (this.animationFrame) {
            cancelAnimationFrame(this.animationFrame);
        }
    }
}

// Additional CSS animations and keyframes
const additionalStyles = `
    @keyframes rainbow {
        0% { filter: hue-rotate(0deg); }
        25% { filter: hue-rotate(90deg); }
        50% { filter: hue-rotate(180deg); }
        75% { filter: hue-rotate(270deg); }
        100% { filter: hue-rotate(360deg); }
    }
    
    @keyframes confettiFall {
        0% {
            transform: translateY(0) rotate(0deg);
            opacity: 1;
        }
        100% {
            transform: translateY(100vh) rotate(360deg);
            opacity: 0;
        }
    }
    
    .animate-in {
        animation-play-state: running !important;
    }
    
    .reduce-motion * {
        animation-duration: 0.01ms !important;
        animation-iteration-count: 1 !important;
        transition-duration: 0.01ms !important;
    }
    
    /* Smooth scrolling improvements */
    html {
        scroll-behavior: smooth;
    }
    
    @media (prefers-reduced-motion: reduce) {
        html {
            scroll-behavior: auto;
        }
        
        *, *::before, *::after {
            animation-duration: 0.01ms !important;
            animation-iteration-count: 1 !important;
            transition-duration: 0.01ms !important;
        }
    }
    
    /* Loading states */
    .loading {
        position: relative;
        overflow: hidden;
    }
    
    .loading::after {
        content: '';
        position: absolute;
        top: 0;
        left: -100%;
        width: 100%;
        height: 100%;
        background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.2), transparent);
        animation: shimmer 1.5s infinite;
    }
    
    @keyframes shimmer {
        100% { left: 100%; }
    }
`;

// Inject additional styles
const styleSheet = document.createElement('style');
styleSheet.textContent = additionalStyles;
document.head.appendChild(styleSheet);

// Initialize the portfolio when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    const portfolio = new ModernPortfolio();
    portfolio.setupEasterEggs();
    portfolio.setupPerformanceMonitoring();
    
    // Make portfolio instance globally available for debugging
    window.portfolio = portfolio;
});

// Handle page visibility changes for performance
document.addEventListener('visibilitychange', () => {
    if (document.hidden) {
        // Pause animations when tab is not visible
        document.body.classList.add('paused');
    } else {
        // Resume animations when tab becomes visible
        document.body.classList.remove('paused');
    }
});

// Service Worker registration for offline support (optional)
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('/sw.js')
            .then(registration => {
                console.log('SW registered: ', registration);
            })
            .catch(registrationError => {
                console.log('SW registration failed: ', registrationError);
            });
    });
}