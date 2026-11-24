<script setup lang="ts">
import AppHeader from '~/components/AppHeader.vue'
import ProductCatalog from '~/components/ProductCatalog.vue'
import ContactFooter from '~/components/ContactFooter.vue'
import { Box, ArrowLeft, ArrowUpRight, CheckCircle2 } from 'lucide-vue-next'

useHead({
  title: 'ผลิตภัณฑ์และโซลูชันซอฟต์แวร์ (Products & Solutions) - IGENCO',
  meta: [
    {
      name: 'description',
      content: 'ผลิตภัณฑ์และบริการซอฟต์แวร์ระดับ Enterprise จาก IGENCO: i-SMARTSOFT, I-SERFF, EFMS และโซลูชันฮาร์ดแวร์ IoT อัจฉริยะ'
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
          <span class="text-[#00A852] dark:text-[#00FF88] font-bold">ผลิตภัณฑ์และบริการ (Products)</span>
        </div>
        <div class="hidden sm:flex items-center gap-4 text-[11px] opacity-60">
          <NuxtLink to="/news/5" class="hover:text-[#00A852] dark:hover:text-[#00FF88]">i-SMARTSOFT</NuxtLink>
          <span>•</span>
          <NuxtLink to="/news/3" class="hover:text-[#00A852] dark:hover:text-[#00FF88]">I-SERFF</NuxtLink>
          <span>•</span>
          <NuxtLink to="/news/4" class="hover:text-[#00A852] dark:hover:text-[#00FF88]">EFMS</NuxtLink>
        </div>
      </div>
    </div>

    <!-- Core Enterprise Products Spotlight -->
    <div class="max-w-[1360px] mx-auto px-5 sm:px-10 lg:px-16 pt-16 pb-6">
      <div class="max-w-3xl space-y-4 mb-12">
        <div class="inline-flex items-center gap-2 text-xs font-mono font-bold tracking-[0.22em] uppercase text-[#00A852] dark:text-[#00FF88]">
          <Box class="w-4 h-4" />
          <span>FLAGSHIP ENTERPRISE SOLUTIONS</span>
        </div>
        <h1 class="text-3xl sm:text-5xl font-display font-extrabold tracking-tight text-[#0A1A12] dark:text-[#F8FAFC]">
          ระบบงานซอฟต์แวร์ระดับองค์กรที่พัฒนาโดย IGENCO
        </h1>
        <p class="text-base sm:text-lg text-[#334155] dark:text-[#94A3B8] leading-relaxed">
          ผลิตภัณฑ์ซอฟต์แวร์ Web Application ที่ผ่านการใช้งานจริงในหน่วยงานภาครัฐ รัฐวิสาหกิจ และสถาบันการเงินระดับประเทศ
        </p>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
        <!-- Product 1: i-SMARTSOFT -->
        <NuxtLink
          to="/news/5"
          class="p-8 rounded-3xl border border-black/10 dark:border-white/10 hover:border-[#00C864] dark:hover:border-[#00FF88] transition-all space-y-4 group flex flex-col justify-between"
        >
          <div class="space-y-3">
            <span class="text-[11px] font-mono font-bold px-2.5 py-1 rounded-full bg-[#00A852]/10 text-[#00A852] dark:text-[#00FF88]">
              OFFICE AUTOMATION
            </span>
            <h3 class="text-xl font-bold group-hover:text-[#00A852] dark:group-hover:text-[#00FF88] transition-colors">
              i-SMARTSOFT (e-Office)
            </h3>
            <p class="text-xs text-[#475569] dark:text-[#94A3B8] leading-relaxed">
              โปรแกรมระบบบริหารสำนักงานอัตโนมัติครบวงจร 10 โมดูล: ระบบสารบรรณ, จัดการเอกสาร, หนังสือเวียน, ประชุม, ปฏิทิน, วันลา, บันทึกเวลา และครุภัณฑ์
            </p>
          </div>
          <div class="pt-4 border-t border-black/5 dark:border-white/5 text-xs font-bold text-[#00A852] dark:text-[#00FF88] flex items-center justify-between">
            <span>อ่านรายละเอียดและขอสาธิตระบบ</span>
            <ArrowUpRight class="w-4 h-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
          </div>
        </NuxtLink>

        <!-- Product 2: I-SERFF -->
        <NuxtLink
          to="/news/3"
          class="p-8 rounded-3xl border border-black/10 dark:border-white/10 hover:border-[#00C864] dark:hover:border-[#00FF88] transition-all space-y-4 group flex flex-col justify-between"
        >
          <div class="space-y-3">
            <span class="text-[11px] font-mono font-bold px-2.5 py-1 rounded-full bg-[#00A852]/10 text-[#00A852] dark:text-[#00FF88]">
              REGULATORY SYSTEM
            </span>
            <h3 class="text-xl font-bold group-hover:text-[#00A852] dark:group-hover:text-[#00FF88] transition-colors">
              ระบบ I-SERFF (คปภ.)
            </h3>
            <p class="text-xs text-[#475569] dark:text-[#94A3B8] leading-relaxed">
              ระบบขอรับความเห็นชอบอัตราเบี้ยประกันภัยและแบบข้อความกรมธรรม์ออนไลน์ โดยความร่วมมือระหว่าง คปภ., ม.ธรรมศาสตร์ และ บริษัท ไอเจนโก้ จำกัด
            </p>
          </div>
          <div class="pt-4 border-t border-black/5 dark:border-white/5 text-xs font-bold text-[#00A852] dark:text-[#00FF88] flex items-center justify-between">
            <span>ภาพกิจกรรมและการใช้งาน</span>
            <ArrowUpRight class="w-4 h-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
          </div>
        </NuxtLink>

        <!-- Product 3: EFMS -->
        <NuxtLink
          to="/news/4"
          class="p-8 rounded-3xl border border-black/10 dark:border-white/10 hover:border-[#00C864] dark:hover:border-[#00FF88] transition-all space-y-4 group flex flex-col justify-between"
        >
          <div class="space-y-3">
            <span class="text-[11px] font-mono font-bold px-2.5 py-1 rounded-full bg-[#00A852]/10 text-[#00A852] dark:text-[#00FF88]">
              FINANCIAL ARCHITECTURE
            </span>
            <h3 class="text-xl font-bold group-hover:text-[#00A852] dark:group-hover:text-[#00FF88] transition-colors">
              ระบบ EFMS (สถาบันคุ้มครองเงินฝาก)
            </h3>
            <p class="text-xs text-[#475569] dark:text-[#94A3B8] leading-relaxed">
              ระบบรับและจัดเก็บข้อมูลอิเล็กทรอนิกส์ระหว่างสถาบันคุ้มครองเงินฝาก (สคฝ.) และสถาบันการเงิน สำหรับนำส่งรายงานทางการเงินที่รวดเร็วและปลอดภัย
            </p>
          </div>
          <div class="pt-4 border-t border-black/5 dark:border-white/5 text-xs font-bold text-[#00A852] dark:text-[#00FF88] flex items-center justify-between">
            <span>ดูข้อมูลระบบและการประชุมชี้แจง</span>
            <ArrowUpRight class="w-4 h-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
          </div>
        </NuxtLink>
      </div>
    </div>

    <!-- Interactive Catalog Component -->
    <main>
      <ProductCatalog />
    </main>

    <ContactFooter />
  </div>
</template>
