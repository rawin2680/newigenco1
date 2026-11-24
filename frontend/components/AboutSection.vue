<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount } from 'vue'
import {
  ArrowUpRight,
  ChevronRight,
  ShieldCheck,
  Award,
  Calendar,
  Building2,
  Users,
  Briefcase,
  Lock,
  ArrowRight
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
    tag: 'FOUNDATION'
  },
  {
    year: '2554 – 2558',
    date: 'ขยายความไว้วางใจกว่า 100 องค์กร',
    title: 'ขยายสู่ภาคราชการ รัฐวิสาหกิจ และเอกชน',
    desc: 'ให้บริการครอบคลุม 4 มิติหลัก (IT Consultant, Software Development, IT Infrastructure และ Business Application) ให้กับหน่วยงานภาครัฐ สถาบันการศึกษา และภาคเอกชนนับ 100 ราย',
    tag: 'EXPANSION'
  },
  {
    year: '2558 – 2559',
    date: 'พันธมิตรความร่วมมือระดับประเทศ',
    title: 'ร่วมมือกับ Software Park & SIPA',
    desc: 'เข้าร่วมกิจกรรมกับเขตอุตสาหกรรมซอฟต์แวร์แห่งประเทศไทย (Software Park Thailand) และสำนักงานส่งเสริมอุตสาหกรรมซอฟต์แวร์แห่งชาติ (องค์การมหาชน) (SIPA) เพื่อเพิ่มศักยภาพการบริการ',
    tag: 'ALLIANCE'
  },
  {
    year: '2559',
    date: 'มาตรฐานวิศวกรรมสากล',
    title: 'ผ่านการรับรองมาตรฐาน ISO/IEC 29110',
    desc: 'ได้รับการตรวจประเมินและรับรองมาตรฐานระดับสากล ISO/IEC 29110 ด้าน Project Management และ Software Implementation จากสถาบัน TÜV NORD',
    tag: 'ACCREDITED'
  },
  {
    year: '2560',
    date: 'การส่งเสริมการลงทุนแห่งชาติ',
    title: 'ได้รับการส่งเสริมการลงทุนจาก BOI',
    desc: 'ได้รับการส่งเสริมการลงทุนจากสำนักงานคณะกรรมการส่งเสริมการลงทุน (BOI) ในกิจการพัฒนาซอฟต์แวร์และบริการด้านสารสนเทศ เป็นบริษัทสัญชาติไทยแท้อย่างแท้จริง',
    tag: 'BOI PRIVILEGES'
  },
  {
    year: '2561',
    date: '21 มีนาคม 2561',
    title: 'ครบรอบ 8 ปี และมุ่งสู่ปีที่ 9 อย่างมั่นคง',
    desc: 'ผู้บริหารและทีมงานร่วมจัดกิจกรรมบริจาคเงินและสิ่งของ ณ สถานสงเคราะห์เด็กอ่อนปากเกร็ด ในวาระก้าวสู่ปีที่ 9 เพื่อมุ่งสู่การเป็นผู้ให้บริการระบบงานคอมพิวเตอร์ครบวงจรอย่างยั่งยืน',
    tag: '8TH ANNIVERSARY'
  }
]

// Core Values 01-04 (I-G-E-N)
const coreValues = [
  {
    num: '01',
    code: 'INNOVATION',
    title: 'นวัตกรรมสร้างสรรค์',
    desc: 'มุ่งมั่นวิจัยและพัฒนาผลิตภัณฑ์ให้เป็นนวัตกรรมใหม่เพื่อเป็นทางเลือกที่มีประสิทธิภาพสูงสุด ภายใต้แบรนด์ "IGENCO" ซึ่งเป็นระบบ Web Application ที่ได้รับการการันตีคุณภาพ'
  },
  {
    num: '02',
    code: 'GROWTH',
    title: 'เติบโตเคียงข้างลูกค้า',
    desc: 'การบริหารองค์กรที่ยึดความสำเร็จของลูกค้าเป็นที่ตั้ง ทำงานอย่างใกล้ชิดและใส่ใจทุกขั้นตอน เพื่อให้ระบบงานขององค์กรลูกค้าสามารถขยายตัวได้อย่างมั่นคงและยั่งยืน'
  },
  {
    num: '03',
    code: 'EXCELLENCE',
    title: 'มาตรฐานคุณภาพเป็นเลิศ',
    desc: 'ยึดมั่นในมาตรฐานวิศวกรรมซอฟต์แวร์ระดับสากล ISO/IEC 29110 จาก TÜV NORD ทั้งกระบวนการบริหารโครงการ (Project Management) และการพัฒนาซอฟต์แวร์ (Software Implementation)'
  },
  {
    num: '04',
    code: 'NETWORK & CARE',
    title: 'ความร่วมมือและความใส่ใจ',
    desc: 'ส่งมอบงานระบบและบริการที่เหนือความประทับใจ ด้วยพลังแห่งความร่วมมือของทีมงานและการบริการด้วยความจริงใจ เอาใจใส่ในทุกรายละเอียดทั้งก่อนและหลังส่งมอบงาน'
  }
]

// 4 Service Capabilities
const capabilities = [
  {
    num: '01',
    title: 'IT Consultant',
    th: 'การให้คำปรึกษาทางด้านเทคโนโลยีสารสนเทศ',
    desc: 'วิเคราะห์โครงสร้างระบบ วางแผนกลยุทธ์ด้านสารสนเทศ และให้คำปรึกษาโครงการ IT ทั้งภาครัฐและเอกชน'
  },
  {
    num: '02',
    title: 'Software Development',
    th: 'การพัฒนาระบบโปรแกรมคอมพิวเตอร์',
    desc: 'ออกแบบและพัฒนาระบบงาน Web Application ครบวงจร รองรับผู้ใช้งานจำนวนมากด้วยความเสถียรและปลอดภัย'
  },
  {
    num: '03',
    title: 'IT Infrastructure',
    th: 'การวางระบบคอมพิวเตอร์และเครือข่าย',
    desc: 'ออกแบบระบบแม่ข่าย โครงสร้างพื้นฐานคลาวด์ และระบบเครือข่ายสารสนเทศที่มั่นคงตามมาตรฐานความปลอดภัย'
  },
  {
    num: '04',
    title: 'Business Application',
    th: 'แอพพลิเคชั่นทางธุรกิจเฉพาะองค์กร',
    desc: 'พัฒนาโซลูชันทางธุรกิจที่ปรับแต่งเฉพาะตามความต้องการขององค์กร ช่วยเพิ่มประสิทธิภาพและลดความซ้ำซ้อน'
  }
]

// Management Structure
const managementStructure = [
  { role: 'คณะกรรมการบริหาร', en: 'Executive Board', detail: 'กำหนดวิสัยทัศน์ นโยบาย และทิศทางการเติบโตขององค์กร' },
  { role: 'ฝ่ายสถาปัตยกรรมและการพัฒนาซอฟต์แวร์', en: 'Software Engineering', detail: 'ออกแบบสถาปัตยกรรมระบบและเขียนโค้ด Web Application ระดับ Enterprise' },
  { role: 'ฝ่ายโครงสร้างคลาวด์และเครือข่าย', en: 'IT Infrastructure & Cloud', detail: 'บริหารจัดการระบบแม่ข่าย ความปลอดภัยทางไซเบอร์ และเน็ตเวิร์ก' },
  { role: 'ฝ่ายควบคุมคุณภาพและมาตรฐาน', en: 'QA & Compliance', detail: 'ตรวจสอบคุณภาพซอฟต์แวร์ตามกรอบมาตรฐานสากล ISO/IEC 29110' },
  { role: 'ฝ่ายการตลาดและลูกค้าสัมพันธ์', en: 'Sales & Client Success', detail: 'ประสานงานและดูแลให้คำปรึกษาแก่ลูกค้าอย่างใกล้ชิดทุกขั้นตอน' }
]

onMounted(() => {
  if (import.meta.client && sectionRef.value) {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    if (!prefersReducedMotion) {
      gsap.registerPlugin(ScrollTrigger)
      ctx = gsap.context(() => {
        // Subtle Reveal on Major Sections
        const elements = sectionRef.value?.querySelectorAll('.editorial-reveal')
        if (elements) {
          elements.forEach((el) => {
            gsap.from(el, {
              scrollTrigger: {
                trigger: el,
                start: 'top 85%',
                toggleActions: 'play none none none'
              },
              opacity: 0,
              y: 30,
              duration: 0.8,
              ease: 'power2.out'
            })
          })
        }
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
    class="py-24 sm:py-32 lg:py-40 bg-[#FBFDFB] dark:bg-[#030906] text-[#0F172A] dark:text-[#F1F5F9] transition-colors selection:bg-[#00C864] selection:text-[#022C22] scroll-mt-24 relative overflow-hidden"
  >
    <div class="max-w-[1360px] mx-auto px-5 sm:px-10 lg:px-16">

      <!-- ========================================================
           1. HERO SECTION: MINIMALIST CORPORATE TYPOGRAPHY
      ========================================================= -->
      <div class="editorial-reveal pb-20 sm:pb-28 border-b border-black/10 dark:border-white/10">
        <div class="max-w-4xl space-y-6">
          <div class="inline-flex items-center gap-2 text-xs font-mono font-bold tracking-[0.25em] uppercase text-[#00A852] dark:text-[#00FF88]">
            <Building2 class="w-4 h-4" />
            <span>ABOUT IGENCO // ข้อมูลองค์กรและวิสัยทัศน์</span>
          </div>

          <h1 class="text-4xl sm:text-6xl lg:text-7xl font-display font-extrabold tracking-tight text-[#0A1A12] dark:text-[#F8FAFC] leading-[1.08]">
            บริษัท ไอเจนโก้ จำกัด
          </h1>

          <p class="text-xl sm:text-2xl lg:text-3xl font-light text-[#334155] dark:text-[#94A3B8] leading-relaxed">
            ผู้ให้บริการด้านการพัฒนาระบบงานคอมพิวเตอร์และเทคโนโลยีสารสนเทศครบวงจร ด้วยประสบการณ์กว่า 8 ปี มุ่งสู่ปีที่ 9 อย่างมั่นคง
          </p>

          <p class="text-base sm:text-lg text-[#475569] dark:text-[#94A3B8]/90 leading-relaxed font-normal pt-2 max-w-3xl">
            เราผสานความเชี่ยวชาญด้านวิศวกรรมซอฟต์แวร์ตามมาตรฐานสากล 
            <strong class="font-semibold text-[#0A1A12] dark:text-white">ISO/IEC 29110</strong> 
            โดยสถาบัน TÜV NORD พร้อมได้รับการส่งเสริมการลงทุนจาก 
            <strong class="font-semibold text-[#0A1A12] dark:text-white">BOI</strong> 
            เพื่อส่งมอบโซลูชันระบบงานที่เปี่ยมประสิทธิภาพให้กับหน่วยงานภาครัฐ สถาบันการศึกษา และองค์กรธุรกิจชั้นนำ
          </p>
        </div>

        <!-- Sleek Editorial Key Statistics (Clean Hairline Row) -->
        <div class="grid grid-cols-2 md:grid-cols-4 gap-8 pt-16 sm:pt-20 border-t border-black/5 dark:border-white/5 mt-16 sm:mt-20">
          <div class="space-y-1">
            <div class="text-3xl sm:text-4xl lg:text-5xl font-mono font-bold tracking-tight text-[#0A1A12] dark:text-white">
              15 <span class="text-base sm:text-lg font-sans font-normal opacity-70">มี.ค. 2553</span>
            </div>
            <div class="text-xs font-mono tracking-wider uppercase opacity-60">
              ปีที่เริ่มก่อตั้ง (ESTABLISHED)
            </div>
          </div>

          <div class="space-y-1">
            <div class="text-3xl sm:text-4xl lg:text-5xl font-mono font-bold tracking-tight text-[#00A852] dark:text-[#00FF88]">
              100<span class="text-2xl font-light">+</span>
            </div>
            <div class="text-xs font-mono tracking-wider uppercase opacity-60">
              องค์กรรัฐและเอกชนที่ไว้วางใจ
            </div>
          </div>

          <div class="space-y-1">
            <div class="text-2xl sm:text-3xl lg:text-4xl font-mono font-bold tracking-tight text-[#0A1A12] dark:text-white">
              ISO/IEC 29110
            </div>
            <div class="text-xs font-mono tracking-wider uppercase opacity-60">
              มาตรฐานสากลโดย TÜV NORD
            </div>
          </div>

          <div class="space-y-1">
            <div class="text-2xl sm:text-3xl lg:text-4xl font-mono font-bold tracking-tight text-[#0A1A12] dark:text-white">
              BOI THAI
            </div>
            <div class="text-xs font-mono tracking-wider uppercase opacity-60">
              ส่งเสริมการลงทุนสัญชาติไทย
            </div>
          </div>
        </div>
      </div>

      <!-- ========================================================
           2. COMPANY PROFILE & HERITAGE (EDITORIAL ASYMMETRIC GRID)
      ========================================================= -->
      <div id="history" class="editorial-reveal py-20 sm:py-28 border-b border-black/10 dark:border-white/10 scroll-mt-24">
        <div class="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          
          <!-- Left Column: Story & 4 Pillars (7 Cols) -->
          <div class="lg:col-span-7 space-y-8">
            <div class="space-y-4">
              <div class="text-xs font-mono font-bold tracking-[0.2em] uppercase text-[#00A852] dark:text-[#00FF88]">
                COMPANY PROFILE // ประวัติความเป็นมา
              </div>
              <h2 class="text-3xl sm:text-4xl lg:text-5xl font-display font-extrabold tracking-tight text-[#0A1A12] dark:text-[#F8FAFC] leading-tight">
                การรวมตัวของบุคลากร IT สู่ผู้ให้บริการระบบครบวงจร
              </h2>
            </div>

            <p class="text-base sm:text-lg text-[#334155] dark:text-[#94A3B8] leading-relaxed">
              บริษัท ไอเจนโก้ จำกัด จัดตั้งเมื่อวันที่ <strong>15 มีนาคม 2553</strong> จากการรวมตัวของทีมงานบุคลากรทางด้าน IT ที่มีความเชี่ยวชาญในการออกแบบและพัฒนาโปรแกรมระบบงาน การวิเคราะห์โครงสร้างระบบ การจัดการฐานข้อมูล รวมถึงการเป็นที่ปรึกษาโครงการต่าง ๆ ที่เกี่ยวข้องกับงานทางด้านเทคโนโลยีสารสนเทศมาทั้งในภาครัฐและเอกชน <strong>นับ 100 ราย</strong>
            </p>

            <p class="text-base sm:text-lg text-[#334155] dark:text-[#94A3B8] leading-relaxed">
              โดยประกอบธุรกิจบริการให้คำปรึกษา พัฒนาระบบคอมพิวเตอร์และงานเครือข่ายเทคโนโลยีสารสนเทศให้กับสถาบันและองค์กรต่าง ๆ ทั้งในภาคราชการ รัฐวิสาหกิจ สถาบันการศึกษา และภาคเอกชน
            </p>

            <!-- 4 Service Capabilities in Clean Typographic List -->
            <div class="pt-6 space-y-6">
              <div class="text-xs font-mono font-bold tracking-[0.18em] uppercase opacity-75">
                ขอบเขตการบริการ 4 ด้านหลัก (CORE CAPABILITIES)
              </div>

              <div class="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-6">
                <div
                  v-for="cap in capabilities"
                  :key="cap.num"
                  class="pt-3 border-t border-black/10 dark:border-white/10 space-y-1.5"
                >
                  <div class="text-xs font-mono font-bold text-[#00A852] dark:text-[#00FF88]">
                    {{ cap.num }} / {{ cap.title }}
                  </div>
                  <div class="text-sm font-semibold text-[#0A1A12] dark:text-white">
                    {{ cap.th }}
                  </div>
                  <div class="text-xs text-[#475569] dark:text-[#94A3B8] leading-relaxed">
                    {{ cap.desc }}
                  </div>
                </div>
              </div>
            </div>

            <!-- Read Article Link -->
            <div class="pt-4">
              <NuxtLink
                to="/news/2"
                class="inline-flex items-center gap-2 text-sm font-bold text-[#00A852] dark:text-[#00FF88] hover:underline group"
              >
                <span>อ่านบทความประวัติการเดินทางครบรอบ 8 ปี มุ่งสู่ปีที่ 9</span>
                <ArrowRight class="w-4 h-4 group-hover:translate-x-1.5 transition-transform" />
              </NuxtLink>
            </div>
          </div>

          <!-- Right Column: Authentic Company Photograph & Caption (5 Cols) -->
          <div class="lg:col-span-5 space-y-4">
            <div class="relative overflow-hidden rounded-2xl bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 aspect-[4/3]">
              <img
                src="/images/news/igenco-8years-anniversary.jpg"
                alt="คณะผู้บริหารและทีมงาน บริษัท ไอเจนโก้ จำกัด"
                class="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700 ease-out"
                loading="lazy"
              >
            </div>
            <div class="text-xs text-[#64748B] dark:text-[#94A3B8] leading-relaxed font-mono">
              <strong>ภาพถ่ายจริง:</strong> ผู้บริหารและทีมงาน บริษัท ไอเจนโก้ จำกัด ร่วมกิจกรรมบริจาคเนื่องในวาระเปิดมาครบรอบ 8 ปี และมุ่งสู่ปีที่ 9 อย่างมั่นคง ณ สถานสงเคราะห์เด็กอ่อนปากเกร็ด (21 มีนาคม 2561)
            </div>

            <!-- National Partnerships Callout -->
            <div class="p-6 rounded-2xl bg-black/[0.02] dark:bg-white/[0.02] border border-black/10 dark:border-white/10 space-y-2 mt-6">
              <div class="text-xs font-mono font-bold uppercase text-[#00A852] dark:text-[#00FF88]">
                NATIONAL ALLIANCE // ความร่วมมือระดับประเทศ
              </div>
              <p class="text-xs text-[#475569] dark:text-[#94A3B8] leading-relaxed">
                บริษัทฯ เข้าร่วมกิจกรรมกับหน่วยงานสนับสนุนการพัฒนาซอฟต์แวร์ของประเทศ ได้แก่ <strong>เขตอุตสาหกรรมซอฟต์แวร์แห่งประเทศไทย (Software Park Thailand)</strong> และ <strong>สำนักงานส่งเสริมอุตสาหกรรมซอฟต์แวร์แห่งชาติ (องค์การมหาชน) (SIPA)</strong> พร้อมได้รับการส่งเสริมการลงทุนจาก <strong>BOI</strong> เพื่อยืนยันศักยภาพความเป็นบริษัทซอฟต์แวร์สัญชาติไทยอย่างแท้จริง
              </p>
            </div>
          </div>

        </div>
      </div>

      <!-- ========================================================
           3. VISION & POLICY (EDITORIAL MANIFESTO)
      ========================================================= -->
      <div id="policy" class="editorial-reveal py-20 sm:py-28 border-b border-black/10 dark:border-white/10 scroll-mt-24">
        <div class="max-w-4xl space-y-8">
          <div class="text-xs font-mono font-bold tracking-[0.2em] uppercase text-[#00A852] dark:text-[#00FF88]">
            PHILOSOPHY & POLICY // นโยบายบริษัทและปรัชญาการทำงาน
          </div>

          <h2 class="text-3xl sm:text-5xl lg:text-6xl font-display font-extrabold tracking-tight text-[#0A1A12] dark:text-[#F8FAFC] leading-[1.12]">
            "การทำงานอย่างใกล้ชิดกับลูกค้า ใส่ใจในทุกขั้นตอน เพื่อส่งมอบงานที่เหนือความประทับใจ"
          </h2>

          <div class="grid grid-cols-1 md:grid-cols-3 gap-8 pt-6">
            <div class="space-y-2">
              <h3 class="text-base font-bold text-[#0A1A12] dark:text-white">
                การทำงานอย่างใกล้ชิด
              </h3>
              <p class="text-sm text-[#475569] dark:text-[#94A3B8] leading-relaxed">
                ใส่ใจทุกขั้นตอนของกระบวนการพัฒนาระบบ เพื่อให้มั่นใจว่างบประมาณและฟังก์ชันการทำงานตรงตามเป้าหมายขององค์กรอย่างแท้จริง
              </p>
            </div>

            <div class="space-y-2">
              <h3 class="text-base font-bold text-[#0A1A12] dark:text-white">
                ผลิตภัณฑ์แบรนด์ IGENCO
              </h3>
              <p class="text-sm text-[#475569] dark:text-[#94A3B8] leading-relaxed">
                วิจัยและพัฒนาผลิตภัณฑ์ให้เป็นนวัตกรรมใหม่เพื่อเป็นทางเลือกที่มีประสิทธิภาพในรูปแบบ Web Application ที่ได้รับการการันตีคุณภาพ
              </p>
            </div>

            <div class="space-y-2">
              <h3 class="text-base font-bold text-[#0A1A12] dark:text-white">
                ความต่อเนื่องและยั่งยืน
              </h3>
              <p class="text-sm text-[#475569] dark:text-[#94A3B8] leading-relaxed">
                มุ่งมั่นสร้างความไว้วางใจระยะยาว ด้วยการรับประกันและการสนับสนุนทางเทคนิคอย่างรวดเร็วและมืออาชีพ
              </p>
            </div>
          </div>

          <div class="pt-2">
            <NuxtLink
              to="/news/2#section-philosophy"
              class="inline-flex items-center gap-1.5 text-xs font-mono font-bold tracking-wider uppercase text-[#00A852] dark:text-[#00FF88] hover:underline"
            >
              <span>อ่านนโยบายและแนวคิดการบริหารงานเพิ่มเติม</span>
              <ArrowUpRight class="w-3.5 h-3.5" />
            </NuxtLink>
          </div>
        </div>
      </div>

      <!-- ========================================================
           4. CORE VALUES: TYPOGRAPHIC 01–04 WITH DIVIDERS
      ========================================================= -->
      <div id="values" class="editorial-reveal py-20 sm:py-28 border-b border-black/10 dark:border-white/10 scroll-mt-24">
        <div class="space-y-4 mb-14">
          <div class="text-xs font-mono font-bold tracking-[0.2em] uppercase text-[#00A852] dark:text-[#00FF88]">
            CORE VALUES // ค่านิยมและวัฒนธรรมองค์กร
          </div>
          <h2 class="text-3xl sm:text-4xl lg:text-5xl font-display font-extrabold tracking-tight text-[#0A1A12] dark:text-[#F8FAFC]">
            ค่านิยม 4 เสาหลัก (I - G - E - N)
          </h2>
          <p class="text-base text-[#475569] dark:text-[#94A3B8] max-w-2xl">
            หลักยึดเหนี่ยวในการทำงานของบุคลากร IGENCO ทุกคน เพื่อขับเคลื่อนองค์กรและส่งมอบคุณค่าสูงสุดแก่ลูกค้า
          </p>
        </div>

        <!-- 01 - 04 Typographic Clean Rows / Columns with Dividers -->
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12 pt-6">
          <div
            v-for="val in coreValues"
            :key="val.num"
            class="pt-6 border-t-2 border-black/10 dark:border-white/10 hover:border-[#00C864] dark:hover:border-[#00FF88] transition-colors space-y-4 group"
          >
            <div class="flex items-baseline justify-between">
              <span class="text-4xl sm:text-5xl font-mono font-extrabold text-[#00A852] dark:text-[#00FF88]">
                {{ val.num }}
              </span>
              <span class="text-xs font-mono tracking-widest uppercase opacity-50">
                {{ val.code }}
              </span>
            </div>

            <div class="space-y-1">
              <h3 class="text-lg font-bold text-[#0A1A12] dark:text-white group-hover:text-[#00A852] dark:group-hover:text-[#00FF88] transition-colors">
                {{ val.title }}
              </h3>
            </div>

            <p class="text-sm text-[#475569] dark:text-[#94A3B8] leading-relaxed">
              {{ val.desc }}
            </p>
          </div>
        </div>
      </div>

      <!-- ========================================================
           5. COMPANY TIMELINE: CHRONOLOGICAL EDITORIAL LINE
      ========================================================= -->
      <div class="editorial-reveal py-20 sm:py-28 border-b border-black/10 dark:border-white/10">
        <div class="space-y-4 mb-16">
          <div class="text-xs font-mono font-bold tracking-[0.2em] uppercase text-[#00A852] dark:text-[#00FF88]">
            TIMELINE // เส้นทางประวัติศาสตร์และความก้าวหน้า
          </div>
          <h2 class="text-3xl sm:text-4xl lg:text-5xl font-display font-extrabold tracking-tight text-[#0A1A12] dark:text-[#F8FAFC]">
            เส้นทางแห่งการเติบโตอย่างมั่นคง
          </h2>
          <p class="text-base text-[#475569] dark:text-[#94A3B8] max-w-2xl">
            จากก้าวแรกในปี 2553 จนถึงการยืนหยัดในฐานะผู้เชี่ยวชาญการพัฒนาระบบคอมพิวเตอร์ครบวงจร
          </p>
        </div>

        <!-- Sleek Editorial Timeline (Linear Staggered Flow) -->
        <div class="space-y-12 relative before:absolute before:inset-0 before:left-4 md:before:left-32 before:w-[1px] before:bg-black/10 dark:before:bg-white/10">
          <div
            v-for="(item, idx) in timelineMilestones"
            :key="item.year + idx"
            class="relative flex flex-col md:flex-row items-start gap-4 md:gap-12 pl-10 md:pl-0 group"
          >
            <!-- Timeline Marker Dot -->
            <div class="absolute left-2.5 md:left-32 -translate-x-1/2 top-1.5 w-3 h-3 rounded-full bg-white dark:bg-[#030906] border-2 border-[#00A852] dark:border-[#00FF88] group-hover:scale-125 transition-transform" />

            <!-- Year Label on the Left (Desktop) -->
            <div class="md:w-28 md:text-right shrink-0">
              <div class="text-xl sm:text-2xl font-mono font-bold text-[#00A852] dark:text-[#00FF88]">
                {{ item.year }}
              </div>
              <div class="text-[11px] font-mono opacity-50 uppercase tracking-wider">
                {{ item.tag }}
              </div>
            </div>

            <!-- Content on the Right -->
            <div class="space-y-1.5 max-w-2xl pt-0.5">
              <div class="text-xs font-mono font-semibold text-[#00A852] dark:text-[#00FF88]">
                {{ item.date }}
              </div>
              <h3 class="text-lg sm:text-xl font-bold text-[#0A1A12] dark:text-white">
                {{ item.title }}
              </h3>
              <p class="text-sm text-[#475569] dark:text-[#94A3B8] leading-relaxed">
                {{ item.desc }}
              </p>
            </div>
          </div>
        </div>
      </div>

      <!-- ========================================================
           6. CORPORATE INFORMATION: 3 EDITORIAL COLUMNS
           (โครงสร้างองค์กร สมัครงาน และการคุ้มครองข้อมูลส่วนบุคคล)
      ========================================================= -->
      <div class="editorial-reveal pt-20 sm:pt-28">
        <div class="space-y-4 mb-16">
          <div class="text-xs font-mono font-bold tracking-[0.2em] uppercase text-[#00A852] dark:text-[#00FF88]">
            CORPORATE GOVERNANCE // ข้อมูลองค์กรและการกำกับดูแล
          </div>
          <h2 class="text-3xl sm:text-4xl lg:text-5xl font-display font-extrabold tracking-tight text-[#0A1A12] dark:text-[#F8FAFC]">
            โครงสร้างการบริหารและการดำเนินงาน
          </h2>
        </div>

        <div class="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          
          <!-- Column 1: Organization Structure (6 Cols) -->
          <div id="organization" class="lg:col-span-6 space-y-6 scroll-mt-28">
            <div class="border-b border-black/10 dark:border-white/10 pb-4">
              <h3 class="text-xl font-bold text-[#0A1A12] dark:text-white flex items-center gap-2">
                <Users class="w-5 h-5 text-[#00A852] dark:text-[#00FF88]" />
                <span>แผนผังการบริหาร (Organization Structure)</span>
              </h3>
              <p class="text-xs text-[#64748B] dark:text-[#94A3B8] mt-1">
                โครงสร้างสายงานที่ชัดเจน คล่องตัว และมีมาตรฐานการควบคุมคุณภาพ
              </p>
            </div>

            <div class="space-y-3">
              <div
                v-for="(team, index) in managementStructure"
                :key="team.role"
                class="p-4 rounded-xl border border-black/5 dark:border-white/5 hover:border-black/15 dark:hover:border-white/15 transition-colors space-y-1"
              >
                <div class="flex items-center justify-between">
                  <div class="text-sm font-bold text-[#0A1A12] dark:text-white">
                    0{{ index + 1 }}. {{ team.role }}
                  </div>
                  <div class="text-xs font-mono opacity-50">{{ team.en }}</div>
                </div>
                <div class="text-xs text-[#64748B] dark:text-[#94A3B8]">
                  {{ team.detail }}
                </div>
              </div>
            </div>
          </div>

          <!-- Column 2 & 3: Careers & PDPA (6 Cols Split) -->
          <div class="lg:col-span-6 space-y-12">
            
            <!-- Careers (สมัครงาน) -->
            <div id="careers" class="space-y-4 scroll-mt-28">
              <div class="border-b border-black/10 dark:border-white/10 pb-4">
                <h3 class="text-xl font-bold text-[#0A1A12] dark:text-white flex items-center gap-2">
                  <Briefcase class="w-5 h-5 text-[#00A852] dark:text-[#00FF88]" />
                  <span>ร่วมงานกับเรา (Careers)</span>
                </h3>
                <p class="text-xs text-[#64748B] dark:text-[#94A3B8] mt-1">
                  เปิดรับบุคลากรรุ่นใหม่ที่พร้อมเติบโตและสร้างสรรค์ระบบงานที่มีคุณค่า
                </p>
              </div>

              <p class="text-sm text-[#475569] dark:text-[#94A3B8] leading-relaxed">
                เราสนับสนุนบรรยากาศการทำงานที่เป็นมืออาชีพ เรียนรู้เทคโนโลยีสมัยใหม่ และการทำงานเป็นทีม เปิดรับตำแหน่ง:
              </p>

              <div class="grid grid-cols-2 gap-2 text-xs font-mono font-medium">
                <div class="p-2.5 rounded-lg bg-black/[0.02] dark:bg-white/[0.02] border border-black/5 dark:border-white/5">• Full-Stack Developer</div>
                <div class="p-2.5 rounded-lg bg-black/[0.02] dark:bg-white/[0.02] border border-black/5 dark:border-white/5">• System Analyst (SA)</div>
                <div class="p-2.5 rounded-lg bg-black/[0.02] dark:bg-white/[0.02] border border-black/5 dark:border-white/5">• DevOps & Cloud Engineer</div>
                <div class="p-2.5 rounded-lg bg-black/[0.02] dark:bg-white/[0.02] border border-black/5 dark:border-white/5">• Business Development</div>
              </div>

              <div class="pt-2 text-xs font-mono opacity-80 flex flex-wrap items-center justify-between gap-2">
                <span>ติดต่อฝ่ายบุคคล: <strong>hr@igenco.co.th</strong> | โทร. 0-2523-3959</span>
                <NuxtLink
                  to="/#contact"
                  class="font-bold text-[#00A852] dark:text-[#00FF88] hover:underline flex items-center gap-1"
                >
                  <span>ส่งเรซูเม่</span>
                  <ArrowUpRight class="w-3.5 h-3.5" />
                </NuxtLink>
              </div>
            </div>

            <!-- PDPA & Privacy (การคุ้มครองข้อมูลส่วนบุคคล) -->
            <div id="privacy-policy" class="space-y-4 scroll-mt-28">
              <div class="border-b border-black/10 dark:border-white/10 pb-4">
                <h3 class="text-xl font-bold text-[#0A1A12] dark:text-white flex items-center gap-2">
                  <Lock class="w-5 h-5 text-[#00A852] dark:text-[#00FF88]" />
                  <span>การคุ้มครองข้อมูลส่วนบุคคล (PDPA)</span>
                </h3>
                <p class="text-xs text-[#64748B] dark:text-[#94A3B8] mt-1">
                  การปฏิบัติตามกฎหมายและมาตรฐานความปลอดภัยทางสารสนเทศ
                </p>
              </div>

              <p class="text-sm text-[#475569] dark:text-[#94A3B8] leading-relaxed">
                บริษัท ไอเจนโก้ จำกัด ให้ความสำคัญสูงสุดต่อการรักษาความมั่นคงปลอดภัยของข้อมูลส่วนบุคคลและข้อมูลองค์กรตามพระราชบัญญัติคุ้มครองข้อมูลส่วนบุคคล พ.ศ. 2562 (PDPA)
              </p>

              <div class="flex flex-col sm:flex-row gap-3 pt-2">
                <NuxtLink
                  to="/privacy-policy"
                  class="flex-1 p-3 rounded-xl border border-black/10 dark:border-white/10 hover:border-[#00C864] dark:hover:border-[#00FF88] flex items-center justify-between text-xs font-semibold text-[#0A1A12] dark:text-white transition-all group"
                >
                  <span>นโยบายความเป็นส่วนตัว (Privacy Policy)</span>
                  <ChevronRight class="w-4 h-4 text-[#00A852] dark:text-[#00FF88] group-hover:translate-x-1 transition-transform" />
                </NuxtLink>

                <NuxtLink
                  to="/cookie-policy"
                  class="flex-1 p-3 rounded-xl border border-black/10 dark:border-white/10 hover:border-[#00C864] dark:hover:border-[#00FF88] flex items-center justify-between text-xs font-semibold text-[#0A1A12] dark:text-white transition-all group"
                >
                  <span>นโยบายการใช้คุกกี้ (Cookie Policy)</span>
                  <ChevronRight class="w-4 h-4 text-[#00A852] dark:text-[#00FF88] group-hover:translate-x-1 transition-transform" />
                </NuxtLink>
              </div>
            </div>

          </div>

        </div>
      </div>

    </div>
  </section>
</template>

<style scoped>
/* Minimalist Corporate Typography & Smooth Transitions */
@media (prefers-reduced-motion: reduce) {
  * {
    transition: none !important;
    animation: none !important;
  }
}
</style>
