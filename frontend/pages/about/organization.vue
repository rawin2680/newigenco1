<script setup lang="ts">
import { ref, reactive, computed, onMounted, onBeforeUnmount } from 'vue'
import AppHeader from '~/components/AppHeader.vue'
import ContactFooter from '~/components/ContactFooter.vue'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import {
  Users,
  UserCheck,
  Briefcase,
  Award,
  ShieldCheck,
  ArrowLeft,
  ArrowUpRight,
  Cpu,
  Laptop,
  ShoppingCart,
  Calculator,
  Megaphone,
  TrendingUp,
  Network,
  Server,
  Layers,
  ZoomIn,
  ZoomOut,
  RotateCcw,
  Maximize2,
  Minimize2,
  ChevronDown,
  ChevronUp,
  ChevronRight,
  CheckCircle2,
  Sparkles,
  Building2,
  Move,
  Info,
  X
} from 'lucide-vue-next'

useHead({
  title: 'แผนผังการบริหาร (Interactive Org Chart) - บริษัท ไอเจนโก้ จำกัด (IGENCO)',
  meta: [
    {
      name: 'description',
      content: 'แผนผังและโครงสร้างการบริหารงานแบบอินเทอร์แอคทีฟ บริษัท ไอเจนโก้ จำกัด (IGENCO) โครงสร้างคล่องตัวและได้มาตรฐานสากล ISO/IEC 29110'
    }
  ]
})

interface DepartmentNode {
  id: string
  name: string
  en: string
  icon: any
  desc?: string
  image?: string
  responsibilities?: string[]
}

interface DivisionNode {
  id: string
  title: string
  en: string
  color: string
  icon: any
  image?: string
  isCollapsed: boolean
  desc: string
  departments: DepartmentNode[]
}

// Executive Leadership Data
const ceoNode = {
  id: 'ceo',
  title: 'กรรมการผู้จัดการบริษัท',
  en: 'Managing Director (CEO)',
  role: 'Executive Leadership',
  image: '/images/about/ceo-avatar.jpg',
  desc: 'กำหนดทิศทางยุทธศาสตร์ นโยบายคุณภาพ การลงทุน และการกำกับดูแลการดำเนินงานให้เป็นไปตามหลักธรรมาภิบาลและมาตรฐานสากล',
  responsibilities: [
    'กำหนดยุทธศาสตร์และเป้าหมายการดำเนินธุรกิจระยะยาว',
    'ควบคุมนโยบายคุณภาพตามมาตรฐานสากล ISO/IEC 29110',
    'ประสานงานพันธมิตรภาครัฐและเอกชนระดับประเทศ (BOI, depa, Software Park)',
    'กำกับดูแลการบริหารจัดการองค์กรภายใต้หลักธรรมาภิบาล'
  ]
}

const divisions = ref<DivisionNode[]>([
  {
    id: 'admin',
    title: 'รองกรรมการสายบริหาร',
    en: 'Deputy Managing Director - Administration',
    color: '#00C864',
    icon: Briefcase,
    image: '/images/about/deputy-md-admin-avatar.jpg',
    isCollapsed: false,
    desc: 'กำกับดูแลงานสนับสนุนองค์กร ทรัพยากรบุคคล การเงิน บัญชี และการจัดซื้อพัสดุ',
    departments: [
      {
        id: 'hr',
        name: 'ฝ่ายบุคคล',
        en: 'Human Resources (HR)',
        icon: Users,
        image: '/images/about/hr-avatar.jpg',
        desc: 'สรรหา พัฒนา และดูแลสวัสดิการของบุคลากรในองค์กร',
        responsibilities: [
          'วางแผนอัตรากำลังและสรรหาบุคลากรด้านเทคโนโลยี',
          'จัดโปรแกรมฝึกอบรมและพัฒนาทักษะวิชาชีพ',
          'ดูแลสิทธิประโยชน์ สวัสดิการ และสิ่งแวดล้อมการทำงานแบบ Small & Smart'
        ]
      },
      {
        id: 'gm',
        name: 'ฝ่ายผู้จัดการทั่วไป',
        en: 'General Management',
        icon: UserCheck,
        image: '/images/about/general-management-avatar.jpg',
        desc: 'กำกับดูแลการปฏิบัติการทั่วไปและสนับสนุนงานบริหาร',
        responsibilities: [
          'ประสานงานระหว่างสายงานและติดตามผลการดำเนินงาน',
          'ดูแลงานธุรการ งานสารบรรณ และระเบียบปฏิบัติองค์กร',
          'สนับสนุนทรัพยากรสำหรับการดำเนินโครงการต่าง ๆ'
        ]
      },
      {
        id: 'procurement',
        name: 'ฝ่ายจัดซื้อ - คลัง',
        en: 'Procurement & Inventory',
        icon: ShoppingCart,
        image: '/images/about/procurement-inventory-avatar.jpg',
        desc: 'บริหารจัดการการจัดซื้อ อุปกรณ์ และคลังพัสดุระบบ',
        responsibilities: [
          'จัดหาอุปกรณ์ฮาร์ดแวร์และลิขสิทธิ์ซอฟต์แวร์มาตรฐาน',
          'ควบคุมระบบสต็อกและคลังพัสดุโครงการ',
          'ประเมินและคัดเลือกคู่ค้าพันธมิตรที่มีคุณภาพ'
        ]
      },
      {
        id: 'accounting',
        name: 'ฝ่ายบัญชี - การเงิน',
        en: 'Accounting & Finance',
        icon: Calculator,
        // ข้อความคำบรรยายบนการ์ดถูกลบตามคำขอผู้ใช้ คงไว้เฉพาะชื่อและข้อมูลหน้าที่
        desc: '',
        image: '/images/about/accounting-finance-avatar.jpg',
        responsibilities: [
          'จัดทำบัญชีการเงินและรายงานภาษีตามมาตรฐาน',
          'บริหารจัดการกระแสเงินสดและงบประมาณโครงการ',
          'ประสานงานการตรวจสอบบัญชีกับหน่วยงานกำกับดูแล'
        ]
      }
    ]
  },
  {
    id: 'sales',
    title: 'รองกรรมการสายการขายและการตลาด',
    en: 'Deputy Managing Director - Sales & Marketing',
    color: '#00A852',
    icon: TrendingUp,
    isCollapsed: false,
    desc: 'ขับเคลื่อนกลยุทธ์การตลาด การขยายฐานลูกค้าภาครัฐและเอกชน และสร้างความสัมพันธ์ระยะยาว',
    departments: [
      {
        id: 'marketing',
        name: 'ฝ่ายการตลาด',
        en: 'Marketing Division',
        icon: Megaphone,
        desc: 'วางแผนกลยุทธ์การตลาด สื่อสารแบรนด์ และวิเคราะห์ตลาด',
        responsibilities: [
          'สื่อสารภาพลักษณ์แบรนด์โซลูชัน IGENCO',
          'วิเคราะห์แนวโน้มตลาดเทคโนโลยีและความต้องการของลูกค้า',
          'จัดทำสื่อประชาสัมพันธ์และจัดแสดงนิทรรศการเทคโนโลยี'
        ]
      },
      {
        id: 'sales-dept',
        name: 'ฝ่ายการขาย',
        en: 'Sales Division',
        icon: TrendingUp,
        desc: 'ประสานงานลูกค้าภาครัฐ-เอกชน และนำเสนอโซลูชันซอฟต์แวร์',
        responsibilities: [
          'ดูแลความต้องการและให้คำปรึกษาแก่ลูกค้าภาครัฐและเอกชน',
          'จัดทำข้อเสนอโครงการและประสานงานการสาธิตระบบ',
          'ติดตามการส่งมอบผลงานและการตรวจรับงานอย่างราบรื่น'
        ]
      },
      {
        id: 'promotion',
        name: 'ฝ่ายส่งเสริมการขาย',
        en: 'Sales Promotion',
        icon: Award,
        desc: 'จัดแคมเปญ ส่งเสริมการขาย และสร้างความสัมพันธ์ลูกค้าระยะยาว',
        responsibilities: [
          'วางแผนแพ็กเกจโซลูชันและสิทธิประโยชน์สำหรับลูกค้าองค์กร',
          'สำรวจความพึงพอใจและดูแลบริการหลังการขาย',
          'สร้างเครือข่ายพันธมิตรทางธุรกิจร่วมกับคู่ค้า'
        ]
      }
    ]
  },
  {
    id: 'tech',
    title: 'รองกรรมการสายสารสนเทศ',
    en: 'Deputy Managing Director - Information Technology',
    color: '#00D26A',
    icon: Cpu,
    isCollapsed: false,
    desc: 'ผู้นำด้านวิศวกรรมซอฟต์แวร์ การวิจัยและพัฒนาระบบ Web Application และโครงสร้างพื้นฐานไอที',
    departments: [
      {
        id: 'biz-app',
        name: 'Business Application',
        en: 'ระบบงานธุรกิจระดับองค์กร',
        icon: Laptop,
        desc: 'วิจัยและพัฒนา Web Application สำเร็จรูปแบรนด์ IGENCO',
        responsibilities: [
          'ออกแบบและพัฒนาซอฟต์แวร์ e-Office และ ERP เฉพาะองค์กร',
          'พัฒนาระบบ i-SMARTSOFT, I-SERFF และ EFMS',
          'ควบคุมกระบวนการวิศวกรรมซอฟต์แวร์ตามมาตรฐาน ISO/IEC 29110'
        ]
      },
      {
        id: 'inno-app',
        name: 'Innovation Application',
        en: 'นวัตกรรมซอฟต์แวร์ประยุกต์',
        icon: Layers,
        desc: 'สร้างสรรค์นวัตกรรมระบบงานใหม่ ๆ เพื่อตอบโจทย์ยุคดิจิทัล',
        responsibilities: [
          'วิจัยเทคโนโลยี AI, Automation และ Cloud Application',
          'พัฒนาต้นแบบโซลูชันนวัตกรรมใหม่ (Proof of Concept)',
          'ทดสอบและปรับปรุงประสิทธิภาพระบบเพื่อรองรับการขยายตัว'
        ]
      },
      {
        id: 'net-mkt',
        name: 'Internet Marketing',
        en: 'การตลาดดิจิทัลและออนไลน์',
        icon: Network,
        desc: 'บริหารช่องทางออนไลน์ การเชื่อมต่อ และบริการดิจิทัล',
        responsibilities: [
          'บริหารจัดการแพลตฟอร์มออนไลน์และเว็บไซต์ขององค์กร',
          'ดูแลระบบการเชื่อมต่อข้อมูลและบริการดิจิทัลสาธารณะ',
          'วิเคราะห์ข้อมูลการเข้าชมและประสบการณ์ผู้ใช้งาน (UX/UI)'
        ]
      },
      {
        id: 'hardware-sec',
        name: 'Hardware & Surveillance',
        en: 'ฮาร์ดแวร์และความปลอดภัย',
        icon: Server,
        desc: 'ดูแลระบบโครงสร้างพื้นฐาน แม่ข่าย และอุปกรณ์ความปลอดภัย',
        responsibilities: [
          'วางระบบคอมพิวเตอร์แม่ข่าย (Server) และระบบเครือข่ายความปลอดภัยสูง',
          'ดูแลระบบกล้องวงจรปิด ระบบความปลอดภัยทางกายภาพ และ Cloud Data Center',
          'เฝ้าระวังความเสี่ยงทางไซเบอร์และการสำรองข้อมูลตามมาตรฐาน'
        ]
      }
    ]
  }
])

// ==========================================
// INTERACTIVE CANVAS (PAN & ZOOM CONTROLS)
// ==========================================
const canvasViewportRef = ref<HTMLElement | null>(null)
const scale = ref(1)
const pan = reactive({ x: 0, y: 0 })
const isDragging = ref(false)
const dragStart = reactive({ x: 0, y: 0 })
const isFullscreen = ref(false)
const viewMode = ref<'diagram' | 'list'>('diagram')

const zoomIn = () => {
  scale.value = Math.min(1.6, Number((scale.value + 0.15).toFixed(2)))
}

const zoomOut = () => {
  scale.value = Math.max(0.65, Number((scale.value - 0.15).toFixed(2)))
}

const resetView = () => {
  scale.value = 1
  pan.x = 0
  pan.y = 0
}

const toggleFullscreen = () => {
  isFullscreen.value = !isFullscreen.value
  if (!isFullscreen.value) {
    resetView()
  }
}

// Mouse Drag / Pan handlers
const onMouseDown = (e: MouseEvent) => {
  // Only drag on left mouse button and not on interactive buttons
  if (e.button !== 0) return
  const target = e.target as HTMLElement
  if (target.closest('button') || target.closest('.no-drag')) return

  isDragging.value = true
  dragStart.x = e.clientX - pan.x
  dragStart.y = e.clientY - pan.y
}

const onMouseMove = (e: MouseEvent) => {
  if (!isDragging.value) return
  pan.x = e.clientX - dragStart.x
  pan.y = e.clientY - dragStart.y
}

const onMouseUp = () => {
  isDragging.value = false
}

// Mouse Wheel Zoom
const onWheel = (e: WheelEvent) => {
  if (e.ctrlKey || e.metaKey || isFullscreen.value) {
    e.preventDefault()
    const zoomDelta = e.deltaY < 0 ? 0.08 : -0.08
    scale.value = Math.min(1.6, Math.max(0.65, Number((scale.value + zoomDelta).toFixed(2))))
  }
}

// Branch Collapse/Expand
const toggleDivision = (divId: string) => {
  const div = divisions.value.find((d) => d.id === divId)
  if (div) {
    div.isCollapsed = !div.isCollapsed
  }
}

const expandAll = () => {
  divisions.value.forEach((d) => (d.isCollapsed = false))
}

const collapseAll = () => {
  divisions.value.forEach((d) => (d.isCollapsed = true))
}

const isAllCollapsed = computed(() => divisions.value.every((d) => d.isCollapsed))

// Detail Modal
const selectedNode = ref<any | null>(null)
const isDetailModalOpen = ref(false)

const openDetail = (node: any, divisionTitle?: string) => {
  selectedNode.value = {
    ...node,
    divisionTitle: divisionTitle || ''
  }
  isDetailModalOpen.value = true
}

const closeDetail = () => {
  isDetailModalOpen.value = false
  selectedNode.value = null
}

// GSAP Entrance Reveal
const sectionRef = ref<HTMLElement | null>(null)
let ctx: gsap.Context | null = null

onMounted(() => {
  if (import.meta.client && sectionRef.value) {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    if (!prefersReducedMotion) {
      gsap.registerPlugin(ScrollTrigger)
      ctx = gsap.context(() => {
        // Smooth entrance reveal for diagram section
        gsap.from('.org-diagram-viewport', {
          scrollTrigger: {
            trigger: '.org-diagram-viewport',
            start: 'top 85%'
          },
          opacity: 0,
          y: 25,
          duration: 0.7,
          ease: 'power2.out',
          clearProps: 'all'
        })
      }, sectionRef.value)
    }
  }
})

onBeforeUnmount(() => {
  if (ctx) ctx.revert()
})
</script>

<template>
  <div
    ref="sectionRef"
    class="min-h-screen bg-[#FBFDFB] dark:bg-[#030906] text-[#0F172A] dark:text-[#F1F5F9] transition-colors selection:bg-[#00C864] selection:text-[#022C22]"
  >
    <AppHeader />

    <main class="pt-28 pb-24 max-w-[1360px] mx-auto px-5 sm:px-10 lg:px-16">
      <!-- Breadcrumb -->
      <div class="flex items-center gap-2 text-xs font-mono mb-10 opacity-70">
        <NuxtLink to="/" class="hover:text-[#00A852] dark:hover:text-[#00FF88] flex items-center gap-1">
          <ArrowLeft class="w-3.5 h-3.5" />
          <span>หน้าแรก</span>
        </NuxtLink>
        <span>/</span>
        <NuxtLink to="/about" class="hover:text-[#00A852] dark:hover:text-[#00FF88]">เกี่ยวกับเรา</NuxtLink>
        <span>/</span>
        <span class="text-[#00A852] dark:text-[#00FF88] font-bold">แผนผังการบริหาร</span>
      </div>

      <!-- Header Section -->
      <div class="pb-12 border-b border-black/10 dark:border-white/10 space-y-5 max-w-4xl">
        <div class="inline-flex items-center gap-2 text-xs font-mono font-bold tracking-[0.22em] uppercase text-[#00A852] dark:text-[#00FF88]">
          <Users class="w-4 h-4" />
          <span>ORGANIZATION TREE // แผนผังโครงสร้างการบริหาร</span>
        </div>
        <h1 class="text-3xl sm:text-5xl lg:text-6xl font-display font-extrabold tracking-tight text-[#0A1A12] dark:text-[#F8FAFC] leading-[1.15]">
          แผนผังการบริหารแบบอินเทอร์แอคทีฟ
        </h1>
        <p class="text-lg sm:text-xl text-[#334155] dark:text-[#94A3B8] leading-relaxed font-light">
          โครงสร้างองค์กรยุคใหม่ที่สามารถซูม ลากเลื่อน ย่อ-ขยายสายงาน และคลิกดูรายละเอียดหน้าที่ของแต่ละฝ่ายได้อย่างสะดวกและแม่นยำ
        </p>
      </div>

      <!-- ========================================================
           INTERACTIVE TOOLBAR CONTROLS (PAN, ZOOM, COLLAPSE, VIEW)
      ========================================================= -->
      <div class="py-6 flex flex-wrap items-center justify-between gap-4 border-b border-black/10 dark:border-white/10 text-xs font-mono">
        <!-- Left: View Mode Switches -->
        <div class="flex items-center p-1 rounded-2xl bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10">
          <button
            @click="viewMode = 'diagram'"
            :class="[
              'px-4 py-2 rounded-xl font-bold transition-all cursor-pointer flex items-center gap-1.5',
              viewMode === 'diagram'
                ? 'bg-[#00C864] text-white shadow-md'
                : 'text-current opacity-70 hover:opacity-100'
            ]"
          >
            <Layers class="w-3.5 h-3.5" />
            <span>แผนผังอินเทอร์แอคทีฟ (Interactive Tree)</span>
          </button>
          <button
            @click="viewMode = 'list'"
            :class="[
              'px-4 py-2 rounded-xl font-bold transition-all cursor-pointer flex items-center gap-1.5',
              viewMode === 'list'
                ? 'bg-[#00C864] text-white shadow-md'
                : 'text-current opacity-70 hover:opacity-100'
            ]"
          >
            <Building2 class="w-3.5 h-3.5" />
            <span>มุมมองรายการ (List Grid)</span>
          </button>
        </div>

        <!-- Right: Zoom & Branch Actions -->
        <div class="flex items-center gap-2">
          <!-- Expand / Collapse All -->
          <button
            @click="isAllCollapsed ? expandAll() : collapseAll()"
            class="px-3.5 py-2 rounded-xl border border-black/10 dark:border-white/10 bg-white/60 dark:bg-white/[0.02] hover:border-[#00C864] text-current transition-all flex items-center gap-1.5 cursor-pointer"
          >
            <component :is="isAllCollapsed ? ChevronDown : ChevronUp" class="w-3.5 h-3.5 text-[#00A852] dark:text-[#00FF88]" />
            <span>{{ isAllCollapsed ? 'ขยายทุกสายงาน' : 'ย่อทุกสายงาน' }}</span>
          </button>

          <!-- Zoom In / Out / Reset (Only for diagram mode) -->
          <div v-if="viewMode === 'diagram'" class="flex items-center rounded-xl border border-black/10 dark:border-white/10 bg-white/60 dark:bg-white/[0.02] p-0.5">
            <button
              @click="zoomOut"
              title="ซูมออก (-)"
              class="p-2 hover:bg-black/5 dark:hover:bg-white/10 rounded-lg text-current transition-colors cursor-pointer"
            >
              <ZoomOut class="w-3.5 h-3.5" />
            </button>
            <span class="px-2 font-bold min-w-[50px] text-center select-none text-[#00A852] dark:text-[#00FF88]">
              {{ Math.round(scale * 100) }}%
            </span>
            <button
              @click="zoomIn"
              title="ซูมเข้า (+)"
              class="p-2 hover:bg-black/5 dark:hover:bg-white/10 rounded-lg text-current transition-colors cursor-pointer"
            >
              <ZoomIn class="w-3.5 h-3.5" />
            </button>
            <button
              @click="resetView"
              title="รีเซ็ตตำแหน่ง"
              class="p-2 hover:bg-black/5 dark:hover:bg-white/10 rounded-lg text-current transition-colors border-l border-black/10 dark:border-white/10 cursor-pointer"
            >
              <RotateCcw class="w-3.5 h-3.5" />
            </button>
          </div>

          <!-- Fullscreen Toggle -->
          <button
            v-if="viewMode === 'diagram'"
            @click="toggleFullscreen"
            title="ขยายเต็มหน้าจอ"
            class="p-2 rounded-xl border border-black/10 dark:border-white/10 bg-white/60 dark:bg-white/[0.02] hover:border-[#00C864] text-current transition-all cursor-pointer"
          >
            <component :is="isFullscreen ? Minimize2 : Maximize2" class="w-4 h-4" />
          </button>
        </div>
      </div>

      <!-- Quick Drag & Zoom Guide Banner -->
      <div v-if="viewMode === 'diagram'" class="py-2.5 flex items-center justify-between text-[11px] font-mono text-[#475569] dark:text-[#94A3B8]">
        <div class="flex items-center gap-2">
          <Move class="w-3 h-3 text-[#00A852] dark:text-[#00FF88]" />
          <span>คลิกลากเพื่อเลื่อนผัง (Pan) • กด Ctrl + เลื่อนลูกกลิ้งเพื่อซูม (Zoom) • คลิกที่การ์ดเพื่อดูหน้าที่</span>
        </div>
        <div class="hidden sm:flex items-center gap-2 text-[#00A852] dark:text-[#00FF88]">
          <span class="w-1.5 h-1.5 rounded-full bg-[#00A852] dark:bg-[#00FF88] animate-pulse" />
          <span>Animated SVG Flow Active</span>
        </div>
      </div>

      <!-- ========================================================
           INTERACTIVE DIAGRAM CANVAS (PAN & ZOOM AREA)
      ========================================================= -->
      <div
        v-if="viewMode === 'diagram'"
        :class="[
          'org-diagram-viewport relative rounded-3xl overflow-hidden border border-black/10 dark:border-white/10 transition-all select-none',
          isFullscreen
            ? 'fixed inset-0 z-50 rounded-none bg-[#FBFDFB] dark:bg-[#030906] p-6'
            : 'h-[860px] bg-gradient-to-b from-white/95 via-[#F8FCF9] to-white/95 dark:from-[#04120a] dark:via-[#030906] dark:to-[#04120a] shadow-2xl'
        ]"
      >
        <!-- Canvas Grid Background -->
        <div
          class="absolute inset-0 pointer-events-none opacity-[0.06] dark:opacity-[0.1]"
          style="background-image: radial-gradient(#00C864 1px, transparent 1px); background-size: 24px 24px;"
        />

        <!-- Floating Fullscreen Close Button when active -->
        <button
          v-if="isFullscreen"
          @click="toggleFullscreen"
          class="absolute top-6 right-6 z-30 px-4 py-2 rounded-2xl bg-black/80 text-white font-mono text-xs flex items-center gap-2 shadow-2xl cursor-pointer"
        >
          <X class="w-4 h-4" />
          <span>ปิดโหมดเต็มจอ</span>
        </button>

        <!-- Viewport Container with Transform -->
        <div
          ref="canvasViewportRef"
          class="w-full h-full cursor-grab active:cursor-grabbing flex justify-center items-start pt-16 pb-20 overflow-hidden"
          @mousedown="onMouseDown"
          @mousemove="onMouseMove"
          @mouseup="onMouseUp"
          @mouseleave="onMouseUp"
          @wheel="onWheel"
        >
          <!-- Transformable Tree Canvas Layer -->
          <div
            class="relative transition-transform duration-75 origin-top flex flex-col items-center"
            :style="{
              transform: `translate(${pan.x}px, ${pan.y}px) scale(${scale})`
            }"
          >
            <!-- ----------------------------------------------------
                 LEVEL 0: MANAGING DIRECTOR (CEO) CARD
            ----------------------------------------------------- -->
            <div
              class="org-ceo-card relative z-20 group cursor-pointer"
              @click="openDetail(ceoNode)"
            >
              <!-- Glowing emerald ambient aura -->
              <div class="absolute -inset-2 rounded-3xl bg-gradient-to-r from-[#00C864]/30 to-[#00FF88]/30 blur-xl opacity-75 group-hover:opacity-100 transition-opacity" />

              <div class="relative px-8 py-5 rounded-3xl bg-gradient-to-br from-[#00C864] via-[#00B45A] to-[#009245] text-white shadow-2xl shadow-[#00C864]/30 border-2 border-white/30 flex items-center gap-4 hover:scale-[1.02] transition-transform">
                <div
                  v-if="ceoNode.image"
                  class="w-14 h-14 rounded-2xl overflow-hidden shrink-0 border-2 border-white/40 shadow-md"
                >
                  <img :src="ceoNode.image" :alt="ceoNode.title" class="w-full h-full object-cover group-hover:scale-105 transition-transform" />
                </div>
                <div v-else class="w-12 h-12 rounded-2xl bg-white/20 backdrop-blur-md flex items-center justify-center text-white shrink-0 border border-white/30 shadow-inner">
                  <Users class="w-6 h-6" />
                </div>
                <div>
                  <div class="text-[10px] font-mono tracking-widest uppercase text-white/80 flex items-center gap-1.5">
                    <span class="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
                    <span>EXECUTIVE LEADERSHIP</span>
                  </div>
                  <h3 class="text-xl font-bold font-display tracking-tight text-white">
                    กรรมการผู้จัดการบริษัท
                  </h3>
                  <div class="text-xs text-white/90 font-mono">Managing Director (CEO)</div>
                </div>

                <div class="ml-4 pl-4 border-l border-white/20 text-xs font-mono opacity-80 group-hover:opacity-100 flex items-center gap-1">
                  <span>ดูหน้าที่</span>
                  <ArrowUpRight class="w-3.5 h-3.5" />
                </div>
              </div>
            </div>

            <!-- ----------------------------------------------------
                 ANIMATED SVG CONNECTOR LINES: CEO -> 3 DIVISIONS
            ----------------------------------------------------- -->
            <div class="relative w-[980px] h-[90px] pointer-events-none -my-1 z-10">
              <svg class="w-full h-full overflow-visible" viewBox="0 0 980 90">
                <defs>
                  <!-- Gradient for smooth emerald connectors -->
                  <linearGradient id="connectorGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" stop-color="#00C864" stop-opacity="0.9" />
                    <stop offset="100%" stop-color="#00FF88" stop-opacity="0.7" />
                  </linearGradient>
                </defs>

                <!-- Static Background Bezier Paths (Subtle Guide) -->
                <!-- Center: To Sales & Marketing (Straight down to 490) -->
                <line x1="490" y1="0" x2="490" y2="90" stroke="currentColor" stroke-opacity="0.15" stroke-width="2" />
                <!-- Left: To Administration (Smooth Bezier to x=150) -->
                <path d="M 490 0 C 490 50, 150 40, 150 90" fill="none" stroke="currentColor" stroke-opacity="0.15" stroke-width="2" />
                <!-- Right: To Information Technology (Smooth Bezier to x=830) -->
                <path d="M 490 0 C 490 50, 830 40, 830 90" fill="none" stroke="currentColor" stroke-opacity="0.15" stroke-width="2" />

                <!-- Animated Emerald Energy Pulse Stroke Lines -->
                <line x1="490" y1="0" x2="490" y2="90" stroke="#00C864" stroke-width="2.5" class="animate-dash" />
                <path d="M 490 0 C 490 50, 150 40, 150 90" fill="none" stroke="#00C864" stroke-width="2.5" class="animate-dash" />
                <path d="M 490 0 C 490 50, 830 40, 830 90" fill="none" stroke="#00C864" stroke-width="2.5" class="animate-dash" />
              </svg>
            </div>

            <!-- ----------------------------------------------------
                 LEVEL 1: 3 EXECUTIVE DIVISIONS
            ----------------------------------------------------- -->
            <div class="grid grid-cols-3 gap-10 w-[980px] relative z-20">
              <div
                v-for="div in divisions"
                :key="div.id"
                class="flex flex-col items-center"
              >
                <!-- Division Card (Glassmorphism Node Card) -->
                <div
                  class="org-division-card w-[300px] p-5 rounded-3xl bg-white/95 dark:bg-[#071910]/95 backdrop-blur-xl border border-[#00C864]/30 dark:border-[#00FF88]/20 shadow-lg shadow-[#00C864]/5 space-y-3 relative group transition-all hover:border-[#00C864] hover:shadow-xl"
                >
                  <div class="flex items-start justify-between gap-2">
                    <div class="flex items-center gap-3">
                      <div
                        v-if="div.image"
                        class="w-12 h-12 rounded-2xl overflow-hidden shrink-0 border border-[#00C864]/30 shadow-sm"
                      >
                        <img :src="div.image" :alt="div.title" class="w-full h-full object-cover group-hover:scale-105 transition-transform" />
                      </div>
                      <div
                        v-else
                        class="w-10 h-10 rounded-2xl bg-[#00A852]/10 dark:bg-[#00FF88]/10 text-[#00A852] dark:text-[#00FF88] flex items-center justify-center shrink-0 shadow-xs border border-[#00C864]/20"
                      >
                        <component :is="div.icon" class="w-5 h-5" />
                      </div>
                      <div class="min-w-0">
                        <h4 class="text-sm font-bold text-[#0A1A12] dark:text-white leading-tight">
                          {{ div.title }}
                        </h4>
                        <div class="text-[10px] font-mono text-[#00A852] dark:text-[#00FF88] opacity-80 truncate">{{ div.en }}</div>
                      </div>
                    </div>
                  </div>

                  <!-- Actions inside Division Card: View Detail & Collapse Toggle -->
                  <div class="pt-2 flex items-center justify-between border-t border-black/5 dark:border-white/5 text-[11px] font-mono">
                    <button
                      @click="openDetail(div)"
                      class="text-[#00A852] dark:text-[#00FF88] hover:underline flex items-center gap-1 cursor-pointer font-bold"
                    >
                      <span>หน้าที่สายงาน</span>
                      <ArrowUpRight class="w-3 h-3" />
                    </button>

                    <!-- Collapsible Branch Button with Counter Badge -->
                    <button
                      @click="toggleDivision(div.id)"
                      class="px-2.5 py-1 rounded-full bg-black/5 dark:bg-white/10 hover:bg-[#00A852] hover:text-white transition-colors flex items-center gap-1 text-[10px] cursor-pointer"
                      :title="div.isCollapsed ? 'คลิกเพื่อขยายสายงาน' : 'คลิกเพื่อย่อสายงาน'"
                    >
                      <span class="font-bold">{{ div.departments.length }} ฝ่าย</span>
                      <component :is="div.isCollapsed ? ChevronDown : ChevronUp" class="w-3 h-3" />
                    </button>
                  </div>
                </div>

                <!-- Animated Vertical Trunk Down to Departments -->
                <div v-show="!div.isCollapsed" class="w-0.5 h-6 bg-black/15 dark:bg-white/15 my-1 relative overflow-hidden">
                  <div class="w-full h-full bg-[#00C864] animate-pulse" />
                </div>

                <!-- ----------------------------------------------------
                     LEVEL 2: DEPARTMENTS LIST UNDER THIS DIVISION
                ----------------------------------------------------- -->
                <div
                  v-show="!div.isCollapsed"
                  class="space-y-3 w-[300px] transition-all duration-300"
                >
                  <div
                    v-for="dept in div.departments"
                    :key="dept.id"
                    class="org-dept-card px-4 py-3 rounded-2xl bg-white dark:bg-[#06140d] border border-black/10 dark:border-white/10 hover:border-[#00C864] hover:shadow-lg dark:hover:border-[#00FF88]/40 transition-all shadow-xs cursor-pointer flex items-center gap-3.5 group relative"
                    @click="openDetail(dept, div.title)"
                  >
                    <!-- Avatar image if available OR Lucide Icon -->
                    <div
                      v-if="dept.image"
                      class="w-10 h-10 rounded-xl overflow-hidden shrink-0 border border-[#00C864]/30 shadow-sm"
                    >
                      <img :src="dept.image" :alt="dept.name" class="w-full h-full object-cover group-hover:scale-105 transition-transform" />
                    </div>
                    <div
                      v-else
                      class="w-10 h-10 rounded-xl bg-[#00A852]/10 dark:bg-[#00FF88]/10 flex items-center justify-center text-[#00A852] dark:text-[#00FF88] shrink-0 border border-[#00C864]/20 group-hover:bg-[#00C864] group-hover:text-white transition-all shadow-xs"
                    >
                      <component :is="dept.icon" class="w-5 h-5" />
                    </div>

                    <!-- Department Name & English/Thai Subtitle -->
                    <div class="min-w-0 flex-1">
                      <div class="text-xs sm:text-sm font-bold text-[#0A1A12] dark:text-white group-hover:text-[#00A852] dark:group-hover:text-[#00FF88] transition-colors leading-snug">
                        {{ dept.name }}
                      </div>
                      <div class="text-[10px] font-mono text-[#00A852] dark:text-[#00FF88] tracking-tight truncate pt-0.5">
                        {{ dept.en }}
                      </div>
                    </div>

                    <div class="opacity-0 group-hover:opacity-100 transition-opacity text-[#00A852] dark:text-[#00FF88] shrink-0">
                      <ChevronRight class="w-4 h-4" />
                    </div>
                  </div>
                </div>

                <!-- Placeholder collapsed indicator when hidden -->
                <div
                  v-if="div.isCollapsed"
                  @click="toggleDivision(div.id)"
                  class="mt-2 px-3 py-1.5 rounded-xl border border-dashed border-[#00C864]/40 text-[#00A852] dark:text-[#00FF88] text-[10px] font-mono flex items-center gap-1.5 cursor-pointer hover:bg-[#00C864]/5"
                >
                  <ChevronDown class="w-3 h-3" />
                  <span>คลิกเพื่อคลี่ดู {{ div.departments.length }} ฝ่ายย่อย</span>
                </div>

              </div>
            </div>

          </div>
        </div>
      </div>

      <!-- ========================================================
           ALTERNATIVE VIEW: ACCESSIBLE LIST / GRID VIEW
      ========================================================= -->
      <div v-else class="py-12 space-y-12">
        <!-- CEO Header in List Mode -->
        <div
          @click="openDetail(ceoNode)"
          class="p-8 rounded-3xl bg-gradient-to-r from-[#00C864]/10 via-[#00A852]/10 to-transparent border border-[#00C864]/30 flex flex-col sm:flex-row sm:items-center justify-between gap-6 cursor-pointer hover:border-[#00C864] transition-all"
        >
          <div class="flex items-center gap-4">
            <div
              v-if="ceoNode.image"
              class="w-16 h-16 rounded-2xl overflow-hidden shrink-0 border-2 border-[#00C864] shadow-lg"
            >
              <img :src="ceoNode.image" :alt="ceoNode.title" class="w-full h-full object-cover" />
            </div>
            <div v-else class="w-14 h-14 rounded-2xl bg-[#00C864] text-white flex items-center justify-center shadow-lg">
              <Users class="w-7 h-7" />
            </div>
            <div>
              <span class="text-xs font-mono font-bold uppercase text-[#00A852] dark:text-[#00FF88]">EXECUTIVE LEADERSHIP</span>
              <h3 class="text-2xl font-bold font-display text-[#0A1A12] dark:text-white">กรรมการผู้จัดการบริษัท (CEO)</h3>
              <p class="text-xs text-[#475569] dark:text-[#94A3B8] pt-1">Managing Director — ผู้นำสูงสุดในการกำหนดทิศทางองค์กร</p>
            </div>
          </div>
          <button class="px-4 py-2 rounded-xl bg-[#00C864] text-white font-mono text-xs font-bold flex items-center gap-1.5 self-start sm:self-auto">
            <span>ดูบทบาทหน้าที่</span>
            <ArrowUpRight class="w-4 h-4" />
          </button>
        </div>

        <!-- 3 Divisions Grid -->
        <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div
            v-for="div in divisions"
            :key="div.id"
            class="p-6 rounded-3xl border border-black/10 dark:border-white/10 bg-white/60 dark:bg-white/[0.02] space-y-6"
          >
            <div class="flex items-center gap-3 pb-4 border-b border-black/10 dark:border-white/10">
              <img v-if="div.image" :src="div.image" class="w-12 h-12 rounded-2xl object-cover border border-[#00C864]/30" />
              <component v-else :is="div.icon" class="w-6 h-6 text-[#00A852] dark:text-[#00FF88]" />
              <div>
                <h4 class="text-base font-bold text-[#0A1A12] dark:text-white">{{ div.title }}</h4>
                <div class="text-xs font-mono opacity-60">{{ div.en }}</div>
              </div>
            </div>

            <div class="space-y-3">
              <div
                v-for="dept in div.departments"
                :key="dept.id"
                @click="openDetail(dept, div.title)"
                class="p-4 rounded-2xl border border-black/5 dark:border-white/5 bg-white/80 dark:bg-black/30 hover:border-[#00C864] transition-all cursor-pointer flex items-center gap-3"
              >
                <img v-if="dept.image" :src="dept.image" class="w-10 h-10 rounded-xl object-cover" />
                <div v-else class="w-8 h-8 rounded-lg bg-black/5 dark:bg-white/5 flex items-center justify-center text-[#00A852]">
                  <component :is="dept.icon" class="w-4 h-4" />
                </div>
                <div class="min-w-0 flex-1">
                  <div class="text-sm font-bold">{{ dept.name }}</div>
                  <div class="text-[11px] font-mono opacity-60">{{ dept.en }}</div>
                  <p v-if="dept.desc" class="text-xs text-[#475569] dark:text-[#94A3B8] pt-0.5">{{ dept.desc }}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- ========================================================
           GOVERNANCE & AGILE PRINCIPLES
      ========================================================= -->
      <div class="py-16 border-b border-black/10 dark:border-white/10 space-y-8">
        <div class="space-y-3 max-w-3xl">
          <span class="text-xs font-mono font-bold tracking-widest uppercase text-[#00A852] dark:text-[#00FF88]">
            MANAGEMENT PRINCIPLES // ปรัชญาการบริหารแบบยืดหยุ่น
          </span>
          <h2 class="text-2xl sm:text-3xl font-display font-extrabold text-[#0A1A12] dark:text-white">
            การบริหารงานที่คล่องตัว รวดเร็ว และได้มาตรฐานสากล ISO/IEC 29110
          </h2>
          <p class="indent-8 text-base text-[#475569] dark:text-[#94A3B8] leading-[1.95] text-justify font-normal">
            ด้วยโครงสร้างแบบ <strong class="text-[#00A852] dark:text-[#00FF88]">"Small & Smart"</strong> การบริหารงานในไอเจนโก้จึงเน้นการประสานงานที่ไร้รอยต่อระหว่างฝ่ายบริหาร ฝ่ายการตลาด และสายเทคโนโลยีสารสนเทศ ทุกสายงานสามารถสื่อสารและตัดสินใจได้อย่างรวดเร็ว เพื่อตอบสนองต่อโจทย์ความต้องการของลูกค้าและการเปลี่ยนแปลงของเทคโนโลยีในทันท่วงที
          </p>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div class="p-6 rounded-2xl border border-black/10 dark:border-white/10 space-y-2 bg-white/40 dark:bg-white/[0.01]">
            <div class="text-xs font-mono font-bold text-[#00A852] dark:text-[#00FF88]">01 / คล่องตัว (Agile)</div>
            <h4 class="text-base font-bold text-[#0A1A12] dark:text-white">ตัดสินใจรวดเร็ว ไม่ซับซ้อน</h4>
            <p class="text-xs text-[#475569] dark:text-[#94A3B8] leading-relaxed">
              ลดขั้นตอนที่ไม่จำเป็นในสายการบังคับบัญชา เพื่อส่งมอบงานได้ตรงเวลาและทันความต้องการ
            </p>
          </div>

          <div class="p-6 rounded-2xl border border-black/10 dark:border-white/10 space-y-2 bg-white/40 dark:bg-white/[0.01]">
            <div class="text-xs font-mono font-bold text-[#00A852] dark:text-[#00FF88]">02 / มาตรฐานสากล</div>
            <h4 class="text-base font-bold text-[#0A1A12] dark:text-white">ISO/IEC 29110 Certified</h4>
            <p class="text-xs text-[#475569] dark:text-[#94A3B8] leading-relaxed">
              ทุกฝ่ายยึดถือกฎเกณฑ์การบริหารโครงการและวิศวกรรมซอฟต์แวร์ตามมาตรฐานระดับโลก
            </p>
          </div>

          <div class="p-6 rounded-2xl border border-black/10 dark:border-white/10 space-y-2 bg-white/40 dark:bg-white/[0.01]">
            <div class="text-xs font-mono font-bold text-[#00A852] dark:text-[#00FF88]">03 / ทีมเวิร์กเข้มแข็ง</div>
            <h4 class="text-base font-bold text-[#0A1A12] dark:text-white">Synergy & Responsibility</h4>
            <p class="text-xs text-[#475569] dark:text-[#94A3B8] leading-relaxed">
              ทำงานร่วมกันอย่างโปร่งใส มีความรับผิดชอบ และสร้างความสำเร็จร่วมกับลูกค้าทุกองค์กร
            </p>
          </div>
        </div>
      </div>

      <!-- Navigation to Next Section -->
      <div class="pt-16 flex flex-wrap items-center justify-between gap-4">
        <div class="flex items-center gap-4">
          <NuxtLink to="/about/values" class="text-xs font-mono opacity-60 hover:opacity-100 flex items-center gap-1">
            <ArrowLeft class="w-3.5 h-3.5" />
            <span>อ่านค่านิยมและวัฒนธรรมองค์กร</span>
          </NuxtLink>
          <span>•</span>
          <NuxtLink to="/about" class="text-xs font-mono opacity-60 hover:opacity-100">
            ภาพรวมเกี่ยวกับเรา
          </NuxtLink>
        </div>

        <NuxtLink to="/careers" class="inline-flex items-center gap-2 text-sm font-bold text-[#00A852] dark:text-[#00FF88] hover:underline">
          <span>ร่วมงานกับเรา (เปิดรับสมัครงาน)</span>
          <ArrowUpRight class="w-4 h-4" />
        </NuxtLink>
      </div>
    </main>

    <!-- ========================================================
         NODE DETAIL MODAL / DRAWER (รายละเอียดหน้าที่ตำแหน่งงาน)
    ========================================================= -->
    <div
      v-if="isDetailModalOpen && selectedNode"
      class="fixed inset-0 z-50 bg-black/75 backdrop-blur-md flex items-center justify-center p-4"
      @click="closeDetail"
    >
      <div
        class="relative max-w-lg w-full bg-white dark:bg-[#071910] p-6 sm:p-8 rounded-3xl border border-white/20 shadow-2xl max-h-[90vh] overflow-y-auto space-y-6"
        @click.stop
      >
        <!-- Modal Header -->
        <div class="flex items-start justify-between gap-4 border-b border-black/10 dark:border-white/10 pb-5">
          <div class="flex items-center gap-3">
            <img
              v-if="selectedNode.image"
              :src="selectedNode.image"
              class="w-12 h-12 rounded-2xl object-cover border border-black/10 dark:border-white/10 shadow-md"
            />
            <div
              v-else
              class="w-12 h-12 rounded-2xl bg-[#00A852]/10 dark:bg-[#00FF88]/10 text-[#00A852] dark:text-[#00FF88] flex items-center justify-center shadow-xs"
            >
              <component :is="selectedNode.icon || Users" class="w-6 h-6" />
            </div>
            <div>
              <div v-if="selectedNode.divisionTitle" class="text-[10px] font-mono text-[#00A852] dark:text-[#00FF88] uppercase tracking-wider">
                {{ selectedNode.divisionTitle }}
              </div>
              <h3 class="text-xl font-bold font-display text-[#0A1A12] dark:text-white">
                {{ selectedNode.name || selectedNode.title }}
              </h3>
              <div class="text-xs font-mono opacity-60">{{ selectedNode.en }}</div>
            </div>
          </div>

          <button
            @click="closeDetail"
            class="p-2 rounded-full hover:bg-black/5 dark:hover:bg-white/10 text-current transition-colors cursor-pointer"
          >
            <X class="w-5 h-5" />
          </button>
        </div>

        <!-- Description (if any) -->
        <div v-if="selectedNode.desc" class="space-y-1.5">
          <div class="text-xs font-mono font-bold text-[#00A852] dark:text-[#00FF88] uppercase">
            บทบาทหน้าที่สำคัญ
          </div>
          <p class="text-sm text-[#475569] dark:text-[#94A3B8] leading-relaxed">
            {{ selectedNode.desc }}
          </p>
        </div>

        <!-- Key Responsibilities List (if available) -->
        <div v-if="selectedNode.responsibilities && selectedNode.responsibilities.length" class="space-y-3">
          <div class="text-xs font-mono font-bold text-[#0A1A12] dark:text-white uppercase">
            ขอบเขตความรับผิดชอบหลัก
          </div>
          <ul class="space-y-2 text-xs text-[#334155] dark:text-[#CBD5E1]">
            <li
              v-for="r in selectedNode.responsibilities"
              :key="r"
              class="flex items-start gap-2.5 p-2 rounded-xl bg-black/[0.02] dark:bg-white/[0.02]"
            >
              <CheckCircle2 class="w-4 h-4 text-[#00A852] dark:text-[#00FF88] shrink-0 mt-0.5" />
              <span class="leading-relaxed">{{ r }}</span>
            </li>
          </ul>
        </div>

        <div class="pt-4 border-t border-black/10 dark:border-white/10 flex items-center justify-between text-xs font-mono">
          <span class="opacity-60">บริษัท ไอเจนโก้ จำกัด</span>
          <button
            @click="closeDetail"
            class="px-5 py-2 rounded-xl bg-[#00A852] text-white font-bold hover:bg-[#008f44] transition-colors cursor-pointer"
          >
            ปิดหน้าต่าง
          </button>
        </div>
      </div>
    </div>

    <ContactFooter />
  </div>
</template>

<style scoped>
/* Animated SVG Stroke Dashoffset for flowing pulse lines */
@keyframes dashFlow {
  from {
    stroke-dashoffset: 40;
  }
  to {
    stroke-dashoffset: 0;
  }
}

.animate-dash {
  stroke-dasharray: 6 10;
  animation: dashFlow 1.5s linear infinite;
}

@media (prefers-reduced-motion: reduce) {
  .animate-dash {
    animation: none !important;
  }
}
</style>
