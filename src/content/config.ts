import { defineCollection, z } from 'astro:content';

const airportsCollection = defineCollection({
  type: 'content',
  schema: z.object({
    name: z.string(),
    tagline: z.string(),
    rating: z.number().min(1).max(5),
    reviewCount: z.number(),
    rankOrder: z.number(),
    badge: z.string().optional(),
    badgeColor: z.enum(['brand', 'gold', 'emerald', 'rose', 'cyan', 'purple']).default('brand'),
    featured: z.boolean().default(false),
    category: z.enum(['flagship', 'budget', 'payasyougo', 'gaming', 'business']).default('flagship'),
    lineType: z.string().default('IEPL专线'),
    establishedYear: z.number(),
    
    // Pricing
    priceMonthly: z.number(),
    priceYearly: z.number().optional(),
    currency: z.string().default('¥'),
    couponCode: z.string().optional(),
    discountRate: z.string().optional(),
    trialAvailable: z.boolean().default(false),
    refundPolicy: z.string().default('24小时退款'),
    
    // Performance Metrics
    metrics: z.object({
      peakSpeedMbps: z.number(),
      pingMs: z.number(),
      packetLoss: z.string(),
      uptime: z.string(),
      maxStreamingQuality: z.enum(['8K HDR', '4K 60fps', '1080P']),
      scamalyticsScore: z.number().default(0),
      ipCleanliness: z.string().default('0分 极高纯净'),
    }),
    
    // Data verification status badge
    dataVerificationStatus: z.enum(['independent_tested', 'official_claimed', 'pending_verification']).default('independent_tested'),
    
    // Technical Specs
    protocols: z.array(z.string()),
    unlocks: z.object({
      chatgpt: z.boolean(),
      claude: z.boolean(),
      netflix: z.boolean(),
      disney: z.boolean(),
      tiktok: z.boolean(),
      youtube: z.boolean(),
    }),
    supportedClients: z.array(z.string()),
    serverLocations: z.array(z.string()),
    
    // Conversion Content
    pros: z.array(z.string()),
    cons: z.array(z.string()),
    suitableFor: z.array(z.string()),
    affiliateSlug: z.string(),
    directAffiliateUrl: z.string(),
    
    // SEO & AEO
    author: z.string().default('机场社长 实验室'),
    publishDate: z.string(),
    updatedDate: z.string(),
    metaTitle: z.string(),
    metaDescription: z.string(),
    summaryQuote: z.string(),
  }),
});

const guidesCollection = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    description: z.string(),
    category: z.enum(['beginner', 'protocol', 'client', 'troubleshoot', 'ranking']),
    publishDate: z.string(),
    updatedDate: z.string(),
    author: z.string().default('机场社长'),
    readingTime: z.string().default('5 分钟'),
    featured: z.boolean().default(false),
    tags: z.array(z.string()),
  }),
});

export const collections = {
  airports: airportsCollection,
  guides: guidesCollection,
};

