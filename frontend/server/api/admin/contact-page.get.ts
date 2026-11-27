import { defineEventHandler, createError } from 'h3'
import { getStrapiBaseUrl, requireAdminToken } from '../../utils/strapiAdmin'

const UID = 'api::contact-page.contact-page'

// อ่านเนื้อหาหน้าติดต่อเรา (single type) ด้วยสิทธิ์แอดมิน; ยังไม่มีข้อมูล = คืน null
export default defineEventHandler(async (event) => {
  const token = requireAdminToken(event)
  try {
    const res: any = await $fetch(`${getStrapiBaseUrl()}/content-manager/single-types/${UID}`, {
      headers: { Authorization: `Bearer ${token}` }
    })
    return { data: res?.data ?? res ?? null }
  } catch (err: any) {
    const status = err?.statusCode || err?.response?.status
    if (status === 404) return { data: null }
    throw createError({
      statusCode: status || 500,
      statusMessage: err?.data?.error?.message || 'ไม่สามารถดึงข้อมูลหน้าติดต่อเราจาก Strapi ได้'
    })
  }
})
