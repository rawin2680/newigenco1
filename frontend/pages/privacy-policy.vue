<script setup lang="ts">
import AppHeader from '~/components/AppHeader.vue'
import ContactFooter from '~/components/ContactFooter.vue'
import { ArrowLeft, ArrowUpRight, Camera, CheckCircle2, ChevronDown, ClipboardList, FileText, Lock, Shield, Users } from 'lucide-vue-next'

const documents: { title: string; english?: string; icon: typeof Shield; href: string }[] = [
  { title: 'นโยบายการคุ้มครองข้อมูลส่วนบุคคล', english: 'Privacy Policy', icon: Shield, href: 'https://igenco.co.th/attactment/pdpa/02-privacyPolicy.pdf' },
  { title: 'แบบคำร้องขอใช้สิทธิของเจ้าของข้อมูลส่วนบุคคล', icon: ClipboardList, href: 'https://igenco.co.th/attactment/pdpa/09-privacyPolicy.pdf' },
  { title: 'คำประกาศเกี่ยวกับความเป็นส่วนตัวในการใช้กล้องวงจรปิด', english: 'CCTV Privacy Notice', icon: Camera, href: 'https://igenco.co.th/attactment/pdpa/12-privacyPolicy.pdf' },
  { title: 'คำประกาศเกี่ยวกับความเป็นส่วนตัวสำหรับผู้สมัครงานและผู้ปฏิบัติงาน', icon: Users, href: 'https://igenco.co.th/attactment/pdpa/15-privacyPolicy.pdf' }
]

useHead({
  title: 'นโยบายความเป็นส่วนตัว (Privacy Policy) - IGENCO',
  meta: [
    { name: 'description', content: 'นโยบายความเป็นส่วนตัวและการคุ้มครองข้อมูลส่วนบุคคล (PDPA) บริษัท ไอเจนโก้ จำกัด' }
  ]
})
</script>

<template>
  <div class="min-h-screen text-[#022C22] dark:text-[#F4FBF7] transition-colors selection:bg-[#00C864] selection:text-[#022C22]">
    <AppHeader />

    <main class="mx-auto max-w-[1200px] px-5 pb-20 pt-28 sm:px-10 lg:px-16">
      <!-- Breadcrumb -->
      <nav aria-label="เส้นทางนำทาง" class="mb-8 flex flex-wrap items-center gap-2 border-b border-current/10 pb-4 text-sm">
        <NuxtLink to="/" class="inline-flex items-center gap-1.5 font-bold text-emerald-800 hover:underline dark:text-emerald-300">
          <ArrowLeft class="size-4" aria-hidden="true" />
          <span>หน้าแรก</span>
        </NuxtLink>
        <span aria-hidden="true">/</span>
        <span aria-current="page" class="font-semibold">นโยบายความเป็นส่วนตัว</span>
      </nav>

      <!-- Header Banner -->
      <section aria-labelledby="privacy-heading" class="spatial-glass mb-10 space-y-5 rounded-3xl border border-emerald-500/20 bg-gradient-to-b from-emerald-50/80 to-transparent px-5 py-9 text-center dark:from-emerald-950/45 sm:px-12 sm:py-14">
        <div class="mx-auto grid size-14 place-items-center rounded-2xl border border-emerald-500/25 bg-emerald-500/10 text-emerald-800 dark:text-emerald-300">
          <Shield class="size-7" aria-hidden="true" />
        </div>
        <h1 id="privacy-heading" class="text-center font-display text-3xl font-black leading-tight tracking-tight sm:text-5xl lg:text-6xl">
          นโยบายความเป็นส่วนตัว
        </h1>
        <p class="mx-auto max-w-2xl text-sm leading-relaxed text-slate-700 dark:text-slate-300 sm:text-base">
          บริษัท ไอเจนโก้ จำกัด ให้ความสำคัญอย่างยิ่งต่อการคุ้มครองข้อมูลส่วนบุคคลของท่าน เพื่อให้ท่านมั่นใจว่าข้อมูลส่วนบุคคลของท่านจะได้รับความคุ้มครองตามพระราชบัญญัติคุ้มครองข้อมูลส่วนบุคคล พ.ศ. 2562 (PDPA)
        </p>
      </section>

      <section aria-labelledby="privacy-documents" class="mb-10 space-y-4">
        <h2 id="privacy-documents" class="font-display text-2xl font-black">เอกสารความเป็นส่วนตัว</h2>
        <ul class="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <li v-for="entry in documents" :key="entry.title" class="min-w-0">
            <a :href="entry.href" :aria-label="`เปิดเอกสาร PDF: ${entry.title} (แท็บใหม่)`" target="_blank" rel="noopener noreferrer" class="group spatial-glass flex h-full flex-col gap-4 rounded-3xl border border-current/10 p-5 shadow-sm transition-[border-color,box-shadow] hover:border-emerald-500/50 hover:shadow-md focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-emerald-600">
              <span class="grid size-11 place-items-center rounded-xl border border-emerald-500/20 bg-emerald-500/10 text-emerald-800 dark:text-emerald-300">
                <component :is="entry.icon" class="size-5" aria-hidden="true" />
              </span>
              <div class="space-y-1">
                <h3 class="font-display text-base font-bold leading-snug">{{ entry.title }}</h3>
                <p v-if="entry.english" lang="en" class="text-sm text-slate-600 dark:text-slate-300">{{ entry.english }}</p>
              </div>
              <span class="mt-auto flex min-h-11 items-center justify-between gap-2 rounded-xl bg-emerald-500/10 px-3.5 py-2 text-sm font-bold text-emerald-900 group-hover:bg-emerald-500/20 dark:text-emerald-200">
                เปิด PDF
                <ArrowUpRight class="size-4 shrink-0" aria-hidden="true" />
              </span>
            </a>
          </li>
        </ul>
      </section>

      <!-- Policy Content -->
      <details class="group spatial-glass rounded-2xl border border-current/10">
        <summary class="flex cursor-pointer list-none items-center justify-between gap-3 rounded-2xl p-5 font-bold focus-visible:outline-emerald-600 [&::-webkit-details-marker]:hidden">
          ข้อมูลการคุ้มครองข้อมูลส่วนบุคคลบนเว็บไซต์
          <ChevronDown class="size-5 shrink-0 text-emerald-700 transition-transform group-open:rotate-180 dark:text-emerald-300 motion-reduce:transition-none" aria-hidden="true" />
        </summary>
        <div class="space-y-4 px-4 pb-4 text-sm leading-relaxed sm:px-5 sm:pb-5 sm:text-base">
        
        <!-- Section 1 -->
        <section class="spatial-glass rounded-2xl p-6 sm:p-8 border border-current/10 space-y-3">
          <h2 class="text-lg sm:text-xl font-bold flex items-center gap-2 text-[#00C864] dark:text-[#00FF88]">
            <Lock class="w-5 h-5 shrink-0" />
            <span>1. ข้อมูลส่วนบุคคลที่เราเก็บรวบรวม</span>
          </h2>
          <p>บริษัทฯ อาจเก็บรวบรวมข้อมูลส่วนบุคคลของท่านเมื่อท่านใช้งานเว็บไซต์ ติดต่อสอบถาม หรือใช้บริการระบบของเรา ได้แก่:</p>
          <ul class="list-disc pl-5 space-y-1.5 opacity-85">
            <li>ข้อมูลการระบุตัวตน เช่น ชื่อ-นามสกุล, ตำแหน่ง, ชื่อองค์กร หรือหน่วยงาน</li>
            <li>ข้อมูลการติดต่อ เช่น หมายเลขโทรศัพท์, ที่อยู่อีเมล, ที่อยู่สถานที่ทำงาน</li>
            <li>ข้อมูลทางเทคนิค เช่น IP Address, ชนิดเบราว์เซอร์, คุกกี้ และประวัติการเข้าชมเว็บไซต์</li>
          </ul>
        </section>

        <!-- Section 2 -->
        <section class="spatial-glass rounded-2xl p-6 sm:p-8 border border-current/10 space-y-3">
          <h2 class="text-lg sm:text-xl font-bold flex items-center gap-2 text-[#00C864] dark:text-[#00FF88]">
            <FileText class="w-5 h-5 shrink-0" />
            <span>2. วัตถุประสงค์ในการเก็บรวบรวมและใช้ข้อมูล</span>
          </h2>
          <ul class="space-y-2 opacity-85">
            <li class="flex items-start gap-2">
              <CheckCircle2 class="w-4 h-4 text-[#00C864] dark:text-[#00FF88] shrink-0 mt-1" />
              <span>เพื่อตอบสนองต่อคำขอสอบถามข้อมูล บริการให้คำปรึกษา หรือการสาธิตระบบงาน</span>
            </li>
            <li class="flex items-start gap-2">
              <CheckCircle2 class="w-4 h-4 text-[#00C864] dark:text-[#00FF88] shrink-0 mt-1" />
              <span>เพื่อพัฒนา ประเมิน และปรับปรุงประสิทธิภาพของผลิตภัณฑ์และบริการภายใต้แบรนด์ IGENCO</span>
            </li>
            <li class="flex items-start gap-2">
              <CheckCircle2 class="w-4 h-4 text-[#00C864] dark:text-[#00FF88] shrink-0 mt-1" />
              <span>เพื่อการปฏิบัติตามกฎหมาย กฎระเบียบ หรือคำสั่งของหน่วยงานที่มีอำนาจตามกฎหมาย</span>
            </li>
          </ul>
        </section>

        <!-- Section 3 -->
        <section class="spatial-glass rounded-2xl p-6 sm:p-8 border border-current/10 space-y-3">
          <h2 class="text-lg sm:text-xl font-bold flex items-center gap-2 text-[#00C864] dark:text-[#00FF88]">
            <Shield class="w-5 h-5 shrink-0" />
            <span>3. มาตรการรักษาความปลอดภัยของข้อมูล</span>
          </h2>
          <p>
            บริษัท ไอเจนโก้ จำกัด ได้รับการรับรองมาตรฐานวิศวกรรมซอฟต์แวร์ระดับสากล <strong>ISO/IEC 29110</strong> เราจึงใช้มาตรการรักษาความมั่นคงปลอดภัยทั้งทางกายภาพและทางเทคโนโลยีที่ได้มาตรฐานสากล เช่น การเข้ารหัสข้อมูล (Encryption), การควบคุมสิทธิ์การเข้าถึง (Access Control), และการตรวจสอบความปลอดภัยอย่างสม่ำเสมอ
          </p>
        </section>

        <!-- Section 4 -->
        <section class="spatial-glass rounded-2xl p-6 sm:p-8 border border-current/10 space-y-3">
          <h2 class="text-lg sm:text-xl font-bold text-[#00C864] dark:text-[#00FF88]">
            4. สิทธิของเจ้าของข้อมูลส่วนบุคคล
          </h2>
          <p>
            ท่านมีสิทธิในการขอเข้าถึง ขอรับสำเนา ขอแก้ไข ขอระงับการใช้ หรือขอให้ลบข้อมูลส่วนบุคคลของท่านตามที่กฎหมาย PDPA กำหนด โดยสามารถติดต่อเจ้าหน้าที่คุ้มครองข้อมูลส่วนบุคคล (DPO) ของบริษัทฯ ได้ตลอดเวลา
          </p>
          <div class="pt-2 text-xs font-mono opacity-80">
            ติดต่อ: บริษัท ไอเจนโก้ จำกัด (IGENCO.Co.,Ltd) | อีเมล: sales@igenco.co.th | โทร: 0-2523-3559, 063-5254850
          </div>
        </section>

        </div>
      </details>
    </main>

    <ContactFooter />
  </div>
</template>
