import { defineEventHandler, getRouterParam, readBody, createError } from 'h3'
import { assertAllowedUid, getStrapiBaseUrl, requireAdminToken } from '../../../../utils/strapiAdmin'

import { validateNewsPayload } from '../../../../utils/validateNewsPayload'
import { validateProductPayload } from '../../../../utils/validateProductPayload'

export default defineEventHandler(async (event) => {
  const token = requireAdminToken(event)
  const uid = decodeURIComponent(getRouterParam(event, 'uid') || '')
  const id = getRouterParam(event, 'id')
  assertAllowedUid(uid)

  if (!id) {
    throw createError({ statusCode: 400, statusMessage: 'Missing entry ID' })
  }

  const body = await readBody<Record<string, any>>(event)
  const shouldPublish = body?._publish === true
  const payload = { ...body }
  delete payload._publish
  if (uid === 'api::news-article.news-article') validateNewsPayload(payload)
  if (uid === 'api::product.product') validateProductPayload(payload)

  const strapiUrl = getStrapiBaseUrl()

  try {
    const updated: any = await $fetch(`${strapiUrl}/content-manager/collection-types/${uid}/${id}`, {
      method: 'PUT',
      headers: {
        Authorization: `Bearer ${token}`
      },
      body: payload
    })

    if (shouldPublish) {
      return await $fetch(`${strapiUrl}/content-manager/collection-types/${uid}/${id}/actions/publish`, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`
        },
        body: {}
      })
    }

    return updated
  } catch (err: any) {
    throw createError({
      statusCode: err?.statusCode || err?.response?.status || 400,
      statusMessage: err?.data?.error?.message || 'ไม่สามารถอัปเดตข้อมูลได้'
    })
  }
})
