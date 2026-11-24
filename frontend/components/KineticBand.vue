<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount } from 'vue'

const skewAngle = ref(0)
let lastScrollY = 0
let lastTime = 0
let animFrameId: number | null = null

const onScroll = () => {
  if (typeof window === 'undefined') return
  const now = performance.now()
  const dt = Math.max(1, now - lastTime)
  const dy = window.scrollY - lastScrollY
  const velocity = dy / dt

  // Calculate dynamic skew based on scroll speed (bounded safely between -6deg and 6deg)
  const target = Math.max(-6, Math.min(6, velocity * 3.5))
  skewAngle.value = target

  lastScrollY = window.scrollY
  lastTime = now
}

const updateInertia = () => {
  // Smoothly damp back to 0
  skewAngle.value *= 0.92
  animFrameId = requestAnimationFrame(updateInertia)
}

onMounted(() => {
  if (import.meta.client) {
    lastScrollY = window.scrollY
    lastTime = performance.now()
    window.addEventListener('scroll', onScroll, { passive: true })
    animFrameId = requestAnimationFrame(updateInertia)
  }
})

onBeforeUnmount(() => {
  if (import.meta.client) {
    window.removeEventListener('scroll', onScroll)
    if (animFrameId) cancelAnimationFrame(animFrameId)
  }
})
</script>

<template>
  <section class="py-12 overflow-hidden relative z-20 reveal-init">
    <div
      class="diagonal-band bg-[#022C22] text-[#F6F9F7] dark:bg-[#00FF88] dark:text-[#020806] py-5 border-y-2 border-[#00C864] dark:border-white shadow-2xl transition-transform duration-100 ease-out"
      :style="{ transform: `rotate(-2.2deg) skewX(${skewAngle}deg) scale(1.03)` }"
    >
      <div class="flex whitespace-nowrap animate-marquee-fast font-display font-extrabold text-2xl sm:text-4xl tracking-wider uppercase items-center gap-10">
        <span>SPATIAL WEBGL 3D</span>
        <span>✦</span>
        <span>AUTONOMOUS AI AGENTS</span>
        <span>✦</span>
        <span>ZERO-TRUST CLOUD</span>
        <span>✦</span>
        <span>KINETIC INTERFACES</span>
        <span>✦</span>
        <span>PREDICTIVE ANALYTICS</span>
        <span>✦</span>
        <span>SPATIAL WEBGL 3D</span>
        <span>✦</span>
        <span>AUTONOMOUS AI AGENTS</span>
        <span>✦</span>
        <span>ZERO-TRUST CLOUD</span>
        <span>✦</span>
        <span>KINETIC INTERFACES</span>
        <span>✦</span>
        <span>PREDICTIVE ANALYTICS</span>
        <span>✦</span>
      </div>
    </div>
  </section>
</template>
