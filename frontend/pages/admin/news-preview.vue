<script setup lang="ts">
import { mergePublishedNews, useNews, type NewsItem } from '~/composables/useNews'

definePageMeta({ layout: false })
useSeoMeta({ robots: 'noindex, nofollow' })

const article = ref<NewsItem>()
const { newsList } = useNews()
const { getNewsArticles } = useStrapiContent()
const { data: published } = await useAsyncData('news-preview-catalog', getNewsArticles)
const strapiUrl = useRuntimeConfig().public.strapiUrl as string
const catalog = computed(() => mergePublishedNews(published.value || [], newsList, strapiUrl, true))
function receive(event: MessageEvent) {
  if (event.origin !== window.location.origin || event.source !== window.parent || event.data?.type !== 'igenco-news-preview') return
  article.value = event.data.article
  document.documentElement.classList.toggle('dark', Boolean(event.data.theme))
}
onMounted(() => {
  window.addEventListener('message', receive)
  if (window.parent !== window) window.parent.postMessage('igenco-news-preview-ready', window.location.origin)
})
onBeforeUnmount(() => window.removeEventListener('message', receive))
</script>

<template>
  <NewsDetailTemplate v-if="article" :article="article" :catalog="catalog" preview />
</template>
