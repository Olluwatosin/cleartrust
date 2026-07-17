// Scroll-reveal (set 1) — fade + rise as elements enter view, staggered
// within each parent. Runs first so a later error can't leave content hidden.
(function () {
  var SELECTOR = '.mv-card,.line-card,.step,.why-card,.service-card,' +
    '.detail-photo,.side-card,.contact-info,.hero-panel,.hero-logo,' +
    '.hero .eyebrow,.hero h1,.hero p.lead,.hero-actions,.hero-note';
  var els = Array.prototype.slice.call(document.querySelectorAll(SELECTOR));
  if (!els.length) return;

  // Stagger index within each element's parent
  var counts = new Map();
  els.forEach(function (el) {
    var p = el.parentElement;
    var n = counts.get(p) || 0;
    el.style.setProperty('--i', n);
    counts.set(p, n + 1);
  });

  if (!('IntersectionObserver' in window)) {
    els.forEach(function (el) { el.classList.add('in'); });
    return;
  }
  var io = new IntersectionObserver(function (entries, obs) {
    entries.forEach(function (e) {
      if (e.isIntersecting) { e.target.classList.add('in'); obs.unobserve(e.target); }
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -8% 0px' });
  els.forEach(function (el) { io.observe(el); });
})();

// Mobile navigation
const header = document.querySelector('header');
const menuToggle = document.querySelector('.menu-toggle');

// Header condenses on scroll (set 4)
if (header) {
  var onScroll = function () { header.classList.toggle('scrolled', window.scrollY > 24); };
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();
}
if (menuToggle) {
  menuToggle.addEventListener('click', function () {
    const open = header.classList.toggle('nav-open');
    menuToggle.setAttribute('aria-expanded', open ? 'true' : 'false');
  });
  document.querySelectorAll('.mobile-menu a').forEach(function (link) {
    link.addEventListener('click', function () {
      header.classList.remove('nav-open');
      menuToggle.setAttribute('aria-expanded', 'false');
    });
  });
}

// Contact form — submits via FormSubmit's AJAX endpoint
const CONTACT_EMAIL = 'salamimuhydeen76@gmail.com';
const form = document.getElementById('verify-form');
if (form) {
  form.addEventListener('submit', async function (e) {
    e.preventDefault();
    const btn = form.querySelector('button[type="submit"]');
    const msg = document.getElementById('form-msg');
    const service = document.getElementById('service').value;

    msg.className = 'form-msg';
    btn.disabled = true;
    const originalLabel = btn.textContent;
    btn.textContent = 'Sending…';

    try {
      const res = await fetch('https://formsubmit.co/ajax/' + CONTACT_EMAIL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
        body: JSON.stringify({
          name: document.getElementById('name').value,
          email: document.getElementById('email').value,
          company: document.getElementById('company').value || 'N/A',
          service: service,
          message: document.getElementById('message').value,
          _subject: 'Verification Request: ' + service,
          _template: 'table',
          _honey: form.querySelector('input[name="_honey"]').value
        })
      });
      if (!res.ok) throw new Error('Request failed: ' + res.status);
      form.reset();
      // Set 5 — animated checkmark draws in alongside the success text
      msg.innerHTML = '<svg class="form-check" viewBox="0 0 24 24" fill="none" aria-hidden="true">' +
        '<path d="M5 12.5L10 17.5L19 7" stroke="#1b8a5a" stroke-width="2.4" ' +
        'stroke-linecap="round" stroke-linejoin="round"/></svg>' +
        "Thanks — your request has been sent. We'll reply within 1 business day.";
      msg.classList.add('show', 'success');
    } catch (err) {
      msg.innerHTML = 'Something went wrong sending your request. Please email us directly at ' +
        '<a href="mailto:' + CONTACT_EMAIL + '" style="text-decoration:underline;">' + CONTACT_EMAIL + '</a>.';
      msg.classList.add('show', 'error');
    } finally {
      btn.disabled = false;
      btn.textContent = originalLabel;
    }
  });
}
