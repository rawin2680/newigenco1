<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount } from 'vue'
import { ArrowDown, ArrowUpRight } from 'lucide-vue-next'
import WebglBackdrop from '~/components/WebglBackdrop.vue'

const stats = ref([
  { val: 0, target: 100, suffix: '%', label: 'บริการให้คำปรึกษาฟรี' },
  { val: 0, target: 50, suffix: '+', label: 'ผลิตภัณฑ์และโซลูชัน' },
  { val: 0, target: 99, suffix: '.9%', label: 'ความเสถียรของระบบ' },
  { val: 0, target: 24, suffix: '/7', label: 'รับเรื่องและประสานงาน' }
])

// 1. Scroll-Linked Text Fill Ratio (0 to 100%)
const scrollFillPercent = ref(0)

// 2. Interactive Radial Spotlight Mask Coordinates
const headlineRef = ref<HTMLElement | null>(null)
const mouseX = ref(150)
const mouseY = ref(50)
const isHovering = ref(false)

// 3. Kinetic Typography 3D Micro-Tilt
const tiltX = ref(0)
const tiltY = ref(0)

let mouseRaf: number | null = null
const onMouseMove = (e: MouseEvent) => {
  if (mouseRaf) return
  mouseRaf = requestAnimationFrame(() => {
    mouseRaf = null
    if (!headlineRef.value) return
    const rect = headlineRef.value.getBoundingClientRect()
    mouseX.value = e.clientX - rect.left
    mouseY.value = e.clientY - rect.top
    isHovering.value = true

    const normX = (mouseX.value / rect.width) * 2 - 1
    const normY = (mouseY.value / rect.height) * 2 - 1
    tiltX.value = normX * 3.5
    tiltY.value = -normY * 3.5
  })
}

const onMouseLeave = () => {
  isHovering.value = false
  tiltX.value = 0
  tiltY.value = 0
}

const onScroll = () => {
  if (typeof window !== 'undefined') {
    const y = window.scrollY
    scrollFillPercent.value = Math.min(100, Math.max(0, (y / 240) * 100))
  }
}

// 4. Staggered Entrance Animation
const isEntered = ref(false)

onMounted(() => {
  if (import.meta.client) {
    setTimeout(() => {
      isEntered.value = true
    }, 60)

    window.addEventListener('scroll', onScroll, { passive: true })
    onScroll()

    // KPI Numbers count-up
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

onBeforeUnmount(() => {
  if (import.meta.client) {
    window.removeEventListener('scroll', onScroll)
  }
})
</script>

<template>
  <section id="top" class="relative min-h-[90vh] flex flex-col justify-center pt-32 pb-20 px-5 sm:px-10 lg:px-16 max-w-[1440px] mx-auto overflow-hidden">
    <!-- WebGL 3D Backdrop (Scoped strictly to Hero Section) -->
    <WebglBackdrop />

    <!-- Top Interactive Kinetic Pill Badge -->
    <div
      :class="[
        'inline-flex items-center gap-2.5 px-4 py-2 rounded-full spatial-glass text-xs font-semibold mb-6 w-fit shadow-md hover:scale-105 transition-all duration-700 ease-out cursor-default',
        isEntered ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-4'
      ]"
    >
      <span class="w-2.5 h-2.5 rounded-full bg-[#00C864] dark:bg-[#00FF88] animate-ping" />
      <span class="text-[#022C22] dark:text-[#00FF88] font-mono tracking-wider">
        NEXT-GEN 3D SPATIAL & ENTERPRISE ARCHITECTURE
      </span>
    </div>

    <!-- Editorial Avant-Garde Kinetic Headline with Spotlight & Scroll-Linked Text Fill -->
    <div
      ref="headlineRef"
      class="relative z-10 max-w-4xl mb-6 select-none cursor-default group"
      @mousemove="onMouseMove"
      @mouseleave="onMouseLeave"
      :style="{
        transform: `perspective(1000px) rotateX(${tiltY}deg) rotateY(${tiltX}deg)`,
        transition: isHovering ? 'transform 0.12s ease-out' : 'transform 0.6s cubic-bezier(0.16, 1, 0.3, 1)'
      }"
    >
      <h1 class="font-display font-black tracking-tight leading-[1.24] text-[clamp(2.3rem,5.6vw,5.2rem)] uppercase text-[#022C22] dark:text-[#F4FBF7]">
        <span class="block">
          <span
            :class="[
              'block transition-all duration-1000 ease-[cubic-bezier(0.16,1,0.3,1)]',
              isEntered ? 'translate-y-0 opacity-100' : 'translate-y-[0.3em] opacity-0'
            ]"
          >
            ขับเคลื่อนองค์กรสู่อนาคต
          </span>
        </span>

        <!-- Line 2: CSS -webkit-text-stroke + Scroll-Linked Fill + Radial Spotlight Mask -->
        <span class="block">
          <span
            :class="[
              'relative inline-block transition-all duration-1000 delay-150 ease-[cubic-bezier(0.16,1,0.3,1)]',
              isEntered ? 'translate-y-0 opacity-100' : 'translate-y-[0.3em] opacity-0'
            ]"
          >
            <!-- 1. Outlined Base Stroke Text (-webkit-text-stroke) -->
            <span class="text-stroke-kinetic">
              ด้วยเทคโนโลยีอัจฉริยะ
            </span>

            <!-- 2. Scroll-Linked Text Fill (Fills gradient as user scrolls) -->
            <span
              aria-hidden="true"
              class="absolute inset-0 pointer-events-none bg-gradient-to-r from-[#00C864] via-[#00FF88] to-[#022C22] dark:to-white bg-clip-text text-transparent transition-all duration-150"
              :style="{
                clipPath: `inset(-0.15em ${100 - scrollFillPercent}% -0.15em 0)`
              }"
            >
              ด้วยเทคโนโลยีอัจฉริยะ
            </span>

            <!-- 3. Interactive Radial Spotlight Mask (mask-image follows mouse) -->
            <span
              v-if="isHovering"
              aria-hidden="true"
              class="absolute inset-0 pointer-events-none bg-gradient-to-r from-emerald-300 via-[#00FF88] to-emerald-100 bg-clip-text text-transparent drop-shadow-[0_0_18px_rgba(0,255,136,0.65)]"
              :style="{
                maskImage: `radial-gradient(circle 200px at ${mouseX}px ${mouseY}px, black 30%, transparent 100%)`,
                WebkitMaskImage: `radial-gradient(circle 200px at ${mouseX}px ${mouseY}px, black 30%, transparent 100%)`
              }"
            >
              ด้วยเทคโนโลยีอัจฉริยะ
            </span>
          </span>
        </span>
      </h1>
    </div>

    <!-- Subtitle with Modern Spacing & Smooth Blur-to-Focus Fade -->
    <p
      :class="[
        'text-base sm:text-lg opacity-85 max-w-2xl leading-relaxed mb-10 font-normal relative z-10 transition-all duration-1000 delay-300 ease-out',
        isEntered ? 'translate-y-0 opacity-85 filter-none' : 'translate-y-6 opacity-0 blur-sm'
      ]"
    >
      พัฒนาศักยภาพธุรกิจด้วยโซลูชันดิจิทัล ระบบบริหารจัดการ และนวัตกรรม AI ที่ช่วยให้องค์กรทำงานได้อย่างมีประสิทธิภาพ พร้อมเติบโตในยุคดิจิทัล
    </p>

    <!-- Standard, Modern Clickable Action Buttons -->
    <div
      :class="[
        'flex flex-wrap items-center gap-4 relative z-10 transition-all duration-1000 delay-400 ease-out',
        isEntered ? 'translate-y-0 opacity-100' : 'translate-y-6 opacity-0'
      ]"
    >
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

    <!-- Animated Smooth KPI Numbers Bar (Clean Spatial Glass) -->
    <div
      :class="[
        'spatial-glass rounded-3xl p-6 sm:p-8 mt-16 grid grid-cols-2 sm:grid-cols-4 gap-6 relative z-10 hover-lift transition-all duration-1000 delay-500 ease-out',
        isEntered ? 'translate-y-0 opacity-100 scale-100' : 'translate-y-8 opacity-0 scale-95'
      ]"
    >
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
