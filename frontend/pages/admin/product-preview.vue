<script setup lang="ts">
import type { StrapiProductItem } from '~/types/strapi'

// หน้าดูตัวอย่างหน้าสินค้าในหน้าต่างแก้ไข (รับข้อมูลจากหน้าแอดมินผ่าน postMessage เหมือนตัวอย่างข่าว)
definePageMeta({ layout: false })
useSeoMeta({ robots: 'noindex, nofollow' })

const product = ref<StrapiProductItem>()
function receive(event: MessageEvent) {
  if (event.origin !== window.location.origin || event.source !== window.parent || event.data?.type !== 'igenco-product-preview') return
  product.value = event.data.product
  document.documentElement.classList.toggle('dark', Boolean(event.data.theme))
}
onMounted(() => {
  window.addEventListener('message', receive)
  if (window.parent !== window) window.parent.postMessage('igenco-product-preview-ready', window.location.origin)
})
onBeforeUnmount(() => window.removeEventListener('message', receive))
</script>

<template>
  <ProductDetailTemplate v-if="product" :product="product" preview />
</template>
