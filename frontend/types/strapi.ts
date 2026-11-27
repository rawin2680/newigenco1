// =========================================================================
// TypeScript Interfaces for Strapi Headless CMS API (TypeScript First)
// =========================================================================

export interface StrapiMeta {
  pagination?: {
    page: number
    pageSize: number
    pageCount: number
    total: number
  }
}

export interface StrapiResponse<T> {
  data: T
  meta?: StrapiMeta
}

export interface StrapiItem<T> {
  id: number
  documentId?: string
  attributes?: T // Strapi v4
  // Strapi v5 directly flattens attributes or keeps them
  [key: string]: any
}

// 1. Capability / Architectural Module
export interface CapabilityModule {
  id?: number
  code: string
  title: string
  description: string
  tags: string[]
  archLayer: string
  icon: string
  isHighlighted?: boolean
}

// 2. Project / Case Study
export interface ProjectCase {
  id?: number
  caseNumber: string
  sector: string
  title: string
  description: string
  metric: string
  metricLabel: string
  year: string
  isCta?: boolean
}

// 3. AI Synthesizer Sector Blueprint
export interface SectorBlueprint {
  key: string
  title: string
  description: string
  baseRoi: number
  baseCost: number
}

// 4. Contact / Lead Inquiry Payload
export interface ContactInquiry {
  name: string
  email: string
  phone?: string
  projectSummary: string
  blueprintSpec?: string
}

// 5. News Article from Strapi
export interface StrapiNewsItem {
  id: number
  documentId?: string
  title: string
  category: string
  date: string
  readTime: string
  excerpt: string
  content?: string
  image: string
  // เนื้อหาหน้ารายละเอียดข่าวทั้งหมด (แก้ได้จากหน้าแอดมิน) รูปแบบเดียวกับ NewsDetail ใน composables/useNews.ts
  detail?: Record<string, any> | null
}

// 6. iGenQ Portfolio Case from Strapi
export interface StrapiPortfolioItem {
  id: number
  documentId?: string
  clientName: string
  title: string
  category: string
  location: string
  servicePoints: string
  queueMode: string
  highlight: string
  description: string
  results: string[]
  tags: string[]
  image: string
}

// 7. Product from Strapi
export interface StrapiProductItem {
  id: number
  documentId?: string
  name: string
  slug: string
  category: string
  badge: string
  shortDesc: string
  fullDetails?: string
  features: string[]
  image: string
  detailRoute?: string
}
