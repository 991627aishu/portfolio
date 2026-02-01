/**
 * Modern Portfolio Website - JavaScript
 * Tailwind CSS Version - Smooth scrolling, animations, and interactions
 */

// ============================================
// Mobile Navigation Toggle
// ============================================

const mobileMenuBtn = document.getElementById('mobile-menu-btn');
const mobileMenu = document.getElementById('mobile-menu');

if (mobileMenuBtn && mobileMenu) {
    mobileMenuBtn.addEventListener('click', () => {
        mobileMenu.classList.toggle('hidden');
        const icon = mobileMenuBtn.querySelector('i');
        if (mobileMenu.classList.contains('hidden')) {
            icon.classList.remove('fa-times');
            icon.classList.add('fa-bars');
        } else {
            icon.classList.remove('fa-bars');
            icon.classList.add('fa-times');
        }
    });

    // Close mobile menu when clicking on a link
    const mobileLinks = mobileMenu.querySelectorAll('a');
    mobileLinks.forEach(link => {
        link.addEventListener('click', () => {
            mobileMenu.classList.add('hidden');
            const icon = mobileMenuBtn.querySelector('i');
            icon.classList.remove('fa-times');
            icon.classList.add('fa-bars');
        });
    });
}

// ============================================
// Smooth Scrolling for Navigation Links
// ============================================

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;
        
        const target = document.querySelector(targetId);
        if (target) {
            const navHeight = document.getElementById('navbar')?.offsetHeight || 64;
            const targetPosition = target.offsetTop - navHeight;
            
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// ============================================
// Navbar Background on Scroll
// ============================================

const navbar = document.getElementById('navbar');

window.addEventListener('scroll', () => {
    if (navbar) {
        if (window.scrollY > 50) {
            navbar.classList.add('shadow-lg');
            navbar.classList.remove('shadow-sm');
            navbar.style.background = 'rgba(255, 255, 255, 0.95)';
        } else {
            navbar.classList.add('shadow-sm');
            navbar.classList.remove('shadow-lg');
            navbar.style.background = 'rgba(255, 255, 255, 0.8)';
        }
    }
});

// ============================================
// Active Navigation Link Highlighting
// ============================================

const updateActiveNav = () => {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');
    
    let current = '';
    const navHeight = navbar?.offsetHeight || 64;
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        
        if (window.scrollY >= (sectionTop - navHeight - 100)) {
            current = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('text-indigo-600', 'font-bold');
        link.classList.add('text-slate-700');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.remove('text-slate-700');
            link.classList.add('text-indigo-600', 'font-bold');
        }
    });
};

window.addEventListener('scroll', updateActiveNav);
updateActiveNav(); // Initial call

// ============================================
// Scroll Animations (Intersection Observer)
// ============================================

const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            // Optional: Stop observing once animated
            // observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observe all fade-in elements
document.addEventListener('DOMContentLoaded', () => {
    const fadeElements = document.querySelectorAll('.fade-in');
    fadeElements.forEach((element, index) => {
        // Stagger animations
        element.style.transitionDelay = `${index * 0.1}s`;
        observer.observe(element);
    });
});

// ============================================
// Parallax Effect for Hero Section
// ============================================

window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const hero = document.getElementById('home');
    
    if (hero && scrolled < window.innerHeight) {
        const heroContent = hero.querySelector('.fade-in');
        if (heroContent) {
            heroContent.style.transform = `translateY(${scrolled * 0.3}px)`;
            heroContent.style.opacity = 1 - (scrolled / window.innerHeight) * 0.5;
        }
    }
});

// ============================================
// Card Hover Effects Enhancement
// ============================================

document.querySelectorAll('.card-hover').forEach(card => {
    card.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-8px) scale(1.02)';
    });
    
    card.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0) scale(1)';
    });
});

// ============================================
// Smooth Page Load Animation
// ============================================

window.addEventListener('load', () => {
    document.body.style.opacity = '0';
    document.body.style.transition = 'opacity 0.5s ease-in';
    
    setTimeout(() => {
        document.body.style.opacity = '1';
    }, 100);
    
    // Trigger initial animations
    const heroContent = document.querySelector('#home .fade-in');
    if (heroContent) {
        heroContent.classList.add('visible');
    }
});

// ============================================
// Typing Effect for Hero Tagline (Optional Enhancement)
// ============================================

const taglineElement = document.querySelector('#home p');
if (taglineElement) {
    const originalText = taglineElement.textContent;
    taglineElement.textContent = '';
    taglineElement.style.opacity = '0';
    
    setTimeout(() => {
        taglineElement.style.opacity = '1';
        taglineElement.textContent = originalText;
    }, 800);
}

// ============================================
// Console Welcome Message
// ============================================

console.log('%c👋 Welcome to N S Aishwarya\'s Portfolio!', 'color: #6366f1; font-size: 16px; font-weight: bold;');
console.log('%cTech for Public Good 🚀', 'color: #8b5cf6; font-size: 12px;');

// ============================================
// Scroll to Top Button (Optional Enhancement)
// ============================================

let scrollToTopBtn = document.createElement('button');
scrollToTopBtn.innerHTML = '<i class="fas fa-arrow-up"></i>';
scrollToTopBtn.className = 'fixed bottom-8 right-8 w-12 h-12 bg-indigo-600 text-white rounded-full shadow-lg hover:bg-indigo-700 transition-all opacity-0 pointer-events-none z-40 flex items-center justify-center';
scrollToTopBtn.id = 'scroll-to-top';
document.body.appendChild(scrollToTopBtn);

window.addEventListener('scroll', () => {
    if (window.scrollY > 300) {
        scrollToTopBtn.classList.remove('opacity-0', 'pointer-events-none');
        scrollToTopBtn.classList.add('opacity-100');
    } else {
        scrollToTopBtn.classList.add('opacity-0', 'pointer-events-none');
        scrollToTopBtn.classList.remove('opacity-100');
    }
});

scrollToTopBtn.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});
