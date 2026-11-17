import type { MetadataRoute } from 'next';
import { SITE_URL } from '@/lib/constants';
import { getCities, getProcessSummaries } from '@/lib/data';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [{ data: processes }, cities] = await Promise.all([
    getProcessSummaries(),
    getCities(),
  ]);

  const now = new Date();

  const staticRoutes: MetadataRoute.Sitemap = [
    '',
    '/processes',
    '/checklist',
    '/wait-times',
    '/about',
    '/contact',
    '/disclaimer',
    '/privacy-policy',
    '/terms',
    '/cookie-policy',
  ].map((route) => ({
    url: `${SITE_URL}${route}`,
    lastModified: now,
    changeFrequency: route === '' || route === '/wait-times' ? 'daily' : 'weekly',
    priority: route === '' ? 1.0 : 0.8,
  }));

  const cityRoutes: MetadataRoute.Sitemap = cities.map((city) => ({
    url: `${SITE_URL}/city/${city.slug}`,
    lastModified: now,
    changeFrequency: 'weekly',
    priority: 0.9,
  }));

  const processRoutes: MetadataRoute.Sitemap = processes.map((proc) => ({
    url: `${SITE_URL}/process/${proc.slug}`,
    lastModified: new Date(proc.last_updated),
    changeFrequency: 'weekly',
    priority: 0.9,
  }));

  return [...staticRoutes, ...cityRoutes, ...processRoutes];
}
