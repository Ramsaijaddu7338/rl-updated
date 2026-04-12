/* ============================================================
   ROYAL'S LOGISTICS — Shared JavaScript
   ============================================================ */

// AOS Animations
AOS.init({ duration: 1000, once: false });

// ── Preloader ──
(function () {
  let progress = 0;
  const bar = document.getElementById('bar');
  const preloader = document.getElementById('preloader');
  if (!preloader) return;

  const interval = setInterval(() => {
    progress += 12;
    if (bar) bar.style.width = progress + '%';
    if (progress >= 100) {
      clearInterval(interval);
      setTimeout(() => {
        preloader.style.opacity = '0';
        preloader.style.transition = 'opacity 0.4s ease';
        setTimeout(() => (preloader.style.display = 'none'), 400);
      }, 200);
    }
  }, 100);
})();

// ── Sticky Navbar ──
window.addEventListener('scroll', () => {
  const navbar = document.querySelector('.navbar');
  if (navbar) navbar.classList.toggle('sticky', window.scrollY > 80);
});

// ── Green Toast ──
function showGreenConfirmation(message) {
  const toast = document.getElementById('confirmationToast');
  const msgSpan = document.getElementById('toastMessage');
  if (!toast || !msgSpan) return;
  msgSpan.innerHTML = message;
  toast.classList.add('show');
  setTimeout(() => toast.classList.remove('show'), 4500);
}

// ── Contact Form ──
const contactForm = document.getElementById('contactForm');
if (contactForm) {
  contactForm.addEventListener('submit', function (e) {
    e.preventDefault();
    const btn = document.getElementById('submitBtn');
    const originalText = btn.innerHTML;
    btn.innerHTML = 'SENDING TO IMPERIAL COURT...';
    btn.disabled = true;

    // Collect all fields (optional fields use safe access)
    const get = (id) => {
      const el = document.getElementById(id);
      return el ? encodeURIComponent(el.value) : '';
    };

    const body = [
      `name=${get('name')}`,
      `email=${get('email')}`,
      `company=${get('company')}`,
      `phone=${get('phone')}`,
      `subject=${get('subject')}`,
      `message=${get('message')}`,
      `employees=${get('employees')}`,
      `vehicleType=${get('vehicleType')}`,
    ].join('&');

    fetch(
      'https://script.google.com/macros/s/AKfycbwufYnX4d1xIejopX4kGRWQ0aq5bRPufrodzMLDw4LWCH_e9zoM7U1cdgGm0E4gsXk/exec',
      {
        method: 'POST',
        mode: 'no-cors',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body,
      }
    )
      .then(() => {
        showGreenConfirmation("✓ Request received. We'll contact you shortly.");
        contactForm.reset();
      })
      .catch(() => {
        showGreenConfirmation('✓ Request received. Thank you!');
        contactForm.reset();
      })
      .finally(() => {
        btn.innerHTML = originalText;
        btn.disabled = false;
      });
  });
}
