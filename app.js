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

// ─── Form Submission — WhatsApp ───
const form = document.getElementById('consultForm');
const WHATSAPP_NUMBER = '601139487938';

form.addEventListener('submit', (e) => {
  e.preventDefault();

  const fields = form.querySelectorAll('input, select');
  let valid = true;
  fields.forEach(f => { if (!f.value.trim()) valid = false; });

  const phoneInput = form.querySelector('input[type="tel"]').value.trim();
  if (phoneInput && !/^01[0-9]-?\s?[0-9]{3,4}\s?[0-9]{4,5}$/.test(phoneInput)) {
    showToast('Please enter a valid Malaysian phone number', true);
    return;
  }

  if (!valid) {
    showToast('Please fill in all required fields', true);
    return;
  }

  // Gather form values
  const val = {};
  const inputs = form.querySelectorAll('input, select, textarea');
  inputs.forEach(f => {
    const placeholder = f.placeholder || '';
    if (placeholder.includes('Name')) val.name = f.value.trim();
    else if (placeholder.includes('Phone')) val.phone = f.value.trim();
    else if (placeholder.includes('Loan Amount')) val.amount = f.value.trim();
    else if (placeholder.includes('Monthly Income')) val.income = f.value.trim();
    else if (placeholder.includes('past rejections') || placeholder.includes('Any past')) val.notes = f.value.trim();
  });

  // Select values by index
  const selects = form.querySelectorAll('select');
  val.purpose = selects[0] ? selects[0].value : '';
  val.employment = selects[1] ? selects[1].value : '';

  // Build WhatsApp message
  let msg = `Hi Marcus, I'd like a free consultation.`;
  if (val.name) msg += `\n\nName: ${val.name}`;
  if (val.phone) msg += `\nPhone: ${val.phone}`;
  if (val.amount) msg += `\nLoan Amount: RM ${val.amount}`;
  if (val.purpose) msg += `\nPurpose: ${val.purpose}`;
  if (val.income) msg += `\nMonthly Income: RM ${val.income}`;
  if (val.employment) msg += `\nEmployment: ${val.employment}`;
  if (val.notes) msg += `\nNotes: ${val.notes}`;

  const waUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(msg)}`;
  window.open(waUrl, '_blank');

  showToast('Opening WhatsApp... Reply there and we\'ll help you right away.');
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
