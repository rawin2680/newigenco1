<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount } from 'vue'
import {
  Building2,
  Award,
  ShieldCheck,
  Sparkles,
  ArrowUpRight,
  Users,
  Briefcase,
  Lock,
  ChevronRight,
  CheckCircle2,
  Layers,
  Terminal,
  Cpu,
  Globe2,
  Calendar,
  Network
} from 'lucide-vue-next'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

const sectionRef = ref<HTMLElement | null>(null)
let ctx: gsap.Context | null = null

// Real Timeline Milestones from Official Company History
const timelineMilestones = [
  {
    year: '2553',
    date: '15 มีนาคม 2553',
    title: 'จัดตั้ง บริษัท ไอเจนโก้ จำกัด',
    desc: 'เริ่มต้นจากการรวมตัวของบุคลากรทางด้าน IT ที่มีความเชี่ยวชาญในการออกแบบและพัฒนาโปรแกรมระบบงาน การวิเคราะห์โครงสร้างระบบ และการจัดการฐานข้อมูล',
    tag: 'FOUNDATION',
    highlight: false
  },
  {
    year: '2554-2558',
    date: 'ความไว้วางใจกว่า 100 องค์กร',
    title: 'ขยายสู่ภาคราชการ รัฐวิสาหกิจ และเอกชน',
    desc: 'ให้บริการครอบคลุม IT Consultant, Software Development, IT Infrastructure และ Business Application ให้กับหน่วยงานภาครัฐ สถาบันการศึกษา และเอกชนนับ 100 ราย',
    tag: 'EXPANSION',
    highlight: false
  },
  {
    year: '2558-2559',
    date: 'พันธมิตรระดับประเทศ',
    title: 'ร่วมมือกับ Software Park & SIPA',
    desc: 'เข้าร่วมกิจกรรมกับเขตอุตสาหกรรมซอฟต์แวร์แห่งประเทศไทย (Software Park) และสำนักงานส่งเสริมอุตสาหกรรมซอฟต์แวร์แห่งชาติ (องค์การมหาชน) (SIPA)',
    tag: 'ALLIANCE',
    highlight: false
  },
  {
    year: '2559',
    date: 'มาตรฐานวิศวกรรมสากล',
    title: 'ผ่านการรับรอง ISO/IEC 29110',
    desc: 'ได้รับการตรวจประเมินและรับรองมาตรฐานสากล ISO/IEC 29110 ด้าน Project Management และ Software Implementation จาก TÜV NORD',
    tag: 'ISO ACCREDITED',
    highlight: true
  },
  {
    year: '2560',
    date: 'ส่งเสริมการลงทุนแห่งชาติ',
    title: 'ได้รับการส่งเสริมการลงทุนจาก BOI',
    desc: 'ได้รับการส่งเสริมการลงทุนจากสำนักงานคณะกรรมการส่งเสริมการลงทุน (BOI) ในกิจการพัฒนาซอฟต์แวร์และบริการด้านสารสนเทศ สัญชาติไทยอย่างแท้จริง',
    tag: 'BOI PRIVILEGES',
    highlight: true
  },
  {
    year: '2561',
    date: '21 มีนาคม 2561',
    title: 'ครบรอบ 8 ปี มุ่งสู่ปีที่ 9 อย่างมั่นคง',
    desc: 'ผู้บริหารและทีมงานร่วมจัดกิจกรรมบริจาคเงินและสิ่งของ ณ สถานสงเคราะห์เด็กอ่อนปากเกร็ด ในวาระก้าวสู่ปีที่ 9 เพื่อเป็นผู้ให้บริการระบบคอมพิวเตอร์ครบวงจรอย่างยั่งยืน',
    tag: '8TH ANNIVERSARY',
    highlight: true
  }
]

// Core Values (I-G-E-N)
const coreValues = [
  {
    letter: 'I',
    title: 'Innovation',
    sub: 'นวัตกรรมสร้างสรรค์',
    desc: 'พัฒนาผลิตภัณฑ์ซอฟต์แวร์ Web Application ที่เป็นนวัตกรรมใหม่ภายใต้แบรนด์ IGENCO'
  },
  {
    letter: 'G',
    title: 'Growth',
    sub: 'เติบโตเคียงข้างลูกค้า',
    desc: 'นโยบายทำงานอย่างใกล้ชิด ใส่ใจทุกขั้นตอน เพื่อให้ระบบของลูกค้าเติบโตอย่างมั่นคง'
  },
  {
    letter: 'E',
    title: 'Excellence',
    sub: 'มาตรฐานคุณภาพเป็นเลิศ',
    desc: 'ยึดมั่นในมาตรฐานสากล ISO/IEC 29110 และกระบวนการวิศวกรรมซอฟต์แวร์ระดับมืออาชีพ'
  },
  {
    letter: 'N',
    title: 'Network & Care',
    sub: 'ความร่วมมือและความใส่ใจ',
    desc: 'ส่งมอบงานที่เหนือความประทับใจ พร้อมความสัมพันธ์และบริการหลังการขายที่ยาวนาน'
  }
]

// Management Structure Modules
const managementTeams = [
  { role: 'คณะกรรมการบริหาร', en: 'Executive Board', desc: 'กำหนดทิศทางกลยุทธ์และการบริหารองค์กร' },
  { role: 'ฝ่ายสถาปัตยกรรม & ซอฟต์แวร์', en: 'Software Engineering', desc: 'ออกแบบและพัฒนา Web Application ระดับ Enterprise' },
  { role: 'ฝ่ายโครงสร้างคลาวด์ & เครือข่าย', en: 'IT Infrastructure', desc: 'วางระบบแม่ข่าย ความปลอดภัย และเน็ตเวิร์ก' },
  { role: 'ฝ่ายควบคุมคุณภาพ & มาตรฐาน', en: 'QA & Compliance', desc: 'ตรวจสอบคุณภาพตามกรอบมาตรฐาน ISO/IEC 29110' },
  { role: 'ฝ่ายการตลาด & ลูกค้าสัมพันธ์', en: 'Sales & Client Success', desc: 'ประสานงานและดูแลความพึงพอใจของลูกค้าอย่างใกล้ชิด' }
]

// Mouse Spotlight Tracking Effect on Bento Cards
const handleMouseMove = (e: MouseEvent) => {
  const card = (e.currentTarget as HTMLElement)
  if (!card) return
  const rect = card.getBoundingClientRect()
  const x = e.clientX - rect.left
  const y = e.clientY - rect.top
  card.style.setProperty('--mouse-x', `${x}px`)
  card.style.setProperty('--mouse-y', `${y}px`)
}

onMounted(() => {
  if (import.meta.client && sectionRef.value) {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    if (!prefersReducedMotion) {
      gsap.registerPlugin(ScrollTrigger)
      ctx = gsap.context(() => {
        // Section Header Reveal
        gsap.from('.about-header-anim', {
          scrollTrigger: {
            trigger: '.about-header-anim',
            start: 'top 85%',
            toggleActions: 'play none none none'
          },
          opacity: 0,
          y: 40,
          duration: 0.8,
          ease: 'power3.out'
        })

        // Bento Cards Staggered Reveal
        gsap.from('.bento-item', {
          scrollTrigger: {
            trigger: '.bento-grid-container',
            start: 'top 80%',
            toggleActions: 'play none none none'
          },
          opacity: 0,
          y: 50,
          duration: 0.9,
          stagger: 0.12,
          ease: 'power3.out'
        })

        // Timeline Items Scroll Reveal
        gsap.from('.timeline-item-anim', {
          scrollTrigger: {
            trigger: '.timeline-container',
            start: 'top 80%',
            toggleActions: 'play none none none'
          },
          opacity: 0,
          y: 35,
          duration: 0.7,
          stagger: 0.1,
          ease: 'power2.out'
        })
      }, sectionRef.value)
    }
  }
})

onBeforeUnmount(() => {
  if (ctx) {
    ctx.revert()
  }
})
</script>

<template>
  <section
    id="about"
    ref="sectionRef"
    class="py-28 px-5 sm:px-10 lg:px-16 max-w-[1440px] mx-auto relative z-10 scroll-mt-24 overflow-hidden"
  >
    <!-- Background Ambient Glow Accents -->
    <div class="absolute top-1/4 -left-48 w-96 h-96 bg-[#00C864]/10 dark:bg-[#00FF88]/08 rounded-full blur-[140px] pointer-events-none" />
    <div class="absolute bottom-1/3 -right-48 w-96 h-96 bg-[#00C864]/08 dark:bg-[#00FF88]/06 rounded-full blur-[140px] pointer-events-none" />

    <!-- ========================================================
         1. HERO HEADER: LARGE TYPOGRAPHY & ENTERPRISE BADGES
    ========================================================= -->
    <div class="about-header-anim mb-16 max-w-4xl">
      <!-- Eyebrow Pill -->
      <div class="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-[#00C864]/10 dark:bg-[#00FF88]/10 border border-[#00C864]/30 dark:border-[#00FF88]/30 mb-5 shadow-sm">
        <Building2 class="w-4 h-4 text-[#00C864] dark:text-[#00FF88]" />
        <span class="text-xs font-mono font-bold uppercase tracking-[0.22em] text-[#00C864] dark:text-[#00FF88]">
          ABOUT IGENCO // ข้อมูลองค์กรและวิสัยทัศน์ 2026
        </span>
      </div>

      <!-- Main Headline -->
      <h2 class="font-display font-extrabold text-3xl sm:text-5xl lg:text-6xl uppercase tracking-tight text-[#022C22] dark:text-[#F4FBF7] leading-[1.15]">
        บริษัท ไอเจนโก้ จำกัด
      </h2>

      <!-- Lead Narrative -->
      <p class="text-base sm:text-lg lg:text-xl text-[#022C22]/85 dark:text-[#F4FBF7]/85 mt-6 leading-relaxed font-normal">
        ผู้ให้บริการด้านการพัฒนาระบบงานคอมพิวเตอร์และเทคโนโลยีสารสนเทศครบวงจร ด้วยประสบการณ์กว่า 8 ปี มุ่งสู่ปีที่ 9 อย่างมั่นคง ได้รับการรับรองมาตรฐานสากล <strong class="text-[#00C864] dark:text-[#00FF88] font-bold">ISO/IEC 29110</strong> จาก TÜV NORD และสิทธิประโยชน์การส่งเสริมการลงทุนจาก <strong class="text-[#00C864] dark:text-[#00FF88] font-bold">BOI</strong>
      </p>

      <!-- Enterprise Spec Highlights Bar -->
      <div class="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-8">
        <div class="p-3.5 rounded-2xl bg-current/5 border border-current/10 backdrop-blur-md">
          <div class="text-[10px] font-mono opacity-60 uppercase tracking-wider">FOUNDED // จัดตั้ง</div>
          <div class="text-xs sm:text-sm font-bold text-[#00C864] dark:text-[#00FF88] mt-1 font-mono">15 มีนาคม 2553</div>
        </div>
        <div class="p-3.5 rounded-2xl bg-current/5 border border-current/10 backdrop-blur-md">
          <div class="text-[10px] font-mono opacity-60 uppercase tracking-wider">TRACK RECORD // ลูกค้า</div>
          <div class="text-xs sm:text-sm font-bold text-[#00C864] dark:text-[#00FF88] mt-1 font-mono">100+ องค์กรรัฐ-เอกชน</div>
        </div>
        <div class="p-3.5 rounded-2xl bg-current/5 border border-current/10 backdrop-blur-md">
          <div class="text-[10px] font-mono opacity-60 uppercase tracking-wider">STANDARD // มาตรฐาน</div>
          <div class="text-xs sm:text-sm font-bold text-[#00C864] dark:text-[#00FF88] mt-1 font-mono">ISO/IEC 29110</div>
        </div>
        <div class="p-3.5 rounded-2xl bg-current/5 border border-current/10 backdrop-blur-md">
          <div class="text-[10px] font-mono opacity-60 uppercase tracking-wider">PROMOTION // สิทธิประโยชน์</div>
          <div class="text-xs sm:text-sm font-bold text-[#00C864] dark:text-[#00FF88] mt-1 font-mono">BOI THAI-OWNED</div>
        </div>
      </div>
    </div>

    <!-- ========================================================
         2. MODERN BENTO GRID (HIERARCHICAL CARDS)
    ========================================================= -->
    <div class="bento-grid-container grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-6 mb-24">

      <!-- CARD 1: HERO BENTO (Span 8 Cols) - ประวัติความเป็นมา & 4 เสาหลัก -->
      <div
        id="history"
        class="bento-item lg:col-span-8 spotlight-card rounded-3xl p-7 sm:p-10 border border-current/10 flex flex-col justify-between relative overflow-hidden group scroll-mt-28"
        @mousemove="handleMouseMove"
      >
        <div class="relative z-10 space-y-5">
          <div class="flex items-center justify-between">
            <div class="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono font-bold bg-[#00C864]/15 text-[#00C864] dark:bg-[#00FF88]/15 dark:text-[#00FF88] border border-[#00C864]/30">
              <Calendar class="w-3.5 h-3.5" />
              <span>EST. 2010 // ประวัติความเป็นมา</span>
            </div>
            <span class="text-xs font-mono opacity-60">IGENCO-HERITAGE-01</span>
          </div>

          <h3 class="text-2xl sm:text-3xl font-display font-extrabold text-[#022C22] dark:text-[#F4FBF7]">
            การรวมตัวของบุคลากร IT ผู้เชี่ยวชาญ สู่การพัฒนาระบบครบวงจร
          </h3>

          <p class="text-sm sm:text-base text-[#022C22]/80 dark:text-[#F4FBF7]/80 leading-relaxed font-normal">
            บริษัท ไอเจนโก้ จำกัด จัดตั้งเมื่อวันที่ <strong>15 มีนาคม 2553</strong> จากการรวมตัวของทีมงานบุคลากรทางด้าน IT ที่มีความเชี่ยวชาญในการออกแบบและพัฒนาโปรแกรมระบบงาน การวิเคราะห์โครงสร้างระบบ การจัดการฐานข้อมูล รวมถึงการเป็นที่ปรึกษาโครงการต่าง ๆ ที่เกี่ยวข้องกับงานทางด้านเทคโนโลยีสารสนเทศมาทั้งในภาครัฐและเอกชน <strong>นับ 100 ราย</strong>
          </p>

          <!-- 4 Core Service Pillars -->
          <div class="pt-3">
            <div class="text-xs font-mono font-bold uppercase tracking-wider text-[#00C864] dark:text-[#00FF88] mb-3">
              ขอบเขตการบริการครอบคลุม 4 มิติ (SERVICE PILLARS):
            </div>
            <div class="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              <div class="p-3 rounded-xl bg-current/5 border border-current/10 flex items-start gap-2.5">
                <Terminal class="w-4 h-4 text-[#00C864] dark:text-[#00FF88] shrink-0 mt-0.5" />
                <div>
                  <div class="text-xs font-bold">1. IT Consultant</div>
                  <div class="text-[11px] opacity-75">การให้คำปรึกษาทางด้านเทคโนโลยี</div>
                </div>
              </div>
              <div class="p-3 rounded-xl bg-current/5 border border-current/10 flex items-start gap-2.5">
                <Cpu class="w-4 h-4 text-[#00C864] dark:text-[#00FF88] shrink-0 mt-0.5" />
                <div>
                  <div class="text-xs font-bold">2. Software Development</div>
                  <div class="text-[11px] opacity-75">การพัฒนาโปรแกรมและระบบงาน</div>
                </div>
              </div>
              <div class="p-3 rounded-xl bg-current/5 border border-current/10 flex items-start gap-2.5">
                <Network class="w-4 h-4 text-[#00C864] dark:text-[#00FF88] shrink-0 mt-0.5" />
                <div>
                  <div class="text-xs font-bold">3. IT Infrastructure</div>
                  <div class="text-[11px] opacity-75">วางระบบคอมพิวเตอร์และเครือข่าย</div>
                </div>
              </div>
              <div class="p-3 rounded-xl bg-current/5 border border-current/10 flex items-start gap-2.5">
                <Layers class="w-4 h-4 text-[#00C864] dark:text-[#00FF88] shrink-0 mt-0.5" />
                <div>
                  <div class="text-xs font-bold">4. Business Application</div>
                  <div class="text-[11px] opacity-75">แอพพลิเคชั่นทางธุรกิจเฉพาะองค์กร</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="pt-6 mt-6 border-t border-current/10 relative z-10 flex flex-wrap items-center justify-between gap-4">
          <div class="text-xs opacity-70">
            ครอบคลุมราชการ รัฐวิสาหกิจ สถาบันการศึกษา และเอกชน
          </div>
          <NuxtLink
            to="/news/2"
            class="inline-flex items-center gap-1.5 text-xs font-bold text-[#00C864] dark:text-[#00FF88] hover:underline group-hover:translate-x-1 transition-transform"
          >
            <span>อ่านบทความประวัติครบรอบ 8 ปี มุ่งสู่ปีที่ 9</span>
            <ArrowUpRight class="w-4 h-4" />
          </NuxtLink>
        </div>
      </div>

      <!-- CARD 2: BENTO (Span 4 Cols) - มาตรฐานสากล ISO/IEC 29110 & BOI -->
      <div
        class="bento-item lg:col-span-4 spotlight-card rounded-3xl p-7 sm:p-8 border border-current/10 flex flex-col justify-between relative overflow-hidden group"
        @mousemove="handleMouseMove"
      >
        <div class="relative z-10 space-y-4">
          <div class="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono font-bold bg-[#00C864]/15 text-[#00C864] dark:bg-[#00FF88]/15 dark:text-[#00FF88] border border-[#00C864]/30">
            <Award class="w-3.5 h-3.5" />
            <span>GLOBAL STANDARD</span>
          </div>

          <h3 class="text-xl sm:text-2xl font-bold text-[#022C22] dark:text-[#F4FBF7]">
            มาตรฐานวิศวกรรมระดับสากล และการรับรองจากรัฐ
          </h3>

          <div class="space-y-3 pt-2">
            <!-- ISO Feature -->
            <div class="p-3.5 rounded-2xl bg-current/5 border border-current/10 space-y-1">
              <div class="flex items-center gap-2 text-xs font-bold text-[#00C864] dark:text-[#00FF88]">
                <CheckCircle2 class="w-4 h-4" />
                <span>ISO/IEC 29110 (TÜV NORD)</span>
              </div>
              <p class="text-[11px] opacity-75 leading-relaxed">
                ผ่านการรับรองกระบวนการบริหารโครงการ (Project Management) และการพัฒนาซอฟต์แวร์ (Software Implementation)
              </p>
            </div>

            <!-- BOI & SIPA Feature -->
            <div class="p-3.5 rounded-2xl bg-current/5 border border-current/10 space-y-1">
              <div class="flex items-center gap-2 text-xs font-bold text-[#00C864] dark:text-[#00FF88]">
                <ShieldCheck class="w-4 h-4" />
                <span>BOI & Software Park Thailand</span>
              </div>
              <p class="text-[11px] opacity-75 leading-relaxed">
                ได้รับการส่งเสริมการลงทุนจาก BOI สัญชาติไทยแท้ ร่วมมือกับ Software Park Thailand และ SIPA ยกระดับศักยภาพ
              </p>
            </div>
          </div>
        </div>

        <div class="pt-5 mt-4 border-t border-current/10 relative z-10">
          <NuxtLink
            to="/news/1"
            class="inline-flex items-center gap-1.5 text-xs font-bold text-[#00C864] dark:text-[#00FF88] hover:underline group-hover:translate-x-1 transition-transform"
          >
            <span>ดูรายละเอียดการรับรองมาตรฐาน ISO</span>
            <ArrowUpRight class="w-3.5 h-3.5" />
          </NuxtLink>
        </div>
      </div>

      <!-- CARD 3: BENTO (Span 6 Cols) - นโยบายบริษัท & ปรัชญาการทำงาน -->
      <div
        id="policy"
        class="bento-item lg:col-span-6 spotlight-card rounded-3xl p-7 sm:p-9 border border-current/10 flex flex-col justify-between relative overflow-hidden group scroll-mt-28"
        @mousemove="handleMouseMove"
      >
        <div class="relative z-10 space-y-4">
          <div class="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono font-bold bg-[#00C864]/15 text-[#00C864] dark:bg-[#00FF88]/15 dark:text-[#00FF88] border border-[#00C864]/30">
            <ShieldCheck class="w-3.5 h-3.5" />
            <span>CLIENT-CENTRIC POLICY // นโยบายบริษัท</span>
          </div>

          <h3 class="text-xl sm:text-2xl font-bold text-[#022C22] dark:text-[#F4FBF7]">
            "การทำงานอย่างใกล้ชิดกับลูกค้า ใส่ใจทุกขั้นตอน"
          </h3>

          <p class="text-sm text-[#022C22]/80 dark:text-[#F4FBF7]/80 leading-relaxed">
            บริษัทฯ มุ่งเน้นการบริหารองค์กรภายใต้นโยบายการทำงานอย่างใกล้ชิดกับลูกค้า ใส่ใจทุกขั้นตอนของกระบวนการพัฒนาระบบ เพื่อส่งมอบงานระบบและบริการที่เหนือความประทับใจ ควบคู่กับการวิจัยและพัฒนาผลิตภัณฑ์ให้เป็นนวัตกรรมใหม่เพื่อเป็นทางเลือกภายใต้แบรนด์ <strong>"IGENCO"</strong> ซึ่งเป็นระบบ Web Application ที่ได้รับการการันตีคุณภาพและความไว้วางใจจากลูกค้าของเราอย่างต่อเนื่อง
          </p>

          <div class="p-4 rounded-2xl bg-[#00C864]/10 dark:bg-[#00FF88]/10 border border-[#00C864]/20 text-xs leading-relaxed space-y-1">
            <div class="font-bold text-[#00C864] dark:text-[#00FF88]">พันธกิจหลักในการส่งมอบงาน:</div>
            <div class="opacity-80">• ส่งมอบผลงานตรงเวลาตามมาตรฐานวิศวกรรมซอฟต์แวร์</div>
            <div class="opacity-80">• ตอบสนองต่อความต้องการทางธุรกิจอย่างแม่นยำและยืดหยุ่น</div>
            <div class="opacity-80">• พร้อมสนับสนุนและบำรุงรักษาอย่างต่อเนื่องหลังการส่งมอบ</div>
          </div>
        </div>

        <div class="pt-5 mt-4 border-t border-current/10 relative z-10">
          <NuxtLink
            to="/news/2#section-philosophy"
            class="inline-flex items-center gap-1.5 text-xs font-bold text-[#00C864] dark:text-[#00FF88] hover:underline group-hover:translate-x-1 transition-transform"
          >
            <span>ดูปรัชญาและนโยบายการทำงานฉบับเต็ม</span>
            <ArrowUpRight class="w-3.5 h-3.5" />
          </NuxtLink>
        </div>
      </div>

      <!-- CARD 4: BENTO (Span 6 Cols) - ค่านิยมและวัฒนธรรมองค์กร (I-G-E-N) -->
      <div
        id="values"
        class="bento-item lg:col-span-6 spotlight-card rounded-3xl p-7 sm:p-9 border border-current/10 flex flex-col justify-between relative overflow-hidden group scroll-mt-28"
        @mousemove="handleMouseMove"
      >
        <div class="relative z-10 space-y-4">
          <div class="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono font-bold bg-[#00C864]/15 text-[#00C864] dark:bg-[#00FF88]/15 dark:text-[#00FF88] border border-[#00C864]/30">
            <Sparkles class="w-3.5 h-3.5" />
            <span>CORE VALUES // ค่านิยมและวัฒนธรรมองค์กร</span>
          </div>

          <h3 class="text-xl sm:text-2xl font-bold text-[#022C22] dark:text-[#F4FBF7]">
            วัฒนธรรมองค์กร 4 เสาหลัก (I - G - E - N)
          </h3>

          <!-- 4 Pillars Grid -->
          <div class="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
            <div
              v-for="val in coreValues"
              :key="val.letter"
              class="p-3.5 rounded-2xl bg-current/5 border border-current/10 space-y-1 group/val hover:border-[#00C864]/40 transition-colors"
            >
              <div class="flex items-center gap-2">
                <span class="w-6 h-6 rounded-lg bg-[#00C864] text-white dark:bg-[#00FF88] dark:text-[#020806] font-mono font-extrabold text-xs flex items-center justify-center">
                  {{ val.letter }}
                </span>
                <span class="text-xs font-bold">{{ val.title }}</span>
              </div>
              <div class="text-[11px] font-semibold text-[#00C864] dark:text-[#00FF88]">{{ val.sub }}</div>
              <div class="text-[11px] opacity-75 leading-tight">{{ val.desc }}</div>
            </div>
          </div>
        </div>

        <div class="pt-5 mt-4 border-t border-current/10 relative z-10 flex items-center justify-between text-xs opacity-70">
          <span>ขับเคลื่อนด้วยมาตรฐาน ความเชี่ยวชาญ และความใส่ใจ</span>
          <span class="font-mono text-[#00C864] dark:text-[#00FF88] font-bold">IGENCO CULTURE</span>
        </div>
      </div>

      <!-- CARD 5: BENTO (Span 6 Cols) - แผนผังการบริหารองค์กร -->
      <div
        id="organization"
        class="bento-item lg:col-span-6 spotlight-card rounded-3xl p-7 sm:p-8 border border-current/10 flex flex-col justify-between relative overflow-hidden group scroll-mt-28"
        @mousemove="handleMouseMove"
      >
        <div class="relative z-10 space-y-4">
          <div class="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono font-bold bg-[#00C864]/15 text-[#00C864] dark:bg-[#00FF88]/15 dark:text-[#00FF88] border border-[#00C864]/30">
            <Users class="w-3.5 h-3.5" />
            <span>ORGANIZATION // แผนผังการบริหาร</span>
          </div>

          <h3 class="text-xl sm:text-2xl font-bold text-[#022C22] dark:text-[#F4FBF7]">
            โครงสร้างการบริหารงานที่คล่องตัวและมีประสิทธิภาพ
          </h3>

          <div class="space-y-2 pt-1">
            <div
              v-for="(team, index) in managementTeams"
              :key="team.role"
              class="p-2.5 rounded-xl bg-current/5 border border-current/10 flex items-center justify-between gap-3 text-xs"
            >
              <div class="flex items-center gap-2.5">
                <span class="w-5 h-5 rounded-md bg-[#00C864]/20 text-[#00C864] dark:text-[#00FF88] font-mono text-[10px] flex items-center justify-center font-bold">
                  0{{ index + 1 }}
                </span>
                <div>
                  <div class="font-bold">{{ team.role }}</div>
                  <div class="text-[10px] opacity-60 font-mono">{{ team.en }}</div>
                </div>
              </div>
              <div class="text-[11px] opacity-75 text-right hidden sm:block">
                {{ team.desc }}
              </div>
            </div>
          </div>
        </div>

        <div class="pt-5 mt-4 border-t border-current/10 relative z-10 text-xs opacity-70">
          ทีมงานมืออาชีพ พร้อมดูแลและส่งมอบทุกระบบอย่างมีมาตรฐาน
        </div>
      </div>

      <!-- CARD 6: BENTO (Span 3 Cols) - สมัครงาน (Careers) -->
      <div
        id="careers"
        class="bento-item lg:col-span-3 spotlight-card rounded-3xl p-7 sm:p-8 border border-current/10 flex flex-col justify-between relative overflow-hidden group scroll-mt-28"
        @mousemove="handleMouseMove"
      >
        <div class="relative z-10 space-y-4">
          <div class="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono font-bold bg-[#00C864]/15 text-[#00C864] dark:bg-[#00FF88]/15 dark:text-[#00FF88] border border-[#00C864]/30">
            <Briefcase class="w-3.5 h-3.5" />
            <span>CAREERS</span>
          </div>

          <h3 class="text-xl font-bold text-[#022C22] dark:text-[#F4FBF7]">
            ร่วมงานกับเรา (สมัครงาน)
          </h3>

          <p class="text-xs text-[#022C22]/80 dark:text-[#F4FBF7]/80 leading-relaxed">
            เปิดรับบุคลากรรุ่นใหม่ที่พร้อมเติบโตในสายงานเทคโนโลยี:
          </p>

          <div class="space-y-1.5 text-xs opacity-90 font-medium">
            <div class="flex items-center gap-1.5">• Full-Stack Developer</div>
            <div class="flex items-center gap-1.5">• System Analyst (SA)</div>
            <div class="flex items-center gap-1.5">• DevOps & Cloud Engineer</div>
            <div class="flex items-center gap-1.5">• Business Development</div>
          </div>

          <div class="pt-2 text-[11px] font-mono opacity-70">
            อีเมล: hr@igenco.co.th<br>
            โทร: 0-2523-3959
          </div>
        </div>

        <div class="pt-5 mt-4 border-t border-current/10 relative z-10">
          <NuxtLink
            to="/#contact"
            class="inline-flex items-center gap-1 text-xs font-bold text-[#00C864] dark:text-[#00FF88] hover:underline group-hover:translate-x-1 transition-transform"
          >
            <span>ติดต่อฝ่ายบุคคล / ส่งเรซูเม่</span>
            <ArrowUpRight class="w-3.5 h-3.5" />
          </NuxtLink>
        </div>
      </div>

      <!-- CARD 7: BENTO (Span 3 Cols) - การคุ้มครองข้อมูลส่วนบุคคล (PDPA) -->
      <div
        id="privacy-policy"
        class="bento-item lg:col-span-3 spotlight-card rounded-3xl p-7 sm:p-8 border border-current/10 flex flex-col justify-between relative overflow-hidden group scroll-mt-28"
        @mousemove="handleMouseMove"
      >
        <div class="relative z-10 space-y-4">
          <div class="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono font-bold bg-[#00C864]/15 text-[#00C864] dark:bg-[#00FF88]/15 dark:text-[#00FF88] border border-[#00C864]/30">
            <Lock class="w-3.5 h-3.5" />
            <span>PDPA</span>
          </div>

          <h3 class="text-xl font-bold text-[#022C22] dark:text-[#F4FBF7]">
            การคุ้มครองข้อมูลส่วนบุคคล
          </h3>

          <p class="text-xs text-[#022C22]/80 dark:text-[#F4FBF7]/80 leading-relaxed">
            เรายึดมั่นตามพระราชบัญญัติคุ้มครองข้อมูลส่วนบุคคล พ.ศ. 2562 (PDPA) อย่างเคร่งครัด พร้อมมาตรฐานความปลอดภัยทางสารสนเทศ
          </p>

          <div class="space-y-2 pt-1">
            <NuxtLink
              to="/privacy-policy"
              class="p-2.5 rounded-xl bg-current/5 border border-current/10 hover:border-[#00C864]/40 flex items-center justify-between text-xs font-semibold text-[#00C864] dark:text-[#00FF88] transition-all"
            >
              <span>นโยบายความเป็นส่วนตัว</span>
              <ChevronRight class="w-3.5 h-3.5" />
            </NuxtLink>
            <NuxtLink
              to="/cookie-policy"
              class="p-2.5 rounded-xl bg-current/5 border border-current/10 hover:border-[#00C864]/40 flex items-center justify-between text-xs font-semibold text-[#00C864] dark:text-[#00FF88] transition-all"
            >
              <span>นโยบายการใช้คุกกี้</span>
              <ChevronRight class="w-3.5 h-3.5" />
            </NuxtLink>
          </div>
        </div>

        <div class="pt-5 mt-4 border-t border-current/10 relative z-10 text-[11px] opacity-70">
          ความโปร่งใสและปลอดภัยตามมาตรฐานสากล
        </div>
      </div>

    </div>

    <!-- ========================================================
         3. COMPANY TIMELINE (ประวัติบริษัทตามข้อมูลจริง)
    ========================================================= -->
    <div class="timeline-container pt-8 border-t border-current/10 relative">
      <div class="max-w-3xl mb-12">
        <div class="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-[0.22em] text-[#00C864] dark:text-[#00FF88] mb-3 font-bold">
          <Calendar class="w-4 h-4" />
          <span>COMPANY TIMELINE // เส้นทางประวัติศาสตร์และความก้าวหน้า</span>
        </div>
        <h3 class="font-display font-extrabold text-2xl sm:text-4xl uppercase tracking-tight text-[#022C22] dark:text-[#F4FBF7]">
          เส้นทางแห่งความมุ่งมั่น สู่ผู้ให้บริการระบบครบวงจร
        </h3>
        <p class="text-sm sm:text-base opacity-75 mt-3">
          ตลอดเส้นทางการทำงานสายงาน IT ตั้งแต่วันก่อตั้งจนถึงการก้าวสู่ปีที่ 9 อย่างมั่นคง
        </p>
      </div>

      <!-- Interactive Timeline Grid -->
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 relative">
        <div
          v-for="(item, idx) in timelineMilestones"
          :key="item.year + idx"
          class="timeline-item-anim spotlight-card rounded-3xl p-6 sm:p-7 border border-current/10 flex flex-col justify-between relative overflow-hidden group"
          :class="item.highlight ? 'border-[#00C864]/30 shadow-lg shadow-[#00C864]/5' : ''"
          @mousemove="handleMouseMove"
        >
          <div class="space-y-3 relative z-10">
            <div class="flex items-center justify-between">
              <span class="text-2xl font-mono font-extrabold text-[#00C864] dark:text-[#00FF88]">
                {{ item.year }}
              </span>
              <span class="text-[10px] font-mono font-bold px-2.5 py-1 rounded-full bg-current/5 border border-current/10">
                {{ item.tag }}
              </span>
            </div>

            <div class="text-xs font-bold text-[#00C864] dark:text-[#00FF88]">
              {{ item.date }}
            </div>

            <h4 class="text-base sm:text-lg font-bold text-[#022C22] dark:text-[#F4FBF7]">
              {{ item.title }}
            </h4>

            <p class="text-xs sm:text-sm text-[#022C22]/75 dark:text-[#F4FBF7]/75 leading-relaxed">
              {{ item.desc }}
            </p>
          </div>

          <div class="pt-4 mt-3 border-t border-current/10 text-[10px] font-mono opacity-50 flex items-center justify-between relative z-10">
            <span>MILESTONE // 0{{ idx + 1 }}</span>
            <span v-if="item.highlight" class="text-[#00C864] dark:text-[#00FF88] font-bold">KEY ACHIEVE</span>
          </div>
        </div>
      </div>
    </div>

  </section>
</template>

<style scoped>
/* Apple VisionOS Specular Liquid Glass Spotlight Card */
.spotlight-card {
  background: rgba(255, 255, 255, 0.72);
  backdrop-filter: blur(28px) saturate(180%);
  -webkit-backdrop-filter: blur(28px) saturate(180%);
  transition: transform 0.35s cubic-bezier(0.22, 1, 0.36, 1), box-shadow 0.35s ease, border-color 0.35s ease;
}

:global(.dark) .spotlight-card {
  background: rgba(4, 20, 14, 0.75);
  backdrop-filter: blur(28px) saturate(180%);
  -webkit-backdrop-filter: blur(28px) saturate(180%);
}

.spotlight-card:hover {
  transform: translateY(-4px);
  border-color: rgba(0, 200, 100, 0.45);
  box-shadow: 0 20px 45px -12px rgba(0, 200, 100, 0.15);
}

:global(.dark) .spotlight-card:hover {
  border-color: rgba(0, 255, 136, 0.5);
  box-shadow: 0 20px 45px -12px rgba(0, 255, 136, 0.12);
}

/* Mouse tracking radial spotlight shine inside cards */
.spotlight-card::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  border-radius: inherit;
  background: radial-gradient(
    450px circle at var(--mouse-x, 50%) var(--mouse-y, 50%),
    rgba(0, 200, 100, 0.08),
    transparent 60%
  );
  pointer-events: none;
  opacity: 0;
  transition: opacity 0.4s ease;
  z-index: 1;
}

:global(.dark) .spotlight-card::before {
  background: radial-gradient(
    450px circle at var(--mouse-x, 50%) var(--mouse-y, 50%),
    rgba(0, 255, 136, 0.1),
    transparent 60%
  );
}

.spotlight-card:hover::before {
  opacity: 1;
}

@media (prefers-reduced-motion: reduce) {
  .spotlight-card {
    transition: none !important;
    transform: none !important;
  }
}
</style>
