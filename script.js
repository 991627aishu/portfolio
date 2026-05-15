/* 
    Excellent Portfolio JS
    N S Aishwarya
*/

document.addEventListener('DOMContentLoaded', () => {
    // Initialize AOS
    AOS.init({
        duration: 1000,
        once: true,
        mirror: false,
        offset: 100
    });

    // Name Word-by-Word Animation
    const heroName = document.getElementById('hero-name');
    const nameText = "N S Aishwarya";
    const words = nameText.split(' ');
    
    heroName.innerHTML = '';
    words.forEach((word, index) => {
        const span = document.createElement('span');
        span.textContent = word;
        span.className = 'name-word inline-block mr-4';
        span.style.transitionDelay = `${index * 0.3}s`;
        heroName.appendChild(span);
        
        // Add space after word except last one
        if (index < words.length - 1) {
            const space = document.createTextNode(' ');
            heroName.appendChild(space);
        }
    });

    // Trigger name animation after a short delay
    setTimeout(() => {
        document.querySelectorAll('.name-word').forEach(word => {
            word.classList.add('visible');
        });
    }, 500);

    // Navbar Scroll Effect
    const navbar = document.getElementById('navbar');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('bg-white/80', 'dark:bg-dark/80', 'backdrop-blur-lg', 'shadow-xl', 'py-4');
            navbar.classList.remove('py-6');
        } else {
            navbar.classList.remove('bg-white/80', 'dark:bg-dark/80', 'backdrop-blur-lg', 'shadow-xl', 'py-4');
            navbar.classList.add('py-6');
        }
        
        // Update Progress Bar
        const totalScroll = document.documentElement.scrollHeight - window.innerHeight;
        const progress = (window.pageYOffset / totalScroll) * 100;
        document.getElementById('progress-bar').style.width = `${progress}%`;
    });

    // Mobile Menu
    const mobileMenuBtn = document.getElementById('mobile-menu-btn');
    const mobileMenu = document.getElementById('mobile-menu');
    const closeMenu = document.getElementById('close-menu');
    const mobileLinks = document.querySelectorAll('.mobile-link');

    const toggleMenu = () => {
        mobileMenu.classList.toggle('translate-x-full');
    };

    mobileMenuBtn.addEventListener('click', toggleMenu);
    closeMenu.addEventListener('click', toggleMenu);
    mobileLinks.forEach(link => link.addEventListener('click', toggleMenu));

    // Theme Toggle
    const themeToggle = document.getElementById('theme-toggle');
    const html = document.documentElement;

    // Check for saved theme
    if (localStorage.theme === 'dark' || (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
        html.classList.add('dark');
    } else {
        html.classList.remove('dark');
    }

    themeToggle.addEventListener('click', () => {
        html.classList.toggle('dark');
        localStorage.theme = html.classList.contains('dark') ? 'dark' : 'light';
    });

    // Smooth Scroll for all links
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
