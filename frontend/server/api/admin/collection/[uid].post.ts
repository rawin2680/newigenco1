import { defineEventHandler, getRouterParam, readBody, createError } from 'h3'
import { assertAllowedUid, getStrapiBaseUrl, requireAdminToken } from '../../../utils/strapiAdmin'

import { validateNewsPayload } from '../../../utils/validateNewsPayload'

export default defineEventHandler(async (event) => {
  const token = requireAdminToken(event)
  const uid = decodeURIComponent(getRouterParam(event, 'uid') || '')
  assertAllowedUid(uid)

  const body = await readBody<Record<string, any>>(event)
  const shouldPublish = body?._publish === true
  const payload = { ...body }
  delete payload._publish
  if (uid === 'api::news-article.news-article') validateNewsPayload(payload)

  const strapiUrl = getStrapiBaseUrl()

  try {
    const created: any = await $fetch(`${strapiUrl}/content-manager/collection-types/${uid}`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`
      },
      body: payload
    })

    const docId = created?.data?.documentId || created?.documentId
    if (shouldPublish && docId) {
      return await $fetch(`${strapiUrl}/content-manager/collection-types/${uid}/${docId}/actions/publish`, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`
        },
        body: {}
      })
    }

    return created
  } catch (err: any) {
    throw createError({
      statusCode: err?.statusCode || err?.response?.status || 400,
      statusMessage: err?.data?.error?.message || 'ไม่สามารถสร้างข้อมูลใหม่ได้'
    })
  }
})
