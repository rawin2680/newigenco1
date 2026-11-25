import { defineEventHandler, getRouterParam, createError } from 'h3'
import { assertAllowedUid, getStrapiBaseUrl, requireAdminToken } from '../../../../utils/strapiAdmin'

export default defineEventHandler(async (event) => {
  const token = requireAdminToken(event)
  const uid = decodeURIComponent(getRouterParam(event, 'uid') || '')
  const id = getRouterParam(event, 'id')
  assertAllowedUid(uid)

  if (!id) {
    throw createError({ statusCode: 400, statusMessage: 'Missing entry ID' })
  }

  const strapiUrl = getStrapiBaseUrl()

  try {
    return await $fetch(`${strapiUrl}/content-manager/collection-types/${uid}/${id}`, {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
  } catch (err: any) {
    throw createError({
      statusCode: err?.statusCode || err?.response?.status || 400,
      statusMessage: err?.data?.error?.message || 'ไม่สามารถลบข้อมูลได้'
    })
  }
})
