import { ref, watch, nextTick, onBeforeUnmount, type Ref } from 'vue'

// ช่องที่ผู้ใช้พิมพ์ข้อความ: รวมการพิมพ์ต่อเนื่องเป็น 1 ขั้น (debounce)
// ส่วนการกระทำอื่น (เพิ่ม/ลบ/ย้าย/ซ่อนบล็อก, อัปโหลด/ลบรูป, เลือกจากรายการ) บันทึกเป็นขั้นแยกทันที
const TYPING_INPUTS = new Set(['text', 'search', 'url', 'tel', 'email', 'number', 'color', ''])
export function isTypingElement(el: Element | null): el is HTMLInputElement | HTMLTextAreaElement {
  if (!el) return false
  if (el.tagName === 'TEXTAREA') return true
  return el.tagName === 'INPUT' && TYPING_INPUTS.has((el as HTMLInputElement).type)
}

/**
 * ประวัติย้อนกลับ/ทำซ้ำของฟอร์มในหน้าต่างแก้ไข
 * - เก็บสำเนาข้อมูลทั้งฟอร์ม (deep clone ผ่าน JSON) สูงสุด `limit` ขั้น
 * - เรียก reset() ทุกครั้งที่เปิดหน้าต่างกับรายการใหม่ (เริ่มประวัติใหม่ และใช้เป็นจุดเทียบว่ามีการแก้ไขหรือไม่)
 * - ไม่บันทึกระหว่างกำลังย้อนกลับ/ทำซ้ำ
 */
export function useUndoHistory<T>(source: Ref<T>, options: { debounce?: number; limit?: number } = {}) {
  const debounce = options.debounce ?? 400
  const limit = options.limit ?? 100
  const past: string[] = []
  const future: string[] = []
  const canUndo = ref(false)
  const canRedo = ref(false)
  let current = ''
  let baseline = ''
  let pending: string | null = null
  let timer: ReturnType<typeof setTimeout> | undefined
  let applying = false
  let active = false

  const snapshot = () => JSON.stringify(source.value)
  const update = () => {
    canUndo.value = past.length > 0 || (pending !== null && pending !== current)
    canRedo.value = future.length > 0
  }
  const push = (next: string) => {
    if (next === current) return
    past.push(current)
    if (past.length > limit) past.shift()
    current = next
    future.length = 0
  }
  // บันทึกการพิมพ์ที่ค้างอยู่ให้เป็น 1 ขั้น
  const flush = () => {
    if (timer) clearTimeout(timer)
    timer = undefined
    if (pending !== null) push(pending)
    pending = null
    update()
  }

  watch(source, () => {
    if (!active || applying) return
    const next = snapshot()
    if (isTypingElement(document.activeElement)) {
      pending = next
      if (timer) clearTimeout(timer)
      timer = setTimeout(flush, debounce)
    } else {
      flush()
      push(next)
    }
    update()
  }, { deep: true }) // รวมการเปลี่ยนแปลงใน tick เดียวกัน (เช่น อัปโหลดรูปที่แก้หลายช่องพร้อมกัน) เป็น 1 ขั้น

  function apply(state: string) {
    applying = true
    current = state
    source.value = JSON.parse(state)
    nextTick(() => { applying = false })
    update()
  }

  function undo() {
    flush()
    const previous = past.pop()
    if (previous === undefined) return
    future.push(current)
    apply(previous)
  }

  function redo() {
    flush()
    const next = future.pop()
    if (next === undefined) return
    past.push(current)
    apply(next)
  }

  function reset() {
    if (timer) clearTimeout(timer)
    timer = undefined
    pending = null
    past.length = 0
    future.length = 0
    current = snapshot()
    baseline = current
    active = true
    update()
  }

  // ใช้หลังบันทึกสำเร็จ หรือเมื่อปิดหน้าต่าง
  function stop() {
    if (timer) clearTimeout(timer)
    timer = undefined
    active = false
  }

  const isDirty = () => active && snapshot() !== baseline

  onBeforeUnmount(stop)

  return { canUndo, canRedo, undo, redo, reset, stop, isDirty }
}
