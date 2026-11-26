<script setup lang="ts">
import { ref, computed, watch, onMounted } from 'vue'
import { Calendar, ArrowRight, ArrowUpRight, Sparkles, BookOpen, ChevronLeft, ChevronRight, Clock, X } from 'lucide-vue-next'
import { useNews, type NewsItem } from '~/composables/useNews'
import { useStrapiContent } from '~/composables/useStrapiContent'
import { useTheme } from '~/composables/useTheme'

const { showToast } = useTheme()
const { newsList: staticNewsList } = useNews()
const { getNewsArticles } = useStrapiContent()

const activeNewsList = ref<NewsItem[]>(staticNewsList)

onMounted(async () => {
  const strapiNews = await getNewsArticles()
  if (strapiNews && strapiNews.length > 0) {
    // Merge Strapi articles at the top, or use them if titles differ from static
    const mapped: NewsItem[] = strapiNews.map((sn, index) => {
      const matchingStatic = staticNewsList.find(s => s.title.trim() === sn.title.trim())
      return {
        ...(matchingStatic || {}),
        id: matchingStatic ? matchingStatic.id : (sn.id || (1000 + index)),
        title: sn.title,
        category: sn.category,
        date: sn.date,
        readTime: sn.readTime,
        excerpt: sn.excerpt,
        image: sn.image,
        aiSummary: matchingStatic?.aiSummary || [sn.excerpt],
        content: matchingStatic?.content || (sn.content ? [sn.content] : [sn.excerpt])
      }
    })
    // Avoid duplicates by title, keeping Strapi items first so admin edits reflect immediately
    const strapiTitles = new Set(mapped.map(m => m.title.trim()))
    const remainingStatic = staticNewsList.filter(s => !strapiTitles.has(s.title.trim()))
    activeNewsList.value = [...mapped, ...remainingStatic]
  }
})

// -------------------------------------------------------------
// หมวดหมู่ข่าวสาร
// -------------------------------------------------------------
const activeCategory = ref('ทั้งหมด')
const categories = ['ทั้งหมด', 'Enterprise Software', 'Service Development', 'กิจกรรมองค์กร', 'ข่าวประชาสัมพันธ์']

const filteredNews = computed(() => {
  if (activeCategory.value === 'ทั้งหมด') return activeNewsList.value
  return activeNewsList.value.filter(item => item.category === activeCategory.value)
})

// -------------------------------------------------------------
// ระบบแบ่งหน้า (แสดงครั้งละ 3 ข่าว ถ้าเกินให้มีปุ่ม < > กดเปลี่ยนหน้าอยู่ล่างขวา)
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

const scrollToNewsTop = () => {
  if (import.meta.client) {
    const el = document.getElementById('news')
    if (el) {
      const rect = el.getBoundingClientRect()
      if (rect.top < -50) {
        window.scrollTo({
          top: window.scrollY + rect.top - 80,
          behavior: 'smooth'
        })
      }
    }
  }
}

const prevPage = () => {
  if (currentPage.value > 1) {
    currentPage.value--
    activeAiSummaryId.value = null
    scrollToNewsTop()
  }
}

const nextPage = () => {
  if (currentPage.value < totalPages.value) {
    currentPage.value++
    activeAiSummaryId.value = null
    scrollToNewsTop()
  }
}

const goToPage = (page: number) => {
  if (currentPage.value !== page) {
    currentPage.value = page
    activeAiSummaryId.value = null
    scrollToNewsTop()
  }
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
      <div class="reveal-init reveal-left">
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
    </div>

    <!-- =========================================================
         NEWS CARDS GRID: EXACTLY 3 CARDS AT A TIME
         Glassmorphism & Dynamic Glow with Direct Navigation
    ========================================================== -->
    <div class="relative">
      <Transition name="news-page" mode="out-in">
        <div
          :key="`${activeCategory}-${currentPage}`"
          class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 items-stretch"
        >
          <article
            v-for="(item, idx) in displayedNews"
            :key="item.id"
            class="spatial-glass rounded-3xl overflow-hidden relative group transition-all duration-300 hover:-translate-y-2.5 flex flex-col justify-between border border-current/10 hover:border-[#00C864] dark:hover:border-[#00FF88] hover:shadow-[0_20px_45px_rgba(0,200,100,0.18)] hover-lift"
            @mousemove="onCardMouseMove($event, item.id)"
          >
        <!-- Mouse-Tracking Dynamic Glow Spotlight -->
        <div
          class="pointer-events-none absolute -inset-px rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-20"
          :style="{
            background: `radial-gradient(350px circle at ${mouseCoords[item.id]?.x || 150}px ${mouseCoords[item.id]?.y || 100}px, rgba(0, 210, 106, 0.22), transparent 70%)`
          }"
        />

        <div>
          <!-- Article Cover Image: aspect-[16/10] to match Product Cards -->
          <NuxtLink :to="'/news/' + item.id" class="block relative aspect-[16/10] w-full overflow-hidden bg-black/15 border-b border-current/10">
            <img
              :src="item.image"
              :alt="item.title"
              class="w-full h-full object-cover group-hover:scale-108 transition-transform duration-700 ease-out"
            >
            <div class="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />
            
            <!-- Category Badge (Unified with Product Catalog) -->
            <div class="absolute top-3.5 left-3.5 z-10">
              <span class="px-3 py-1 rounded-full text-[11px] font-mono font-bold bg-[#022C22]/85 text-white dark:bg-[#051811]/90 backdrop-blur-md border border-white/10 shadow-sm">
                {{ item.category }}
              </span>
            </div>

            <!-- AI Quick Summary Trigger -->
            <button
              type="button"
              class="absolute top-3.5 right-3.5 px-3 py-1 rounded-full text-[11px] font-mono font-bold bg-black/60 hover:bg-black/80 text-white backdrop-blur-md border border-white/20 transition-all flex items-center gap-1.5 z-20 hover:scale-105 active:scale-95 shadow-lg"
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
            <h3 class="text-xl sm:text-2xl font-bold leading-snug line-clamp-2 group-hover:text-[#00C864] dark:group-hover:text-[#00FF88] transition-colors">
              <NuxtLink :to="'/news/' + item.id">
                {{ item.title }}
              </NuxtLink>
            </h3>

            <!-- Summary Text -->
            <p class="text-xs sm:text-sm opacity-80 line-clamp-3 leading-relaxed">
              {{ item.summary }}
            </p>

            <!-- Inline AI Summary Popover Box -->
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

        <!-- Card Footer Action: Direct Link Button (Unified with Product CTA) -->
        <div class="px-6 sm:px-7 pb-6 pt-3 flex items-center justify-between border-t border-current/10 relative z-10">
          <NuxtLink
            :to="'/news/' + item.id"
            class="px-4 py-2 rounded-xl text-xs font-bold bg-[#00C864] text-[#022C22] dark:bg-[#00FF88] dark:text-[#020806] hover:opacity-90 active:scale-95 transition-all flex items-center gap-1.5 shadow-md"
          >
            <span>อ่านบทความเต็ม</span>
            <ArrowUpRight class="w-3.5 h-3.5" />
          </NuxtLink>
          <span class="text-[11px] font-mono opacity-50">IGENCO // 0{{ item.id }}</span>
        </div>
      </article>
        </div>
      </Transition>
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
         BOTTOM PAGINATION BAR (< >)
         แสดงปุ่ม < > ย้อนกลับและถัดไปอยู่มุมล่างขวา
    ========================================================== -->
    <div v-if="totalPages > 1" class="flex flex-col sm:flex-row items-center justify-between gap-4 mt-6 sm:mt-8 pt-5 sm:pt-6 border-t border-current/10">
      <div class="text-xs font-mono opacity-65">
        แสดงข่าว {{ ((currentPage - 1) * itemsPerPage) + 1 }} - {{ Math.min(currentPage * itemsPerPage, filteredNews.length) }} จากทั้งหมด {{ filteredNews.length }} รายการ
      </div>

      <!-- Controls: < > at bottom right -->
      <div class="flex items-center gap-2 p-1.5 px-3 rounded-2xl spatial-glass border border-current/10 shadow-sm sm:ml-auto">
        <!-- Previous Button (<) -->
        <button
          type="button"
          :disabled="currentPage === 1"
          aria-label="ย้อนกลับ"
          title="ย้อนกลับ"
          :class="[
            'w-8 h-8 rounded-xl flex items-center justify-center transition-all',
            currentPage === 1
              ? 'opacity-30 cursor-not-allowed'
              : 'hover:bg-[#00C864] hover:text-[#022C22] dark:hover:bg-[#00FF88] dark:hover:text-[#020806] active:scale-90'
          ]"
          @click="prevPage"
        >
          <ChevronLeft class="w-4 h-4" />
        </button>

        <!-- Page Indicator (e.g. 1 / 2) -->
        <span class="text-xs font-mono font-bold px-2 opacity-80 select-none">
          {{ currentPage }} / {{ totalPages }}
        </span>

        <!-- Next Button (>) -->
        <button
          type="button"
          :disabled="currentPage === totalPages"
          aria-label="ถัดไป"
          title="ถัดไป"
          :class="[
            'w-8 h-8 rounded-xl flex items-center justify-center transition-all',
            currentPage === totalPages
              ? 'opacity-30 cursor-not-allowed'
              : 'hover:bg-[#00C864] hover:text-[#022C22] dark:hover:bg-[#00FF88] dark:hover:text-[#020806] active:scale-90'
          ]"
          @click="nextPage"
        >
          <ChevronRight class="w-4 h-4" />
        </button>
      </div>
    </div>

  </section>
</template>

<style scoped>
.news-page-enter-active,
.news-page-leave-active {
  transition: opacity 0.2s ease-out, transform 0.2s cubic-bezier(0.22, 1, 0.36, 1);
}
.news-page-enter-from {
  opacity: 0;
  transform: translateY(12px) scale(0.99);
}
.news-page-leave-to {
  opacity: 0;
  transform: translateY(-8px) scale(0.99);
}
</style>
