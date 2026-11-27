<script setup lang="ts">
import { ref } from 'vue'
import AppHeader from '~/components/AppHeader.vue'
import ContactFooter from '~/components/ContactFooter.vue'
import {
  ArrowLeft,
  ArrowUpRight,
  Sparkles,
  Zap,
  Sun,
  BatteryCharging,
  Leaf,
  CheckCircle2,
  Maximize2,
  ZoomIn,
  Download,
  FileText,
  Phone,
  Mail,
  ExternalLink,
  ShieldCheck,
  Building2,
  Layers,
  ChevronRight,
  X,
  Clock,
  BarChart3,
  Activity,
  Tag
} from 'lucide-vue-next'
import { useTheme } from '~/composables/useTheme'

const { showToast } = useTheme()

useHead({
  title: 'Bio-Grid Solar Controller (โซลูชันพลังงานสะอาด) - บริษัท ไอเจนโก้ จำกัด (IGENCO)',
  meta: [
    {
      name: 'description',
      content: 'Bio-Grid Solar Controller อุปกรณ์ควบคุมพลังงานหมุนเวียนอัจฉริยะ ลดการสูญเสียพลังงานในองค์กรได้สูงสุด 35% พร้อมระบบคำนวณคาร์บอนเครดิต Real-time โดย IGENCO'
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

// Quick stats ribbon (4 เสาหลักพลังงาน)
const stats = [
  { label: 'ประสิทธิภาพควบคุม', value: 'MPPT 99.4%', sub: 'เทคโนโลยีติดตามจุดประจุพลังงานสูงสุดสูญเสียน้อยที่สุด' },
  { label: 'ลดต้นทุนพลังงาน', value: 'ลดสูงสุด 35%', sub: 'ลดค่าไฟฟ้าช่วงพีค (Peak Shaving) และปรับโหลดสมดุล' },
  { label: 'การลดคาร์บอน ESG', value: 'Real-time GHG', sub: 'คำนวณคาร์บอนเครดิตอัตโนมัติตามมาตรฐานสากล' },
  { label: 'การรับประกันระบบ', value: '5 ปีเต็ม', sub: 'พร้อมบริการตรวจเช็กและบำรุงรักษารายไตรมาส' }
]

// 1. Hardware & System Controls
const hardwareControls = [
  'อัลกอริทึม Advanced MPPT ประสิทธิภาพสูง 99.4% รองรับแรงดันแผงโซลาร์เซลล์กว้าง Wide PV Input',
  'ระบบควบคุมแบตเตอรี่กักเก็บพลังงาน (BESS Integration) รองรับแบตเตอรี่ลิเธียมฟอสเฟต (LiFePO4) ทุกแบรนด์ชั้นนำ',
  'สถาปัตยกรรมระบายความร้อนอัจฉริยะ ทนทานต่ออุณหภูมิสูงและติดตั้งภายนอกอาคารด้วยมาตรฐานกันน้ำกันฝุ่น IP65',
  'ระบบตัดตอนและป้องกันไฟกระชากในตัว (Surge Protection Type II ทั้งฝั่ง AC และ DC) ตามมาตรฐาน IEC 61643',
  'พอร์ตเชื่อมต่ออุตสาหกรรม Modbus RTU/TCP, CAN Bus, Dry Contacts และ Dual Ethernet สำหรับ SCADA',
  'ระบบบายพาสฉุกเฉิน (Automated Grid Bypass) สลับไฟอัตโนมัติภายใน < 10ms ป้องกันไฟตกในกระบวนการผลิต'
]

// 2. Software & ESG Analytics
const softwareAnalytics = [
  'ระบบ AI พยากรณ์สภาพอากาศและแสงแดดล่วงหน้า 24-72 ชม. เพื่อวางแผนการประจุและจ่ายไฟอย่างคุ้มค่าสูงสุด',
  'แดชบอร์ดแสดงผลพลังงานแบบเรียลไทม์ (Real-time Solar & Load Telemetry) ตรวจสอบผ่านมือถือและเว็บเบราว์เซอร์',
  'ระบบคำนวณคาร์บอนฟุตพริ้นท์ (Carbon Footprint Calculation) ตามมาตรฐาน GHG Protocol และ ISO 14064',
  'ระบบสร้างรายงานอัตโนมัติรองรับการยื่นขอคาร์บอนเครดิตและมาตรฐานการจัดการพลังงาน ISO 50001',
  'แจ้งเตือนความผิดปกติของแผงโซลาร์และสตริง (String Level Fault Detection) ผ่าน LINE Notify และ SMS ทันที',
  'เชื่อมต่อคลาวด์แพลตฟอร์มด้วยโปรโตคอลความปลอดภัยสูง MQTT over TLS 1.3'
]

// 3. 4 Core Control Modules
const coreModules = [
  {
    code: 'MOD-01',
    title: 'MPPT Solar Generation Engine',
    desc: 'ควบคุมและดึงพลังงานจากแผงโซลาร์เซลล์อย่างเต็มประสิทธิภาพ แม้ในสภาวะแสงแดดน้อยหรือมีเงาบังบางส่วน'
  },
  {
    code: 'MOD-02',
    title: 'Battery Energy Storage (BESS) Manager',
    desc: 'บริหารจัดการรอบการชาร์จและคายประจุอย่างถนอมอายุแบตเตอรี่ ป้องกันการชาร์จเกินและ Over-Discharge'
  },
  {
    code: 'MOD-03',
    title: 'Peak-Shaving & Load Balancer',
    desc: 'จ่ายไฟจากแบตเตอรี่เสริมในช่วงเวลาที่ค่าไฟฟ้าสูง (On-Peak) ช่วยลดอัตราค่าความต้องการพลังไฟฟ้า (Demand Charge)'
  },
  {
    code: 'MOD-04',
    title: 'Real-time ESG & Carbon Accounting',
    desc: 'แปลงหน่วยพลังงานสะอาดที่ผลิตได้เป็นปริมาณการลดก๊าซเรือนกระจก (tCO2e) พร้อมส่งออกรายงานรับรอง'
  }
]

// 4. Target Industries (กลุ่มอุตสาหกรรมที่เหมาะสม)
const targetIndustries = [
  {
    title: 'โรงงานอุตสาหกรรมและการผลิต (Smart Factory)',
    desc: 'ลดค่าไฟฟ้าก้อนใหญ่ในสายการผลิต พร้อมเตรียมความพร้อมสู่เป้าหมาย RE100 และ Net Zero'
  },
  {
    title: 'คลังสินค้าและศูนย์กระจายสินค้า (Logistics Hub)',
    desc: 'ใช้ประโยชน์จากพื้นที่หลังคาขนาดใหญ่ ผลิตพลังงานสะอาดสำหรับระบบห้องเย็นและรถโฟล์คลิฟต์ไฟฟ้า'
  },
  {
    title: 'อาคารสำนักงานและศูนย์การค้า (Commercial Complex)',
    desc: 'บริหารการใช้พลังงานช่วง On-Peak อย่างมีประสิทธิภาพ ยกระดับภาพลักษณ์อาคารเขียวตามมาตรฐาน LEED'
  },
  {
    title: 'โรงพยาบาลและสถานพยาบาล (Healthcare Facilities)',
    desc: 'ระบบไฟฟ้าสำรองพลังงานสะอาด ทำงานร่วมกับเครื่องกำเนิดไฟฟ้าเพื่อความต่อเนื่องของอุปกรณ์ช่วยชีวิต'
  },
  {
    title: 'มหาวิทยาลัยและสถาบันการศึกษา (Green Campus)',
    desc: 'ลดภาระค่าสาธารณูปโภค พร้อมเป็นศูนย์การเรียนรู้ด้านพลังงานหมุนเวียนและสิ่งแวดล้อม'
  },
  {
    title: 'อุตสาหกรรมเกษตรและฟาร์มปิด (Agri-Business)',
    desc: 'ควบคุมระบบปรับอากาศโรงเรือน ปั๊มน้ำพลังงานแสงอาทิตย์ และห้องเย็นเก็บผลผลิต'
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
  <div class="min-h-screen relative selection:bg-[#F59E0B] selection:text-black flex flex-col justify-between  text-slate-800 dark:text-slate-100">
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
          <span class="text-amber-500 font-bold">Bio-Grid Solar Controller</span>
        </div>
      </div>

      <!-- ========================================================
           HERO SECTION: PRODUCT OVERVIEW & SOLAR SHOWCASE
      ========================================================= -->
      <section class="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
        <!-- Left Column: Title, Slogan, Narrative (7 Cols) -->
        <div class="lg:col-span-7 space-y-6">
          <div class="flex flex-wrap items-center gap-2.5">
            <span class="px-3.5 py-1 rounded-full text-xs font-mono font-bold bg-amber-500/15 text-amber-600 dark:bg-amber-400/20 dark:text-amber-300 border border-amber-500/30">
              โซลูชันพลังงานสะอาด // 03
            </span>
            <span class="px-3.5 py-1 rounded-full text-xs font-mono font-bold bg-[#00C864]/15 text-[#00A854] dark:bg-[#00FF88]/15 dark:text-[#00FF88]">
              ENTERPRISE GRADE
            </span>
            <span class="px-3.5 py-1 rounded-full text-xs font-mono opacity-70 border border-current/10">
              SMART ENERGY & GREEN TECH
            </span>
          </div>

          <div class="space-y-3">
            <h1 class="font-display font-black text-3xl sm:text-5xl lg:text-6xl tracking-tight leading-[1.15] text-[#022C22] dark:text-white">
              Bio-Grid <span class="text-amber-500 dark:text-amber-400">Solar Controller</span>
            </h1>
            <div class="text-lg sm:text-2xl font-bold text-amber-600 dark:text-amber-400 font-display">
              อุปกรณ์ควบคุมพลังงานหมุนเวียนอัจฉริยะ ลดการสูญเสียพลังงานในองค์กรได้สูงสุด 35%
            </div>
            <div class="inline-block px-4 py-1.5 rounded-xl bg-amber-500/10 dark:bg-amber-400/10 text-xs sm:text-sm font-mono font-bold text-amber-700 dark:text-amber-300 border border-amber-500/20">
              “ บริหารจัดการพลังงานแสงอาทิตย์อัจฉริยะ // Clean Energy & Smart ESG Management ”
            </div>
          </div>

          <p class="text-sm sm:text-base opacity-85 leading-relaxed text-slate-700 dark:text-slate-300">
            ระบบบริหารจัดการพลังงานแสงอาทิตย์และระบบกักเก็บพลังงานแบตเตอรี่ (BESS) อัจฉริยะ ออกแบบมาเพื่อองค์กรและโรงงานอุตสาหกรรมที่ต้องการควบคุมต้นทุนค่าไฟฟ้าอย่างยั่งยืน ควบคุมการจ่ายกระแสไฟด้วยอัลกอริทึมพยากรณ์สภาพอากาศ ช่วยลดค่าความต้องการพลังไฟฟ้า (Demand Charge) ในช่วง On-Peak และคำนวณคาร์บอนเครดิตอัตโนมัติ
          </p>

          <p class="text-sm sm:text-base opacity-85 leading-relaxed text-slate-700 dark:text-slate-300">
            <strong>Bio-Grid Solar Controller</strong> ทำงานเชื่อมต่อกับระบบ <strong>Smart Grid, Modbus TCP, MQTT over TLS</strong> และรองรับมาตรฐาน <strong>ISO 50001</strong> ช่วยให้องค์กรสามารถตรวจสอบสถานะการผลิตพลังงาน คุณภาพไฟฟ้า และปริมาณการลดก๊าซเรือนกระจกได้อย่างโปร่งใส แม่นยำ ตลอด 24 ชั่วโมง
          </p>

          <!-- Hero Action Buttons -->
          <div class="flex flex-wrap items-center gap-3.5 pt-2">
            <button
              type="button"
              class="px-6 py-3.5 rounded-2xl bg-amber-500 hover:bg-amber-600 text-black font-bold text-xs sm:text-sm font-mono transition-all flex items-center gap-2 shadow-lg hover:scale-105 active:scale-95 cursor-pointer"
              @click="scrollToContact"
            >
              <span>ติดต่อสอบถาม / ปรึกษาผู้เชี่ยวชาญพลังงาน</span>
              <ArrowUpRight class="w-4 h-4" />
            </button>

            <button
              type="button"
              class="px-5 py-3.5 rounded-2xl spatial-glass border border-amber-500/30 hover:border-amber-500 font-bold text-xs sm:text-sm font-mono transition-all flex items-center gap-2 shadow-sm hover:scale-105 active:scale-95 cursor-pointer"
              @click="showToast('กำลังเตรียมข้อมูลการประเมินจุดคุ้มทุน (ROI Assessment)')"
            >
              <Zap class="w-4 h-4 text-amber-500" />
              <span>ขอรับการประเมินจุดคุ้มทุน (ROI)</span>
            </button>
          </div>
        </div>

        <!-- Right Column: Solar Showcase Frame (5 Cols) -->
        <div class="lg:col-span-5 relative">
          <div class="relative p-6 sm:p-8 rounded-[2.5rem] spatial-glass border border-amber-500/30 shadow-2xl bg-gradient-to-br from-amber-900/20 via-white/50 dark:via-black/40 to-[#00C864]/10 overflow-hidden flex flex-col items-center text-center space-y-6">
            
            <!-- Ambient Glow -->
            <div class="absolute -top-16 -right-16 w-48 h-48 bg-amber-500/20 rounded-full blur-3xl pointer-events-none" />
            <div class="absolute -bottom-16 -left-16 w-48 h-48 bg-[#00FF88]/20 rounded-full blur-3xl pointer-events-none" />

            <!-- Main Solar Frame -->
            <div
              class="w-full aspect-[4/3] rounded-2xl overflow-hidden relative cursor-pointer group border border-amber-500/30 shadow-md bg-black/40"
              @click="openLightbox('/images/products/bio-grid-solar-banner.svg', 'Bio-Grid Solar Controller System', 'ระบบควบคุมพลังงานแสงอาทิตย์และกักเก็บพลังงานแบตเตอรี่อัจฉริยะ')"
            >
              <img
                src="/images/products/bio-grid-solar-banner.svg"
                alt="Bio-Grid Solar Controller"
                class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
              >
              <div class="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent flex items-end justify-between p-4">
                <span class="px-2.5 py-1 rounded-lg bg-black/70 text-white text-[11px] font-mono flex items-center gap-1 backdrop-blur-sm border border-white/20">
                  <ZoomIn class="w-3.5 h-3.5 text-amber-400" />
                  <span>คลิกเพื่อดูภาพขยาย</span>
                </span>
                <span class="text-[11px] font-mono text-amber-400 font-bold">
                  MPPT 99.4% // IP65
                </span>
              </div>
            </div>

            <!-- Specialist & Department Badge -->
            <div class="w-full flex items-center gap-4 p-3.5 rounded-2xl bg-white/70 dark:bg-black/50 border border-amber-500/25 text-left">
              <div class="w-14 h-14 rounded-xl overflow-hidden bg-amber-500/20 text-amber-500 flex items-center justify-center shrink-0 border border-amber-500/30">
                <Sun class="w-7 h-7" />
              </div>
              <div class="space-y-0.5">
                <div class="text-[11px] font-mono text-amber-600 dark:text-amber-400 font-bold">
                  CLEAN ENERGY & ESG TEAM
                </div>
                <div class="text-xs font-bold text-[#022C22] dark:text-white">
                  ทีมวิศวกรพลังงานหมุนเวียนและความยั่งยืน
                </div>
                <div class="text-[11px] opacity-70">
                  พร้อมให้คำปรึกษา ออกแบบระบบ และวิเคราะห์ความคุ้มค่า
                </div>
              </div>
            </div>

            <div class="text-xs font-mono text-amber-600 dark:text-amber-400 font-semibold">
              ISO 50001 READY // SMART GRID COMPATIBLE
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
          class="p-5 sm:p-6 rounded-2xl spatial-glass border border-amber-500/20 flex flex-col justify-between space-y-2 hover:border-amber-500 transition-all hover:-translate-y-1"
        >
          <div class="text-[11px] font-mono uppercase tracking-wider opacity-60">
            {{ st.label }}
          </div>
          <div class="text-xl sm:text-2xl font-black font-display text-amber-600 dark:text-amber-400">
            {{ st.value }}
          </div>
          <div class="text-xs opacity-75">
            {{ st.sub }}
          </div>
        </div>
      </section>

      <!-- ========================================================
           SECTION 1: SYSTEM FLEXIBILITY & ENERGY OPTIMIZATION
      ========================================================= -->
      <section class="p-8 sm:p-10 rounded-[2.5rem] spatial-glass border border-amber-500/25 shadow-xl space-y-6">
        <div class="flex items-center gap-2 text-xs font-mono font-bold text-amber-500 uppercase tracking-wider">
          <Layers class="w-4 h-4" />
          <span>ENERGY STRATEGY & GRID FLEXIBILITY // ยุทธศาสตร์พลังงานและความยืดหยุ่นของโครงข่าย</span>
        </div>

        <h2 class="font-display font-black text-2xl sm:text-3xl text-[#022C22] dark:text-white">
          สถาปัตยกรรมการจัดการพลังงานอัจฉริยะ ตอบโจทย์ความคุ้มค่าและสิ่งแวดล้อม
        </h2>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-8 text-sm sm:text-base leading-relaxed opacity-90">
          <div class="space-y-4">
            <h3 class="font-bold text-base sm:text-lg text-amber-600 dark:text-amber-400 flex items-center gap-2">
              <span class="w-2.5 h-2.5 rounded-full bg-amber-500" />
              <span>การตัดค่าไฟฟ้าช่วงพีคและการบริหารโหลด (Peak Shaving & Load Management)</span>
            </h3>
            <p>
              ในภาคธุรกิจและอุตสาหกรรม ค่าไฟฟ้าช่วง On-Peak มีราคาสูงกว่าปกติอย่างมีนัยสำคัญ ระบบ <strong>Bio-Grid</strong> จะทำการตรวจจับแนวโน้มการใช้ไฟฟ้าของโรงงานแบบเรียลไทม์ และปล่อยพลังงานที่กักเก็บไว้ในแบตเตอรี่ออกมาเสริมทันทีเมื่อความต้องการไฟฟ้าพุ่งสูง (Peak Shaving)
            </p>
            <p>
              ช่วยลดอัตราค่าความต้องการพลังไฟฟ้า (Demand Charge) ได้อย่างเห็นผล ทำให้องค์กรสามารถประหยัดค่าใช้จ่ายด้านพลังงานได้สูงสุดถึง 35% ต่อเดือน และคืนทุนได้อย่างรวดเร็วภายใน 3-5 ปี
            </p>
          </div>

          <div class="space-y-4">
            <h3 class="font-bold text-base sm:text-lg text-[#00A854] dark:text-[#00FF88] flex items-center gap-2">
              <span class="w-2.5 h-2.5 rounded-full bg-[#00C864]" />
              <span>การบริหารคาร์บอนเครดิตและมาตรฐาน ESG (Carbon Credit & ESG Reporting)</span>
            </h3>
            <p>
              ระบบมาพร้อมโมดูลคำนวณคาร์บอนฟุตพริ้นท์อัตโนมัติ (Automated Carbon Accounting) แปลงหน่วยกิโลวัตต์-ชั่วโมง (kWh) ของพลังงานสะอาดที่ผลิตได้ ให้เป็นปริมาณการลดการปล่อยก๊าซเรือนกระจก (Tonnes CO2 Equivalent) ตามมาตรฐาน GHG Protocol สากล
            </p>
            <p>
              ข้อมูลทั้งหมดสามารถส่งออกเป็นรายงานความยั่งยืน (ESG Report) สำหรับยื่นต่อหน่วยงานกำกับดูแล หรือประกอบรายงานประจำปีของบริษัทจดทะเบียนในตลาดหลักทรัพย์ได้อย่างน่าเชื่อถือ
            </p>
          </div>
        </div>
      </section>

      <!-- ========================================================
           SECTION 2: WORKFLOW & ENERGY FLOW INFOGRAPHIC
      ========================================================= -->
      <section class="space-y-8">
        <div class="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-current/10 pb-4">
          <div>
            <div class="text-xs font-mono font-bold text-amber-500 uppercase tracking-wider flex items-center gap-2">
              <Activity class="w-4 h-4" />
              <span>POWER FLOW & CONTROL WORKFLOW // แผนผังขั้นตอนการไหลของพลังงาน</span>
            </div>
            <h2 class="font-display font-black text-2xl sm:text-4xl text-[#022C22] dark:text-white mt-1">
              ขั้นตอนการทำงานของระบบควบคุมพลังงาน Bio-Grid
            </h2>
          </div>
          <button
            type="button"
            class="px-4 py-2 rounded-xl border border-amber-500/30 hover:bg-amber-500/20 text-xs font-mono font-bold flex items-center gap-2 transition-all self-start sm:self-auto cursor-pointer"
            @click="openLightbox('/images/products/bio-grid-solar-banner.svg', 'ผังการไหลของพลังงาน Bio-Grid Power Flow', 'การผสานพลังงานแสงอาทิตย์ แบตเตอรี่สำรอง และโครงข่ายการไฟฟ้า')"
          >
            <ZoomIn class="w-4 h-4 text-amber-500" />
            <span>ซูมดูแผนผังเต็ม</span>
          </button>
        </div>

        <!-- 2 Energy Flow Comparison Cards -->
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
          <!-- Flow 1: Direct Solar Consumption Mode -->
          <div class="p-6 sm:p-8 rounded-3xl bg-white/70 dark:bg-black/40 border border-amber-500/30 shadow-lg space-y-4">
            <div class="flex items-center justify-between">
              <span class="px-3.5 py-1 rounded-full text-xs font-mono font-bold bg-amber-500/20 text-amber-600 dark:text-amber-300 border border-amber-500/30">
                รูปแบบที่ 1 : Solar Direct Consumption (3 ขั้นตอน)
              </span>
              <span class="text-xs font-mono opacity-60">DAYTIME LOAD OPTIMIZATION</span>
            </div>

            <ol class="space-y-3 text-xs sm:text-sm opacity-90 list-decimal list-inside leading-relaxed">
              <li>
                <strong>ผลิตพลังงานจากแสงอาทิตย์ (Generation):</strong> แผงโซลาร์เซลล์แปลงแสงแดดเป็นไฟฟ้ากระแสตรง (DC) ด้วยเทคโนโลยี MPPT 99.4%
              </li>
              <li>
                <strong>แปลงกระแสและจ่ายสู่สายการผลิต (Conversion):</strong> แปลงเป็นไฟฟ้ากระแสสลับ (AC) จ่ายตรงเข้าเครื่องจักรในโรงงานทันที
              </li>
              <li>
                <strong>ลดการซื้อไฟจากการไฟฟ้า (Cost Offset):</strong> ลดหน่วยการใช้ไฟจากกริดหลักในช่วงกลางวันอย่างเต็มประสิทธิภาพ
              </li>
            </ol>
          </div>

          <!-- Flow 2: Hybrid Solar + BESS & ESG Mode -->
          <div class="p-6 sm:p-8 rounded-3xl bg-white/70 dark:bg-black/40 border border-[#00C864]/30 shadow-lg space-y-4">
            <div class="flex items-center justify-between">
              <span class="px-3.5 py-1 rounded-full text-xs font-mono font-bold bg-[#00C864]/20 text-[#00A854] dark:text-[#00FF88] border border-[#00C864]/30">
                รูปแบบที่ 2 : Hybrid Solar + BESS & ESG (6 ขั้นตอน)
              </span>
              <span class="text-xs font-mono opacity-60">PEAK-SHAVING & ESG AUDIT</span>
            </div>

            <ol class="space-y-3 text-xs sm:text-sm opacity-90 list-decimal list-inside leading-relaxed">
              <li>
                <strong>ผลิตพลังงานแสงอาทิตย์:</strong> รองรับการผลิตกำลังไฟสูงในช่วงเวลากลางวัน
              </li>
              <li>
                <strong>กักเก็บพลังงานส่วนเกิน (Battery Storage):</strong> นำไฟฟ้าส่วนเกินประจุเข้าสู่ระบบแบตเตอรี่ BESS
              </li>
              <li>
                <strong>จ่ายไฟช่วง On-Peak (Peak Shaving):</strong> ปล่อยพลังงานจากแบตเตอรี่ทดแทนการซื้อไฟราคาแพง
              </li>
              <li>
                <strong>ตรวจวัดคุณภาพไฟฟ้า (Power Quality):</strong> รักษาเสถียรภาพแรงดันและความถี่ ป้องกันอุปกรณ์เสียหาย
              </li>
              <li>
                <strong>คำนวณคาร์บอนเครดิต (ESG Accounting):</strong> แปลงพลังงานสะอาดที่ผลิตได้เป็นหน่วยลดคาร์บอน tCO2e
              </li>
              <li>
                <strong>ส่งข้อมูลขึ้นคลาวด์แดชบอร์ด:</strong> รายงานผลและบันทึกประวัติการใช้พลังงานเพื่อการวางแผนระยะยาว
              </li>
            </ol>
          </div>
        </div>
      </section>

      <!-- ========================================================
           SECTION 3: 4 CORE CONTROL MODULES
      ========================================================= -->
      <section class="space-y-10">
        <div class="text-center max-w-2xl mx-auto space-y-2">
          <div class="text-xs font-mono font-bold text-amber-600 dark:text-amber-400 uppercase tracking-wider">
            CORE CONTROL MODULES // 4 โมดูลควบคุมพลังงานหลัก
          </div>
          <h2 class="font-display font-black text-2xl sm:text-4xl text-[#022C22] dark:text-white">
            ควบคุมการผลิต กักเก็บ จ่ายไฟ และคำนวณคาร์บอนในระบบเดียว
          </h2>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div
            v-for="mod in coreModules"
            :key="mod.code"
            class="p-6 sm:p-8 rounded-3xl spatial-glass border border-amber-500/25 shadow-lg space-y-3 hover:border-amber-500 transition-all hover:-translate-y-1"
          >
            <div class="flex items-center justify-between">
              <span class="text-xs font-mono font-bold text-amber-600 dark:text-amber-400 bg-amber-500/15 px-3 py-1 rounded-xl">
                {{ mod.code }}
              </span>
              <Sparkles class="w-4 h-4 text-amber-400" />
            </div>
            <h3 class="text-lg sm:text-xl font-bold text-[#022C22] dark:text-white">
              {{ mod.title }}
            </h3>
            <p class="text-xs sm:text-sm opacity-80 leading-relaxed">
              {{ mod.desc }}
            </p>
          </div>
        </div>
      </section>

      <!-- ========================================================
           SECTION 4: FEATURE MATRIX & TECHNICAL SPECIFICATIONS
      ========================================================= -->
      <section class="space-y-10">
        <div class="text-center max-w-2xl mx-auto space-y-2">
          <div class="text-xs font-mono font-bold text-amber-600 dark:text-amber-400 uppercase tracking-wider">
            FEATURE MATRIX & TECHNICAL SPECS // คุณสมบัติทางเทคนิค
          </div>
          <h2 class="font-display font-black text-2xl sm:text-4xl text-[#022C22] dark:text-white">
            ฟังก์ชันฮาร์ดแวร์และการวิเคราะห์ข้อมูลครบวงจร
          </h2>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
          <!-- Hardware Specs Card -->
          <div class="p-6 sm:p-8 rounded-3xl spatial-glass border border-amber-500/20 shadow-xl space-y-5">
            <div class="flex items-center gap-3">
              <div class="w-12 h-12 rounded-2xl bg-amber-500 text-black flex items-center justify-center shrink-0 shadow-md">
                <Zap class="w-6 h-6" />
              </div>
              <div>
                <h3 class="text-lg sm:text-xl font-bold text-[#022C22] dark:text-white">
                  คุณสมบัติด้านฮาร์ดแวร์และการควบคุม
                </h3>
                <p class="text-xs opacity-65 font-mono">
                  SOLAR INVERTER & BESS CONTROLLER
                </p>
              </div>
            </div>

            <ul class="space-y-3 pt-2 text-xs sm:text-sm opacity-90 leading-relaxed">
              <li
                v-for="(feat, idx) in hardwareControls"
                :key="idx"
                class="flex items-start gap-2.5"
              >
                <CheckCircle2 class="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
                <span>{{ feat }}</span>
              </li>
            </ul>
          </div>

          <!-- Software Specs Card -->
          <div class="p-6 sm:p-8 rounded-3xl spatial-glass border border-[#00C864]/20 shadow-xl space-y-5">
            <div class="flex items-center gap-3">
              <div class="w-12 h-12 rounded-2xl bg-[#00C864] text-[#022C22] flex items-center justify-center shrink-0 shadow-md">
                <Leaf class="w-6 h-6" />
              </div>
              <div>
                <h3 class="text-lg sm:text-xl font-bold text-[#022C22] dark:text-white">
                  คุณสมบัติด้านซอฟต์แวร์และคาร์บอน ESG
                </h3>
                <p class="text-xs opacity-65 font-mono">
                  ESG TELEMETRY & CLOUD ANALYTICS
                </p>
              </div>
            </div>

            <ul class="space-y-3 pt-2 text-xs sm:text-sm opacity-90 leading-relaxed">
              <li
                v-for="(feat, idx) in softwareAnalytics"
                :key="idx"
                class="flex items-start gap-2.5"
              >
                <CheckCircle2 class="w-4 h-4 text-[#00C864] dark:text-[#00FF88] shrink-0 mt-0.5" />
                <span>{{ feat }}</span>
              </li>
            </ul>
          </div>
        </div>

        <!-- Target Industries Grid -->
        <div class="p-8 sm:p-10 rounded-[2.5rem] bg-current/5 border border-current/10 space-y-6">
          <div class="text-xs font-mono font-bold uppercase tracking-wider text-amber-600 dark:text-amber-400 flex items-center gap-2">
            <Building2 class="w-4 h-4" />
            <span>SUITABLE FOR // โซลูชันนี้เหมาะสำหรับกลุ่มอุตสาหกรรมใด</span>
          </div>

          <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            <div
              v-for="(ind, idx) in targetIndustries"
              :key="idx"
              class="p-5 rounded-2xl spatial-glass border border-current/10 space-y-2 hover:border-amber-500 transition-all hover:-translate-y-1"
            >
              <div class="text-sm font-bold text-[#022C22] dark:text-white">
                {{ ind.title }}
              </div>
              <p class="text-xs opacity-75 leading-relaxed">
                {{ ind.desc }}
              </p>
            </div>
          </div>
        </div>
      </section>

      <!-- ========================================================
           SECTION 5: SPECIAL PROMOTION & WARRANTY BANNER
      ========================================================= -->
      <section class="p-8 sm:p-10 rounded-[2.5rem] bg-gradient-to-br from-amber-950/40 via-amber-900/30 to-[#00C864]/20 border border-amber-500/40 shadow-2xl relative overflow-hidden">
        <div class="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-8">
          <div class="space-y-3 max-w-2xl">
            <div class="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono font-bold bg-amber-500/20 text-amber-300 border border-amber-500/30">
              <Tag class="w-3.5 h-3.5" />
              <span>WARRANTY & ROI SERVICE // การรับประกันและความคุ้มค่า</span>
            </div>
            <h2 class="text-2xl sm:text-4xl font-display font-black text-white">
              Bio-Grid "ลดต้นทุนค่าไฟฟ้าสู่เป้าหมายความยั่งยืน Net Zero"
            </h2>
            <p class="text-xs sm:text-sm text-slate-200 leading-relaxed">
              แพ็กเกจการรับประกันและบริการสนับสนุนพิเศษสำหรับโรงงานและองค์กรชั้นนำ
            </p>
            <ul class="space-y-2 text-xs sm:text-sm font-medium text-emerald-300">
              <li class="flex items-center gap-2">
                <CheckCircle2 class="w-4 h-4 text-[#00FF88] shrink-0" />
                <span><strong>รับประกันระบบคอนโทรลเลอร์ 5 ปีเต็ม</strong> พร้อมบริการตรวจเช็กและบำรุงรักษารายไตรมาส</span>
              </li>
              <li class="flex items-center gap-2">
                <CheckCircle2 class="w-4 h-4 text-[#00FF88] shrink-0" />
                <span><strong>บริการทีมวิศวกรสำรวจหน้างานและวิเคราะห์ระยะเวลาคืนทุน (Payback Period) ฟรี</strong></span>
              </li>
              <li class="text-xs opacity-70">
                * เงื่อนไขเป็นไปตามที่บริษัท ไอเจนโก้ จำกัด กำหนด
              </li>
            </ul>
          </div>

          <div class="flex flex-col sm:flex-row lg:flex-col gap-3 w-full lg:w-auto shrink-0">
            <button
              type="button"
              class="px-6 py-3.5 rounded-2xl bg-amber-500 hover:bg-amber-400 text-black font-bold text-xs sm:text-sm font-mono transition-all flex items-center justify-center gap-2 shadow-lg hover:scale-105 active:scale-95 cursor-pointer"
              @click="scrollToContact"
            >
              <span>ติดต่อขอรับข้อเสนอพิเศษ / ใบเสนอราคา</span>
              <ArrowUpRight class="w-4 h-4" />
            </button>
            <button
              type="button"
              class="px-6 py-3.5 rounded-2xl bg-white/10 hover:bg-white/20 text-white font-bold text-xs sm:text-sm font-mono transition-all flex items-center justify-center gap-2 border border-white/20 cursor-pointer"
              @click="showToast('กำลังเตรียมข้อมูลการนัดหมายสำรวจหน้างาน')"
            >
              <span>นัดหมายสำรวจหน้างาน (Site Survey)</span>
              <ExternalLink class="w-4 h-4" />
            </button>
          </div>
        </div>
      </section>

      <!-- ========================================================
           SECTION 6: OFFICIAL BROCHURES & DATASHEET DOWNLOADS
      ========================================================= -->
      <section class="space-y-6">
        <div class="space-y-2">
          <div class="text-xs font-mono font-bold text-amber-600 dark:text-amber-400 uppercase tracking-wider flex items-center gap-2">
            <Download class="w-4 h-4" />
            <span>OFFICIAL DOWNLOADS // เอกสารสเปกและคู่มือการใช้งาน</span>
          </div>
          <h2 class="font-display font-black text-2xl sm:text-3xl text-[#022C22] dark:text-white">
            ดาวน์โหลดเอกสารคุณสมบัติทางเทคนิคและ Datasheet
          </h2>
          <p class="text-xs sm:text-sm opacity-80">
            เอกสารทางการประกอบการพิจารณาจัดซื้อจัดจ้างสำหรับโรงงานและหน่วยงานองค์กร
          </p>
        </div>

        <div class="grid grid-cols-1 sm:grid-cols-2 gap-5">
          <!-- Download 1 -->
          <div
            class="p-6 rounded-3xl spatial-glass border border-amber-500/30 hover:border-amber-400 hover:scale-[1.02] transition-all flex items-center justify-between group shadow-sm cursor-pointer"
            @click="showToast('กำลังจัดเตรียมไฟล์ Bio-Grid Solar Controller Datasheet PDF')"
          >
            <div class="flex items-center gap-4">
              <div class="w-12 h-12 rounded-2xl bg-amber-500/20 text-amber-600 dark:text-amber-400 flex items-center justify-center shrink-0">
                <FileText class="w-6 h-6" />
              </div>
              <div>
                <div class="text-base font-bold group-hover:text-amber-500 transition-colors">
                  Bio-Grid Solar Controller Datasheet
                </div>
                <div class="text-xs opacity-65 font-mono">
                  Technical Specifications & Wiring Diagram PDF
                </div>
              </div>
            </div>
            <Download class="w-5 h-5 text-amber-500 shrink-0 group-hover:translate-y-1 transition-transform" />
          </div>

          <!-- Download 2 -->
          <div
            class="p-6 rounded-3xl spatial-glass border border-[#00C864]/30 hover:border-[#00C864] hover:scale-[1.02] transition-all flex items-center justify-between group shadow-sm cursor-pointer"
            @click="showToast('กำลังจัดเตรียมไฟล์ Clean Energy & ESG Solution Brochure PDF')"
          >
            <div class="flex items-center gap-4">
              <div class="w-12 h-12 rounded-2xl bg-[#00C864]/20 text-[#00A854] dark:text-[#00FF88] flex items-center justify-center shrink-0">
                <FileText class="w-6 h-6" />
              </div>
              <div>
                <div class="text-base font-bold group-hover:text-[#00C864] transition-colors">
                  Clean Energy & ESG Solution Brochure
                </div>
                <div class="text-xs opacity-65 font-mono">
                  Smart Energy Management & Carbon Credit PDF
                </div>
              </div>
            </div>
            <Download class="w-5 h-5 text-[#00C864] shrink-0 group-hover:translate-y-1 transition-transform" />
          </div>
        </div>
      </section>

      <!-- ========================================================
           SECTION 7: CONTACT SPECIALIST CARD
      ========================================================= -->
      <section
        id="contact-specialist"
        class="p-8 sm:p-10 rounded-[2.5rem] spatial-glass border border-amber-500/40 shadow-2xl space-y-6 bg-gradient-to-br from-white/90 via-amber-50/30 to-emerald-50/20 dark:from-black/70 dark:via-amber-950/20 dark:to-black/40 scroll-mt-28"
      >
        <div class="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 pb-6 border-b border-current/10">
          <div class="flex items-center gap-5">
            <div class="w-18 h-18 sm:w-20 sm:h-20 rounded-2xl bg-amber-500/20 text-amber-500 border border-amber-500/30 p-2 shrink-0 flex items-center justify-center shadow-lg">
              <Sun class="w-10 h-10" />
            </div>
            <div class="space-y-1">
              <div class="text-xs font-mono font-bold text-amber-600 dark:text-amber-400 uppercase tracking-wider flex items-center gap-1.5">
                <Phone class="w-3.5 h-3.5" />
                <span>INTERESTED & CONTACT // สนใจติดต่อสอบถามและนัดหมายสำรวจหน้างาน</span>
              </div>
              <h3 class="text-xl sm:text-2xl font-display font-black text-[#022C22] dark:text-white">
                ฝ่ายโซลูชันพลังงานสะอาดและความยั่งยืน (Clean Energy & ESG)
              </h3>
              <p class="text-xs sm:text-sm opacity-80">
                ผู้เชี่ยวชาญระบบบริหารจัดการพลังงานแสงอาทิตย์และคาร์บอนเครดิต บริษัท ไอเจนโก้ จำกัด
              </p>
            </div>
          </div>
        </div>

        <div class="flex flex-wrap items-center gap-4">
          <a
            href="tel:025233559"
            class="px-5 py-3 rounded-2xl bg-amber-500 hover:bg-amber-600 text-black text-xs sm:text-sm font-bold font-mono transition-all flex items-center gap-2 shadow-md hover:scale-105 active:scale-95"
          >
            <Phone class="w-4 h-4" />
            <span>โทร. 0-2523-3559 (ชั้น 2)</span>
          </a>

          <a
            href="tel:025233560"
            class="px-5 py-3 rounded-2xl bg-amber-500 hover:bg-amber-600 text-black text-xs sm:text-sm font-bold font-mono transition-all flex items-center gap-2 shadow-md hover:scale-105 active:scale-95"
          >
            <Phone class="w-4 h-4" />
            <span>โทร. 0-2523-3560 (ชั้น 3)</span>
          </a>

          <a
            href="tel:0635254850"
            class="px-5 py-3 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs sm:text-sm font-bold font-mono transition-all flex items-center gap-2 shadow-md hover:scale-105 active:scale-95"
          >
            <Phone class="w-4 h-4" />
            <span>โทร. 063-5254850</span>
          </a>

          <a
            href="mailto:sales@igenco.co.th"
            class="px-5 py-3 rounded-2xl border border-amber-500/40 hover:bg-amber-500/20 text-xs sm:text-sm font-bold font-mono transition-all flex items-center gap-2 shadow-sm hover:scale-105 active:scale-95"
          >
            <Mail class="w-4 h-4 text-amber-500" />
            <span>sales@igenco.co.th</span>
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
