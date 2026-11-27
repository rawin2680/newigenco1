import type { NewsItem } from './useNews'
import type { NewsBlock } from '~/shared/newsBlocks'

export function articleBlocks(article: NewsItem): NewsBlock[] {
  if (Array.isArray(article.blocks)) return article.blocks

  const blocks: NewsBlock[] = []
  const add = (type: NewsBlock['type'], data: Partial<NewsBlock['data']>) => {
    blocks.push({
      id: 'legacy-' + blocks.length, visible: true, type,
      data: { title: '', text: '', level: 'h2', url: '', media: [], columns: [], rows: [], ...data }
    })
  }

  const titles = [article.sectionTitles?.lead, article.sectionTitles?.history, article.sectionTitles?.philosophy, article.sectionTitles?.extra]
  article.fullContent.forEach((text, index) => {
    if (!text.trim()) return
    const title = titles[index]
    if (title?.trim()) add('heading', { title })
    add('paragraph', { text })
  })
  if (article.gallery?.length) {
    add('gallery', { media: article.gallery.map(image => ({ url: image.url, alt: image.caption || '', caption: image.caption || '' })) })
  }
  return [...blocks, ...(article.extraBlocks || [])]
}
