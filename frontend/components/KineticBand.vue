<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from 'vue'
import {
  Sparkles, ShieldCheck, Cpu, Globe, Database, Cloud,
  Zap, Layers, Award
} from 'lucide-vue-next'

type PartnerItem = {
  id: string
  name: string
  category: string
  desc: string
  image?: string
  icon?: any
  accent: string
}

const activeGroup = ref<'clients' | 'partners'>('clients')
const isHovered = ref(false)
let autoTimer: ReturnType<typeof setInterval> | null = null

// กลุ่มองค์กรรัฐ & สถาบัน (Real Client Logos)
const clientLogos: PartnerItem[] = [
  {
    id: 'tat',
    name: 'การท่องเที่ยวแห่งประเทศไทย (ททท.)',
    category: 'Tourism Authority of Thailand',
    desc: 'หน่วยงานส่งเสริมการท่องเที่ยวแห่งชาติ',
    image: '/images/clients/tat.png',
    accent: '#1E3A8A'
  },
  {
    id: 'tceb',
    name: 'สำนักงานส่งเสริมการจัดประชุมและนิทรรศการ (TCEB)',
    category: 'Thailand Convention & Exhibition Bureau',
    desc: 'องค์การมหาชนด้านอุตสาหกรรมไมซ์',
    image: '/images/clients/tceb.png',
    accent: '#0284C7'
  },
  {
    id: 'sju',
    name: 'มหาวิทยาลัยเซนต์จอห์น',
    category: "Saint John's University",
    desc: 'สถาบันอุดมศึกษาเอกชนชั้นนำ',
    image: '/images/clients/sju.png',
    accent: '#1D4ED8'
  },
  {
    id: 'pcru',
    name: 'มหาวิทยาลัยราชภัฏเพชรบูรณ์',
    category: 'Phetchabun Rajabhat University',
    desc: 'สถาบันอุดมศึกษาเพื่อการพัฒนาท้องถิ่น',
    image: '/images/clients/pcru.png',
    accent: '#15803D'
  },
  {
    id: 'mcru',
    name: 'มหาวิทยาลัยราชภัฏหมู่บ้านจอมบึง',
    category: 'Muban Chom Bueng Rajabhat University',
    desc: 'สถาบันอุดมศึกษาเพื่อชุมชนและสังคม',
    image: '/images/clients/mcru.jpg',
    accent: '#166534'
  },
  {
    id: 'guts',
    name: 'GUTS Investigation Security Guard',
    category: 'Enterprise Security Services',
    desc: 'ผู้นำด้านระบบรักษาความปลอดภัยระดับองค์กร',
    image: '/images/clients/guts.png',
    accent: '#EA580C'
  }
]

// พันธมิตรเทคโนโลยี AI & Cloud
const techPartners: PartnerItem[] = [
  {
    id: 'tuv',
    name: 'TÜV NORD',
    category: 'ISO/IEC 29110 Certified',
    desc: 'มาตรฐานการรับรองคุณภาพซอฟต์แวร์ระดับสากล',
    icon: Award,
    accent: '#00C864'
  },
  {
    id: 'depa',
    name: 'depa Thailand',
    category: 'Digital Ecosystem Partner',
    desc: 'สำนักงานส่งเสริมเศรษฐกิจดิจิทัล',
    icon: Globe,
    accent: '#00A3FF'
  },
  {
    id: 'nvidia',
    name: 'NVIDIA AI Inception',
    category: 'AI Computing Partner',
    desc: 'สถาปัตยกรรมประมวลผล AI และ Deep Learning',
    icon: Cpu,
    accent: '#76B900'
  },
  {
    id: 'aws',
    name: 'AWS Cloud',
    category: 'Cloud Infrastructure',
    desc: 'โครงสร้างพื้นฐานคลาวด์ความเร็วสูงระดับโลก',
    icon: Cloud,
    accent: '#FF9900'
  },
  {
    id: 'siemens',
    name: 'Siemens Digital',
    category: 'Industrial IoT & Automation',
    desc: 'ระบบอัตโนมัติโรงงานและดิจิทัลทวิน',
    icon: Zap,
    accent: '#009999'
  },
  {
    id: 'azure',
    name: 'Microsoft Azure',
    category: 'Enterprise Mesh',
    desc: 'ระบบโครงข่ายองค์กรและคลาวด์อัจฉริยะ',
    icon: ShieldCheck,
    accent: '#0078D4'
  }
]

const displayedItems = computed(() => {
  return activeGroup.value === 'clients' ? clientLogos : techPartners
})

const selectGroup = (group: 'clients' | 'partners') => {
  activeGroup.value = group
}

onMounted(() => {
  autoTimer = setInterval(() => {
    if (!isHovered.value) {
      activeGroup.value = activeGroup.value === 'clients' ? 'partners' : 'clients'
    }
  }, 4500)
})

onUnmounted(() => {
  if (autoTimer) clearInterval(autoTimer)
})
</script>

<template>
  <section
    id="clients"
    class="py-16 sm:py-20 overflow-hidden relative z-20 reveal-init scroll-mt-24"
    @mouseenter="isHovered = true"
    @mouseleave="isHovered = false"
  >
    <div class="max-w-[1440px] mx-auto px-5 sm:px-10">
      <!-- Header + Interactive Sliding Glass Pill -->
      <div class="mb-10 flex flex-col lg:flex-row lg:items-end justify-between gap-6">
        <div>
          <div class="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-[0.25em] text-[#00C864] dark:text-[#00FF88] mb-2 font-bold">
            <Sparkles class="w-3.5 h-3.5" />
            <span>CLIENTS & PARTNER ECOSYSTEM // กลุ่มผู้ใช้ผลิตภัณฑ์และพันธมิตร</span>
          </div>
          <h3 class="text-xl sm:text-3xl font-bold tracking-tight">
            กลุ่มผู้ใช้ผลิตภัณฑ์และพันธมิตรที่ให้ความไว้วางใจ IGENCO
          </h3>
        </div>

        <!-- Interactive Category Toggle (Sliding Glass Pill) -->
        <div
          class="relative inline-flex p-1.5 rounded-2xl bg-white/80 dark:bg-[#061811]/80 backdrop-blur-xl border border-current/10 shadow-sm self-start lg:self-auto"
          role="tablist"
          aria-label="สลับกลุ่มองค์กรและพันธมิตร"
        >
          <button
            type="button"
            role="tab"
            :aria-selected="activeGroup === 'clients'"
            @click="selectGroup('clients')"
            class="relative z-10 px-4 sm:px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all duration-300 cursor-pointer"
            :class="
              activeGroup === 'clients'
                ? 'bg-[#00C864] dark:bg-[#00FF88] text-white dark:text-[#020806] shadow-md'
                : 'opacity-70 hover:opacity-100'
            "
          >
            กลุ่มองค์กรรัฐ & สถาบัน
          </button>
          <button
            type="button"
            role="tab"
            :aria-selected="activeGroup === 'partners'"
            @click="selectGroup('partners')"
            class="relative z-10 px-4 sm:px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all duration-300 cursor-pointer"
            :class="
              activeGroup === 'partners'
                ? 'bg-[#00C864] dark:bg-[#00FF88] text-white dark:text-[#020806] shadow-md'
                : 'opacity-70 hover:opacity-100'
            "
          >
            พันธมิตรเทคโนโลยี AI & Cloud
          </button>
        </div>
      </div>

      <!-- Wave Staggered Blur-to-Focus Logo Grid -->
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
        <div
          v-for="(item, idx) in displayedItems"
          :key="idx"
          class="relative"
        >
          <Transition name="blur-focus" mode="out-in">
            <div
              :key="item.id"
              :style="{
                '--stagger-delay': `${idx * 85}ms`,
                '--brand-color': item.accent
              }"
              class="logo-card-wave group h-full p-5 sm:p-6 rounded-3xl border border-current/10 hover:border-[#00C864] dark:hover:border-[#00FF88] bg-white/95 dark:bg-[#061811]/95 backdrop-blur-md shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1.5 flex items-center gap-5"
            >
              <!-- Large, Crystal-Clear Logo Container -->
              <div
                class="w-24 h-24 sm:w-28 sm:h-28 rounded-2xl bg-white border border-black/5 shadow-inner flex items-center justify-center p-2.5 shrink-0 overflow-hidden transition-transform duration-300 group-hover:scale-105"
              >
                <img
                  v-if="item.image"
                  :src="item.image"
                  :alt="item.name"
                  class="w-full h-full object-contain"
                  loading="lazy"
                />
                <component
                  v-else
                  :is="item.icon"
                  class="w-11 h-11 transition-transform duration-300 group-hover:scale-110"
                  :style="{ color: item.accent }"
                />
              </div>

              <!-- Organization Info -->
              <div class="min-w-0 flex-1">
                <div class="text-[11px] font-mono uppercase tracking-wider text-[#00C864] dark:text-[#00FF88] font-bold mb-1 truncate">
                  {{ item.category }}
                </div>
                <h4 class="text-base sm:text-lg font-bold leading-snug mb-1.5 line-clamp-2">
                  {{ item.name }}
                </h4>
                <p class="text-xs sm:text-sm opacity-70 leading-relaxed line-clamp-2">
                  {{ item.desc }}
                </p>
              </div>
            </div>
          </Transition>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
/* Wave Staggered Blur-to-Focus Crossfade Transition */
.blur-focus-enter-active {
  transition:
    opacity 0.55s cubic-bezier(0.22, 1, 0.36, 1) var(--stagger-delay, 0ms),
    transform 0.55s cubic-bezier(0.22, 1, 0.36, 1) var(--stagger-delay, 0ms),
    filter 0.55s cubic-bezier(0.22, 1, 0.36, 1) var(--stagger-delay, 0ms);
}

.blur-focus-leave-active {
  transition:
    opacity 0.35s ease-in,
    transform 0.35s ease-in,
    filter 0.35s ease-in;
}

.blur-focus-enter-from {
  opacity: 0;
  transform: scale(0.94) translateY(8px);
  filter: blur(8px);
}

.blur-focus-enter-to {
  opacity: 1;
  transform: scale(1) translateY(0);
  filter: blur(0px);
}

.blur-focus-leave-from {
  opacity: 1;
  transform: scale(1);
  filter: blur(0px);
}

.blur-focus-leave-to {
  opacity: 0;
  transform: scale(0.95);
  filter: blur(8px);
}
</style>
