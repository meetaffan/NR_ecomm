/* ===========================
   Anokha Karobaar - Interactive Script
   =========================== */

document.addEventListener('DOMContentLoaded', () => {
    initParticles();
    initNavbar();
    initScrollReveal();
    initFilterTabs();
    initCarousels();
    initWhatsAppOrder();
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
    const subcategories = document.querySelectorAll('.candle-subcategory');

    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            // Update active state
            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            const filter = btn.dataset.filter;

            // Filter product cards
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

            // Filter candle subcategories
            subcategories.forEach(sub => {
                const category = sub.dataset.category;
                if (filter === 'all' || category === filter) {
                    sub.style.display = '';
                    sub.style.animation = 'fadeInUp 0.5s ease forwards';
                } else {
                    sub.style.display = 'none';
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
   CAROUSEL SCROLL
   =========================== */
function initCarousels() {
    document.querySelectorAll('.carousel-wrapper').forEach(wrapper => {
        const track = wrapper.querySelector('.carousel-track');
        const prevBtn = wrapper.querySelector('.carousel-prev');
        const nextBtn = wrapper.querySelector('.carousel-next');

        if (!track) return;

        const scrollAmount = 280; // card width + gap

        if (prevBtn) {
            prevBtn.addEventListener('click', () => {
                track.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
            });
        }

        if (nextBtn) {
            nextBtn.addEventListener('click', () => {
                track.scrollBy({ left: scrollAmount, behavior: 'smooth' });
            });
        }
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

/* ===========================
   WHATSAPP ORDER FLOW (Modal)
   =========================== */
function initWhatsAppOrder() {
    const phoneNumber = '917562857277';
    const modal = document.getElementById('orderModal');
    const modalClose = document.getElementById('modalClose');
    const modalProductName = document.getElementById('modalProductName');
    const orderForm = document.getElementById('orderForm');
    let currentProduct = '';

    // Add "Buy Now" buttons to product cards
    document.querySelectorAll('.product-card .product-info').forEach(info => {
        const productName = info.querySelector('h4')?.textContent || 'Product';
        const btn = document.createElement('button');
        btn.className = 'btn-whatsapp-order';
        btn.innerHTML = '🛒 Buy Now';
        btn.addEventListener('click', () => openModal(productName));
        info.appendChild(btn);
    });

    // Add "Buy Now" buttons to carousel cards
    document.querySelectorAll('.carousel-card').forEach(card => {
        const label = card.querySelector('.carousel-label')?.textContent || 'Candle';
        const subcatTitle = card.closest('.candle-subcategory')?.querySelector('.subcategory-title')?.textContent || '';
        const fullName = subcatTitle ? `${subcatTitle.replace(/^[^\w]+/, '')} - ${label}` : label;
        const btn = document.createElement('button');
        btn.className = 'btn-whatsapp-order carousel-order-btn';
        btn.innerHTML = '🛒 Buy Now';
        btn.addEventListener('click', () => openModal(fullName));
        card.appendChild(btn);
    });

    function openModal(productName) {
        currentProduct = productName;
        modalProductName.textContent = productName;
        modal.classList.add('active');
        document.body.style.overflow = 'hidden';
        // Focus first field
        setTimeout(() => document.getElementById('orderName').focus(), 300);
    }

    function closeModal() {
        modal.classList.remove('active');
        document.body.style.overflow = '';
        orderForm.reset();
    }

    // Close events
    modalClose.addEventListener('click', closeModal);
    modal.addEventListener('click', (e) => {
        if (e.target === modal) closeModal();
    });
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') closeModal();
    });

    // Form submit → WhatsApp
    orderForm.addEventListener('submit', (e) => {
        e.preventDefault();

        const name = document.getElementById('orderName').value.trim();
        const phone = document.getElementById('orderPhone').value.trim();
        const address = document.getElementById('orderAddress').value.trim();
        const qty = document.getElementById('orderQty').value;

        const msg = [
            `*NEW ORDER - Anokha Karobaar*`,
            ``,
            `----------------------------------`,
            `*Product:* ${currentProduct}`,
            `*Quantity:* ${qty}`,
            `----------------------------------`,
            ``,
            `*Customer Details:*`,
            `Name: ${name}`,
            `Phone: ${phone}`,
            `Address: ${address}`,
            ``,
            `----------------------------------`,
            `Kindly confirm availability and share the payment details.`,
            `Thank you!`
        ].join('\n');
        const message = encodeURIComponent(msg);

        window.open(`https://wa.me/${phoneNumber}?text=${message}`, '_blank');
        closeModal();
    });
}
