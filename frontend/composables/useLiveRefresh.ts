import { onMounted, onBeforeUnmount } from 'vue'

// ช่องสื่อสารระหว่างแท็บ: หน้าแอดมินแจ้งหน้าเว็บหลัก (ในเบราว์เซอร์เดียวกัน) ให้โหลดข้อมูลใหม่ทันที
export const CONTENT_CHANNEL = 'igenco-content'

export const notifyContentChanged = (kind?: string) => {
  if (!import.meta.client || typeof BroadcastChannel === 'undefined') return
  try {
    const channel = new BroadcastChannel(CONTENT_CHANNEL)
    channel.postMessage({ type: 'content-changed', kind, at: Date.now() })
    channel.close()
  } catch {
    // ไม่รองรับ / ถูกบล็อก: หน้าเว็บหลักยังอัปเดตได้จากการ poll และตอนกลับมาที่แท็บ
  }
}

/**
 * เรียก refreshFn ซ้ำเพื่อให้หน้าเว็บหลักแสดงข้อมูลล่าสุดจาก Strapi โดยไม่ต้องรีเฟรช:
 * - เมื่อกลับมาที่แท็บ (visibilitychange / focus)
 * - ทุก ๆ `interval` ms ขณะที่แท็บแสดงอยู่
 * - ทันทีเมื่อหน้าแอดมินส่งข้อความผ่าน BroadcastChannel
 * ไม่ทำงานบนเซิร์ฟเวอร์ และล้าง timer/listener เมื่อ component ถูกถอด
 */
export const useLiveRefresh = (refreshFn: () => Promise<unknown> | unknown, interval = 15000) => {
  let timer: ReturnType<typeof setInterval> | undefined
  let channel: BroadcastChannel | undefined
  let running = false

  const run = async (force = false) => {
    if (running) return
    if (!force && document.visibilityState !== 'visible') return
    running = true
    try {
      await refreshFn()
    } catch {
      // เงียบไว้ รอบถัดไปจะลองใหม่
    } finally {
      running = false
    }
  }

  const stop = () => {
    if (timer) clearInterval(timer)
    timer = undefined
  }
  const start = () => {
    stop()
    timer = setInterval(() => run(), interval)
  }
  const onVisibility = () => {
    if (document.visibilityState === 'visible') {
      run()
      start()
    } else {
      stop()
    }
  }
  const onFocus = () => run()

  onMounted(() => {
    document.addEventListener('visibilitychange', onVisibility)
    window.addEventListener('focus', onFocus)
    if (document.visibilityState === 'visible') start()
    if (typeof BroadcastChannel !== 'undefined') {
      try {
        channel = new BroadcastChannel(CONTENT_CHANNEL)
        channel.onmessage = () => run(true)
      } catch {
        channel = undefined
      }
    }
  })

  onBeforeUnmount(() => {
    stop()
    document.removeEventListener('visibilitychange', onVisibility)
    window.removeEventListener('focus', onFocus)
    channel?.close()
    channel = undefined
  })

  return { refreshNow: () => run(true) }
}

// ลายเซ็นข้อมูลอย่างง่าย ใช้ตรวจว่าข้อมูลเปลี่ยนจริงก่อนอัปเดตหน้าจอ (กันจอกระพริบ)
export const contentSignature = (data: unknown) => {
  try {
    return JSON.stringify(data)
  } catch {
    return String(Date.now())
  }
}
