<script setup lang="ts">
import { ref } from 'vue'
import AppHeader from '~/components/AppHeader.vue'
import ContactFooter from '~/components/ContactFooter.vue'
import {
  ArrowLeft,
  ArrowUpRight,
  Sparkles,
  Trophy,
  Award,
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
  Tag,
  Mic,
  Smile,
  BarChart3,
  BookOpen,
  Briefcase,
  GraduationCap,
  Network,
  Share2
} from 'lucide-vue-next'
import { useTheme } from '~/composables/useTheme'

const { showToast } = useTheme()

useHead({
  title: 'HR.ai (ระบบบริหารทรัพยากรมนุษย์อัจฉริยะ) - บริษัท ไอเจนโก้ จำกัด (IGENCO)',
  meta: [
    {
      name: 'description',
      content: 'HR.ai ระบบบริหารทรัพยากรมนุษย์อัจฉริยะ ตอบโจทย์ทุกงานบริหารคน ครอบคลุมการทำงานสำหรับ HRM, HRD, OD ได้รับรางวัล The Winner ในงาน OIIO2019 โดย บริษัท ไอเจนโก้ จำกัด'
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
  { label: 'โครงสร้างระบบหลัก', value: '4 ระบบครบวงจร', sub: 'EIS / HRM / HRD / OD ครอบคลุมทั้งองค์กร' },
  { label: 'รางวัลเกียรติยศ', value: 'The Winner OIIO', sub: 'ชนะเลิศในงาน OIIO Thailand Techland 2019' },
  { label: 'นวัตกรรมอัจฉริยะ', value: 'AI Voice & Face ID', sub: 'สั่งการด้วยเสียงโต้ตอบ & ตรวจจับใบหน้า' },
  { label: 'มาตรฐานความปลอดภัย', value: 'Single Sign-on & SSL', sub: 'เชื่อมต่อ Active Directory & Oracle RDBMS' }
]

// 1. EIS Modules (ระบบให้บริการข้อมูลสารสนเทศ)
const eisModules = [
  {
    code: 'EIS-01',
    title: 'หน้าหลักองค์กร (Home Portal)',
    desc: 'แสดงข้อมูลโครงสร้างองค์กร ทำเนียบผู้บริหาร ทำเนียบบุคลากร และข่าวสารประชาสัมพันธ์ภายในแบบเรียลไทม์'
  },
  {
    code: 'EIS-02',
    title: 'บริการตนเอง (e-Service ESS / MSS)',
    desc: 'บุคลากรและผู้จัดการสามารถเข้าใช้งานบริการตนเอง ปรับขนาดหน้าจออัตโนมัติ (Auto Responsive) บน Smart Phone, Tablet, PC'
  },
  {
    code: 'EIS-03',
    title: 'แดชบอร์ดสถิติผู้บริหาร (e-MIS Dashboard)',
    desc: 'แสดงสถิติสำคัญในรูปแบบกราฟ: Retention Rate, Turnover Rate, Vacancy Rate, Overtime, Absent Rate, KPI Results'
  },
  {
    code: 'EIS-04',
    title: 'อนุมัติและติดตามเอกสาร (e-Workflow & Alert)',
    desc: 'ระบบติดตามคำขอ ใบลา โอที พร้อมการแจ้งเตือน (Alert / Push Notification) แสดงรายการที่รออนุมัติทันที'
  },
  {
    code: 'EIS-05',
    title: 'กระดานข่าวและการจัดการความรู้ (e-Webboard / KM)',
    desc: 'สร้างชุมชนนักปฏิบัติ (CoPs: Community of Practices) และแลกเปลี่ยนองค์ความรู้ภายในองค์กรอย่างเป็นระบบ'
  }
]

// 2. HRM Modules (ระบบบริหารงานบุคคล 9 โมดูล)
const hrmModules = [
  'ระบบทะเบียนประวัติบุคลากร (Employee Profile & History)',
  'ระบบบริหารอัตรากำลัง (Manpower Planning & Management)',
  'ระบบสรรหา บรรจุ แต่งตั้ง ทั้งภายในและภายนอก (Recruitment & Onboarding)',
  'ระบบการลงเวลาและกะการทำงาน (Time Attendance & Shift Management)',
  'ระบบบริหารเงินเดือน ภาษี และค่าตอบแทน (Payroll & Compensation)',
  'ระบบสวัสดิการและการเบิกจ่าย (Welfare Management)',
  'ระบบงานด้านสุขภาพและความปลอดภัย (Health & Safety) รองรับเกณฑ์กรมบัญชีกลาง',
  'ระบบงานระเบียบวินัยและข้อร้องเรียน (Discipline Management)',
  'ระบบพ้นหน้าที่และการเกษียณอายุ (Resign & Retirement)'
]

// 3. HRD Modules (ระบบพัฒนาบุคลากร)
const hrdModules = [
  {
    title: 'ระบบฝึกอบรมและพัฒนาบุคลากร (Training & IDP)',
    desc: 'จัดทำแผนพัฒนารายบุคคล (Individual Development Plan) และระบบบริหารจัดการผู้มีความสามารถสูง (Talent Management)'
  },
  {
    title: 'ระบบประเมินและวัดผล KPI (Key Performance Indicators)',
    desc: 'กำหนดตัวชี้วัดผลงานระดับบุคคล แผนก และองค์กร พร้อมระบบคำนวณคะแนนประเมินอัตโนมัติ'
  },
  {
    title: 'ระบบประเมินศักยภาพและพฤติกรรม (Competencies Evaluation)',
    desc: 'ประเมินขีดความสามารถหลัก (Core Competency), ตามสายงาน (Functional) และความเป็นผู้นำ (Managerial)'
  }
]

// 4. OD Modules (ระบบพัฒนาองค์กร)
const odModules = [
  {
    title: 'ผังโครงสร้างองค์กร (Organization Structure)',
    desc: 'บันทึกและจำลองผังโครงสร้างสายการบังคับบัญชาแบบไดนามิก ปรับเปลี่ยนได้ตามการเติบโตของธุรกิจ'
  },
  {
    title: 'ระบบบันทึกข้อมูลตำแหน่ง (Positions & Career Path)',
    desc: 'จัดการระดับตำแหน่ง การเติบโตตามสายงาน และการสืบทอดตำแหน่งสำคัญ (Succession Planning)'
  },
  {
    title: 'ลักษณะงาน หน้าที่ความรับผิดชอบ (Job Description: JD / JS)',
    desc: 'บันทึกมาตรฐานงาน ทักษะที่ต้องการ และความรับผิดชอบของแต่ละตำแหน่งอย่างชัดเจน'
  },
  {
    title: 'ข้อมูลพื้นฐานเชิงนโยบาย (Corporate Policy)',
    desc: 'จัดเก็บและสื่อสารระเบียบนโยบายบริษัท กฎหมายแรงงาน และคู่มือการปฏิบัติงาน'
  },
  {
    title: 'ระบบจัดการความรู้ (Knowledge Management : KM)',
    desc: 'เชื่อมโยงหลักสูตรการเรียนรู้ ข้อสอบออนไลน์ (Quiz) เข้ากับระบบ Moodle และ E-Learning'
  }
]

// Site References (องค์กรผู้ใช้งาน)
const siteReferences = [
  { name: 'สถาบันเทคโนโลยีนิวเคลียร์แห่งชาติ (องค์การมหาชน)', code: 'TINT', desc: 'ระบบบริหารทรัพยากรบุคคลองค์กรวิจัยระดับชาติ' },
  { name: 'สำนักงานส่งเสริมการจัดประชุมและนิทรรศการ', code: 'TCEB', desc: 'ระบบประเมินผลและพัฒนาบุคลากรภาครัฐ' },
  { name: 'บริษัท ไทยรุ่งยูเนี่ยนคาร์ จำกัด (มหาชน)', code: 'THAIRUNG', desc: 'อุตสาหกรรมยานยนต์ขนาดใหญ่พนักงานกว่า 2,000 คน' },
  { name: 'บริษัท แบรนด์ ซันโทรี่ (ประเทศไทย) จำกัด', code: 'BRAND\'S SUNTORY', desc: 'ระบบจัดการกะและการลงเวลาโรงงานมาตรฐานสากล' },
  { name: 'KTB General Services and Security Co., Ltd.', code: 'KTBGS', desc: 'ระบบบริหารงานบุคคลและบริการตนเองพนักงานทั่วประเทศ' },
  { name: 'FEEL THE JOY', code: 'FTJ', desc: 'ธุรกิจบริการและไลฟ์สไตล์ยุคดิจิทัล' }
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
  <div class="min-h-screen relative selection:bg-[#00C864] selection:text-[#022C22] flex flex-col justify-between bg-[#F8FAF9] dark:bg-[#020806] text-slate-800 dark:text-slate-100">
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
          <span class="text-[#00A854] dark:text-[#00FF88] font-bold">HR.ai (ระบบบริหารทรัพยากรมนุษย์อัจฉริยะ)</span>
        </div>
      </div>

      <!-- ========================================================
           HERO SECTION: PRODUCT OVERVIEW & OFFICE BANNER
      ========================================================= -->
      <section class="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
        <!-- Left Column: Title, Slogan, Executive Narrative (7 Cols) -->
        <div class="lg:col-span-7 space-y-6">
          <div class="flex flex-wrap items-center gap-2.5">
            <span class="px-3.5 py-1 rounded-full text-xs font-mono font-bold bg-[#00C864]/15 text-[#00A854] dark:bg-[#00FF88]/15 dark:text-[#00FF88] border border-[#00C864]/30">
              ซอฟต์แวร์อัจฉริยะ // 02
            </span>
            <span class="px-3.5 py-1 rounded-full text-xs font-mono font-bold bg-amber-500/15 text-amber-600 dark:bg-amber-400/15 dark:text-amber-300 border border-amber-500/30 flex items-center gap-1.5">
              <Trophy class="w-3.5 h-3.5" />
              <span>THE WINNER OIIO 2019</span>
            </span>
            <span class="px-3.5 py-1 rounded-full text-xs font-mono opacity-70 border border-current/10">
              HRM • HRD • OD • EIS
            </span>
          </div>

          <div class="space-y-3">
            <h1 class="font-display font-black text-3xl sm:text-5xl lg:text-6xl tracking-tight leading-[1.15] text-[#022C22] dark:text-white">
              HR<span class="text-[#00C864] dark:text-[#00FF88]">.ai</span>
            </h1>
            <div class="text-lg sm:text-2xl font-bold text-[#00A854] dark:text-[#00FF88] font-display">
              ระบบบริหารทรัพยากรมนุษย์อัจฉริยะ (Human Resource Artificial Intelligence)
            </div>
            <div class="inline-block px-4 py-1.5 rounded-xl bg-[#00C864]/10 dark:bg-[#00FF88]/10 text-xs sm:text-sm font-mono font-bold text-[#00A854] dark:text-[#00FF88] border border-[#00C864]/25">
              “ ตอบโจทย์ทุกงานบริหารคน ครอบคลุมการทำงานสำหรับ HRM HRD OD ”
            </div>
          </div>

          <div class="space-y-3 text-sm sm:text-base opacity-85 leading-relaxed text-slate-700 dark:text-slate-300">
            <p>
              <strong>บทสรุปผู้บริหาร:</strong> การดำเนินธุรกิจในปัจจุบันมีการแข่งขันสูง การสร้างผลกำไรไม่เพียงแต่การเพิ่มยอดขาย หากองค์กรใดสามารถวางกลยุทธ์ที่สร้างความได้เปรียบด้วยการมีต้นทุนต่ำกว่าคู่แข่ง (Cost Leadership) จึงจะเติบโตได้อย่างยั่งยืน การนำเทคโนโลยีสารสนเทศ <strong>HR.ai</strong> มาใช้นั้น จะช่วยลดต้นทุน ทำให้เกิดความถูกต้อง รวดเร็วในการปฏิบัติงาน และช่วยให้ผู้บริหารมีข้อมูลเชิงลึกในการตัดสินใจได้อย่างแม่นยำ
            </p>
            <p>
              <strong>HR.ai (i-HURIS)</strong> พัฒนาบนเว็บเทคโนโลยี (Web-Based Technology) ทำงานได้บนอินทราเน็ตและอินเทอร์เน็ต รองรับฐานข้อมูล RDBMS เกรดองค์กร เช่น Oracle เชื่อมโยงระบบความปลอดภัย SSL, Active Directory (Single Sign-on) และรองรับการสั่งการด้วยเสียงโต้ตอบ (Two-way Voice AI) พร้อมระบบจดจำใบหน้า (Face Recognition)
            </p>
          </div>

          <!-- Hero Action Buttons -->
          <div class="flex flex-wrap items-center gap-3.5 pt-2">
            <button
              type="button"
              class="px-6 py-3.5 rounded-2xl bg-[#00C864] hover:bg-[#00A854] text-[#022C22] dark:bg-[#00FF88] dark:hover:bg-[#00D270] dark:text-[#020806] font-bold text-xs sm:text-sm font-mono transition-all flex items-center gap-2 shadow-lg hover:scale-105 active:scale-95 cursor-pointer"
              @click="scrollToContact"
            >
              <span>ติดต่อสอบถาม / นัดหมายสาธิตโปรแกรม</span>
              <ArrowUpRight class="w-4 h-4" />
            </button>

            <a
              href="https://www.hraicloud.com"
              target="_blank"
              rel="noopener noreferrer"
              class="px-5 py-3.5 rounded-2xl spatial-glass border border-[#00C864]/30 hover:border-[#00C864] font-bold text-xs sm:text-sm font-mono transition-all flex items-center gap-2 shadow-sm hover:scale-105 active:scale-95"
            >
              <span>เข้าสู่เว็บไซต์ hraicloud.com</span>
              <ExternalLink class="w-4 h-4 text-[#00C864] dark:text-[#00FF88]" />
            </a>
          </div>
        </div>

        <!-- Right Column: Office Showcase & Award Mascot (5 Cols) -->
        <div class="lg:col-span-5 relative">
          <div class="relative p-6 sm:p-8 rounded-[2.5rem] spatial-glass border border-[#00C864]/30 shadow-2xl bg-gradient-to-br from-[#00C864]/10 via-white/50 dark:via-black/40 to-emerald-950/20 overflow-hidden flex flex-col items-center text-center space-y-6">
            
            <!-- Ambient Glow -->
            <div class="absolute -top-16 -right-16 w-48 h-48 bg-[#00FF88]/20 rounded-full blur-3xl pointer-events-none" />
            <div class="absolute -bottom-16 -left-16 w-48 h-48 bg-[#00C864]/20 rounded-full blur-3xl pointer-events-none" />

            <!-- Main Office Illustration Banner -->
            <div
              class="w-full rounded-2xl overflow-hidden border border-[#00C864]/30 bg-white/70 dark:bg-black/50 p-2 cursor-pointer group relative shadow-md"
              @click="openLightbox('/images/products/hr-ai-office-banner.jpg', 'HR.ai Smart Office Solution', 'ตอบโจทย์ทุกงานบริหารคน ครอบคลุมการทำงานสำหรับ HRM, HRD, OD')"
            >
              <img
                src="/images/products/hr-ai-office-banner.jpg"
                alt="HR.ai Smart Office Solution"
                class="w-full h-auto object-contain rounded-xl group-hover:scale-105 transition-transform duration-500"
              >
              <div class="absolute inset-0 bg-black/25 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-1.5 text-white text-xs font-mono font-bold rounded-xl">
                <ZoomIn class="w-4 h-4 text-[#00FF88]" />
                <span>คลิกเพื่อดูภาพขยาย</span>
              </div>
            </div>

            <!-- Award Highlight Ribbon Inside Card -->
            <div
              class="w-full flex items-center gap-3.5 p-3 rounded-2xl bg-amber-500/10 border border-amber-500/30 text-left cursor-pointer hover:border-amber-500 transition-all"
              @click="openLightbox('/images/products/hr-ai-award-trophy.jpg', 'The Winner OIIO Thailand Techland 2019', 'รางวัลแห่งความภาคภูมิใจถึงความสำเร็จของการเปลี่ยนแปลงองค์กรในยุคดิจิทัลไทยแลนด์ 4.0')"
            >
              <div class="w-12 h-12 rounded-xl bg-amber-500 text-black flex items-center justify-center shrink-0 shadow-md">
                <Trophy class="w-6 h-6" />
              </div>
              <div class="space-y-0.5">
                <div class="text-[11px] font-mono text-amber-600 dark:text-amber-300 font-bold">
                  NATIONAL INNOVATION WINNER
                </div>
                <div class="text-xs font-bold text-[#022C22] dark:text-white line-clamp-1">
                  ชนะเลิศ The Winner ในงาน OIIO2019
                </div>
                <div class="text-[11px] opacity-75">
                  ความภาคภูมิใจในการนำพาองค์กรไทยสู่ Thailand 4.0
                </div>
              </div>
            </div>

            <div class="text-xs font-mono text-[#00A854] dark:text-[#00FF88] font-semibold">
              WEB-BASED & HYBRID MOBILE // ISO/IEC 29110 CERTIFIED
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
          class="p-5 sm:p-6 rounded-2xl spatial-glass border border-[#00C864]/20 flex flex-col justify-between space-y-2 hover:border-[#00C864] transition-all hover:-translate-y-1"
        >
          <div class="text-[11px] font-mono uppercase tracking-wider opacity-60">
            {{ st.label }}
          </div>
          <div class="text-xl sm:text-2xl font-black font-display text-[#00A854] dark:text-[#00FF88]">
            {{ st.value }}
          </div>
          <div class="text-xs opacity-75">
            {{ st.sub }}
          </div>
        </div>
      </section>

      <!-- ========================================================
           SECTION 1: EXECUTIVE SUMMARY & ARCHITECTURAL STRENGTHS
      ========================================================= -->
      <section class="p-8 sm:p-10 rounded-[2.5rem] spatial-glass border border-[#00C864]/25 shadow-xl space-y-6">
        <div class="flex items-center gap-2 text-xs font-mono font-bold text-[#00A854] dark:text-[#00FF88] uppercase tracking-wider">
          <Layers class="w-4 h-4" />
          <span>EXECUTIVE STRATEGY & ENTERPRISE ARCHITECTURE // ยุทธศาสตร์องค์กรและสถาปัตยกรรมระบบ</span>
        </div>

        <h2 class="font-display font-black text-2xl sm:text-3xl text-[#022C22] dark:text-white">
          ยกระดับการบริหารทรัพยากรมนุษย์ด้วยต้นทุนที่คุ้มค่าและความมั่นคงปลอดภัย
        </h2>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-8 text-sm sm:text-base leading-relaxed opacity-90">
          <div class="space-y-4">
            <h3 class="font-bold text-base sm:text-lg text-[#00A854] dark:text-[#00FF88] flex items-center gap-2">
              <span class="w-2.5 h-2.5 rounded-full bg-[#00C864]" />
              <span>กลยุทธ์การลดต้นทุนและเพิ่มขีดความสามารถ (Cost Leadership)</span>
            </h3>
            <p>
              การดำเนินธุรกิจในปัจจุบันแข่งขันกันที่ความเร็วและความคุ้มค่า องค์กรที่สามารถวางกลยุทธ์สร้างความได้เปรียบด้วยการมีต้นทุนที่ต่ำกว่าคู่แข่งขัน (Cost Leadership) จะสามารถเติบโตได้อย่างยั่งยืน
            </p>
            <p>
              การนำ <strong>HR.ai</strong> เข้ามาแทนที่การทำงานแบบกระดาษหรือระบบแยกส่วน ช่วยลดต้นทุนการบริหารจัดการ ลดความผิดพลาดของงานเงินเดือน (Payroll) และทำให้ข้อมูลสถิติด้านกำลังคนถูกรวบรวมอย่างเป็นระบบ ผู้บริหารสามารถเรียกดูดัชนีชี้วัดเพื่อการตัดสินใจเชิงกลยุทธ์ได้แบบเรียลไทม์
            </p>
          </div>

          <div class="space-y-4">
            <h3 class="font-bold text-base sm:text-lg text-emerald-700 dark:text-emerald-300 flex items-center gap-2">
              <span class="w-2.5 h-2.5 rounded-full bg-emerald-500" />
              <span>ความปลอดภัยและความยืดหยุ่นทางเทคนิค (Technical Architecture)</span>
            </h3>
            <p>
              ระบบทำงานด้วยเว็บเทคโนโลยี (Web-Based) บนเครือข่ายอินทราเน็ตหรืออินเทอร์เน็ต สามารถใช้ได้กับฐานข้อมูล <strong>RDBMS</strong> ความยืดหยุ่นสูง เช่น <strong>Oracle</strong> และรองรับการเข้าใช้งานพร้อมกันจำนวนมาก (Concurrency Control)
            </p>
            <p>
              ปกป้องข้อมูลการรับเข้า-ส่งออกด้วยมาตรฐาน <strong>SSL (Secure Sockets Layer)</strong> และรองรับการเข้าถึงด้วยการพิสูจน์ตัวตนเพียงครั้งเดียว <strong>Single Sign-on (SSO)</strong> ผ่านการเชื่อมโยงกับ Microsoft Active Directory (AD) พร้อมขยายขีดความสามารถรองรับการเติบโตขององค์กรในอนาคตได้อย่างไร้ขีดจำกัด
            </p>
          </div>
        </div>
      </section>

      <!-- ========================================================
           SECTION 2: NATIONAL AWARD SHOWCASE (OIIO 2019)
      ========================================================= -->
      <section class="space-y-8">
        <div class="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-current/10 pb-4">
          <div>
            <div class="text-xs font-mono font-bold text-amber-500 uppercase tracking-wider flex items-center gap-2">
              <Award class="w-4 h-4" />
              <span>NATIONAL RECOGNITION // รางวัลชนะเลิศระดับประเทศ</span>
            </div>
            <h2 class="font-display font-black text-2xl sm:text-4xl text-[#022C22] dark:text-white mt-1">
              รางวัลชนะเลิศ The Winner ในงาน OIIO Thailand Techland 2019
            </h2>
            <p class="text-xs sm:text-sm opacity-80 mt-1">
              รางวัลแห่งความภาคภูมิใจถึงความสำเร็จของการเปลี่ยนแปลงองค์กร และเป็นแบบอย่างให้กับสังคมไทยในยุคดิจิทัลไทยแลนด์ 4.0 อย่างแท้จริง
            </p>
          </div>

          <button
            type="button"
            class="px-4 py-2 rounded-xl border border-amber-500/30 hover:bg-amber-500/20 text-xs font-mono font-bold flex items-center gap-2 transition-all self-start sm:self-auto cursor-pointer"
            @click="openLightbox('/images/products/hr-ai-award-trophy.jpg', 'ถ้วยรางวัล The Winner OIIO Thailand Techland 2019', 'รางวัลแห่งความภาคภูมิใจของ บริษัท ไอเจนโก้ จำกัด')"
          >
            <ZoomIn class="w-4 h-4 text-amber-500" />
            <span>ดูภาพรางวัลขยาย</span>
          </button>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
          <!-- Award Trophy Image -->
          <div
            class="rounded-3xl overflow-hidden border border-amber-500/30 spatial-glass p-3 cursor-pointer group relative bg-black/20 shadow-xl"
            @click="openLightbox('/images/products/hr-ai-award-trophy.jpg', 'ถ้วยรางวัลเกียรติยศ OIIO Thailand Techland 2019', 'รางวัลชนะเลิศ The Winner ระบบบริหารทรัพยากรมนุษย์ ไอเจนโก้')"
          >
            <img
              src="/images/products/hr-ai-award-trophy.jpg"
              alt="OIIO Award Trophy"
              class="w-full h-72 object-cover rounded-2xl group-hover:scale-105 transition-transform duration-500"
            >
            <div class="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2 text-white text-xs font-mono font-bold rounded-2xl">
              <Maximize2 class="w-4 h-4 text-amber-400" />
              <span>คลิกเพื่อดูภาพขนาดเต็ม</span>
            </div>
          </div>

          <!-- Award Stage Photo -->
          <div
            class="rounded-3xl overflow-hidden border border-amber-500/30 spatial-glass p-3 cursor-pointer group relative bg-black/20 shadow-xl"
            @click="openLightbox('/images/products/hr-ai-award-ceremony.jpg', 'พิธีมอบรางวัล The Winner บนเวที OIIO 2019', 'คุณทวีวัตร์ ทรรศนะประทีป กรรมการผู้จัดการ รับมอบรางวัลเกียรติยศ')"
          >
            <img
              src="/images/products/hr-ai-award-ceremony.jpg"
              alt="OIIO Award Ceremony"
              class="w-full h-72 object-cover rounded-2xl group-hover:scale-105 transition-transform duration-500"
            >
            <div class="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2 text-white text-xs font-mono font-bold rounded-2xl">
              <Maximize2 class="w-4 h-4 text-amber-400" />
              <span>คลิกเพื่อดูภาพขนาดเต็ม</span>
            </div>
          </div>
        </div>
      </section>

      <!-- ========================================================
           SECTION 3: 4 CORE SYSTEM PILLARS (EIS, HRM, HRD, OD)
      ========================================================= -->
      <section class="space-y-12">
        <div class="text-center max-w-2xl mx-auto space-y-2">
          <div class="text-xs font-mono font-bold text-[#00C864] dark:text-[#00FF88] uppercase tracking-wider">
            CORE PLATFORM MODULES // 4 ระบบหลักและโมดูลย่อย
          </div>
          <h2 class="font-display font-black text-2xl sm:text-4xl text-[#022C22] dark:text-white">
            ครอบคลุมทุกมิติงาน HR ตั้งแต่บริหารคน พัฒนาบุคลากร จนถึงยุทธศาสตร์องค์กร
          </h2>
        </div>

        <!-- Pillar 1: EIS -->
        <div class="p-8 sm:p-10 rounded-[2.5rem] spatial-glass border border-sky-500/30 shadow-xl space-y-6">
          <div class="flex items-center gap-3">
            <div class="w-12 h-12 rounded-2xl bg-sky-600 text-white flex items-center justify-center shrink-0 shadow-md">
              <BarChart3 class="w-6 h-6" />
            </div>
            <div>
              <span class="text-xs font-mono font-bold text-sky-600 dark:text-sky-400 uppercase">PILLAR 01</span>
              <h3 class="text-xl sm:text-2xl font-bold text-[#022C22] dark:text-white">
                1. ระบบให้บริการข้อมูลสารสนเทศ (EIS: Executive Information System)
              </h3>
            </div>
          </div>

          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 pt-2">
            <div
              v-for="item in eisModules"
              :key="item.code"
              class="p-5 rounded-2xl bg-white/70 dark:bg-black/50 border border-current/10 space-y-2 hover:border-sky-500 transition-all hover:-translate-y-1"
            >
              <div class="flex items-center justify-between">
                <span class="text-[11px] font-mono font-bold text-sky-600 dark:text-sky-400 bg-sky-500/15 px-2.5 py-0.5 rounded-md">
                  {{ item.code }}
                </span>
              </div>
              <div class="text-sm font-bold text-[#022C22] dark:text-white">
                {{ item.title }}
              </div>
              <p class="text-xs opacity-80 leading-relaxed">
                {{ item.desc }}
              </p>
            </div>
          </div>
        </div>

        <!-- Pillar 2: HRM (9 Modules) -->
        <div class="p-8 sm:p-10 rounded-[2.5rem] spatial-glass border border-[#00C864]/30 shadow-xl space-y-6">
          <div class="flex items-center gap-3">
            <div class="w-12 h-12 rounded-2xl bg-[#00C864] text-[#022C22] flex items-center justify-center shrink-0 shadow-md">
              <Briefcase class="w-6 h-6" />
            </div>
            <div>
              <span class="text-xs font-mono font-bold text-[#00A854] dark:text-[#00FF88] uppercase">PILLAR 02</span>
              <h3 class="text-xl sm:text-2xl font-bold text-[#022C22] dark:text-white">
                2. ระบบบริหารงานบุคคล (HRM: Human Resource Management - 9 โมดูล)
              </h3>
            </div>
          </div>

          <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 pt-2">
            <div
              v-for="(mod, idx) in hrmModules"
              :key="idx"
              class="p-4 rounded-2xl bg-white/70 dark:bg-black/50 border border-current/10 flex items-start gap-3 hover:border-[#00C864] transition-all hover:-translate-y-1"
            >
              <div class="w-7 h-7 rounded-xl bg-[#00C864]/15 text-[#00A854] dark:text-[#00FF88] flex items-center justify-center shrink-0 text-xs font-mono font-bold mt-0.5">
                0{{ idx + 1 }}
              </div>
              <span class="text-xs sm:text-sm font-medium leading-relaxed">
                {{ mod }}
              </span>
            </div>
          </div>
        </div>

        <!-- Pillar 3 & 4 Grid: HRD & OD -->
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
          
          <!-- Pillar 3: HRD -->
          <div class="p-8 sm:p-10 rounded-[2.5rem] spatial-glass border border-purple-500/30 shadow-xl space-y-6 flex flex-col justify-between">
            <div class="space-y-6">
              <div class="flex items-center gap-3">
                <div class="w-12 h-12 rounded-2xl bg-purple-600 text-white flex items-center justify-center shrink-0 shadow-md">
                  <GraduationCap class="w-6 h-6" />
                </div>
                <div>
                  <span class="text-xs font-mono font-bold text-purple-600 dark:text-purple-400 uppercase">PILLAR 03</span>
                  <h3 class="text-xl font-bold text-[#022C22] dark:text-white">
                    3. ระบบพัฒนาบุคลากร (HRD)
                  </h3>
                </div>
              </div>

              <div class="space-y-4">
                <div
                  v-for="(hrd, idx) in hrdModules"
                  :key="idx"
                  class="p-4 rounded-2xl bg-white/70 dark:bg-black/50 border border-current/10 space-y-1 hover:border-purple-500 transition-all"
                >
                  <div class="text-sm font-bold text-purple-700 dark:text-purple-300">
                    {{ hrd.title }}
                  </div>
                  <p class="text-xs opacity-80 leading-relaxed">
                    {{ hrd.desc }}
                  </p>
                </div>
              </div>
            </div>
          </div>

          <!-- Pillar 4: OD -->
          <div class="p-8 sm:p-10 rounded-[2.5rem] spatial-glass border border-amber-500/30 shadow-xl space-y-6 flex flex-col justify-between">
            <div class="space-y-6">
              <div class="flex items-center gap-3">
                <div class="w-12 h-12 rounded-2xl bg-amber-500 text-black flex items-center justify-center shrink-0 shadow-md">
                  <Network class="w-6 h-6" />
                </div>
                <div>
                  <span class="text-xs font-mono font-bold text-amber-600 dark:text-amber-400 uppercase">PILLAR 04</span>
                  <h3 class="text-xl font-bold text-[#022C22] dark:text-white">
                    4. ระบบพัฒนาองค์กร (OD)
                  </h3>
                </div>
              </div>

              <div class="space-y-3">
                <div
                  v-for="(od, idx) in odModules"
                  :key="idx"
                  class="p-3.5 rounded-2xl bg-white/70 dark:bg-black/50 border border-current/10 space-y-1 hover:border-amber-500 transition-all"
                >
                  <div class="text-sm font-bold text-amber-700 dark:text-amber-300">
                    {{ od.title }}
                  </div>
                  <p class="text-xs opacity-80 leading-relaxed">
                    {{ od.desc }}
                  </p>
                </div>
              </div>
            </div>
          </div>

        </div>
      </section>

      <!-- ========================================================
           SECTION 4: AI VOICE COMMAND & FACE RECOGNITION (PWA)
      ========================================================= -->
      <section class="p-8 sm:p-12 rounded-[2.5rem] spatial-glass border border-[#00C864]/30 shadow-2xl space-y-8">
        <div class="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-current/10 pb-4">
          <div>
            <div class="text-xs font-mono font-bold text-[#00A854] dark:text-[#00FF88] uppercase tracking-wider flex items-center gap-2">
              <Sparkles class="w-4 h-4" />
              <span>AI INNOVATION // ปัญญาประดิษฐ์สั่งการด้วยเสียงและจดจำใบหน้า</span>
            </div>
            <h2 class="font-display font-black text-2xl sm:text-4xl text-[#022C22] dark:text-white mt-1">
              นวัตกรรมการสั่งการด้วยเสียงแบบโต้ตอบ (Two-way Voice AI)
            </h2>
            <p class="text-xs sm:text-sm opacity-80 mt-1 max-w-3xl">
              พัฒนาขึ้นเพื่อตอบโจทย์ยุค Thailand 4.0 ทำงานบน Smart Phone, Tablet ได้อย่างสมบูรณ์แบบในรูปแบบ Hybrid Web & Mobile App
            </p>
          </div>

          <button
            type="button"
            class="px-4 py-2 rounded-xl border border-[#00C864]/30 hover:bg-[#00C864]/20 text-xs font-mono font-bold flex items-center gap-2 transition-all self-start sm:self-auto cursor-pointer"
            @click="openLightbox('/images/products/hr-ai-brochure.png', 'HR.ai Official Brochure A4 Poster', 'โบรชัวร์ทางการระบบบริหารทรัพยากรมนุษย์อัจฉริยะ HR.ai บริษัท ไอเจนโก้ จำกัด')"
          >
            <ZoomIn class="w-4 h-4 text-[#00C864] dark:text-[#00FF88]" />
            <span>ซูมดูโบรชัวร์เต็ม A4</span>
          </button>
        </div>

        <div class="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <!-- Text Features (7 cols) -->
          <div class="lg:col-span-7 space-y-4 text-xs sm:text-sm leading-relaxed opacity-90">
            <div class="p-5 rounded-2xl bg-white/70 dark:bg-black/50 border border-[#00C864]/30 space-y-2">
              <div class="flex items-center gap-2 font-bold text-[#00A854] dark:text-[#00FF88]">
                <Mic class="w-4 h-4" />
                <span>ตัวอย่างการสั่งลาหยุดด้วยเสียง (Voice Command):</span>
              </div>
              <p>
                ผู้ใช้งานสามารถพูด Keyword ว่า <em>"Absent หรือ ลาหยุด"</em> เพียง 1 ครั้ง ระบบจะแนะนำเงื่อนไขการลาที่ดีที่สุด เช่น ลาป่วย ลาพักผ่อน พร้อมตรวจสอบสิทธิ์คงเหลือ และตอบโต้ด้วยเสียงกลับทันที เช่น หากระบุการลาคลอด ระบบจะแจ้งว่า <em>"ท่านไม่สามารถใช้สิทธิ์นี้ได้ เนื่องจากอนุญาตเฉพาะพนักงานหญิงเท่านั้น"</em>
              </p>
            </div>

            <div class="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              <div class="p-4 rounded-2xl bg-white/60 dark:bg-black/40 border border-current/10 space-y-1.5">
                <div class="font-bold text-xs flex items-center gap-2 text-sky-600 dark:text-sky-400">
                  <Smile class="w-4 h-4" />
                  <span>Face Recognition</span>
                </div>
                <p class="text-xs opacity-75">
                  พิสูจน์ตัวตนด้วยใบหน้า บันทึกเวลาเข้า-ออกงานผ่านสมาร์ทโฟนอย่างแม่นยำ ป้องกันการลงเวลาแทนกัน
                </p>
              </div>

              <div class="p-4 rounded-2xl bg-white/60 dark:bg-black/40 border border-current/10 space-y-1.5">
                <div class="font-bold text-xs flex items-center gap-2 text-purple-600 dark:text-purple-400">
                  <Sparkles class="w-4 h-4" />
                  <span>Chatbot & Machine Learning</span>
                </div>
                <p class="text-xs opacity-75">
                  ระบบช่วยตอบคำถามอัตโนมัติเกี่ยวกับสวัสดิการ กฎระเบียบบริษัท และการคำนวณวันลาคงเหลือตลอด 24 ชม.
                </p>
              </div>
            </div>
          </div>

          <!-- Brochure Preview (5 cols) -->
          <div class="lg:col-span-5">
            <div
              class="rounded-3xl overflow-hidden border border-[#00C864]/30 spatial-glass p-3 cursor-pointer group relative bg-black/20 shadow-xl"
              @click="openLightbox('/images/products/hr-ai-brochure.png', 'HR.ai Official Brochure Poster', 'โบรชัวร์ทางการระบบบริหารทรัพยากรมนุษย์อัจฉริยะ HR.ai บริษัท ไอเจนโก้ จำกัด')"
            >
              <img
                src="/images/products/hr-ai-brochure.png"
                alt="HR.ai Brochure Poster"
                class="w-full h-80 object-cover object-top rounded-2xl group-hover:scale-105 transition-transform duration-500"
              >
              <div class="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2 text-white text-xs font-mono font-bold rounded-2xl">
                <Maximize2 class="w-4 h-4 text-[#00FF88]" />
                <span>คลิกดูโบรชัวร์ขนาดใหญ่ A4</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- ========================================================
           SECTION 5: SITE REFERENCES & TRUSTED CLIENTS
      ========================================================= -->
      <section class="space-y-6">
        <div class="text-center max-w-2xl mx-auto space-y-2">
          <div class="text-xs font-mono font-bold uppercase tracking-wider text-[#00A854] dark:text-[#00FF88] flex items-center justify-center gap-2">
            <Building2 class="w-4 h-4" />
            <span>TRUSTED BY LEADING ENTERPRISES // ตัวอย่างองค์กรที่ไว้วางใจใช้งาน (Site Reference)</span>
          </div>
          <h2 class="font-display font-black text-2xl sm:text-3xl text-[#022C22] dark:text-white">
            องค์กรภาครัฐ รัฐวิสาหกิจ และบริษัทมหาชนชั้นนำ
          </h2>
        </div>

        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          <div
            v-for="(refItem, idx) in siteReferences"
            :key="idx"
            class="p-5 rounded-2xl spatial-glass border border-current/10 space-y-2 hover:border-[#00C864] transition-all hover:-translate-y-1"
          >
            <div class="flex items-center justify-between">
              <span class="text-xs font-mono font-bold text-[#00A854] dark:text-[#00FF88] bg-[#00C864]/15 px-2.5 py-0.5 rounded-md">
                {{ refItem.code }}
              </span>
              <span class="text-[11px] font-mono opacity-50">Enterprise Verified</span>
            </div>
            <div class="text-sm font-bold text-[#022C22] dark:text-white">
              {{ refItem.name }}
            </div>
            <p class="text-xs opacity-75 leading-relaxed">
              {{ refItem.desc }}
            </p>
          </div>
        </div>
      </section>

      <!-- ========================================================
           SECTION 6: OFFICIAL BROCHURES & SYSTEM DOWNLOADS
      ========================================================= -->
      <section class="space-y-6">
        <div class="space-y-2">
          <div class="text-xs font-mono font-bold text-[#00A854] dark:text-[#00FF88] uppercase tracking-wider flex items-center gap-2">
            <Download class="w-4 h-4" />
            <span>OFFICIAL DOWNLOADS // เอกสารและโบรชัวร์ระบบ</span>
          </div>
          <h2 class="font-display font-black text-2xl sm:text-3xl text-[#022C22] dark:text-white">
            ดาวน์โหลดเอกสารคุณสมบัติและโบรชัวร์ระบบ HR.ai (i-HURIS)
          </h2>
          <p class="text-xs sm:text-sm opacity-80">
            เอกสารทางการประกอบการพิจารณาจัดซื้อจัดจ้างสำหรับหน่วยงานภาครัฐและเอกชน
          </p>
        </div>

        <div class="grid grid-cols-1 sm:grid-cols-2 gap-5">
          <!-- Brochure 1 -->
          <a
            href="https://igenco.co.th/index.php/th/product/enterprise-software/i-huris#"
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
                  ดาวน์โหลดคุณสมบัติระบบ HR.ai (i-HURIS)
                </div>
                <div class="text-xs opacity-65 font-mono">
                  Human Resource Management System Document PDF
                </div>
              </div>
            </div>
            <Download class="w-5 h-5 text-[#00C864] dark:text-[#00FF88] shrink-0 group-hover:translate-y-1 transition-transform" />
          </a>

          <!-- Brochure 2 -->
          <div
            class="p-6 rounded-3xl spatial-glass border border-sky-500/30 hover:border-sky-400 hover:scale-[1.02] transition-all flex items-center justify-between group shadow-sm cursor-pointer"
            @click="openLightbox('/images/products/hr-ai-brochure.png', 'HR.ai Official Brochure A4 Poster', 'โบรชัวร์ทางการระบบบริหารทรัพยากรมนุษย์อัจฉริยะ HR.ai บริษัท ไอเจนโก้ จำกัด')"
          >
            <div class="flex items-center gap-4">
              <div class="w-12 h-12 rounded-2xl bg-sky-500/20 text-sky-600 dark:text-sky-400 flex items-center justify-center shrink-0">
                <FileText class="w-6 h-6" />
              </div>
              <div>
                <div class="text-base font-bold group-hover:text-sky-500 transition-colors">
                  โบรชัวร์สรุปจุดเด่นระบบ HR.ai Poster
                </div>
                <div class="text-xs opacity-65 font-mono">
                  OIIO Winner & ISO/IEC 29110 Certified Poster
                </div>
              </div>
            </div>
            <Maximize2 class="w-5 h-5 text-sky-500 shrink-0 group-hover:scale-110 transition-transform" />
          </div>
        </div>
      </section>

      <!-- ========================================================
           SECTION 7: CONTACT SPECIALIST CARD (คุณทวีวัตร์ MD)
      ========================================================= -->
      <section
        id="contact-specialist"
        class="p-8 sm:p-10 rounded-[2.5rem] spatial-glass border border-[#00C864]/40 shadow-2xl space-y-6 bg-gradient-to-br from-white/90 via-emerald-50/30 to-sky-50/20 dark:from-black/70 dark:via-emerald-950/20 dark:to-black/40 scroll-mt-28"
      >
        <div class="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 pb-6 border-b border-current/10">
          <div class="flex items-center gap-5">
            <div class="w-18 h-18 sm:w-20 sm:h-20 rounded-2xl bg-white dark:bg-black/50 border border-[#00C864]/30 p-2 shrink-0 flex items-center justify-center shadow-lg">
              <img
                src="/images/products/hr-ai-logo.png"
                alt="HR.ai Logo"
                class="w-full h-full object-contain"
              >
            </div>
            <div class="space-y-1">
              <div class="text-xs font-mono font-bold text-[#00A854] dark:text-[#00FF88] uppercase tracking-wider flex items-center gap-1.5">
                <Phone class="w-3.5 h-3.5" />
                <span>INTERESTED & CONTACT // สอบถามเพิ่มเติม / สาธิตโปรแกรม</span>
              </div>
              <h3 class="text-xl sm:text-2xl font-display font-black text-[#022C22] dark:text-white">
                คุณทวีวัตร์ ทรรศนะประทีป
              </h3>
              <p class="text-xs sm:text-sm opacity-80">
                กรรมการผู้จัดการ (Managing Director) บริษัท ไอเจนโก้ จำกัด
              </p>
            </div>
          </div>
        </div>

        <div class="flex flex-wrap items-center gap-4">
          <a
            href="tel:0817529549"
            class="px-5 py-3 rounded-2xl bg-[#00C864] hover:bg-[#00A854] text-[#022C22] dark:bg-[#00FF88] dark:hover:bg-[#00D270] dark:text-[#020806] text-xs sm:text-sm font-bold font-mono transition-all flex items-center gap-2 shadow-md hover:scale-105 active:scale-95"
          >
            <Phone class="w-4 h-4" />
            <span>โทร. 081-752-9549</span>
          </a>

          <a
            href="tel:025325151"
            class="px-5 py-3 rounded-2xl spatial-glass border border-current/15 hover:bg-current/10 text-xs sm:text-sm font-bold font-mono transition-all flex items-center gap-2"
          >
            <Phone class="w-4 h-4 text-[#00C864]" />
            <span>โทร. 02-532-5151</span>
          </a>

          <a
            href="tel:025325160"
            class="px-5 py-3 rounded-2xl spatial-glass border border-current/15 hover:bg-current/10 text-xs sm:text-sm font-bold font-mono transition-all flex items-center gap-2"
          >
            <Phone class="w-4 h-4 text-[#00C864]" />
            <span>โทร. 02-532-5160-2</span>
          </a>

          <a
            href="mailto:thaweewat@igenco.co.th"
            class="px-5 py-3 rounded-2xl border border-[#00C864]/40 hover:bg-[#00C864]/20 text-xs sm:text-sm font-bold font-mono transition-all flex items-center gap-2 shadow-sm hover:scale-105 active:scale-95"
          >
            <Mail class="w-4 h-4 text-[#00C864]" />
            <span>thaweewat@igenco.co.th</span>
          </a>

          <div class="px-5 py-3 rounded-2xl bg-[#06C755]/15 border border-[#06C755]/30 text-xs sm:text-sm font-bold font-mono text-[#06C755] flex items-center gap-2">
            <span>LINE: thaweewat_wee</span>
          </div>

          <a
            href="https://www.hraicloud.com"
            target="_blank"
            rel="noopener noreferrer"
            class="px-5 py-3 rounded-2xl spatial-glass border border-[#00C864]/30 hover:bg-[#00C864]/20 text-xs sm:text-sm font-bold font-mono transition-all flex items-center gap-2"
          >
            <ExternalLink class="w-4 h-4 text-[#00C864] dark:text-[#00FF88]" />
            <span>www.hraicloud.com</span>
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
