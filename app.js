// ─── Mobile Menu Toggle ───
const hamburger = document.getElementById('hamburger');
const navLinks  = document.getElementById('navLinks');

hamburger.addEventListener('click', () => {
  navLinks.classList.toggle('open');
});

navLinks.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => navLinks.classList.remove('open'));
});

// ─── FAQ Accordion ───
document.querySelectorAll('.faq-question').forEach(btn => {
  btn.addEventListener('click', () => {
    const item = btn.parentElement;
    const isOpen = item.classList.contains('open');

    // Close all
    document.querySelectorAll('.faq-item.open').forEach(i => i.classList.remove('open'));

    // Toggle current
    if (!isOpen) item.classList.add('open');
  });
});

// ─── Form Submission ───
const form = document.getElementById('consultForm');

form.addEventListener('submit', (e) => {
  e.preventDefault();

  const inputs = form.querySelectorAll('input, select');
  let valid = true;
  inputs.forEach(inp => {
    if (!inp.value.trim()) valid = false;
  });

  const phone = form.querySelector('input[type="tel"]').value.trim();
  if (phone && !/^01[0-9]-?\s?[0-9]{3,4}\s?[0-9]{4,5}$/.test(phone)) {
    showToast('Please enter a valid Malaysian phone number (e.g. 012-345 6789)', true);
    return;
  }

  if (!valid) {
    showToast('Please fill in all required fields', true);
    return;
  }

  showToast('Thank you! I will contact you within 24 hours.');
  form.reset();
});

// ─── Toast Notification ───
function showToast(msg, isError = false) {
  const existing = document.querySelector('.toast');
  if (existing) existing.remove();

  const toast = document.createElement('div');
  toast.className = `toast${isError ? ' error' : ''}`;
  toast.textContent = msg;
  document.body.appendChild(toast);

  requestAnimationFrame(() => {
    toast.classList.add('show');
    setTimeout(() => {
      toast.classList.remove('show');
      setTimeout(() => toast.remove(), 400);
    }, 3500);
  });
}
