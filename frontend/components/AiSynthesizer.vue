<script setup lang="ts">
import { ref, computed, onMounted, onBeforeUnmount } from 'vue'
import { Sparkles, Copy, ArrowRight } from 'lucide-vue-next'
import { useStrapiContent } from '~/composables/useStrapiContent'
import { useTheme } from '~/composables/useTheme'

const { mockSectorBlueprints } = useStrapiContent()
const { showToast, setCursor, resetCursor } = useTheme()

const sliderScale = ref(2)
const sliderAi = ref(85)
const currentSector = ref('fintech')
const customDirective = ref('')
const activePrompt = ref('')

const scaleMap: Record<number, { label: string; mult: number; time: string }> = {
  1: { label: 'STARTUP (2X)', mult: 0.85, time: '2 WKS' },
  2: { label: 'ENTERPRISE (10X)', mult: 1.0, time: '4 WKS' },
  3: { label: 'GLOBAL (100X)', mult: 1.25, time: '6 WKS' }
}

const currentScaleInfo = computed(() => scaleMap[sliderScale.value])

const currentBlueprint = computed(() => {
  const base = mockSectorBlueprints[currentSector.value]
  const mult = currentScaleInfo.value.mult
  const aiRatio = sliderAi.value / 85

  const calculatedRoi = Math.round(base.baseRoi * mult * aiRatio)
  const calculatedCost = Math.min(75, Math.round(base.baseCost * aiRatio))

  return {
    codeTag: `// CODE: ${currentSector.value.toUpperCase()}-S${sliderScale.value}-${sliderAi.value}AI`,
    title: activePrompt.value ? `Custom Architecture: ${activePrompt.value}` : base.title,
    description: activePrompt.value
      ? `ออกแบบสถาปัตยกรรมเฉพาะทางสำหรับโจทย์ "${activePrompt.value}" โดยผสานระบบอัตโนมัติระดับ ${sliderAi.value}% บนโครงสร้างพื้นฐานระดับ ${currentScaleInfo.value.label} เพื่อประสิทธิภาพสูงสุด`
      : base.description,
    roi: `+${calculatedRoi}%`,
    cost: `-${calculatedCost}%`,
    time: currentScaleInfo.value.time
  }
})

// Neural visualizer wave bars
const waveHeights = ref([8, 16, 12, 20, 10, 16])
let waveInterval: any = null

onMounted(() => {
  waveInterval = setInterval(() => {
    waveHeights.value = waveHeights.value.map(() => Math.floor(Math.random() * 16) + 4)
  }, 380)
})

onBeforeUnmount(() => {
  if (waveInterval) clearInterval(waveInterval)
})

const selectSector = (secKey: string) => {
  currentSector.value = secKey
  activePrompt.value = ''
}

const handleSynthesize = () => {
  if (customDirective.value.trim()) {
    activePrompt.value = customDirective.value.trim()
    showToast('SYNTHESIZED CUSTOM ARCHITECTURE DIRECTIVE')
  }
}

const copySpec = () => {
  const specText = `[VERDANT LABS BLUEPRINT]\n${currentBlueprint.value.title}\n${currentBlueprint.value.description}\nROI: ${currentBlueprint.value.roi} | Cost: ${currentBlueprint.value.cost} | Timeline: ${currentBlueprint.value.time}`
  if (import.meta.client) {
    const tempInput = document.createElement('textarea')
    tempInput.value = specText
    document.body.appendChild(tempInput)
    tempInput.select()
    document.execCommand('copy')
    document.body.removeChild(tempInput)

    // Autofill into contact form if present
    const contactInput = document.getElementById('projectSummaryInput') as HTMLInputElement | null
    if (contactInput) {
      contactInput.value = currentBlueprint.value.title
    }
  }
  showToast('COPIED BLUEPRINT SPEC TO CLIPBOARD')
}
</script>

<template>
  <section id="synthesizer" class="py-24 px-5 sm:px-10 lg:px-16 max-w-[1440px] mx-auto relative z-10">
    <div class="spatial-glass rounded-[2.5rem] p-6 sm:p-12 lg:p-14 relative overflow-hidden">
      <!-- Header -->
      <div class="flex flex-col lg:flex-row lg:items-end justify-between gap-6 pb-10 border-b border-current/15">
        <div>
          <div class="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#00C864]/15 dark:bg-[#00FF88]/15 text-[#00A854] dark:text-[#00FF88] text-xs font-mono font-bold mb-3">
            <Sparkles class="w-3.5 h-3.5" />
            <span>02 // AI NEURAL STRATEGY SYNTHESIZER</span>
          </div>
          <h2 class="font-display font-extrabold text-3xl sm:text-5xl uppercase">
            สังเคราะห์โครงสร้างธุรกิจด้วย AI
          </h2>
        </div>
        <p class="text-sm sm:text-base opacity-80 max-w-md">
          ปรับแต่งพารามิเตอร์ด้านล่างหรือพิมพ์โจทย์องค์กรของคุณ ระบบจะคำนวณสถาปัตยกรรมเทคโนโลยีและผลลัพธ์เชิงตัวเลขให้ทันที
        </p>
      </div>

      <!-- Controls & Live Blueprint Display -->
      <div class="grid grid-cols-1 lg:grid-cols-12 gap-10 pt-10 items-stretch">
        <!-- Left: Sliders & Form -->
        <div class="lg:col-span-5 flex flex-col justify-between space-y-7">
          <div class="space-y-6">
            <!-- Parameter 1: Scale -->
            <div>
              <div class="flex justify-between text-xs font-mono uppercase mb-2">
                <span>ขนาดระบบ & การรองรับทราฟฟิก (SCALE)</span>
                <span class="font-bold text-[#00C864] dark:text-[#00FF88]">{{ currentScaleInfo.label }}</span>
              </div>
              <input
                v-model.number="sliderScale"
                type="range"
                min="1"
                max="3"
                class="w-full accent-[#00C864] dark:accent-[#00FF88] cursor-pointer"
              >
              <div class="flex justify-between text-[10px] font-mono opacity-50 mt-1">
                <span>STARTUP</span>
                <span>ENTERPRISE</span>
                <span>GLOBAL</span>
              </div>
            </div>

            <!-- Parameter 2: AI Autonomy -->
            <div>
              <div class="flex justify-between text-xs font-mono uppercase mb-2">
                <span>ระดับการทำงานอัตโนมัติ (AI AUTONOMY)</span>
                <span class="font-bold text-[#00C864] dark:text-[#00FF88]">{{ sliderAi }}% AUTONOMOUS</span>
              </div>
              <input
                v-model.number="sliderAi"
                type="range"
                min="30"
                max="100"
                class="w-full accent-[#00C864] dark:accent-[#00FF88] cursor-pointer"
              >
            </div>

            <!-- Parameter 3: Sector -->
            <div>
              <label class="block text-xs font-mono uppercase mb-2.5">อุตสาหกรรมหลัก (SECTOR NODE)</label>
              <div class="grid grid-cols-2 gap-2.5">
                <button
                  type="button"
                  :class="[
                    'px-3.5 py-2.5 rounded-xl text-xs font-mono font-bold transition-all',
                    currentSector === 'fintech'
                      ? 'border border-[#00C864] bg-[#00C864] text-[#022C22] dark:border-[#00FF88] dark:bg-[#00FF88] dark:text-[#020806]'
                      : 'border border-current/20 hover:border-[#00C864]'
                  ]"
                  @click="selectSector('fintech')"
                >
                  FINTECH & FINANCE
                </button>
                <button
                  type="button"
                  :class="[
                    'px-3.5 py-2.5 rounded-xl text-xs font-mono font-bold transition-all',
                    currentSector === 'commerce'
                      ? 'border border-[#00C864] bg-[#00C864] text-[#022C22] dark:border-[#00FF88] dark:bg-[#00FF88] dark:text-[#020806]'
                      : 'border border-current/20 hover:border-[#00C864]'
                  ]"
                  @click="selectSector('commerce')"
                >
                  NEXT-GEN RETAIL
                </button>
                <button
                  type="button"
                  :class="[
                    'px-3.5 py-2.5 rounded-xl text-xs font-mono font-bold transition-all',
                    currentSector === 'logistics'
                      ? 'border border-[#00C864] bg-[#00C864] text-[#022C22] dark:border-[#00FF88] dark:bg-[#00FF88] dark:text-[#020806]'
                      : 'border border-current/20 hover:border-[#00C864]'
                  ]"
                  @click="selectSector('logistics')"
                >
                  SMART LOGISTICS
                </button>
                <button
                  type="button"
                  :class="[
                    'px-3.5 py-2.5 rounded-xl text-xs font-mono font-bold transition-all',
                    currentSector === 'saas'
                      ? 'border border-[#00C864] bg-[#00C864] text-[#022C22] dark:border-[#00FF88] dark:bg-[#00FF88] dark:text-[#020806]'
                      : 'border border-current/20 hover:border-[#00C864]'
                  ]"
                  @click="selectSector('saas')"
                >
                  ENTERPRISE SAAS
                </button>
              </div>
            </div>
          </div>

          <!-- Custom Directive Form -->
          <form class="pt-4 border-t border-current/15 space-y-3" @submit.prevent="handleSynthesize">
            <label for="synthInput" class="block text-xs font-mono uppercase opacity-75">
              โจทย์เฉพาะทางเพิ่มเติม (CUSTOM DIRECTIVE):
            </label>
            <div class="flex gap-2">
              <input
                id="synthInput"
                v-model="customDirective"
                type="text"
                placeholder="เช่น ต้องการระบบ AI วิเคราะห์พฤติกรรมลูกค้า..."
                class="flex-1 px-4 py-3 rounded-xl bg-white/50 dark:bg-black/40 border border-current/20 text-sm focus:outline-none focus:border-[#00C864] dark:focus:border-[#00FF88]"
              >
              <button
                type="submit"
                class="px-5 py-3 rounded-xl bg-[#022C22] text-white dark:bg-[#00FF88] dark:text-[#020806] font-mono text-xs font-bold uppercase tracking-wider hover:opacity-90 transition-opacity shrink-0"
                @mouseenter="setCursor('RUN')"
                @mouseleave="resetCursor"
              >
                SYNTHESIZE
              </button>
            </div>
          </form>
        </div>

        <!-- Right: Neural Blueprint Visualizer Card -->
        <div class="lg:col-span-7 rounded-3xl bg-[#020806] text-[#F4FBF7] p-6 sm:p-8 border border-[#00FF88]/30 flex flex-col justify-between relative overflow-hidden">
          <div>
            <div class="flex items-center justify-between gap-4 pb-5 border-b border-white/10">
              <div class="flex items-center gap-2.5">
                <span class="w-2.5 h-2.5 rounded-full bg-[#00FF88] animate-pulse" />
                <span class="font-mono text-xs tracking-widest text-[#00FF88]">NEURAL_BLUEPRINT // OUTPUT</span>
              </div>
              <!-- Animated Waveform Bars -->
              <div class="flex items-end gap-1 h-5">
                <span
                  v-for="(h, idx) in waveHeights"
                  :key="idx"
                  class="w-1 bg-[#00FF88] rounded-full transition-all duration-150"
                  :style="{ height: `${h}px` }"
                />
              </div>
            </div>

            <!-- Blueprint Content -->
            <div class="mt-6 space-y-4">
              <div class="text-xs font-mono text-[#00FF88]/80">
                {{ currentBlueprint.codeTag }}
              </div>
              <h3 class="text-2xl sm:text-3xl font-bold text-white leading-snug">
                {{ currentBlueprint.title }}
              </h3>
              <p class="text-sm sm:text-base text-slate-300 leading-relaxed">
                {{ currentBlueprint.description }}
              </p>
            </div>
          </div>

          <!-- KPI Projection Metrics & Action -->
          <div class="mt-8 pt-6 border-t border-white/10">
            <div class="grid grid-cols-3 gap-3 mb-5">
              <div class="p-3.5 rounded-2xl bg-white/[0.04] border border-white/10">
                <div class="text-[11px] font-mono text-slate-400">EST. ROI LIFT</div>
                <div class="text-xl sm:text-2xl font-display font-extrabold text-[#00FF88] mt-1">
                  {{ currentBlueprint.roi }}
                </div>
              </div>
              <div class="p-3.5 rounded-2xl bg-white/[0.04] border border-white/10">
                <div class="text-[11px] font-mono text-slate-400">COST REDUCTION</div>
                <div class="text-xl sm:text-2xl font-display font-extrabold text-white mt-1">
                  {{ currentBlueprint.cost }}
                </div>
              </div>
              <div class="p-3.5 rounded-2xl bg-white/[0.04] border border-white/10">
                <div class="text-[11px] font-mono text-slate-400">DEPLOY TIME</div>
                <div class="text-xl sm:text-2xl font-display font-extrabold text-[#00FF88] mt-1">
                  {{ currentBlueprint.time }}
                </div>
              </div>
            </div>

            <div class="flex flex-wrap items-center justify-between gap-3">
              <button
                type="button"
                class="px-4 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-xs font-mono text-white flex items-center gap-2 transition-colors"
                @click="copySpec"
              >
                <Copy class="w-3.5 h-3.5 text-[#00FF88]" />
                <span>คัดลอกแผนงานนี้ (COPY SPEC)</span>
              </button>
              <a
                href="#initiate"
                class="text-xs font-mono font-bold text-[#00FF88] hover:underline flex items-center gap-1"
              >
                <span>ส่งแผนนี้ให้ทีมสถาปนิกประเมินราคา</span>
                <ArrowRight class="w-3.5 h-3.5" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
