export const site = {
  name: 'Saumya Tours',
  email: import.meta.env.PUBLIC_CONTACT_EMAIL || 'reservations@saumyatours.lk',
  phone: import.meta.env.PUBLIC_CONTACT_PHONE || '+94 77 567 8901',
  whatsapp: (import.meta.env.PUBLIC_WHATSAPP_NUMBER || '94775678901').replace(/\D/g, ''),
  address: import.meta.env.PUBLIC_OFFICE_ADDRESS || '82/4, 3rd Baptist Lane, Beddagane, Pita Kotte, Sri Lanka',
};
export const whatsappLink = (message: string) => `https://wa.me/${site.whatsapp}?text=${encodeURIComponent(message)}`;
