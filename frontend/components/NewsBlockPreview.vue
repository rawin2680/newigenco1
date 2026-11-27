<script setup lang="ts">
import type { NewsItem } from '~/composables/useNews'

const props = defineProps<{ article: NewsItem }>()
const frame = ref<HTMLIFrameElement | null>(null)
const viewport = ref(390)
function send() {
  const theme = document.documentElement.classList.contains('dark')
  frame.value?.contentWindow?.postMessage({
    type: 'igenco-news-preview', ...JSON.parse(JSON.stringify(props)), theme
  }, window.location.origin)
}
function ready(event: MessageEvent) {
  if (event.origin === window.location.origin && event.source === frame.value?.contentWindow && event.data === 'igenco-news-preview-ready') send()
}
onMounted(() => window.addEventListener('message', ready))
onBeforeUnmount(() => window.removeEventListener('message', ready))
watch(props, send, { deep: true })
</script>

<template>
  <div class="space-y-3">
    <div class="flex flex-wrap gap-2" aria-label="ขนาดหน้าจอตัวอย่าง">
      <button v-for="device in [{ name: 'มือถือ', width: 390 }, { name: 'แท็บเล็ต', width: 768 }, { name: 'เดสก์ท็อป', width: 1280 }]" :key="device.width"
        type="button" :aria-pressed="viewport === device.width" class="rounded-xl border border-current/15 px-3 py-2 text-xs font-bold"
        :class="viewport === device.width ? 'bg-emerald-600 text-white' : ''" @click="viewport = device.width">{{ device.name }}</button>
    </div>
    <div class="overflow-x-auto rounded-xl border border-current/15">
      <iframe ref="frame" src="/admin/news-preview" title="พรีวิวหน้าข่าว" class="mx-auto block h-[460px] max-w-none" :style="{ width: viewport + 'px' }" @load="send" />
    </div>
  </div>
</template>
