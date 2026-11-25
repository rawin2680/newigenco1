import { defineEventHandler, createError } from 'h3'
import { getStrapiBaseUrl, requireAdminToken } from '../../utils/strapiAdmin'

export default defineEventHandler(async (event) => {
  const token = requireAdminToken(event)
  const strapiUrl = getStrapiBaseUrl()

  try {
    const res = await $fetch<{ data: any }>(`${strapiUrl}/admin/users/me`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
    return { user: res?.data || res }
  } catch {
    throw createError({
      statusCode: 401,
      statusMessage: 'Session หมดอายุ กรุณาเข้าสู่ระบบใหม่อีกครั้ง'
    })
  }
})
