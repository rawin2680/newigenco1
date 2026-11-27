<script setup lang="ts">
import { ref, computed, watch, onMounted, onBeforeUnmount, type Ref } from 'vue'
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
import { newsEditorFields } from '~/shared/newsEditorFields'
import { articleBlocks } from '~/composables/articleBlocks'
import { uploadNewsPhotos } from '~/shared/uploadNewsPhotos'
import { matchesStaticNews, mergeStrapiNews, resolveNewsImage, useNews } from '~/composables/useNews'

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
const draggedItem = ref<any>(null)
const dragOverId = ref<number | null>(null)

const onDragEnd = () => {
  draggedItem.value = null
  dragOverId.value = null
}

const onDrop = async (uid: string, listRef: Ref<any[]>, visibleList: any[], target: any, side: 'before' | 'after') => {
  const dragged = draggedItem.value
  onDragEnd()
  if (!dragged || dragged.id === target.id || reorderingUid.value) return

  const fromVisible = visibleList.findIndex(i => i.id === dragged.id)
  const toVisible = visibleList.findIndex(i => i.id === target.id)
  if (fromVisible < 0 || toVisible < 0) return

  // ย้ายในรายการทั้งหมด: ใช้ตำแหน่งที่แสดงบนป้ายวาง
  const full = listRef.value.filter(i => i.id !== dragged.id)
  const targetIndex = full.findIndex(i => i.id === target.id)
  if (targetIndex < 0) return
  const insertAfter = side === 'after'
  full.splice(targetIndex + Number(insertAfter), 0, dragged)
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

const moveInList = (list: any[], index: number, direction: -1 | 1) => {
  const target = index + direction
  if (target < 0 || target >= list.length) return
  ;[list[index], list[target]] = [list[target], list[index]]
}
const detailImageSrc = (url: string) => resolveNewsImage(url, strapiUrl)

const previewNews = ref(false)
const newsStep = ref<'main' | 'detail'>('main')
const newsCoverError = ref('')
const newsEditorBody = ref<HTMLElement | null>(null)
const { newsList: originalNews } = useNews()
const newsMediaBusy = ref(false)
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
  previewNews.value = false
  newsStep.value = 'main'
  newsCoverError.value = ''
  newsMediaBusy.value = false
  if (item) {
    const source = { ...item, ...newsEditorFields(item), date: item.dateText }
    const original = originalNews.find(news => matchesStaticNews(news, source))
    newsForm.value = {
      documentId: item.documentId || item.id,
      slug: source.slug || '',
      legacyId: source.legacyId || original?.id,
      seoTitle: source.seoTitle || '',
      seoDescription: source.seoDescription || '',
      blocks: JSON.parse(JSON.stringify(articleBlocks(mergeStrapiNews(source, original, 0, undefined, true)))),
      originalDetail: { ...(item.detail || {}) },
      authorName: item.detail?.author?.name || '',
      title: item.title || '',
      category: item.category || 'ข่าวประชาสัมพันธ์',
      dateText: item.dateText || '',
      readTime: item.readTime || '',
      excerpt: item.excerpt || '',
      content: item.content || '',
      coverGallery: Array.isArray(item.detail?.coverGallery) ? [...item.detail.coverGallery] : [],
      coverImageId: item.coverImage?.id || null,
      previewUrl: item.coverImage?.url ? resolveImage(item.coverImage) : item.fallbackImageUrl || '',
      fallbackImageUrl: item.fallbackImageUrl || ''
    }
  } else {
    const todayThai = new Date().toLocaleDateString('th-TH', { day: 'numeric', month: 'long', year: 'numeric' })
    newsForm.value = {
      documentId: null,
      slug: '',
      seoTitle: '',
      seoDescription: '',
      legacyId: undefined,
      blocks: [],
      originalDetail: {},
      authorName: '',
      title: '',
      category: 'ข่าวประชาสัมพันธ์',
      dateText: todayThai,
      readTime: '',
      excerpt: '',
      content: '',
      coverGallery: [],
      coverImageId: null,
      previewUrl: '',
      fallbackImageUrl: ''
    }
  }
  newsModalOpen.value = true
}

function newsDetailPayload() {
  const form = newsForm.value
  return {
    ...form.originalDetail,
    coverGallery: form.coverGallery,
    newsEditor: {
      legacyId: form.legacyId,
      slug: form.slug.trim().toLowerCase() || null,
      seoTitle: form.seoTitle.trim(),
      seoDescription: form.seoDescription.trim(),
      blocks: form.blocks
    },
    author: { ...form.originalDetail?.author, name: form.authorName.trim() }
  }
}

const previewArticle = computed(() => {
  const form = newsForm.value
  const detail = newsDetailPayload()
  const original = originalNews.find(item => item.id === form.legacyId)
  return mergeStrapiNews({
    title: form.title, documentId: form.documentId, slug: form.slug, category: form.category,
    date: form.dateText, readTime: form.readTime, excerpt: form.excerpt, image: form.previewUrl || form.fallbackImageUrl,
    detail, blocks: form.blocks
  }, original, 0, strapiUrl, true)
})

function changeNewsStep(step: 'main' | 'detail') {
  newsStep.value = step
  previewNews.value = false
  newsEditorBody.value?.scrollTo({ top: 0 })
}

async function addNewsCoverPhotos(event: Event) {
  const input = event.target as HTMLInputElement
  const files = Array.from(input.files || [])
  input.value = ''
  if (!files.length || newsMediaBusy.value) return
  const gallery = newsForm.value.coverGallery as string[]
  newsCoverError.value = ''
  newsMediaBusy.value = true
  try {
    const failed = await uploadNewsPhotos(files, photo => gallery.push(photo.url))
    if (failed) newsCoverError.value = 'บางรูปยังไม่ได้เพิ่ม ตรวจสอบชนิดและขนาดไฟล์'
  } finally {
    newsMediaBusy.value = false
  }
}

const onNewsImageSelect = async (e: Event) => {
  const uploaded = await uploadImageFile(e)
  if (uploaded) {
    newsForm.value.coverImageId = uploaded.id
    newsForm.value.previewUrl = uploaded.url.startsWith('http') ? uploaded.url : `${strapiUrl}${uploaded.url}`
  }
}

const saveNews = async (publish: boolean) => {
  if (newsMediaBusy.value || savingNews.value) return
  if (!newsForm.value.title.trim() || !newsForm.value.excerpt.trim()) {
    changeNewsStep('main')
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
      readTime: newsForm.value.readTime || null,
      excerpt: newsForm.value.excerpt,
      fallbackImageUrl: newsForm.value.fallbackImageUrl || null,
      _publish: false
    }
    const detail = newsDetailPayload()
    payload.detail = detail
    if (newsForm.value.coverImageId) {
      payload.coverImage = newsForm.value.coverImageId
    }

    if (newsForm.value.documentId) {
      await $fetch(`/api/admin/collection/${uid}/${newsForm.value.documentId}`, { method: 'PUT', body: payload })
    } else {
      payload.sortOrder = getTopSortOrder(newsList.value)
      const created = await $fetch<{ data?: { documentId: string }; documentId?: string }>(`/api/admin/collection/${uid}`, { method: 'POST', body: payload })
      newsForm.value.documentId = created.data?.documentId || created.documentId

    }
    if (publish) {
      if (!newsForm.value.documentId) throw new Error('Missing news document ID')
      try {
        await $fetch(`/api/admin/collection/${uid}/${newsForm.value.documentId}/publish`, { method: 'POST', body: { action: 'publish' } })
      } catch {
        newsList.value = await fetchCollection('api::news-article.news-article', ORDERED_SORT)
        showToast('บันทึกร่างแล้ว แต่เผยแพร่ไม่สำเร็จ กรุณาลองอีกครั้ง')
        return
      }
    }
    showToast(publish ? 'บันทึกและเผยแพร่ข่าวขึ้นหน้าเว็บเรียบร้อยแล้ว!' : 'บันทึกฉบับร่างเรียบร้อยแล้ว')
    if (publish) notifyContentChanged('api::news-article.news-article')
    newsModalOpen.value = false
    newsList.value = await fetchCollection('api::news-article.news-article', ORDERED_SORT)
  } catch (cause: any) {
    showToast(cause?.data?.statusMessage || 'เกิดข้อผิดพลาดในการบันทึกข่าว')
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
const productPageSize = ref(20)
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

const effectiveProductPageSize = computed(() => productPageSize.value || Math.max(1, filteredProductsList.value.length))
const productTotalPages = computed(() => Math.max(1, Math.ceil(filteredProductsList.value.length / effectiveProductPageSize.value)))

const paginatedProductsList = computed(() => {
  const safePage = Math.min(productPage.value, productTotalPages.value)
  const start = (safePage - 1) * effectiveProductPageSize.value
  return filteredProductsList.value.slice(start, start + effectiveProductPageSize.value)
})

let reorderPointer: { id: number; x: number; y: number; list: 'news' | 'products' } | null = null
const dropSide = ref<'before' | 'after' | null>(null)

const updateDropTarget = () => {
  if (!reorderPointer) return

  const { x, y } = reorderPointer
  const row = document.elementFromPoint(x, y)?.closest<HTMLElement>('[data-reorder-row]')
  const targetId = row ? Number(row.dataset.reorderRow) : null
  if (!row || targetId === draggedItem.value?.id) {
    dragOverId.value = null
    dropSide.value = null
    return
  }

  const bounds = row.getBoundingClientRect()
  dragOverId.value = targetId
  dropSide.value = y < bounds.top + bounds.height / 2 ? 'before' : 'after'
}

const stopPointerDrag = () => {
  if (!reorderPointer) return
  window.removeEventListener('scroll', updateDropTarget)
  window.removeEventListener('blur', cancelPointerDrag)
  reorderPointer = null
  dropSide.value = null
}

const cancelPointerDrag = () => {
  if (!reorderPointer) return
  stopPointerDrag()
  onDragEnd()
}

const startPointerDrag = (event: PointerEvent, item: any, list: 'news' | 'products') => {
  if (!event.isPrimary || event.button !== 0 || reorderingUid.value || reorderPointer) return

  event.preventDefault()
  const handle = event.currentTarget as HTMLElement
  handle.setPointerCapture(event.pointerId)
  reorderPointer = { id: event.pointerId, x: event.clientX, y: event.clientY, list }
  draggedItem.value = item
  window.addEventListener('scroll', updateDropTarget, { passive: true })
  window.addEventListener('blur', cancelPointerDrag)
}

const movePointer = (event: PointerEvent) => {
  if (reorderPointer?.id !== event.pointerId) return
  reorderPointer.x = event.clientX
  reorderPointer.y = event.clientY
  updateDropTarget()
}

const finishPointerDrag = (event: PointerEvent) => {
  if (reorderPointer?.id !== event.pointerId) return
  movePointer(event)
  const { list } = reorderPointer
  const visible = list === 'news' ? paginatedNewsList.value : paginatedProductsList.value
  const uid = list === 'news' ? 'api::news-article.news-article' : 'api::product.product'
  const target = visible.find(item => item.id === dragOverId.value)
  const side = dropSide.value
  stopPointerDrag()
  if (target && side) return onDrop(uid, reorderLists[list], visible, target, side)
  onDragEnd()
}

onBeforeUnmount(cancelPointerDrag)

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
              <span v-else-if="activeTab === 'news'" class="inline-flex items-center gap-2">
                <Newspaper class="size-5 shrink-0 text-emerald-700 dark:text-emerald-300 sm:size-6" aria-hidden="true" />
                จัดการข่าวสารและกิจกรรม
              </span>
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
              :data-reorder-row="item.id"
              class="relative p-3.5 sm:p-4 rounded-2xl spatial-glass border border-current/10 hover:border-[#00C864]/50 transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-4"
              :class="{
                'opacity-40': draggedItem?.id === item.id,
                'ring-2 ring-[#00C864] bg-[#00C864]/10': dragOverId === item.id && draggedItem?.id !== item.id
              }"
            >
              <div
                v-if="dragOverId === item.id && dropSide"
                class="pointer-events-none absolute inset-x-3 z-20 flex h-0.5 justify-center bg-emerald-600 dark:bg-emerald-400"
                :class="dropSide === 'before' ? 'top-0' : 'bottom-0'"
              >
                <span class="-translate-y-1/2 self-start rounded-full bg-emerald-800 px-3 py-1 text-xs font-bold text-white shadow-sm dark:bg-emerald-300 dark:text-emerald-950">
                  {{ dropSide === 'before' ? 'วางด้านบน' : 'วางด้านล่าง' }}
                </span>
              </div>
              <!-- Left: Compact Thumbnail + Center Details -->
              <div class="flex items-start sm:items-center gap-3.5 min-w-0 flex-1">
                <!-- Drag handle: กดค้างแล้วลากเพื่อจัดลำดับ -->
                <div
                  title="กดค้างแล้วลากหรือหมุนลูกเลื่อน จากนั้นปล่อยเพื่อจัดลำดับ"
                  class="hidden sm:flex self-stretch items-center px-0.5 -ml-1 rounded-lg opacity-40 hover:opacity-100 hover:text-[#00A854] dark:hover:text-[#00FF88] transition-all select-none"
                  :class="reorderingUid ? 'cursor-not-allowed' : 'cursor-grab active:cursor-grabbing'"
                  @pointerdown="startPointerDrag($event, item, 'news')"
                  @pointermove="movePointer"
                  @pointerup="finishPointerDrag"
                  @pointercancel="cancelPointerDrag"
                  @lostpointercapture="cancelPointerDrag"
                  @click.stop
                >
                  <GripVertical class="w-4 h-4" />
                </div>
                <span class="grid size-8 shrink-0 place-items-center rounded-lg bg-emerald-500/10 text-sm font-bold tabular-nums text-emerald-800 dark:text-emerald-300" :aria-label="`ลำดับ ${newsList.indexOf(item) + 1}`">
                  {{ newsList.indexOf(item) + 1 }}
                </span>
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
              :data-reorder-row="item.id"
              class="relative p-3.5 sm:p-4 rounded-2xl spatial-glass border border-current/10 hover:border-[#00C864]/50 transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-4"
              :class="{
                'opacity-40': draggedItem?.id === item.id,
                'ring-2 ring-[#00C864] bg-[#00C864]/10': dragOverId === item.id && draggedItem?.id !== item.id
              }"
            >
              <div
                v-if="dragOverId === item.id && dropSide"
                class="pointer-events-none absolute inset-x-3 z-20 flex h-0.5 justify-center bg-emerald-600 dark:bg-emerald-400"
                :class="dropSide === 'before' ? 'top-0' : 'bottom-0'"
              >
                <span class="-translate-y-1/2 self-start rounded-full bg-emerald-800 px-3 py-1 text-xs font-bold text-white shadow-sm dark:bg-emerald-300 dark:text-emerald-950">
                  {{ dropSide === 'before' ? 'วางด้านบน' : 'วางด้านล่าง' }}
                </span>
              </div>
              <!-- Left: Compact Thumbnail + Center Details -->
              <div class="flex items-start sm:items-center gap-3.5 min-w-0 flex-1">
                <!-- Drag handle: กดค้างแล้วลากเพื่อจัดลำดับ -->
                <div
                  title="กดค้างแล้วลากหรือหมุนลูกเลื่อน จากนั้นปล่อยเพื่อจัดลำดับ"
                  class="hidden sm:flex self-stretch items-center px-0.5 -ml-1 rounded-lg opacity-40 hover:opacity-100 hover:text-[#00A854] dark:hover:text-[#00FF88] transition-all select-none"
                  :class="reorderingUid ? 'cursor-not-allowed' : 'cursor-grab active:cursor-grabbing'"
                  @pointerdown="startPointerDrag($event, item, 'products')"
                  @pointermove="movePointer"
                  @pointerup="finishPointerDrag"
                  @pointercancel="cancelPointerDrag"
                  @lostpointercapture="cancelPointerDrag"
                  @click.stop
                >
                  <GripVertical class="w-4 h-4" />
                </div>
                <span class="grid size-8 shrink-0 place-items-center rounded-lg bg-emerald-500/10 text-sm font-bold tabular-nums text-emerald-800 dark:text-emerald-300" :aria-label="`ลำดับ ${productsList.indexOf(item) + 1}`">
                  {{ productsList.indexOf(item) + 1 }}
                </span>
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
                  <option :value="0">ทั้งหมด</option>
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
      <div v-if="newsModalOpen" class="fixed inset-0 z-[100] bg-black/75 backdrop-blur-lg flex items-center justify-center p-4 overflow-y-auto" @click="!newsMediaBusy && !uploadingImage && !savingNews && (newsModalOpen = false)">
        <div :class="previewNews ? 'max-w-[1380px]' : 'max-w-3xl'" class="w-full rounded-3xl bg-white dark:bg-[#03150e] border border-[#00C864]/30 shadow-2xl p-6 sm:p-8 space-y-5 my-auto" @click.stop>
          <div class="flex items-center justify-between border-b border-current/10 pb-3">
            <h3 class="text-lg font-extrabold">{{ newsForm.documentId ? 'แก้ไขข่าวสาร' : 'เพิ่มข่าวสารใหม่' }}</h3>
            <button type="button" class="p-2 rounded-xl bg-black/5 dark:bg-white/10 cursor-pointer" @click="!newsMediaBusy && !uploadingImage && !savingNews && (newsModalOpen = false)"><X class="w-4 h-4" /></button>
          </div>

          <div class="grid grid-cols-2 gap-2 rounded-xl bg-current/5 p-1" aria-label="ส่วนแก้ไขข่าว">
            <button type="button" class="rounded-lg px-3 py-2.5 text-sm font-bold" :aria-pressed="newsStep === 'main'" :class="newsStep === 'main' && 'bg-white shadow-sm dark:bg-white/15'" @click="changeNewsStep('main')">1. ข้อมูลหลัก</button>
            <button type="button" class="rounded-lg px-3 py-2.5 text-sm font-bold" :aria-pressed="newsStep === 'detail'" :class="newsStep === 'detail' && 'bg-white shadow-sm dark:bg-white/15'" @click="changeNewsStep('detail')">2. หน้ารายละเอียด</button>
          </div>
          <div ref="newsEditorBody" data-news-editor-scroll class="max-h-[58vh] overflow-y-auto pr-1">
            <div v-show="newsStep === 'main'" class="space-y-4">
              <label class="block text-xs font-bold">ชื่อผู้เขียน (ไม่บังคับ)
                <input v-model="newsForm.authorName" :class="detailInputCls" maxlength="150" placeholder="ระบุชื่อผู้เขียนข่าว">
              </label>
            <div class="">
              <h4 class="text-sm font-extrabold text-[#00A854] dark:text-[#00FF88]">ข้อมูลที่แสดงบนการ์ดข่าว</h4>
              <p class="text-[11px] opacity-60 mt-0.5">รูปปก หัวข้อ หมวดหมู่ วันที่ และคำโปรย ใช้ทั้งการ์ดหน้าแรกและส่วนหัวของหน้ารายละเอียด</p>
            </div>
            <!-- Cover Image Upload -->
            <div>
              <label class="block text-xs font-bold mb-1.5">รูปปกหลัก</label>
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
              <div class="mt-3 space-y-2 rounded-xl border border-current/10 p-3">
                <div class="flex flex-wrap items-center justify-between gap-2">
                  <div><p class="text-xs font-bold">รูปปกเสริม</p><p class="mt-1 text-xs opacity-70">แสดงต่อจากรูปปกหลักในสไลด์ใต้หัวข่าว</p></div>
                  <label class="cursor-pointer rounded-lg bg-emerald-500/15 px-3 py-2 text-xs font-bold">
                    {{ newsMediaBusy ? 'กำลังอัปโหลด...' : 'เลือกรูปปกเสริมหลายใบ' }}
                    <input type="file" multiple accept="image/jpeg,image/png,image/webp,image/gif" class="sr-only" :disabled="newsMediaBusy" @change="addNewsCoverPhotos">
                  </label>
                </div>
                <p v-if="newsCoverError" role="alert" class="text-xs text-red-600">{{ newsCoverError }}</p>
                <ul v-if="newsForm.coverGallery.length" class="space-y-2">
                  <li v-for="(url, i) in newsForm.coverGallery" :key="i" class="flex items-center gap-2 rounded-lg border border-current/10 p-2">
                    <img :src="detailImageSrc(url)" alt="" class="h-10 w-16 rounded object-cover">
                    <span class="mr-auto text-xs">รูปเสริม {{ i + 1 }}</span>
                    <button type="button" class="px-2 disabled:opacity-40" :disabled="i === 0 || newsMediaBusy" aria-label="เลื่อนรูปขึ้น" @click="moveInList(newsForm.coverGallery, i, -1)">↑</button>
                    <button type="button" class="px-2 disabled:opacity-40" :disabled="i === newsForm.coverGallery.length - 1 || newsMediaBusy" aria-label="เลื่อนรูปลง" @click="moveInList(newsForm.coverGallery, i, 1)">↓</button>
                    <button type="button" class="px-2 text-xs text-red-600" :disabled="newsMediaBusy" @click="newsForm.coverGallery.splice(i, 1)">ลบรูป</button>
                  </li>
                </ul>
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
                <input v-model="newsForm.originalDetail.subtitle" type="text" placeholder="ไม่บังคับ" :class="detailInputCls">
              </div>
            </div>

            <details class="space-y-3 border-t border-current/10 pt-4">
              <summary class="cursor-pointer text-sm font-bold">ตั้งค่า URL และ SEO</summary>
              <label class="block text-xs font-bold">Slug<input v-model="newsForm.slug" :class="detailInputCls" maxlength="100" placeholder="เช่น company-news"></label>
              <label class="block text-xs font-bold">หัวข้อ SEO<input v-model="newsForm.seoTitle" :class="detailInputCls" maxlength="120"></label>
              <label class="block text-xs font-bold">คำอธิบาย SEO<textarea v-model="newsForm.seoDescription" :class="detailInputCls" maxlength="320" rows="2" /></label>
            </details>
            </div>
            <div v-show="newsStep === 'detail'" class="space-y-4">


            <section class="space-y-3 border-t border-current/10 pt-4">
              <NewsBlockEditor v-model="newsForm.blocks" @busy="newsMediaBusy = $event" />
            </section>
            <button type="button" class="rounded-xl border border-current/15 px-3 py-2 text-xs font-bold" :aria-expanded="previewNews" @click="previewNews = !previewNews">{{ previewNews ? 'ซ่อนตัวอย่าง' : 'ดูตัวอย่างหน้าข่าว' }}</button>
            <NewsBlockPreview v-if="previewNews" :article="previewArticle" />

            </div>
          </div>

          <div class="flex flex-wrap items-center justify-end gap-2 pt-3 border-t border-current/10">
            <button type="button" class="px-4 py-2.5 rounded-xl bg-black/5 dark:bg-white/10 text-xs font-bold cursor-pointer" @click="newsModalOpen = false">ยกเลิก</button>
            <button v-if="newsStep === 'main'" type="button" class="rounded-xl bg-[#00C864] px-4 py-2.5 text-xs font-bold text-[#022C22]" @click="changeNewsStep('detail')">ถัดไป · หน้ารายละเอียด →</button>
            <button v-if="newsStep === 'detail'" type="button" :disabled="savingNews || newsMediaBusy || uploadingImage" class="px-4 py-2.5 rounded-xl border border-current/15 text-xs font-bold" @click="saveNews(false)">บันทึกฉบับร่าง</button>
            <button v-if="newsStep === 'detail'" type="button" :disabled="savingNews || newsMediaBusy || uploadingImage" class="px-5 py-2.5 rounded-xl bg-[#00C864] text-[#022C22] font-bold text-xs cursor-pointer shadow-md" @click="saveNews(true)">
              {{ savingNews ? 'กำลังบันทึก...' : 'บันทึกและเผยแพร่' }}
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
