<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { ArrowLeft, ArrowRight, ArrowUpRight } from 'lucide-vue-next'
import type { ProjectCase } from '~/types/strapi'
import { useStrapiContent } from '~/composables/useStrapiContent'
import { useTheme } from '~/composables/useTheme'

const { getCases } = useStrapiContent()
const { setCursor, resetCursor } = useTheme()

const cases = ref<ProjectCase[]>([])
const trackRef = ref<HTMLDivElement | null>(null)

onMounted(async () => {
  cases.value = await getCases()
})

const scrollTrack = (direction: 'left' | 'right') => {
  if (!trackRef.value) return
  const offset = direction === 'left' ? -460 : 460
  trackRef.value.scrollBy({ left: offset, behavior: 'smooth' })
}
</script>

<template>
  <section id="showcase" class="py-24 relative z-10 overflow-hidden">
    <div class="max-w-[1440px] mx-auto px-5 sm:px-10 lg:px-16 mb-12 flex flex-col sm:flex-row sm:items-end justify-between gap-6">
      <SectionHeading
        eyebrow="03 // DEPLOYED FLAGSHIPS"
        title-prefix="ผลงานระดับ"
        title-highlight="องค์กร"
        size="xl"
      />

      <!-- Navigation Scroll Buttons -->
      <div class="flex items-center gap-3">
        <button
          type="button"
          aria-label="Scroll Left"
          class="w-12 h-12 rounded-full spatial-glass flex items-center justify-center hover:bg-[#00C864] hover:text-[#022C22] dark:hover:bg-[#00FF88] dark:hover:text-[#020806] transition-colors"
          @click="scrollTrack('left')"
        >
          <ArrowLeft class="w-5 h-5" />
        </button>
        <button
          type="button"
          aria-label="Scroll Right"
          class="w-12 h-12 rounded-full spatial-glass flex items-center justify-center hover:bg-[#00C864] hover:text-[#022C22] dark:hover:bg-[#00FF88] dark:hover:text-[#020806] transition-colors"
          @click="scrollTrack('right')"
        >
          <ArrowRight class="w-5 h-5" />
        </button>
      </div>
    </div>

    <!-- Horizontal Track Container -->
    <div
      ref="trackRef"
      class="flex gap-6 overflow-x-auto no-scrollbar px-5 sm:px-10 lg:px-16 pb-8 snap-x snap-mandatory"
    >
      <div
        v-for="(item, idx) in cases"
        :key="item.caseNumber"
        :class="[
          'snap-start shrink-0 w-[85vw] sm:w-[460px] rounded-[2rem] p-8 flex flex-col justify-between min-h-[380px] group transition-transform duration-300 hover:-translate-y-1',
          item.isCta
            ? 'bg-[#022C22] text-[#F6F9F7] dark:bg-[#00FF88] dark:text-[#020806]'
            : 'spatial-glass'
        ]"
        @mouseenter="setCursor(`CASE 0${idx + 1}`)"
        @mouseleave="resetCursor"
      >
        <div>
          <div :class="['flex items-center justify-between text-xs font-mono mb-8', item.isCta ? 'opacity-75' : 'opacity-60']">
            <span>{{ item.caseNumber }}</span>
            <span>{{ item.sector }}</span>
          </div>

          <h3 :class="['text-2xl sm:text-3xl font-bold mb-4 transition-colors', item.isCta ? '' : 'group-hover:text-[#00C864] dark:group-hover:text-[#00FF88]']">
            {{ item.title }}
          </h3>

          <p :class="['text-sm sm:text-base leading-relaxed', item.isCta ? 'opacity-90' : 'opacity-80']">
            {{ item.description }}
          </p>
        </div>

        <div v-if="!item.isCta" class="pt-6 border-t border-current/15 flex items-end justify-between">
          <div>
            <div class="text-3xl font-display font-extrabold text-[#00C864] dark:text-[#00FF88]">
              {{ item.metric }}
            </div>
            <div class="text-xs font-mono opacity-60">
              {{ item.metricLabel }}
            </div>
          </div>
          <span class="px-3 py-1 rounded-full text-xs font-mono border border-current/20">
            {{ item.year }}
          </span>
        </div>

        <a
          v-else
          href="#initiate"
          class="inline-flex items-center justify-between w-full px-6 py-4 rounded-2xl bg-white/15 dark:bg-black/15 font-mono text-xs font-bold uppercase tracking-wider hover:opacity-85 transition-opacity"
        >
          <span>เริ่มต้นพูดคุยกับเรา</span>
          <ArrowUpRight class="w-4 h-4" />
        </a>
      </div>
    </div>
  </section>
</template>
