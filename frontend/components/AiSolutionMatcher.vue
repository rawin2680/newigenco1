<script setup lang="ts">
import { ref, computed } from 'vue'
import { Sparkles, Cpu, Check, ArrowRight, Zap, TrendingUp, ShieldCheck } from 'lucide-vue-next'
import { useTheme } from '~/composables/useTheme'

const { showToast } = useTheme()

const businessScale = ref<'sme' | 'enterprise' | 'industrial'>('enterprise')
const primaryNeed = ref<'ai_automation' | 'energy' | 'spatial_3d' | 'api_cloud'>('ai_automation')
const isGenerating = ref(false)

const scaleOptions = [
  { id: 'sme', label: 'SME & ธุรกิจขนาดกลาง' },
  { id: 'enterprise', label: 'องค์กรขนาดใหญ่ (Enterprise)' },
  { id: 'industrial', label: 'โรงงาน & โลจิสติกส์' }
]

const needOptions = [
  { id: 'ai_automation', label: 'ระบบอัตโนมัติ & ผู้ช่วย AI' },
  { id: 'energy', label: 'ลดการสูญเสียพลังงานในองค์กร' },
  { id: 'spatial_3d', label: 'มอนิเตอร์ 3 มิติ (Digital Twin)' },
  { id: 'api_cloud', label: 'ระบบคลาวด์ความเร็วสูง & API' }
]

// Dynamic Generative UI Output computation
const dynamicSolution = computed(() => {
  if (primaryNeed.value === 'energy') {
    return {
      code: 'SOL-GREEN-ENERGY-2026',
      title: 'Green Carbon Zero & Smart Energy Grid',
      recommendedProduct: 'Bio-Grid Solar Controller + IoT Sensor Hub',
      roi: '+185%',
      costReduction: '-38%',
      timeline: '3 สัปดาห์',
      summary: 'สถาปัตยกรรมระบบบริหารพลังงานหมุนเวียน ผสานเซ็นเซอร์ IoT ตรวจวัดกระแสไฟและอุณหภูมิแบบเรียลไทม์ พร้อมระบบแจ้งเตือนความผิดปกติด้วย AI ล่วงหน้า',
      features: ['Real-time Power Telemetry', 'ISO 50001 Certified', 'Auto Load-Balancing']
    }
  } else if (primaryNeed.value === 'spatial_3d') {
    return {
      code: 'SOL-SPATIAL-TWIN-3D',
      title: 'Digital Twin & 3D Spatial Telemetry Hub',
      recommendedProduct: 'Spatial 3D Digital Twin Suite + WebGL Mesh',
      roi: '+220%',
      costReduction: '-42%',
      timeline: '4 สัปดาห์',
      summary: 'แพลตฟอร์มจำลองโรงงานและคลังสินค้า 3 มิติเสมือนจริงบนหน้าเว็บเบราว์เซอร์ ช่วยให้ผู้บริหารมองเห็นสถานะสายการผลิตและสินค้าคงคลังแบบ 360 องศา',
      features: ['60FPS WebGL Engine', 'Live Sensor Sync', 'Multi-Floor Inspection']
    }
  } else if (primaryNeed.value === 'api_cloud') {
    return {
      code: 'SOL-CLOUD-MESH-API',
      title: 'Headless Zero-Trust Edge Cloud',
      recommendedProduct: 'Verdant Edge Cloud + PostgreSQL High-Availability',
      roi: '+260%',
      costReduction: '-48%',
      timeline: '2 สัปดาห์',
      summary: 'โครงสร้างพื้นฐานคลาวด์ความเร็วสูง สถาปัตยกรรม Headless API รองรับการขยายตัวระดับล้าน Request ต่อนาที ปลอดภัยสูงสุดด้วย Zero-Trust',
      features: ['Latency < 15ms', 'Zero-Trust Architecture', 'Auto-scaling Microservices']
    }
  } else {
    return {
      code: 'SOL-NEURAL-AI-CORE',
      title: 'Autonomous Enterprise AI & LLM Core',
      recommendedProduct: 'Verdant AI Core V4 + RAG Neural Mesh',
      roi: '+240%',
      costReduction: '-52%',
      timeline: '2-3 สัปดาห์',
      summary: 'เชื่อมต่อโมเดล AI เข้ากับฐานข้อมูลภายในของบริษัท ช่วยตอบคำถามลูกค้า สรุปรายงานการขาย และประมวลผลเอกสารสัญญาได้อย่างแม่นยำอัตโนมัติ',
      features: ['RAG Pipeline Internal Data', '24/7 Auto Decision Ops', 'Multi-language Thai/Eng']
    }
  }
})

const applySolutionToContact = () => {
  if (import.meta.client) {
    const input = document.getElementById('projectSummaryInput') as HTMLInputElement | null
    if (input) {
      input.value = `สนใจโซลูชันที่สังเคราะห์ด้วย AI: ${dynamicSolution.value.title} (${dynamicSolution.value.recommendedProduct})`
    }
    const contactSection = document.getElementById('contact')
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: 'smooth' })
    }
  }
  showToast(`บันทึกชุดโซลูชัน ${dynamicSolution.value.code} เข้าฟอร์มติดต่อเรียบร้อยแล้ว`)
}
</script>

<template>
  <section id="ai-engine" class="py-24 px-5 sm:px-10 lg:px-16 max-w-[1440px] mx-auto relative z-10 border-t border-current/10">
    <div class="spatial-glass rounded-[2.5rem] p-6 sm:p-12 lg:p-14 relative overflow-hidden shadow-2xl">
      
      <!-- Section Header -->
      <div class="flex flex-col lg:flex-row lg:items-end justify-between gap-6 pb-10 border-b border-current/15">
        <div>
          <div class="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#00C864]/15 dark:bg-[#00FF88]/15 text-[#00A854] dark:text-[#00FF88] text-xs font-mono font-bold mb-3">
            <Sparkles class="w-3.5 h-3.5" />
            <span>AI GENERATIVE ENGINE // ระบบปรับเปลี่ยนอัจฉริยะ</span>
          </div>
          <h2 class="font-display font-extrabold text-3xl sm:text-5xl uppercase">
            ค้นหาแพ็กเกจโซลูชันที่เหมาะกับคุณ
          </h2>
        </div>
        <p class="text-sm sm:text-base opacity-80 max-w-md">
          เลือกความต้องการทางธุรกิจของคุณ ระบบ AI จะสร้างชุดสินค้าและสถาปัตยกรรมที่คุ้มค่าที่สุดให้แบบเรียลไทม์
        </p>
      </div>

      <!-- Interactive Selectors & Dynamic Output Grid -->
      <div class="grid grid-cols-1 lg:grid-cols-12 gap-10 pt-10 items-stretch">
        
        <!-- Left: Interactive Options -->
        <div class="lg:col-span-5 flex flex-col justify-between space-y-8">
          <!-- Step 1: Scale -->
          <div>
            <label class="block text-xs font-mono uppercase tracking-wider opacity-75 mb-3 font-bold">
              1. ขนาดองค์กรของคุณ (BUSINESS SCALE)
            </label>
            <div class="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
              <button
                v-for="opt in scaleOptions"
                :key="opt.id"
                type="button"
                :class="[
                  'p-3 rounded-xl text-xs font-bold text-left transition-all border',
                  businessScale === opt.id
                    ? 'border-[#00C864] bg-[#00C864] text-[#022C22] dark:border-[#00FF88] dark:bg-[#00FF88] dark:text-[#020806] shadow-md'
                    : 'border-current/15 hover:border-[#00C864] bg-white/40 dark:bg-black/30'
                ]"
                @click="businessScale = opt.id as any"
              >
                {{ opt.label }}
              </button>
            </div>
          </div>

          <!-- Step 2: Need -->
          <div>
            <label class="block text-xs font-mono uppercase tracking-wider opacity-75 mb-3 font-bold">
              2. เป้าหมายหลักที่ต้องการแก้ไข (PRIMARY OBJECTIVE)
            </label>
            <div class="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              <button
                v-for="need in needOptions"
                :key="need.id"
                type="button"
                :class="[
                  'p-3.5 rounded-xl text-xs font-bold text-left transition-all border flex items-center gap-2.5',
                  primaryNeed === need.id
                    ? 'border-[#00C864] bg-[#00C864] text-[#022C22] dark:border-[#00FF88] dark:bg-[#00FF88] dark:text-[#020806] shadow-md'
                    : 'border-current/15 hover:border-[#00C864] bg-white/40 dark:bg-black/30'
                ]"
                @click="primaryNeed = need.id as any"
              >
                <Check v-if="primaryNeed === need.id" class="w-4 h-4 shrink-0" />
                <span v-else class="w-2 h-2 rounded-full bg-current/30 shrink-0" />
                <span>{{ need.label }}</span>
              </button>
            </div>
          </div>

          <!-- Helper Note -->
          <div class="p-4 rounded-2xl bg-current/5 border border-current/10 text-xs opacity-75 leading-relaxed">
            💡 <strong>AI Real-time Synthesis:</strong> ระบบจะคำนวณและปรับเปลี่ยนโมเดลสินค้า ผลตอบแทนการลงทุน (ROI) และระยะเวลาดำเนินการตามที่คุณคลิกเลือกทันที
          </div>
        </div>

        <!-- Right: Generative UI Card Output -->
        <div class="lg:col-span-7 rounded-3xl bg-[#020806] text-[#F4FBF7] p-6 sm:p-8 border border-[#00FF88]/30 flex flex-col justify-between relative overflow-hidden shadow-2xl">
          
          <!-- Top Tag & Title -->
          <div>
            <div class="flex items-center justify-between pb-4 border-b border-white/10">
              <div class="flex items-center gap-2">
                <span class="w-2 h-2 rounded-full bg-[#00FF88] animate-pulse" />
                <span class="font-mono text-xs text-[#00FF88] font-bold">{{ dynamicSolution.code }}</span>
              </div>
              <span class="px-2.5 py-1 rounded-full text-[10px] font-mono bg-white/10 text-slate-300">
                GENERATIVE BLUEPRINT
              </span>
            </div>

            <!-- Dynamic Heading -->
            <div class="mt-5 space-y-3">
              <h3 class="text-2xl sm:text-3xl font-bold text-white leading-snug">
                {{ dynamicSolution.title }}
              </h3>
              <div class="text-xs font-mono text-[#00FF88]">
                ✦ แนะนำสินค้าที่ใช้: <strong>{{ dynamicSolution.recommendedProduct }}</strong>
              </div>
              <p class="text-sm text-slate-300 leading-relaxed pt-1">
                {{ dynamicSolution.summary }}
              </p>
            </div>

            <!-- Dynamic Features Checklist -->
            <div class="grid grid-cols-1 sm:grid-cols-3 gap-2 pt-4">
              <div
                v-for="feat in dynamicSolution.features"
                :key="feat"
                class="px-3 py-2 rounded-xl bg-white/[0.04] border border-white/10 text-xs text-slate-300 flex items-center gap-2"
              >
                <Check class="w-3.5 h-3.5 text-[#00FF88] shrink-0" />
                <span class="truncate">{{ feat }}</span>
              </div>
            </div>
          </div>

          <!-- Bottom KPIs + Action Button -->
          <div class="mt-8 pt-6 border-t border-white/10">
            <div class="grid grid-cols-3 gap-3 mb-5">
              <div class="p-3.5 rounded-2xl bg-white/[0.05] border border-white/10">
                <div class="text-[10px] font-mono text-slate-400">EST. ROI LIFT</div>
                <div class="text-xl sm:text-2xl font-display font-extrabold text-[#00FF88] mt-0.5">
                  {{ dynamicSolution.roi }}
                </div>
              </div>
              <div class="p-3.5 rounded-2xl bg-white/[0.05] border border-white/10">
                <div class="text-[10px] font-mono text-slate-400">COST SAVING</div>
                <div class="text-xl sm:text-2xl font-display font-extrabold text-white mt-0.5">
                  {{ dynamicSolution.costReduction }}
                </div>
              </div>
              <div class="p-3.5 rounded-2xl bg-white/[0.05] border border-white/10">
                <div class="text-[10px] font-mono text-slate-400">DEPLOY TIME</div>
                <div class="text-xl sm:text-2xl font-display font-extrabold text-[#00FF88] mt-0.5">
                  {{ dynamicSolution.timeline }}
                </div>
              </div>
            </div>

            <!-- Send to Contact CTA -->
            <button
              type="button"
              class="w-full py-3.5 rounded-xl font-bold text-xs uppercase tracking-wider bg-[#00FF88] text-[#020806] hover:bg-[#00D26A] transition-all flex items-center justify-center gap-2 shadow-lg"
              @click="applySolutionToContact"
            >
              <span>ขอใบเสนอราคาหรือปรึกษาชุดโซลูชันนี้</span>
              <ArrowRight class="w-4 h-4" />
            </button>
          </div>

        </div>

      </div>

    </div>
  </section>
</template>
