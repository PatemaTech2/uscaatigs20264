// ========================================
// GSAP Timeline for hero animations
// ========================================

const heroTimeline = gsap.timeline();

heroTimeline
    .to("#hero-title-1", { opacity: 1, y: 0, duration: 0.8, ease: "power2.out" })
    .to("#hero-title-2", { opacity: 1, y: 0, duration: 0.8, ease: "power2.out" }, "-=0.4")
    .to("#hero-title-3", { opacity: 1, y: 0, duration: 0.8, ease: "power2.out" }, "-=0.4")
    .to("#hero-title-4", { opacity: 1, y: 0, duration: 0.8, ease: "power2.out" }, "-=0.4")
    .to("#hero-subtitle", { opacity: 1, y: 0, duration: 0.6, ease: "power2.out" }, "-=0.3")
    .to("#hero-buttons", { opacity: 1, y: 0, duration: 0.6, ease: "power2.out" }, "-=0.3");

// Scroll-triggered animations
gsap.registerPlugin(ScrollTrigger);

// Animate sections on scroll
gsap.utils.toArray('section').forEach((section, i) => {
    gsap.from(section, {
        opacity: 0,
        y: 50,
        duration: 1,
        ease: "power2.out",
        scrollTrigger: {
            trigger: section,
            start: "top 80%",
            end: "bottom 20%",
            toggleActions: "play none none reverse"
        }
    });
});

// Animate glass cards
gsap.utils.toArray('.glass-card').forEach((card, i) => {
    gsap.from(card, {
        opacity: 0,
        y: 30,
        duration: 0.8,
        ease: "power2.out",
        scrollTrigger: {
            trigger: card,
            start: "top 85%",
            toggleActions: "play none none reverse"
        }
    });
});

// Navbar background change on scroll
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
    if (window.scrollY > 100) {
        navbar.classList.add('bg-white/95');
        navbar.classList.add('shadow-md');
        navbar.classList.remove('bg-transparent');
    } else {
        navbar.classList.add('bg-transparent');
        navbar.classList.remove('bg-white/95');
        navbar.classList.remove('shadow-md');
    }
});

// Smooth scrolling for navigation links
document.querySelectorAll('nav a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            targetElement.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Floating particles effect
function createParticles() {
    const particlesContainer = document.getElementById('particles');
    for (let i = 0; i < 50; i++) {
        const particle = document.createElement('div');
        particle.style.left = Math.random() * 100 + '%';
        particle.style.top = Math.random() * 100 + '%';
        particle.style.animationDelay = Math.random() * 6 + 's';
        particlesContainer.appendChild(particle);
    }
}

// Parallax effect for hero section
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const rate = scrolled * -0.5;
    document.querySelector('#hero').style.transform = `translateY(${rate}px)`;
});

// Hover effects for buttons
document.querySelectorAll('button').forEach(button => {
    button.addEventListener('mouseenter', () => {
        gsap.to(button, { scale: 1.05, duration: 0.3, ease: "power2.out" });
    });
    button.addEventListener('mouseleave', () => {
        gsap.to(button, { scale: 1, duration: 0.3, ease: "power2.out" });
    });
});

// Registration button functionality
document.querySelectorAll('button').forEach(button => {
    if (button.textContent.includes('Register Now') || button.textContent.includes('Become a Partner')) {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            gsap.to(button, {
                scale: 0.95,
                duration: 0.1,
                yoyo: true,
                repeat: 1,
                ease: "power2.inOut",
                onComplete: () => {
                    alert('Registration/Partnership inquiry coming soon! Stay tuned for updates.');
                }
            });
        });
    }
});

// Initialize particles on load
window.addEventListener('load', () => {
    createParticles();
});

// Mobile menu toggle (placeholder for future implementation)
const mobileMenuButton = document.querySelector('button.md\\:hidden');
if (mobileMenuButton) {
    mobileMenuButton.addEventListener('click', () => {
        // Mobile menu logic would go here
        const mobileMenu = document.getElementById('mobile-menu');
        if (mobileMenu) {
            mobileMenu.classList.toggle('hidden');
        }
    });
}

// Image Slider with Auto-scroll, Pause on Hover, Touch Support
class ImageSlider {
    constructor() {
        this.sliderTrack = document.getElementById('slider-track');
        this.slides = document.querySelectorAll('.slider-slide');
        this.currentSlide = 0;
        this.totalSlides = this.slides.length;
        this.autoScrollInterval = null;
        this.init();
    }
    
    init() {
        this.createDots();
        this.addEventListeners();
        this.startAutoScroll();
        this.initTouchSupport();
    }
    
    createDots() {
        const dotsContainer = document.getElementById('slider-dots');
        if (!dotsContainer) return;
        for (let i = 0; i < this.totalSlides; i++) {
            const dot = document.createElement('div');
            dot.classList.add('slider-dot');
            if (i === 0) dot.classList.add('active');
            dot.addEventListener('click', () => this.goToSlide(i));
            dotsContainer.appendChild(dot);
        }
    }
    
    addEventListeners() {
        const slider = document.getElementById('image-slider');
        if (slider) {
            slider.addEventListener('mouseenter', () => this.pauseAutoScroll());
            slider.addEventListener('mouseleave', () => this.startAutoScroll());
        }
        const prevBtn = document.getElementById('slider-prev');
        const nextBtn = document.getElementById('slider-next');
        if (prevBtn) prevBtn.addEventListener('click', () => this.prevSlide());
        if (nextBtn) nextBtn.addEventListener('click', () => this.nextSlide());
    }
    
    goToSlide(index) {
        this.currentSlide = index;
        const translateX = -(this.currentSlide * 100 / this.totalSlides);
        gsap.to(this.sliderTrack, { x: `${translateX}%`, duration: 0.8, ease: "power2.out" });
        this.updateDots();
    }
    
    nextSlide() {
        this.currentSlide = (this.currentSlide + 1) % this.totalSlides;
        this.goToSlide(this.currentSlide);
    }
    
    prevSlide() {
        this.currentSlide = (this.currentSlide - 1 + this.totalSlides) % this.totalSlides;
        this.goToSlide(this.currentSlide);
    }
    
    updateDots() {
        const dots = document.querySelectorAll('.slider-dot');
        dots.forEach((dot, index) => {
            dot.classList.toggle('active', index === this.currentSlide);
        });
    }
    
    startAutoScroll() {
        if (this.autoScrollInterval) return;
        this.autoScrollInterval = setInterval(() => this.nextSlide(), 3000);
    }
    
    pauseAutoScroll() {
        if (this.autoScrollInterval) {
            clearInterval(this.autoScrollInterval);
            this.autoScrollInterval = null;
        }
    }
    
    initTouchSupport() {
        let touchStartX = 0;
        const slider = document.getElementById('image-slider');
        if (!slider) return;
        slider.addEventListener('touchstart', (e) => {
            touchStartX = e.changedTouches[0].screenX;
            this.pauseAutoScroll();
        }, { passive: true });
        slider.addEventListener('touchend', (e) => {
            const touchEndX = e.changedTouches[0].screenX;
            const diff = touchStartX - touchEndX;
            if (Math.abs(diff) > 50) {
                diff > 0 ? this.nextSlide() : this.prevSlide();
            }
            this.startAutoScroll();
        }, { passive: true });
    }
}

document.addEventListener('DOMContentLoaded', () => new ImageSlider());

// Floating Glow Effects
function createFloatingGlowEffects() {
    const heroContent = document.querySelector('.hero-content');
    if (!heroContent) return;
    for (let i = 0; i < 3; i++) {
        const glow = document.createElement('div');
        glow.style.cssText = `position: absolute; width: ${200 + i * 100}px; height: ${200 + i * 100}px; border-radius: 50%; background: radial-gradient(circle, rgba(245, 158, 11, ${0.15 - i * 0.03}) 0%, transparent 70%); top: ${20 + i * 20}%; left: ${10 + i * 25}%; animation: floatGlow ${8 + i * 2}s ease-in-out infinite; animation-delay: ${i * 1.5}s; pointer-events: none; z-index: 1;`;
        heroContent.appendChild(glow);
    }
}
const glowStyle = document.createElement('style');
glowStyle.textContent = '@keyframes floatGlow { 0%, 100% { transform: translate(0, 0) scale(1); opacity: 0.5; } 25% { transform: translate(30px, -30px) scale(1.1); opacity: 0.7; } 50% { transform: translate(-20px, 20px) scale(0.9); opacity: 0.5; } 75% { transform: translate(-30px, -20px) scale(1.05); opacity: 0.6; } }';
document.head.appendChild(glowStyle);
document.addEventListener('DOMContentLoaded', createFloatingGlowEffects);

// Video Player Enhancements
function initVideoPlayer() {
    const video = document.getElementById('summit-video');
    const overlay = document.getElementById('video-overlay');
    const playBtn = document.getElementById('video-play-btn');
    if (!video || !overlay || !playBtn) return;
    playBtn.addEventListener('click', () => {
        if (video.paused) {
            video.play();
            gsap.to(overlay, { opacity: 0, duration: 0.5, onComplete: () => overlay.style.pointerEvents = 'none' });
        } else {
            video.pause();
            gsap.to(overlay, { opacity: 1, duration: 0.5, onComplete: () => overlay.style.pointerEvents = 'auto' });
        }
    });
    video.addEventListener('ended', () => gsap.to(overlay, { opacity: 1, duration: 0.5, onComplete: () => overlay.style.pointerEvents = 'auto' }));
}
document.addEventListener('DOMContentLoaded', initVideoPlayer);


