import { createError } from 'h3'
import { blockTypes, safeNewsUrl, youtubeEmbed } from '../../shared/newsBlocks'

export function validateNewsPayload(payload: Record<string, unknown>) {
  const invalid = (message: string): never => {
    throw createError({ statusCode: 400, statusMessage: message })
  }
  const object = (value: unknown) =>
    value && typeof value === 'object' && !Array.isArray(value) ? value as Record<string, unknown> : invalid('Invalid news block data')
  const string = (value: unknown, max: number) =>
    typeof value === 'string' && value.length <= max ? value : invalid('Invalid news text length')
  const list = (value: unknown, max: number) =>
    Array.isArray(value) && value.length <= max ? value : invalid('Invalid news block list')

  if (payload.legacyId != null && (!Number.isSafeInteger(payload.legacyId) || Number(payload.legacyId) < 1)) invalid('Invalid legacy news ID')
  if (payload.slug != null) {
    const slug = string(payload.slug, 100)
    if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(slug) || /^\d+$|^doc-/.test(slug)) invalid('Use a URL slug such as company-news')
  }
  if ('seoTitle' in payload) string(payload.seoTitle, 120)
  if ('seoDescription' in payload) string(payload.seoDescription, 320)
  const detail = payload.detail
  if (detail && typeof detail === 'object' && 'extraBlocks' in detail) {
    const extra = { blocks: detail.extraBlocks }
    validateNewsPayload(extra)
    payload.detail = { ...detail, extraBlocks: extra.blocks }
  }
  if (detail && typeof detail === 'object' && 'newsEditor' in detail) {
    const { legacyId, slug, seoTitle, seoDescription, blocks } = object(detail.newsEditor)
    const editor = { legacyId, slug, seoTitle, seoDescription, blocks }
    validateNewsPayload(editor)
    if (!Array.isArray(editor.blocks)) invalid('Invalid news editor blocks')
    payload.detail = { ...object(payload.detail), newsEditor: editor }
  }
  if (payload.blocks == null) return
  if (JSON.stringify(payload.blocks).length > 500000) invalid('News content exceeds the size limit')
  const ids = new Set<string>()
  payload.blocks = list(payload.blocks, Infinity).map(entry => {
    const block = object(entry)
    const id = string(block.id, 50)
    const type = string(block.type, 20)
    if (!/^[a-z0-9-]+$/i.test(id) || ids.has(id) || !Object.hasOwn(blockTypes, type) || typeof block.visible !== 'boolean') {
      invalid('Invalid news block type or ID')
    }
    ids.add(id)
    const data = object(block.data)
    const title = string(data.title, 200)
    // Rich text is rendered as Vue text nodes and a fixed set of formatting tags.
    const text = string(data.text, 20000)
    const url = string(data.url, 2048)
    if (url && (type === 'video' ? !youtubeEmbed(url) : !safeNewsUrl(url))) invalid('Invalid news block link')
    const columns = list(data.columns, 12).map(cell => string(cell, 200))
    const rows = list(data.rows, 100).map(row => {
      const cells = list(row, columns.length)
      if (cells.length !== columns.length) invalid('News table rows must match the columns')
      return cells.map(cell => string(cell, 1000))
    })
    const media = list(data.media, type === 'gallery' ? Infinity : 1).map(entry => {
      const item = object(entry)
      const url = string(item.url, 2048)
      const legacyImage = (type === 'image' || type === 'gallery') && id.startsWith('legacy-') && /^(https?:\/\/|\/[^/])/.test(url)
      if (url && (!safeNewsUrl(url) || (!legacyImage && (!Number.isSafeInteger(item.id) || Number(item.id) <= 0)))) invalid('Invalid news media reference')
      return { id: url ? item.id : undefined, url, alt: string(item.alt, 300), caption: string(item.caption, 500) }
    })
    return { id, type, visible: block.visible, data: { title, text, url, level: data.level === 'h3' ? 'h3' : 'h2', columns, rows, media } }
  })
}
