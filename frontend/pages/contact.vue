<script setup lang="ts">
import AppHeader from '~/components/AppHeader.vue'
import ContactFooter from '~/components/ContactFooter.vue'
import { Mail, Phone, MapPin, ArrowLeft, Clock, Send, CheckCircle2 } from 'lucide-vue-next'

useHead({
  title: 'ติดต่อเราและขอคำปรึกษา (Contact Us) - บริษัท ไอเจนโก้ จำกัด (IGENCO)',
  meta: [
    {
      name: 'description',
      content: 'ติดต่อสอบถามข้อมูล ปรึกษาโครงการพัฒนาระบบซอฟต์แวร์ หรือนัดหมายสาธิตระบบงาน บริษัท ไอเจนโก้ จำกัด อาคารบูรพาโฮมออฟฟิศ พหลโยธิน 69/1 บางเขน กรุงเทพฯ'
    }
  ]
})
</script>

<template>
  <div class="min-h-screen bg-[#FBFDFB] dark:bg-[#030906] text-[#0F172A] dark:text-[#F1F5F9] transition-colors selection:bg-[#00C864] selection:text-[#022C22]">
    <AppHeader />

    <!-- Subpage Breadcrumb Bar -->
    <div class="pt-24 sm:pt-28 pb-4 border-b border-black/5 dark:border-white/5 bg-black/[0.01] dark:bg-white/[0.01]">
      <div class="max-w-[1360px] mx-auto px-5 sm:px-10 lg:px-16 flex items-center justify-between text-xs font-mono">
        <div class="flex items-center gap-2 opacity-70">
          <NuxtLink to="/" class="hover:text-[#00A852] dark:hover:text-[#00FF88]">หน้าแรก</NuxtLink>
          <span>/</span>
          <span class="text-[#00A852] dark:text-[#00FF88] font-bold">ติดต่อเรา (Contact Us)</span>
        </div>
      </div>
    </div>

    <!-- Contact Page Header -->
    <div class="max-w-[1360px] mx-auto px-5 sm:px-10 lg:px-16 pt-16 pb-8">
      <div class="max-w-3xl space-y-4">
        <div class="inline-flex items-center gap-2 text-xs font-mono font-bold tracking-[0.22em] uppercase text-[#00A852] dark:text-[#00FF88]">
          <Mail class="w-4 h-4" />
          <span>CONTACT & CONSULTATION // ติดต่อสอบถาม</span>
        </div>
        <h1 class="text-3xl sm:text-5xl font-display font-extrabold tracking-tight text-[#0A1A12] dark:text-[#F8FAFC]">
          ติดต่อทีมงานผู้เชี่ยวชาญ IGENCO
        </h1>
        <p class="text-base sm:text-lg text-[#334155] dark:text-[#94A3B8] leading-relaxed">
          พร้อมให้คำปรึกษาด้านการวิเคราะห์ วางระบบคอมพิวเตอร์ และสาธิตการใช้งานโปรแกรมสำหรับองค์กรของท่าน
        </p>
      </div>

      <!-- Quick Contact Cards Row -->
      <div class="grid grid-cols-1 md:grid-cols-3 gap-6 pt-10">
        <div class="p-6 rounded-2xl border border-black/10 dark:border-white/10 space-y-2">
          <div class="flex items-center gap-2 text-xs font-mono font-bold text-[#00A852] dark:text-[#00FF88]">
            <MapPin class="w-4 h-4" />
            <span>ที่ตั้งสำนักงาน (BANG KHEN HQ)</span>
          </div>
          <div class="text-sm font-semibold text-[#0A1A12] dark:text-white">อาคารบูรพาโฮมออฟฟิศ</div>
          <p class="text-xs text-[#64748B] dark:text-[#94A3B8] leading-relaxed">
            88/35 ซอยพหลโยธิน 69/1 แยก 1 แขวงอนุสาวรีย์ เขตบางเขน กรุงเทพมหานคร 10220
          </p>
        </div>

        <div class="p-6 rounded-2xl border border-black/10 dark:border-white/10 space-y-2">
          <div class="flex items-center gap-2 text-xs font-mono font-bold text-[#00A852] dark:text-[#00FF88]">
            <Phone class="w-4 h-4" />
            <span>เบอร์โทรศัพท์ติดต่อ (DIRECT LINES)</span>
          </div>
          <div class="text-sm font-semibold text-[#0A1A12] dark:text-white">
            0-2523-3959 / 0-2523-3960
          </div>
          <p class="text-xs text-[#64748B] dark:text-[#94A3B8]">
            โทรสาร: 0-2523-3960 ต่อ 106 | มือถือ: 08-6610-0244
          </p>
        </div>

        <div class="p-6 rounded-2xl border border-black/10 dark:border-white/10 space-y-2">
          <div class="flex items-center gap-2 text-xs font-mono font-bold text-[#00A852] dark:text-[#00FF88]">
            <Clock class="w-4 h-4" />
            <span>เวลาทำการ & อีเมล (HOURS & EMAIL)</span>
          </div>
          <div class="text-sm font-semibold text-[#0A1A12] dark:text-white">contact@igenco.co.th</div>
          <p class="text-xs text-[#64748B] dark:text-[#94A3B8]">
            วันจันทร์ - ศุกร์: 08:30 - 17:30 น. (เว้นวันหยุดราชการ)
          </p>
        </div>
      </div>
    </div>

    <!-- Full Consultation Form & Interactive Map -->
    <main>
      <ContactFooter />
    </main>
  </div>
</template>
