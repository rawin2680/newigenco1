<script setup lang="ts">
import { ArrowLeft, ArrowUpRight, ChevronRight } from 'lucide-vue-next'
import AppHeader from '~/components/AppHeader.vue'
import ContactFooter from '~/components/ContactFooter.vue'

useHead({
  title: 'Software OnDemand | บริษัท ไอเจนโก้ จำกัด',
  meta: [{ name: 'description', content: 'บริการพัฒนาซอฟต์แวร์ตามความต้องการและกระบวนการทำงานขององค์กร โดยบริษัท ไอเจนโก้ จำกัด' }]
})
</script>

<template>
  <div class="relative flex min-h-screen flex-col text-slate-800 dark:text-slate-100">
    <AppHeader />

    <main class="ondemand-theme relative z-10 mx-auto w-full max-w-[1440px] flex-1 space-y-12 px-5 pb-20 pt-28 sm:space-y-20 sm:px-10 lg:px-16">
      <nav aria-label="เส้นทางนำทาง" class="flex items-center justify-between gap-4 border-b border-current/10 pb-4">
        <NuxtLink to="/#products" class="group inline-flex items-center gap-2 text-sm font-bold text-cyan-800 hover:underline dark:text-cyan-300">
          <ArrowLeft class="size-4 transition-transform group-hover:-translate-x-1" aria-hidden="true" />
          ย้อนกลับไปหน้าแคตตาล็อกสินค้า
        </NuxtLink>
        <div class="hidden items-center gap-2 text-xs opacity-75 sm:flex">
          <NuxtLink to="/">หน้าแรก</NuxtLink>
          <ChevronRight class="size-3.5" aria-hidden="true" />
          <NuxtLink to="/#products">ผลิตภัณฑ์</NuxtLink>
          <ChevronRight class="size-3.5" aria-hidden="true" />
          <span aria-current="page">Software OnDemand</span>
        </div>
      </nav>

      <section class="grid items-center gap-8 lg:grid-cols-12 lg:gap-14">
        <div class="min-w-0 space-y-5 lg:col-span-7">
          <div>
            <h1 class="font-display text-3xl font-black leading-tight text-[#022C22] dark:text-white sm:text-5xl lg:text-6xl">
              Software <span class="text-cyan-700 dark:text-cyan-300">OnDemand</span>
            </h1>
            <p class="mt-3 font-display text-lg font-bold text-cyan-800 dark:text-cyan-300 sm:text-2xl">
              บริการพัฒนาซอฟต์แวร์ตามสั่ง
            </p>
          </div>
          <div class="max-w-2xl space-y-4 text-sm leading-relaxed text-slate-700 dark:text-slate-300 sm:text-base">
            <p>
              บริษัท ไอเจนโก้ จำกัด ให้บริการด้านการพัฒนาโปรแกรมตามความต้องการลูกค้าให้ตรงตามลักษณะและกระบวนการทางธุรกิจขององค์กรอย่างแท้จริง ด้วยทีมงานคุณภาพมากว่า 10 ปี
            </p>
            <p>
              บริษัทมีความมุ่งมั่นที่จะพัฒนาผลิตภัณฑ์ด้านซอฟต์แวร์เพื่อตอบสนองในทุกธุรกิจ ไม่ว่าจะเป็นขนาดเล็กหรือขนาดใหญ่ ให้มีโอกาสเลือกใช้เทคโนโลยีที่เหมาะสม เพื่อเพิ่มขีดความสามารถในการแข่งขันและบริหารธุรกิจอย่างมีศักยภาพ เพื่อก้าวสู่ความสำเร็จด้วยปรัชญาที่ว่า
            </p>
          </div>
          <a href="#contact" class="inline-flex items-center gap-2 rounded-2xl bg-cyan-700 px-5 py-3 text-sm font-bold text-white shadow-sm hover:bg-cyan-800">
            ติดต่อสอบถาม
            <ArrowUpRight class="size-4" aria-hidden="true" />
          </a>
        </div>
        <div class="spatial-glass rounded-3xl border border-cyan-500/20 p-3 shadow-xl sm:p-5 lg:col-span-5">
          <img src="/images/products/software-ondemand-overview.png" width="408" height="294" alt="ภาพประกอบการพัฒนาซอฟต์แวร์สำหรับคอมพิวเตอร์ มือถือ และแท็บเล็ต" class="mx-auto block h-auto w-full max-w-[408px] rounded-2xl">
        </div>
      </section>

      <blockquote class="spatial-glass rounded-3xl border border-cyan-500/25 p-6 sm:p-8">
        <p class="font-display text-lg font-bold leading-relaxed text-cyan-900 dark:text-cyan-200 sm:text-2xl">
          “Infinite Possibility - เรามุ่งมั่นพัฒนาระบบอย่างมืออาชีพเพื่อความสำเร็จและประโยชน์ของท่าน”
        </p>
      </blockquote>
    </main>

    <ContactFooter />
  </div>
</template>

<style scoped>
.ondemand-theme {
  --heading-accent-end: #155e75;
  --heading-signal: #0891b2;
}

:global(html.dark) .ondemand-theme {
  --heading-accent-end: #a5f3fc;
  --heading-signal: #22d3ee;
}
</style>
