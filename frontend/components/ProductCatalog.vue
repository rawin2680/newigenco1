<script setup lang="ts">
import { ref, computed } from 'vue'
import { ArrowUpRight, Box } from 'lucide-vue-next'
import { useTheme } from '~/composables/useTheme'

const { showToast } = useTheme()

const activeCategory = ref('ทั้งหมด')
const categories = ['ทั้งหมด', 'ฮาร์ดแวร์ & เซ็นเซอร์', 'ซอฟต์แวร์อัจฉริยะ', 'โซลูชันพลังงานสะอาด']

const products = [
  {
    id: 1,
    title: 'Verdant AI Core V4',
    category: 'ซอฟต์แวร์อัจฉริยะ',
    desc: 'ระบบประมวลผลข้อมูลอัจฉริยะแบบเรียลไทม์ พร้อมเชื่อมต่อ API และระบบวิเคราะห์อัตโนมัติ',
    price: 'ติดต่อฝ่ายขาย',
    tags: ['Cloud Native', 'API Ready', 'Zero-Latency'],
    image: 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=600&q=80',
    modelType: 'core'
  },
  {
    id: 2,
    title: 'Smart Edge IoT Hub 2026',
    category: 'ฮาร์ดแวร์ & เซ็นเซอร์',
    desc: 'กล่องรับส่งสัญญาณ IoT ความเร็วสูง รองรับการทำงานในสภาพแวดล้อมโรงงานและคลังสินค้า',
    price: 'เริ่มต้น 12,500 บาท',
    tags: ['Industrial Grade', '4G/5G Ready', 'Low Power'],
    image: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&w=600&q=80',
    modelType: 'sensor'
  },
  {
    id: 3,
    title: 'Bio-Grid Solar Controller',
    category: 'โซลูชันพลังงานสะอาด',
    desc: 'อุปกรณ์ควบคุมพลังงานหมุนเวียนอัจฉริยะ ลดการสูญเสียพลังงานในองค์กรได้สูงสุด 35%',
    price: 'ประเมินราคาตามขนาด',
    tags: ['Green Tech', 'Carbon Credit', 'ISO 50001'],
    image: 'https://images.unsplash.com/photo-1509391365360-2e959784a276?auto=format&fit=crop&w=600&q=80',
    modelType: 'energy'
  },
  {
    id: 4,
    title: 'Spatial 3D Digital Twin Suite',
    category: 'ซอฟต์แวร์อัจฉริยะ',
    desc: 'แพลตฟอร์มจำลองอาคารและคลังสินค้าแบบ 3 มิติ เพื่อการมอนิเตอร์และบริหารจัดการจากระยะไกล',
    price: 'แพ็กเกจรายปี',
    tags: ['WebGL', 'Realtime Telemetry', 'BIM Ready'],
    image: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=600&q=80',
    modelType: 'core'
  }
]

const filteredProducts = computed(() => {
  if (activeCategory.value === 'ทั้งหมด') return products
  return products.filter(p => p.category === activeCategory.value)
})

const inquireProduct = (title: string) => {
  if (import.meta.client) {
    const input = document.getElementById('projectSummaryInput') as HTMLInputElement | null
    if (input) {
      input.value = `สนใจสอบถามข้อมูลสินค้า: ${title}`
    }
    const contactSection = document.getElementById('contact')
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: 'smooth' })
    }
  }
  showToast(`เลือกสอบถามสินค้า: ${title}`)
}
</script>

<template>
  <section id="products" class="py-24 px-5 sm:px-10 lg:px-16 max-w-[1440px] mx-auto relative z-10">
    
    <!-- Section Title & Filter Tabs -->
    <div class="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-12">
      <div>
        <div class="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-[0.25em] text-[#00C864] dark:text-[#00FF88] mb-2 font-bold">
          <Box class="w-3.5 h-3.5" />
          <span>CATALOG // ผลิตภัณฑ์และสินค้า</span>
        </div>
        <h2 class="font-display font-extrabold text-3xl sm:text-5xl uppercase">
          ผลิตภัณฑ์และโซลูชันของเรา
        </h2>
      </div>

      <!-- Categories Filter Tabs -->
      <div class="flex flex-wrap items-center gap-2">
        <button
          v-for="cat in categories"
          :key="cat"
          type="button"
          :class="[
            'px-4 py-2 rounded-xl text-xs font-semibold transition-all duration-200',
            activeCategory === cat
              ? 'bg-[#00C864] text-[#022C22] dark:bg-[#00FF88] dark:text-[#020806] shadow-md font-bold scale-105'
              : 'spatial-glass hover:bg-[#00C864]/10 opacity-80 hover:opacity-100'
          ]"
          @click="activeCategory = cat"
        >
          {{ cat }}
        </button>
      </div>
    </div>

    <!-- Product Cards Grid with 3D Micro-interactions -->
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      <div
        v-for="product in filteredProducts"
        :key="product.id"
        class="spatial-glass rounded-3xl overflow-hidden flex flex-col justify-between group hover:-translate-y-2 hover:shadow-[0_16px_36px_rgba(0,200,100,0.15)] transition-all duration-300 border border-current/10"
      >
        <!-- Product Image with Zoom Effect -->
        <div class="relative h-48 overflow-hidden bg-black/10">
          <img
            :src="product.image"
            :alt="product.title"
            class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
          >
          <span class="absolute top-3 left-3 px-3 py-1 rounded-full text-[10px] font-mono font-bold bg-[#022C22]/85 text-white backdrop-blur-md">
            {{ product.category }}
          </span>
        </div>

        <!-- Product Details -->
        <div class="p-6 flex-1 flex flex-col justify-between space-y-4">
          <div>
            <h3 class="text-xl font-bold mb-2 group-hover:text-[#00C864] dark:group-hover:text-[#00FF88] transition-colors leading-snug">
              {{ product.title }}
            </h3>
            <p class="text-xs sm:text-sm opacity-75 line-clamp-2 leading-relaxed">
              {{ product.desc }}
            </p>
          </div>

          <div class="space-y-4 pt-4 border-t border-current/10">
            <!-- Tags -->
            <div class="flex flex-wrap gap-1.5">
              <span
                v-for="tag in product.tags"
                :key="tag"
                class="px-2 py-0.5 rounded-md text-[10px] font-mono bg-current/5 border border-current/10"
              >
                {{ tag }}
              </span>
            </div>

            <!-- Price & Inquire Button -->
            <div class="flex items-center justify-between pt-2">
              <div class="text-xs font-mono font-bold text-[#00C864] dark:text-[#00FF88]">
                {{ product.price }}
              </div>
              <button
                type="button"
                class="px-4 py-2 rounded-xl text-xs font-bold bg-[#022C22] text-white dark:bg-[#00FF88] dark:text-[#020806] hover:opacity-90 hover:scale-105 active:scale-95 transition-all flex items-center gap-1.5 shadow-md"
                @click="inquireProduct(product.title)"
              >
                <span>สอบถามสินค้านี้</span>
                <ArrowUpRight class="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
