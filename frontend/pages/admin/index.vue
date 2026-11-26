<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
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
  Lock
} from 'lucide-vue-next'
import { useTheme } from '~/composables/useTheme'

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

const fetchCollection = async (uid: string) => {
  const res: any = await $fetch(`/api/admin/collection/${encodeURIComponent(uid)}`, {
    query: { page: 1, pageSize: 100, sort: 'id:desc' }
  })
  return res?.results || res?.data || []
}

const fetchAllCollections = async () => {
  isLoadingData.value = true
  try {
    const [inq, news, prod] = await Promise.all([
      fetchCollection('api::inquiry.inquiry'),
      fetchCollection('api::news-article.news-article'),
      fetchCollection('api::product.product')
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

const filteredInquiries = computed(() => {
  return inquiries.value.filter((item) => {
    const matchStatus = inquiryFilter.value === 'all' || (item.status || 'pending') === inquiryFilter.value
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

const pendingCount = computed(() => inquiries.value.filter(i => (i.status || 'pending') === 'pending').length)

const openInquiryModal = (item: any) => {
  selectedInquiry.value = {
    ...item,
    status: item.status || 'pending',
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
        status: selectedInquiry.value.status,
        adminNote: selectedInquiry.value.adminNote
      }
    })
    showToast('บันทึกสถานะและโน้ตติดตามงานเรียบร้อยแล้ว')
    selectedInquiry.value = null
    inquiries.value = await fetchCollection('api::inquiry.inquiry')
  } catch {
    showToast('เกิดข้อผิดพลาดในการบันทึกข้อมูล')
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
    await refreshFn()
  } catch {
    showToast('ไม่สามารถเปลี่ยนสถานะเผยแพร่ได้')
  }
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
// 5. NEWS EDITOR MODAL
// =========================================================================
const newsModalOpen = ref(false)
const savingNews = ref(false)
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
  } else {
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
      content: newsForm.value.content || newsForm.value.excerpt,
      fallbackImageUrl: newsForm.value.fallbackImageUrl || '/images/news/igenco-iso29110-ceremony.jpg',
      _publish: publish
    }
    if (newsForm.value.coverImageId) {
      payload.coverImage = newsForm.value.coverImageId
    }

    if (newsForm.value.documentId) {
      await $fetch(`/api/admin/collection/${uid}/${newsForm.value.documentId}`, { method: 'PUT', body: payload })
    } else {
      await $fetch(`/api/admin/collection/${uid}`, { method: 'POST', body: payload })
    }
    showToast(publish ? 'บันทึกและเผยแพร่ข่าวขึ้นหน้าเว็บเรียบร้อยแล้ว!' : 'บันทึกฉบับร่างเรียบร้อยแล้ว')
    newsModalOpen.value = false
    newsList.value = await fetchCollection('api::news-article.news-article')
  } catch {
    showToast('เกิดข้อผิดพลาดในการบันทึกข่าว')
  } finally {
    savingNews.value = false
  }
}

// =========================================================================
// 6. PRODUCT EDITOR MODAL
// =========================================================================
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
      await $fetch(`/api/admin/collection/${uid}`, { method: 'POST', body: payload })
    }
    showToast(publish ? 'บันทึกและเผยแพร่สินค้าขึ้นหน้าเว็บเรียบร้อยแล้ว!' : 'บันทึกฉบับร่างเรียบร้อยแล้ว')
    productModalOpen.value = false
    productsList.value = await fetchCollection('api::product.product')
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
  <div class="min-h-screen bg-[#F6F9F7] dark:bg-[#020806] text-[#022C22] dark:text-[#F4FBF7] transition-colors selection:bg-[#00C864] selection:text-[#022C22] relative">
    <!-- Subtle Architectural Grid Background -->
    <div
      class="fixed inset-0 pointer-events-none z-0 opacity-[0.35] dark:opacity-[0.12]"
      style="background-image: linear-gradient(to right, rgba(0, 200, 100, 0.12) 1px, transparent 1px), linear-gradient(to bottom, rgba(0, 200, 100, 0.12) 1px, transparent 1px); background-size: 40px 40px;"
    />

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
                  <span :class="['px-2.5 py-1 rounded-full text-[11px] font-bold border shrink-0', (statusLabels[inq.status || 'pending'] || statusLabels.pending).color]">
                    {{ (statusLabels[inq.status || 'pending'] || statusLabels.pending).label }}
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
                  <span :class="['px-2.5 py-0.5 rounded-full text-[11px] font-bold border', (statusLabels[inq.status || 'pending'] || statusLabels.pending).color]">
                    {{ (statusLabels[inq.status || 'pending'] || statusLabels.pending).label }}
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
             TAB 3: NEWS MANAGEMENT
        ====================================================== -->
        <div v-if="activeTab === 'news'" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <article
            v-for="item in newsList"
            :key="item.id"
            class="rounded-3xl spatial-glass border border-current/10 overflow-hidden flex flex-col justify-between shadow-lg"
          >
            <div>
              <div class="aspect-video bg-black/10 relative overflow-hidden">
                <img :src="resolveImage(item.coverImage, item.fallbackImageUrl)" :alt="item.title" class="w-full h-full object-cover">
                <span
                  :class="[
                    'absolute top-3 right-3 px-2.5 py-1 rounded-full text-[11px] font-bold backdrop-blur-md border',
                    item.publishedAt ? 'bg-[#00C864]/90 text-[#022C22] border-white/30' : 'bg-amber-500/90 text-white border-white/30'
                  ]"
                >
                  {{ item.publishedAt ? 'เผยแพร่แล้ว' : 'ฉบับร่าง (Draft)' }}
                </span>
              </div>
              <div class="p-5 space-y-2">
                <div class="text-[11px] font-mono text-[#00A854] dark:text-[#00FF88] font-bold">
                  {{ item.category }} • {{ item.dateText }}
                </div>
                <h3 class="font-bold text-base line-clamp-2">{{ item.title }}</h3>
                <p class="text-xs opacity-75 line-clamp-2">{{ item.excerpt }}</p>
              </div>
            </div>

            <div class="px-5 py-3.5 border-t border-current/10 flex items-center justify-between gap-2">
              <button
                type="button"
                class="px-3 py-1.5 rounded-lg bg-black/5 dark:bg-white/10 hover:bg-[#00C864]/20 text-xs font-bold cursor-pointer"
                @click="togglePublish('api::news-article.news-article', item, async () => { newsList = await fetchCollection('api::news-article.news-article') })"
              >
                {{ item.publishedAt ? 'ซ่อนชั่วคราว' : 'กดเผยแพร่' }}
              </button>
              <div class="flex items-center gap-1.5">
                <button
                  type="button"
                  class="p-2 rounded-lg bg-[#00C864]/15 hover:bg-[#00C864] text-[#00A854] hover:text-white transition-all cursor-pointer"
                  @click="openNewsModal(item)"
                >
                  <Edit3 class="w-4 h-4" />
                </button>
                <button
                  type="button"
                  class="p-2 rounded-lg bg-red-500/10 hover:bg-red-500 text-red-500 hover:text-white transition-all cursor-pointer"
                  @click="deleteEntry('api::news-article.news-article', item, async () => { newsList = await fetchCollection('api::news-article.news-article') })"
                >
                  <Trash2 class="w-4 h-4" />
                </button>
              </div>
            </div>
          </article>
        </div>

        <!-- =====================================================
             TAB 4: PRODUCTS MANAGEMENT
        ====================================================== -->
        <div v-if="activeTab === 'products'" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <article
            v-for="item in productsList"
            :key="item.id"
            class="rounded-3xl spatial-glass border border-current/10 overflow-hidden flex flex-col justify-between shadow-lg"
          >
            <div>
              <div class="aspect-video bg-black/10 relative overflow-hidden">
                <img :src="resolveImage(item.image, item.fallbackImageUrl)" :alt="item.name" class="w-full h-full object-cover">
                <span
                  :class="[
                    'absolute top-3 right-3 px-2.5 py-1 rounded-full text-[11px] font-bold backdrop-blur-md border',
                    item.publishedAt ? 'bg-[#00C864]/90 text-[#022C22] border-white/30' : 'bg-amber-500/90 text-white border-white/30'
                  ]"
                >
                  {{ item.publishedAt ? 'เผยแพร่แล้ว' : 'ฉบับร่าง' }}
                </span>
              </div>
              <div class="p-5 space-y-1.5">
                <div class="text-[11px] font-mono text-[#00A854] dark:text-[#00FF88] font-bold">
                  {{ item.category }}
                </div>
                <h3 class="font-bold text-base line-clamp-1">{{ item.name }}</h3>
                <p class="text-xs opacity-75 line-clamp-2">{{ item.shortDesc }}</p>
              </div>
            </div>

            <div class="px-5 py-3.5 border-t border-current/10 flex items-center justify-between gap-2">
              <button
                type="button"
                class="px-3 py-1.5 rounded-lg bg-black/5 dark:bg-white/10 hover:bg-[#00C864]/20 text-xs font-bold cursor-pointer"
                @click="togglePublish('api::product.product', item, async () => { productsList = await fetchCollection('api::product.product') })"
              >
                {{ item.publishedAt ? 'ซ่อนชั่วคราว' : 'กดเผยแพร่' }}
              </button>
              <div class="flex items-center gap-1.5">
                <button
                  type="button"
                  class="p-2 rounded-lg bg-[#00C864]/15 hover:bg-[#00C864] text-[#00A854] hover:text-white transition-all cursor-pointer"
                  @click="openProductModal(item)"
                >
                  <Edit3 class="w-4 h-4" />
                </button>
                <button
                  type="button"
                  class="p-2 rounded-lg bg-red-500/10 hover:bg-red-500 text-red-500 hover:text-white transition-all cursor-pointer"
                  @click="deleteEntry('api::product.product', item, async () => { productsList = await fetchCollection('api::product.product') })"
                >
                  <Trash2 class="w-4 h-4" />
                </button>
              </div>
            </div>
          </article>
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
              <select v-model="selectedInquiry.status" class="w-full px-3.5 py-2.5 rounded-xl bg-white dark:bg-black/50 border border-current/15 text-sm">
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
        <div class="max-w-2xl w-full rounded-3xl bg-white dark:bg-[#03150e] border border-[#00C864]/30 shadow-2xl p-6 sm:p-8 space-y-5 my-auto" @click.stop>
          <div class="flex items-center justify-between border-b border-current/10 pb-3">
            <h3 class="text-lg font-extrabold">{{ newsForm.documentId ? 'แก้ไขข่าวสาร' : 'เพิ่มข่าวสารใหม่' }}</h3>
            <button type="button" class="p-2 rounded-xl bg-black/5 dark:bg-white/10 cursor-pointer" @click="newsModalOpen = false"><X class="w-4 h-4" /></button>
          </div>

          <div class="space-y-4 max-h-[70vh] overflow-y-auto pr-1">
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

            <div>
              <label class="block text-xs font-bold mb-1">เนื้อหาข่าวฉบับเต็ม</label>
              <textarea v-model="newsForm.content" rows="4" placeholder="รายละเอียดข่าวทั้งหมด..." class="w-full px-3.5 py-2.5 rounded-xl bg-white dark:bg-black/50 border border-current/15 text-sm" />
            </div>
          </div>

          <div class="flex flex-wrap items-center justify-end gap-2 pt-3 border-t border-current/10">
            <button type="button" :disabled="savingNews" class="px-4 py-2.5 rounded-xl bg-black/5 dark:bg-white/10 text-xs font-bold cursor-pointer" @click="saveNews(false)">บันทึกเป็นฉบับร่าง</button>
            <button type="button" :disabled="savingNews" class="px-5 py-2.5 rounded-xl bg-[#00C864] text-[#022C22] font-bold text-xs cursor-pointer shadow-md" @click="saveNews(true)">
              {{ savingNews ? 'กำลังบันทึก...' : 'บันทึกและเผยแพร่ขึ้นหน้าเว็บทันที' }}
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
              <label class="block text-xs font-bold mb-1">รายละเอียดเต็ม (แสดงในหน้าต่างดูรายละเอียด)</label>
              <textarea v-model="productForm.fullDetails" rows="3" class="w-full px-3.5 py-2.5 rounded-xl bg-white dark:bg-black/50 border border-current/15 text-sm" />
            </div>

            <div>
              <label class="block text-xs font-bold mb-1">จุดเด่น / คุณสมบัติ (บรรทัดละ 1 ข้อ)</label>
              <textarea v-model="productForm.featuresText" rows="3" placeholder="รองรับการใช้งานผ่านเว็บเบราว์เซอร์&#10;เชื่อมต่อฐานข้อมูลองค์กรได้" class="w-full px-3.5 py-2.5 rounded-xl bg-white dark:bg-black/50 border border-current/15 text-sm" />
            </div>
          </div>

          <div class="flex flex-wrap items-center justify-end gap-2 pt-3 border-t border-current/10">
            <button type="button" :disabled="savingProduct" class="px-4 py-2.5 rounded-xl bg-black/5 dark:bg-white/10 text-xs font-bold cursor-pointer" @click="saveProduct(false)">บันทึกเป็นฉบับร่าง</button>
            <button type="button" :disabled="savingProduct" class="px-5 py-2.5 rounded-xl bg-[#00C864] text-[#022C22] font-bold text-xs cursor-pointer shadow-md" @click="saveProduct(true)">
              {{ savingProduct ? 'กำลังบันทึก...' : 'บันทึกและเผยแพร่ขึ้นหน้าเว็บทันที' }}
            </button>
          </div>
        </div>
      </div>
    </Teleport>

  </div>
</template>
