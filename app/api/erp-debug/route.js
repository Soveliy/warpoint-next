import { fetchErpSites } from '../../../lib/erp-site-transport';

export async function GET() {
  if (process.env.NODE_ENV !== 'development') return new Response(null, { status: 404 });

  const token = process.env.ERP_SITE_TOKEN?.trim();
  const endpoint = token
    ? process.env.ERP_SITES_URL || 'https://dserver.warpoint.ru/api/wp_site/public/sites/'
    : process.env.ERP_COUNTRIES_URL || 'https://gserver.warpoint.ru/api/site/v2/countries';

  try {
    let data;
    if (token) {
      data = await fetchErpSites({ endpoint, token });
    } else {
      const response = await fetch(endpoint, {
        cache: 'no-store',
        signal: AbortSignal.timeout(8000),
      });
      if (!response.ok) throw new Error('ERP returned ' + response.status);
      data = await response.json();
    }
    return Response.json({ endpoint, data }, { headers: { 'Cache-Control': 'no-store' } });
  } catch {
    return Response.json(
      { error: 'Не удалось получить данные ERP.' },
      { status: 502, headers: { 'Cache-Control': 'no-store' } },
    );
  }
}
