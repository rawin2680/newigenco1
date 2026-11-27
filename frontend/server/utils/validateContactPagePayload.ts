import { createError } from 'h3'
import { safeNewsUrl } from '../../shared/newsBlocks'
import { contactTextFields, isValidEmail, isValidPhone } from '../../shared/contactPage'

// ตรวจข้อมูลหน้าติดต่อเราก่อนส่งให้ Strapi และคืนเฉพาะช่องที่รู้จัก (ตัดช่องอื่นทิ้ง)
export function validateContactPagePayload(body: Record<string, unknown>) {
  const invalid = (message: string): never => {
    throw createError({ statusCode: 400, statusMessage: message })
  }
  const string = (value: unknown, max: number, name: string) =>
    value == null ? '' : typeof value === 'string' && value.length <= max ? value.trim() : invalid('ข้อความยาวเกินกำหนด: ' + name)
  const list = (value: unknown, max: number, name: string) =>
    value == null ? [] : Array.isArray(value) && value.length <= max ? value : invalid('รายการไม่ถูกต้อง: ' + name)
  const object = (value: unknown) =>
    value && typeof value === 'object' && !Array.isArray(value) ? value as Record<string, unknown> : invalid('ข้อมูลรายการไม่ถูกต้อง')

  const payload: Record<string, unknown> = {}
  for (const key of contactTextFields) {
    payload[key] = string(body[key], key === 'intro' || key === 'formSubtitle' || key === 'officeHours' || key === 'address' ? 2000 : key === 'seoDescription' ? 320 : key === 'seoTitle' ? 120 : 500, key)
  }
  for (const key of ['mapUrl', 'directionsUrl'] as const) {
    const url = payload[key] as string
    if (url && !/^https?:\/\//.test(safeNewsUrl(url))) invalid('ลิงก์แผนที่ต้องขึ้นต้นด้วย https:// : ' + url.slice(0, 60))
  }
  payload.phones = list(body.phones, 20, 'เบอร์โทร').map(raw => {
    const phone = object(raw)
    const number = string(phone.number, 40, 'เบอร์โทร')
    if (!isValidPhone(number)) invalid('เบอร์โทรไม่ถูกต้อง: ' + number)
    return { number, label: string(phone.label, 100, 'ป้ายเบอร์โทร') }
  })
  payload.emails = list(body.emails, 10, 'อีเมล').map(raw => {
    const email = object(raw)
    const address = string(email.address, 200, 'อีเมล')
    if (!isValidEmail(address)) invalid('อีเมลไม่ถูกต้อง: ' + address)
    return { address, label: string(email.label, 100, 'ป้ายอีเมล') }
  })
  payload.trustBadges = list(body.trustBadges, 10, 'ข้อความรับรอง').map(v => string(v, 300, 'ข้อความรับรอง')).filter(Boolean)
  payload.topicOptions = list(body.topicOptions, 40, 'หัวข้อในฟอร์ม').map(v => string(v, 200, 'หัวข้อในฟอร์ม')).filter(Boolean)
  return payload
}
