<script setup lang="ts">
import { ref } from 'vue'
import AppHeader from '~/components/AppHeader.vue'
import ContactFooter from '~/components/ContactFooter.vue'
import {
  ArrowLeft,
  ArrowUpRight,
  Sparkles,
  QrCode,
  Bell,
  Smartphone,
  Tv,
  Volume2,
  CheckCircle2,
  XCircle,
  Maximize2,
  ZoomIn,
  Download,
  FileText,
  Phone,
  Mail,
  ExternalLink,
  ShieldCheck,
  Users,
  Building2,
  Layers,
  ChevronRight,
  X,
  Clock,
  Laptop,
  Check,
  Tag,
  Store,
  HeartHandshake,
  FileCheck2,
  Video,
  Award
} from 'lucide-vue-next'
import { useTheme } from '~/composables/useTheme'

const { showToast } = useTheme()

useHead({
  title: 'iGenQ (ระบบบริหารคิวอัจฉริยะ) - บริษัท ไอเจนโก้ จำกัด (IGENCO)',
  meta: [
    {
      name: 'description',
      content: 'iGenQ ระบบบริหารคิวอัจฉริยะแบบ New Normal ใช้งานได้ทันทีโดยไม่ต้องติดตั้ง App แจ้งเตือนผ่าน LINE ไม่ต้องยืนรอคิว ซอฟต์แวร์คนไทย 100% พัฒนาโดย บริษัท ไอเจนโก้ จำกัด'
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

// Quick stats ribbon (4 จุดเด่นคิวอัจฉริยะ)
const stats = [
  { label: 'รูปแบบการใช้งาน', value: 'ไม่ต้องติดตั้ง App', sub: 'สแกน QR Code บนมือถือ เข้าใช้งานได้ทันที' },
  { label: 'ระบบแจ้งเตือนคิว', value: 'LINE Notify Alert', sub: 'แจ้งเตือนเมื่อถึงคิว ไม่ต้องยืนรอด้านหน้า' },
  { label: 'ระบบออกเสียงเรียก', value: 'Smart TV & Bluetooth', sub: 'รองรับ Android TV, แท็บเล็ต และลำโพงบลูทูธ' },
  { label: 'มาตรฐานลิขสิทธิ์', value: 'ซอฟต์แวร์ไทย 100%', sub: 'มีหนังสือรับรองการแจ้งผลงานลิขสิทธิ์ถูกต้อง' }
]

// 8 Key Benefits of iGenQ
const keyBenefits = [
  {
    icon: Clock,
    title: 'ลดปัญหาการกดบัตรคิวแบบเดิม',
    desc: 'บอกลาการต่อแถวเข้าคิวที่ใช้เวลานาน ลูกค้าสามารถดูจำนวนคิวที่รอเรียกและลำดับของตนเองได้แบบเรียลไทม์'
  },
  {
    icon: Bell,
    title: 'ไม่ต้องยืนรอคิวหน้าร้าน',
    desc: 'ระบบส่งข้อความแจ้งเตือนอัตโนมัติผ่าน LINE เมื่อใกล้ถึงคิว ลูกค้าสามารถไปทำธุระอื่นระหว่างรอคิวได้อย่างสบายใจ'
  },
  {
    icon: ShieldCheck,
    title: 'ลดความเสี่ยงจากการสัมผัสหน้าจอ',
    desc: 'ลดการสัมผัสปุ่มกดบัตรคิวหรือตู้คีออสที่เสี่ยงต่อการแพร่กระจายเชื้อโรค จัดการคิวได้อย่างถูกสุขอนามัยแบบ New Normal'
  },
  {
    icon: Smartphone,
    title: 'กดบัตรคิวออนไลน์ด้วย Smartphone',
    desc: 'ลูกค้าเพียงใช้สมาร์ทโฟนของตนเองสแกน QR Code ของร้านค้าเพื่อรับบัตรคิวอิเล็กทรอนิกส์ (e-Ticket) ทันที'
  },
  {
    icon: Tv,
    title: 'ลดค่าใช้จ่ายอุปกรณ์ Hardware',
    desc: 'ไม่ต้องลงทุนซื้อตู้คีออสหรือเซิร์ฟเวอร์ราคาแพง ใช้งานร่วมกับ Tablet, Smart Phone หรือ Smart TV ที่มีอยู่แล้วได้เลย'
  },
  {
    icon: Volume2,
    title: 'ออกเสียงเรียกคิวผ่านลำโพง & Smart TV',
    desc: 'ระบบสามารถออกเสียงเรียกคิวอัตโนมัติผ่านลำโพง Bluetooth, โทรศัพท์มือถือ, แท็บเล็ต หรือจอ Android TV'
  },
  {
    icon: Sparkles,
    title: 'ลดการใช้กระดาษ ช่วยลดภาวะโลกร้อน',
    desc: 'เปลี่ยนบัตรคิวกระดาษเป็น e-Ticket บนจอมือถือ ลดขยะกระดาษและประหยัดต้นทุนหมึกพิมพ์ได้อย่างยั่งยืน'
  },
  {
    icon: QrCode,
    title: 'ประเมินความพึงพอใจผ่าน e-Ticket',
    desc: 'เมื่อรับบริการเสร็จ ลูกค้าสามารถสแกน QR Code ในบัตรคิวเพื่อทำแบบประเมินความพึงพอใจให้ร้านค้าได้ทันที'
  }
]

// 5 New Normal Steps
const queueSteps = [
  {
    step: 'STEP 01',
    title: 'กดบัตรคิว',
    desc: 'สแกน QR Code เพื่อกดบัตรคิวผ่านมือถือ หรือกดบัตรคิวที่หน้าจอ Touch Screen ของร้านค้า'
  },
  {
    step: 'STEP 02',
    title: 'แสดงเลขคิวบนมือถือ',
    desc: 'ระบบจะแสดงเลขคิวและจำนวนคิวที่รออยู่ พร้อมปุ่มเชื่อมต่อ LINE เพื่อรับการแจ้งเตือน'
  },
  {
    step: 'STEP 03',
    title: 'แจ้งเตือนเมื่อถึงคิว',
    desc: 'ระบบจะเรียกคิวผ่าน LINE Notify อัตโนมัติ พร้อมแสดงผลคิวบนหน้าจอ TV หรือ Monitor หน้าร้าน'
  },
  {
    step: 'STEP 04',
    title: 'เข้าใช้บริการ',
    desc: 'ผู้รับบริการแสดง e-Ticket บนมือถือและเข้ารับบริการตามช่องหรือโต๊ะที่เจ้าหน้าที่เรียก'
  },
  {
    step: 'STEP 05',
    title: 'ประเมินความพึงพอใจ',
    desc: 'หลังใช้บริการเสร็จ สามารถสแกน QR Code เพื่อทำแบบสอบถามประเมินความพึงพอใจได้ทันที'
  }
]

// Staff Benefits vs User Benefits
const staffBenefits = [
  'สร้างห้องคิวได้หลายห้อง และรองรับหลายจุดบริการพร้อมกัน',
  'รองรับการสั่งพิมพ์บัตรคิวผ่านเครื่อง Thermal Printer (กรณีลูกค้าไม่มีสมาร์ทโฟน)',
  'ใช้งานได้ทันทีบนเว็บเบราว์เซอร์ ไม่ต้องติดตั้ง Application ใดๆ',
  'สร้างแบบประเมินความพึงพอใจหลังการใช้บริการได้เอง',
  'เพิ่มประสิทธิภาพการทำงานของพนักงาน และสร้างภาพลักษณ์ที่ทันสมัยให้ธุรกิจ'
]

const customerBenefits = [
  'สแกน QR Code เพื่อกดบัตรคิวได้อย่างรวดเร็วและปลอดภัย',
  'ดูเลขคิวของท่าน และจำนวนคิวที่กำลังรออยู่ได้ตลอดเวลา',
  'เชื่อมต่อกับ LINE เพื่อรับการแจ้งเตือน Line Notify เมื่อถึงคิว',
  'ไม่ต้องยืนรอคิวหน้าร้าน สามารถเดินเล่น ช้อปปิ้ง หรือทำธุระอื่นได้',
  'ทำแบบสอบถามประเมินความพึงพอใจหลังรับบริการได้อย่างสะดวก'
]

// Portfolio Clients
const portfolioClients = [
  { name: 'Perfect Companion Group', code: 'PCG', desc: 'ผู้นำอุตสาหกรรมอาหารสัตว์เลี้ยงระดับสากล' },
  { name: 'โรงพยาบาล ซีจีเอช', code: 'CGH HOSPITAL', desc: 'โรงพยาบาลเอกชนชั้นนำ บริหารคิวผู้รับบริการทางการแพทย์' },
  { name: 'โนบิชา (NOBI CHA)', code: 'NOBI CHA', desc: 'แฟรนไชส์ชาไข่มุกยอดนิยม สาขา บิ๊กซี ติวานนท์' },
  { name: 'ศูนย์บริการร่วม ศาลากลางจันทบุรี', code: 'Gov Service Center', desc: 'ศาลากลางจังหวัดจันทบุรี ได้รับหนังสือรับรองผลงาน (ที่ จบ ๐๐๑๗.๓/๒๑๐) ครอบคลุม 8 หน่วยงาน' }
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
  <div class="min-h-screen relative selection:bg-[#2563EB] selection:text-white flex flex-col justify-between  text-slate-800 dark:text-slate-100">
    <!-- 1. Header Navigation -->
    <AppHeader />

    <!-- 2. Main Page Content -->
    <main class="pt-28 pb-20 px-5 sm:px-10 lg:px-16 max-w-[1440px] mx-auto w-full flex-1 relative z-10 space-y-16 sm:space-y-24">
      
      <!-- Top Breadcrumbs & Back Link -->
      <div class="flex items-center justify-between gap-4 border-b border-current/10 pb-4">
        <NuxtLink
          to="/#products"
          class="inline-flex items-center gap-2 text-xs sm:text-sm font-bold font-mono text-[#00C864] dark:text-[#00FF88] hover:underline group"
        >
          <ArrowLeft class="w-4 h-4 group-hover:-translate-x-1.5 transition-transform" />
          <span>ย้อนกลับไปหน้าแคตตาล็อกสินค้า</span>
        </NuxtLink>

        <div class="hidden sm:flex items-center gap-2 text-xs font-mono opacity-60">
          <span>หน้าแรก</span>
          <ChevronRight class="w-3.5 h-3.5" />
          <span>ผลิตภัณฑ์</span>
          <ChevronRight class="w-3.5 h-3.5" />
          <span class="text-blue-600 dark:text-blue-400 font-bold">iGenQ (ระบบบริหารคิวอัจฉริยะ)</span>
        </div>
      </div>

      <!-- ========================================================
           HERO SECTION: PRODUCT OVERVIEW & LOGO SHOWCASE
      ========================================================= -->
      <section class="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
        <!-- Left Column: Title, Slogan, Narrative (7 Cols) -->
        <div class="lg:col-span-7 space-y-6">
          <div class="flex flex-wrap items-center gap-2.5">
            <span class="px-3.5 py-1 rounded-full text-xs font-mono font-bold bg-blue-600/15 text-blue-600 dark:bg-blue-500/20 dark:text-blue-300 border border-blue-500/30">
              ซอฟต์แวร์อัจฉริยะ // 03
            </span>
            <span class="px-3.5 py-1 rounded-full text-xs font-mono font-bold bg-[#00C864]/15 text-[#00A854] dark:bg-[#00FF88]/15 dark:text-[#00FF88]">
              NEW NORMAL QUEUE
            </span>
            <span class="px-3.5 py-1 rounded-full text-xs font-mono opacity-70 border border-current/10">
              THAI SOFTWARE 100%
            </span>
          </div>

          <div class="space-y-3">
            <h1 class="font-display font-black text-3xl sm:text-5xl lg:text-6xl tracking-tight leading-[1.15] text-[#022C22] dark:text-white">
              iGen<span class="text-blue-600 dark:text-blue-400">Q</span>
            </h1>
            <div class="text-lg sm:text-2xl font-bold text-blue-600 dark:text-blue-300 font-display">
              ระบบบริหารคิวอัจฉริยะแบบ New Normal ใช้งานได้ทันทีโดยไม่ต้องติดตั้ง App
            </div>
            <div class="inline-block px-4 py-1.5 rounded-xl bg-blue-600/10 dark:bg-blue-400/10 text-xs sm:text-sm font-mono font-bold text-blue-700 dark:text-blue-300 border border-blue-500/20">
              “ บริหารจัดการคิวอัจฉริยะ ไม่ต้องยืนรอ ลดความเสี่ยง // Smart Queue Management ”
            </div>
          </div>

          <div class="space-y-3 text-sm sm:text-base opacity-85 leading-relaxed text-slate-700 dark:text-slate-300">
            <p>
              <strong>iGenQ</strong> เป็นระบบจัดการคิวแบบ New Normal ที่ช่วยอำนวยความสะดวกให้แก่ทั้งเจ้าของธุรกิจและลูกค้า ผู้รับบริการสามารถกดบัตรคิวออนไลน์ด้วย Smart Phone ของตนเองเพียงสแกน QR Code และมีระบบแจ้งเตือนผ่าน <strong>LINE Notify</strong> เมื่อถึงคิว ทำให้ไม่ต้องยืนรอคิวหน้าร้าน ลดความแออัด และลดความเสี่ยงจากการสัมผัสหน้าจอตู้คีออส
            </p>
            <p>
              <strong>ซอฟต์แวร์คนไทย 100%:</strong> พัฒนาโดย <strong>บริษัท ไอเจนโก้ จำกัด</strong> ที่สั่งสมประสบการณ์ด้านซอฟต์แวร์องค์กรมากว่า 12 ปี พร้อมทีมงานดูแลหลังการขายอย่างต่อเนื่อง มีสื่อวิดีโอออนไลน์สอนการใช้งานเข้าใจง่าย รองรับการแสดงผลและออกเสียงเรียกคิวผ่านลำโพง Bluetooth, Smart Phone, Tablet หรือ Android TV
            </p>
          </div>

          <!-- Hero Action Buttons -->
          <div class="flex flex-wrap items-center gap-3.5 pt-2">
            <button
              type="button"
              class="px-6 py-3.5 rounded-2xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs sm:text-sm font-mono transition-all flex items-center gap-2 shadow-lg hover:scale-105 active:scale-95 cursor-pointer"
              @click="scrollToContact"
            >
              <span>ติดต่อสอบถาม / นัดหมายสาธิตระบบ</span>
              <ArrowUpRight class="w-4 h-4" />
            </button>

            <!-- Prominent Button to Portfolio Page -->
            <NuxtLink
              to="/products/igenq-portfolio"
              class="px-5 py-3.5 rounded-2xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-bold text-xs sm:text-sm font-mono transition-all flex items-center gap-2 shadow-lg hover:scale-105 active:scale-95 border border-blue-400/40"
            >
              <Sparkles class="w-4 h-4 text-amber-300" />
              <span>ดูหน้าผลงานจริง (iGenQ Portfolio)</span>
              <ArrowUpRight class="w-4 h-4" />
            </NuxtLink>

            <!-- Button to Chanthaburi Government Performance Certificate Lightbox -->
            <button
              type="button"
              class="px-5 py-3.5 rounded-2xl spatial-glass border border-amber-500/40 hover:border-amber-500 font-bold text-xs sm:text-sm font-mono transition-all flex items-center gap-2 shadow-sm hover:scale-105 active:scale-95 cursor-pointer text-amber-700 dark:text-amber-300"
              @click="openLightbox('/images/products/igenq-cert-chanthaburi.jpg', 'หนังสือรับรองผลงาน ศาลากลางจังหวัดจันทบุรี', 'บริษัท ไอเจนโก้ จำกัด ได้รับจ้างทำเครื่องกดบัตรคิว Touch Screen และระบบจัดการคิวออนไลน์ สัญญาเลขที่ ๔๘/๒๕๖๕')"
            >
              <Award class="w-4 h-4 text-amber-500" />
              <span>ดูหนังสือรับรองผลงาน (ศาลากลางจันทบุรี)</span>
              <ZoomIn class="w-3.5 h-3.5 opacity-60" />
            </button>

            <a
              href="https://drive.google.com/file/d/1gGA7notTLil-SHNMrnYROxBZka0dfM8B/view?usp=sharing"
              target="_blank"
              rel="noopener noreferrer"
              class="px-5 py-3.5 rounded-2xl spatial-glass border border-blue-500/30 hover:border-blue-500 font-bold text-xs sm:text-sm font-mono transition-all flex items-center gap-2 shadow-sm hover:scale-105 active:scale-95"
            >
              <FileCheck2 class="w-4 h-4 text-blue-500" />
              <span>ดูหนังสือรับรองผลงานลิขสิทธิ์</span>
              <ExternalLink class="w-3.5 h-3.5 opacity-60" />
            </a>
          </div>
        </div>

        <!-- Right Column: Logo & Poster Showcase (5 Cols) -->
        <div class="lg:col-span-5 relative">
          <div class="relative p-6 sm:p-8 rounded-[2.5rem] spatial-glass border border-blue-500/30 shadow-2xl bg-gradient-to-br from-blue-900/20 via-white/50 dark:via-black/40 to-[#00C864]/10 overflow-hidden flex flex-col items-center text-center space-y-6">
            
            <!-- Ambient Glow -->
            <div class="absolute -top-16 -right-16 w-48 h-48 bg-blue-500/20 rounded-full blur-3xl pointer-events-none" />
            <div class="absolute -bottom-16 -left-16 w-48 h-48 bg-[#00FF88]/20 rounded-full blur-3xl pointer-events-none" />

            <!-- Logo Image -->
            <div
              class="w-40 h-40 sm:w-48 sm:h-48 relative cursor-pointer group p-2 bg-white/80 dark:bg-black/50 rounded-3xl border border-blue-500/20 shadow-md"
              @click="openLightbox('/images/products/igenq-logo.png', 'iGenQ Logo', 'ระบบบริหารคิวอัจฉริยะแบบ New Normal โดย บริษัท ไอเจนโก้ จำกัด')"
            >
              <img
                src="/images/products/igenq-logo.png"
                alt="iGenQ Logo"
                class="w-full h-full object-contain filter drop-shadow-md group-hover:scale-105 transition-transform duration-300"
              >
              <div class="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-black/20 rounded-3xl">
                <span class="px-2.5 py-1 rounded-lg bg-black/70 text-white text-[11px] font-mono flex items-center gap-1">
                  <ZoomIn class="w-3.5 h-3.5" />
                  <span>คลิกเพื่อซูม</span>
                </span>
              </div>
            </div>

            <!-- Poster Preview Frame -->
            <div
              class="w-full rounded-2xl overflow-hidden border border-blue-500/20 bg-white/70 dark:bg-black/40 p-2 cursor-pointer hover:border-blue-500 transition-all shadow-sm"
              @click="openLightbox('/images/products/igenq-poster-1.jpg', 'iGenQ โบรชัวร์ระบบคิวแบบ New Normal', 'ขั้นตอนการใช้งาน 5 สเต็ป และข้อดีสำหรับเจ้าหน้าที่และผู้ใช้บริการ')"
            >
              <img
                src="/images/products/igenq-poster-1.jpg"
                alt="iGenQ Poster 1"
                class="w-full h-36 object-cover object-top rounded-xl mx-auto"
              >
              <div class="pt-2 text-[11px] font-mono text-blue-600 dark:text-blue-300 font-bold flex items-center justify-center gap-1">
                <Maximize2 class="w-3.5 h-3.5" />
                <span>คลิกดูโบรชัวร์ทางการขนาดเต็ม A4</span>
              </div>
            </div>

            <div class="text-xs font-mono text-blue-600 dark:text-blue-300 font-semibold">
              WEB-BASED APPLICATION // NO APP INSTALLATION REQUIRED
            </div>
          </div>
        </div>
      </section>

      <!-- ========================================================
           STATS & CAPABILITIES RIBBON
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
          <div class="text-xl sm:text-2xl font-black font-display text-blue-600 dark:text-blue-400">
            {{ st.value }}
          </div>
          <div class="text-xs opacity-75">
            {{ st.sub }}
          </div>
        </div>
      </section>

      <!-- ========================================================
           SECTION 1: 8 KEY BENEFITS & VALUE PROPOSITIONS
      ========================================================= -->
      <section class="space-y-10">
        <div class="text-center max-w-2xl mx-auto space-y-2">
          <div class="text-xs font-mono font-bold text-blue-600 dark:text-blue-400 uppercase tracking-wider">
            KEY ADVANTAGES // จุดเด่นและประโยชน์ของ iGenQ
          </div>
          <h2 class="font-display font-black text-2xl sm:text-4xl text-[#022C22] dark:text-white">
            แก้ปัญหาการรอคิวแบบเดิม ยกระดับบริการสู่มาตรฐาน New Normal
          </h2>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div
            v-for="(ben, idx) in keyBenefits"
            :key="idx"
            class="p-6 rounded-3xl spatial-glass border border-blue-500/20 shadow-lg space-y-3 hover:border-blue-500 transition-all hover:-translate-y-1 flex flex-col justify-between"
          >
            <div class="space-y-3">
              <div class="w-12 h-12 rounded-2xl bg-blue-600/15 text-blue-600 dark:text-blue-400 flex items-center justify-center shadow-sm">
                <component :is="ben.icon" class="w-6 h-6" />
              </div>
              <h3 class="text-base font-bold text-[#022C22] dark:text-white leading-snug">
                {{ ben.title }}
              </h3>
              <p class="text-xs opacity-80 leading-relaxed">
                {{ ben.desc }}
              </p>
            </div>
            <div class="pt-2 border-t border-current/10 text-[11px] font-mono opacity-50">
              BENEFIT // 0{{ idx + 1 }}
            </div>
          </div>
        </div>
      </section>

      <!-- ========================================================
           SECTION 2: 5 STEPS WORKFLOW INFOGRAPHIC (POSTER 1)
      ========================================================= -->
      <section class="space-y-8">
        <div class="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-current/10 pb-4">
          <div>
            <div class="text-xs font-mono font-bold text-blue-500 uppercase tracking-wider flex items-center gap-2">
              <QrCode class="w-4 h-4" />
              <span>5-STEP QUEUE FLOW // ขั้นตอนการใช้งานระบบคิวแบบ New Normal</span>
            </div>
            <h2 class="font-display font-black text-2xl sm:text-4xl text-[#022C22] dark:text-white mt-1">
              ขั้นตอนการรับบริการง่ายๆ ผ่านสมาร์ทโฟน
            </h2>
          </div>
          <button
            type="button"
            class="px-4 py-2 rounded-xl border border-blue-500/30 hover:bg-blue-500/20 text-xs font-mono font-bold flex items-center gap-2 transition-all self-start sm:self-auto cursor-pointer"
            @click="openLightbox('/images/products/igenq-poster-1.jpg', 'iGenQ ระบบคิวแบบ New Normal', 'ขั้นตอนการใช้งาน 5 สเต็ป และข้อดีสำหรับเจ้าหน้าที่/ผู้ใช้บริการ')"
          >
            <ZoomIn class="w-4 h-4 text-blue-500" />
            <span>ซูมดูแผนผังโปสเตอร์เต็ม</span>
          </button>
        </div>

        <!-- 5 Steps Horizontal / Responsive Grid -->
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
          <div
            v-for="(st, idx) in queueSteps"
            :key="idx"
            class="p-5 rounded-2xl spatial-glass border border-blue-500/25 space-y-2 hover:border-blue-500 transition-all hover:-translate-y-1 relative"
          >
            <div class="flex items-center justify-between">
              <span class="text-xs font-mono font-bold text-blue-600 dark:text-blue-400 bg-blue-500/15 px-2.5 py-0.5 rounded-md">
                {{ st.step }}
              </span>
              <span class="text-xs font-mono opacity-40">0{{ idx + 1 }}</span>
            </div>
            <div class="text-sm font-bold text-[#022C22] dark:text-white">
              {{ st.title }}
            </div>
            <p class="text-xs opacity-80 leading-relaxed">
              {{ st.desc }}
            </p>
          </div>
        </div>

        <!-- Two Comparison Columns: Staff vs Customers -->
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 pt-4">
          <!-- Column 1: Staff Benefits -->
          <div class="p-6 sm:p-8 rounded-3xl bg-white/70 dark:bg-black/40 border border-amber-500/30 shadow-lg space-y-4">
            <div class="flex items-center justify-between">
              <span class="px-3.5 py-1 rounded-full text-xs font-mono font-bold bg-amber-500/20 text-amber-600 dark:text-amber-300 border border-amber-500/30">
                ข้อดีสำหรับเจ้าหน้าที่ & เจ้าของธุรกิจ
              </span>
              <span class="text-xs font-mono opacity-60">FOR STAFF & BUSINESS</span>
            </div>

            <ul class="space-y-3 text-xs sm:text-sm opacity-90 leading-relaxed">
              <li
                v-for="(item, idx) in staffBenefits"
                :key="idx"
                class="flex items-start gap-2.5"
              >
                <CheckCircle2 class="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
                <span>{{ item }}</span>
              </li>
            </ul>
          </div>

          <!-- Column 2: Customer Benefits -->
          <div class="p-6 sm:p-8 rounded-3xl bg-white/70 dark:bg-black/40 border border-[#00C864]/30 shadow-lg space-y-4">
            <div class="flex items-center justify-between">
              <span class="px-3.5 py-1 rounded-full text-xs font-mono font-bold bg-[#00C864]/20 text-[#00A854] dark:text-[#00FF88] border border-[#00C864]/30">
                ข้อดีสำหรับลูกค้า & ผู้รับบริการ
              </span>
              <span class="text-xs font-mono opacity-60">FOR CUSTOMERS</span>
            </div>

            <ul class="space-y-3 text-xs sm:text-sm opacity-90 leading-relaxed">
              <li
                v-for="(item, idx) in customerBenefits"
                :key="idx"
                class="flex items-start gap-2.5"
              >
                <CheckCircle2 class="w-4 h-4 text-[#00C864] dark:text-[#00FF88] shrink-0 mt-0.5" />
                <span>{{ item }}</span>
              </li>
            </ul>
          </div>
        </div>
      </section>

      <!-- ========================================================
           SECTION 3: PROBLEM SOLVING & HARDWARE COMPARISON (POSTER 2)
      ========================================================= -->
      <section class="p-8 sm:p-12 rounded-[2.5rem] spatial-glass border border-blue-500/30 shadow-2xl space-y-10">
        <div class="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-current/10 pb-4">
          <div>
            <div class="text-xs font-mono font-bold text-blue-500 dark:text-blue-400 uppercase tracking-wider flex items-center gap-2">
              <Sparkles class="w-4 h-4" />
              <span>PROBLEM VS SOLUTION // จะดีกว่าไหมถ้าเปลี่ยนมาใช้ iGenQ</span>
            </div>
            <h2 class="font-display font-black text-2xl sm:text-4xl text-[#022C22] dark:text-white mt-1">
              เปลี่ยนระบบคิวแบบเดิมที่ยุ่งยาก สู่ระบบคิวคลาวด์ที่ประหยัดต้นทุน
            </h2>
          </div>

          <button
            type="button"
            class="px-4 py-2 rounded-xl border border-blue-500/30 hover:bg-blue-500/20 text-xs font-mono font-bold flex items-center gap-2 transition-all self-start sm:self-auto cursor-pointer"
            @click="openLightbox('/images/products/igenq-poster-2.jpg', 'iGenQ เปรียบเทียบปัญหาคิวเดิม vs โซลูชันคิวอัจฉริยะ', 'จะดีกว่าไหมถ้าร้านบุฟเฟต์ ร้านอาหาร ศูนย์บริการภาครัฐ ไม่ต้องให้ลูกค้ายืนรอคิว')"
          >
            <ZoomIn class="w-4 h-4 text-blue-500" />
            <span>ซูมดูโปสเตอร์เปรียบเทียบ</span>
          </button>
        </div>

        <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <!-- Problem Card (Traditional Queue) -->
          <div class="p-6 sm:p-8 rounded-3xl bg-red-950/10 border border-red-500/30 space-y-4">
            <div class="flex items-center gap-2 text-red-500 font-bold text-base sm:text-lg">
              <XCircle class="w-5 h-5 shrink-0" />
              <span>ปัญหาของร้านขายดีที่มีระบบจัดการคิวยังไม่ดีพอ</span>
            </div>

            <ul class="space-y-3 text-xs sm:text-sm opacity-90 leading-relaxed">
              <li class="flex items-start gap-2.5">
                <span class="text-red-500 font-bold">✕</span>
                <span>ลูกค้าต้องยืนรอคิว เสียภาพลักษณ์ของร้านค้า และเสี่ยงต่อการติดเชื้อโรค</span>
              </li>
              <li class="flex items-start gap-2.5">
                <span class="text-red-500 font-bold">✕</span>
                <span>ผู้รับบริการเสียเวลาเข้าคิวหลายชั่วโมง เกิดความไม่พึงพอใจ และเปลี่ยนใจไปใช้บริการร้านอื่น</span>
              </li>
              <li class="flex items-start gap-2.5">
                <span class="text-red-500 font-bold">✕</span>
                <span>อาจเกิดปัญหาการแซงคิว ความขัดแย้งหน้าร้าน และลำดับคิวไม่ชัดเจน</span>
              </li>
              <li class="flex items-start gap-2.5">
                <span class="text-red-500 font-bold">✕</span>
                <span>พนักงานต้องออกมายืนแจกคิวและส่งเสียงเรียกคิว ทำให้ต้องจ้างคนเพิ่ม</span>
              </li>
              <li class="flex items-start gap-2.5">
                <span class="text-red-500 font-bold">✕</span>
                <span>ระบบคีออสเดิมมีต้นทุนสูง ใช้เวลาติดตั้งนาน แสดงผลไม่ครบ และเพิ่มจุดบริการยาก</span>
              </li>
            </ul>
          </div>

          <!-- Solution Card (iGenQ Innovation) -->
          <div class="p-6 sm:p-8 rounded-3xl bg-[#00C864]/10 border border-[#00C864]/30 space-y-4">
            <div class="flex items-center gap-2 text-[#00A854] dark:text-[#00FF88] font-bold text-base sm:text-lg">
              <CheckCircle2 class="w-5 h-5 shrink-0" />
              <span>ระบบไอเจนคิว (iGenQ) ช่วยท่านได้อย่างไร?</span>
            </div>

            <ul class="space-y-3 text-xs sm:text-sm opacity-90 leading-relaxed">
              <li class="flex items-start gap-2.5">
                <span class="text-[#00C864] font-bold">✓</span>
                <span><strong>ลูกค้าจองคิวและดูคิวออนไลน์ผ่านมือถือ:</strong> ลูกค้าทราบจำนวนคิวที่เหลือได้อย่างแม่นยำ</span>
              </li>
              <li class="flex items-start gap-2.5">
                <span class="text-[#00C864] font-bold">✓</span>
                <span><strong>แจ้งเตือนผ่าน LINE ทันที:</strong> เมื่อถึงคิวหรือใกล้ถึงคิว แจ้งเตือนไปยัง LINE ของลูกค้าโดยตรง</span>
              </li>
              <li class="flex items-start gap-2.5">
                <span class="text-[#00C864] font-bold">✓</span>
                <span><strong>แสดงคิวทางจอ Android TV & เสียงเรียกอัตโนมัติ:</strong> แสดงผลชัดเจนและออกเสียงเรียกผ่านบลูทูธ</span>
              </li>
              <li class="flex items-start gap-2.5">
                <span class="text-[#00C864] font-bold">✓</span>
                <span><strong>ต้นทุนต่ำ ติดตั้งรวดเร็ว:</strong> ไม่ต้องซื้อ Server ไม่ต้องมีตู้คีออส ไม่ต้องเดินสาย LAN</span>
              </li>
              <li class="flex items-start gap-2.5">
                <span class="text-[#00C864] font-bold">✓</span>
                <span><strong>เพิ่มจุดบริการได้ง่าย:</strong> เพิ่มเคาน์เตอร์เรียกคิวได้ไม่จำกัดตามขนาดของธุรกิจ</span>
              </li>
            </ul>
          </div>
        </div>
      </section>

      <!-- ========================================================
           SECTION 4: TARGET BUSINESSES & SUITABLE FOR
      ========================================================= -->
      <section class="space-y-6">
        <div class="text-center max-w-2xl mx-auto space-y-2">
          <div class="text-xs font-mono font-bold uppercase tracking-wider text-blue-600 dark:text-blue-400 flex items-center justify-center gap-2">
            <Store class="w-4 h-4" />
            <span>SUITABLE FOR ALL BUSINESSES // เหมาะสำหรับธุรกิจและองค์กรประเภทใด</span>
          </div>
          <h2 class="font-display font-black text-2xl sm:text-3xl text-[#022C22] dark:text-white">
            รองรับทุกขนาดธุรกิจ ตั้งแต่ร้านอาหาร คลินิก ไปจนถึงศูนย์บริการภาครัฐ
          </h2>
        </div>

        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          <div class="p-5 rounded-2xl spatial-glass border border-current/10 space-y-2 hover:border-blue-500 transition-all hover:-translate-y-1">
            <div class="text-sm font-bold text-[#022C22] dark:text-white">
              ร้านอาหาร บุฟเฟต์ & ปิ้งย่าง
            </div>
            <p class="text-xs opacity-75 leading-relaxed">
              จัดการคิวหน้าร้านชั่วโมงเร่งด่วน ลูกค้าไม่ต้องยืนออหน้าร้าน มีระบบแจ้งเตือนใกล้ถึงคิว
            </p>
          </div>

          <div class="p-5 rounded-2xl spatial-glass border border-current/10 space-y-2 hover:border-blue-500 transition-all hover:-translate-y-1">
            <div class="text-sm font-bold text-[#022C22] dark:text-white">
              ร้านกาแฟ ชานม & Food Court
            </div>
            <p class="text-xs opacity-75 leading-relaxed">
              เรียกคิวรับเครื่องดื่มและอาหารอย่างเป็นระเบียบ ผ่านหน้าจอทีวีและลำโพงบลูทูธ
            </p>
          </div>

          <div class="p-5 rounded-2xl spatial-glass border border-current/10 space-y-2 hover:border-blue-500 transition-all hover:-translate-y-1">
            <div class="text-sm font-bold text-[#022C22] dark:text-white">
              โรงพยาบาล คลินิก & งานฉีดวัคซีน
            </div>
            <p class="text-xs opacity-75 leading-relaxed">
              จัดการคิวคนไข้ตามจุดบริการ ซักประวัติ ตรวจรักษา จ่ายยา และห้องการเงิน
            </p>
          </div>

          <div class="p-5 rounded-2xl spatial-glass border border-current/10 space-y-2 hover:border-blue-500 transition-all hover:-translate-y-1">
            <div class="text-sm font-bold text-[#022C22] dark:text-white">
              ศูนย์บริการภาครัฐ & เคาน์เตอร์เซอร์วิส
            </div>
            <p class="text-xs opacity-75 leading-relaxed">
              งานบริการประชาชนเบ็ดเสร็จ สะดวกรวดเร็ว ตรวจสอบสถิติและทำแบบประเมินได้ทันที
            </p>
          </div>
        </div>
      </section>

      <!-- ========================================================
           SECTION 5: PORTFOLIO & CLIENT REFERENCES
      ========================================================= -->
      <section class="space-y-6">
        <div class="text-center max-w-2xl mx-auto space-y-2">
          <div class="text-xs font-mono font-bold uppercase tracking-wider text-blue-600 dark:text-blue-400 flex items-center justify-center gap-2">
            <Building2 class="w-4 h-4" />
            <span>PORTFOLIO & CLIENT REFERENCES // ผลงานและความไว้วางใจจากลูกค้า</span>
          </div>
          <h2 class="font-display font-black text-2xl sm:text-3xl text-[#022C22] dark:text-white">
            ตัวอย่างลูกค้าและองค์กรที่ใช้งานจริง
          </h2>
        </div>

        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          <div
            v-for="(cli, idx) in portfolioClients"
            :key="idx"
            class="p-5 rounded-2xl spatial-glass border border-current/10 space-y-2 hover:border-blue-500 transition-all hover:-translate-y-1"
          >
            <div class="flex items-center justify-between">
              <span class="text-xs font-mono font-bold text-blue-600 dark:text-blue-400 bg-blue-500/15 px-2.5 py-0.5 rounded-md">
                {{ cli.code }}
              </span>
              <span class="text-[11px] font-mono opacity-50">Verified</span>
            </div>
            <div class="text-sm font-bold text-[#022C22] dark:text-white">
              {{ cli.name }}
            </div>
            <p class="text-xs opacity-75 leading-relaxed">
              {{ cli.desc }}
            </p>
          </div>
        </div>

        <!-- Prominent Callout Banner linking to iGenQ Portfolio Page -->
        <div class="mt-6 p-6 sm:p-8 rounded-[2rem] bg-gradient-to-r from-blue-950/40 via-blue-900/30 to-indigo-950/40 border-2 border-blue-500/50 shadow-2xl flex flex-col md:flex-row items-center justify-between gap-6 relative overflow-hidden group">
          <div class="space-y-2 text-center md:text-left relative z-10">
            <div class="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono font-bold bg-blue-500/20 text-blue-300 border border-blue-400/30">
              <Sparkles class="w-3.5 h-3.5 text-amber-300" />
              <span>CASE STUDIES & REAL INSTALLATIONS // ภาพผลงานการติดตั้งจริง</span>
            </div>
            <h3 class="text-xl sm:text-2xl font-display font-black text-white">
              สำรวจหน้าผลงานและความสำเร็จของ iGenQ ทั้งหมด
            </h3>
            <p class="text-xs sm:text-sm text-slate-200 max-w-xl">
              ดูภาพการติดตั้งจริง หน้าจอเรียกคิว บัตรคิว e-Ticket และรีวิวความพึงพอใจของลูกค้าในหลากหลายธุรกิจ
            </p>
          </div>

          <NuxtLink
            to="/products/igenq-portfolio"
            class="px-6 py-4 rounded-2xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs sm:text-sm font-mono transition-all flex items-center justify-center gap-2 shadow-xl hover:scale-105 active:scale-95 shrink-0 border border-blue-300/40"
          >
            <span>คลิกดูหน้าผลงานทั้งหมด (Portfolio)</span>
            <ArrowUpRight class="w-4 h-4" />
          </NuxtLink>
        </div>
      </section>

      <!-- ========================================================
           OFFICIAL GOVERNMENT ENDORSEMENT SPOTLIGHT (CHANTHABURI)
      ========================================================= -->
      <section class="p-6 sm:p-10 lg:p-12 rounded-[2.5rem] bg-gradient-to-br from-blue-900/10 via-slate-900/5 to-amber-900/10 dark:from-blue-950/40 dark:via-slate-900/50 dark:to-amber-950/20 border-2 border-amber-500/30 shadow-2xl space-y-8 relative overflow-hidden">
        
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
              class="relative rounded-2xl overflow-hidden border-2 border-amber-500/30 shadow-2xl bg-white p-2 group cursor-pointer max-w-md w-full transition-all duration-300 hover:scale-[1.02] hover:border-amber-500 hover:shadow-amber-500/20"
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
           SECTION 6: COPYRIGHT CERTIFICATE & OFFICIAL DOWNLOADS
      ========================================================= -->
      <section class="space-y-6">
        <div class="space-y-2">
          <div class="text-xs font-mono font-bold text-blue-600 dark:text-blue-400 uppercase tracking-wider flex items-center gap-2">
            <Download class="w-4 h-4" />
            <span>COPYRIGHT & OFFICIAL DOWNLOADS // หนังสือรับรองลิขสิทธิ์และเอกสารระบบ</span>
          </div>
          <h2 class="font-display font-black text-2xl sm:text-3xl text-[#022C22] dark:text-white">
            เอกสารสิทธิ์ทางปัญญาและโบรชัวร์ทางการ
          </h2>
          <p class="text-xs sm:text-sm opacity-80">
            เอกสารทางการประกอบการพิจารณาจัดซื้อจัดจ้างสำหรับองค์กรธุรกิจและหน่วยงานภาครัฐ
          </p>
        </div>

        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          <!-- Google Drive Copyright Certificate -->
          <a
            href="https://drive.google.com/file/d/1gGA7notTLil-SHNMrnYROxBZka0dfM8B/view?usp=sharing"
            target="_blank"
            rel="noopener noreferrer"
            class="p-6 rounded-3xl spatial-glass border border-blue-500/30 hover:border-blue-500 hover:scale-[1.02] transition-all flex items-center justify-between group shadow-sm"
          >
            <div class="flex items-center gap-4">
              <div class="w-12 h-12 rounded-2xl bg-blue-600/20 text-blue-600 dark:text-blue-400 flex items-center justify-center shrink-0">
                <FileCheck2 class="w-6 h-6" />
              </div>
              <div>
                <div class="text-base font-bold group-hover:text-blue-500 transition-colors">
                  หนังสือรับรองลิขสิทธิ์
                </div>
                <div class="text-xs opacity-65 font-mono">
                  Copyright Certificate PDF
                </div>
              </div>
            </div>
            <ExternalLink class="w-5 h-5 text-blue-500 shrink-0 group-hover:translate-y-0.5 transition-transform" />
          </a>

          <!-- Chanthaburi Government Performance Certificate -->
          <div
            class="p-6 rounded-3xl spatial-glass border border-amber-500/40 hover:border-amber-500 hover:scale-[1.02] transition-all flex items-center justify-between group shadow-sm cursor-pointer"
            @click="openLightbox('/images/products/igenq-cert-chanthaburi.jpg', 'หนังสือรับรองผลงาน ศาลากลางจังหวัดจันทบุรี', 'บริษัท ไอเจนโก้ จำกัด ได้รับจ้างทำเครื่องกดบัตรคิว Touch Screen และระบบจัดการคิวออนไลน์ สัญญาเลขที่ ๔๘/๒๕๖๕')"
          >
            <div class="flex items-center gap-4">
              <div class="w-12 h-12 rounded-2xl bg-amber-500/20 text-amber-600 dark:text-amber-400 flex items-center justify-center shrink-0">
                <Award class="w-6 h-6" />
              </div>
              <div>
                <div class="text-base font-bold group-hover:text-amber-500 transition-colors">
                  หนังสือรับรองผลงานภาครัฐ
                </div>
                <div class="text-xs opacity-65 font-mono">
                  ศาลากลางจันทบุรี (ที่ จบ ๐๐๑๗.๓/๒๑๐)
                </div>
              </div>
            </div>
            <Maximize2 class="w-5 h-5 text-amber-500 shrink-0 group-hover:scale-110 transition-transform" />
          </div>

          <!-- Brochure 1 Poster -->
          <div
            class="p-6 rounded-3xl spatial-glass border border-[#00C864]/30 hover:border-[#00C864] hover:scale-[1.02] transition-all flex items-center justify-between group shadow-sm cursor-pointer"
            @click="openLightbox('/images/products/igenq-poster-1.jpg', 'iGenQ โบรชัวร์ระบบคิวแบบ New Normal Poster 1', 'ขั้นตอนการใช้งาน 5 สเต็ป และข้อดีสำหรับเจ้าหน้าที่/ผู้ใช้บริการ')"
          >
            <div class="flex items-center gap-4">
              <div class="w-12 h-12 rounded-2xl bg-[#00C864]/20 text-[#00A854] dark:text-[#00FF88] flex items-center justify-center shrink-0">
                <FileText class="w-6 h-6" />
              </div>
              <div>
                <div class="text-base font-bold group-hover:text-[#00C864] transition-colors">
                  โบรชัวร์การใช้งาน 5 สเต็ป
                </div>
                <div class="text-xs opacity-65 font-mono">
                  5-Step Queue Workflow Poster
                </div>
              </div>
            </div>
            <Maximize2 class="w-5 h-5 text-[#00C864] shrink-0 group-hover:scale-110 transition-transform" />
          </div>

          <!-- Brochure 2 Poster -->
          <div
            class="p-6 rounded-3xl spatial-glass border border-purple-500/30 hover:border-purple-500 hover:scale-[1.02] transition-all flex items-center justify-between group shadow-sm cursor-pointer"
            @click="openLightbox('/images/products/igenq-poster-2.jpg', 'iGenQ โบรชัวร์เปรียบเทียบปัญหาคิว Poster 2', 'จะดีกว่าไหมถ้าร้านอาหารและศูนย์บริการภาครัฐไม่ต้องให้ลูกค้ายืนรอคิว')"
          >
            <div class="flex items-center gap-4">
              <div class="w-12 h-12 rounded-2xl bg-purple-500/20 text-purple-600 dark:text-purple-400 flex items-center justify-center shrink-0">
                <FileText class="w-6 h-6" />
              </div>
              <div>
                <div class="text-base font-bold group-hover:text-purple-500 transition-colors">
                  โบรชัวร์เปรียบเทียบโซลูชัน
                </div>
                <div class="text-xs opacity-65 font-mono">
                  Problem vs Solution Poster
                </div>
              </div>
            </div>
            <Maximize2 class="w-5 h-5 text-purple-500 shrink-0 group-hover:scale-110 transition-transform" />
          </div>
        </div>
      </section>

      <!-- ========================================================
           SECTION 7: CONTACT SPECIALIST CARD (IGENCO CO., LTD.)
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
                <span>INTERESTED & CONTACT // สอบถามเพิ่มเติม / สาธิตโปรแกรม iGenQ</span>
              </div>
              <h3 class="text-xl sm:text-2xl font-display font-black text-[#022C22] dark:text-white">
                บริษัท ไอเจนโก้ จำกัด (IGENCO CO., LTD.)
              </h3>
              <p class="text-xs sm:text-sm opacity-80">
                ผู้พัฒนาซอฟต์แวร์ iGenQ ประสบการณ์กว่า 12 ปี พร้อมทีมงานดูแลหลังการขายอย่างต่อเนื่อง (เวลาทำการ จันทร์-ศุกร์ 8.30-17.30 น.)
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

          <a
            href="mailto:sales@igenco.co.th"
            class="px-5 py-3 rounded-2xl border border-blue-500/40 hover:bg-blue-500/20 text-xs sm:text-sm font-bold font-mono transition-all flex items-center gap-2 shadow-sm hover:scale-105 active:scale-95"
          >
            <Mail class="w-4 h-4 text-blue-500" />
            <span>sales@igenco.co.th</span>
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
