<script setup lang="ts">
import AppHeader from '~/components/AppHeader.vue'
import KineticBand from '~/components/KineticBand.vue'
import ContactFooter from '~/components/ContactFooter.vue'
import { Users, ArrowLeft, ArrowUpRight, ShieldCheck, CheckCircle2 } from 'lucide-vue-next'

useHead({
  title: 'กลุ่มผู้ใช้ผลิตภัณฑ์และพันธมิตร (Clients & Partners) - IGENCO',
  meta: [
    {
      name: 'description',
      content: 'หน่วยงานภาครัฐ รัฐวิสาหกิจ สถาบันการศึกษา และภาคเอกชนกว่า 100 แห่งที่ให้ความไว้วางใจระบบงานซอฟต์แวร์ของ บริษัท ไอเจนโก้ จำกัด'
    }
  ]
})

const clientCategories = [
  {
    name: 'หน่วยงานภาครัฐและองค์กรกำกับดูแล',
    desc: 'ระบบขอรับความเห็นชอบแบบและข้อความกรมธรรม์ออนไลน์ (I-SERFF), ระบบจัดเก็บข้อมูลอิเล็กทรอนิกส์, และระบบ e-Office',
    examples: ['สำนักงานคณะกรรมการกำกับและส่งเสริมการประกอบธุรกิจประกันภัย (คปภ.)', 'สถาบันคุ้มครองเงินฝาก (สคฝ.)', 'สำนักงานส่งเสริมเศรษฐกิจดิจิทัล (depa)', 'สำนักงานนวัตกรรมแห่งชาติ (NIA)']
  },
  {
    name: 'สถาบันการศึกษาและมหาวิทยาลัยชั้นนำ',
    desc: 'ความร่วมมือทางวิชาการ การวิจัยพัฒนาระบบเทคโนโลยีสารสนเทศ และระบบบริหารจัดการข้อมูล',
    examples: ['มหาวิทยาลัยธรรมศาสตร์ (ความร่วมมือพัฒนาระบบ I-SERFF)', 'สถาบันการศึกษาและเครือข่ายวิจัยเทคโนโลยี']
  },
  {
    name: 'สถาบันการเงินและบริษัทประกันภัย',
    desc: 'ระบบเชื่อมต่อและนำส่งรายงานทางการเงินอิเล็กทรอนิกส์ (EFMS) และระบบบริหารจัดการความเสี่ยง',
    examples: ['ตัวแทนบริษัทประกันชีวิตและวินาศภัยทั่วประเทศ', 'สถาบันการเงินภายใต้การคุ้มครองของสถาบันคุ้มครองเงินฝาก']
  },
  {
    name: 'พันธมิตรเทคโนโลยีและมาตรฐานสากล',
    desc: 'การรับรองมาตรฐานวิศวกรรมซอฟต์แวร์ และโครงสร้างพื้นฐานระดับสากล',
    examples: ['สถาบันรับรองมาตรฐาน TÜV NORD (ISO/IEC 29110)', 'สำนักงานคณะกรรมการส่งเสริมการลงทุน (BOI)', 'Software Park Thailand', 'AIS 5G Enterprise Alliance']
  }
]
</script>

<template>
  <div class="min-h-screen bg-[#FBFDFB] dark:bg-[#030906] text-[#0F172A] dark:text-[#F1F5F9] transition-colors selection:bg-[#00C864] selection:text-[#022C22]">
    <AppHeader />

    <!-- Subpage Breadcrumb Bar -->
    <div class="pt-24 sm:pt-28 pb-4 border-b border-black/5 dark:border-white/5 bg-black/[0.01] dark:bg-white/[0.01]">
      <div class="max-w-[1360px] mx-auto px-5 sm:px-10 lg:px-16 flex items-center justify-between text-xs font-mono">
        <div class="flex items-center gap-2 opacity-70">
          <NuxtLink to="/" class="hover:text-[#00A852] dark:hover:text-[#00FF88]">หน้าแรก</NuxtLink>
          <span>/</span>
          <span class="text-[#00A852] dark:text-[#00FF88] font-bold">กลุ่มผู้ใช้ผลิตภัณฑ์ (Clients & Partners)</span>
        </div>
      </div>
    </div>

    <!-- Header Section -->
    <div class="max-w-[1360px] mx-auto px-5 sm:px-10 lg:px-16 pt-16 pb-12">
      <div class="max-w-3xl space-y-4">
        <div class="inline-flex items-center gap-2 text-xs font-mono font-bold tracking-[0.22em] uppercase text-[#00A852] dark:text-[#00FF88]">
          <Users class="w-4 h-4" />
          <span>CLIENTS & PARTNER ECOSYSTEM</span>
        </div>
        <h1 class="text-3xl sm:text-5xl font-display font-extrabold tracking-tight text-[#0A1A12] dark:text-[#F8FAFC]">
          ความไว้วางใจจากกว่า 100 องค์กรระดับประเทศ
        </h1>
        <p class="text-base sm:text-lg text-[#334155] dark:text-[#94A3B8] leading-relaxed">
          ไอเจนโก้ มุ่งมั่นพัฒนาซอฟต์แวร์คุณภาพสูง เพื่อสนับสนุนการขับเคลื่อนงานบริการภาครัฐ รัฐวิสาหกิจ และภาคธุรกิจอย่างมั่นคง
        </p>
      </div>

      <!-- Categories Grid -->
      <div class="grid grid-cols-1 md:grid-cols-2 gap-8 pt-14 pb-8">
        <div
          v-for="cat in clientCategories"
          :key="cat.name"
          class="p-8 rounded-3xl border border-black/10 dark:border-white/10 space-y-4"
        >
          <div class="space-y-1">
            <h3 class="text-xl font-bold text-[#0A1A12] dark:text-white">{{ cat.name }}</h3>
            <p class="text-xs text-[#64748B] dark:text-[#94A3B8]">{{ cat.desc }}</p>
          </div>
          <div class="space-y-2 pt-2 border-t border-black/5 dark:border-white/5">
            <div
              v-for="ex in cat.examples"
              :key="ex"
              class="flex items-start gap-2 text-xs text-[#334155] dark:text-[#94A3B8]"
            >
              <CheckCircle2 class="w-4 h-4 text-[#00A852] dark:text-[#00FF88] shrink-0 mt-0.5" />
              <span>{{ ex }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Animated Partner Band Component -->
    <KineticBand />

    <ContactFooter />
  </div>
</template>
