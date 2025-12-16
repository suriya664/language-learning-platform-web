// ============================================
// Mobile Navigation Toggle
// ============================================

const navToggle = document.querySelector('.nav-toggle');
const navMenu = document.querySelector('.nav-menu');

if (navToggle) {
    navToggle.addEventListener('click', () => {
        navMenu.classList.toggle('active');
        navToggle.classList.toggle('active');
    });
}

// Close mobile menu when clicking on a link
const navLinks = document.querySelectorAll('.nav-menu a');
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        navToggle.classList.remove('active');
    });
});

// ============================================
// Smooth Scrolling for Navigation Links
// ============================================

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const offsetTop = target.offsetTop - 70; // Account for fixed navbar
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });
});

// ============================================
// Fade-in on Scroll Animation
// ============================================

const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, observerOptions);

// Observe all sections and cards
document.addEventListener('DOMContentLoaded', () => {
    const elementsToAnimate = document.querySelectorAll(
        'section, .language-card, .feature-card, .step-item, .testimonial-card, .pricing-card'
    );
    
    elementsToAnimate.forEach(el => {
        el.classList.add('fade-in');
        observer.observe(el);
    });
});

// ============================================
// Flashcard Flip Animation
// ============================================

const flashcard = document.getElementById('flashcard');
const flipButtons = document.querySelectorAll('.btn-flip');

if (flashcard) {
    flipButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            flashcard.classList.toggle('flipped');
        });
    });
}

// ============================================
// Progress Bar Animation
// ============================================

const progressFill = document.getElementById('progressFill');
const progressPercent = document.getElementById('progressPercent');

if (progressFill && progressPercent) {
    let progress = 0;
    const targetProgress = 65;
    const duration = 2000;
    const increment = targetProgress / (duration / 16);
    
    const animateProgress = () => {
        if (progress < targetProgress) {
            progress += increment;
            progressFill.style.width = progress + '%';
            progressPercent.textContent = Math.round(progress);
            requestAnimationFrame(animateProgress);
        } else {
            progressFill.style.width = targetProgress + '%';
            progressPercent.textContent = targetProgress;
        }
    };
    
    // Start animation when demo section is visible
    const demoObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && progress === 0) {
                animateProgress();
            }
        });
    }, { threshold: 0.3 });
    
    const demoSection = document.getElementById('demo');
    if (demoSection) {
        demoObserver.observe(demoSection);
    }
}

// ============================================
// Testimonial Slider
// ============================================

const testimonialTrack = document.getElementById('testimonialTrack');
const testimonialPrev = document.getElementById('testimonialPrev');
const testimonialNext = document.getElementById('testimonialNext');
let currentTestimonial = 0;
let totalTestimonials = 0;
let updateTestimonialPosition = null;

if (testimonialTrack && testimonialPrev && testimonialNext) {
    const testimonialCards = testimonialTrack.querySelectorAll('.testimonial-card');
    totalTestimonials = testimonialCards.length;
    
    updateTestimonialPosition = () => {
        testimonialTrack.style.transform = `translateX(-${currentTestimonial * 100}%)`;
    };
    
    testimonialNext.addEventListener('click', () => {
        currentTestimonial = (currentTestimonial + 1) % totalTestimonials;
        updateTestimonialPosition();
    });
    
    testimonialPrev.addEventListener('click', () => {
        currentTestimonial = (currentTestimonial - 1 + totalTestimonials) % totalTestimonials;
        updateTestimonialPosition();
    });
    
    // Auto-scroll testimonials on mobile
    if (window.innerWidth <= 768) {
        setInterval(() => {
            currentTestimonial = (currentTestimonial + 1) % totalTestimonials;
            updateTestimonialPosition();
        }, 5000);
    }
}

// ============================================
// Pricing Toggle (Monthly/Yearly)
// ============================================

const pricingToggle = document.getElementById('pricingToggle');
const priceAmounts = document.querySelectorAll('.price-amount');

if (pricingToggle && priceAmounts.length > 0) {
    pricingToggle.addEventListener('change', (e) => {
        const isYearly = e.target.checked;
        
        priceAmounts.forEach(priceEl => {
            const monthlyPrice = parseFloat(priceEl.getAttribute('data-monthly'));
            const yearlyPrice = parseFloat(priceEl.getAttribute('data-yearly'));
            
            if (monthlyPrice === 0 && yearlyPrice === 0) {
                return; // Free plan
            }
            
            const newPrice = isYearly ? yearlyPrice : monthlyPrice;
            priceEl.textContent = `$${newPrice.toFixed(2)}`;
        });
    });
}

// ============================================
// FAQ Accordion
// ============================================

const faqQuestions = document.querySelectorAll('.faq-question');

faqQuestions.forEach(question => {
    question.addEventListener('click', () => {
        const faqItem = question.parentElement;
        const isActive = faqItem.classList.contains('active');
        
        // Close all FAQ items
        document.querySelectorAll('.faq-item').forEach(item => {
            item.classList.remove('active');
        });
        
        // Open clicked item if it wasn't active
        if (!isActive) {
            faqItem.classList.add('active');
        }
    });
});

// ============================================
// Circular Progress Animation
// ============================================

const progressRing = document.querySelector('.progress-ring-circle');
if (progressRing) {
    const radius = progressRing.r.baseVal.value;
    const circumference = radius * 2 * Math.PI;
    
    progressRing.style.strokeDasharray = `${circumference} ${circumference}`;
    progressRing.style.strokeDashoffset = circumference;
    
    // Animate to 49% (2450/5000)
    const progress = 0.49;
    const offset = circumference - (progress * circumference);
    
    // Start animation when section is visible
    const progressObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                progressRing.style.strokeDashoffset = offset;
                progressRing.classList.add('progress');
                
                // Add gradient definition
                const svg = progressRing.closest('svg');
                if (svg && !svg.querySelector('defs')) {
                    const defs = document.createElementNS('http://www.w3.org/2000/svg', 'defs');
                    const gradient = document.createElementNS('http://www.w3.org/2000/svg', 'linearGradient');
                    gradient.setAttribute('id', 'gradient');
                    gradient.setAttribute('x1', '0%');
                    gradient.setAttribute('y1', '0%');
                    gradient.setAttribute('x2', '100%');
                    gradient.setAttribute('y2', '100%');
                    
                    const stop1 = document.createElementNS('http://www.w3.org/2000/svg', 'stop');
                    stop1.setAttribute('offset', '0%');
                    stop1.setAttribute('stop-color', '#4F46E5');
                    
                    const stop2 = document.createElementNS('http://www.w3.org/2000/svg', 'stop');
                    stop2.setAttribute('offset', '100%');
                    stop2.setAttribute('stop-color', '#14B8A6');
                    
                    gradient.appendChild(stop1);
                    gradient.appendChild(stop2);
                    defs.appendChild(gradient);
                    svg.insertBefore(defs, svg.firstChild);
                }
            }
        });
    }, { threshold: 0.3 });
    
    const gamificationSection = document.getElementById('gamification');
    if (gamificationSection) {
        progressObserver.observe(gamificationSection);
    }
}

// ============================================
// Button Ripple Effect Enhancement
// ============================================

const rippleButtons = document.querySelectorAll('.ripple');

rippleButtons.forEach(button => {
    button.addEventListener('click', function(e) {
        const ripple = document.createElement('span');
        const rect = this.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = e.clientX - rect.left - size / 2;
        const y = e.clientY - rect.top - size / 2;
        
        ripple.style.width = ripple.style.height = size + 'px';
        ripple.style.left = x + 'px';
        ripple.style.top = y + 'px';
        ripple.classList.add('ripple-effect');
        
        this.appendChild(ripple);
        
        setTimeout(() => {
            ripple.remove();
        }, 600);
    });
});

// ============================================
// Navbar Background on Scroll
// ============================================

const navbar = document.querySelector('.navbar');
let lastScroll = 0;

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll > 100) {
        navbar.style.boxShadow = '0 4px 6px -1px rgba(0, 0, 0, 0.1)';
    } else {
        navbar.style.boxShadow = '0 1px 2px 0 rgba(0, 0, 0, 0.05)';
    }
    
    lastScroll = currentScroll;
});

// ============================================
// Hero CTA Button Actions
// ============================================

const heroCTAs = document.querySelectorAll('.hero-cta .btn');
heroCTAs.forEach(btn => {
    btn.addEventListener('click', (e) => {
        if (btn.textContent.includes('View Languages')) {
            e.preventDefault();
            const languagesSection = document.getElementById('languages');
            if (languagesSection) {
                const offsetTop = languagesSection.offsetTop - 70;
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        } else if (btn.textContent.includes('Start Learning Free')) {
            e.preventDefault();
            const pricingSection = document.getElementById('pricing');
            if (pricingSection) {
                const offsetTop = pricingSection.offsetTop - 70;
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        }
    });
});

// ============================================
// Mobile CTA Button Action
// ============================================

const mobileCTA = document.querySelector('.mobile-cta .btn');
if (mobileCTA) {
    mobileCTA.addEventListener('click', () => {
        const pricingSection = document.getElementById('pricing');
        if (pricingSection) {
            const offsetTop = pricingSection.offsetTop - 70;
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });
}

// ============================================
// Lazy Loading Images (if images are added later)
// ============================================

if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                if (img.dataset.src) {
                    img.src = img.dataset.src;
                    img.removeAttribute('data-src');
                    imageObserver.unobserve(img);
                }
            }
        });
    });
    
    document.querySelectorAll('img[data-src]').forEach(img => {
        imageObserver.observe(img);
    });
}

// ============================================
// Streak Counter Animation
// ============================================

const streakNumber = document.getElementById('streakNumber');
if (streakNumber) {
    const streakObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                let current = 0;
                const target = 7;
                const duration = 1000;
                const increment = target / (duration / 16);
                
                const animateStreak = () => {
                    if (current < target) {
                        current += increment;
                        streakNumber.textContent = Math.floor(current);
                        requestAnimationFrame(animateStreak);
                    } else {
                        streakNumber.textContent = target;
                    }
                };
                
                animateStreak();
                streakObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.3 });
    
    const streakCard = document.querySelector('.streak-card');
    if (streakCard) {
        streakObserver.observe(streakCard);
    }
}

// ============================================
// Touch Swipe for Testimonials (Mobile)
// ============================================

let touchStartX = 0;
let touchEndX = 0;

if (testimonialTrack && updateTestimonialPosition) {
    testimonialTrack.addEventListener('touchstart', (e) => {
        touchStartX = e.changedTouches[0].screenX;
    });
    
    testimonialTrack.addEventListener('touchend', (e) => {
        touchEndX = e.changedTouches[0].screenX;
        handleSwipe();
    });
    
    const handleSwipe = () => {
        if (touchEndX < touchStartX - 50) {
            // Swipe left - next
            currentTestimonial = (currentTestimonial + 1) % totalTestimonials;
            updateTestimonialPosition();
        }
        if (touchEndX > touchStartX + 50) {
            // Swipe right - previous
            currentTestimonial = (currentTestimonial - 1 + totalTestimonials) % totalTestimonials;
            updateTestimonialPosition();
        }
    };
}

// ============================================
// Initialize on DOM Load
// ============================================

document.addEventListener('DOMContentLoaded', () => {
    // Add smooth scroll polyfill for older browsers if needed
    if (!('scrollBehavior' in document.documentElement.style)) {
        const script = document.createElement('script');
        script.src = 'https://cdn.jsdelivr.net/gh/cferdinandi/smooth-scroll@15.0.0/dist/smooth-scroll.polyfills.min.js';
        document.head.appendChild(script);
    }
});

