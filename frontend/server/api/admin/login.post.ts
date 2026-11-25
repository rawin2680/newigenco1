import { defineEventHandler, readBody, setCookie, createError } from 'h3'
import { ADMIN_COOKIE_NAME, getStrapiBaseUrl } from '../../utils/strapiAdmin'

export default defineEventHandler(async (event) => {
  const body = await readBody<{ email?: string; password?: string }>(event)
  if (!body?.email || !body?.password) {
    throw createError({
      statusCode: 400,
      statusMessage: 'กรุณากรอกอีเมลและรหัสผ่านให้ครบถ้วน'
    })
  }

  const strapiUrl = getStrapiBaseUrl()

  try {
    const res = await $fetch<{ data: { token: string; user: any } }>(`${strapiUrl}/admin/login`, {
      method: 'POST',
      body: {
        email: body.email.trim(),
        password: body.password
      }
    })

    if (!res?.data?.token) {
      throw createError({
        statusCode: 401,
        statusMessage: 'อีเมลหรือรหัสผ่านไม่ถูกต้อง'
      })
    }

    setCookie(event, ADMIN_COOKIE_NAME, res.data.token, {
      httpOnly: true,
      sameSite: 'lax',
      path: '/',
      maxAge: 60 * 60 * 24 * 7 // 7 days
    })

    return {
      user: res.data.user
    }
  } catch (err: any) {
    throw createError({
      statusCode: err?.statusCode || err?.response?.status || 401,
      statusMessage: 'อีเมลหรือรหัสผ่านไม่ถูกต้อง หรือเซิร์ฟเวอร์ Strapi ยังไม่พร้อมใช้งาน'
    })
  }
})
