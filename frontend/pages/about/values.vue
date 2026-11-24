<script setup lang="ts">
import AppHeader from '~/components/AppHeader.vue'
import ContactFooter from '~/components/ContactFooter.vue'
import { Sparkles, ArrowLeft, ArrowUpRight } from 'lucide-vue-next'

useHead({
  title: 'ค่านิยมและวัฒนธรรมองค์กร (I-G-E-N) - บริษัท ไอเจนโก้ จำกัด (IGENCO)',
  meta: [
    {
      name: 'description',
      content: 'ค่านิยมหลัก 4 ประการของ IGENCO: Innovation, Growth, Excellence, และ Network & Care ขับเคลื่อนวิศวกรรมซอฟต์แวร์ไทยสู่มาตรฐานสากล'
    }
  ]
})

const values = [
  {
    letter: 'I',
    name: 'INNOVATION',
    th: 'นวัตกรรมสร้างสรรค์',
    sub: 'วิจัยและพัฒนาผลิตภัณฑ์ระบบงานคอมพิวเตอร์ที่ทันสมัย',
    desc: 'มุ่งเน้นการวิจัยและพัฒนาผลิตภัณฑ์ให้เป็นนวัตกรรมใหม่เพื่อเป็นทางเลือกที่มีประสิทธิภาพ ภายใต้แบรนด์ "IGENCO" ซึ่งเป็นระบบ Web Application ที่ได้รับการการันตีคุณภาพและความไว้วางใจจากลูกค้าอย่างต่อเนื่อง ตอบสนองต่อการเปลี่ยนแปลงทางเทคโนโลยีในยุคดิจิทัลได้อย่างรวดเร็ว'
  },
  {
    letter: 'G',
    name: 'GROWTH',
    th: 'เติบโตเคียงข้างลูกค้า',
    sub: 'ยึดถือความสำเร็จขององค์กรลูกค้าเป็นเป้าหมายสูงสุด',
    desc: 'การบริหารองค์กรภายใต้นโยบายการทำงานอย่างใกล้ชิดกับลูกค้า ใส่ใจทุกขั้นตอนของกระบวนการพัฒนาระบบ เพื่อให้ระบบที่ส่งมอบสามารถรองรับการขยายตัวทางธุรกิจของลูกค้าได้อย่างมั่นคง ยั่งยืน และคุ้มค่าต่อการลงทุน'
  },
  {
    letter: 'E',
    name: 'EXCELLENCE',
    th: 'มาตรฐานคุณภาพเป็นเลิศ',
    sub: 'ยึดมั่นในกรอบมาตรฐานวิศวกรรมสากล ISO/IEC 29110',
    desc: 'ผ่านการตรวจรับรองมาตรฐานระดับสากล ISO/IEC 29110 ด้าน Project Management และ Software Implementation จากสถาบัน TÜV NORD ทำให้กระบวนการวิเคราะห์ ออกแบบ พัฒนา ทดสอบ และส่งมอบงานทุกโครงการเป็นไปตามมาตรฐานวิศวกรรมระดับโลก'
  },
  {
    letter: 'N',
    name: 'NETWORK & CARE',
    th: 'ความร่วมมือและความใส่ใจ',
    sub: 'พลังแห่งความร่วมมือและบริการด้วยความจริงใจ',
    desc: 'ผสานความร่วมมือกับหน่วยงานระดับประเทศ เช่น Software Park Thailand, SIPA และ BOI ควบคู่กับการดูแลและให้บริการลูกค้าด้วยความใส่ใจในทุกรายละเอียด ทั้งก่อนการติดตั้ง การฝึกอบรมผู้ใช้งาน และการสนับสนุนทางเทคนิคระยะยาว'
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
        <span class="text-[#00A852] dark:text-[#00FF88] font-bold">ค่านิยมและวัฒนธรรมองค์กร</span>
      </div>

      <!-- Header -->
      <div class="pb-16 border-b border-black/10 dark:border-white/10 space-y-5 max-w-4xl">
        <div class="inline-flex items-center gap-2 text-xs font-mono font-bold tracking-[0.22em] uppercase text-[#00A852] dark:text-[#00FF88]">
          <Sparkles class="w-4 h-4" />
          <span>CULTURE // ค่านิยมและวัฒนธรรมองค์กร</span>
        </div>
        <h1 class="text-3xl sm:text-5xl lg:text-6xl font-display font-extrabold tracking-tight text-[#0A1A12] dark:text-[#F8FAFC] leading-tight">
          ค่านิยมหลัก 4 เสาหลัก (I - G - E - N)
        </h1>
        <p class="text-lg sm:text-xl text-[#334155] dark:text-[#94A3B8] leading-relaxed font-light">
          ดีเอ็นเอการทำงานของบุคลากรไอเจนโก้ทุกคน เพื่อขับเคลื่อนคุณภาพซอฟต์แวร์ไทยสู่มาตรฐานระดับสากล
        </p>
      </div>

      <!-- Values 4 Pillars List -->
      <div class="py-16 space-y-8 border-b border-black/10 dark:border-white/10">
        <div
          v-for="val in values"
          :key="val.letter"
          class="p-8 sm:p-10 rounded-3xl border border-black/10 dark:border-white/10 space-y-6 bg-white/40 dark:bg-white/[0.01]"
        >
          <div class="flex items-baseline justify-between border-b border-black/10 dark:border-white/10 pb-6">
            <div class="flex items-center gap-4">
              <span class="text-5xl sm:text-6xl font-mono font-extrabold text-[#00A852] dark:text-[#00FF88]">
                {{ val.letter }}
              </span>
              <div>
                <h2 class="text-2xl sm:text-3xl font-bold text-[#0A1A12] dark:text-white">{{ val.name }}</h2>
                <div class="text-sm font-semibold text-[#00A852] dark:text-[#00FF88]">{{ val.th }}</div>
              </div>
            </div>
            <div class="text-xs font-mono uppercase tracking-widest opacity-50 hidden sm:block">
              IGENCO VALUE
            </div>
          </div>

          <div class="space-y-2">
            <div class="text-base sm:text-lg font-semibold text-[#0A1A12] dark:text-white">
              {{ val.sub }}
            </div>
            <p class="text-sm sm:text-base text-[#475569] dark:text-[#94A3B8] leading-relaxed">
              {{ val.desc }}
            </p>
          </div>
        </div>
      </div>

      <!-- Navigation Links -->
      <div class="pt-16 flex flex-wrap items-center justify-between gap-4">
        <NuxtLink to="/about/organization" class="inline-flex items-center gap-2 text-sm font-bold text-[#00A852] dark:text-[#00FF88] hover:underline">
          <span>ดูแผนผังและโครงสร้างการบริหารงานต่อไป</span>
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
