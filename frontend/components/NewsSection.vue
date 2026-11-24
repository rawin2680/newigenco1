<script setup lang="ts">
import { ref, computed, watch } from 'vue'
import { Calendar, ArrowRight, Sparkles, BookOpen, ChevronLeft, ChevronRight, Clock, X } from 'lucide-vue-next'
import { useNews, type NewsItem } from '~/composables/useNews'
import { useTheme } from '~/composables/useTheme'

const { showToast } = useTheme()
const { newsList } = useNews()

// -------------------------------------------------------------
// หมวดหมู่ข่าวสาร
// -------------------------------------------------------------
const activeCategory = ref('ทั้งหมด')
const categories = ['ทั้งหมด', 'Enterprise Software', 'Service Development', 'กิจกรรมองค์กร']

const filteredNews = computed(() => {
  if (activeCategory.value === 'ทั้งหมด') return newsList
  return newsList.filter(item => item.category === activeCategory.value)
})

// -------------------------------------------------------------
// ระบบแบ่งหน้า (แสดงครั้งละ 3 ข่าว ถ้าเกินให้มีปุ่ม < > กดเปลี่ยนหน้า)
// -------------------------------------------------------------
const itemsPerPage = 3
const currentPage = ref(1)

const totalPages = computed(() => {
  return Math.max(1, Math.ceil(filteredNews.value.length / itemsPerPage))
})

// รีเซ็ตหน้ากลับเป็นหน้า 1 เมื่อเปลี่ยนหมวดหมู่
watch(activeCategory, () => {
  currentPage.value = 1
  activeAiSummaryId.value = null
})

const displayedNews = computed(() => {
  const startIndex = (currentPage.value - 1) * itemsPerPage
  return filteredNews.value.slice(startIndex, startIndex + itemsPerPage)
})

const prevPage = () => {
  if (currentPage.value > 1) {
    currentPage.value--
    activeAiSummaryId.value = null
  }
}

const nextPage = () => {
  if (currentPage.value < totalPages.value) {
    currentPage.value++
    activeAiSummaryId.value = null
  }
}

const goToPage = (page: number) => {
  currentPage.value = page
  activeAiSummaryId.value = null
}

// -------------------------------------------------------------
// Mouse-Tracking Dynamic Glow Spotlight
// -------------------------------------------------------------
const mouseCoords = ref<Record<number, { x: number; y: number }>>({})

const onCardMouseMove = (e: MouseEvent, id: number) => {
  const rect = (e.currentTarget as HTMLElement).getBoundingClientRect()
  mouseCoords.value[id] = {
    x: e.clientX - rect.left,
    y: e.clientY - rect.top
  }
}

// -------------------------------------------------------------
// AI Quick Summary Popover (แสดงในตัวการ์ด ไม่มีการเปิดป๊อบอัพทับหน้าจอ)
// -------------------------------------------------------------
const activeAiSummaryId = ref<number | null>(null)

const toggleAiSummary = (id: number) => {
  if (activeAiSummaryId.value === id) {
    activeAiSummaryId.value = null
  } else {
    activeAiSummaryId.value = id
    showToast('AI ดึงสรุปประเด็นสำคัญเรียบร้อย')
  }
}
</script>

<template>
  <section id="news" class="py-24 px-5 sm:px-10 lg:px-16 max-w-[1440px] mx-auto relative z-10">
    
    <!-- Section Header with Category Tabs and Pagination Buttons -->
    <div class="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
      <div>
        <div class="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-[0.25em] text-[#00C864] dark:text-[#00FF88] mb-2 font-bold">
          <BookOpen class="w-3.5 h-3.5" />
          <span>NEWS & ACTIVITIES // ข่าวสารและกิจกรรม IGENCO</span>
        </div>
        <h2 class="font-display font-extrabold text-3xl sm:text-5xl uppercase tracking-tight text-[#022C22] dark:text-[#F4FBF7]">
          ข่าวสารล่าสุด
        </h2>
        <p class="text-sm opacity-75 mt-2 max-w-xl">
          ติดตามความเคลื่อนไหว ผลงานความสำเร็จ และสาระความรู้ด้านนวัตกรรมและเทคโนโลยีองค์กร
        </p>
      </div>

      <!-- Categories Filter Tabs & Quick Controls -->
      <div class="flex flex-col sm:flex-row items-start sm:items-center gap-3">
        <!-- Categories -->
        <div class="flex flex-wrap items-center gap-1.5 p-1 rounded-2xl bg-black/5 dark:bg-white/5 border border-current/10">
          <button
            v-for="cat in categories"
            :key="cat"
            type="button"
            :class="[
              'px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-all duration-200',
              activeCategory === cat
                ? 'bg-[#00C864] text-[#022C22] dark:bg-[#00FF88] dark:text-[#020806] shadow-sm font-bold'
                : 'hover:bg-[#00C864]/10 opacity-75 hover:opacity-100'
            ]"
            @click="activeCategory = cat"
          >
            {{ cat }}
          </button>
        </div>

        <!-- Desktop Pagination Buttons (< >) in Header -->
        <div v-if="totalPages > 1" class="hidden sm:flex items-center gap-2 pl-2">
          <button
            type="button"
            aria-label="Previous Page"
            :disabled="currentPage === 1"
            :class="[
              'w-10 h-10 rounded-xl flex items-center justify-center transition-all border',
              currentPage === 1
                ? 'opacity-30 cursor-not-allowed border-current/10'
                : 'hover:bg-[#00C864] hover:text-[#022C22] dark:hover:bg-[#00FF88] dark:hover:text-[#020806] border-current/20 hover:scale-105 active:scale-95 shadow-sm'
            ]"
            @click="prevPage"
          >
            <ChevronLeft class="w-5 h-5" />
          </button>

          <span class="text-xs font-mono font-bold px-2 opacity-70">
            {{ currentPage }} / {{ totalPages }}
          </span>

          <button
            type="button"
            aria-label="Next Page"
            :disabled="currentPage === totalPages"
            :class="[
              'w-10 h-10 rounded-xl flex items-center justify-center transition-all border',
              currentPage === totalPages
                ? 'opacity-30 cursor-not-allowed border-current/10'
                : 'hover:bg-[#00C864] hover:text-[#022C22] dark:hover:bg-[#00FF88] dark:hover:text-[#020806] border-current/20 hover:scale-105 active:scale-95 shadow-sm'
            ]"
            @click="nextPage"
          >
            <ChevronRight class="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>

    <!-- =========================================================
         NEWS CARDS GRID: EXACTLY 3 CARDS AT A TIME
         Glassmorphism & Dynamic Glow with Direct Navigation
    ========================================================== -->
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7 items-stretch">
      <article
        v-for="item in displayedNews"
        :key="item.id"
        class="rounded-[2rem] overflow-hidden relative group transition-all duration-300 hover:-translate-y-2 flex flex-col justify-between backdrop-blur-2xl bg-white/70 dark:bg-black/50 border border-white/70 dark:border-emerald-500/20 shadow-[0_12px_40px_rgba(0,200,100,0.08)] hover:shadow-[0_20px_50px_rgba(0,200,100,0.15)]"
        @mousemove="onCardMouseMove($event, item.id)"
      >
        <!-- Mouse-Tracking Dynamic Glow Spotlight -->
        <div
          class="pointer-events-none absolute -inset-px rounded-[2rem] opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-20"
          :style="{
            background: `radial-gradient(350px circle at ${mouseCoords[item.id]?.x || 150}px ${mouseCoords[item.id]?.y || 100}px, rgba(0, 210, 106, 0.22), transparent 70%)`
          }"
        />

        <div>
          <!-- Article Cover Image (Direct Link to News Page) -->
          <NuxtLink :to="'/news/' + item.id" class="block relative h-56 sm:h-60 overflow-hidden bg-black/15">
            <img
              :src="item.image"
              :alt="item.title"
              class="w-full h-full object-cover group-hover:scale-108 transition-transform duration-700 ease-out"
            >
            <div class="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
            
            <!-- Category Badge -->
            <span class="absolute top-4 left-4 px-3 py-1 rounded-full text-xs font-mono font-bold bg-[#00C864] text-[#022C22] dark:bg-[#00FF88] dark:text-[#020806] shadow-md z-10">
              {{ item.category }}
            </span>

            <!-- AI Quick Summary Trigger (Click to toggle summary inside card) -->
            <button
              type="button"
              class="absolute top-4 right-4 px-3 py-1 rounded-full text-xs font-mono font-bold bg-black/60 hover:bg-black/80 text-white backdrop-blur-md border border-white/20 transition-all flex items-center gap-1.5 z-20 hover:scale-105 active:scale-95 shadow-lg"
              title="กดเพื่อดูสรุป 3 ข้อโดย AI"
              @click.prevent.stop="toggleAiSummary(item.id)"
            >
              <Sparkles class="w-3.5 h-3.5 text-[#00FF88]" />
              <span>สรุป AI</span>
            </button>
          </NuxtLink>

          <!-- Card Content -->
          <div class="p-6 sm:p-7 space-y-3.5 relative z-10">
            <!-- Date & Read Time -->
            <div class="flex items-center gap-3 text-xs font-mono opacity-65">
              <span class="flex items-center gap-1.5">
                <Calendar class="w-3.5 h-3.5" />
                {{ item.date }}
              </span>
              <span>•</span>
              <span class="flex items-center gap-1">
                <Clock class="w-3.5 h-3.5" />
                {{ item.readTime }}
              </span>
            </div>

            <!-- Title with Direct Link -->
            <h3 class="text-xl font-bold leading-snug line-clamp-2 group-hover:text-[#00C864] dark:group-hover:text-[#00FF88] transition-colors">
              <NuxtLink :to="'/news/' + item.id">
                {{ item.title }}
              </NuxtLink>
            </h3>

            <!-- Summary Text -->
            <p class="text-sm opacity-80 line-clamp-3 leading-relaxed">
              {{ item.summary }}
            </p>

            <!-- Inline AI Summary Popover Box (Doesn't pop up full screen) -->
            <div
              v-if="activeAiSummaryId === item.id"
              class="p-4 rounded-2xl bg-[#020806]/95 text-white border border-[#00FF88]/40 shadow-2xl space-y-2.5 animate-in fade-in zoom-in-95 duration-200 mt-2"
            >
              <div class="flex items-center justify-between border-b border-white/10 pb-2">
                <div class="flex items-center gap-1.5 text-xs font-mono text-[#00FF88] font-bold">
                  <Sparkles class="w-3.5 h-3.5" />
                  <span>AI SUMMARY // 3 ข้อย่อ</span>
                </div>
                <button
                  type="button"
                  class="text-xs opacity-60 hover:opacity-100 p-1"
                  @click="activeAiSummaryId = null"
                >
                  <X class="w-4 h-4" />
                </button>
              </div>
              <ul class="space-y-1.5 text-xs text-slate-200">
                <li
                  v-for="(point, idx) in item.aiSummary"
                  :key="idx"
                  class="flex items-start gap-2"
                >
                  <span class="text-[#00FF88] font-bold">✦</span>
                  <span>{{ point }}</span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <!-- Card Footer Action: Direct Link to News Article Page -->
        <div class="px-6 sm:px-7 pb-6 pt-3 flex items-center justify-between border-t border-current/10 relative z-10">
          <NuxtLink
            :to="'/news/' + item.id"
            class="text-xs sm:text-sm font-bold text-[#00C864] dark:text-[#00FF88] hover:underline flex items-center gap-2"
          >
            <span>อ่านเพิ่มเติมหรือสอบถาม</span>
            <ArrowRight class="w-4 h-4 group-hover:translate-x-1.5 transition-transform duration-300" />
          </NuxtLink>
          <span class="text-[11px] font-mono opacity-50">IGENCO // {{ item.id.toString().padStart(2, '0') }}</span>
        </div>
      </article>
    </div>

    <!-- Empty State (กรณีไม่พบข้อมูลในหมวดที่เลือก) -->
    <div
      v-if="displayedNews.length === 0"
      class="text-center py-16 spatial-glass rounded-3xl mt-6 border border-current/10"
    >
      <p class="text-sm opacity-70">ไม่พบข่าวสารในหมวดหมู่นี้</p>
      <button
        type="button"
        class="mt-4 px-4 py-2 rounded-xl text-xs font-bold bg-[#00C864] text-[#022C22] dark:bg-[#00FF88] dark:text-[#020806]"
        @click="activeCategory = 'ทั้งหมด'"
      >
        ดูข่าวทั้งหมด
      </button>
    </div>

    <!-- =========================================================
         BOTTOM PAGINATION BAR (< 1 2 >)
         แสดงอย่างเด่นชัดเมื่อมีข่าวมากกว่า 3 รายการ
    ========================================================== -->
    <div v-if="totalPages > 1" class="flex flex-col sm:flex-row items-center justify-between gap-4 mt-12 pt-8 border-t border-current/10">
      <div class="text-xs font-mono opacity-65">
        แสดงข่าว {{ ((currentPage - 1) * itemsPerPage) + 1 }} - {{ Math.min(currentPage * itemsPerPage, filteredNews.length) }} จากทั้งหมด {{ filteredNews.length }} รายการ
      </div>

      <!-- Controls: < Buttons + Numbers + > Button -->
      <div class="flex items-center gap-2">
        <!-- Previous Button -->
        <button
          type="button"
          :disabled="currentPage === 1"
          :class="[
            'px-4 py-2.5 rounded-xl text-xs font-bold font-mono flex items-center gap-1.5 transition-all border',
            currentPage === 1
              ? 'opacity-30 cursor-not-allowed border-current/10'
              : 'hover:bg-[#00C864] hover:text-[#022C22] dark:hover:bg-[#00FF88] dark:hover:text-[#020806] border-current/20 active:scale-95 shadow-sm'
          ]"
          @click="prevPage"
        >
          <ChevronLeft class="w-4 h-4" />
          <span>ก่อนหน้า</span>
        </button>

        <!-- Page Numbers -->
        <div class="flex items-center gap-1.5 px-2">
          <button
            v-for="pageNum in totalPages"
            :key="pageNum"
            type="button"
            :class="[
              'w-9 h-9 rounded-xl text-xs font-mono font-bold transition-all',
              currentPage === pageNum
                ? 'bg-[#00C864] text-[#022C22] dark:bg-[#00FF88] dark:text-[#020806] shadow-md scale-105'
                : 'hover:bg-current/10 opacity-70 hover:opacity-100'
            ]"
            @click="goToPage(pageNum)"
          >
            {{ pageNum }}
          </button>
        </div>

        <!-- Next Button -->
        <button
          type="button"
          :disabled="currentPage === totalPages"
          :class="[
            'px-4 py-2.5 rounded-xl text-xs font-bold font-mono flex items-center gap-1.5 transition-all border',
            currentPage === totalPages
              ? 'opacity-30 cursor-not-allowed border-current/10'
              : 'hover:bg-[#00C864] hover:text-[#022C22] dark:hover:bg-[#00FF88] dark:hover:text-[#020806] border-current/20 active:scale-95 shadow-sm'
          ]"
          @click="nextPage"
        >
          <span>ถัดไป</span>
          <ChevronRight class="w-4 h-4" />
        </button>
      </div>
    </div>

  </section>
</template>
