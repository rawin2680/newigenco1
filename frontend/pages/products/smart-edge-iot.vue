<script setup lang="ts">
import { ref } from 'vue'
import AppHeader from '~/components/AppHeader.vue'
import ContactFooter from '~/components/ContactFooter.vue'
import {
  ArrowLeft,
  ArrowUpRight,
  Sparkles,
  Cpu,
  CheckCircle2,
  Maximize2,
  ZoomIn,
  Download,
  FileText,
  Phone,
  Mail,
  ExternalLink,
  ShieldCheck,
  Layers,
  ChevronRight,
  X,
  Wifi,
  Server,
  HardDrive,
  Radio,
  Activity,
  Building2,
  Tag,
  Zap,
  Info
} from 'lucide-vue-next'
import { useTheme } from '~/composables/useTheme'

const { showToast } = useTheme()

useHead({
  title: 'Smart Edge IoT Hub 2026 (ฮาร์ดแวร์ & เซ็นเซอร์) - บริษัท ไอเจนโก้ จำกัด (IGENCO)',
  meta: [
    {
      name: 'description',
      content: 'Smart Edge IoT Hub 2026 กล่องรับส่งสัญญาณ IoT ความเร็วสูง รองรับการทำงานในสภาพแวดล้อมโรงงาน คลังสินค้า และระบบเฝ้าระวังอัจฉริยะ โดย IGENCO'
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

// Quick stats ribbon (สเปกเด่น 4 รายการ)
const stats = [
  { label: 'มาตรฐานตัวถัง', value: 'IP67 Ruggedized', sub: 'Aluminum เกรดอุตสาหกรรม ทนฝุ่นและความชื้น' },
  { label: 'การส่งสัญญาณ', value: '5G / LoRaWAN', sub: 'พร้อม BLE 5.4 และ WiFi 7 Dual-Band' },
  { label: 'อุณหภูมิทำงาน', value: '-20°C ถึง 70°C', sub: 'รองรับสภาพแวดล้อมโรงงานและกลางแจ้ง' },
  { label: 'ระบบสำรองไฟ', value: 'Dual Supercap', sub: 'ทำงานต่อเนื่องเมื่อไฟตก พร้อมแจ้งเตือนทันที' }
]

// Hardware & Engineering Features (สเปกด้านฮาร์ดแวร์และวิศวกรรม)
const hardwareFeatures = [
  'หน่วยประมวลผล Quad-Core Edge NPU รองรับการประมวลผล AI Inference ณ จุดกำเนิดข้อมูล',
  'เคสอลูมิเนียมเกรดอากาศยาน (Aviation Grade Aluminum) ออกแบบระบายความร้อนแบบไร้พัดลม (Fanless Design)',
  'ช่องเชื่อมต่ออุตสาหกรรมครบครัน: RS-485, RS-232, CAN Bus, Modbus RTU/TCP และ Digital I/O (8 Channel)',
  'รองรับโปรโตคอล IoT สากล: MQTT, CoAP, OPC-UA, HTTP/HTTPS REST API และ WebSockets',
  'พอร์ตเชื่อมต่อเครือข่ายความเร็วสูง Dual Gigabit Ethernet (10/100/1000 Mbps) พร้อมฟังก์ชัน Bypass',
  'โมดูลเซลลูลาร์ 5G Sub-6GHz พร้อมช่องใส่ซิมการ์ดคู่ (Dual SIM Failover) สลับสัญญาณอัตโนมัติ',
  'ระบบตรวจสอบฮาร์ดแวร์ Watchdog Hardware ในตัว รีบูตอัตโนมัติเมื่อเกิดข้อผิดพลาด ป้องกันระบบค้าง 24/7',
  'รองรับแรงดันไฟกว้าง Wide Range DC Input 9V - 36V พร้อมระบบป้องกันไฟกระชาก Surge Protection 4kV'
]

// Software & Integration Features (ความสามารถด้านซอฟต์แวร์และการเชื่อมต่อ)
const softwareFeatures = [
  'ระบบปฏิบัติการ IGENCO Embedded Linux OS ความปลอดภัยสูง พร้อมระบบรักษาความปลอดภัย Secure Boot',
  'ระบบบริหารจัดการระยะไกล (IGENCO Cloud Fleet Management) อัปเดตเฟิร์มแวร์แบบ OTA (Over-The-Air)',
  'ความปลอดภัยระดับ Enterprise ด้วยการเข้ารหัสข้อมูล Hardware Encryption (TPM 2.0 / AES-256)',
  'แดชบอร์ดแสดงผลข้อมูลแบบเรียลไทม์ ตรวจสอบสถานะการเชื่อมต่อเซ็นเซอร์และระดับสัญญาณเครือข่าย',
  'ระบบสร้างกฎการแจ้งเตือนอัจฉริยะ (Alert Engine) ส่งการแจ้งเตือนผ่าน LINE Notify, SMS และ E-mail ทันที',
  'เชื่อมต่อฐานข้อมูลองค์กรและแพลตฟอร์มคลาวด์ชั้นนำ (AWS IoT Core, Azure IoT Hub, Google Cloud IoT)',
  'รองรับการจัดเก็บข้อมูล Local Cache กรณีสัญญาณเครือข่ายขัดข้อง และ Sync อัตโนมัติเมื่อสัญญาณกลับมา'
]

// Target Industries (กลุ่มอุตสาหกรรมและองค์กรที่เหมาะสม)
const targetIndustries = [
  {
    title: 'โรงงานอุตสาหกรรมและการผลิต (Smart Factory)',
    desc: 'เชื่อมต่อเครื่องจักรในสายการผลิต เก็บข้อมูล OEE, อุณหภูมิ, แรงสั่นสะเทือน และตรวจจับความผิดปกติแบบเรียลไทม์'
  },
  {
    title: 'คลังสินค้าและโลจิสติกส์ (Warehouse & Logistics)',
    desc: 'ตรวจสอบสภาพแวดล้อม คลังควบคุมอุณหภูมิ ติดตามการเคลื่อนไหวของสินค้า และระบบแจ้งเตือนความปลอดภัย'
  },
  {
    title: 'อาคารอัจฉริยะและระบบเฝ้าระวัง (Surveillance & Building)',
    desc: 'เชื่อมโยงกล้องวงจรปิด AI, เซ็นเซอร์ตรวจจับการบุกรุก, ประตู Access Control และระบบตรวจสอบการใช้พลังงาน'
  },
  {
    title: 'การเกษตรอัจฉริยะและฟาร์มปิด (Smart Agriculture)',
    desc: 'วัดความชื้นในดิน อุณหภูมิ แสงแดด ควบคุมระบบรดน้ำอัตโนมัติผ่านเครือข่าย LoRaWAN ระยะไกล'
  },
  {
    title: 'สาธารณูปโภคและโครงสร้างพื้นฐาน (Smart Utilities)',
    desc: 'ตรวจวัดระดับน้ำ มาตรวัดน้ำ-ไฟฟ้าอัจฉริยะ และตรวจสอบโครงสร้างสะพานหรือเสาสัญญาณกลางแจ้ง'
  },
  {
    title: 'โรงพยาบาลและห้องปฏิบัติการ (Healthcare & Labs)',
    desc: 'ควบคุมและตรวจสอบอุณหภูมิตู้เก็บยา ตู้แช่วัคซีน พร้อมระบบแจ้งเตือนฉุกเฉินตลอด 24 ชั่วโมง'
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
  <div class="min-h-screen relative selection:bg-[#00D2FF] selection:text-black flex flex-col justify-between bg-[#F8FAF9] dark:bg-[#020806] text-slate-800 dark:text-slate-100">
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
          <span class="text-sky-600 dark:text-[#00D2FF] font-bold">Smart Edge IoT Hub 2026</span>
        </div>
      </div>

      <!-- ========================================================
           HERO SECTION: PRODUCT OVERVIEW & HARDWARE SHOWCASE
      ========================================================= -->
      <section class="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
        <!-- Left Column: Title, Slogan, Narrative (7 Cols) -->
        <div class="lg:col-span-7 space-y-6">
          <div class="flex flex-wrap items-center gap-2.5">
            <span class="px-3.5 py-1 rounded-full text-xs font-mono font-bold bg-sky-500/15 text-sky-600 dark:bg-[#00D2FF]/20 dark:text-[#00D2FF] border border-sky-500/30">
              ฮาร์ดแวร์ & เซ็นเซอร์ // 02
            </span>
            <span class="px-3 py-1 rounded-full text-xs font-mono font-bold bg-[#00C864]/15 text-[#00A854] dark:bg-[#00FF88]/15 dark:text-[#00FF88]">
              ENTERPRISE GRADE
            </span>
            <span class="px-3 py-1 rounded-full text-xs font-mono opacity-70 border border-current/10">
              INDUSTRIAL IOT & SMART EDGE
            </span>
          </div>

          <div class="space-y-3">
            <h1 class="font-display font-black text-3xl sm:text-5xl lg:text-6xl tracking-tight leading-[1.15] text-[#022C22] dark:text-white">
              Smart Edge <span class="text-sky-600 dark:text-[#00D2FF]">IoT Hub 2026</span>
            </h1>
            <div class="text-lg sm:text-2xl font-bold text-sky-600 dark:text-[#00D2FF] font-display">
              กล่องรับส่งสัญญาณ IoT ความเร็วสูง รองรับการทำงานในสภาพแวดล้อมโรงงานและคลังสินค้า
            </div>
            <div class="inline-block px-4 py-1.5 rounded-xl bg-sky-600/10 dark:bg-[#00D2FF]/10 text-xs sm:text-sm font-mono font-bold text-sky-700 dark:text-[#00D2FF] border border-sky-500/20">
              “ ประมวลผลข้อมูลอัจฉริยะ ณ จุดกำเนิด // Edge Computing for Industrial Excellence ”
            </div>
          </div>

          <p class="text-sm sm:text-base opacity-85 leading-relaxed text-slate-700 dark:text-slate-300">
            อุปกรณ์ฮาร์ดแวร์เกรดอุตสาหกรรม (Industrial IoT Gateway) สำหรับรวบรวมและประมวลผลข้อมูลจากเซ็นเซอร์ ณ จุดกำเนิด (Edge Computing) ออกแบบด้วยเคสอลูมิเนียมเกรดอากาศยาน ทนทานต่อความร้อน ฝุ่น แรงสั่นสะเทือน และการรบกวนของคลื่นแม่เหล็กไฟฟ้าในโรงงาน
          </p>

          <p class="text-sm sm:text-base opacity-85 leading-relaxed text-slate-700 dark:text-slate-300">
            <strong>Smart Edge IoT Hub 2026</strong> มาพร้อมโมดูล <strong>5G Sub-6GHz, LoRaWAN, BLE 5.4</strong> และ <strong>WiFi 7</strong> ในตัว รองรับการเชื่อมต่อแบบไร้สายและมีสายระยะไกล ช่วยให้องค์กรสามารถตรวจสอบสถานะเครื่องจักร อุปกรณ์เฝ้าระวัง และระบบควบคุมการผลิตได้อย่างแม่นยำตลอด 24 ชั่วโมง
          </p>

          <!-- Hero Action Buttons -->
          <div class="flex flex-wrap items-center gap-3.5 pt-2">
            <button
              type="button"
              class="px-6 py-3.5 rounded-2xl bg-sky-600 hover:bg-sky-700 text-white dark:bg-[#00D2FF] dark:hover:bg-sky-400 dark:text-black font-bold text-xs sm:text-sm font-mono transition-all flex items-center gap-2 shadow-lg hover:scale-105 active:scale-95 cursor-pointer"
              @click="scrollToContact"
            >
              <span>ติดต่อสอบถาม / ปรึกษาผู้เชี่ยวชาญฮาร์ดแวร์</span>
              <ArrowUpRight class="w-4 h-4" />
            </button>

            <button
              type="button"
              class="px-5 py-3.5 rounded-2xl spatial-glass border border-sky-500/30 hover:border-sky-500 font-bold text-xs sm:text-sm font-mono transition-all flex items-center gap-2 shadow-sm hover:scale-105 active:scale-95 cursor-pointer"
              @click="showToast('กำลังเตรียมข้อมูลเอกสารทางเทคนิค Datasheet')"
            >
              <FileText class="w-4 h-4 text-sky-500 dark:text-[#00D2FF]" />
              <span>ขอรับสเปกและเอกสารทางเทคนิค</span>
            </button>
          </div>
        </div>

        <!-- Right Column: Hardware Showcase Frame (5 Cols) -->
        <div class="lg:col-span-5 relative">
          <div class="relative p-6 sm:p-8 rounded-[2.5rem] spatial-glass border border-sky-500/30 shadow-2xl bg-gradient-to-br from-sky-900/20 via-white/50 dark:via-black/40 to-[#00C864]/10 overflow-hidden flex flex-col items-center text-center space-y-6">
            
            <!-- Ambient Glow -->
            <div class="absolute -top-16 -right-16 w-48 h-48 bg-sky-500/20 rounded-full blur-3xl pointer-events-none" />
            <div class="absolute -bottom-16 -left-16 w-48 h-48 bg-[#00D2FF]/20 rounded-full blur-3xl pointer-events-none" />

            <!-- Hardware Main Photo -->
            <div
              class="w-full aspect-[4/3] rounded-2xl overflow-hidden relative cursor-pointer group border border-sky-500/20 shadow-md bg-black/40"
              @click="openLightbox('https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&w=1200&q=80', 'Smart Edge IoT Hub 2026', 'บอร์ดประมวลผลความเร็วสูงเกรดอุตสาหกรรมพร้อมระบบระบายความร้อน')"
            >
              <img
                src="https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&w=800&q=80"
                alt="Smart Edge IoT Hub Hardware"
                class="w-full h-full object-cover group-hover:scale-108 transition-transform duration-700 ease-out"
              >
              <div class="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent flex items-end justify-between p-4">
                <span class="px-2.5 py-1 rounded-lg bg-black/70 text-white text-[11px] font-mono flex items-center gap-1 backdrop-blur-sm border border-white/20">
                  <ZoomIn class="w-3.5 h-3.5 text-[#00D2FF]" />
                  <span>คลิกเพื่อดูภาพขยาย</span>
                </span>
                <span class="text-[11px] font-mono text-[#00D2FF] font-bold">
                  IP67 RUGGED // FANLESS
                </span>
              </div>
            </div>

            <!-- Specialist & Department Badge -->
            <div class="w-full flex items-center gap-4 p-3.5 rounded-2xl bg-white/70 dark:bg-black/50 border border-sky-500/20 text-left">
              <div class="w-14 h-14 rounded-xl overflow-hidden bg-black/20 shrink-0 border border-sky-500/30">
                <img
                  src="/images/about/hardware-surveillance-avatar.jpg"
                  alt="Hardware Specialist Avatar"
                  class="w-full h-full object-cover"
                >
              </div>
              <div class="space-y-0.5">
                <div class="text-[11px] font-mono text-sky-600 dark:text-[#00D2FF] font-bold">
                  HARDWARE & SURVEILLANCE TEAM
                </div>
                <div class="text-xs font-bold text-[#022C22] dark:text-white">
                  ทีมวิศวกรผู้เชี่ยวชาญด้านฮาร์ดแวร์และ IoT
                </div>
                <div class="text-[11px] opacity-70">
                  พร้อมให้คำปรึกษา ออกแบบสถาปัตยกรรม และติดตั้งหน้างาน
                </div>
              </div>
            </div>

            <div class="text-xs font-mono text-sky-600 dark:text-[#00D2FF] font-semibold">
              INDUSTRIAL GRADE HARDWARE // 24/7 MISSION CRITICAL READY
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
          class="p-5 sm:p-6 rounded-2xl spatial-glass border border-sky-500/20 flex flex-col justify-between space-y-2 hover:border-sky-500 transition-all hover:-translate-y-1"
        >
          <div class="text-[11px] font-mono uppercase tracking-wider opacity-60">
            {{ st.label }}
          </div>
          <div class="text-xl sm:text-2xl font-black font-display text-sky-600 dark:text-[#00D2FF]">
            {{ st.value }}
          </div>
          <div class="text-xs opacity-75">
            {{ st.sub }}
          </div>
        </div>
      </section>

      <!-- ========================================================
           SECTION 1: SYSTEM FLEXIBILITY & ARCHITECTURE
      ========================================================= -->
      <section class="p-8 sm:p-10 rounded-[2.5rem] spatial-glass border border-sky-500/20 shadow-xl space-y-6">
        <div class="flex items-center gap-2 text-xs font-mono font-bold text-sky-500 dark:text-[#00D2FF] uppercase tracking-wider">
          <Layers class="w-4 h-4" />
          <span>FLEXIBILITY & ARCHITECTURE // ความยืดหยุ่นและสถาปัตยกรรมระบบ</span>
        </div>

        <h2 class="font-display font-black text-2xl sm:text-3xl text-[#022C22] dark:text-white">
          สถาปัตยกรรม Edge Computing ความยืดหยุ่นสูง ออกแบบเพื่อทุกขั้นตอนการทำงาน
        </h2>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-8 text-sm sm:text-base leading-relaxed opacity-90">
          <div class="space-y-4">
            <h3 class="font-bold text-base sm:text-lg text-sky-700 dark:text-[#00D2FF] flex items-center gap-2">
              <span class="w-2.5 h-2.5 rounded-full bg-sky-500 dark:bg-[#00D2FF]" />
              <span>การบริหารจัดการและวิศวกรรมฮาร์ดแวร์ (Hardware Engineering)</span>
            </h3>
            <p>
              รองรับการติดตั้งในสภาพแวดล้อมที่ท้าทาย ทั้งบนราง DIN-Rail ในตู้คอนโทรล หรือยึดติดผนัง (Wall-Mount) ด้วยโครงสร้างตัวถังอลูมิเนียมกันน้ำกันฝุ่นระดับ IP67 ระบายความร้อนแบบ Passive Cooling โดยไม่ต้องใช้พัดลม ช่วยลดปัญหาฝุ่นสะสมและยืดอายุการใช้งานได้ยาวนานกว่า 7-10 ปี
            </p>
            <p>
              มีระบบสำรองไฟในตัวด้วย <strong>Dual Supercapacitor</strong> ทำหน้าที่จ่ายพลังงานฉุกเฉินให้ระบบสามารถบันทึกข้อมูลสำคัญลงหน่วยความจำแบบ Non-Volatile และส่งสัญญาณแจ้งเตือนไฟดับ (Last-Gasp Notification) ไปยังศูนย์ควบคุมได้ทันทีก่อนที่อุปกรณ์จะปิดการทำงานอย่างปลอดภัย
            </p>
          </div>

          <div class="space-y-4">
            <h3 class="font-bold text-base sm:text-lg text-[#00A854] dark:text-[#00FF88] flex items-center gap-2">
              <span class="w-2.5 h-2.5 rounded-full bg-[#00C864]" />
              <span>การเชื่อมโยงข้อมูลและการวิเคราะห์เรียลไทม์ (Edge Analytics)</span>
            </h3>
            <p>
              อุปกรณ์ทำการประมวลผลและคัดกรองข้อมูลเซ็นเซอร์ ณ จุดกำเนิดข้อมูล (Edge Processing) ก่อนส่งขึ้นคลาวด์ ช่วยลดปริมาณแบนด์วิดท์เครือข่ายลงได้มากกว่า 80% และตอบสนองต่อสภาวะวิกฤตได้ภายในเสี้ยววินาที (Low-Latency Response)
            </p>
            <p>
              รองรับการเชื่อมต่อกับระบบควบคุมเดิมของโรงงานผ่านโปรโตคอลมาตรฐาน เช่น <strong>Modbus, CAN Bus, OPC-UA</strong> และส่งต่อข้อมูลไปยังแพลตฟอร์มคลาวด์หรือซอฟต์แวร์ ERP/MES ขององค์กรผ่านระบบรักษาความปลอดภัยแบบ TLS 1.3
            </p>
          </div>
        </div>
      </section>

      <!-- ========================================================
           SECTION 2: WORKFLOW & DATA INGESTION INFOGRAPHIC
      ========================================================= -->
      <section class="space-y-8">
        <div class="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-current/10 pb-4">
          <div>
            <div class="text-xs font-mono font-bold text-sky-500 dark:text-[#00D2FF] uppercase tracking-wider flex items-center gap-2">
              <Activity class="w-4 h-4" />
              <span>DATA FLOW & INGESTION // ขั้นตอนการรับส่งและประมวลผลข้อมูล</span>
            </div>
            <h2 class="font-display font-black text-2xl sm:text-4xl text-[#022C22] dark:text-white mt-1">
              ขั้นตอนการทำงานของระบบประมวลผล Edge IoT
            </h2>
          </div>
          <button
            type="button"
            class="px-4 py-2 rounded-xl border border-sky-500/30 hover:bg-sky-500/20 text-xs font-mono font-bold flex items-center gap-2 transition-all self-start sm:self-auto cursor-pointer"
            @click="openLightbox('https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=1200&q=80', 'ผังขั้นตอนการทำงาน Smart Edge IoT Workflow', 'การรวบรวมข้อมูลเซ็นเซอร์ การประมวลผล ณ จุดกำเนิด และการเชื่อมโยงระบบคลาวด์')"
          >
            <ZoomIn class="w-4 h-4 text-sky-500 dark:text-[#00D2FF]" />
            <span>ซูมดูแผนผังการทำงาน</span>
          </button>
        </div>

        <!-- Workflow Showcase Cards -->
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
          <!-- Flow 1: Standalone On-Premises Edge Mode -->
          <div class="p-6 sm:p-8 rounded-3xl bg-white/70 dark:bg-black/40 border border-sky-500/30 shadow-lg space-y-4">
            <div class="flex items-center justify-between">
              <span class="px-3.5 py-1 rounded-full text-xs font-mono font-bold bg-sky-500/20 text-sky-600 dark:text-sky-300 border border-sky-500/30">
                รูปแบบที่ 1 : Standalone On-Premises (3 ขั้นตอน)
              </span>
              <span class="text-xs font-mono opacity-60">OFFLINE / LOCAL CONTROL</span>
            </div>

            <ol class="space-y-3 text-xs sm:text-sm opacity-90 list-decimal list-inside leading-relaxed">
              <li>
                <strong>รับสัญญาณจากเซ็นเซอร์ (Sensor Ingestion):</strong> ดึงข้อมูลจากเซ็นเซอร์อุณหภูมิ แรงดัน หรือกล้อง AI ผ่าน RS-485/Modbus/Ethernet
              </li>
              <li>
                <strong>ประมวลผล ณ จุดกำเนิด (Edge Inference):</strong> วิเคราะห์ข้อมูลด้วย Edge NPU ตรวจสอบค่าพารามิเตอร์เทียบกับค่าปกติ
              </li>
              <li>
                <strong>สั่งการควบคุมและแจ้งเตือนทันที (Local Action):</strong> ทริกเกอร์ Relay สั่งตัดระบบ แจ้งเตือนไฟไซเรน และบันทึก Log ลง SSD ภายในตัว
              </li>
            </ol>
          </div>

          <!-- Flow 2: Hybrid Cloud & Fleet Sync Mode -->
          <div class="p-6 sm:p-8 rounded-3xl bg-white/70 dark:bg-black/40 border border-[#00C864]/30 shadow-lg space-y-4">
            <div class="flex items-center justify-between">
              <span class="px-3.5 py-1 rounded-full text-xs font-mono font-bold bg-[#00C864]/20 text-[#00A854] dark:text-[#00FF88] border border-[#00C864]/30">
                รูปแบบที่ 2 : Hybrid Cloud Sync (6 ขั้นตอน)
              </span>
              <span class="text-xs font-mono opacity-60">CLOUD & FLEET MANAGEMENT</span>
            </div>

            <ol class="space-y-3 text-xs sm:text-sm opacity-90 list-decimal list-inside leading-relaxed">
              <li>
                <strong>รับสัญญาณเซ็นเซอร์:</strong> รวมข้อมูลจากอุปกรณ์และเครื่องจักรหลายจุดพร้อมกัน
              </li>
              <li>
                <strong>คัดกรองและเข้ารหัสข้อมูล (Filter & Encrypt):</strong> บีบอัดข้อมูลและเข้ารหัสด้วย TPM 2.0 / AES-256
              </li>
              <li>
                <strong>ส่งข้อมูลผ่าน 5G / Fiber:</strong> ส่งข้อมูลขึ้นคลาวด์ด้วยโปรโตคอล MQTT / WebSockets
              </li>
              <li>
                <strong>จัดเก็บลงคลาวด์และแสดงผล:</strong> บันทึกข้อมูลประวัติและแสดงกราฟเรียลไทม์บนแดชบอร์ด
              </li>
              <li>
                <strong>วิเคราะห์ข้อมูลเชิงคาดการณ์ (Predictive AI):</strong> พยากรณ์รอบการซ่อมบำรุงเครื่องจักรล่วงหน้า
              </li>
              <li>
                <strong>อัปเดตนโยบายการทำงาน (OTA Sync):</strong> ปรับแต่งค่าพารามิเตอร์และอัปเดตเฟิร์มแวร์อุปกรณ์จากศูนย์กลาง
              </li>
            </ol>
          </div>
        </div>
      </section>

      <!-- ========================================================
           SECTION 3: HARDWARE & SURVEILLANCE PROTOCOLS
      ========================================================= -->
      <section class="p-8 sm:p-12 rounded-[2.5rem] spatial-glass border border-sky-500/30 shadow-2xl space-y-10">
        <div class="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-current/10 pb-4">
          <div>
            <div class="text-xs font-mono font-bold text-sky-500 dark:text-[#00D2FF] uppercase tracking-wider flex items-center gap-2">
              <Sparkles class="w-4 h-4" />
              <span>HARDWARE & SURVEILLANCE PROTOCOLS // ระบบเฝ้าระวังและการบำรุงรักษา</span>
            </div>
            <h2 class="font-display font-black text-2xl sm:text-4xl text-[#022C22] dark:text-white mt-1">
              ระบบตรวจสอบสถานะอุปกรณ์และการเฝ้าระวังอัจฉริยะ 24/7
            </h2>
            <p class="text-xs sm:text-sm opacity-80 mt-1 max-w-3xl">
              ออกแบบตามกระบวนการ Hardware & Surveillance Maintenance Protocol เพื่อตรวจจับข้อผิดพลาด แจ้งเตือน และเชื่อมต่อกล้องวงจรปิดแบบอัตโนมัติ
            </p>
          </div>

          <button
            type="button"
            class="px-4 py-2 rounded-xl border border-sky-500/30 hover:bg-sky-500/20 text-xs font-mono font-bold flex items-center gap-2 transition-all self-start sm:self-auto cursor-pointer"
            @click="openLightbox('https://images.unsplash.com/photo-1557597774-9d273605dfa9?auto=format&fit=crop&w=1200&q=80', 'Surveillance & Hardware Maintenance', 'โครงข่ายกล้องวงจรปิด AI และการตรวจสอบสถานะเซิร์ฟเวอร์แบบเรียลไทม์')"
          >
            <ZoomIn class="w-4 h-4 text-sky-500 dark:text-[#00D2FF]" />
            <span>ซูมดูภาพรวมระบบ</span>
          </button>
        </div>

        <!-- 2 Implementation Models for IoT & Surveillance -->
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-8 pt-4">
          
          <!-- Model 1: Smart Factory & Industrial Monitoring -->
          <div class="p-6 sm:p-8 rounded-3xl bg-white/60 dark:bg-black/50 border border-sky-500/30 flex flex-col justify-between space-y-6">
            <div class="space-y-4">
              <div class="flex items-center justify-between">
                <span class="px-3.5 py-1 rounded-full text-xs font-mono font-bold bg-sky-500/20 text-sky-600 dark:text-sky-300 border border-sky-500/30">
                  รูปแบบที่ 1 : โรงงานและคลังสินค้าอัจฉริยะ
                </span>
                <span class="text-xs font-mono opacity-60">SMART FACTORY & WAREHOUSE</span>
              </div>

              <h3 class="text-lg sm:text-xl font-bold text-[#022C22] dark:text-white">
                ขั้นตอนการตรวจวัดสภาพแวดล้อมและเครื่องจักร
              </h3>

              <p class="text-xs sm:text-sm opacity-85 leading-relaxed">
                เชื่อมต่อเซ็นเซอร์ในโรงงานและสายการผลิตเพื่อตรวจสอบสถานะ 5 ขั้นตอนหลัก:
              </p>

              <ul class="text-xs sm:text-sm space-y-2 opacity-90 font-mono">
                <li class="flex items-start gap-2">
                  <span class="w-2 h-2 rounded-full bg-[#00D2FF] mt-1.5 shrink-0" />
                  <span><strong>จุดตรวจที่ 1:</strong> ตรวจวัดอุณหภูมิและความชื้นในตู้ควบคุมไฟฟ้าและคลังสินค้า</span>
                </li>
                <li class="flex items-start gap-2">
                  <span class="w-2 h-2 rounded-full bg-[#00D2FF] mt-1.5 shrink-0" />
                  <span><strong>จุดตรวจที่ 2:</strong> ตรวจวัดแรงสั่นสะเทือนของมอเตอร์และเครื่องจักรจักรกลหนัก</span>
                </li>
                <li class="flex items-start gap-2">
                  <span class="w-2 h-2 rounded-full bg-[#00D2FF] mt-1.5 shrink-0" />
                  <span><strong>จุดตรวจที่ 3:</strong> ตรวจสอบกระแสไฟฟ้าและการใช้พลังงานผ่าน Digital Power Meter</span>
                </li>
                <li class="flex items-start gap-2">
                  <span class="w-2 h-2 rounded-full bg-[#00D2FF] mt-1.5 shrink-0" />
                  <span><strong>จุดตรวจที่ 4:</strong> ระบบแจ้งเตือนฉุกเฉินเมื่อค่าเกินเกณฑ์มาตรฐาน (Threshold Alerts)</span>
                </li>
                <li class="flex items-start gap-2">
                  <span class="w-2 h-2 rounded-full bg-[#00D2FF] mt-1.5 shrink-0" />
                  <span><strong>จุดตรวจที่ 5:</strong> ประเมินอายุการใช้งานอุปกรณ์และส่งรายงาน Preventive Maintenance</span>
                </li>
              </ul>
            </div>

            <div
              class="rounded-2xl overflow-hidden border border-current/15 cursor-pointer group relative bg-black/10"
              @click="openLightbox('https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=1200&q=80', 'ระบบตรวจวัดเครื่องจักรในโรงงาน', 'การติดตั้ง Edge Hub ร่วมกับเซ็นเซอร์อุตสาหกรรมในสายการผลิต')"
            >
              <img
                src="https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=800&q=80"
                alt="Factory IoT Monitoring"
                class="w-full h-56 object-cover group-hover:scale-105 transition-transform duration-300"
              >
              <div class="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2 text-white text-xs font-mono font-bold">
                <ZoomIn class="w-4 h-4" />
                <span>คลิกดูภาพขยาย</span>
              </div>
            </div>
          </div>

          <!-- Model 2: Building Security & Surveillance Integration -->
          <div class="p-6 sm:p-8 rounded-3xl bg-white/60 dark:bg-black/50 border border-emerald-500/30 flex flex-col justify-between space-y-6">
            <div class="space-y-4">
              <div class="flex items-center justify-between">
                <span class="px-3.5 py-1 rounded-full text-xs font-mono font-bold bg-emerald-500/20 text-emerald-600 dark:text-emerald-300 border border-emerald-500/30">
                  รูปแบบที่ 2 : อาคารและความปลอดภัยอัจฉริยะ
                </span>
                <span class="text-xs font-mono opacity-60">BUILDING & SURVEILLANCE</span>
              </div>

              <h3 class="text-lg sm:text-xl font-bold text-[#022C22] dark:text-white">
                ขั้นตอนการเชื่อมโยงกล้องวงจรปิด AI และระบบเตือนภัย
              </h3>

              <p class="text-xs sm:text-sm opacity-85 leading-relaxed">
                ผสานการทำงานร่วมกับระบบกล้องวงจรปิดและระบบควบคุมการเข้า-ออกอาคาร:
              </p>

              <ul class="text-xs sm:text-sm space-y-2 opacity-90 font-mono">
                <li class="flex items-start gap-2">
                  <span class="w-2 h-2 rounded-full bg-emerald-500 mt-1.5 shrink-0" />
                  <span><strong>ขั้นตอนที่ 1:</strong> เชื่อมต่อกล้อง AI ผ่านพอร์ต Gigabit PoE เพื่อตรวจจับใบหน้าและป้ายทะเบียน</span>
                </li>
                <li class="flex items-start gap-2">
                  <span class="w-2 h-2 rounded-full bg-emerald-500 mt-1.5 shrink-0" />
                  <span><strong>ขั้นตอนที่ 2:</strong> ประมวลผลภาพบน Edge NPU ตัดคลิปช่วงเกิดเหตุการณ์สำคัญ (Event Clip)</span>
                </li>
                <li class="flex items-start gap-2">
                  <span class="w-2 h-2 rounded-full bg-emerald-500 mt-1.5 shrink-0" />
                  <span><strong>ขั้นตอนที่ 3:</strong> ส่งสัญญาณเปิด-ปิดประตู Access Control อัตโนมัติเมื่อผ่านการยืนยันตัวตน</span>
                </li>
                <li class="flex items-start gap-2">
                  <span class="w-2 h-2 rounded-full bg-emerald-500 mt-1.5 shrink-0" />
                  <span><strong>ฟังก์ชันเสริม:</strong> แจ้งเตือนไปยังห้องควบคุมส่วนกลางและโทรศัพท์มือถือเจ้าหน้าที่ รปภ. ทันที</span>
                </li>
              </ul>
            </div>

            <div
              class="rounded-2xl overflow-hidden border border-current/15 cursor-pointer group relative bg-black/10"
              @click="openLightbox('https://images.unsplash.com/photo-1557597774-9d273605dfa9?auto=format&fit=crop&w=1200&q=80', 'ระบบเฝ้าระวังและความปลอดภัยอาคาร', 'การเชื่อมโยงภาพกล้องวงจรปิด AI เข้ากับ Edge Gateway และระบบควบคุม')"
            >
              <img
                src="https://images.unsplash.com/photo-1557597774-9d273605dfa9?auto=format&fit=crop&w=800&q=80"
                alt="Building Surveillance"
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
           SECTION 4: FEATURE MATRIX & TECHNICAL SPECIFICATIONS
      ========================================================= -->
      <section class="space-y-10">
        <div class="text-center max-w-2xl mx-auto space-y-2">
          <div class="text-xs font-mono font-bold text-sky-600 dark:text-[#00D2FF] uppercase tracking-wider">
            FEATURE MATRIX & TECHNICAL SPECS // คุณสมบัติทางเทคนิค
          </div>
          <h2 class="font-display font-black text-2xl sm:text-4xl text-[#022C22] dark:text-white">
            ฟังก์ชันฮาร์ดแวร์และซอฟต์แวร์ครบวงจร
          </h2>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
          <!-- Hardware Specs Card -->
          <div class="p-6 sm:p-8 rounded-3xl spatial-glass border border-sky-500/20 shadow-xl space-y-5">
            <div class="flex items-center gap-3">
              <div class="w-12 h-12 rounded-2xl bg-sky-600 text-white dark:bg-[#00D2FF] dark:text-black flex items-center justify-center shrink-0 shadow-md">
                <Cpu class="w-6 h-6" />
              </div>
              <div>
                <h3 class="text-lg sm:text-xl font-bold text-[#022C22] dark:text-white">
                  คุณสมบัติด้านฮาร์ดแวร์และวิศวกรรม
                </h3>
                <p class="text-xs opacity-65 font-mono">
                  INDUSTRIAL HARDWARE ENGINE & I/O
                </p>
              </div>
            </div>

            <ul class="space-y-3 pt-2 text-xs sm:text-sm opacity-90 leading-relaxed">
              <li
                v-for="(feat, idx) in hardwareFeatures"
                :key="idx"
                class="flex items-start gap-2.5"
              >
                <CheckCircle2 class="w-4 h-4 text-sky-600 dark:text-[#00D2FF] shrink-0 mt-0.5" />
                <span>{{ feat }}</span>
              </li>
            </ul>
          </div>

          <!-- Software Specs Card -->
          <div class="p-6 sm:p-8 rounded-3xl spatial-glass border border-[#00C864]/20 shadow-xl space-y-5">
            <div class="flex items-center gap-3">
              <div class="w-12 h-12 rounded-2xl bg-[#00C864] text-[#022C22] flex items-center justify-center shrink-0 shadow-md">
                <ShieldCheck class="w-6 h-6" />
              </div>
              <div>
                <h3 class="text-lg sm:text-xl font-bold text-[#022C22] dark:text-white">
                  คุณสมบัติด้านซอฟต์แวร์และการเชื่อมต่อ
                </h3>
                <p class="text-xs opacity-65 font-mono">
                  EMBEDDED OS & CLOUD INTEGRATION
                </p>
              </div>
            </div>

            <ul class="space-y-3 pt-2 text-xs sm:text-sm opacity-90 leading-relaxed">
              <li
                v-for="(feat, idx) in softwareFeatures"
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
          <div class="text-xs font-mono font-bold uppercase tracking-wider text-sky-600 dark:text-[#00D2FF] flex items-center gap-2">
            <Building2 class="w-4 h-4" />
            <span>SUITABLE FOR // โซลูชันนี้เหมาะสำหรับกลุ่มอุตสาหกรรมใด</span>
          </div>

          <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            <div
              v-for="(ind, idx) in targetIndustries"
              :key="idx"
              class="p-5 rounded-2xl spatial-glass border border-current/10 space-y-2 hover:border-sky-500 transition-all hover:-translate-y-1"
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
      <section class="p-8 sm:p-10 rounded-[2.5rem] bg-gradient-to-br from-sky-950/40 via-sky-900/30 to-[#00C864]/20 border border-sky-500/40 shadow-2xl relative overflow-hidden">
        <div class="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-8">
          <div class="space-y-3 max-w-2xl">
            <div class="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono font-bold bg-sky-500/20 text-sky-300 border border-sky-500/30">
              <Tag class="w-3.5 h-3.5" />
              <span>WARRANTY & ENTERPRISE SERVICE // การรับประกันและบริการ</span>
            </div>
            <h2 class="text-2xl sm:text-4xl font-display font-black text-white">
              Smart Edge IoT Hub "เสถียรภาพสูงสุดสำหรับภาคอุตสาหกรรม"
            </h2>
            <p class="text-xs sm:text-sm text-slate-200 leading-relaxed">
              แพ็กเกจการรับประกันและบริการสนับสนุนพิเศษสำหรับโรงงานและองค์กรชั้นนำ
            </p>
            <ul class="space-y-2 text-xs sm:text-sm font-medium text-emerald-300">
              <li class="flex items-center gap-2">
                <CheckCircle2 class="w-4 h-4 text-[#00FF88] shrink-0" />
                <span><strong>รับประกันฮาร์ดแวร์เกรดอุตสาหกรรมสูงสุด 3 ปีเต็ม</strong> พร้อมเครื่องสำรองระหว่างตรวจเช็ก</span>
              </li>
              <li class="flex items-center gap-2">
                <CheckCircle2 class="w-4 h-4 text-[#00FF88] shrink-0" />
                <span><strong>บริการทีมวิศวกรสำรวจหน้างานและออกแบบสถาปัตยกรรมระบบฟรี</strong></span>
              </li>
              <li class="text-xs opacity-70">
                * เงื่อนไขเป็นไปตามที่บริษัท ไอเจนโก้ จำกัด กำหนด
              </li>
            </ul>
          </div>

          <div class="flex flex-col sm:flex-row lg:flex-col gap-3 w-full lg:w-auto shrink-0">
            <button
              type="button"
              class="px-6 py-3.5 rounded-2xl bg-sky-600 hover:bg-sky-500 text-white dark:bg-[#00D2FF] dark:hover:bg-sky-400 dark:text-black font-bold text-xs sm:text-sm font-mono transition-all flex items-center justify-center gap-2 shadow-lg hover:scale-105 active:scale-95 cursor-pointer"
              @click="scrollToContact"
            >
              <span>ติดต่อขอรับข้อเสนอพิเศษ / ใบเสนอราคา</span>
              <ArrowUpRight class="w-4 h-4" />
            </button>
            <button
              type="button"
              class="px-6 py-3.5 rounded-2xl bg-white/10 hover:bg-white/20 text-white font-bold text-xs sm:text-sm font-mono transition-all flex items-center justify-center gap-2 border border-white/20 cursor-pointer"
              @click="showToast('กำลังเตรียมข้อมูลการนัดหมายทดสอบอุปกรณ์')"
            >
              <span>นัดหมายสาธิตอุปกรณ์ (POC Demo)</span>
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
          <div class="text-xs font-mono font-bold text-sky-600 dark:text-[#00D2FF] uppercase tracking-wider flex items-center gap-2">
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
            class="p-6 rounded-3xl spatial-glass border border-sky-500/30 hover:border-sky-400 hover:scale-[1.02] transition-all flex items-center justify-between group shadow-sm cursor-pointer"
            @click="showToast('กำลังจัดเตรียมไฟล์ Smart Edge IoT Hub Datasheet PDF')"
          >
            <div class="flex items-center gap-4">
              <div class="w-12 h-12 rounded-2xl bg-sky-600/20 text-sky-600 dark:text-[#00D2FF] flex items-center justify-center shrink-0">
                <FileText class="w-6 h-6" />
              </div>
              <div>
                <div class="text-base font-bold group-hover:text-sky-500 dark:group-hover:text-[#00D2FF] transition-colors">
                  Smart Edge IoT Hub 2026 Datasheet
                </div>
                <div class="text-xs opacity-65 font-mono">
                  Hardware Specification & Wiring Guide PDF
                </div>
              </div>
            </div>
            <Download class="w-5 h-5 text-sky-500 dark:text-[#00D2FF] shrink-0 group-hover:translate-y-1 transition-transform" />
          </div>

          <!-- Download 2 -->
          <div
            class="p-6 rounded-3xl spatial-glass border border-[#00C864]/30 hover:border-[#00C864] hover:scale-[1.02] transition-all flex items-center justify-between group shadow-sm cursor-pointer"
            @click="showToast('กำลังจัดเตรียมไฟล์ Hardware & Surveillance Brochure PDF')"
          >
            <div class="flex items-center gap-4">
              <div class="w-12 h-12 rounded-2xl bg-[#00C864]/20 text-[#00A854] dark:text-[#00FF88] flex items-center justify-center shrink-0">
                <FileText class="w-6 h-6" />
              </div>
              <div>
                <div class="text-base font-bold group-hover:text-[#00C864] transition-colors">
                  Hardware & Surveillance Brochure
                </div>
                <div class="text-xs opacity-65 font-mono">
                  Industrial IoT & Surveillance Solutions PDF
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
        class="p-8 sm:p-10 rounded-[2.5rem] spatial-glass border border-sky-500/40 shadow-2xl space-y-6 bg-gradient-to-br from-white/90 via-sky-50/30 to-emerald-50/20 dark:from-black/70 dark:via-sky-950/20 dark:to-black/40 scroll-mt-28"
      >
        <div class="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 pb-6 border-b border-current/10">
          <div class="flex items-center gap-5">
            <div class="w-18 h-18 sm:w-20 sm:h-20 rounded-2xl bg-white dark:bg-black/50 border border-sky-500/30 p-2 shrink-0 flex items-center justify-center shadow-lg overflow-hidden">
              <img
                src="/images/about/hardware-surveillance-avatar.jpg"
                alt="Hardware Specialist"
                class="w-full h-full object-cover rounded-xl"
              >
            </div>
            <div class="space-y-1">
              <div class="text-xs font-mono font-bold text-sky-600 dark:text-[#00D2FF] uppercase tracking-wider flex items-center gap-1.5">
                <Phone class="w-3.5 h-3.5" />
                <span>INTERESTED & CONTACT // สนใจติดต่อสอบถามและนัดหมายสาธิตอุปกรณ์</span>
              </div>
              <h3 class="text-xl sm:text-2xl font-display font-black text-[#022C22] dark:text-white">
                ฝ่ายฮาร์ดแวร์และระบบเฝ้าระวัง (Hardware & Surveillance)
              </h3>
              <p class="text-xs sm:text-sm opacity-80">
                ผู้เชี่ยวชาญโซลูชันฮาร์ดแวร์อุตสาหกรรม IoT Gateway และระบบเฝ้าระวัง บริษัท ไอเจนโก้ จำกัด
              </p>
            </div>
          </div>
        </div>

        <div class="flex flex-wrap items-center gap-4">
          <a
            href="tel:025233559"
            class="px-5 py-3 rounded-2xl bg-sky-600 hover:bg-sky-700 text-white dark:bg-[#00D2FF] dark:hover:bg-sky-400 dark:text-black text-xs sm:text-sm font-bold font-mono transition-all flex items-center gap-2 shadow-md hover:scale-105 active:scale-95"
          >
            <Phone class="w-4 h-4" />
            <span>โทร. 0-2523-3559 (ชั้น 2)</span>
          </a>

          <a
            href="tel:025233560"
            class="px-5 py-3 rounded-2xl bg-sky-600 hover:bg-sky-700 text-white dark:bg-[#00D2FF] dark:hover:bg-sky-400 dark:text-black text-xs sm:text-sm font-bold font-mono transition-all flex items-center gap-2 shadow-md hover:scale-105 active:scale-95"
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
            class="px-5 py-3 rounded-2xl border border-sky-500/40 hover:bg-sky-500/20 text-xs sm:text-sm font-bold font-mono transition-all flex items-center gap-2 shadow-sm hover:scale-105 active:scale-95"
          >
            <Mail class="w-4 h-4 text-sky-500 dark:text-[#00D2FF]" />
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
