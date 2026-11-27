import { defineEventHandler, readBody, createError } from 'h3'
import { getStrapiBaseUrl, requireAdminToken } from '../../utils/strapiAdmin'
import { validateContactPagePayload } from '../../utils/validateContactPagePayload'

const UID = 'api::contact-page.contact-page'

// บันทึกเนื้อหาหน้าติดต่อเรา (สร้างใหม่ถ้ายังไม่มี) หลังตรวจข้อมูลแล้ว
export default defineEventHandler(async (event) => {
  const token = requireAdminToken(event)
  const body = await readBody<Record<string, unknown>>(event)
  const payload = validateContactPagePayload(body || {})
  try {
    const res: any = await $fetch(`${getStrapiBaseUrl()}/content-manager/single-types/${UID}`, {
      method: 'PUT',
      headers: { Authorization: `Bearer ${token}` },
      body: payload
    })
    return { data: res?.data ?? res }
  } catch (err: any) {
    throw createError({
      statusCode: err?.statusCode || err?.response?.status || 400,
      statusMessage: err?.data?.error?.message || 'ไม่สามารถบันทึกหน้าติดต่อเราได้'
    })
  }
})
