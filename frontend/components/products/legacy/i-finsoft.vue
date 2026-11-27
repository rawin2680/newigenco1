<script setup lang="ts">
import { ArrowLeft, ArrowUpRight, Calculator, ChevronRight, Download, Landmark, Package, Phone, Users } from 'lucide-vue-next'
import AppHeader from '~/components/AppHeader.vue'
import ContactFooter from '~/components/ContactFooter.vue'

const brochureUrl = 'https://www.igenco.co.th/path/iFinSoft/IGENCO_iFinSoft_V1_0.pdf'

const modules = [
  {
    title: 'ระบบวางแผนงบประมาณแบบมุ่งเน้นผลงาน',
    english: 'Performance-Based Budgeting System',
    icon: Landmark,
    description: "เป็นระบบงานที่ช่วยให้หน่วยงานสามารถทำงานได้อย่างมีประสิทธิภาพ ประกอบด้วยการวางแผนการใช้วงเงินในการบริหารงบประมาณทั้งด้านรับและจ่าย สามารถทำรายการในระดับหน่วยงาน งบประมาณ แผนงานงบประมาณ ผลผลิตหรืองาน/โครงการ ตลอดจนบริหารงบประมาณและติดตามควบคุมการทำงานให้เป็นไปตามแผนที่วางไว้"
  },
  {
    title: 'ระบบบัญชีการเงินและระบบบัญชีต้นทุน',
    english: 'Financial Accounting System',
    icon: Calculator,
    description: "ประกอบด้วยงานการเงินด้านรับ งานการเงินด้านจ่าย บัญชีแยกประเภท บัญชีเจ้าหนี้ และบัญชีลูกหนี้ ระบบงานเชื่อมโยงกันตั้งแต่การตั้งหนี้และการชำระเงิน หรือการตั้งลูกหนี้และการรับชำระเงิน สามารถสร้างข้อมูลบัญชีอัตโนมัติเพื่อนำไปสู่ระบบบัญชีแยกประเภท และจัดทำรายงานและวิเคราะห์งบการเงินได้หลายมุมมอง ทั้งระดับหน่วยงาน แผนงานงบประมาณ ผลผลิตหรืองาน/โครงการ และกิจกรรม"
  },
  {
    title: 'ระบบบริหารงานพัสดุและทะเบียนครุภัณฑ์',
    english: 'Procurement and Fixed Asset Management System',
    icon: Package,
    description: "ประกอบด้วยการจัดซื้อจัดจ้าง การจัดการพัสดุคงคลัง ทะเบียนครุภัณฑ์ การจำหน่ายครุภัณฑ์ และการตรวจนับพัสดุ ระบบงานเชื่อมโยงกันตั้งแต่การขอซื้อ/ขอจ้าง การสั่งซื้อ/สั่งจ้าง และการตรวจรับพัสดุ แต่ละระบบสร้างรายการความเคลื่อนไหวของวัสดุคงคลังเพื่อให้วิเคราะห์สถานะรายการวัสดุได้ และสามารถเชื่อมโยงไปยังบัญชีแยกประเภทตามที่กำหนด"
  },
  {
    title: 'ระบบบริหารงานบุคลากรและเงินเดือน',
    english: 'Human Resource Management System',
    icon: Users,
    description: "ครอบคลุมงานบุคคลและเงินเดือน บันทึก จัดเก็บ และเชื่อมโยงประวัติด้านต่าง ๆ ของบุคลากร ตั้งแต่ก่อนเข้าทำงาน หลังเริ่มทำงาน จนกระทั่งออกจากงาน ช่วยฝ่ายทรัพยากรมนุษย์ประมวลผลข้อมูลพนักงานจำนวนมากโดยคำนึงถึงความถูกต้องและความปลอดภัยของข้อมูล และเพิ่มความสะดวกรวดเร็วในการให้บริการข้อมูลแก่หน่วยงานต่าง ๆ และบุคลากร ผู้บังคับบัญชาสามารถดูข้อมูลพนักงานในสังกัดของตนเอง และพนักงานสามารถปรับปรุงประวัติส่วนที่ไม่ต้องใช้หลักฐานการเปลี่ยนแปลงได้"
  }
]

useHead({
  title: 'i-FINSOFT – ERP | บริษัท ไอเจนโก้ จำกัด',
  meta: [{ name: 'description', content: 'โปรแกรมบริหารทรัพยากรองค์กร i-FINSOFT ครอบคลุมงบประมาณ บัญชี พัสดุ บุคลากร และเงินเดือน' }]
})
</script>

<template>
  <div class="relative flex min-h-screen flex-col text-slate-800 dark:text-slate-100">
    <AppHeader />

    <main class="finsoft-theme relative z-10 mx-auto w-full max-w-[1440px] flex-1 space-y-12 px-5 pb-20 pt-28 sm:space-y-20 sm:px-10 lg:px-16">
      <nav aria-label="เส้นทางนำทาง" class="flex items-center justify-between gap-4 border-b border-current/10 pb-4">
        <NuxtLink to="/#products" class="group inline-flex items-center gap-2 text-sm font-bold text-red-800 hover:underline dark:text-red-300">
          <ArrowLeft class="size-4 transition-transform group-hover:-translate-x-1" aria-hidden="true" />
          ย้อนกลับไปหน้าแคตตาล็อกสินค้า
        </NuxtLink>
        <div class="hidden items-center gap-2 text-xs opacity-75 sm:flex">
          <NuxtLink to="/">หน้าแรก</NuxtLink>
          <ChevronRight class="size-3.5" aria-hidden="true" />
          <NuxtLink to="/#products">ผลิตภัณฑ์</NuxtLink>
          <ChevronRight class="size-3.5" aria-hidden="true" />
          <span aria-current="page">i-FINSOFT – ERP</span>
        </div>
      </nav>

      <section class="grid items-center gap-8 lg:grid-cols-12 lg:gap-14">
        <div class="min-w-0 space-y-5 lg:col-span-7">
          <div>
            <h1 class="font-display text-3xl font-black leading-tight text-[#022C22] dark:text-white sm:text-5xl lg:text-6xl">
              i-FINSOFT <span class="text-red-700 dark:text-red-300">– ERP</span>
            </h1>
            <p class="mt-3 font-display text-lg font-bold text-red-800 dark:text-red-300 sm:text-2xl">โปรแกรมเพื่อการบริหารทรัพยากรขององค์กร</p>
            <p class="mt-1 text-sm text-slate-600 dark:text-slate-300">Enterprise Resource Planning</p>
          </div>
          <div class="max-w-2xl space-y-4 text-sm leading-relaxed text-slate-700 dark:text-slate-300 sm:text-base">
            <p>
              เป็นโปรแกรมที่ช่วยให้การบริหารทรัพยากรขององค์กรเป็นไปอย่างมีประสิทธิภาพและสามารถนำผลการวิเคราะห์มาช่วยในการวางแผนของผู้บริหารได้ โปรแกรม i-FINSOFT สามารถใช้ได้กับหน่วยงานราชการหรือองค์กรเอกชน
            </p>
            <p>
              สามารถรองรับการทำงานภายในองค์กรได้อย่างมีระเบียบ และสามารถหาข้อมูลและจัดทำรายงานได้โดยง่าย ระบบงานต่าง ๆ สามารถทำงานได้ทั้งแบบอิสระแยกจากกัน หรือเชื่อมโยงแลกเปลี่ยนข้อมูลระหว่างกัน
            </p>
          </div>
          <div class="flex flex-wrap gap-3">
            <a href="#finsoft-contact" class="inline-flex items-center gap-2 rounded-2xl bg-red-700 px-5 py-3 text-sm font-bold text-white shadow-sm hover:bg-red-800">
              นัดสาธิตระบบ
              <ArrowUpRight class="size-4" aria-hidden="true" />
            </a>
            <a :href="brochureUrl" target="_blank" rel="noopener noreferrer" class="spatial-glass inline-flex items-center gap-2 rounded-2xl border border-red-500/30 px-5 py-3 text-sm font-bold hover:border-red-500">
              <Download class="size-4" aria-hidden="true" />
              ดาวน์โหลดคุณสมบัติระบบ (PDF)
            </a>
          </div>
        </div>
        <div class="spatial-glass rounded-3xl border border-red-500/20 p-3 shadow-xl sm:p-5 lg:col-span-5">
          <img src="/images/products/i-finsoft.jpg" alt="ภาพประกอบโปรแกรม i-FINSOFT – ERP" class="mx-auto aspect-[4/3] w-full rounded-2xl object-contain">
        </div>
      </section>

      <section aria-labelledby="finsoft-modules" class="space-y-6">
        <h2 id="finsoft-modules" class="font-display text-2xl font-black text-[#022C22] dark:text-white sm:text-4xl">ระบบงานของ i-FINSOFT</h2>
        <div class="grid gap-5 md:grid-cols-2">
          <article v-for="module in modules" :key="module.english" class="spatial-glass space-y-4 rounded-3xl border border-current/10 p-5 sm:p-7">
            <div class="flex items-start gap-3">
              <span class="grid size-10 shrink-0 place-items-center rounded-xl bg-red-500/10 text-red-800 dark:text-red-300">
                <component :is="module.icon" class="size-5" aria-hidden="true" />
              </span>
              <div>
                <h3 class="font-display text-lg font-bold leading-snug">{{ module.title }}</h3>
                <p lang="en" class="mt-1 text-xs text-slate-600 dark:text-slate-300">{{ module.english }}</p>
              </div>
            </div>
            <p class="text-sm leading-relaxed text-slate-700 dark:text-slate-300">{{ module.description }}</p>
          </article>
        </div>
      </section>

      <section id="finsoft-contact" class="spatial-glass flex scroll-mt-28 flex-wrap items-center justify-between gap-5 rounded-3xl border border-red-500/25 p-6 sm:p-8">
        <div class="space-y-2">
          <h2 class="font-display text-2xl font-black text-[#022C22] dark:text-white">ติดต่อสอบถามและนัดสาธิตระบบ</h2>
          <p class="text-sm text-slate-700 dark:text-slate-300">ฝ่ายการตลาดและการขาย · คุณภณิดาพร จูมมณี</p>
        </div>
        <a href="tel:+66962949236" class="inline-flex items-center gap-2 rounded-2xl bg-red-700 px-5 py-3 text-sm font-bold text-white hover:bg-red-800">
          <Phone class="size-4" aria-hidden="true" />
          โทร 09 6294 9236
        </a>
      </section>
    </main>

    <ContactFooter />
  </div>
</template>

<style scoped>
.finsoft-theme {
  --heading-accent-end: #991b1b;
  --heading-signal: #dc2626;
}

:global(html.dark) .finsoft-theme {
  --heading-accent-end: #fecaca;
  --heading-signal: #f87171;
}
</style>
