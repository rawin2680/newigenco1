import { defineEventHandler, deleteCookie } from 'h3'
import { ADMIN_COOKIE_NAME } from '../../utils/strapiAdmin'

export default defineEventHandler((event) => {
  deleteCookie(event, ADMIN_COOKIE_NAME, { path: '/' })
  return { success: true }
})
