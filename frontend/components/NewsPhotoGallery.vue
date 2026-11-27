<script setup lang="ts">
const props = defineProps<{ photos: { url: string; alt: string; caption: string }[]; cover?: boolean }>()
const track = ref<HTMLElement | null>(null)
const current = ref(0)
function sync() {
  const element = track.value
  if (!element?.clientWidth) return
  current.value = Math.min(props.photos.length - 1, Math.round(element.scrollLeft / element.clientWidth))
}
function move(offset: number) {
  const element = track.value
  if (!element) return
  const next = Math.min(Math.max(current.value + offset, 0), props.photos.length - 1)
  element.scrollTo({ left: next * element.clientWidth, behavior: 'instant' })
}
</script>

<template>
  <div v-if="photos.length" class="space-y-2" role="region" aria-label="แกลเลอรีภาพข่าว">
    <div ref="track" class="flex snap-x snap-mandatory overflow-x-auto rounded-2xl bg-current/5" tabindex="0"
      aria-label="ปัดหรือใช้ลูกศรซ้ายขวาเพื่อเลื่อนรูป" @scroll.passive="sync" @keydown.left.self.prevent="move(-1)" @keydown.right.self.prevent="move(1)">
      <figure v-for="(photo, index) in photos" :key="index" class="w-full shrink-0 snap-start">
        <a :href="photo.url" target="_blank" rel="noopener noreferrer" class="block">
          <img :src="photo.url" :alt="photo.alt || photo.caption || 'ภาพประกอบข่าว ' + (index + 1)" :loading="cover && index === 0 ? 'eager' : 'lazy'" :fetchpriority="cover && index === 0 ? 'high' : undefined" class="w-full" :class="cover ? 'aspect-[2/1] object-cover' : 'aspect-[16/10] object-contain'">
        </a>
        <figcaption v-if="photo.caption" class="px-4 py-2 text-sm">{{ photo.caption }}</figcaption>
      </figure>
    </div>
    <div v-if="photos.length > 1" class="flex items-center justify-center gap-3 text-sm">
      <button type="button" aria-label="รูปก่อนหน้า" :disabled="current === 0" class="size-10 rounded-full border border-current/15 disabled:opacity-35" @click="move(-1)">←</button>
      <span aria-live="polite">{{ current + 1 }} / {{ photos.length }}</span>
      <button type="button" aria-label="รูปถัดไป" :disabled="current >= photos.length - 1" class="size-10 rounded-full border border-current/15 disabled:opacity-35" @click="move(1)">→</button>
    </div>
  </div>
</template>
