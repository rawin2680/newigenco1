import { safeNewsUrl, youtubeEmbed, type Media } from './newsBlocks'

// ส่วนต่าง ๆ ของหน้ารายละเอียดสินค้า (แก้ได้จากหน้าแอดมิน เรียงลำดับ/ซ่อนได้)
export const productSectionTypes = {
  hero: 'ส่วนหัวสินค้า',
  overview: 'ภาพรวมระบบ',
  modules: 'โมดูล / ระบบย่อย',
  features: 'คุณสมบัติเด่น',
  steps: 'ขั้นตอนการทำงาน',
  stats: 'ตัวเลขไฮไลต์',
  compare: 'เปรียบเทียบ 2 รูปแบบ',
  gallery: 'แกลเลอรีภาพและวิดีโอ',
  clients: 'ผลงาน / ลูกค้าที่ใช้งาน',
  downloads: 'เอกสารดาวน์โหลด',
  contact: 'ติดต่อผู้เชี่ยวชาญ'
} as const

export type ProductSectionType = keyof typeof productSectionTypes
export type ProductEntry = { title: string; subtitle: string; text: string; image: string; url: string }
export type ProductButton = { label: string; url: string }
export type ProductSection = {
  id: string
  type: ProductSectionType
  visible: boolean
  data: {
    title: string
    subtitle: string
    label: string
    text: string
    url: string
    accent: string
    media: Media[]
    buttons: ProductButton[]
    items: ProductEntry[]
  }
}

// ป้ายชื่อช่องในตัวแก้ แยกตามชนิดส่วน (ช่องที่ไม่มีในรายการจะไม่แสดง)
type FieldLabels = Partial<Record<'title' | 'subtitle' | 'label' | 'text' | 'url' | 'accent' | 'media' | 'buttons' | 'items', string>>
type EntryLabels = Partial<Record<keyof ProductEntry, string>>
export const productSectionFields: Record<ProductSectionType, { fields: FieldLabels; entry?: EntryLabels; entryName?: string; hint: string }> = {
  hero: {
    hint: 'ส่วนบนสุดของหน้า: ชื่อ สโลแกน คำอธิบาย รูปหลัก และปุ่ม (ถ้าเว้นชื่อว่างจะใช้ชื่อสินค้าจากการ์ด)',
    fields: { title: 'ชื่อที่แสดงบนหน้า', subtitle: 'สโลแกน / คำอธิบายสั้น', label: 'ชื่อภาษาอังกฤษ (ตัวเล็กใต้สโลแกน)', text: 'ย่อหน้าแนะนำ (เว้นบรรทัดว่างเพื่อขึ้นย่อหน้าใหม่)', media: 'รูปหลัก / โลโก้', buttons: 'ปุ่ม (ปุ่มแรกเป็นปุ่มหลัก)', accent: 'สีประจำสินค้า (เช่น #b91c1c)' }
  },
  overview: { hint: 'หัวข้อพร้อมย่อหน้าอธิบายระบบ และรูปประกอบ (ไม่บังคับ)', fields: { title: 'หัวข้อ', text: 'เนื้อหา (เว้นบรรทัดว่างเพื่อขึ้นย่อหน้าใหม่)', media: 'รูปประกอบ' } },
  modules: {
    hint: 'การ์ดระบบงานย่อย แสดงเป็นตาราง 2 คอลัมน์',
    fields: { title: 'หัวข้อ', text: 'คำอธิบายใต้หัวข้อ', items: 'โมดูล' },
    entry: { title: 'ชื่อโมดูล (ไทย)', subtitle: 'ชื่อภาษาอังกฤษ', text: 'คำอธิบาย', image: 'ไอคอน / รูป (ไม่บังคับ)' },
    entryName: 'โมดูล'
  },
  features: {
    hint: 'รายการจุดเด่น ใส่รายการย่อยได้ (บรรทัดละ 1 ข้อ)',
    fields: { title: 'หัวข้อ', text: 'คำอธิบายใต้หัวข้อ', items: 'คุณสมบัติ' },
    entry: { title: 'คุณสมบัติ', text: 'รายละเอียด / รายการย่อย (บรรทัดละ 1 ข้อ)' },
    entryName: 'คุณสมบัติ'
  },
  steps: {
    hint: 'ขั้นตอนการทำงานเรียงตามลำดับ แสดงเป็นลำดับเลข',
    fields: { title: 'หัวข้อ', text: 'คำอธิบายใต้หัวข้อ', items: 'ขั้นตอน' },
    entry: { title: 'ชื่อขั้นตอน', text: 'คำอธิบาย', image: 'รูปประกอบ (ไม่บังคับ)' },
    entryName: 'ขั้นตอน'
  },
  stats: {
    hint: 'ตัวเลขเด่น เช่น จำนวนลูกค้า ปีที่ให้บริการ',
    fields: { title: 'หัวข้อ (ไม่บังคับ)', items: 'ตัวเลข' },
    entry: { title: 'ตัวเลข / ค่า', subtitle: 'ชื่อสถิติ', text: 'คำอธิบายเพิ่มเติม' },
    entryName: 'ตัวเลข'
  },
  compare: {
    hint: 'เปรียบเทียบ 2 รูปแบบ เช่น แบบฟรีกับแบบเสียค่าบริการ',
    fields: { title: 'หัวข้อ', text: 'คำอธิบายใต้หัวข้อ', items: 'รูปแบบ' },
    entry: { title: 'ชื่อรูปแบบ', subtitle: 'ป้ายกำกับ', text: 'รายการ (บรรทัดละ 1 ข้อ)', image: 'รูปประกอบ (ไม่บังคับ)' },
    entryName: 'รูปแบบ'
  },
  gallery: { hint: 'รูปหน้าจอ/ภาพกิจกรรม พร้อมคำบรรยาย และวิดีโอ YouTube (ไม่บังคับ)', fields: { title: 'หัวข้อ', media: 'รูปภาพ', url: 'ลิงก์วิดีโอ YouTube (ไม่บังคับ)' } },
  clients: {
    hint: 'หน่วยงานที่ใช้งาน หรือผลงานที่ผ่านมา',
    fields: { title: 'หัวข้อ', text: 'คำอธิบายใต้หัวข้อ', items: 'ผลงาน' },
    entry: { title: 'ชื่อหน่วยงาน / ผลงาน', text: 'รายละเอียด', image: 'โลโก้ / รูป', url: 'ลิงก์ (ไม่บังคับ)' },
    entryName: 'ผลงาน'
  },
  downloads: {
    hint: 'ไฟล์โบรชัวร์ คู่มือ หรือเอกสาร PDF',
    fields: { title: 'หัวข้อ', items: 'เอกสาร' },
    entry: { title: 'ชื่อเอกสาร', text: 'คำอธิบาย', url: 'ลิงก์ไฟล์' },
    entryName: 'เอกสาร'
  },
  contact: {
    hint: 'กล่องติดต่อท้ายหน้า: หัวข้อ ผู้ติดต่อ และปุ่มโทร/อีเมล',
    fields: { title: 'หัวข้อ', text: 'ผู้ติดต่อ / ข้อความ', buttons: 'ปุ่ม (เช่น โทร 09 xxxx xxxx → tel:+669xxxxxxxx)' }
  }
}

export const blankEntry = (): ProductEntry => ({ title: '', subtitle: '', text: '', image: '', url: '' })

export const blankProductSection = (type: ProductSectionType): ProductSection => ({
  id: globalThis.crypto.randomUUID(),
  type,
  visible: true,
  data: { title: '', subtitle: '', label: '', text: '', url: '', accent: '', media: [], buttons: [], items: [] }
})

// เติมช่องที่ขาดให้ครบ (ข้อมูลเก่าหรือข้อมูลที่ย้ายมาอาจไม่มีทุกช่อง)
export function normalizeProductSections(value: unknown): ProductSection[] {
  if (!Array.isArray(value)) return []
  return value.flatMap(raw => {
    if (!raw || typeof raw !== 'object' || !Object.hasOwn(productSectionTypes, (raw as ProductSection).type)) return []
    const section = raw as Partial<ProductSection>
    const base = blankProductSection(section.type as ProductSectionType)
    const data = { ...base.data, ...(section.data || {}) }
    return [{
      id: typeof section.id === 'string' && section.id ? section.id : base.id,
      type: base.type,
      visible: section.visible !== false,
      data: {
        ...data,
        media: Array.isArray(data.media) ? data.media.map(m => ({ url: '', alt: '', caption: '', ...m })) : [],
        buttons: Array.isArray(data.buttons) ? data.buttons.map(b => ({ label: '', url: '', ...b })) : [],
        items: Array.isArray(data.items) ? data.items.map(i => ({ ...blankEntry(), ...i })) : []
      }
    }]
  })
}

export const paragraphs = (text: string) => text.split(/\n\s*\n/).map(p => p.trim()).filter(Boolean)
export const lines = (text: string) => text.split('\n').map(l => l.replace(/^\s*[-•]\s*/, '').trim()).filter(Boolean)

// ส่วนที่มีเนื้อหาจริงเท่านั้นจึงแสดงบนหน้าเว็บ
export function visibleProductSections(sections: ProductSection[], mediaUrl: (url: string) => string) {
  return sections.flatMap(section => {
    if (!section.visible) return []
    const d = section.data
    const media = d.media.filter(m => mediaUrl(m.url))
    const buttons = d.buttons.filter(b => b.label.trim() && safeNewsUrl(b.url))
    const items = d.items.filter(i => i.title.trim() || i.text.trim() || i.image.trim())
    const clean = { ...section, data: { ...d, media, buttons, items } }
    switch (section.type) {
      case 'hero': return [clean]
      case 'overview': return d.text.trim() || media.length ? [clean] : []
      case 'gallery': return media.length || youtubeEmbed(d.url) ? [clean] : []
      case 'contact': return d.title.trim() || buttons.length ? [clean] : []
      case 'downloads': return items.some(i => safeNewsUrl(i.url)) ? [clean] : []
      default: return items.length ? [clean] : []
    }
  })
}

export const hasProductDetail = (sections: unknown) =>
  normalizeProductSections(sections).some(section => section.visible && section.type !== 'hero')
    || normalizeProductSections(sections).some(section => section.visible && section.type === 'hero' && (section.data.text.trim() || section.data.subtitle.trim()))

export function productSlugFromName(name: string) {
  const ascii = name.replace(/\(.*?\)/g, ' ').normalize('NFKD').toLowerCase()
    .replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '').slice(0, 80)
  return ascii && !/^\d+$/.test(ascii) ? ascii : ''
}

export function productPath(product: { slug?: string | null; detailRoute?: string | null }) {
  const route = (product.detailRoute || '').trim()
  if (/^https?:\/\//.test(route)) return route
  if (product.slug) return '/products/' + encodeURIComponent(product.slug)
  return route.startsWith('/') ? route : ''
}
