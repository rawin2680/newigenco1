<script setup lang="ts">
import type { Component } from 'vue'
import { useLiveRefresh } from '~/composables/useLiveRefresh'
import { useStrapiContent } from '~/composables/useStrapiContent'
import { hasProductDetail } from '~/shared/productBlocks'

// หน้าสินค้าที่ทำมือไว้เดิม ใช้เป็นค่าสำรองเมื่อสินค้ายังไม่มีเนื้อหาหน้ารายละเอียดใน Strapi
const legacyPages: Record<string, () => Promise<{ default: Component }>> = {
  'bio-grid-solar': () => import('~/components/products/legacy/bio-grid-solar.vue'),
  'hr-ai': () => import('~/components/products/legacy/hr-ai.vue'),
  'i-finsoft': () => import('~/components/products/legacy/i-finsoft.vue'),
  'i-realestate': () => import('~/components/products/legacy/i-realestate.vue'),
  'i-smartflow': () => import('~/components/products/legacy/i-smartflow.vue'),
  'i-smartsoft': () => import('~/components/products/legacy/i-smartsoft.vue'),
  'igenq-portfolio': () => import('~/components/products/legacy/igenq-portfolio.vue'),
  'igenq': () => import('~/components/products/legacy/igenq.vue'),
  'imme-application': () => import('~/components/products/legacy/imme-application.vue'),
  'ipos': () => import('~/components/products/legacy/ipos.vue'),
  'outsource-service': () => import('~/components/products/legacy/outsource-service.vue'),
  'regist-ai': () => import('~/components/products/legacy/regist-ai.vue'),
  'smart-edge-iot': () => import('~/components/products/legacy/smart-edge-iot.vue'),
  'software-ondemand': () => import('~/components/products/legacy/software-ondemand.vue')
}

const route = useRoute()
const slug = computed(() => String(route.params.slug || ''))
const { getProducts } = useStrapiContent()
const { data: products, refresh } = await useAsyncData('product-detail-catalog', async () => (await getProducts()) || [])
const product = computed(() => (products.value || []).find(item =>
  item.slug === slug.value || item.detailRoute === '/products/' + slug.value))
const useTemplate = computed(() => Boolean(product.value && hasProductDetail(product.value.blocks)))
const legacyLoader = computed(() => legacyPages[slug.value])
const legacy = computed(() => legacyLoader.value ? defineAsyncComponent(legacyLoader.value) : null)

if (import.meta.server && !useTemplate.value && !legacyLoader.value && !product.value) {
  const event = useRequestEvent()
  if (event) setResponseStatus(event, 404)
}

useLiveRefresh(async () => { await refresh() })

useSeoMeta({
  title: () => useTemplate.value ? (product.value?.seoTitle || product.value!.name + ' | IGENCO') : undefined,
  description: () => useTemplate.value ? (product.value?.seoDescription || product.value?.shortDesc) : undefined
})
</script>

<template>
  <ProductDetailTemplate v-if="useTemplate && product" :product="product" />
  <component :is="legacy" v-else-if="legacy" />
  <ProductDetailTemplate v-else-if="product" :product="product" />
  <div v-else class="min-h-screen">
    <AppHeader />
    <main class="mx-auto max-w-4xl space-y-4 px-5 pb-20 pt-32 text-center">
      <h1 class="text-3xl font-bold">ไม่พบสินค้านี้</h1>
      <NuxtLink to="/#products" class="font-semibold underline">กลับไปดูผลิตภัณฑ์และโซลูชัน</NuxtLink>
    </main>
    <ContactFooter />
  </div>
</template>
