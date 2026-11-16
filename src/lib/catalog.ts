import { getTours, FALLBACK_TOURS, type TourPackage } from './api';

// Curated local covers keep catalog photos relevant and independent of API asset URLs.
export function safeImage(_url: string | undefined, country = '', slug = ''): string {
  if (country.includes('India') || slug.includes('dambadiva')) return '/images/dambadiva.webp';
  if (/yala|safari|wildlife/.test(slug)) return '/images/yala.webp';
  return '/images/sigiriya.webp';
}
let catalog: Promise<TourPackage[]> | undefined;
export function getCatalog(): Promise<TourPackage[]> {
  return catalog ??= getTours().then(tours => tours.filter(t => t.status === 'active' && /^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(t.slug)).map(t => {
    const fallback = FALLBACK_TOURS.find(f => f.slug === t.slug);
    return {
      ...t,
      price: Number(t.price) || 0,
      compare_at_price: Number(t.compare_at_price) || null,
      duration_days: Number(t.duration_days) || fallback?.duration_days || 1,
      category_slug: t.category_slug || fallback?.category_slug || (t.country.includes('India') ? 'dambadiva-pilgrimages' : 'sri-lanka-tours'),
      images: [{ id: 'cover', url: safeImage(t.images?.[0]?.url, t.country, t.slug), alt_text: t.title, is_primary: true }],
    };
  }));
}
export function plainText(value: string): string {
  return (value || '').replace(/<[^>]*>/g, ' ').replace(/&nbsp;/g, ' ').replace(/&amp;/g, '&').replace(/&quot;/g, '"').replace(/&#39;/g, "'").replace(/\s+/g, ' ').trim();
}
