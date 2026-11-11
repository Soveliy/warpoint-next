import { getSite } from '../../lib/site';

export async function GET() {
  const site = await getSite();
  if (!site) return new Response('Not found', { status: 404 });

  const paths = [
    '/indexpage',
    '/games',
    '/tariffs',
    '/articles',
    '/faq',
    '/legal/privacy',
    '/events/birthday',
    '/events/adult-birthday',
    '/events/corporate',
    '/events/graduation',
    '/locations',
    '/contacts',
  ];
  if (site.city === 'Екатеринбург') paths.push('/articles/birthday-ekaterinburg');
  const urls = paths.map((path) => new URL(path, site.canonicalUrl).toString());
  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.map((url) => `  <url><loc>${url}</loc></url>`).join('\n')}
</urlset>`;

  return new Response(xml, {
    headers: { 'Content-Type': 'application/xml; charset=utf-8' },
  });
}
