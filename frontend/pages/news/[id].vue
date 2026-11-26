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
  Phone,
  Download,
  FileText,
  QrCode,
  Tag,
  ArrowUpRight
} from 'lucide-vue-next'
import AppHeader from '~/components/AppHeader.vue'
import ContactFooter from '~/components/ContactFooter.vue'
import { useNews, type NewsItem } from '~/composables/useNews'
import { useStrapiContent } from '~/composables/useStrapiContent'
import { useTheme } from '~/composables/useTheme'

const route = useRoute()
const { getNewsById, newsList } = useNews()
const { getNewsArticles } = useStrapiContent()
const { showToast } = useTheme()

const strapiArticle = ref<NewsItem | null>(null)
const articleId = computed(() => Number(route.params.id))

const { data: fetchedStrapiArticle } = await useAsyncData(`news-strapi-${route.params.id}`, async () => {
  if (getNewsById(articleId.value)) return null
  const all = await getNewsArticles()
  const found = all?.find(a => a.id === articleId.value)
  if (!found) return null
  return {
    id: found.id,
    title: found.title,
    category: found.category,
    date: found.date,
    readTime: found.readTime,
    excerpt: found.excerpt,
    image: found.image,
    aiSummary: [found.excerpt],
    content: found.content ? found.content.split('\n').filter(Boolean) : [found.excerpt]
  } as NewsItem
})

const article = computed(() => getNewsById(articleId.value) || fetchedStrapiArticle.value || strapiArticle.value)

// Navigation: Previous & Next Article
const currentIndex = computed(() => newsList.findIndex(n => n.id === articleId.value))
const prevArticle = computed(() => {
  if (currentIndex.value > 0) {
    return newsList[currentIndex.value - 1]
  }
  return null
})
const nextArticle = computed(() => {
  if (currentIndex.value >= 0 && currentIndex.value < newsList.length - 1) {
    return newsList[currentIndex.value + 1]
  }
  return null
})

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
  const art = article.value
  const toc: { id: string; label: string }[] = [
    { id: 'section-overview', label: art?.certifier ? 'ภาพรวมและการรับรอง' : 'ภาพรวมบทความ' },
    { id: 'section-summary', label: 'สรุปสาระสำคัญ (AI Summary)' }
  ]

  if (art?.services && art.services.length > 0) {
    toc.push({
      id: 'section-history',
      label: art.sectionTitles?.history || 'รายละเอียดโครงการ'
    })
    toc.push({
      id: 'section-services',
      label: art.sectionTitles?.services || 'ขอบเขตการให้บริการ IT'
    })
    if (art.fullContent && art.fullContent[2]) {
      toc.push({
        id: 'section-philosophy',
        label: art.sectionTitles?.philosophy || 'แนวทางการดำเนินงาน'
      })
    }
    if (art.partnerships && art.partnerships.length > 0) {
      toc.push({
        id: 'section-partnerships',
        label: art.sectionTitles?.partnerships || 'พันธมิตรและการรับรอง'
      })
    }
  } else {
    toc.push({ id: 'section-body', label: 'เนื้อหาบทความ' })
  }

  if (art?.flowcharts && art.flowcharts.length > 0) {
    toc.push({ id: 'section-architecture', label: 'แผนผังกระบวนการมาตรฐาน' })
  }

  toc.push({ id: 'section-author', label: 'ข้อมูลผู้เขียนและการประเมิน' })
  return toc
})

const scrollToSection = (id: string) => {
  activeSection.value = id
  if (import.meta.client) {
    const el = document.getElementById(id)
    if (el) {
      const rect = el.getBoundingClientRect()
      const targetY = window.scrollY + rect.top - 100
      window.scrollTo({ top: targetY, behavior: 'smooth' })
    }
  }
}

let sectionObserver: IntersectionObserver | null = null

const setupSectionObserver = () => {
  if (import.meta.client && 'IntersectionObserver' in window) {
    sectionObserver?.disconnect()
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
    tableOfContents.value.forEach((sec) => {
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
// 5. STICKY SIDEBAR: RECENT POSTS
// -------------------------------------------------------------
const recentNews = computed(() => {
  return newsList.filter(n => n.id !== articleId.value).slice(0, 4)
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
          <header id="section-overview" class="space-y-6 reveal-init reveal-scale scroll-mt-28">
            
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

            <figure v-else-if="article.id === 5" class="smartsoft-mascot mx-auto grid w-fit max-w-full place-items-center px-5 py-3 sm:px-10">
              <img
                src="/images/news/ismartsoft-mascot-simple.png"
                alt="มาสคอต i-SmartSoft"
                width="142"
                height="148"
                class="relative block h-auto w-36 max-w-full sm:w-44"
              >
            </figure>

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
                  <div class="w-full h-full flex items-center justify-center">
                    <img
                      :key="currentGalleryIdx"
                      :src="activeGalleryImage.url"
                      :alt="activeGalleryImage.caption || article.title"
                      :class="[
                        'transition-transform duration-500 ease-out group-hover:scale-103',
                        activeGalleryImage.url.endsWith('.png') ? 'max-h-[280px] w-auto object-contain p-4 drop-shadow-2xl' : 'w-full h-full object-cover'
                      ]"
                    >
                  </div>
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
          <div id="section-summary" class="p-6 sm:p-7 rounded-[2rem] bg-[#021811] text-white border border-[#00FF88]/40 shadow-2xl space-y-4 reveal-init reveal-blur scroll-mt-28">
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
               EDITORIAL BODY PARAGRAPHS: PROFESSIONAL CORPORATE LAYOUT
          ==================================================== -->
          <div id="section-body" class="space-y-8 text-base sm:text-lg leading-[2.1] text-slate-800 dark:text-slate-200 reveal-init reveal-blur">
            
            <!-- 1. Lead Milestone Highlight (ย่อหน้านำแบบมีกรอบเน้นสีเขียวมรกต) -->
            <div
              v-if="article.fullContent.length > 0"
              class="p-6 sm:p-8 rounded-3xl bg-gradient-to-br from-[#00C864]/10 via-[#00C864]/5 to-transparent border-l-4 border-[#00C864] text-lg sm:text-xl font-medium leading-[2.1] text-[#022C22] dark:text-[#F4FBF7] shadow-sm relative overflow-hidden"
            >
              <p>{{ article.fullContent[0] }}</p>
            </div>

            <!-- 2. Corporate Milestones Stats Ribbon (ถ้ามี) -->
            <div v-if="article.milestones && article.milestones.length > 0" class="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
              <div
                v-for="(stat, idx) in article.milestones"
                :key="idx"
                class="p-5 rounded-2xl spatial-glass border border-current/10 flex flex-col justify-between space-y-1 hover:border-[#00C864] dark:hover:border-[#00FF88] transition-all hover:-translate-y-1"
              >
                <div class="text-[11px] font-mono uppercase tracking-wider opacity-60">
                  {{ stat.label }}
                </div>
                <div class="text-2xl sm:text-3xl font-black font-display text-[#00A854] dark:text-[#00FF88]">
                  {{ stat.value }}
                </div>
                <div v-if="stat.sub" class="text-xs opacity-75">
                  {{ stat.sub }}
                </div>
              </div>
            </div>

            <!-- 3. Foundation & Background Paragraph -->
            <div v-if="article.fullContent[1]" id="section-history" class="space-y-3 scroll-mt-28">
              <h3 class="font-display font-bold text-xl sm:text-2xl text-[#022C22] dark:text-[#F4FBF7] flex items-center gap-2">
                <span class="w-2.5 h-2.5 rounded-full bg-[#00C864] dark:bg-[#00FF88]" />
                <span>{{ article.sectionTitles?.history || 'รายละเอียดการดำเนินงาน' }}</span>
              </h3>
              <p class="leading-[2.2] opacity-90">
                {{ article.fullContent[1] }}
              </p>
            </div>

            <!-- 4. Core Solutions & Services Grid (ถ้ามี) -->
            <div v-if="article.services && article.services.length > 0" id="section-services" class="my-6 space-y-4 scroll-mt-28">
              <div class="text-xs font-mono font-bold uppercase tracking-wider text-[#00C864] dark:text-[#00FF88] flex items-center gap-1.5">
                <Layers class="w-3.5 h-3.5" />
                <span>{{ article.sectionTitles?.servicesSubtitle || (article.sectionTitles?.services ? article.sectionTitles.services + ' // ขอบเขตระบบ' : 'COMPREHENSIVE IT SERVICES // ขอบเขตการให้บริการ') }}</span>
              </div>
              <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div
                  v-for="(svc, sIdx) in article.services"
                  :key="sIdx"
                  class="p-5 rounded-2xl spatial-glass border border-current/10 hover:border-[#00C864] dark:hover:border-[#00FF88] transition-all hover:-translate-y-1 group"
                >
                  <div class="flex items-center justify-between mb-2">
                    <span class="text-xs font-mono font-bold px-2.5 py-0.5 rounded-md bg-[#00C864]/15 dark:bg-[#00FF88]/15 text-[#00A854] dark:text-[#00FF88]">
                      {{ svc.code }}
                    </span>
                    <span class="text-xs font-mono opacity-50">0{{ sIdx + 1 }}</span>
                  </div>
                  <h4 class="font-bold text-base sm:text-lg group-hover:text-[#00C864] dark:group-hover:text-[#00FF88] transition-colors">
                    {{ svc.title }}
                  </h4>
                  <div class="text-xs text-[#00A854] dark:text-[#00FF88] font-medium mb-1.5">
                    {{ svc.thaiTitle }}
                  </div>
                  <p class="text-xs sm:text-sm opacity-80 leading-relaxed">
                    {{ svc.desc }}
                  </p>
                </div>
              </div>
            </div>

            <!-- 5. Operational Philosophy Quote / Policy (ถ้ามี) -->
            <div v-if="article.fullContent[2]" id="section-philosophy" class="space-y-4 scroll-mt-28">
              <h3 class="font-display font-bold text-xl sm:text-2xl text-[#022C22] dark:text-[#F4FBF7] flex items-center gap-2">
                <span class="w-2.5 h-2.5 rounded-full bg-[#00C864] dark:bg-[#00FF88]" />
                <span>{{ article.sectionTitles?.philosophy || 'แนวทางการดำเนินงาน' }}</span>
              </h3>
              <div class="p-6 sm:p-7 rounded-2xl bg-current/5 border-l-4 border-[#00C864] italic text-base sm:text-lg leading-[2.2] opacity-95">
                {{ article.fullContent[2] }}
              </div>

              <!-- Special Demo & Consultation Callout Box for i-SMARTSOFT -->
              <div v-if="article.id === 5" class="p-6 rounded-2xl bg-gradient-to-r from-[#00C864]/20 via-[#00C864]/10 to-transparent border border-[#00C864]/30 shadow-md flex flex-col sm:flex-row items-start sm:items-center justify-between gap-5">
                <div class="space-y-1.5">
                  <div class="text-xs font-mono font-bold text-[#00A854] dark:text-[#00FF88] uppercase tracking-wider flex items-center gap-2">
                    <Sparkles class="w-4 h-4 text-[#00C864] dark:text-[#00FF88]" />
                    <span>DEMO & CONSULTATION // นัดสาธิตระบบงาน</span>
                  </div>
                  <div class="text-base sm:text-lg font-bold text-[#022C22] dark:text-white">
                    ฝ่ายการตลาดและการขาย (คุณภนิดาพร จูมมณี)
                  </div>
                  <p class="text-xs sm:text-sm opacity-80 leading-relaxed max-w-xl">
                    ยินดีให้คำปรึกษาและจัดเตรียมการสาธิตระบบบริหารสำนักงานอัจฉริยะ i-SmartSoft เพื่อตอบสนองความต้องการเฉพาะองค์กรของคุณ
                  </p>
                </div>
                <a
                  href="tel:0962949236"
                  class="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-[#00C864] text-[#022C22] dark:bg-[#00FF88] dark:text-[#020806] text-xs font-bold font-mono shadow-lg hover:scale-105 active:scale-95 transition-all shrink-0"
                >
                  <Phone class="w-4 h-4" />
                  <span>โทร. 09 6294 9236</span>
                </a>
              </div>

              <!-- Special Regist.ai & i-Queue Interactive Showcase (Article ID 6) -->
              <div v-if="article.id === 6" class="space-y-10 pt-4">
                
                <!-- 1. Promotion Banner Card -->
                <div class="p-6 sm:p-8 rounded-3xl bg-gradient-to-br from-purple-900/30 via-[#00C864]/10 to-transparent border border-purple-500/30 shadow-xl relative overflow-hidden">
                  <div class="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
                    <div class="space-y-2">
                      <div class="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono font-bold bg-purple-500/20 text-purple-300 border border-purple-500/30">
                        <Tag class="w-3.5 h-3.5" />
                        <span>SPECIAL PROMOTION // โปรโมชันพิเศษ</span>
                      </div>
                      <h4 class="text-xl sm:text-2xl font-display font-extrabold text-[#022C22] dark:text-white">
                        ไอรีจิส "ตอบโจทย์ทุกการลงทะเบียน"
                      </h4>
                      <p class="text-xs sm:text-sm text-slate-700 dark:text-slate-300">
                        แพ็กเกจพิเศษสำหรับองค์กร หน่วยงานภาครัฐ มหาวิทยาลัย สมาคม และบริษัทที่ต้องการเปิดระบบลงทะเบียนสัมมนา
                      </p>
                      <ul class="pt-2 space-y-1.5 text-xs sm:text-sm font-medium text-emerald-600 dark:text-emerald-400">
                        <li class="flex items-center gap-2">
                          <CheckCircle2 class="w-4 h-4 shrink-0 text-[#00C864] dark:text-[#00FF88]" />
                          <span><strong>ฟรี!</strong> ค่าจดทะเบียนหรือต่ออายุโดเมน (Domain) ถึงสิ้นเดือนกันยายน</span>
                        </li>
                        <li class="flex items-center gap-2">
                          <CheckCircle2 class="w-4 h-4 shrink-0 text-[#00C864] dark:text-[#00FF88]" />
                          <span>ติดตั้งและพร้อมเปิดใช้งานได้รวดเร็ว <strong>ภายใน 1 สัปดาห์</strong></span>
                        </li>
                        <li class="flex items-center gap-2 text-xs opacity-75">
                          <span>* เงื่อนไขเป็นไปตามที่บริษัทกำหนด</span>
                        </li>
                      </ul>
                    </div>

                    <div class="flex flex-col sm:flex-row md:flex-col gap-2.5 w-full md:w-auto shrink-0">
                      <a
                        href="https://www.i-regist.com/"
                        target="_blank"
                        rel="noopener noreferrer"
                        class="px-5 py-3 rounded-xl bg-purple-600 text-white hover:bg-purple-700 text-xs font-bold font-mono transition-all flex items-center justify-center gap-2 shadow-lg hover:scale-105"
                      >
                        <span>เข้าสู่เว็บไซต์ i-regist.com</span>
                        <ExternalLink class="w-4 h-4" />
                      </a>
                      <a
                        href="tel:025325151"
                        class="px-5 py-3 rounded-xl bg-[#00C864] text-[#022C22] dark:bg-[#00FF88] dark:text-[#020806] text-xs font-bold font-mono transition-all flex items-center justify-center gap-2 shadow-lg hover:scale-105"
                      >
                        <Phone class="w-4 h-4" />
                        <span>โทร. 02-532-5151</span>
                      </a>
                    </div>
                  </div>
                </div>

                <!-- 2. Online Registration Workflow Showcase (3 Steps vs 6 Steps) -->
                <div class="p-6 sm:p-8 rounded-3xl spatial-glass border border-purple-500/20 shadow-xl space-y-6">
                  <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-current/10 pb-4">
                    <div>
                      <div class="text-xs font-mono font-bold text-purple-500 dark:text-purple-400 uppercase tracking-wider flex items-center gap-2">
                        <QrCode class="w-4 h-4" />
                        <span>REGISTRATION WORKFLOW // ขั้นตอนการลงทะเบียนออนไลน์</span>
                      </div>
                      <h4 class="text-xl sm:text-2xl font-bold mt-1 text-[#022C22] dark:text-white">
                        ลงทะเบียนออนไลน์ง่ายๆ ด้วยตัวคุณเอง
                      </h4>
                    </div>
                    <button
                      type="button"
                      class="px-4 py-2 rounded-xl border border-current/20 hover:bg-purple-500/20 text-xs font-mono font-bold flex items-center gap-2 transition-all self-start sm:self-auto"
                      @click="openLightbox('/images/products/regist-ai-workflow.jpg', 'ขั้นตอนการลงทะเบียนออนไลน์ง่ายๆ ด้วยตัวคุณเอง', 'กรณีไม่มีค่าลงทะเบียน 3 ขั้นตอน และกรณีมีค่าลงทะเบียน 6 ขั้นตอน')"
                    >
                      <ZoomIn class="w-4 h-4 text-purple-400" />
                      <span>ซูมดูแผนผังเต็ม</span>
                    </button>
                  </div>

                  <!-- Workflow Image Banner -->
                  <div
                    class="rounded-2xl overflow-hidden border border-current/10 cursor-pointer group relative bg-black/10"
                    @click="openLightbox('/images/products/regist-ai-workflow.jpg', 'ขั้นตอนการลงทะเบียนออนไลน์ง่ายๆ ด้วยตัวคุณเอง', 'กรณีไม่มีค่าลงทะเบียน 3 ขั้นตอน และกรณีมีค่าลงทะเบียน 6 ขั้นตอน')"
                  >
                    <img
                      src="/images/products/regist-ai-workflow.jpg"
                      alt="Regist.ai Online Registration Workflow"
                      class="w-full h-auto object-contain group-hover:scale-[1.01] transition-transform duration-300"
                    >
                    <div class="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2 text-white text-xs font-mono font-bold">
                      <Maximize2 class="w-4 h-4" />
                      <span>คลิกเพื่อดูขนาดใหญ่</span>
                    </div>
                  </div>

                  <!-- Dual Comparison Cards: 3 Steps vs 6 Steps -->
                  <div class="grid grid-cols-1 md:grid-cols-2 gap-5 pt-2">
                    <!-- Option A: Free / No Fee (3 Steps) -->
                    <div class="p-5 rounded-2xl bg-white/50 dark:bg-black/40 border border-sky-500/30 space-y-3">
                      <div class="flex items-center justify-between">
                        <span class="px-3 py-1 rounded-full text-xs font-mono font-bold bg-sky-500/20 text-sky-600 dark:text-sky-300">
                          กรณีไม่มีค่าลงทะเบียน (3 ขั้นตอน)
                        </span>
                        <span class="text-xs font-mono opacity-60">FREE ACCESS</span>
                      </div>
                      <ol class="space-y-2 text-xs sm:text-sm opacity-90 list-decimal list-inside leading-relaxed">
                        <li><strong>ลงทะเบียน:</strong> สมาชิกหรือบุคคลทั่วไปกรอกข้อมูลลงทะเบียนผ่านระบบ Regist.ai</li>
                        <li><strong>ตรวจสอบ E-mail:</strong> ผู้ลงทะเบียนทำการตรวจสอบข้อมูลการตอบรับทาง E-mail</li>
                        <li><strong>พิมพ์แบบฟอร์ม QR Code:</strong> พิมพ์ใบตอบรับที่มี QR Code เพื่อใช้สแกน Check-in เข้างาน</li>
                      </ol>
                    </div>

                    <!-- Option B: Paid Registration (6 Steps) -->
                    <div class="p-5 rounded-2xl bg-white/50 dark:bg-black/40 border border-purple-500/30 space-y-3">
                      <div class="flex items-center justify-between">
                        <span class="px-3 py-1 rounded-full text-xs font-mono font-bold bg-purple-500/20 text-purple-600 dark:text-purple-300">
                          กรณีมีค่าลงทะเบียน (6 ขั้นตอน)
                        </span>
                        <span class="text-xs font-mono opacity-60">PAYMENT FLOW</span>
                      </div>
                      <ol class="space-y-2 text-xs sm:text-sm opacity-90 list-decimal list-inside leading-relaxed">
                        <li><strong>ลงทะเบียน:</strong> กรอกข้อมูลลงทะเบียนผ่านระบบ Regist.ai</li>
                        <li><strong>พิมพ์ใบแจ้งชำระเงิน:</strong> รับแบบฟอร์มผ่านหน้าจอหรือ E-mail</li>
                        <li><strong>ชำระเงิน:</strong> ชำระโดยโอนเงินหรือนำไปชำระที่ธนาคาร</li>
                        <li><strong>แนบหลักฐาน:</strong> ถ่ายรูปสลิปและแนบหลักฐานกลับเข้ามาในระบบ</li>
                        <li><strong>ตรวจสอบ E-mail:</strong> รับการยืนยันการตรวจสอบยอดชำระ</li>
                        <li><strong>พิมพ์แบบฟอร์ม QR Code:</strong> รับ e-Ticket สำหรับสแกนเข้างาน</li>
                      </ol>
                    </div>
                  </div>
                </div>

                <!-- 3. i-Queue by Regist.ai Deep Dive -->
                <div class="p-6 sm:p-8 rounded-3xl spatial-glass border border-[#00C864]/20 shadow-xl space-y-8">
                  <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-current/10 pb-4">
                    <div>
                      <div class="text-xs font-mono font-bold text-[#00C864] dark:text-[#00FF88] uppercase tracking-wider flex items-center gap-2">
                        <Sparkles class="w-4 h-4" />
                        <span>I-QUEUE MANAGEMENT // ระบบบริหารคิวอัจฉริยะ (NEW NORMAL)</span>
                      </div>
                      <h4 class="text-xl sm:text-2xl font-bold mt-1 text-[#022C22] dark:text-white">
                        i-Queue by Regist.ai
                      </h4>
                      <p class="text-xs sm:text-sm opacity-80 mt-1">
                        ระบบจัดการคิวแบบ New Normal ช่วยลดความเสี่ยงในการสัมผัสหน้าจอกดบัตรคิว สามารถใช้ใน Tablet / Smart Phone
                      </p>
                    </div>
                    <button
                      type="button"
                      class="px-4 py-2 rounded-xl border border-current/20 hover:bg-[#00C864]/20 text-xs font-mono font-bold flex items-center gap-2 transition-all self-start sm:self-auto"
                      @click="openLightbox('/images/products/iqueue-banner.jpg', 'i-Queue by Regist.ai ระบบบริหารคิวแบบ New Normal', 'ลดความเสี่ยงสัมผัสหน้าจอ รองรับ Tablet / Smartphone และ PDPA')"
                    >
                      <ZoomIn class="w-4 h-4 text-[#00C864]" />
                      <span>ซูมดูภาพรวมคิว</span>
                    </button>
                  </div>

                  <!-- i-Queue Banner Image -->
                  <div
                    class="rounded-2xl overflow-hidden border border-current/10 cursor-pointer group relative bg-black/10"
                    @click="openLightbox('/images/products/iqueue-banner.jpg', 'i-Queue by Regist.ai ระบบการจัดการคิว', 'เหมาะสำหรับ โรงพยาบาล, ร้านอาหาร, โรงพยาบาลสนาม, คลินิก')"
                  >
                    <img
                      src="/images/products/iqueue-banner.jpg"
                      alt="i-Queue by Regist.ai Overview"
                      class="w-full h-auto object-contain group-hover:scale-[1.01] transition-transform duration-300"
                    >
                  </div>

                  <!-- 2 Queue Models: Hospital/Vaccine vs Restaurant -->
                  <div class="grid grid-cols-1 lg:grid-cols-2 gap-8 pt-4">
                    
                    <!-- Queue Model 1: Hospital / Vaccination Multi-Stage Continuous Queue -->
                    <div class="p-6 rounded-2xl bg-white/50 dark:bg-black/40 border border-current/10 space-y-4 flex flex-col justify-between">
                      <div class="space-y-3">
                        <div class="flex items-center justify-between">
                          <span class="px-3 py-1 rounded-full text-xs font-mono font-bold bg-emerald-500/20 text-emerald-600 dark:text-emerald-300">
                            รูปแบบที่ 1 : หลายช่องบริการต่อเนื่อง
                          </span>
                          <span class="text-xs font-mono opacity-60">HOSPITAL & CLINIC</span>
                        </div>
                        <h5 class="text-base sm:text-lg font-bold text-[#022C22] dark:text-white">
                          ขั้นตอนการจัดคิวหน้างาน (เช่น ฉีดวัคซีน / ตรวจสุขภาพ)
                        </h5>
                        <p class="text-xs sm:text-sm opacity-80 leading-relaxed">
                          เมื่อผู้รับบริการ Check-in จะได้เลขคิวเดียว โดยเจ้าหน้าที่สามารถเรียกคิวเดียวกันตามจุดบริการต่างๆ ได้อย่างต่อเนื่อง 5 จุด:
                        </p>
                        <ul class="text-xs space-y-1.5 opacity-90 font-mono">
                          <li class="flex items-center gap-1.5">
                            <span class="w-1.5 h-1.5 rounded-full bg-[#00C864]" />
                            <span>จุดที่ 1: พิมพ์แบบฟอร์มยินยอม / คัดกรองซักประวัติ</span>
                          </li>
                          <li class="flex items-center gap-1.5">
                            <span class="w-1.5 h-1.5 rounded-full bg-[#00C864]" />
                            <span>จุดที่ 2: ชั่งน้ำหนัก วัดความดันโลหิต</span>
                          </li>
                          <li class="flex items-center gap-1.5">
                            <span class="w-1.5 h-1.5 rounded-full bg-[#00C864]" />
                            <span>จุดที่ 3: รับการฉีดวัคซีน / ตรวจรักษา</span>
                          </li>
                          <li class="flex items-center gap-1.5">
                            <span class="w-1.5 h-1.5 rounded-full bg-[#00C864]" />
                            <span>จุดที่ 4: ตรวจสอบก่อนกลับ พร้อมรับเอกสาร</span>
                          </li>
                          <li class="flex items-center gap-1.5">
                            <span class="w-1.5 h-1.5 rounded-full bg-[#00C864]" />
                            <span>จุดที่ 5: พักสังเกตอาการ 30 นาที</span>
                          </li>
                        </ul>
                      </div>

                      <div
                        class="mt-4 rounded-xl overflow-hidden border border-current/15 cursor-pointer group relative bg-black/10"
                        @click="openLightbox('/images/products/iqueue-hospital-flowchart.png', 'ขั้นตอนการจัดคิวหน้างาน (ฉีดวัคซีน / ตรวจสุขภาพ)', 'ระบบ Check-in, Queue Management & 5 จุดบริการ')"
                      >
                        <img
                          src="/images/products/iqueue-hospital-flowchart.png"
                          alt="Hospital Queue Flowchart"
                          class="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                        >
                        <div class="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2 text-white text-xs font-mono font-bold">
                          <ZoomIn class="w-4 h-4" />
                          <span>คลิกดูภาพขยาย</span>
                        </div>
                      </div>
                    </div>

                    <!-- Queue Model 2: Restaurant Single-Point Queue Flow -->
                    <div class="p-6 rounded-2xl bg-white/50 dark:bg-black/40 border border-current/10 space-y-4 flex flex-col justify-between">
                      <div class="space-y-3">
                        <div class="flex items-center justify-between">
                          <span class="px-3 py-1 rounded-full text-xs font-mono font-bold bg-amber-500/20 text-amber-600 dark:text-amber-300">
                            รูปแบบที่ 2 : หนึ่งช่องบริการ (ร้านอาหาร)
                          </span>
                          <span class="text-xs font-mono opacity-60">RESTAURANT & SERVICE</span>
                        </div>
                        <h5 class="text-base sm:text-lg font-bold text-[#022C22] dark:text-white">
                          ขั้นตอนการใช้งานระบบจัดคิว (ร้านอาหาร / ศูนย์บริการ)
                        </h5>
                        <p class="text-xs sm:text-sm opacity-80 leading-relaxed">
                          เมื่อผู้รับบริการกดบัตรคิว เจ้าหน้าที่สามารถเรียกคิวเข้ารับบริการผ่าน Smart TV พร้อมระบบบริหารจัดการโต๊ะ:
                        </p>
                        <ul class="text-xs space-y-1.5 opacity-90 font-mono">
                          <li class="flex items-center gap-1.5">
                            <span class="w-1.5 h-1.5 rounded-full bg-amber-500" />
                            <span>ขั้นตอนที่ 1: กดบัตรคิวหน้าร้านบน Tablet / Smartphone (ใส่ชื่อลูกค้าและจำนวนที่นั่ง)</span>
                          </li>
                          <li class="flex items-center gap-1.5">
                            <span class="w-1.5 h-1.5 rounded-full bg-amber-500" />
                            <span>ขั้นตอนที่ 2: เจ้าหน้าที่เรียกคิวผ่าน Tablet/Smartphone แสดงบน Smart TV</span>
                          </li>
                          <li class="flex items-center gap-1.5">
                            <span class="w-1.5 h-1.5 rounded-full bg-amber-500" />
                            <span>ขั้นตอนที่ 3: จอเรียกคิวระบุเบอร์โต๊ะ (เช่น "เชิญคุณ วี หมายเลข 5 ที่โต๊ะ 7 ค่ะ")</span>
                          </li>
                          <li class="flex items-center gap-1.5">
                            <span class="w-1.5 h-1.5 rounded-full bg-amber-500" />
                            <span>ฟังก์ชันเสริม: ระบบแจ้งเตือนโต๊ะที่กำลังจะครบกำหนดเวลา (เช่น 1 ชม.)</span>
                          </li>
                        </ul>
                      </div>

                      <div
                        class="mt-4 rounded-xl overflow-hidden border border-current/15 cursor-pointer group relative bg-black/10"
                        @click="openLightbox('/images/products/iqueue-restaurant-flowchart.jpg', 'ขั้นตอนการใช้งานระบบจัดคิว (ร้านอาหาร)', 'ออกบัตรคิวบน Tablet, เรียกคิวออกจอ Smart TV และแจ้งเตือนโต๊ะ')"
                      >
                        <img
                          src="/images/products/iqueue-restaurant-flowchart.jpg"
                          alt="Restaurant Queue Flowchart"
                          class="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                        >
                        <div class="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2 text-white text-xs font-mono font-bold">
                          <ZoomIn class="w-4 h-4" />
                          <span>คลิกดูภาพขยาย</span>
                        </div>
                      </div>
                    </div>

                  </div>
                </div>

                <!-- 4. Official Brochures & System Download Section -->
                <div class="p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-purple-900/20 via-emerald-950/20 to-purple-900/10 border border-purple-500/30 shadow-xl space-y-6">
                  <div class="space-y-2">
                    <div class="text-xs font-mono font-bold text-purple-400 uppercase tracking-wider flex items-center gap-2">
                      <Download class="w-4 h-4" />
                      <span>OFFICIAL DOWNLOADS // เอกสารแนะนำระบบและโบรชัวร์</span>
                    </div>
                    <h4 class="text-xl sm:text-2xl font-bold text-[#022C22] dark:text-white">
                      ดาวน์โหลดเอกสารคุณสมบัติระบบไอรีจิส
                    </h4>
                    <p class="text-xs sm:text-sm opacity-80">
                      สามารถดาวน์โหลดเอกสารข้อกำหนดทางเทคนิคและโบรชัวร์ฉบับเต็มเพื่อประกอบการพิจารณาจัดซื้อจัดจ้าง
                    </p>
                  </div>

                  <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <a
                      href="https://www.i-regist.com/index.php/brochure-i-regist/member-management-system"
                      target="_blank"
                      rel="noopener noreferrer"
                      class="p-4 rounded-2xl bg-white/60 dark:bg-black/60 border border-purple-500/30 hover:border-purple-400 hover:scale-[1.02] transition-all flex items-center justify-between group shadow-sm"
                    >
                      <div class="flex items-center gap-3">
                        <div class="w-10 h-10 rounded-xl bg-purple-500/20 text-purple-400 flex items-center justify-center shrink-0">
                          <FileText class="w-5 h-5" />
                        </div>
                        <div>
                          <div class="text-sm font-bold group-hover:text-purple-400 transition-colors">
                            ดาวน์โหลดคุณสมบัติระบบไอรีจิส
                          </div>
                          <div class="text-xs opacity-65 font-mono">
                            Member Management System
                          </div>
                        </div>
                      </div>
                      <Download class="w-4 h-4 text-purple-400 shrink-0 group-hover:translate-y-0.5 transition-transform" />
                    </a>

                    <a
                      href="https://i-regist.com/index.php/th/brochure-i-regist/registration-system"
                      target="_blank"
                      rel="noopener noreferrer"
                      class="p-4 rounded-2xl bg-white/60 dark:bg-black/60 border border-emerald-500/30 hover:border-emerald-400 hover:scale-[1.02] transition-all flex items-center justify-between group shadow-sm"
                    >
                      <div class="flex items-center gap-3">
                        <div class="w-10 h-10 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0">
                          <FileText class="w-5 h-5" />
                        </div>
                        <div>
                          <div class="text-sm font-bold group-hover:text-emerald-400 transition-colors">
                            Download i-Regist Brochure
                          </div>
                          <div class="text-xs opacity-65 font-mono">
                            Registration System PDF
                          </div>
                        </div>
                      </div>
                      <Download class="w-4 h-4 text-emerald-400 shrink-0 group-hover:translate-y-0.5 transition-transform" />
                    </a>
                  </div>
                </div>

                <!-- 5. Dedicated Specialist Contact Card (คุณทวีวัตร์ ทรรศนะประทีป) -->
                <div class="p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-purple-950/40 via-purple-900/20 to-emerald-950/30 border border-purple-500/40 shadow-xl flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
                  <div class="flex items-center gap-4">
                    <div class="w-16 h-16 rounded-2xl bg-white dark:bg-black/40 border border-purple-500/30 p-2 shrink-0 flex items-center justify-center shadow-md">
                      <img
                        src="/images/products/regist-ai-mascot.png"
                        alt="Regist.ai Mascot"
                        class="w-full h-full object-contain"
                      >
                    </div>
                    <div>
                      <div class="text-xs font-mono font-bold text-purple-400 uppercase tracking-wider flex items-center gap-1.5">
                        <User class="w-3.5 h-3.5" />
                        <span>INTERESTED & CONTACT // สนใจติดต่อสอบถาม</span>
                      </div>
                      <h4 class="text-lg sm:text-xl font-bold text-[#022C22] dark:text-white mt-0.5">
                        คุณทวีวัตร์ ทรรศนะประทีป
                      </h4>
                      <p class="text-xs sm:text-sm opacity-80">
                        ผู้เชี่ยวชาญโซลูชันระบบลงทะเบียน Regist.ai และระบบจัดการคิว i-Queue บริษัท ไอเจนโก้ จำกัด
                      </p>
                    </div>
                  </div>

                  <div class="flex flex-wrap items-center gap-3 w-full md:w-auto">
                    <a
                      href="tel:025325151"
                      class="px-4 py-2.5 rounded-xl bg-purple-600 text-white hover:bg-purple-700 text-xs font-bold font-mono transition-all flex items-center gap-1.5 shadow-md active:scale-95"
                    >
                      <Phone class="w-3.5 h-3.5" />
                      <span>02-532-5151</span>
                    </a>
                    <a
                      href="tel:0817529549"
                      class="px-4 py-2.5 rounded-xl bg-emerald-600 text-white hover:bg-emerald-700 text-xs font-bold font-mono transition-all flex items-center gap-1.5 shadow-md active:scale-95"
                    >
                      <Phone class="w-3.5 h-3.5" />
                      <span>081-752-9549</span>
                    </a>
                    <a
                      href="mailto:thaweewat@igenco.co.th"
                      class="px-4 py-2.5 rounded-xl border border-purple-400/50 hover:bg-purple-500/20 text-xs font-bold font-mono transition-all flex items-center gap-1.5 shadow-md active:scale-95"
                    >
                      <ExternalLink class="w-3.5 h-3.5" />
                      <span>thaweewat@igenco.co.th</span>
                    </a>
                  </div>
                </div>

              </div>
            </div>

            <!-- 6. National Partnerships & Accreditations (ถ้ามี) -->
            <div v-if="article.partnerships && article.partnerships.length > 0" id="section-partnerships" class="my-6 space-y-4 scroll-mt-28">
              <div class="text-xs font-mono font-bold uppercase tracking-wider text-[#00C864] dark:text-[#00FF88] flex items-center gap-1.5">
                <Award class="w-3.5 h-3.5" />
                <span>{{ article.sectionTitles?.partnershipsSubtitle || (article.sectionTitles?.partnerships ? article.sectionTitles.partnerships + ' // พันธมิตร' : 'NATIONAL ACCREDITATIONS // พันธมิตรและการรับรอง') }}</span>
              </div>
              <div class="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div
                  v-for="(part, pIdx) in article.partnerships"
                  :key="pIdx"
                  class="p-5 rounded-2xl spatial-glass border border-current/10 hover:border-[#00C864] dark:hover:border-[#00FF88] transition-all hover:-translate-y-1"
                >
                  <div class="text-sm font-bold text-[#022C22] dark:text-white mb-1">
                    {{ part.name }}
                  </div>
                  <div class="text-xs text-[#00A854] dark:text-[#00FF88] font-medium mb-2">
                    {{ part.role }}
                  </div>
                  <p class="text-xs opacity-75 leading-relaxed">
                    {{ part.desc }}
                  </p>
                </div>
              </div>
            </div>

            <!-- 7. Remaining paragraphs (ถ้ามีมากกว่า 3 ย่อหน้า) -->
            <template v-if="article.fullContent.length > 3">
              <p
                v-for="(para, idx) in article.fullContent.slice(3)"
                :key="idx"
                class="leading-[2.2] opacity-90"
              >
                {{ para }}
              </p>
            </template>

          </div>

          <!-- ===================================================
               INTERACTIVE FLOWCHART SECTION
                Figure 2-1 (PM) & Figure 2-2 (SI) with Lightbox & Node Map
          ==================================================== -->
          <section id="section-architecture" v-if="article.flowcharts && article.flowcharts.length > 0" class="pt-6 space-y-6 reveal-init reveal-scale scroll-mt-28">
            
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
          <div id="section-author" class="p-7 sm:p-8 rounded-[2rem] spatial-glass border border-current/15 shadow-xl space-y-6 reveal-init reveal-up scroll-mt-28">
            
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
          <div class="pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-current/10 text-xs font-mono">
            <div>
              <NuxtLink
                v-if="prevArticle"
                :to="'/news/' + prevArticle.id"
                class="hover:underline flex items-center gap-1.5 opacity-75 hover:opacity-100 hover:text-[#00C864] dark:hover:text-[#00FF88] transition-colors"
              >
                <ArrowLeft class="w-3.5 h-3.5" />
                <span class="truncate max-w-[220px] sm:max-w-xs">ข่าวก่อนหน้า: {{ prevArticle.title }}</span>
              </NuxtLink>
              <NuxtLink
                v-else
                to="/#news"
                class="hover:underline flex items-center gap-1.5 opacity-75 hover:opacity-100 hover:text-[#00C864] dark:hover:text-[#00FF88] transition-colors"
              >
                <ArrowLeft class="w-3.5 h-3.5" />
                <span>กลับสู่คลังข่าวสาร</span>
              </NuxtLink>
            </div>

            <div class="flex items-center gap-4">
              <NuxtLink
                v-if="prevArticle"
                to="/#news"
                class="hover:underline hidden sm:flex items-center gap-1.5 opacity-50 hover:opacity-100"
              >
                <span>คลังข่าวสาร</span>
              </NuxtLink>
              
              <NuxtLink
                v-if="nextArticle"
                :to="'/news/' + nextArticle.id"
                class="hover:underline flex items-center gap-1.5 text-[#00C864] dark:text-[#00FF88] font-bold"
              >
                <span class="truncate max-w-[220px] sm:max-w-xs">อ่านข่าวถัดไป: {{ nextArticle.title }}</span>
                <ArrowRight class="w-3.5 h-3.5" />
              </NuxtLink>
            </div>
          </div>

        </article>

        <!-- =====================================================
             STICKY SIDEBAR (4 Columns)
             Scrollytelling TOC + Recent Posts + Quick Consultation
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
                  'block px-3 py-2 rounded-xl text-xs transition-all flex items-center gap-2.5 cursor-pointer',
                  activeSection === sec.id
                    ? 'bg-[#00C864]/20 text-[#00A854] dark:text-[#00FF88] font-bold translate-x-1 border-l-2 border-[#00C864] dark:border-[#00FF88]'
                    : 'opacity-70 hover:opacity-100 hover:bg-black/5 dark:hover:bg-white/5'
                ]"
                @click.prevent="scrollToSection(sec.id)"
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

          <!-- 1. Recent Posts Mini Cards (ข่าวล่าสุด) -->
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
.smartsoft-mascot {
  position: relative;
  isolation: isolate;
}

.smartsoft-mascot::before {
  position: absolute;
  z-index: -1;
  inset: 6% 0;
  background: radial-gradient(ellipse, rgb(16 185 129 / 16%), transparent 70%);
  content: '';
  pointer-events: none;
}

.smartsoft-mascot img {
  filter: drop-shadow(0 7px 10px rgb(2 44 34 / 16%));
}

@media (prefers-reduced-motion: no-preference) {
  .smartsoft-mascot img {
    animation: mascot-appear 450ms ease-out both;
  }
}

@keyframes mascot-appear {
  from { opacity: 0; transform: translateY(6px); }
  to { opacity: 1; transform: translateY(0); }
}

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
