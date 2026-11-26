<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import { Sparkles } from 'lucide-vue-next'
import SectionHeading from '~/components/SectionHeading.vue'

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
  { id: 'flame', name: 'Partner Logo', image: '/images/clients/flame.png' },
  { id: 'mcru', name: 'มหาวิทยาลัยราชภัฏหมู่บ้านจอมบึง', image: '/images/clients/mcru.png' },
  { id: 'navy', name: 'กองทัพเรือ', image: '/images/clients/navy.png' },
  { id: 'ttt', name: 'TT&T Public Company Limited', image: '/images/clients/ttt.png' },
  { id: 'dpa', name: 'สถาบันคุ้มครองเงินฝาก (สคฝ.)', image: '/images/clients/dpa.png' },
  { id: 'prowaste', name: 'PROWASTE', image: '/images/clients/prowaste.png' },
  { id: 'business-coach', name: 'Business Coach & Consulting', image: '/images/clients/business-coach.png' }
]

const SLOT_COUNT = 5
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
      <div class="mb-12">
        <SectionHeading
          eyebrow="CLIENTS & PARTNER ECOSYSTEM // กลุ่มผู้ใช้ผลิตภัณฑ์และพันธมิตร"
          title-prefix="กลุ่มผู้ใช้ผลิตภัณฑ์และพันธมิตรที่"
          title-highlight="ให้ความไว้วางใจ IGENCO"
          align="center"
          size="md"
          :show-radial-grid="true"
          :icon="Sparkles"
        />
      </div>

      <!-- Single-Row 5-Logo Showcase (Larger, Borderless, Simultaneous Blur-to-Focus) -->
      <div class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 items-center justify-items-center gap-6 sm:gap-10 py-4">
        <div
          v-for="(item, idx) in slots"
          :key="idx"
          class="relative w-full h-32 sm:h-36 lg:h-40 flex items-center justify-center"
        >
          <Transition name="blur-focus" mode="out-in">
            <img
              :key="`${item.id}-${batchCounter}`"
              :src="item.image"
              :alt="item.name"
              :title="item.name"
              class="max-h-28 sm:max-h-32 lg:max-h-36 max-w-full w-auto object-contain select-none transition-transform duration-300 hover:scale-110"
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
