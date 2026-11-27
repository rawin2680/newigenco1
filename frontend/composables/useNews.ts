import type { NewsBlock } from '~/shared/newsBlocks'

export interface FlowchartStep {
  id: string
  code: string
  title: string
  description: string
  inputs: string[]
  outputs: string[]
}

export interface NewsFlowchart {
  id: string
  figureNumber: string
  title: string
  englishTitle: string
  description: string
  image?: string
  steps: FlowchartStep[]
}

export interface NewsServicePill {
  code: string
  title: string
  thaiTitle: string
  desc: string
}

export interface NewsPartnership {
  name: string
  role: string
  desc: string
}

export interface NewsMilestone {
  label: string
  value: string
  sub?: string
}

export interface NewsSectionTitles {
  lead?: string
  extra?: string
  history?: string
  services?: string
  servicesSubtitle?: string
  philosophy?: string
  partnerships?: string
  partnershipsSubtitle?: string
}

export interface NewsAuthor {
  name: string
  role: string
  avatar: string
  bio?: string
}

export interface NewsSidebarCta {
  title?: string
  text?: string
  buttonLabel?: string
  buttonLink?: string
}

export interface NewsItem {
  documentId?: string
  slug?: string
  seoTitle?: string
  seoDescription?: string
  blocks?: NewsBlock[] | null
  id: number
  title: string
  subtitle?: string
  date: string
  publishedDateRaw?: string
  category: string
  readTime: string
  summary: string
  fullContent: string[]
  aiSummary: string[]
  image: string
  extraBlocks?: NewsBlock[]
  coverGallery?: string[]
  gallery?: { url: string; caption?: string }[]
  isFeatured?: boolean
  author?: NewsAuthor
  rating: {
    score: number
    count: number
  }
  likes: number
  certifier?: {
    organization: string
    certificateDate: string
    standard: string
    scope: string
    logoText: string
    logoImage?: string
    standardLabel?: string // บรรทัดมาตรฐานใต้ตราสัญลักษณ์ เช่น ISO/IEC 29110:2011
    heading?: string // หัวข้อการ์ดการรับรอง
    description?: string // ข้อความต่อจากชื่อสถาบัน
    processes?: string[] // รายการกระบวนการที่ได้รับการรับรอง
    scopeLabel?: string // ข้อความต่อจากวันรับรอง
    photoCaption?: string // คำบรรยายภาพพิธีมอบ
  }
  sidebarCta?: NewsSidebarCta
  flowcharts?: NewsFlowchart[]
  milestones?: NewsMilestone[]
  services?: NewsServicePill[]
  partnerships?: NewsPartnership[]
  sectionTitles?: NewsSectionTitles
}

export const useNews = () => {
  const newsList: NewsItem[] = []

  const getNewsById = (id: number | string): NewsItem | undefined => {
    return newsList.find(n => n.id === Number(id))
  }

  return {
    newsList,
    getNewsById
  }
}

// -------------------------------------------------------------
// รวมข่าวจาก Strapi เข้ากับข่าวที่เขียนไว้ในโค้ด (ใช้ร่วมกันทั้งหน้ารายการข่าวและหน้ารายละเอียด)
// - ฟิลด์ตัวอย่าง (หัวข้อ หมวด วันที่ เวลาอ่าน คำโปรย รูปปก) มาจาก Strapi เสมอ
// - ฟิลด์หน้ารายละเอียดมาจาก `detail` ใน Strapi (แก้ได้จากหน้าแอดมิน) ทีละฟิลด์
//   ฟิลด์ที่ว่างใน `detail` จะใช้ค่าจากข่าวในโค้ดแทน (ถ้ามี) ถ้าไม่มีเลยบล็อกนั้นจะถูกซ่อน
// -------------------------------------------------------------

// ฟิลด์หน้ารายละเอียดที่เก็บใน Strapi `detail` (รูปแบบเดียวกับ NewsItem ยกเว้นฟิลด์ตัวอย่าง)
export type NewsDetail = Partial<Pick<NewsItem,
  'subtitle' | 'extraBlocks' | 'coverGallery' | 'gallery' | 'aiSummary' | 'fullContent' | 'sectionTitles' | 'milestones' | 'services' |
  'partnerships' | 'flowcharts' | 'certifier' | 'author' | 'rating' | 'likes' | 'sidebarCta'
>> & { managedContent?: boolean }

export interface StrapiNewsLike {
  legacyId?: number
  slug?: string
  seoTitle?: string
  seoDescription?: string
  blocks?: NewsBlock[] | null
  documentId?: string
  id?: number
  title: string
  category?: string
  date?: string
  readTime?: string
  excerpt?: string
  content?: string
  image?: string
  detail?: NewsDetail | Record<string, any> | null
}

export const matchesStaticNews = (staticItem: NewsItem, strapiItem: StrapiNewsLike) => {
  if (strapiItem.legacyId != null) return staticItem.id === strapiItem.legacyId
  const original = staticItem.title.trim()
  const title = (strapiItem.title || '').trim()
  return title === original || (title.startsWith(original + ' ') && staticItem.date.trim() === strapiItem.date?.trim())
}

const hasValue = (value: unknown): boolean => {
  if (value === null || value === undefined) return false
  if (typeof value === 'string') return value.trim() !== ''
  if (Array.isArray(value)) return value.length > 0
  if (typeof value === 'object') return Object.values(value as object).some(hasValue)
  return true
}

// รวมอ็อบเจกต์ทีละฟิลด์: ใช้ค่าจาก Strapi ถ้ามี ไม่งั้นใช้ค่าจากโค้ด
const mergeFields = <T extends object>(fromStrapi?: Partial<T> | null, fromStatic?: T): T | undefined => {
  if (!hasValue(fromStrapi)) return fromStatic
  const merged: Record<string, unknown> = { ...(fromStatic || {}) }
  for (const [key, value] of Object.entries(fromStrapi || {})) {
    if (hasValue(value)) merged[key] = value
  }
  return merged as T
}

// รูปที่อัปโหลดผ่าน Strapi เก็บเป็น /uploads/... ต้องต่อด้วย URL ของ Strapi
export const resolveNewsImage = (url: string | undefined, strapiUrl?: string) => {
  if (!url) return ''
  return strapiUrl && url.startsWith('/uploads/') ? `${strapiUrl}${url}` : url
}

export const mergeStrapiNews = (
  strapiItem: StrapiNewsLike,
  staticItem?: NewsItem,
  fallbackId = 1000,
  strapiUrl?: string,
  fromCmsOnly = false
): NewsItem => {
  const detail = (strapiItem.detail || {}) as NewsDetail
  const fallback = detail.managedContent || fromCmsOnly ? undefined : staticItem
  const excerpt = (strapiItem.excerpt || '').trim()
  const pick = <K extends keyof NewsDetail>(key: K) => (hasValue(detail[key]) ? detail[key] : fallback?.[key as keyof NewsItem]) as NewsItem[K]

  const paragraphs = (strapiItem.content || '').split('\n').map(p => p.trim()).filter(Boolean)
  // คงตำแหน่งย่อหน้าไว้ (ย่อหน้าที่ 2 และ 3 ผูกกับหัวข้อเฉพาะในหน้ารายละเอียด) ตัดเฉพาะช่องว่างท้ายรายการ
  const detailParagraphs = (detail.fullContent || []).map(p => (p || '').trim())
  while (detailParagraphs.length && !detailParagraphs[detailParagraphs.length - 1]) detailParagraphs.pop()
  const fullContent = detail.managedContent || detailParagraphs.some(Boolean)
    ? detailParagraphs
    : fallback?.fullContent?.length ? fallback.fullContent : paragraphs

  const detailGallery = (detail.gallery || []).filter(g => g?.url)
  const gallery = detailGallery.length
    ? detailGallery.map(g => ({ ...g, url: resolveNewsImage(g.url, strapiUrl) }))
    : fallback?.gallery

  const flowcharts = hasValue(detail.flowcharts)
    ? detail.flowcharts!.map(chart => ({ ...chart, image: resolveNewsImage(chart.image, strapiUrl) || undefined }))
    : fallback?.flowcharts

  const certifier = mergeFields(detail.certifier, fallback?.certifier)
  const author = mergeFields(detail.author, fallback?.author)
  const aiSummary = (detail.aiSummary || []).filter(p => (p || '').trim())

  return {
    ...(staticItem || {}),
    documentId: strapiItem.documentId, slug: strapiItem.slug, seoTitle: strapiItem.seoTitle, seoDescription: strapiItem.seoDescription, blocks: strapiItem.blocks,
    id: staticItem ? staticItem.id : (strapiItem.id ?? fallbackId),
    title: strapiItem.title || staticItem?.title || '',
    subtitle: pick('subtitle'),
    category: strapiItem.category || fallback?.category || '',
    date: strapiItem.date || fallback?.date || '',
    readTime: strapiItem.readTime || fallback?.readTime || '',
    summary: excerpt || fallback?.summary || '',
    fullContent,
    aiSummary: aiSummary.length ? aiSummary : fallback?.aiSummary || [],
    image: strapiItem.image || fallback?.image || '',
    extraBlocks: Array.isArray(detail.extraBlocks) ? detail.extraBlocks : undefined,
    coverGallery: Array.isArray(detail.coverGallery) ? detail.coverGallery.filter(url => typeof url === 'string').map(url => resolveNewsImage(url, strapiUrl)) : fallback?.coverGallery,
    gallery,
    milestones: pick('milestones'),
    services: pick('services'),
    partnerships: pick('partnerships'),
    flowcharts,
    sectionTitles: mergeFields(detail.sectionTitles, fallback?.sectionTitles),
    certifier: certifier ? { ...certifier, logoImage: resolveNewsImage(certifier.logoImage, strapiUrl) || undefined } : undefined,
    sidebarCta: mergeFields(detail.sidebarCta, fallback?.sidebarCta),
    author: author?.name?.trim() ? { ...author, avatar: resolveNewsImage(author.avatar, strapiUrl) } : undefined,
    rating: mergeFields(detail.rating, staticItem?.rating) || { score: 5, count: 0 },
    likes: hasValue(detail.likes) ? Number(detail.likes) : (staticItem?.likes ?? 0)
  }
}

export const newsPath = (item: NewsItem) => '/news/' + encodeURIComponent(item.slug || (item.documentId ? 'doc-' + item.documentId : String(item.id)))

export function mergePublishedNews(items: StrapiNewsLike[], legacy: NewsItem[], strapiUrl?: string, fromCmsOnly = false) {
  const matched = new Set<number>()
  const mapped = items.map((item, index) => {
    const original = legacy.find(entry => !matched.has(entry.id) && matchesStaticNews(entry, item))
    if (original) matched.add(original.id)
    return mergeStrapiNews(item, original, 1000 + index, strapiUrl, fromCmsOnly)
  })
  return [...mapped, ...legacy.filter(entry => !matched.has(entry.id))]
}

export function editableNewsDetail(item: StrapiNewsLike, original?: NewsItem): NewsDetail {
  const article = mergeStrapiNews(item, original)
  return {
    ...item.detail,
    subtitle: article.subtitle,
    fullContent: article.fullContent,
    gallery: article.gallery,
    aiSummary: article.aiSummary,
    milestones: article.milestones,
    services: article.services,
    partnerships: article.partnerships,
    flowcharts: article.flowcharts,
    sectionTitles: article.sectionTitles,
    certifier: article.certifier,
    sidebarCta: article.sidebarCta,
    author: article.author,
    rating: article.rating,
    likes: article.likes
  }
}
