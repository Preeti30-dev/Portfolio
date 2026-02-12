// script.js - Modern Portfolio for Priti Bala Mehta
// Handles typing animation, fade-in on scroll, smooth scroll, and year update

document.addEventListener('DOMContentLoaded', function () {
    // EmailJS Contact Form Integration
    // 1. Sign up at https://www.emailjs.com/ and get your Service ID, Template ID, and Public Key.
    // 2. Replace the placeholders below with your actual EmailJS values.
    // 3. This will send form data to your Gmail via EmailJS (no backend needed).

    // Load EmailJS SDK
    const emailjsScript = document.createElement('script');
    emailjsScript.src = 'https://cdn.jsdelivr.net/npm/emailjs-com@3/dist/email.min.js';
    emailjsScript.onload = function () {
      if (window.emailjs) {
        emailjs.init('mCX3NpbTvUtXG1pST'); // <-- Replace with your EmailJS Public Key
      }
    };
    document.head.appendChild(emailjsScript);

    const contactForm = document.getElementById('contact-form');
    const formStatus = document.getElementById('form-status');
    if (contactForm) {
      contactForm.addEventListener('submit', function (e) {
        e.preventDefault();
        if (!window.emailjs) {
          formStatus.textContent = 'Email service not loaded. Please try again.';
          formStatus.style.color = 'red';
          return;
        }
        formStatus.textContent = 'Sending...';
        formStatus.style.color = '#333';
        emailjs.send('service_yakmk19', '_ejs-test-mail-service_', {
          from_name: document.getElementById('contact-name').value,
          from_email: document.getElementById('contact-email').value,
          message: document.getElementById('contact-message').value
        })
        .then(function () {
          formStatus.textContent = 'Message sent successfully!';
          formStatus.style.color = 'green';
          contactForm.reset();
        }, function (error) {
          formStatus.textContent = 'Failed to send. Please try again.';
          formStatus.style.color = 'red';
        });
      });
    }
  // Typing Animation
  const typingText = [
    'Web Developer',
    'MCA Aspirant',
    'Problem Solver'
  ];
  let typingIndex = 0, charIndex = 0, isDeleting = false;
  const typingElem = document.querySelector('.hero-typing');
  function type() {
    if (!typingElem) return;
    const current = typingText[typingIndex];
    if (isDeleting) {
      typingElem.textContent = current.substring(0, charIndex--);
      if (charIndex < 0) {
        isDeleting = false;
        typingIndex = (typingIndex + 1) % typingText.length;
        setTimeout(type, 600);
      } else {
        setTimeout(type, 40);
      }
    } else {
      typingElem.textContent = current.substring(0, charIndex++);
      if (charIndex > current.length) {
        isDeleting = true;
        setTimeout(type, 1200);
      } else {
        setTimeout(type, 90);
      }
    }
  }
  setTimeout(type, 800);

  // Fade-in on scroll
  const fadeEls = document.querySelectorAll('.fade-on-scroll');
  const fadeInObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('fade-in');
        fadeInObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15 });
  fadeEls.forEach(el => fadeInObserver.observe(el));

  // Smooth scroll for nav/btns
  document.querySelectorAll('a[href^="#"], .btn[href^="#"]').forEach(link => {
    link.addEventListener('click', function (e) {
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });

  // Footer year auto-update
  const yearSpan = document.getElementById('footer-year');
  if (yearSpan) {
    yearSpan.textContent = new Date().getFullYear();
  }
});
