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
  projectSummary: string
  source?: string
  blueprintSpec?: string
}
