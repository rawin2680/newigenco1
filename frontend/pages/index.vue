<script setup lang="ts">
import AppHeader from '~/components/AppHeader.vue'
import HeroSection from '~/components/HeroSection.vue'
import KineticBand from '~/components/KineticBand.vue'
import ContactFooter from '~/components/ContactFooter.vue'
import {
  Building2,
  Box,
  Newspaper,
  ArrowRight,
  ArrowUpRight,
  Award,
  ShieldCheck,
  Calendar,
  Layers,
  ChevronRight,
  CheckCircle2
} from 'lucide-vue-next'
import { useNews } from '~/composables/useNews'

const { newsList } = useNews()
const latestNews = newsList.slice(0, 3)

useHead({
  title: 'IGENCO - ผู้นำด้านการพัฒนาระบบคอมพิวเตอร์และซอฟต์แวร์ระดับองค์กร',
  meta: [
    {
      name: 'description',
      content: 'บริษัท ไอเจนโก้ จำกัด (IGENCO CO., LTD.) ผู้ให้บริการพัฒนาซอฟต์แวร์ วางระบบคอมพิวเตอร์ และที่ปรึกษา IT ครบวงจร มาตรฐานสากล ISO/IEC 29110 และการส่งเสริมจาก BOI'
    }
  ]
})
</script>

<template>
  <main class="min-h-screen bg-[#FBFDFB] dark:bg-[#030906] text-[#0F172A] dark:text-[#F1F5F9] transition-colors selection:bg-[#00C864] selection:text-[#022C22]">
    <!-- 1. Header Navigation -->
    <AppHeader />

    <!-- 2. Hero Section: แบนเนอร์หลักและวิสัยทัศน์ 2026 -->
    <HeroSection />

    <!-- ========================================================
         3. ABOUT IGENCO: EXECUTIVE OVERVIEW (ภาพรวมองค์กรแบบย่อ)
    ========================================================= -->
    <section class="py-20 sm:py-28 max-w-[1360px] mx-auto px-5 sm:px-10 lg:px-16 border-b border-black/10 dark:border-white/10">
      <div class="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
        
        <!-- Left: Editorial Headline & Narrative (7 Cols) -->
        <div class="lg:col-span-7 space-y-6">
          <div class="inline-flex items-center gap-2 text-xs font-mono font-bold tracking-[0.22em] uppercase text-[#00A852] dark:text-[#00FF88]">
            <Building2 class="w-4 h-4" />
            <span>EXECUTIVE OVERVIEW // ข้อมูลองค์กรโดยย่อ</span>
          </div>

          <h2 class="text-3xl sm:text-5xl font-display font-extrabold tracking-tight text-[#0A1A12] dark:text-[#F8FAFC] leading-tight">
            บริษัท ไอเจนโก้ จำกัด
          </h2>

          <p class="text-base sm:text-lg text-[#334155] dark:text-[#94A3B8] leading-relaxed">
            ผู้เชี่ยวชาญด้านการให้คำปรึกษา พัฒนาระบบซอฟต์แวร์ และวางโครงสร้างพื้นฐานเทคโนโลยีสารสนเทศครบวงจร ด้วยประสบการณ์กว่า 8 ปี มุ่งสู่ปีที่ 9 อย่างมั่นคง ผ่านการรับรองมาตรฐานสากล <strong>ISO/IEC 29110</strong> จาก TÜV NORD และสิทธิประโยชน์การส่งเสริมการลงทุนจาก <strong>BOI</strong>
          </p>

          <p class="text-sm sm:text-base text-[#475569] dark:text-[#94A3B8]/90 leading-relaxed">
            จัดตั้งเมื่อวันที่ 15 มีนาคม 2553 จากการรวมตัวของบุคลากรทางด้าน IT ที่มีความเชี่ยวชาญ ได้รับความไว้วางใจจากหน่วยงานภาครัฐ รัฐวิสาหกิจ สถาบันการศึกษา และเอกชนชั้นนำนับ 100 องค์กรทั่วประเทศ
          </p>

          <!-- Action Gateway to /about -->
          <div class="pt-4 flex flex-wrap items-center gap-4">
            <NuxtLink
              to="/about"
              class="px-6 py-3.5 rounded-xl font-bold text-xs uppercase tracking-wider bg-[#00A852] text-white hover:bg-[#008f44] transition-all shadow-md flex items-center gap-2"
            >
              <span>ดูข้อมูลบริษัทและวิสัยทัศน์ฉบับเต็ม (About Us)</span>
              <ArrowRight class="w-4 h-4" />
            </NuxtLink>
            <NuxtLink
              to="/about/history"
              class="text-xs font-mono font-bold text-[#00A852] dark:text-[#00FF88] hover:underline flex items-center gap-1"
            >
              <span>ประวัติและก้าวสู่ปีที่ 9</span>
              <ArrowUpRight class="w-3.5 h-3.5" />
            </NuxtLink>
          </div>
        </div>

        <!-- Right: 4 Clean Stat Highlights & Image (5 Cols) -->
        <div class="lg:col-span-5 space-y-6">
          <div class="overflow-hidden rounded-2xl border border-black/10 dark:border-white/10 aspect-[16/10] bg-black/5">
            <img
              src="/images/news/igenco-8years-anniversary.jpg"
              alt="คณะผู้บริหารและทีมงาน บริษัท ไอเจนโก้ จำกัด"
              class="w-full h-full object-cover"
              loading="lazy"
            >
          </div>

          <!-- Quick Metrics Row -->
          <div class="grid grid-cols-2 gap-4">
            <div class="p-4 rounded-xl border border-black/10 dark:border-white/10 space-y-1">
              <div class="text-2xl font-mono font-bold text-[#00A852] dark:text-[#00FF88]">2553</div>
              <div class="text-[11px] font-mono opacity-60">ปีที่เริ่มก่อตั้ง (15 มี.ค.)</div>
            </div>
            <div class="p-4 rounded-xl border border-black/10 dark:border-white/10 space-y-1">
              <div class="text-2xl font-mono font-bold text-[#00A852] dark:text-[#00FF88]">100+</div>
              <div class="text-[11px] font-mono opacity-60">องค์กรที่ให้ความไว้วางใจ</div>
            </div>
          </div>
        </div>

      </div>
    </section>

    <!-- ========================================================
         4. FLAGSHIP PRODUCTS SPOTLIGHT (ผลิตภัณฑ์ไฮไลต์)
    ========================================================= -->
    <section class="py-20 sm:py-28 max-w-[1360px] mx-auto px-5 sm:px-10 lg:px-16 border-b border-black/10 dark:border-white/10">
      <div class="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-14">
        <div class="space-y-3 max-w-2xl">
          <div class="inline-flex items-center gap-2 text-xs font-mono font-bold tracking-[0.22em] uppercase text-[#00A852] dark:text-[#00FF88]">
            <Box class="w-4 h-4" />
            <span>SOLUTIONS SPOTLIGHT // ผลิตภัณฑ์และบริการ</span>
          </div>
          <h2 class="text-3xl sm:text-5xl font-display font-extrabold tracking-tight text-[#0A1A12] dark:text-[#F8FAFC]">
            โซลูชันซอฟต์แวร์ระดับองค์กร
          </h2>
          <p class="text-base text-[#475569] dark:text-[#94A3B8]">
            วิจัยและพัฒนา Web Application ภายใต้แบรนด์ "IGENCO" ตอบโจทย์กระบวนการทำงานขนาดใหญ่
          </p>
        </div>

        <NuxtLink
          to="/products"
          class="inline-flex items-center gap-2 text-xs font-mono font-bold uppercase tracking-wider text-[#00A852] dark:text-[#00FF88] hover:underline"
        >
          <span>ดูแคตตาล็อกผลิตภัณฑ์ทั้งหมด (All Products)</span>
          <ArrowRight class="w-4 h-4" />
        </NuxtLink>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
        <!-- Card 1: i-SMARTSOFT -->
        <NuxtLink
          to="/news/5"
          class="p-8 rounded-3xl border border-black/10 dark:border-white/10 hover:border-[#00C864] dark:hover:border-[#00FF88] transition-all space-y-4 group flex flex-col justify-between"
        >
          <div class="space-y-3">
            <span class="text-[11px] font-mono font-bold px-2.5 py-1 rounded-full bg-[#00A852]/10 text-[#00A852] dark:text-[#00FF88]">
              OFFICE AUTOMATION
            </span>
            <h3 class="text-xl font-bold group-hover:text-[#00A852] dark:group-hover:text-[#00FF88] transition-colors">
              i-SMARTSOFT (e-Office)
            </h3>
            <p class="text-xs text-[#475569] dark:text-[#94A3B8] leading-relaxed">
              ระบบบริหารสำนักงานอัตโนมัติครบวงจร 10 โมดูล: ระบบสารบรรณ, จัดการเอกสาร, หนังสือเวียน, และการประชุม
            </p>
          </div>
          <div class="pt-4 border-t border-black/5 dark:border-white/5 text-xs font-bold text-[#00A852] dark:text-[#00FF88] flex items-center justify-between">
            <span>อ่านรายละเอียดระบบ</span>
            <ArrowUpRight class="w-4 h-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
          </div>
        </NuxtLink>

        <!-- Card 2: I-SERFF -->
        <NuxtLink
          to="/news/3"
          class="p-8 rounded-3xl border border-black/10 dark:border-white/10 hover:border-[#00C864] dark:hover:border-[#00FF88] transition-all space-y-4 group flex flex-col justify-between"
        >
          <div class="space-y-3">
            <span class="text-[11px] font-mono font-bold px-2.5 py-1 rounded-full bg-[#00A852]/10 text-[#00A852] dark:text-[#00FF88]">
              REGULATORY SYSTEM
            </span>
            <h3 class="text-xl font-bold group-hover:text-[#00A852] dark:group-hover:text-[#00FF88] transition-colors">
              ระบบ I-SERFF (คปภ.)
            </h3>
            <p class="text-xs text-[#475569] dark:text-[#94A3B8] leading-relaxed">
              ระบบยื่นขอรับความเห็นชอบอัตราเบี้ยและแบบข้อความกรมธรรม์ออนไลน์ โดยความร่วมมือระหว่าง คปภ., มธ. และ IGENCO
            </p>
          </div>
          <div class="pt-4 border-t border-black/5 dark:border-white/5 text-xs font-bold text-[#00A852] dark:text-[#00FF88] flex items-center justify-between">
            <span>อ่านรายละเอียดระบบ</span>
            <ArrowUpRight class="w-4 h-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
          </div>
        </NuxtLink>

        <!-- Card 3: EFMS -->
        <NuxtLink
          to="/news/4"
          class="p-8 rounded-3xl border border-black/10 dark:border-white/10 hover:border-[#00C864] dark:hover:border-[#00FF88] transition-all space-y-4 group flex flex-col justify-between"
        >
          <div class="space-y-3">
            <span class="text-[11px] font-mono font-bold px-2.5 py-1 rounded-full bg-[#00A852]/10 text-[#00A852] dark:text-[#00FF88]">
              FINANCIAL ARCHITECTURE
            </span>
            <h3 class="text-xl font-bold group-hover:text-[#00A852] dark:group-hover:text-[#00FF88] transition-colors">
              ระบบ EFMS (สถาบันคุ้มครองเงินฝาก)
            </h3>
            <p class="text-xs text-[#475569] dark:text-[#94A3B8] leading-relaxed">
              ระบบรับและจัดเก็บข้อมูลอิเล็กทรอนิกส์ระหว่างสถาบันคุ้มครองเงินฝาก (สคฝ.) และสถาบันการเงิน สำหรับนำส่งรายงาน
            </p>
          </div>
          <div class="pt-4 border-t border-black/5 dark:border-white/5 text-xs font-bold text-[#00A852] dark:text-[#00FF88] flex items-center justify-between">
            <span>อ่านรายละเอียดระบบ</span>
            <ArrowUpRight class="w-4 h-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
          </div>
        </NuxtLink>
      </div>
    </section>

    <!-- ========================================================
         5. PARTNER ECOSYSTEM (กลุ่มผู้ใช้ผลิตภัณฑ์และพันธมิตร)
    ========================================================= -->
    <div class="border-b border-black/10 dark:border-white/10">
      <KineticBand />
      <div class="max-w-[1360px] mx-auto px-5 sm:px-10 lg:px-16 pb-12 flex justify-end">
        <NuxtLink
          to="/clients"
          class="inline-flex items-center gap-2 text-xs font-mono font-bold uppercase tracking-wider text-[#00A852] dark:text-[#00FF88] hover:underline"
        >
          <span>ดูกลุ่มผู้ใช้ผลิตภัณฑ์และพันธมิตรทั้งหมด (Our Clients)</span>
          <ArrowRight class="w-4 h-4" />
        </NuxtLink>
      </div>
    </div>

    <!-- ========================================================
         6. LATEST NEWS HIGHLIGHTS (ข่าวสารและกิจกรรมล่าสุด)
    ========================================================= -->
    <section class="py-20 sm:py-28 max-w-[1360px] mx-auto px-5 sm:px-10 lg:px-16 border-b border-black/10 dark:border-white/10">
      <div class="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-14">
        <div class="space-y-3 max-w-2xl">
          <div class="inline-flex items-center gap-2 text-xs font-mono font-bold tracking-[0.22em] uppercase text-[#00A852] dark:text-[#00FF88]">
            <Newspaper class="w-4 h-4" />
            <span>LATEST UPDATES // ข่าวสารและกิจกรรม</span>
          </div>
          <h2 class="text-3xl sm:text-5xl font-display font-extrabold tracking-tight text-[#0A1A12] dark:text-[#F8FAFC]">
            ข่าวสารและความเคลื่อนไหวล่าสุด
          </h2>
          <p class="text-base text-[#475569] dark:text-[#94A3B8]">
            ติดตามกิจกรรมเพื่อสังคม การอบรม และความก้าวหน้าทางเทคโนโลยีของไอเจนโก้
          </p>
        </div>

        <NuxtLink
          to="/news"
          class="inline-flex items-center gap-2 text-xs font-mono font-bold uppercase tracking-wider text-[#00A852] dark:text-[#00FF88] hover:underline"
        >
          <span>อ่านข่าวสารและกิจกรรมทั้งหมด (All News)</span>
          <ArrowRight class="w-4 h-4" />
        </NuxtLink>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
        <NuxtLink
          v-for="item in latestNews"
          :key="item.id"
          :to="`/news/${item.id}`"
          class="rounded-3xl border border-black/10 dark:border-white/10 overflow-hidden hover:border-[#00C864] dark:hover:border-[#00FF88] transition-all group flex flex-col justify-between"
        >
          <div>
            <div class="aspect-[16/10] overflow-hidden bg-black/5">
              <img
                :src="item.image"
                :alt="item.title"
                class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                loading="lazy"
              >
            </div>
            <div class="p-6 space-y-2">
              <div class="flex items-center justify-between text-xs font-mono opacity-60">
                <span>{{ item.category }}</span>
                <span>{{ item.date }}</span>
              </div>
              <h3 class="text-base font-bold text-[#0A1A12] dark:text-white group-hover:text-[#00A852] dark:group-hover:text-[#00FF88] transition-colors line-clamp-2">
                {{ item.title }}
              </h3>
              <p class="text-xs text-[#475569] dark:text-[#94A3B8] line-clamp-2 leading-relaxed">
                {{ item.excerpt }}
              </p>
            </div>
          </div>

          <div class="px-6 pb-6 pt-2 text-xs font-bold text-[#00A852] dark:text-[#00FF88] flex items-center justify-between border-t border-black/5 dark:border-white/5">
            <span>อ่านต่อ</span>
            <ArrowUpRight class="w-4 h-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
          </div>
        </NuxtLink>
      </div>
    </section>

    <!-- ========================================================
         7. CONSULTATION & CONTACT GATEWAY
    ========================================================= -->
    <section class="py-16 sm:py-20 max-w-[1360px] mx-auto px-5 sm:px-10 lg:px-16 text-center">
      <div class="max-w-2xl mx-auto space-y-4">
        <h2 class="text-2xl sm:text-4xl font-display font-extrabold text-[#0A1A12] dark:text-white">
          พร้อมยกระดับระบบงานองค์กรของคุณแล้วหรือยัง?
        </h2>
        <p class="text-sm sm:text-base text-[#475569] dark:text-[#94A3B8] leading-relaxed">
          ปรึกษาทีมผู้เชี่ยวชาญจาก บริษัท ไอเจนโก้ จำกัด เพื่อนัดหมายสาธิตระบบงานหรือออกแบบสถาปัตยกรรมซอฟต์แวร์ที่ตรงใจคุณ
        </p>
        <div class="pt-4">
          <NuxtLink
            to="/contact"
            class="inline-flex items-center gap-2 px-8 py-4 rounded-xl font-bold text-sm bg-[#00A852] text-white hover:bg-[#008f44] transition-all shadow-lg"
          >
            <span>ติดต่อเราและขอรับคำปรึกษา (Contact Us)</span>
            <ArrowRight class="w-4 h-4" />
          </NuxtLink>
        </div>
      </div>
    </section>

    <!-- 8. Shared Footer -->
    <ContactFooter />
  </main>
</template>
