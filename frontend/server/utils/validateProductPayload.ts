import { createError } from 'h3'
import { safeNewsUrl } from '../../shared/newsBlocks'
import { productSectionTypes } from '../../shared/productBlocks'

// ตรวจข้อมูลสินค้าก่อนส่งให้ Strapi (ความยาวข้อความ ชนิดส่วน และลิงก์ที่ปลอดภัย)
export function validateProductPayload(payload: Record<string, unknown>) {
  const invalid = (message: string): never => {
    throw createError({ statusCode: 400, statusMessage: message })
  }
  const object = (value: unknown) =>
    value && typeof value === 'object' && !Array.isArray(value) ? value as Record<string, unknown> : invalid('Invalid product section data')
  const string = (value: unknown, max: number) =>
    value == null ? '' : typeof value === 'string' && value.length <= max ? value : invalid('Invalid product text length')
  const list = (value: unknown, max: number) =>
    value == null ? [] : Array.isArray(value) && value.length <= max ? value : invalid('Invalid product section list')
  const url = (value: unknown) => {
    const text = string(value, 2000)
    if (text && !safeNewsUrl(text)) invalid('Invalid product link: ' + text.slice(0, 60))
  }

  if (payload.slug != null && payload.slug !== '') {
    const slug = string(payload.slug, 100)
    if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(slug)) invalid('Use a URL slug such as smart-queue')
  }
  if ('seoTitle' in payload) string(payload.seoTitle, 120)
  if ('seoDescription' in payload) string(payload.seoDescription, 320)
  if (payload.blocks == null) return

  for (const raw of list(payload.blocks, 60)) {
    const section = object(raw)
    if (typeof section.type !== 'string' || !Object.hasOwn(productSectionTypes, section.type)) invalid('Unknown product section type')
    string(section.id, 80)
    const data = object(section.data)
    for (const key of ['title', 'subtitle', 'label', 'accent'] as const) string(data[key], 300)
    string(data.text, 20000)
    url(data.url)
    if (data.accent && !/^#[0-9a-f]{3,8}$/i.test(String(data.accent))) invalid('Product accent must be a hex colour')
    for (const m of list(data.media, 40)) {
      const media = object(m)
      url(media.url)
      string(media.alt, 300)
      string(media.caption, 500)
    }
    for (const b of list(data.buttons, 4)) {
      const button = object(b)
      string(button.label, 120)
      url(button.url)
    }
    for (const e of list(data.items, 60)) {
      const entry = object(e)
      for (const key of ['title', 'subtitle'] as const) string(entry[key], 300)
      string(entry.text, 5000)
      url(entry.image)
      url(entry.url)
    }
  }
}
