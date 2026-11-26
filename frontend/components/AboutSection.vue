<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount } from 'vue'
import { Building2, ArrowUpRight, Calendar, Sparkles, Users, Briefcase, FileText } from 'lucide-vue-next'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

const sectionRef = ref<HTMLElement | null>(null)
let ctx: gsap.Context | null = null

const exploreTopics = [
  {
    num: '01',
    icon: Calendar,
    title: 'ประวัติความเป็นมาและก้าวสู่ปีที่ 9',
    en: 'HERITAGE & JOURNEY',
    desc: 'จุดเริ่มต้น 15 มี.ค. 2553 บุคลากร IT ประสบการณ์กว่า 20 ปี ที่ปรึกษาขึ้นทะเบียนกระทรวงการคลัง ดูแลกว่า 100 องค์กร',
    href: '/about/history',
    linkText: 'อ่านประวัติบริษัท'
  },
  {
    num: '02',
    icon: Sparkles,
    title: 'ค่านิยมและวัฒนธรรมองค์กร (SMART)',
    en: 'CORE VALUES & CULTURE',
    desc: 'แนวคิด Small & Smart พร้อมรับการเปลี่ยนแปลง และค่านิยม 5 เสาหลัก S - M - A - R - T',
    href: '/about/values',
    linkText: 'ดูค่านิยมองค์กร'
  },
  {
    num: '03',
    icon: Users,
    title: 'แผนผังและโครงสร้างการบริหารงาน',
    en: 'ORGANIZATION STRUCTURE',
    desc: '5 สายงานหลักที่คล่องตัว มีประสิทธิภาพสูง และดำเนินงานภายใต้กรอบมาตรฐานสากล ISO/IEC 29110',
    href: '/about/organization',
    linkText: 'ดูแผนผังการบริหาร'
  },
  {
    num: '04',
    icon: Briefcase,
    title: 'ร่วมงานกับเรา (เปิดรับสมัครงาน)',
    en: 'CAREERS & OPPORTUNITIES',
    desc: 'เปิดรับคนรุ่นใหม่ Full-Stack Developer, SA, DevOps และ Business Development ร่วมสร้างสรรค์เทคโนโลยี',
    href: '/careers',
    linkText: 'ดูตำแหน่งงานว่าง'
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
    class="py-24 sm:py-32 lg:py-40 text-section text-[#0F172A] dark:text-[#F1F5F9] transition-colors selection:bg-[#00C864] selection:text-[#022C22] scroll-mt-24 relative overflow-hidden"
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
           2. EDITORIAL PHILOSOPHY & CORE COMMITMENT
      ========================================================= -->
      <div class="editorial-reveal py-16 sm:py-20 border-b border-black/10 dark:border-white/10">
        <div class="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 items-start">
          <div class="lg:col-span-5 space-y-3">
            <div class="inline-flex items-center gap-2 text-xs font-mono font-bold tracking-[0.2em] uppercase text-[#00A852] dark:text-[#00FF88]">
              <FileText class="w-3.5 h-3.5" />
              <span>CORE PHILOSOPHY // ปรัชญาการดำเนินงาน</span>
            </div>
            <h2 class="text-2xl sm:text-3xl lg:text-4xl font-display font-extrabold text-[#0A1A12] dark:text-[#F8FAFC] leading-snug">
              "การทำงานอย่างใกล้ชิดกับลูกค้า ใส่ใจในทุกขั้นตอน เพื่อส่งมอบงานที่เหนือความประทับใจ"
            </h2>
          </div>
          <div class="lg:col-span-7 space-y-5 text-base text-[#475569] dark:text-[#94A3B8] leading-relaxed">
            <p>
              ไอเจนโก้ มุ่งเน้นการวิจัยและพัฒนาซอฟต์แวร์วิศวกรรมที่ได้มาตรฐานสากล ISO/IEC 29110 ควบคู่กับสิทธิประโยชน์การส่งเสริมการลงทุนจาก BOI เพื่อเป็นพลังขับเคลื่อนระบบสารสนเทศของภาครัฐและเอกชนไทยให้ก้าวหน้าอย่างยั่งยืน
            </p>
            <div class="flex items-center gap-2">
              <NuxtLink
                to="/about/policy"
                class="inline-flex items-center gap-1.5 text-xs font-mono font-bold text-[#00A852] dark:text-[#00FF88] hover:underline"
              >
                <span>อ่านนโยบายและวิสัยทัศน์ฉบับเต็ม</span>
                <ArrowUpRight class="w-3.5 h-3.5" />
              </NuxtLink>
            </div>
          </div>
        </div>
      </div>

      <!-- ========================================================
           3. EXPLORE TOPICS (NAVIGATION HUB TO DEDICATED SECTIONS)
      ========================================================= -->
      <div class="editorial-reveal py-16 sm:py-20 border-b border-black/10 dark:border-white/10 space-y-10">
        <div class="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div class="space-y-2 max-w-2xl">
            <div class="text-xs font-mono font-bold tracking-[0.2em] uppercase text-[#00A852] dark:text-[#00FF88]">
              EXPLORE IGENCO // สำรวจข้อมูลองค์กร
            </div>
            <h3 class="text-2xl sm:text-3xl font-display font-extrabold text-[#0A1A12] dark:text-white">
              เลือกดูข้อมูลบริษัทในส่วนที่คุณสนใจ
            </h3>
          </div>
          <div class="text-xs font-mono text-[#00A852] dark:text-[#00FF88] bg-[#00A852]/10 dark:bg-[#00FF88]/10 px-3 py-1.5 rounded-full self-start sm:self-auto">
            หรือกดเลือกจากเมนู "เกี่ยวกับเรา" ด้านบน
          </div>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <NuxtLink
            v-for="topic in exploreTopics"
            :key="topic.num"
            :to="topic.href"
            class="group p-8 rounded-3xl border border-black/10 dark:border-white/10 hover:border-[#00C864] dark:hover:border-[#00FF88] transition-all bg-white/40 dark:bg-white/[0.01] hover:bg-white/80 dark:hover:bg-white/[0.03] space-y-4 relative overflow-hidden"
          >
            <div class="flex items-center justify-between border-b border-black/10 dark:border-white/10 pb-4">
              <div class="flex items-center gap-3">
                <span class="text-xl font-mono font-bold text-[#00A852] dark:text-[#00FF88]">{{ topic.num }}</span>
                <component :is="topic.icon" class="w-4 h-4 text-[#00A852] dark:text-[#00FF88] opacity-80" />
              </div>
              <span class="text-[11px] font-mono tracking-wider uppercase opacity-50 group-hover:opacity-80 transition-opacity">
                {{ topic.en }}
              </span>
            </div>

            <div class="space-y-1.5">
              <h4 class="text-lg sm:text-xl font-bold text-[#0A1A12] dark:text-white group-hover:text-[#00A852] dark:group-hover:text-[#00FF88] transition-colors">
                {{ topic.title }}
              </h4>
              <p class="text-xs sm:text-sm text-[#475569] dark:text-[#94A3B8] leading-relaxed">
                {{ topic.desc }}
              </p>
            </div>

            <div class="pt-2 flex items-center gap-1.5 text-xs font-bold text-[#00A852] dark:text-[#00FF88] group-hover:translate-x-1 transition-transform">
              <span>{{ topic.linkText }}</span>
              <ArrowUpRight class="w-3.5 h-3.5" />
            </div>
          </NuxtLink>
        </div>
      </div>

      <!-- ========================================================
           4. TOP-NAV RECOMMENDATION BANNER
      ========================================================= -->
      <div class="editorial-reveal pt-10 flex flex-col sm:flex-row sm:items-center justify-between gap-4 text-xs font-mono opacity-70">
        <div class="flex items-center gap-2">
          <span class="w-2 h-2 rounded-full bg-[#00A852] dark:bg-[#00FF88] animate-pulse" />
          <span>ต้องการดูหัวข้ออื่นเพิ่มเติม สามารถคลิกเมนู <strong>"เกี่ยวกับเรา"</strong> ที่แถบด้านบนของเว็บไซต์ได้ทันที</span>
        </div>
        <div class="flex items-center gap-3">
          <NuxtLink to="/privacy-policy" class="hover:text-[#00A852] dark:hover:text-[#00FF88]">นโยบายความเป็นส่วนตัว</NuxtLink>
          <span>•</span>
          <NuxtLink to="/cookie-policy" class="hover:text-[#00A852] dark:hover:text-[#00FF88]">นโยบายคุกกี้</NuxtLink>
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
