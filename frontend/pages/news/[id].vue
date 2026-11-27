<script setup lang="ts">
import { mergePublishedNews, newsPath, useNews } from '~/composables/useNews'
import { useLiveRefresh } from '~/composables/useLiveRefresh'
import { useStrapiContent } from '~/composables/useStrapiContent'

const route = useRoute()
const { newsList } = useNews()
const { getNewsArticles } = useStrapiContent()
const { data: published, refresh } = await useAsyncData('published-news-detail', getNewsArticles)
const strapiUrl = useRuntimeConfig().public.strapiUrl as string
const catalog = computed(() => mergePublishedNews(published.value || [], newsList, strapiUrl, true))
const article = computed(() => {
  const key = String(route.params.id)
  const byAddress = catalog.value.find(item => item.slug === key || (item.documentId && 'doc-' + item.documentId === key))
  if (byAddress || !/^\d+$/.test(key)) return byAddress
  return catalog.value.find(item => item.id === Number(key))
})
const index = computed(() => catalog.value.findIndex(item => item === article.value))
const previous = computed(() => index.value > 0 ? catalog.value[index.value - 1] : undefined)
const next = computed(() => index.value >= 0 ? catalog.value[index.value + 1] : undefined)
useLiveRefresh(async () => { await refresh() })

useSeoMeta({
  title: () => article.value?.seoTitle || (article.value ? article.value.title + ' | IGENCO' : 'ข่าวสารและกิจกรรม | IGENCO'),
  description: () => article.value?.seoDescription || article.value?.summary || 'ข่าวสารและกิจกรรมล่าสุดของ IGENCO'
})
</script>

<template>
  <NewsDetailTemplate v-if="article" :article="article" :catalog="catalog">
    <template v-if="previous || next" #navigation>
      <NuxtLink v-if="previous" :to="newsPath(previous)">← {{ previous.title }}</NuxtLink>
      <NuxtLink v-if="next" :to="newsPath(next)" class="ml-auto">{{ next.title }} →</NuxtLink>
    </template>
  </NewsDetailTemplate>
  <div v-else class="min-h-screen">
    <AppHeader />
    <main class="mx-auto max-w-4xl space-y-4 px-5 pb-20 pt-32 text-center">
      <h1 class="text-3xl font-bold">ไม่พบข่าวนี้</h1>
      <NuxtLink to="/#news" class="font-semibold underline">กลับไปดูข่าวสารและกิจกรรม</NuxtLink>
    </main>
  </div>
</template>
