// ═══════════════════════════════════════════
//   AFGHAN CHAT — Website JavaScript
// ═══════════════════════════════════════════

// ── Navbar scroll effect ──
const navbar = document.getElementById('navbar');
if (navbar) {
  window.addEventListener('scroll', () => {
    navbar.classList.toggle('scrolled', window.scrollY > 20);
  }, { passive: true });
}

// ── Mobile hamburger menu ──
const hamburger = document.getElementById('hamburger');
const mobileMenu = document.getElementById('mobileMenu');

if (hamburger && mobileMenu) {
  const closeMobileMenu = () => {
    mobileMenu.classList.remove('open');
    hamburger.setAttribute('aria-expanded', 'false');
    hamburger.querySelectorAll('span').forEach(s => {
      s.style.transform = '';
      s.style.opacity = '';
    });
  };

  hamburger.addEventListener('click', () => {
    mobileMenu.classList.toggle('open');
    const isOpen = mobileMenu.classList.contains('open');
    hamburger.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
    const spans = hamburger.querySelectorAll('span');
    if (isOpen) {
      spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
      spans[1].style.opacity = '0';
      spans[2].style.transform = 'rotate(-45deg) translate(5px, -5px)';
    } else {
      spans[0].style.transform = '';
      spans[1].style.opacity = '';
      spans[2].style.transform = '';
    }
  });

  // Close mobile menu when link clicked
  mobileMenu.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      closeMobileMenu();
    });
  });

  // Close on outside click and Escape
  document.addEventListener('click', (e) => {
    if (!mobileMenu.classList.contains('open')) return;
    if (hamburger.contains(e.target) || mobileMenu.contains(e.target)) return;
    closeMobileMenu();
  });
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeMobileMenu();
  });

  // Reset mobile menu when switching to desktop
  window.addEventListener('resize', () => {
    if (window.innerWidth > 768) closeMobileMenu();
  }, { passive: true });
}

// ── Scroll animation (Intersection Observer) ──
const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry, i) => {
      if (entry.isIntersecting) {
        setTimeout(() => {
          entry.target.classList.add('visible');
        }, i * 80);
        observer.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.12 }
);

const animTargets = [
  '.feature-card',
  '.step',
  '.review-card',
  '.ss-phone',
  '.guide-card',
  '.section-head',
  '.download-card',
  '.hero-text',
  '.hero-visual',
];

animTargets.forEach(selector => {
  document.querySelectorAll(selector).forEach(el => {
    el.classList.add('fade-up');
    observer.observe(el);
  });
});

// ── Active nav link on scroll ──
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-links a');

window.addEventListener('scroll', () => {
  let current = '';
  sections.forEach(sec => {
    if (window.scrollY >= sec.offsetTop - 120) {
      current = sec.getAttribute('id');
    }
  });
  navLinks.forEach(a => {
    a.style.color = '';
    if (a.getAttribute('href') === '#' + current) {
      a.style.color = 'var(--purple)';
    }
  });
}, { passive: true });

// ── Typing animation in phone mockup ──
(function typingLoop() {
  const input = document.querySelector('.chat-input-ui input');
  if (!input) return;
  const phrases = ['Say hello...', 'سلام بنویسید...', 'Afghan Chat...', 'پیام بنویسید...', 'افغان چت 🇦🇫'];
  let phraseIdx = 0;

  function type() {
    const phrase = phrases[phraseIdx % phrases.length];
    let i = 0;
    input.placeholder = '';
    const interval = setInterval(() => {
      input.placeholder += phrase[i++];
      if (i >= phrase.length) {
        clearInterval(interval);
        setTimeout(erase, 1800);
      }
    }, 80);
  }

  function erase() {
    let text = input.placeholder;
    const interval = setInterval(() => {
      text = text.slice(0, -1);
      input.placeholder = text;
      if (!text) {
        clearInterval(interval);
        phraseIdx++;
        setTimeout(type, 300);
      }
    }, 40);
  }

  setTimeout(type, 1000);
})();

// ── Smooth scroll for all anchor links ──
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', function (e) {
    const href = this.getAttribute('href');
    if (href === '#') {
      e.preventDefault();
      return;
    }
    const target = document.querySelector(href);
    if (target) {
      e.preventDefault();
      const offset = 68;
      const top = target.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({ top, behavior: 'smooth' });
    }
  });
});

// ── Mobile sticky bar — hide when download section visible ──
const stickyBar = document.getElementById('mobileStickyBar');
const downloadSection = document.getElementById('download');
if (stickyBar && downloadSection) {
  const stickyObserver = new IntersectionObserver(
    ([entry]) => {
      stickyBar.style.transform = entry.isIntersecting ? 'translateY(120%)' : 'translateY(0)';
      stickyBar.style.transition = 'transform .3s ease';
    },
    { threshold: 0.2 }
  );
  stickyObserver.observe(downloadSection);
}

// ── Passive touch events for scroll performance ──
window.addEventListener('touchstart', () => {}, { passive: true });
window.addEventListener('touchmove', () => {}, { passive: true });

console.log('%c Afghan Chat Website Loaded ✓ 🇦🇫', 'color:#6C63FF; font-size:14px; font-weight:700;');
