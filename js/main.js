// Mobile navigation
const header = document.querySelector('header');
const menuToggle = document.querySelector('.menu-toggle');
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
      msg.textContent = "Thanks — your request has been sent. We'll reply within 1 business day.";
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
