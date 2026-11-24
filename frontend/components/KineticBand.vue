<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount } from 'vue'
import { Sparkles, ShieldCheck, Cpu, Cloud, Zap, Globe, Award, Database, Radio, Layers } from 'lucide-vue-next'

const skewAngle = ref(0)
let lastScrollY = 0
let lastTime = 0
let animFrameId: number | null = null
let isLoopRunning = false

const updateInertia = () => {
  skewAngle.value *= 0.88
  if (Math.abs(skewAngle.value) > 0.05) {
    animFrameId = requestAnimationFrame(updateInertia)
  } else {
    skewAngle.value = 0
    isLoopRunning = false
  }
}

const onScroll = () => {
  if (typeof window === 'undefined') return
  const now = performance.now()
  const dt = Math.max(1, now - lastTime)
  const dy = window.scrollY - lastScrollY
  const velocity = dy / dt

  // Bounded smooth skew
  skewAngle.value = Math.max(-3, Math.min(3, velocity * 1.8))
  lastScrollY = window.scrollY
  lastTime = now

  if (!isLoopRunning) {
    isLoopRunning = true
    animFrameId = requestAnimationFrame(updateInertia)
  }
}

onMounted(() => {
  if (import.meta.client) {
    lastScrollY = window.scrollY
    lastTime = performance.now()
    window.addEventListener('scroll', onScroll, { passive: true })
  }
})

onBeforeUnmount(() => {
  if (import.meta.client) {
    window.removeEventListener('scroll', onScroll)
    if (animFrameId) cancelAnimationFrame(animFrameId)
  }
})

// Track 1 Partners (ไหลไปทางซ้าย)
export interface PartnerItem {
  id: string
  name: string
  category: string
  desc: string
  icon: any
  accent: string
}

const track1Partners: PartnerItem[] = [
  { id: 'tuv', name: 'TÜV NORD', category: 'ISO/IEC 29110 Certified', desc: 'รับรองมาตรฐานวิศวกรรมซอฟต์แวร์ระดับสากล', icon: Award, accent: '#00C864' },
  { id: 'depa', name: 'depa Thailand', category: 'Digital Ecosystem Partner', desc: 'เครือข่ายส่งเสริมนวัตกรรมดิจิทัลแห่งชาติ', icon: Globe, accent: '#00D2FF' },
  { id: 'nvidia', name: 'NVIDIA AI Inception', category: 'AI Computing Partner', desc: 'ระบบประมวลผลโมเดลปัญญาประดิษฐ์ความเร็วสูง', icon: Cpu, accent: '#76B900' },
  { id: 'aws', name: 'AWS Cloud', category: 'Cloud Infrastructure', desc: 'โครงสร้างพื้นฐานคลาวด์ความเสถียร 99.99%', icon: Cloud, accent: '#FF9900' },
  { id: 'siemens', name: 'Siemens Digital', category: 'Industrial IoT & Automation', desc: 'มาตรฐานเชื่อมต่อเซ็นเซอร์และเครื่องจักรอัจฉริยะ', icon: Zap, accent: '#00646E' },
  { id: 'iso', name: 'ISO 27001', category: 'Information Security', desc: 'มาตรฐานความปลอดภัยสารสนเทศระดับองค์กร', icon: ShieldCheck, accent: '#00C864' },
  { id: 'azure', name: 'Microsoft Azure', category: 'Enterprise Mesh', desc: 'โซลูชันคลาวด์ไฮบริดและระบบความปลอดภัย', icon: Cloud, accent: '#0089D6' },
  { id: 'postgres', name: 'PostgreSQL Enterprise', category: 'Data Architecture', desc: 'ฐานข้อมูลความปลอดภัยสูงและรองรับข้อมูลมหาศาล', icon: Database, accent: '#336791' },
]

// Track 2 Partners (ไหลไปทางขวา)
const track2Partners: PartnerItem[] = [
  { id: 'ais5g', name: 'AIS 5G Enterprise', category: '5G Telemetry & Private Mesh', desc: 'เครือข่าย 5G Private Network ความหน่วงต่ำพิเศษ', icon: Radio, accent: '#82BE00' },
  { id: 'cisco', name: 'Cisco Zero-Trust', category: 'Network Security Architecture', desc: 'สถาปัตยกรรมไฟร์วอลล์และความปลอดภัยเครือข่าย', icon: ShieldCheck, accent: '#049FD9' },
  { id: 'schneider', name: 'Schneider Electric', category: 'Smart Energy & EcoStruxure', desc: 'ระบบควบคุมพลังงานหมุนเวียนและกริดอัจฉริยะ', icon: Zap, accent: '#3DCD58' },
  { id: 'bim', name: 'BIM Thailand', category: 'Spatial 3D Digital Twin', desc: 'มาตรฐานแบบจำลองสารสนเทศอาคาร 3 มิติ', icon: Layers, accent: '#8B5CF6' },
  { id: 'oracle', name: 'Oracle Cloud ERP', category: 'Enterprise Database Core', desc: 'ระบบวางแผนทรัพยากรองค์กรแบบเรียลไทม์', icon: Database, accent: '#F80000' },
  { id: 'intel', name: 'Intel Edge AI', category: 'Hardware Acceleration', desc: 'ชิปประมวลผล AI ณ จุดกำเนิดข้อมูลระดับอุตสาหกรรม', icon: Cpu, accent: '#0071C5' },
  { id: 'green', name: 'Green Energy Alliance', category: 'Carbon Neutral Standard', desc: 'พันธมิตรพลังงานสะอาดและการลดคาร์บอนฟุตพริ้นท์', icon: Globe, accent: '#00FF88' },
  { id: 'three', name: 'Three.js / WebGL', category: 'Spatial Graphics Engine', desc: 'เอนจินจำลองภาพเสมือนจริง 3 มิติบนเว็บเบราว์เซอร์', icon: Sparkles, accent: '#EC4899' },
]
</script>

<template>
  <section class="py-16 overflow-hidden relative z-20 reveal-init">
    <div class="max-w-[1440px] mx-auto px-5 sm:px-10 mb-8 flex flex-col sm:flex-row sm:items-end justify-between gap-4">
      <div>
        <div class="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-[0.25em] text-[#00C864] dark:text-[#00FF88] mb-2 font-bold">
          <Sparkles class="w-3.5 h-3.5" />
          <span>PARTNERS & SPONSOR ECOSYSTEM // พันธมิตรและผู้สนับสนุน</span>
        </div>
        <h3 class="text-xl sm:text-2xl font-bold tracking-tight">
          พันธมิตรเทคโนโลยีและมาตรฐานที่ให้การสนับสนุนเรา
        </h3>
      </div>

      <div class="text-xs font-mono opacity-60 self-start sm:self-auto">
        DUAL-TRACK VELOCITY STREAM // 2026 EDITION
      </div>
    </div>

    <!-- Dual-Track Stream (Hardware Accelerated with translate3d) -->
    <div
      class="space-y-4 select-none transform-gpu will-change-transform"
      :style="{ transform: `skewX(${skewAngle}deg)` }"
    >
      
      <!-- TRACK 1: ไหลไปทางซ้าย (Flow Left) -->
      <div class="relative w-full overflow-hidden flex group">
        <!-- Ambient Edge Gradients (Pure CSS without blur) -->
        <div class="absolute left-0 top-0 bottom-0 w-24 sm:w-36 bg-gradient-to-r from-[#F6F9F7] dark:from-[#020806] to-transparent z-10 pointer-events-none" />
        <div class="absolute right-0 top-0 bottom-0 w-24 sm:w-36 bg-gradient-to-l from-[#F6F9F7] dark:from-[#020806] to-transparent z-10 pointer-events-none" />

        <div class="flex items-center gap-4 py-2 whitespace-nowrap animate-marquee-fast group-hover:[animation-play-state:paused] transform-gpu will-change-transform">
          <!-- First Set -->
          <div
            v-for="item in track1Partners"
            :key="item.id"
            class="partner-pill relative px-5 py-3 rounded-2xl flex items-center gap-3 border border-current/10 hover:border-[#00C864] dark:hover:border-[#00FF88] transition-all duration-200 hover:scale-105 hover:-translate-y-1 cursor-pointer group/card shrink-0 bg-white/95 dark:bg-[#061811]/95 shadow-sm"
            :style="{ '--brand-color': item.accent }"
          >
            <div
              class="w-8 h-8 rounded-xl bg-current/5 border border-current/10 flex items-center justify-center shrink-0 transition-all duration-200 group-hover/card:scale-110 group-hover/card:bg-[#00C864]/10 dark:group-hover/card:bg-[#00FF88]/15"
            >
              <component
                :is="item.icon"
                class="w-4 h-4 opacity-75 group-hover/card:opacity-100 transition-all duration-200"
                :style="{ color: item.accent }"
              />
            </div>

            <div class="text-left">
              <div class="text-xs sm:text-sm font-bold leading-tight group-hover/card:text-[#00C864] dark:group-hover/card:text-[#00FF88] transition-colors">
                {{ item.name }}
              </div>
              <div class="text-[10px] font-mono opacity-60 tracking-tight">
                {{ item.category }}
              </div>
            </div>

            <!-- Tooltip -->
            <div class="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-3 py-1.5 rounded-xl bg-[#022C22] text-white dark:bg-[#051811] text-[11px] font-sans opacity-0 pointer-events-none group-hover/card:opacity-100 group-hover/card:pointer-events-auto transition-opacity duration-150 shadow-xl border border-white/10 z-20 whitespace-nowrap">
              <span>{{ item.desc }}</span>
              <div class="absolute top-full left-1/2 -translate-x-1/2 border-4 border-transparent border-t-[#022C22] dark:border-t-[#051811]" />
            </div>
          </div>

          <!-- Duplicate Set -->
          <div
            v-for="item in track1Partners"
            :key="`dup-${item.id}`"
            class="partner-pill relative px-5 py-3 rounded-2xl flex items-center gap-3 border border-current/10 hover:border-[#00C864] dark:hover:border-[#00FF88] transition-all duration-200 hover:scale-105 hover:-translate-y-1 cursor-pointer group/card shrink-0 bg-white/95 dark:bg-[#061811]/95 shadow-sm"
            :style="{ '--brand-color': item.accent }"
          >
            <div
              class="w-8 h-8 rounded-xl bg-current/5 border border-current/10 flex items-center justify-center shrink-0 transition-all duration-200 group-hover/card:scale-110 group-hover/card:bg-[#00C864]/10 dark:group-hover/card:bg-[#00FF88]/15"
            >
              <component
                :is="item.icon"
                class="w-4 h-4 opacity-75 group-hover/card:opacity-100 transition-all duration-200"
                :style="{ color: item.accent }"
              />
            </div>
            <div class="text-left">
              <div class="text-xs sm:text-sm font-bold leading-tight group-hover/card:text-[#00C864] dark:group-hover/card:text-[#00FF88] transition-colors">
                {{ item.name }}
              </div>
              <div class="text-[10px] font-mono opacity-60 tracking-tight">
                {{ item.category }}
              </div>
            </div>
            <div class="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-3 py-1.5 rounded-xl bg-[#022C22] text-white dark:bg-[#051811] text-[11px] font-sans opacity-0 pointer-events-none group-hover/card:opacity-100 group-hover/card:pointer-events-auto transition-opacity duration-150 shadow-xl border border-white/10 z-20 whitespace-nowrap">
              <span>{{ item.desc }}</span>
              <div class="absolute top-full left-1/2 -translate-x-1/2 border-4 border-transparent border-t-[#022C22] dark:border-t-[#051811]" />
            </div>
          </div>
        </div>
      </div>

      <!-- TRACK 2: ไหลไปทางขวา (Flow Right) -->
      <div class="relative w-full overflow-hidden flex group">
        <div class="absolute left-0 top-0 bottom-0 w-24 sm:w-36 bg-gradient-to-r from-[#F6F9F7] dark:from-[#020806] to-transparent z-10 pointer-events-none" />
        <div class="absolute right-0 top-0 bottom-0 w-24 sm:w-36 bg-gradient-to-l from-[#F6F9F7] dark:from-[#020806] to-transparent z-10 pointer-events-none" />

        <div class="flex items-center gap-4 py-2 whitespace-nowrap animate-marquee-reverse group-hover:[animation-play-state:paused] transform-gpu will-change-transform">
          <!-- First Set -->
          <div
            v-for="item in track2Partners"
            :key="item.id"
            class="partner-pill relative px-5 py-3 rounded-2xl flex items-center gap-3 border border-current/10 hover:border-[#00C864] dark:hover:border-[#00FF88] transition-all duration-200 hover:scale-105 hover:-translate-y-1 cursor-pointer group/card shrink-0 bg-white/95 dark:bg-[#061811]/95 shadow-sm"
            :style="{ '--brand-color': item.accent }"
          >
            <div
              class="w-8 h-8 rounded-xl bg-current/5 border border-current/10 flex items-center justify-center shrink-0 transition-all duration-200 group-hover/card:scale-110 group-hover/card:bg-[#00C864]/10 dark:group-hover/card:bg-[#00FF88]/15"
            >
              <component
                :is="item.icon"
                class="w-4 h-4 opacity-75 group-hover/card:opacity-100 transition-all duration-200"
                :style="{ color: item.accent }"
              />
            </div>
            <div class="text-left">
              <div class="text-xs sm:text-sm font-bold leading-tight group-hover/card:text-[#00C864] dark:group-hover/card:text-[#00FF88] transition-colors">
                {{ item.name }}
              </div>
              <div class="text-[10px] font-mono opacity-60 tracking-tight">
                {{ item.category }}
              </div>
            </div>
            <div class="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-3 py-1.5 rounded-xl bg-[#022C22] text-white dark:bg-[#051811] text-[11px] font-sans opacity-0 pointer-events-none group-hover/card:opacity-100 group-hover/card:pointer-events-auto transition-opacity duration-150 shadow-xl border border-white/10 z-20 whitespace-nowrap">
              <span>{{ item.desc }}</span>
              <div class="absolute top-full left-1/2 -translate-x-1/2 border-4 border-transparent border-t-[#022C22] dark:border-t-[#051811]" />
            </div>
          </div>

          <!-- Duplicate Set -->
          <div
            v-for="item in track2Partners"
            :key="`dup-${item.id}`"
            class="partner-pill relative px-5 py-3 rounded-2xl flex items-center gap-3 border border-current/10 hover:border-[#00C864] dark:hover:border-[#00FF88] transition-all duration-200 hover:scale-105 hover:-translate-y-1 cursor-pointer group/card shrink-0 bg-white/95 dark:bg-[#061811]/95 shadow-sm"
            :style="{ '--brand-color': item.accent }"
          >
            <div
              class="w-8 h-8 rounded-xl bg-current/5 border border-current/10 flex items-center justify-center shrink-0 transition-all duration-200 group-hover/card:scale-110 group-hover/card:bg-[#00C864]/10 dark:group-hover/card:bg-[#00FF88]/15"
            >
              <component
                :is="item.icon"
                class="w-4 h-4 opacity-75 group-hover/card:opacity-100 transition-all duration-200"
                :style="{ color: item.accent }"
              />
            </div>
            <div class="text-left">
              <div class="text-xs sm:text-sm font-bold leading-tight group-hover/card:text-[#00C864] dark:group-hover/card:text-[#00FF88] transition-colors">
                {{ item.name }}
              </div>
              <div class="text-[10px] font-mono opacity-60 tracking-tight">
                {{ item.category }}
              </div>
            </div>
            <div class="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-3 py-1.5 rounded-xl bg-[#022C22] text-white dark:bg-[#051811] text-[11px] font-sans opacity-0 pointer-events-none group-hover/card:opacity-100 group-hover/card:pointer-events-auto transition-opacity duration-150 shadow-xl border border-white/10 z-20 whitespace-nowrap">
              <span>{{ item.desc }}</span>
              <div class="absolute top-full left-1/2 -translate-x-1/2 border-4 border-transparent border-t-[#022C22] dark:border-t-[#051811]" />
            </div>
          </div>
        </div>
      </div>

    </div>
  </section>
</template>

<style scoped>
.partner-pill:hover {
  box-shadow: 0 10px 24px -4px rgba(0, 200, 100, 0.22);
}

:global(.dark) .partner-pill:hover {
  box-shadow: 0 10px 24px -4px rgba(0, 255, 136, 0.25);
}
</style>
