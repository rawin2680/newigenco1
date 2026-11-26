<script setup lang="ts">
import AppHeader from '~/components/AppHeader.vue'
import ContactFooter from '~/components/ContactFooter.vue'
import { Sparkles, ArrowLeft, ArrowUpRight, HeartHandshake, ShieldCheck, CheckCircle2, Users2, Zap, Scale, Eye, RefreshCw, Home } from 'lucide-vue-next'

useHead({
  title: 'ค่านิยมและวัฒนธรรมองค์กร (Small & Smart) - บริษัท ไอเจนโก้ จำกัด (IGENCO)',
  meta: [
    {
      name: 'description',
      content: 'ค่านิยมและวัฒนธรรมองค์กร บริษัท ไอเจนโก้ จำกัด ยึดถือแนวคิด Small & Smart บนหลักการรองรับการเปลี่ยนแปลง และค่านิยมหลัก SMART: Synergy, Morality, Accountability, Responsibility, Transparency'
    }
  ]
})

const smartValues = [
  {
    letter: 'S',
    code: 'Synergy',
    th: 'การสร้างพลังร่วมและการทำงานเป็นทีม',
    icon: Users2,
    short: 'ความรู้สึกร่วมเป็นส่วนหนึ่งของทีม ความร่วมมือ ความสามัคคี และการผนึกกำลัง',
    desc: 'ความรู้สึกร่วมเป็นส่วนหนึ่งของทีมและบริษัท ความร่วมมือร่วมใจ ความสามัคคี การประสานและผนึกกำลังโดยผ่านกระบวนการทำงานเป็นทีม เพื่อขับเคลื่อนพันธกิจของบริษัทสู่เป้าหมายร่วมกัน'
  },
  {
    letter: 'M',
    code: 'Morality',
    th: 'ยึดมั่นในคุณธรรม',
    icon: Scale,
    short: 'ยึดมั่นในหลักความถูกต้อง ความดีงาม ความเสียสละ และจรรยาบรรณวิชาชีพ',
    desc: 'ยึดมั่นในหลักความถูกต้อง ความดีงาม ความเสียสละ และจรรยาบรรณในการประกอบวิชาชีพ เพื่อสร้างความน่าเชื่อถือและความภาคภูมิใจในผลงานที่ส่งมอบ'
  },
  {
    letter: 'A',
    code: 'Accountability',
    th: 'มีความรับผิดชอบต่อผลการปฏิบัติงานตามหน้าที่',
    icon: ShieldCheck,
    short: 'เข้าใจสิทธิและหน้าที่ มีจิตสำนึกต่อสังคม พร้อมรับการตรวจสอบอย่างมืออาชีพ',
    desc: 'เข้าใจถึงสิทธิและหน้าที่ มีความสำนึกและความรับผิดชอบต่อสังคม ใส่ใจปัญหาและมีแนวทางในการบริหารจัดการปัญหาอย่างมืออาชีพ เคารพในความคิดเห็นของผู้อื่น รวมทั้งการเปิดโอกาสและการพร้อมที่จะถูกตรวจสอบและประเมินผล เป็นการสะท้อนให้เห็นถึงความรับผิดชอบต่อผู้มีส่วนได้ส่วนเสีย'
  },
  {
    letter: 'R',
    code: 'Responsibility',
    th: 'เข้าใจในภาระหน้าที่ สิ่งที่ต้องรับผิดชอบ',
    icon: CheckCircle2,
    short: 'ปฏิบัติงานด้วยความสำนึกในหน้าที่อย่างเต็มความสามารถ จริงใจ และซื่อสัตย์',
    desc: 'ปฏิบัติงานด้วยความสำนึกในหน้าที่อย่างเต็มความสามารถ จริงใจ ซื่อสัตย์และเข้าใจในสิ่งที่ต้องรับผิดชอบต่อตนเอง ทีมงาน และลูกค้า'
  },
  {
    letter: 'T',
    code: 'Transparency',
    th: 'ความโปร่งใสในการทำงาน',
    icon: Eye,
    short: 'เปิดเผยข้อมูลอย่างโปร่งใส ตรวจสอบได้ มีระบบการทำงานที่ชัดเจน',
    desc: 'มีการเปิดเผยข้อมูลอย่างโปร่งใส สามารถตรวจสอบได้ทุกขั้นตอน และมีระบบการทำงานที่ชัดเจนตามมาตรฐานสากล'
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
        <span class="text-[#00A852] dark:text-[#00FF88] font-bold">ค่านิยมและวัฒนธรรมองค์กร</span>
      </div>

      <!-- Header Section -->
      <div class="pb-14 border-b border-black/10 dark:border-white/10 space-y-5 max-w-4xl">
        <div class="inline-flex items-center gap-2 text-xs font-mono font-bold tracking-[0.22em] uppercase text-[#00A852] dark:text-[#00FF88]">
          <Sparkles class="w-4 h-4" />
          <span>CULTURE & CORE VALUES // ค่านิยมและวัฒนธรรมองค์กร</span>
        </div>
        <h1 class="text-3xl sm:text-5xl lg:text-6xl font-display font-extrabold tracking-tight text-[#0A1A12] dark:text-[#F8FAFC] leading-[1.15]">
          ค่านิยมและวัฒนธรรมองค์กร
        </h1>
        <p class="text-lg sm:text-xl text-[#334155] dark:text-[#94A3B8] leading-relaxed font-light">
          หล่อหลอมด้วยวิถีคิดแบบ "Technical Guys" บนหลักการรองรับการเปลี่ยนแปลง และแนวคิด "Small & Smart" เพื่อการเติบโตอย่างมั่นคง
        </p>
      </div>

      <!-- ========================================================
           1. CORPORATE CULTURE (วัฒนธรรมองค์กร: Small & Smart)
      ========================================================= -->
      <div class="py-16 sm:py-20 border-b border-black/10 dark:border-white/10 space-y-12">
        <div class="space-y-3 max-w-3xl">
          <div class="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-mono font-bold tracking-wider uppercase bg-[#00A852]/10 dark:bg-[#00FF88]/10 text-[#00A852] dark:text-[#00FF88]">
            <RefreshCw class="w-3.5 h-3.5" />
            <span>ORGANIZATIONAL CULTURE // วัฒนธรรมองค์กร</span>
          </div>
          <h2 class="text-2xl sm:text-4xl font-display font-extrabold text-[#0A1A12] dark:text-white">
            องค์กรที่เกิดขึ้นมาพร้อมกับ "การรองรับการเปลี่ยนแปลง"
          </h2>
        </div>

        <!-- Editorial Story of Culture with Thai Indentation -->
        <div class="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">
          <div class="lg:col-span-7 space-y-6 text-base sm:text-lg text-[#334155] dark:text-[#94A3B8] leading-[1.95] text-justify font-normal">
            <p class="indent-8 sm:indent-10">
              โลกแห่งเทคโนโลยีสมัยใหม่มักจะมาพร้อมกับความเปลี่ยนแปลงใหม่ ๆ เสมอ <strong class="text-[#0A1A12] dark:text-white font-bold">ไอเจนโก้</strong> จึงเป็นบริษัทฯ ที่เกิดขึ้นมาพร้อมกับความเปลี่ยนแปลง และเหตุผลหลักที่กำหนดความเป็นตัวตนของไอเจนโก้อยู่บนหลักการ <strong class="text-[#00A852] dark:text-[#00FF88] font-bold">“รองรับการเปลี่ยนแปลง”</strong>
            </p>

            <p class="indent-8 sm:indent-10">
              และด้วยความที่กลุ่มผู้ก่อตั้งเป็น <strong class="text-[#0A1A12] dark:text-white font-bold">Technical Guys</strong> ในวงการไอทีมานาน และกล้าที่จะเปลี่ยนทัศนคติในการทำงานจากการยึดติดกับความสำเร็จจากรูปแบบบริษัทไอทีใหญ่ ปรับเปลี่ยนมาเป็นซอฟต์แวร์เฮาส์ขนาดกลาง เปลี่ยนกระบวนการคิด จากการใช้กรอบใหญ่มากำหนดวิธีการปฏิบัติงาน มาเป็นแนวทางใหม่ซึ่งเน้นตอบสนองต่อการเปลี่ยนแปลงทั้งทางด้านเทคโนโลยีและความต้องการของลูกค้า
            </p>

            <p class="indent-8 sm:indent-10">
              และเพื่อให้ตอบสนองต่อโลกไอทีสมัยใหม่ เราจึงต้องการรักษาให้บริษัทคงอยู่ในแนวคิด <strong class="text-[#00A852] dark:text-[#00FF88] font-bold">“Small & Smart”</strong>
            </p>
          </div>

          <!-- Right: Small & Smart Dual Concept Feature Cards -->
          <div class="lg:col-span-5 space-y-6">
            <!-- Small Card -->
            <div class="p-8 rounded-3xl border border-black/10 dark:border-white/10 bg-white/60 dark:bg-white/[0.02] space-y-3 relative overflow-hidden">
              <div class="flex items-center gap-3">
                <div class="w-10 h-10 rounded-2xl bg-[#00A852]/10 dark:bg-[#00FF88]/10 flex items-center justify-center text-[#00A852] dark:text-[#00FF88]">
                  <Home class="w-5 h-5" />
                </div>
                <div>
                  <h3 class="text-xl font-bold font-display text-[#0A1A12] dark:text-white">SMALL</h3>
                  <div class="text-xs font-mono opacity-60">บ้านหลังที่สอง & ความคล่องตัว</div>
                </div>
              </div>
              <p class="text-sm text-[#475569] dark:text-[#94A3B8] leading-[1.8] pt-1">
                เป็นบริษัทขนาดไม่ใหญ่มาก เปรียบเสมือนบ้านหลังที่สองของทีมงาน มีความรวดเร็วในการตัดสินใจ และสามารถตอบสนองต่อการเปลี่ยนแปลงได้ในทันท่วงที
              </p>
            </div>

            <!-- Smart Card -->
            <div class="p-8 rounded-3xl border border-[#00C864]/30 bg-[#00C864]/5 dark:bg-[#00FF88]/5 space-y-3 relative overflow-hidden">
              <div class="flex items-center gap-3">
                <div class="w-10 h-10 rounded-2xl bg-[#00A852] dark:bg-[#00FF88] flex items-center justify-center text-white dark:text-[#022C22]">
                  <Zap class="w-5 h-5" />
                </div>
                <div>
                  <h3 class="text-xl font-bold font-display text-[#0A1A12] dark:text-white">SMART</h3>
                  <div class="text-xs font-mono font-semibold text-[#00A852] dark:text-[#00FF88]">ค่านิยมหลักขององค์กร (SMART)</div>
                </div>
              </div>
              <p class="text-sm text-[#475569] dark:text-[#94A3B8] leading-[1.8] pt-1">
                ความสมาร์ทขององค์กร ไม่ใช่แค่ใครคนใดคนหนึ่ง แต่คือความสมาร์ทของชาวไอเจนโก้ทุกคน ผ่านการสร้างพลังร่วม คุณธรรม ความรับผิดชอบ และความโปร่งใส
              </p>
            </div>
          </div>
        </div>
      </div>

      <!-- ========================================================
           2. CORE VALUES (ค่านิยมหลัก 5 เสาหลัก: S - M - A - R - T)
      ========================================================= -->
      <div class="py-16 sm:py-20 border-b border-black/10 dark:border-white/10 space-y-12">
        <div class="space-y-4 max-w-3xl">
          <div class="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-mono font-bold tracking-wider uppercase bg-[#00A852]/10 dark:bg-[#00FF88]/10 text-[#00A852] dark:text-[#00FF88]">
            <Sparkles class="w-3.5 h-3.5" />
            <span>CORE VALUES // ค่านิยมหลักของธุรกิจ</span>
          </div>
          <h2 class="text-2xl sm:text-4xl font-display font-extrabold text-[#0A1A12] dark:text-white">
            ค่านิยม 5 เสาหลัก (S - M - A - R - T)
          </h2>
          <p class="indent-8 text-base sm:text-lg text-[#475569] dark:text-[#94A3B8] leading-[1.9] text-justify font-normal">
            บริษัทฯ ได้กำหนดค่านิยมหลักของธุรกิจ (Core Value) เพื่อให้บริษัทบรรลุเป้าหมาย ด้วยความถูกต้องและสอดคล้องกับแนวทางการดำเนินธุรกิจ วันนี้เราเป็นบริษัทขนาดไม่ใหญ่มาก (Small) องค์กรจึงเปรียบเสมือนบ้านหลังที่สองของทีมงาน มีความรวดเร็วในการตัดสินใจ และมีค่านิยมหลักคือ <strong class="text-[#00A852] dark:text-[#00FF88] font-bold">(SMART)</strong>
          </p>
        </div>

        <!-- 5 SMART Cards List (Minimalist Editorial Hierarchy) -->
        <div class="space-y-6">
          <div
            v-for="val in smartValues"
            :key="val.letter"
            class="group p-8 sm:p-10 rounded-3xl border border-black/10 dark:border-white/10 bg-white/40 dark:bg-white/[0.01] hover:border-[#00C864] dark:hover:border-[#00FF88] transition-all space-y-5"
          >
            <!-- Top Row: Letter + Titles -->
            <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-black/10 dark:border-white/10 pb-5">
              <div class="flex items-center gap-5">
                <span class="text-5xl sm:text-6xl font-mono font-extrabold text-[#00A852] dark:text-[#00FF88] leading-none">
                  {{ val.letter }}
                </span>
                <div>
                  <div class="flex items-center gap-2">
                    <span class="text-xl sm:text-2xl font-bold font-mono text-[#0A1A12] dark:text-white">{{ val.code }}</span>
                    <component :is="val.icon" class="w-4 h-4 text-[#00A852] dark:text-[#00FF88] opacity-80" />
                  </div>
                  <h3 class="text-base sm:text-lg font-semibold text-[#00A852] dark:text-[#00FF88]">
                    {{ val.th }}
                  </h3>
                </div>
              </div>

              <div class="text-xs font-mono uppercase tracking-widest opacity-40 hidden md:block">
                IGENCO // {{ val.code }}
              </div>
            </div>

            <!-- Detailed Explanation with Thai Indent & Relaxed Leading -->
            <div class="space-y-2">
              <div class="text-sm font-semibold text-[#0A1A12] dark:text-white">
                คำนิยามและการปฏิบัติ:
              </div>
              <p class="indent-6 sm:indent-8 text-sm sm:text-base text-[#475569] dark:text-[#94A3B8] leading-[1.9] text-justify font-normal">
                {{ val.desc }}
              </p>
            </div>
          </div>
        </div>
      </div>

      <!-- Navigation to Other Sections -->
      <div class="pt-16 flex flex-wrap items-center justify-between gap-4">
        <div class="flex items-center gap-4">
          <NuxtLink to="/about/policy" class="text-xs font-mono opacity-60 hover:opacity-100 flex items-center gap-1">
            <ArrowLeft class="w-3.5 h-3.5" />
            <span>อ่านนโยบายบริษัท</span>
          </NuxtLink>
          <span>•</span>
          <NuxtLink to="/about" class="text-xs font-mono opacity-60 hover:opacity-100">
            ภาพรวมเกี่ยวกับเรา
          </NuxtLink>
        </div>

        <NuxtLink to="/about/organization" class="inline-flex items-center gap-2 text-sm font-bold text-[#00A852] dark:text-[#00FF88] hover:underline">
          <span>ดูแผนผังและโครงสร้างการบริหารงานต่อไป</span>
          <ArrowUpRight class="w-4 h-4" />
        </NuxtLink>
      </div>
    </main>

    <ContactFooter />
  </div>
</template>
