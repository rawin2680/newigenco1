<script setup lang="ts">
import { ArrowLeft, ArrowUpRight, CheckCircle2 } from 'lucide-vue-next'
import AppHeader from '~/components/AppHeader.vue'
import ContactFooter from '~/components/ContactFooter.vue'

const product = {
  name: 'iMme Application (บันทึกงานแต่ง)',
  category: 'E-Commerce',
  shortDesc: 'iMme (i Merry, Merry me) แอปช่วยวางแผนงานแต่ง จัดการแขก และเก็บรูปกับคำอวยพรไว้ในที่เดียว',
  fullDetails: [
    "การแต่งงานเป็นเหตุการณ์สำคัญของคู่รัก เมื่อเริ่มเตรียมงานมีกิจกรรมที่ต้องทำมากมายจนไม่รู้จะเริ่มจากตรงไหน หลายคนค้นหาข้อมูลจาก Google เพื่อหาผู้จัดงาน สถานที่แต่งงาน ของชำร่วย ช่างถ่ายภาพในงาน การถ่ายพรีเวดดิ้ง คนจัดดอกไม้ วงดนตรี และโต๊ะจีน จึงสร้างแอปพลิเคชันนี้เพื่อช่วยให้งานบางส่วนง่ายขึ้นในเวอร์ชันนี้",
    "สิ่งสำคัญที่สุดคือความทรงจำของคู่บ่าวสาว ตั้งแต่วันที่คิดจะแต่งงาน ความรู้สึกของเจ้าบ่าวและเจ้าสาว คำอวยพรจากแขก และบรรยากาศของงานแต่ง แอปช่วยให้กลับมาเปิดดูความทรงจำได้ง่าย และช่วยค้นหาสถานที่ เชิญแขก ประมาณการจำนวนผู้เข้าร่วมงาน และแจ้งเตือนกำหนดการต่าง ๆ",
    "ข้อมูลผลิตภัณฑ์เดิมระบุการแชร์ผ่าน Facebook, Twitter และ Google Plus เพื่อประชาสัมพันธ์แอปพลิเคชัน"
  ],
  features: [
    'คู่รักเก็บความทรงจำผ่านแอปพลิเคชันได้ โดยแขกรับเชิญทุกคนสามารถมีส่วนร่วมในการบันทึกความทรงจำ',
    'ช่วยให้คู่รักศึกษาข้อมูลสถานที่จัดงานแต่งงานได้สะดวก',
    'ส่งบัตรเชิญพร้อมรายละเอียดงาน สถานที่ และวันที่ ประมาณการจำนวนแขกที่ตอบรับ และจัดบริเวณโต๊ะเก้าอี้ของผู้ร่วมงาน',
    'แจ้งเตือนกำหนดการของเจ้าบ่าว เจ้าสาว และผู้ร่วมงาน',
    'แขกร่วมถ่ายรูป อัปโหลดรูป ฝากคำอวยพร กดถูกใจ และแสดงความคิดเห็นได้ รูปทั้งหมดสามารถแสดงผ่านเว็บไซต์บนโปรเจกเตอร์ตลอดงาน และนำยอดกดถูกใจมาจัดกิจกรรม เช่น ให้รางวัลแก่ผู้ที่ได้ยอดกดถูกใจมากที่สุด',
    'คู่รักค้นหาสถานที่แต่งงานได้จากจุดที่กำหนดเอง และตั้งระยะทางรอบจุดนั้นเป็นกิโลเมตร',
    'บันทึกการตอบรับเข้าร่วมงานและจำนวนผู้ติดตาม เพื่อประเมินจำนวนผู้ร่วมงาน พร้อมจัดโต๊ะที่นั่งในกรณีจัดเป็นโต๊ะจีน',
    'แจ้งเตือนความทรงจำของเจ้าบ่าว เจ้าสาว และแขกผู้ร่วมงาน'
  ],
  image: '/images/products/imme-application.svg'
}
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
        <NuxtLink to="/#products" class="inline-flex items-center gap-2 text-sm font-bold text-orange-800 hover:underline dark:text-orange-300">
          <ArrowLeft class="size-4" aria-hidden="true" />
          ย้อนกลับไปหน้าแคตตาล็อกสินค้า
        </NuxtLink>
      </nav>

      <section class="grid items-center gap-8 lg:grid-cols-12 lg:gap-14">
        <div class="min-w-0 space-y-5 lg:col-span-7">
          <p class="inline-flex rounded-full border border-orange-500/25 bg-orange-500/10 px-3.5 py-1 text-xs font-bold text-orange-800 dark:text-orange-300">
            {{ product.category }}
          </p>
          <h1 class="font-display text-3xl font-black leading-tight text-[#022C22] dark:text-white sm:text-5xl">
            {{ product.name }}
          </h1>
          <p class="whitespace-pre-line text-sm leading-relaxed text-slate-700 dark:text-slate-300 sm:text-base">{{ product.shortDesc }}</p>
          <a href="#contact" class="inline-flex items-center gap-2 rounded-2xl bg-orange-700 px-5 py-3 text-sm font-bold text-white shadow-sm hover:bg-orange-800">
            ติดต่อสอบถาม
            <ArrowUpRight class="size-4" aria-hidden="true" />
          </a>
        </div>
        <div class="spatial-glass rounded-3xl border border-orange-500/20 p-3 shadow-xl sm:p-5 lg:col-span-5">
          <img :src="product.image" :alt="product.name" class="mx-auto aspect-[4/3] w-full rounded-2xl object-contain">
        </div>
      </section>

      <section class="spatial-glass space-y-4 rounded-3xl border border-current/10 p-5 sm:p-8">
        <h2 class="font-display text-2xl font-black">iMme Application คืออะไร?</h2>
        <p v-for="paragraph in product.fullDetails" :key="paragraph" class="text-sm leading-relaxed text-slate-700 dark:text-slate-300 sm:text-base">{{ paragraph }}</p>
      </section>

      <section class="space-y-5">
        <h2 class="font-display text-2xl font-black">จุดเด่นและคุณสมบัติ</h2>
        <ul class="grid gap-4 md:grid-cols-2">
          <li v-for="(feature, index) in product.features" :key="index" class="spatial-glass flex items-start gap-3 rounded-2xl border border-current/10 p-4 sm:p-5">
            <CheckCircle2 class="mt-0.5 size-5 shrink-0 text-orange-700 dark:text-orange-300" aria-hidden="true" />
            <span class="min-w-0 break-words text-sm leading-relaxed sm:text-base">{{ feature }}</span>
          </li>
        </ul>
      </section>
    </main>
    <ContactFooter />
  </div>
</template>

<style scoped>
.product-theme {
  --heading-accent-end: #9a3412;
  --heading-signal: #ea580c;
}

:global(html.dark) .product-theme {
  --heading-accent-end: #fed7aa;
  --heading-signal: #fb923c;
}
</style>
