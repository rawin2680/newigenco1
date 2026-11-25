import { defineEventHandler, getRouterParam, getQuery, createError } from 'h3'
import { assertAllowedUid, getStrapiBaseUrl, requireAdminToken } from '../../../utils/strapiAdmin'

export default defineEventHandler(async (event) => {
  const token = requireAdminToken(event)
  const uid = decodeURIComponent(getRouterParam(event, 'uid') || '')
  assertAllowedUid(uid)

  const query = getQuery(event)
  const page = query.page || 1
  const pageSize = query.pageSize || 50
  const sort = query.sort || 'id:desc'
  const strapiUrl = getStrapiBaseUrl()

  try {
    return await $fetch(`${strapiUrl}/content-manager/collection-types/${uid}`, {
      headers: {
        Authorization: `Bearer ${token}`
      },
      query: {
        page,
        pageSize,
        sort,
        populate: '*'
      }
    })
  } catch (err: any) {
    throw createError({
      statusCode: err?.statusCode || err?.response?.status || 500,
      statusMessage: err?.data?.error?.message || 'ไม่สามารถดึงข้อมูลจาก Strapi ได้'
    })
  }
})
