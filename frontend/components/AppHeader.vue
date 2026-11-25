<script setup lang="ts">
import { ref, watch, onMounted, onBeforeUnmount } from 'vue'
import { useRoute } from 'vue-router'
import { Contrast, Menu, X, ArrowUpRight, Home, Box, Newspaper, Mail, Building2, Users, ChevronDown, ChevronRight } from 'lucide-vue-next'
import { useTheme } from '~/composables/useTheme'

const route = useRoute()
const { toggleTheme } = useTheme()
const isMobileMenuOpen = ref(false)
const mobileOpenDropdown = ref<string | null>(null)
const mobileSubDropdown = ref<string | null>(null)
const isScrolled = ref(false)

interface NavSubChildItem {
  name: string
  href: string
}

interface NavSubItem {
  name: string
  href: string
  desc?: string
  hasSubmenu?: boolean
  children?: NavSubChildItem[]
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
      { name: 'ประวัติความเป็นมา', href: '/about/history' },
      { name: 'นโยบายบริษัท', href: '/about/policy' },
      { name: 'ค่านิยมและวัฒนธรรมองค์กร', href: '/about/values' },
      { name: 'แผนผังการบริหาร', href: '/about/organization' },
      { name: 'สมัครงาน', href: '/careers' },
      {
        name: 'การคุ้มครองข้อมูลส่วนบุคคล',
        href: '/privacy-policy',
        hasSubmenu: true,
        children: [
          { name: 'นโยบายความเป็นส่วนตัว', href: '/privacy-policy' },
          { name: 'นโยบายการใช้คุกกี้', href: '/cookie-policy' }
        ]
      }
    ]
  },
  {
    name: 'ผลิตภัณฑ์และบริการ',
    href: '/#products',
    sectionId: 'products',
    icon: Box,
    hasDropdown: true,
    children: [
      { name: 'Regist.ai (ระบบลงทะเบียนอัจฉริยะ)', href: '/products/regist-ai' },
      { name: 'HR.ai (ระบบบริหารงานบุคคล AI)', href: '/products/hr-ai' },
      { name: 'iGenQ (ระบบบริหารคิวอัจฉริยะ)', href: '/products/igenq' },
      {
        name: 'Service Development',
        href: '/#products?cat=Service Development',
        hasSubmenu: true,
        children: [
          { name: 'Software OnDemand', href: '/#products?cat=Service Development' },
          { name: 'OutSource Service', href: '/#products?cat=Service Development' }
        ]
      },
      {
        name: 'E-Commerce',
        href: '/#products?cat=E-Commerce',
        hasSubmenu: true,
        children: [
          { name: 'iMme Application', href: '/#products?cat=E-Commerce' },
          { name: 'i-RealEstate', href: '/#products?cat=E-Commerce' },
          { name: 'iPOS', href: '/#products?cat=E-Commerce' }
        ]
      }
    ]
  },
  { name: 'กลุ่มผู้ใช้ผลิตภัณฑ์', href: '/#clients', sectionId: 'clients', icon: Users },
  {
    name: 'ติดต่อเรา',
    href: '/contact',
    sectionId: 'contact',
    icon: Mail,
    hasDropdown: true,
    children: [
      { name: 'ติดต่อสอบถามหรือ ขอคำปรึกษา', href: '/contact' },
      { name: 'ตำแหน่งที่ตั้ง', href: '/contact/location' }
    ]
  }
]

// All sections on homepage in actual vertical order from top to bottom
const homeSections = [
  { id: 'top', tabIndex: 0 },
  { id: 'clients', tabIndex: 4 },
  { id: 'products', tabIndex: 3 },
  { id: 'news', tabIndex: 1 },
  { id: 'about', tabIndex: 2 },
  { id: 'contact', tabIndex: 5 }
]

// Navigation tab and dropdown state
const activeIndex = ref(0)
const activeDropdown = ref<number | null>(null)
const activeSubmenu = ref<string | null>(null)
let dropdownTimeout: any = null
let isClickScrolling = false
let clickScrollTimeout: any = null

// Deterministically compute the active tab index based on route path & hash
const resolveActiveIndex = (): number => {
  if (!route) return 0
  const path = route.path || '/'
  const hash = route.hash || ''

  if (path.startsWith('/contact')) return 5
  if (path.startsWith('/products')) return 3
  if (path.startsWith('/about') || path === '/careers' || path === '/privacy-policy' || path === '/cookie-policy') return 2
  if (path.startsWith('/news')) return 1

  if (path === '/') {
    if (hash === '#contact') return 5
    if (hash === '#clients') return 4
    if (hash === '#about') return 2
    if (hash === '#news') return 1
    if (hash === '#products') return 3
    if (hash === '#top') return 0
    return activeIndex.value ?? 0
  }

  return 0
}

watch(
  () => [route.path, route.hash],
  () => {
    activeIndex.value = resolveActiveIndex()
  },
  { immediate: true }
)

const isTabActive = (idx: number) => {
  if (activeDropdown.value !== null) {
    return activeDropdown.value === idx
  }
  return activeIndex.value === idx
}

const onTabEnter = (idx: number) => {
  clearTimeout(dropdownTimeout)
  if (navLinks[idx]?.hasDropdown) {
    activeDropdown.value = idx
  } else {
    activeDropdown.value = null
  }
}

const onTabLeave = () => {
  dropdownTimeout = setTimeout(() => {
    activeDropdown.value = null
    activeSubmenu.value = null
  }, 180)
}

const keepDropdownOpen = () => {
  clearTimeout(dropdownTimeout)
}

const closeAllDropdowns = () => {
  clearTimeout(dropdownTimeout)
  activeDropdown.value = null
  activeSubmenu.value = null
  isMobileMenuOpen.value = false
}

const onTabClick = (idx: number, sectionId: string) => {
  activeIndex.value = idx
  activeDropdown.value = null
  activeSubmenu.value = null

  if (import.meta.client && route.path === '/') {
    isClickScrolling = true
    clearTimeout(clickScrollTimeout)
    clickScrollTimeout = setTimeout(() => {
      isClickScrolling = false
    }, 1000)

    const section = document.getElementById(sectionId)
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' })
    }
  }
}

// Scroll tracking for header shadow & homepage scrollspy
let scrollRafId: number | null = null

const updateActiveSectionOnScroll = () => {
  if (!import.meta.client || route.path !== '/' || isClickScrolling) return

  const scrollY = window.scrollY
  if (scrollY < 200) {
    activeIndex.value = 0
    return
  }

  // Header offset: 240px below top of viewport
  const scrollPosition = scrollY + 240

  for (let i = homeSections.length - 1; i >= 0; i--) {
    const sec = homeSections[i]
    const el = document.getElementById(sec.id)
    if (el) {
      if (scrollPosition >= el.offsetTop) {
        activeIndex.value = sec.tabIndex
        return
      }
    }
  }

  activeIndex.value = 0
}

const onScroll = () => {
  if (typeof window !== 'undefined') {
    isScrolled.value = window.scrollY > 25
    if (route.path === '/') {
      if (scrollRafId) cancelAnimationFrame(scrollRafId)
      scrollRafId = requestAnimationFrame(updateActiveSectionOnScroll)
    }
  }
}

onMounted(() => {
  if (import.meta.client) {
    window.addEventListener('scroll', onScroll, { passive: true })
    onScroll()
  }
})

onBeforeUnmount(() => {
  if (import.meta.client) {
    window.removeEventListener('scroll', onScroll)
    if (scrollRafId) cancelAnimationFrame(scrollRafId)
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
        class="hidden lg:flex relative items-center p-1 rounded-full liquid-glass-tray transition-all duration-300 gap-1"
        @mouseleave="onTabLeave"
      >
        <!-- Tab Items -->
        <div
          v-for="(link, idx) in navLinks"
          :key="link.name"
          class="relative"
          @mouseenter="onTabEnter(idx)"
          @mouseleave="onTabLeave"
        >
          <NuxtLink
            :to="link.href"
            :class="[
              'relative z-10 flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs tracking-wide select-none cursor-pointer transition-all duration-200 border-[1.5px]',
              isTabActive(idx)
                ? 'nav-tab-active font-bold text-[#022C22] dark:text-[#00FF88]'
                : 'border-transparent text-[#022C22]/75 dark:text-[#F4FBF7]/75 hover:text-[#00C864] dark:hover:text-[#00FF88] hover:bg-black/5 dark:hover:bg-white/5 font-semibold'
            ]"
            @click="onTabClick(idx, link.sectionId)"
          >
            <!-- Vector Icon (Lucide Icon) -->
            <component
              :is="link.icon"
              :class="[
                'w-3.5 h-3.5 transition-transform duration-200 shrink-0',
                isTabActive(idx)
                  ? 'scale-110 text-[#00C864] dark:text-[#00FF88]'
                  : 'opacity-70 group-hover:opacity-100'
              ]"
            />
            <span>{{ link.name }}</span>
            <ChevronDown
              v-if="link.hasDropdown"
              :class="[
                'w-3 h-3 transition-transform duration-200 shrink-0 opacity-60',
                activeDropdown === idx ? 'rotate-180 text-[#00C864] dark:text-[#00FF88]' : (isTabActive(idx) ? 'text-[#00C864] dark:text-[#00FF88]' : '')
              ]"
            />
          </NuxtLink>

          <!-- Glassy Dropdown Menu -->
          <div
            v-if="link.hasDropdown && activeDropdown === idx"
            :class="[
              'absolute top-full pt-2.5 z-50 min-w-[260px] pointer-events-auto',
              idx === navLinks.length - 1 ? 'right-0' : 'left-1/2 -translate-x-1/2'
            ]"
            @mouseenter="keepDropdownOpen"
            @mouseleave="onTabLeave"
          >
            <div class="p-2 rounded-2xl bg-white/95 dark:bg-[#03150e]/95 border border-[#00C864]/30 shadow-2xl backdrop-blur-xl space-y-1">
              <template v-for="sub in link.children" :key="sub.name">
                <!-- If item has submenu (e.g. การคุ้มครองข้อมูลส่วนบุคคล) -->
                <div
                  v-if="sub.hasSubmenu"
                  class="relative"
                  @mouseenter="activeSubmenu = sub.name"
                >
                  <div
                    :class="[
                      'flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-all cursor-pointer select-none',
                      activeSubmenu === sub.name
                        ? 'bg-[#00C864] text-white shadow-md'
                        : 'text-[#022C22] dark:text-white hover:bg-[#00C864]/10 dark:hover:bg-[#00FF88]/15 hover:text-[#00C864] dark:hover:text-[#00FF88]'
                    ]"
                  >
                    <span>{{ sub.name }}</span>
                    <ChevronRight :class="['w-3.5 h-3.5 transition-transform', activeSubmenu === sub.name ? 'text-white' : 'opacity-60']" />
                  </div>

                  <!-- Flyout Submenu to the right -->
                  <div
                    v-if="activeSubmenu === sub.name"
                    class="absolute left-full top-0 ml-1.5 z-50 min-w-[200px] p-2 rounded-2xl bg-white/95 dark:bg-[#03150e]/95 border border-[#00C864]/30 shadow-2xl backdrop-blur-xl space-y-1 animate-in fade-in duration-150"
                  >
                    <NuxtLink
                      v-for="child in sub.children"
                      :key="child.name"
                      :to="child.href"
                      class="block px-3.5 py-2.5 rounded-xl text-xs font-semibold text-[#022C22] dark:text-white hover:bg-[#00C864]/10 dark:hover:bg-[#00FF88]/15 hover:text-[#00C864] dark:hover:text-[#00FF88] transition-all"
                      @click="closeAllDropdowns"
                    >
                      {{ child.name }}
                    </NuxtLink>
                  </div>
                </div>

                <!-- Normal Sub Item -->
                <NuxtLink
                  v-else
                  :to="sub.href"
                  class="block px-3.5 py-2.5 rounded-xl hover:bg-[#00C864]/10 dark:hover:bg-[#00FF88]/15 transition-all group"
                  @click="closeAllDropdowns"
                  @mouseenter="activeSubmenu = null"
                >
                  <div class="text-xs font-semibold text-[#022C22] dark:text-white group-hover:text-[#00C864] dark:group-hover:text-[#00FF88] flex items-center justify-between">
                    <span>{{ sub.name }}</span>
                    <ArrowUpRight v-if="sub.desc" class="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 transition-opacity text-[#00C864] dark:text-[#00FF88]" />
                  </div>
                  <div v-if="sub.desc" class="text-[11px] opacity-65 leading-tight mt-0.5 line-clamp-1 font-mono">
                    {{ sub.desc }}
                  </div>
                </NuxtLink>
              </template>
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
          class="pl-7 pt-1 pb-2 space-y-1.5 animate-in fade-in duration-150"
        >
          <template v-for="sub in link.children" :key="sub.name">
            <!-- Normal Sublink -->
            <NuxtLink
              v-if="!sub.hasSubmenu"
              :to="sub.href"
              class="block text-xs opacity-80 hover:opacity-100 hover:text-[#00C864] dark:hover:text-[#00FF88] py-1 font-medium"
              @click="isMobileMenuOpen = false"
            >
              • {{ sub.name }}
            </NuxtLink>

            <!-- Nested Sublink (การคุ้มครองข้อมูลส่วนบุคคล) -->
            <div v-else class="pt-1">
              <div
                class="flex items-center justify-between text-xs font-semibold text-[#00C864] dark:text-[#00FF88] py-1 cursor-pointer"
                @click="mobileSubDropdown === sub.name ? mobileSubDropdown = null : mobileSubDropdown = sub.name"
              >
                <span>• {{ sub.name }}</span>
                <ChevronDown :class="['w-3.5 h-3.5 transition-transform', mobileSubDropdown === sub.name ? 'rotate-180' : '']" />
              </div>
              <div v-if="mobileSubDropdown === sub.name" class="pl-4 pt-1 space-y-1">
                <NuxtLink
                  v-for="child in sub.children"
                  :key="child.name"
                  :to="child.href"
                  class="block text-[11px] opacity-75 hover:opacity-100 hover:text-[#00C864] dark:hover:text-[#00FF88] py-1"
                  @click="isMobileMenuOpen = false"
                >
                  ▸ {{ child.name }}
                </NuxtLink>
              </div>
            </div>
          </template>
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

/* 2. Liquid Glass Active Tab Selection Frame (Rock-solid, jitter-free) */
.nav-tab-active {
  background: linear-gradient(135deg, rgba(255, 255, 255, 0.98) 0%, rgba(240, 253, 244, 0.92) 100%);
  border-color: rgba(0, 200, 100, 0.45) !important;
  box-shadow: 
    0 4px 16px -2px rgba(0, 200, 100, 0.22),
    inset 0 1.5px 2px 0 rgba(255, 255, 255, 1),
    inset 0 -1px 2px 0 rgba(0, 44, 34, 0.08);
}

:global(.dark) .nav-tab-active {
  background: linear-gradient(135deg, rgba(0, 255, 136, 0.16) 0%, rgba(2, 44, 34, 0.65) 100%);
  border-color: rgba(0, 255, 136, 0.5) !important;
  box-shadow: 
    0 4px 18px -2px rgba(0, 255, 136, 0.35),
    inset 0 1.5px 2px 0 rgba(0, 255, 136, 0.25),
    inset 0 -1px 2px 0 rgba(0, 0, 0, 0.45);
}
</style>
