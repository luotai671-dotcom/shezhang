export const SITE_CONFIG = {
  name: '机场社长',
  title: '机场社长 | 2026 高速高可用翻墙机场评测实验室与 IPLC 专线推荐',
  description: '机场社长（jichangshezhang.com）专注于 2026 高可用科学上网节点与 IPLC/IEPL 国际专线评测。提供晚高峰千兆 8K 测速、ChatGPT与Netflix解锁检测、独家大额优惠券与一键订阅教程，助你告别断流与跑路。',
  siteUrl: 'https://jichangshezhang.com',
  author: '机场社长',
  authorBio: '10 年资深网络安全与跨境加速架构师，专注全球骨干网流量调度、IPLC专线性能实测与生成式AI防风控方案。',
  twitterHandle: '@jichangshezhang',
  defaultOgImage: 'https://jichangshezhang.com/og-banner.png',
  locale: 'zh-CN',
};

export function generateWebsiteSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: SITE_CONFIG.name,
    url: SITE_CONFIG.siteUrl,
    description: SITE_CONFIG.description,
    inLanguage: 'zh-CN',
    publisher: {
      '@type': 'Organization',
      name: SITE_CONFIG.name,
      url: SITE_CONFIG.siteUrl,
      logo: {
        '@type': 'ImageObject',
        url: `${SITE_CONFIG.siteUrl}/logo.png`,
      },
    },
    potentialAction: {
      '@type': 'SearchAction',
      target: `${SITE_CONFIG.siteUrl}/?search={search_term_string}`,
      'query-input': 'required name=search_term_string',
    },
  };
}

export function generateOrganizationSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: SITE_CONFIG.name,
    alternateName: '机场社长实验室',
    url: SITE_CONFIG.siteUrl,
    logo: `${SITE_CONFIG.siteUrl}/logo.png`,
    description: SITE_CONFIG.description,
    sameAs: [
      'https://twitter.com/jichangshezhang',
      'https://t.me/shandianjiaoliu',
      'https://github.com/jichangshezhang',
    ],
    founder: {
      '@type': 'Person',
      name: SITE_CONFIG.author,
      description: SITE_CONFIG.authorBio,
    },
  };
}

export function generateAirportProductSchema(airport: {
  name: string;
  tagline: string;
  rating: number;
  reviewCount: number;
  priceMonthly: number;
  currency: string;
  slug: string;
  updatedDate: string;
  summaryQuote: string;
  pros: string[];
  cons: string[];
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: airport.name,
    image: `${SITE_CONFIG.siteUrl}/images/airports/${airport.slug}.png`,
    description: airport.tagline,
    brand: {
      '@type': 'Brand',
      name: airport.name,
    },
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: airport.rating.toString(),
      bestRating: '5',
      worstRating: '1',
      ratingCount: airport.reviewCount.toString(),
    },
    offers: {
      '@type': 'Offer',
      price: airport.priceMonthly.toFixed(2),
      priceCurrency: airport.currency === '¥' ? 'CNY' : 'USD',
      availability: 'https://schema.org/InStock',
      url: `${SITE_CONFIG.siteUrl}/airports/${airport.slug}`,
      priceValidUntil: '2026-12-31',
    },
    review: {
      '@type': 'Review',
      reviewRating: {
        '@type': 'Rating',
        ratingValue: airport.rating.toString(),
        bestRating: '5',
      },
      author: {
        '@type': 'Person',
        name: SITE_CONFIG.author,
        url: SITE_CONFIG.siteUrl,
      },
      datePublished: airport.updatedDate,
      reviewBody: airport.summaryQuote,
      positiveNotes: {
        '@type': 'ItemList',
        itemListElement: airport.pros.map((pro, index) => ({
          '@type': 'ListItem',
          position: index + 1,
          name: pro,
        })),
      },
      negativeNotes: {
        '@type': 'ItemList',
        itemListElement: airport.cons.map((con, index) => ({
          '@type': 'ListItem',
          position: index + 1,
          name: con,
        })),
      },
    },
  };
}

export function generateItemListSchema(airports: Array<{
  name: string;
  slug: string;
  rankOrder: number;
  tagline: string;
  rating: number;
}>) {
  return {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: '2026 年度最佳机场推荐与排名排行榜',
    description: '由机场社长实测评选出的 2026 年度高可用、纯内网 IPLC 专线梯子与跨境网络加速服务排行榜。',
    numberOfItems: airports.length,
    itemListElement: airports.map((airport, index) => ({
      '@type': 'ListItem',
      position: airport.rankOrder || index + 1,
      name: airport.name,
      url: `${SITE_CONFIG.siteUrl}/airports/${airport.slug}`,
      description: airport.tagline,
    })),
  };
}

export function generateFaqSchema(faqs: Array<{ question: string; answer: string }>) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  };
}

export function generateArticleSchema(article: {
  title: string;
  description: string;
  publishDate: string;
  updatedDate: string;
  author: string;
  url: string;
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'TechArticle',
    headline: article.title,
    description: article.description,
    datePublished: article.publishDate,
    dateModified: article.updatedDate,
    author: {
      '@type': 'Person',
      name: article.author || SITE_CONFIG.author,
      url: SITE_CONFIG.siteUrl,
    },
    publisher: {
      '@type': 'Organization',
      name: SITE_CONFIG.name,
      logo: {
        '@type': 'ImageObject',
        url: `${SITE_CONFIG.siteUrl}/logo.png`,
      },
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': article.url,
    },
  };
}

export function generateBreadcrumbSchema(items: Array<{ label: string; href?: string }>) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.label,
      item: item.href ? (item.href.startsWith('http') ? item.href : `${SITE_CONFIG.siteUrl}${item.href}`) : undefined,
    })),
  };
}

