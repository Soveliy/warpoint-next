import { getSite } from '../../lib/site';

export async function GET() {
  const site = await getSite();
  if (!site) return new Response('Not found', { status: 404 });

  return new Response(
    `User-agent: *\nAllow: /\nSitemap: ${new URL('/sitemap.xml', site.canonicalUrl)}\n`,
    { headers: { 'Content-Type': 'text/plain; charset=utf-8' } },
  );
}
