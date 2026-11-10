export interface AffiliateLinkConfig {
  slug: string;
  name: string;
  targetUrl: string;
  couponCode?: string;
  discount?: string;
}

export const AFFILIATE_LINKS: Record<string, AffiliateLinkConfig> = {
  shandianshu: {
    slug: 'shandianshu',
    name: '闪电鼠',
    targetUrl: 'https://chenpin.shandianshuaff.com/#/?code=m28TvPVX',
    couponCode: 'sd88',
    discount: '88折',
  },
  dalaoyun: {
    slug: 'dalaoyun',
    name: '大佬云',
    targetUrl: 'https://chenpin01.dalaoyunaff.com/#/?code=GQ6CL6Km',
    couponCode: 'dly88',
    discount: '88折',
  },
  liulianyun: {
    slug: 'liulianyun',
    name: '榴莲云',
    targetUrl: 'https://chenpingan.liulianyunaff.com/#/?code=7pdjs9zt',
    couponCode: 'll88',
    discount: '88折',
  },
  shenxing: {
    slug: 'shenxing',
    name: '神行加速',
    targetUrl: 'https://chenpingan01.shenxingaff.com/#/?code=RZ48f9wP',
    couponCode: 'sx0077',
    discount: '8折',
  },
  yunjiexian: {
    slug: 'yunjiexian',
    name: '云界线',
    targetUrl: 'https://chenpinga.yunjiexianaff.com/#/?code=rTCMGvQT',
    couponCode: 'yjx888',
    discount: '85折',
  },
  huanqiuti: {
    slug: 'huanqiuti',
    name: '环球梯',
    targetUrl: 'https://chenpingan01.huanqiutiaff.com/#/?code=FGCcYdFo',
    couponCode: 'hq66',
    discount: '85折',
  },
  jilianyun: {
    slug: 'jilianyun',
    name: '极连云',
    targetUrl: 'https://haozevpn.jlyvipaff.com/#/?code=6h2TMD5b',
    couponCode: 'jly888',
    discount: '85折',
  },
  guangshuyun: {
    slug: 'guangshuyun',
    name: '光速云',
    targetUrl: 'https://hu8jnfv.gsyvipaff.com/#/?code=vELLETdq',
    couponCode: '',
    discount: '官方直降',
  },
  guangnianti: {
    slug: 'guangnianti',
    name: '光年梯',
    targetUrl: 'https://gnt001.gntvipaff.cc/#/?code=rN3ybxa7',
    couponCode: '',
    discount: '起步7元',
  },
  edgenova: {
    slug: 'edgenova',
    name: '边缘节点',
    targetUrl: 'https://wep.edgenovaaff.com/#/?code=papME7sh',
    couponCode: 'xk808',
    discount: '8折',
  },
  sujie: {
    slug: 'sujie',
    name: '速界',
    targetUrl: 'https://pygllc.speedworldaff.cc/#/?code=ll8LjYBJ',
    couponCode: 'sujie80',
    discount: '8折',
  },
};

export function getAffiliateRedirect(slug: string, _utmMedium: string = 'direct'): string {
  const config = AFFILIATE_LINKS[slug];
  if (!config) {
    return 'https://jichangshezhang.com';
  }
  // 保留精确的原始推广邀请链接与 hash 路由参数，杜绝佣金参数丢失
  return config.targetUrl;
}
