<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount } from 'vue'
import { Contrast, Menu, X, ArrowUpRight } from 'lucide-vue-next'
import { useTheme } from '~/composables/useTheme'

const { toggleTheme } = useTheme()
const isMobileMenuOpen = ref(false)
const isScrolled = ref(false)

const onScroll = () => {
  if (typeof window !== 'undefined') {
    isScrolled.value = window.scrollY > 25
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
  }
})

const navLinks = [
  { name: 'หน้าแรก', href: '/#top' },
  { name: 'สินค้าและบริการ', href: '/#products' },
  { name: 'ข่าวสารและกิจกรรม', href: '/#news' },
  { name: 'ติดต่อเรา', href: '/#contact' },
]
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

      <!-- Desktop Navigation Menu -->
      <nav class="hidden md:flex items-center gap-8">
        <NuxtLink
          v-for="link in navLinks"
          :key="link.name"
          :to="link.href"
          class="text-sm font-medium text-[#022C22]/80 dark:text-[#F4FBF7]/80 hover:text-[#00C864] dark:hover:text-[#00FF88] transition-colors py-1"
        >
          {{ link.name }}
        </NuxtLink>
      </nav>

      <!-- Right Buttons (โหมดมืด + ปุ่มติดต่อเรา) -->
      <div class="hidden md:flex items-center gap-3.5">
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
          class="px-5 py-2.5 rounded-xl font-bold text-xs uppercase tracking-wider bg-[#00C864] text-[#022C22] dark:bg-[#00FF88] dark:text-[#020806] hover:opacity-90 transition-all flex items-center gap-1.5 shadow-md hover:shadow-lg"
        >
          <span>สอบถาม / ขอคำปรึกษา</span>
          <ArrowUpRight class="w-4 h-4" />
        </NuxtLink>
      </div>

      <!-- Mobile Hamburger Button -->
      <div class="flex items-center gap-2 md:hidden">
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
      class="md:hidden px-5 py-6 bg-[#F6F9F7] dark:bg-[#020806] border-b border-current/10 space-y-4 shadow-xl"
    >
      <NuxtLink
        v-for="link in navLinks"
        :key="link.name"
        :to="link.href"
        class="block text-base font-semibold text-[#022C22] dark:text-[#F4FBF7] py-2"
        @click="isMobileMenuOpen = false"
      >
        {{ link.name }}
      </NuxtLink>
      <NuxtLink
        to="/#contact"
        class="block w-full py-3 text-center rounded-xl font-bold text-sm bg-[#00C864] text-[#022C22] dark:bg-[#00FF88] dark:text-[#020806] mt-4 shadow-md"
        @click="isMobileMenuOpen = false"
      >
        สอบถาม / ขอคำปรึกษา
      </NuxtLink>
    </div>
  </header>
</template>
