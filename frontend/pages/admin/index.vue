<script setup lang="ts">
import { ref, computed, watch, onMounted, type Ref } from 'vue'
import {
  LayoutDashboard,
  Mail,
  Newspaper,
  Box,
  LogOut,
  Plus,
  Search,
  Edit3,
  Trash2,
  CheckCircle2,
  Clock,
  Eye,
  EyeOff,
  Upload,
  ExternalLink,
  RefreshCw,
  Phone,
  X,
  Contrast,
  ShieldCheck,
  Sparkles,
  Send,
  Image as ImageIcon,
  ArrowUpRight,
  ArrowUp,
  ArrowDown,
  GripVertical,
  Lock
} from 'lucide-vue-next'
import { useTheme } from '~/composables/useTheme'
import { notifyContentChanged } from '~/composables/useLiveRefresh'
import { resolveNewsImage } from '~/composables/useNews'

useHead({
  title: 'IGENCO Admin Portal - ระบบจัดการเว็บไซต์องค์กร',
  meta: [{ name: 'robots', content: 'noindex, nofollow' }]
})

const config = useRuntimeConfig()
const strapiUrl = (config.public.strapiUrl as string) || 'http://localhost:1337'
const { toggleTheme, showToast } = useTheme()

// =========================================================================
// 1. AUTHENTICATION STATE
// =========================================================================
const isCheckingAuth = ref(true)
const currentUser = ref<any>(null)
const loginForm = ref({ email: '', password: '' })
const showPassword = ref(false)
const loginLoading = ref(false)
const loginError = ref('')

const checkAuth = async () => {
  isCheckingAuth.value = true
  try {
    const res = await $fetch<{ user: any }>('/api/admin/me')
    currentUser.value = res.user
    await fetchAllCollections()
  } catch {
    currentUser.value = null
  } finally {
    isCheckingAuth.value = false
  }
}

const handleLogin = async () => {
  loginError.value = ''
  loginLoading.value = true
  try {
    const res = await $fetch<{ user: any }>('/api/admin/login', {
      method: 'POST',
      body: loginForm.value
    })
    currentUser.value = res.user
    showToast(`ยินดีต้อนรับคุณ ${res.user?.firstname || 'Admin'} เข้าสู่ระบบจัดการ IGENCO`)
    await fetchAllCollections()
  } catch (err: any) {
    loginError.value = err?.data?.statusMessage || err?.statusMessage || 'อีเมลหรือรหัสผ่านไม่ถูกต้อง'
  } finally {
    loginLoading.value = false
  }
}

const handleLogout = async () => {
  await $fetch('/api/admin/logout', { method: 'POST' })
  currentUser.value = null
  loginForm.value = { email: '', password: '' }
  showToast('ออกจากระบบเรียบร้อยแล้ว')
}

const userRoleLabel = computed(() => {
  const roles = currentUser.value?.roles || []
  if (roles.length > 0) return roles[0].name
  return 'Administrator'
})

// =========================================================================
// 2. COLLECTIONS DATA & FETCHING
// =========================================================================
type AdminTab = 'dashboard' | 'inquiries' | 'news' | 'products'
const activeTab = ref<AdminTab>('dashboard')
const isLoadingData = ref(false)

const inquiries = ref<any[]>([])
const newsList = ref<any[]>([])
const productsList = ref<any[]>([])

// ข่าวและสินค้าเรียงตาม sortOrder (จัดลำดับได้จากปุ่มเลื่อนขึ้น/ลง) ส่วนรายการอื่นเรียงจากใหม่ไปเก่า
const ORDERED_SORT = 'sortOrder:asc,id:desc'

const fetchCollection = async (uid: string, sort = 'id:desc') => {
  const res: any = await $fetch(`/api/admin/collection/${encodeURIComponent(uid)}`, {
    query: { page: 1, pageSize: 100, sort }
  })
  return res?.results || res?.data || []
}

const fetchAllCollections = async () => {
  isLoadingData.value = true
  try {
    const [inq, news, prod] = await Promise.all([
      fetchCollection('api::inquiry.inquiry'),
      fetchCollection('api::news-article.news-article', ORDERED_SORT),
      fetchCollection('api::product.product', ORDERED_SORT)
    ])
    inquiries.value = inq
    newsList.value = news
    productsList.value = prod
  } catch (err: any) {
    showToast('โหลดข้อมูลบางส่วนไม่สำเร็จ กรุณาลองรีเฟรชอีกครั้ง')
  } finally {
    isLoadingData.value = false
  }
}

const resolveImage = (media: any, fallback?: string) => {
  if (media?.url) {
    return media.url.startsWith('http') ? media.url : `${strapiUrl}${media.url}`
  }
  return fallback || '/images/news/igenco-iso29110-ceremony.jpg'
}

// =========================================================================
// 3. INQUIRIES INBOX (ข้อความติดต่อจากลูกค้า)
// =========================================================================
const inquiryFilter = ref('all')
const inquirySearch = ref('')
const selectedInquiry = ref<any>(null)
const savingInquiry = ref(false)

const statusLabels: Record<string, { label: string; color: string }> = {
  pending: { label: 'รอติดต่อกลับ', color: 'bg-amber-500/15 text-amber-600 dark:text-amber-400 border-amber-500/30' },
  in_progress: { label: 'กำลังประสานงาน', color: 'bg-blue-500/15 text-blue-600 dark:text-blue-400 border-blue-500/30' },
  contacted: { label: 'ติดต่อแล้ว', color: 'bg-[#00C864]/15 text-[#00A854] dark:text-[#00FF88] border-[#00C864]/30' },
  closed: { label: 'ปิดการขาย', color: 'bg-slate-500/15 text-slate-600 dark:text-slate-400 border-slate-500/30' }
}

// สถานะการติดตามงานของข้อความติดต่อ (ฟิลด์ followUpStatus ใน Strapi; ชื่อ "status" ใช้ไม่ได้เพราะ Strapi v5 สงวนไว้
// สำหรับสถานะฉบับร่าง/เผยแพร่) ค่าว่างหรือค่าที่ไม่รู้จักถือเป็น "รอติดต่อกลับ"
const inquiryStatusOf = (item: any): string =>
  item?.followUpStatus && statusLabels[item.followUpStatus] ? item.followUpStatus : 'pending'

const filteredInquiries = computed(() => {
  return inquiries.value.filter((item) => {
    const matchStatus = inquiryFilter.value === 'all' || inquiryStatusOf(item) === inquiryFilter.value
    const q = inquirySearch.value.trim().toLowerCase()
    if (!q) return matchStatus
    return (
      matchStatus &&
      ((item.name || '').toLowerCase().includes(q) ||
        (item.email || '').toLowerCase().includes(q) ||
        (item.phone || '').toLowerCase().includes(q) ||
        (item.projectSummary || '').toLowerCase().includes(q))
    )
  })
})

const pendingCount = computed(() => inquiries.value.filter(i => inquiryStatusOf(i) === 'pending').length)

const openInquiryModal = (item: any) => {
  selectedInquiry.value = {
    ...item,
    followUpStatus: inquiryStatusOf(item),
    adminNote: item.adminNote || ''
  }
}

const saveInquiryUpdate = async () => {
  if (!selectedInquiry.value) return
  savingInquiry.value = true
  try {
    const docId = selectedInquiry.value.documentId || selectedInquiry.value.id
    await $fetch(`/api/admin/collection/${encodeURIComponent('api::inquiry.inquiry')}/${docId}`, {
      method: 'PUT',
      body: {
        followUpStatus: selectedInquiry.value.followUpStatus,
        adminNote: selectedInquiry.value.adminNote
      }
    })
    showToast('บันทึกสถานะและโน้ตติดตามงานเรียบร้อยแล้ว')
    selectedInquiry.value = null
    inquiries.value = await fetchCollection('api::inquiry.inquiry')
  } catch (err: any) {
    const reason = err?.data?.statusMessage || err?.data?.message || err?.statusMessage
    showToast(reason ? `บันทึกไม่สำเร็จ: ${reason}` : 'เกิดข้อผิดพลาดในการบันทึกข้อมูล')
  } finally {
    savingInquiry.value = false
  }
}

const deleteEntry = async (uid: string, item: any, refreshFn: () => Promise<void>) => {
  if (import.meta.client && !confirm(`ยืนยันการลบรายการ "${item.title || item.clientName || item.name}" ?`)) {
    return
  }
  try {
    const docId = item.documentId || item.id
    await $fetch(`/api/admin/collection/${encodeURIComponent(uid)}/${docId}`, {
      method: 'DELETE'
    })
    showToast('ลบข้อมูลเรียบร้อยแล้ว')
    notifyContentChanged(uid)
    await refreshFn()
  } catch {
    showToast('ไม่สามารถลบข้อมูลได้')
  }
}

const togglePublish = async (uid: string, item: any, refreshFn: () => Promise<void>) => {
  try {
    const docId = item.documentId || item.id
    const action = item.publishedAt ? 'unpublish' : 'publish'
    await $fetch(`/api/admin/collection/${encodeURIComponent(uid)}/${docId}/publish`, {
      method: 'POST',
      body: { action }
    })
    showToast(action === 'publish' ? 'เผยแพร่ขึ้นหน้าเว็บหลักเรียบร้อยแล้ว' : 'เปลี่ยนสถานะเป็นฉบับร่างแล้ว')
    notifyContentChanged(uid)
    await refreshFn()
  } catch {
    showToast('ไม่สามารถเปลี่ยนสถานะเผยแพร่ได้')
  }
}

// =========================================================================
// 3.1 REORDER (เลื่อนลำดับข่าว / สินค้า ขึ้น-ลง)
// =========================================================================
const reorderingUid = ref<string | null>(null)
// ส่ง Ref ตัวจริงจาก template (template จะ unwrap ref ระดับบนสุดให้อัตโนมัติ)
const reorderLists = { news: newsList, products: productsList }

const isPublishedEntry = (item: any) =>
  Boolean(item?.publishedAt) || item?.status === 'published' || item?.status === 'modified'

const getTopSortOrder = (list: any[]) =>
  list.length ? Math.min(...list.map(i => Number(i.sortOrder ?? 0))) - 1 : 0

// บันทึกลำดับใหม่ (ใช้ร่วมกันทั้งปุ่มลูกศรและการลากวาง): เรียง sortOrder = 0..n-1 แล้วบันทึกเฉพาะรายการที่เปลี่ยน
const applyOrder = async (uid: string, listRef: Ref<any[]>, newFullList: any[]) => {
  const changed: any[] = []
  const reindexed = newFullList.map((entry, index) => {
    if (entry.sortOrder === index) return entry
    const next = { ...entry, sortOrder: index }
    changed.push(next)
    return next
  })
  if (!changed.length) return

  listRef.value = reindexed
  reorderingUid.value = uid
  try {
    // ส่งทีละ 5 รายการ เพื่อไม่ให้ยิง Strapi พร้อมกันมากเกินไป
    for (let i = 0; i < changed.length; i += 5) {
      await Promise.all(
        changed.slice(i, i + 5).map(entry =>
          $fetch(`/api/admin/collection/${encodeURIComponent(uid)}/${entry.documentId || entry.id}`, {
            method: 'PUT',
            body: { sortOrder: entry.sortOrder, _publish: isPublishedEntry(entry) }
          })
        )
      )
    }
    showToast('จัดลำดับเรียบร้อยแล้ว')
    notifyContentChanged(uid)
  } catch {
    showToast('จัดลำดับไม่สำเร็จ กรุณาลองใหม่อีกครั้ง')
    listRef.value = await fetchCollection(uid, ORDERED_SORT).catch(() => listRef.value)
  } finally {
    reorderingUid.value = null
  }
}

const moveItem = async (uid: string, listRef: Ref<any[]>, visibleList: any[], item: any, direction: -1 | 1) => {
  if (reorderingUid.value) return
  const visibleIndex = visibleList.findIndex(i => i.id === item.id)
  const neighbour = visibleList[visibleIndex + direction]
  if (visibleIndex < 0 || !neighbour) return

  const full = listRef.value.slice()
  const a = full.findIndex(i => i.id === item.id)
  const b = full.findIndex(i => i.id === neighbour.id)
  if (a < 0 || b < 0) return
  ;[full[a], full[b]] = [full[b], full[a]]
  await applyOrder(uid, listRef, full)
}

// ---- ลากวาง (กดค้างที่ไอคอนจับ แล้วลากไปวางตำแหน่งใหม่) ----
const dragArmedId = ref<number | null>(null) // เปิดให้ลากได้เฉพาะเมื่อกดที่ไอคอนจับ
const draggedItem = ref<any>(null)
const dragOverId = ref<number | null>(null)

const armDrag = (item: any) => {
  if (!reorderingUid.value) dragArmedId.value = item.id
}

const onDragStart = (event: DragEvent, item: any) => {
  if (dragArmedId.value !== item.id || reorderingUid.value) {
    event.preventDefault()
    return
  }
  draggedItem.value = item
  if (event.dataTransfer) {
    event.dataTransfer.effectAllowed = 'move'
    event.dataTransfer.setData('text/plain', String(item.id))
  }
}

const onDragOver = (event: DragEvent, item: any) => {
  if (!draggedItem.value) return
  event.preventDefault()
  if (event.dataTransfer) event.dataTransfer.dropEffect = 'move'
  dragOverId.value = item.id
}

const onDragEnd = () => {
  draggedItem.value = null
  dragOverId.value = null
  dragArmedId.value = null
}

const onDrop = async (uid: string, listRef: Ref<any[]>, visibleList: any[], target: any) => {
  const dragged = draggedItem.value
  onDragEnd()
  if (!dragged || dragged.id === target.id || reorderingUid.value) return

  const fromVisible = visibleList.findIndex(i => i.id === dragged.id)
  const toVisible = visibleList.findIndex(i => i.id === target.id)
  if (fromVisible < 0 || toVisible < 0) return

  // ย้ายในรายการทั้งหมด: ลากลง = วางหลังรายการเป้าหมาย, ลากขึ้น = วางก่อนรายการเป้าหมาย
  const full = listRef.value.filter(i => i.id !== dragged.id)
  const targetIndex = full.findIndex(i => i.id === target.id)
  if (targetIndex < 0) return
  full.splice(toVisible > fromVisible ? targetIndex + 1 : targetIndex, 0, dragged)
  await applyOrder(uid, listRef, full)
}

// =========================================================================
// 4. SHARED IMAGE UPLOAD HELPER
// =========================================================================
const uploadingImage = ref(false)
const uploadImageFile = async (event: Event): Promise<{ id: number; url: string } | null> => {
  const input = event.target as HTMLInputElement
  const file = input.files?.[0]
  if (!file) return null

  uploadingImage.value = true
  try {
    const formData = new FormData()
    formData.append('files', file)
    const uploaded: any[] = await $fetch('/api/admin/upload', {
      method: 'POST',
      body: formData
    })
    if (uploaded && uploaded[0]) {
      showToast('อัปโหลดรูปภาพเข้า Media Library สำเร็จ')
      return uploaded[0]
    }
  } catch {
    showToast('อัปโหลดรูปภาพไม่สำเร็จ กรุณาลองใหม่')
  } finally {
    uploadingImage.value = false
    input.value = ''
  }
  return null
}

// =========================================================================
// 5. NEWS EDITOR MODAL & LIST FILTERS
// =========================================================================
const newsSearch = ref('')
const newsCategoryFilter = ref('ทั้งหมด')
const newsStatusFilter = ref<'all' | 'published' | 'draft'>('all')
const newsPage = ref(1)
const newsPageSize = ref(10)
const newsCategories = ['ทั้งหมด', 'ข่าวประชาสัมพันธ์', 'Enterprise Software', 'Service Development', 'กิจกรรมองค์กร']

const filteredNewsList = computed(() => {
  return newsList.value.filter((item) => {
    const matchCategory = newsCategoryFilter.value === 'ทั้งหมด' || item.category === newsCategoryFilter.value
    const matchStatus =
      newsStatusFilter.value === 'all' ||
      (newsStatusFilter.value === 'published' && Boolean(item.publishedAt)) ||
      (newsStatusFilter.value === 'draft' && !item.publishedAt)
    const q = newsSearch.value.trim().toLowerCase()
    if (!q) return matchCategory && matchStatus
    return (
      matchCategory &&
      matchStatus &&
      ((item.title || '').toLowerCase().includes(q) ||
        (item.category || '').toLowerCase().includes(q) ||
        (item.excerpt || '').toLowerCase().includes(q) ||
        (item.dateText || '').toLowerCase().includes(q))
    )
  })
})

const newsTotalPages = computed(() => Math.max(1, Math.ceil(filteredNewsList.value.length / newsPageSize.value)))

const paginatedNewsList = computed(() => {
  const safePage = Math.min(newsPage.value, newsTotalPages.value)
  const start = (safePage - 1) * newsPageSize.value
  return filteredNewsList.value.slice(start, start + newsPageSize.value)
})

watch([newsSearch, newsCategoryFilter, newsStatusFilter, newsPageSize], () => {
  newsPage.value = 1
})

const newsModalOpen = ref(false)
const savingNews = ref(false)
// ---- ฟอร์มเนื้อหาหน้ารายละเอียดข่าว (เก็บใน Strapi ฟิลด์ `detail`) เรียงตามลำดับบล็อกในหน้า /news/[id] ----
const detailInputCls = 'w-full px-3.5 py-2.5 rounded-xl bg-white dark:bg-black/50 border border-current/15 text-sm'

const emptyNewsDetail = () => ({
  subtitle: '',
  certifierEnabled: false,
  certifier: {
    organization: '', standardLabel: '', logoText: '', logoImage: '', heading: '', description: '',
    processes: [] as string[], certificateDate: '', scopeLabel: '', photoCaption: '', standard: '', scope: ''
  },
  gallery: [] as { url: string; caption: string }[],
  aiSummary: [] as string[],
  lead: '',
  milestones: [] as { label: string; value: string; sub: string }[],
  sectionTitles: { history: '', services: '', servicesSubtitle: '', philosophy: '', partnerships: '', partnershipsSubtitle: '' },
  historyText: '',
  services: [] as { code: string; title: string; thaiTitle: string; desc: string }[],
  philosophyText: '',
  partnerships: [] as { name: string; role: string; desc: string }[],
  extraParagraphs: [] as string[],
  flowcharts: [] as any[],
  author: { name: '', role: '', avatar: '', bio: '' },
  sidebarCta: { title: '', text: '', buttonLabel: '', buttonLink: '' }
})

const newsDetailForm = ref(emptyNewsDetail())
const newsDetailOriginal = ref<Record<string, any>>({}) // เก็บฟิลด์อื่นใน detail ที่ฟอร์มไม่ได้แก้ (เช่น rating, likes)

const str = (value: unknown) => (typeof value === 'string' ? value : value == null ? '' : String(value))
const splitLines = (value: string) => value.split('\n').map(v => v.trim()).filter(Boolean)
const splitComma = (value: string) => value.split(',').map(v => v.trim()).filter(Boolean)
const moveInList = (list: any[], index: number, direction: -1 | 1) => {
  const target = index + direction
  if (target < 0 || target >= list.length) return
  ;[list[index], list[target]] = [list[target], list[index]]
}
const removeFromList = (list: any[], index: number) => list.splice(index, 1)
const detailImageSrc = (url: string) => resolveNewsImage(url, strapiUrl)
const emptyFlowchart = () => ({ id: `chart-${Date.now()}`, figureNumber: '', title: '', englishTitle: '', description: '', image: '', steps: [] as any[] })
const emptyFlowStep = (index: number) => ({ id: `step-${Date.now()}`, code: String(index + 1).padStart(2, '0'), title: '', description: '', inputs: [] as string[], outputs: [] as string[] })

const loadNewsDetailForm = (detail: any) => {
  const d = detail && typeof detail === 'object' ? detail : {}
  const form = emptyNewsDetail()
  const paragraphs: string[] = Array.isArray(d.fullContent) ? d.fullContent.map(str) : []
  form.subtitle = str(d.subtitle)
  if (d.certifier && typeof d.certifier === 'object') {
    form.certifierEnabled = true
    for (const key of Object.keys(form.certifier) as (keyof typeof form.certifier)[]) {
      if (key === 'processes') form.certifier.processes = Array.isArray(d.certifier.processes) ? d.certifier.processes.map(str) : []
      else (form.certifier as any)[key] = str(d.certifier[key])
    }
  }
  form.gallery = Array.isArray(d.gallery) ? d.gallery.map((g: any) => ({ url: str(g?.url), caption: str(g?.caption) })) : []
  form.aiSummary = Array.isArray(d.aiSummary) ? d.aiSummary.map(str) : []
  form.lead = paragraphs[0] || ''
  form.historyText = paragraphs[1] || ''
  form.philosophyText = paragraphs[2] || ''
  form.extraParagraphs = paragraphs.slice(3)
  form.milestones = Array.isArray(d.milestones) ? d.milestones.map((m: any) => ({ label: str(m?.label), value: str(m?.value), sub: str(m?.sub) })) : []
  for (const key of Object.keys(form.sectionTitles) as (keyof typeof form.sectionTitles)[]) form.sectionTitles[key] = str(d.sectionTitles?.[key])
  form.services = Array.isArray(d.services) ? d.services.map((x: any) => ({ code: str(x?.code), title: str(x?.title), thaiTitle: str(x?.thaiTitle), desc: str(x?.desc) })) : []
  form.partnerships = Array.isArray(d.partnerships) ? d.partnerships.map((x: any) => ({ name: str(x?.name), role: str(x?.role), desc: str(x?.desc) })) : []
  form.flowcharts = Array.isArray(d.flowcharts)
    ? d.flowcharts.map((c: any) => ({
        id: str(c?.id) || `chart-${Math.random().toString(36).slice(2, 8)}`,
        figureNumber: str(c?.figureNumber), title: str(c?.title), englishTitle: str(c?.englishTitle),
        description: str(c?.description), image: str(c?.image),
        steps: Array.isArray(c?.steps)
          ? c.steps.map((st: any) => ({
              id: str(st?.id), code: str(st?.code), title: str(st?.title), description: str(st?.description),
              inputs: Array.isArray(st?.inputs) ? st.inputs.map(str) : [], outputs: Array.isArray(st?.outputs) ? st.outputs.map(str) : []
            }))
          : []
      }))
    : []
  for (const key of Object.keys(form.author) as (keyof typeof form.author)[]) form.author[key] = str(d.author?.[key])
  for (const key of Object.keys(form.sidebarCta) as (keyof typeof form.sidebarCta)[]) form.sidebarCta[key] = str(d.sidebarCta?.[key])
  newsDetailForm.value = form
  newsDetailOriginal.value = { ...d }
}

const trimObject = <T extends Record<string, any>>(obj: T) =>
  Object.fromEntries(Object.entries(obj).map(([k, v]) => [k, typeof v === 'string' ? v.trim() : v])) as T
const hasText = (obj: Record<string, any>) => Object.values(obj).some(v => (Array.isArray(v) ? v.length > 0 : typeof v === 'string' ? v.trim() !== '' : Boolean(v)))

// แปลงฟอร์มเป็น `detail` ที่บันทึกใน Strapi (ช่องที่ว่างจะไม่ถูกบันทึก หน้าเว็บจะใช้ค่าเดิมในโค้ดหรือซ่อนบล็อกนั้น)
const buildNewsDetailPayload = () => {
  const f = newsDetailForm.value
  const fullContent = [f.lead, f.historyText, f.philosophyText, ...f.extraParagraphs.filter(p => p.trim())].map(p => p.trim())
  while (fullContent.length && !fullContent[fullContent.length - 1]) fullContent.pop()

  const detail: Record<string, any> = { ...newsDetailOriginal.value }
  detail.subtitle = f.subtitle.trim()
  detail.certifier = f.certifierEnabled
    ? { ...trimObject(f.certifier), processes: f.certifier.processes.map(p => p.trim()).filter(Boolean) }
    : null
  detail.gallery = f.gallery.filter(g => g.url.trim()).map(trimObject)
  detail.aiSummary = f.aiSummary.map(p => p.trim()).filter(Boolean)
  detail.fullContent = fullContent
  detail.milestones = f.milestones.map(trimObject).filter(hasText)
  detail.sectionTitles = trimObject(f.sectionTitles)
  detail.services = f.services.map(trimObject).filter(hasText)
  detail.partnerships = f.partnerships.map(trimObject).filter(hasText)
  detail.flowcharts = f.flowcharts
    .map(c => ({ ...trimObject(c), steps: c.steps.map((st: any) => trimObject(st)).filter(hasText) }))
    .filter(c => c.title || c.image || c.steps.length)
  detail.author = trimObject(f.author)
  detail.sidebarCta = trimObject(f.sidebarCta)
  return { detail, content: fullContent.filter(Boolean).join('\n\n') }
}

const uploadDetailImage = async (event: Event, apply: (url: string) => void) => {
  const uploaded = await uploadImageFile(event)
  if (uploaded?.url) apply(uploaded.url)
}

const newsForm = ref<any>({
  documentId: null,
  title: '',
  category: 'ข่าวประชาสัมพันธ์',
  dateText: '',
  readTime: '3 นาทีในการอ่าน',
  excerpt: '',
  content: '',
  coverImageId: null as number | null,
  previewUrl: '',
  fallbackImageUrl: ''
})

const openNewsModal = (item?: any) => {
  if (item) {
    newsForm.value = {
      documentId: item.documentId || item.id,
      title: item.title || '',
      category: item.category || 'ข่าวประชาสัมพันธ์',
      dateText: item.dateText || '',
      readTime: item.readTime || '3 นาทีในการอ่าน',
      excerpt: item.excerpt || '',
      content: item.content || '',
      coverImageId: item.coverImage?.id || null,
      previewUrl: resolveImage(item.coverImage, item.fallbackImageUrl),
      fallbackImageUrl: item.fallbackImageUrl || ''
    }
    loadNewsDetailForm(item.detail)
  } else {
    loadNewsDetailForm(null)
    const todayThai = new Date().toLocaleDateString('th-TH', { day: 'numeric', month: 'long', year: 'numeric' })
    newsForm.value = {
      documentId: null,
      title: '',
      category: 'ข่าวประชาสัมพันธ์',
      dateText: todayThai,
      readTime: '3 นาทีในการอ่าน',
      excerpt: '',
      content: '',
      coverImageId: null,
      previewUrl: '',
      fallbackImageUrl: '/images/news/igenco-iso29110-ceremony.jpg'
    }
  }
  newsModalOpen.value = true
}

const onNewsImageSelect = async (e: Event) => {
  const uploaded = await uploadImageFile(e)
  if (uploaded) {
    newsForm.value.coverImageId = uploaded.id
    newsForm.value.previewUrl = uploaded.url.startsWith('http') ? uploaded.url : `${strapiUrl}${uploaded.url}`
  }
}

const saveNews = async (publish: boolean) => {
  if (!newsForm.value.title || !newsForm.value.excerpt) {
    showToast('กรุณากรอกหัวข้อข่าวและเนื้อหาย่อให้ครบถ้วน')
    return
  }
  savingNews.value = true
  try {
    const uid = encodeURIComponent('api::news-article.news-article')
    const payload: Record<string, any> = {
      title: newsForm.value.title,
      category: newsForm.value.category,
      dateText: newsForm.value.dateText || 'วันนี้',
      readTime: newsForm.value.readTime || '3 นาทีในการอ่าน',
      excerpt: newsForm.value.excerpt,
      fallbackImageUrl: newsForm.value.fallbackImageUrl || '/images/news/igenco-iso29110-ceremony.jpg',
      _publish: publish
    }
    const { detail, content } = buildNewsDetailPayload()
    payload.detail = detail
    payload.content = content || newsForm.value.excerpt
    if (newsForm.value.coverImageId) {
      payload.coverImage = newsForm.value.coverImageId
    }

    if (newsForm.value.documentId) {
      await $fetch(`/api/admin/collection/${uid}/${newsForm.value.documentId}`, { method: 'PUT', body: payload })
    } else {
      payload.sortOrder = getTopSortOrder(newsList.value)
      await $fetch(`/api/admin/collection/${uid}`, { method: 'POST', body: payload })
    }
    showToast(publish ? 'บันทึกและเผยแพร่ข่าวขึ้นหน้าเว็บเรียบร้อยแล้ว!' : 'บันทึกฉบับร่างเรียบร้อยแล้ว')
    notifyContentChanged('api::news-article.news-article')
    newsModalOpen.value = false
    newsList.value = await fetchCollection('api::news-article.news-article', ORDERED_SORT)
  } catch {
    showToast('เกิดข้อผิดพลาดในการบันทึกข่าว')
  } finally {
    savingNews.value = false
  }
}

// =========================================================================
// 6. PRODUCT EDITOR MODAL & LIST FILTERS
// =========================================================================
const productSearch = ref('')
const productCategoryFilter = ref('ทั้งหมด')
const productStatusFilter = ref<'all' | 'published' | 'draft'>('all')
const productPage = ref(1)
const productPageSize = ref(10)
const productCategories = ['ทั้งหมด', 'Enterprise Software', 'Service Development', 'E-Commerce']

const filteredProductsList = computed(() => {
  return productsList.value.filter((item) => {
    const matchCategory = productCategoryFilter.value === 'ทั้งหมด' || item.category === productCategoryFilter.value
    const matchStatus =
      productStatusFilter.value === 'all' ||
      (productStatusFilter.value === 'published' && Boolean(item.publishedAt)) ||
      (productStatusFilter.value === 'draft' && !item.publishedAt)
    const q = productSearch.value.trim().toLowerCase()
    if (!q) return matchCategory && matchStatus
    return (
      matchCategory &&
      matchStatus &&
      ((item.name || '').toLowerCase().includes(q) ||
        (item.category || '').toLowerCase().includes(q) ||
        (item.shortDesc || '').toLowerCase().includes(q))
    )
  })
})

const productTotalPages = computed(() => Math.max(1, Math.ceil(filteredProductsList.value.length / productPageSize.value)))

const paginatedProductsList = computed(() => {
  const safePage = Math.min(productPage.value, productTotalPages.value)
  const start = (safePage - 1) * productPageSize.value
  return filteredProductsList.value.slice(start, start + productPageSize.value)
})

watch([productSearch, productCategoryFilter, productStatusFilter, productPageSize], () => {
  productPage.value = 1
})

const productModalOpen = ref(false)
const savingProduct = ref(false)
const productForm = ref<any>({
  documentId: null,
  name: '',
  slug: '',
  category: 'Enterprise Software',
  badge: 'ENTERPRISE GRADE',
  shortDesc: '',
  fullDetails: '',
  featuresText: '',
  detailRoute: '',
  imageId: null as number | null,
  previewUrl: '',
  fallbackImageUrl: ''
})

const openProductModal = (item?: any) => {
  if (item) {
    productForm.value = {
      documentId: item.documentId || item.id,
      name: item.name || '',
      slug: item.slug || '',
      category: item.category || 'Enterprise Software',
      badge: item.badge || 'ENTERPRISE GRADE',
      shortDesc: item.shortDesc || '',
      fullDetails: item.fullDetails || '',
      featuresText: Array.isArray(item.features) ? item.features.join('\n') : '',
      detailRoute: item.detailRoute || '',
      imageId: item.image?.id || null,
      previewUrl: resolveImage(item.image, item.fallbackImageUrl),
      fallbackImageUrl: item.fallbackImageUrl || ''
    }
  } else {
    productForm.value = {
      documentId: null,
      name: '',
      slug: '',
      category: 'Enterprise Software',
      badge: 'ENTERPRISE GRADE',
      shortDesc: '',
      fullDetails: '',
      featuresText: '',
      detailRoute: '',
      imageId: null,
      previewUrl: '',
      fallbackImageUrl: '/images/products/software-ondemand.svg'
    }
  }
  productModalOpen.value = true
}

const onProductImageSelect = async (e: Event) => {
  const uploaded = await uploadImageFile(e)
  if (uploaded) {
    productForm.value.imageId = uploaded.id
    productForm.value.previewUrl = uploaded.url.startsWith('http') ? uploaded.url : `${strapiUrl}${uploaded.url}`
  }
}

const saveProduct = async (publish: boolean) => {
  if (!productForm.value.name || !productForm.value.shortDesc) {
    showToast('กรุณากรอกชื่อสินค้าและคำอธิบายย่อ')
    return
  }
  savingProduct.value = true
  try {
    const uid = encodeURIComponent('api::product.product')
    const features = productForm.value.featuresText.split('\n').map((s: string) => s.trim()).filter(Boolean)

    const payload: Record<string, any> = {
      name: productForm.value.name,
      category: productForm.value.category,
      badge: productForm.value.badge || 'ENTERPRISE GRADE',
      shortDesc: productForm.value.shortDesc,
      fullDetails: productForm.value.fullDetails || productForm.value.shortDesc,
      features,
      detailRoute: productForm.value.detailRoute || '',
      fallbackImageUrl: productForm.value.fallbackImageUrl || '/images/products/software-ondemand.svg',
      _publish: publish
    }
    if (productForm.value.slug) payload.slug = productForm.value.slug
    if (productForm.value.imageId) payload.image = productForm.value.imageId

    if (productForm.value.documentId) {
      await $fetch(`/api/admin/collection/${uid}/${productForm.value.documentId}`, { method: 'PUT', body: payload })
    } else {
      payload.sortOrder = getTopSortOrder(productsList.value)
      await $fetch(`/api/admin/collection/${uid}`, { method: 'POST', body: payload })
    }
    showToast(publish ? 'บันทึกและเผยแพร่สินค้าขึ้นหน้าเว็บเรียบร้อยแล้ว!' : 'บันทึกฉบับร่างเรียบร้อยแล้ว')
    notifyContentChanged('api::product.product')
    productModalOpen.value = false
    productsList.value = await fetchCollection('api::product.product', ORDERED_SORT)
  } catch {
    showToast('เกิดข้อผิดพลาดในการบันทึกสินค้า')
  } finally {
    savingProduct.value = false
  }
}

onMounted(() => {
  checkAuth()
})
</script>

<template>
  <div class="min-h-screen  text-[#022C22] dark:text-[#F4FBF7] transition-colors selection:bg-[#00C864] selection:text-[#022C22] relative">
    <!-- Subtle Architectural Grid Background -->
    

    <!-- =========================================================
         LOADING SPLASH
    ========================================================== -->
    <div v-if="isCheckingAuth" class="min-h-screen flex flex-col items-center justify-center relative z-10 space-y-4">
      <div class="w-10 h-10 rounded-full border-4 border-[#00C864]/30 border-t-[#00C864] animate-spin" />
      <p class="text-xs font-mono uppercase tracking-widest opacity-70">กำลังตรวจสอบสิทธิ์ผู้ดูแลระบบ...</p>
    </div>

    <!-- =========================================================
         VIEW 1: SPATIAL GLASS LOGIN PORTAL
    ========================================================== -->
    <div v-else-if="!currentUser" class="min-h-screen flex items-center justify-center p-5 relative z-10">
      <div class="max-w-md w-full p-8 sm:p-10 rounded-[2.5rem] spatial-glass border border-[#00C864]/30 shadow-2xl space-y-8 backdrop-blur-2xl">
        <!-- Brand Header -->
        <div class="text-center space-y-3">
          <div class="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#00C864]/15 text-[#00A854] dark:text-[#00FF88] text-xs font-mono font-bold border border-[#00C864]/25">
            <Lock class="w-3.5 h-3.5" />
            <span>IGENCO ADMIN PORTAL // 2026</span>
          </div>
          <h1 class="font-display font-extrabold text-2xl sm:text-3xl tracking-tight">
            เข้าสู่ระบบจัดการเว็บไซต์
          </h1>
          <p class="text-xs opacity-75 leading-relaxed">
            ใช้บัญชีอีเมลและรหัสผ่านเดียวกับผู้ดูแลระบบ Strapi เพื่อจัดการข่าวสาร ผลงาน สินค้า และข้อความลูกค้า
          </p>
        </div>

        <!-- Login Form -->
        <form class="space-y-4" @submit.prevent="handleLogin">
          <div v-if="loginError" class="p-3.5 rounded-xl bg-red-500/10 border border-red-500/30 text-red-600 dark:text-red-400 text-xs font-semibold text-center">
            {{ loginError }}
          </div>

          <div>
            <label class="block text-xs font-bold uppercase opacity-75 mb-1.5">อีเมลผู้ดูแลระบบ</label>
            <input
              v-model="loginForm.email"
              type="email"
              required
              placeholder="admin@igenco.co.th"
              class="w-full px-4 py-3.5 rounded-xl bg-white/80 dark:bg-black/50 border border-current/15 text-sm focus:outline-none focus:border-[#00C864] dark:focus:border-[#00FF88] transition-all"
            >
          </div>

          <div>
            <label class="block text-xs font-bold uppercase opacity-75 mb-1.5">รหัสผ่าน</label>
            <div class="relative">
              <input
                v-model="loginForm.password"
                :type="showPassword ? 'text' : 'password'"
                required
                placeholder="••••••••"
                class="w-full px-4 py-3.5 pr-11 rounded-xl bg-white/80 dark:bg-black/50 border border-current/15 text-sm focus:outline-none focus:border-[#00C864] dark:focus:border-[#00FF88] transition-all"
              >
              <button
                type="button"
                class="absolute right-3.5 top-1/2 -translate-y-1/2 opacity-60 hover:opacity-100 cursor-pointer"
                @click="showPassword = !showPassword"
              >
                <EyeOff v-if="showPassword" class="w-4 h-4" />
                <Eye v-else class="w-4 h-4" />
              </button>
            </div>
          </div>

          <button
            type="submit"
            :disabled="loginLoading"
            class="w-full py-4 rounded-xl font-bold text-sm uppercase tracking-wider bg-[#00C864] text-[#022C22] dark:bg-[#00FF88] dark:text-[#020806] hover:opacity-90 transition-all shadow-lg flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
          >
            <span>{{ loginLoading ? 'กำลังเข้าสู่ระบบ...' : 'เข้าสู่ระบบ Admin Portal' }}</span>
            <ArrowUpRight class="w-4 h-4" />
          </button>
        </form>

        <div class="pt-4 border-t border-current/10 flex items-center justify-between text-xs opacity-70">
          <NuxtLink to="/" class="hover:text-[#00C864] flex items-center gap-1">
            <span>← กลับหน้าเว็บหลัก</span>
          </NuxtLink>
          <button type="button" class="flex items-center gap-1 hover:text-[#00C864] cursor-pointer" @click="toggleTheme">
            <Contrast class="w-3.5 h-3.5" />
            <span>สลับโหมดสี</span>
          </button>
        </div>
      </div>
    </div>

    <!-- =========================================================
         VIEW 2: MODERN ENTERPRISE ADMIN DASHBOARD
    ========================================================== -->
    <div v-else class="min-h-screen flex flex-col lg:flex-row relative z-10">
      
      <!-- Left Glassmorphic Sidebar -->
      <aside class="lg:w-72 shrink-0 p-4 sm:p-6 lg:min-h-screen border-b lg:border-b-0 lg:border-r border-[#00C864]/20 bg-white/75 dark:bg-[#03150e]/85 backdrop-blur-2xl flex flex-col justify-between gap-6">
        <div class="space-y-6">
          <!-- Logo -->
          <div class="flex items-center justify-between">
            <NuxtLink to="/" class="flex items-center gap-2.5">
              <span class="w-3 h-3 rounded-full bg-[#00C864] dark:bg-[#00FF88] shadow-[0_0_12px_#00C864]" />
              <span class="font-display font-extrabold text-lg tracking-wider">
                IGENCO<span class="text-[#00C864] dark:text-[#00FF88]">//</span>ADMIN
              </span>
            </NuxtLink>
            <button type="button" class="p-2 rounded-xl border border-current/10 hover:bg-[#00C864]/10 cursor-pointer" title="สลับโหมดมืด/สว่าง" @click="toggleTheme">
              <Contrast class="w-4 h-4" />
            </button>
          </div>

          <!-- User Profile Card -->
          <div class="p-3.5 rounded-2xl bg-[#00C864]/10 border border-[#00C864]/25 flex items-center gap-3">
            <div class="w-10 h-10 rounded-xl bg-[#00C864] text-[#022C22] font-extrabold flex items-center justify-center shrink-0">
              {{ (currentUser.firstname || 'A')[0].toUpperCase() }}
            </div>
            <div class="min-w-0">
              <div class="text-sm font-bold truncate">
                {{ currentUser.firstname }} {{ currentUser.lastname }}
              </div>
              <div class="text-[11px] font-mono text-[#00A854] dark:text-[#00FF88] font-bold flex items-center gap-1">
                <ShieldCheck class="w-3 h-3" />
                <span class="truncate">{{ userRoleLabel }}</span>
              </div>
            </div>
          </div>

          <!-- Navigation Menu -->
          <nav class="space-y-1.5">
            <button
              type="button"
              :class="[
                'w-full px-4 py-3 rounded-2xl text-xs sm:text-sm font-bold flex items-center gap-3 transition-all cursor-pointer',
                activeTab === 'dashboard' ? 'bg-[#00C864] text-[#022C22] dark:bg-[#00FF88] dark:text-[#020806] shadow-md' : 'hover:bg-black/5 dark:hover:bg-white/5 opacity-80 hover:opacity-100'
              ]"
              @click="activeTab = 'dashboard'"
            >
              <LayoutDashboard class="w-4 h-4" />
              <span>ภาพรวมระบบ (Dashboard)</span>
            </button>

            <button
              type="button"
              :class="[
                'w-full px-4 py-3 rounded-2xl text-xs sm:text-sm font-bold flex items-center justify-between transition-all cursor-pointer',
                activeTab === 'inquiries' ? 'bg-[#00C864] text-[#022C22] dark:bg-[#00FF88] dark:text-[#020806] shadow-md' : 'hover:bg-black/5 dark:hover:bg-white/5 opacity-80 hover:opacity-100'
              ]"
              @click="activeTab = 'inquiries'"
            >
              <span class="flex items-center gap-3">
                <Mail class="w-4 h-4" />
                <span>ข้อความติดต่อลูกค้า</span>
              </span>
              <span v-if="pendingCount > 0" class="px-2 py-0.5 rounded-full text-[11px] font-mono bg-amber-500 text-white">
                {{ pendingCount }}
              </span>
            </button>

            <button
              type="button"
              :class="[
                'w-full px-4 py-3 rounded-2xl text-xs sm:text-sm font-bold flex items-center justify-between transition-all cursor-pointer',
                activeTab === 'news' ? 'bg-[#00C864] text-[#022C22] dark:bg-[#00FF88] dark:text-[#020806] shadow-md' : 'hover:bg-black/5 dark:hover:bg-white/5 opacity-80 hover:opacity-100'
              ]"
              @click="activeTab = 'news'"
            >
              <span class="flex items-center gap-3">
                <Newspaper class="w-4 h-4" />
                <span>จัดการข่าวสาร</span>
              </span>
              <span class="text-[11px] font-mono opacity-60">{{ newsList.length }}</span>
            </button>

            <button
              type="button"
              :class="[
                'w-full px-4 py-3 rounded-2xl text-xs sm:text-sm font-bold flex items-center justify-between transition-all cursor-pointer',
                activeTab === 'products' ? 'bg-[#00C864] text-[#022C22] dark:bg-[#00FF88] dark:text-[#020806] shadow-md' : 'hover:bg-black/5 dark:hover:bg-white/5 opacity-80 hover:opacity-100'
              ]"
              @click="activeTab = 'products'"
            >
              <span class="flex items-center gap-3">
                <Box class="w-4 h-4" />
                <span>จัดการสินค้าและบริการ</span>
              </span>
              <span class="text-[11px] font-mono opacity-60">{{ productsList.length }}</span>
            </button>
          </nav>
        </div>

        <!-- Bottom Sidebar Actions -->
        <div class="space-y-2 pt-4 border-t border-current/10 text-xs">
          <NuxtLink
            to="/"
            target="_blank"
            class="w-full px-3.5 py-2.5 rounded-xl bg-black/5 dark:bg-white/5 hover:bg-[#00C864]/15 font-semibold flex items-center justify-between transition-colors"
          >
            <span>เปิดดูหน้าเว็บหลัก</span>
            <ExternalLink class="w-3.5 h-3.5 opacity-60" />
          </NuxtLink>
          <a
            :href="`${strapiUrl}/admin`"
            target="_blank"
            rel="noopener noreferrer"
            class="w-full px-3.5 py-2.5 rounded-xl bg-black/5 dark:bg-white/5 hover:bg-[#00C864]/15 font-semibold flex items-center justify-between transition-colors"
          >
            <span>ตั้งค่าขั้นสูง (Strapi)</span>
            <ExternalLink class="w-3.5 h-3.5 opacity-60" />
          </a>
          <button
            type="button"
            class="w-full px-3.5 py-2.5 rounded-xl text-red-600 dark:text-red-400 hover:bg-red-500/10 font-bold flex items-center gap-2 transition-colors cursor-pointer"
            @click="handleLogout"
          >
            <LogOut class="w-4 h-4" />
            <span>ออกจากระบบ</span>
          </button>
        </div>
      </aside>

      <!-- Main Workspace Area -->
      <main class="flex-1 p-5 sm:p-8 lg:p-10 max-w-7xl w-full mx-auto space-y-8">
        
        <!-- Top Action Bar -->
        <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-5 border-b border-current/10">
          <div>
            <div class="text-xs font-mono uppercase tracking-wider text-[#00A854] dark:text-[#00FF88] font-bold">
              IGENCO ENTERPRISE CMS // LIVE POSTGRESQL SYNC
            </div>
            <h1 class="text-2xl sm:text-3xl font-extrabold font-display mt-0.5">
              <span v-if="activeTab === 'dashboard'">ภาพรวมระบบจัดการเว็บไซต์</span>
              <span v-else-if="activeTab === 'inquiries'">กล่องข้อความติดต่อสอบถามจากลูกค้า</span>
              <span v-else-if="activeTab === 'news'">จัดการข่าวสารและกิจกรรม</span>
              <span v-else-if="activeTab === 'products'">จัดการสินค้าและบริการ</span>
            </h1>
          </div>

          <div class="flex items-center gap-2.5">
            <button
              type="button"
              class="px-4 py-2.5 rounded-xl spatial-glass border border-current/15 hover:border-[#00C864] text-xs font-bold flex items-center gap-1.5 cursor-pointer"
              @click="fetchAllCollections"
            >
              <RefreshCw :class="['w-3.5 h-3.5 text-[#00C864]', isLoadingData ? 'animate-spin' : '']" />
              <span>รีเฟรชข้อมูล</span>
            </button>

            <button
              v-if="activeTab === 'news'"
              type="button"
              class="px-4 py-2.5 rounded-xl bg-[#00C864] text-[#022C22] dark:bg-[#00FF88] dark:text-[#020806] text-xs font-bold flex items-center gap-1.5 shadow-md cursor-pointer"
              @click="openNewsModal()"
            >
              <Plus class="w-4 h-4" />
              <span>เพิ่มข่าวใหม่</span>
            </button>
            <button
              v-if="activeTab === 'products'"
              type="button"
              class="px-4 py-2.5 rounded-xl bg-[#00C864] text-[#022C22] dark:bg-[#00FF88] dark:text-[#020806] text-xs font-bold flex items-center gap-1.5 shadow-md cursor-pointer"
              @click="openProductModal()"
            >
              <Plus class="w-4 h-4" />
              <span>เพิ่มสินค้าใหม่</span>
            </button>
          </div>
        </div>

        <!-- =====================================================
             TAB 1: DASHBOARD OVERVIEW
        ====================================================== -->
        <div v-if="activeTab === 'dashboard'" class="space-y-8">
          <!-- KPI Bento Grid -->
          <div class="grid grid-cols-1 sm:grid-cols-3 gap-5">
            <div
              class="p-6 rounded-3xl spatial-glass border border-[#00C864]/25 shadow-lg space-y-2 cursor-pointer hover:-translate-y-1 transition-all"
              @click="activeTab = 'inquiries'"
            >
              <div class="flex items-center justify-between text-xs font-mono opacity-70">
                <span>ข้อความติดต่อลูกค้า</span>
                <Mail class="w-4 h-4 text-[#00C864]" />
              </div>
              <div class="text-3xl font-black font-display">{{ inquiries.length }}</div>
              <div class="text-xs font-semibold text-amber-600 dark:text-amber-400">
                รอติดต่อกลับ {{ pendingCount }} รายการ
              </div>
            </div>

            <div
              class="p-6 rounded-3xl spatial-glass border border-[#00C864]/25 shadow-lg space-y-2 cursor-pointer hover:-translate-y-1 transition-all"
              @click="activeTab = 'news'"
            >
              <div class="flex items-center justify-between text-xs font-mono opacity-70">
                <span>ข่าวสารและกิจกรรม</span>
                <Newspaper class="w-4 h-4 text-[#00C864]" />
              </div>
              <div class="text-3xl font-black font-display">{{ newsList.length }}</div>
              <div class="text-xs opacity-70">เผยแพร่บนหน้าแรก &amp; หน้าข่าว</div>
            </div>

            <div
              class="p-6 rounded-3xl spatial-glass border border-[#00C864]/25 shadow-lg space-y-2 cursor-pointer hover:-translate-y-1 transition-all"
              @click="activeTab = 'products'"
            >
              <div class="flex items-center justify-between text-xs font-mono opacity-70">
                <span>สินค้าและบริการ</span>
                <Box class="w-4 h-4 text-[#00C864]" />
              </div>
              <div class="text-3xl font-black font-display">{{ productsList.length }}</div>
              <div class="text-xs opacity-70">รายการในแคตตาล็อก</div>
            </div>
          </div>

          <!-- Quick Actions + Recent Inquiries -->
          <div class="grid grid-cols-1 lg:grid-cols-12 gap-6">
            <div class="lg:col-span-7 p-6 rounded-3xl spatial-glass border border-current/10 space-y-4">
              <div class="flex items-center justify-between">
                <h2 class="font-bold text-base flex items-center gap-2">
                  <Mail class="w-4 h-4 text-[#00C864]" />
                  <span>ข้อความติดต่อสอบถามล่าสุด</span>
                </h2>
                <button type="button" class="text-xs font-bold text-[#00A854] dark:text-[#00FF88] hover:underline cursor-pointer" @click="activeTab = 'inquiries'">
                  ดูทั้งหมด →
                </button>
              </div>
              <div v-if="inquiries.length === 0" class="py-8 text-center text-xs opacity-60">
                ยังไม่มีข้อความติดต่อเข้ามา
              </div>
              <div v-else class="space-y-2.5">
                <div
                  v-for="inq in inquiries.slice(0, 5)"
                  :key="inq.id"
                  class="p-3.5 rounded-2xl bg-black/[0.03] dark:bg-white/[0.04] border border-current/10 hover:border-[#00C864]/50 flex items-center justify-between gap-3 cursor-pointer transition-all"
                  @click="openInquiryModal(inq)"
                >
                  <div class="min-w-0">
                    <div class="text-sm font-bold truncate">{{ inq.name }}</div>
                    <div class="text-xs opacity-70 truncate">{{ inq.projectSummary }}</div>
                  </div>
                  <span :class="['px-2.5 py-1 rounded-full text-[11px] font-bold border shrink-0', statusLabels[inquiryStatusOf(inq)].color]">
                    {{ statusLabels[inquiryStatusOf(inq)].label }}
                  </span>
                </div>
              </div>
            </div>

            <div class="lg:col-span-5 p-6 rounded-3xl spatial-glass border border-current/10 space-y-4">
              <h2 class="font-bold text-base flex items-center gap-2">
                <Sparkles class="w-4 h-4 text-[#00C864]" />
                <span>ทางลัดการทำงานด่วน</span>
              </h2>
              <div class="space-y-2.5">
                <button
                  type="button"
                  class="w-full p-4 rounded-2xl bg-[#00C864]/10 hover:bg-[#00C864]/20 border border-[#00C864]/30 text-left flex items-center justify-between transition-all cursor-pointer"
                  @click="activeTab = 'news'; openNewsModal()"
                >
                  <div>
                    <div class="text-sm font-bold">+ โพสต์ข่าวสาร / กิจกรรมใหม่</div>
                    <div class="text-xs opacity-70">อัปโหลดรูปและขึ้นหน้าแรกทันที</div>
                  </div>
                  <Plus class="w-5 h-5 text-[#00C864]" />
                </button>
                <button
                  type="button"
                  class="w-full p-4 rounded-2xl bg-black/[0.03] dark:bg-white/[0.04] hover:border-[#00C864]/50 border border-current/10 text-left flex items-center justify-between transition-all cursor-pointer"
                  @click="activeTab = 'products'; openProductModal()"
                >
                  <div>
                    <div class="text-sm font-bold">+ เพิ่มสินค้าและบริการใหม่</div>
                    <div class="text-xs opacity-70">อัปเดตแคตตาล็อกสินค้าหน้าแรก</div>
                  </div>
                  <Plus class="w-5 h-5 text-[#00C864]" />
                </button>
              </div>
            </div>
          </div>
        </div>

        <!-- =====================================================
             TAB 2: INQUIRIES INBOX
        ====================================================== -->
        <div v-if="activeTab === 'inquiries'" class="space-y-5">
          <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div class="flex flex-wrap items-center gap-1.5">
              <button
                v-for="opt in [
                  { key: 'all', text: 'ทั้งหมด' },
                  { key: 'pending', text: 'รอติดต่อกลับ' },
                  { key: 'in_progress', text: 'กำลังประสานงาน' },
                  { key: 'contacted', text: 'ติดต่อแล้ว' },
                  { key: 'closed', text: 'ปิดการขาย' }
                ]"
                :key="opt.key"
                type="button"
                :class="[
                  'px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer',
                  inquiryFilter === opt.key ? 'bg-[#00C864] text-[#022C22]' : 'spatial-glass border border-current/10 opacity-75 hover:opacity-100'
                ]"
                @click="inquiryFilter = opt.key"
              >
                {{ opt.text }}
              </button>
            </div>

            <div class="relative w-full sm:w-72">
              <Search class="w-4 h-4 text-[#00C864] absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                v-model="inquirySearch"
                type="text"
                placeholder="ค้นหาชื่อ, อีเมล, เบอร์โทร..."
                class="w-full pl-9 pr-4 py-2 rounded-xl bg-white/80 dark:bg-black/50 border border-current/15 text-xs focus:outline-none focus:border-[#00C864]"
              >
            </div>
          </div>

          <div class="space-y-3">
            <div
              v-for="inq in filteredInquiries"
              :key="inq.id"
              class="p-5 rounded-2xl spatial-glass border border-current/10 hover:border-[#00C864]/50 transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-4 cursor-pointer"
              @click="openInquiryModal(inq)"
            >
              <div class="space-y-1 min-w-0">
                <div class="flex flex-wrap items-center gap-2">
                  <span class="font-bold text-base">{{ inq.name }}</span>
                  <span :class="['px-2.5 py-0.5 rounded-full text-[11px] font-bold border', statusLabels[inquiryStatusOf(inq)].color]">
                    {{ statusLabels[inquiryStatusOf(inq)].label }}
                  </span>
                </div>
                <div class="text-xs opacity-75 flex flex-wrap items-center gap-3 font-mono">
                  <span>✉️ {{ inq.email }}</span>
                  <span v-if="inq.phone">📞 {{ inq.phone }}</span>
                </div>
                <p class="text-xs sm:text-sm opacity-90 line-clamp-2 pt-1">{{ inq.projectSummary }}</p>
              </div>

              <div class="flex items-center gap-2 shrink-0" @click.stop>
                <button
                  type="button"
                  class="px-3.5 py-2 rounded-xl bg-[#00C864]/15 hover:bg-[#00C864] text-[#00A854] dark:text-[#00FF88] hover:text-white text-xs font-bold cursor-pointer transition-all"
                  @click="openInquiryModal(inq)"
                >
                  เปิดอ่าน / อัปเดต
                </button>
                <button
                  type="button"
                  class="p-2 rounded-xl bg-red-500/10 hover:bg-red-500 text-red-500 hover:text-white transition-all cursor-pointer"
                  @click="deleteEntry('api::inquiry.inquiry', inq, async () => { inquiries = await fetchCollection('api::inquiry.inquiry') })"
                >
                  <Trash2 class="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </div>

        <!-- =====================================================
             TAB 3: NEWS MANAGEMENT (Compact List Layout)
        ====================================================== -->
        <div v-if="activeTab === 'news'" class="space-y-5">
          <!-- Category Filter Pills & Instant Search Bar -->
          <div class="flex flex-col lg:flex-row lg:items-center justify-between gap-3">
            <div class="flex flex-wrap items-center gap-1.5">
              <button
                v-for="cat in newsCategories"
                :key="cat"
                type="button"
                :class="[
                  'px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer',
                  newsCategoryFilter === cat ? 'bg-[#00C864] text-[#022C22]' : 'spatial-glass border border-current/10 opacity-75 hover:opacity-100'
                ]"
                @click="newsCategoryFilter = cat"
              >
                {{ cat }}
              </button>
            </div>

            <!-- Search Input -->
            <div class="relative w-full lg:w-72">
              <Search class="w-4 h-4 text-[#00C864] absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                v-model="newsSearch"
                type="text"
                placeholder="ค้นหาชื่อข่าว, หมวดหมู่, วันที่..."
                class="w-full pl-9 pr-4 py-2 rounded-xl bg-white/80 dark:bg-black/50 border border-current/15 text-xs focus:outline-none focus:border-[#00C864]"
              >
            </div>
          </div>

          <!-- Empty State -->
          <div
            v-if="paginatedNewsList.length === 0"
            class="p-10 rounded-2xl spatial-glass border border-current/10 text-center space-y-2"
          >
            <p class="text-sm font-bold opacity-75">ไม่พบข่าวสารที่ตรงกับเงื่อนไข</p>
            <button
              type="button"
              class="px-3.5 py-1.5 rounded-xl bg-[#00C864]/15 text-[#00A854] dark:text-[#00FF88] text-xs font-bold cursor-pointer"
              @click="newsSearch = ''; newsCategoryFilter = 'ทั้งหมด'; newsStatusFilter = 'all'"
            >
              ล้างตัวกรองทั้งหมด
            </button>
          </div>

          <!-- Compact Horizontal List Rows -->
          <div v-else class="space-y-2.5">
            <div
              v-for="item in paginatedNewsList"
              :key="item.id"
              class="p-3.5 sm:p-4 rounded-2xl spatial-glass border border-current/10 hover:border-[#00C864]/50 transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-4"
              :class="{
                'opacity-40': draggedItem?.id === item.id,
                'ring-2 ring-[#00C864] bg-[#00C864]/10': dragOverId === item.id && draggedItem?.id !== item.id
              }"
              :draggable="dragArmedId === item.id"
              @dragstart="onDragStart($event, item)"
              @dragover="onDragOver($event, item)"
              @dragleave="dragOverId === item.id && (dragOverId = null)"
              @drop.prevent="onDrop('api::news-article.news-article', reorderLists.news, paginatedNewsList, item)"
              @dragend="onDragEnd"
            >
              <!-- Left: Compact Thumbnail + Center Details -->
              <div class="flex items-start sm:items-center gap-3.5 min-w-0 flex-1">
                <!-- Drag handle: กดค้างแล้วลากเพื่อจัดลำดับ -->
                <div
                  title="กดค้างแล้วลากเพื่อจัดลำดับ"
                  class="hidden sm:flex self-stretch items-center px-0.5 -ml-1 rounded-lg opacity-40 hover:opacity-100 hover:text-[#00A854] dark:hover:text-[#00FF88] transition-all select-none"
                  :class="reorderingUid ? 'cursor-not-allowed' : 'cursor-grab active:cursor-grabbing'"
                  @mousedown="armDrag(item)"
                  @mouseup="dragArmedId = null"
                  @click.stop
                >
                  <GripVertical class="w-4 h-4" />
                </div>
                <div class="w-20 h-14 sm:w-24 sm:h-16 rounded-xl overflow-hidden bg-black/10 border border-current/10 shrink-0">
                  <img
                    :src="resolveImage(item.coverImage, item.fallbackImageUrl)"
                    :alt="item.title"
                    class="w-full h-full object-cover"
                  >
                </div>

                <div class="min-w-0 flex-1 space-y-1">
                  <h3 class="font-bold text-sm sm:text-base truncate max-w-full sm:max-w-xl">
                    {{ item.title }}
                  </h3>

                  <div class="text-xs opacity-75 flex flex-wrap items-center gap-2.5">
                    <span class="font-semibold text-[#00A854] dark:text-[#00FF88]">{{ item.category }}</span>
                    <span>•</span>
                    <span>{{ item.dateText }}</span>
                  </div>

                  <p class="text-xs opacity-75 line-clamp-1">
                    {{ item.excerpt }}
                  </p>
                </div>
              </div>

              <!-- Right: Action Buttons -->
              <div class="flex items-center justify-end gap-2 shrink-0">
                <button
                  type="button"
                  title="เลื่อนขึ้น"
                  class="p-2 rounded-xl bg-current/5 hover:bg-[#00C864]/15 text-current hover:text-[#00A854] dark:hover:text-[#00FF88] transition-all cursor-pointer disabled:opacity-30 disabled:cursor-not-allowed disabled:hover:bg-current/5"
                  :disabled="reorderingUid !== null || filteredNewsList[0]?.id === item.id"
                  @click="moveItem('api::news-article.news-article', reorderLists.news, filteredNewsList, item, -1)"
                >
                  <ArrowUp class="w-4 h-4" />
                </button>
                <button
                  type="button"
                  title="เลื่อนลง"
                  class="p-2 rounded-xl bg-current/5 hover:bg-[#00C864]/15 text-current hover:text-[#00A854] dark:hover:text-[#00FF88] transition-all cursor-pointer disabled:opacity-30 disabled:cursor-not-allowed disabled:hover:bg-current/5"
                  :disabled="reorderingUid !== null || filteredNewsList[filteredNewsList.length - 1]?.id === item.id"
                  @click="moveItem('api::news-article.news-article', reorderLists.news, filteredNewsList, item, 1)"
                >
                  <ArrowDown class="w-4 h-4" />
                </button>
                <button
                  type="button"
                  title="แก้ไขข่าว"
                  class="p-2 rounded-xl bg-[#00C864]/15 hover:bg-[#00C864] text-[#00A854] dark:text-[#00FF88] hover:text-white transition-all cursor-pointer"
                  @click="openNewsModal(item)"
                >
                  <Edit3 class="w-4 h-4" />
                </button>
                <button
                  type="button"
                  title="ลบข่าว"
                  class="p-2 rounded-xl bg-red-500/10 hover:bg-red-500 text-red-500 hover:text-white transition-all cursor-pointer"
                  @click="deleteEntry('api::news-article.news-article', item, async () => { newsList = await fetchCollection('api::news-article.news-article', ORDERED_SORT) })"
                >
                  <Trash2 class="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>

          <!-- Pagination Bar -->
          <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-2 text-xs">
            <div class="flex items-center gap-2 opacity-75">
              <span>แสดง {{ paginatedNewsList.length }} จากทั้งหมด {{ filteredNewsList.length }} รายการ</span>
              <span>•</span>
              <label class="flex items-center gap-1.5">
                <span>แสดงต่อหน้า:</span>
                <select
                  v-model.number="newsPageSize"
                  class="px-2 py-1 rounded-lg bg-white/80 dark:bg-black/50 border border-current/15 font-bold cursor-pointer"
                >
                  <option :value="10">10</option>
                  <option :value="15">15</option>
                  <option :value="20">20</option>
                </select>
              </label>
            </div>

            <div class="flex items-center gap-1.5 self-end sm:self-auto">
              <button
                type="button"
                :disabled="newsPage <= 1"
                class="px-3 py-1.5 rounded-xl spatial-glass border border-current/15 font-bold disabled:opacity-40 cursor-pointer disabled:cursor-not-allowed"
                @click="newsPage--"
              >
                &lt; ก่อนหน้า
              </button>
              <span class="px-3 py-1.5 font-bold">
                หน้า {{ newsPage }} / {{ newsTotalPages }}
              </span>
              <button
                type="button"
                :disabled="newsPage >= newsTotalPages"
                class="px-3 py-1.5 rounded-xl spatial-glass border border-current/15 font-bold disabled:opacity-40 cursor-pointer disabled:cursor-not-allowed"
                @click="newsPage++"
              >
                ถัดไป &gt;
              </button>
            </div>
          </div>
        </div>

        <!-- =====================================================
             TAB 4: PRODUCTS MANAGEMENT (Compact List Layout)
        ====================================================== -->
        <div v-if="activeTab === 'products'" class="space-y-5">
          <!-- Category Filter Pills & Instant Search Bar -->
          <div class="flex flex-col lg:flex-row lg:items-center justify-between gap-3">
            <div class="flex flex-wrap items-center gap-1.5">
              <button
                v-for="cat in productCategories"
                :key="cat"
                type="button"
                :class="[
                  'px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer',
                  productCategoryFilter === cat ? 'bg-[#00C864] text-[#022C22]' : 'spatial-glass border border-current/10 opacity-75 hover:opacity-100'
                ]"
                @click="productCategoryFilter = cat"
              >
                {{ cat }}
              </button>
            </div>

            <!-- Search Input -->
            <div class="relative w-full lg:w-72">
              <Search class="w-4 h-4 text-[#00C864] absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                v-model="productSearch"
                type="text"
                placeholder="ค้นหาชื่อสินค้า, หมวดหมู่, รายละเอียด..."
                class="w-full pl-9 pr-4 py-2 rounded-xl bg-white/80 dark:bg-black/50 border border-current/15 text-xs focus:outline-none focus:border-[#00C864]"
              >
            </div>
          </div>

          <!-- Empty State -->
          <div
            v-if="paginatedProductsList.length === 0"
            class="p-10 rounded-2xl spatial-glass border border-current/10 text-center space-y-2"
          >
            <p class="text-sm font-bold opacity-75">ไม่พบสินค้าและบริการที่ตรงกับเงื่อนไข</p>
            <button
              type="button"
              class="px-3.5 py-1.5 rounded-xl bg-[#00C864]/15 text-[#00A854] dark:text-[#00FF88] text-xs font-bold cursor-pointer"
              @click="productSearch = ''; productCategoryFilter = 'ทั้งหมด'; productStatusFilter = 'all'"
            >
              ล้างตัวกรองทั้งหมด
            </button>
          </div>

          <!-- Compact Horizontal List Rows -->
          <div v-else class="space-y-2.5">
            <div
              v-for="item in paginatedProductsList"
              :key="item.id"
              class="p-3.5 sm:p-4 rounded-2xl spatial-glass border border-current/10 hover:border-[#00C864]/50 transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-4"
              :class="{
                'opacity-40': draggedItem?.id === item.id,
                'ring-2 ring-[#00C864] bg-[#00C864]/10': dragOverId === item.id && draggedItem?.id !== item.id
              }"
              :draggable="dragArmedId === item.id"
              @dragstart="onDragStart($event, item)"
              @dragover="onDragOver($event, item)"
              @dragleave="dragOverId === item.id && (dragOverId = null)"
              @drop.prevent="onDrop('api::product.product', reorderLists.products, paginatedProductsList, item)"
              @dragend="onDragEnd"
            >
              <!-- Left: Compact Thumbnail + Center Details -->
              <div class="flex items-start sm:items-center gap-3.5 min-w-0 flex-1">
                <!-- Drag handle: กดค้างแล้วลากเพื่อจัดลำดับ -->
                <div
                  title="กดค้างแล้วลากเพื่อจัดลำดับ"
                  class="hidden sm:flex self-stretch items-center px-0.5 -ml-1 rounded-lg opacity-40 hover:opacity-100 hover:text-[#00A854] dark:hover:text-[#00FF88] transition-all select-none"
                  :class="reorderingUid ? 'cursor-not-allowed' : 'cursor-grab active:cursor-grabbing'"
                  @mousedown="armDrag(item)"
                  @mouseup="dragArmedId = null"
                  @click.stop
                >
                  <GripVertical class="w-4 h-4" />
                </div>
                <div class="w-20 h-14 sm:w-24 sm:h-16 rounded-xl overflow-hidden bg-black/10 border border-current/10 shrink-0">
                  <img
                    :src="resolveImage(item.image, item.fallbackImageUrl)"
                    :alt="item.name"
                    class="w-full h-full object-cover"
                  >
                </div>

                <div class="min-w-0 flex-1 space-y-1">
                  <h3 class="font-bold text-sm sm:text-base truncate max-w-full sm:max-w-xl">
                    {{ item.name }}
                  </h3>

                  <div class="text-xs opacity-75 flex flex-wrap items-center gap-2.5">
                    <span class="font-semibold text-[#00A854] dark:text-[#00FF88]">{{ item.category }}</span>
                    <span v-if="item.badge">•</span>
                    <span v-if="item.badge">{{ item.badge }}</span>
                  </div>

                  <p class="text-xs opacity-75 line-clamp-1">
                    {{ item.shortDesc }}
                  </p>
                </div>
              </div>

              <!-- Right: Action Buttons -->
              <div class="flex items-center justify-end gap-2 shrink-0">
                <button
                  type="button"
                  title="เลื่อนขึ้น"
                  class="p-2 rounded-xl bg-current/5 hover:bg-[#00C864]/15 text-current hover:text-[#00A854] dark:hover:text-[#00FF88] transition-all cursor-pointer disabled:opacity-30 disabled:cursor-not-allowed disabled:hover:bg-current/5"
                  :disabled="reorderingUid !== null || filteredProductsList[0]?.id === item.id"
                  @click="moveItem('api::product.product', reorderLists.products, filteredProductsList, item, -1)"
                >
                  <ArrowUp class="w-4 h-4" />
                </button>
                <button
                  type="button"
                  title="เลื่อนลง"
                  class="p-2 rounded-xl bg-current/5 hover:bg-[#00C864]/15 text-current hover:text-[#00A854] dark:hover:text-[#00FF88] transition-all cursor-pointer disabled:opacity-30 disabled:cursor-not-allowed disabled:hover:bg-current/5"
                  :disabled="reorderingUid !== null || filteredProductsList[filteredProductsList.length - 1]?.id === item.id"
                  @click="moveItem('api::product.product', reorderLists.products, filteredProductsList, item, 1)"
                >
                  <ArrowDown class="w-4 h-4" />
                </button>
                <button
                  type="button"
                  title="แก้ไขสินค้า"
                  class="p-2 rounded-xl bg-[#00C864]/15 hover:bg-[#00C864] text-[#00A854] dark:text-[#00FF88] hover:text-white transition-all cursor-pointer"
                  @click="openProductModal(item)"
                >
                  <Edit3 class="w-4 h-4" />
                </button>
                <button
                  type="button"
                  title="ลบสินค้า"
                  class="p-2 rounded-xl bg-red-500/10 hover:bg-red-500 text-red-500 hover:text-white transition-all cursor-pointer"
                  @click="deleteEntry('api::product.product', item, async () => { productsList = await fetchCollection('api::product.product', ORDERED_SORT) })"
                >
                  <Trash2 class="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>

          <!-- Pagination Bar -->
          <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-2 text-xs">
            <div class="flex items-center gap-2 opacity-75">
              <span>แสดง {{ paginatedProductsList.length }} จากทั้งหมด {{ filteredProductsList.length }} รายการ</span>
              <span>•</span>
              <label class="flex items-center gap-1.5">
                <span>แสดงต่อหน้า:</span>
                <select
                  v-model.number="productPageSize"
                  class="px-2 py-1 rounded-lg bg-white/80 dark:bg-black/50 border border-current/15 font-bold cursor-pointer"
                >
                  <option :value="10">10</option>
                  <option :value="15">15</option>
                  <option :value="20">20</option>
                </select>
              </label>
            </div>

            <div class="flex items-center gap-1.5 self-end sm:self-auto">
              <button
                type="button"
                :disabled="productPage <= 1"
                class="px-3 py-1.5 rounded-xl spatial-glass border border-current/15 font-bold disabled:opacity-40 cursor-pointer disabled:cursor-not-allowed"
                @click="productPage--"
              >
                &lt; ก่อนหน้า
              </button>
              <span class="px-3 py-1.5 font-bold">
                หน้า {{ productPage }} / {{ productTotalPages }}
              </span>
              <button
                type="button"
                :disabled="productPage >= productTotalPages"
                class="px-3 py-1.5 rounded-xl spatial-glass border border-current/15 font-bold disabled:opacity-40 cursor-pointer disabled:cursor-not-allowed"
                @click="productPage++"
              >
                ถัดไป &gt;
              </button>
            </div>
          </div>
        </div>

      </main>
    </div>

    <!-- =========================================================
         MODAL 1: INQUIRY DETAIL & FOLLOW-UP
    ========================================================== -->
    <Teleport to="body">
      <div v-if="selectedInquiry" class="fixed inset-0 z-[100] bg-black/70 backdrop-blur-lg flex items-center justify-center p-4" @click="selectedInquiry = null">
        <div class="max-w-xl w-full rounded-3xl bg-white dark:bg-[#03150e] border border-[#00C864]/30 shadow-2xl p-6 sm:p-8 space-y-5" @click.stop>
          <div class="flex items-start justify-between gap-4 border-b border-current/10 pb-4">
            <div>
              <span class="text-xs font-mono text-[#00A854] dark:text-[#00FF88] font-bold">CONTACT INQUIRY</span>
              <h3 class="text-xl font-extrabold mt-0.5">{{ selectedInquiry.name }}</h3>
              <div class="text-xs opacity-75 font-mono mt-1 space-x-3">
                <a :href="`mailto:${selectedInquiry.email}`" class="hover:text-[#00C864] underline">{{ selectedInquiry.email }}</a>
                <a v-if="selectedInquiry.phone" :href="`tel:${selectedInquiry.phone}`" class="hover:text-[#00C864] underline">{{ selectedInquiry.phone }}</a>
              </div>
            </div>
            <button type="button" class="p-2 rounded-xl bg-black/5 dark:bg-white/10 cursor-pointer" @click="selectedInquiry = null">
              <X class="w-4 h-4" />
            </button>
          </div>

          <div class="p-4 rounded-2xl bg-black/[0.03] dark:bg-white/[0.04] border border-current/10 text-sm leading-relaxed">
            <div class="text-xs font-bold opacity-60 mb-1">รายละเอียดที่ลูกค้าส่งเข้ามา:</div>
            <p>{{ selectedInquiry.projectSummary }}</p>
          </div>

          <div class="space-y-3">
            <div>
              <label class="block text-xs font-bold mb-1">สถานะการติดตามงาน</label>
              <select v-model="selectedInquiry.followUpStatus" class="w-full px-3.5 py-2.5 rounded-xl bg-white dark:bg-black/50 border border-current/15 text-sm">
                <option value="pending">รอติดต่อกลับ</option>
                <option value="in_progress">กำลังประสานงาน</option>
                <option value="contacted">ติดต่อแล้ว</option>
                <option value="closed">ปิดการขาย</option>
              </select>
            </div>

            <div>
              <label class="block text-xs font-bold mb-1">บันทึกช่วยจำแอดมิน (Admin Note)</label>
              <textarea v-model="selectedInquiry.adminNote" rows="3" placeholder="เช่น โทรคุยแล้ว นัดสาธิตระบบวันศุกร์..." class="w-full px-3.5 py-2.5 rounded-xl bg-white dark:bg-black/50 border border-current/15 text-sm" />
            </div>
          </div>

          <div class="flex items-center justify-end gap-2 pt-2">
            <button type="button" class="px-4 py-2.5 rounded-xl bg-black/5 dark:bg-white/10 text-xs font-bold cursor-pointer" @click="selectedInquiry = null">ยกเลิก</button>
            <button type="button" :disabled="savingInquiry" class="px-5 py-2.5 rounded-xl bg-[#00C864] text-[#022C22] font-bold text-xs cursor-pointer" @click="saveInquiryUpdate">
              {{ savingInquiry ? 'กำลังบันทึก...' : 'บันทึกการอัปเดต' }}
            </button>
          </div>
        </div>
      </div>
    </Teleport>

    <!-- =========================================================
         MODAL 2: NEWS EDITOR
    ========================================================== -->
    <Teleport to="body">
      <div v-if="newsModalOpen" class="fixed inset-0 z-[100] bg-black/75 backdrop-blur-lg flex items-center justify-center p-4 overflow-y-auto" @click="newsModalOpen = false">
        <div class="max-w-3xl w-full rounded-3xl bg-white dark:bg-[#03150e] border border-[#00C864]/30 shadow-2xl p-6 sm:p-8 space-y-5 my-auto" @click.stop>
          <div class="flex items-center justify-between border-b border-current/10 pb-3">
            <h3 class="text-lg font-extrabold">{{ newsForm.documentId ? 'แก้ไขข่าวสาร' : 'เพิ่มข่าวสารใหม่' }}</h3>
            <button type="button" class="p-2 rounded-xl bg-black/5 dark:bg-white/10 cursor-pointer" @click="newsModalOpen = false"><X class="w-4 h-4" /></button>
          </div>

          <div class="space-y-4 max-h-[70vh] overflow-y-auto pr-1">
            <div class="">
              <h4 class="text-sm font-extrabold text-[#00A854] dark:text-[#00FF88]">1. ข้อมูลหลัก (การ์ดหน้าแรก + ส่วนหัวข่าว)</h4>
              <p class="text-[11px] opacity-60 mt-0.5">รูปปก หัวข้อ หมวดหมู่ วันที่ และคำโปรย ใช้ทั้งการ์ดหน้าแรกและส่วนหัวของหน้ารายละเอียด</p>
            </div>
            <!-- Cover Image Upload -->
            <div>
              <label class="block text-xs font-bold mb-1.5">รูปภาพปกข่าว</label>
              <div class="flex items-center gap-4">
                <div class="w-32 h-20 rounded-xl overflow-hidden bg-black/10 border border-current/15 shrink-0 flex items-center justify-center">
                  <img v-if="newsForm.previewUrl" :src="newsForm.previewUrl" class="w-full h-full object-cover">
                  <ImageIcon v-else class="w-6 h-6 opacity-40" />
                </div>
                <label class="px-4 py-2.5 rounded-xl bg-[#00C864]/15 hover:bg-[#00C864] text-[#00A854] hover:text-white text-xs font-bold cursor-pointer flex items-center gap-2 transition-all">
                  <Upload class="w-4 h-4" />
                  <span>{{ uploadingImage ? 'กำลังอัปโหลด...' : 'เลือกรูปภาพจากเครื่อง' }}</span>
                  <input type="file" accept="image/*" class="hidden" @change="onNewsImageSelect">
                </label>
              </div>
            </div>

            <div>
              <label class="block text-xs font-bold mb-1">หัวข้อข่าว *</label>
              <input v-model="newsForm.title" type="text" placeholder="ระบุหัวข้อข่าว..." class="w-full px-3.5 py-2.5 rounded-xl bg-white dark:bg-black/50 border border-current/15 text-sm">
            </div>

            <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label class="block text-xs font-bold mb-1">หมวดหมู่</label>
                <select v-model="newsForm.category" class="w-full px-3.5 py-2.5 rounded-xl bg-white dark:bg-black/50 border border-current/15 text-sm">
                  <option value="ข่าวประชาสัมพันธ์">ข่าวประชาสัมพันธ์</option>
                  <option value="Enterprise Software">Enterprise Software</option>
                  <option value="Service Development">Service Development</option>
                  <option value="กิจกรรมองค์กร">กิจกรรมองค์กร</option>
                </select>
              </div>
              <div>
                <label class="block text-xs font-bold mb-1">วันที่แสดงผล</label>
                <input v-model="newsForm.dateText" type="text" placeholder="เช่น 25 พฤศจิกายน 2569" class="w-full px-3.5 py-2.5 rounded-xl bg-white dark:bg-black/50 border border-current/15 text-sm">
              </div>
            </div>

            <div>
              <label class="block text-xs font-bold mb-1">เนื้อหาย่อ (แสดงบนการ์ดหน้าแรก) *</label>
              <textarea v-model="newsForm.excerpt" rows="2" placeholder="สรุปสั้นๆ 1-2 บรรทัด..." class="w-full px-3.5 py-2.5 rounded-xl bg-white dark:bg-black/50 border border-current/15 text-sm" />
            </div>

            <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label class="block text-xs font-bold mb-1">เวลาในการอ่าน</label>
                <input v-model="newsForm.readTime" type="text" placeholder="3 นาทีในการอ่าน" :class="detailInputCls">
              </div>
              <div>
                <label class="block text-xs font-bold mb-1">หัวข้อรอง (ใต้หัวข้อข่าว)</label>
                <input v-model="newsDetailForm.subtitle" type="text" placeholder="ไม่บังคับ" :class="detailInputCls">
              </div>
            </div>

            <div class="pt-4 border-t border-current/10">
              <h4 class="text-sm font-extrabold text-[#00A854] dark:text-[#00FF88]">2. การ์ดการรับรองมาตรฐาน (ถ้ามี)</h4>
              <p class="text-[11px] opacity-60 mt-0.5">แสดงใต้หัวข้อข่าว พร้อมตราสัญลักษณ์และรูปพิธีมอบ (ใช้รูปปกข่าว) เปิดใช้เฉพาะข่าวที่เกี่ยวกับการรับรอง</p>
            </div>
            <label class="flex items-center gap-2 text-xs font-bold cursor-pointer">
              <input v-model="newsDetailForm.certifierEnabled" type="checkbox" class="accent-[#00C864]">
              <span>แสดงการ์ดการรับรองมาตรฐาน</span>
            </label>
            <div v-if="newsDetailForm.certifierEnabled" class="space-y-3">
              <div class="flex items-center gap-3">
                    <div class="w-24 h-16 rounded-lg overflow-hidden bg-black/10 border border-current/15 shrink-0 flex items-center justify-center">
                      <img v-if="newsDetailForm.certifier.logoImage" :src="detailImageSrc(newsDetailForm.certifier.logoImage)" class="w-full h-full object-cover">
                      <ImageIcon v-else class="w-5 h-5 opacity-40" />
                    </div>
                    <div class="flex-1 space-y-1.5">
                      <label class="px-3 py-2 rounded-xl bg-[#00C864]/15 hover:bg-[#00C864] text-[#00A854] hover:text-white text-xs font-bold cursor-pointer inline-flex items-center gap-1.5 transition-all">
                        <Upload class="w-3.5 h-3.5" />
                        <span>{{ uploadingImage ? 'กำลังอัปโหลด...' : 'อัปโหลดตราสัญลักษณ์' }}</span>
                        <input type="file" accept="image/*" class="hidden" @change="uploadDetailImage($event, url => { newsDetailForm.certifier.logoImage = url })">
                      </label>
                      <input v-model="newsDetailForm.certifier.logoImage" type="text" placeholder="หรือวางที่อยู่รูป เช่น /images/news/xxx.jpg" :class="detailInputCls">
                    </div>
                  </div>
              <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div><label class="block text-xs font-bold mb-1">ข้อความป้ายตรา</label><input v-model="newsDetailForm.certifier.logoText" type="text" placeholder="TÜV NORD CERTIFIED" :class="detailInputCls"></div>
                <div><label class="block text-xs font-bold mb-1">บรรทัดมาตรฐาน</label><input v-model="newsDetailForm.certifier.standardLabel" type="text" placeholder="ISO/IEC 29110:2011" :class="detailInputCls"></div>
              </div>
              <div><label class="block text-xs font-bold mb-1">หัวข้อการ์ด</label><input v-model="newsDetailForm.certifier.heading" type="text" placeholder="การรับรองคุณภาพมาตรฐานวิศวกรรมซอฟต์แวร์สากล" :class="detailInputCls"></div>
              <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div><label class="block text-xs font-bold mb-1">ชื่อสถาบันผู้รับรอง</label><input v-model="newsDetailForm.certifier.organization" type="text" placeholder="TÜV NORD (Thailand) Co., Ltd." :class="detailInputCls"></div>
                <div><label class="block text-xs font-bold mb-1">วันรับรอง</label><input v-model="newsDetailForm.certifier.certificateDate" type="text" placeholder="25 กรกฎาคม 2561" :class="detailInputCls"></div>
              </div>
              <div><label class="block text-xs font-bold mb-1">ข้อความต่อจากชื่อสถาบัน</label><input v-model="newsDetailForm.certifier.description" type="text" placeholder="ได้ประเมินและให้การรับรองบริษัท ไอเจนโก้ จำกัด ใน 2 กระบวนการหลัก:" :class="detailInputCls"></div>
              <div><label class="block text-xs font-bold mb-1">กระบวนการที่ได้รับการรับรอง (บรรทัดละ 1 รายการ)</label><textarea :value="newsDetailForm.certifier.processes.join('\n')" rows="2" :class="detailInputCls" @input="newsDetailForm.certifier.processes = splitLines(($event.target as HTMLTextAreaElement).value)" /></div>
              <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div><label class="block text-xs font-bold mb-1">ข้อความต่อจากวันรับรอง</label><input v-model="newsDetailForm.certifier.scopeLabel" type="text" placeholder="ขอบข่ายระดับสากล" :class="detailInputCls"></div>
                <div><label class="block text-xs font-bold mb-1">คำบรรยายรูปพิธีมอบ</label><input v-model="newsDetailForm.certifier.photoCaption" type="text" placeholder="พิธีมอบใบรับรอง..." :class="detailInputCls"></div>
              </div>
            </div>

            <div class="pt-4 border-t border-current/10">
              <h4 class="text-sm font-extrabold text-[#00A854] dark:text-[#00FF88]">3. แกลเลอรีภาพ</h4>
              <p class="text-[11px] opacity-60 mt-0.5">ถ้ามีมากกว่า 1 รูป หน้าข่าวจะแสดงเป็นสไลด์ภาพพร้อมคำบรรยาย ถ้าไม่มีจะแสดงรูปปกข่าว</p>
            </div>
            <div class="space-y-2">
              <div v-for="(img, i) in newsDetailForm.gallery" :key="i" class="flex items-start gap-2">
                <div class="flex-1 p-3 rounded-2xl border border-current/10 bg-black/[0.02] dark:bg-white/[0.03] space-y-2">
                  <div class="text-[11px] font-mono font-bold opacity-60">ภาพที่ {{ i + 1 }}</div>
                  <div class="flex items-center gap-3">
                    <div class="w-24 h-16 rounded-lg overflow-hidden bg-black/10 border border-current/15 shrink-0 flex items-center justify-center">
                      <img v-if="img.url" :src="detailImageSrc(img.url)" class="w-full h-full object-cover">
                      <ImageIcon v-else class="w-5 h-5 opacity-40" />
                    </div>
                    <div class="flex-1 space-y-1.5">
                      <label class="px-3 py-2 rounded-xl bg-[#00C864]/15 hover:bg-[#00C864] text-[#00A854] hover:text-white text-xs font-bold cursor-pointer inline-flex items-center gap-1.5 transition-all">
                        <Upload class="w-3.5 h-3.5" />
                        <span>{{ uploadingImage ? 'กำลังอัปโหลด...' : 'อัปโหลดรูปภาพ' }}</span>
                        <input type="file" accept="image/*" class="hidden" @change="uploadDetailImage($event, url => { img.url = url })">
                      </label>
                      <input v-model="img.url" type="text" placeholder="หรือวางที่อยู่รูป เช่น /images/news/xxx.jpg" :class="detailInputCls">
                    </div>
                  </div>
                  <input v-model="img.caption" type="text" placeholder="คำบรรยายภาพ" :class="detailInputCls">
                </div>
                <div class="flex items-center gap-1 shrink-0">
                    <button type="button" title="เลื่อนขึ้น" class="p-1.5 rounded-lg bg-black/5 dark:bg-white/10 hover:bg-[#00C864]/15 disabled:opacity-30 cursor-pointer" :disabled="i === 0" @click="moveInList(newsDetailForm.gallery, i, -1)"><ArrowUp class="w-3.5 h-3.5" /></button>
                    <button type="button" title="เลื่อนลง" class="p-1.5 rounded-lg bg-black/5 dark:bg-white/10 hover:bg-[#00C864]/15 disabled:opacity-30 cursor-pointer" :disabled="i === newsDetailForm.gallery.length - 1" @click="moveInList(newsDetailForm.gallery, i, 1)"><ArrowDown class="w-3.5 h-3.5" /></button>
                    <button type="button" title="ลบรายการนี้" class="p-1.5 rounded-lg bg-red-500/10 text-red-500 hover:bg-red-500 hover:text-white cursor-pointer" @click="removeFromList(newsDetailForm.gallery, i)"><Trash2 class="w-3.5 h-3.5" /></button>
                  </div>
              </div>
              <button type="button" class="px-3 py-2 rounded-xl bg-[#00C864]/15 hover:bg-[#00C864] text-[#00A854] dark:text-[#00FF88] hover:text-white text-xs font-bold cursor-pointer inline-flex items-center gap-1.5 transition-all" @click="newsDetailForm.gallery.push({ url: '', caption: '' })"><Plus class="w-3.5 h-3.5" />เพิ่มรูปภาพ</button>
            </div>

            <div class="pt-4 border-t border-current/10">
              <h4 class="text-sm font-extrabold text-[#00A854] dark:text-[#00FF88]">4. สรุปสาระสำคัญ (AI Quick Summary)</h4>
              <p class="text-[11px] opacity-60 mt-0.5">ข้อสรุปสั้น ๆ แสดงเป็นการ์ดใต้รูปภาพ (ถ้าว่างจะใช้คำโปรยแทน)</p>
            </div>
            <div class="space-y-2">
              <div v-for="(point, i) in newsDetailForm.aiSummary" :key="i" class="flex items-start gap-2">
                <textarea v-model="newsDetailForm.aiSummary[i]" rows="2" :placeholder="'ข้อสรุปที่ ' + (i + 1)" :class="detailInputCls" />
                <div class="flex items-center gap-1 shrink-0">
                    <button type="button" title="เลื่อนขึ้น" class="p-1.5 rounded-lg bg-black/5 dark:bg-white/10 hover:bg-[#00C864]/15 disabled:opacity-30 cursor-pointer" :disabled="i === 0" @click="moveInList(newsDetailForm.aiSummary, i, -1)"><ArrowUp class="w-3.5 h-3.5" /></button>
                    <button type="button" title="เลื่อนลง" class="p-1.5 rounded-lg bg-black/5 dark:bg-white/10 hover:bg-[#00C864]/15 disabled:opacity-30 cursor-pointer" :disabled="i === newsDetailForm.aiSummary.length - 1" @click="moveInList(newsDetailForm.aiSummary, i, 1)"><ArrowDown class="w-3.5 h-3.5" /></button>
                    <button type="button" title="ลบรายการนี้" class="p-1.5 rounded-lg bg-red-500/10 text-red-500 hover:bg-red-500 hover:text-white cursor-pointer" @click="removeFromList(newsDetailForm.aiSummary, i)"><Trash2 class="w-3.5 h-3.5" /></button>
                  </div>
              </div>
              <button type="button" class="px-3 py-2 rounded-xl bg-[#00C864]/15 hover:bg-[#00C864] text-[#00A854] dark:text-[#00FF88] hover:text-white text-xs font-bold cursor-pointer inline-flex items-center gap-1.5 transition-all" @click="newsDetailForm.aiSummary.push('')"><Plus class="w-3.5 h-3.5" />เพิ่มข้อสรุป</button>
            </div>

            <div class="pt-4 border-t border-current/10">
              <h4 class="text-sm font-extrabold text-[#00A854] dark:text-[#00FF88]">5. เนื้อหาข่าว</h4>
              <p class="text-[11px] opacity-60 mt-0.5">เรียงตามหน้าข่าว: ย่อหน้านำ → ตัวเลขไฮไลต์ → หัวข้อที่ 1 → บริการ/ขอบเขต → หัวข้อที่ 2 → พันธมิตร → ย่อหน้าเพิ่มเติม (ช่องที่ว่างจะไม่แสดง)</p>
            </div>
            <div><label class="block text-xs font-bold mb-1">5.1 ย่อหน้านำ (กรอบเน้นสีเขียว)</label><textarea v-model="newsDetailForm.lead" rows="4" :class="detailInputCls" /></div>

            <div class="space-y-2">
              <label class="block text-xs font-bold mb-1">5.2 ตัวเลขไฮไลต์ (แถบสถิติ 3 ช่อง)</label>
              <div v-for="(stat, i) in newsDetailForm.milestones" :key="i" class="flex items-start gap-2">
                <div class="flex-1 grid grid-cols-1 sm:grid-cols-3 gap-2">
                  <input v-model="stat.label" type="text" placeholder="หัวข้อ เช่น ก่อตั้งบริษัท" :class="detailInputCls">
                  <input v-model="stat.value" type="text" placeholder="ค่า เช่น 8 ปี" :class="detailInputCls">
                  <input v-model="stat.sub" type="text" placeholder="คำอธิบายเพิ่มเติม" :class="detailInputCls">
                </div>
                <div class="flex items-center gap-1 shrink-0">
                    <button type="button" title="เลื่อนขึ้น" class="p-1.5 rounded-lg bg-black/5 dark:bg-white/10 hover:bg-[#00C864]/15 disabled:opacity-30 cursor-pointer" :disabled="i === 0" @click="moveInList(newsDetailForm.milestones, i, -1)"><ArrowUp class="w-3.5 h-3.5" /></button>
                    <button type="button" title="เลื่อนลง" class="p-1.5 rounded-lg bg-black/5 dark:bg-white/10 hover:bg-[#00C864]/15 disabled:opacity-30 cursor-pointer" :disabled="i === newsDetailForm.milestones.length - 1" @click="moveInList(newsDetailForm.milestones, i, 1)"><ArrowDown class="w-3.5 h-3.5" /></button>
                    <button type="button" title="ลบรายการนี้" class="p-1.5 rounded-lg bg-red-500/10 text-red-500 hover:bg-red-500 hover:text-white cursor-pointer" @click="removeFromList(newsDetailForm.milestones, i)"><Trash2 class="w-3.5 h-3.5" /></button>
                  </div>
              </div>
              <button type="button" class="px-3 py-2 rounded-xl bg-[#00C864]/15 hover:bg-[#00C864] text-[#00A854] dark:text-[#00FF88] hover:text-white text-xs font-bold cursor-pointer inline-flex items-center gap-1.5 transition-all" @click="newsDetailForm.milestones.push({ label: '', value: '', sub: '' })"><Plus class="w-3.5 h-3.5" />เพิ่มตัวเลข</button>
            </div>

            <div class="space-y-2">
              <label class="block text-xs font-bold mb-1">5.3 หัวข้อที่ 1 + เนื้อหา</label>
              <input v-model="newsDetailForm.sectionTitles.history" type="text" placeholder="ชื่อหัวข้อ (ค่าเริ่มต้น: รายละเอียดการดำเนินงาน)" :class="detailInputCls">
              <textarea v-model="newsDetailForm.historyText" rows="4" placeholder="เนื้อหาของหัวข้อนี้" :class="detailInputCls" />
            </div>

            <div class="space-y-2">
              <label class="block text-xs font-bold mb-1">5.4 บริการ / ขอบเขตงาน (การ์ดเรียงเป็นตาราง)</label>
              <div class="grid grid-cols-1 sm:grid-cols-2 gap-2">
                <input v-model="newsDetailForm.sectionTitles.services" type="text" placeholder="ชื่อหัวข้อในสารบัญ เช่น ขอบเขตการให้บริการ IT" :class="detailInputCls">
                <input v-model="newsDetailForm.sectionTitles.servicesSubtitle" type="text" placeholder="ป้ายหัวตาราง เช่น COMPREHENSIVE IT SERVICES // ..." :class="detailInputCls">
              </div>
              <div v-for="(svc, i) in newsDetailForm.services" :key="i" class="flex items-start gap-2">
                <div class="flex-1 p-3 rounded-2xl border border-current/10 bg-black/[0.02] dark:bg-white/[0.03] space-y-2">
                  <div class="grid grid-cols-1 sm:grid-cols-3 gap-2">
                    <input v-model="svc.code" type="text" placeholder="รหัส เช่น SI" :class="detailInputCls">
                    <input v-model="svc.title" type="text" placeholder="ชื่อ (อังกฤษ)" :class="detailInputCls">
                    <input v-model="svc.thaiTitle" type="text" placeholder="ชื่อ (ไทย)" :class="detailInputCls">
                  </div>
                  <textarea v-model="svc.desc" rows="2" placeholder="คำอธิบาย" :class="detailInputCls" />
                </div>
                <div class="flex items-center gap-1 shrink-0">
                    <button type="button" title="เลื่อนขึ้น" class="p-1.5 rounded-lg bg-black/5 dark:bg-white/10 hover:bg-[#00C864]/15 disabled:opacity-30 cursor-pointer" :disabled="i === 0" @click="moveInList(newsDetailForm.services, i, -1)"><ArrowUp class="w-3.5 h-3.5" /></button>
                    <button type="button" title="เลื่อนลง" class="p-1.5 rounded-lg bg-black/5 dark:bg-white/10 hover:bg-[#00C864]/15 disabled:opacity-30 cursor-pointer" :disabled="i === newsDetailForm.services.length - 1" @click="moveInList(newsDetailForm.services, i, 1)"><ArrowDown class="w-3.5 h-3.5" /></button>
                    <button type="button" title="ลบรายการนี้" class="p-1.5 rounded-lg bg-red-500/10 text-red-500 hover:bg-red-500 hover:text-white cursor-pointer" @click="removeFromList(newsDetailForm.services, i)"><Trash2 class="w-3.5 h-3.5" /></button>
                  </div>
              </div>
              <button type="button" class="px-3 py-2 rounded-xl bg-[#00C864]/15 hover:bg-[#00C864] text-[#00A854] dark:text-[#00FF88] hover:text-white text-xs font-bold cursor-pointer inline-flex items-center gap-1.5 transition-all" @click="newsDetailForm.services.push({ code: '', title: '', thaiTitle: '', desc: '' })"><Plus class="w-3.5 h-3.5" />เพิ่มบริการ</button>
            </div>

            <div class="space-y-2">
              <label class="block text-xs font-bold mb-1">5.5 หัวข้อที่ 2 + เนื้อหา</label>
              <input v-model="newsDetailForm.sectionTitles.philosophy" type="text" placeholder="ชื่อหัวข้อ (ค่าเริ่มต้น: แนวทางการดำเนินงาน)" :class="detailInputCls">
              <textarea v-model="newsDetailForm.philosophyText" rows="4" placeholder="เนื้อหาของหัวข้อนี้" :class="detailInputCls" />
            </div>

            <div class="space-y-2">
              <label class="block text-xs font-bold mb-1">5.6 พันธมิตรและการรับรอง</label>
              <div class="grid grid-cols-1 sm:grid-cols-2 gap-2">
                <input v-model="newsDetailForm.sectionTitles.partnerships" type="text" placeholder="ชื่อหัวข้อในสารบัญ เช่น พันธมิตรและการรับรอง" :class="detailInputCls">
                <input v-model="newsDetailForm.sectionTitles.partnershipsSubtitle" type="text" placeholder="ป้ายหัวส่วน เช่น NATIONAL ACCREDITATIONS // ..." :class="detailInputCls">
              </div>
              <div v-for="(part, i) in newsDetailForm.partnerships" :key="i" class="flex items-start gap-2">
                <div class="flex-1 p-3 rounded-2xl border border-current/10 bg-black/[0.02] dark:bg-white/[0.03] space-y-2">
                  <div class="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    <input v-model="part.name" type="text" placeholder="ชื่อหน่วยงาน" :class="detailInputCls">
                    <input v-model="part.role" type="text" placeholder="บทบาท" :class="detailInputCls">
                  </div>
                  <textarea v-model="part.desc" rows="2" placeholder="คำอธิบาย" :class="detailInputCls" />
                </div>
                <div class="flex items-center gap-1 shrink-0">
                    <button type="button" title="เลื่อนขึ้น" class="p-1.5 rounded-lg bg-black/5 dark:bg-white/10 hover:bg-[#00C864]/15 disabled:opacity-30 cursor-pointer" :disabled="i === 0" @click="moveInList(newsDetailForm.partnerships, i, -1)"><ArrowUp class="w-3.5 h-3.5" /></button>
                    <button type="button" title="เลื่อนลง" class="p-1.5 rounded-lg bg-black/5 dark:bg-white/10 hover:bg-[#00C864]/15 disabled:opacity-30 cursor-pointer" :disabled="i === newsDetailForm.partnerships.length - 1" @click="moveInList(newsDetailForm.partnerships, i, 1)"><ArrowDown class="w-3.5 h-3.5" /></button>
                    <button type="button" title="ลบรายการนี้" class="p-1.5 rounded-lg bg-red-500/10 text-red-500 hover:bg-red-500 hover:text-white cursor-pointer" @click="removeFromList(newsDetailForm.partnerships, i)"><Trash2 class="w-3.5 h-3.5" /></button>
                  </div>
              </div>
              <button type="button" class="px-3 py-2 rounded-xl bg-[#00C864]/15 hover:bg-[#00C864] text-[#00A854] dark:text-[#00FF88] hover:text-white text-xs font-bold cursor-pointer inline-flex items-center gap-1.5 transition-all" @click="newsDetailForm.partnerships.push({ name: '', role: '', desc: '' })"><Plus class="w-3.5 h-3.5" />เพิ่มพันธมิตร</button>
            </div>

            <div class="space-y-2">
              <label class="block text-xs font-bold mb-1">5.7 ย่อหน้าเพิ่มเติม (ต่อท้ายเนื้อหา)</label>
              <div v-for="(para, i) in newsDetailForm.extraParagraphs" :key="i" class="flex items-start gap-2">
                <textarea v-model="newsDetailForm.extraParagraphs[i]" rows="3" :placeholder="'ย่อหน้าที่ ' + (i + 1)" :class="detailInputCls" />
                <div class="flex items-center gap-1 shrink-0">
                    <button type="button" title="เลื่อนขึ้น" class="p-1.5 rounded-lg bg-black/5 dark:bg-white/10 hover:bg-[#00C864]/15 disabled:opacity-30 cursor-pointer" :disabled="i === 0" @click="moveInList(newsDetailForm.extraParagraphs, i, -1)"><ArrowUp class="w-3.5 h-3.5" /></button>
                    <button type="button" title="เลื่อนลง" class="p-1.5 rounded-lg bg-black/5 dark:bg-white/10 hover:bg-[#00C864]/15 disabled:opacity-30 cursor-pointer" :disabled="i === newsDetailForm.extraParagraphs.length - 1" @click="moveInList(newsDetailForm.extraParagraphs, i, 1)"><ArrowDown class="w-3.5 h-3.5" /></button>
                    <button type="button" title="ลบรายการนี้" class="p-1.5 rounded-lg bg-red-500/10 text-red-500 hover:bg-red-500 hover:text-white cursor-pointer" @click="removeFromList(newsDetailForm.extraParagraphs, i)"><Trash2 class="w-3.5 h-3.5" /></button>
                  </div>
              </div>
              <button type="button" class="px-3 py-2 rounded-xl bg-[#00C864]/15 hover:bg-[#00C864] text-[#00A854] dark:text-[#00FF88] hover:text-white text-xs font-bold cursor-pointer inline-flex items-center gap-1.5 transition-all" @click="newsDetailForm.extraParagraphs.push('')"><Plus class="w-3.5 h-3.5" />เพิ่มย่อหน้า</button>
            </div>

            <div class="pt-4 border-t border-current/10">
              <h4 class="text-sm font-extrabold text-[#00A854] dark:text-[#00FF88]">6. แผนผังกระบวนการ (ถ้ามี)</h4>
              <p class="text-[11px] opacity-60 mt-0.5">แผนผังพร้อมรูปและขั้นตอน แสดงต่อจากเนื้อหาข่าว (มีหลายแผนผังจะแสดงเป็นแท็บ)</p>
            </div>
            <div class="space-y-3">
              <div v-for="(chart, i) in newsDetailForm.flowcharts" :key="chart.id" class="flex items-start gap-2">
                <div class="flex-1 p-3 rounded-2xl border border-current/10 bg-black/[0.02] dark:bg-white/[0.03] space-y-2">
                  <div class="text-[11px] font-mono font-bold opacity-60">แผนผังที่ {{ i + 1 }}</div>
                  <div class="grid grid-cols-1 sm:grid-cols-3 gap-2">
                    <input v-model="chart.figureNumber" type="text" placeholder="เลขภาพ เช่น ภาพที่ 1" :class="detailInputCls">
                    <input v-model="chart.title" type="text" placeholder="ชื่อแผนผัง (ไทย)" :class="detailInputCls">
                    <input v-model="chart.englishTitle" type="text" placeholder="ชื่อแผนผัง (อังกฤษ)" :class="detailInputCls">
                  </div>
                  <textarea v-model="chart.description" rows="2" placeholder="คำอธิบายแผนผัง" :class="detailInputCls" />
                  <div class="flex items-center gap-3">
                    <div class="w-24 h-16 rounded-lg overflow-hidden bg-black/10 border border-current/15 shrink-0 flex items-center justify-center">
                      <img v-if="chart.image" :src="detailImageSrc(chart.image)" class="w-full h-full object-cover">
                      <ImageIcon v-else class="w-5 h-5 opacity-40" />
                    </div>
                    <div class="flex-1 space-y-1.5">
                      <label class="px-3 py-2 rounded-xl bg-[#00C864]/15 hover:bg-[#00C864] text-[#00A854] hover:text-white text-xs font-bold cursor-pointer inline-flex items-center gap-1.5 transition-all">
                        <Upload class="w-3.5 h-3.5" />
                        <span>{{ uploadingImage ? 'กำลังอัปโหลด...' : 'อัปโหลดรูปแผนผัง' }}</span>
                        <input type="file" accept="image/*" class="hidden" @change="uploadDetailImage($event, url => { chart.image = url })">
                      </label>
                      <input v-model="chart.image" type="text" placeholder="หรือวางที่อยู่รูป เช่น /images/news/xxx.jpg" :class="detailInputCls">
                    </div>
                  </div>
                  <div class="text-xs font-bold pt-1">ขั้นตอน</div>
                  <div v-for="(st, si) in chart.steps" :key="si" class="flex items-start gap-2">
                    <div class="flex-1 p-2.5 rounded-xl border border-current/10 space-y-2">
                      <div class="grid grid-cols-1 sm:grid-cols-4 gap-2">
                        <input v-model="st.code" type="text" placeholder="รหัส" :class="detailInputCls">
                        <input v-model="st.title" type="text" placeholder="ชื่อขั้นตอน" class="sm:col-span-3 w-full px-3.5 py-2.5 rounded-xl bg-white dark:bg-black/50 border border-current/15 text-sm">
                      </div>
                      <textarea v-model="st.description" rows="2" placeholder="คำอธิบายขั้นตอน" :class="detailInputCls" />
                      <div class="grid grid-cols-1 sm:grid-cols-2 gap-2">
                        <input :value="st.inputs.join(', ')" type="text" placeholder="Input (คั่นด้วย ,)" :class="detailInputCls" @change="st.inputs = splitComma(($event.target as HTMLInputElement).value)">
                        <input :value="st.outputs.join(', ')" type="text" placeholder="Output (คั่นด้วย ,)" :class="detailInputCls" @change="st.outputs = splitComma(($event.target as HTMLInputElement).value)">
                      </div>
                    </div>
                    <div class="flex items-center gap-1 shrink-0">
                    <button type="button" title="เลื่อนขึ้น" class="p-1.5 rounded-lg bg-black/5 dark:bg-white/10 hover:bg-[#00C864]/15 disabled:opacity-30 cursor-pointer" :disabled="si === 0" @click="moveInList(chart.steps, si, -1)"><ArrowUp class="w-3.5 h-3.5" /></button>
                    <button type="button" title="เลื่อนลง" class="p-1.5 rounded-lg bg-black/5 dark:bg-white/10 hover:bg-[#00C864]/15 disabled:opacity-30 cursor-pointer" :disabled="si === chart.steps.length - 1" @click="moveInList(chart.steps, si, 1)"><ArrowDown class="w-3.5 h-3.5" /></button>
                    <button type="button" title="ลบรายการนี้" class="p-1.5 rounded-lg bg-red-500/10 text-red-500 hover:bg-red-500 hover:text-white cursor-pointer" @click="removeFromList(chart.steps, si)"><Trash2 class="w-3.5 h-3.5" /></button>
                  </div>
                  </div>
                  <button type="button" class="px-3 py-2 rounded-xl bg-[#00C864]/15 hover:bg-[#00C864] text-[#00A854] dark:text-[#00FF88] hover:text-white text-xs font-bold cursor-pointer inline-flex items-center gap-1.5 transition-all" @click="chart.steps.push(emptyFlowStep(chart.steps.length))"><Plus class="w-3.5 h-3.5" />เพิ่มขั้นตอน</button>
                </div>
                <div class="flex items-center gap-1 shrink-0">
                    <button type="button" title="เลื่อนขึ้น" class="p-1.5 rounded-lg bg-black/5 dark:bg-white/10 hover:bg-[#00C864]/15 disabled:opacity-30 cursor-pointer" :disabled="i === 0" @click="moveInList(newsDetailForm.flowcharts, i, -1)"><ArrowUp class="w-3.5 h-3.5" /></button>
                    <button type="button" title="เลื่อนลง" class="p-1.5 rounded-lg bg-black/5 dark:bg-white/10 hover:bg-[#00C864]/15 disabled:opacity-30 cursor-pointer" :disabled="i === newsDetailForm.flowcharts.length - 1" @click="moveInList(newsDetailForm.flowcharts, i, 1)"><ArrowDown class="w-3.5 h-3.5" /></button>
                    <button type="button" title="ลบรายการนี้" class="p-1.5 rounded-lg bg-red-500/10 text-red-500 hover:bg-red-500 hover:text-white cursor-pointer" @click="removeFromList(newsDetailForm.flowcharts, i)"><Trash2 class="w-3.5 h-3.5" /></button>
                  </div>
              </div>
              <button type="button" class="px-3 py-2 rounded-xl bg-[#00C864]/15 hover:bg-[#00C864] text-[#00A854] dark:text-[#00FF88] hover:text-white text-xs font-bold cursor-pointer inline-flex items-center gap-1.5 transition-all" @click="newsDetailForm.flowcharts.push(emptyFlowchart())"><Plus class="w-3.5 h-3.5" />เพิ่มแผนผัง</button>
            </div>

            <div class="pt-4 border-t border-current/10">
              <h4 class="text-sm font-extrabold text-[#00A854] dark:text-[#00FF88]">7. ผู้เขียน</h4>
              <p class="text-[11px] opacity-60 mt-0.5">การ์ดผู้เขียนท้ายบทความ (ถ้าว่างจะใช้ ทีมประชาสัมพันธ์ IGENCO)</p>
            </div>
            <div class="flex items-center gap-3">
                    <div class="w-24 h-16 rounded-lg overflow-hidden bg-black/10 border border-current/15 shrink-0 flex items-center justify-center">
                      <img v-if="newsDetailForm.author.avatar" :src="detailImageSrc(newsDetailForm.author.avatar)" class="w-full h-full object-cover">
                      <ImageIcon v-else class="w-5 h-5 opacity-40" />
                    </div>
                    <div class="flex-1 space-y-1.5">
                      <label class="px-3 py-2 rounded-xl bg-[#00C864]/15 hover:bg-[#00C864] text-[#00A854] hover:text-white text-xs font-bold cursor-pointer inline-flex items-center gap-1.5 transition-all">
                        <Upload class="w-3.5 h-3.5" />
                        <span>{{ uploadingImage ? 'กำลังอัปโหลด...' : 'อัปโหลดรูปผู้เขียน' }}</span>
                        <input type="file" accept="image/*" class="hidden" @change="uploadDetailImage($event, url => { newsDetailForm.author.avatar = url })">
                      </label>
                      <input v-model="newsDetailForm.author.avatar" type="text" placeholder="หรือวางที่อยู่รูป เช่น /images/news/xxx.jpg" :class="detailInputCls">
                    </div>
                  </div>
            <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div><label class="block text-xs font-bold mb-1">ชื่อผู้เขียน</label><input v-model="newsDetailForm.author.name" type="text" :class="detailInputCls"></div>
              <div><label class="block text-xs font-bold mb-1">ตำแหน่ง</label><input v-model="newsDetailForm.author.role" type="text" :class="detailInputCls"></div>
            </div>
            <div><label class="block text-xs font-bold mb-1">ประวัติย่อ</label><textarea v-model="newsDetailForm.author.bio" rows="2" :class="detailInputCls" /></div>

            <div class="pt-4 border-t border-current/10">
              <h4 class="text-sm font-extrabold text-[#00A854] dark:text-[#00FF88]">8. กล่องข้อความด้านข้าง (CTA)</h4>
              <p class="text-[11px] opacity-60 mt-0.5">กล่องสีเข้มในแถบด้านขวาของหน้าข่าว (ถ้าว่างจะใช้ข้อความเริ่มต้น)</p>
            </div>
            <div><label class="block text-xs font-bold mb-1">หัวข้อ</label><input v-model="newsDetailForm.sidebarCta.title" type="text" placeholder="ต้องการยกระดับมาตรฐานซอฟต์แวร์องค์กร?" :class="detailInputCls"></div>
            <div><label class="block text-xs font-bold mb-1">ข้อความ</label><textarea v-model="newsDetailForm.sidebarCta.text" rows="2" placeholder="IGENCO ให้คำปรึกษาและพัฒนาระบบ..." :class="detailInputCls" /></div>
            <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div><label class="block text-xs font-bold mb-1">ข้อความบนปุ่ม</label><input v-model="newsDetailForm.sidebarCta.buttonLabel" type="text" placeholder="สอบถามเพิ่มเติม" :class="detailInputCls"></div>
              <div><label class="block text-xs font-bold mb-1">ลิงก์ของปุ่ม</label><input v-model="newsDetailForm.sidebarCta.buttonLink" type="text" placeholder="#contact หรือ /contact" :class="detailInputCls"></div>
            </div>
          </div>

          <div class="flex flex-wrap items-center justify-end gap-2 pt-3 border-t border-current/10">
            <button type="button" class="px-4 py-2.5 rounded-xl bg-black/5 dark:bg-white/10 text-xs font-bold cursor-pointer" @click="newsModalOpen = false">ยกเลิก</button>
            <button type="button" :disabled="savingNews" class="px-5 py-2.5 rounded-xl bg-[#00C864] text-[#022C22] font-bold text-xs cursor-pointer shadow-md" @click="saveNews(true)">
              {{ savingNews ? 'กำลังบันทึก...' : 'บันทึกข้อมูล' }}
            </button>
          </div>
        </div>
      </div>
    </Teleport>

    <!-- =========================================================
         MODAL 3: PRODUCT EDITOR
    ========================================================== -->
    <Teleport to="body">
      <div v-if="productModalOpen" class="fixed inset-0 z-[100] bg-black/75 backdrop-blur-lg flex items-center justify-center p-4 overflow-y-auto" @click="productModalOpen = false">
        <div class="max-w-2xl w-full rounded-3xl bg-white dark:bg-[#03150e] border border-[#00C864]/30 shadow-2xl p-6 sm:p-8 space-y-5 my-auto" @click.stop>
          <div class="flex items-center justify-between border-b border-current/10 pb-3">
            <h3 class="text-lg font-extrabold">{{ productForm.documentId ? 'แก้ไขสินค้าและบริการ' : 'เพิ่มสินค้าและบริการใหม่' }}</h3>
            <button type="button" class="p-2 rounded-xl bg-black/5 dark:bg-white/10 cursor-pointer" @click="productModalOpen = false"><X class="w-4 h-4" /></button>
          </div>

          <div class="space-y-4 max-h-[70vh] overflow-y-auto pr-1">
            <div>
              <label class="block text-xs font-bold mb-1.5">รูปภาพสินค้า</label>
              <div class="flex items-center gap-4">
                <div class="w-32 h-20 rounded-xl overflow-hidden bg-black/10 border border-current/15 shrink-0 flex items-center justify-center">
                  <img v-if="productForm.previewUrl" :src="productForm.previewUrl" class="w-full h-full object-cover">
                  <ImageIcon v-else class="w-6 h-6 opacity-40" />
                </div>
                <label class="px-4 py-2.5 rounded-xl bg-[#00C864]/15 hover:bg-[#00C864] text-[#00A854] hover:text-white text-xs font-bold cursor-pointer flex items-center gap-2 transition-all">
                  <Upload class="w-4 h-4" />
                  <span>{{ uploadingImage ? 'กำลังอัปโหลด...' : 'เลือกรูปภาพจากเครื่อง' }}</span>
                  <input type="file" accept="image/*" class="hidden" @change="onProductImageSelect">
                </label>
              </div>
            </div>

            <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label class="block text-xs font-bold mb-1">ชื่อสินค้า / บริการ *</label>
                <input v-model="productForm.name" type="text" placeholder="เช่น Smart Queue Pro" class="w-full px-3.5 py-2.5 rounded-xl bg-white dark:bg-black/50 border border-current/15 text-sm">
              </div>
              <div>
                <label class="block text-xs font-bold mb-1">หมวดหมู่</label>
                <select v-model="productForm.category" class="w-full px-3.5 py-2.5 rounded-xl bg-white dark:bg-black/50 border border-current/15 text-sm">
                  <option value="Enterprise Software">Enterprise Software</option>
                  <option value="Service Development">Service Development</option>
                  <option value="E-Commerce">E-Commerce</option>
                </select>
              </div>
            </div>

            <div>
              <label class="block text-xs font-bold mb-1">คำอธิบายย่อ (แสดงบนการ์ดแคตตาล็อก) *</label>
              <textarea v-model="productForm.shortDesc" rows="2" class="w-full px-3.5 py-2.5 rounded-xl bg-white dark:bg-black/50 border border-current/15 text-sm" />
            </div>

            <div>
              <label class="block text-xs font-bold mb-1">รายละเอียดเต็ม (สำหรับหน้าต่างดูรายละเอียด)</label>
              <textarea v-model="productForm.fullDetails" rows="3" class="w-full px-3.5 py-2.5 rounded-xl bg-white dark:bg-black/50 border border-current/15 text-sm" />
            </div>

            <div>
              <label class="block text-xs font-bold mb-1">จุดเด่น / คุณสมบัติ (บรรทัดละ 1 ข้อ)</label>
              <textarea v-model="productForm.featuresText" rows="3" placeholder="รองรับการใช้งานผ่านเว็บเบราว์เซอร์&#10;เชื่อมต่อฐานข้อมูลองค์กรได้" class="w-full px-3.5 py-2.5 rounded-xl bg-white dark:bg-black/50 border border-current/15 text-sm" />
            </div>
            <p v-if="!productForm.documentId" class="text-xs opacity-75">
              เมื่อกดบันทึกข้อมูล สินค้าจะเผยแพร่ในแคตตาล็อก ปุ่มดูรายละเอียดจะเปิดหน้าต่างข้อมูลสินค้า
            </p>
          </div>

          <div class="flex flex-wrap items-center justify-end gap-2 pt-3 border-t border-current/10">
            <button type="button" class="px-4 py-2.5 rounded-xl bg-black/5 dark:bg-white/10 text-xs font-bold cursor-pointer" @click="productModalOpen = false">ยกเลิก</button>
            <button type="button" :disabled="savingProduct" class="px-5 py-2.5 rounded-xl bg-[#00C864] text-[#022C22] font-bold text-xs cursor-pointer shadow-md" @click="saveProduct(true)">
              {{ savingProduct ? 'กำลังบันทึก...' : 'บันทึกข้อมูล' }}
            </button>
          </div>
        </div>
      </div>
    </Teleport>

  </div>
</template>
