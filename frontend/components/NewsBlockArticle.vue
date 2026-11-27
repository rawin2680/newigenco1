<script setup lang="ts">
import { inlineNewsText, safeNewsUrl, type NewsBlock } from '~/shared/newsBlocks'

defineProps<{ blocks: NewsBlock[] }>()
const strapiUrl = useRuntimeConfig().public.strapiUrl as string
const mediaUrl = (value: string) => safeNewsUrl(value.startsWith('/uploads/') ? strapiUrl + value : value)
</script>

<template>
  <div class="space-y-6 break-words">

    <template v-for="(block, bIndex) in blocks" :key="block.id">
      <div v-if="block.visible">
        <component
          :is="block.data.level === 'h3' ? 'h3' : 'h2'"
          v-if="block.type === 'heading' && block.data.title.trim()"
          class="border-l-4 border-[#00c864] pl-3.5 text-2xl sm:text-3xl font-extrabold leading-snug text-[#00994C] dark:text-[#00FF88]"
          :class="bIndex > 0 ? 'mt-2' : ''"
        >{{ block.data.title }}</component>
        <div v-else-if="block.type === 'paragraph' && block.data.text.trim()" class="space-y-3.5 pl-3.5 text-base sm:text-lg leading-[1.85] text-black dark:text-slate-100">
          <template v-for="(group, index) in block.data.text.split(/\n\s*\n/)" :key="index">
            <ul v-if="group.split('\n').every(line => line.trim().startsWith('- '))" class="list-disc space-y-1.5 pl-6">
              <li v-for="(line, i) in group.split('\n')" :key="i"><component :is="part.tag" v-for="(part, j) in inlineNewsText(line.trim().slice(2))" :key="j" :href="part.href" :class="part.href ? 'underline' : undefined">{{ part.text }}</component></li>
            </ul>
            <p v-else class="whitespace-pre-wrap"><component :is="part.tag" v-for="(part, j) in inlineNewsText(group)" :key="j" :href="part.href" :class="part.href ? 'underline' : undefined">{{ part.text }}</component></p>
          </template>
        </div>
        <NewsPhotoGallery v-else-if="block.type === 'gallery' || block.type === 'image'" :photos="block.data.media.map(photo => ({ ...photo, url: mediaUrl(photo.url) })).filter(photo => photo.url)" />
      </div>
    </template>
  </div>
</template>
