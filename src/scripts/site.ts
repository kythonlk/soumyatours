const menuButton = document.querySelector<HTMLButtonElement>('#menu-toggle');
const menu = document.querySelector<HTMLElement>('#mobile-menu');

function closeMenu() {
  if (menu) menu.hidden = true;
  menuButton?.setAttribute('aria-expanded', 'false');
}

menuButton?.addEventListener('click', () => {
  const expanded = menuButton.getAttribute('aria-expanded') === 'true';
  menuButton.setAttribute('aria-expanded', String(!expanded));
  if (menu) menu.hidden = expanded;
});

menu?.querySelectorAll('a').forEach((link) => link.addEventListener('click', closeMenu));
matchMedia('(min-width: 1024px)').addEventListener('change', closeMenu);

const dialog = document.querySelector<HTMLDialogElement>('#booking-modal');
let previousFocus: HTMLElement | null = null;

document.addEventListener('click', (event) => {
  const target = event.target as Element;
  const trigger = target.closest<HTMLElement>('[data-inquire]');
  if (trigger && dialog) {
    event.preventDefault();
    closeMenu();
    previousFocus = trigger;
    const input = dialog.querySelector<HTMLInputElement>('[name="tour"]');
    if (input) input.value = trigger.dataset.inquire || 'Help me choose a journey';
    const status = dialog.querySelector<HTMLElement>('[role="status"]');
    if (status) status.textContent = '';
    dialog.showModal();
    document.body.classList.add('modal-open');
  }
  if (target.closest('[data-close-dialog]')) {
    dialog?.close();
  }
});

dialog?.addEventListener('click', (event) => {
  if (event.target === dialog) {
    const r = dialog.getBoundingClientRect();
    if (event.clientX < r.left || event.clientX > r.right || event.clientY < r.top || event.clientY > r.bottom) {
      dialog.close();
    }
  }
});

dialog?.addEventListener('close', () => {
  document.body.classList.remove('modal-open');
  previousFocus?.focus();
});

document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape' && menuButton?.getAttribute('aria-expanded') === 'true') {
    closeMenu();
    menuButton.focus();
  }
});

function setMinDate(form: HTMLFormElement) {
  const date = form.querySelector<HTMLInputElement>('[type="date"]');
  if (!date) return;
  const now = new Date();
  date.min = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')}`;
}

function showWhatsAppHandoff(form: HTMLFormElement, url: string, prefix: string) {
  const status = form.querySelector<HTMLElement>('[role="status"]');
  if (status) {
    status.replaceChildren(`${prefix} `);
    const link = document.createElement('a');
    link.href = url;
    link.target = '_blank';
    link.rel = 'noopener noreferrer';
    link.textContent = 'Open WhatsApp to review and send';
    status.append(link);
  }
  window.open(url, '_blank', 'noopener,noreferrer');
}

document.querySelectorAll<HTMLFormElement>('[data-inquiry-form]').forEach((form) => {
  setMinDate(form);
  form.addEventListener('submit', (event) => {
    event.preventDefault();
    if (!form.reportValidity()) return;
    const data = new FormData(form);
    const message = [
      "Hello Saumya Tours, I'd like to plan a journey.",
      '',
      `Name: ${String(data.get('name')).trim()}`,
      `Phone: ${String(data.get('phone')).trim()}`,
      `Journey: ${data.get('tour') || 'Help me choose'}`,
      `Departure: ${data.get('date') || 'Flexible'}`,
      `Group: ${data.get('travelers')}`,
      `Requests: ${String(data.get('message') || '').trim() || 'None yet'}`,
    ].join('\n');
    const url = `https://wa.me/${document.body.dataset.whatsapp}?text=${encodeURIComponent(message)}`;
    showWhatsAppHandoff(form, url, 'Your inquiry is ready.');
  });
});

const hireForm = document.querySelector<HTMLFormElement>('[data-hire-form]');
if (hireForm) {
  setMinDate(hireForm);
  const requested = new URLSearchParams(location.search).get('vehicle');
  hireForm.querySelectorAll<HTMLInputElement>('[name="vehicle"]').forEach((radio) => {
    if (radio.dataset.vehicleId === requested) radio.checked = true;
  });
  hireForm.addEventListener('submit', (event) => {
    event.preventDefault();
    if (!hireForm.reportValidity()) return;
    const d = new FormData(hireForm);
    const text = [
      'Hello Saumya Tours, I would like a local hire quote.',
      '',
      `Name: ${String(d.get('name')).trim()}`,
      `Vehicle: ${d.get('vehicle')}`,
      `Pickup: ${String(d.get('pickup')).trim()}`,
      `Destination: ${String(d.get('dropoff')).trim()}`,
      `Date: ${d.get('date')}`,
      `Journey: ${d.get('service')}`,
      `Travelers: ${d.get('people')}`,
      `Notes: ${String(d.get('notes') || '').trim() || 'None yet'}`,
      '',
      'Please confirm availability, suitability, and the total quote.',
    ].join('\n');
    const url = `https://wa.me/${document.body.dataset.whatsapp}?text=${encodeURIComponent(text)}`;
    showWhatsAppHandoff(hireForm, url, 'Your quote request is ready.');
  });
}

const filters = document.querySelectorAll<HTMLButtonElement>('[data-filter]');
function filterTours(category: string, updateURL = false) {
  const allowed = ['all', 'sri-lanka-tours', 'dambadiva-pilgrimages', 'day-excursions'];
  if (!allowed.includes(category)) category = 'all';
  let count = 0;
  document.querySelectorAll<HTMLElement>('[data-tour-category]').forEach((item) => {
    item.hidden = category !== 'all' && item.dataset.tourCategory !== category;
    if (!item.hidden) count++;
  });
  filters.forEach((button) => button.setAttribute('aria-pressed', String(button.dataset.filter === category)));
  const empty = document.querySelector<HTMLElement>('#empty-tours');
  if (empty) empty.hidden = count > 0;
  const status = document.querySelector('#tour-count');
  if (status) status.textContent = `${count} ${count === 1 ? 'journey' : 'journeys'} to explore`;
  if (updateURL) {
    const url = new URL(location.href);
    if (category === 'all') {
      url.searchParams.delete('category');
    } else {
      url.searchParams.set('category', category);
    }
    history.pushState({}, '', url);
  }
}

if (filters.length) {
  filterTours(new URLSearchParams(location.search).get('category') || 'all');
  filters.forEach((button) => button.addEventListener('click', () => filterTours(button.dataset.filter!, true)));
  window.addEventListener('popstate', () => filterTours(new URLSearchParams(location.search).get('category') || 'all'));
}

// Single safe image fallback handler for missing remote or local imagery.
document.addEventListener(
  'error',
  (event) => {
    const img = event.target;
    if (img instanceof HTMLImageElement && img.closest('main') && !img.dataset.fallbackApplied) {
      img.dataset.fallbackApplied = 'true';
      img.removeAttribute('srcset');
      img.src = '/images/sigiriya.webp';
      img.alt = "Sri Lanka's Sigiriya rock fortress";
    }
  },
  true,
);

const guideSearch = document.querySelector<HTMLInputElement>('#guide-search');
const guideCategory = document.querySelector<HTMLSelectElement>('#guide-category');

function filterGuides() {
  const query = guideSearch?.value.trim().toLowerCase() || '';
  const category = guideCategory?.value || 'all';
  let visible = 0;
  document.querySelectorAll<HTMLElement>('[data-guide-card]').forEach((card) => {
    const match =
      (card.dataset.guideSearch?.includes(query) ?? false) &&
      (category === 'all' || card.dataset.guideCategory === category);
    card.hidden = !match;
    if (match) visible++;
  });
  const count = document.querySelector('#guide-count');
  if (count) count.textContent = `${visible} ${visible === 1 ? 'guide' : 'guides'} to explore`;
  const empty = document.querySelector<HTMLElement>('#guide-empty');
  if (empty) empty.hidden = visible > 0;
}

guideSearch?.addEventListener('input', filterGuides);
guideCategory?.addEventListener('change', filterGuides);
document.querySelector('#guide-reset')?.addEventListener('click', () => {
  if (guideSearch) guideSearch.value = '';
  if (guideCategory) guideCategory.value = 'all';
  filterGuides();
  guideSearch?.focus();
});
