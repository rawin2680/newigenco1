<script setup lang="ts">
import { ArrowLeft, ArrowUpRight, ClipboardList, Package, Store } from 'lucide-vue-next'
import AppHeader from '~/components/AppHeader.vue'
import ContactFooter from '~/components/ContactFooter.vue'

const features = [
  {
    title: 'การจัดการสินค้าและสต๊อกสินค้า',
    icon: Package,
    items: [
      'การจัดการบริหารสินค้าคงคลัง (STOCK)',
      'การนำเข้าสินค้าเพื่อการจำหน่าย',
      'การกำหนดราคาทุนและราคาขาย',
      'การพิมพ์บาร์โค้ดสินค้า',
      'การปรับปรุงสินค้าและการโอนย้ายสินค้า',
      'การตรวจนับสินค้า'
    ]
  },
  {
    title: 'การซื้อสินค้าและการออกใบสั่งซื้อ',
    icon: ClipboardList,
    items: ['การสั่งซื้อทั้งหมด', 'การเพิ่มรายการสั่งซื้อ', 'รายการค่าใช้จ่าย', 'การจัดทำใบเสนอราคา']
  },
  {
    title: 'การขายสินค้า',
    icon: Store,
    items: ['การออกใบสั่งขาย', 'การขายผ่านหน้าร้าน POS', 'การขายออนไลน์']
  }
]

useSeoMeta({
  title: 'iPOS | ระบบบริหารจุดขายและการจัดการร้านค้า | IGENCO',
  description: 'iPOS ระบบบริหารจุดขายและการจัดการร้านค้าผ่านเว็บ ครอบคลุมสินค้าคงคลัง งานจัดซื้อ ใบเสนอราคา และการขายหน้าร้านหรือออนไลน์'
})
</script>

<template>
  <div class="relative flex min-h-screen flex-col text-slate-800 dark:text-slate-100">
    <AppHeader />
    <main class="ipos-theme relative z-10 mx-auto w-full max-w-[1440px] flex-1 space-y-12 px-5 pb-20 pt-28 sm:space-y-16 sm:px-10 lg:px-16">
      <nav aria-label="เส้นทางนำทาง" class="border-b border-current/10 pb-4">
        <NuxtLink to="/#products" class="inline-flex items-center gap-2 text-sm font-bold text-pink-800 hover:underline dark:text-pink-300">
          <ArrowLeft class="size-4" aria-hidden="true" />
          ย้อนกลับไปหน้าแคตตาล็อกสินค้า
        </NuxtLink>
      </nav>

      <section class="grid items-center gap-8 lg:grid-cols-12 lg:gap-12">
        <div class="min-w-0 space-y-5 lg:col-span-6">
          <h1 class="font-display text-3xl font-black leading-tight text-[#022C22] dark:text-white sm:text-5xl">
            <span class="text-pink-700 dark:text-pink-300">iPOS</span> ตอบโจทย์การบริหารจัดการคุณได้อย่างไร?
          </h1>
          <div class="space-y-3 text-sm leading-relaxed text-slate-700 dark:text-slate-300 sm:text-base">
            <p>
              iPOS ทำงานเป็นแบบ
              <a href="https://www.pos2u.com/2015/08/23/เว็บแอพพลิเคชั่นคือ/" target="_blank" rel="noopener noreferrer" class="font-semibold text-pink-800 underline underline-offset-2 dark:text-pink-300">Web Application</a>
              ใช้งานผ่านเว็บเบราว์เซอร์ เช่น Chrome และ Firefox ผ่านอินเทอร์เน็ต และจัดเก็บข้อมูลออนไลน์ด้วยระบบ Cloud ที่มีความเสถียรและความปลอดภัยในการใช้งานสูง เพื่อให้ผู้ใช้งานทำงานได้ง่ายและสะดวกทุกที่ ทุกเวลา
            </p>
            <p>
              ครอบคลุมงานบริหารคลังสินค้า การจัดการคำสั่งซื้อ การออกใบเสนอราคา การออกคำสั่งขาย รวมถึงการขายสินค้าผ่านเครื่อง POS
            </p>
          </div>
          <a href="#contact" class="inline-flex items-center gap-2 rounded-2xl bg-pink-700 px-5 py-3 text-sm font-bold text-white shadow-sm hover:bg-pink-800">
            ติดต่อสอบถาม
            <ArrowUpRight class="size-4" aria-hidden="true" />
          </a>
        </div>
        <figure class="rounded-3xl border border-pink-500/20 bg-white p-3 shadow-sm sm:p-5 lg:col-span-6">
          <img src="/images/products/ipos-overview.png" width="1157" height="482" alt="บริหารหน้าร้าน จัดการสต๊อกออนไลน์ ทำงานได้ทุกที่ และบริการลูกค้า" class="block h-auto w-full rounded-2xl">
        </figure>
      </section>

      <section aria-labelledby="ipos-features" class="space-y-5">
        <h2 id="ipos-features" class="font-display text-2xl font-black sm:text-4xl">คุณสมบัติของ iPOS</h2>
        <div class="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          <article v-for="feature in features" :key="feature.title" class="spatial-glass space-y-4 rounded-3xl border border-current/10 p-5 sm:p-7">
            <div class="flex items-start gap-3">
              <span class="grid size-10 shrink-0 place-items-center rounded-xl bg-pink-500/10 text-pink-800 dark:text-pink-300">
                <component :is="feature.icon" class="size-5" aria-hidden="true" />
              </span>
              <h3 class="pt-1 font-display text-lg font-bold leading-snug">{{ feature.title }}</h3>
            </div>
            <ul class="list-disc space-y-2 pl-5 text-sm leading-relaxed text-slate-700 marker:text-pink-700 dark:text-slate-300 dark:marker:text-pink-300">
              <li v-for="item in feature.items" :key="item">{{ item }}</li>
            </ul>
          </article>
        </div>
      </section>
    </main>
    <ContactFooter />
  </div>
</template>

<style scoped>
.ipos-theme {
  --heading-accent-end: #9d174d;
  --heading-signal: #db2777;
}

:global(html.dark) .ipos-theme {
  --heading-accent-end: #fbcfe8;
  --heading-signal: #f472b6;
}
</style>
