// Run against a running server: node scripts/check-nadra-routes.mjs [base URL]
import assert from 'node:assert/strict';
const base = process.argv[2] ?? 'http://localhost:3000';
const cities = ['rawalpindi', 'islamabad', 'lahore', 'karachi', 'peshawar', 'quetta', 'hyderabad', 'multan'];
const services = ['first-cnic', 'cnic-renewal', 'cnic-modification', 'lost-cnic', 'child-registration', 'family-registration-certificate', 'nicop', 'pakistan-origin-card', 'identity-cancellation', 'succession-certificate'];
async function page(path) {
  const response = await fetch(`${base}${path}`);
  return { response, html: (await response.text()).replace(/<!--.*?-->/g, '') };
}
for (const city of cities) {
  const { response, html } = await page(`/city/${city}`);
  assert.equal(response.status, 200, city);
  for (const slug of services) assert.ok(html.includes(`/nadra/${slug}?city=${city}`), `${city}: ${slug}`);
}
for (const slug of services) {
  const { response, html } = await page(`/nadra/${slug}?city=lahore`);
  assert.equal(response.status, 200, slug);
  assert.ok(html.includes('Return to Lahore guide'), `${slug}: city context`);
  assert.ok(html.includes('Official sources'), `${slug}: sources`);
}
assert.equal((await page('/nadra/not-a-service')).response.status, 404);
const sitemap = await page('/sitemap.xml');
for (const slug of services) assert.ok(sitemap.html.includes(`/nadra/${slug}`), `sitemap: ${slug}`);
console.log(`Verified ${cities.length} city pages, ${services.length} NADRA guides, 404 and sitemap.`);
