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

// Africa map — cursor-following tooltip showing each country's name
(function () {
  var map = document.querySelector('.africa-map');
  if (!map) return;
  var tip = document.createElement('div');
  tip.className = 'map-tip';
  tip.setAttribute('aria-hidden', 'true');
  document.body.appendChild(tip);
  map.addEventListener('mousemove', function (e) {
    var name = e.target && e.target.getAttribute ? e.target.getAttribute('data-name') : null;
    if (!name) { tip.classList.remove('show'); return; }
    tip.textContent = name;
    tip.style.left = e.clientX + 'px';
    tip.style.top = e.clientY + 'px';
    tip.classList.add('show');
  });
  map.addEventListener('mouseleave', function () { tip.classList.remove('show'); });
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

// Floating WhatsApp button — set WHATSAPP_NUMBER to activate (intl format,
// digits only, no + or spaces, e.g. '2348012345678'). Left blank on purpose
// so no button pointing at a wrong number can ship; adding the number is the
// only change needed to turn it on.
const WHATSAPP_NUMBER = '';
if (WHATSAPP_NUMBER) {
  var wa = document.createElement('a');
  wa.className = 'whatsapp-fab';
  wa.href = 'https://wa.me/' + WHATSAPP_NUMBER +
    '?text=' + encodeURIComponent("Hi ClearTrust — I'd like to request a verification.");
  wa.target = '_blank';
  wa.rel = 'noopener';
  wa.setAttribute('aria-label', 'Chat with ClearTrust on WhatsApp');
  wa.innerHTML = '<svg width="28" height="28" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">' +
    '<path d="M17.5 14.4c-.3-.15-1.77-.87-2.04-.97-.27-.1-.47-.15-.67.15-.2.3-.77.96-.94 1.16-.17.2-.35.22-.65.07-.3-.15-1.26-.46-2.4-1.48-.89-.79-1.49-1.77-1.66-2.07-.17-.3-.02-.46.13-.61.13-.13.3-.35.44-.52.15-.17.2-.3.3-.5.1-.2.05-.37-.02-.52-.08-.15-.67-1.6-.92-2.2-.24-.58-.49-.5-.67-.51h-.57c-.2 0-.52.07-.8.37-.27.3-1.04 1.02-1.04 2.48s1.07 2.88 1.22 3.08c.15.2 2.1 3.2 5.08 4.49.71.3 1.26.49 1.69.63.71.22 1.36.19 1.87.12.57-.09 1.77-.72 2.02-1.42.25-.7.25-1.3.17-1.42-.07-.13-.27-.2-.57-.35zM12 2a10 10 0 00-8.6 15.06L2 22l5.05-1.32A10 10 0 1012 2z"/></svg>';
  document.body.appendChild(wa);
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
          consent: document.getElementById('consent').checked ? 'Yes' : 'No',
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
