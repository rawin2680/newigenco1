<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { BrainCircuit, Box, ShieldCheck, Activity, ArrowRight } from 'lucide-vue-next'
import type { CapabilityModule } from '~/types/strapi'
import { useStrapiContent } from '~/composables/useStrapiContent'
import { useTheme } from '~/composables/useTheme'

const { getCapabilities } = useStrapiContent()
const { setCursor, resetCursor } = useTheme()

const capabilities = ref<CapabilityModule[]>([])

onMounted(async () => {
  capabilities.value = await getCapabilities()
})

const getIconComponent = (name: string) => {
  switch (name) {
    case 'BrainCircuit': return BrainCircuit
    case 'ShieldCheck': return ShieldCheck
    case 'Activity': return Activity
    default: return Box
  }
}
</script>

<template>
  <section id="capabilities" class="py-28 px-5 sm:px-10 lg:px-16 max-w-[1440px] mx-auto relative z-10">
    <!-- Asymmetric Section Header -->
    <div class="content-card p-6 sm:p-10 grid grid-cols-1 lg:grid-cols-12 gap-8 mb-14">
      <div class="lg:col-span-7">
        <SectionHeading
          eyebrow="01 // ARCHITECTURAL MODULES"
          title-prefix="ฉีกกฎการสร้าง"
          title-highlight="แพลตฟอร์มธุรกิจยุคใหม่"
          size="xl"
        />
      </div>
      <div class="lg:col-span-5 flex items-end">
        <p class="text-base sm:text-lg opacity-80 leading-relaxed">
          เราไม่สร้างเว็บไซต์สำเร็จรูปที่ดูเหมือนกันไปหมด แต่เราสร้าง <strong>Digital Flagship</strong> ที่มีเอกลักษณ์เฉพาะตัว โหลดไวระดับเสี้ยววินาที และทำงานร่วมกับ AI ได้จริง
        </p>
      </div>
    </div>

    <!-- Staggered Overlapping Spatial Cards -->
    <div class="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
      <article
        v-for="(mod, index) in capabilities"
        :key="mod.code"
        :class="[
          'md:col-span-6 rounded-[2rem] p-8 sm:p-10 relative group transition-all duration-300 hover:-translate-y-2',
          index % 2 === 1 ? 'md:mt-20' : '',
          mod.isHighlighted
            ? 'bg-[#022C22] text-[#F6F9F7] dark:bg-[#00FF88] dark:text-[#020806] shadow-2xl'
            : 'spatial-glass'
        ]"
        @mouseenter="setCursor(mod.code)"
        @mouseleave="resetCursor"
      >
        <div class="xray-meta opacity-0 -translate-y-2 transition-all duration-300 text-[11px] font-mono text-[#00C864] dark:text-[#00FF88] mb-3">
          {{ mod.archLayer }}
        </div>

        <div class="flex items-start justify-between mb-8">
          <span :class="['font-display font-extrabold text-5xl', mod.isHighlighted ? '' : 'text-[#00C864] dark:text-[#00FF88]']">
            {{ mod.code }}
          </span>
          <div
            :class="[
              'w-12 h-12 rounded-2xl flex items-center justify-center transition-colors',
              mod.isHighlighted
                ? 'border border-current/30'
                : 'border border-current/20 group-hover:bg-[#00C864] group-hover:text-[#022C22] dark:group-hover:bg-[#00FF88] dark:group-hover:text-[#020806]'
            ]"
          >
            <component :is="getIconComponent(mod.icon)" class="w-6 h-6" />
          </div>
        </div>

        <h3 class="text-2xl sm:text-3xl font-bold mb-4">
          {{ mod.title }}
        </h3>

        <p :class="['leading-relaxed mb-6', mod.isHighlighted ? 'opacity-90' : 'opacity-80']">
          {{ mod.description }}
        </p>

        <div v-if="!mod.isHighlighted" class="flex flex-wrap gap-2 text-xs font-mono">
          <span
            v-for="tag in mod.tags"
            :key="tag"
            class="px-3 py-1 rounded-full border border-current/20"
          >
            {{ tag }}
          </span>
        </div>

        <a
          v-else
          href="#synthesizer"
          class="inline-flex items-center gap-2 font-mono text-xs font-bold uppercase tracking-wider underline underline-offset-4"
        >
          <span>ทดลองจำลองระบบกับ AI</span>
          <ArrowRight class="w-4 h-4" />
        </a>
      </article>
    </div>
  </section>
</template>
