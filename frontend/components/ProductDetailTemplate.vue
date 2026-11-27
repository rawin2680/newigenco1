<script setup lang="ts">
import { ArrowLeft, ArrowUpRight, CheckCircle2, ChevronRight, Download, ExternalLink, Mail, Phone } from 'lucide-vue-next'
import type { StrapiProductItem } from '~/types/strapi'
import { resolveNewsImage } from '~/composables/useNews'
import { safeNewsUrl, youtubeEmbed } from '~/shared/newsBlocks'
import { lines, normalizeProductSections, paragraphs, visibleProductSections } from '~/shared/productBlocks'

const props = defineProps<{ product: StrapiProductItem; preview?: boolean }>()
const strapiUrl = useRuntimeConfig().public.strapiUrl as string
const mediaUrl = (url: string) => {
  const value = safeNewsUrl(resolveNewsImage(url, strapiUrl))
  return /^(https?:\/\/|\/)/.test(value) ? value : ''
}
const sections = computed(() => visibleProductSections(normalizeProductSections(props.product.blocks), mediaUrl))
const hero = computed(() => sections.value.find(section => section.type === 'hero')?.data)
const body = computed(() => sections.value.filter(section => section.type !== 'hero'))
const accent = computed(() => /^#[0-9a-f]{3,8}$/i.test(hero.value?.accent || '') ? hero.value!.accent : '#00A854')
const heroImage = computed(() => hero.value?.media[0] ? mediaUrl(hero.value.media[0].url) : props.product.image)
const isExternal = (url: string) => /^https?:\/\//.test(url)
const buttonIcon = (url: string) => url.startsWith('tel:') ? Phone : url.startsWith('mailto:') ? Mail : isExternal(url) ? ExternalLink : ArrowUpRight
</script>

<template>
  <div class="relative flex min-h-screen flex-col text-slate-800 dark:text-slate-100" @click.capture="preview && ($event.target as HTMLElement).closest('a') && $event.preventDefault()">
    <AppHeader />

    <main class="product-theme relative z-10 mx-auto w-full max-w-[1440px] flex-1 space-y-12 px-5 pb-20 pt-28 sm:space-y-20 sm:px-10 lg:px-16"
      :style="{ '--product-accent': accent, '--heading-accent-end': accent, '--heading-signal': accent }">
      <nav aria-label="เส้นทางนำทาง" class="flex items-center justify-between gap-4 border-b border-current/10 pb-4">
        <NuxtLink to="/#products" class="group inline-flex items-center gap-2 text-sm font-bold text-[var(--product-accent)] hover:underline">
          <ArrowLeft class="size-4 transition-transform group-hover:-translate-x-1" aria-hidden="true" />
          ย้อนกลับไปหน้าแคตตาล็อกสินค้า
        </NuxtLink>
        <div class="hidden items-center gap-2 text-xs opacity-75 sm:flex">
          <NuxtLink to="/">หน้าแรก</NuxtLink>
          <ChevronRight class="size-3.5" aria-hidden="true" />
          <NuxtLink to="/#products">ผลิตภัณฑ์</NuxtLink>
          <ChevronRight class="size-3.5" aria-hidden="true" />
          <span aria-current="page">{{ hero?.title || product.name }}</span>
        </div>
      </nav>

      <!-- ส่วนหัวสินค้า -->
      <section class="grid items-center gap-8 lg:grid-cols-12 lg:gap-14">
        <div class="min-w-0 space-y-5 lg:col-span-7">
          <div>
            <p class="mb-3 inline-flex rounded-full border border-current/15 px-3 py-1 text-xs font-bold opacity-80">{{ product.category }}</p>
            <h1 class="font-display text-3xl font-black leading-tight text-[#022C22] dark:text-white sm:text-5xl lg:text-6xl">{{ hero?.title || product.name }}</h1>
            <p v-if="hero?.subtitle || !hero" class="mt-3 font-display text-lg font-bold text-[var(--product-accent)] sm:text-2xl">{{ hero?.subtitle || product.shortDesc }}</p>
            <p v-if="hero?.label" lang="en" class="mt-1 text-sm text-slate-600 dark:text-slate-300">{{ hero.label }}</p>
          </div>
          <div v-if="hero?.text" class="max-w-2xl space-y-4 text-sm leading-relaxed text-slate-700 dark:text-slate-300 sm:text-base">
            <p v-for="(paragraph, i) in paragraphs(hero.text)" :key="i">{{ paragraph }}</p>
          </div>
          <div v-if="hero?.buttons.length" class="flex flex-wrap gap-3">
            <a v-for="(button, i) in hero.buttons" :key="i" :href="safeNewsUrl(button.url)"
              :target="isExternal(button.url) ? '_blank' : undefined" :rel="isExternal(button.url) ? 'noopener noreferrer' : undefined"
              class="inline-flex items-center gap-2 rounded-2xl px-5 py-3 text-sm font-bold"
              :class="i === 0 ? 'bg-[var(--product-accent)] text-white shadow-sm hover:opacity-90' : 'spatial-glass border border-current/15 hover:border-[var(--product-accent)]'">
              {{ button.label }}
              <component :is="buttonIcon(button.url)" class="size-4" aria-hidden="true" />
            </a>
          </div>
        </div>
        <div v-if="heroImage" class="spatial-glass rounded-3xl border border-current/10 p-3 shadow-xl sm:p-5 lg:col-span-5">
          <img :src="heroImage" :alt="hero?.media[0]?.alt || product.name" class="mx-auto max-h-[420px] w-full rounded-2xl object-contain">
        </div>
      </section>

      <template v-for="section in body" :key="section.id">
        <!-- ภาพรวมระบบ -->
        <section v-if="section.type === 'overview'" id="product-overview" class="grid scroll-mt-28 items-start gap-8" :class="section.data.media.length && 'lg:grid-cols-12'">
          <div class="space-y-4" :class="section.data.media.length && 'lg:col-span-7'">
            <h2 v-if="section.data.title" class="font-display text-2xl font-black text-[#022C22] dark:text-white sm:text-4xl">{{ section.data.title }}</h2>
            <p v-for="(paragraph, i) in paragraphs(section.data.text)" :key="i" class="max-w-4xl text-sm leading-relaxed text-slate-700 dark:text-slate-300 sm:text-base">{{ paragraph }}</p>
          </div>
          <figure v-if="section.data.media.length" class="spatial-glass rounded-3xl border border-current/10 p-3 lg:col-span-5">
            <img :src="mediaUrl(section.data.media[0].url)" :alt="section.data.media[0].alt || section.data.title" class="w-full rounded-2xl object-contain">
            <figcaption v-if="section.data.media[0].caption" class="mt-2 text-center text-xs opacity-70">{{ section.data.media[0].caption }}</figcaption>
          </figure>
        </section>

        <section v-else class="scroll-mt-28 space-y-6" :id="'product-' + section.type"
          :class="section.type === 'contact' && 'spatial-glass scroll-mt-28 rounded-3xl border border-current/15 p-6 sm:p-8'">
          <div v-if="section.type !== 'contact' && (section.data.title || section.data.text)" class="space-y-2">
            <h2 v-if="section.data.title" class="font-display text-2xl font-black text-[#022C22] dark:text-white sm:text-4xl">{{ section.data.title }}</h2>
            <p v-if="section.data.text" class="max-w-3xl text-sm leading-relaxed text-slate-700 dark:text-slate-300 sm:text-base">{{ section.data.text }}</p>
          </div>

          <!-- โมดูล / ระบบย่อย -->
          <div v-if="section.type === 'modules'" class="grid gap-5 md:grid-cols-2">
            <article v-for="(item, i) in section.data.items" :key="i" class="spatial-glass space-y-4 rounded-3xl border border-current/10 p-5 sm:p-7">
              <div class="flex items-start gap-3">
                <img v-if="mediaUrl(item.image)" :src="mediaUrl(item.image)" alt="" class="size-10 shrink-0 rounded-xl object-contain">
                <span v-else class="grid size-10 shrink-0 place-items-center rounded-xl accent-soft font-display text-sm font-black text-[var(--product-accent)]">{{ String(i + 1).padStart(2, '0') }}</span>
                <div>
                  <h3 class="font-display text-lg font-bold leading-snug">{{ item.title }}</h3>
                  <p v-if="item.subtitle" lang="en" class="mt-1 text-xs text-slate-600 dark:text-slate-300">{{ item.subtitle }}</p>
                </div>
              </div>
              <p v-if="item.text" class="text-sm leading-relaxed text-slate-700 dark:text-slate-300">{{ item.text }}</p>
            </article>
          </div>

          <!-- คุณสมบัติเด่น -->
          <ul v-else-if="section.type === 'features'" class="grid gap-4 md:grid-cols-2">
            <li v-for="(item, i) in section.data.items" :key="i" class="spatial-glass flex gap-3 rounded-2xl border border-current/10 p-5">
              <CheckCircle2 class="mt-0.5 size-5 shrink-0 text-[var(--product-accent)]" aria-hidden="true" />
              <div class="min-w-0 space-y-2">
                <h3 v-if="item.title" class="font-bold leading-snug">{{ item.title }}</h3>
                <ul v-if="lines(item.text).length > 1" class="list-disc space-y-1 pl-5 text-sm text-slate-700 dark:text-slate-300">
                  <li v-for="(line, j) in lines(item.text)" :key="j">{{ line }}</li>
                </ul>
                <p v-else-if="item.text" class="text-sm leading-relaxed text-slate-700 dark:text-slate-300">{{ item.text }}</p>
              </div>
            </li>
          </ul>

          <!-- ขั้นตอนการทำงาน -->
          <ol v-else-if="section.type === 'steps'" class="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            <li v-for="(item, i) in section.data.items" :key="i" class="spatial-glass space-y-3 rounded-2xl border border-current/10 p-5">
              <span class="grid size-9 place-items-center rounded-full bg-[var(--product-accent)] font-display text-sm font-black text-white">{{ i + 1 }}</span>
              <img v-if="mediaUrl(item.image)" :src="mediaUrl(item.image)" alt="" class="w-full rounded-xl object-contain">
              <h3 class="font-bold leading-snug">{{ item.title }}</h3>
              <p v-if="item.text" class="text-sm leading-relaxed text-slate-700 dark:text-slate-300">{{ item.text }}</p>
            </li>
          </ol>

          <!-- ตัวเลขไฮไลต์ -->
          <div v-else-if="section.type === 'stats'" class="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <div v-for="(item, i) in section.data.items" :key="i" class="spatial-glass rounded-2xl border border-current/10 p-5 text-center">
              <div class="font-display text-3xl font-black text-[var(--product-accent)]">{{ item.title }}</div>
              <div v-if="item.subtitle" class="mt-1 text-sm font-bold">{{ item.subtitle }}</div>
              <div v-if="item.text" class="mt-1 text-xs opacity-70">{{ item.text }}</div>
            </div>
          </div>

          <!-- เปรียบเทียบ 2 รูปแบบ -->
          <div v-else-if="section.type === 'compare'" class="grid gap-5 md:grid-cols-2">
            <article v-for="(item, i) in section.data.items" :key="i" class="spatial-glass space-y-4 rounded-3xl border p-5 sm:p-7"
              :class="i === 0 ? 'accent-border' : 'border-current/10'">
              <span v-if="item.subtitle" class="inline-flex rounded-full accent-soft px-3 py-1 text-xs font-bold text-[var(--product-accent)]">{{ item.subtitle }}</span>
              <h3 class="font-display text-xl font-black">{{ item.title }}</h3>
              <img v-if="mediaUrl(item.image)" :src="mediaUrl(item.image)" alt="" class="w-full rounded-xl object-contain">
              <ul class="space-y-2 text-sm text-slate-700 dark:text-slate-300">
                <li v-for="(line, j) in lines(item.text)" :key="j" class="flex gap-2">
                  <CheckCircle2 class="mt-0.5 size-4 shrink-0 text-[var(--product-accent)]" aria-hidden="true" />{{ line }}
                </li>
              </ul>
            </article>
          </div>

          <!-- แกลเลอรีภาพและวิดีโอ -->
          <div v-else-if="section.type === 'gallery'" class="space-y-5">
            <div v-if="youtubeEmbed(section.data.url)" class="aspect-video overflow-hidden rounded-3xl border border-current/10">
              <iframe :src="youtubeEmbed(section.data.url)" title="วิดีโอสินค้า" class="size-full" allow="accelerometer; encrypted-media; gyroscope; picture-in-picture" allowfullscreen loading="lazy" />
            </div>
            <div v-if="section.data.media.length" class="grid gap-5" :class="section.data.media.length > 1 && 'md:grid-cols-2'">
              <figure v-for="(photo, i) in section.data.media" :key="i" class="spatial-glass space-y-2 rounded-3xl border border-current/10 p-3">
                <a :href="mediaUrl(photo.url)" target="_blank" rel="noopener" :aria-label="'เปิดภาพเต็ม ' + (photo.caption || (i + 1))">
                  <img :src="mediaUrl(photo.url)" :alt="photo.alt || photo.caption" loading="lazy" class="w-full rounded-2xl object-contain">
                </a>
                <figcaption v-if="photo.caption" class="text-center text-xs opacity-75">{{ photo.caption }}</figcaption>
              </figure>
            </div>
          </div>

          <!-- ผลงาน / ลูกค้าที่ใช้งาน -->
          <div v-else-if="section.type === 'clients'" class="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            <component :is="safeNewsUrl(item.url) ? 'a' : 'article'" v-for="(item, i) in section.data.items" :key="i"
              :href="safeNewsUrl(item.url) || undefined" :target="isExternal(item.url) ? '_blank' : undefined" :rel="isExternal(item.url) ? 'noopener noreferrer' : undefined"
              class="spatial-glass flex gap-4 rounded-2xl border border-current/10 p-4 accent-hover">
              <img v-if="mediaUrl(item.image)" :src="mediaUrl(item.image)" alt="" class="size-14 shrink-0 rounded-xl bg-white object-contain p-1">
              <div class="min-w-0">
                <h3 class="font-bold leading-snug">{{ item.title }}</h3>
                <p v-if="item.text" class="mt-1 text-xs leading-relaxed opacity-75">{{ item.text }}</p>
              </div>
            </component>
          </div>

          <!-- เอกสารดาวน์โหลด -->
          <ul v-else-if="section.type === 'downloads'" class="grid gap-3 md:grid-cols-2">
            <li v-for="(item, i) in section.data.items.filter(entry => safeNewsUrl(entry.url))" :key="i">
              <a :href="safeNewsUrl(item.url)" target="_blank" rel="noopener noreferrer" class="spatial-glass flex items-center gap-3 rounded-2xl border border-current/10 p-4 accent-hover">
                <Download class="size-5 shrink-0 text-[var(--product-accent)]" aria-hidden="true" />
                <span class="min-w-0">
                  <span class="block font-bold">{{ item.title || 'ดาวน์โหลดเอกสาร' }}</span>
                  <span v-if="item.text" class="block text-xs opacity-70">{{ item.text }}</span>
                </span>
              </a>
            </li>
          </ul>

          <!-- ติดต่อผู้เชี่ยวชาญ -->
          <div v-else-if="section.type === 'contact'" class="flex flex-wrap items-center justify-between gap-5">
            <div class="space-y-2">
              <h2 class="font-display text-2xl font-black text-[#022C22] dark:text-white">{{ section.data.title || 'ติดต่อสอบถาม' }}</h2>
              <p v-if="section.data.text" class="text-sm text-slate-700 dark:text-slate-300">{{ section.data.text }}</p>
            </div>
            <div class="flex flex-wrap gap-3">
              <a v-for="(button, i) in section.data.buttons" :key="i" :href="safeNewsUrl(button.url)"
                :target="isExternal(button.url) ? '_blank' : undefined" :rel="isExternal(button.url) ? 'noopener noreferrer' : undefined"
                class="inline-flex items-center gap-2 rounded-2xl px-5 py-3 text-sm font-bold"
                :class="i === 0 ? 'bg-[var(--product-accent)] text-white hover:opacity-90' : 'border border-current/15'">
                <component :is="buttonIcon(button.url)" class="size-4" aria-hidden="true" />
                {{ button.label }}
              </a>
            </div>
          </div>
        </section>
      </template>
    </main>

    <ContactFooter />
  </div>
</template>

<style scoped>
.accent-soft { background-color: color-mix(in srgb, var(--product-accent) 12%, transparent); }
.accent-border { border-color: color-mix(in srgb, var(--product-accent) 40%, transparent); }
.accent-hover:hover { border-color: color-mix(in srgb, var(--product-accent) 50%, transparent); }
</style>
