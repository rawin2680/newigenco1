<script setup lang="ts">
import AppHeader from '~/components/AppHeader.vue'
import NewsSection from '~/components/NewsSection.vue'
import ContactFooter from '~/components/ContactFooter.vue'
import { Newspaper, ArrowLeft } from 'lucide-vue-next'

useHead({
  title: 'ข่าวสารและกิจกรรมล่าสุด (News & Updates) - IGENCO',
  meta: [
    {
      name: 'description',
      content: 'ข่าวสาร กิจกรรมเพื่อสังคม และการอบรมพัฒนาระบบซอฟต์แวร์ของ บริษัท ไอเจนโก้ จำกัด'
    }
  ]
})
</script>

<template>
  <div class="min-h-screen bg-[#FBFDFB] dark:bg-[#030906] text-[#0F172A] dark:text-[#F1F5F9] transition-colors selection:bg-[#00C864] selection:text-[#022C22]">
    <AppHeader />

    <!-- Subpage Breadcrumb Bar -->
    <div class="pt-24 sm:pt-28 pb-4 border-b border-black/5 dark:border-white/5 bg-black/[0.01] dark:bg-white/[0.01]">
      <div class="max-w-[1360px] mx-auto px-5 sm:px-10 lg:px-16 flex items-center justify-between text-xs font-mono">
        <div class="flex items-center gap-2 opacity-70">
          <NuxtLink to="/" class="hover:text-[#00A852] dark:hover:text-[#00FF88]">หน้าแรก</NuxtLink>
          <span>/</span>
          <span class="text-[#00A852] dark:text-[#00FF88] font-bold">ข่าวสารและกิจกรรม (News & Updates)</span>
        </div>
      </div>
    </div>

    <!-- Full News Section -->
    <main class="py-6">
      <NewsSection />
    </main>

    <ContactFooter />
  </div>
</template>
