<script setup lang="ts">
import { Building2, Award, ShieldCheck, Sparkles, ArrowUpRight, Users, Briefcase, Lock, FileText, ChevronRight } from 'lucide-vue-next'

const aboutTopics = [
  {
    id: 'history',
    icon: Building2,
    title: 'ประวัติความเป็นมา',
    tag: 'EST. 2010 // ประสบการณ์กว่า 8 ปี',
    desc: 'บริษัท ไอเจนโก้ จำกัด ก่อตั้งเมื่อวันที่ 15 มีนาคม 2553 จากการรวมตัวของทีมงานบุคลากรทางด้าน IT ที่มีความเชี่ยวชาญในการออกแบบและพัฒนาโปรแกรมระบบงาน การวิเคราะห์โครงสร้างระบบ และการจัดการฐานข้อมูลขนาดใหญ่ พร้อมประสบการณ์โครงการทั้งภาครัฐและเอกชนกว่า 100 องค์กร',
    link: '/news/2',
    linkText: 'อ่านบทความประวัติครบรอบ 8 ปี มุ่งสู่ปีที่ 9'
  },
  {
    id: 'policy',
    icon: ShieldCheck,
    title: 'นโยบายบริษัท',
    tag: 'CLIENT-CENTRIC POLICY',
    desc: 'มุ่งเน้นการบริหารองค์กรภายใต้นโยบาย "การทำงานอย่างใกล้ชิดกับลูกค้า" ใส่ใจทุกขั้นตอนของกระบวนการพัฒนาระบบ เพื่อส่งมอบงานระบบและบริการที่เหนือความประทับใจ ควบคู่กับการวิจัยและพัฒนาผลิตภัณฑ์นวัตกรรมใหม่ภายใต้แบรนด์ IGENCO ที่ได้รับการการันตีคุณภาพและความไว้วางใจอย่างต่อเนื่อง',
    link: '/news/2#section-philosophy',
    linkText: 'ดูปรัชญาและนโยบายการทำงาน'
  },
  {
    id: 'values',
    icon: Sparkles,
    title: 'ค่านิยมและวัฒนธรรมองค์กร',
    tag: 'CORE VALUES // I-G-E-N',
    desc: 'วัฒนธรรมองค์กรที่ขับเคลื่อนด้วย Innovation (นวัตกรรมสร้างสรรค์), Growth (การเติบโตเคียงข้างลูกค้า), Excellence (ความเป็นเลิศตามมาตรฐานสากล ISO/IEC 29110), และ Network & Care (การทำงานเป็นทีมและบริการด้วยความจริงใจ)',
    link: '/#about',
    linkText: 'สำรวจค่านิยมองค์กร'
  },
  {
    id: 'organization',
    icon: Users,
    title: 'แผนผังการบริหาร',
    tag: 'MANAGEMENT STRUCTURE',
    desc: 'โครงสร้างการบริหารที่คล่องตัว ประกอบด้วย คณะกรรมการบริหาร (Executive Board), ฝ่ายสถาปัตยกรรมและการพัฒนาซอฟต์แวร์ (Software Engineering), ฝ่ายโครงสร้างคลาวด์และเน็ตเวิร์ก (IT Infrastructure), ฝ่ายควบคุมคุณภาพและมาตรฐาน (QA & Compliance) และฝ่ายลูกค้าสัมพันธ์และการตลาด',
    link: '/#about',
    linkText: 'โครงสร้างสายงานบริหาร'
  },
  {
    id: 'careers',
    icon: Briefcase,
    title: 'สมัครงาน',
    tag: 'JOIN OUR TEAM // ร่วมงานกับเรา',
    desc: 'เปิดรับบุคลากรรุ่นใหม่ที่พร้อมเติบโตในสายงานเทคโนโลยี ไม่ว่าจะเป็น Full-Stack Developer, System Analyst, DevOps Engineer และ Business Development ในสภาพแวดล้อมการทำงานที่เป็นมิตร สนับสนุนการเรียนรู้และสวัสดิการที่ยอดเยี่ยม',
    link: '/#contact',
    linkText: 'ติดต่อฝ่ายบุคคล / ส่งเรซูเม่'
  },
  {
    id: 'privacy-policy',
    icon: Lock,
    title: 'การคุ้มครองข้อมูลส่วนบุคคล (PDPA)',
    tag: 'PRIVACY & SECURITY',
    desc: 'เรายึดมั่นในการปฏิบัติตามพระราชบัญญัติคุ้มครองข้อมูลส่วนบุคคล พ.ศ. 2562 (PDPA) อย่างเคร่งครัด พร้อมมาตรฐานความปลอดภัยทางสารสนเทศ เพื่อรักษาข้อมูลส่วนบุคคลและข้อมูลองค์กรของท่านให้ปลอดภัยสูงสุดในทุกมิติ',
    link: '/privacy-policy',
    linkText: 'อ่านนโยบายความเป็นส่วนตัวและนโยบายคุกกี้',
    subLinks: [
      { name: 'นโยบายความเป็นส่วนตัว (Privacy Policy)', href: '/privacy-policy' },
      { name: 'นโยบายการใช้คุกกี้ (Cookie Policy)', href: '/cookie-policy' }
    ]
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
        ผู้ให้บริการด้านการพัฒนาระบบงานคอมพิวเตอร์และเทคโนโลยีสารสนเทศครบวงจร ด้วยประสบการณ์กว่า 8 ปี มุ่งสู่ปีที่ 9 อย่างมั่นคง ได้รับการรับรองมาตรฐานสากล ISO/IEC 29110 จาก TÜV NORD และการส่งเสริมการลงทุนจาก BOI
      </p>
    </div>

    <!-- Highlights Bento Grid: ครบทั้ง 6 หัวข้อตามเมนูต้นฉบับ -->
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <div
        v-for="item in aboutTopics"
        :id="item.id"
        :key="item.title"
        class="spatial-glass rounded-3xl p-7 sm:p-8 border border-current/10 flex flex-col justify-between group hover:-translate-y-1.5 transition-all duration-300 relative overflow-hidden scroll-mt-28"
      >
        <!-- Subtle Glow -->
        <div class="absolute -right-16 -top-16 w-36 h-36 bg-[#00C864]/10 dark:bg-[#00FF88]/10 rounded-full blur-3xl pointer-events-none group-hover:scale-150 transition-transform duration-500" />

        <div class="space-y-4 relative z-10">
          <div class="flex items-center justify-between">
            <div class="w-11 h-11 rounded-2xl bg-[#00C864]/15 dark:bg-[#00FF88]/15 border border-[#00C864]/30 flex items-center justify-center text-[#00C864] dark:text-[#00FF88]">
              <component :is="item.icon" class="w-5 h-5" />
            </div>
            <span class="text-[10px] font-mono font-bold px-2.5 py-1 rounded-full bg-current/5 border border-current/10 text-[#00C864] dark:text-[#00FF88]">
              {{ item.tag }}
            </span>
          </div>

          <h3 class="text-lg sm:text-xl font-bold text-[#022C22] dark:text-[#F4FBF7] group-hover:text-[#00C864] dark:group-hover:text-[#00FF88] transition-colors">
            {{ item.title }}
          </h3>

          <p class="text-xs sm:text-sm text-[#022C22]/75 dark:text-[#F4FBF7]/75 leading-relaxed">
            {{ item.desc }}
          </p>

          <!-- Additional Sublinks (เช่น นโยบายความเป็นส่วนตัว / คุกกี้) -->
          <div v-if="item.subLinks" class="pt-2 space-y-1.5 border-t border-current/10">
            <NuxtLink
              v-for="sub in item.subLinks"
              :key="sub.name"
              :to="sub.href"
              class="flex items-center justify-between text-xs font-semibold text-[#00C864] dark:text-[#00FF88] hover:underline py-1"
            >
              <span>{{ sub.name }}</span>
              <ChevronRight class="w-3.5 h-3.5" />
            </NuxtLink>
          </div>
        </div>

        <!-- Card Action Link -->
        <div class="pt-5 mt-4 border-t border-current/10 relative z-10">
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
