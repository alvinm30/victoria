/* ============================================
   VICTORIA QUANT LAB — Main JavaScript
   Navigation, GSAP animations, Particles.js,
   scroll effects, form handling
   ============================================ */

(function () {
  'use strict';

  // ============================================
  // NAVIGATION
  // ============================================
  const navbar = document.querySelector('.navbar');
  const navToggle = document.querySelector('.nav-toggle');
  const navLinks = document.querySelector('.nav-links');

  // Scroll effect
  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  });

  // Mobile toggle
  if (navToggle) {
    navToggle.addEventListener('click', () => {
      navToggle.classList.toggle('active');
      navLinks.classList.toggle('open');
    });

    // Close menu on link click
    navLinks.querySelectorAll('a').forEach((link) => {
      link.addEventListener('click', () => {
        navToggle.classList.remove('active');
        navLinks.classList.remove('open');
      });
    });
  }

  // Active link highlight
  const currentPage = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-links a').forEach((link) => {
    const href = link.getAttribute('href');
    if (href === currentPage || (currentPage === '' && href === 'index.html')) {
      link.classList.add('active');
    }
  });

  // ============================================
  // PARTICLES.JS CONFIG
  // ============================================
  if (typeof particlesJS !== 'undefined' && document.getElementById('particles-js')) {
    particlesJS('particles-js', {
      particles: {
        number: {
          value: 60,
          density: { enable: true, value_area: 1000 },
        },
        color: { value: ['#00d4ff', '#a855f7', '#00fff5'] },
        shape: { type: 'circle' },
        opacity: {
          value: 0.3,
          random: true,
          anim: { enable: true, speed: 0.5, opacity_min: 0.1, sync: false },
        },
        size: {
          value: 2,
          random: true,
          anim: { enable: true, speed: 1, size_min: 0.5, sync: false },
        },
        line_linked: {
          enable: true,
          distance: 150,
          color: '#00d4ff',
          opacity: 0.08,
          width: 1,
        },
        move: {
          enable: true,
          speed: 0.6,
          direction: 'none',
          random: true,
          straight: false,
          out_mode: 'out',
          bounce: false,
        },
      },
      interactivity: {
        detect_on: 'canvas',
        events: {
          onhover: { enable: true, mode: 'grab' },
          onclick: { enable: false },
          resize: true,
        },
        modes: {
          grab: { distance: 140, line_linked: { opacity: 0.2 } },
        },
      },
      retina_detect: true,
    });
  }

  // ============================================
  // GSAP ANIMATIONS
  // ============================================
  if (typeof gsap !== 'undefined') {
    // Register ScrollTrigger
    if (typeof ScrollTrigger !== 'undefined') {
      gsap.registerPlugin(ScrollTrigger);
    }

    // Hero animations
    const heroContent = document.querySelector('.hero-content');
    if (heroContent) {
      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

      tl.from('.hero-tag', { opacity: 0, y: 20, duration: 0.8, delay: 0.3 })
        .from('.hero-title', { opacity: 0, y: 30, duration: 1 }, '-=0.4')
        .from('.hero-subtitle', { opacity: 0, y: 20, duration: 0.8 }, '-=0.5')
        .from('.hero-desc', { opacity: 0, y: 20, duration: 0.8 }, '-=0.4')
        .from('.hero-buttons .btn', {
          opacity: 0,
          y: 20,
          duration: 0.6,
          stagger: 0.15,
        }, '-=0.3');
    }

    // Page hero animation
    const pageHero = document.querySelector('.page-hero');
    if (pageHero) {
      gsap.from('.page-hero .hero-tag', { opacity: 0, y: 20, duration: 0.8, delay: 0.2 });
      gsap.from('.page-hero .section-title', { opacity: 0, y: 30, duration: 1, delay: 0.4 });
      gsap.from('.page-hero .section-line', { scaleX: 0, duration: 0.8, delay: 0.6 });
      gsap.from('.page-hero .section-desc', { opacity: 0, y: 20, duration: 0.8, delay: 0.7 });
    }

    // Scroll-triggered reveals
    if (typeof ScrollTrigger !== 'undefined') {
      // Cards
      gsap.utils.toArray('.card').forEach((card, i) => {
        gsap.from(card, {
          scrollTrigger: {
            trigger: card,
            start: 'top 85%',
            toggleActions: 'play none none none',
          },
          opacity: 0,
          y: 40,
          duration: 0.8,
          delay: i % 3 * 0.15,
        });
      });

      // Terminal panels
      gsap.utils.toArray('.terminal-panel').forEach((panel) => {
        gsap.from(panel, {
          scrollTrigger: {
            trigger: panel,
            start: 'top 85%',
            toggleActions: 'play none none none',
          },
          opacity: 0,
          y: 30,
          duration: 0.8,
        });
      });

      // Section headers
      gsap.utils.toArray('.section-header').forEach((header) => {
        gsap.from(header, {
          scrollTrigger: {
            trigger: header,
            start: 'top 85%',
            toggleActions: 'play none none none',
          },
          opacity: 0,
          y: 30,
          duration: 0.8,
        });
      });

      // Stats
      gsap.utils.toArray('.stat-box').forEach((box, i) => {
        gsap.from(box, {
          scrollTrigger: {
            trigger: box,
            start: 'top 90%',
            toggleActions: 'play none none none',
          },
          opacity: 0,
          scale: 0.9,
          duration: 0.6,
          delay: i * 0.1,
        });
      });

      // Community features
      gsap.utils.toArray('.community-feature').forEach((feat, i) => {
        gsap.from(feat, {
          scrollTrigger: {
            trigger: feat,
            start: 'top 85%',
            toggleActions: 'play none none none',
          },
          opacity: 0,
          y: 40,
          duration: 0.8,
          delay: i * 0.15,
        });
      });

      // Post cards
      gsap.utils.toArray('.post-card').forEach((post, i) => {
        gsap.from(post, {
          scrollTrigger: {
            trigger: post,
            start: 'top 85%',
            toggleActions: 'play none none none',
          },
          opacity: 0,
          x: -30,
          duration: 0.7,
          delay: i * 0.1,
        });
      });

      // Focus list items
      gsap.utils.toArray('.focus-list li').forEach((li, i) => {
        gsap.from(li, {
          scrollTrigger: {
            trigger: li,
            start: 'top 90%',
            toggleActions: 'play none none none',
          },
          opacity: 0,
          x: -20,
          duration: 0.5,
          delay: i * 0.08,
        });
      });

      // Social links
      gsap.utils.toArray('.social-link').forEach((link, i) => {
        gsap.from(link, {
          scrollTrigger: {
            trigger: link,
            start: 'top 90%',
            toggleActions: 'play none none none',
          },
          opacity: 0,
          x: 30,
          duration: 0.6,
          delay: i * 0.1,
        });
      });

      // About grid
      const aboutText = document.querySelector('.about-text');
      const aboutTerminal = document.querySelector('.about-terminal');
      if (aboutText) {
        gsap.from(aboutText, {
          scrollTrigger: { trigger: aboutText, start: 'top 80%' },
          opacity: 0, x: -40, duration: 1,
        });
      }
      if (aboutTerminal) {
        gsap.from(aboutTerminal, {
          scrollTrigger: { trigger: aboutTerminal, start: 'top 80%' },
          opacity: 0, x: 40, duration: 1,
        });
      }

      // Contact grid
      const contactForm = document.querySelector('.contact-form');
      const contactInfo = document.querySelector('.contact-info');
      if (contactForm) {
        gsap.from(contactForm, {
          scrollTrigger: { trigger: contactForm, start: 'top 80%' },
          opacity: 0, x: -40, duration: 1,
        });
      }
      if (contactInfo) {
        gsap.from(contactInfo, {
          scrollTrigger: { trigger: contactInfo, start: 'top 80%' },
          opacity: 0, x: 40, duration: 1,
        });
      }
    }

    // Card hover glow effect
    document.querySelectorAll('.card').forEach((card) => {
      card.addEventListener('mouseenter', () => {
        gsap.to(card, { scale: 1.02, duration: 0.3, ease: 'power2.out' });
      });
      card.addEventListener('mouseleave', () => {
        gsap.to(card, { scale: 1, duration: 0.3, ease: 'power2.out' });
      });
    });
  }

  // ============================================
  // TYPING EFFECT
  // ============================================
  const typingElements = document.querySelectorAll('[data-typing]');
  typingElements.forEach((el) => {
    const text = el.getAttribute('data-typing');
    el.textContent = '';
    let i = 0;
    const interval = setInterval(() => {
      if (i < text.length) {
        el.textContent += text[i];
        i++;
      } else {
        clearInterval(interval);
      }
    }, 60);
  });

  // ============================================
  // CONTACT FORM (UI only)
  // ============================================
  const contactFormEl = document.getElementById('contact-form');
  if (contactFormEl) {
    contactFormEl.addEventListener('submit', (e) => {
      e.preventDefault();

      // Get form data for display only
      const formData = new FormData(contactFormEl);
      const name = formData.get('name');

      // Show confirmation in terminal style
      const confirmEl = document.getElementById('form-confirmation');
      if (confirmEl) {
        confirmEl.innerHTML = `
          <div class="terminal-panel" style="margin-top: 1.5rem;">
            <div class="terminal-header">
              <span class="terminal-dot green"></span>
              <span class="terminal-title">TRANSMISSION STATUS</span>
            </div>
            <div class="terminal-body">
              <div class="terminal-line">
                <span class="terminal-prompt">&gt; </span>
                <span class="terminal-command">STATUS:</span>
                <span style="color: #28ca42;"> MESSAGE QUEUED</span>
              </div>
              <div class="terminal-line">
                <span class="terminal-prompt">&gt; </span>
                <span class="terminal-output">Thank you, ${name || 'Operator'}. Your transmission has been logged.</span>
              </div>
            </div>
          </div>
        `;
        confirmEl.style.display = 'block';
        if (typeof gsap !== 'undefined') {
          gsap.from(confirmEl, { opacity: 0, y: 20, duration: 0.6 });
        }
      }

      contactFormEl.reset();
    });
  }
})();
