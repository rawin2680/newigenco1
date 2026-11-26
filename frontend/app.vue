<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount } from 'vue'
import { useTheme } from '~/composables/useTheme'

const { toastMessage, isToastVisible } = useTheme()
const route = useRoute()
const isPublicPage = computed(() => !/^\/admin(?:\/|$)/.test(route.path))

// Top Reading / Scroll Progress Bar
const scrollProgress = ref(0)
let scrollRaf: number | null = null
const onScroll = () => {
  if (scrollRaf) return
  scrollRaf = requestAnimationFrame(() => {
    scrollRaf = null
    if (typeof window !== 'undefined') {
      const total = document.documentElement.scrollHeight - window.innerHeight
      if (total > 0) {
        scrollProgress.value = Math.min(100, Math.max(0, (window.scrollY / total) * 100))
      }
    }
  })
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

// Dynamically inject Apple iPhone font stylesheets with instant client-side reload
useHead({
  link: [
    { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
    { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossorigin: '' },
    {
      rel: 'stylesheet',
      href: 'https://fonts.googleapis.com/css2?family=Anuphan:wght@300;400;500;600;700;800&family=Inter:wght@300;400;500;600;700;800;900&display=swap'
    },
    {
      rel: 'stylesheet',
      href: 'https://fonts.cdnfonts.com/css/sf-pro-display'
    }
  ]
})
</script>

<template>
  <div class="architectural-grid relative min-h-screen" :class="{ 'public-headings': isPublicPage }">
    <!-- Top Global Scroll Progress Bar (วิ่งยาวตามระยะการอ่านบทความ) -->
    <div class="fixed top-0 left-0 right-0 h-[3.5px] bg-transparent z-[100] pointer-events-none">
      <div
        class="h-full bg-gradient-to-r from-[#00C864] via-[#00FF88] to-[#022C22] dark:to-[#F4FBF7] scroll-progress-bar scroll-progress-bar-native shadow-[0_0_12px_#00FF88]"
        :style="{ width: `${scrollProgress}%` }"
      />
    </div>

    <!-- Toast Notification -->
    <div
      class="fixed top-20 right-6 z-50 transition-transform duration-300 pointer-events-none"
      :class="isToastVisible ? 'translate-x-0' : 'translate-x-[140%]'"
    >
      <div class="spatial-glass px-5 py-3.5 rounded-2xl border-[#00C864] dark:border-[#00FF88] flex items-center gap-3 shadow-2xl">
        <span class="w-2.5 h-2.5 rounded-full bg-[#00C864] dark:bg-[#00FF88]" />
        <span class="text-xs font-mono font-bold">{{ toastMessage }}</span>
      </div>
    </div>

    <!-- Page Content -->
    <NuxtPage />
  </div>
</template>
