<script setup lang="ts">
import AppHeader from '~/components/AppHeader.vue'
import ContactFooter from '~/components/ContactFooter.vue'
import { Users, ArrowLeft, ArrowUpRight, CheckCircle2 } from 'lucide-vue-next'

useHead({
  title: 'แผนผังและโครงสร้างการบริหาร - บริษัท ไอเจนโก้ จำกัด (IGENCO)',
  meta: [
    {
      name: 'description',
      content: 'โครงสร้างการบริหารงาน บริษัท ไอเจนโก้ จำกัด คณะกรรมการบริหาร สายงานพัฒนาซอฟต์แวร์ โครงสร้างพื้นฐานคลาวด์ การควบคุมคุณภาพ และลูกค้าสัมพันธ์'
    }
  ]
})

const managementTeams = [
  {
    num: '01',
    role: 'คณะกรรมการบริหาร',
    en: 'Executive Committee & Board of Directors',
    desc: 'กำหนดทิศทางยุทธศาสตร์องค์กร นโยบายคุณภาพ การลงทุน และการกำกับดูแลการดำเนินงานให้เป็นไปตามหลักธรรมาภิบาล'
  },
  {
    num: '02',
    role: 'ฝ่ายสถาปัตยกรรมและการพัฒนาซอฟต์แวร์',
    en: 'Software Architecture & Development Division',
    desc: 'รับผิดชอบการออกแบบสถาปัตยกรรมระบบ การพัฒนา Web Application และโซลูชันซอฟต์แวร์ระดับ Enterprise รองรับผู้ใช้งานปริมาณมาก'
  },
  {
    num: '03',
    role: 'ฝ่ายโครงสร้างพื้นฐาน เครือข่าย และระบบคลาวด์',
    en: 'IT Infrastructure, Cloud & Network Operations',
    desc: 'วางระบบแม่ข่าย โครงสร้างพื้นฐาน Cloud Mesh ระบบเครือข่ายความปลอดภัยสูง และการบริหารจัดการฐานข้อมูลระดับชาติ'
  },
  {
    num: '04',
    role: 'ฝ่ายกำกับดูแลมาตรฐานและคุณภาพซอฟต์แวร์',
    en: 'Quality Assurance & ISO Compliance Division',
    desc: 'ควบคุมกระบวนการบริหารโครงการ (Project Management) และการพัฒนา (Software Implementation) ตามมาตรฐานสากล ISO/IEC 29110'
  },
  {
    num: '05',
    role: 'ฝ่ายการตลาด การขาย และบริการลูกค้าสัมพันธ์',
    en: 'Sales, Marketing & Client Success Operations',
    desc: 'ประสานงานกับองค์กรภาครัฐและเอกชน จัดการสาธิตระบบงาน ให้คำปรึกษา และดูแลบริการหลังการขายอย่างใกล้ชิด'
  }
]
</script>

<template>
  <div class="min-h-screen bg-[#FBFDFB] dark:bg-[#030906] text-[#0F172A] dark:text-[#F1F5F9] transition-colors selection:bg-[#00C864] selection:text-[#022C22]">
    <AppHeader />

    <main class="pt-28 pb-24 max-w-[1200px] mx-auto px-5 sm:px-10 lg:px-16">
      <!-- Breadcrumb -->
      <div class="flex items-center gap-2 text-xs font-mono mb-10 opacity-70">
        <NuxtLink to="/" class="hover:text-[#00A852] dark:hover:text-[#00FF88] flex items-center gap-1">
          <ArrowLeft class="w-3.5 h-3.5" />
          <span>หน้าแรก</span>
        </NuxtLink>
        <span>/</span>
        <NuxtLink to="/about" class="hover:text-[#00A852] dark:hover:text-[#00FF88]">เกี่ยวกับเรา</NuxtLink>
        <span>/</span>
        <span class="text-[#00A852] dark:text-[#00FF88] font-bold">แผนผังการบริหาร</span>
      </div>

      <!-- Header -->
      <div class="pb-16 border-b border-black/10 dark:border-white/10 space-y-5 max-w-4xl">
        <div class="inline-flex items-center gap-2 text-xs font-mono font-bold tracking-[0.22em] uppercase text-[#00A852] dark:text-[#00FF88]">
          <Users class="w-4 h-4" />
          <span>ORGANIZATION // แผนผังการบริหาร</span>
        </div>
        <h1 class="text-3xl sm:text-5xl lg:text-6xl font-display font-extrabold tracking-tight text-[#0A1A12] dark:text-[#F8FAFC] leading-tight">
          โครงสร้างการบริหารงานที่คล่องตัวและได้มาตรฐานสากล
        </h1>
        <p class="text-lg sm:text-xl text-[#334155] dark:text-[#94A3B8] leading-relaxed font-light">
          ผสานการทำงานอย่างใกล้ชิดระหว่างผู้บริหารและทีมงานผู้เชี่ยวชาญ เพื่อส่งมอบผลงานที่มีคุณภาพสูงสุดแก่ลูกค้าทุกองค์กร
        </p>
      </div>

      <!-- Management Structure List -->
      <div class="py-16 space-y-6 border-b border-black/10 dark:border-white/10">
        <div
          v-for="team in managementTeams"
          :key="team.num"
          class="p-6 sm:p-8 rounded-2xl border border-black/10 dark:border-white/10 hover:border-[#00C864] dark:hover:border-[#00FF88] transition-all grid grid-cols-1 md:grid-cols-12 gap-4 md:gap-8 items-center bg-white/40 dark:bg-white/[0.01]"
        >
          <div class="md:col-span-1 text-3xl font-mono font-bold text-[#00A852] dark:text-[#00FF88]">
            {{ team.num }}
          </div>
          <div class="md:col-span-4 space-y-1">
            <h3 class="text-lg sm:text-xl font-bold text-[#0A1A12] dark:text-white">{{ team.role }}</h3>
            <div class="text-xs font-mono opacity-60">{{ team.en }}</div>
          </div>
          <div class="md:col-span-7 text-sm text-[#475569] dark:text-[#94A3B8] leading-relaxed">
            {{ team.desc }}
          </div>
        </div>
      </div>

      <!-- Navigation to Careers -->
      <div class="pt-16 flex flex-wrap items-center justify-between gap-4">
        <NuxtLink to="/careers" class="inline-flex items-center gap-2 text-sm font-bold text-[#00A852] dark:text-[#00FF88] hover:underline">
          <span>ร่วมงานกับเรา (เปิดรับสมัครงาน)</span>
          <ArrowUpRight class="w-4 h-4" />
        </NuxtLink>
        <NuxtLink to="/about" class="text-xs font-mono opacity-60 hover:opacity-100">
          กลับสู่ภาพรวมเกี่ยวกับเรา
        </NuxtLink>
      </div>
    </main>

    <ContactFooter />
  </div>
</template>
