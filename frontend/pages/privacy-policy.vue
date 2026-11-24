<script setup lang="ts">
import AppHeader from '~/components/AppHeader.vue'
import ContactFooter from '~/components/ContactFooter.vue'
import { Shield, Lock, FileText, ArrowLeft, CheckCircle2 } from 'lucide-vue-next'

useHead({
  title: 'นโยบายความเป็นส่วนตัว (Privacy Policy) - IGENCO',
  meta: [
    { name: 'description', content: 'นโยบายความเป็นส่วนตัวและการคุ้มครองข้อมูลส่วนบุคคล (PDPA) บริษัท ไอเจนโก้ จำกัด' }
  ]
})
</script>

<template>
  <div class="min-h-screen bg-[#F6F9F7] dark:bg-[#020806] text-[#022C22] dark:text-[#F4FBF7] transition-colors selection:bg-[#00C864] selection:text-[#022C22]">
    <AppHeader />

    <main class="pt-28 pb-20 px-5 sm:px-10 lg:px-16 max-w-4xl mx-auto">
      <!-- Breadcrumb -->
      <div class="flex items-center gap-2 text-xs font-mono mb-8 opacity-70">
        <NuxtLink to="/" class="hover:text-[#00C864] dark:hover:text-[#00FF88] flex items-center gap-1">
          <ArrowLeft class="w-3.5 h-3.5" />
          <span>หน้าแรก</span>
        </NuxtLink>
        <span>/</span>
        <span>การคุ้มครองข้อมูลส่วนบุคคล</span>
        <span>/</span>
        <span class="text-[#00C864] dark:text-[#00FF88] font-semibold">นโยบายความเป็นส่วนตัว</span>
      </div>

      <!-- Header Banner -->
      <div class="spatial-glass rounded-3xl p-8 sm:p-12 border border-current/10 mb-10 relative overflow-hidden">
        <div class="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-[0.2em] text-[#00C864] dark:text-[#00FF88] mb-3 font-bold">
          <Shield class="w-4 h-4" />
          <span>PDPA COMPLIANCE // การคุ้มครองข้อมูลส่วนบุคคล</span>
        </div>
        <h1 class="font-display font-extrabold text-2xl sm:text-4xl leading-tight">
          นโยบายความเป็นส่วนตัว (Privacy Policy)
        </h1>
        <p class="text-sm sm:text-base opacity-75 mt-3 leading-relaxed">
          บริษัท ไอเจนโก้ จำกัด ให้ความสำคัญอย่างยิ่งต่อการคุ้มครองข้อมูลส่วนบุคคลของท่าน เพื่อให้ท่านมั่นใจว่าข้อมูลส่วนบุคคลของท่านจะได้รับความคุ้มครองตามพระราชบัญญัติคุ้มครองข้อมูลส่วนบุคคล พ.ศ. 2562 (PDPA)
        </p>
      </div>

      <!-- Policy Content -->
      <div class="space-y-8 text-sm sm:text-base leading-relaxed opacity-90">
        
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
    </main>

    <ContactFooter />
  </div>
</template>
