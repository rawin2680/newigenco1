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
  Maximize2,
  ChevronRight,
  X,
  ExternalLink,
  Clock,
  Users,
  Phone,
  Mail,
  Store,
  QrCode,
  Tag,
  Layers,
  MapPin,
  Award,
  FileCheck2,
  ShieldCheck,
  FileText
} from 'lucide-vue-next'
import { useTheme } from '~/composables/useTheme'

const { showToast } = useTheme()

useHead({
  title: 'ผลงานการติดตั้งระบบคิว iGenQ (iGenQ Portfolio & Case Studies) - บริษัท ไอเจนโก้ จำกัด (IGENCO)',
  meta: [
    {
      name: 'description',
      content: 'รวมผลงานและความสำเร็จการติดตั้งระบบบริหารคิวอัจฉริยะ iGenQ ในโรงพยาบาล ร้านอาหาร ศูนย์บริการภาครัฐ และองค์กรชั้นนำทั่วประเทศ โดย บริษัท ไอเจนโก้ จำกัด'
    }
  ]
})

// Lightbox state
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

// Category filter tabs
const activeCategory = ref('ทั้งหมด')
const categories = ['ทั้งหมด', 'โรงพยาบาล & การแพทย์', 'ร้านอาหาร & แฟรนไชส์', 'ศูนย์บริการภาครัฐ', 'องค์กรธุรกิจ & อุตสาหกรรม']

// Portfolio items
interface PortfolioItem {
  id: number
  title: string
  clientName: string
  category: string
  location?: string
  image: string
  highlight: string
  description: string
  results: string[]
  tags: string[]
}

const portfolioList = ref<PortfolioItem[]>([
  {
    id: 1,
    title: 'ระบบบริหารคิวผู้รับบริการทางการแพทย์และตรวจสุขภาพ',
    clientName: 'โรงพยาบาล ซีจีเอช (CGH HOSPITAL)',
    category: 'โรงพยาบาล & การแพทย์',
    location: 'กรุงเทพมหานคร',
    image: '/images/products/igenq-poster-1.jpg',
    highlight: 'ลดเวลารอคอยคนไข้หน้าแผนกกว่า 45% พร้อมแจ้งเตือน LINE Notify',
    description: 'ติดตั้งระบบคิว iGenQ สำหรับบริหารจัดการผู้ป่วยนอก (OPD) แผนกตรวจสุขภาพ และจุดฉีดวัคซีน ผู้รับบริการสามารถตรวจสอบจำนวนคิวที่เหลือผ่านสมาร์ทโฟน ไม่ต้องนั่งแออัดในพื้นที่รอตรวจ',
    results: [
      'ลดความแออัดในพื้นที่พักคอยโรงพยาบาลได้อย่างมีประสิทธิภาพ',
      'แจ้งเตือนเมื่อใกล้ถึงคิวล่วงหน้า 3 ลำดับผ่านระบบ LINE อัตโนมัติ',
      'เชื่อมต่อหน้าจอ Android TV แสดงผลสถานะห้องตรวจแบบเรียลไทม์'
    ],
    tags: ['Hospital Queue', 'OPD Management', 'LINE Notify', 'New Normal']
  },
  {
    id: 2,
    title: 'ระบบจัดการคิวหน้าร้านสาขาและเครื่องดื่มชานมไข่มุก',
    clientName: 'โนบิชา (NOBI CHA) สาขา บิ๊กซี ติวานนท์',
    category: 'ร้านอาหาร & แฟรนไชส์',
    location: 'นนทบุรี',
    image: '/images/products/igenq-poster-2.jpg',
    highlight: 'จัดการคิวชั่วโมงเร่งด่วนรวดเร็ว ลูกค้าเดินช้อปปิ้งรอได้อย่างสบายใจ',
    description: 'แก้ปัญหาคิวหน้าร้านในห้างสรรพสินค้าช่วงพีค ลูกค้าสแกน QR Code รับบัตรคิว e-Ticket บนมือถือ พร้อมระบบเสียงเรียกคิวอัตโนมัติผ่านลำโพงบลูทูธและจอทีวีหน้าร้าน',
    results: [
      'ลูกค้าไม่ต้องยืนรอหน้าเคาน์เตอร์ สามารถเดินซื้อของในห้างได้',
      'พนักงานไม่ต้องออกแรงตะโกนเรียกคิว เสียงประกาศชัดเจนผ่านลำโพง',
      'เพิ่มยอดขายในชั่วโมงเร่งด่วนได้กว่า 20% จากการหมุนเวียนคิวที่เร็วขึ้น'
    ],
    tags: ['Beverage & Cafe', 'Bluetooth Audio', 'Mobile e-Ticket', 'Quick Service']
  },
  {
    id: 3,
    title: 'ระบบจัดการลงทะเบียนการรับบัตรคิวออนไลน์ & ตู้กดบัตรคิว Touch Screen',
    clientName: 'ศูนย์บริการร่วมภาครัฐ ศาลากลางจังหวัดจันทบุรี',
    category: 'ศูนย์บริการภาครัฐ',
    location: 'ศาลากลางจังหวัดจันทบุรี ถ.เลียบเนิน',
    image: '/images/products/igenq-cert-chanthaburi.jpg',
    highlight: 'ได้รับหนังสือรับรองผลงาน (ที่ จบ ๐๐๑๗.๓/๒๑๐) ครอบคลุม 8 หน่วยงานบริการร่วม',
    description: 'บริษัท ไอเจนโก้ จำกัด ได้รับจ้างทำเครื่องกดบัตรคิว แบบ Touch Screen พร้อมพัฒนาระบบโปรแกรมคอมพิวเตอร์สำเร็จรูป ระบบจัดการลงทะเบียนการรับบัตรคิวออนไลน์ ตามสัญญาซื้อขาย เลขที่ ๔๘/๒๕๖๕ ลงวันที่ ๑๘ กรกฎาคม ๒๕๖๕ ในวงเงิน ๒๑๙,๙๙๘ บาท ให้บริการประชาชนที่มาติดต่อ ๘ หน่วยงานราชการ',
    results: [
      'หนังสือรับรองผลงานอย่างเป็นทางการ ให้ไว้ ณ วันที่ ๒๖ กันยายน ๒๕๖๖ โดยหัวหน้าสำนักงานจังหวัดจันทบุรี ปฏิบัติราชการแทนผู้ว่าราชการจังหวัดจันทบุรี',
      'เชื่อมโยงการให้บริการ 8 หน่วยงาน: เคาน์เตอร์บริการอำเภอ...ยิ้ม, การไฟฟ้าส่วนภูมิภาค, การประปาส่วนภูมิภาค, ไปรษณีย์ไทย, ขนส่งจังหวัด, บมจ.โทรคมนาคมแห่งชาติ (NT), ศูนย์บริการร่วมกระทรวงแรงงาน และศูนย์ดำรงธรรมจังหวัดจันทบุรี',
      'บริษัท ไอเจนโก้ จำกัด ปฏิบัติงานตามสัญญาเรียบร้อยครบถ้วน ระบบฯ สามารถใช้งานได้อย่างมีประสิทธิภาพต่อเนื่องมาจนถึงปัจจุบัน'
    ],
    tags: ['หนังสือรับรองผลงาน', 'ศาลากลางจังหวัดจันทบุรี', 'ตู้ Touch Screen Kiosk', '8 หน่วยงานรัฐ', 'One Stop Service', 'ศูนย์ดำรงธรรม']
  },
  {
    id: 4,
    title: 'ระบบบริหารคิวรถขนส่งและผู้ติดต่อคลังสินค้าขนาดใหญ่',
    clientName: 'Perfect Companion Group (PCG)',
    category: 'องค์กรธุรกิจ & อุตสาหกรรม',
    location: 'สมุทรปราการ',
    image: '/images/products/igenq-poster-2.jpg',
    highlight: 'จัดการคิวรถบรรทุกและผู้ติดต่อโรงงานอย่างเป็นระบบบนพื้นที่กว่า 100 ไร่',
    description: 'นำระบบ iGenQ มาประยุกต์ใช้ในการจัดคิวรถขนส่งสินค้าและซัพพลายเออร์ที่เข้ามาติดต่อโรงงาน คนขับรถสามารถรอในห้องพักหรือในรถ และรับแจ้งเตือนผ่าน LINE เมื่อถึงคิวเทียบท่าโหลดสินค้า',
    results: [
      'ลดปัญหาการจราจรแออัดบริเวณประตูทางเข้าและจุดโหลดสินค้า',
      'ติดตามสถานะคิวการเข้า-ออกของรถบรรทุกได้อย่างแม่นยำ',
      'บันทึกสถิติและ Log การดำเนินงานอัตโนมัติ 24 ชั่วโมง'
    ],
    tags: ['Enterprise Logistics', 'Truck Queue', 'Industrial Gate', 'Automated Flow']
  }
])

const filteredPortfolio = computed(() => {
  if (activeCategory.value === 'ทั้งหมด') return portfolioList.value
  return portfolioList.value.filter(item => item.category === activeCategory.value)
})

// Quick stats
const stats = [
  { label: 'จุดบริการที่ไว้วางใจ', value: '100+ จุด', sub: 'ทั่วประเทศในหลากหลายธุรกิจ' },
  { label: 'ยอดออกคิวสะสม', value: '2,500,000+', sub: 'คิวบริการที่บริหารจัดการสำเร็จ' },
  { label: 'ลดเวลารอเฉลี่ย', value: 'ลดลง 40%', sub: 'เพิ่มความพึงพอใจให้ลูกค้า' },
  { label: 'ความพึงพอใจเฉลี่ย', value: '98.5%', sub: 'จากการประเมินผลผ่าน e-Ticket' }
]

const scrollToContact = () => {
  if (import.meta.client) {
    const contactEl = document.getElementById('contact-specialist')
    if (contactEl) {
      contactEl.scrollIntoView({ behavior: 'smooth' })
    }
  }
}
</script>

<template>
  <div class="min-h-screen relative selection:bg-[#2563EB] selection:text-white flex flex-col justify-between bg-[#F8FAF9] dark:bg-[#020806] text-slate-800 dark:text-slate-100">
    <!-- 1. Header Navigation -->
    <AppHeader />

    <!-- 2. Main Page Content -->
    <main class="pt-28 pb-20 px-5 sm:px-10 lg:px-16 max-w-[1440px] mx-auto w-full flex-1 relative z-10 space-y-16 sm:space-y-20">
      
      <!-- Top Breadcrumbs & Back Link -->
      <div class="flex items-center justify-between gap-4 border-b border-current/10 pb-4">
        <NuxtLink
          to="/products/igenq"
          class="inline-flex items-center gap-2 text-xs sm:text-sm font-bold font-mono text-blue-600 dark:text-blue-400 hover:underline group"
        >
          <ArrowLeft class="w-4 h-4 group-hover:-translate-x-1.5 transition-transform" />
          <span>ย้อนกลับไปหน้าระบบ iGenQ</span>
        </NuxtLink>

        <div class="hidden sm:flex items-center gap-2 text-xs font-mono opacity-60">
          <span>หน้าแรก</span>
          <ChevronRight class="w-3.5 h-3.5" />
          <span>ผลิตภัณฑ์</span>
          <ChevronRight class="w-3.5 h-3.5" />
          <NuxtLink to="/products/igenq" class="hover:text-blue-500">iGenQ</NuxtLink>
          <ChevronRight class="w-3.5 h-3.5" />
          <span class="text-blue-600 dark:text-blue-400 font-bold">ผลงานการติดตั้งจริง (Portfolio)</span>
        </div>
      </div>

      <!-- ========================================================
           HERO SECTION: PORTFOLIO & CLIENT SUCCESS STORIES
      ========================================================= -->
      <section class="space-y-6">
        <div class="flex flex-wrap items-center gap-2.5">
          <span class="px-3.5 py-1 rounded-full text-xs font-mono font-bold bg-blue-600/15 text-blue-600 dark:bg-blue-500/20 dark:text-blue-300 border border-blue-500/30">
            PORTFOLIO & CASE STUDIES // ผลงานจริง
          </span>
          <span class="px-3.5 py-1 rounded-full text-xs font-mono font-bold bg-[#00C864]/15 text-[#00A854] dark:bg-[#00FF88]/15 dark:text-[#00FF88]">
            VERIFIED SUCCESS STORIES
          </span>
          <span class="px-3.5 py-1 rounded-full text-xs font-mono opacity-70 border border-current/10">
            IGENQ IN ACTION
          </span>
        </div>

        <div class="max-w-4xl space-y-4">
          <h1 class="font-display font-black text-3xl sm:text-5xl lg:text-6xl tracking-tight leading-[1.15] text-[#022C22] dark:text-white">
            ผลงานและความสำเร็จของ <span class="text-blue-600 dark:text-blue-400">iGenQ</span>
          </h1>
          <div class="text-lg sm:text-2xl font-bold text-blue-600 dark:text-blue-300 font-display">
            ภาพความประทับใจและการติดตั้งใช้งานจริงในหลากหลายธุรกิจและหน่วยงานชั้นนำ
          </div>
          <p class="text-sm sm:text-base opacity-85 leading-relaxed text-slate-700 dark:text-slate-300">
            รวมเคสการติดตั้งระบบบริหารจัดการคิวอัจฉริยะ iGenQ ที่ช่วยปลดล็อกปัญหาการรอคิว เพิ่มความพึงพอใจให้ลูกค้า และเพิ่มขีดความสามารถในการบริหารจัดการจุดบริการ ทั้งในโรงพยาบาล ร้านอาหาร คาเฟ่ แฟรนไชส์ ศูนย์บริการภาครัฐ และโรงงานอุตสาหกรรม
          </p>
        </div>

        <!-- Action Bar: Contact & Consult -->
        <div class="flex flex-wrap items-center gap-3.5 pt-2">
          <button
            type="button"
            class="px-6 py-3.5 rounded-2xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs sm:text-sm font-mono transition-all flex items-center gap-2 shadow-lg hover:scale-105 active:scale-95 cursor-pointer"
            @click="scrollToContact"
          >
            <span>ปรึกษาการออกแบบระบบคิวสำหรับธุรกิจคุณ</span>
            <ArrowUpRight class="w-4 h-4" />
          </button>

          <NuxtLink
            to="/products/igenq"
            class="px-5 py-3.5 rounded-2xl spatial-glass border border-current/15 hover:border-blue-500 font-bold text-xs sm:text-sm font-mono transition-all flex items-center gap-2 shadow-sm hover:scale-105 active:scale-95"
          >
            <Clock class="w-4 h-4 text-blue-500" />
            <span>ดูข้อมูลและคุณสมบัติระบบ iGenQ</span>
          </NuxtLink>
        </div>
      </section>

      <!-- ========================================================
           STATS RIBBON
      ========================================================= -->
      <section class="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
        <div
          v-for="(st, idx) in stats"
          :key="idx"
          class="p-5 sm:p-6 rounded-2xl spatial-glass border border-blue-500/20 flex flex-col justify-between space-y-2 hover:border-blue-500 transition-all hover:-translate-y-1"
        >
          <div class="text-[11px] font-mono uppercase tracking-wider opacity-60">
            {{ st.label }}
          </div>
          <div class="text-xl sm:text-3xl font-black font-display text-blue-600 dark:text-blue-400">
            {{ st.value }}
          </div>
          <div class="text-xs opacity-75">
            {{ st.sub }}
          </div>
        </div>
      </section>

      <!-- ========================================================
           CATEGORY FILTER TABS
      ========================================================= -->
      <section class="space-y-8">
        <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-current/10 pb-4">
          <div class="space-y-1">
            <div class="text-xs font-mono font-bold text-blue-600 dark:text-blue-400 uppercase tracking-wider flex items-center gap-2">
              <Layers class="w-4 h-4" />
              <span>FILTER BY INDUSTRY // กรองผลงานตามประเภทธุรกิจ</span>
            </div>
            <h2 class="font-display font-black text-2xl sm:text-3xl text-[#022C22] dark:text-white">
              เคสตัวอย่างการใช้งานจริงแยกตามกลุ่มบริการ
            </h2>
          </div>

          <!-- Category Pills -->
          <div class="flex flex-wrap items-center gap-2">
            <button
              v-for="cat in categories"
              :key="cat"
              type="button"
              :class="[
                'px-4 py-2 rounded-xl text-xs font-bold font-mono transition-all cursor-pointer',
                activeCategory === cat
                  ? 'bg-blue-600 text-white shadow-md scale-105'
                  : 'spatial-glass border border-current/10 hover:border-blue-500 opacity-75 hover:opacity-100'
              ]"
              @click="activeCategory = cat"
            >
              {{ cat }}
            </button>
          </div>
        </div>

        <!-- ========================================================
             PORTFOLIO GRID
        ========================================================= -->
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch">
          <article
            v-for="item in filteredPortfolio"
            :key="item.id"
            class="p-6 sm:p-8 rounded-[2.5rem] spatial-glass border border-blue-500/25 shadow-xl flex flex-col justify-between space-y-6 hover:border-blue-500 transition-all duration-300 hover:-translate-y-1.5 group"
          >
            <div class="space-y-5">
              <!-- Top Badges -->
              <div class="flex flex-wrap items-center justify-between gap-2">
                <span class="px-3 py-1 rounded-full text-xs font-mono font-bold bg-blue-600/15 text-blue-600 dark:bg-blue-500/20 dark:text-blue-300 border border-blue-500/30">
                  {{ item.category }}
                </span>
                <span v-if="item.location" class="text-xs font-mono opacity-60 flex items-center gap-1">
                  <MapPin class="w-3.5 h-3.5 text-blue-500" />
                  {{ item.location }}
                </span>
              </div>

              <!-- Client Name & Title -->
              <div>
                <h3 class="text-xl sm:text-2xl font-bold font-display text-[#022C22] dark:text-white leading-snug group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                  {{ item.clientName }}
                </h3>
                <div class="text-xs sm:text-sm font-semibold opacity-75 mt-1 text-slate-700 dark:text-slate-300">
                  {{ item.title }}
                </div>
              </div>

              <!-- Showcase Image with Lightbox Zoom -->
              <div
                class="rounded-2xl overflow-hidden border border-blue-500/20 bg-black/20 relative cursor-pointer aspect-[16/9]"
                @click="openLightbox(item.image, item.clientName, item.title)"
              >
                <img
                  :src="item.image"
                  :alt="item.clientName"
                  class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                >
                <div class="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent flex items-end justify-between p-4">
                  <span class="px-2.5 py-1 rounded-lg bg-black/70 text-white text-[11px] font-mono flex items-center gap-1 backdrop-blur-sm border border-white/20">
                    <ZoomIn class="w-3.5 h-3.5 text-blue-400" />
                    <span>คลิกเพื่อดูภาพขนาดเต็ม</span>
                  </span>
                  <span class="text-[11px] font-mono text-blue-400 font-bold bg-black/60 px-2 py-0.5 rounded-md">
                    VERIFIED CASE
                  </span>
                </div>
              </div>

              <!-- Highlight Pill -->
              <div class="p-3.5 rounded-2xl bg-blue-500/10 border border-blue-500/25 text-xs font-bold text-blue-700 dark:text-blue-300 flex items-start gap-2">
                <Sparkles class="w-4 h-4 text-blue-500 shrink-0 mt-0.5" />
                <span>{{ item.highlight }}</span>
              </div>

              <!-- Description -->
              <p class="text-xs sm:text-sm opacity-85 leading-relaxed text-slate-700 dark:text-slate-300">
                {{ item.description }}
              </p>

              <!-- Key Achievements / Results -->
              <div class="space-y-2 pt-2 border-t border-current/10">
                <div class="text-xs font-mono font-bold text-blue-600 dark:text-blue-400 uppercase">
                  ผลลัพธ์และความสำเร็จ (Key Outcomes):
                </div>
                <ul class="space-y-1.5 text-xs opacity-90 leading-relaxed">
                  <li
                    v-for="(res, idx) in item.results"
                    :key="idx"
                    class="flex items-start gap-2"
                  >
                    <CheckCircle2 class="w-4 h-4 text-[#00C864] shrink-0 mt-0.5" />
                    <span>{{ res }}</span>
                  </li>
                </ul>
              </div>
            </div>

            <!-- Tags -->
            <div class="flex flex-wrap items-center gap-1.5 pt-3 border-t border-current/10">
              <span
                v-for="tag in item.tags"
                :key="tag"
                class="px-2.5 py-0.5 rounded-lg text-[10px] font-mono bg-current/5 border border-current/10 opacity-70"
              >
                #{{ tag }}
              </span>
            </div>
          </article>
        </div>
      </section>

      <!-- ========================================================
           OFFICIAL GOVERNMENT ENDORSEMENT SPOTLIGHT
      ========================================================= -->
      <section class="p-6 sm:p-10 lg:p-12 rounded-[2.5rem] bg-gradient-to-br from-blue-900/10 via-slate-900/5 to-emerald-900/10 dark:from-blue-950/40 dark:via-slate-900/50 dark:to-emerald-950/20 border-2 border-blue-500/30 shadow-2xl space-y-8 relative overflow-hidden">
        
        <!-- Header Ribbon -->
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
            <p class="text-xs sm:text-sm opacity-80 max-w-2xl text-slate-700 dark:text-slate-300">
              เอกสารรับรองอย่างเป็นทางการ ยืนยันการส่งมอบและปฏิบัติงานติดตั้งระบบคิว iGenQ และเครื่องกดบัตรคิว Touch Screen สำหรับให้บริการประชาชน ณ ศูนย์บริการร่วมภาครัฐ ศาลากลางจังหวัดจันทบุรี
            </p>
          </div>

          <div class="font-mono text-xs opacity-75 md:text-right space-y-1">
            <div class="text-blue-600 dark:text-blue-400 font-bold">เลขที่หนังสือ: ที่ จบ ๐๐๑๗.๓/๒๑๐</div>
            <div>ให้ไว้ ณ วันที่ ๒๖ กันยายน ๒๕๖๖</div>
          </div>
        </div>

        <!-- 2-Column Split: Certificate High-Res Viewer + Details -->
        <div class="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          <!-- Column 1 (Left 5 cols): Certificate Scan Preview with Zoom -->
          <div class="lg:col-span-5 flex flex-col items-center">
            <div
              class="relative rounded-2xl overflow-hidden border-2 border-blue-500/30 shadow-2xl bg-white p-2 group cursor-pointer max-w-md w-full transition-all duration-300 hover:scale-[1.02] hover:border-blue-500 hover:shadow-blue-500/20"
              @click="openLightbox('/images/products/igenq-cert-chanthaburi.jpg', 'หนังสือรับรองผลงาน ศาลากลางจังหวัดจันทบุรี (ที่ จบ ๐๐๑๗.๓/๒๑๐)', 'บริษัท ไอเจนโก้ จำกัด ได้รับจ้างทำเครื่องกดบัตรคิว Touch Screen และระบบจัดการคิวออนไลน์ สัญญาเลขที่ ๔๘/๒๕๖๕')"
            >
              <img
                src="/images/products/igenq-cert-chanthaburi.jpg"
                alt="หนังสือรับรองผลงาน ศาลากลางจังหวัดจันทบุรี บริษัท ไอเจนโก้ จำกัด"
                class="w-full h-auto rounded-xl object-contain shadow-inner"
              >
              <div class="absolute inset-0 bg-blue-950/60 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center gap-2 text-white p-4 text-center">
                <div class="w-12 h-12 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center border border-white/40">
                  <ZoomIn class="w-6 h-6 text-white" />
                </div>
                <span class="text-xs font-mono font-bold px-3 py-1.5 rounded-full bg-black/70 backdrop-blur-sm border border-white/20">
                  คลิกเพื่อดูหนังสือรับรองต้นฉบับขนาดเต็ม
                </span>
              </div>
            </div>
            <div class="mt-3 text-center text-xs font-mono opacity-60">
              * คลิกที่ภาพเพื่อขยายและอ่านข้อความฉบับเต็ม (Interactive Lightbox)
            </div>
          </div>

          <!-- Column 2 (Right 7 cols): Government Project Specification & 8 Agencies -->
          <div class="lg:col-span-7 space-y-6">
            
            <!-- Authority Badge Card -->
            <div class="p-5 rounded-2xl spatial-glass border border-blue-500/25 space-y-2">
              <div class="text-xs font-mono font-bold text-blue-600 dark:text-blue-400 uppercase tracking-wider flex items-center gap-2">
                <Building2 class="w-4 h-4" />
                <span>หน่วยงานผู้ออกหนังสือรับรอง:</span>
              </div>
              <div class="text-lg font-bold text-[#022C22] dark:text-white">
                สำนักงานจังหวัดจันทบุรี (ศาลากลางจังหวัดจันทบุรี)
              </div>
              <div class="text-xs opacity-80 leading-relaxed text-slate-700 dark:text-slate-300">
                ถนนเลียบเนิน ตำบลวัดใหม่ อำเภอเมืองจันทบุรี จังหวัดจันทบุรี ๒๒๐๐๐
                <br>
                <strong class="text-blue-600 dark:text-blue-400">ลงนามรับรองโดย:</strong> นางกชพร ไกยสุทธิ (หัวหน้าสำนักงานจังหวัดจันทบุรี ปฏิบัติราชการแทน ผู้ว่าราชการจังหวัดจันทบุรี)
              </div>
            </div>

            <!-- Contract & Scope Summary -->
            <div class="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs font-mono">
              <div class="p-4 rounded-xl spatial-glass border border-current/10 space-y-1">
                <div class="opacity-60 text-[11px]">สัญญาซื้อขายเลขที่</div>
                <div class="font-bold text-sm text-blue-600 dark:text-blue-400">๔๘/๒๕๖๕ (18 ก.ค. 2565)</div>
                <div class="opacity-60 text-[10px]">วงเงิน ๒๑๙,๙๙๘ บาท</div>
              </div>

              <div class="p-4 rounded-xl spatial-glass border border-current/10 space-y-1">
                <div class="opacity-60 text-[11px]">ระบบที่จัดทำและส่งมอบ</div>
                <div class="font-bold text-sm text-[#00A854] dark:text-[#00FF88]">ตู้กดบัตรคิว Touch Screen</div>
                <div class="opacity-60 text-[10px]">พร้อมระบบโปรแกรมจัดการคิวออนไลน์</div>
              </div>
            </div>

            <!-- 8 Government Agencies Served -->
            <div class="space-y-3 pt-2">
              <div class="text-xs font-mono font-bold text-blue-600 dark:text-blue-400 uppercase flex items-center gap-2">
                <CheckCircle2 class="w-4 h-4 text-[#00C864]" />
                <span>รองรับการให้บริการ 8 หน่วยงานร่วม ณ ศูนย์บริการร่วมจังหวัดจันทบุรี:</span>
              </div>

              <div class="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                <div class="p-2.5 rounded-xl bg-current/5 border border-current/10 flex items-center gap-2">
                  <span class="w-5 h-5 rounded-full bg-blue-500/20 text-blue-600 dark:text-blue-400 font-mono font-bold text-[11px] flex items-center justify-center shrink-0">1</span>
                  <span class="font-medium">เคาน์เตอร์บริการอำเภอ...ยิ้ม</span>
                </div>
                <div class="p-2.5 rounded-xl bg-current/5 border border-current/10 flex items-center gap-2">
                  <span class="w-5 h-5 rounded-full bg-blue-500/20 text-blue-600 dark:text-blue-400 font-mono font-bold text-[11px] flex items-center justify-center shrink-0">2</span>
                  <span class="font-medium">การไฟฟ้าส่วนภูมิภาคจังหวัดจันทบุรี</span>
                </div>
                <div class="p-2.5 rounded-xl bg-current/5 border border-current/10 flex items-center gap-2">
                  <span class="w-5 h-5 rounded-full bg-blue-500/20 text-blue-600 dark:text-blue-400 font-mono font-bold text-[11px] flex items-center justify-center shrink-0">3</span>
                  <span class="font-medium">การประปาส่วนภูมิภาคสาขาจันทบุรี</span>
                </div>
                <div class="p-2.5 rounded-xl bg-current/5 border border-current/10 flex items-center gap-2">
                  <span class="w-5 h-5 rounded-full bg-blue-500/20 text-blue-600 dark:text-blue-400 font-mono font-bold text-[11px] flex items-center justify-center shrink-0">4</span>
                  <span class="font-medium">ไปรษณีย์จังหวัดจันทบุรี</span>
                </div>
                <div class="p-2.5 rounded-xl bg-current/5 border border-current/10 flex items-center gap-2">
                  <span class="w-5 h-5 rounded-full bg-blue-500/20 text-blue-600 dark:text-blue-400 font-mono font-bold text-[11px] flex items-center justify-center shrink-0">5</span>
                  <span class="font-medium">สำนักงานขนส่งจังหวัดจันทบุรี</span>
                </div>
                <div class="p-2.5 rounded-xl bg-current/5 border border-current/10 flex items-center gap-2">
                  <span class="w-5 h-5 rounded-full bg-blue-500/20 text-blue-600 dark:text-blue-400 font-mono font-bold text-[11px] flex items-center justify-center shrink-0">6</span>
                  <span class="font-medium">บมจ. โทรคมนาคมแห่งชาติ (NT)</span>
                </div>
                <div class="p-2.5 rounded-xl bg-current/5 border border-current/10 flex items-center gap-2">
                  <span class="w-5 h-5 rounded-full bg-blue-500/20 text-blue-600 dark:text-blue-400 font-mono font-bold text-[11px] flex items-center justify-center shrink-0">7</span>
                  <span class="font-medium">ศูนย์บริการร่วมกระทรวงแรงงาน</span>
                </div>
                <div class="p-2.5 rounded-xl bg-current/5 border border-current/10 flex items-center gap-2">
                  <span class="w-5 h-5 rounded-full bg-amber-500/20 text-amber-600 dark:text-amber-400 font-mono font-bold text-[11px] flex items-center justify-center shrink-0">8</span>
                  <span class="font-medium font-bold text-amber-600 dark:text-amber-400">ศูนย์ดำรงธรรมจังหวัดจันทบุรี</span>
                </div>
              </div>
            </div>

            <!-- Official Statement Quote -->
            <div class="p-4 rounded-2xl bg-[#00C864]/10 border border-[#00C864]/30 text-xs sm:text-sm text-[#022C22] dark:text-slate-200 italic space-y-1">
              <div class="font-bold text-[#00A854] dark:text-[#00FF88] not-italic font-mono text-[11px] flex items-center gap-1.5">
                <ShieldCheck class="w-4 h-4" />
                <span>ข้อความรับรองในหนังสือสำคัญ:</span>
              </div>
              <p>
                "ทั้งนี้ บริษัท ไอเจนโก้ จำกัด ได้ปฏิบัติงานตามรายละเอียดและเงื่อนไขในสัญญาเป็นที่เรียบร้อยแล้ว ระบบฯ สามารถใช้งานได้อย่างมีประสิทธิภาพมาจนถึงปัจจุบัน จึงออกหนังสือรับรองให้ไว้เป็นสำคัญ"
              </p>
            </div>

          </div>
        </div>
      </section>

      <!-- ========================================================
           UPCOMING CONTENT SUBMISSION NOTICE
      ========================================================= -->
      <section class="p-8 sm:p-10 rounded-[2.5rem] bg-gradient-to-br from-blue-950/30 via-sky-900/20 to-[#00C864]/10 border border-blue-500/30 shadow-xl space-y-4 text-center max-w-3xl mx-auto">
        <div class="w-14 h-14 rounded-2xl bg-blue-600/20 text-blue-600 dark:text-blue-400 flex items-center justify-center mx-auto shadow-md">
          <Building2 class="w-7 h-7" />
        </div>
        <h2 class="text-xl sm:text-2xl font-bold font-display text-[#022C22] dark:text-white">
          พร้อมอัปเดตผลงานและภาพสถานที่จริงเพิ่มเติม
        </h2>
        <p class="text-xs sm:text-sm opacity-80 leading-relaxed max-w-xl mx-auto">
          โครงสร้างหน้านี้พร้อมรับข้อมูล รูปภาพการติดตั้งจริงหน้าร้าน หน้าจอแสดงผลคิว และผลงานของลูกค้าเพิ่มเติม สามารถส่งภาพและรายละเอียดเข้ามาเพื่อเสริมเข้าไปในแต่ละหัวข้อได้ทันที
        </p>
      </section>

      <!-- ========================================================
           CONTACT SPECIALIST CARD
      ========================================================= -->
      <section
        id="contact-specialist"
        class="p-8 sm:p-10 rounded-[2.5rem] spatial-glass border border-blue-500/40 shadow-2xl space-y-6 bg-gradient-to-br from-white/90 via-blue-50/30 to-emerald-50/20 dark:from-black/70 dark:via-blue-950/20 dark:to-black/40 scroll-mt-28"
      >
        <div class="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 pb-6 border-b border-current/10">
          <div class="flex items-center gap-5">
            <div class="w-18 h-18 sm:w-20 sm:h-20 rounded-2xl bg-white dark:bg-black/50 border border-blue-500/30 p-2 shrink-0 flex items-center justify-center shadow-lg">
              <img
                src="/images/products/igenq-logo.png"
                alt="iGenQ Logo"
                class="w-full h-full object-contain"
              >
            </div>
            <div class="space-y-1">
              <div class="text-xs font-mono font-bold text-blue-600 dark:text-blue-400 uppercase tracking-wider flex items-center gap-1.5">
                <Phone class="w-3.5 h-3.5" />
                <span>INTERESTED & CONTACT // ปรึกษาและนัดหมายสาธิตระบบ iGenQ</span>
              </div>
              <h3 class="text-xl sm:text-2xl font-display font-black text-[#022C22] dark:text-white">
                บริษัท ไอเจนโก้ จำกัด (IGENCO CO., LTD.)
              </h3>
              <p class="text-xs sm:text-sm opacity-80">
                ผู้พัฒนาซอฟต์แวร์ระบบบริหารคิว iGenQ ประสบการณ์กว่า 12 ปี พร้อมทีมงานดูแลหลังการขายอย่างต่อเนื่อง
              </p>
            </div>
          </div>
        </div>

        <div class="flex flex-wrap items-center gap-4">
          <a
            href="tel:0817529549"
            class="px-5 py-3 rounded-2xl bg-blue-600 hover:bg-blue-700 text-white text-xs sm:text-sm font-bold font-mono transition-all flex items-center gap-2 shadow-md hover:scale-105 active:scale-95"
          >
            <Phone class="w-4 h-4" />
            <span>โทร. 081-752-9549</span>
          </a>

          <a
            href="tel:025325151"
            class="px-5 py-3 rounded-2xl spatial-glass border border-current/15 hover:bg-current/10 text-xs sm:text-sm font-bold font-mono transition-all flex items-center gap-2"
          >
            <Phone class="w-4 h-4 text-blue-500" />
            <span>โทร. 02-532-5151</span>
          </a>

          <a
            href="tel:025325160"
            class="px-5 py-3 rounded-2xl spatial-glass border border-current/15 hover:bg-current/10 text-xs sm:text-sm font-bold font-mono transition-all flex items-center gap-2"
          >
            <Phone class="w-4 h-4 text-blue-500" />
            <span>โทร. 02-532-5160-2</span>
          </a>

          <a
            href="mailto:thaweewat@igenco.co.th"
            class="px-5 py-3 rounded-2xl border border-blue-500/40 hover:bg-blue-500/20 text-xs sm:text-sm font-bold font-mono transition-all flex items-center gap-2 shadow-sm hover:scale-105 active:scale-95"
          >
            <Mail class="w-4 h-4 text-blue-500" />
            <span>thaweewat@igenco.co.th</span>
          </a>

          <div class="px-5 py-3 rounded-2xl bg-[#06C755]/15 border border-[#06C755]/30 text-xs sm:text-sm font-bold font-mono text-[#06C755] flex items-center gap-2">
            <span>LINE: thaweewat_wee</span>
          </div>
        </div>
      </section>

    </main>

    <!-- 3. Footer -->
    <ContactFooter />

    <!-- 4. Interactive Lightbox Modal -->
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
          class="fixed inset-0 z-[100] bg-black/90 backdrop-blur-xl flex items-center justify-center p-4 sm:p-8"
          @click="closeLightbox"
        >
          <button
            type="button"
            class="absolute top-5 right-5 w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-all z-10 cursor-pointer"
            @click="closeLightbox"
          >
            <X class="w-6 h-6" />
          </button>

          <div class="relative max-w-5xl max-h-[90vh] flex flex-col items-center space-y-3" @click.stop>
            <img
              :src="lightboxImage.url"
              :alt="lightboxImage.title"
              class="max-w-full max-h-[80vh] object-contain rounded-2xl shadow-2xl border border-white/20"
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
