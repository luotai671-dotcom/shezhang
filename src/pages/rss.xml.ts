import rss from '@astrojs/rss';
import { getCollection } from 'astro:content';
import { SITE_CONFIG } from '../utils/seo';
import type { APIRoute } from 'astro';

export const GET: APIRoute = async (context) => {
  const airports = await getCollection('airports');
  const guides = await getCollection('guides');

  const airportItems = airports.map((airport) => ({
    title: `[评测更新] ${airport.data.name} 2026 最新测速与优惠码`,
    description: airport.data.metaDescription,
    pubDate: new Date(airport.data.updatedDate),
    link: `/airports/${airport.slug}`,
  }));

  const guideItems = guides.map((guide) => ({
    title: guide.data.title,
    description: guide.data.description,
    pubDate: new Date(guide.data.updatedDate),
    link: `/guides/${guide.slug}`,
  }));

  const allItems = [...airportItems, ...guideItems].sort(
    (a, b) => b.pubDate.getTime() - a.pubDate.getTime()
  );

  return rss({
    title: SITE_CONFIG.title,
    description: SITE_CONFIG.description,
    site: context.site || SITE_CONFIG.siteUrl,
    items: allItems,
    customData: `<language>zh-CN</language>`,
  });
};

