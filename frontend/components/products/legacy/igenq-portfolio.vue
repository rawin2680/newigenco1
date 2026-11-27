<script setup lang="ts">
import { ref, onMounted } from 'vue'
import AppHeader from '~/components/AppHeader.vue'
import ContactFooter from '~/components/ContactFooter.vue'
import { useStrapiContent } from '~/composables/useStrapiContent'
import {
  ArrowLeft,
  ArrowUpRight,
  Trophy,
  Building2,
  CheckCircle2,
  ZoomIn,
  ChevronRight,
  X,
  Layers,
  MapPin,
  Monitor,
} from 'lucide-vue-next'
const { getPortfolioCases } = useStrapiContent()

onMounted(async () => {
  const strapiCases = await getPortfolioCases()
  if (strapiCases && strapiCases.length > 0) {
    const cmsCases = strapiCases.filter(c => !replacedClientNames.has(c.clientName.trim()) && c.clientName.trim() !== removedClientName)
    const cmsNames = new Set(cmsCases.map(c => c.clientName.trim()))
    const featuredCases = portfolioList.value.filter(c => replacedClientNames.has(c.clientName))
    const otherCases = portfolioList.value.filter(c => !replacedClientNames.has(c.clientName) && !cmsNames.has(c.clientName.trim()))
    portfolioList.value = [...featuredCases, ...cmsCases, ...otherCases]
  }
})

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
    document.body.style.overflow = quickViewItem.value ? 'hidden' : ''
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
  serviceList?: string[]
  serviceListTitle?: string
  gallery?: { src: string; caption: string }[]
  certificate?: string
  coverFit?: 'cover' | 'contain'
  videoUrl?: string
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

const districtOffice = 'ที่ทำการปกครองอำเภอเขาคิชฌกูฏ'
const chanthaburiCenter = 'ศูนย์บริการภาครัฐจังหวัดจันทบุรี'
const pcg = 'บริษัท เพอร์เฟค คอมพาเนียน กรุ๊ป จำกัด (PCG)'
const removedClientName = 'โนบิชา (NOBI CHA) สาขา บิ๊กซี ติวานนท์'
const cgh = 'โรงพยาบาลซีจีเอช (CGH Hospital)'
const replacedClientNames = new Set([districtOffice, chanthaburiCenter, `${chanthaburiCenter} (OSS)`, pcg, cgh, 'ที่ว่าการอำเภอสัตหีบ จังหวัดชลบุรี'])
const districtPhotos = '/images/products/igenq-khao-khitchakut'
const chanthaburiPhotos = '/images/products/igenq-chanthaburi'

const portfolioList = ref<PortfolioItem[]>([
  {
    id: 1,
    title: 'ระบบบริหารคิวอัจฉริยะ iGenQ',
    clientName: districtOffice,
    category: 'หน่วยงานราชการ',
    location: 'อำเภอเขาคิชฌกูฏ จังหวัดจันทบุรี',
    servicePoints: '5 จุดบริการงานทะเบียนและบัตรประจำตัวประชาชน',
    queueMode: 'แสดงคิวผ่าน Android Smart TV (TCL)',
    image: `${districtPhotos}/district-office.jpg`,
    coverFit: 'cover',
    highlight: '',
    description: 'ผลงานติดตั้งระบบจัดการคิว ณ ที่ว่าการอำเภอเขาคิชฌกูฏ หมู่ที่ 10 ถนนบำราศนราดูร ตำบลพลวง อำเภอเขาคิชฌกูฏ จังหวัดจันทบุรี',
    serviceList: [
      'งานทะเบียนราษฎร เทศบาลตำบลพลวง',
      'งานทะเบียนราษฎร เทศบาลตำบลชากไทย',
      'งานทะเบียนราษฎร เทศบาลตำบลตะเคียนทอง',
      'งานทะเบียนราษฎรและงานทะเบียนทั่วไป ตำบลจันทเขลมและตำบลคลองพลู',
      'งานบัตรประจำตัวประชาชน ขอมีบัตร ขอมีบัตรใหม่ และขอเปลี่ยนบัตร'
    ],
    gallery: [
      { src: `${districtPhotos}/tv-installation.jpg`, caption: 'การติดตั้ง Android Smart TV' },
      { src: `${districtPhotos}/queue-display.jpg`, caption: 'หน้าจอแสดงหมายเลขคิวและช่องบริการ' },
      { src: `${districtPhotos}/installation-team.jpg`, caption: 'ภาพการส่งมอบระบบ ณ จุดบริการ' },
      { src: `${districtPhotos}/service-counters.jpg`, caption: 'ป้ายช่องบริการงานทะเบียนและบัตรประชาชน' }
    ],
    videoUrl: 'https://www.youtube.com/watch?v=QfTbxuN2oJA',
    results: [],
    tags: ['หน่วยงานราชการ', 'iGenQ']
  },
  {
    id: 2,
    title: 'ระบบบริหารคิวอัจฉริยะ iGenQ',
    clientName: chanthaburiCenter,
    category: 'หน่วยงานราชการ',
    location: 'ศาลากลางจังหวัดจันทบุรี ถ.เลียบเนิน',
    servicePoints: 'ครอบคลุม 8 หน่วยงานราชการบริการร่วม (One Stop Service)',
    queueMode: 'ให้บริการทั้งแบบ On-site และ Online',
    image: `${chanthaburiPhotos}/cover.png`,
    gallery: [{ src: `${chanthaburiPhotos}/on-site.png`, caption: 'ภาพหน้างานที่ศูนย์บริการภาครัฐจังหวัดจันทบุรี' }],
    certificate: `${chanthaburiPhotos}/certificate.png`,
    highlight: 'ได้รับหนังสือรับรองผลงานอย่างเป็นทางการ (ที่ จบ ๐๐๑๗.๓/๒๑๐) ลงนามแทนผู้ว่าฯ',
    description: 'Chanthaburi Government Service Center ดำเนินงานโดยสำนักงานจังหวัดจันทบุรี (กลุ่มงานศูนย์ดำรงธรรมจังหวัด) ให้บริการประชาชนทั้งแบบ On-site และ Online ด้วยตู้กดบัตรคิว Touch Screen และระบบลงทะเบียนรับบัตรคิวออนไลน์',
    results: [
      'ได้รับหนังสือรับรองผลงานอย่างเป็นทางการ ให้ไว้ ณ วันที่ ๒๖ กันยายน ๒๕๖๖',
      'เชื่อมโยงบริการ 8 หน่วยงาน: อำเภอ...ยิ้ม, การไฟฟ้า, การประปา, ไปรษณีย์, ขนส่ง, NT, แรงงาน และศูนย์ดำรงธรรม',
      'ระบบทำงานเสถียรและใช้งานอย่างมีประสิทธิภาพต่อเนื่องมาจนถึงปัจจุบัน'
    ],
    tags: ['หนังสือรับรองผลงาน', 'ศาลากลางจังหวัดจันทบุรี', 'OSS', '8 หน่วยงานรัฐ']
  },
  {
    id: 3,
    title: 'ระบบบริหารคิวอัจฉริยะ iGenQ',
    clientName: pcg,
    category: 'องค์กรเอกชน',
    location: 'สมุทรปราการ (คลังสินค้าและโรงงาน)',
    servicePoints: 'จุดรับและส่งสินค้าอาหารสัตว์',
    queueMode: 'บัตรคิวออนไลน์ จอง Time Slot และแจ้งเตือนผ่าน LINE',
    image: '/images/products/client-pcg.svg',
    highlight: '',
    description: 'ระบบคิวโลจิสติกส์สำหรับรถขนส่งสินค้าอาหารสัตว์ในเครือ CP รองรับการรับและส่งสินค้าตามคิวหรือตามเวลานัดหมาย',
    serviceListTitle: 'คุณสมบัติระบบคิวขนส่ง',
    serviceList: [
      'พนักงานขนส่งกดรับบัตรคิวออนไลน์ได้เมื่ออยู่ในพื้นที่ที่กำหนด',
      'จองช่วงเวลา (Time Slot) เพื่อเข้ามารับหรือส่งสินค้าล่วงหน้าได้',
      'เมื่อถึงคิวหรือเวลานัดหมายและพนักงานขนส่งแจ้งคิวแล้ว ระบบจะเรียกคิวอัตโนมัติทันทีที่ประตูจ่ายสินค้าว่าง พร้อมแจ้งเตือนผ่าน LINE'
    ],
    gallery: [{ src: '/images/products/igenq-pcg-logistics.jpg', caption: 'แผนภาพระบบลงทะเบียนและจัดการคิวขนส่ง' }],
    results: [],
    tags: ['PCG', 'Logistics Queue', 'Time Slot', 'LINE']
  },
  {
    id: 4,
    title: 'ระบบบริหารคิวอัจฉริยะ iGenQ',
    clientName: cgh,
    category: 'โรงพยาบาล',
    location: 'กรุงเทพมหานคร',
    servicePoints: 'บริการฉีดวัคซีนป้องกันไข้หวัดใหญ่และตรวจสุขภาพพนักงานประจำปี',
    queueMode: 'ลงทะเบียนและจัดลำดับคิวตามจุดบริการ',
    image: '/images/products/client-cgh.svg',
    highlight: '',
    description: 'iGenQ ช่วยโรงพยาบาลซีจีเอชจัดคิวฉีดวัคซีนป้องกันไข้หวัดใหญ่และลงทะเบียนตรวจสุขภาพพนักงานประจำปี ให้ผู้รับบริการเข้ารับบริการตามลำดับในแต่ละจุด',
    gallery: [
      { src: '/images/products/igenq-cgh/vaccination.png', caption: 'จอประชาสัมพันธ์บริการฉีดวัคซีนป้องกันไข้หวัดใหญ่' },
      { src: '/images/products/igenq-cgh/queue-workflow.png', caption: 'แผนภาพขั้นตอนการจัดคิวหน้างาน' }
    ],
    results: [],
    tags: ['CGH Hospital', 'วัคซีนไข้หวัดใหญ่', 'ตรวจสุขภาพประจำปี']
  }
])

</script>

<template>
  <div class="igenq-portfolio min-h-screen relative selection:bg-blue-600 selection:text-white flex flex-col justify-between text-slate-800 dark:text-slate-100">
    
    <!-- Subtle Architectural Grid Background (Matches Homepage Design System) -->
    

    <!-- 1. Header Navigation -->
    <AppHeader />

    <!-- 2. Main Page Content -->
    <main class="pt-28 pb-20 px-5 sm:px-10 lg:px-16 max-w-[1440px] mx-auto w-full flex-1 relative z-10 space-y-8 sm:space-y-12">
      
      <!-- Top Breadcrumbs & Back Link -->
      <div class="flex items-center justify-between gap-4 border-b border-current/10 pb-4">
        <NuxtLink
          to="/products/igenq"
          class="inline-flex items-center gap-2 text-xs sm:text-sm font-bold font-mono text-blue-700 dark:text-blue-300 hover:underline group"
        >
          <ArrowLeft class="w-4 h-4 group-hover:-translate-x-1.5 transition-transform" />
          <span>ย้อนกลับไปหน้าระบบ iGenQ</span>
        </NuxtLink>

        <div class="hidden sm:flex items-center gap-2 text-xs font-mono opacity-60">
          <NuxtLink to="/" class="hover:text-blue-600">หน้าแรก</NuxtLink>
          <ChevronRight class="w-3.5 h-3.5" />
          <span>ผลิตภัณฑ์</span>
          <ChevronRight class="w-3.5 h-3.5" />
          <NuxtLink to="/products/igenq" class="hover:text-blue-600">iGenQ</NuxtLink>
          <ChevronRight class="w-3.5 h-3.5" />
          <span class="text-blue-700 dark:text-blue-300 font-bold">ผลงานและความสำเร็จ</span>
        </div>
      </div>

      <!-- ========================================================
           1. STANDARDIZED SECTION HEADER (CASE STUDIES // ผลงานของเรา)
      ========================================================= -->
      <section class="max-w-4xl">
        <div class="space-y-4 sm:space-y-5">
          <span class="inline-flex items-center gap-1.5 rounded-full border border-blue-500/30 bg-blue-600/15 px-3.5 py-1 text-xs font-mono font-bold text-blue-800 dark:text-blue-300">
            <Trophy class="w-3.5 h-3.5" />
            กรณีศึกษา iGenQ
          </span>

          <h1 class="font-display font-black text-3xl sm:text-4xl lg:text-5xl tracking-tight leading-[1.25] text-[#022C22] dark:text-white">
            ผลงานและความสำเร็จของ <span class="text-blue-600 dark:text-blue-300">iGenQ</span>
          </h1>
          <p class="text-sm sm:text-base opacity-80 leading-relaxed text-slate-700 dark:text-slate-300 max-w-3xl">
            รวมเคสตัวอย่างการติดตั้งระบบบริหารคิวอัจฉริยะ iGenQ ที่ใช้งานจริงในหน่วยงานราชการ โรงพยาบาล และองค์กรธุรกิจชั้นนำ ช่วยยกระดับการบริการ ลดความแออัด และสร้างความประทับใจให้ผู้รับบริการ
          </p>
          <div class="flex flex-wrap items-center gap-3.5 pt-2">
            <a href="#portfolio-projects" class="inline-flex items-center gap-2 rounded-2xl bg-blue-600 px-6 py-3.5 text-sm font-bold text-white shadow-lg transition-colors hover:bg-blue-700">
              ดูผลงาน
              <ArrowUpRight class="h-4 w-4" aria-hidden="true" />
            </a>
            <a href="#contact" class="rounded-2xl border border-current/15 spatial-glass px-6 py-3.5 text-sm font-bold transition-colors hover:bg-blue-500/10">
              ติดต่อสอบถาม
            </a>
          </div>
        </div>
      </section>

      <section id="portfolio-projects" aria-label="ผลงาน iGenQ" class="scroll-mt-28">
        <TransitionGroup name="portfolio-shuffle" tag="div" class="relative grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
          <article
            v-for="item in portfolioList"
            :key="`${item.id}-${item.clientName}`"
            class="flex min-w-0 flex-col overflow-hidden rounded-2xl border border-current/10 bg-white/85 shadow-sm transition-[border-color,box-shadow] hover:border-blue-500/45 hover:shadow-lg focus-within:border-blue-500/45 dark:bg-black/50"
          >
            <div class="grid aspect-[16/10] min-h-0 grid-rows-1 place-items-center overflow-hidden border-b border-current/10 bg-blue-50/60 p-4 dark:bg-blue-950/30">
              <img
                v-if="item.image"
                :src="item.image"
                :alt="item.clientName"
                loading="lazy"
                decoding="async"
                class="h-full min-h-0 w-full"
                :class="item.coverFit === 'cover' ? 'rounded-lg object-cover' : 'object-contain'"
              >
              <Building2 v-else class="h-10 w-10 text-blue-700/50 dark:text-blue-300/50" aria-hidden="true" />
            </div>

            <div class="flex flex-1 flex-col gap-3 p-5">
              <div class="flex flex-wrap items-center gap-x-3 gap-y-2">
                <p class="rounded-md bg-blue-600/10 px-2 py-1 text-xs font-semibold text-blue-800 dark:text-blue-300">{{ item.category }}</p>
                <span v-if="item.location" class="inline-flex items-center gap-1 text-xs text-slate-600 dark:text-slate-300">
                  <MapPin class="h-3.5 w-3.5 shrink-0 text-blue-600 dark:text-blue-300" aria-hidden="true" />
                  {{ item.location }}
                </span>
              </div>
              <div class="space-y-1.5">
                <h2 class="portfolio-card-title font-display text-lg font-bold leading-snug sm:text-xl">{{ item.clientName }}</h2>
                <p v-if="item.title" class="text-sm font-semibold leading-relaxed text-slate-700 dark:text-slate-200">{{ item.title }}</p>
              </div>
              <p v-if="item.description" class="line-clamp-3 text-sm leading-relaxed text-slate-600 dark:text-slate-300">{{ item.description }}</p>
              <div class="mt-auto pt-2">
                <button
                  type="button"
                  class="flex min-h-11 w-full items-center justify-between gap-2 rounded-xl border border-blue-500/25 bg-blue-600/10 px-3.5 py-2 text-sm font-bold text-blue-800 transition-colors hover:bg-blue-600/20 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600 dark:text-blue-300"
                  :aria-label="`ดูรายละเอียด ${item.clientName}`"
                  @click="openQuickView(item)"
                >
                  ดูรายละเอียด
                  <ArrowUpRight class="h-4 w-4" aria-hidden="true" />
                </button>
              </div>
            </div>
          </article>
        </TransitionGroup>
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
            class="relative my-auto flex max-h-[90dvh] w-full max-w-3xl flex-col overflow-hidden rounded-[2rem] border border-blue-500/35 bg-white/95 shadow-2xl dark:bg-slate-950/95"
            @click.stop
          >
            <!-- Modal Header -->
            <div class="p-6 sm:p-8 pb-4 border-b border-current/10 flex items-start justify-between gap-4">
              <div class="space-y-1.5">
                <div class="flex flex-wrap items-center gap-2">
                  <span class="px-3 py-0.5 rounded-full text-xs font-mono font-bold bg-blue-600/15 text-blue-700 dark:text-blue-300 border border-blue-500/30">
                    {{ quickViewItem.category }}
                  </span>
                  <span class="text-xs font-mono opacity-65 flex items-center gap-1">
                    <MapPin class="w-3.5 h-3.5 text-blue-600" />
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
            <div class="min-h-0 flex-1 space-y-6 overflow-y-auto p-6 sm:p-8">
              <!-- Image Container -->
              <div
                v-if="quickViewItem.image"
                class="aspect-video rounded-2xl overflow-hidden border border-blue-500/20 bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-950/60 dark:to-slate-950 p-3 flex items-center justify-center cursor-zoom-in relative group"
                @click="openLightbox(quickViewItem.image, quickViewItem.clientName, quickViewItem.title)"
              >
                <img
                  :src="quickViewItem.image"
                  :alt="quickViewItem.clientName"
                  class="w-full h-full object-contain rounded-xl"
                >
                <span class="absolute bottom-3 right-3 px-2.5 py-1 rounded-lg bg-black/70 text-white text-[11px] font-mono flex items-center gap-1 opacity-80 group-hover:opacity-100">
                  <ZoomIn class="w-3.5 h-3.5 text-blue-300" />
                  <span>ขยายภาพ</span>
                </span>
              </div>

              <!-- Deployment Specs Grid -->
              <div class="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                <div class="p-3.5 rounded-2xl bg-black/[0.03] dark:bg-white/[0.04] border border-current/10 space-y-1">
                  <div class="font-mono font-bold text-blue-700 dark:text-blue-300 flex items-center gap-1.5">
                    <Layers class="w-3.5 h-3.5" />
                    <span>จุดบริการที่ติดตั้ง:</span>
                  </div>
                  <p class="opacity-85 leading-relaxed">{{ quickViewItem.servicePoints }}</p>
                </div>
                <div class="p-3.5 rounded-2xl bg-black/[0.03] dark:bg-white/[0.04] border border-current/10 space-y-1">
                  <div class="font-mono font-bold text-blue-700 dark:text-blue-300 flex items-center gap-1.5">
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

              <section v-if="quickViewItem.serviceList?.length" class="space-y-3">
                <h4 class="font-display text-base font-bold">{{ quickViewItem.serviceListTitle || 'จุดบริการในระบบคิว' }}</h4>
                <ol class="space-y-2">
                  <li
                    v-for="(service, index) in quickViewItem.serviceList"
                    :key="service"
                    class="flex items-start gap-3 rounded-xl border border-blue-500/15 bg-blue-600/5 p-3 text-sm leading-relaxed"
                  >
                    <span class="grid size-6 shrink-0 place-items-center rounded-md bg-blue-600/10 text-xs font-bold text-blue-800 dark:text-blue-300" aria-hidden="true">{{ index + 1 }}</span>
                    <span>{{ service }}</span>
                  </li>
                </ol>
              </section>

              <section v-if="quickViewItem.gallery?.length" class="space-y-3">
                <h4 class="font-display text-base font-bold">{{ quickViewItem.serviceListTitle ? 'ภาพประกอบ' : 'ภาพหน้างาน' }}</h4>
                <div class="grid grid-cols-1 gap-3 sm:grid-cols-2">
                  <button
                    v-for="photo in quickViewItem.gallery"
                    :key="photo.src"
                    type="button"
                    class="group overflow-hidden rounded-xl border border-current/10 text-left hover:border-blue-500/50 focus-visible:outline-blue-600"
                    @click="openLightbox(photo.src, photo.caption)"
                  >
                    <img :src="photo.src" alt="" loading="lazy" class="aspect-video w-full bg-blue-50 object-contain dark:bg-slate-900">
                    <span class="flex items-center justify-between gap-2 px-3 py-2 text-xs font-semibold sm:text-sm">
                      {{ photo.caption }}
                      <ZoomIn class="size-4 shrink-0 text-blue-600 dark:text-blue-300" aria-hidden="true" />
                    </span>
                  </button>
                </div>
              </section>

              <button
                v-if="quickViewItem.certificate"
                type="button"
                class="flex w-full items-center gap-3 rounded-xl border border-blue-500/25 bg-blue-600/10 p-3 text-left hover:bg-blue-600/20 focus-visible:outline-blue-600"
                @click="openLightbox(quickViewItem.certificate, 'หนังสือรับรองผลงาน หน่วยงานภาครัฐ')"
              >
                <img :src="quickViewItem.certificate" alt="" loading="lazy" class="h-20 w-16 shrink-0 rounded-md bg-white object-contain">
                <span class="flex-1 text-sm font-bold text-blue-800 dark:text-blue-300">หนังสือรับรองผลงาน หน่วยงานภาครัฐ</span>
                <ZoomIn class="size-5 shrink-0 text-blue-600 dark:text-blue-300" aria-hidden="true" />
              </button>

              <a
                v-if="quickViewItem.videoUrl"
                :href="quickViewItem.videoUrl"
                target="_blank"
                rel="noopener noreferrer"
                class="flex items-center gap-3 rounded-xl border border-blue-500/25 bg-blue-600/10 p-4 text-blue-800 hover:bg-blue-600/20 dark:text-blue-300"
              >
                <Monitor class="size-5 shrink-0" aria-hidden="true" />
                <span class="flex-1 text-sm font-bold">ดูวิดีโอสาธิตการแสดงคิวผ่าน Android Smart TV (TCL) บน YouTube</span>
                <ArrowUpRight class="size-4 shrink-0" aria-hidden="true" />
              </a>

              <!-- Key Outcomes -->
              <div v-if="quickViewItem.results.length" class="space-y-2 pt-2 border-t border-current/10">
                <div class="text-xs font-mono font-bold text-blue-700 dark:text-blue-300 uppercase">
                  ผลลัพธ์และความสำเร็จ (Key Outcomes):
                </div>
                <ul class="space-y-1.5 text-xs sm:text-sm opacity-90">
                  <li
                    v-for="(res, idx) in quickViewItem.results"
                    :key="idx"
                    class="flex items-start gap-2"
                  >
                    <CheckCircle2 class="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
                    <span>{{ res }}</span>
                  </li>
                </ul>
              </div>
            </div>

            <!-- Modal Footer -->
            <div class="p-5 sm:px-8 border-t border-current/10 bg-black/[0.02] dark:bg-white/[0.02] flex flex-wrap items-center justify-between gap-3">
              <NuxtLink
                to="/contact"
                class="px-5 py-2.5 rounded-xl bg-blue-600 text-white font-bold text-xs flex items-center gap-1.5 hover:opacity-90 transition-all shadow-md"
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
.igenq-portfolio {
  --heading-accent-end: #1d4ed8;
  --heading-signal: #2563eb;
}

:global(html.dark) .igenq-portfolio {
  --heading-accent-end: #93c5fd;
  --heading-signal: #60a5fa;
}

.portfolio-card-title::after {
  content: none;
}

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
