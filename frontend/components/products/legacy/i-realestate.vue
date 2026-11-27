<script setup lang="ts">
import { ArrowLeft, ArrowUpRight, CheckCircle2, Phone } from 'lucide-vue-next'
import AppHeader from '~/components/AppHeader.vue'
import ContactFooter from '~/components/ContactFooter.vue'

const product = {
  name: 'i-Real Estate (ระบบบริหารการขายและจองคอนโด)',
  category: 'E-Commerce',
  shortDesc: 'โปรแกรมบริหารโครงการคอนโดมิเนียมและอาคารชุดสำหรับขาย ตั้งแต่จัดทำผังห้องและกำหนดราคา ไปจนถึงติดตามการชำระเงินและการโอนกรรมสิทธิ์',
  fullDetails: [
    'ระบบบริหารการขายและจองคอนโด (Real Estate Management System) เป็นโปรแกรมบริหารโครงการสำหรับคอนโดมิเนียมหรืออาคารชุดสำหรับขาย รองรับการวางแผนข้อมูลโครงการ การจัดทำแผนผังห้องชุด การเก็บข้อมูลลูกค้าเยี่ยมชมโครงการ และการจัดทำโปรโมชั่นราคาขาย',
    'รองรับการเสนอราคา การจอง การทำสัญญา การผ่อนดาวน์ การชำระเงิน การโอนกรรมสิทธิ์ห้องชุด ตลอดจนการติดตามสถานะการขายห้องชุด'
  ],
  image: '/images/products/i-realestate.svg',
  features: [
    {
      title: 'ระบบความปลอดภัยและสิทธิการใช้งาน',
      items: ['กำหนดเงื่อนไของค์กร', 'กำหนดกลุ่มผู้ใช้งาน', 'กำหนดผู้ใช้งาน', 'กำหนดเมนูระบบ']
    },
    {
      title: 'การกำหนดข้อมูลหลัก',
      items: ['กำหนดข้อมูลและรายละเอียดโครงการ', 'กำหนดแผนผังอาคารและห้องชุด', 'กำหนดข้อมูลการขาย', 'กำหนดข้อมูลการเงิน']
    },
    {
      title: 'ระบบงานฝ่ายขาย',
      items: [
        'กำหนดราคาขาย',
        'กำหนดโปรโมชั่น',
        'กำหนดลูกค้าคาดหวัง',
        'การออกใบเสนอราคา',
        'การออกใบจอง',
        'การทำสัญญา',
        'การผ่อนดาวน์',
        'การโอนกรรมสิทธิ์',
        'การออกใบเสร็จรับเงิน (ชั่วคราว)'
      ]
    },
    {
      title: 'ระบบงานการเงิน',
      items: ['ออกใบเสร็จรับเงินจอง', 'ออกใบเสร็จรับเงินทำสัญญา', 'ออกใบเสร็จรับเงินผ่อนดาวน์', 'ออกใบเสร็จรับเงินโอนกรรมสิทธิ์']
    }
  ]
}
const screenshots = [
  { src: '/images/products/i-realestate-modules.png', caption: 'เมนูและระบบงาน', width: 724, height: 305 },
  { src: '/images/products/i-realestate-dashboard.png', caption: 'แดชบอร์ดสรุปยอดจอง สัญญา ผ่อนชำระ และโอนกรรมสิทธิ์', width: 805, height: 298 }
]
useSeoMeta({
  title: `${product.name} | IGENCO`,
  description: product.shortDesc
})
</script>

<template>
  <div class="relative flex min-h-screen flex-col text-slate-800 dark:text-slate-100">
    <AppHeader />
    <main class="product-theme relative z-10 mx-auto w-full max-w-[1440px] flex-1 space-y-12 px-5 pb-20 pt-28 sm:space-y-16 sm:px-10 lg:px-16">
      <nav aria-label="เส้นทางนำทาง" class="border-b border-current/10 pb-4">
        <NuxtLink to="/#products" class="inline-flex items-center gap-2 text-sm font-bold text-teal-800 hover:underline dark:text-teal-300">
          <ArrowLeft class="size-4" aria-hidden="true" />
          ย้อนกลับไปหน้าแคตตาล็อกสินค้า
        </NuxtLink>
      </nav>

      <section class="grid items-center gap-8 lg:grid-cols-12 lg:gap-14">
        <div class="min-w-0 space-y-5 lg:col-span-7">
          <p class="inline-flex rounded-full border border-teal-500/25 bg-teal-500/10 px-3.5 py-1 text-xs font-bold text-teal-800 dark:text-teal-300">
            {{ product.category }}
          </p>
          <h1 class="font-display text-3xl font-black leading-tight text-[#022C22] dark:text-white sm:text-5xl">
            {{ product.name }}
          </h1>
          <p lang="en" class="text-lg font-bold text-teal-800 dark:text-teal-300">Real Estate Management System</p>
          <p class="whitespace-pre-line text-sm leading-relaxed text-slate-700 dark:text-slate-300 sm:text-base">{{ product.shortDesc }}</p>
          <a href="#realestate-demo" class="inline-flex items-center gap-2 rounded-2xl bg-teal-700 px-5 py-3 text-sm font-bold text-white shadow-sm hover:bg-teal-800">
            ติดต่อสอบถามและนัดสาธิต
            <ArrowUpRight class="size-4" aria-hidden="true" />
          </a>
        </div>
        <div class="spatial-glass rounded-3xl border border-teal-500/20 p-3 shadow-xl sm:p-5 lg:col-span-5">
          <img :src="product.image" :alt="product.name" class="mx-auto aspect-[4/3] w-full rounded-2xl object-contain">
        </div>
      </section>

      <section class="spatial-glass space-y-4 rounded-3xl border border-current/10 p-5 sm:p-8">
        <h2 class="font-display text-2xl font-black">รายละเอียด</h2>
        <p v-for="paragraph in product.fullDetails" :key="paragraph" class="text-sm leading-relaxed text-slate-700 dark:text-slate-300 sm:text-base">
          {{ paragraph }}
        </p>
      </section>

      <section class="space-y-5">
        <h2 class="font-display text-2xl font-black">จุดเด่นและคุณสมบัติ</h2>
        <ul class="grid gap-4 md:grid-cols-2">
          <li v-for="feature in product.features" :key="feature.title" class="spatial-glass flex items-start gap-3 rounded-2xl border border-current/10 p-4 sm:p-5">
            <CheckCircle2 class="mt-0.5 size-5 shrink-0 text-teal-700 dark:text-teal-300" aria-hidden="true" />
            <div class="min-w-0 space-y-1">
              <h3 class="font-display text-base font-bold">{{ feature.title }}</h3>
              <ul class="list-disc space-y-1.5 pl-5 text-sm leading-relaxed text-slate-700 dark:text-slate-300">
                <li v-for="item in feature.items" :key="item">{{ item }}</li>
              </ul>
            </div>
          </li>
        </ul>
      </section>

      <section class="space-y-5">
        <h2 class="font-display text-2xl font-black">ตัวอย่างหน้าจอระบบ</h2>
        <div class="grid gap-4 lg:grid-cols-2">
          <figure v-for="shot in screenshots" :key="shot.src" class="spatial-glass space-y-3 rounded-2xl border border-current/10 p-4">
            <a :href="shot.src" target="_blank" rel="noopener" :aria-label="`เปิดภาพเต็ม ${shot.caption}`" class="block rounded-xl focus-visible:outline-teal-600">
              <img :src="shot.src" :alt="shot.caption" :width="shot.width" :height="shot.height" loading="lazy" class="h-auto w-full rounded-xl bg-white">
            </a>
            <figcaption class="text-sm font-semibold">{{ shot.caption }}</figcaption>
          </figure>
        </div>
      </section>

      <section id="realestate-demo" class="spatial-glass flex scroll-mt-28 flex-wrap items-center justify-between gap-5 rounded-3xl border border-teal-500/25 p-6 sm:p-8">
        <div class="space-y-2">
          <h2 class="font-display text-2xl font-black">ติดต่อสอบถามและนัดสาธิตระบบ</h2>
          <p class="text-sm text-slate-700 dark:text-slate-300">ฝ่ายการตลาดและการขาย · คุณภณิดาพร จูมมณี</p>
        </div>
        <a href="tel:+66962949236" class="inline-flex items-center gap-2 rounded-2xl bg-teal-700 px-5 py-3 text-sm font-bold text-white hover:bg-teal-800">
          <Phone class="size-4" aria-hidden="true" />
          โทร 09 6294 9236
        </a>
      </section>
    </main>
    <ContactFooter />
  </div>
</template>

<style scoped>
.product-theme {
  --heading-accent-end: #115e59;
  --heading-signal: #0d9488;
}

:global(html.dark) .product-theme {
  --heading-accent-end: #99f6e4;
  --heading-signal: #2dd4bf;
}
</style>
