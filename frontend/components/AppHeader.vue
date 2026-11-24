<script setup lang="ts">
import { ref, reactive, onMounted, onBeforeUnmount, nextTick } from 'vue'
import { Contrast, Menu, X, ArrowUpRight, Home, Box, Newspaper, Mail, Building2, Users, ChevronDown } from 'lucide-vue-next'
import { useTheme } from '~/composables/useTheme'

const { toggleTheme } = useTheme()
const isMobileMenuOpen = ref(false)
const mobileOpenDropdown = ref<string | null>(null)
const isScrolled = ref(false)

interface NavSubItem {
  name: string
  href: string
  desc?: string
}

interface NavItem {
  name: string
  href: string
  sectionId: string
  icon: any
  hasDropdown?: boolean
  children?: NavSubItem[]
}

const navLinks: NavItem[] = [
  { name: 'หน้าแรก', href: '/#top', sectionId: 'top', icon: Home },
  { name: 'ข่าวสาร', href: '/#news', sectionId: 'news', icon: Newspaper },
  {
    name: 'เกี่ยวกับเรา',
    href: '/#about',
    sectionId: 'about',
    icon: Building2,
    hasDropdown: true,
    children: [
      { name: 'ประวัติความเป็นมาและก้าวสู่ปีที่ 9', href: '/news/2', desc: 'เส้นทางกว่า 8 ปีในการพัฒนาซอฟต์แวร์ครบวงจร' },
      { name: 'การรับรองมาตรฐานสากล ISO/IEC 29110', href: '/news/1', desc: 'การรับรองกระบวนการ PM & SI โดย TÜV NORD' },
      { name: 'ปรัชญาและนโยบายการบริหารงาน', href: '/news/2#section-philosophy', desc: 'การทำงานใกล้ชิดกับลูกค้า ส่งมอบงานคุณภาพสูง' },
      { name: 'พันธมิตรและการส่งเสริม (BOI & SIPA)', href: '/news/2#section-partnerships', desc: 'ได้รับการส่งเสริมการลงทุนและร่วมมือระดับชาติ' }
    ]
  },
  {
    name: 'ผลิตภัณฑ์',
    href: '/#products',
    sectionId: 'products',
    icon: Box,
    hasDropdown: true,
    children: [
      { name: 'i-SMARTSOFT (e-Office ครบวงจร)', href: '/news/5', desc: '10 โมดูลบริหารงานสำนักงานอิเล็กทรอนิกส์' },
      { name: 'I-SERFF (ระบบยื่นแบบ คปภ.)', href: '/news/3', desc: 'ระบบยื่นขอความเห็นชอบอัตราเบี้ยและกรมธรรม์' },
      { name: 'EFMS (ระบบจัดเก็บข้อมูลการเงิน สคฝ.)', href: '/news/4', desc: 'ระบบเชื่อมโยงและนำส่งรายงานสถาบันการเงิน' },
      { name: 'แคตตาล็อกสินค้าและบริการทั้งหมด', href: '/#products', desc: 'เลือกชมโซลูชันซอฟต์แวร์และฮาร์ดแวร์ IoT' }
    ]
  },
  { name: 'กลุ่มผู้ใช้ผลิตภัณฑ์', href: '/#clients', sectionId: 'clients', icon: Users },
  { name: 'ติดต่อเรา', href: '/#contact', sectionId: 'contact', icon: Mail }
]

// Glassy Navigation Tabs State
const navContainerRef = ref<HTMLElement | null>(null)
const tabRefs = ref<HTMLElement[]>([])
const activeIndex = ref(0)
const hoveredIndex = ref<number | null>(null)
const activeDropdown = ref<number | null>(null)
let dropdownTimeout: any = null

const pillStyle = reactive({
  left: 0,
  width: 0,
  opacity: 0,
  isReady: false
})

const updatePill = () => {
  if (!import.meta.client || !navContainerRef.value) return
  const targetIdx = hoveredIndex.value !== null ? hoveredIndex.value : activeIndex.value
  const targetTab = tabRefs.value[targetIdx]

  if (targetTab && navContainerRef.value) {
    const containerRect = navContainerRef.value.getBoundingClientRect()
    const tabRect = targetTab.getBoundingClientRect()

    pillStyle.left = tabRect.left - containerRect.left
    pillStyle.width = tabRect.width
    pillStyle.opacity = 1
    pillStyle.isReady = true
  }
}

const onTabEnter = (idx: number) => {
  clearTimeout(dropdownTimeout)
  hoveredIndex.value = idx
  if (navLinks[idx]?.hasDropdown) {
    activeDropdown.value = idx
  } else {
    activeDropdown.value = null
  }
  updatePill()
}

const onTabLeave = () => {
  dropdownTimeout = setTimeout(() => {
    hoveredIndex.value = null
    activeDropdown.value = null
    updatePill()
  }, 180)
}

const closeAllDropdowns = () => {
  activeDropdown.value = null
  hoveredIndex.value = null
  updatePill()
}

const onTabClick = (idx: number, sectionId: string) => {
  activeIndex.value = idx
  hoveredIndex.value = null
  updatePill()

  if (import.meta.client) {
    const section = document.getElementById(sectionId)
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' })
    }
  }
}

// Scroll tracking for header shadow & active tab sync
let sectionObserver: IntersectionObserver | null = null

const onScroll = () => {
  if (typeof window !== 'undefined') {
    isScrolled.value = window.scrollY > 25
  }
}

onMounted(() => {
  if (import.meta.client) {
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', updatePill, { passive: true })
    onScroll()

    nextTick(() => {
      setTimeout(updatePill, 100)
    })

    // Sync active tab with user scroll position
    const sectionIds = ['top', 'news', 'about', 'products', 'clients', 'contact']
    sectionObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const id = entry.target.id
            const idx = sectionIds.indexOf(id)
            if (idx !== -1 && hoveredIndex.value === null) {
              activeIndex.value = idx
              updatePill()
            }
          }
        })
      },
      {
        root: null,
        rootMargin: '-20% 0px -55% 0px',
        threshold: 0
      }
    )

    sectionIds.forEach((id) => {
      const el = document.getElementById(id)
      if (el) sectionObserver?.observe(el)
    })
  }
})

onBeforeUnmount(() => {
  if (import.meta.client) {
    window.removeEventListener('scroll', onScroll)
    window.removeEventListener('resize', updatePill)
    sectionObserver?.disconnect()
    clearTimeout(dropdownTimeout)
  }
})
</script>

<template>
  <header
    :class="[
      'fixed top-0 left-0 right-0 z-50 backdrop-blur-md transition-all duration-300 border-b',
      isScrolled
        ? 'bg-[#F6F9F7]/95 dark:bg-[#020806]/95 border-[#00C864]/20 shadow-md shadow-[#00C864]/5'
        : 'bg-[#F6F9F7]/85 dark:bg-[#020806]/85 border-[#022C22]/10 dark:border-[#00FF88]/20'
    ]"
  >
    <div
      :class="[
        'max-w-[1440px] mx-auto px-5 sm:px-10 flex items-center justify-between transition-all duration-300',
        isScrolled ? 'h-16' : 'h-20'
      ]"
    >
      
      <!-- Logo (Direct link back to home) -->
      <NuxtLink to="/" class="flex items-center gap-2.5 group">
        <span class="w-3 h-3 rounded-full bg-[#00C864] dark:bg-[#00FF88] shadow-[0_0_12px_#00C864]" />
        <span class="font-display font-extrabold text-lg sm:text-xl tracking-wider text-[#022C22] dark:text-[#F4FBF7]">
          IGENCO<span class="text-[#00C864] dark:text-[#00FF88]">//</span>TECH
        </span>
      </NuxtLink>

      <!-- Desktop Glassy Navigation Tabs (Apple VisionOS Liquid Glass Style) -->
      <nav
        ref="navContainerRef"
        class="hidden lg:flex relative items-center p-1 rounded-full liquid-glass-tray transition-all duration-300"
        @mouseleave="onTabLeave"
      >
        <!-- Liquid Glass Active / Hover Highlight Pill (Shared Layout Animation with Spring Damping) -->
        <div
          class="liquid-glass-pill absolute top-1 bottom-1 pointer-events-none rounded-full"
          :style="{
            transform: `translateX(${pillStyle.left}px)`,
            width: `${pillStyle.width}px`,
            opacity: pillStyle.opacity,
            transition: pillStyle.isReady ? 'transform 0.38s cubic-bezier(0.25, 1, 0.5, 1), width 0.38s cubic-bezier(0.25, 1, 0.5, 1), opacity 0.25s ease' : 'none'
          }"
        />

        <!-- Tab Items -->
        <div
          v-for="(link, idx) in navLinks"
          :key="link.name"
          :ref="(el) => { if (el) tabRefs[idx] = (el as any).$el || el }"
          class="relative"
          @mouseenter="onTabEnter(idx)"
          @mouseleave="onTabLeave"
        >
          <NuxtLink
            :to="link.href"
            :class="[
              'relative z-10 flex items-center gap-1.5 px-3.5 py-2 rounded-full text-xs font-semibold tracking-wide transition-colors duration-250 select-none cursor-pointer',
              (hoveredIndex !== null ? hoveredIndex === idx : activeIndex === idx)
                ? 'text-[#022C22] dark:text-[#00FF88] font-bold'
                : 'text-[#022C22]/75 dark:text-[#F4FBF7]/75 hover:text-[#022C22] dark:hover:text-white'
            ]"
            @click="onTabClick(idx, link.sectionId)"
          >
            <!-- Vector Icon (Lucide Icon) -->
            <component
              :is="link.icon"
              :class="[
                'w-3.5 h-3.5 transition-transform duration-250 shrink-0',
                (hoveredIndex !== null ? hoveredIndex === idx : activeIndex === idx)
                  ? 'scale-110 text-[#00C864] dark:text-[#00FF88]'
                  : 'opacity-70'
              ]"
            />
            <span>{{ link.name }}</span>
            <ChevronDown
              v-if="link.hasDropdown"
              :class="[
                'w-3 h-3 transition-transform duration-200 shrink-0 opacity-60',
                activeDropdown === idx ? 'rotate-180 text-[#00C864] dark:text-[#00FF88]' : ''
              ]"
            />
          </NuxtLink>

          <!-- Glassy Dropdown Menu -->
          <div
            v-if="link.hasDropdown && activeDropdown === idx"
            class="absolute top-full left-1/2 -translate-x-1/2 pt-2.5 z-50 w-72 pointer-events-auto"
            @mouseenter="onTabEnter(idx)"
            @mouseleave="onTabLeave"
          >
            <div class="p-2.5 rounded-2xl bg-white/95 dark:bg-[#03150e]/95 border border-[#00C864]/30 shadow-2xl backdrop-blur-xl space-y-1">
              <NuxtLink
                v-for="sub in link.children"
                :key="sub.name"
                :to="sub.href"
                class="block p-2.5 rounded-xl hover:bg-[#00C864]/10 dark:hover:bg-[#00FF88]/15 transition-all group"
                @click="closeAllDropdowns"
              >
                <div class="text-xs font-bold text-[#022C22] dark:text-white group-hover:text-[#00C864] dark:group-hover:text-[#00FF88] flex items-center justify-between">
                  <span>{{ sub.name }}</span>
                  <ArrowUpRight class="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 transition-opacity text-[#00C864] dark:text-[#00FF88]" />
                </div>
                <div v-if="sub.desc" class="text-[11px] opacity-65 leading-tight mt-0.5 line-clamp-1 font-mono">
                  {{ sub.desc }}
                </div>
              </NuxtLink>
            </div>
          </div>
        </div>
      </nav>

      <!-- Right Buttons (โหมดมืด + ปุ่มติดต่อเรา) -->
      <div class="hidden lg:flex items-center gap-3.5">
        <!-- Theme Toggle -->
        <button
          type="button"
          aria-label="Toggle Theme"
          class="p-2.5 rounded-xl border border-current/15 hover:bg-[#00C864]/10 dark:hover:bg-[#00FF88]/10 transition-colors"
          @click="toggleTheme"
        >
          <Contrast class="w-4 h-4" />
        </button>

        <!-- Main CTA Button -->
        <NuxtLink
          to="/#contact"
          class="px-5 py-2.5 rounded-xl font-bold text-xs uppercase tracking-wider bg-[#00C864] text-[#022C22] dark:bg-[#00FF88] dark:text-[#020806] hover:opacity-90 transition-all flex items-center gap-1.5 shadow-md hover:shadow-lg hover:scale-105 active:scale-95"
        >
          <span>สอบถาม / ขอคำปรึกษา</span>
          <ArrowUpRight class="w-4 h-4" />
        </NuxtLink>
      </div>

      <!-- Mobile Hamburger Button -->
      <div class="flex items-center gap-2 lg:hidden">
        <button
          type="button"
          aria-label="Toggle Theme"
          class="p-2 rounded-lg border border-current/15"
          @click="toggleTheme"
        >
          <Contrast class="w-4 h-4" />
        </button>
        <button
          type="button"
          aria-label="Open Menu"
          class="p-2 rounded-lg border border-current/15 text-[#022C22] dark:text-[#F4FBF7]"
          @click="isMobileMenuOpen = !isMobileMenuOpen"
        >
          <Menu v-if="!isMobileMenuOpen" class="w-6 h-6" />
          <X v-else class="w-6 h-6" />
        </button>
      </div>

    </div>

    <!-- Mobile Dropdown Menu -->
    <div
      v-if="isMobileMenuOpen"
      class="lg:hidden px-5 py-6 bg-[#F6F9F7] dark:bg-[#020806] border-b border-current/10 space-y-3 shadow-xl max-h-[85vh] overflow-y-auto"
    >
      <div v-for="link in navLinks" :key="link.name" class="border-b border-current/5 pb-2">
        <div class="flex items-center justify-between">
          <NuxtLink
            :to="link.href"
            class="flex items-center gap-2.5 text-base font-semibold text-[#022C22] dark:text-[#F4FBF7] py-1.5"
            @click="isMobileMenuOpen = false"
          >
            <component :is="link.icon" class="w-4 h-4 text-[#00C864] dark:text-[#00FF88]" />
            <span>{{ link.name }}</span>
          </NuxtLink>
          <button
            v-if="link.hasDropdown"
            type="button"
            class="p-2 opacity-60 hover:opacity-100"
            @click="mobileOpenDropdown === link.name ? mobileOpenDropdown = null : mobileOpenDropdown = link.name"
          >
            <ChevronDown :class="['w-4 h-4 transition-transform', mobileOpenDropdown === link.name ? 'rotate-180 text-[#00C864] dark:text-[#00FF88]' : '']" />
          </button>
        </div>

        <!-- Mobile Sublinks -->
        <div
          v-if="link.hasDropdown && mobileOpenDropdown === link.name"
          class="pl-7 pt-1 pb-2 space-y-2 animate-in fade-in duration-150"
        >
          <NuxtLink
            v-for="sub in link.children"
            :key="sub.name"
            :to="sub.href"
            class="block text-xs opacity-75 hover:opacity-100 hover:text-[#00C864] dark:hover:text-[#00FF88] py-1 font-medium"
            @click="isMobileMenuOpen = false"
          >
            • {{ sub.name }}
          </NuxtLink>
        </div>
      </div>

      <!-- Mobile CTA Button -->
      <NuxtLink
        to="/#contact"
        class="block w-full py-3 text-center rounded-xl font-bold text-sm uppercase bg-[#00C864] text-[#022C22] dark:bg-[#00FF88] dark:text-[#020806] shadow-md mt-4"
        @click="isMobileMenuOpen = false"
      >
        สอบถาม / ขอคำปรึกษา
      </NuxtLink>
    </div>
  </header>
</template>

<style scoped>
/* 1. Glassmorphic Outer Tray */
.liquid-glass-tray {
  background: rgba(255, 255, 255, 0.65);
  backdrop-filter: blur(24px) saturate(190%);
  -webkit-backdrop-filter: blur(24px) saturate(190%);
  border: 1px solid rgba(255, 255, 255, 0.55);
  box-shadow: 
    0 10px 30px -10px rgba(0, 44, 34, 0.08),
    inset 0 1px 2px 0 rgba(255, 255, 255, 0.75),
    inset 0 -1px 2px 0 rgba(0, 44, 34, 0.04);
}

:global(.dark) .liquid-glass-tray {
  background: rgba(3, 16, 11, 0.68);
  border: 1px solid rgba(0, 255, 136, 0.16);
  box-shadow: 
    0 10px 30px -10px rgba(0, 0, 0, 0.5),
    inset 0 1px 2px 0 rgba(0, 255, 136, 0.25),
    inset 0 -1px 2px 0 rgba(0, 0, 0, 0.4);
}

/* 2. Specular Border & Inner Shadow (Liquid Glass Droplet Pill) */
.liquid-glass-pill {
  background: linear-gradient(135deg, rgba(255, 255, 255, 0.95) 0%, rgba(240, 253, 244, 0.9) 100%);
  border: 1px solid rgba(0, 200, 100, 0.32);
  box-shadow: 
    0 6px 20px -3px rgba(0, 200, 100, 0.28),
    inset 0 1.5px 2px 0 rgba(255, 255, 255, 1),
    inset 0 -1.5px 2px 0 rgba(0, 44, 34, 0.12),
    inset 1px 0 1.5px 0 rgba(255, 255, 255, 0.8),
    inset -1px 0 1.5px 0 rgba(255, 255, 255, 0.8);
}

:global(.dark) .liquid-glass-pill {
  background: linear-gradient(135deg, rgba(0, 255, 136, 0.18) 0%, rgba(2, 44, 34, 0.6) 100%);
  border: 1px solid rgba(0, 255, 136, 0.45);
  box-shadow: 
    0 6px 22px -3px rgba(0, 255, 136, 0.3),
    inset 0 1.5px 2px 0 rgba(255, 255, 136, 0.35),
    inset 0 -1.5px 2px 0 rgba(0, 0, 0, 0.5),
    inset 1px 0 1.5px 0 rgba(0, 255, 136, 0.2),
    inset -1px 0 1.5px 0 rgba(0, 255, 136, 0.2);
}
</style>
