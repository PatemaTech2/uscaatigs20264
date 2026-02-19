// GSAP Registration
gsap.registerPlugin(ScrollTrigger);

// Hero Animations
const heroTimeline = gsap.timeline();

document.addEventListener('DOMContentLoaded', () => {
    // Hero Content Animation
    heroTimeline
        .from("nav", { y: -100, opacity: 0, duration: 1, ease: "power4.out" })
        .from("#hero h1", { y: 100, opacity: 0, duration: 1.2, ease: "power4.out" }, "-=0.5")
        .from("#hero p", { y: 50, opacity: 0, duration: 1, ease: "power3.out" }, "-=0.8")
        .from("#hero .inline-block", { scale: 0.8, opacity: 0, duration: 0.8, ease: "back.out(1.7)" }, "-=1")
        .from("#hero .flex-col.md\\:flex-row", { y: 30, opacity: 0, duration: 0.8, ease: "power2.out" }, "-=0.6")
        .from("#hero .flex-col.sm\\:flex-row", { y: 30, opacity: 0, duration: 0.8, ease: "power2.out" }, "-=0.4");

    // Fade Slider Logic
    const slides = document.querySelectorAll('.slide');
    let currentSlide = 0;

    function nextSlide() {
        slides[currentSlide].classList.remove('opacity-100');
        slides[currentSlide].classList.add('opacity-0');
        currentSlide = (currentSlide + 1) % slides.length;
        slides[currentSlide].classList.remove('opacity-0');
        slides[currentSlide].classList.add('opacity-100');
    }

    if (slides.length > 0) {
        // First slide is already opacity-100 in HTML
        setInterval(nextSlide, 5000);
    }

    // Scroll Animations for sections (excluding contacts section to prevent image disappearance)
    gsap.utils.toArray('section').forEach(section => {
        // Skip the contacts/leadership section to prevent image issues
        if (section.id === 'contacts') return;
        
        gsap.from(section, {
            opacity: 0,
            y: 50,
            duration: 1,
            ease: "power2.out",
            scrollTrigger: {
                trigger: section,
                start: "top 85%",
                toggleActions: "play none none none"
            }
        });
    });

    // Executive Cards Animation - simplified without opacity issues
    const executiveCards = document.querySelectorAll(".executive-card");
    
    // Set initial state
    gsap.set(executiveCards, { opacity: 1, y: 0 });
    
    // Animate on scroll
    ScrollTrigger.create({
        trigger: "#contacts",
        start: "top 75%",
        onEnter: () => {
            gsap.fromTo(executiveCards, 
                { y: 60 },
                { 
                    y: 0, 
                    duration: 0.8, 
                    stagger: 0.15, 
                    ease: "power3.out",
                    onStart: function() {
                        // Ensure cards are visible when animation starts
                        this.targets().forEach(card => {
                            card.style.opacity = "1";
                            card.style.visibility = "visible";
                        });
                    }
                }
            );
        },
        onLeaveBack: () => {
            // Reset for re-animation when scrolling back up
            gsap.set(executiveCards, { y: 60 });
        }
    });

    // Navbar scroll effect
    const nav = document.getElementById('main-nav');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            nav.classList.add('py-4');
            nav.querySelector('.max-w-7xl').classList.add('bg-white/95');
        } else {
            nav.classList.remove('py-4');
            nav.querySelector('.max-w-7xl').classList.remove('bg-white/95');
        }
    });

    // Smooth Scrolling
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                window.scrollTo({
                    top: target.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });
});
