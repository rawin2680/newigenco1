<script setup lang="ts">
import { blankMedia } from '~/shared/newsBlocks'
import { uploadNewsPhotos } from '~/shared/uploadNewsPhotos'
import { resolveNewsImage } from '~/composables/useNews'
import {
  blankEntry, blankProductSection, productSectionFields, productSectionTypes,
  type ProductEntry, type ProductSection, type ProductSectionType
} from '~/shared/productBlocks'

const sections = defineModel<ProductSection[]>({ required: true })
const emit = defineEmits<{ busy: [boolean] }>()
const strapiUrl = useRuntimeConfig().public.strapiUrl as string
const uploading = ref(false)
const error = ref('')
const editor = ref<HTMLElement | null>(null)
const dragged = ref<ProductSection | null>(null)
const target = ref<{ section: ProductSection; after: boolean } | null>(null)
const newType = ref<ProductSectionType>('overview')
let scrollArea: HTMLElement | null = null
let pointerId: number | null = null
let pointerX = 0
let pointerY = 0
const field = 'w-full rounded-xl border border-current/15 bg-white dark:bg-black/50 px-3 py-2 text-sm'
const button = 'rounded-lg border border-current/15 px-3 py-2 text-xs font-bold disabled:opacity-40 cursor-pointer hover:bg-current/5'
const config = (section: ProductSection) => productSectionFields[section.type]
const imageSrc = (url: string) => resolveNewsImage(url, strapiUrl)

function add(type: ProductSectionType) {
  const section = blankProductSection(type)
  // ส่วนหัวควรอยู่บนสุดเสมอ ส่วนอื่นต่อท้าย
  if (type === 'hero') sections.value.unshift(section)
  else sections.value.push(section)
  nextTick(() => document.getElementById('product-section-' + section.id)?.scrollIntoView({ block: 'nearest' }))
}

function move(section: ProductSection, direction: -1 | 1) {
  const from = sections.value.indexOf(section)
  const to = from + direction
  if (from < 0 || to < 0 || to >= sections.value.length) return
  ;[sections.value[from], sections.value[to]] = [sections.value[to]!, sections.value[from]!]
}

function remove(section: ProductSection) {
  const index = sections.value.indexOf(section)
  if (index >= 0 && confirm('ลบส่วน "' + productSectionTypes[section.type] + '" ?')) sections.value.splice(index, 1)
}

function moveInList<T>(list: T[], index: number, direction: -1 | 1) {
  const to = index + direction
  if (to < 0 || to >= list.length) return
  ;[list[index], list[to]] = [list[to]!, list[index]!]
}

// ---- ลากย้ายส่วน (กดค้างที่ปุ่ม ⠿ แล้วลาก) ใช้วิธีเดียวกับตัวแก้ข่าว ----
function markDrop() {
  target.value = null
  if (!dragged.value || !editor.value) return
  const card = document.elementFromPoint(pointerX, pointerY)?.closest<HTMLElement>('[data-product-section]')
  if (!card || !editor.value.contains(card)) return
  const section = sections.value.find(item => item.id === card.dataset.productSection)
  if (!section || section === dragged.value) return
  const rect = card.getBoundingClientRect()
  target.value = { section, after: pointerY >= rect.top + rect.height / 2 }
}
function scrollWhileDragging(event: WheelEvent) {
  if (!scrollArea || event.ctrlKey || !event.deltaY) return
  event.preventDefault()
  scrollArea.scrollTop += event.deltaY * (event.deltaMode === 1 ? 16 : event.deltaMode === 2 ? scrollArea.clientHeight : 1)
  markDrop()
}
function startDrag(event: PointerEvent, section: ProductSection) {
  if (uploading.value || pointerId !== null || event.button !== 0) return
  const handle = event.currentTarget as HTMLElement
  event.preventDefault()
  handle.setPointerCapture(event.pointerId)
  pointerId = event.pointerId
  dragged.value = section
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
function dropSection(event: PointerEvent) {
  if (event.pointerId !== pointerId) return
  moveDrag(event)
  if (dragged.value && target.value) {
    const from = sections.value.indexOf(dragged.value)
    const reference = sections.value.indexOf(target.value.section)
    if (from >= 0 && reference >= 0) {
      const insertion = reference + Number(target.value.after)
      const [item] = sections.value.splice(from, 1)
      if (item) sections.value.splice(insertion - Number(from < insertion), 0, item)
    }
  }
  endDrag()
}
onBeforeUnmount(endDrag)

// ---- อัปโหลดไฟล์ (ใช้ตัวอัปโหลดเดียวกับข่าว: ตรวจชนิดและขนาดไฟล์ที่เซิร์ฟเวอร์) ----
async function withUpload(task: () => Promise<number>) {
  if (uploading.value) return
  uploading.value = true
  emit('busy', true)
  error.value = ''
  try {
    const failed = await task()
    if (failed) error.value = 'อัปโหลดไม่สำเร็จ ' + failed + ' ไฟล์ กรุณาตรวจชนิดและขนาดไฟล์'
  } finally {
    uploading.value = false
    emit('busy', false)
  }
}
function pickedFiles(event: Event) {
  const input = event.target as HTMLInputElement
  const files = Array.from(input.files || [])
  input.value = ''
  return files
}
function addPhotos(event: Event, section: ProductSection, single = false) {
  const files = pickedFiles(event)
  if (!files.length) return
  withUpload(() => uploadNewsPhotos(single ? files.slice(0, 1) : files, photo => {
    if (single) section.data.media = [{ ...blankMedia(), ...photo }]
    else section.data.media.push({ ...blankMedia(), ...photo })
  }))
}
function setEntryImage(event: Event, entry: ProductEntry) {
  const files = pickedFiles(event)
  if (!files.length) return
  withUpload(() => uploadNewsPhotos(files.slice(0, 1), photo => { entry.image = photo.url }))
}
function setEntryFile(event: Event, entry: ProductEntry) {
  const files = pickedFiles(event)
  if (!files.length) return
  withUpload(async () => {
    const body = new FormData()
    body.append('files', files[0]!)
    try {
      const file = await $fetch<{ url: string }>('/api/admin/news/upload', { method: 'POST', query: { kind: 'file' }, body })
      entry.url = file.url
      if (!entry.title) entry.title = files[0]!.name.replace(/\.[^.]+$/, '')
      return 0
    } catch {
      return 1
    }
  })
}
</script>

<template>
  <div ref="editor" class="space-y-4">
    <div class="flex flex-wrap items-center gap-2">
      <select v-model="newType" :class="field" class="!w-auto" aria-label="ชนิดส่วนที่จะเพิ่ม">
        <option v-for="(label, type) in productSectionTypes" :key="type" :value="type">{{ label }}</option>
      </select>
      <button type="button" class="rounded-xl bg-emerald-700 px-4 py-2.5 text-sm font-bold text-white hover:bg-emerald-800 transition-colors cursor-pointer" @click="add(newType)">+ เพิ่มส่วนนี้</button>
    </div>
    <p v-if="!sections.length" class="text-sm opacity-75">ยังไม่มีเนื้อหาหน้ารายละเอียด เลือกชนิดส่วนแล้วกด "เพิ่มส่วนนี้" (แนะนำเริ่มจาก ส่วนหัวสินค้า) ถ้าไม่ใส่เลย หน้าเว็บจะใช้หน้าที่ทำไว้เดิม</p>
    <p v-if="error" role="alert" class="text-sm text-red-600">{{ error }}</p>

    <fieldset v-for="(section, index) in sections" :id="'product-section-' + section.id" :key="section.id"
      class="relative space-y-3 rounded-xl border border-current/15 p-3" :class="{ 'opacity-50': dragged === section, 'opacity-60': !section.visible }"
      :data-product-section="section.id">
      <legend class="px-1 text-sm font-bold text-emerald-700 dark:text-emerald-300">{{ index + 1 }}. {{ productSectionTypes[section.type] }}</legend>
      <div v-if="target?.section === section" class="pointer-events-none absolute inset-x-0 z-10 flex items-center" :class="target.after ? '-bottom-1' : '-top-1'">
        <span class="h-0.5 flex-1 bg-emerald-600"></span>
        <span class="rounded-full bg-emerald-700 px-2 py-0.5 text-[10px] font-bold text-white">{{ target.after ? 'วางด้านล่าง' : 'วางด้านบน' }}</span>
      </div>
      <p class="text-[11px] opacity-60">{{ config(section).hint }}</p>

      <div class="grid gap-3 sm:grid-cols-2">
        <label v-if="config(section).fields.title" class="block text-xs font-bold sm:col-span-2">{{ config(section).fields.title }}
          <input v-model="section.data.title" :class="field" class="mt-1" maxlength="300">
        </label>
        <label v-if="config(section).fields.subtitle" class="block text-xs font-bold">{{ config(section).fields.subtitle }}
          <input v-model="section.data.subtitle" :class="field" class="mt-1" maxlength="300">
        </label>
        <label v-if="config(section).fields.label" class="block text-xs font-bold">{{ config(section).fields.label }}
          <input v-model="section.data.label" :class="field" class="mt-1" maxlength="300">
        </label>
        <label v-if="config(section).fields.text" class="block text-xs font-bold sm:col-span-2">{{ config(section).fields.text }}
          <textarea v-model="section.data.text" :class="field" class="mt-1" :rows="section.type === 'hero' || section.type === 'overview' ? 5 : 2" maxlength="20000" />
        </label>
        <label v-if="config(section).fields.url" class="block text-xs font-bold sm:col-span-2">{{ config(section).fields.url }}
          <input v-model="section.data.url" :class="field" class="mt-1" maxlength="2000" placeholder="https://www.youtube.com/watch?v=...">
        </label>
        <label v-if="config(section).fields.accent" class="flex items-center gap-2 text-xs font-bold">
          <input :value="/^#[0-9a-f]{6}$/i.test(section.data.accent) ? section.data.accent : '#00a854'" type="color" class="h-9 w-12 cursor-pointer rounded border border-current/15" @input="section.data.accent = ($event.target as HTMLInputElement).value">
          <span class="flex-1">{{ config(section).fields.accent }}<input v-model="section.data.accent" :class="field" class="mt-1" maxlength="9" placeholder="#00A854"></span>
        </label>
      </div>

      <!-- รูปภาพของส่วน -->
      <div v-if="config(section).fields.media" class="space-y-2">
        <div class="flex flex-wrap items-center gap-2">
          <span class="text-xs font-bold">{{ config(section).fields.media }}</span>
          <label class="inline-flex cursor-pointer rounded-lg bg-emerald-500/15 hover:bg-emerald-500/25 px-3 py-2 text-xs font-bold transition-colors">
            {{ uploading ? 'กำลังอัปโหลด…' : section.type === 'gallery' ? '+ เลือกรูปภาพ (หลายรูป)' : '+ เลือกรูปภาพ' }}
            <input type="file" :multiple="section.type === 'gallery'" accept="image/jpeg,image/png,image/webp,image/gif" class="sr-only" :disabled="uploading" @change="addPhotos($event, section, section.type !== 'gallery')">
          </label>
          <button v-if="section.type !== 'gallery' && !section.data.media.length" type="button" :class="button" @click="section.data.media.push(blankMedia())">หรือใส่ที่อยู่รูป</button>
        </div>
        <div v-for="(photo, i) in section.data.media" :key="i" class="flex flex-wrap items-start gap-2 rounded-xl border border-current/10 p-2">
          <img v-if="photo.url" :src="imageSrc(photo.url)" alt="" class="h-16 w-24 rounded-lg object-cover">
          <div class="grid min-w-[12rem] flex-1 gap-1.5">
            <input v-model="photo.url" :class="field" placeholder="ที่อยู่รูป เช่น /images/products/xxx.png" maxlength="2000">
            <input v-model="photo.caption" :class="field" placeholder="คำบรรยายภาพ (ไม่บังคับ)" maxlength="500">
          </div>
          <div class="flex gap-1">
            <button type="button" :class="button" :disabled="i === 0" aria-label="เลื่อนรูปขึ้น" @click="moveInList(section.data.media, i, -1)">↑</button>
            <button type="button" :class="button" :disabled="i === section.data.media.length - 1" aria-label="เลื่อนรูปลง" @click="moveInList(section.data.media, i, 1)">↓</button>
            <button type="button" :class="button" class="text-red-600" aria-label="ลบรูป" @click="section.data.media.splice(i, 1)">×</button>
          </div>
        </div>
      </div>

      <!-- ปุ่ม -->
      <div v-if="config(section).fields.buttons" class="space-y-2">
        <span class="text-xs font-bold">{{ config(section).fields.buttons }}</span>
        <div v-for="(btn, i) in section.data.buttons" :key="i" class="flex flex-wrap items-center gap-2">
          <input v-model="btn.label" :class="field" class="!w-auto flex-1" placeholder="ข้อความบนปุ่ม" maxlength="120">
          <input v-model="btn.url" :class="field" class="!w-auto flex-1" placeholder="#product-contact, /contact, tel:+66..., https://..." maxlength="2000">
          <button type="button" :class="button" :disabled="i === 0" aria-label="เลื่อนปุ่มขึ้น" @click="moveInList(section.data.buttons, i, -1)">↑</button>
          <button type="button" :class="button" class="text-red-600" aria-label="ลบปุ่ม" @click="section.data.buttons.splice(i, 1)">×</button>
        </div>
        <button v-if="section.data.buttons.length < 4" type="button" :class="button" @click="section.data.buttons.push({ label: '', url: '' })">+ เพิ่มปุ่ม</button>
      </div>

      <!-- รายการ (โมดูล คุณสมบัติ ขั้นตอน ฯลฯ) -->
      <div v-if="config(section).fields.items" class="space-y-2">
        <span class="text-xs font-bold">{{ config(section).fields.items }} ({{ section.data.items.length }})</span>
        <div v-for="(entry, i) in section.data.items" :key="i" class="space-y-2 rounded-xl border border-current/10 bg-black/[0.02] dark:bg-white/[0.03] p-2.5">
          <div class="flex items-center justify-between gap-2">
            <span class="text-[11px] font-mono font-bold opacity-60">{{ config(section).entryName }} {{ i + 1 }}</span>
            <div class="flex gap-1">
              <button type="button" :class="button" :disabled="i === 0" aria-label="เลื่อนขึ้น" @click="moveInList(section.data.items, i, -1)">↑</button>
              <button type="button" :class="button" :disabled="i === section.data.items.length - 1" aria-label="เลื่อนลง" @click="moveInList(section.data.items, i, 1)">↓</button>
              <button type="button" :class="button" class="text-red-600" aria-label="ลบรายการ" @click="section.data.items.splice(i, 1)">×</button>
            </div>
          </div>
          <div class="grid gap-2 sm:grid-cols-2">
            <input v-if="config(section).entry?.title" v-model="entry.title" :class="field" :placeholder="config(section).entry!.title" maxlength="300">
            <input v-if="config(section).entry?.subtitle" v-model="entry.subtitle" :class="field" :placeholder="config(section).entry!.subtitle" maxlength="300">
            <textarea v-if="config(section).entry?.text" v-model="entry.text" :class="field" class="sm:col-span-2" rows="2" :placeholder="config(section).entry!.text" maxlength="5000" />
            <div v-if="config(section).entry?.image" class="flex items-center gap-2 sm:col-span-2">
              <img v-if="entry.image" :src="imageSrc(entry.image)" alt="" class="size-10 rounded-lg object-contain">
              <input v-model="entry.image" :class="field" class="flex-1" :placeholder="config(section).entry!.image" maxlength="2000">
              <label class="inline-flex shrink-0 cursor-pointer rounded-lg bg-emerald-500/15 hover:bg-emerald-500/25 px-3 py-2 text-xs font-bold">อัปโหลด
                <input type="file" accept="image/jpeg,image/png,image/webp,image/gif" class="sr-only" :disabled="uploading" @change="setEntryImage($event, entry)">
              </label>
            </div>
            <div v-if="config(section).entry?.url" class="flex items-center gap-2 sm:col-span-2">
              <input v-model="entry.url" :class="field" class="flex-1" :placeholder="config(section).entry!.url" maxlength="2000">
              <label v-if="section.type === 'downloads'" class="inline-flex shrink-0 cursor-pointer rounded-lg bg-emerald-500/15 hover:bg-emerald-500/25 px-3 py-2 text-xs font-bold">อัปโหลดไฟล์
                <input type="file" accept="application/pdf,.docx,.xlsx,.pptx" class="sr-only" :disabled="uploading" @change="setEntryFile($event, entry)">
              </label>
            </div>
          </div>
        </div>
        <button type="button" :class="button" @click="section.data.items.push(blankEntry())">+ เพิ่ม{{ config(section).entryName }}</button>
      </div>

      <div class="flex flex-wrap items-center gap-2 border-t border-current/10 pt-2">
        <span class="touch-none cursor-grab select-none rounded-lg border border-current/15 px-3 py-1.5 text-sm active:cursor-grabbing"
          title="กดค้าง ลาก และหมุนลูกกลิ้งเพื่อเลื่อนฟอร์ม"
          @pointerdown="startDrag($event, section)" @pointermove="moveDrag" @pointerup="dropSection"
          @pointercancel="endDrag" @lostpointercapture="endDrag">⠿ ลากย้าย</span>
        <label class="inline-flex items-center gap-1.5 text-xs font-bold">
          <input v-model="section.visible" type="checkbox" class="accent-emerald-600"> แสดงบนหน้าเว็บ
        </label>
        <div class="ml-auto flex items-center gap-1.5">
          <button type="button" :class="button" :disabled="index === 0 || uploading" aria-label="เลื่อนขึ้น" @click="move(section, -1)">↑ ขึ้น</button>
          <button type="button" :class="button" :disabled="index === sections.length - 1 || uploading" aria-label="เลื่อนลง" @click="move(section, 1)">↓ ลง</button>
          <button type="button" :class="button" :disabled="uploading" class="text-red-600 hover:bg-red-500/10" @click="remove(section)">ลบส่วน</button>
        </div>
      </div>
    </fieldset>
  </div>
</template>
