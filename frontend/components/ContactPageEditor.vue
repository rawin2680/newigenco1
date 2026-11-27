<script setup lang="ts">
import { Redo2, Undo2, Save, RefreshCw, ExternalLink } from 'lucide-vue-next'
import { mergeContactPage, isValidEmail, isValidPhone, type ContactPageContent } from '~/shared/contactPage'
import { notifyContentChanged } from '~/composables/useLiveRefresh'
import { isTypingElement, useUndoHistory } from '~/composables/useUndoHistory'
import { useTheme } from '~/composables/useTheme'

// แก้ไขหน้าติดต่อเรา (/contact) — ข้อมูลเบอร์โทร ที่อยู่ และแผนที่ ใช้ร่วมกับหน้า /contact/location และส่วนท้ายเว็บ
const { showToast } = useTheme()
const form = ref<ContactPageContent>(mergeContactPage(null))
const loading = ref(true)
const saving = ref(false)
const loadError = ref('')
const saveError = ref('')
const savedFromStrapi = ref(false)
const { canUndo, canRedo, undo, redo, reset, isDirty } = useUndoHistory(form)
const field = 'w-full px-3.5 py-2.5 rounded-xl bg-white dark:bg-black/50 border border-current/15 text-sm'
const small = 'rounded-lg border border-current/15 px-2.5 py-1.5 text-xs font-bold disabled:opacity-30 cursor-pointer hover:bg-current/5'

async function load() {
  loading.value = true
  loadError.value = ''
  try {
    const res = await $fetch<{ data: unknown }>('/api/admin/contact-page')
    savedFromStrapi.value = Boolean(res?.data)
    // ยังไม่เคยบันทึก = เริ่มจากข้อความเดิมของหน้าเว็บ
    form.value = mergeContactPage(res?.data)
  } catch (err: any) {
    loadError.value = 'โหลดข้อมูลไม่สำเร็จ: ' + (err?.data?.statusMessage || err?.statusMessage || 'เชื่อมต่อเซิร์ฟเวอร์ไม่ได้')
    form.value = mergeContactPage(null)
  } finally {
    loading.value = false
    await nextTick()
    reset()
  }
}

function moveItem<T>(list: T[], index: number, direction: -1 | 1) {
  const to = index + direction
  if (to < 0 || to >= list.length) return
  ;[list[index], list[to]] = [list[to]!, list[index]!]
}

const problems = computed(() => {
  const list: string[] = []
  form.value.phones.forEach((p, i) => { if (p.number.trim() && !isValidPhone(p.number)) list.push(`เบอร์โทรที่ ${i + 1} ไม่ถูกต้อง`) })
  form.value.emails.forEach((e, i) => { if (e.address.trim() && !isValidEmail(e.address)) list.push(`อีเมลที่ ${i + 1} ไม่ถูกต้อง`) })
  for (const key of ['mapUrl', 'directionsUrl'] as const) {
    if (form.value[key].trim() && !/^https?:\/\//.test(form.value[key].trim())) list.push('ลิงก์แผนที่ต้องขึ้นต้นด้วย https://')
  }
  return list
})

async function save() {
  saveError.value = ''
  if (problems.value.length) {
    saveError.value = problems.value.join(' · ')
    return
  }
  saving.value = true
  try {
    const body = {
      ...form.value,
      phones: form.value.phones.filter(p => p.number.trim()),
      emails: form.value.emails.filter(e => e.address.trim()),
      trustBadges: form.value.trustBadges.filter(t => t.trim()),
      topicOptions: form.value.topicOptions.filter(t => t.trim())
    }
    await $fetch('/api/admin/contact-page', { method: 'PUT', body })
    savedFromStrapi.value = true
    showToast('บันทึกหน้าติดต่อเราเรียบร้อยแล้ว หน้าเว็บจะอัปเดตทันที')
    notifyContentChanged('api::contact-page.contact-page')
    reset()
  } catch (err: any) {
    saveError.value = 'บันทึกไม่สำเร็จ: ' + (err?.data?.statusMessage || err?.data?.message || err?.statusMessage || 'เกิดข้อผิดพลาด')
  } finally {
    saving.value = false
  }
}

// คีย์ลัดย้อนกลับ/ทำซ้ำ (เหมือนหน้าต่างแก้ข่าว/สินค้า: ในช่องข้อความใช้การย้อนกลับของเบราว์เซอร์)
function onKeydown(event: KeyboardEvent) {
  if (!(event.metaKey || event.ctrlKey) || event.altKey || document.querySelector('[role="alertdialog"]')) return
  const key = event.key.toLowerCase()
  const wantsUndo = key === 'z' && !event.shiftKey
  const wantsRedo = (key === 'z' && event.shiftKey) || (key === 'y' && event.ctrlKey && !event.metaKey)
  if (key === 's') {
    event.preventDefault()
    if (!saving.value) save()
    return
  }
  if (!wantsUndo && !wantsRedo) return
  const focused = document.activeElement
  if (isTypingElement(focused) && focused.type !== 'color') return
  event.preventDefault()
  ;(wantsUndo ? undo : redo)()
}
function onBeforeUnload(event: BeforeUnloadEvent) {
  if (isDirty()) event.preventDefault()
}
onMounted(() => {
  load()
  window.addEventListener('keydown', onKeydown)
  window.addEventListener('beforeunload', onBeforeUnload)
})
onBeforeUnmount(() => {
  window.removeEventListener('keydown', onKeydown)
  window.removeEventListener('beforeunload', onBeforeUnload)
})

defineExpose({ isDirty })
</script>

<template>
  <div class="space-y-5">
    <!-- แถบเครื่องมือ -->
    <div class="sticky top-2 z-20 flex flex-wrap items-center gap-2 rounded-2xl spatial-glass border border-current/10 p-3 shadow-sm">
      <button type="button" class="p-2 rounded-xl bg-black/5 dark:bg-white/10 cursor-pointer disabled:opacity-30 disabled:cursor-not-allowed" :disabled="!canUndo" title="ย้อนกลับ (Ctrl/⌘ + Z)" aria-label="ย้อนกลับ" @click="undo"><Undo2 class="w-4 h-4" /></button>
      <button type="button" class="p-2 rounded-xl bg-black/5 dark:bg-white/10 cursor-pointer disabled:opacity-30 disabled:cursor-not-allowed" :disabled="!canRedo" title="ทำซ้ำ (Ctrl/⌘ + Shift + Z หรือ Ctrl + Y)" aria-label="ทำซ้ำ" @click="redo"><Redo2 class="w-4 h-4" /></button>
      <button type="button" class="p-2 rounded-xl bg-black/5 dark:bg-white/10 cursor-pointer" title="โหลดข้อมูลล่าสุด" aria-label="โหลดข้อมูลล่าสุด" :disabled="loading || saving" @click="load"><RefreshCw class="w-4 h-4" :class="loading && 'animate-spin'" /></button>
      <a href="/contact" target="_blank" rel="noopener" class="inline-flex items-center gap-1.5 rounded-xl border border-current/15 px-3 py-2 text-xs font-bold hover:bg-current/5"><ExternalLink class="w-3.5 h-3.5" />ดูหน้าเว็บ</a>
      <span class="text-xs opacity-60">{{ loading ? 'กำลังโหลด…' : savedFromStrapi ? 'แสดงข้อมูลที่บันทึกไว้ใน Strapi' : 'ยังไม่เคยบันทึก: แสดงข้อความเดิมของหน้าเว็บ' }}</span>
      <button type="button" :disabled="saving || loading" class="ml-auto inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#00C864] text-[#022C22] font-bold text-xs cursor-pointer shadow-md disabled:opacity-50" title="บันทึก (Ctrl/⌘ + S)" @click="save">
        <Save class="w-4 h-4" />{{ saving ? 'กำลังบันทึก...' : 'บันทึกและเผยแพร่' }}
      </button>
    </div>

    <p v-if="loadError" role="alert" class="rounded-xl bg-amber-500/10 border border-amber-500/30 px-3.5 py-2 text-xs font-bold text-amber-700 dark:text-amber-300">{{ loadError }}</p>
    <p v-if="saveError" role="alert" class="rounded-xl bg-red-500/10 border border-red-500/30 px-3.5 py-2 text-xs font-bold text-red-600 dark:text-red-400">{{ saveError }}</p>

    <fieldset :disabled="loading" class="grid gap-5 xl:grid-cols-12">
      <div class="space-y-5 xl:col-span-5">
        <!-- 1. หัวเรื่องหน้า -->
        <section class="space-y-3 rounded-2xl border border-current/10 bg-black/[0.015] dark:bg-white/[0.02] p-4 sm:p-5">
          <h3 class="text-sm font-extrabold text-[#00A854] dark:text-[#00FF88]">1. หัวเรื่องหน้า</h3>
          <label class="block text-xs font-bold">ป้ายเล็กด้านบน<input v-model="form.badge" :class="field" class="mt-1" maxlength="500"></label>
          <div class="grid gap-3 sm:grid-cols-2">
            <label class="block text-xs font-bold">หัวข้อ (ส่วนแรก)<input v-model="form.headingMain" :class="field" class="mt-1" maxlength="500"></label>
            <label class="block text-xs font-bold">หัวข้อ (ส่วนสีเขียว)<input v-model="form.headingHighlight" :class="field" class="mt-1 !text-[#00A854] dark:!text-[#00FF88] font-bold" maxlength="500"></label>
          </div>
          <label class="block text-xs font-bold">ข้อความแนะนำ<textarea v-model="form.intro" :class="field" class="mt-1" rows="3" maxlength="2000" /></label>
        </section>

        <!-- 2. ช่องทางการติดต่อ -->
        <section class="space-y-3 rounded-2xl border border-current/10 bg-black/[0.015] dark:bg-white/[0.02] p-4 sm:p-5">
          <h3 class="text-sm font-extrabold text-[#00A854] dark:text-[#00FF88]">2. ช่องทางการติดต่อโดยตรง</h3>
          <label class="block text-xs font-bold">หัวข้อกล่อง<input v-model="form.channelsTitle" :class="field" class="mt-1" maxlength="500"></label>
          <label class="block text-xs font-bold">หัวข้อเบอร์โทร<input v-model="form.phonesLabel" :class="field" class="mt-1" maxlength="500"></label>
          <div v-for="(phone, i) in form.phones" :key="i" class="flex flex-wrap items-center gap-2">
            <input v-model="phone.number" :class="field" class="!w-auto flex-1 font-mono" placeholder="เช่น 0-2523-3559" maxlength="40" :aria-invalid="phone.number.trim() !== '' && !isValidPhone(phone.number)">
            <input v-model="phone.label" :class="field" class="!w-32" placeholder="ป้าย เช่น ชั้น 2" maxlength="100">
            <button type="button" :class="small" :disabled="i === 0" aria-label="เลื่อนขึ้น" @click="moveItem(form.phones, i, -1)">↑</button>
            <button type="button" :class="small" :disabled="i === form.phones.length - 1" aria-label="เลื่อนลง" @click="moveItem(form.phones, i, 1)">↓</button>
            <button type="button" :class="small" class="text-red-600" aria-label="ลบเบอร์โทร" @click="form.phones.splice(i, 1)">×</button>
            <span v-if="phone.number.trim() && !isValidPhone(phone.number)" class="w-full text-[11px] text-red-600">ใส่ตัวเลข 6–15 หลัก (ใช้ - หรือเว้นวรรคคั่นได้)</span>
          </div>
          <button type="button" :class="small" @click="form.phones.push({ number: '', label: '' })">+ เพิ่มเบอร์โทร</button>

          <label class="block border-t border-current/10 pt-3 text-xs font-bold">หัวข้ออีเมล<input v-model="form.emailsLabel" :class="field" class="mt-1" maxlength="500"></label>
          <div v-for="(email, i) in form.emails" :key="i" class="flex flex-wrap items-center gap-2">
            <input v-model="email.address" type="email" :class="field" class="!w-auto flex-1 font-mono" placeholder="name@igenco.co.th" maxlength="200">
            <input v-model="email.label" :class="field" class="!w-32" placeholder="ป้าย (ไม่บังคับ)" maxlength="100">
            <button type="button" :class="small" :disabled="i === 0" aria-label="เลื่อนขึ้น" @click="moveItem(form.emails, i, -1)">↑</button>
            <button type="button" :class="small" :disabled="i === form.emails.length - 1" aria-label="เลื่อนลง" @click="moveItem(form.emails, i, 1)">↓</button>
            <button type="button" :class="small" class="text-red-600" aria-label="ลบอีเมล" @click="form.emails.splice(i, 1)">×</button>
            <span v-if="email.address.trim() && !isValidEmail(email.address)" class="w-full text-[11px] text-red-600">รูปแบบอีเมลไม่ถูกต้อง</span>
          </div>
          <button type="button" :class="small" @click="form.emails.push({ address: '', label: '' })">+ เพิ่มอีเมล</button>
        </section>

        <!-- 3. เวลาทำการ -->
        <section class="space-y-3 rounded-2xl border border-current/10 bg-black/[0.015] dark:bg-white/[0.02] p-4 sm:p-5">
          <h3 class="text-sm font-extrabold text-[#00A854] dark:text-[#00FF88]">3. เวลาทำการ</h3>
          <label class="block text-xs font-bold">หัวข้อ<input v-model="form.officeHoursTitle" :class="field" class="mt-1" maxlength="500"></label>
          <label class="block text-xs font-bold">รายละเอียด<textarea v-model="form.officeHours" :class="field" class="mt-1" rows="2" maxlength="2000" /></label>
        </section>

        <!-- 4. ที่ตั้งสำนักงาน -->
        <section class="space-y-3 rounded-2xl border border-current/10 bg-black/[0.015] dark:bg-white/[0.02] p-4 sm:p-5">
          <h3 class="text-sm font-extrabold text-[#00A854] dark:text-[#00FF88]">4. ตำแหน่งที่ตั้งสำนักงาน</h3>
          <p class="text-[11px] opacity-60">ที่อยู่และลิงก์แผนที่ใช้ร่วมกับหน้า "ตำแหน่งที่ตั้ง" และส่วนท้ายเว็บ</p>
          <div class="grid gap-3 sm:grid-cols-2">
            <label class="block text-xs font-bold">หัวข้อการ์ด<input v-model="form.locationTitle" :class="field" class="mt-1" maxlength="500"></label>
            <label class="block text-xs font-bold">คำอธิบายใต้หัวข้อ<input v-model="form.locationSubtitle" :class="field" class="mt-1" maxlength="500"></label>
          </div>
          <label class="block text-xs font-bold">ที่อยู่เต็ม<textarea v-model="form.address" :class="field" class="mt-1" rows="2" maxlength="2000" /></label>
          <label class="block text-xs font-bold">ลิงก์ Google Maps (ปักหมุด)<input v-model="form.mapUrl" :class="field" class="mt-1 font-mono" placeholder="https://maps.app.goo.gl/..." maxlength="500"></label>
          <label class="block text-xs font-bold">ลิงก์นำทาง<input v-model="form.directionsUrl" :class="field" class="mt-1 font-mono" placeholder="https://www.google.com/maps/dir/?api=1&destination=..." maxlength="500"></label>
        </section>
      </div>

      <div class="space-y-5 xl:col-span-7">
        <!-- 5. ข้อความรับรอง -->
        <section class="space-y-3 rounded-2xl border border-current/10 bg-black/[0.015] dark:bg-white/[0.02] p-4 sm:p-5">
          <h3 class="text-sm font-extrabold text-[#00A854] dark:text-[#00FF88]">5. มาตรฐานและการรับรอง (กล่องใต้แผนที่)</h3>
          <p class="text-[11px] opacity-60">บรรทัดละ 1 ข้อ ใช้ **ข้อความ** เพื่อทำตัวหนา</p>
          <div v-for="(_, i) in form.trustBadges" :key="i" class="flex items-center gap-2">
            <input v-model="form.trustBadges[i]" :class="field" class="flex-1" maxlength="300">
            <button type="button" :class="small" :disabled="i === 0" aria-label="เลื่อนขึ้น" @click="moveItem(form.trustBadges, i, -1)">↑</button>
            <button type="button" :class="small" :disabled="i === form.trustBadges.length - 1" aria-label="เลื่อนลง" @click="moveItem(form.trustBadges, i, 1)">↓</button>
            <button type="button" :class="small" class="text-red-600" aria-label="ลบ" @click="form.trustBadges.splice(i, 1)">×</button>
          </div>
          <button type="button" :class="small" @click="form.trustBadges.push('')">+ เพิ่มข้อความ</button>
        </section>

        <!-- 6. แบบฟอร์มขอรับคำปรึกษา -->
        <section class="space-y-3 rounded-2xl border border-current/10 bg-black/[0.015] dark:bg-white/[0.02] p-4 sm:p-5">
          <h3 class="text-sm font-extrabold text-[#00A854] dark:text-[#00FF88]">6. แบบฟอร์มขอรับคำปรึกษา</h3>
          <label class="block text-xs font-bold">หัวข้อแบบฟอร์ม<input v-model="form.formTitle" :class="field" class="mt-1" maxlength="500"></label>
          <label class="block text-xs font-bold">คำอธิบาย<textarea v-model="form.formSubtitle" :class="field" class="mt-1" rows="2" maxlength="2000" /></label>
          <div class="text-xs font-bold">ตัวเลือก "หัวข้อหรือโซลูชันที่ต้องการปรึกษา" ({{ form.topicOptions.length }})</div>
          <div v-for="(_, i) in form.topicOptions" :key="i" class="flex items-center gap-2">
            <span class="w-6 text-right text-[11px] font-mono opacity-50">{{ i + 1 }}</span>
            <input v-model="form.topicOptions[i]" :class="field" class="flex-1" maxlength="200">
            <button type="button" :class="small" :disabled="i === 0" aria-label="เลื่อนขึ้น" @click="moveItem(form.topicOptions, i, -1)">↑</button>
            <button type="button" :class="small" :disabled="i === form.topicOptions.length - 1" aria-label="เลื่อนลง" @click="moveItem(form.topicOptions, i, 1)">↓</button>
            <button type="button" :class="small" class="text-red-600" aria-label="ลบตัวเลือก" @click="form.topicOptions.splice(i, 1)">×</button>
          </div>
          <button type="button" :class="small" @click="form.topicOptions.push('')">+ เพิ่มตัวเลือก</button>
        </section>

        <!-- 7. SEO -->
        <section class="space-y-3 rounded-2xl border border-current/10 bg-black/[0.015] dark:bg-white/[0.02] p-4 sm:p-5">
          <h3 class="text-sm font-extrabold text-[#00A854] dark:text-[#00FF88]">7. SEO (ชื่อหน้าและคำอธิบายบน Google)</h3>
          <label class="block text-xs font-bold">หัวข้อ SEO<input v-model="form.seoTitle" :class="field" class="mt-1" maxlength="120"></label>
          <label class="block text-xs font-bold">คำอธิบาย SEO<textarea v-model="form.seoDescription" :class="field" class="mt-1" rows="2" maxlength="320" /></label>
        </section>
      </div>
    </fieldset>
  </div>
</template>
