<script setup lang="ts">
import { ref, computed } from 'vue'
import {
  ArrowUpRight,
  Box,
  Info,
  X,
  CheckCircle2,
  Cpu,
  ShieldCheck,
  Zap,
  Sparkles,
  Clock,
  Users,
  Smartphone,
  Building2,
  Store
} from 'lucide-vue-next'
import { useTheme } from '~/composables/useTheme'

const { showToast } = useTheme()

const activeCategory = ref('ทั้งหมด')
const categories = ['ทั้งหมด', 'Enterprise Software', 'Service Development', 'E-Commerce']

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
    category: 'Enterprise Software',
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
    category: 'Enterprise Software',
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
    category: 'Enterprise Software',
    desc: 'ระบบจัดการคิวแบบ New Normal แจ้งเตือนผ่าน LINE ไม่ต้องยืนรอ มีหนังสือรับรองผลงานจากศาลากลางจันทบุรี ซอฟต์แวร์คนไทย 100%',
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
    title: 'Software OnDemand (บริการพัฒนาซอฟต์แวร์ตามสั่ง)',
    category: 'Service Development',
    desc: 'บริการออกแบบและพัฒนาซอฟต์แวร์ตามความต้องการเฉพาะขององค์กร พัฒนาระบบให้ตอบโจทย์กระบวนการทำงานจริง รองรับ Web, Mobile และ Cloud',
    detailedDesc: 'บริการพัฒนาซอฟต์แวร์แบบครบวงจร (Turnkey Custom Software Development) โดยทีมวิศวกรซอฟต์แวร์มืออาชีพของ บริษัท ไอเจนโก้ จำกัด ที่มีประสบการณ์กว่า 12 ปี วิเคราะห์กระบวนการทำงาน ออกแบบสถาปัตยกรรมระบบที่ปลอดภัยและขยายตัวได้ง่ายตามมาตรฐาน ISO/IEC 29110 พร้อมส่งมอบระบบที่ตรงตามโจทย์ธุรกิจ',
    price: 'ปรึกษาและประเมินโครงการ',
    tags: ['Custom Software', 'Web & Mobile', 'Cloud Architecture', 'ISO/IEC 29110'],
    specs: [
      { label: 'รูปแบบการพัฒนา', value: 'Tailor-Made ตามความต้องการและ Workflow องค์กร' },
      { label: 'สถาปัตยกรรมระบบ', value: 'Cloud-Native, Microservices หรือ Monolith Secure' },
      { label: 'แพลตฟอร์มที่รองรับ', value: 'Web Application, Mobile App (iOS/Android), API Gateway' },
      { label: 'มาตรฐานคุณภาพ', value: 'ควบคุมคุณภาพตามมาตรฐานสากล ISO/IEC 29110' }
    ],
    image: '/images/products/software-ondemand.svg',
    accentColor: '#00C864',
    glowColor: 'rgba(0, 200, 100, 0.25)',
    icon: 'Cpu'
  },
  {
    id: 5,
    title: 'OutSource Service (บริการจัดหาทีมงานไอที)',
    category: 'Service Development',
    desc: 'บริการจัดส่งโปรแกรมเมอร์และทีมผู้เชี่ยวชาญด้าน IT เข้าปฏิบัติงานร่วมกับองค์กร ทั้งแบบ On-Site และ Remote Dedicated Team',
    detailedDesc: 'เพิ่มศักยภาพและเร่งสปีดโครงการเทคโนโลยีขององค์กรอย่างไร้รอยต่อ IGENCO มีบริการจัดหาบุคลากรไอทีคุณภาพสูง อาทิ Frontend/Backend Developers, Mobile Engineers, System Analysts, QA Testers และ Project Managers เข้าเสริมทัพทีมงานของท่านได้ทันที พร้อม Technical Lead คอยกำกับดูแลคุณภาพงานอย่างต่อเนื่อง',
    price: 'รายเดือนตามขนาดทีม (Dedicated Service)',
    tags: ['IT Outsourcing', 'Dedicated Team', 'On-Site & Remote', 'Senior Engineers'],
    specs: [
      { label: 'บุคลากรที่ให้บริการ', value: 'Full-Stack Developers, Mobile, QA, SA, Data, PM' },
      { label: 'รูปแบบการปฏิบัติงาน', value: 'On-Site ประจำองค์กรลูกค้า หรือ Remote Dedicated' },
      { label: 'การการันตีบุคลากร', value: 'คัดกรองทักษะเข้มข้น และสลับเปลี่ยนคนได้ตามเงื่อนไข' },
      { label: 'ความยืดหยุ่นสัญญา', value: 'สัญญารายเดือน/รายปี ปรับขยายทีมได้ตามเฟสของโครงการ' }
    ],
    image: '/images/products/outsource-service.svg',
    accentColor: '#3B82F6',
    glowColor: 'rgba(59, 130, 246, 0.25)',
    icon: 'Users'
  },
  {
    id: 6,
    title: 'iMme Application (แอปพลิเคชันระบบสั่งซื้อสินค้า)',
    category: 'E-Commerce',
    desc: 'แพลตฟอร์มแอปพลิเคชันสั่งซื้อสินค้าและบริการบนสมาร์ทโฟน เชื่อมต่อระบบชำระเงิน e-Payment และระบบสมาชิก Loyalty Program ครบวงจร',
    detailedDesc: 'iMme Application โซลูชัน Mobile Commerce อัจฉริยะที่ช่วยให้แบรนด์และร้านค้าเชื่อมต่อกับลูกค้าได้โดยตรง รองรับการเลือกชมสินค้า สั่งซื้อ ชำระเงินผ่าน PromptPay QR และบัตรเครดิต พร้อมระบบสะสมคะแนน คูปองส่วนลด และการแจ้งเตือนสถานะการจัดส่งแบบเรียลไทม์',
    price: 'พร้อมใช้งานและปรับแต่งตามแบรนด์',
    tags: ['Mobile Commerce', 'e-Payment Ready', 'Loyalty System', 'iOS & Android'],
    specs: [
      { label: 'แพลตฟอร์ม', value: 'iOS, Android และ Progressive Web App (PWA)' },
      { label: 'ระบบชำระเงิน', value: 'PromptPay QR, Payment Gateway, Credit/Debit' },
      { label: 'ระบบ CRM ลูกค้า', value: 'Loyalty Points, Member Tier, Discount Coupons' },
      { label: 'การบริหารจัดการ', value: 'Admin Web Dashboard จัดการออเดอร์และสินค้า' }
    ],
    image: '/images/products/imme-application.svg',
    accentColor: '#F59E0B',
    glowColor: 'rgba(245, 158, 11, 0.25)',
    icon: 'Smartphone'
  },
  {
    id: 7,
    title: 'i-RealEstate (ระบบบริหารธุรกิจอสังหาริมทรัพย์)',
    category: 'E-Commerce',
    desc: 'ระบบบริหารจัดการงานขาย การจอง และข้อมูลโครงการอสังหาริมทรัพย์ ทั้งคอนโดมิเนียม โครงการบ้านจัดสรร และอาคารพาณิชย์',
    detailedDesc: 'i-RealEstate ซอฟต์แวร์บริหารจัดการธุรกิจอสังหาริมทรัพย์แบบครบวงจร ครอบคลุมการแสดงผังโครงการแบบ Interactive แปลง/ยูนิตว่าง การจองออนไลน์ การทำสัญญา การติดตามงวดผ่อนดาวน์ และระบบ CRM ติดตามลูกค้าผู้สนใจ ช่วยให้ทีมขายปิดการขายได้รวดเร็วและผู้บริหารเห็นภาพรวมยอดขายทันที',
    price: 'แพ็กเกจโครงการ / Subscription',
    tags: ['Real Estate CRM', 'Unit Layout Masterplan', 'Online Booking', 'Down Payment'],
    specs: [
      { label: 'ฟังก์ชันหลัก', value: 'ผังโครงการ Interactive, จองออนไลน์, สัญญาจะซื้อจะขาย' },
      { label: 'ระบบการเงิน', value: 'ตารางผ่อนดาวน์, ใบแจ้งหนี้, ใบเสร็จรับเงินดิจิทัล' },
      { label: 'ระบบบริหารลูกค้า', value: 'Sales CRM, Lead Funnel, บันทึกประวัติการติดต่อ' },
      { label: 'แดชบอร์ดรายงาน', value: 'สรุปยอดขาย Realtime, อัตราการโอน, วิเคราะห์สต็อกยูนิต' }
    ],
    image: '/images/products/i-realestate.svg',
    accentColor: '#8B5CF6',
    glowColor: 'rgba(139, 92, 246, 0.25)',
    icon: 'Building2'
  },
  {
    id: 8,
    title: 'iPOS (ระบบบริหารจุดขายและการจัดการร้านค้า)',
    category: 'E-Commerce',
    desc: 'ระบบ Point of Sale อัจฉริยะสำหรับร้านค้าและธุรกิจค้าปลีก รองรับการขายหน้าร้าน ตัดสต็อกอัตโนมัติ และดูยอดขายได้ทุกที่ทุกเวลา',
    detailedDesc: 'iPOS ระบบคิดเงินหน้าร้านและบริหารสต็อกสินค้าที่พัฒนาขึ้นเพื่อตอบโจทย์ผู้ประกอบการยุคดิจิทัล รองรับการใช้งานบนคอมพิวเตอร์ แท็บเล็ต และอุปกรณ์ POS Touch Screen เชื่อมต่อลิ้นชักเก็บเงิน เครื่องพิมพ์ใบเสร็จ และบาร์โค้ดสแกนเนอร์ ตัดสต็อกอัตโนมัติทันที และมีแดชบอร์ดสรุปยอดขายรายวันและรายสาขา',
    price: 'พร้อมใช้งานเริ่มต้น / รายเดือน-รายปี',
    tags: ['Smart POS', 'Auto Stock', 'Barcode Ready', 'Multi-Store Report'],
    specs: [
      { label: 'อุปกรณ์ที่รองรับ', value: 'PC Windows, iPad/Tablet, Android POS, Touch Screen' },
      { label: 'ฮาร์ดแวร์ต่อพ่วง', value: 'เครื่องพิมพ์ใบเสร็จ Thermal, ลิ้นชักเก็บเงิน, สแกนเนอร์' },
      { label: 'การตัดสต็อก', value: 'ตัดสต็อกสินค้าทันที, แจ้งเตือนสินค้าใกล้หมด' },
      { label: 'รายงานยอดขาย', value: 'สรุปยอดขายเรียลไทม์, สินค้าขายดี, กำไรเบื้องต้น' }
    ],
    image: '/images/products/ipos.svg',
    accentColor: '#EC4899',
    glowColor: 'rgba(236, 72, 153, 0.25)',
    icon: 'Store'
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
