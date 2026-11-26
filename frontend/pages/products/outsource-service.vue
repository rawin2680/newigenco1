<script setup lang="ts">
import { ArrowLeft, ArrowUpRight, ChevronRight } from 'lucide-vue-next'
import AppHeader from '~/components/AppHeader.vue'
import ContactFooter from '~/components/ContactFooter.vue'

useHead({
  title: 'OutSource Service | บริษัท ไอเจนโก้ จำกัด',
  meta: [{ name: 'description', content: 'บริการจัดหาทีมงานไอทีประจำสำนักงานลูกค้า เพื่อพัฒนาระบบ ดูแลระบบ และให้คำปรึกษา โดยบริษัท ไอเจนโก้ จำกัด' }]
})
</script>

<template>
  <div class="relative flex min-h-screen flex-col text-slate-800 dark:text-slate-100">
    <AppHeader />

    <main class="outsource-theme relative z-10 mx-auto w-full max-w-[1440px] flex-1 space-y-12 px-5 pb-20 pt-28 sm:space-y-20 sm:px-10 lg:px-16">
      <nav aria-label="เส้นทางนำทาง" class="flex items-center justify-between gap-4 border-b border-current/10 pb-4">
        <NuxtLink to="/#products" class="group inline-flex items-center gap-2 text-sm font-bold text-indigo-800 hover:underline dark:text-indigo-300">
          <ArrowLeft class="size-4 transition-transform group-hover:-translate-x-1" aria-hidden="true" />
          ย้อนกลับไปหน้าแคตตาล็อกสินค้า
        </NuxtLink>
        <div class="hidden items-center gap-2 text-xs opacity-75 sm:flex">
          <NuxtLink to="/">หน้าแรก</NuxtLink>
          <ChevronRight class="size-3.5" aria-hidden="true" />
          <NuxtLink to="/#products">ผลิตภัณฑ์</NuxtLink>
          <ChevronRight class="size-3.5" aria-hidden="true" />
          <span aria-current="page">OutSource Service</span>
        </div>
      </nav>

      <section class="grid items-center gap-8 lg:grid-cols-12 lg:gap-14">
        <div class="min-w-0 space-y-5 lg:col-span-7">
          <div>
            <h1 class="font-display text-3xl font-black leading-tight text-[#022C22] dark:text-white sm:text-5xl lg:text-6xl">
              OutSource <span class="text-indigo-700 dark:text-indigo-300">Service</span>
            </h1>
            <p class="mt-3 font-display text-lg font-bold text-indigo-800 dark:text-indigo-300 sm:text-2xl">
              บริการจัดหาทีมงานไอที
            </p>
          </div>
          <div class="max-w-2xl space-y-4 text-sm leading-relaxed text-slate-700 dark:text-slate-300 sm:text-base">
            <p>
              บริษัท ไอเจนโก้ จำกัด ให้บริการด้าน OutSource Service โดยจัดให้มีพนักงานปฏิบัติงานประจำ ณ สำนักงานของลูกค้า เพื่อพัฒนาระบบงาน ดูแลระบบ ให้คำปรึกษาด้านที่เกี่ยวข้องตามที่ต้องการ
            </p>
            <p>
              บริการ Outsource Service เหมาะกับองค์กรสมัยใหม่ที่ต้องการลดภาระและความเสี่ยงด้าน IT และยังสามารถกำหนดขอบเขตงานและเงื่อนไขต่าง ๆ ได้ตามต้องการ รวมถึงสามารถวางแผนงานและงบประมาณที่เหมาะสมได้อีกด้วย
            </p>
          </div>
          <a href="#contact" class="inline-flex items-center gap-2 rounded-2xl bg-indigo-700 px-5 py-3 text-sm font-bold text-white shadow-sm hover:bg-indigo-800">
            ติดต่อสอบถาม
            <ArrowUpRight class="size-4" aria-hidden="true" />
          </a>
        </div>
        <div class="spatial-glass rounded-3xl border border-indigo-500/20 p-3 shadow-xl sm:p-5 lg:col-span-5">
          <img src="/images/products/outsource-service-overview.png" width="495" height="224" alt="ทีมงานประชุมร่วมกันในสำนักงาน" class="mx-auto block h-auto w-full max-w-[495px] rounded-2xl">
        </div>
      </section>
    </main>

    <ContactFooter />
  </div>
</template>

<style scoped>
.outsource-theme {
  --heading-accent-end: #3730a3;
  --heading-signal: #4f46e5;
}

:global(html.dark) .outsource-theme {
  --heading-accent-end: #c7d2fe;
  --heading-signal: #818cf8;
}
</style>
