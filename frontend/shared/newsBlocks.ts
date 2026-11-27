export const blockTypes = {
  heading: 'หัวข้อ', paragraph: 'ข้อความ', image: 'รูปภาพ', gallery: 'แกลเลอรี',
  video: 'วิดีโอ / YouTube', table: 'ตาราง', file: 'PDF / ไฟล์',
  highlight: 'ข้อความเน้น', link: 'ปุ่ม / ลิงก์'
}

export type Media = { id?: number; url: string; alt: string; caption: string }
export type NewsBlock = {
  id: string
  type: keyof typeof blockTypes
  visible: boolean
  data: {
    title: string; text: string; level: 'h2' | 'h3'; url: string
    media: Media[]; columns: string[]; rows: string[][]
  }
}

export const blankMedia = (): Media => ({ url: '', alt: '', caption: '' })
export const blankBlock = (type: NewsBlock['type']): NewsBlock => ({
  id: globalThis.crypto.randomUUID(), type, visible: true,
  data: { title: '', text: '', level: 'h2', url: '', media: [blankMedia()], columns: ['หัวคอลัมน์'], rows: [['']] }
})

export function safeNewsUrl(value: unknown): string {
  if (typeof value !== 'string') return ''
  const url = value.trim()
  if (/[\x00-\x20\\]/.test(url)) return ''
  if (/^\/(?!\/)/.test(url) || url.startsWith('#') || /^tel:\+?[\d-]{6,20}$/.test(url)) return url
  try {
    const parsed = new URL(url)
    return ['https:', 'http:'].includes(parsed.protocol) && !parsed.username && !parsed.password ? parsed.href : ''
  } catch {
    return ''
  }
}

export function youtubeEmbed(value: string) {
  const url = safeNewsUrl(value)
  if (!/^https?:/.test(url)) return ''
  const parsed = new URL(url)
  const id = parsed.hostname === 'youtu.be' ? parsed.pathname.slice(1)
    : ['youtube.com', 'www.youtube.com', 'm.youtube.com'].includes(parsed.hostname)
      ? parsed.searchParams.get('v') || parsed.pathname.match(/^\/(?:embed|shorts)\/([^/]+)$/)?.[1] : ''
  return id && /^[\w-]{11}$/.test(id) ? 'https://www.youtube-nocookie.com/embed/' + id : ''
}

export function inlineNewsText(text: string) {
  return text.split(/(\*\*[^*\n]+\*\*|\*[^*\n]+\*|\[[^\]\n]+\]\([^\s)]+\))/g).map(part => {
    const link = part.match(/^\[([^\]]+)\]\(([^)]+)\)$/)
    if (link) return { tag: 'a', text: link[1], href: safeNewsUrl(link[2]) || undefined }
    if (part.startsWith('**') && part.endsWith('**') && part.length > 4) return { tag: 'strong', text: part.slice(2, -2) }
    if (part.startsWith('*') && part.endsWith('*') && part.length > 2) return { tag: 'em', text: part.slice(1, -1) }
    return { tag: 'span', text: part }
  })
}
export function selectNewsBlocks(blocks: NewsBlock[], coverUrls: string[], mediaUrl: (url: string) => string) {
  const imageUrls = new Set(coverUrls)
  return blocks.flatMap(block => {
    if (!block.visible) return []
    const { data } = block
    switch (block.type) {
      case 'heading': return data.title.trim() ? [block] : []
      case 'paragraph': return data.text.trim() ? [block] : []
      case 'highlight': return data.title.trim() || data.text.trim() ? [block] : []
      case 'link': return safeNewsUrl(data.url) && data.title.trim() ? [block] : []
      case 'table': return data.columns.length && data.rows.some(row => row.some(cell => cell.trim())) ? [block] : []
      case 'video':
        return youtubeEmbed(data.url) || (data.media[0] && mediaUrl(data.media[0].url)) ? [block] : []
      case 'file': return data.media[0] && mediaUrl(data.media[0].url) ? [block] : []
      case 'gallery':
      case 'image': {
        const media = data.media.filter(photo => {
          const url = mediaUrl(photo.url)
          if (!url || imageUrls.has(url)) return false
          imageUrls.add(url)
          return true
        })
        return media.length ? [{ ...block, type: media.length === 1 ? 'image' as const : block.type, data: { ...data, media } }] : []
      }
      default: return []
    }
  })
}
