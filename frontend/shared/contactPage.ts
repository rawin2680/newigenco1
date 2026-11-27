// เนื้อหาหน้าติดต่อเรา (Strapi single type "contact-page")
// ค่าเริ่มต้นด้านล่างคือข้อความเดิมของหน้าเว็บ ใช้เมื่อ Strapi ยังไม่มีข้อมูลหรือเชื่อมต่อไม่ได้
// และใช้เป็นค่าตั้งต้นในหน้าแอดมินครั้งแรก

export type ContactPhone = { number: string; label: string }
export type ContactEmail = { address: string; label: string }
export type ContactPageContent = {
  badge: string
  headingMain: string
  headingHighlight: string
  intro: string
  channelsTitle: string
  phonesLabel: string
  phones: ContactPhone[]
  emailsLabel: string
  emails: ContactEmail[]
  officeHoursTitle: string
  officeHours: string
  locationTitle: string
  locationSubtitle: string
  address: string
  mapUrl: string
  directionsUrl: string
  trustBadges: string[]
  formTitle: string
  formSubtitle: string
  topicOptions: string[]
  seoTitle: string
  seoDescription: string
}

export const defaultContactPage = (): ContactPageContent => ({
  badge: 'CONSULTATION & INQUIRY // ติดต่อสอบถาม',
  headingMain: 'ติดต่อสอบถามหรือ',
  headingHighlight: 'ขอคำปรึกษา',
  intro: 'ยินดีให้คำปรึกษาด้านการวางระบบสารสนเทศระดับองค์กร การพัฒนาซอฟต์แวร์ตามสั่ง และการนำเทคโนโลยีดิจิทัลมาเพิ่มประสิทธิภาพการทำงาน สามารถกรอกแบบฟอร์มด้านล่าง หรือติดต่อโดยตรงผ่านช่องทางต่าง ๆ ได้ทันที',
  channelsTitle: 'ช่องทางการติดต่อโดยตรง',
  phonesLabel: 'เบอร์โทรศัพท์สำนักงาน',
  phones: [
    { number: '0-2523-3559', label: 'ชั้น 2' },
    { number: '0-2523-3560', label: 'ชั้น 3' },
    { number: '06-3525-4850', label: 'สายด่วน' }
  ],
  emailsLabel: 'อีเมลสำหรับติดต่อ',
  emails: [{ address: 'support@igenco.co.th', label: '' }],
  officeHoursTitle: 'เวลาทำการสำหรับติดต่อ:',
  officeHours: 'วันจันทร์ - วันศุกร์ เวลา 08:30 - 17:30 น. (หยุดวันเสาร์-อาทิตย์ และวันหยุดนักขัตฤกษ์)',
  locationTitle: 'ตำแหน่งที่ตั้งและแผนที่สำนักงาน',
  locationSubtitle: 'อาคารจูเคี่ยวเล้ง ชั้น 3 ใกล้สนามบินดอนเมือง',
  address: '89/35 อาคารจูเคี่ยวเล้ง ชั้น 3 ถนนวิภาวดีรังสิต แขวงสนามบิน เขตดอนเมือง กรุงเทพมหานคร 10210',
  mapUrl: 'https://maps.app.goo.gl/ogodVkNqs3Fvs3rx7',
  directionsUrl: 'https://www.google.com/maps/dir/?api=1&destination=13.9352181,100.6120949',
  trustBadges: [
    'มาตรฐานวิศวกรรมซอฟต์แวร์สากล **ISO/IEC 29110:2011**',
    'ที่ปรึกษาขึ้นทะเบียนกระทรวงการคลัง (ประเภทนิติบุคคล 4232 ระดับ 2)',
    'ได้รับการส่งเสริมการลงทุนจากสำนักงาน **BOI**'
  ],
  formTitle: 'กรอกแบบฟอร์มขอรับคำปรึกษา',
  formSubtitle: 'กรุณากรอกข้อมูลของท่านเพื่อให้ทีมผู้เชี่ยวชาญเตรียมข้อมูลและติดต่อกลับได้อย่างตรงจุด',
  topicOptions: [
    'ปรึกษาเรื่องทั่วไป / สนใจนำระบบไปใช้ในองค์กร',
    'Regist.ai (ระบบบริหารการลงทะเบียนอัจฉริยะ)',
    'HR.ai (ระบบบริหารทรัพยากรมนุษย์อัจฉริยะ)',
    'iGenQ (ระบบบริหารคิวอัจฉริยะแบบ New Normal)',
    'Software OnDemand (บริการพัฒนาซอฟต์แวร์ตามสั่ง)',
    'OutSource Service (บริการจัดหาทีมงานไอที)',
    'iMme Application (แอปพลิเคชันระบบสั่งซื้อสินค้า)',
    'i-RealEstate (ระบบบริหารอสังหาริมทรัพย์)',
    'iPOS (ระบบบริหารจุดขายหน้าร้าน)',
    'iSmartFlow (ระบบงานสารบรรณอิเล็กทรอนิกส์)',
    'i-FinSoft (ระบบการเงินและบัญชี)',
    'อื่นๆ / ขอใบเสนอราคา'
  ],
  seoTitle: 'ติดต่อสอบถามหรือ ขอคำปรึกษา - บริษัท ไอเจนโก้ จำกัด (IGENCO)',
  seoDescription: 'ติดต่อสอบถามข้อมูลระบบซอฟต์แวร์ หรือขอรับคำปรึกษาด้านการพัฒนาระบบสารสนเทศองค์กรจากทีมผู้เชี่ยวชาญ บริษัท ไอเจนโก้ จำกัด มาตรฐานสากล ISO/IEC 29110 โทร 0-2523-3559'
})

export const contactTextFields = [
  'badge', 'headingMain', 'headingHighlight', 'intro', 'channelsTitle', 'phonesLabel', 'emailsLabel',
  'officeHoursTitle', 'officeHours', 'locationTitle', 'locationSubtitle', 'address', 'mapUrl', 'directionsUrl',
  'formTitle', 'formSubtitle', 'seoTitle', 'seoDescription'
] as const

const text = (value: unknown) => (typeof value === 'string' ? value : '')

// รวมข้อมูลจาก Strapi เข้ากับค่าเริ่มต้นทีละช่อง: ช่องที่ว่าง/รายการที่ว่างใช้ค่าเดิมของหน้าเว็บ
export function mergeContactPage(raw: unknown): ContactPageContent {
  const base = defaultContactPage()
  const data = raw && typeof raw === 'object' ? raw as Record<string, unknown> : {}
  const merged = { ...base }
  for (const key of contactTextFields) {
    const value = text(data[key]).trim()
    if (value) merged[key] = value
  }
  const phones = Array.isArray(data.phones)
    ? data.phones.map(p => ({ number: text(p?.number).trim(), label: text(p?.label).trim() })).filter(p => p.number)
    : []
  const emails = Array.isArray(data.emails)
    ? data.emails.map(e => ({ address: text(e?.address).trim(), label: text(e?.label).trim() })).filter(e => e.address)
    : []
  const list = (value: unknown) => Array.isArray(value) ? value.map(text).map(v => v.trim()).filter(Boolean) : []
  if (phones.length) merged.phones = phones
  if (emails.length) merged.emails = emails
  if (list(data.trustBadges).length) merged.trustBadges = list(data.trustBadges)
  if (list(data.topicOptions).length) merged.topicOptions = list(data.topicOptions)
  return merged
}

// ลิงก์โทรใช้ตัวเลขเท่านั้น (คง + นำหน้าไว้ถ้ามี)
export const telDigits = (number: string) => number.trim().replace(/(?!^\+)[^\d]/g, '')
export const isValidPhone = (number: string) => /^\+?\d{6,15}$/.test(telDigits(number))
export const isValidEmail = (address: string) => /^[^\s@<>()"]+@[^\s@<>()"]+\.[a-z]{2,}$/i.test(address.trim())
