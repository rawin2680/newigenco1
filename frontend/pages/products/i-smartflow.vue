<script setup lang="ts">
import { ArrowLeft, ArrowUpRight, ChevronDown, ChevronRight } from 'lucide-vue-next'
import AppHeader from '~/components/AppHeader.vue'
import ContactFooter from '~/components/ContactFooter.vue'

const modules = [
  {
    title: 'ออกแบบเส้นทางงานด้วย Drag & Drop',
    english: 'Workflow Designer',
    description: "สร้างระบบงานขึ้นมาใช้งานได้ด้วยการออกแบบเส้นทางการทำงานแบบ Drag & Drop เพื่อสร้าง Route แม้เป็นเส้นทางที่ซับซ้อน ผู้ใช้งานไม่จำเป็นต้องมีความรู้ด้าน Programming"
  },
  {
    title: 'สร้างแม่แบบและแบบฟอร์มเอกสาร',
    english: 'Workflow Templates & eForms',
    description: "กำหนด Workflow ต้นแบบ (Workflow template) และสร้างแบบฟอร์มเอกสาร (eForm) ได้เอง โดยกำหนดชื่อ ขนาด ข้อมูล และประเภทข้อมูล เพื่อนำไปใช้งานกับระบบงานต่าง ๆ"
  },
  {
    title: 'ติดตามสถานะงานและรับการแจ้งเตือน',
    english: 'Dashboard, Inbox & Notifications',
    description: "i-SMARTFLOW มีหน้าจอ Dashboard รองรับการทำงานบนเว็บเบราว์เซอร์และหลายแพลตฟอร์ม เอกสารผลิตภัณฑ์ระบุ IE, Firefox, Safari, Opera, Chrome และ Edge ผู้ใช้งานสามารถทราบสถานะงาน (Workflow tasks) ในแต่ละ Inbox และรับการแจ้งเตือนผ่าน Notification และ E-Mail"
  },
  {
    title: 'กำหนดเส้นทางสำหรับงานเฉพาะกิจและงานเร่งด่วน',
    english: 'Ad-hoc & Quick Workflows',
    description: "กำหนด Workflow แบบเฉพาะหรือเร่งด่วนได้ (Ad-hoc Workflow หรือ Quick Workflow) สำหรับงานที่ไม่ได้คาดการณ์ล่วงหน้า วิธีใช้งานเข้าใจง่าย ช่วยประหยัดเวลาในการเรียนรู้"
  }
]

useHead({
  title: 'i-SMARTFLOW | บริษัท ไอเจนโก้ จำกัด',
  meta: [{ name: 'description', content: 'i-SMARTFLOW เครื่องมือออกแบบ Workflow แบบ Drag & Drop สร้าง eForm และติดตามสถานะงาน' }]
})
</script>

<template>
  <div class="relative flex min-h-screen flex-col text-slate-800 dark:text-slate-100">
    <AppHeader />

    <main class="smartflow-theme relative z-10 mx-auto w-full max-w-[1440px] flex-1 space-y-12 px-5 pb-20 pt-28 sm:space-y-20 sm:px-10 lg:px-16">
      <nav aria-label="เส้นทางนำทาง" class="flex items-center justify-between gap-4 border-b border-current/10 pb-4">
        <NuxtLink to="/#products" class="group inline-flex items-center gap-2 text-sm font-bold text-gray-800 hover:underline dark:text-gray-300">
          <ArrowLeft class="size-4 transition-transform group-hover:-translate-x-1" aria-hidden="true" />
          ย้อนกลับไปหน้าแคตตาล็อกสินค้า
        </NuxtLink>
        <div class="hidden items-center gap-2 text-xs opacity-75 sm:flex">
          <NuxtLink to="/">หน้าแรก</NuxtLink>
          <ChevronRight class="size-3.5" aria-hidden="true" />
          <NuxtLink to="/#products">ผลิตภัณฑ์</NuxtLink>
          <ChevronRight class="size-3.5" aria-hidden="true" />
          <span aria-current="page">i-SMARTFLOW</span>
        </div>
      </nav>

      <section class="grid items-center gap-8 lg:grid-cols-12 lg:gap-14">
        <div class="min-w-0 space-y-5 lg:col-span-7">
          <div>
            <h1 class="font-display text-3xl font-black leading-tight text-[#022C22] dark:text-white sm:text-5xl lg:text-6xl">
              i-<span class="text-gray-700 dark:text-gray-300">SMARTFLOW</span>
            </h1>
            <p class="mt-3 font-display text-lg font-bold text-gray-800 dark:text-gray-300 sm:text-2xl">เครื่องมือออกแบบกระบวนการและกำหนดเส้นทางการทำงาน (Workflow)</p>
            <p class="mt-1 text-sm text-slate-600 dark:text-slate-300">Workflow Application Tools</p>
          </div>
          <div class="max-w-2xl space-y-4 text-sm leading-relaxed text-slate-700 dark:text-slate-300 sm:text-base">
            <p>
              i-SMARTFLOW เป็นเครื่องมือสำหรับการออกแบบกระบวนการทำงานและกำหนดเส้นทางการทำงาน (Workflow) ที่ช่วยให้ผู้ใช้งานสามารถสร้างแอปพลิเคชันทางธุรกิจอัตโนมัติขององค์กรได้อย่างไม่มีข้อจำกัด
            </p>
            <p>
              รองรับการทำงานในทุกกระบวนการทำงานทางธุรกิจขององค์กร ช่วยให้ผู้ปฏิบัติงานสามารถทำงานไปตามขั้นตอนต่าง ๆ สามารถกำกับการทำงานและติดตามงานได้ทุกขั้นตอน
            </p>
          </div>
          <div class="flex flex-wrap gap-3">
            <a href="#contact" class="inline-flex items-center gap-2 rounded-2xl bg-gray-700 px-5 py-3 text-sm font-bold text-white shadow-sm hover:bg-gray-800">
              สอบถามและนัดสาธิตระบบ
              <ArrowUpRight class="size-4" aria-hidden="true" />
            </a>
            <a href="#smartflow-modules" class="spatial-glass inline-flex items-center gap-2 rounded-2xl border border-gray-500/30 px-5 py-3 text-sm font-bold hover:border-gray-500">ดูคุณสมบัติ</a>
          </div>
        </div>
        <div class="spatial-glass rounded-3xl border border-gray-500/20 p-3 shadow-xl sm:p-5 lg:col-span-5">
          <img src="/images/products/i-smartflow-logo.png" alt="โลโก้ i-SMARTFLOW" width="327" height="103" class="mx-auto h-auto w-full max-w-[327px] rounded-xl bg-white object-contain">
        </div>
      </section>

      <section aria-labelledby="smartflow-modules" class="space-y-6">
        <h2 id="smartflow-modules" class="scroll-mt-28 font-display text-2xl font-black text-[#022C22] dark:text-white sm:text-4xl">คุณสมบัติของ i-SMARTFLOW</h2>
        <div class="grid items-start gap-5 md:grid-cols-2">
          <details v-for="module in modules" :key="module.title" class="group spatial-glass rounded-2xl border border-current/10 p-5">
            <summary class="flex cursor-pointer list-none items-center justify-between gap-3 rounded-sm focus-visible:outline-gray-600 [&::-webkit-details-marker]:hidden">
              <span>
                <span class="block font-display text-base font-bold sm:text-lg">{{ module.title }}</span>
                <span v-if="module.english" lang="en" class="mt-1 block text-xs text-slate-600 dark:text-slate-300">{{ module.english }}</span>
              </span>
              <ChevronDown class="size-5 shrink-0 text-gray-700 transition-transform group-open:rotate-180 dark:text-gray-300" aria-hidden="true" />
            </summary>
            <p class="mt-4 border-t border-current/10 pt-4 text-sm leading-relaxed text-slate-700 dark:text-slate-300">{{ module.description }}</p>
          </details>
        </div>
      </section>

    </main>

    <ContactFooter />
  </div>
</template>

<style scoped>
.smartflow-theme {
  --heading-accent-end: #374151;
  --heading-signal: #6b7280;
}

:global(html.dark) .smartflow-theme {
  --heading-accent-end: #e5e7eb;
  --heading-signal: #9ca3af;
}
</style>
