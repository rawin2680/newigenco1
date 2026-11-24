<script setup lang="ts">
import { useTheme } from '~/composables/useTheme'

const { toastMessage, isToastVisible } = useTheme()

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
  <div class="architectural-grid relative min-h-screen">
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
