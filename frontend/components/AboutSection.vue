<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount } from 'vue'
import {
  Building2,
  ArrowRight
} from 'lucide-vue-next'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

const sectionRef = ref<HTMLElement | null>(null)
let ctx: gsap.Context | null = null

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
