import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';
import { articles } from '../src/lib/journal';
const routes = ['/', '/tours', '/about', '/contact', '/dambadiva-tours', '/privacy', '/local-hires', '/fleet', '/guides', '/news', '/tour/3-day-yala-leopard-safari-galle', '/tour/7-day-wonders-of-sri-lanka-tour', '/tour/12-day-sacred-india-dambadiva-pilgrimage', ...articles.map(a=>`/news/${a.slug}`)];
for (const width of [360, 768, 1440]) {
  test(`pages, images, accessibility and layout at ${width}px`, async ({page}) => {
    test.setTimeout(90000);
    await page.setViewportSize({width,height:960});
    const errors:string[] = []; page.on('pageerror',e=>errors.push(e.message));
    for(const route of routes) {
      const response = await page.goto(route); expect(response?.status()).toBe(200);
      await expect(page.locator('main h1')).toHaveCount(1);
      await expect(page).toHaveTitle(/.+/);
      const schemas=await page.locator('script[type="application/ld+json"]').allTextContents(); schemas.forEach(s=>expect(()=>JSON.parse(s)).not.toThrow());
      await page.locator('img').evaluateAll(imgs=>imgs.forEach(img=>{(img as HTMLImageElement).loading='eager';}));
      await page.locator('footer').scrollIntoViewIfNeeded();
      await expect.poll(()=>page.locator('img').evaluateAll(imgs=>imgs.every(img=>(img as HTMLImageElement).complete && (img as HTMLImageElement).naturalWidth>0))).toBe(true);
      expect(await page.evaluate(()=>document.documentElement.scrollWidth <= innerWidth),`horizontal overflow at ${route}, ${width}px`).toBe(true);
      const a11y = await new AxeBuilder({page}).withTags(['wcag2a','wcag2aa','wcag21aa']).analyze();
      expect(a11y.violations.map(v=>({id:v.id,nodes:v.nodes.map(n=>n.target)}))).toEqual([]);
    }
    expect(errors).toEqual([]);
  });
}
test('filters follow URL, update count and support browser history', async ({page}) => {
  await page.goto('/tours?category=day-excursions');
  await expect(page.getByRole('button',{name:'Wildlife & short escapes',exact:true})).toHaveAttribute('aria-pressed','true');
  await expect(page.locator('[data-tour-category]:visible')).toHaveCount(1);
  await page.getByRole('button',{name:'All journeys',exact:true}).click();
  expect(await page.locator('[data-tour-category]:visible').count()).toBeGreaterThan(1);
  await page.goBack(); await expect(page.locator('[data-tour-category]:visible')).toHaveCount(1);
});
test('mobile menu and accessible inquiry dialog',async({page})=>{
  await page.setViewportSize({width:360,height:800}); await page.goto('/');
  await page.locator('#menu-toggle').click();
  await expect(page.getByRole('navigation',{name:'Mobile navigation'})).toBeVisible();
  await page.getByRole('navigation',{name:'Mobile navigation'}).getByRole('button',{name:'Plan a journey',exact:true}).click();
  const dialog=page.getByRole('dialog'); await expect(dialog).toBeVisible();
  const a11y=await new AxeBuilder({page}).withTags(['wcag2a','wcag2aa','wcag21aa']).analyze(); expect(a11y.violations).toEqual([]);
  await page.keyboard.press('Escape'); await expect(dialog).not.toBeVisible();
  await page.locator('#menu-toggle').click();
  await page.getByRole('navigation',{name:'Mobile navigation'}).getByRole('link',{name:'Contact',exact:true}).click();
  await expect(page).toHaveURL(/\/contact/);
});
test('inquiry creates a real WhatsApp handoff without claiming delivery',async({page})=>{
  await page.goto('/contact');
  await page.evaluate(()=>{(window as any).__handoffs=[]; window.open=((url:string)=>{(window as any).__handoffs.push(url);return null;}) as any;});
  const form=page.locator('main form'); await form.getByLabel('Your name').fill('Test Traveler'); await form.getByLabel('Phone or WhatsApp').fill('+94 77 123 4567'); await form.getByLabel('What would make').fill('Two adults, relaxed pace');
  await form.getByRole('button',{name:'Continue in WhatsApp'}).click();
  const link=form.getByRole('link',{name:'Open WhatsApp to review and send'}); await expect(link).toBeVisible();
  const href=await link.getAttribute('href'); expect(href).toMatch(/^https:\/\/wa.me\/\d+\?text=/); expect(decodeURIComponent(href!)).toContain('Test Traveler'); expect(decodeURIComponent(href!)).toContain('Two adults, relaxed pace'); await expect(form).not.toContainText('Inquiry received');
});

test('fleet selection and hire draft preserve route and vehicle',async({page})=>{
  await page.goto('/local-hires?vehicle=mercedes-benz-amg-c-class#hire-planner');
  const form=page.locator('[data-hire-form]');
  await expect(form.getByRole('radio',{name:/Mercedes-Benz AMG C-Class/})).toBeChecked();
  await page.evaluate(()=>{window.open=(()=>null) as any;});
  await form.getByLabel('Pickup location').fill('Pita Kotte');
  await form.getByLabel('Destination').fill('Colombo');
  await form.getByLabel('Travel date').fill('2027-01-20');
  await form.getByLabel('Your name').fill('Hire Tester');
  await form.getByRole('button',{name:'Get my hire quote'}).click();
  const url=await form.getByRole('link',{name:'Open WhatsApp to review and send'}).getAttribute('href');
  expect(decodeURIComponent(url!)).toContain('Mercedes-Benz AMG C-Class');
  expect(decodeURIComponent(url!)).toContain('Pickup: Pita Kotte');
  expect(decodeURIComponent(url!)).toContain('Destination: Colombo');
});

test('twelve sourced guides support search, topics, reset, and checklists',async({page})=>{
  expect(articles).toHaveLength(12);
  for(const article of articles){expect(article.sections.length).toBeGreaterThanOrEqual(4);expect(article.sources!.length).toBeGreaterThan(0);expect(article.checklist!.length).toBeGreaterThan(0);}
  await page.goto('/news');await expect(page.locator('[data-guide-card]')).toHaveCount(12);
  await page.getByLabel('Find a guide').fill('airport');
  await expect(page.locator('[data-guide-card]:visible')).toHaveCount(1);
  await page.getByLabel('Find a guide').fill('nonexistent topic xyz');await expect(page.locator('#guide-empty')).toBeVisible();
  await page.getByRole('button',{name:'Show all guides'}).click();await expect(page.locator('[data-guide-card]:visible')).toHaveCount(12);
  await page.getByLabel('Choose a topic').selectOption('Wildlife');await expect(page.locator('[data-guide-card]:visible')).toHaveCount(1);
  await page.goto('/news/yala-safari-first-visit-guide');
  const item=page.locator('.article-checklist input').first();await item.check();await expect(item).toBeChecked();
  await expect(page.locator('#guide-sources a')).toHaveAttribute('href',/sltda.gov.lk/);
});
