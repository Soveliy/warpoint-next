import { publicUrl } from './site-content.js';

export function siteContentFor(site, location) {
  const arena = location || site.arenas.find((item) => item.slug === site.slug) || site.arenas[0];
  return arena?.content || {};
}

export function siteDescription(site, location) {
  const description = siteContentFor(site, location).description;
  return typeof description === 'string' ? description.trim() : '';
}

export function sitePageLink(site, location, code, fallbackHref) {
  const pages = siteContentFor(site, location).pages;
  const page = Array.isArray(pages) ? pages.find((item) => item.code === code) : null;
  const url = publicUrl(page?.url);
  const branch = url ? new URL(url).searchParams.get('select-branch') : null;
  const query = branch ? '?' + new URLSearchParams({ 'select-branch': branch }) : '';
  return {
    href: fallbackHref + query,
    title: typeof page?.title === 'string' ? page.title.trim() : '',
  };
}
