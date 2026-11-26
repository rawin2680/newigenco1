<script setup lang="ts">
import AppHeader from '~/components/AppHeader.vue'
import ContactFooter from '~/components/ContactFooter.vue'
import { FileText, ArrowLeft, ArrowUpRight, Target, Eye, ShieldCheck, HeartHandshake, CheckCircle2, Sparkles, Quote, Landmark, Award } from 'lucide-vue-next'

useHead({
  title: 'นโยบายบริษัท วิสัยทัศน์และพันธกิจ - บริษัท ไอเจนโก้ จำกัด (IGENCO)',
  meta: [
    {
      name: 'description',
      content: 'นโยบายบริษัท วิสัยทัศน์ และพันธกิจ บริษัท ไอเจนโก้ จำกัด มุ่งสู่การเป็นผู้นำด้านการพัฒนาและให้บริการระบบเทคโนโลยีสารสนเทศตามมาตรฐานสากล ภายใต้บรรษัทภิบาล'
    }
  ]
})

const missions = [
  {
    num: '01',
    title: 'ให้บริการทางด้านการวิเคราะห์ ออกแบบ พัฒนาระบบงานคอมพิวเตอร์ด้วยเทคโนโลยีสารสนเทศที่ทันสมัย',
    desc: 'มุ่งมั่นสร้างสรรค์โซลูชันระบบงานที่ตอบสนองความต้องการในยุคดิจิทัล ด้วยสถาปัตยกรรมซอฟต์แวร์ที่ทันสมัย แม่นยำ และปลอดภัยสูง'
  },
  {
    num: '02',
    title: 'ปฏิบัติงานตามหลักวิชาการ ใช้ความรู้และประสบการณ์ที่เชี่ยวชาญของบุคลากรอย่างมืออาชีพ',
    desc: 'ดำเนินงานบนรากฐานของวิศวกรรมซอฟต์แวร์ที่ได้มาตรฐานสากล ผสานความเชี่ยวชาญของทีมงานที่มีประสบการณ์ในสายงาน IT มายาวนานกว่า 20 ปี'
  },
  {
    num: '03',
    title: 'ส่งมอบงานที่มีคุณภาพ สอดคล้องกับความต้องการของลูกค้า',
    desc: 'ยึดถือความพึงพอใจและความสำเร็จขององค์กรลูกค้าเป็นหัวใจสำคัญ ใส่ใจในทุกขั้นตอนเพื่อส่งมอบผลงานที่สร้างประโยชน์และคุณค่าอย่างแท้จริง'
  },
  {
    num: '04',
    title: 'ดำเนินกิจการด้วยความซื่อสัตย์และโปร่งใส โดยยึดหลักบรรษัทภิบาล',
    desc: 'ยึดมั่นในการกำกับดูแลกิจการที่ดี มีจริยธรรม โปร่งใส ตรวจสอบได้ เพื่อสร้างความมั่นคง ยั่งยืน และความไว้วางใจระยะยาวต่อผู้มีส่วนได้ส่วนเสียทุกฝ่าย'
  }
]

const policyPillars = [
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
    title: 'ความต่อเนื่องและยั่งยืนตามมาตรฐานสากล',
    en: 'Sustainability & Governance',
    desc: 'ควบคุมคุณภาพตามมาตรฐาน ISO/IEC 29110 พร้อมดำเนินงานด้วยความซื่อสัตย์ โปร่งใส และสร้างความไว้วางใจระยะยาว'
  }
]
</script>

<template>
  <div class="min-h-screen  text-[#0F172A] dark:text-[#F1F5F9] transition-colors selection:bg-[#00C864] selection:text-[#022C22]">
    <AppHeader />

    <main class="pt-28 pb-24 max-w-[1240px] mx-auto px-5 sm:px-10 lg:px-16">
      <!-- Breadcrumb -->
      <div class="flex items-center gap-2 text-xs font-mono mb-10 opacity-70">
        <NuxtLink to="/" class="hover:text-[#00A852] dark:hover:text-[#00FF88] flex items-center gap-1">
          <ArrowLeft class="w-3.5 h-3.5" />
          <span>หน้าแรก</span>
        </NuxtLink>
        <span>/</span>
        <NuxtLink to="/about" class="hover:text-[#00A852] dark:hover:text-[#00FF88]">เกี่ยวกับเรา</NuxtLink>
        <span>/</span>
        <span class="text-[#00A852] dark:text-[#00FF88] font-bold">นโยบายบริษัท</span>
      </div>

      <!-- Header Section -->
      <div class="pb-14 border-b border-black/10 dark:border-white/10 space-y-5 max-w-4xl">
        <div class="inline-flex items-center gap-2 text-xs font-mono font-bold tracking-[0.22em] uppercase text-[#00A852] dark:text-[#00FF88]">
          <FileText class="w-4 h-4" />
          <span>CORPORATE POLICY // นโยบายและเจตนารมณ์องค์กร</span>
        </div>
        <h1 class="text-3xl sm:text-5xl lg:text-6xl font-display font-extrabold tracking-tight text-[#0A1A12] dark:text-[#F8FAFC] leading-[1.15]">
          นโยบายบริษัท
        </h1>
        <p class="text-lg sm:text-xl text-[#334155] dark:text-[#94A3B8] leading-relaxed font-light">
          เจตนารมณ์ วิสัยทัศน์ และพันธกิจในการขับเคลื่อนวิศวกรรมซอฟต์แวร์ไทยสู่ความเป็นเลิศตามมาตรฐานสากล ภายใต้หลักบรรษัทภิบาล
        </p>
      </div>

      <!-- ========================================================
           VISION SECTION (วิสัยทัศน์ พร้อมภาพประกอบทรงกลมสัญลักษณ์)
      ========================================================= -->
      <div class="py-16 sm:py-20 border-b border-black/10 dark:border-white/10">
        <div class="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          <!-- Left: Vision Typography -->
          <div class="lg:col-span-7 space-y-6">
            <div class="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-mono font-bold tracking-wider uppercase bg-[#00A852]/10 dark:bg-[#00FF88]/10 text-[#00A852] dark:text-[#00FF88]">
              <Eye class="w-3.5 h-3.5" />
              <span>VISION // วิสัยทัศน์</span>
            </div>

            <div class="relative space-y-4">
              <h2 class="text-2xl sm:text-4xl lg:text-5xl font-display font-extrabold text-[#0A1A12] dark:text-[#F8FAFC] leading-[1.25]">
                "เป็นผู้นำในด้านพัฒนาและให้บริการด้วยระบบเทคโนโลยีสารสนเทศด้วยบริการที่เป็นเลิศตามมาตรฐานสากล ภายใต้บรรษัทภิบาล"
              </h2>
            </div>

            <p class="indent-8 text-base sm:text-lg text-[#475569] dark:text-[#94A3B8] leading-[1.95] text-justify font-normal">
              บริษัท ไอเจนโก้ จำกัด ยึดมั่นในวิสัยทัศน์การเป็นผู้นำด้านเทคโนโลยีสารสนเทศ ที่ไม่เพียงมุ่งเน้นการสร้างสรรค์นวัตกรรมซอฟต์แวร์ที่ทันสมัยเท่านั้น แต่ยังให้ความสำคัญสูงสุดกับคุณภาพการบริการที่เป็นเลิศตามกรอบมาตรฐานสากล พร้อมทั้งดำเนินธุรกิจด้วยความซื่อสัตย์ โปร่งใส และมีธรรมาภิบาลในทุกมิติ
            </p>
          </div>

          <!-- Right: Circular Vision Asset (ภาพกลมถือสมาร์ตโฟนหนังสือ) -->
          <div class="lg:col-span-5 flex justify-center lg:justify-end">
            <div class="relative group">
              <!-- Subtle decorative gradient ring -->
              <div class="absolute -inset-3 rounded-full bg-gradient-to-tr from-[#00C864]/20 to-[#00FF88]/30 blur-xl opacity-60 group-hover:opacity-100 transition-opacity" />
              
              <div class="relative w-72 h-72 sm:w-84 sm:h-84 md:w-96 md:h-96 rounded-full overflow-hidden border-4 border-white dark:border-[#0A1A12] shadow-2xl bg-white dark:bg-[#0A1A12]">
                <img
                  src="/images/about/igenco-vision-policy.png"
                  alt="ภาพสัญลักษณ์วิสัยทัศน์ นโยบายบริษัท ไอเจนโก้ จำกัด"
                  class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                >
              </div>

              <!-- Floating Micro Badge -->
              <div class="absolute -bottom-2 -left-2 bg-white/95 dark:bg-[#0A1A12]/95 backdrop-blur-md px-4 py-2.5 rounded-2xl border border-black/10 dark:border-white/10 shadow-lg flex items-center gap-2">
                <span class="w-2.5 h-2.5 rounded-full bg-[#00A852] dark:bg-[#00FF88] animate-pulse" />
                <span class="text-xs font-mono font-bold text-[#0A1A12] dark:text-white">IGENCO // VISION 2026</span>
              </div>
            </div>
          </div>

        </div>
      </div>

      <!-- ========================================================
           MISSION SECTION (พันธกิจ 4 ข้อ จัดวางอ่านง่าย สบายตา)
      ========================================================= -->
      <div class="py-16 sm:py-20 border-b border-black/10 dark:border-white/10 space-y-12">
        <div class="space-y-3 max-w-3xl">
          <div class="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-mono font-bold tracking-wider uppercase bg-[#00A852]/10 dark:bg-[#00FF88]/10 text-[#00A852] dark:text-[#00FF88]">
            <Target class="w-3.5 h-3.5" />
            <span>MISSION // พันธกิจ</span>
          </div>
          <h2 class="text-2xl sm:text-4xl font-display font-extrabold text-[#0A1A12] dark:text-white">
            พันธกิจ 4 ประการแห่งการส่งมอบคุณค่า
          </h2>
          <p class="text-base text-[#475569] dark:text-[#94A3B8] leading-relaxed">
            แนวทางปฏิบัติงานที่เป็นรูปธรรมของทีมงานไอเจนโก้ เพื่อบรรลุวิสัยทัศน์และสร้างความเชื่อมั่นอย่างยั่งยืนแก่ลูกค้า
          </p>
        </div>

        <!-- 4 Mission Cards (Minimalist Editorial Grid) -->
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
          <div
            v-for="m in missions"
            :key="m.num"
            class="group p-8 sm:p-9 rounded-3xl border border-black/10 dark:border-white/10 bg-white/50 dark:bg-white/[0.01] hover:border-[#00C864] dark:hover:border-[#00FF88] transition-all space-y-4 relative overflow-hidden"
          >
            <!-- Top number & tag -->
            <div class="flex items-center justify-between border-b border-black/10 dark:border-white/10 pb-4">
              <span class="text-2xl sm:text-3xl font-mono font-extrabold text-[#00A852] dark:text-[#00FF88]">
                {{ m.num }}.
              </span>
              <span class="text-[11px] font-mono tracking-wider uppercase opacity-50">
                พันธกิจข้อที่ {{ parseInt(m.num) }}
              </span>
            </div>

            <!-- Content -->
            <div class="space-y-2">
              <h3 class="text-lg sm:text-xl font-bold text-[#0A1A12] dark:text-white leading-snug group-hover:text-[#00A852] dark:group-hover:text-[#00FF88] transition-colors">
                {{ m.title }}
              </h3>
              <p class="text-sm text-[#475569] dark:text-[#94A3B8] leading-[1.8] pt-1">
                {{ m.desc }}
              </p>
            </div>

            <!-- Indicator line -->
            <div class="pt-2 flex items-center gap-2 text-xs font-mono font-semibold text-[#00A852] dark:text-[#00FF88] opacity-80 group-hover:opacity-100">
              <CheckCircle2 class="w-4 h-4" />
              <span>ยึดถือเป็นแนวทางปฏิบัติงานหลัก</span>
            </div>
          </div>
        </div>
      </div>

      <!-- ========================================================
           CORE POLICY & GOVERNANCE PILLARS (ปรัชญาและหลักการดำเนินงาน)
      ========================================================= -->
      <div class="py-16 sm:py-20 border-b border-black/10 dark:border-white/10 space-y-10">
        <div class="space-y-3 max-w-3xl">
          <div class="text-xs font-mono font-bold tracking-[0.2em] uppercase text-[#00A852] dark:text-[#00FF88]">
            GOVERNANCE & PILLARS // หลักการดำเนินงาน
          </div>
          <h2 class="text-2xl sm:text-3xl font-display font-extrabold text-[#0A1A12] dark:text-white">
            ปรัชญาการทำงานที่มุ่งเน้นลูกค้าและคุณภาพที่เหนือความประทับใจ
          </h2>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
          <div
            v-for="pol in policyPillars"
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

      <!-- Navigation to Other Sections -->
      <div class="pt-16 flex flex-wrap items-center justify-between gap-4">
        <div class="flex items-center gap-4">
          <NuxtLink to="/about/history" class="text-xs font-mono opacity-60 hover:opacity-100 flex items-center gap-1">
            <ArrowLeft class="w-3.5 h-3.5" />
            <span>อ่านประวัติความเป็นมา</span>
          </NuxtLink>
          <span>•</span>
          <NuxtLink to="/about" class="text-xs font-mono opacity-60 hover:opacity-100">
            ภาพรวมเกี่ยวกับเรา
          </NuxtLink>
        </div>

        <NuxtLink to="/about/values" class="inline-flex items-center gap-2 text-sm font-bold text-[#00A852] dark:text-[#00FF88] hover:underline">
          <span>อ่านค่านิยมและวัฒนธรรมองค์กร (SMART) ต่อไป</span>
          <ArrowUpRight class="w-4 h-4" />
        </NuxtLink>
      </div>
    </main>

    <ContactFooter />
  </div>
</template>
