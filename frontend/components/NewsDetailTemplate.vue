<script setup lang="ts">
import { CalendarDays, ChevronRight, House, ArrowRight, UserRound, Link2 } from 'lucide-vue-next'
import { newsPath, resolveNewsImage, type NewsItem } from '~/composables/useNews'
import { articleBlocks } from '~/composables/articleBlocks'
import { safeNewsUrl, selectNewsBlocks } from '~/shared/newsBlocks'

const props = defineProps<{ article: NewsItem; catalog: NewsItem[]; preview?: boolean }>()
const route = useRoute()
const blocks = computed(() => articleBlocks(props.article))
const strapiUrl = useRuntimeConfig().public.strapiUrl as string
const mediaUrl = (url: string) => {
  const value = safeNewsUrl(resolveNewsImage(url, strapiUrl))
  return /^(https?:\/\/|\/)/.test(value) ? value : ''
}
const orderedBlocks = computed(() => blocks.value.filter(block => ['heading', 'paragraph', 'gallery', 'image'].includes(block.type)))
const coverPhotos = computed(() => {
  const inlinePictures = new Set(orderedBlocks.value.filter(block => block.visible && ['gallery', 'image'].includes(block.type))
    .flatMap(block => block.data.media.map(photo => mediaUrl(photo.url))).filter(Boolean))
  return [...new Set([props.article.image, ...(props.article.coverGallery || [])].map(mediaUrl).filter(url => url && !inlinePictures.has(url)))].map(url => ({
    url, alt: props.article.title, caption: ''
  }))
})
const visible = computed(() => selectNewsBlocks(orderedBlocks.value, coverPhotos.value.map(photo => photo.url), mediaUrl))
const counts = computed(() => {
  const counts = new Map<string, number>()
  for (const news of props.catalog) {
    if (news.category.trim()) counts.set(news.category, (counts.get(news.category) || 0) + 1)
  }
  return [...counts].map(([category, count]) => ({ category, count }))
})
const latest = computed(() => props.catalog
  .filter(item => item.documentId && item.title.trim() && item.documentId !== props.article.documentId)
  .slice(0, 3))
const newsIndex = (category?: string) => ({ path: '/', query: category ? { newsCategory: category } : {}, hash: '#news' })
const origin = useRequestURL().origin
const canonicalUrl = computed(() => new URL(newsPath(props.article), origin).href)
const shareLinks = computed(() => {
  const url = encodeURIComponent(canonicalUrl.value)
  return [
    { name: 'Facebook', label: 'f', url: 'https://www.facebook.com/sharer/sharer.php?u=' + url },
    { name: 'LINE', label: 'LINE', url: 'https://social-plugins.line.me/lineit/share?url=' + url },
    { name: 'LinkedIn', label: 'in', url: 'https://www.linkedin.com/sharing/share-offsite/?url=' + url }
  ]
})
const shareStatus = ref('')
async function copyLink() {
  if (props.preview) return
  try {
    await navigator.clipboard.writeText(canonicalUrl.value)
    shareStatus.value = 'คัดลอกลิงก์แล้ว'
  } catch {
    shareStatus.value = canonicalUrl.value
  }
}
watch(() => route.path, () => { shareStatus.value = '' })
</script>

<template>
  <div class="min-h-screen bg-[#fbfcfc] text-[#082e2b] dark:bg-[#071710] dark:text-[#edf8f2]" @click.capture="preview && $event.preventDefault()">
    <AppHeader />
    <main class="mx-auto max-w-[1320px] px-5 pb-12 pt-24 sm:px-9 lg:px-14">
      <nav aria-label="เส้นทางหน้าเว็บ" class="mb-7 flex items-center gap-2 text-xs text-slate-600 dark:text-slate-300">
        <NuxtLink to="/" aria-label="หน้าแรก"><House class="size-4" /></NuxtLink><ChevronRight class="size-3 shrink-0" />
        <NuxtLink :to="newsIndex()" class="shrink-0 font-bold text-current">ข่าวสารและกิจกรรม</NuxtLink>
        <ChevronRight class="size-3 shrink-0" /><span aria-current="page" class="truncate">{{ article.title }}</span>
      </nav>

      <div class="grid gap-8 lg:gap-12" :class="counts.length || latest.length ? 'lg:grid-cols-[minmax(0,1fr)_minmax(245px,0.43fr)]' : 'mx-auto max-w-4xl'">
        <article class="min-w-0 space-y-7 break-words">
          <header class="space-y-3">
            <div v-if="article.category.trim() || article.date.trim() || article.author?.name?.trim()" class="flex flex-wrap items-center gap-x-4 gap-y-2 text-xs font-medium text-slate-600 dark:text-slate-300">
              <span v-if="article.category.trim()" class="rounded-full bg-[#00c864] px-3 py-1 font-bold text-[#052c22]">{{ article.category }}</span>
              <span v-if="article.date.trim()" class="inline-flex items-center gap-1.5"><CalendarDays class="size-4" />{{ article.date }}</span>
              <span v-if="article.author?.name?.trim()" class="inline-flex items-center gap-1.5"><UserRound class="size-4" />โดย {{ article.author.name }}</span>
            </div>
            <h1 class="text-[clamp(1.75rem,3.2vw,3rem)] font-extrabold leading-[1.18]">{{ article.title }}</h1>
            <p v-if="article.subtitle?.trim() && article.subtitle !== article.summary" class="text-base font-semibold">{{ article.subtitle }}</p>
            <p v-if="article.summary.trim()" class="text-base leading-relaxed text-slate-600 dark:text-slate-300 sm:text-lg">{{ article.summary }}</p>
          </header>

          <NewsPhotoGallery v-if="coverPhotos.length > 1" :photos="coverPhotos" cover />
          <figure v-else-if="coverPhotos.length">
            <img :src="coverPhotos[0]?.url" :alt="coverPhotos[0]?.alt || article.title" class="aspect-[2/1] w-full rounded-2xl bg-current/5 object-cover" fetchpriority="high">
            <figcaption v-if="coverPhotos[0]?.caption" class="mt-2 text-sm opacity-75">{{ coverPhotos[0].caption }}</figcaption>
          </figure>
          <NewsBlockArticle v-if="visible.length" :blocks="visible" />

          <div class="flex flex-wrap items-center gap-2 border-t border-current/10 pt-4">
            <span class="mr-3 text-sm font-bold">แชร์บทความนี้</span>
            <button type="button" aria-label="คัดลอกลิงก์ข่าว" class="inline-flex size-10 items-center justify-center rounded-xl border border-current/10" @click="copyLink"><Link2 class="size-4" /></button>
            <a v-for="link in shareLinks" :key="link.name" :href="link.url" :aria-label="'แชร์ทาง ' + link.name" target="_blank" rel="noopener noreferrer" class="inline-flex size-10 items-center justify-center rounded-xl border border-current/10 text-xs font-extrabold">{{ link.label }}</a>
            <span role="status" class="break-all text-xs">{{ shareStatus }}</span>
          </div>
        </article>

        <aside v-if="counts.length || latest.length" class="space-y-5 self-start lg:sticky lg:top-24">
          <nav v-if="counts.length" aria-label="หมวดหมู่ข่าว" class="rounded-2xl border border-current/10 bg-white p-4 shadow-sm dark:bg-white/5 sm:p-5">
            <h2 class="mb-3 border-l-4 border-[#00c864] pl-3 text-lg font-extrabold">หมวดหมู่ข่าว</h2>
            <NuxtLink :to="newsIndex()" class="flex justify-between gap-3 border-t border-current/10 px-3 py-2.5 text-sm font-bold">ทั้งหมด<span class="rounded-full bg-current/5 px-2">{{ catalog.length }}</span></NuxtLink>
            <NuxtLink v-for="entry in counts" :key="entry.category" :to="newsIndex(entry.category)" class="flex justify-between gap-3 rounded-lg px-3 py-2.5 text-sm font-semibold hover:bg-emerald-500/10" :class="{ 'bg-emerald-500/15': entry.category === article.category }">
              {{ entry.category }}<span class="rounded-full bg-current/5 px-2">{{ entry.count }}</span>
            </NuxtLink>
          </nav>
          <nav v-if="latest.length" aria-label="ข่าวล่าสุด" class="space-y-3 rounded-2xl border border-current/10 bg-white p-4 shadow-sm dark:bg-white/5 sm:p-5">
            <h2 class="border-l-4 border-[#00c864] pl-3 text-lg font-extrabold">ข่าวล่าสุด</h2>
            <NuxtLink v-for="item in latest" :key="newsPath(item)" :to="newsPath(item)" class="flex items-center gap-3 border-t border-current/10 pt-3">
              <img v-if="mediaUrl(item.image)" :src="mediaUrl(item.image)" alt="" loading="lazy" class="h-14 w-20 rounded-lg object-cover">
              <span class="flex-1 text-sm font-bold">{{ item.title }}<span v-if="item.date" class="mt-1 block text-xs font-normal opacity-75">{{ item.date }}</span></span>
              <ArrowRight class="size-4 shrink-0 text-emerald-700 dark:text-emerald-300" />
            </NuxtLink>
          </nav>
        </aside>
      </div>


      <nav v-if="$slots.navigation" aria-label="ข่าวก่อนหน้าและถัดไป" class="mt-6 flex flex-wrap justify-between gap-4 border-t border-current/10 pt-4 text-sm font-bold">
        <slot name="navigation" />
      </nav>
    </main>
    <footer class="bg-[#032a26] text-white">
      <div class="mx-auto flex max-w-[1320px] flex-wrap items-center justify-between gap-4 px-5 py-5 sm:px-9 lg:px-14">
        <NuxtLink to="/" class="text-lg font-extrabold">IGENCO</NuxtLink>
        <div class="flex flex-wrap gap-x-4 gap-y-1 text-xs"><NuxtLink to="/privacy-policy">นโยบายความเป็นส่วนตัว</NuxtLink><span>© IGENCO Co., Ltd.</span></div>
      </div>
    </footer>
  </div>
</template>
