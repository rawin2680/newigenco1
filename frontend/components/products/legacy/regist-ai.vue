<script setup lang="ts">
import { ref } from 'vue'
import AppHeader from '~/components/AppHeader.vue'
import ContactFooter from '~/components/ContactFooter.vue'
import {
  ArrowLeft,
  ArrowUpRight,
  Sparkles,
  QrCode,
  CheckCircle2,
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
  Calendar,
  Layers,
  ChevronRight,
  X,
  Clock,
  Laptop,
  Check,
  Tag
} from 'lucide-vue-next'
import { useTheme } from '~/composables/useTheme'

const { showToast } = useTheme()

useHead({
  title: 'Regist.ai (ระบบบริหารการลงทะเบียนอัจฉริยะ) - บริษัท ไอเจนโก้ จำกัด (IGENCO)',
  meta: [
    {
      name: 'description',
      content: 'Regist.ai ระบบบริหารการลงทะเบียนและจัดการคิวอัจฉริยะ i-Queue สำหรับงานสัมมนา ฝึกอบรม โรงพยาบาล และร้านอาหาร ทั้ง Online และ Offline เชื่อมต่อ Joomla และ WordPress'
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

// Quick stats ribbon
const stats = [
  { label: 'รูปแบบการลงทะเบียน', value: 'Online / Offline', sub: 'รองรับทั้งหน้าเว็บและหน้างาน' },
  { label: 'ระยะเวลาติดตั้ง', value: 'ภายใน 1 สัปดาห์', sub: 'พร้อมเปิดใช้งานและเชื่อมต่อ CMS' },
  { label: 'ระบบบริหารคิว', value: 'i-Queue Flow', sub: 'คิวต่อเนื่องฉีดวัคซีน & คิวร้านอาหาร' },
  { label: 'มาตรฐานความปลอดภัย', value: 'PDPA Ready', sub: 'จัดการนโยบายความเป็นส่วนตัว' }
]

// Admin Features
const adminFeatures = [
  'รองรับการกำหนดข้อมูลพื้นฐาน: ตารางประเภทสมาชิก, คำนำหน้าชื่อ, หลักสูตร, อัตราค่าธรรมเนียมลงทะเบียน และค่าสมัครสมาชิก',
  'กำหนดตารางสถานที่จัด, ตารางห้องอบรม, ตารางจัดเก็บโซนและสีที่นั่ง, ประเภทอาหาร (ทั่วไป, มังสวิรัติ, ฮาลาล ฯลฯ)',
  'กำหนดตารางอำเภอและตารางจังหวัดอย่างเป็นระบบ',
  'การบันทึกข้อมูลสมาชิกและประวัติการเข้าร่วมงาน',
  'การบันทึกข้อมูลวิทยากรและประวัติความเชี่ยวชาญวิทยากร',
  'การบันทึกข้อมูลโครงการและจัดการแบนเนอร์ประชาสัมพันธ์ (Project Banner)',
  'ระบบลงทะเบียนแบบกลุ่มด้วย Excel (Excel Loader) นำเข้ารายชื่อครั้งละจำนวนมาก',
  'ระบบอนุมัติหรือยืนยันการสมัครสมาชิกใหม่',
  'ระบบอนุมัติหรือยืนยันการลงทะเบียนเข้าร่วมโครงการ',
  'การพิมพ์รายงานสำคัญ: ใบแจ้งหนี้, ใบตอบรับ, ใบเซ็นชื่อเข้างาน, ป้ายชื่อ (Name Badge), ใบเสร็จรับเงิน และใบประกาศนียบัตร'
]

// User Features
const userFeatures = [
  'สอบถามข้อมูลโครงการ: สถานที่จัด, วันและเวลาที่จัด, ตารางกำหนดการ และดูแผนที่ผ่าน Google Maps',
  'การสมัครสมาชิกออนไลน์เพื่อรับสิทธิประโยชน์ของโครงการ',
  'การลงทะเบียนเข้าร่วมสัมมนาหรือฝึกอบรมในหลักสูตรที่สนใจ',
  'การตรวจสอบผลและสถานะการลงทะเบียนได้ตลอด 24 ชั่วโมง',
  'การแจ้งชำระเงินและพิมพ์ใบตอบรับที่มี QR Code (e-Ticket) สำหรับ Check-in สแกนเข้างาน',
  'ทำแบบประเมินออนไลน์ เชื่อมต่อกับ Google Form หรือระบบประเมินผลโครงการ',
  'ระบบจัดการโปรไฟล์ส่วนตัว: แก้ไขข้อมูลส่วนตัวและเปลี่ยนรหัสผ่านด้วยตนเอง'
]

// Target Organizations
const targetOrgs = [
  {
    title: 'บริษัทฝึกอบรม & สถาบันรับรองมาตรฐาน',
    desc: 'จัดฝึกอบรม สัมมนาเชิงวิชาการ ออกใบประกาศนียบัตรและหนังสือรับรองมาตรฐานการทำงานอย่างเป็นระบบ'
  },
  {
    title: 'หน่วยงานภาครัฐ มหาวิทยาลัย สมาคม',
    desc: 'จัดงานประชุมวิชาการ เผยแพร่องค์ความรู้ และบูรณาการฐานข้อมูลร่วมกับเว็บไซต์องค์กรเดิม เช่น Joomla และ WordPress'
  },
  {
    title: 'โรงพยาบาล โรงพยาบาลสนาม & คลินิก',
    desc: 'บริหารจัดการคิวตรวจสุขภาพ ฉีดวัคซีน คัดกรองซักประวัติ และจุดพักสังเกตอาการแบบ New Normal'
  },
  {
    title: 'ร้านอาหาร & ธุรกิจศูนย์บริการ',
    desc: 'กดบัตรคิวหน้าร้านผ่าน Tablet/Smartphone เรียกคิวออกหน้าจอ Smart TV พร้อมระบบแจ้งเตือนโต๊ะ'
  },
  {
    title: 'ผู้จัดงานวิ่งมาราธอน & อีเวนต์สาธารณะ',
    desc: 'เปิดรับสมัครนักวิ่ง เช็กขนาดเสื้อ ออก e-Ticket และพิมพ์ป้ายชื่อ/บิบสำหรับ Check-in เข้างาน'
  }
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
  <div class="min-h-screen relative selection:bg-[#9333EA] selection:text-white flex flex-col justify-between  text-slate-800 dark:text-slate-100">
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
          <span class="text-purple-600 dark:text-purple-400 font-bold">Regist.ai</span>
        </div>
      </div>

      <!-- ========================================================
           HERO SECTION: PRODUCT OVERVIEW & MASCOT
      ========================================================= -->
      <section class="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
        <!-- Left Column: Title, Slogan, Narrative (7 Cols) -->
        <div class="lg:col-span-7 space-y-6">
          <div class="flex flex-wrap items-center gap-2.5">
            <span class="px-3.5 py-1 rounded-full text-xs font-mono font-bold bg-purple-600/15 text-purple-600 dark:bg-purple-500/20 dark:text-purple-300 border border-purple-500/30">
              ซอฟต์แวร์อัจฉริยะ // 01
            </span>
            <span class="px-3 py-1 rounded-full text-xs font-mono font-bold bg-[#00C864]/15 text-[#00A854] dark:bg-[#00FF88]/15 dark:text-[#00FF88]">
              ENTERPRISE GRADE
            </span>
            <span class="px-3 py-1 rounded-full text-xs font-mono opacity-70 border border-current/10">
              SMART REGISTRATION & QUEUE
            </span>
          </div>

          <div class="space-y-3">
            <h1 class="font-display font-black text-3xl sm:text-5xl lg:text-6xl tracking-tight leading-[1.15] text-[#022C22] dark:text-white">
              Regist<span class="text-purple-600 dark:text-purple-400">.ai</span>
            </h1>
            <div class="text-lg sm:text-2xl font-bold text-purple-600 dark:text-purple-300 font-display">
              ระบบบริหารการลงทะเบียนอัจฉริยะ และระบบจัดการคิว i-Queue
            </div>
            <div class="inline-block px-4 py-1.5 rounded-xl bg-purple-600/10 dark:bg-purple-400/10 text-xs sm:text-sm font-mono font-bold text-purple-700 dark:text-purple-300 border border-purple-500/20">
              “ ตอบโจทย์ทุกการลงทะเบียน // Solution for all registration. ”
            </div>
          </div>

          <p class="text-sm sm:text-base opacity-85 leading-relaxed text-slate-700 dark:text-slate-300">
            ในปัจจุบัน หลายองค์กรมีการจัดสัมมนาเชิงวิชาการ จัดฝึกอบรมพนักงาน เพื่อเผยแพร่ความรู้ทางวิชาการหรือการอัปเดตข้อมูลข่าวสารใหม่ ๆ ซึ่งมีกิจกรรมมากมายในการเตรียมการทั้งในเรื่องวิทยากร เนื้อหา หลักสูตร สถานที่จัด ห้อง อาหารว่าง การประชาสัมพันธ์และอื่น ๆ อีกมากมาย
          </p>

          <p class="text-sm sm:text-base opacity-85 leading-relaxed text-slate-700 dark:text-slate-300">
            <strong>Regist.ai</strong> เป็นระบบที่ช่วยอำนวยความสะดวกในการประชาสัมพันธ์การจัดงานสัมมนา ฝึกอบรม หรือการเผยแพร่ความรู้ต่าง ๆ เปิดรับลงทะเบียนทั้งแบบ <strong>Online และ Offline</strong> ติดตั้งและใช้งานฐานข้อมูลร่วมกับเว็บไซต์องค์กรเดิมได้ทันที เช่น <strong>Joomla</strong> และ <strong>WordPress</strong>
          </p>

          <!-- Hero Action Buttons -->
          <div class="flex flex-wrap items-center gap-3.5 pt-2">
            <button
              type="button"
              class="px-6 py-3.5 rounded-2xl bg-purple-600 hover:bg-purple-700 text-white font-bold text-xs sm:text-sm font-mono transition-all flex items-center gap-2 shadow-lg hover:scale-105 active:scale-95 cursor-pointer"
              @click="scrollToContact"
            >
              <span>ติดต่อสอบถาม / ปรึกษาผู้เชี่ยวชาญ</span>
              <ArrowUpRight class="w-4 h-4" />
            </button>

            <a
              href="https://www.i-regist.com/"
              target="_blank"
              rel="noopener noreferrer"
              class="px-5 py-3.5 rounded-2xl spatial-glass border border-purple-500/30 hover:border-purple-500 font-bold text-xs sm:text-sm font-mono transition-all flex items-center gap-2 shadow-sm hover:scale-105 active:scale-95"
            >
              <span>เข้าสู่เว็บไซต์ i-regist.com</span>
              <ExternalLink class="w-4 h-4 text-purple-500" />
            </a>
          </div>
        </div>

        <!-- Right Column: Banner & Mascot Showcase (5 Cols) -->
        <div class="lg:col-span-5 relative">
          <div class="relative p-6 sm:p-8 rounded-[2.5rem] spatial-glass border border-purple-500/30 shadow-2xl bg-gradient-to-br from-purple-900/20 via-white/50 dark:via-black/40 to-[#00C864]/10 overflow-hidden flex flex-col items-center text-center space-y-6">
            
            <!-- Ambient Glow -->
            <div class="absolute -top-16 -right-16 w-48 h-48 bg-purple-500/20 rounded-full blur-3xl pointer-events-none" />
            <div class="absolute -bottom-16 -left-16 w-48 h-48 bg-[#00C864]/20 rounded-full blur-3xl pointer-events-none" />

            <!-- Mascot Image -->
            <div
              class="w-48 h-48 sm:w-56 sm:h-56 relative cursor-pointer group"
              @click="openLightbox('/images/products/regist-ai-mascot.png', 'Regist.ai Mascot', 'มาสคอตนกฮูกอัจฉริยะระบบบริหารการลงทะเบียน')"
            >
              <img
                src="/images/products/regist-ai-mascot.png"
                alt="Regist.ai Mascot"
                class="w-full h-full object-contain filter drop-shadow-[0_15px_30px_rgba(147,51,234,0.35)] group-hover:scale-105 transition-transform duration-300"
              >
              <div class="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-black/20 rounded-2xl">
                <span class="px-2.5 py-1 rounded-lg bg-black/70 text-white text-[11px] font-mono flex items-center gap-1">
                  <ZoomIn class="w-3.5 h-3.5" />
                  <span>คลิกเพื่อซูม</span>
                </span>
              </div>
            </div>

            <!-- Banner Logo Frame -->
            <div
              class="w-full rounded-2xl overflow-hidden border border-purple-500/20 bg-white/70 dark:bg-black/40 p-2 cursor-pointer hover:border-purple-500 transition-all shadow-sm"
              @click="openLightbox('/images/products/regist-ai-banner.png', 'Regist.ai Banner Logo', 'ตอบโจทย์ทุกการลงทะเบียน Solution for all registration')"
            >
              <img
                src="/images/products/regist-ai-banner.png"
                alt="Regist.ai Banner"
                class="w-full h-auto object-contain mx-auto"
              >
            </div>

            <div class="text-xs font-mono text-purple-600 dark:text-purple-300 font-semibold">
              WEB-BASED APPLICATION // RESPONSIVE & READY TO DEPLOY
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
          class="p-5 sm:p-6 rounded-2xl spatial-glass border border-purple-500/20 flex flex-col justify-between space-y-2 hover:border-purple-500 transition-all hover:-translate-y-1"
        >
          <div class="text-[11px] font-mono uppercase tracking-wider opacity-60">
            {{ st.label }}
          </div>
          <div class="text-xl sm:text-2xl font-black font-display text-purple-600 dark:text-purple-400">
            {{ st.value }}
          </div>
          <div class="text-xs opacity-75">
            {{ st.sub }}
          </div>
        </div>
      </section>

      <!-- ========================================================
           SECTION 1: SYSTEM FLEXIBILITY & OVERVIEW
      ========================================================= -->
      <section class="p-8 sm:p-10 rounded-[2.5rem] spatial-glass border border-purple-500/20 shadow-xl space-y-6">
        <div class="flex items-center gap-2 text-xs font-mono font-bold text-purple-500 uppercase tracking-wider">
          <Layers class="w-4 h-4" />
          <span>FLEXIBILITY & ARCHITECTURE // ความยืดหยุ่นและโครงสร้างระบบ</span>
        </div>

        <h2 class="font-display font-black text-2xl sm:text-3xl text-[#022C22] dark:text-white">
          ความยืดหยุ่นในการใช้งานสูง ออกแบบมาเพื่อทุกขั้นตอนการจัดสัมมนา
        </h2>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-8 text-sm sm:text-base leading-relaxed opacity-90">
          <div class="space-y-4">
            <h3 class="font-bold text-base sm:text-lg text-purple-700 dark:text-purple-300 flex items-center gap-2">
              <span class="w-2.5 h-2.5 rounded-full bg-purple-500" />
              <span>การบริหารจัดการสำหรับผู้ดูแลระบบ (Admin Control)</span>
            </h3>
            <p>
              ผู้ดูแลระบบสามารถจัดการข้อมูลพื้นฐานเกี่ยวกับการเปิดโครงการสัมมนาเชิงวิชาการหรือหลักสูตรฝึกอบรมใหม่ ๆ การเพิ่ม-ลดข้อมูลเกี่ยวกับสถานที่จัด ค่าใช้จ่าย ค่าสมัครสมาชิก และค่าลงทะเบียน
            </p>
            <p>
              ห้องที่จัดสัมมนารองรับการกำหนดจำนวนคนที่สามารถรองรับได้ พร้อมระบบเลือกประเภทอาหารของผู้ลงทะเบียน (เช่น อาหารทั่วไป, มังสวิรัติ, ฮาลาล) นอกจากนี้ยังสามารถตรวจสอบรายชื่อผู้ลงทะเบียน รองรับการลงทะเบียนแบบกลุ่มด้วย <strong>Excel Loader</strong> และพิมพ์รายงานสำคัญต่าง ๆ เช่น ใบเซ็นชื่อ ป้ายชื่อ หนังสือรับรอง และใบเสร็จรับเงิน
            </p>
          </div>

          <div class="space-y-4">
            <h3 class="font-bold text-base sm:text-lg text-[#00A854] dark:text-[#00FF88] flex items-center gap-2">
              <span class="w-2.5 h-2.5 rounded-full bg-[#00C864]" />
              <span>ความสะดวกสำหรับสมาชิกและบุคคลทั่วไป (Public Experience)</span>
            </h3>
            <p>
              สมาชิกและบุคคลทั่วไปสามารถเข้ามาสอบถามข้อมูลที่ประชาสัมพันธ์ สมัครสมาชิก และลงทะเบียนเข้าร่วมสัมมนาในหลักสูตรที่สนใจได้ทันทีผ่านระบบออนไลน์ (ภายในระยะเวลาที่กำหนด)
            </p>
            <p>
              ผู้ลงทะเบียนสามารถพิมพ์แบบฟอร์มชำระเงินเพื่อนำไปชำระที่ธนาคารหรือโอนเงินผ่าน Mobile Banking จากนั้นแจ้งหลักฐานการโอนเงินผ่านระบบ และพิมพ์ใบยืนยันการลงทะเบียนที่มี <strong>QR Code (e-Ticket)</strong> เพื่อนำไปสแกน Check-in เข้างานได้อย่างสะดวกรวดเร็วและแม่นยำ
            </p>
          </div>
        </div>
      </section>

      <!-- ========================================================
           SECTION 2: WORKFLOW INFOGRAPHIC (3 STEPS VS 6 STEPS)
      ========================================================= -->
      <section class="space-y-8">
        <div class="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-current/10 pb-4">
          <div>
            <div class="text-xs font-mono font-bold text-purple-500 uppercase tracking-wider flex items-center gap-2">
              <QrCode class="w-4 h-4" />
              <span>REGISTRATION WORKFLOW // ขั้นตอนการลงทะเบียน</span>
            </div>
            <h2 class="font-display font-black text-2xl sm:text-4xl text-[#022C22] dark:text-white mt-1">
              ลงทะเบียนออนไลน์ง่ายๆ ด้วยตัวคุณเอง
            </h2>
          </div>
          <button
            type="button"
            class="px-4 py-2 rounded-xl border border-purple-500/30 hover:bg-purple-500/20 text-xs font-mono font-bold flex items-center gap-2 transition-all self-start sm:self-auto cursor-pointer"
            @click="openLightbox('/images/products/regist-ai-workflow.jpg', 'ขั้นตอนการลงทะเบียนออนไลน์ง่ายๆ ด้วยตัวคุณเอง', 'กรณีไม่มีค่าลงทะเบียน 3 ขั้นตอน และกรณีมีค่าลงทะเบียน 6 ขั้นตอน')"
          >
            <ZoomIn class="w-4 h-4 text-purple-500" />
            <span>ซูมดูแผนผังเต็ม</span>
          </button>
        </div>

        <!-- Banner Diagram Image -->
        <div
          class="rounded-[2rem] overflow-hidden border border-purple-500/30 spatial-glass p-3 sm:p-4 cursor-pointer group relative bg-black/10 shadow-xl"
          @click="openLightbox('/images/products/regist-ai-workflow.jpg', 'ขั้นตอนการลงทะเบียนออนไลน์ง่ายๆ ด้วยตัวคุณเอง', 'กรณีไม่มีค่าลงทะเบียน 3 ขั้นตอน และกรณีมีค่าลงทะเบียน 6 ขั้นตอน')"
        >
          <img
            src="/images/products/regist-ai-workflow.jpg"
            alt="Regist.ai Online Registration Workflow"
            class="w-full h-auto object-contain rounded-xl group-hover:scale-[1.01] transition-transform duration-300"
          >
          <div class="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2 text-white text-xs font-mono font-bold">
            <Maximize2 class="w-4 h-4" />
            <span>คลิกดูภาพขนาดใหญ่</span>
          </div>
        </div>

        <!-- Two Comparison Columns -->
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
          <!-- Flow 1: Free Registration (3 Steps) -->
          <div class="p-6 sm:p-8 rounded-3xl bg-white/70 dark:bg-black/40 border border-sky-500/30 shadow-lg space-y-4">
            <div class="flex items-center justify-between">
              <span class="px-3.5 py-1 rounded-full text-xs font-mono font-bold bg-sky-500/20 text-sky-600 dark:text-sky-300 border border-sky-500/30">
                กรณีไม่มีค่าลงทะเบียน (3 ขั้นตอน)
              </span>
              <span class="text-xs font-mono opacity-60">FREE ATTENDANCE</span>
            </div>

            <ol class="space-y-3 text-xs sm:text-sm opacity-90 list-decimal list-inside leading-relaxed">
              <li>
                <strong>ลงทะเบียน:</strong> สมาชิกหรือบุคคลทั่วไปกรอกข้อมูลลงทะเบียนผ่านระบบ Regist.ai
              </li>
              <li>
                <strong>ตรวจสอบ E-mail:</strong> ผู้ลงทะเบียนทำการตรวจสอบข้อมูลการตอบรับทาง E-mail
              </li>
              <li>
                <strong>พิมพ์แบบฟอร์ม QR Code:</strong> พิมพ์แบบฟอร์มใบตอบรับการลงทะเบียนที่มีข้อมูล QR Code เพื่อใช้สแกนเข้างาน
              </li>
            </ol>
          </div>

          <!-- Flow 2: Paid Registration (6 Steps) -->
          <div class="p-6 sm:p-8 rounded-3xl bg-white/70 dark:bg-black/40 border border-purple-500/30 shadow-lg space-y-4">
            <div class="flex items-center justify-between">
              <span class="px-3.5 py-1 rounded-full text-xs font-mono font-bold bg-purple-500/20 text-purple-600 dark:text-purple-300 border border-purple-500/30">
                กรณีมีค่าลงทะเบียน (6 ขั้นตอน)
              </span>
              <span class="text-xs font-mono opacity-60">PAYMENT & VERIFICATION</span>
            </div>

            <ol class="space-y-3 text-xs sm:text-sm opacity-90 list-decimal list-inside leading-relaxed">
              <li>
                <strong>ลงทะเบียน:</strong> กรอกข้อมูลลงทะเบียนผ่านระบบ Regist.ai
              </li>
              <li>
                <strong>พิมพ์ใบแจ้งชำระเงิน:</strong> รับแบบฟอร์มผ่านหน้าจอลงทะเบียนหรือทาง E-mail
              </li>
              <li>
                <strong>ชำระเงิน:</strong> ชำระโดยการโอนเงินหรือนำไปชำระที่เคาน์เตอร์ธนาคาร
              </li>
              <li>
                <strong>แนบหลักฐานการชำระเงิน:</strong> ถ่ายรูปสลิปและแนบหลักฐานกลับเข้ามาในระบบ
              </li>
              <li>
                <strong>ตรวจสอบ E-mail:</strong> รับข้อมูลการตอบรับและการยืนยันยอดเงินจากผู้ดูแลระบบ
              </li>
              <li>
                <strong>พิมพ์แบบฟอร์ม QR Code:</strong> รับใบตอบรับที่มี QR Code เพื่อใช้ในการสแกน Check-in เข้าร่วมงาน
              </li>
            </ol>
          </div>
        </div>
      </section>

      <!-- ========================================================
           SECTION 3: i-Queue by Regist.ai SHOWCASE
      ========================================================= -->
      <section class="p-8 sm:p-12 rounded-[2.5rem] spatial-glass border border-[#00C864]/30 shadow-2xl space-y-10">
        <div class="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-current/10 pb-4">
          <div>
            <div class="text-xs font-mono font-bold text-[#00C864] dark:text-[#00FF88] uppercase tracking-wider flex items-center gap-2">
              <Sparkles class="w-4 h-4" />
              <span>I-QUEUE BY REGIST.AI // ระบบบริหารจัดการคิวอัจฉริยะ</span>
            </div>
            <h2 class="font-display font-black text-2xl sm:text-4xl text-[#022C22] dark:text-white mt-1">
              ระบบจัดการคิวแบบ New Normal ลดความเสี่ยงในการสัมผัสหน้าจอ
            </h2>
            <p class="text-xs sm:text-sm opacity-80 mt-1 max-w-3xl">
              เหมาะสำหรับการตรวจสุขภาพ ฉีดวัคซีนให้พนักงาน โรงพยาบาล โรงพยาบาลสนาม คลินิก ร้านอาหาร และศูนย์บริการ ใช้งานผ่าน Tablet และ Smartphone
            </p>
          </div>

          <button
            type="button"
            class="px-4 py-2 rounded-xl border border-[#00C864]/30 hover:bg-[#00C864]/20 text-xs font-mono font-bold flex items-center gap-2 transition-all self-start sm:self-auto cursor-pointer"
            @click="openLightbox('/images/products/iqueue-banner.jpg', 'i-Queue by Regist.ai Overview', 'ระบบบริหารคิวแบบ New Normal')"
          >
            <ZoomIn class="w-4 h-4 text-[#00C864]" />
            <span>ซูมดูภาพรวม</span>
          </button>
        </div>

        <!-- i-Queue Banner Frame -->
        <div
          class="rounded-2xl overflow-hidden border border-current/10 cursor-pointer group relative bg-black/10 shadow-md"
          @click="openLightbox('/images/products/iqueue-banner.jpg', 'i-Queue by Regist.ai ระบบบริหารคิวแบบ New Normal', 'เหมาะสำหรับ โรงพยาบาล, ร้านอาหาร, โรงพยาบาลสนาม, คลินิก')"
        >
          <img
            src="/images/products/iqueue-banner.jpg"
            alt="i-Queue Overview"
            class="w-full h-auto object-contain group-hover:scale-[1.01] transition-transform duration-300"
          >
        </div>

        <!-- 2 Queue Implementation Models -->
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-8 pt-4">
          
          <!-- Model 1: Hospital / Vaccination Multi-Stage Continuous Queue -->
          <div class="p-6 sm:p-8 rounded-3xl bg-white/60 dark:bg-black/50 border border-emerald-500/30 flex flex-col justify-between space-y-6">
            <div class="space-y-4">
              <div class="flex items-center justify-between">
                <span class="px-3.5 py-1 rounded-full text-xs font-mono font-bold bg-emerald-500/20 text-emerald-600 dark:text-emerald-300 border border-emerald-500/30">
                  รูปแบบที่ 1 : หลายช่องบริการต่อเนื่อง
                </span>
                <span class="text-xs font-mono opacity-60">HOSPITAL & CLINIC</span>
              </div>

              <h3 class="text-lg sm:text-xl font-bold text-[#022C22] dark:text-white">
                ขั้นตอนการจัดคิวหน้างาน (เช่น งานฉีดวัคซีน / ตรวจสุขภาพ)
              </h3>

              <p class="text-xs sm:text-sm opacity-85 leading-relaxed">
                เมื่อผู้รับบริการ Check-in จะได้รับเลขคิวเดียว โดยเจ้าหน้าที่สามารถเรียกคิวเดียวกันตามจุดบริการต่าง ๆ ได้อย่างต่อเนื่อง 5 จุด:
              </p>

              <ul class="text-xs sm:text-sm space-y-2 opacity-90 font-mono">
                <li class="flex items-start gap-2">
                  <span class="w-2 h-2 rounded-full bg-[#00C864] mt-1.5 shrink-0" />
                  <span><strong>จุดบริการที่ 1:</strong> พิมพ์แบบฟอร์มยินยอมการรับวัคซีน / คัดกรองซักประวัติ ประเมินความเสี่ยง</span>
                </li>
                <li class="flex items-start gap-2">
                  <span class="w-2 h-2 rounded-full bg-[#00C864] mt-1.5 shrink-0" />
                  <span><strong>จุดบริการที่ 2:</strong> ชั่งน้ำหนัก วัดความดันโลหิต</span>
                </li>
                <li class="flex items-start gap-2">
                  <span class="w-2 h-2 rounded-full bg-[#00C864] mt-1.5 shrink-0" />
                  <span><strong>จุดบริการที่ 3:</strong> ฉีดวัคซีน / เข้ารับการตรวจรักษา</span>
                </li>
                <li class="flex items-start gap-2">
                  <span class="w-2 h-2 rounded-full bg-[#00C864] mt-1.5 shrink-0" />
                  <span><strong>จุดบริการที่ 4:</strong> จุดตรวจสอบก่อนกลับ พร้อมรับเอกสารการปฏิบัติตัวหลังฉีดวัคซีน</span>
                </li>
                <li class="flex items-start gap-2">
                  <span class="w-2 h-2 rounded-full bg-[#00C864] mt-1.5 shrink-0" />
                  <span><strong>จุดบริการที่ 5:</strong> พักสังเกตอาการ 30 นาที</span>
                </li>
              </ul>
            </div>

            <!-- Flowchart Image -->
            <div
              class="rounded-2xl overflow-hidden border border-current/15 cursor-pointer group relative bg-black/10"
              @click="openLightbox('/images/products/iqueue-hospital-flowchart.png', 'ขั้นตอนการจัดคิวหน้างาน (ฉีดวัคซีน / ตรวจสุขภาพ)', 'Check-in, Queue Management & Check Point 5 จุดบริการ')"
            >
              <img
                src="/images/products/iqueue-hospital-flowchart.png"
                alt="Hospital Flowchart"
                class="w-full h-56 object-cover group-hover:scale-105 transition-transform duration-300"
              >
              <div class="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2 text-white text-xs font-mono font-bold">
                <ZoomIn class="w-4 h-4" />
                <span>คลิกดูภาพขยาย</span>
              </div>
            </div>
          </div>

          <!-- Model 2: Restaurant Single-Point Queue Flow -->
          <div class="p-6 sm:p-8 rounded-3xl bg-white/60 dark:bg-black/50 border border-amber-500/30 flex flex-col justify-between space-y-6">
            <div class="space-y-4">
              <div class="flex items-center justify-between">
                <span class="px-3.5 py-1 rounded-full text-xs font-mono font-bold bg-amber-500/20 text-amber-600 dark:text-amber-300 border border-amber-500/30">
                  รูปแบบที่ 2 : หนึ่งช่องบริการ (ร้านอาหาร)
                </span>
                <span class="text-xs font-mono opacity-60">RESTAURANT & SERVICE</span>
              </div>

              <h3 class="text-lg sm:text-xl font-bold text-[#022C22] dark:text-white">
                ขั้นตอนการใช้งานระบบจัดคิว (ร้านอาหาร / ศูนย์บริการ)
              </h3>

              <p class="text-xs sm:text-sm opacity-85 leading-relaxed">
                เมื่อผู้รับบริการกดบัตรคิว เจ้าหน้าที่สามารถเรียกคิวเข้ารับบริการผ่าน Smart TV พร้อมระบบแจ้งเตือนโต๊ะ:
              </p>

              <ul class="text-xs sm:text-sm space-y-2 opacity-90 font-mono">
                <li class="flex items-start gap-2">
                  <span class="w-2 h-2 rounded-full bg-amber-500 mt-1.5 shrink-0" />
                  <span><strong>ขั้นตอนที่ 1 (หน้าร้าน):</strong> กดบัตรคิวบน Tablet / Smartphone หรือพิมพ์บัตรคิว (มีช่องระบุชื่อลูกค้าและจำนวนที่นั่ง)</span>
                </li>
                <li class="flex items-start gap-2">
                  <span class="w-2 h-2 rounded-full bg-amber-500 mt-1.5 shrink-0" />
                  <span><strong>ขั้นตอนที่ 2 (จุดเรียกคิว):</strong> เจ้าหน้าที่เรียกคิวผ่าน Tablet / Smartphone และ Notebook</span>
                </li>
                <li class="flex items-start gap-2">
                  <span class="w-2 h-2 rounded-full bg-amber-500 mt-1.5 shrink-0" />
                  <span><strong>ขั้นตอนที่ 3 (จอแสดงผล):</strong> จอเรียกคิวระบุเบอร์โต๊ะ เช่น <em>"เชิญคุณ วี หมายเลข 5 ที่โต๊ะ 7 ค่ะ"</em></span>
                </li>
                <li class="flex items-start gap-2">
                  <span class="w-2 h-2 rounded-full bg-amber-500 mt-1.5 shrink-0" />
                  <span><strong>ฟังก์ชันเสริม:</strong> ระบบแจ้งเตือนโต๊ะที่กำลังจะครบกำหนดเวลาได้ (เช่น 1 ชม.)</span>
                </li>
              </ul>
            </div>

            <!-- Flowchart Image -->
            <div
              class="rounded-2xl overflow-hidden border border-current/15 cursor-pointer group relative bg-black/10"
              @click="openLightbox('/images/products/iqueue-restaurant-flowchart.jpg', 'ขั้นตอนการใช้งานระบบจัดคิว (ร้านอาหาร)', 'ออกบัตรคิวบน Tablet, จอเรียกคิวระบุโต๊ะ และระบบแจ้งเตือนโต๊ะ')"
            >
              <img
                src="/images/products/iqueue-restaurant-flowchart.jpg"
                alt="Restaurant Flowchart"
                class="w-full h-56 object-cover group-hover:scale-105 transition-transform duration-300"
              >
              <div class="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2 text-white text-xs font-mono font-bold">
                <ZoomIn class="w-4 h-4" />
                <span>คลิกดูภาพขยาย</span>
              </div>
            </div>
          </div>

        </div>
      </section>

      <!-- ========================================================
           SECTION 4: FEATURE MATRIX (ADMIN & USER CAPABILITIES)
      ========================================================= -->
      <section class="space-y-10">
        <div class="text-center max-w-2xl mx-auto space-y-2">
          <div class="text-xs font-mono font-bold text-purple-600 dark:text-purple-400 uppercase tracking-wider">
            FEATURE MATRIX // คุณสมบัติการใช้งานระบบ
          </div>
          <h2 class="font-display font-black text-2xl sm:text-4xl text-[#022C22] dark:text-white">
            ฟังก์ชันครบวงจร ทั้งผู้ดูแลระบบและผู้ใช้งานทั่วไป
          </h2>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
          <!-- Admin Capabilities Card -->
          <div class="p-6 sm:p-8 rounded-3xl spatial-glass border border-purple-500/20 shadow-xl space-y-5">
            <div class="flex items-center gap-3">
              <div class="w-12 h-12 rounded-2xl bg-purple-600 text-white flex items-center justify-center shrink-0 shadow-md">
                <ShieldCheck class="w-6 h-6" />
              </div>
              <div>
                <h3 class="text-lg sm:text-xl font-bold text-[#022C22] dark:text-white">
                  คุณสมบัติสำหรับผู้ดูแลระบบ (Admin)
                </h3>
                <p class="text-xs opacity-65 font-mono">
                  ADMINISTRATIVE MANAGEMENT ENGINE
                </p>
              </div>
            </div>

            <ul class="space-y-3 pt-2 text-xs sm:text-sm opacity-90 leading-relaxed">
              <li
                v-for="(feat, idx) in adminFeatures"
                :key="idx"
                class="flex items-start gap-2.5"
              >
                <CheckCircle2 class="w-4 h-4 text-purple-600 dark:text-purple-400 shrink-0 mt-0.5" />
                <span>{{ feat }}</span>
              </li>
            </ul>
          </div>

          <!-- User Capabilities Card -->
          <div class="p-6 sm:p-8 rounded-3xl spatial-glass border border-[#00C864]/20 shadow-xl space-y-5">
            <div class="flex items-center gap-3">
              <div class="w-12 h-12 rounded-2xl bg-[#00C864] text-[#022C22] flex items-center justify-center shrink-0 shadow-md">
                <Users class="w-6 h-6" />
              </div>
              <div>
                <h3 class="text-lg sm:text-xl font-bold text-[#022C22] dark:text-white">
                  คุณสมบัติสำหรับผู้ใช้งานทั่วไป (User Portal)
                </h3>
                <p class="text-xs opacity-65 font-mono">
                  PUBLIC ENGAGEMENT & REGISTRATION
                </p>
              </div>
            </div>

            <ul class="space-y-3 pt-2 text-xs sm:text-sm opacity-90 leading-relaxed">
              <li
                v-for="(feat, idx) in userFeatures"
                :key="idx"
                class="flex items-start gap-2.5"
              >
                <CheckCircle2 class="w-4 h-4 text-[#00C864] dark:text-[#00FF88] shrink-0 mt-0.5" />
                <span>{{ feat }}</span>
              </li>
            </ul>
          </div>
        </div>

        <!-- Target Organizations Grid -->
        <div class="p-8 sm:p-10 rounded-[2.5rem] bg-current/5 border border-current/10 space-y-6">
          <div class="text-xs font-mono font-bold uppercase tracking-wider text-purple-600 dark:text-purple-400 flex items-center gap-2">
            <Building2 class="w-4 h-4" />
            <span>SUITABLE FOR // โปรแกรมนี้เหมาะสำหรับใคร</span>
          </div>

          <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            <div
              v-for="(org, idx) in targetOrgs"
              :key="idx"
              class="p-5 rounded-2xl spatial-glass border border-current/10 space-y-2 hover:border-purple-500 transition-all hover:-translate-y-1"
            >
              <div class="text-sm font-bold text-[#022C22] dark:text-white">
                {{ org.title }}
              </div>
              <p class="text-xs opacity-75 leading-relaxed">
                {{ org.desc }}
              </p>
            </div>
          </div>
        </div>
      </section>

      <!-- ========================================================
           SECTION 5: SPECIAL PROMOTION BANNER
      ========================================================= -->
      <section class="p-8 sm:p-10 rounded-[2.5rem] bg-gradient-to-br from-purple-900/40 via-purple-950/30 to-[#00C864]/20 border border-purple-500/40 shadow-2xl relative overflow-hidden">
        <div class="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-8">
          <div class="space-y-3 max-w-2xl">
            <div class="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono font-bold bg-purple-500/20 text-purple-300 border border-purple-500/30">
              <Tag class="w-3.5 h-3.5" />
              <span>SPECIAL PROMOTION // ข้อเสนอพิเศษ</span>
            </div>
            <h2 class="text-2xl sm:text-4xl font-display font-black text-white">
              ไอรีจิส "ตอบโจทย์ทุกการลงทะเบียน" โปรโมชันพิเศษ (Promotion!!!)
            </h2>
            <p class="text-xs sm:text-sm text-slate-200 leading-relaxed">
              สิทธิพิเศษสำหรับหน่วยงานและองค์กรที่สั่งซื้อและติดตั้งระบบ Regist.ai
            </p>
            <ul class="space-y-2 text-xs sm:text-sm font-medium text-emerald-300">
              <li class="flex items-center gap-2">
                <CheckCircle2 class="w-4 h-4 text-[#00FF88] shrink-0" />
                <span><strong>ค่าจดทะเบียนหรือต่ออายุโดเมน (Domain) ฟรี!</strong> ถึงสิ้นเดือนกันยายน</span>
              </li>
              <li class="flex items-center gap-2">
                <CheckCircle2 class="w-4 h-4 text-[#00FF88] shrink-0" />
                <span><strong>ติดตั้งและพร้อมเปิดใช้งานได้รวดเร็วภายใน 1 สัปดาห์</strong></span>
              </li>
              <li class="text-xs opacity-70">
                * เงื่อนไขเป็นไปตามที่บริษัท ไอเจนโก้ จำกัด กำหนด
              </li>
            </ul>
          </div>

          <div class="flex flex-col sm:flex-row lg:flex-col gap-3 w-full lg:w-auto shrink-0">
            <button
              type="button"
              class="px-6 py-3.5 rounded-2xl bg-purple-600 hover:bg-purple-700 text-white font-bold text-xs sm:text-sm font-mono transition-all flex items-center justify-center gap-2 shadow-lg hover:scale-105 active:scale-95 cursor-pointer"
              @click="scrollToContact"
            >
              <span>ติดต่อขอรับสิทธิ์โปรโมชัน</span>
              <ArrowUpRight class="w-4 h-4" />
            </button>
            <a
              href="https://www.i-regist.com/"
              target="_blank"
              rel="noopener noreferrer"
              class="px-6 py-3.5 rounded-2xl bg-white/10 hover:bg-white/20 text-white font-bold text-xs sm:text-sm font-mono transition-all flex items-center justify-center gap-2 border border-white/20"
            >
              <span>เยี่ยมชม www.i-regist.com</span>
              <ExternalLink class="w-4 h-4" />
            </a>
          </div>
        </div>
      </section>

      <!-- ========================================================
           SECTION 6: OFFICIAL BROCHURES & SYSTEM DOWNLOADS
      ========================================================= -->
      <section class="space-y-6">
        <div class="space-y-2">
          <div class="text-xs font-mono font-bold text-purple-600 dark:text-purple-400 uppercase tracking-wider flex items-center gap-2">
            <Download class="w-4 h-4" />
            <span>OFFICIAL DOWNLOADS // เอกสารและโบรชัวร์ระบบ</span>
          </div>
          <h2 class="font-display font-black text-2xl sm:text-3xl text-[#022C22] dark:text-white">
            ดาวน์โหลดเอกสารคุณสมบัติและโบรชัวร์ระบบไอรีจิส
          </h2>
          <p class="text-xs sm:text-sm opacity-80">
            เอกสารทางการประกอบการพิจารณาจัดซื้อจัดจ้างสำหรับหน่วยงานภาครัฐและเอกชน
          </p>
        </div>

        <div class="grid grid-cols-1 sm:grid-cols-2 gap-5">
          <!-- Brochure 1 -->
          <a
            href="https://www.i-regist.com/index.php/brochure-i-regist/member-management-system"
            target="_blank"
            rel="noopener noreferrer"
            class="p-6 rounded-3xl spatial-glass border border-purple-500/30 hover:border-purple-400 hover:scale-[1.02] transition-all flex items-center justify-between group shadow-sm"
          >
            <div class="flex items-center gap-4">
              <div class="w-12 h-12 rounded-2xl bg-purple-600/20 text-purple-600 dark:text-purple-400 flex items-center justify-center shrink-0">
                <FileText class="w-6 h-6" />
              </div>
              <div>
                <div class="text-base font-bold group-hover:text-purple-500 transition-colors">
                  ดาวน์โหลดคุณสมบัติระบบไอรีจิส
                </div>
                <div class="text-xs opacity-65 font-mono">
                  Member Management System PDF
                </div>
              </div>
            </div>
            <Download class="w-5 h-5 text-purple-500 shrink-0 group-hover:translate-y-1 transition-transform" />
          </a>

          <!-- Brochure 2 -->
          <a
            href="https://i-regist.com/index.php/th/brochure-i-regist/registration-system"
            target="_blank"
            rel="noopener noreferrer"
            class="p-6 rounded-3xl spatial-glass border border-[#00C864]/30 hover:border-[#00C864] hover:scale-[1.02] transition-all flex items-center justify-between group shadow-sm"
          >
            <div class="flex items-center gap-4">
              <div class="w-12 h-12 rounded-2xl bg-[#00C864]/20 text-[#00A854] dark:text-[#00FF88] flex items-center justify-center shrink-0">
                <FileText class="w-6 h-6" />
              </div>
              <div>
                <div class="text-base font-bold group-hover:text-[#00C864] transition-colors">
                  Download i-Regist Brochure
                </div>
                <div class="text-xs opacity-65 font-mono">
                  Registration System Document PDF
                </div>
              </div>
            </div>
            <Download class="w-5 h-5 text-[#00C864] shrink-0 group-hover:translate-y-1 transition-transform" />
          </a>
        </div>
      </section>

      <!-- ========================================================
           SECTION 7: CONTACT SPECIALIST CARD
      ========================================================= -->
      <section
        id="contact-specialist"
        class="p-8 sm:p-10 rounded-[2.5rem] spatial-glass border border-purple-500/40 shadow-2xl space-y-6 bg-gradient-to-br from-white/90 via-purple-50/30 to-emerald-50/20 dark:from-black/70 dark:via-purple-950/20 dark:to-black/40 scroll-mt-28"
      >
        <div class="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 pb-6 border-b border-current/10">
          <div class="flex items-center gap-5">
            <div class="w-18 h-18 sm:w-20 sm:h-20 rounded-2xl bg-white dark:bg-black/50 border border-purple-500/30 p-2 shrink-0 flex items-center justify-center shadow-lg">
              <img
                src="/images/products/regist-ai-mascot.png"
                alt="Regist.ai Specialist"
                class="w-full h-full object-contain"
              >
            </div>
            <div class="space-y-1">
              <div class="text-xs font-mono font-bold text-purple-600 dark:text-purple-400 uppercase tracking-wider flex items-center gap-1.5">
                <Phone class="w-3.5 h-3.5" />
                <span>INTERESTED & CONTACT // สนใจติดต่อสอบถามและนัดสาธิตระบบ</span>
              </div>
              <h3 class="text-xl sm:text-2xl font-display font-black text-[#022C22] dark:text-white">
                คุณทวีวัตร์ ทรรศนะประทีป
              </h3>
              <p class="text-xs sm:text-sm opacity-80">
                ผู้เชี่ยวชาญโซลูชันระบบลงทะเบียน Regist.ai และระบบบริหารคิว i-Queue บริษัท ไอเจนโก้ จำกัด
              </p>
            </div>
          </div>
        </div>

        <div class="flex flex-wrap items-center gap-4">
          <a
            href="tel:025325151"
            class="px-5 py-3 rounded-2xl bg-purple-600 hover:bg-purple-700 text-white text-xs sm:text-sm font-bold font-mono transition-all flex items-center gap-2 shadow-md hover:scale-105 active:scale-95"
          >
            <Phone class="w-4 h-4" />
            <span>โทร. 02-532-5151</span>
          </a>

          <a
            href="tel:0817529549"
            class="px-5 py-3 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs sm:text-sm font-bold font-mono transition-all flex items-center gap-2 shadow-md hover:scale-105 active:scale-95"
          >
            <Phone class="w-4 h-4" />
            <span>โทร. 081-752-9549</span>
          </a>

          <a
            href="mailto:thaweewat@igenco.co.th"
            class="px-5 py-3 rounded-2xl border border-purple-500/40 hover:bg-purple-500/20 text-xs sm:text-sm font-bold font-mono transition-all flex items-center gap-2 shadow-sm hover:scale-105 active:scale-95"
          >
            <Mail class="w-4 h-4 text-purple-500" />
            <span>thaweewat@igenco.co.th</span>
          </a>

          <a
            href="https://www.i-regist.com/"
            target="_blank"
            rel="noopener noreferrer"
            class="px-5 py-3 rounded-2xl spatial-glass border border-current/15 hover:bg-current/10 text-xs sm:text-sm font-bold font-mono transition-all flex items-center gap-2"
          >
            <ExternalLink class="w-4 h-4 text-[#00C864]" />
            <span>เว็บไซต์ www.i-regist.com</span>
          </a>
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
            class="absolute top-5 right-5 w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-all z-10"
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
