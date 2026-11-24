<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { ArrowDown, ArrowUpRight, Sparkles, Activity, ShieldCheck, Zap } from 'lucide-vue-next'
import WebglBackdrop from '~/components/WebglBackdrop.vue'

const stats = ref([
  { val: 0, target: 100, suffix: '%', label: 'บริการให้คำปรึกษาฟรี' },
  { val: 0, target: 50, suffix: '+', label: 'ผลิตภัณฑ์และโซลูชัน' },
  { val: 0, target: 99, suffix: '.9%', label: 'ความเสถียรของระบบ' },
  { val: 0, target: 24, suffix: '/7', label: 'รับเรื่องและประสานงาน' }
])

onMounted(() => {
  if (import.meta.client) {
    stats.value.forEach((s) => {
      let current = 0
      const step = Math.max(1, Math.floor(s.target / 30))
      const timer = setInterval(() => {
        current += step
        if (current >= s.target) {
          s.val = s.target
          clearInterval(timer)
        } else {
          s.val = current
        }
      }, 35)
    })
  }
})
</script>

<template>
  <section id="top" class="relative min-h-[90vh] flex flex-col justify-center pt-32 pb-20 px-5 sm:px-10 lg:px-16 max-w-[1440px] mx-auto overflow-hidden">
    <!-- WebGL 3D Backdrop (Scoped strictly to Hero Section, will not chase user down the page) -->
    <WebglBackdrop />

    <!-- Top Interactive Kinetic Pill Badge -->
    <div class="inline-flex items-center gap-2.5 px-4 py-2 rounded-full spatial-glass text-xs font-semibold mb-6 w-fit shadow-md hover:scale-105 transition-transform cursor-default">
      <span class="w-2.5 h-2.5 rounded-full bg-[#00C864] dark:bg-[#00FF88] animate-ping" />
      <span class="text-[#022C22] dark:text-[#00FF88] font-mono tracking-wider">
        NEXT-GEN 3D SPATIAL & ENTERPRISE ARCHITECTURE
      </span>
    </div>

    <!-- Editorial Avant-Garde Typography -->
    <h1 class="font-display font-extrabold tracking-tight leading-[0.98] text-[clamp(2.4rem,6vw,5.5rem)] uppercase text-[#022C22] dark:text-[#F4FBF7] max-w-3xl mb-6 select-none relative z-10">
      สถาปัตยกรรม<br>
      <span class="text-[#00C864] dark:text-[#00FF88] text-stroke-emerald">แห่งอนาคต</span>
      <span class="block text-[clamp(2rem,4.8vw,4.4rem)]">เพื่อความยั่งยืนของธุรกิจ</span>
    </h1>

    <!-- Subtitle with Modern Spacing -->
    <p class="text-base sm:text-lg opacity-85 max-w-xl leading-relaxed mb-10 font-normal relative z-10">
      ศูนย์รวมผลิตภัณฑ์ ฮาร์ดแวร์อัจฉริยะ และบริการระบบคลาวด์มาตรฐานระดับโลก พร้อมให้คุณเข้ามาเลือกชมและปรึกษาได้ทันทีโดยไม่ต้องลงทะเบียน
    </p>

    <!-- Standard, Modern Clickable Action Buttons -->
    <div class="flex flex-wrap items-center gap-4 relative z-10">
      <a
        href="#products"
        class="px-8 py-4 rounded-2xl font-bold text-sm bg-[#00C864] text-[#022C22] dark:bg-[#00FF88] dark:text-[#020806] hover:opacity-90 hover:scale-105 active:scale-95 transition-all flex items-center gap-2 shadow-xl"
      >
        <span>เลือกชมสินค้าและบริการ</span>
        <ArrowDown class="w-4 h-4" />
      </a>

      <a
        href="#contact"
        class="px-8 py-4 rounded-2xl font-semibold text-sm spatial-glass hover:bg-[#00C864]/10 hover:scale-105 active:scale-95 transition-all flex items-center gap-2"
      >
        <ArrowUpRight class="w-4 h-4 text-[#00C864] dark:text-[#00FF88]" />
        <span>ติดต่อขอคำปรึกษา</span>
      </a>
    </div>

    <!-- Animated Smooth KPI Numbers Bar (Clean Spatial Glass without harsh line) -->
    <div class="spatial-glass rounded-3xl p-6 sm:p-8 mt-16 grid grid-cols-2 sm:grid-cols-4 gap-6 relative z-10">
      <div v-for="st in stats" :key="st.label" class="space-y-1">
        <div class="text-3xl sm:text-4xl font-display font-extrabold text-[#00C864] dark:text-[#00FF88] tracking-tight">
          {{ st.val }}{{ st.suffix }}
        </div>
        <div class="text-xs sm:text-sm opacity-70 font-medium">
          {{ st.label }}
        </div>
      </div>
    </div>
  </section>
</template>
