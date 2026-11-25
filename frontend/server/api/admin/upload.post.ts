import { defineEventHandler, readMultipartFormData, createError } from 'h3'
import { getStrapiBaseUrl, requireAdminToken } from '../../utils/strapiAdmin'

export default defineEventHandler(async (event) => {
  const token = requireAdminToken(event)
  const parts = await readMultipartFormData(event)

  if (!parts || parts.length === 0) {
    throw createError({
      statusCode: 400,
      statusMessage: 'ไม่พบไฟล์รูปภาพที่อัปโหลด'
    })
  }

  const formData = new FormData()
  for (const part of parts) {
    if (part.name === 'files' && part.data) {
      const blob = new Blob([new Uint8Array(part.data)], { type: part.type || 'image/jpeg' })
      formData.append('files', blob, part.filename || 'upload.jpg')
    }
  }

  const strapiUrl = getStrapiBaseUrl()

  try {
    const res = await fetch(`${strapiUrl}/upload`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`
      },
      body: formData
    })

    if (!res.ok) {
      const text = await res.text()
      throw createError({
        statusCode: res.status,
        statusMessage: `Upload failed: ${text}`
      })
    }

    return await res.json()
  } catch (err: any) {
    throw createError({
      statusCode: err?.statusCode || 500,
      statusMessage: err?.statusMessage || 'ไม่สามารถอัปโหลดรูปภาพเข้าสู่ระบบได้'
    })
  }
})
