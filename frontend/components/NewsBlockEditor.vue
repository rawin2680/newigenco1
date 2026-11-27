<script setup lang="ts">
import { blankBlock, blankMedia, type NewsBlock } from '~/shared/newsBlocks'
import { uploadNewsPhotos } from '~/shared/uploadNewsPhotos'
import { resolveNewsImage } from '~/composables/useNews'

const blocks = defineModel<NewsBlock[]>({ required: true })
const emit = defineEmits<{ busy: [boolean] }>()
const strapiUrl = useRuntimeConfig().public.strapiUrl as string
const uploading = ref(false)
const error = ref('')
const editor = ref<HTMLElement | null>(null)
const dragged = ref<NewsBlock | null>(null)
let scrollArea: HTMLElement | null = null
let pointerId: number | null = null
let pointerX = 0
let pointerY = 0
const target = ref<{ block: NewsBlock; after: boolean } | null>(null)
const types = { heading: 'หัวข้อ', paragraph: 'หัวข้อย่อย', gallery: 'รูปภาพ', image: 'รูปภาพ' } as const
type EditableType = keyof typeof types
const editable = computed(() => blocks.value.filter(block => Object.hasOwn(types, block.type)))
const field = 'w-full rounded-xl border border-current/15 bg-transparent px-3 py-2 text-sm'
const button = 'rounded-lg border border-current/15 px-3 py-2 text-xs font-bold disabled:opacity-40'

function add(type: EditableType, parent?: NewsBlock) {
  const block = blankBlock(type)
  let position = blocks.value.length
  if (parent) {
    const start = blocks.value.indexOf(parent)
    const next = blocks.value.findIndex((item, index) => index > start && item.visible && item.type === 'heading')
    if (next >= 0) position = next
  }
  blocks.value.splice(position, 0, block)
  if (type !== 'gallery') {
    nextTick(() => document.getElementById('news-edit-' + block.id)?.focus())
  }
}

function move(block: NewsBlock, direction: number) {
  const neighbor = editable.value[editable.value.indexOf(block) + direction]
  if (!neighbor) return
  const from = blocks.value.indexOf(block)
  const to = blocks.value.indexOf(neighbor)
  blocks.value.splice(from, 1)
  blocks.value.splice(to, 0, block)
}

function markDrop() {
  target.value = null
  if (!dragged.value || !editor.value) return
  const hit = document.elementFromPoint(pointerX, pointerY)
  const card = hit?.closest<HTMLElement>('[data-news-block]')
  if (!card || !editor.value.contains(card)) return
  const block = editable.value.find(item => item.id === card.dataset.newsBlock)
  if (!block || block === dragged.value) return
  const rect = card.getBoundingClientRect()
  target.value = { block, after: pointerY >= rect.top + rect.height / 2 }
}

function scrollWhileDragging(event: WheelEvent) {
  if (!scrollArea || event.ctrlKey || !event.deltaY) return
  event.preventDefault()
  const scale = event.deltaMode === 1 ? 16 : event.deltaMode === 2 ? scrollArea.clientHeight : 1
  scrollArea.scrollTop += event.deltaY * scale
  markDrop()
}

function startDrag(event: PointerEvent, block: NewsBlock) {
  if (uploading.value || pointerId !== null || event.button !== 0) return
  const handle = event.currentTarget as HTMLElement
  event.preventDefault()
  handle.setPointerCapture(event.pointerId)
  pointerId = event.pointerId
  dragged.value = block
  scrollArea = handle.closest<HTMLElement>('[data-news-editor-scroll]')
  scrollArea?.addEventListener('scroll', markDrop, { passive: true })
  window.addEventListener('wheel', scrollWhileDragging, { passive: false, capture: true })
  moveDrag(event)
}

function moveDrag(event: PointerEvent) {
  if (event.pointerId !== pointerId) return
  pointerX = event.clientX
  pointerY = event.clientY
  markDrop()
}

function endDrag() {
  if (pointerId === null) return
  scrollArea?.removeEventListener('scroll', markDrop)
  window.removeEventListener('wheel', scrollWhileDragging, true)
  scrollArea = null
  pointerId = null
  dragged.value = null
  target.value = null
}

function dropBlock(event: PointerEvent) {
  if (event.pointerId !== pointerId) return
  moveDrag(event)
  if (dragged.value && target.value) {
    const from = blocks.value.indexOf(dragged.value)
    const reference = blocks.value.indexOf(target.value.block)
    if (from >= 0 && reference >= 0) {
      const insertion = reference + Number(target.value.after)
      const [item] = blocks.value.splice(from, 1)
      if (item) blocks.value.splice(insertion - Number(from < insertion), 0, item)
    }
  }
  endDrag()
}

onBeforeUnmount(endDrag)

function remove(block: NewsBlock) {
  if (window.confirm('ลบบล็อกนี้ออกจากข่าวหรือไม่?')) blocks.value.splice(blocks.value.indexOf(block), 1)
}

async function addPhotos(event: Event, block: NewsBlock) {
  const input = event.target as HTMLInputElement
  const files = Array.from(input.files || [])
  input.value = ''
  if (!files.length || uploading.value) return
  uploading.value = true
  emit('busy', true)
  error.value = ''
  try {
    const failed = await uploadNewsPhotos(files, photo => {
      block.type = 'gallery'
      block.data.media = block.data.media.filter(media => media.url)
      block.data.media.push({ ...blankMedia(), ...photo })
    })
    if (failed) error.value = 'อัปโหลดไม่สำเร็จ ' + failed + ' รูป กรุณาตรวจชนิดและขนาดไฟล์'
  } finally {
    uploading.value = false
    emit('busy', false)
  }
}
</script>

<template>
  <div ref="editor" class="space-y-4">
    <div class="flex flex-wrap gap-2">
      <button type="button" class="rounded-xl bg-emerald-700 px-4 py-2.5 text-sm font-bold text-white" @click="add('heading')">+ เพิ่มหัวข้อ</button>
      <button v-if="!editable.some(block => block.type === 'heading')" type="button" :class="button" @click="add('paragraph')">+ เพิ่มหัวข้อย่อย</button>
      <button type="button" :class="button" @click="add('gallery')">+ เพิ่มรูปภาพ</button>
    </div>
    <p v-if="!editable.length" class="text-sm opacity-75">กดเพิ่มหัวข้อเพื่อเริ่มเขียนข่าว</p>
    <p v-if="error" role="alert" class="text-sm text-red-600">{{ error }}</p>
    <fieldset v-for="(block, index) in editable" :key="block.id" class="relative space-y-3 rounded-xl border border-current/15 p-3"
      :class="{ 'ml-3 sm:ml-6': block.type === 'paragraph', 'opacity-50': dragged === block }"
      :data-news-block="block.id">
      <legend class="px-1 text-sm font-bold" :class="block.type === 'heading' && 'text-emerald-700 dark:text-emerald-300'">{{ types[block.type as EditableType] }}</legend>
      <div v-if="target?.block === block" class="pointer-events-none absolute inset-x-0 z-10 flex items-center"
        :class="target.after ? '-bottom-1' : '-top-1'">
        <span class="h-0.5 flex-1 bg-emerald-600"></span>
        <span class="rounded-full bg-emerald-700 px-2 py-0.5 text-[10px] font-bold text-white">{{ target.after ? 'วางด้านล่าง' : 'วางด้านบน' }}</span>
      </div>
      <input v-if="block.type === 'heading'" :id="'news-edit-' + block.id" v-model="block.data.title" :class="field" maxlength="200" aria-label="ชื่อหัวข้อ" placeholder="พิมพ์ชื่อหัวข้อ">
      <template v-else-if="block.type === 'paragraph'">
        <textarea :id="'news-edit-' + block.id" v-model="block.data.text" :class="field" rows="4" maxlength="20000" aria-label="ข้อความ" placeholder="พิมพ์ข้อความหรือข้อย่อย" />
        <p class="text-xs opacity-70">ใช้ **ตัวหนา** · *ตัวเอียง* · ขึ้นต้นบรรทัดด้วย - สำหรับข้อย่อย</p>
      </template>
      <template v-else>
        <label class="inline-flex cursor-pointer rounded-lg bg-emerald-500/15 px-3 py-2 text-xs font-bold">
          {{ uploading ? 'กำลังอัปโหลด…' : 'เลือกรูปจากเครื่อง' }}
          <input type="file" multiple accept="image/jpeg,image/png,image/webp,image/gif" class="sr-only" :disabled="uploading" @change="addPhotos($event, block)">
        </label>
        <div class="flex flex-wrap gap-2">
          <template v-for="(photo, i) in block.data.media" :key="i">
            <div v-if="photo.url" class="relative">
              <img :src="resolveNewsImage(photo.url, strapiUrl)" alt="" class="h-16 w-20 rounded-lg object-cover">
              <button type="button" :disabled="uploading" :aria-label="'ลบรูป ' + (i + 1)" class="absolute right-0 top-0 rounded-full bg-black/75 px-2 text-white" @click="block.data.media.splice(i, 1)">×</button>
            </div>
          </template>
        </div>
      </template>
      <div class="flex flex-wrap gap-2">
        <span class="touch-none cursor-grab select-none rounded-lg border border-current/15 px-3 py-1.5 text-sm active:cursor-grabbing"
          title="กดค้าง ลาก และหมุนลูกกลิ้งเพื่อเลื่อนฟอร์ม"
          @pointerdown="startDrag($event, block)" @pointermove="moveDrag" @pointerup="dropBlock"
          @pointercancel="endDrag" @lostpointercapture="endDrag">⠿ ลากย้าย</span>
        <button v-if="block.type === 'heading'" type="button" :class="button" class="mr-auto text-emerald-700 dark:text-emerald-300" @click="add('paragraph', block)">+ เพิ่มหัวข้อย่อย</button>
        <button type="button" :class="button" :disabled="index === 0 || uploading" aria-label="เลื่อนขึ้น" @click="move(block, -1)">↑</button>
        <button type="button" :class="button" :disabled="index === editable.length - 1 || uploading" aria-label="เลื่อนลง" @click="move(block, 1)">↓</button>
        <button type="button" :class="button" :disabled="uploading" class="text-red-600" @click="remove(block)">ลบบล็อก</button>
      </div>
    </fieldset>
  </div>
</template>
