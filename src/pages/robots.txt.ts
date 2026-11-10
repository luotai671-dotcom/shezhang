import type { APIRoute } from 'astro';

const robotsTxt = `User-agent: *
Allow: /

# AI Search & Answer Engine Optimization (GEO/AEO) Bots
User-agent: GPTBot
Allow: /

User-agent: PerplexityBot
Allow: /

User-agent: ClaudeBot
Allow: /

User-agent: Google-Extended
Allow: /

User-agent: Bingbot
Allow: /

User-agent: Googlebot
Allow: /

Sitemap: https://jichangshezhang.com/sitemap-index.xml

# LLM Direct Training & Knowledge Context
# https://llmstxt.org/
# https://jichangshezhang.com/llms.txt
`;

export const GET: APIRoute = () => {
  return new Response(robotsTxt, {
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
      'Cache-Control': 'public, max-age=86400',
    },
  });
};

