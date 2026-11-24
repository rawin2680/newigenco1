<script setup lang="ts">
import AppHeader from '~/components/AppHeader.vue'
import AboutSection from '~/components/AboutSection.vue'
import ContactFooter from '~/components/ContactFooter.vue'

useHead({
  title: 'เกี่ยวกับเรา (About IGENCO) - บริษัท ไอเจนโก้ จำกัด',
  meta: [
    {
      name: 'description',
      content: 'ข้อมูลบริษัท ไอเจนโก้ จำกัด ผู้ให้บริการด้านการพัฒนาระบบงานคอมพิวเตอร์และเทคโนโลยีสารสนเทศครบวงจร มาตรฐานสากล ISO/IEC 29110 และได้รับการส่งเสริมการลงทุนจาก BOI'
    }
  ]
})
</script>

<template>
  <div class="min-h-screen bg-[#FBFDFB] dark:bg-[#030906] text-[#0F172A] dark:text-[#F1F5F9] transition-colors selection:bg-[#00C864] selection:text-[#022C22]">
    <!-- Header Navigation -->
    <AppHeader />

    <!-- Subpage Breadcrumb Bar -->
    <div class="pt-24 sm:pt-28 pb-4 border-b border-black/5 dark:border-white/5 bg-black/[0.01] dark:bg-white/[0.01]">
      <div class="max-w-[1360px] mx-auto px-5 sm:px-10 lg:px-16 flex items-center justify-between text-xs font-mono">
        <div class="flex items-center gap-2 opacity-70">
          <NuxtLink to="/" class="hover:text-[#00A852] dark:hover:text-[#00FF88]">หน้าแรก</NuxtLink>
          <span>/</span>
          <span class="text-[#00A852] dark:text-[#00FF88] font-bold">เกี่ยวกับเรา (About Us)</span>
        </div>
        <div class="hidden sm:flex items-center gap-4 text-[11px] opacity-60">
          <NuxtLink to="/about/history" class="hover:text-[#00A852] dark:hover:text-[#00FF88]">ประวัติบริษัท</NuxtLink>
          <span>•</span>
          <NuxtLink to="/about/policy" class="hover:text-[#00A852] dark:hover:text-[#00FF88]">นโยบายและวิสัยทัศน์</NuxtLink>
          <span>•</span>
          <NuxtLink to="/about/values" class="hover:text-[#00A852] dark:hover:text-[#00FF88]">ค่านิยม I-G-E-N</NuxtLink>
          <span>•</span>
          <NuxtLink to="/about/organization" class="hover:text-[#00A852] dark:hover:text-[#00FF88]">โครงสร้างองค์กร</NuxtLink>
          <span>•</span>
          <NuxtLink to="/careers" class="hover:text-[#00A852] dark:hover:text-[#00FF88]">สมัครงาน</NuxtLink>
        </div>
      </div>
    </div>

    <!-- Main About Content Component (Minimalist Premium Editorial Layout) -->
    <main>
      <AboutSection />
    </main>

    <!-- Footer -->
    <ContactFooter />
  </div>
</template>
