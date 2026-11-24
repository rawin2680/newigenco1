<script setup lang="ts">
import AppHeader from '~/components/AppHeader.vue'
import ContactFooter from '~/components/ContactFooter.vue'
import { FileText, ArrowLeft, ArrowUpRight, Target, ShieldCheck, HeartHandshake, CheckCircle2 } from 'lucide-vue-next'

useHead({
  title: 'นโยบายและวิสัยทัศน์การดำเนินงาน - บริษัท ไอเจนโก้ จำกัด (IGENCO)',
  meta: [
    {
      name: 'description',
      content: 'ปรัชญา วิสัยทัศน์ และนโยบายการทำงานของบริษัท ไอเจนโก้ จำกัด มุ่งเน้นการทำงานอย่างใกล้ชิดกับลูกค้า ใส่ใจในทุกขั้นตอน เพื่อส่งมอบงานที่เหนือความประทับใจ'
    }
  ]
})

const policies = [
  {
    icon: HeartHandshake,
    title: 'การทำงานอย่างใกล้ชิดกับลูกค้า',
    en: 'Close Client Collaboration',
    desc: 'ใส่ใจในทุกขั้นตอนและแนวทางการพัฒนาระบบ เพื่อให้มั่นใจว่างบประมาณและโซลูชันที่ได้จะตอบสนองเป้าหมายและความต้องการของลูกค้าอย่างแท้จริง'
  },
  {
    icon: Target,
    title: 'ผลิตภัณฑ์คุณภาพแบรนด์ IGENCO',
    en: 'Proprietary Innovation',
    desc: 'วิจัยและพัฒนาผลิตภัณฑ์ระบบงานคอมพิวเตอร์ที่ได้มาตรฐาน เพื่อเป็นทางเลือกที่มีประสิทธิภาพในรูปแบบ Web Application คุณภาพสูง'
  },
  {
    icon: ShieldCheck,
    title: 'ความต่อเนื่องและยั่งยืน',
    en: 'Sustainability & Trust',
    desc: 'มุ่งมั่นสร้างความไว้วางใจระยะยาว ด้วยการรับประกันและการสนับสนุนทางเทคนิคอย่างรวดเร็วและมืออาชีพ'
  }
]

const capabilities = [
  {
    code: '01 / IT Consultant',
    title: 'การให้คำปรึกษาด้านเทคโนโลยีสารสนเทศ',
    desc: 'บริการวิเคราะห์สถาปัตยกรรม ออกแบบและวางแผนระบบงานคอมพิวเตอร์ให้สอดคล้องกับเป้าหมายองค์กร'
  },
  {
    code: '02 / Software Development',
    title: 'การพัฒนาระบบโปรแกรมคอมพิวเตอร์',
    desc: 'วิจัย ออกแบบ และพัฒนา Web Application ระดับ Enterprise เน้นความแม่นยำ ปลอดภัย และเสถียรภาพ'
  },
  {
    code: '03 / IT Infrastructure',
    title: 'การวางระบบคอมพิวเตอร์และเครือข่าย',
    desc: 'บริการจัดหาระบบเครือข่ายความปลอดภัยสูง การเชื่อมต่อระหว่างศูนย์ข้อมูล และคลาวด์'
  },
  {
    code: '04 / Business Application',
    title: 'แอปพลิเคชันทางธุรกิจเฉพาะองค์กร',
    desc: 'โซลูชันระบบงานคอมพิวเตอร์สำเร็จรูปที่ปรับแต่งให้ตอบสนองบริบทเฉพาะของหน่วยงาน'
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
        <span class="text-[#00A852] dark:text-[#00FF88] font-bold">นโยบายและวิสัยทัศน์</span>
      </div>

      <!-- Header -->
      <div class="pb-16 border-b border-black/10 dark:border-white/10 space-y-5 max-w-4xl">
        <div class="inline-flex items-center gap-2 text-xs font-mono font-bold tracking-[0.22em] uppercase text-[#00A852] dark:text-[#00FF88]">
          <FileText class="w-4 h-4" />
          <span>PHILOSOPHY & POLICY // นโยบายและวิสัยทัศน์</span>
        </div>
        <h1 class="text-3xl sm:text-5xl lg:text-6xl font-display font-extrabold tracking-tight text-[#0A1A12] dark:text-[#F8FAFC] leading-tight">
          "การทำงานอย่างใกล้ชิดกับลูกค้า ใส่ใจในทุกขั้นตอน เพื่อส่งมอบงานที่เหนือความประทับใจ"
        </h1>
        <p class="text-lg sm:text-xl text-[#334155] dark:text-[#94A3B8] leading-relaxed font-light">
          ปรัชญาการทำงานของบริษัท ไอเจนโก้ จำกัด ที่มุ่งมั่นพัฒนาวิศวกรรมซอฟต์แวร์ไทยเพื่อสร้างคุณค่าที่แท้จริงให้แก่ทุกองค์กร
        </p>
      </div>

      <!-- 3 Pillars of Policy -->
      <div class="py-16 space-y-8 border-b border-black/10 dark:border-white/10">
        <div class="text-xs font-mono font-bold tracking-[0.2em] uppercase text-[#00A852] dark:text-[#00FF88]">
          CORE PILLARS // 3 หลักการดำเนินงาน
        </div>
        <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div
            v-for="pol in policies"
            :key="pol.title"
            class="p-8 rounded-3xl border border-black/10 dark:border-white/10 bg-white/40 dark:bg-white/[0.01] space-y-4"
          >
            <component :is="pol.icon" class="w-8 h-8 text-[#00A852] dark:text-[#00FF88]" />
            <h3 class="text-lg font-bold text-[#0A1A12] dark:text-white">{{ pol.title }}</h3>
            <div class="text-xs font-mono opacity-60">{{ pol.en }}</div>
            <p class="text-sm text-[#475569] dark:text-[#94A3B8] leading-relaxed">{{ pol.desc }}</p>
          </div>
        </div>
      </div>

      <!-- 4 Core Capabilities -->
      <div class="py-16 space-y-8 border-b border-black/10 dark:border-white/10">
        <div class="space-y-2">
          <div class="text-xs font-mono font-bold tracking-[0.2em] uppercase text-[#00A852] dark:text-[#00FF88]">
            CORE CAPABILITIES // ขอบเขตความเชี่ยวชาญ 4 ด้าน
          </div>
          <h2 class="text-2xl sm:text-4xl font-display font-extrabold text-[#0A1A12] dark:text-white">
            โซลูชันด้านไอทีที่ครอบคลุมทุกมิติ
          </h2>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div
            v-for="cap in capabilities"
            :key="cap.code"
            class="p-8 rounded-2xl border border-black/10 dark:border-white/10 space-y-2"
          >
            <div class="text-xs font-mono font-bold text-[#00A852] dark:text-[#00FF88]">{{ cap.code }}</div>
            <h3 class="text-lg font-bold text-[#0A1A12] dark:text-white">{{ cap.title }}</h3>
            <p class="text-sm text-[#475569] dark:text-[#94A3B8] leading-relaxed">{{ cap.desc }}</p>
          </div>
        </div>
      </div>

      <!-- Navigation to Other Sections -->
      <div class="pt-16 flex flex-wrap items-center justify-between gap-4">
        <NuxtLink to="/about/values" class="inline-flex items-center gap-2 text-sm font-bold text-[#00A852] dark:text-[#00FF88] hover:underline">
          <span>อ่านค่านิยมองค์กร (I-G-E-N) ต่อไป</span>
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
