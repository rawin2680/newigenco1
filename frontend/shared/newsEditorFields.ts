import type { NewsBlock } from './newsBlocks'

type NewsEditorFields = {
  legacyId?: number
  slug?: string
  seoTitle?: string
  seoDescription?: string
  blocks?: NewsBlock[] | null
}

export function newsEditorFields(item: NewsEditorFields & { detail?: unknown }): NewsEditorFields {
  const detail = item.detail as { newsEditor?: NewsEditorFields } | null | undefined
  const editor = detail?.newsEditor
  return editor && Array.isArray(editor.blocks) ? {
    legacyId: editor.legacyId,
    slug: editor.slug || undefined,
    seoTitle: editor.seoTitle,
    seoDescription: editor.seoDescription,
    blocks: editor.blocks
  } : {
    legacyId: item.legacyId,
    slug: item.slug,
    seoTitle: item.seoTitle,
    seoDescription: item.seoDescription,
    blocks: item.blocks
  }
}
