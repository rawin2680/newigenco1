<script setup lang="ts">
import { Building2, Award, ShieldCheck, Sparkles, ArrowUpRight, CheckCircle2 } from 'lucide-vue-next'

const highlights = [
  {
    icon: Building2,
    title: 'ก่อตั้งและเติบโตอย่างมั่นคง',
    tag: 'EST. 2010',
    desc: 'ก่อตั้งเมื่อ 15 มีนาคม 2553 จากการรวมตัวของบุคลากรทางด้าน IT ที่มีความเชี่ยวชาญเฉพาะทาง พร้อมประสบการณ์โครงการภาครัฐและเอกชนกว่า 100 องค์กร',
    link: '/news/2',
    linkText: 'อ่านประวัติครบรอบ 8 ปี มุ่งสู่ปีที่ 9'
  },
  {
    icon: Award,
    title: 'มาตรฐานสากล ISO/IEC 29110',
    tag: 'GLOBAL STANDARD',
    desc: 'ผ่านการรับรองมาตรฐานวิศวกรรมซอฟต์แวร์ระดับสากล ISO/IEC 29110 โดย TÜV NORD ด้าน Project Management และ Software Implementation',
    link: '/news/1',
    linkText: 'ดูใบรับรองและรายละเอียดมาตรฐาน'
  },
  {
    icon: ShieldCheck,
    title: 'การส่งเสริมการลงทุนจาก BOI',
    tag: 'BOI PRIVILEGES',
    desc: 'ได้รับการส่งเสริมการลงทุนจากสำนักงานคณะกรรมการส่งเสริมการลงทุน (BOI) ในกิจการพัฒนาซอฟต์แวร์และบริการด้านสารสนเทศ สัญชาติไทยอย่างแท้จริง',
    link: '/news/2#section-partnerships',
    linkText: 'ข้อมูลการสนับสนุนและการร่วมมือ'
  },
  {
    icon: Sparkles,
    title: 'ปรัชญาการบริการอย่างใกล้ชิด',
    tag: 'CLIENT-CENTRIC',
    desc: 'มุ่งเน้นการบริหารองค์กรด้วยนโยบายทำงานใกล้ชิดกับลูกค้า ใส่ใจทุกกระบวนการ เพื่อส่งมอบผลงานคุณภาพเหนือความคาดหมายและสร้างความไว้วางใจระยะยาว',
    link: '/news/2#section-philosophy',
    linkText: 'ดูนโยบายคุณภาพและพันธกิจ'
  }
]
</script>

<template>
  <section id="about" class="py-24 px-5 sm:px-10 lg:px-16 max-w-[1440px] mx-auto relative z-10 scroll-mt-24">
    <!-- Section Header -->
    <div class="mb-14 max-w-3xl">
      <div class="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-[0.25em] text-[#00C864] dark:text-[#00FF88] mb-3 font-bold">
        <Building2 class="w-4 h-4" />
        <span>ABOUT IGENCO // เกี่ยวกับเรา</span>
      </div>
      <h2 class="font-display font-extrabold text-3xl sm:text-5xl uppercase tracking-tight text-[#022C22] dark:text-[#F4FBF7] leading-tight">
        บริษัท ไอเจนโก้ จำกัด
      </h2>
      <p class="text-base sm:text-lg text-[#022C22]/80 dark:text-[#F4FBF7]/80 mt-4 leading-relaxed font-normal">
        ผู้เชี่ยวชาญด้านการให้คำปรึกษา พัฒนาระบบซอฟต์แวร์ และวางโครงสร้างพื้นฐานเทคโนโลยีสารสนเทศครบวงจร ด้วยประสบการณ์กว่า 8 ปี มุ่งสู่ปีที่ 9 อย่างมั่นคง ได้รับการรับรองมาตรฐานระดับสากล ISO/IEC 29110 และการส่งเสริมการลงทุนจาก BOI
      </p>
    </div>

    <!-- Highlights Bento Grid -->
    <div class="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
      <div
        v-for="item in highlights"
        :key="item.title"
        class="spatial-glass rounded-3xl p-7 sm:p-9 border border-current/10 flex flex-col justify-between group hover:-translate-y-1.5 transition-all duration-300 relative overflow-hidden"
      >
        <!-- Subtle Glow -->
        <div class="absolute -right-16 -top-16 w-40 h-40 bg-[#00C864]/10 dark:bg-[#00FF88]/10 rounded-full blur-3xl pointer-events-none group-hover:scale-150 transition-transform duration-500" />

        <div class="space-y-4 relative z-10">
          <div class="flex items-center justify-between">
            <div class="w-12 h-12 rounded-2xl bg-[#00C864]/15 dark:bg-[#00FF88]/15 border border-[#00C864]/30 flex items-center justify-center text-[#00C864] dark:text-[#00FF88]">
              <component :is="item.icon" class="w-6 h-6" />
            </div>
            <span class="text-[11px] font-mono font-bold px-3 py-1 rounded-full bg-current/5 border border-current/10 text-[#00C864] dark:text-[#00FF88]">
              {{ item.tag }}
            </span>
          </div>

          <h3 class="text-xl sm:text-2xl font-bold text-[#022C22] dark:text-[#F4FBF7] group-hover:text-[#00C864] dark:group-hover:text-[#00FF88] transition-colors">
            {{ item.title }}
          </h3>

          <p class="text-sm text-[#022C22]/75 dark:text-[#F4FBF7]/75 leading-relaxed">
            {{ item.desc }}
          </p>
        </div>

        <!-- Card Action Link -->
        <div class="pt-6 mt-4 border-t border-current/10 relative z-10">
          <NuxtLink
            :to="item.link"
            class="inline-flex items-center gap-1.5 text-xs font-bold text-[#00C864] dark:text-[#00FF88] hover:underline group-hover:translate-x-1 transition-transform"
          >
            <span>{{ item.linkText }}</span>
            <ArrowUpRight class="w-3.5 h-3.5" />
          </NuxtLink>
        </div>
      </div>
    </div>
  </section>
</template>
