<script setup lang="ts">
import { ChevronLeft, ChevronRight } from 'lucide-vue-next'

const props = defineProps<{ photos: { url: string; alt: string; caption: string }[]; cover?: boolean }>()
const current = ref(0)

watch(() => props.photos.length, (len) => {
  if (current.value >= len) current.value = Math.max(0, len - 1)
})

function move(offset: number) {
  if (props.photos.length <= 1) return
  current.value = (current.value + offset + props.photos.length) % props.photos.length
}
</script>

<template>
  <div
    v-if="photos.length"
    class="space-y-2"
    role="region"
    aria-label="แกลเลอรีภาพข่าว"
    tabindex="0"
    @keydown.left.prevent="move(-1)"
    @keydown.right.prevent="move(1)"
  >
    <div class="relative overflow-hidden rounded-2xl bg-current/5">
      <div
        class="flex transition-transform duration-300 ease-out"
        :style="{ transform: `translateX(-${current * 100}%)` }"
      >
        <figure v-for="(photo, index) in photos" :key="index" class="w-full shrink-0">
          <a :href="photo.url" target="_blank" rel="noopener noreferrer" class="block">
            <img
              :src="photo.url"
              :alt="photo.alt || photo.caption || 'ภาพประกอบข่าว ' + (index + 1)"
              :loading="cover && index === 0 ? 'eager' : 'lazy'"
              :fetchpriority="cover && index === 0 ? 'high' : undefined"
              class="w-full"
              :class="cover ? 'aspect-[2/1] object-cover' : 'aspect-[16/10] object-contain'"
            >
          </a>
          <figcaption v-if="photo.caption" class="px-4 py-2 text-sm text-center opacity-80">{{ photo.caption }}</figcaption>
        </figure>
      </div>

      <!-- ปุ่มกดซ้าย-ขวาบนรูปภาพ -->
      <template v-if="photos.length > 1">
        <button
          type="button"
          aria-label="รูปก่อนหน้า"
          class="absolute left-3 top-1/2 -translate-y-1/2 z-10 flex size-10 sm:size-11 items-center justify-center rounded-full bg-black/55 text-white backdrop-blur-sm border border-white/20 shadow-lg hover:bg-black/75 transition-all cursor-pointer"
          @click.stop.prevent="move(-1)"
        >
          <ChevronLeft class="size-5 sm:size-6" />
        </button>
        <button
          type="button"
          aria-label="รูปถัดไป"
          class="absolute right-3 top-1/2 -translate-y-1/2 z-10 flex size-10 sm:size-11 items-center justify-center rounded-full bg-black/55 text-white backdrop-blur-sm border border-white/20 shadow-lg hover:bg-black/75 transition-all cursor-pointer"
          @click.stop.prevent="move(1)"
        >
          <ChevronRight class="size-5 sm:size-6" />
        </button>
        <div
          aria-live="polite"
          class="pointer-events-none absolute bottom-3 right-3 z-10 rounded-full bg-black/60 px-3 py-1 text-xs font-bold text-white backdrop-blur-sm"
        >
          {{ current + 1 }} / {{ photos.length }}
        </div>
      </template>
    </div>
  </div>
</template>
