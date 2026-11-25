import { getCookie, createError, type H3Event } from 'h3'

export const ADMIN_COOKIE_NAME = 'igenco_admin_token'

export const getStrapiBaseUrl = () => {
  const config = useRuntimeConfig()
  return (config.public.strapiUrl as string) || 'http://localhost:1337'
}

export const requireAdminToken = (event: H3Event): string => {
  const token = getCookie(event, ADMIN_COOKIE_NAME)
  if (!token) {
    throw createError({
      statusCode: 401,
      statusMessage: 'Unauthorized: กรุณาเข้าสู่ระบบผู้ดูแลระบบก่อน'
    })
  }
  return token
}

export const ALLOWED_COLLECTION_UIDS = new Set([
  'api::inquiry.inquiry',
  'api::news-article.news-article',
  'api::portfolio-case.portfolio-case',
  'api::product.product'
])

export const assertAllowedUid = (uid: string) => {
  if (!ALLOWED_COLLECTION_UIDS.has(uid)) {
    throw createError({
      statusCode: 403,
      statusMessage: 'Forbidden: Collection UID not permitted'
    })
  }
}
