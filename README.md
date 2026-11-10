# 机场社长 (Airport President) · 跨境网络加速与全球专线节点性能评测系统

![Astro](https://img.shields.io/badge/Astro-4.16.18-orange.svg?style=flat-square)
![TypeScript](https://img.shields.io/badge/TypeScript-5.7-blue.svg?style=flat-square)
![TailwindCSS](https://img.shields.io/badge/TailwindCSS-3.4-38bdf8.svg?style=flat-square)
![Pagefind](https://img.shields.io/badge/Pagefind-1.3.0-green.svg?style=flat-square)
![IndexNow](https://img.shields.io/badge/IndexNow-Protocol-008080.svg?style=flat-square)
![SEO/AEO](https://img.shields.io/badge/Schema.org-JSON--LD-purple.svg?style=flat-square)
![License](https://img.shields.io/badge/License-MIT-lightgrey.svg?style=flat-square)

专注于全球网络节点、IPLC/IEPL 国际物理专线与跨境网络链路加速服务的综合性能评测与数据分析平台。系统基于 **Astro 4.x 静态架构** 深度定制，针对 Google 与 Bing 搜索引擎算法执行严格的 **技术 SEO (Technical SEO)**、**GEO / AEO (生成式引擎优化)** 实体建模与用户交互体验优化。

---

## 🌟 核心架构与功能特性

### 1. 极致性能与轻量技术栈
- **Astro 4.x Static Build**：零多余 JavaScript 运行时开销，HTML 纯静态输出，Core Web Vitals 指标表现优异。
- **Pagefind WASM 纯静态搜索**：无需依赖外部第三方服务，本地离线生成倒排索引与 WebAssembly 引擎，支持 `⌘K / Ctrl+K` 毫秒级快捷呼出。
- **排版与现代视觉设计规范**：参考现代化开发文档极简科技风格：
  - 背景配色：`#ffffff`（主底色）/ `#f8fafc`（辅底色）/ `#e2e8f0`（精致边框）
  - 核心色彩：`#2563eb`（科技蓝）/ `#0f172a`（大标题深黑）/ `#334155`（正文灰）
  - 响应式排版：桌面端 `17px`、移动端 `16px`、行高 `1.85`；网络测速延迟、带宽与流量数据使用等宽字体（`font-mono`）展示。

### 2. 扁平化内容筒仓（Content Silo）
整站结构严格遵循搜索引擎爬取与权重传导模型，主导航与内部链接形成规范的内容矩阵：
1. **首页 (`/`)**：首屏 Hero + 快速选型计算器 + 推荐榜单 + 核心板块引导卡片
2. **🏆 推荐索引 (`/recommend/`)**：年度网络服务总榜、流媒体与大模型 API 访问专线、外贸与企业级独享链路选型
3. **💰 成本优化专题 (`/cheap/`)**：独立一级栏目，针对预算敏感型用户提供按量计费、轻量订阅的套餐测算对比
4. **📊 性能实测 (`/reviews/`)**：独立一级栏目，涵盖网络服务商晚高峰延迟、丢包率实测数据与单品深度横评
5. **全部专题 ▾ (Mega Dropdown)**：
   - **预算与资费**：套餐对比 (`/plans/`)、优惠资讯 (`/coupons/`)
   - **场景与生态**：AI 专用网络服务 (`/ai/`)、流媒体适配专题 (`/streaming/`)
   - **配置与排障**：客户端配置指南 (`/clients/`)、网络排障手册 (`/troubleshooting/`)
   - **资料与词库**：专线网络技术百科 (`/wiki/`)、服务提供商名录索引 (`/airports/`)

### 3. GEO / AEO 实体建模与 Schema.org 结构化数据
- **AI 引擎标准化知识库 (`/llms.txt`)**：为现代化生成式 AI 搜索引擎量身定制结构化语料与推荐参数，使站点内容便于被权威引擎引用。
- **全站 JSON-LD 注入**：
  - `Product` & `Review` & `AggregateRating` & `Offer`：单品评测页面规范呈现评分与价格元数据。
  - `ItemList`：排行榜与专题列表，直接契合搜索列表富媒体展现。
  - `FAQPage`：高频问答富文本，提升搜索结果信息密度。
  - `TechArticle` / `BreadcrumbList` / `WebSite` / `Organization`：完整站点与作者 E-E-A-T 实体认证。

### 4. 外链隔离与合规跳转架构 (302 Cloaking)
- **合规外链跳转路由 (`/go/[slug]`)**：
  - 安全落地页承接：配置独立的 `/go.html` 与 `/go/[slug]` 承接页，头部严格注入：
    `<meta name="robots" content="noindex, nofollow, noarchive, nosnippet">`
  - 外部链接标签合规：全站所有外跳链接均强制附加 `rel="nofollow sponsored noopener noreferrer"` 属性，严格符合搜索引擎对外链接的合规指引。
  - 服务端 302 重定向：内置 `_redirects`（Cloudflare Pages / Netlify）与 `nginx-redirects.conf`（Nginx / VPS），结合 HTTP 响应标头 `X-Robots-Tag: noindex, nofollow, noarchive, nosnippet` 隔离权重传递。
  - 爬虫索引合规：全站 `robots.txt` 保持全面开放（`Allow: /`），同时在 `sitemap.xml` 中严格过滤所有 `/go` 路径，避免搜索引擎抓取工具出现索引误报。

### 5. IndexNow 实时推送协议集成
- **即时索引支持**：集成 Bing、Yandex 联合推出的 IndexNow 协议规范。
- **自动化提交脚本**：配置 [`scripts/indexnow.cjs`](file:///c:/Users/ASUS/Desktop/11.11博客%20机场社长/scripts/indexnow.cjs)，打包构建后自动解析 `sitemap.xml`，通过 API 批量向 IndexNow 端点申报站点全量 URL 更新。

---

## 📁 项目目录结构

```text
├── public/
│   ├── .htaccess                   # Apache 规则 (Gzip, 缓存策略, 302 重写, 安全头)
│   ├── _headers                    # Cloudflare Pages 标头规则 (静态资产缓存与安全头)
│   ├── _redirects                  # Cloudflare Pages / Netlify 302 规则
│   ├── nginx-redirects.conf        # Nginx 302 规则配置模板
│   ├── go.html                     # 安全跳转承接页 (注入 noindex/nofollow)
│   ├── 043d7afeca775d14886bd94042d652b7.txt # IndexNow 协议验证密钥
│   ├── favicon.svg                 # 矢量图标
│   └── logo.png
├── scripts/
│   ├── indexnow.cjs                # IndexNow 协议自动推送脚本
│   ├── patch_sitemap.cjs           # @astrojs/sitemap 路由兼容补丁
│   ├── fix_aff_links.cjs           # 外链 rel 属性批量安全合规脚本
│   └── scan_aff.cjs                # 外链与跳转合规检测工具
├── src/
│   ├── components/                 # 页面通用组件
│   │   ├── AirportCard.astro       # 评测展示卡片
│   │   ├── AirportQuiz.astro       # 智能网络选型向导
│   │   ├── AnnouncementBar.astro   # 顶部通告栏
│   │   ├── Breadcrumbs.astro       # 面包屑导航 (集成 BreadcrumbList Schema)
│   │   ├── FaqSection.astro        # FAQ 折叠问答模块 (集成 FAQPage Schema)
│   │   ├── FilterBar.astro         # 多维筛选与排序工具
│   │   ├── FloatingCtaBar.astro    # 页面悬浮交互栏
│   │   ├── Footer.astro            # 站点页脚与版权说明
│   │   ├── Header.astro            # 全局导航栏与快捷搜索唤起
│   │   ├── HeroSection.astro       # 首屏视觉与特性指引
│   │   ├── LiveSpeedWidget.astro   # 节点延迟与测速探针表
│   │   ├── QuickCalculator.astro   # 流量与带宽预算计算器
│   │   ├── SearchModal.astro       # Pagefind WASM 搜索模态框
│   │   ├── SiloHubCards.astro      # 内容筒仓导航卡片
│   │   └── Top3Podium.astro        # 综合推荐领奖台
│   ├── content/                    # 内容集合 (Markdown / MDX)
│   │   ├── airports/               # 服务商评测与链路参数文档
│   │   ├── guides/                 # 网络配置、客户端教程与科普指南
│   │   └── config.ts               # 内容模型定义 (Zod 强校验)
│   ├── layouts/
│   │   └── BaseLayout.astro        # 页面基础骨架、SEO 元信息注入
│   ├── pages/
│   │   ├── ai/                     # AI 专线专题 (/ai/)
│   │   ├── airports/               # 服务商名录与单品详情路由
│   │   ├── cheap/                  # 性价比套餐专题 (/cheap/)
│   │   ├── clients/                # 常用客户端配置指南 (/clients/)
│   │   ├── compare.astro           # 链路多选对比工具 (/compare/)
│   │   ├── coupons/                # 套餐优惠专区 (/coupons/)
│   │   ├── go/                     # 安全 302 跳转路由 ([slug].astro)
│   │   ├── guides/                 # 深度技术文章路由 ([...slug].astro)
│   │   ├── index.astro             # 站点首页
│   │   ├── llms.txt.ts             # GEO/AEO 知识库生成端点
│   │   ├── plans/                  # 资费对比矩阵 (/plans/)
│   │   ├── rankings/               # 综合排行榜单 (/rankings/)
│   │   ├── recommend/              # 权威选型推荐 (/recommend/)
│   │   ├── reviews/                # 实验室测速与评测专栏 (/reviews/)
│   │   ├── robots.txt.ts           # 搜索引擎爬虫协议动态生成
│   │   ├── rss.xml.ts              # RSS 2.0 聚合订阅源
│   │   ├── streaming/              # 流媒体网络优化专栏 (/streaming/)
│   │   ├── troubleshooting/        # 网络排障指南 (/troubleshooting/)
│   │   └── wiki/                   # 网络技术与专线百科 (/wiki/)
│   ├── styles/
│   │   └── global.css              # 全局排版样式与 Tailwind 扩展
│   └── utils/
│       ├── affiliate.ts            # 外链安全重定向配置
│       └── seo.ts                  # Schema.org JSON-LD 结构化数据
├── .github/workflows/
│   └── deploy.yml                  # GitHub Actions 持续集成与 IndexNow 自动化流水线
├── astro.config.mjs                # Astro 工程配置 (Sitemap, MDX, Tailwind, Prefetch)
├── tailwind.config.mjs             # Tailwind 样式设计规范
└── package.json
```

---

## 🚀 本地开发与构建指令

```bash
# 1. 安装项目依赖 (自动触发 postinstall 执行依赖兼容性补丁)
npm install

# 2. 启动本地开发调试服务器 (默认地址 http://localhost:4321)
npm run dev

# 3. 生产环境全量构建 (编译 Astro 页面 + 生成 Pagefind 检索库 + 同步根目录索引)
npm run build

# 4. 本地预览生产构建产物
npm run preview

# 5. 手动向 IndexNow 提交 sitemap 更新
npm run indexnow
```

---

## 🌐 生产部署与持续集成

### 方案 A：GitHub Actions 持续集成（已内置）
项目已在 `.github/workflows/deploy.yml` 配置全自动化 CI 流程：
1. 每次向 `main` 分支提交代码均会自动执行 `npm ci`、依赖安全修补、Astro 静态页面全量生成。
2. 构建成功后自动调用 Pagefind 生成全文检索库，并自动触发 IndexNow API 向搜索引擎推送最新站点地图。

### 方案 B：Cloudflare Pages 静态托管
1. 关联 GitHub 代码仓库，选择构建预设 **Framework preset: Astro**。
2. 配置参数：
   - **Build command**: `npm run build`
   - **Build output directory**: `dist`
   - **Node.js Version**: 设置环境变量 `NODE_VERSION = 22`。
3. 仓库内已内置 `public/_headers` 与 `public/_redirects`，Cloudflare 会自动应用静态资产长效缓存与 302 跳转规则。

### 方案 C：Nginx / VPS 独立服务器
1. 执行 `npm run build` 生成 `dist/` 静态产物。
2. 将构建产物部署至 Nginx 站点根目录。
3. 引入项目提供的 `public/nginx-redirects.conf` 配置 302 外链隔离跳转及安全响应头。

---

## 📜 许可与免责声明

本项目遵循 [MIT License](LICENSE) 开源协议。文档与数据仅供计算机网络技术研究、拓扑性能调优与学术交流使用，请在当地法律法规允许的范围内合规使用网络资源。
