<script setup lang="ts">
import { inlineNewsText, safeNewsUrl, type NewsBlock } from '~/shared/newsBlocks'

defineProps<{ blocks: NewsBlock[] }>()
const strapiUrl = useRuntimeConfig().public.strapiUrl as string
const mediaUrl = (value: string) => safeNewsUrl(value.startsWith('/uploads/') ? strapiUrl + value : value)
</script>

<template>
  <div class="space-y-5 break-words">

    <template v-for="block in blocks" :key="block.id">
      <div v-if="block.visible">
        <component :is="block.data.level === 'h3' ? 'h3' : 'h2'" v-if="block.type === 'heading' && block.data.title.trim()" class="border-l-4 border-[#00c864] pl-3 text-xl font-extrabold text-emerald-700 dark:text-emerald-300">{{ block.data.title }}</component>
        <div v-else-if="block.type === 'paragraph' && block.data.text.trim()" class="space-y-2 pl-3 leading-relaxed text-black dark:text-slate-100">
          <template v-for="(group, index) in block.data.text.split(/\n\s*\n/)" :key="index">
            <ul v-if="group.split('\n').every(line => line.startsWith('- '))" class="list-disc space-y-1 pl-6">
              <li v-for="(line, i) in group.split('\n')" :key="i"><component :is="part.tag" v-for="(part, j) in inlineNewsText(line.slice(2))" :key="j" :href="part.href" :class="part.href ? 'underline' : undefined">{{ part.text }}</component></li>
            </ul>
            <p v-else class="whitespace-pre-line"><component :is="part.tag" v-for="(part, j) in inlineNewsText(group)" :key="j" :href="part.href" :class="part.href ? 'underline' : undefined">{{ part.text }}</component></p>
          </template>
        </div>
        <NewsPhotoGallery v-else-if="block.type === 'gallery'" :photos="block.data.media.map(photo => ({ ...photo, url: mediaUrl(photo.url) })).filter(photo => photo.url)" />
        <div v-else-if="block.type === 'image'">
          <figure v-for="(media, i) in block.data.media" :key="i" class="min-w-0 overflow-hidden rounded-2xl border border-current/10">
            <a v-if="mediaUrl(media.url)" :href="mediaUrl(media.url)" target="_blank" rel="noopener noreferrer" class="block"><img :src="mediaUrl(media.url)" :alt="media.alt" loading="lazy" class="max-h-[38rem] w-full object-contain"></a>
            <figcaption v-if="media.caption" class="p-3 text-sm opacity-80">{{ media.caption }}</figcaption>
          </figure>
        </div>
      </div>
    </template>
  </div>
</template>
