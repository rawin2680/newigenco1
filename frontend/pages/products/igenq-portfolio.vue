<script setup lang="ts">
import { ref, computed } from 'vue'
import AppHeader from '~/components/AppHeader.vue'
import ContactFooter from '~/components/ContactFooter.vue'
import {
  ArrowLeft,
  ArrowUpRight,
  Sparkles,
  Trophy,
  Building2,
  CheckCircle2,
  ZoomIn,
  ChevronRight,
  X,
  ExternalLink,
  Clock,
  Phone,
  Mail,
  Layers,
  MapPin,
  Award,
  ShieldCheck,
  Search,
  Download,
  FileText,
  Monitor,
  SlidersHorizontal
} from 'lucide-vue-next'
import { useTheme } from '~/composables/useTheme'

const { showToast } = useTheme()

useHead({
  title: 'ผลงานและความสำเร็จของ iGenQ (Case Studies & Portfolio) - บริษัท ไอเจนโก้ จำกัด',
  meta: [
    {
      name: 'description',
      content: 'รวมผลงานและความสำเร็จการติดตั้งระบบบริหารคิวอัจฉริยะ iGenQ ในหน่วยงานราชการ โรงพยาบาล และองค์กรเอกชนชั้นนำทั่วประเทศ โดย บริษัท ไอเจนโก้ จำกัด'
    }
  ]
})

// Lightbox modal (for full-screen image zoom)
const lightboxImage = ref<{ url: string; title: string; subtitle?: string } | null>(null)
const openLightbox = (url: string, title: string, subtitle?: string) => {
  lightboxImage.value = { url, title, subtitle }
  if (import.meta.client) {
    document.body.style.overflow = 'hidden'
  }
}
const closeLightbox = () => {
  lightboxImage.value = null
  if (import.meta.client) {
    document.body.style.overflow = ''
  }
}

// Quick-View Modal for Case Studies
interface PortfolioItem {
  id: number
  title: string
  clientName: string
  category: string
  location: string
  servicePoints: string
  queueMode: string
  image: string
  highlight: string
  description: string
  results: string[]
  tags: string[]
}

const quickViewItem = ref<PortfolioItem | null>(null)
const openQuickView = (item: PortfolioItem) => {
  quickViewItem.value = item
  if (import.meta.client) {
    document.body.style.overflow = 'hidden'
  }
}
const closeQuickView = () => {
  quickViewItem.value = null
  if (import.meta.client) {
    document.body.style.overflow = ''
  }
}

// Category filter pills & Instant Search
const activeCategory = ref('ทั้งหมด')
const searchQuery = ref('')
const categories = ['ทั้งหมด', 'หน่วยงานราชการ', 'โรงพยาบาล', 'องค์กรเอกชน']

const portfolioList = ref<PortfolioItem[]>([
  {
    id: 1,
    title: 'ระบบบริหารคิวงานทะเบียนราษฎร์และบริการประชาชน',
    clientName: 'ที่ว่าการอำเภอสัตหีบ จังหวัดชลบุรี',
    category: 'หน่วยงานราชการ',
    location: 'อำเภอสัตหีบ จังหวัดชลบุรี',
    servicePoints: 'เคาน์เตอร์บริการงานทะเบียน & บัตรประจำตัวประชาชน (8+ ช่องบริการ)',
    queueMode: 'ตู้กดบัตรคิว Kiosk + จอแสดงผล LED/TV + เสียงเรียกคิวอัตโนมัติ',
    image: '/images/products/client-sattahip.svg',
    highlight: 'จัดระเบียบการเข้ารับบริการประชาชน ลดความแออัดหน้าเคาน์เตอร์อย่างเป็นระบบ',
    description: 'ติดตั้งระบบบริหารคิวอัจฉริยะ iGenQ ณ ที่ว่าการอำเภอสัตหีบ จังหวัดชลบุรี เพื่อบริหารจัดการคิวประชาชนที่มาติดต่อทำบัตรประชาชน ทะเบียนบ้าน และงานทะเบียนราษฎร์ ช่วยลดความสับสนและเพิ่มความรวดเร็วในการให้บริการ',
    results: [
      'แยกประเภทคิวตามลักษณะงานได้อย่างชัดเจน (บัตรประชาชน, ทะเบียนราษฎร์, หนังสือรับรอง)',
      'มีหน้าจอแสดงผลลำดับคิวชัดเจนทั่วพื้นที่พักคอย พร้อมเสียงประกาศเรียกคิว',
      'บันทึกสถิติจำนวนผู้รับบริการและเวลาเฉลี่ยต่อรายสำหรับผู้บริหาร'
    ],
    tags: ['หน่วยงานราชการ', 'อำเภอสัตหีบ', 'Smart Queue', 'Government']
  },
  {
    id: 2,
    title: 'ระบบลงทะเบียนคิวออนไลน์ & ตู้กดบัตรคิว Touch Screen (OSS)',
    clientName: 'ศูนย์บริการภาครัฐจังหวัดจันทบุรี (OSS)',
    category: 'หน่วยงานราชการ',
    location: 'ศาลากลางจังหวัดจันทบุรี ถ.เลียบเนิน',
    servicePoints: 'ครอบคลุม 8 หน่วยงานราชการบริการร่วม (One Stop Service)',
    queueMode: 'Touch Screen Kiosk + คิวออนไลน์ + เชื่อมโยงระบบบริการ 8 หน่วยงาน',
    image: '/images/products/igenq-cert-chanthaburi.jpg',
    highlight: 'ได้รับหนังสือรับรองผลงานอย่างเป็นทางการ (ที่ จบ ๐๐๑๗.๓/๒๑๐) ลงนามแทนผู้ว่าฯ',
    description: 'บริษัท ไอเจนโก้ จำกัด ได้รับจ้างทำเครื่องกดบัตรคิวแบบ Touch Screen พร้อมพัฒนาระบบโปรแกรมสำเร็จรูป ระบบจัดการลงทะเบียนรับบัตรคิวออนไลน์ ตามสัญญาซื้อขายเลขที่ ๔๘/๒๕๖๕ ครอบคลุม 8 หน่วยงานหลักของจังหวัดจันทบุรี',
    results: [
      'ได้รับหนังสือรับรองผลงานอย่างเป็นทางการ ให้ไว้ ณ วันที่ ๒๖ กันยายน ๒๕๖๖',
      'เชื่อมโยงบริการ 8 หน่วยงาน: อำเภอ...ยิ้ม, การไฟฟ้า, การประปา, ไปรษณีย์, ขนส่ง, NT, แรงงาน และศูนย์ดำรงธรรม',
      'ระบบทำงานเสถียรและใช้งานอย่างมีประสิทธิภาพต่อเนื่องมาจนถึงปัจจุบัน'
    ],
    tags: ['หนังสือรับรองผลงาน', 'ศาลากลางจังหวัดจันทบุรี', 'OSS', '8 หน่วยงานรัฐ']
  },
  {
    id: 3,
    title: 'ระบบบริหารคิวรถขนส่งและผู้ติดต่อคลังสินค้าขนาดใหญ่',
    clientName: 'บริษัท เพอร์เฟค คอมพาเนียน กรุ๊ป จำกัด (PCG)',
    category: 'องค์กรเอกชน',
    location: 'สมุทรปราการ (คลังสินค้าและโรงงาน)',
    servicePoints: 'ประตูทางเข้าโรงงาน จุดชั่งน้ำหนัก และท่าเทียบรถโหลดสินค้า (Loading Docks)',
    queueMode: 'Mobile QR e-Ticket + LINE Notify แจ้งเรียกเข้าท่าเทียบรถ',
    image: '/images/products/client-pcg.svg',
    highlight: 'จัดการคิวรถบรรทุกและซัพพลายเออร์บนพื้นที่โรงงานขนาดใหญ่กว่า 100 ไร่',
    description: 'นำระบบ iGenQ มาประยุกต์ใช้จัดระเบียบคิวรถขนส่งสินค้าและผู้ติดต่อคลังสินค้า พนักงานขับรถสแกนรับบัตรคิวผ่านสมาร์ทโฟน รอในจุดพักคอยและรับการแจ้งเตือนผ่าน LINE เมื่อถึงคิวเข้าเทียบท่าโหลดสินค้า',
    results: [
      'ลดปัญหาการจราจรติดขัดบริเวณประตูทางเข้าและลานจอดรถบรรทุก',
      'ติดตามสถานะคิวรถเข้า-ออกและระยะเวลาเทียบท่าโหลดได้อย่างแม่นยำ',
      'เก็บบันทึกข้อมูลสถิติ Log การดำเนินงานแบบเรียลไทม์ตลอด 24 ชั่วโมง'
    ],
    tags: ['PCG', 'Logistics Queue', 'Truck Management', 'LINE Notify']
  },
  {
    id: 4,
    title: 'ระบบบริหารคิวผู้ป่วยนอกและแผนกตรวจสุขภาพ (OPD)',
    clientName: 'โรงพยาบาลซีจีเอช (CGH Hospital)',
    category: 'โรงพยาบาล',
    location: 'กรุงเทพมหานคร',
    servicePoints: 'แผนกผู้ป่วยนอก (OPD), ห้องตรวจ, แผนกตรวจสุขภาพ และจุดรับยา',
    queueMode: 'e-Ticket บนมือถือ + LINE แจ้งเตือนก่อนถึงคิว + จอ Android TV',
    image: '/images/products/client-cgh.svg',
    highlight: 'ลดเวลารอคอยและลดความแออัดในพื้นที่พักคอยโรงพยาบาลกว่า 45%',
    description: 'ติดตั้งระบบคิวอัจฉริยะ iGenQ สำหรับโรงพยาบาล เพื่อยกระดับประสบการณ์ผู้รับบริการ ผู้ป่วยสามารถสแกน QR Code ติดตามจำนวนคิวรอผ่านสมาร์ทโฟนและรับการแจ้งเตือนผ่าน LINE เมื่อใกล้ถึงลำดับตรวจ',
    results: [
      'ลดความแออัดในโถงพักคอยผู้ป่วยนอกได้อย่างมีประสิทธิภาพ (New Normal)',
      'แจ้งเตือนผู้รับบริการล่วงหน้า 3 ลำดับผ่านระบบ LINE โดยอัตโนมัติ',
      'เชื่อมต่อหน้าจอ Android TV แสดงผลคิวตามห้องตรวจแบบเรียลไทม์'
    ],
    tags: ['CGH Hospital', 'OPD Queue', 'Healthcare', 'LINE Notify']
  },
  {
    id: 5,
    title: 'ระบบจัดการคิวหน้าร้านสาขาและเครื่องดื่มชานมไข่มุก',
    clientName: 'โนบิชา (NOBI CHA) สาขา บิ๊กซี ติวานนท์',
    category: 'องค์กรเอกชน',
    location: 'นนทบุรี',
    servicePoints: 'เคาน์เตอร์สั่งเครื่องดื่มและจุดรับสินค้าหน้าร้าน',
    queueMode: 'QR Scan e-Ticket + เสียงเรียกคิวผ่านลำโพง Bluetooth & จอแสดงผล',
    image: '/images/products/igenq-poster-2.jpg',
    highlight: 'จัดการคิวช่วงชั่วโมงเร่งด่วน ลูกค้าเดินช้อปปิ้งรอได้อย่างสะดวกสบาย',
    description: 'แก้ปัญหาลูกค้ายืนรอแออัดหน้าร้านในห้างสรรพสินค้าช่วงพีค ลูกค้าสแกนรับบัตรคิวผ่านสมาร์ทโฟน พร้อมระบบเสียงประกาศเรียกคิวอัตโนมัติผ่านลำโพงบลูทูธและจอทีวีหน้าร้าน',
    results: [
      'ลูกค้าไม่ต้องยืนรอหน้าร้าน สามารถเดินซื้อของรอในห้างสรรพสินค้าได้',
      'ลดภาระพนักงานในการตะโกนเรียกคิว เสียงประกาศชัดเจนแม่นยำ',
      'เพิ่มอัตราการหมุนเวียนลูกค้าและยอดขายในช่วงเวลาเร่งด่วนกว่า 20%'
    ],
    tags: ['NOBI CHA', 'Franchise Queue', 'Bluetooth Audio', 'e-Ticket']
  }
])

// Real-time Filtered List (Category + Instant Search)
const filteredPortfolio = computed(() => {
  return portfolioList.value.filter((item) => {
    const matchCategory = activeCategory.value === 'ทั้งหมด' || item.category === activeCategory.value
    const q = searchQuery.value.trim().toLowerCase()
    if (!q) return matchCategory

    const matchSearch =
      item.clientName.toLowerCase().includes(q) ||
      item.title.toLowerCase().includes(q) ||
      item.location.toLowerCase().includes(q) ||
      item.description.toLowerCase().includes(q) ||
      item.tags.some(t => t.toLowerCase().includes(q))

    return matchCategory && matchSearch
  })
})

// Cursor Spotlight Border Effect per card
const cardSpotlights = ref<Record<number, { x: number; y: number; active: boolean }>>({})

const handleCardMouseMove = (e: MouseEvent, id: number) => {
  const el = e.currentTarget as HTMLElement
  if (!el) return
  const rect = el.getBoundingClientRect()
  cardSpotlights.value[id] = {
    x: e.clientX - rect.left,
    y: e.clientY - rect.top,
    active: true
  }
}

const handleCardMouseLeave = (id: number) => {
  if (cardSpotlights.value[id]) {
    cardSpotlights.value[id].active = false
  }
}

const getCardSpotlightStyle = (id: number) => {
  const spot = cardSpotlights.value[id]
  if (!spot || !spot.active) return {}
  return {
    background: `radial-gradient(450px circle at ${spot.x}px ${spot.y}px, rgba(0, 200, 100, 0.14), transparent 70%)`
  }
}

// Quick stats
const stats = [
  { label: 'จุดบริการที่ไว้วางใจ', value: '100+ จุด', sub: 'ทั่วประเทศในหลากหลายธุรกิจ' },
  { label: 'ยอดออกคิวสะสม', value: '2,500,000+', sub: 'คิวบริการที่บริหารจัดการสำเร็จ' },
  { label: 'ลดเวลารอเฉลี่ย', value: 'ลดลง 40%', sub: 'เพิ่มความพึงพอใจให้ลูกค้า' },
  { label: 'ความพึงพอใจเฉลี่ย', value: '98.5%', sub: 'จากการประเมินผลผ่าน e-Ticket' }
]
</script>

<template>
  <div class="min-h-screen relative selection:bg-[#00C864] selection:text-[#022C22] flex flex-col justify-between bg-[#F6F9F7] dark:bg-[#020806] text-slate-800 dark:text-slate-100">
    
    <!-- Subtle Architectural Grid Background (Matches Homepage Design System) -->
    <div
      class="fixed inset-0 pointer-events-none z-0 opacity-[0.35] dark:opacity-[0.12]"
      style="background-image: linear-gradient(to right, rgba(0, 200, 100, 0.12) 1px, transparent 1px), linear-gradient(to bottom, rgba(0, 200, 100, 0.12) 1px, transparent 1px); background-size: 40px 40px;"
    />

    <!-- 1. Header Navigation -->
    <AppHeader />

    <!-- 2. Main Page Content -->
    <main class="pt-28 pb-20 px-5 sm:px-10 lg:px-16 max-w-[1440px] mx-auto w-full flex-1 relative z-10 space-y-16 sm:space-y-20">
      
      <!-- Top Breadcrumbs & Back Link -->
      <div class="flex items-center justify-between gap-4 border-b border-current/10 pb-4">
        <NuxtLink
          to="/products/igenq"
          class="inline-flex items-center gap-2 text-xs sm:text-sm font-bold font-mono text-[#00A854] dark:text-[#00FF88] hover:underline group"
        >
          <ArrowLeft class="w-4 h-4 group-hover:-translate-x-1.5 transition-transform" />
          <span>ย้อนกลับไปหน้าระบบ iGenQ</span>
        </NuxtLink>

        <div class="hidden sm:flex items-center gap-2 text-xs font-mono opacity-60">
          <NuxtLink to="/" class="hover:text-[#00C864]">หน้าแรก</NuxtLink>
          <ChevronRight class="w-3.5 h-3.5" />
          <span>ผลิตภัณฑ์</span>
          <ChevronRight class="w-3.5 h-3.5" />
          <NuxtLink to="/products/igenq" class="hover:text-[#00C864]">iGenQ</NuxtLink>
          <ChevronRight class="w-3.5 h-3.5" />
          <span class="text-[#00A854] dark:text-[#00FF88] font-bold">ผลงานและความสำเร็จ</span>
        </div>
      </div>

      <!-- ========================================================
           1. STANDARDIZED SECTION HEADER (CASE STUDIES // ผลงานของเรา)
      ========================================================= -->
      <section class="space-y-6">
        <div class="flex flex-wrap items-center gap-2.5">
          <span class="px-3.5 py-1 rounded-full text-xs font-mono font-bold bg-[#00C864]/15 text-[#00A854] dark:bg-[#00FF88]/15 dark:text-[#00FF88] border border-[#00C864]/30 flex items-center gap-1.5">
            <Trophy class="w-3.5 h-3.5" />
            <span>CASE STUDIES // ผลงานของเรา</span>
          </span>
          <span class="px-3.5 py-1 rounded-full text-xs font-mono font-bold bg-emerald-500/10 text-emerald-700 dark:text-emerald-300 border border-emerald-500/20">
            VERIFIED DEPLOYMENTS
          </span>
        </div>

        <div class="max-w-4xl space-y-4">
          <h1 class="font-display font-extrabold text-3xl sm:text-5xl lg:text-6xl tracking-tight leading-[1.12] text-[#022C22] dark:text-white">
            ผลงานและความสำเร็จของ <span class="text-[#00C864] dark:text-[#00FF88]">iGenQ</span>
          </h1>
          <p class="text-sm sm:text-base opacity-80 leading-relaxed text-slate-700 dark:text-slate-300 max-w-3xl">
            รวมเคสตัวอย่างการติดตั้งระบบบริหารคิวอัจฉริยะ iGenQ ที่ใช้งานจริงในหน่วยงานราชการ โรงพยาบาล และองค์กรธุรกิจชั้นนำ ช่วยยกระดับการบริการ ลดความแออัด และสร้างความประทับใจให้ผู้รับบริการ
          </p>
        </div>

        <!-- Quick Stats Ribbon -->
        <div class="grid grid-cols-2 md:grid-cols-4 gap-4 pt-4">
          <div
            v-for="(st, idx) in stats"
            :key="idx"
            class="p-5 rounded-2xl spatial-glass border border-[#00C864]/20 flex flex-col justify-between space-y-1.5 hover:border-[#00C864] transition-all hover:-translate-y-1"
          >
            <div class="text-[11px] font-mono uppercase tracking-wider opacity-60">
              {{ st.label }}
            </div>
            <div class="text-xl sm:text-3xl font-black font-display text-[#00A854] dark:text-[#00FF88]">
              {{ st.value }}
            </div>
            <div class="text-xs opacity-75">
              {{ st.sub }}
            </div>
          </div>
        </div>
      </section>

      <!-- ========================================================
           2. SLIDING GLASS PILLS & INSTANT SEARCH BAR
      ========================================================= -->
      <section class="space-y-8">
        <div class="p-4 sm:p-5 rounded-3xl spatial-glass border border-[#00C864]/20 shadow-lg flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          
          <!-- Sliding Glass Capsule Pills -->
          <div class="flex flex-wrap items-center gap-1.5 p-1 rounded-2xl bg-black/[0.04] dark:bg-white/[0.05] border border-current/10">
            <button
              v-for="cat in categories"
              :key="cat"
              type="button"
              :class="[
                'px-4 py-2 rounded-xl text-xs font-bold transition-all duration-200 cursor-pointer flex items-center gap-1.5',
                activeCategory === cat
                  ? 'bg-[#00C864] text-[#022C22] dark:bg-[#00FF88] dark:text-[#020806] shadow-md scale-[1.02]'
                  : 'text-[#022C22]/75 dark:text-slate-300 hover:text-[#00A854] dark:hover:text-[#00FF88] hover:bg-white/50 dark:hover:bg-white/5'
              ]"
              @click="activeCategory = cat"
            >
              <span>{{ cat }}</span>
            </button>
          </div>

          <!-- Instant Search Input -->
          <div class="relative w-full lg:w-80">
            <Search class="w-4 h-4 text-[#00C864] dark:text-[#00FF88] absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              v-model="searchQuery"
              type="text"
              placeholder="ค้นหาชื่อหน่วยงาน, จังหวัด, หรือแท็ก..."
              class="w-full pl-10 pr-9 py-2.5 rounded-2xl bg-white/80 dark:bg-black/50 border border-current/15 text-xs sm:text-sm focus:outline-none focus:border-[#00C864] dark:focus:border-[#00FF88] focus:ring-2 focus:ring-[#00C864]/20 transition-all text-[#022C22] dark:text-white placeholder:opacity-50"
            >
            <button
              v-if="searchQuery"
              type="button"
              aria-label="Clear search"
              class="absolute right-3 top-1/2 -translate-y-1/2 p-0.5 rounded-full hover:bg-black/10 dark:hover:bg-white/10 opacity-60 hover:opacity-100 cursor-pointer"
              @click="searchQuery = ''"
            >
              <X class="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        <!-- Result Count Indicator -->
        <div class="flex items-center justify-between text-xs font-mono opacity-65 px-2">
          <div class="flex items-center gap-2">
            <SlidersHorizontal class="w-3.5 h-3.5 text-[#00C864]" />
            <span>แสดงผลงาน <strong class="text-[#00A854] dark:text-[#00FF88]">{{ filteredPortfolio.length }}</strong> จากทั้งหมด {{ portfolioList.length }} รายการ</span>
          </div>
          <span v-if="activeCategory !== 'ทั้งหมด' || searchQuery" class="cursor-pointer hover:underline text-[#00C864]" @click="activeCategory = 'ทั้งหมด'; searchQuery = ''">
            ล้างตัวกรอง
          </span>
        </div>

        <!-- ========================================================
             3. GLASSMORPHIC CASE STUDY CARDS WITH FLIP SHUFFLE & SPOTLIGHT
        ========================================================= -->
        <TransitionGroup
          name="portfolio-shuffle"
          tag="div"
          class="grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch relative"
        >
          <article
            v-for="item in filteredPortfolio"
            :key="item.id"
            class="relative rounded-[2rem] spatial-glass border border-[#00C864]/20 shadow-xl flex flex-col justify-between overflow-hidden group transition-all duration-300 hover:-translate-y-1.5 hover:border-[#00C864]/60 hover:shadow-2xl"
            @mousemove="handleCardMouseMove($event, item.id)"
            @mouseleave="handleCardMouseLeave(item.id)"
          >
            <!-- Cursor Spotlight Border Overlay -->
            <div
              class="pointer-events-none absolute inset-0 transition-opacity duration-300 z-0"
              :style="getCardSpotlightStyle(item.id)"
            />

            <div class="p-6 sm:p-8 space-y-5 relative z-10 flex-1 flex flex-col">
              <!-- Top Badges -->
              <div class="flex flex-wrap items-center justify-between gap-2">
                <span class="px-3 py-1 rounded-full text-xs font-mono font-bold bg-[#00C864]/15 text-[#00A854] dark:bg-[#00FF88]/15 dark:text-[#00FF88] border border-[#00C864]/30">
                  {{ item.category }}
                </span>
                <span class="text-xs font-mono opacity-65 flex items-center gap-1">
                  <MapPin class="w-3.5 h-3.5 text-[#00C864]" />
                  {{ item.location }}
                </span>
              </div>

              <!-- Smart Image & Logo Container (16:9 Aspect Video + Mint Glass Framing) -->
              <div
                class="relative aspect-video rounded-2xl overflow-hidden border border-[#00C864]/20 bg-gradient-to-br from-[#F0FDF4] via-[#ECFDF5] to-[#D1FAE5]/60 dark:from-[#022C22]/50 dark:to-[#041E16] cursor-pointer group/img shadow-inner flex items-center justify-center p-2"
                @click="openQuickView(item)"
              >
                <img
                  :src="item.image"
                  :alt="item.clientName"
                  class="w-full h-full object-contain rounded-xl group-hover/img:scale-[1.03] transition-transform duration-500"
                >
                <div class="absolute bottom-2.5 right-2.5 px-2.5 py-1 rounded-lg bg-black/70 text-white text-[11px] font-mono flex items-center gap-1 backdrop-blur-md opacity-85 group-hover/img:opacity-100 transition-opacity border border-white/15">
                  <ZoomIn class="w-3 h-3 text-[#00FF88]" />
                  <span>ดูรายละเอียด</span>
                </div>
              </div>

              <!-- Client Name & Title -->
              <div>
                <h3 class="text-xl sm:text-2xl font-bold font-display text-[#022C22] dark:text-white leading-snug group-hover:text-[#00A854] dark:group-hover:text-[#00FF88] transition-colors">
                  {{ item.clientName }}
                </h3>
                <div class="text-xs sm:text-sm font-semibold opacity-75 mt-1">
                  {{ item.title }}
                </div>
              </div>

              <!-- Highlight Pill -->
              <div class="p-3.5 rounded-2xl bg-[#00C864]/10 border border-[#00C864]/25 text-xs font-bold text-[#008C44] dark:text-[#00FF88] flex items-start gap-2">
                <Sparkles class="w-4 h-4 text-[#00C864] shrink-0 mt-0.5" />
                <span>{{ item.highlight }}</span>
              </div>

              <!-- Description -->
              <p class="text-xs sm:text-sm opacity-80 leading-relaxed line-clamp-3">
                {{ item.description }}
              </p>

              <!-- Tags & Quick View Button -->
              <div class="pt-4 mt-auto border-t border-current/10 flex flex-wrap items-center justify-between gap-3">
                <div class="flex flex-wrap items-center gap-1.5">
                  <span
                    v-for="tag in item.tags.slice(0, 3)"
                    :key="tag"
                    class="px-2.5 py-0.5 rounded-lg text-[10px] font-mono bg-current/5 border border-current/10 opacity-70"
                  >
                    #{{ tag }}
                  </span>
                </div>

                <!-- Minimalist Interactive Quick-View Button -->
                <button
                  type="button"
                  class="px-4 py-2 rounded-xl bg-[#00C864]/15 hover:bg-[#00C864] text-[#00A854] dark:text-[#00FF88] hover:text-white dark:hover:text-[#020806] font-bold text-xs transition-all flex items-center gap-1.5 cursor-pointer border border-[#00C864]/30 hover:shadow-md"
                  @click="openQuickView(item)"
                >
                  <span>ดูรายละเอียดเพิ่มเติม</span>
                  <ArrowUpRight class="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </article>
        </TransitionGroup>

        <!-- Empty Search State -->
        <div
          v-if="filteredPortfolio.length === 0"
          class="p-12 rounded-3xl spatial-glass border border-current/10 text-center space-y-3"
        >
          <Search class="w-10 h-10 text-[#00C864] mx-auto opacity-50" />
          <h3 class="text-lg font-bold">ไม่พบข้อมูลผลงานที่ตรงกับคำค้นหา</h3>
          <p class="text-xs opacity-70">ลองเปลี่ยนคำค้นหา หรือเลือกดูในหมวดหมู่ "ทั้งหมด"</p>
          <button
            type="button"
            class="px-4 py-2 rounded-xl bg-[#00C864] text-white text-xs font-bold cursor-pointer"
            @click="activeCategory = 'ทั้งหมด'; searchQuery = ''"
          >
            แสดงผลงานทั้งหมด
          </button>
        </div>
      </section>

      <!-- ========================================================
           4. OFFICIAL GOVERNMENT ENDORSEMENT SPOTLIGHT (CHANTHABURI)
      ========================================================= -->
      <section class="p-6 sm:p-10 lg:p-12 rounded-[2.5rem] spatial-glass border-2 border-[#00C864]/30 shadow-2xl space-y-8 relative overflow-hidden">
        
        <div class="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-current/10 pb-6">
          <div class="space-y-2">
            <div class="flex flex-wrap items-center gap-2">
              <span class="px-3 py-1 rounded-full text-xs font-mono font-bold bg-amber-500/20 text-amber-600 dark:text-amber-400 border border-amber-500/30 flex items-center gap-1.5">
                <Award class="w-3.5 h-3.5" />
                <span>OFFICIAL PERFORMANCE CERTIFICATE // หนังสือรับรองผลงานทางการ</span>
              </span>
              <span class="px-3 py-1 rounded-full text-xs font-mono font-bold bg-[#00C864]/20 text-[#00A854] dark:text-[#00FF88] border border-[#00C864]/30">
                เอกสารราชการรับรอง 100%
              </span>
            </div>
            <h2 class="text-2xl sm:text-4xl font-black font-display text-[#022C22] dark:text-white">
              หนังสือรับรองผลงานจาก ศาลากลางจังหวัดจันทบุรี
            </h2>
            <p class="text-xs sm:text-sm opacity-80 max-w-2xl">
              เอกสารรับรองอย่างเป็นทางการ ยืนยันการส่งมอบและปฏิบัติงานติดตั้งระบบคิว iGenQ และเครื่องกดบัตรคิว Touch Screen สำหรับให้บริการประชาชน ณ ศูนย์บริการร่วมภาครัฐ ศาลากลางจังหวัดจันทบุรี
            </p>
          </div>

          <div class="font-mono text-xs opacity-75 md:text-right space-y-1">
            <div class="text-[#00A854] dark:text-[#00FF88] font-bold">เลขที่หนังสือ: ที่ จบ ๐๐๑๗.๓/๒๑๐</div>
            <div>ให้ไว้ ณ วันที่ ๒๖ กันยายน ๒๕๖๖</div>
          </div>
        </div>

        <div class="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <!-- Certificate Scan Preview -->
          <div class="lg:col-span-5 flex flex-col items-center">
            <div
              class="relative rounded-2xl overflow-hidden border-2 border-[#00C864]/30 shadow-2xl bg-white p-2 group cursor-pointer max-w-md w-full transition-all duration-300 hover:scale-[1.02] hover:border-[#00C864]"
              @click="openLightbox('/images/products/igenq-cert-chanthaburi.jpg', 'หนังสือรับรองผลงาน ศาลากลางจังหวัดจันทบุรี (ที่ จบ ๐๐๑๗.๓/๒๑๐)', 'บริษัท ไอเจนโก้ จำกัด ได้รับจ้างทำเครื่องกดบัตรคิว Touch Screen และระบบจัดการคิวออนไลน์ สัญญาเลขที่ ๔๘/๒๕๖๕')"
            >
              <img
                src="/images/products/igenq-cert-chanthaburi.jpg"
                alt="หนังสือรับรองผลงาน ศาลากลางจังหวัดจันทบุรี บริษัท ไอเจนโก้ จำกัด"
                class="w-full h-auto rounded-xl object-contain shadow-inner"
              >
              <div class="absolute inset-0 bg-[#022C22]/60 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center gap-2 text-white p-4 text-center">
                <div class="w-12 h-12 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center border border-white/40">
                  <ZoomIn class="w-6 h-6 text-white" />
                </div>
                <span class="text-xs font-mono font-bold px-3 py-1.5 rounded-full bg-black/70 backdrop-blur-sm border border-white/20">
                  คลิกเพื่อดูหนังสือรับรองต้นฉบับขนาดเต็ม
                </span>
              </div>
            </div>
          </div>

          <!-- 8 Agencies Grid -->
          <div class="lg:col-span-7 space-y-5">
            <div class="p-5 rounded-2xl spatial-glass border border-[#00C864]/25 space-y-1.5">
              <div class="text-xs font-mono font-bold text-[#00A854] dark:text-[#00FF88] uppercase tracking-wider flex items-center gap-2">
                <Building2 class="w-4 h-4" />
                <span>หน่วยงานผู้ออกหนังสือรับรอง:</span>
              </div>
              <div class="text-lg font-bold text-[#022C22] dark:text-white">
                สำนักงานจังหวัดจันทบุรี (ศาลากลางจังหวัดจันทบุรี)
              </div>
              <div class="text-xs opacity-80 leading-relaxed">
                <strong>ลงนามรับรองโดย:</strong> นางกชพร ไกยสุทธิ (หัวหน้าสำนักงานจังหวัดจันทบุรี ปฏิบัติราชการแทน ผู้ว่าราชการจังหวัดจันทบุรี)
              </div>
            </div>

            <div class="grid grid-cols-1 sm:grid-cols-2 gap-2.5 text-xs">
              <div class="p-2.5 rounded-xl bg-current/5 border border-current/10 flex items-center gap-2">
                <span class="w-5 h-5 rounded-full bg-[#00C864]/20 text-[#00A854] dark:text-[#00FF88] font-mono font-bold text-[11px] flex items-center justify-center shrink-0">1</span>
                <span class="font-medium">เคาน์เตอร์บริการอำเภอ...ยิ้ม</span>
              </div>
              <div class="p-2.5 rounded-xl bg-current/5 border border-current/10 flex items-center gap-2">
                <span class="w-5 h-5 rounded-full bg-[#00C864]/20 text-[#00A854] dark:text-[#00FF88] font-mono font-bold text-[11px] flex items-center justify-center shrink-0">2</span>
                <span class="font-medium">การไฟฟ้าส่วนภูมิภาคจังหวัดจันทบุรี</span>
              </div>
              <div class="p-2.5 rounded-xl bg-current/5 border border-current/10 flex items-center gap-2">
                <span class="w-5 h-5 rounded-full bg-[#00C864]/20 text-[#00A854] dark:text-[#00FF88] font-mono font-bold text-[11px] flex items-center justify-center shrink-0">3</span>
                <span class="font-medium">การประปาส่วนภูมิภาคสาขาจันทบุรี</span>
              </div>
              <div class="p-2.5 rounded-xl bg-current/5 border border-current/10 flex items-center gap-2">
                <span class="w-5 h-5 rounded-full bg-[#00C864]/20 text-[#00A854] dark:text-[#00FF88] font-mono font-bold text-[11px] flex items-center justify-center shrink-0">4</span>
                <span class="font-medium">ไปรษณีย์จังหวัดจันทบุรี</span>
              </div>
              <div class="p-2.5 rounded-xl bg-current/5 border border-current/10 flex items-center gap-2">
                <span class="w-5 h-5 rounded-full bg-[#00C864]/20 text-[#00A854] dark:text-[#00FF88] font-mono font-bold text-[11px] flex items-center justify-center shrink-0">5</span>
                <span class="font-medium">สำนักงานขนส่งจังหวัดจันทบุรี</span>
              </div>
              <div class="p-2.5 rounded-xl bg-current/5 border border-current/10 flex items-center gap-2">
                <span class="w-5 h-5 rounded-full bg-[#00C864]/20 text-[#00A854] dark:text-[#00FF88] font-mono font-bold text-[11px] flex items-center justify-center shrink-0">6</span>
                <span class="font-medium">บมจ. โทรคมนาคมแห่งชาติ (NT)</span>
              </div>
              <div class="p-2.5 rounded-xl bg-current/5 border border-current/10 flex items-center gap-2">
                <span class="w-5 h-5 rounded-full bg-[#00C864]/20 text-[#00A854] dark:text-[#00FF88] font-mono font-bold text-[11px] flex items-center justify-center shrink-0">7</span>
                <span class="font-medium">ศูนย์บริการร่วมกระทรวงแรงงาน</span>
              </div>
              <div class="p-2.5 rounded-xl bg-current/5 border border-current/10 flex items-center gap-2">
                <span class="w-5 h-5 rounded-full bg-amber-500/20 text-amber-600 dark:text-amber-400 font-mono font-bold text-[11px] flex items-center justify-center shrink-0">8</span>
                <span class="font-medium font-bold text-amber-600 dark:text-amber-400">ศูนย์ดำรงธรรมจังหวัดจันทบุรี</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- ========================================================
           5. MODERN BENTO ACTION LINKS (2026 ENTERPRISE EDITION)
      ========================================================= -->
      <section class="space-y-6">
        <div class="flex items-center justify-between">
          <div>
            <div class="text-xs font-mono font-bold text-[#00A854] dark:text-[#00FF88] uppercase tracking-wider">
              RESOURCES &amp; QUICK ACTIONS // เอกสารและการดำเนินการ
            </div>
            <h2 class="text-xl sm:text-2xl font-bold font-display text-[#022C22] dark:text-white mt-1">
              เครื่องมือและเอกสารสำคัญสำหรับระบบ iGenQ
            </h2>
          </div>
        </div>

        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <!-- Bento Action 1: Download Proposal / Brochure -->
          <a
            href="/images/products/igenq-poster-1.jpg"
            download="iGenQ-Brochure.jpg"
            class="p-5 rounded-2xl spatial-glass border border-[#00C864]/25 hover:border-[#00C864] transition-all hover:-translate-y-1 flex flex-col justify-between space-y-4 group"
          >
            <div class="w-10 h-10 rounded-xl bg-[#00C864]/15 text-[#00A854] dark:text-[#00FF88] flex items-center justify-center">
              <Download class="w-5 h-5" />
            </div>
            <div>
              <h3 class="text-sm font-bold group-hover:text-[#00A854] dark:group-hover:text-[#00FF88] transition-colors">ดาวน์โหลด Proposal &amp; โบรชัวร์</h3>
              <p class="text-xs opacity-70 mt-1">เอกสารแนะนำคุณสมบัติระบบ iGenQ ฉบับสมบูรณ์</p>
            </div>
          </a>

          <!-- Bento Action 2: View Certificate -->
          <button
            type="button"
            class="p-5 rounded-2xl spatial-glass border border-[#00C864]/25 hover:border-[#00C864] transition-all hover:-translate-y-1 flex flex-col justify-between space-y-4 text-left group cursor-pointer"
            @click="openLightbox('/images/products/igenq-cert-chanthaburi.jpg', 'หนังสือรับรองผลงาน ศาลากลางจังหวัดจันทบุรี (ที่ จบ ๐๐๑๗.๓/๒๑๐)')"
          >
            <div class="w-10 h-10 rounded-xl bg-amber-500/15 text-amber-600 dark:text-amber-400 flex items-center justify-center">
              <Award class="w-5 h-5" />
            </div>
            <div>
              <h3 class="text-sm font-bold group-hover:text-[#00A854] dark:group-hover:text-[#00FF88] transition-colors">หนังสือรับรองผลงานราชการ</h3>
              <p class="text-xs opacity-70 mt-1">ดูเอกสารรับรองจากศาลากลางจังหวัดจันทบุรี</p>
            </div>
          </button>

          <!-- Bento Action 3: Copyright Document -->
          <a
            href="https://drive.google.com/file/d/1gGA7notTLil-SHNMrnYROxBZka0dfM8B/view?usp=sharing"
            target="_blank"
            rel="noopener noreferrer"
            class="p-5 rounded-2xl spatial-glass border border-[#00C864]/25 hover:border-[#00C864] transition-all hover:-translate-y-1 flex flex-col justify-between space-y-4 group"
          >
            <div class="w-10 h-10 rounded-xl bg-blue-500/15 text-blue-600 dark:text-blue-400 flex items-center justify-center">
              <FileText class="w-5 h-5" />
            </div>
            <div>
              <h3 class="text-sm font-bold group-hover:text-[#00A854] dark:group-hover:text-[#00FF88] transition-colors flex items-center gap-1">
                <span>หนังสือรับรองลิขสิทธิ์</span>
                <ExternalLink class="w-3.5 h-3.5 opacity-60" />
              </h3>
              <p class="text-xs opacity-70 mt-1">ซอฟต์แวร์คนไทย 100% จดแจ้งลิขสิทธิ์ถูกต้อง</p>
            </div>
          </a>

          <!-- Bento Action 4: Consult / Request Demo -->
          <NuxtLink
            to="/contact"
            class="p-5 rounded-2xl bg-[#00C864] text-[#022C22] dark:bg-[#00FF88] dark:text-[#020806] hover:opacity-95 transition-all hover:-translate-y-1 flex flex-col justify-between space-y-4 shadow-lg group"
          >
            <div class="w-10 h-10 rounded-xl bg-black/10 flex items-center justify-center">
              <Phone class="w-5 h-5" />
            </div>
            <div>
              <h3 class="text-sm font-extrabold flex items-center gap-1">
                <span>ติดต่อขอสาธิตระบบ / ใบเสนอราคา</span>
                <ArrowUpRight class="w-4 h-4" />
              </h3>
              <p class="text-xs opacity-85 mt-1 font-medium">ปรึกษาทีมงาน IGENCO ได้ทันทีไม่มีค่าใช้จ่าย</p>
            </div>
          </NuxtLink>
        </div>
      </section>

    </main>

    <!-- 6. Unified Modern Enterprise Footer (Standardized Design System) -->
    <ContactFooter />

    <!-- ========================================================
         INTERACTIVE QUICK-VIEW GLASS MODAL
    ========================================================= -->
    <Teleport to="body">
      <Transition
        enter-active-class="transition duration-250 ease-out"
        enter-from-class="opacity-0 scale-95"
        enter-to-class="opacity-100 scale-100"
        leave-active-class="transition duration-200 ease-in"
        leave-from-class="opacity-100 scale-100"
        leave-to-class="opacity-0 scale-95"
      >
        <div
          v-if="quickViewItem"
          class="fixed inset-0 z-[100] bg-black/75 backdrop-blur-xl flex items-center justify-center p-4 sm:p-6 overflow-y-auto"
          @click="closeQuickView"
        >
          <div
            class="relative max-w-3xl w-full rounded-[2rem] bg-white/95 dark:bg-[#03150e]/95 border border-[#00C864]/35 shadow-2xl overflow-hidden my-auto"
            @click.stop
          >
            <!-- Modal Header -->
            <div class="p-6 sm:p-8 pb-4 border-b border-current/10 flex items-start justify-between gap-4">
              <div class="space-y-1.5">
                <div class="flex flex-wrap items-center gap-2">
                  <span class="px-3 py-0.5 rounded-full text-xs font-mono font-bold bg-[#00C864]/15 text-[#00A854] dark:text-[#00FF88] border border-[#00C864]/30">
                    {{ quickViewItem.category }}
                  </span>
                  <span class="text-xs font-mono opacity-65 flex items-center gap-1">
                    <MapPin class="w-3.5 h-3.5 text-[#00C864]" />
                    {{ quickViewItem.location }}
                  </span>
                </div>
                <h3 class="text-xl sm:text-2xl font-extrabold font-display text-[#022C22] dark:text-white">
                  {{ quickViewItem.clientName }}
                </h3>
                <p class="text-xs sm:text-sm font-semibold opacity-75">
                  {{ quickViewItem.title }}
                </p>
              </div>
              <button
                type="button"
                aria-label="Close Quick View"
                class="p-2 rounded-xl bg-black/5 dark:bg-white/10 hover:bg-red-500/15 hover:text-red-500 transition-colors cursor-pointer shrink-0"
                @click.stop="closeQuickView"
              >
                <X class="w-5 h-5" />
              </button>
            </div>

            <!-- Modal Body -->
            <div class="p-6 sm:p-8 space-y-6 max-h-[75vh] overflow-y-auto">
              <!-- Image Container -->
              <div
                class="aspect-video rounded-2xl overflow-hidden border border-[#00C864]/20 bg-gradient-to-br from-[#F0FDF4] to-[#DCFCE7] dark:from-[#022C22]/60 dark:to-[#041E16] p-3 flex items-center justify-center cursor-zoom-in relative group"
                @click="openLightbox(quickViewItem.image, quickViewItem.clientName, quickViewItem.title)"
              >
                <img
                  :src="quickViewItem.image"
                  :alt="quickViewItem.clientName"
                  class="w-full h-full object-contain rounded-xl"
                >
                <span class="absolute bottom-3 right-3 px-2.5 py-1 rounded-lg bg-black/70 text-white text-[11px] font-mono flex items-center gap-1 opacity-80 group-hover:opacity-100">
                  <ZoomIn class="w-3.5 h-3.5 text-[#00FF88]" />
                  <span>ขยายภาพ</span>
                </span>
              </div>

              <!-- Deployment Specs Grid -->
              <div class="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                <div class="p-3.5 rounded-2xl bg-black/[0.03] dark:bg-white/[0.04] border border-current/10 space-y-1">
                  <div class="font-mono font-bold text-[#00A854] dark:text-[#00FF88] flex items-center gap-1.5">
                    <Layers class="w-3.5 h-3.5" />
                    <span>จุดบริการที่ติดตั้ง:</span>
                  </div>
                  <p class="opacity-85 leading-relaxed">{{ quickViewItem.servicePoints }}</p>
                </div>
                <div class="p-3.5 rounded-2xl bg-black/[0.03] dark:bg-white/[0.04] border border-current/10 space-y-1">
                  <div class="font-mono font-bold text-[#00A854] dark:text-[#00FF88] flex items-center gap-1.5">
                    <Monitor class="w-3.5 h-3.5" />
                    <span>รูปแบบระบบคิว:</span>
                  </div>
                  <p class="opacity-85 leading-relaxed">{{ quickViewItem.queueMode }}</p>
                </div>
              </div>

              <!-- Description -->
              <p class="text-xs sm:text-sm opacity-85 leading-relaxed">
                {{ quickViewItem.description }}
              </p>

              <!-- Key Outcomes -->
              <div class="space-y-2 pt-2 border-t border-current/10">
                <div class="text-xs font-mono font-bold text-[#00A854] dark:text-[#00FF88] uppercase">
                  ผลลัพธ์และความสำเร็จ (Key Outcomes):
                </div>
                <ul class="space-y-1.5 text-xs sm:text-sm opacity-90">
                  <li
                    v-for="(res, idx) in quickViewItem.results"
                    :key="idx"
                    class="flex items-start gap-2"
                  >
                    <CheckCircle2 class="w-4 h-4 text-[#00C864] shrink-0 mt-0.5" />
                    <span>{{ res }}</span>
                  </li>
                </ul>
              </div>
            </div>

            <!-- Modal Footer -->
            <div class="p-5 sm:px-8 border-t border-current/10 bg-black/[0.02] dark:bg-white/[0.02] flex flex-wrap items-center justify-between gap-3">
              <NuxtLink
                to="/contact"
                class="px-5 py-2.5 rounded-xl bg-[#00C864] text-[#022C22] dark:bg-[#00FF88] dark:text-[#020806] font-bold text-xs flex items-center gap-1.5 hover:opacity-90 transition-all shadow-md"
                @click="closeQuickView"
              >
                <span>ปรึกษาติดตั้งระบบลักษณะนี้</span>
                <ArrowUpRight class="w-4 h-4" />
              </NuxtLink>
              <button
                type="button"
                class="px-4 py-2 rounded-xl bg-black/5 dark:bg-white/10 hover:bg-black/10 dark:hover:bg-white/20 text-xs font-semibold cursor-pointer transition-colors"
                @click.stop="closeQuickView"
              >
                ปิดหน้าต่าง
              </button>
            </div>
          </div>
        </div>
      </Transition>
    </Teleport>

    <!-- ========================================================
         INTERACTIVE LIGHTBOX MODAL (FULLSCREEN IMAGE)
    ========================================================= -->
    <Teleport to="body">
      <Transition
        enter-active-class="transition duration-300 ease-out"
        enter-from-class="opacity-0"
        enter-to-class="opacity-100"
        leave-active-class="transition duration-200 ease-in"
        leave-from-class="opacity-100"
        leave-to-class="opacity-0"
      >
        <div
          v-if="lightboxImage"
          class="fixed inset-0 z-[110] bg-black/90 backdrop-blur-xl flex items-center justify-center p-4 sm:p-8"
          @click="closeLightbox"
        >
          <button
            type="button"
            class="absolute top-5 right-5 w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-all z-10 cursor-pointer"
            @click.stop="closeLightbox"
          >
            <X class="w-6 h-6" />
          </button>

          <div class="relative max-w-5xl max-h-[90vh] flex flex-col items-center space-y-3" @click.stop>
            <img
              :src="lightboxImage.url"
              :alt="lightboxImage.title"
              class="max-w-full max-h-[80vh] object-contain rounded-2xl shadow-2xl border border-white/20 bg-white"
            >
            <div class="text-center text-white space-y-1">
              <h4 class="text-base sm:text-lg font-bold font-display">
                {{ lightboxImage.title }}
              </h4>
              <p v-if="lightboxImage.subtitle" class="text-xs sm:text-sm opacity-70">
                {{ lightboxImage.subtitle }}
              </p>
            </div>
          </div>
        </div>
      </Transition>
    </Teleport>
  </div>
</template>

<style scoped>
/* FLIP Layout Shuffle Transition */
.portfolio-shuffle-move,
.portfolio-shuffle-enter-active,
.portfolio-shuffle-leave-active {
  transition: all 0.4s cubic-bezier(0.22, 1, 0.36, 1);
}

.portfolio-shuffle-enter-from,
.portfolio-shuffle-leave-to {
  opacity: 0;
  transform: translateY(16px) scale(0.96);
}

.portfolio-shuffle-leave-active {
  position: absolute;
}
</style>
