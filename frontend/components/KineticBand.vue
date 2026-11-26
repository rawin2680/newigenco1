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
  { id: 'guts', name: 'GUTS Security', image: '/images/clients/guts.png' },
  { id: 'ktbgs', name: 'KTBGS', image: '/images/clients/ktbgs.png' },
  { id: 'thairung', name: 'Thairung Group', image: '/images/clients/thairung.png' },
  { id: 'anutint', name: 'Anutint', image: '/images/clients/anutint.png' },
  { id: 'fj', name: 'FootJoy (FJ)', image: '/images/clients/fj.png' },
  { id: 'chiangmai-nightsafari', name: 'เชียงใหม่ไนท์ซาฟารี', image: '/images/clients/chiangmai-nightsafari.jpg' },
  { id: 'tla', name: 'สมาคมห้องสมุดแห่งประเทศไทยฯ', image: '/images/clients/tla.png' },
  { id: 'tsccm', name: 'สมาคมเวชบำบัดวิกฤตแห่งประเทศไทย', image: '/images/clients/tsccm.png' },
  { id: 'tsmfm', name: 'สมาคมเวชศาสตร์มารดาและทารกในครรภ์(ไทย)', image: '/images/clients/tsmfm.jpg' },
  { id: 'tpna', name: 'สมาคมพยาบาลห้องผ่าตัดแห่งประเทศไทย', image: '/images/clients/tpna.png' },
  { id: 'pmat', name: 'สมาคมการจัดการงานบุคคลแห่งประเทศไทย (PMAT)', image: '/images/clients/pmat.png' },
  { id: 'onep', name: 'สำนักงานนโยบายและแผนทรัพยากรธรรมชาติและสิ่งแวดล้อม', image: '/images/clients/onep.png' },
  { id: 'ieat', name: 'การนิคมอุตสาหกรรมแห่งประเทศไทย', image: '/images/clients/ieat.png' },
  { id: 'rtarf', name: 'กองทัพไทย', image: '/images/clients/rtarf.png' },
  { id: 'sat', name: 'การกีฬาแห่งประเทศไทย (กกท.)', image: '/images/clients/sat.png' },
  { id: 'flame', name: 'Partner Logo', image: '/images/clients/flame.png' }
]

const SLOT_COUNT = 6
const batchOffset = ref(0)
const batchCounter = ref(0)
const slots = ref<LogoItem[]>(logoPool.slice(0, SLOT_COUNT))

let swapTimer: ReturnType<typeof setInterval> | null = null

const advanceBatch = () => {
  batchOffset.value = (batchOffset.value + SLOT_COUNT) % logoPool.length
  const nextSlots: LogoItem[] = []
  for (let i = 0; i < SLOT_COUNT; i++) {
    nextSlots.push(logoPool[(batchOffset.value + i) % logoPool.length])
  }
  slots.value = nextSlots
  batchCounter.value += 1
}

onMounted(() => {
  swapTimer = setInterval(advanceBatch, 3500)
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

      <!-- Single-Row 6-Logo Showcase (Larger, Borderless, Sequential Blur-to-Focus) -->
      <div class="grid grid-cols-3 md:grid-cols-6 items-center justify-items-center gap-6 sm:gap-10 py-4">
        <div
          v-for="(item, idx) in slots"
          :key="idx"
          class="relative w-full h-28 sm:h-32 lg:h-36 flex items-center justify-center"
        >
          <Transition name="blur-focus" mode="out-in">
            <img
              :key="`${item.id}-${batchCounter}`"
              :src="item.image"
              :alt="item.name"
              :title="item.name"
              class="max-h-24 sm:max-h-28 lg:max-h-32 max-w-full w-auto object-contain select-none transition-transform duration-300 hover:scale-110"
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
