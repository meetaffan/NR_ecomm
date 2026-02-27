/* ===========================
   Anokha Karobaar - Interactive Script
   =========================== */

document.addEventListener('DOMContentLoaded', () => {
    initParticles();
    initNavbar();
    initScrollReveal();
    initFilterTabs();
    initContactForm();
    initSmoothScroll();
});

/* ===========================
   FLOATING PARTICLES
   =========================== */
function initParticles() {
    const container = document.getElementById('particles');
    if (!container) return;

    const colors = ['#c8956c', '#d4a853', '#d4839e', '#e8c9af', '#8b6f5c'];
    const count = window.innerWidth < 768 ? 12 : 25;

    for (let i = 0; i < count; i++) {
        const particle = document.createElement('div');
        particle.classList.add('particle');

        const size = Math.random() * 8 + 4;
        const color = colors[Math.floor(Math.random() * colors.length)];
        const duration = Math.random() * 20 + 15;
        const delay = Math.random() * 20;
        const left = Math.random() * 100;

        particle.style.cssText = `
            width: ${size}px;
            height: ${size}px;
            background: ${color};
            left: ${left}%;
            animation-duration: ${duration}s;
            animation-delay: -${delay}s;
        `;

        container.appendChild(particle);
    }
}

/* ===========================
   NAVBAR
   =========================== */
function initNavbar() {
    const navbar = document.getElementById('navbar');
    const navToggle = document.getElementById('navToggle');
    const navLinks = document.getElementById('navLinks');

    // Scroll effect
    let lastScroll = 0;
    window.addEventListener('scroll', () => {
        const currentScroll = window.scrollY;
        navbar.classList.toggle('scrolled', currentScroll > 50);
        lastScroll = currentScroll;
    }, { passive: true });

    // Mobile toggle
    if (navToggle && navLinks) {
        navToggle.addEventListener('click', () => {
            navToggle.classList.toggle('active');
            navLinks.classList.toggle('active');
        });

        // Close on link click
        navLinks.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                navToggle.classList.remove('active');
                navLinks.classList.remove('active');
            });
        });
    }
}

/* ===========================
   SCROLL REVEAL ANIMATIONS
   =========================== */
function initScrollReveal() {
    const reveals = document.querySelectorAll('.reveal-up, .reveal-left, .reveal-right');

    if ('IntersectionObserver' in window) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('revealed');
                    observer.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.1,
            rootMargin: '0px 0px -60px 0px'
        });

        reveals.forEach(el => observer.observe(el));
    } else {
        // Fallback: show all
        reveals.forEach(el => el.classList.add('revealed'));
    }
}

/* ===========================
   FILTER TABS
   =========================== */
function initFilterTabs() {
    const filterBtns = document.querySelectorAll('.filter-btn');
    const productCards = document.querySelectorAll('.product-card');
    const banners = document.querySelectorAll('.collection-banner');

    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            // Update active state
            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            const filter = btn.dataset.filter;

            // Filter cards
            productCards.forEach(card => {
                const category = card.dataset.category;
                if (filter === 'all' || category === filter) {
                    card.style.display = '';
                    card.style.animation = 'fadeInUp 0.5s ease forwards';
                } else {
                    card.style.display = 'none';
                }
            });

            // Filter banners
            banners.forEach(banner => {
                const category = banner.dataset.category;
                if (filter === 'all' || category === filter) {
                    banner.style.display = '';
                } else {
                    banner.style.display = 'none';
                }
            });
        });
    });

    // Add animation keyframe
    const style = document.createElement('style');
    style.textContent = `
        @keyframes fadeInUp {
            from { opacity: 0; transform: translateY(20px); }
            to { opacity: 1; transform: translateY(0); }
        }
    `;
    document.head.appendChild(style);
}

/* ===========================
   CONTACT FORM
   =========================== */
function initContactForm() {
    const form = document.getElementById('contactForm');
    if (!form) return;

    form.addEventListener('submit', (e) => {
        e.preventDefault();

        const btn = form.querySelector('.btn-submit');
        const originalHTML = btn.innerHTML;

        // Show success
        btn.innerHTML = '<span>Message Sent! ✨</span>';
        btn.style.background = 'linear-gradient(135deg, #4CAF50, #45a049)';

        // Reset after 3 seconds
        setTimeout(() => {
            btn.innerHTML = originalHTML;
            btn.style.background = '';
            form.reset();
        }, 3000);
    });
}

/* ===========================
   SMOOTH SCROLL
   =========================== */
function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}
