import { getStrapiBaseUrl, requireAdminToken } from '../../../utils/strapiAdmin'

const limits = {
  image: { max: 8, mime: ['image/jpeg', 'image/png', 'image/webp', 'image/gif'] },
  video: { max: 25, mime: ['video/mp4', 'video/webm'] },
  file: { max: 10, mime: ['application/pdf', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet', 'application/vnd.openxmlformats-officedocument.presentationml.presentation'] }
}

export default defineEventHandler(async event => {
  const token = requireAdminToken(event)
  const kind = getQuery(event).kind
  const limit = kind === 'image' || kind === 'gallery' ? limits.image : kind === 'video' ? limits.video : kind === 'file' ? limits.file : null
  if (!limit) throw createError({ statusCode: 400, statusMessage: 'Unknown news media type' })
  const max = limit.max * 1024 * 1024
  const length = Number(getHeader(event, 'content-length'))
  if (!Number.isSafeInteger(length) || length <= 0 || length > max + 64 * 1024) {
    throw createError({ statusCode: 413, statusMessage: 'News media request exceeds the size limit' })
  }
  const parts = await readMultipartFormData(event)
  const file = parts?.[0]
  if (parts?.length !== 1 || !file?.filename || file.name !== 'files' || !file.type || !limit.mime.includes(file.type) || !file.data.length || file.data.length > max) {
    throw createError({ statusCode: 400, statusMessage: 'Invalid news media type or size' })
  }
  const data = file.data
  const signature = data.subarray(0, 16).toString('hex')
  const valid = ({
    'image/jpeg': () => signature.startsWith('ffd8ff'),
    'image/png': () => signature.startsWith('89504e470d0a1a0a'),
    'image/gif': () => signature.startsWith('47494638'),
    'image/webp': () => signature.startsWith('52494646') && signature.slice(16, 24) === '57454250',
    'video/mp4': () => signature.slice(8, 16) === '66747970',
    'video/webm': () => signature.startsWith('1a45dfa3'),
    'application/pdf': () => signature.startsWith('255044462d')
  } as Record<string, () => boolean>)[file.type]?.() ?? signature.startsWith('504b0304')
  if (!valid) throw createError({ statusCode: 400, statusMessage: 'Invalid news media file' })
  const extension = ({
    'image/jpeg': 'jpg', 'image/png': 'png', 'image/webp': 'webp', 'image/gif': 'gif',
    'video/mp4': 'mp4', 'video/webm': 'webm', 'application/pdf': 'pdf',
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document': 'docx',
    'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet': 'xlsx',
    'application/vnd.openxmlformats-officedocument.presentationml.presentation': 'pptx'
  } as Record<string, string>)[file.type]
  const name = file.filename.replace(/\.[^.]*$/, '').replace(/[^\p{L}\p{N}_-]/gu, '-').slice(0, 80) || 'attachment'
  const body = new FormData()
  body.append('files', new Blob([new Uint8Array(data)], { type: file.type }), name + '.' + extension)
  const result = await $fetch<{ id: number; url: string }[]>(getStrapiBaseUrl() + '/upload', {
    method: 'POST', headers: { Authorization: 'Bearer ' + token }, body
  })
  if (!result[0]) throw createError({ statusCode: 502, statusMessage: 'News media upload failed' })
  return { id: result[0].id, url: result[0].url }
})
