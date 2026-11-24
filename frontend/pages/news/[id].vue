<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { useRoute } from 'vue-router'
import {
  ArrowLeft,
  Calendar,
  Clock,
  Sparkles,
  Share2,
  CheckCircle2,
  Search,
  X,
  Star,
  Heart,
  Maximize2,
  ZoomIn,
  ChevronDown,
  ChevronUp,
  ChevronLeft,
  ChevronRight,
  Images,
  ShieldCheck,
  Award,
  Layers,
  ArrowRight,
  User,
  Copy,
  ExternalLink,
  Tag
} from 'lucide-vue-next'
import AppHeader from '~/components/AppHeader.vue'
import ContactFooter from '~/components/ContactFooter.vue'
import { useNews, type NewsItem } from '~/composables/useNews'
import { useTheme } from '~/composables/useTheme'

const route = useRoute()
const { getNewsById, newsList } = useNews()
const { showToast } = useTheme()

const articleId = computed(() => Number(route.params.id))
const article = computed(() => getNewsById(articleId.value))

// -------------------------------------------------------------
// Interactive Compact Photo Gallery Slider
// -------------------------------------------------------------
const currentGalleryIdx = ref(0)

const activeGalleryImage = computed(() => {
  if (article.value?.gallery && article.value.gallery.length > 0) {
    return article.value.gallery[currentGalleryIdx.value]
  }
  return { url: article.value?.image || '', caption: article.value?.title }
})

const nextGallery = () => {
  if (!article.value?.gallery || article.value.gallery.length === 0) return
  currentGalleryIdx.value = (currentGalleryIdx.value + 1) % article.value.gallery.length
}

const prevGallery = () => {
  if (!article.value?.gallery || article.value.gallery.length === 0) return
  currentGalleryIdx.value = (currentGalleryIdx.value - 1 + article.value.gallery.length) % article.value.gallery.length
}

// -------------------------------------------------------------
// 1. READING PROGRESS BAR & SCROLLYTELLING TRACKER
// -------------------------------------------------------------
const scrollProgress = ref(0)
const activeSection = ref('section-overview')
const tableOfContents = computed(() => {
  const toc = [
    { id: 'section-overview', label: article.value?.certifier ? 'ภาพรวมและการรับรอง' : 'ภาพรวมบทความ' },
    { id: 'section-summary', label: 'สรุปสาระสำคัญ (AI Summary)' },
    { id: 'section-body', label: 'เนื้อหาบทความ' }
  ]
  if (article.value?.flowcharts && article.value.flowcharts.length > 0) {
    toc.push({ id: 'section-architecture', label: 'แผนผังกระบวนการมาตรฐาน' })
  }
  toc.push({ id: 'section-author', label: 'ข้อมูลผู้เขียนและการประเมิน' })
  return toc
})

let sectionObserver: IntersectionObserver | null = null

const setupSectionObserver = () => {
  if (import.meta.client && 'IntersectionObserver' in window) {
    sectionObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            activeSection.value = entry.target.id
          }
        })
      },
      {
        rootMargin: '-15% 0px -65% 0px',
        threshold: 0
      }
    )
    tableOfContents.forEach((sec) => {
      const el = document.getElementById(sec.id)
      if (el) sectionObserver?.observe(el)
    })
  }
}

const updateScrollProgress = () => {
  if (import.meta.client) {
    const scrollTop = window.scrollY || document.documentElement.scrollTop
    const docHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight
    if (docHeight > 0) {
      scrollProgress.value = Math.min(100, Math.max(0, (scrollTop / docHeight) * 100))
    }
  }
}

onMounted(() => {
  if (import.meta.client) {
    window.addEventListener('scroll', updateScrollProgress, { passive: true })
    setTimeout(() => {
      setupSectionObserver()
    }, 150)
  }
})

onUnmounted(() => {
  if (import.meta.client) {
    window.removeEventListener('scroll', updateScrollProgress)
    sectionObserver?.disconnect()
  }
})

// -------------------------------------------------------------
// 2. COLLAPSIBLE AI QUICK SUMMARY
// -------------------------------------------------------------
const isAiSummaryOpen = ref(true)

// -------------------------------------------------------------
// 3. INTERACTIVE 5-STAR RATING & REACTION
// -------------------------------------------------------------
const userRating = ref(5)
const hasRated = ref(false)
const hoverRating = ref(0)
const likeCount = ref(article.value?.likes || 124)
const isLiked = ref(false)

const handleRating = (stars: number) => {
  userRating.value = stars
  hasRated.value = true
  showToast(`ขอบคุณที่ให้คะแนน ${stars} ดาวแก่บทความนี้! ✨`)
}

const toggleLike = () => {
  if (!isLiked.value) {
    isLiked.value = true
    likeCount.value++
    showToast('ขอบคุณสำหรับกำลังใจและกดถูกใจบทความนี้! ❤️')
  } else {
    isLiked.value = false
    likeCount.value--
  }
}

// -------------------------------------------------------------
// 4. INTERACTIVE LIGHTBOX FOR FLOWCHARTS & IMAGES
// -------------------------------------------------------------
const lightboxImage = ref<{ url: string; title: string; subtitle?: string } | null>(null)
const isZoomed = ref(false)

const openLightbox = (url: string, title: string, subtitle?: string) => {
  lightboxImage.value = { url, title, subtitle }
  isZoomed.value = false
  if (import.meta.client) {
    document.body.style.overflow = 'hidden'
  }
}

const closeLightbox = () => {
  lightboxImage.value = null
  isZoomed.value = false
  if (import.meta.client) {
    document.body.style.overflow = ''
  }
}

// -------------------------------------------------------------
// 5. STICKY SIDEBAR: INSTANT SEARCH & CATEGORIES
// -------------------------------------------------------------
const searchQuery = ref('')
const selectedCategory = ref('ทั้งหมด')

const categoriesWithCount = [
  { name: 'ทั้งหมด', count: newsList.length },
  { name: 'Enterprise Software', count: 7 },
  { name: 'Service Development', count: 2 },
  { name: 'E-Commerce', count: 3 },
  { name: 'กิจกรรมองค์กร', count: 4 }
]

const recentNews = computed(() => {
  return newsList.filter(n => n.id !== articleId.value).slice(0, 4)
})

const filteredSearchResults = computed(() => {
  if (!searchQuery.value.trim()) return []
  const q = searchQuery.value.toLowerCase().trim()
  return newsList.filter(n =>
    n.title.toLowerCase().includes(q) ||
    n.summary.toLowerCase().includes(q) ||
    n.category.toLowerCase().includes(q)
  )
})

// คัดลอกลิงก์แชร์
const shareArticle = () => {
  if (import.meta.client) {
    navigator.clipboard.writeText(window.location.href)
    showToast('คัดลอกลิงก์บทความเรียบร้อยแล้ว')
  }
}

// Active tab for Flowcharts (PM vs SI)
const activeFlowTab = ref<'pm-flow' | 'si-flow'>('pm-flow')

// Meta SEO
useHead(() => ({
  title: article.value ? `${article.value.title} | IGENCO News` : 'ข่าวสารและกิจกรรม | IGENCO',
  meta: [
    {
      name: 'description',
      content: article.value?.summary || 'ข่าวสารและกิจกรรมล่าสุด บริษัท ไอเจนโก้ จำกัด (IGENCO)'
    }
  ]
}))
</script>

<template>
  <div class="min-h-screen relative selection:bg-[#00D26A] selection:text-[#022C22] flex flex-col justify-between">
    
    <!-- =========================================================
         0. READING PROGRESS BAR (ติดขอบจอบนสุด วิ่งตามระยะการอ่าน)
    ========================================================== -->
    <div
      class="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#00C864] via-[#00FF88] to-[#00D26A] z-50 transition-all duration-150 pointer-events-none shadow-[0_0_10px_#00FF88]"
      :style="{ width: `${scrollProgress}%` }"
    />

    <!-- 1. Header Navigation -->
    <AppHeader />

    <!-- 2. Main Article Content Container (2-Column Layout with Sticky Sidebar) -->
    <main class="pt-28 pb-20 px-5 sm:px-10 lg:px-16 max-w-[1440px] mx-auto w-full flex-1 relative z-10">
      
      <!-- Article Found State -->
      <div v-if="article" class="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">
        
        <!-- =====================================================
             MAIN EDITORIAL COLUMN (8 Columns)
        ====================================================== -->
        <article class="lg:col-span-8 space-y-10">
          
          <!-- Top Breadcrumb & Share Navigation -->
          <div class="flex items-center justify-between gap-4 border-b border-current/10 pb-5">
            <NuxtLink
              to="/#news"
              class="inline-flex items-center gap-2 text-xs sm:text-sm font-bold font-mono text-[#00C864] dark:text-[#00FF88] hover:underline group"
            >
              <ArrowLeft class="w-4 h-4 group-hover:-translate-x-1.5 transition-transform" />
              <span>ย้อนกลับไปหน้าข่าวสารทั้งหมด</span>
            </NuxtLink>

            <button
              type="button"
              class="px-3.5 py-1.5 rounded-xl border border-current/20 hover:bg-[#00C864]/10 dark:hover:bg-[#00FF88]/10 text-xs font-mono font-semibold flex items-center gap-1.5 transition-all active:scale-95 shadow-sm"
              @click="shareArticle"
            >
              <Share2 class="w-3.5 h-3.5 text-[#00C864] dark:text-[#00FF88]" />
              <span class="hidden sm:inline">แชร์บทความ</span>
            </button>
          </div>

          <!-- ===================================================
               BENTO HERO HEADER (จัดวาง TÜV NORD + ISO 29110 ในการ์ดกระจกฝ้า)
          ==================================================== -->
          <header id="section-overview" class="space-y-6 reveal-init reveal-scale">
            
            <!-- Category, Date & Read Time Badges -->
            <div class="flex flex-wrap items-center gap-2.5 text-xs font-mono">
              <span class="px-3.5 py-1 rounded-full font-bold bg-[#00C864] text-[#022C22] dark:bg-[#00FF88] dark:text-[#020806] shadow-sm">
                {{ article.category }}
              </span>
              <span class="flex items-center gap-1.5 opacity-70">
                <Calendar class="w-3.5 h-3.5" />
                {{ article.date }}
              </span>
              <span class="opacity-40">•</span>
              <span class="flex items-center gap-1.5 opacity-70">
                <Clock class="w-3.5 h-3.5" />
                {{ article.readTime }}
              </span>
            </div>

            <!-- Title & Subtitle -->
            <div class="space-y-3">
              <h1 class="font-display font-black text-3xl sm:text-4xl md:text-5xl leading-[1.15] text-[#022C22] dark:text-[#F4FBF7] tracking-tight">
                {{ article.title }}
              </h1>
              <h2 v-if="article.subtitle" class="text-lg sm:text-xl font-semibold opacity-85 text-[#00A854] dark:text-[#00FF88] leading-snug">
                {{ article.subtitle }}
              </h2>
            </div>

            <!-- Bento Accreditation Card: If article has certifier (e.g. TÜV NORD + Ceremony Photo) -->
            <div v-if="article.certifier" class="grid grid-cols-1 md:grid-cols-12 gap-5 p-6 sm:p-7 rounded-[2rem] spatial-glass border border-[#00C864]/30 dark:border-[#00FF88]/30 shadow-xl bg-gradient-to-br from-white/80 via-emerald-50/40 to-white/60 dark:from-black/60 dark:via-emerald-950/20 dark:to-black/40">
              
              <!-- Left: Certificate Details & TÜV NORD Badge (5 Cols) -->
              <div class="md:col-span-5 flex flex-col justify-between space-y-4">
                <div class="space-y-3.5">
                  
                  <!-- TÜV NORD Official Emblem & Badge -->
                  <div class="flex items-center gap-3.5">
                    <div
                      class="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl p-1 bg-white dark:bg-white/95 shadow-md flex items-center justify-center shrink-0 border border-slate-200 cursor-pointer hover:scale-105 transition-transform"
                      @click="openLightbox('/images/news/tuv-nord-iso29110-logo.png', 'TÜV NORD (Thailand) Ltd.', 'ตราสัญลักษณ์รับรองมาตรฐานสากล ISO/IEC 29110')"
                    >
                      <img
                        :src="'/images/news/tuv-nord-iso29110-logo.png'"
                        alt="TÜV NORD ISO/IEC 29110 Emblem"
                        class="w-full h-full object-contain"
                      >
                    </div>
                    <div>
                      <div class="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-[#00C864]/15 dark:bg-[#00FF88]/15 border border-[#00C864]/30 text-[11px] font-mono font-bold text-[#00A854] dark:text-[#00FF88]">
                        <ShieldCheck class="w-3.5 h-3.5" />
                        <span>TÜV NORD CERTIFIED</span>
                      </div>
                      <div class="text-xs font-mono font-bold text-slate-700 dark:text-slate-200 mt-1">
                        ISO/IEC 29110:2011
                      </div>
                    </div>
                  </div>

                  <h3 class="text-lg font-bold leading-snug">
                    การรับรองคุณภาพมาตรฐานวิศวกรรมซอฟต์แวร์สากล
                  </h3>

                  <p class="text-xs sm:text-sm opacity-80 leading-relaxed">
                    สถาบัน <strong class="text-[#022C22] dark:text-white">TÜV NORD (Thailand) Co., Ltd.</strong> ได้ประเมินและให้การรับรองบริษัท ไอเจนโก้ จำกัด ใน 2 กระบวนการหลัก:
                  </p>

                  <ul class="space-y-1.5 text-xs font-mono opacity-90 text-[#022C22] dark:text-emerald-300">
                    <li class="flex items-center gap-1.5">
                      <span class="w-1.5 h-1.5 rounded-full bg-[#00C864] dark:bg-[#00FF88]" />
                      <span>Software Implementation Process (SI)</span>
                    </li>
                    <li class="flex items-center gap-1.5">
                      <span class="w-1.5 h-1.5 rounded-full bg-[#00C864] dark:bg-[#00FF88]" />
                      <span>Project Management Process (PM)</span>
                    </li>
                  </ul>
                </div>

                <div class="pt-2 text-[11px] font-mono opacity-60 border-t border-current/10">
                  วันรับรอง: 25 กรกฎาคม 2561 • ขอบข่ายระดับสากล
                </div>
              </div>

              <!-- Right: Award Ceremony Photo with Lightbox Zoom (7 Cols) -->
              <div class="md:col-span-7 relative group rounded-2xl overflow-hidden shadow-lg border border-black/10 dark:border-white/10 bg-black/15 cursor-pointer" @click="openLightbox(article.image, article.title, 'พิธีมอบใบรับรองมาตรฐาน ISO/IEC 29110 โดย TÜV NORD และ SIPA')">
                <img
                  :src="article.image"
                  :alt="article.title"
                  class="w-full h-64 md:h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
                >
                <div class="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent flex items-end p-4 justify-between">
                  <span class="text-xs text-white font-medium drop-shadow-md">
                    พิธีมอบใบรับรองมาตรฐาน ISO 29110 โดย SIPA & สภาอุตสาหกรรมฯ
                  </span>
                  <span class="px-2.5 py-1 rounded-lg bg-black/60 backdrop-blur-md text-white text-[11px] font-mono flex items-center gap-1 group-hover:bg-[#00C864] group-hover:text-[#022C22] transition-colors shadow">
                    <ZoomIn class="w-3.5 h-3.5" />
                    <span>คลิกเพื่อซูม</span>
                  </span>
                </div>
              </div>

            </div>

            <!-- 1. If article has gallery with > 1 photos: Compact Photo Slider (Prev/Next buttons, not too big) -->
            <div
              v-else-if="article.gallery && article.gallery.length > 1"
              class="relative rounded-[2rem] overflow-hidden shadow-xl border border-black/10 dark:border-white/10 bg-black/20 max-w-3xl mx-auto group"
            >
              <!-- Image Display Frame: Compact 16/10 aspect ratio, max-h-[380px] so it's not too big -->
              <div
                class="relative aspect-[16/10] sm:aspect-[16/9] max-h-[380px] w-full overflow-hidden cursor-pointer"
                @click="openLightbox(activeGalleryImage.url, article.title, activeGalleryImage.caption || article.title)"
              >
                <Transition name="gallery-fade" mode="out-in">
                  <img
                    :key="currentGalleryIdx"
                    :src="activeGalleryImage.url"
                    :alt="activeGalleryImage.caption || article.title"
                    class="w-full h-full object-cover group-hover:scale-103 transition-transform duration-500 ease-out"
                  >
                </Transition>

                <!-- Gradient Overlay & Caption -->
                <div class="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent pointer-events-none" />

                <!-- Bottom Bar: Caption & Lightbox Zoom Prompt -->
                <div class="absolute bottom-0 inset-x-0 p-4 sm:p-5 flex flex-col sm:flex-row sm:items-end justify-between gap-2.5 z-10 pointer-events-none">
                  <div class="space-y-1 text-white max-w-lg">
                    <div class="text-[11px] font-mono font-bold text-[#00FF88] flex items-center gap-1.5">
                      <Images class="w-3.5 h-3.5" />
                      <span>ภาพกิจกรรมที่ {{ currentGalleryIdx + 1 }} / {{ article.gallery.length }}</span>
                    </div>
                    <p class="text-xs sm:text-sm font-medium drop-shadow-md opacity-95 line-clamp-2">
                      {{ activeGalleryImage.caption || article.title }}
                    </p>
                  </div>
                  <span class="px-2.5 py-1 rounded-lg bg-black/60 backdrop-blur-md text-white text-[11px] font-mono flex items-center gap-1.5 shadow self-start sm:self-auto pointer-events-auto">
                    <ZoomIn class="w-3.5 h-3.5" />
                    <span>กดเพื่อซูม</span>
                  </span>
                </div>
              </div>

              <!-- Previous Button (<) -->
              <button
                type="button"
                aria-label="Previous Photo"
                class="absolute left-3.5 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-black/65 hover:bg-[#00C864] hover:text-[#022C22] text-white flex items-center justify-center transition-all shadow-xl active:scale-90 z-20 border border-white/20 backdrop-blur-md cursor-pointer"
                @click.stop="prevGallery"
              >
                <ChevronLeft class="w-5 h-5" />
              </button>

              <!-- Next Button (>) -->
              <button
                type="button"
                aria-label="Next Photo"
                class="absolute right-3.5 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-black/65 hover:bg-[#00C864] hover:text-[#022C22] text-white flex items-center justify-center transition-all shadow-xl active:scale-90 z-20 border border-white/20 backdrop-blur-md cursor-pointer"
                @click.stop="nextGallery"
              >
                <ChevronRight class="w-5 h-5" />
              </button>

              <!-- Indicator Dots & Navigation Badges -->
              <div class="absolute top-3.5 right-3.5 z-20 flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-black/60 backdrop-blur-md border border-white/15">
                <button
                  v-for="(item, idx) in article.gallery"
                  :key="idx"
                  type="button"
                  :aria-label="'Go to photo ' + (idx + 1)"
                  :class="[
                    'h-2 rounded-full transition-all cursor-pointer',
                    currentGalleryIdx === idx
                      ? 'w-6 bg-[#00FF88]'
                      : 'w-2 bg-white/50 hover:bg-white/80'
                  ]"
                  @click.stop="currentGalleryIdx = idx"
                />
              </div>
            </div>

            <!-- 2. Standard Single Hero Image Banner (for articles with 1 photo) -->
            <div
              v-else
              class="relative group rounded-[2rem] overflow-hidden shadow-2xl border border-black/10 dark:border-white/10 bg-black/15 cursor-pointer max-w-3xl mx-auto"
              @click="openLightbox(article.image, article.title, article.title)"
            >
              <img
                :src="article.image"
                :alt="article.title"
                class="w-full h-72 sm:h-96 md:h-[420px] object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
              >
              <div class="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent flex items-end p-6 sm:p-8 justify-between">
                <div class="space-y-1 text-white">
                  <div class="text-xs font-mono font-bold text-[#00FF88]">
                    {{ article.category }} // {{ article.date }}
                  </div>
                  <div class="text-sm sm:text-base font-semibold drop-shadow-md">
                    {{ article.title }}
                  </div>
                </div>
                <span class="px-3 py-1.5 rounded-xl bg-black/60 backdrop-blur-md text-white text-xs font-mono flex items-center gap-1.5 group-hover:bg-[#00C864] group-hover:text-[#022C22] transition-all shadow-lg shrink-0">
                  <ZoomIn class="w-4 h-4" />
                  <span>คลิกเพื่อดูภาพเต็ม</span>
                </span>
              </div>
            </div>

          </header>

          <!-- ===================================================
               AI QUICK SUMMARY BOX (กล่องพับเก็บได้ สรุป 3 ข้อย่อ)
          ==================================================== -->
          <div id="section-summary" class="p-6 sm:p-7 rounded-[2rem] bg-[#021811] text-white border border-[#00FF88]/40 shadow-2xl space-y-4 reveal-init reveal-blur">
            <div class="flex items-center justify-between cursor-pointer select-none" @click="isAiSummaryOpen = !isAiSummaryOpen">
              <div class="flex items-center gap-2.5 text-xs sm:text-sm font-mono text-[#00FF88] font-bold tracking-wider">
                <Sparkles class="w-4 h-4 text-[#00FF88] animate-pulse" />
                <span>AI QUICK SUMMARY // สรุปสาระสำคัญด้วย AI</span>
              </div>
              <button type="button" class="p-1 rounded-lg hover:bg-white/10 text-white/70 hover:text-white transition-all">
                <ChevronUp v-if="isAiSummaryOpen" class="w-4 h-4" />
                <ChevronDown v-else class="w-4 h-4" />
              </button>
            </div>

            <div v-show="isAiSummaryOpen" class="grid grid-cols-1 md:grid-cols-3 gap-3.5 pt-1 animate-in fade-in duration-200">
              <div
                v-for="(point, idx) in article.aiSummary"
                :key="idx"
                class="p-4 rounded-xl bg-white/5 border border-white/10 flex items-start gap-3 hover:border-[#00FF88]/40 transition-colors"
              >
                <CheckCircle2 class="w-4 h-4 text-[#00FF88] shrink-0 mt-0.5" />
                <p class="text-xs sm:text-sm text-slate-200 leading-relaxed">
                  {{ point }}
                </p>
              </div>
            </div>
          </div>

          <!-- ===================================================
               EDITORIAL BODY PARAGRAPHS
          ==================================================== -->
          <div id="section-body" class="space-y-6 text-base sm:text-lg opacity-90 leading-loose reveal-init reveal-blur">
            <p v-for="(para, idx) in article.fullContent" :key="idx" class="indent-6 sm:indent-8">
              {{ para }}
            </p>
          </div>

          <!-- ===================================================
               INTERACTIVE FLOWCHART SECTION
               Figure 2-1 (PM) & Figure 2-2 (SI) with Lightbox & Node Map
          ==================================================== -->
          <section id="section-architecture" v-if="article.flowcharts && article.flowcharts.length > 0" class="pt-6 space-y-6 reveal-init reveal-scale">
            
            <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-current/10 pb-4">
              <div>
                <div class="inline-flex items-center gap-1.5 text-xs font-mono text-[#00C864] dark:text-[#00FF88] font-bold uppercase">
                  <Layers class="w-3.5 h-3.5" />
                  <span>ISO/IEC 29110 PROCESS ARCHITECTURE</span>
                </div>
                <h3 class="text-2xl font-bold mt-1">
                  แผนผังกระบวนการมาตรฐาน 2 ระบบหลัก
                </h3>
              </div>

              <!-- Flowchart Tab Toggles -->
              <div class="flex items-center gap-2 p-1 rounded-xl bg-black/5 dark:bg-white/5 border border-current/10">
                <button
                  type="button"
                  :class="[
                    'px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all',
                    activeFlowTab === 'pm-flow'
                      ? 'bg-[#00C864] text-[#022C22] dark:bg-[#00FF88] dark:text-[#020806] font-bold shadow-sm'
                      : 'opacity-70 hover:opacity-100'
                  ]"
                  @click="activeFlowTab = 'pm-flow'"
                >
                  Figure 3: PM Process
                </button>
                <button
                  type="button"
                  :class="[
                    'px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all',
                    activeFlowTab === 'si-flow'
                      ? 'bg-[#00C864] text-[#022C22] dark:bg-[#00FF88] dark:text-[#020806] font-bold shadow-sm'
                      : 'opacity-70 hover:opacity-100'
                  ]"
                  @click="activeFlowTab = 'si-flow'"
                >
                  Figure 4: SI Process
                </button>
              </div>
            </div>

            <!-- Active Flowchart Content View -->
            <div
              v-for="chart in article.flowcharts"
              :key="chart.id"
              v-show="activeFlowTab === chart.id"
              class="p-6 sm:p-8 rounded-[2rem] spatial-glass border border-[#00C864]/20 space-y-6 shadow-xl"
            >
              <!-- Diagram Header -->
              <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-current/10">
                <div>
                  <span class="px-2.5 py-1 rounded-md text-[11px] font-mono font-bold bg-[#00C864]/20 text-[#00A854] dark:text-[#00FF88]">
                    {{ chart.figureNumber }}
                  </span>
                  <h4 class="text-xl font-bold mt-2">
                    {{ chart.title }}
                  </h4>
                  <p class="text-xs font-mono opacity-65">
                    {{ chart.englishTitle }}
                  </p>
                </div>

                <!-- Lightbox Trigger Button -->
                <button
                  type="button"
                  class="px-4 py-2 rounded-xl border border-current/20 hover:bg-[#00C864] hover:text-[#022C22] dark:hover:bg-[#00FF88] dark:hover:text-[#020806] text-xs font-mono font-bold flex items-center gap-2 transition-all shadow-sm active:scale-95 shrink-0"
                  @click="openLightbox(chart.image || '', `${chart.figureNumber} — ${chart.title}`, chart.description)"
                >
                  <Maximize2 class="w-3.5 h-3.5" />
                  <span>ขยายแผนผังเต็มจอ (Lightbox)</span>
                </button>
              </div>

              <p class="text-sm opacity-80 leading-relaxed">
                {{ chart.description }}
              </p>

              <!-- Real Flowchart Diagram Image Frame (คลิกเพื่อซูมขยาย) -->
              <div
                v-if="chart.image"
                class="relative rounded-2xl overflow-hidden border border-black/15 dark:border-white/10 bg-white dark:bg-white p-4 sm:p-6 shadow-md group cursor-pointer text-center"
                @click="openLightbox(chart.image, `${chart.figureNumber} — ${chart.title}`, chart.description)"
              >
                <div class="relative max-h-[480px] overflow-hidden flex items-center justify-center">
                  <img
                    :src="chart.image"
                    :alt="chart.title"
                    class="max-h-[480px] w-auto max-w-full object-contain mx-auto group-hover:scale-[1.02] transition-transform duration-300"
                  >
                </div>
                <div class="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end justify-between p-4">
                  <span class="text-xs font-mono text-white font-medium drop-shadow">
                    คลิกเพื่อซูมดูแผนผังความละเอียดสูง
                  </span>
                  <span class="px-3 py-1.5 rounded-xl bg-[#00C864] text-[#022C22] text-xs font-mono font-bold flex items-center gap-1.5 shadow-lg">
                    <Maximize2 class="w-3.5 h-3.5" />
                    <span>ขยายเต็มจอ</span>
                  </span>
                </div>
              </div>

              <!-- Interactive Visual Steps Grid (Modern Clean Nodes) -->
              <div class="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                <div
                  v-for="(st, sIdx) in chart.steps"
                  :key="st.id"
                  class="p-5 rounded-2xl bg-white/70 dark:bg-black/50 border border-current/10 hover:border-[#00C864] dark:hover:border-[#00FF88] transition-all space-y-2.5 shadow-sm group"
                >
                  <div class="flex items-center justify-between">
                    <span class="px-2 py-0.5 rounded-md text-xs font-mono font-bold bg-[#00C864] text-[#022C22] dark:bg-[#00FF88] dark:text-[#020806]">
                      {{ st.code }}
                    </span>
                    <span class="text-[11px] font-mono opacity-50">PHASE 0{{ sIdx + 1 }}</span>
                  </div>

                  <h5 class="text-sm font-bold group-hover:text-[#00C864] dark:group-hover:text-[#00FF88] transition-colors">
                    {{ st.title }}
                  </h5>

                  <p class="text-xs opacity-75 leading-relaxed">
                    {{ st.description }}
                  </p>

                  <div class="pt-2 border-t border-current/10 text-[11px] space-y-1 opacity-80 font-mono">
                    <div class="text-[#00A854] dark:text-[#00FF88]">
                      <strong>Input:</strong> {{ st.inputs.join(', ') }}
                    </div>
                    <div>
                      <strong>Output:</strong> {{ st.outputs.join(', ') }}
                    </div>
                  </div>
                </div>
              </div>

            </div>

          </section>

          <!-- ===================================================
               MODERN AUTHOR PROFILE & REACTION BAR
               ผู้เขียน: นายเกรียงไกร ทองบุรี + 5-Star Interactive Rating + Like
          ==================================================== -->
          <div id="section-author" class="p-7 sm:p-8 rounded-[2rem] spatial-glass border border-current/15 shadow-xl space-y-6 reveal-init reveal-up">
            
            <!-- Author Profile Card -->
            <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-5 pb-6 border-b border-current/10">
              <div class="flex items-center gap-4">
                <div class="w-14 h-14 rounded-2xl overflow-hidden bg-black/10 shrink-0 border border-current/20 shadow-md">
                  <img
                    :src="article.author.avatar"
                    :alt="article.author.name"
                    class="w-full h-full object-cover"
                  >
                </div>
                <div>
                  <div class="text-xs font-mono font-bold text-[#00C864] dark:text-[#00FF88] uppercase">
                    ARTICLE AUTHOR // ผู้เขียนบทความ
                  </div>
                  <h4 class="text-lg font-bold text-[#022C22] dark:text-white">
                    {{ article.author.name }}
                  </h4>
                  <p class="text-xs opacity-75">
                    {{ article.author.role }}
                  </p>
                </div>
              </div>

              <!-- Like Button with Counter -->
              <button
                type="button"
                :class="[
                  'px-5 py-2.5 rounded-2xl text-xs font-bold font-mono flex items-center gap-2 transition-all shadow-sm active:scale-90',
                  isLiked
                    ? 'bg-rose-500 text-white scale-105'
                    : 'border border-current/20 hover:border-rose-400 hover:text-rose-500'
                ]"
                @click="toggleLike"
              >
                <Heart :class="['w-4 h-4', isLiked ? 'fill-current animate-bounce' : '']" />
                <span>ถูกใจบทความ ({{ likeCount }})</span>
              </button>
            </div>

            <!-- 5-Star Interactive Rating Bar -->
            <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <div class="text-xs font-mono opacity-65 mb-1">
                  ประเมินคุณภาพและความพึงพอใจต่อบทความนี้
                </div>
                <div class="text-sm font-bold flex items-center gap-2">
                  <span>คะแนนปัจจุบัน:</span>
                  <span class="text-[#00C864] dark:text-[#00FF88] font-mono text-base font-black">5.0 / 5.0</span>
                  <span class="text-xs opacity-60">({{ article.rating.count + (hasRated ? 1 : 0) }} โหวต)</span>
                </div>
              </div>

              <!-- Interactive Star Picker -->
              <div class="flex items-center gap-1.5" @mouseleave="hoverRating = 0">
                <button
                  v-for="star in 5"
                  :key="star"
                  type="button"
                  class="p-1 transition-transform hover:scale-125 focus:outline-none"
                  @mouseenter="hoverRating = star"
                  @click="handleRating(star)"
                >
                  <Star
                    :class="[
                      'w-6 h-6 transition-colors',
                      (hoverRating || userRating) >= star
                        ? 'text-amber-400 fill-amber-400 drop-shadow-[0_0_8px_rgba(251,191,36,0.5)]'
                        : 'text-current/20'
                    ]"
                  />
                </button>
              </div>
            </div>

          </div>

          <!-- Bottom Navigation: Prev & Next Article -->
          <div class="pt-4 flex items-center justify-between border-t border-current/10 text-xs font-mono">
            <NuxtLink to="/#news" class="hover:underline flex items-center gap-1.5 opacity-75 hover:opacity-100">
              <ArrowLeft class="w-3.5 h-3.5" />
              <span>กลับสู่คลังข่าวสาร</span>
            </NuxtLink>
            <NuxtLink to="/news/2" class="hover:underline flex items-center gap-1.5 text-[#00C864] dark:text-[#00FF88] font-bold">
              <span>อ่านข่าวถัดไป: IGENCO ครบรอบ 8 ปี</span>
              <ArrowRight class="w-3.5 h-3.5" />
            </NuxtLink>
          </div>

        </article>

        <!-- =====================================================
             STICKY SIDEBAR (4 Columns)
             Scrollytelling TOC + Instant Search + Categories + Recent Posts
        ====================================================== -->
        <aside class="lg:col-span-4 space-y-6 lg:sticky lg:top-28">

          <!-- 0. Scrollytelling Active Table of Contents (ติดตามหัวข้อตามการไถหน้าจอ) -->
          <div class="p-6 rounded-[2rem] spatial-glass border border-[#00C864]/25 shadow-lg space-y-3">
            <div class="text-xs font-mono font-bold text-[#00C864] dark:text-[#00FF88] uppercase flex items-center justify-between">
              <span>CONTENTS // สารบัญหัวข้อ</span>
              <span class="text-[11px] font-mono opacity-65">{{ Math.round(scrollProgress) }}%</span>
            </div>
            <nav class="space-y-1">
              <a
                v-for="sec in tableOfContents"
                :key="sec.id"
                :href="'#' + sec.id"
                :class="[
                  'block px-3 py-2 rounded-xl text-xs transition-all flex items-center gap-2.5',
                  activeSection === sec.id
                    ? 'bg-[#00C864]/20 text-[#00A854] dark:text-[#00FF88] font-bold translate-x-1 border-l-2 border-[#00C864] dark:border-[#00FF88]'
                    : 'opacity-70 hover:opacity-100 hover:bg-black/5 dark:hover:bg-white/5'
                ]"
              >
                <span
                  :class="[
                    'w-1.5 h-1.5 rounded-full transition-all shrink-0',
                    activeSection === sec.id ? 'bg-[#00C864] dark:bg-[#00FF88] scale-125 ring-2 ring-[#00C864]/40' : 'bg-current/30'
                  ]"
                />
                <span class="truncate">{{ sec.label }}</span>
              </a>
            </nav>
          </div>
          
          <!-- 1. Instant Search Widget -->
          <div class="p-6 rounded-[2rem] spatial-glass border border-current/10 shadow-lg space-y-4">
            <div class="text-xs font-mono font-bold text-[#00C864] dark:text-[#00FF88] uppercase">
              SEARCH // ค้นหาบทความ
            </div>

            <!-- Instant Search Input Box with SVG Icon -->
            <div class="relative">
              <Search class="w-4 h-4 text-[#00C864] dark:text-[#00FF88] absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
              <input
                v-model="searchQuery"
                type="text"
                placeholder="ค้นหาข่าว, โซลูชัน, มาตรฐาน..."
                class="w-full pl-10 pr-9 py-2.5 rounded-xl bg-white/70 dark:bg-black/60 border border-current/20 text-xs sm:text-sm focus:outline-none focus:border-[#00C864] dark:focus:border-[#00FF88] transition-colors"
              >
              <button
                v-if="searchQuery"
                type="button"
                class="absolute right-3 top-1/2 -translate-y-1/2 opacity-60 hover:opacity-100"
                @click="searchQuery = ''"
              >
                <X class="w-4 h-4" />
              </button>
            </div>

            <!-- Instant Search Results Dropdown -->
            <div v-if="searchQuery" class="space-y-2 pt-1 border-t border-current/10">
              <div class="text-[11px] font-mono opacity-60">
                ผลการค้นหา ({{ filteredSearchResults.length }} รายการ):
              </div>
              <ul v-if="filteredSearchResults.length > 0" class="space-y-2 max-h-56 overflow-y-auto custom-modal-scrollbar">
                <li v-for="res in filteredSearchResults" :key="res.id">
                  <NuxtLink
                    :to="'/news/' + res.id"
                    class="block p-2.5 rounded-xl hover:bg-[#00C864]/10 dark:hover:bg-[#00FF88]/10 transition-colors"
                    @click="searchQuery = ''"
                  >
                    <div class="text-xs font-bold line-clamp-1">{{ res.title }}</div>
                    <div class="text-[11px] opacity-60 font-mono">{{ res.category }}</div>
                  </NuxtLink>
                </li>
              </ul>
              <div v-else class="text-xs opacity-60 py-2 text-center">
                ไม่พบบทความที่ตรงกับคำค้นหา
              </div>
            </div>
          </div>

          <!-- 2. Categories Pill Badges Widget -->
          <div class="p-6 rounded-[2rem] spatial-glass border border-current/10 shadow-lg space-y-4">
            <div class="flex items-center justify-between">
              <div class="text-xs font-mono font-bold text-[#00C864] dark:text-[#00FF88] uppercase">
                CATEGORIES // หมวดหมู่
              </div>
              <Tag class="w-3.5 h-3.5 opacity-50" />
            </div>

            <!-- Pill Badges -->
            <div class="flex flex-wrap gap-2">
              <button
                v-for="cat in categoriesWithCount"
                :key="cat.name"
                type="button"
                :class="[
                  'px-3 py-1.5 rounded-full text-xs font-semibold transition-all flex items-center gap-1.5',
                  selectedCategory === cat.name
                    ? 'bg-[#00C864] text-[#022C22] dark:bg-[#00FF88] dark:text-[#020806] font-bold shadow-sm scale-105'
                    : 'bg-black/5 hover:bg-[#00C864]/10 dark:bg-white/5 dark:hover:bg-white/10 opacity-80 hover:opacity-100'
                ]"
                @click="selectedCategory = cat.name"
              >
                <span>{{ cat.name }}</span>
                <span class="px-1.5 py-0.2 rounded-full text-[10px] bg-black/10 dark:bg-white/10 font-mono">
                  {{ cat.count }}
                </span>
              </button>
            </div>
          </div>

          <!-- 3. Recent Posts Mini Cards -->
          <div class="p-6 rounded-[2rem] spatial-glass border border-current/10 shadow-lg space-y-4">
            <div class="text-xs font-mono font-bold text-[#00C864] dark:text-[#00FF88] uppercase">
              RECENT POSTS // ข่าวล่าสุด
            </div>

            <div class="space-y-3.5">
              <NuxtLink
                v-for="item in recentNews"
                :key="item.id"
                :to="'/news/' + item.id"
                class="flex items-center gap-3.5 p-2 rounded-xl hover:bg-[#00C864]/10 dark:hover:bg-[#00FF88]/10 transition-all group"
              >
                <div class="w-16 h-16 rounded-xl overflow-hidden bg-black/10 shrink-0">
                  <img
                    :src="item.image"
                    :alt="item.title"
                    class="w-full h-full object-cover group-hover:scale-108 transition-transform duration-300"
                  >
                </div>
                <div class="flex-1 min-w-0 space-y-1">
                  <span class="text-[10px] font-mono font-bold text-[#00A854] dark:text-[#00FF88]">
                    {{ item.category }}
                  </span>
                  <h5 class="text-xs font-bold leading-snug line-clamp-2 group-hover:text-[#00C864] dark:group-hover:text-[#00FF88] transition-colors">
                    {{ item.title }}
                  </h5>
                  <div class="text-[11px] font-mono opacity-50">
                    {{ item.date }}
                  </div>
                </div>
              </NuxtLink>
            </div>
          </div>

          <!-- 4. Quick Consultation Banner -->
          <div class="p-6 rounded-[2rem] bg-gradient-to-br from-[#021811] to-[#010D09] text-white border border-[#00FF88]/30 shadow-xl space-y-3">
            <div class="w-8 h-8 rounded-lg bg-[#00FF88]/20 text-[#00FF88] flex items-center justify-center text-xs font-mono font-bold">
              ?
            </div>
            <h4 class="text-sm font-bold text-white">
              ต้องการยกระดับมาตรฐานซอฟต์แวร์องค์กร?
            </h4>
            <p class="text-xs text-slate-300 leading-relaxed">
              IGENCO ให้คำปรึกษาและพัฒนาระบบตามมาตรฐาน ISO/IEC 29110 พร้อมทีมงานมืออาชีพ
            </p>
            <a
              href="#contact"
              class="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#00FF88] text-[#020806] text-xs font-bold hover:scale-105 active:scale-95 transition-transform"
            >
              <span>สอบถามเพิ่มเติม</span>
              <ArrowRight class="w-3.5 h-3.5" />
            </a>
          </div>

        </aside>

      </div>

      <!-- Article Not Found State -->
      <div v-else class="text-center py-24 space-y-6 spatial-glass rounded-3xl p-10 border border-current/10">
        <h2 class="text-2xl font-bold">ไม่พบข้อมูลข่าวสารที่คุณต้องการ</h2>
        <NuxtLink
          to="/#news"
          class="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-[#00C864] text-[#022C22] dark:bg-[#00FF88] dark:text-[#020806] font-bold text-xs uppercase"
        >
          <ArrowLeft class="w-4 h-4" />
          <span>กลับสู่หน้าข่าวสารทั้งหมด</span>
        </NuxtLink>
      </div>

    </main>

    <!-- =========================================================
         LIGHTBOX MODAL FOR FULLSCREEN IMAGE / FLOWCHART ZOOM
    ========================================================== -->
    <div
      v-if="lightboxImage"
      class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-xl animate-in fade-in duration-200"
      @click.self="closeLightbox"
    >
      <div class="relative max-w-5xl w-full max-h-[90vh] flex flex-col items-center justify-center" @click.stop>
        
        <!-- Top Toolbar -->
        <div class="w-full flex items-center justify-between pb-3 text-white">
          <div>
            <h4 class="text-sm sm:text-base font-bold">{{ lightboxImage.title }}</h4>
            <p v-if="lightboxImage.subtitle" class="text-xs opacity-70">{{ lightboxImage.subtitle }}</p>
          </div>
          <div class="flex items-center gap-2">
            <button
              type="button"
              class="px-3 py-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-xs font-mono flex items-center gap-1 transition-all"
              @click="isZoomed = !isZoomed"
            >
              <ZoomIn class="w-3.5 h-3.5" />
              <span>{{ isZoomed ? 'ขนาดปกติ' : 'ซูม 150%' }}</span>
            </button>
            <button
              type="button"
              class="p-2 rounded-lg bg-white/10 hover:bg-rose-500 text-white transition-all"
              @click="closeLightbox"
            >
              <X class="w-5 h-5" />
            </button>
          </div>
        </div>

        <!-- Lightbox Zoomable Image -->
        <div class="w-full overflow-auto max-h-[82vh] rounded-2xl flex items-center justify-center p-2">
          <img
            :src="lightboxImage.url"
            :alt="lightboxImage.title"
            :class="[
              'rounded-xl transition-all duration-300 object-contain bg-white p-2 sm:p-4 shadow-2xl',
              isZoomed ? 'scale-150 cursor-zoom-out my-16' : 'max-h-[75vh] cursor-zoom-in'
            ]"
            @click="isZoomed = !isZoomed"
          >
        </div>

        <div class="pt-2 text-xs font-mono text-slate-400">
          คลิกที่รูปภาพเพื่อสลับการซูมเข้า/ออก หรือกดปุ่มปิดด้านขวาบน
        </div>

      </div>
    </div>

    <!-- 3. Modern Multi-Column Footer -->
    <ContactFooter />

  </div>
</template>

<style scoped>
.gallery-fade-enter-active,
.gallery-fade-leave-active {
  transition: opacity 0.25s ease-out, transform 0.25s cubic-bezier(0.22, 1, 0.36, 1);
}
.gallery-fade-enter-from {
  opacity: 0;
  transform: scale(0.97);
}
.gallery-fade-leave-to {
  opacity: 0;
  transform: scale(1.02);
}
</style>
