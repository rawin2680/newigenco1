<script setup lang="ts">
import AppHeader from '~/components/AppHeader.vue'
import ContactFooter from '~/components/ContactFooter.vue'
import { Cookie, Settings, ArrowLeft, CheckCircle2 } from 'lucide-vue-next'

useHead({
  title: 'นโยบายการใช้คุกกี้ (Cookie Policy) - IGENCO',
  meta: [
    { name: 'description', content: 'นโยบายการใช้คุกกี้ (Cookie Policy) บริษัท ไอเจนโก้ จำกัด' }
  ]
})
</script>

<template>
  <div class="min-h-screen  text-[#022C22] dark:text-[#F4FBF7] transition-colors selection:bg-[#00C864] selection:text-[#022C22]">
    <AppHeader />

    <main class="pt-28 pb-20 px-5 sm:px-10 lg:px-16 max-w-4xl mx-auto">
      <!-- Breadcrumb -->
      <div class="flex items-center gap-2 text-xs font-mono mb-8 opacity-70">
        <NuxtLink to="/" class="hover:text-[#00C864] dark:hover:text-[#00FF88] flex items-center gap-1">
          <ArrowLeft class="w-3.5 h-3.5" />
          <span>หน้าแรก</span>
        </NuxtLink>
        <span>/</span>
        <span>การคุ้มครองข้อมูลส่วนบุคคล</span>
        <span>/</span>
        <span class="text-[#00C864] dark:text-[#00FF88] font-semibold">นโยบายการใช้คุกกี้</span>
      </div>

      <!-- Header Banner -->
      <div class="spatial-glass rounded-3xl p-8 sm:p-12 border border-current/10 mb-10 relative overflow-hidden">
        <div class="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-[0.2em] text-[#00C864] dark:text-[#00FF88] mb-3 font-bold">
          <Cookie class="w-4 h-4" />
          <span>COOKIE POLICY // นโยบายการใช้คุกกี้</span>
        </div>
        <h1 class="font-display font-extrabold text-2xl sm:text-4xl leading-tight">
          นโยบายการใช้คุกกี้ (Cookie Policy)
        </h1>
        <p class="text-sm sm:text-base opacity-75 mt-3 leading-relaxed">
          เว็บไซต์ของบริษัท ไอเจนโก้ จำกัด มีการใช้คุกกี้ (Cookies) เพื่อพัฒนาประสบการณ์การใช้งานและปรับปรุงประสิทธิภาพการให้บริการเว็บไซต์ของท่าน
        </p>
      </div>

      <!-- Policy Content -->
      <div class="space-y-8 text-sm sm:text-base leading-relaxed opacity-90">
        
        <!-- Section 1 -->
        <section class="spatial-glass rounded-2xl p-6 sm:p-8 border border-current/10 space-y-3">
          <h2 class="text-lg sm:text-xl font-bold flex items-center gap-2 text-[#00C864] dark:text-[#00FF88]">
            <Cookie class="w-5 h-5 shrink-0" />
            <span>1. คุกกี้คืออะไร?</span>
          </h2>
          <p>
            คุกกี้ (Cookies) คือไฟล์ข้อความขนาดเล็กที่ถูกจัดเก็บไว้ในคอมพิวเตอร์หรืออุปกรณ์สื่อสารของท่านเมื่อท่านเข้าชมเว็บไซต์ คุกกี้จะช่วยให้เว็บไซต์จดจำการตั้งค่า ความชอบส่วนบุคคล (เช่น ภาษา โหมดแสดงผลมืด/สว่าง) และช่วยให้ท่านใช้งานเว็บไซต์ได้อย่างราบรื่น
          </p>
        </section>

        <!-- Section 2 -->
        <section class="spatial-glass rounded-2xl p-6 sm:p-8 border border-current/10 space-y-3">
          <h2 class="text-lg sm:text-xl font-bold flex items-center gap-2 text-[#00C864] dark:text-[#00FF88]">
            <Settings class="w-5 h-5 shrink-0" />
            <span>2. ประเภทของคุกกี้ที่เราใช้</span>
          </h2>
          <div class="space-y-3 opacity-90">
            <div class="p-3.5 rounded-xl bg-current/5 border border-current/10">
              <div class="font-bold text-[#00C864] dark:text-[#00FF88] text-sm">คุกกี้ที่จำเป็นสำหรับการทำงานของเว็บไซต์ (Strictly Necessary Cookies)</div>
              <p class="text-xs sm:text-sm mt-1 opacity-80">จำเป็นสำหรับการทำงานพื้นฐานของเว็บไซต์ เช่น การเลือกธีมมืด/สว่าง และการนำทางระบบรักษาความปลอดภัย</p>
            </div>
            <div class="p-3.5 rounded-xl bg-current/5 border border-current/10">
              <div class="font-bold text-[#00C864] dark:text-[#00FF88] text-sm">คุกกี้เพื่อการวิเคราะห์และวัดผล (Analytical & Performance Cookies)</div>
              <p class="text-xs sm:text-sm mt-1 opacity-80">ช่วยให้เราเข้าใจการโต้ตอบของผู้ใช้งาน การเข้าถึงหน้าบทความข่าวสาร เพื่อนำมาปรับปรุงความเร็วและประสิทธิภาพของเว็บไซต์</p>
            </div>
          </div>
        </section>

        <!-- Section 3 -->
        <section class="spatial-glass rounded-2xl p-6 sm:p-8 border border-current/10 space-y-3">
          <h2 class="text-lg sm:text-xl font-bold text-[#00C864] dark:text-[#00FF88]">
            3. การจัดการและการตั้งค่าคุกกี้
          </h2>
          <p>
            ท่านสามารถเลือกเปิดหรือปิดการใช้งานคุกกี้บางประเภทได้ผ่านการตั้งค่าในเบราว์เซอร์ของท่าน ทั้งนี้ การปิดคุกกี้ที่จำเป็นอาจส่งผลต่อการทำงานบางส่วนของเว็บไซต์
          </p>
          <div class="pt-2 text-xs font-mono opacity-80">
            สอบถามข้อมูลเพิ่มเติม: บริษัท ไอเจนโก้ จำกัด (IGENCO.Co.,Ltd) | อีเมล: sales@igenco.co.th | โทร: 0-2523-3559, 063-5254850
          </div>
        </section>

      </div>
    </main>

    <ContactFooter />
  </div>
</template>
