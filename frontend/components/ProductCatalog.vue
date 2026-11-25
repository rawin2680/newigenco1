<script setup lang="ts">
import { ref, computed } from 'vue'
import { ArrowUpRight, Box, Info, X, CheckCircle2, Cpu, ShieldCheck, Zap, Sparkles } from 'lucide-vue-next'
import { useTheme } from '~/composables/useTheme'

const { showToast } = useTheme()

const activeCategory = ref('ทั้งหมด')
const categories = ['ทั้งหมด', 'ฮาร์ดแวร์ & เซ็นเซอร์', 'ซอฟต์แวร์อัจฉริยะ', 'โซลูชันพลังงานสะอาด', 'ความปลอดภัย & เครือข่าย']

export interface ProductItem {
  id: number
  title: string
  category: string
  desc: string
  detailedDesc: string
  price: string
  tags: string[]
  specs: { label: string; value: string }[]
  image: string
  accentColor: string
  glowColor: string
  icon: string
  link?: string
}

const products: ProductItem[] = [
  {
    id: 1,
    title: 'Regist.ai (ระบบบริหารการลงทะเบียนอัจฉริยะ)',
    category: 'ซอฟต์แวร์อัจฉริยะ',
    desc: 'ระบบบริหารการลงทะเบียนและจัดการคิวอัจฉริยะ ตอบโจทย์งานสัมมนา ฝึกอบรม โรงพยาบาล และร้านอาหาร ทั้ง Online / Offline',
    detailedDesc: 'ระบบบริหารการลงทะเบียนอัจฉริยะ Regist.ai "ตอบโจทย์ทุกการลงทะเบียน" ช่วยอำนวยความสะดวกในการจัดงานสัมมนา ฝึกอบรม และเผยแพร่ความรู้ เปิดรับลงทะเบียนทั้ง Online / Offline พร้อมเชื่อมต่อฐานข้อมูลร่วมกับ Joomla และ WordPress ได้อย่างไร้รอยต่อ มาพร้อมระบบ i-Queue สำหรับบริหารจัดการคิวงานบริการแบบ New Normal ทั้งงานฉีดวัคซีนและร้านอาหาร',
    price: 'ติดตั้งพร้อมใช้ใน 1 สัปดาห์',
    tags: ['Online / Offline', 'i-Queue System', 'Joomla / WP Ready', 'PDPA Ready'],
    specs: [
      { label: 'การรองรับระบบ', value: 'Web-based (Online & Offline) & Responsive' },
      { label: 'การเชื่อมต่อ CMS', value: 'Joomla, WordPress, Google Forms, REST API' },
      { label: 'ระบบบริหารคิว', value: 'i-Queue หลายช่องบริการ & Restaurant Flow' },
      { label: 'มาตรฐานความปลอดภัย', value: 'PDPA Compliant / QR Code E-Ticket' }
    ],
    image: '/images/products/regist-ai-banner.png',
    accentColor: '#9333EA',
    glowColor: 'rgba(147, 51, 234, 0.25)',
    icon: 'Box',
    link: '/products/regist-ai'
  },
  {
    id: 2,
    title: 'HR.ai (ระบบบริหารทรัพยากรมนุษย์อัจฉริยะ)',
    category: 'ซอฟต์แวร์อัจฉริยะ',
    desc: 'ระบบบริหารทรัพยากรมนุษย์อัจฉริยะ ตอบโจทย์ทุกงานบริหารคน ครอบคลุมการทำงานสำหรับ HRM, HRD และ OD รางวัล The Winner OIIO 2019',
    detailedDesc: 'HR.ai (Human Resource Artificial Intelligence) ระบบบริหารงานบุคคลอัจฉริยะครบวงจร ครอบคลุม EIS, HRM, HRD และ OD พัฒนาบน Web-Based Technology และ Hybrid Mobile App รองรับการสั่งการด้วยเสียง (Voice AI) ระบบจดจำใบหน้า (Face ID) และการประมวลผลข้อมูลองค์กรขนาดใหญ่ เชื่อมต่อ RDBMS Oracle และ Active Directory ได้รับรางวัลชนะเลิศ The Winner ในงาน OIIO Thailand Techland 2019',
    price: 'แพ็กเกจองค์กร Cloud & On-Premises',
    tags: ['The Winner OIIO', 'HRM / HRD / OD', 'AI Voice & Face ID', 'SSO / Oracle Ready'],
    specs: [
      { label: 'ขอบเขตระบบ', value: '4 ระบบหลัก (EIS, HRM, HRD, OD)' },
      { label: 'นวัตกรรม AI', value: 'Two-way Voice Command & Face Recognition' },
      { label: 'ฐานข้อมูล & ความปลอดภัย', value: 'Oracle RDBMS, SSL, Single Sign-on (AD)' },
      { label: 'การันตีคุณภาพ', value: 'The Winner OIIO 2019 & ISO/IEC 29110' }
    ],
    image: '/images/products/hr-ai-office-banner.jpg',
    accentColor: '#00C864',
    glowColor: 'rgba(0, 200, 100, 0.25)',
    icon: 'Users',
    link: '/products/hr-ai'
  },
  {
    id: 3,
    title: 'iGenQ (ระบบบริหารคิวอัจฉริยะ)',
    category: 'ซอฟต์แวร์อัจฉริยะ',
    desc: 'ระบบจัดการคิวแบบ New Normal ใช้งานได้ทันทีโดยไม่ต้องติดตั้ง App แจ้งเตือนผ่าน LINE ไม่ต้องยืนรอคิว ซอฟต์แวร์คนไทย 100%',
    detailedDesc: 'iGenQ ระบบบริหารคิวอัจฉริยะแบบ New Normal สแกน QR Code รับบัตรคิวอิเล็กทรอนิกส์ (e-Ticket) ทันทีบนสมาร์ทโฟน มีระบบแจ้งเตือนผ่าน LINE Notify เมื่อถึงคิว ไม่ต้องยืนรอคิวหน้าร้าน ช่วยลดความเสี่ยงจากการสัมผัสหน้าจอตู้คีออส ลดต้นทุน Hardware ออกเสียงเรียกคิวผ่าน Bluetooth, Smart Phone, Tablet หรือ Android TV มีหนังสือรับรองผลงานจากศาลากลางจังหวัดจันทบุรี และหนังสือรับรองผลงานลิขสิทธิ์ ซอฟต์แวร์คนไทย 100%',
    price: 'แพ็กเกจ Cloud รายเดือน & รายปี',
    tags: ['New Normal Queue', 'หนังสือรับรองผลงาน', 'LINE Notify', 'ลิขสิทธิ์แท้ 100%'],
    specs: [
      { label: 'การเข้าใช้งาน', value: 'สแกน QR Code บนมือถือ (ไม่ต้องติดตั้ง App)' },
      { label: 'ระบบแจ้งเตือน', value: 'LINE Notify Alert อัตโนมัติเมื่อถึงคิว' },
      { label: 'การออกเสียงเรียก', value: 'รองรับ Android TV, Tablet, ลำโพง Bluetooth' },
      { label: 'รับรองผลงานและลิขสิทธิ์', value: 'หนังสือรับรองผลงานภาครัฐ (ศาลากลางจันทบุรี) & ลิขสิทธิ์แท้ 100%' }
    ],
    image: '/images/products/igenq-poster-1.jpg',
    accentColor: '#2563EB',
    glowColor: 'rgba(37, 99, 235, 0.25)',
    icon: 'Clock',
    link: '/products/igenq'
  },
  {
    id: 4,
    title: 'Spatial 3D Digital Twin Suite',
    category: 'ซอฟต์แวร์อัจฉริยะ',
    desc: 'แพลตฟอร์มจำลองอาคารและคลังสินค้าแบบ 3 มิติ เพื่อการมอนิเตอร์และบริหารจัดการจากระยะไกล',
    detailedDesc: 'เปลี่ยนข้อมูลเซ็นเซอร์และแปลนอาคาร BIM ให้อยู่ในรูปแบบ Digital Twin เสมือนจริงระดับ 60fps ผู้บริหารสามารถตรวจสอบสถานะเครื่องจักร อุณหภูมิ และความปลอดภัยผ่านหน้าจอเว็บเบราว์เซอร์ได้ทันที',
    price: 'แพ็กเกจรายปี',
    tags: ['WebGL', 'Realtime Telemetry', 'BIM Ready'],
    specs: [
      { label: 'เอนจินแสดงผล', value: 'WebGL 2.0 / WebGPU Architecture' },
      { label: 'ความหน่วงการจำลอง', value: 'Synchronous Refresh < 50ms' },
      { label: 'ไฟล์ที่รองรับ', value: 'IFC, Revit, OBJ, GLTF 2.0' },
      { label: 'การเข้าถึง', value: 'Cross-Platform Web Responsive' }
    ],
    image: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=800&q=80',
    accentColor: '#8B5CF6',
    glowColor: 'rgba(139, 92, 246, 0.22)',
    icon: 'Box'
  },
  {
    id: 5,
    title: 'CyberShield Zero-Trust Gateway',
    category: 'ความปลอดภัย & เครือข่าย',
    desc: 'ระบบไฟร์วอลล์และเกตเวย์ความปลอดภัยระดับองค์กร ปกป้องเครือข่ายจากภัยคุกคามทางไซเบอร์',
    detailedDesc: 'เกตเวย์ความปลอดภัยยุคใหม่ที่ออกแบบตามหลักสถาปัตยกรรม Zero-Trust ตรวจสอบและยืนยันตัวตนทุกคำขอเข้าถึงเครือข่าย ป้องกันการโจมตีแบบ Ransomware และตรวจจับพฤติกรรมผิดปกติด้วย AI ตลอด 24 ชม.',
    price: 'เริ่มต้น 18,900 บาท/เดือน',
    tags: ['Zero-Trust', 'AI Firewall', 'DDoS Protection'],
    specs: [
      { label: 'ความสามารถประมวลผล', value: 'Throughput สูงสุด 40 Gbps' },
      { label: 'ระบบยืนยันตัวตน', value: 'MFA, FIDO2, SAML 2.0 Integration' },
      { label: 'การเข้ารหัสข้อมูล', value: 'Post-Quantum Ready TLS 1.3' },
      { label: 'การมอนิเตอร์', value: 'Automated SOC Incident Response' }
    ],
    image: 'https://images.unsplash.com/photo-1563986768609-322da13575f3?auto=format&fit=crop&w=800&q=80',
    accentColor: '#3B82F6',
    glowColor: 'rgba(59, 130, 246, 0.22)',
    icon: 'ShieldCheck'
  },
  {
    id: 6,
    title: 'OmniFlow Enterprise BI & ERP',
    category: 'ซอฟต์แวร์อัจฉริยะ',
    desc: 'ระบบบริหารจัดการทรัพยากรองค์กรและแดชบอร์ดอัจฉริยะ รวมทุกข้อมูลการตัดสินใจไว้ในที่เดียว',
    detailedDesc: 'โซลูชันศูนย์รวมข้อมูลองค์กรยุคใหม่ที่เชื่อมโยงคลังสินค้า บัญชี การขาย และฝ่ายผลิตเข้าด้วยกัน พร้อมระบบ AI Predictive Analytics ที่ช่วยพยากรณ์ยอดขายและแนวโน้มต้นทุนล่วงหน้าอย่างแม่นยำ',
    price: 'โซลูชันตามสเกลองค์กร',
    tags: ['Enterprise BI', 'Predictive AI', 'Full Modular'],
    specs: [
      { label: 'โมดูลระบบ', value: 'Finance, Inventory, HR, CRM, Supply Chain' },
      { label: 'การออกรายงาน', value: 'Automated Executive Briefing & Export' },
      { label: 'ความสามารถขยายระบบ', value: 'Multi-Tenant / High-Availability' },
      { label: 'การติดตั้ง', value: 'On-Premises หรือ Hybrid Private Cloud' }
    ],
    image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=800&q=80',
    accentColor: '#EC4899',
    glowColor: 'rgba(236, 72, 153, 0.22)',
    icon: 'Sparkles'
  }
]

const filteredProducts = computed(() => {
  if (activeCategory.value === 'ทั้งหมด') return products
  return products.filter(p => p.category === activeCategory.value)
})

// Selected Product for Detail Modal
const selectedProduct = ref<ProductItem | null>(null)

const openProductDetail = (product: ProductItem) => {
  selectedProduct.value = product
}

const closeProductDetail = () => {
  selectedProduct.value = null
}

const handleImageError = (e: Event) => {
  const target = e.target as HTMLImageElement
  if (target) {
    // Elegant fallback SVG tech gradient if remote image fails
    target.src = 'data:image/svg+xml;charset=utf-8,%3Csvg xmlns="http://www.w3.org/2000/svg" width="800" height="500" viewBox="0 0 800 500"%3E%3Crect width="800" height="500" fill="%23021e17"/%3E%3Ccircle cx="400" cy="250" r="140" fill="%2300c864" fill-opacity="0.12"/%3E%3Cpath d="M250 350 L400 150 L550 350 Z" stroke="%2300c864" stroke-width="2" fill="none" opacity="0.4"/%3E%3Ctext x="50%25" y="52%25" dominant-baseline="middle" text-anchor="middle" font-family="sans-serif" font-size="20" font-weight="bold" fill="%2300c864"%3EIGENCO ENTERPRISE SOLUTION%3C/text%3E%3C/svg%3E'
  }
}

const inquireProduct = (title: string) => {
  if (import.meta.client) {
    const input = document.getElementById('projectSummaryInput') as HTMLInputElement | null
    if (input) {
      input.value = `สนใจสอบถามข้อมูลสินค้า: ${title}`
    }
    const contactSection = document.getElementById('contact')
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: 'smooth' })
    }
  }
  closeProductDetail()
  showToast(`เลือกสอบถามสินค้า: ${title}`)
}
</script>

<template>
  <section id="products" class="py-24 px-5 sm:px-10 lg:px-16 max-w-[1440px] mx-auto relative z-10">
    
    <!-- Section Title & Filter Tabs -->
    <div class="sticky top-16 sm:top-20 z-20 py-4 bg-[#F6F9F7]/95 dark:bg-[#020806]/95 backdrop-blur-md flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-12 border-b border-current/10 -mx-5 px-5 sm:-mx-10 sm:px-10 lg:-mx-16 lg:px-16 transition-all">
      <div class="reveal-init reveal-left">
        <div class="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-[0.25em] text-[#00C864] dark:text-[#00FF88] mb-2 font-bold">
          <Box class="w-3.5 h-3.5" />
          <span>CATALOG // ผลิตภัณฑ์และบริการ</span>
        </div>
        <h2 class="font-display font-extrabold text-3xl sm:text-5xl uppercase tracking-tight">
          ผลิตภัณฑ์และโซลูชันของเรา
        </h2>
      </div>

      <!-- Categories Filter Tabs (Liquid Glass Capsule Tray) -->
      <div class="flex flex-wrap items-center gap-1.5 p-1.5 rounded-full spatial-glass border border-current/10 reveal-init reveal-right">
        <button
          v-for="cat in categories"
          :key="cat"
          type="button"
          :class="[
            'px-4 py-2 rounded-full text-xs font-semibold transition-all duration-200 select-none cursor-pointer',
            activeCategory === cat
              ? 'bg-[#00C864] text-[#022C22] dark:bg-[#00FF88] dark:text-[#020806] shadow-md font-bold scale-105'
              : 'opacity-70 hover:opacity-100 hover:bg-current/5'
          ]"
          @click="activeCategory = cat"
        >
          {{ cat }}
        </button>
      </div>
    </div>

    <!-- Product Cards Grid: Modern Filterable Cards with Fluid Spring Motion -->
    <div class="relative min-h-[500px]">
      <Transition name="catalog-page" mode="out-in">
        <div
          :key="activeCategory"
          class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8"
        >
          <div
            v-for="(product, idx) in filteredProducts"
            :key="product.id"
            class="product-card spatial-glass rounded-3xl overflow-hidden flex flex-col justify-between group hover:-translate-y-2.5 transition-all duration-300 border border-current/10 relative"
            :style="{
              '--brand-accent': product.accentColor,
              '--brand-glow': product.glowColor
            }"
          >
        <!-- Top Image Frame: Equal Aspect Ratio (16/10) with Clean Border & Ambient Glow -->
        <component
          :is="product.link ? 'NuxtLink' : 'div'"
          :to="product.link"
          class="relative aspect-[16/10] w-full overflow-hidden bg-black/15 border-b border-current/10 block"
        >
          <img
            :src="product.image"
            :alt="product.title"
            :class="[
              'w-full h-full transition-transform duration-700 ease-out',
              product.id === 1
                ? 'object-contain p-4 group-hover:scale-105 bg-gradient-to-br from-purple-950/70 via-purple-900/30 to-black/70'
                : 'object-cover group-hover:scale-108'
            ]"
            loading="lazy"
            @error="handleImageError"
          >
          
          <!-- Category Badge -->
          <div class="absolute top-3.5 left-3.5 z-10">
            <span class="px-3 py-1 rounded-full text-[11px] font-mono font-bold bg-[#022C22]/85 text-white dark:bg-[#051811]/90 backdrop-blur-md border border-white/10 shadow-sm">
              {{ product.category }}
            </span>
          </div>

          <!-- Product Number / Tag Badge -->
          <div class="absolute top-3.5 right-3.5 z-10">
            <span class="px-2.5 py-1 rounded-full text-[10px] font-mono font-bold bg-black/50 text-white/90 backdrop-blur-md">
              0{{ product.id }}
            </span>
          </div>

          <!-- Subtle Brand Accent Border Light -->
          <div 
            class="absolute inset-0 border-2 border-transparent group-hover:border-[var(--brand-accent)] transition-colors duration-400 pointer-events-none rounded-t-3xl"
          />
        </component>

        <!-- Product Info Body -->
        <div class="p-6 flex-1 flex flex-col justify-between space-y-5">
          <div class="space-y-2.5">
            <div class="flex items-center gap-2">
              <span
                class="w-2 h-2 rounded-full"
                :style="{ backgroundColor: product.accentColor }"
              />
              <span class="text-[11px] font-mono uppercase tracking-wider opacity-60">
                ENTERPRISE GRADE
              </span>
            </div>

            <NuxtLink
              v-if="product.link"
              :to="product.link"
              class="block text-xl sm:text-2xl font-bold leading-snug transition-colors duration-300 group-hover:text-[var(--brand-accent)] hover:underline"
            >
              {{ product.title }}
            </NuxtLink>
            <h3 
              v-else
              class="text-xl sm:text-2xl font-bold leading-snug transition-colors duration-300 group-hover:text-[var(--brand-accent)]"
            >
              {{ product.title }}
            </h3>

            <p class="text-xs sm:text-sm opacity-75 line-clamp-3 leading-relaxed">
              {{ product.desc }}
            </p>
          </div>

          <!-- Clean Action Bar: Left-aligned Dual Buttons (ดูรายละเอียด & สอบถามสินค้านี้) -->
          <div class="pt-4 border-t border-current/10">
            <div class="flex flex-wrap items-center justify-start gap-2.5">
              <!-- 1. ปุ่มดูรายละเอียด (View Details) -> ถ้ามี link ให้เข้าหน้าแยกทันที -->
              <NuxtLink
                v-if="product.link"
                :to="product.link"
                class="px-4 py-2 rounded-xl text-xs font-bold spatial-glass hover:bg-current/10 active:scale-95 transition-all flex items-center justify-center gap-1.5 border border-current/15 hover:border-[var(--brand-accent)] text-[var(--brand-accent)] shadow-sm"
              >
                <Info class="w-3.5 h-3.5 opacity-90" />
                <span>ดูรายละเอียด</span>
                <ArrowUpRight class="w-3 h-3 ml-0.5" />
              </NuxtLink>
              <button
                v-else
                type="button"
                class="px-4 py-2 rounded-xl text-xs font-semibold spatial-glass hover:bg-current/10 active:scale-95 transition-all flex items-center justify-center gap-1.5 border border-current/15 hover:border-current/30 shadow-sm cursor-pointer"
                @click="openProductDetail(product)"
              >
                <Info class="w-3.5 h-3.5 opacity-75" />
                <span>ดูรายละเอียด</span>
              </button>

              <!-- 2. ปุ่มสอบถามสินค้านี้ (Inquire Product) -->
              <button
                type="button"
                class="px-4 py-2 rounded-xl text-xs font-bold bg-[#00C864] text-[#022C22] dark:bg-[#00FF88] dark:text-[#020806] hover:opacity-90 active:scale-95 transition-all flex items-center justify-center gap-1.5 shadow-md hover:shadow-lg hover:scale-105 cursor-pointer"
                @click="inquireProduct(product.title)"
              >
                <span>สอบถามสินค้านี้</span>
                <ArrowUpRight class="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>
          </div>
        </div>
      </Transition>
    </div>

    <!-- Product Detail Modal Drawer -->
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
          v-if="selectedProduct"
          class="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/60 backdrop-blur-md"
          role="dialog"
          aria-modal="true"
          @click.self="closeProductDetail"
        >
          <div
            class="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto spatial-glass rounded-3xl p-6 sm:p-8 border border-white/20 shadow-2xl custom-modal-scrollbar"
            :style="{
              boxShadow: `0 24px 60px ${selectedProduct.glowColor}`
            }"
          >
            <!-- Close Button -->
            <button
              type="button"
              class="absolute top-5 right-5 w-9 h-9 rounded-full bg-current/10 hover:bg-current/20 flex items-center justify-center transition-all"
              @click="closeProductDetail"
            >
              <X class="w-5 h-5" />
            </button>

            <!-- Modal Header -->
            <div class="flex items-center gap-3 mb-4">
              <span
                class="px-3 py-1 rounded-full text-xs font-mono font-bold text-white"
                :style="{ backgroundColor: selectedProduct.accentColor }"
              >
                {{ selectedProduct.category }}
              </span>
              <span class="text-xs font-mono opacity-60">
                PROD-ID // 0{{ selectedProduct.id }}
              </span>
            </div>

            <h3 class="text-2xl sm:text-3xl font-display font-extrabold mb-3">
              {{ selectedProduct.title }}
            </h3>

            <!-- Product Image Preview -->
            <div class="relative aspect-[16/9] w-full rounded-2xl overflow-hidden mb-6 bg-black/20 border border-current/10">
              <img
                :src="selectedProduct.image"
                :alt="selectedProduct.title"
                class="w-full h-full object-cover"
                @error="handleImageError"
              >
            </div>

            <!-- Detailed Description -->
            <div class="mb-6 space-y-2">
              <h4 class="text-xs font-mono uppercase tracking-wider font-bold text-[#00C864] dark:text-[#00FF88]">
                ข้อมูลผลิตภัณฑ์และจุดเด่น (PRODUCT OVERVIEW)
              </h4>
              <p class="text-sm sm:text-base opacity-90 leading-relaxed">
                {{ selectedProduct.detailedDesc }}
              </p>
            </div>

            <!-- Specifications Table -->
            <div class="mb-6 space-y-3">
              <h4 class="text-xs font-mono uppercase tracking-wider font-bold text-[#00C864] dark:text-[#00FF88]">
                ข้อมูลจำเพาะทางเทคนิค (SPECIFICATIONS)
              </h4>
              <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div
                  v-for="spec in selectedProduct.specs"
                  :key="spec.label"
                  class="p-3.5 rounded-xl bg-current/5 border border-current/10 space-y-1"
                >
                  <div class="text-[11px] font-mono opacity-60">
                    {{ spec.label }}
                  </div>
                  <div class="text-xs sm:text-sm font-semibold flex items-center gap-1.5">
                    <CheckCircle2 class="w-3.5 h-3.5 text-[#00C864] dark:text-[#00FF88] flex-shrink-0" />
                    <span>{{ spec.value }}</span>
                  </div>
                </div>
              </div>
            </div>

            <!-- Tags -->
            <div class="flex flex-wrap gap-2 mb-8">
              <span
                v-for="tag in selectedProduct.tags"
                :key="tag"
                class="px-3 py-1 rounded-lg text-xs font-mono bg-current/5 border border-current/10"
              >
                # {{ tag }}
              </span>
            </div>

            <!-- Modal Action Buttons -->
            <div class="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 border-t border-current/10">
              <div class="text-sm font-mono font-bold text-[#00C864] dark:text-[#00FF88]">
                ราคา / ค่าบริการ: {{ selectedProduct.price }}
              </div>
              <div class="flex flex-wrap items-center gap-2.5 w-full sm:w-auto">
                <NuxtLink
                  v-if="selectedProduct.id === 1"
                  to="/news/6"
                  class="flex-1 sm:flex-none px-4 py-2.5 rounded-xl text-xs font-bold bg-purple-600 hover:bg-purple-700 text-white transition-all flex items-center justify-center gap-1.5 shadow-md hover:scale-105 active:scale-95"
                >
                  <span>ดูหน้าแนะนำระบบฉบับเต็ม</span>
                  <ArrowUpRight class="w-3.5 h-3.5" />
                </NuxtLink>
                <button
                  type="button"
                  class="flex-1 sm:flex-none px-4 py-2.5 rounded-xl text-xs font-semibold spatial-glass hover:bg-current/10 transition-all"
                  @click="closeProductDetail"
                >
                  ปิดหน้าต่าง
                </button>
                <button
                  type="button"
                  class="flex-1 sm:flex-none px-5 py-2.5 rounded-xl text-xs font-bold bg-[#00C864] text-[#022C22] dark:bg-[#00FF88] dark:text-[#020806] hover:opacity-90 active:scale-95 transition-all flex items-center justify-center gap-2 shadow-lg hover:shadow-[0_8px_24px_rgba(0,200,100,0.3)]"
                  @click="inquireProduct(selectedProduct.title)"
                >
                  <span>สอบถามสินค้านี้</span>
                  <ArrowUpRight class="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </Transition>
    </Teleport>
  </section>
</template>

<style scoped>
.product-card:hover {
  box-shadow: 0 20px 40px var(--brand-glow);
  border-color: var(--brand-accent);
}

/* Fluid Transition for Category Switching */
.catalog-page-enter-active,
.catalog-page-leave-active {
  transition: opacity 0.2s ease-out, transform 0.2s cubic-bezier(0.22, 1, 0.36, 1);
}
.catalog-page-enter-from {
  opacity: 0;
  transform: translateY(12px) scale(0.99);
}
.catalog-page-leave-to {
  opacity: 0;
  transform: translateY(-8px) scale(0.99);
}
</style>
