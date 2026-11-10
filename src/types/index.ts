export interface AirportReview {
  id: string;
  name: string;
  slug: string;
  tagline: string;
  rating: number; // e.g. 4.9 out of 5
  reviewCount: number;
  rankOrder: number;
  badge?: string; // e.g. "社长力荐", "2026综合榜首", "性价比王", "延迟最低"
  badgeColor?: 'brand' | 'gold' | 'emerald' | 'rose' | 'cyan' | 'purple';
  featured: boolean;
  category: 'flagship' | 'budget' | 'payasyougo' | 'gaming' | 'business';
  lineType: 'IPLC专线' | 'IEPL专线' | 'BGP多线中继' | '混合专线';
  establishedYear: number;
  
  // Pricing
  priceMonthly: number;
  priceYearly?: number;
  currency: string; // '¥'
  couponCode?: string;
  discountRate?: string; // e.g. '8折'
  trialAvailable: boolean;
  refundPolicy: string; // e.g. '24小时退款'
  
  // Speed & Test metrics
  metrics: {
    peakSpeedMbps: number; // e.g. 980
    pingMs: number; // e.g. 35
    packetLoss: string; // e.g. '0.01%'
    uptime: string; // e.g. '99.98%'
    maxStreamingQuality: '8K HDR' | '4K 60fps' | '1080P';
  };
  
  // Capabilities
  protocols: string[]; // ['Shadowsocks', 'Trojan', 'VLESS', 'Hysteria 2']
  unlocks: {
    chatgpt: boolean;
    claude: boolean;
    netflix: boolean;
    disney: boolean;
    tiktok: boolean;
    youtube: boolean;
  };
  supportedClients: string[]; // ['Clash', 'Sing-box', 'Shadowrocket', 'Surge', 'Quantumult X']
  serverLocations: string[]; // ['香港', '日本', '新加坡', '美国', '台湾', '英国']
  
  // CRO Content
  pros: string[];
  cons: string[];
  suitableFor: string[];
  affiliateUrl: string; // Internal /go/slug or external
  directAffiliateUrl: string;
  
  // SEO & AEO
  author: string;
  publishDate: string;
  updatedDate: string;
  metaTitle: string;
  metaDescription: string;
  summaryQuote: string; // Direct snippet for GEO / Answer engines
}

export interface FaqItem {
  question: string;
  answer: string;
}

export interface BreadcrumbItem {
  label: string;
  href?: string;
}

