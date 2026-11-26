<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import { Sparkles } from 'lucide-vue-next'

type LogoItem = {
  id: string
  name: string
  image: string
}

const logoPool: LogoItem[] = [
  { id: 'tat', name: 'การท่องเที่ยวแห่งประเทศไทย (ททท.)', image: '/images/clients/tat.png' },
  { id: 'tceb', name: 'TCEB', image: '/images/clients/tceb.png' },
  { id: 'sju', name: 'มหาวิทยาลัยเซนต์จอห์น', image: '/images/clients/sju.png' },
  { id: 'pcru', name: 'มหาวิทยาลัยราชภัฏเพชรบูรณ์', image: '/images/clients/pcru.png' },
  { id: 'mcru', name: 'มหาวิทยาลัยราชภัฏหมู่บ้านจอมบึง', image: '/images/clients/mcru.jpg' },
  { id: 'guts', name: 'GUTS Security', image: '/images/clients/guts.png' }
]

// 6 ช่องโลโก้ในบรรทัดเดียว
const slots = ref<LogoItem[]>([...logoPool])
const swapCounters = ref<number[]>([0, 0, 0, 0, 0, 0])

let swapTimer: ReturnType<typeof setInterval> | null = null

const swapRandomSlot = () => {
  // สุ่มเลือก 1 ช่องจาก 6 ช่อง เพื่อเปลี่ยนจากโลโก้ A -> โลโก้ B
  const slotIdx = Math.floor(Math.random() * slots.value.length)
  const currentId = slots.value[slotIdx].id
  const candidates = logoPool.filter(item => item.id !== currentId)
  const nextLogo = candidates[Math.floor(Math.random() * candidates.length)]

  slots.value[slotIdx] = nextLogo
  swapCounters.value[slotIdx] += 1
}

onMounted(() => {
  swapTimer = setInterval(swapRandomSlot, 2200)
})

onUnmounted(() => {
  if (swapTimer) clearInterval(swapTimer)
})
</script>

<template>
  <section id="clients" class="py-16 sm:py-20 overflow-hidden relative z-20 reveal-init scroll-mt-24">
    <div class="max-w-[1440px] mx-auto px-5 sm:px-10">
      <div class="mb-10">
        <div class="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-[0.25em] text-[#00C864] dark:text-[#00FF88] mb-2 font-bold">
          <Sparkles class="w-3.5 h-3.5" />
          <span>CLIENTS & PARTNER ECOSYSTEM // กลุ่มผู้ใช้ผลิตภัณฑ์และพันธมิตร</span>
        </div>
        <h3 class="text-xl sm:text-2xl font-bold tracking-tight">
          กลุ่มผู้ใช้ผลิตภัณฑ์และพันธมิตรที่ให้ความไว้วางใจ IGENCO
        </h3>
      </div>

      <!-- Single-Row 6-Logo Showcase (No Borders, No Cards, Blur-to-Focus Random Swap) -->
      <div class="grid grid-cols-3 md:grid-cols-6 items-center justify-items-center gap-6 sm:gap-10 py-4">
        <div
          v-for="(item, idx) in slots"
          :key="idx"
          class="relative w-full h-24 sm:h-28 lg:h-32 flex items-center justify-center"
        >
          <Transition name="blur-focus" mode="out-in">
            <img
              :key="`${item.id}-${swapCounters[idx]}`"
              :src="item.image"
              :alt="item.name"
              :title="item.name"
              class="max-h-20 sm:max-h-24 lg:max-h-28 max-w-full w-auto object-contain select-none transition-transform duration-300 hover:scale-110"
              loading="lazy"
            />
          </Transition>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
/* Blur-to-Focus Crossfade Transition */
.blur-focus-enter-active {
  transition:
    opacity 0.65s cubic-bezier(0.22, 1, 0.36, 1),
    transform 0.65s cubic-bezier(0.22, 1, 0.36, 1),
    filter 0.65s cubic-bezier(0.22, 1, 0.36, 1);
}

.blur-focus-leave-active {
  transition:
    opacity 0.45s ease-in,
    transform 0.45s ease-in,
    filter 0.45s ease-in;
}

.blur-focus-enter-from {
  opacity: 0;
  transform: scale(0.92);
  filter: blur(8px);
}

.blur-focus-enter-to {
  opacity: 1;
  transform: scale(1);
  filter: blur(0px);
}

.blur-focus-leave-from {
  opacity: 1;
  transform: scale(1);
  filter: blur(0px);
}

.blur-focus-leave-to {
  opacity: 0;
  transform: scale(0.94);
  filter: blur(8px);
}
</style>
