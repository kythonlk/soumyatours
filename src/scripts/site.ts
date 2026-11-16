const menuButton = document.querySelector<HTMLButtonElement>('#menu-toggle');
const menu = document.querySelector<HTMLElement>('#mobile-menu');
function closeMenu() { if (menu) menu.hidden = true; menuButton?.setAttribute('aria-expanded', 'false'); }
menuButton?.addEventListener('click', () => {
  const expanded = menuButton.getAttribute('aria-expanded') === 'true';
  menuButton.setAttribute('aria-expanded', String(!expanded));
  if (menu) menu.hidden = expanded;
});
menu?.querySelectorAll('a').forEach(a => a.addEventListener('click', closeMenu));
matchMedia('(min-width: 1000px)').addEventListener('change', closeMenu);
const dialog = document.querySelector<HTMLDialogElement>('#booking-modal');
let previousFocus: HTMLElement | null = null;
document.addEventListener('click', event => {
  const trigger = (event.target as Element).closest<HTMLElement>('[data-inquire]');
  if (trigger && dialog) {
    event.preventDefault(); closeMenu(); previousFocus = trigger;
    const input = dialog.querySelector<HTMLInputElement>('[name="tour"]');
    if (input) input.value = trigger.dataset.inquire || 'Help me choose a journey';
    dialog.querySelector<HTMLElement>('[role="status"]')!.textContent = '';
    dialog.showModal(); document.body.classList.add('modal-open');
  }
  if ((event.target as Element).closest('[data-close-dialog]')) dialog?.close();
});
dialog?.addEventListener('click', event => { if (event.target === dialog) { const r = dialog.getBoundingClientRect(); if (event.clientX < r.left || event.clientX > r.right || event.clientY < r.top || event.clientY > r.bottom) dialog.close(); } });
dialog?.addEventListener('close', () => { document.body.classList.remove('modal-open'); previousFocus?.focus(); });
document.addEventListener('keydown', e => { if (e.key === 'Escape' && menuButton?.getAttribute('aria-expanded') === 'true') { closeMenu(); menuButton.focus(); } });
document.querySelectorAll<HTMLFormElement>('[data-inquiry-form]').forEach(form => {
  const date = form.querySelector<HTMLInputElement>('[type="date"]');
  if (date) { const now = new Date(); date.min = `${now.getFullYear()}-${String(now.getMonth()+1).padStart(2,'0')}-${String(now.getDate()).padStart(2,'0')}`; }
  form.addEventListener('submit', event => {
    event.preventDefault(); if (!form.reportValidity()) return;
    const data = new FormData(form);
    const message = `Hello Saumya Tours, I'd like to plan a journey.\n\nName: ${String(data.get('name')).trim()}\nPhone: ${String(data.get('phone')).trim()}\nJourney: ${data.get('tour') || 'Help me choose'}\nDeparture: ${data.get('date') || 'Flexible'}\nGroup: ${data.get('travelers')}\nRequests: ${String(data.get('message') || '').trim() || 'None yet'}`;
    const number = document.body.dataset.whatsapp;
    const url = `https://wa.me/${number}?text=${encodeURIComponent(message)}`;
    // A real link preserves a usable handoff even when a browser blocks popups.
    const status = form.querySelector<HTMLElement>('[role="status"]');
    if (status) {
      status.replaceChildren('Your inquiry is ready. ');
      const link = document.createElement('a'); link.href = url; link.target = '_blank'; link.rel = 'noopener noreferrer'; link.textContent = 'Open WhatsApp to review and send'; status.append(link);
    }
    window.open(url, '_blank', 'noopener,noreferrer');
  });
});
const filters = document.querySelectorAll<HTMLButtonElement>('[data-filter]');
function filterTours(category: string, updateURL = false) {
  const allowed = ['all', 'sri-lanka-tours', 'dambadiva-pilgrimages', 'day-excursions'];
  if (!allowed.includes(category)) category = 'all';
  let count = 0;
  document.querySelectorAll<HTMLElement>('[data-tour-category]').forEach(item => { item.hidden = category !== 'all' && item.dataset.tourCategory !== category; if (!item.hidden) count++; });
  filters.forEach(button => button.setAttribute('aria-pressed', String(button.dataset.filter === category)));
  const empty = document.querySelector<HTMLElement>('#empty-tours'); if (empty) empty.hidden = count > 0;
  const status = document.querySelector('#tour-count'); if (status) status.textContent = `${count} ${count === 1 ? 'journey' : 'journeys'} to explore`;
  if (updateURL) { const url = new URL(location.href); category === 'all' ? url.searchParams.delete('category') : url.searchParams.set('category', category); history.pushState({}, '', url); }
}
if (filters.length) {
  filterTours(new URLSearchParams(location.search).get('category') || 'all');
  filters.forEach(button => button.addEventListener('click', () => filterTours(button.dataset.filter!, true)));
  window.addEventListener('popstate', () => filterTours(new URLSearchParams(location.search).get('category') || 'all'));
}

// Handle a missing asset without repeatedly retrying a broken image.
document.querySelectorAll<HTMLImageElement>('main img').forEach(image => {
  image.addEventListener('error', () => {
    if (image.dataset.fallbackApplied) return;
    image.dataset.fallbackApplied = 'true';
    image.removeAttribute('srcset');
    image.src = '/images/sigiriya.webp';
    image.alt = 'Sri Lanka’s Sigiriya landscape';
  });
});
// Local hire requests remain drafts until the visitor sends them in WhatsApp.
const hireForm = document.querySelector<HTMLFormElement>('[data-hire-form]');
if(hireForm) {
  const date=hireForm.querySelector<HTMLInputElement>('[type="date"]');
  if(date){const now=new Date(); date.min=`${now.getFullYear()}-${String(now.getMonth()+1).padStart(2,'0')}-${String(now.getDate()).padStart(2,'0')}`;}
  const requested=new URLSearchParams(location.search).get('vehicle');
  hireForm.querySelectorAll<HTMLInputElement>('[name="vehicle"]').forEach(radio=>{if(radio.dataset.vehicleId===requested) radio.checked=true;});
  hireForm.addEventListener('submit',e=>{
    e.preventDefault();if(!hireForm.reportValidity())return;
    const d=new FormData(hireForm);
    const text=`Hello Saumya Tours, I would like a local hire quote.\n\nName: ${d.get('name')}\nVehicle: ${d.get('vehicle')}\nPickup: ${d.get('pickup')}\nDestination: ${d.get('dropoff')}\nDate: ${d.get('date')}\nJourney: ${d.get('service')}\nTravelers: ${d.get('people')}\nNotes: ${d.get('notes')||'None yet'}\n\nPlease confirm availability, suitability, and the total quote.`;
    const url=`https://wa.me/${document.body.dataset.whatsapp}?text=${encodeURIComponent(text)}`;
    const status=hireForm.querySelector<HTMLElement>('[role="status"]');
    if(status){status.replaceChildren('Your quote request is ready. ');const a=document.createElement('a');a.href=url;a.target='_blank';a.rel='noopener noreferrer';a.textContent='Open WhatsApp to review and send';status.append(a);}
    window.open(url,'_blank','noopener,noreferrer');
  });
}
document.addEventListener('error',event=>{
  const img=event.target;
  if(img instanceof HTMLImageElement && !img.dataset.fallbackUsed){img.dataset.fallbackUsed='true';img.src='/images/sigiriya.webp';}
},true);
const guideSearch=document.querySelector<HTMLInputElement>('#guide-search');
const guideCategory=document.querySelector<HTMLSelectElement>('#guide-category');
function filterGuides(){
 const query=guideSearch?.value.trim().toLowerCase() || '';const category=guideCategory?.value || 'all';let visible=0;
 document.querySelectorAll<HTMLElement>('[data-guide-card]').forEach(card=>{card.hidden=!(card.dataset.guideSearch?.includes(query) && (category==='all'||card.dataset.guideCategory===category));if(!card.hidden)visible++;});
 const count=document.querySelector('#guide-count');if(count)count.textContent=`${visible} ${visible===1?'guide':'guides'} to explore`;
 const empty=document.querySelector<HTMLElement>('#guide-empty');if(empty)empty.hidden=visible>0;
}
guideSearch?.addEventListener('input',filterGuides);guideCategory?.addEventListener('change',filterGuides);
document.querySelector('#guide-reset')?.addEventListener('click',()=>{if(guideSearch)guideSearch.value='';if(guideCategory)guideCategory.value='all';filterGuides();guideSearch?.focus();});
