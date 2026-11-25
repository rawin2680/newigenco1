import { defineEventHandler, getRouterParam, readBody, createError } from 'h3'
import { assertAllowedUid, getStrapiBaseUrl, requireAdminToken } from '../../../../../utils/strapiAdmin'

export default defineEventHandler(async (event) => {
  const token = requireAdminToken(event)
  const uid = decodeURIComponent(getRouterParam(event, 'uid') || '')
  const id = getRouterParam(event, 'id')
  assertAllowedUid(uid)

  if (!id) {
    throw createError({ statusCode: 400, statusMessage: 'Missing entry ID' })
  }

  const body = await readBody<{ action?: 'publish' | 'unpublish' }>(event)
  const action = body?.action === 'unpublish' ? 'unpublish' : 'publish'
  const strapiUrl = getStrapiBaseUrl()

  try {
    return await $fetch(`${strapiUrl}/content-manager/collection-types/${uid}/${id}/actions/${action}`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`
      },
      body: {}
    })
  } catch (err: any) {
    throw createError({
      statusCode: err?.statusCode || err?.response?.status || 400,
      statusMessage: err?.data?.error?.message || `ไม่สามารถ ${action} ข้อมูลได้`
    })
  }
})
