<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount } from 'vue'
import { Building2 } from 'lucide-vue-next'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

const sectionRef = ref<HTMLElement | null>(null)
let ctx: gsap.Context | null = null

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
