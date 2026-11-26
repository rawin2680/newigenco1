<script setup lang="ts">
import { ref } from 'vue'
import {
  Send,
  Phone,
  Mail,
  MapPin,
  Check,
  Copy,
  ArrowUpRight,
  ShieldCheck,
  ChevronRight,
  ChevronDown,
  Clock,
  Building2,
  FileText,
  Compass
} from 'lucide-vue-next'
import { useStrapiContent } from '~/composables/useStrapiContent'
import { useTheme } from '~/composables/useTheme'

const { submitInquiry } = useStrapiContent()
const { showToast } = useTheme()

const solutionOptions = [
  'ปรึกษาเรื่องทั่วไป',
  'iGenQ',
  'i-FinSoft',
  'i-SmartSoft',
  'i-SmartFlow',
  'Regist.ai',
  'HR.ai',
  'Software OnDemand',
  'OutSource Service',
  'iMme Application',
  'i-RealEstate',
  'iPOS'
]

const form = ref({
  name: '',
  email: '',
  phone: '',
  projectSummary: '',
  message: ''
})

const isSubmitting = ref(false)

const handleSubmit = async () => {
  if (!form.value.name || !form.value.email || !form.value.projectSummary) {
    showToast('กรุณากรอกชื่อ อีเมล และเลือกหัวข้อที่สนใจให้ครบถ้วน')
    return
  }

  isSubmitting.value = true
  const summary = form.value.projectSummary || 'สอบถามข้อมูลทั่วไปเกี่ยวกับโซลูชัน IGENCO'
  const fullMessage = form.value.message
    ? `${summary} | เบอร์โทร: ${form.value.phone || '-'} | ข้อความ: ${form.value.message}`
    : `${summary} | เบอร์โทร: ${form.value.phone || '-'}`

  const result = await submitInquiry({
    name: form.value.name,
    email: form.value.email,
    phone: form.value.phone,
    projectSummary: fullMessage
  })
  isSubmitting.value = false

  showToast(result.isLive ? 'ส่งข้อความสอบถามและบันทึกลงระบบเรียบร้อยแล้ว ทีมงานจะติดต่อกลับโดยเร็วที่สุด' : 'ส่งข้อความสอบถามเรียบร้อยแล้ว ทีมงาน IGENCO จะติดต่อกลับโดยเร็วที่สุด')
  form.value = { name: '', email: '', phone: '', projectSummary: '', message: '' }
}

// ฟังก์ชันคัดลอกเบอร์โทรและอีเมลในคลิกเดียว (One-Click Copy)
const copiedPhone = ref(false)
const copiedEmail = ref(false)

const copyToClipboard = (text: string, type: 'phone' | 'email') => {
  if (import.meta.client) {
    navigator.clipboard.writeText(text)
    if (type === 'phone') {
      copiedPhone.value = true
      showToast(`คัดลอกเบอร์โทร ${text} เรียบร้อยแล้ว`)
      setTimeout(() => { copiedPhone.value = false }, 2500)
    } else {
      copiedEmail.value = true
      showToast(`คัดลอกอีเมล ${text} เรียบร้อยแล้ว`)
      setTimeout(() => { copiedEmail.value = false }, 2500)
    }
  }
}

const scrollToTop = () => {
  if (import.meta.client) {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }
}
</script>

<template>
  <footer id="contact" class="relative z-10 overflow-hidden">
    
    <!-- =========================================================
         1. CONSULTATION FORM SECTION (ส่วนรับเรื่องขอคำปรึกษา)
    ========================================================== -->
    <div class="pt-20 pb-16 px-5 sm:px-10 lg:px-16 max-w-[1440px] mx-auto">
      <div class="spatial-glass rounded-[2.5rem] p-8 sm:p-14 lg:p-16 border border-current/10 shadow-2xl relative overflow-hidden backdrop-blur-2xl">
        
        <div class="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start relative z-10">
          
          <!-- Left Column: Title & Key Highlights -->
          <div class="lg:col-span-5 space-y-6 reveal-init reveal-left">
            <SectionHeading
              eyebrow="CONSULTATION & INQUIRY // ติดต่อเรา"
              title-prefix="ติดต่อสอบถาม หรือ"
              title-highlight="ขอคำปรึกษา"
              size="lg"
              :icon="ShieldCheck"
            />
            
            <p class="text-sm sm:text-base opacity-85 leading-relaxed">
              สนใจระบบซอฟต์แวร์ตัวไหน หรือต้องการปรึกษาเพื่อนำโซลูชันไปปรับใช้กับองค์กรของคุณ สามารถกรอกฟอร์มได้ทันทีโดยไม่ต้องลงทะเบียนล่วงหน้า ทีมผู้เชี่ยวชาญ IGENCO จะติดต่อกลับอย่างรวดเร็ว
            </p>

            <!-- Quick Trust Badges (Unified Spatial Glass) -->
            <div class="pt-4 space-y-3">
              <div class="flex items-center gap-3.5 p-4 rounded-2xl spatial-glass border border-[#00C864]/25 dark:border-[#00FF88]/25 hover-lift">
                <div class="w-10 h-10 rounded-xl bg-[#00C864]/15 dark:bg-[#00FF88]/15 flex items-center justify-center shrink-0 text-[#00C864] dark:text-[#00FF88]">
                  <ShieldCheck class="w-5 h-5" />
                </div>
                <div class="text-xs">
                  <span class="font-bold">มาตรฐานระดับสากล ISO/IEC 29110</span>
                  <p class="opacity-75">ผ่านการรับรองโดย TÜV NORD (Thailand) Co., Ltd.</p>
                </div>
              </div>

              <div class="flex items-center gap-3.5 p-4 rounded-2xl spatial-glass border border-current/10 hover-lift">
                <div class="w-10 h-10 rounded-xl bg-current/5 flex items-center justify-center shrink-0 text-[#00C864] dark:text-[#00FF88]">
                  <Clock class="w-5 h-5" />
                </div>
                <div class="text-xs">
                  <span class="font-bold">ตอบกลับรวดเร็วภายใน 24 ชม.</span>
                  <p class="opacity-75">วันจันทร์ - ศุกร์ เวลา 08:30 - 17:30 น.</p>
                </div>
              </div>
            </div>
          </div>

          <!-- Right Column: Consultation Form (Single Column Vertical Layout) -->
          <form class="lg:col-span-7 space-y-4 reveal-init reveal-right delay-150" @submit.prevent="handleSubmit">
            <!-- 1. ชื่อผู้ติดต่อ / หน่วยงาน * -->
            <div>
              <label class="block text-xs font-semibold uppercase opacity-80 mb-1.5">ชื่อผู้ติดต่อ / หน่วยงาน *</label>
              <input
                v-model="form.name"
                type="text"
                required
                placeholder="ระบุชื่อ - นามสกุล หรือชื่อองค์กร"
                class="w-full px-4 py-3.5 rounded-xl bg-white/80 dark:bg-black/60 border border-current/15 text-sm focus:outline-none focus:border-[#00C864] dark:focus:border-[#00FF88] focus:ring-2 focus:ring-[#00C864]/20 transition-all text-[#0A1A12] dark:text-[#F8FAFC]"
              >
            </div>

            <!-- 2. อีเมลติดต่อกลับ * -->
            <div>
              <label class="block text-xs font-semibold uppercase opacity-80 mb-1.5">อีเมลติดต่อกลับ *</label>
              <input
                v-model="form.email"
                type="email"
                required
                placeholder="name@company.com"
                class="w-full px-4 py-3.5 rounded-xl bg-white/80 dark:bg-black/60 border border-current/15 text-sm focus:outline-none focus:border-[#00C864] dark:focus:border-[#00FF88] focus:ring-2 focus:ring-[#00C864]/20 transition-all text-[#0A1A12] dark:text-[#F8FAFC]"
              >
            </div>

            <!-- 3. เบอร์โทรศัพท์ติดต่อ -->
            <div>
              <label class="block text-xs font-semibold uppercase opacity-80 mb-1.5">เบอร์โทรศัพท์ติดต่อ</label>
              <input
                v-model="form.phone"
                type="tel"
                placeholder="08X-XXX-XXXX หรือ 02-XXX-XXXX"
                class="w-full px-4 py-3.5 rounded-xl bg-white/80 dark:bg-black/60 border border-current/15 text-sm focus:outline-none focus:border-[#00C864] dark:focus:border-[#00FF88] focus:ring-2 focus:ring-[#00C864]/20 transition-all text-[#0A1A12] dark:text-[#F8FAFC]"
              >
            </div>

            <!-- 4. หัวข้อหรือโซลูชันที่สนใจ * (Dropdown) -->
            <div>
              <label class="block text-xs font-semibold uppercase opacity-80 mb-1.5">หัวข้อหรือโซลูชันที่สนใจ *</label>
              <div class="relative">
                <select
                  id="projectSummaryInput"
                  v-model="form.projectSummary"
                  required
                  class="w-full px-4 py-3.5 pr-10 rounded-xl bg-white/80 dark:bg-black/60 border border-current/15 text-sm focus:outline-none focus:border-[#00C864] dark:focus:border-[#00FF88] focus:ring-2 focus:ring-[#00C864]/20 transition-all appearance-none cursor-pointer text-[#0A1A12] dark:text-[#F8FAFC]"
                >
                  <option value="" disabled selected class="text-gray-400 dark:text-gray-500 bg-white dark:bg-[#0A1A12]">
                    -- เลือกหัวข้อหรือโซลูชันที่ต้องการ --
                  </option>
                  <option
                    v-for="opt in solutionOptions"
                    :key="opt"
                    :value="opt"
                    class="text-[#0A1A12] dark:text-[#F8FAFC] bg-white dark:bg-[#0A1A12] py-1.5"
                  >
                    {{ opt }}
                  </option>
                </select>
                <div class="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3.5 text-current opacity-60">
                  <ChevronDown class="w-4 h-4" />
                </div>
              </div>
            </div>

            <!-- 5. รายละเอียดเพิ่มเติม -->
            <div>
              <label class="block text-xs font-semibold uppercase opacity-80 mb-1.5">รายละเอียดเพิ่มเติม</label>
              <textarea
                v-model="form.message"
                rows="4"
                placeholder="ระบุขอบเขตงาน จำนวนผู้ใช้งาน หรือฟังก์ชันที่ต้องการให้ระบบรองรับ..."
                class="w-full px-4 py-3.5 rounded-xl bg-white/80 dark:bg-black/60 border border-current/15 text-sm focus:outline-none focus:border-[#00C864] dark:focus:border-[#00FF88] focus:ring-2 focus:ring-[#00C864]/20 transition-all text-[#0A1A12] dark:text-[#F8FAFC]"
              />
            </div>

            <!-- 6. ปุ่มส่งแบบฟอร์มสอบถาม / ขอคำปรึกษา -->
            <button
              type="submit"
              :disabled="isSubmitting"
              class="w-full py-4 rounded-xl font-bold text-sm uppercase tracking-wider bg-[#00C864] text-[#022C22] dark:bg-[#00FF88] dark:text-[#020806] hover:opacity-90 transition-all flex items-center justify-center gap-2 shadow-xl hover:shadow-[0_8px_25px_rgba(0,200,100,0.35)] disabled:opacity-50 hover:scale-[1.01] active:scale-[0.99]"
            >
              <span>{{ isSubmitting ? 'กำลังส่งข้อมูล...' : 'ส่งแบบฟอร์มสอบถาม / ขอคำปรึกษา' }}</span>
              <Send class="w-4 h-4" />
            </button>
          </form>

        </div>
      </div>
    </div>

    <!-- =========================================================
         2. MODERN MULTI-COLUMN FOOTER (Dark-Emerald Edition)
         ข้อมูลติดต่อ IGENCO แท้ + One-Click Copy + ลิขสิทธิ์ปัจจุบัน
    ========================================================== -->
    <div class="bg-[#021811] dark:bg-[#010D09] text-white pt-16 pb-12 border-t border-[#00FF88]/20 transition-colors">
      <div class="max-w-[1440px] mx-auto px-5 sm:px-10 lg:px-16">
        
        <!-- 4-Column Grid -->
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-8 pb-14 border-b border-white/10 reveal-init reveal-up delay-100">
          
          <!-- Column 1: Company Profile & ISO Certification (4 Cols) -->
          <div class="lg:col-span-4 space-y-5">
            <!-- Brand Logo -->
            <NuxtLink to="/" class="flex items-center gap-2.5 group">
              <span class="w-3.5 h-3.5 rounded-full bg-[#00FF88] shadow-[0_0_15px_#00FF88]" />
              <span class="font-display font-extrabold text-2xl tracking-wider text-white">
                IGENCO<span class="text-[#00FF88]">//</span>TECH
              </span>
            </NuxtLink>

            <p class="text-sm text-slate-300 leading-relaxed max-w-sm">
              บริษัท ไอเจนโก้ จำกัด (IGENCO.Co.,Ltd) มุ่งมั่นส่งมอบระบบซอฟต์แวร์บริหารจัดการระดับองค์กร โครงสร้างฐานข้อมูลความปลอดภัยสูง และนวัตกรรมดิจิทัลที่ขับเคลื่อนธุรกิจสู่ความสำเร็จ
            </p>

            <!-- ISO Certification Badge Card -->
            <div class="p-4 rounded-2xl bg-white/5 border border-[#00FF88]/30 flex items-center gap-3.5 max-w-sm">
              <div class="w-11 h-11 rounded-xl bg-[#00FF88]/20 flex items-center justify-center shrink-0 text-[#00FF88]">
                <ShieldCheck class="w-6 h-6" />
              </div>
              <div class="text-xs">
                <div class="font-bold text-white">TÜV NORD CERTIFIED</div>
                <div class="text-[#00FF88] font-mono">ISO/IEC 29110:2011</div>
                <div class="text-[11px] text-slate-400">Software Implementation & PM</div>
              </div>
            </div>

            <!-- Tax ID -->
            <div class="text-xs font-mono text-slate-400 flex items-center gap-2">
              <FileText class="w-3.5 h-3.5 text-[#00FF88]" />
              <span>เลขประจำตัวผู้เสียภาษี : 0115553003741</span>
            </div>
          </div>

          <!-- Column 2: Navigation Links (2.5 Cols) -->
          <div class="lg:col-span-2 space-y-4">
            <h3 class="text-xs font-mono font-bold uppercase tracking-wider text-[#00FF88]">
              NAVIGATION // เมนูหลัก
            </h3>
            <ul class="space-y-2.5 text-sm text-slate-300">
              <li>
                <NuxtLink to="/#top" class="hover:text-[#00FF88] transition-colors flex items-center gap-1.5">
                  <ChevronRight class="w-3.5 h-3.5 text-[#00FF88]/60" />
                  <span>หน้าแรก</span>
                </NuxtLink>
              </li>
              <li>
                <NuxtLink to="/#news" class="hover:text-[#00FF88] transition-colors flex items-center gap-1.5">
                  <ChevronRight class="w-3.5 h-3.5 text-[#00FF88]/60" />
                  <span>ข่าวสาร</span>
                </NuxtLink>
              </li>
              <li>
                <NuxtLink to="/#about" class="hover:text-[#00FF88] transition-colors flex items-center gap-1.5">
                  <ChevronRight class="w-3.5 h-3.5 text-[#00FF88]/60" />
                  <span>เกี่ยวกับเรา</span>
                </NuxtLink>
              </li>
              <li>
                <NuxtLink to="/#products" class="hover:text-[#00FF88] transition-colors flex items-center gap-1.5">
                  <ChevronRight class="w-3.5 h-3.5 text-[#00FF88]/60" />
                  <span>ผลิตภัณฑ์</span>
                </NuxtLink>
              </li>
              <li>
                <NuxtLink to="/#clients" class="hover:text-[#00FF88] transition-colors flex items-center gap-1.5">
                  <ChevronRight class="w-3.5 h-3.5 text-[#00FF88]/60" />
                  <span>กลุ่มผู้ใช้ผลิตภัณฑ์</span>
                </NuxtLink>
              </li>
              <li>
                <NuxtLink to="/contact" class="hover:text-[#00FF88] transition-colors flex items-center gap-1.5">
                  <ChevronRight class="w-3.5 h-3.5 text-[#00FF88]/60" />
                  <span>ติดต่อสอบถาม / ขอคำปรึกษา</span>
                </NuxtLink>
              </li>
              <li>
                <NuxtLink to="/contact/location" class="hover:text-[#00FF88] transition-colors flex items-center gap-1.5">
                  <ChevronRight class="w-3.5 h-3.5 text-[#00FF88]/60" />
                  <span>ตำแหน่งที่ตั้งสำนักงาน</span>
                </NuxtLink>
              </li>
            </ul>
          </div>

          <!-- Column 3: Solutions & Services (2.5 Cols) -->
          <div class="lg:col-span-2 space-y-4">
            <h3 class="text-xs font-mono font-bold uppercase tracking-wider text-[#00FF88]">
              SOLUTIONS // ผลิตภัณฑ์
            </h3>
            <ul class="space-y-2.5 text-sm text-slate-300">
              <li>
                <NuxtLink to="/products/regist-ai" class="hover:text-[#00FF88] transition-colors">
                  Regist.ai (ระบบลงทะเบียน & i-Queue)
                </NuxtLink>
              </li>
              <li>
                <NuxtLink to="/news/5" class="hover:text-[#00FF88] transition-colors">
                  iSmartFlow (สำนักงานอิเล็กทรอนิกส์)
                </NuxtLink>
              </li>
              <li>
                <NuxtLink to="/news/3" class="hover:text-[#00FF88] transition-colors">
                  I-SERFF (ระบบยื่นแบบ คปภ.)
                </NuxtLink>
              </li>
              <li>
                <NuxtLink to="/news/4" class="hover:text-[#00FF88] transition-colors">
                  EFMS (ระบบเชื่อมต่อข้อมูล สคฝ.)
                </NuxtLink>
              </li>
              <li>
                <NuxtLink to="/#products" class="hover:text-[#00FF88] transition-colors">
                  Enterprise Cloud & Data Lake
                </NuxtLink>
              </li>
              <li>
                <NuxtLink to="/#products" class="hover:text-[#00FF88] transition-colors">
                  AI Analytics & Machine Learning
                </NuxtLink>
              </li>
            </ul>
          </div>

          <!-- Column 4: Contact & Location in Don Mueang (3.5 Cols) -->
          <div class="lg:col-span-4 space-y-4">
            <h3 class="text-xs font-mono font-bold uppercase tracking-wider text-[#00FF88]">
              HEADQUARTERS // ที่ตั้งสำนักงาน
            </h3>
            
            <!-- Address with MapPin -->
            <div class="flex items-start gap-3 text-xs sm:text-sm text-slate-300 leading-relaxed">
              <MapPin class="w-4 h-4 text-[#00FF88] shrink-0 mt-1" />
              <span>
                89/35 อาคารจูเคี่ยวเล้ง ชั้น 3 ถนนวิภาวดีรังสิต แขวงสนามบิน เขตดอนเมือง กรุงเทพมหานคร 10210
              </span>
            </div>

            <!-- Dedicated Location Page Link -->
            <div class="pt-1">
              <NuxtLink
                to="/contact/location"
                class="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white/10 hover:bg-[#00FF88] text-slate-200 hover:text-[#020806] text-xs font-semibold transition-all group"
              >
                <Compass class="w-3.5 h-3.5 text-[#00FF88] group-hover:text-[#020806]" />
                <span>ดูตำแหน่งที่ตั้งและแผนที่สำนักงาน</span>
                <ArrowUpRight class="w-3.5 h-3.5" />
              </NuxtLink>
            </div>

            <!-- Phone Numbers with One-Click Copy -->
            <div class="space-y-2 pt-1">
              <div class="text-xs font-semibold text-slate-400">เบอร์โทรศัพท์ติดต่อ (คลิกเพื่อโทรหรือคัดลอก) :</div>
              <div class="flex flex-wrap items-center gap-2">
                <a
                  href="tel:025233559"
                  title="โทร 0-2523-3559 (ชั้น 2)"
                  class="px-3 py-1.5 rounded-xl bg-white/10 hover:bg-[#00FF88] hover:text-[#020806] text-xs font-mono font-semibold transition-all flex items-center gap-1.5"
                >
                  <Phone class="w-3 h-3 text-[#00FF88]" />
                  <span>0-2523-3559 (ชั้น 2)</span>
                </a>
                <a
                  href="tel:025233560"
                  title="โทร 0-2523-3560 (ชั้น 3)"
                  class="px-3 py-1.5 rounded-xl bg-white/10 hover:bg-[#00FF88] hover:text-[#020806] text-xs font-mono font-semibold transition-all"
                >
                  0-2523-3560 (ชั้น 3)
                </a>
                <a
                  href="tel:0635254850"
                  title="โทร 063-5254850"
                  class="px-3 py-1.5 rounded-xl bg-white/10 hover:bg-[#00FF88] hover:text-[#020806] text-xs font-mono font-semibold transition-all"
                >
                  063-5254850
                </a>

                <!-- One-Click Copy Phone Button -->
                <button
                  type="button"
                  title="คัดลอกเบอร์โทรติดต่อทั้งหมด"
                  class="p-1.5 rounded-xl bg-white/10 hover:bg-[#00FF88] hover:text-[#020806] transition-all text-xs cursor-pointer"
                  @click="copyToClipboard('0-2523-3559, 0-2523-3560, 063-5254850', 'phone')"
                >
                  <Check v-if="copiedPhone" class="w-3.5 h-3.5 text-[#00FF88]" />
                  <Copy v-else class="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            <!-- Email with One-Click Copy -->
            <div class="space-y-1.5 pt-1">
              <div class="text-xs font-semibold text-slate-400">อีเมลติดต่อฝ่ายขายและบริการ :</div>
              <div class="flex items-center gap-2">
                <a
                  href="mailto:sales@igenco.co.th"
                  class="px-3 py-1.5 rounded-xl bg-white/10 hover:bg-[#00FF88] hover:text-[#020806] text-xs font-mono font-semibold transition-all flex items-center gap-1.5"
                >
                  <Mail class="w-3.5 h-3.5 text-[#00FF88]" />
                  <span>sales@igenco.co.th</span>
                </a>
                <!-- One-Click Copy Email Button -->
                <button
                  type="button"
                  title="คัดลอกอีเมล"
                  class="p-1.5 rounded-xl bg-white/10 hover:bg-[#00FF88] hover:text-[#020806] transition-all text-xs cursor-pointer"
                  @click="copyToClipboard('sales@igenco.co.th', 'email')"
                >
                  <Check v-if="copiedEmail" class="w-3.5 h-3.5 text-[#00FF88]" />
                  <Copy v-else class="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

          </div>

        </div>

        <!-- Bottom Line: Copyright, Status, Scroll to Top -->
        <div class="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-400 font-mono">
          <div class="flex items-center gap-2">
            <span class="w-2 h-2 rounded-full bg-[#00FF88] animate-pulse" />
            <span>© 2026 บริษัท ไอเจนโก้ จำกัด (IGENCO.Co.,Ltd) — ALL RIGHTS RESERVED</span>
          </div>

          <div class="flex items-center gap-4">
            <span class="hidden md:inline text-slate-500">ISO/IEC 29110 QUALITY STANDARDS</span>
            <button
              type="button"
              class="hover:text-[#00FF88] transition-colors flex items-center gap-1 font-bold"
              @click="scrollToTop"
            >
              <span>กลับขึ้นด้านบน</span>
              <ArrowUpRight class="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

      </div>
    </div>

  </footer>
</template>
