<script setup lang="ts">
import { ref } from 'vue'
import AppHeader from '~/components/AppHeader.vue'
import ContactFooter from '~/components/ContactFooter.vue'
import {
  Send,
  Phone,
  Mail,
  MapPin,
  Clock,
  ShieldCheck,
  Check,
  Copy,
  ArrowRight,
  ArrowLeft,
  ChevronDown,
  Building2,
  Headphones,
  Award,
  Sparkles
} from 'lucide-vue-next'
import { useStrapiContent } from '~/composables/useStrapiContent'
import { useTheme } from '~/composables/useTheme'

useHead({
  title: 'ติดต่อสอบถามหรือ ขอคำปรึกษา - บริษัท ไอเจนโก้ จำกัด (IGENCO)',
  meta: [
    {
      name: 'description',
      content: 'ติดต่อสอบถามข้อมูลระบบซอฟต์แวร์ หรือขอรับคำปรึกษาด้านการพัฒนาระบบสารสนเทศองค์กรจากทีมผู้เชี่ยวชาญ บริษัท ไอเจนโก้ จำกัด มาตรฐานสากล ISO/IEC 29110 โทร 0-2523-3559'
    }
  ]
})

const { submitInquiry } = useStrapiContent()
const { showToast } = useTheme()

const solutionOptions = [
  'ปรึกษาเรื่องทั่วไป / สนใจนำระบบไปใช้ในองค์กร',
  'Regist.ai (ระบบบริหารการลงทะเบียนอัจฉริยะ)',
  'HR.ai (ระบบบริหารทรัพยากรมนุษย์อัจฉริยะ)',
  'iGenQ (ระบบบริหารคิวอัจฉริยะแบบ New Normal)',
  'Software OnDemand (บริการพัฒนาซอฟต์แวร์ตามสั่ง)',
  'OutSource Service (บริการจัดหาทีมงานไอที)',
  'iMme Application (แอปพลิเคชันระบบสั่งซื้อสินค้า)',
  'i-RealEstate (ระบบบริหารอสังหาริมทรัพย์)',
  'iPOS (ระบบบริหารจุดขายหน้าร้าน)',
  'iSmartFlow (ระบบงานสารบรรณอิเล็กทรอนิกส์)',
  'i-FinSoft (ระบบการเงินและบัญชี)',
  'อื่นๆ / ขอใบเสนอราคา'
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
  const summary = form.value.projectSummary || 'ติดต่อสอบถามทั่วไปผ่านหน้าติดต่อ'
  const fullMessage = form.value.message
    ? `${summary} | เบอร์โทร: ${form.value.phone || '-'} | ข้อความ: ${form.value.message}`
    : `${summary} | เบอร์โทร: ${form.value.phone || '-'}`

  await submitInquiry({
    name: form.value.name,
    email: form.value.email,
    projectSummary: fullMessage
  })
  isSubmitting.value = false

  showToast('ส่งข้อความสอบถามเรียบร้อยแล้ว ทีมงาน IGENCO จะติดต่อกลับโดยเร็วที่สุด')
  form.value = { name: '', email: '', phone: '', projectSummary: '', message: '' }
}

// One-Click Copy
const copiedPhone = ref<string | null>(null)
const copiedEmail = ref(false)

const copyToClipboard = (text: string, type: 'phone' | 'email') => {
  if (import.meta.client) {
    navigator.clipboard.writeText(text)
    if (type === 'phone') {
      copiedPhone.value = text
      showToast(`คัดลอกเบอร์โทร ${text} เรียบร้อยแล้ว`)
      setTimeout(() => { copiedPhone.value = null }, 2500)
    } else {
      copiedEmail.value = true
      showToast(`คัดลอกอีเมล ${text} เรียบร้อยแล้ว`)
      setTimeout(() => { copiedEmail.value = false }, 2500)
    }
  }
}
</script>

<template>
  <div class="min-h-screen bg-[#FBFDFB] dark:bg-[#030906] text-[#0F172A] dark:text-[#F1F5F9] transition-colors selection:bg-[#00C864] selection:text-[#022C22]">
    <AppHeader />

    <main class="pt-28 pb-24 max-w-[1360px] mx-auto px-5 sm:px-10 lg:px-16">
      
      <!-- Breadcrumb Navigation -->
      <nav class="flex items-center gap-2 text-xs font-mono mb-8 opacity-75">
        <NuxtLink to="/" class="hover:text-[#00C864] dark:hover:text-[#00FF88] flex items-center gap-1">
          <ArrowLeft class="w-3.5 h-3.5" />
          <span>หน้าแรก</span>
        </NuxtLink>
        <span>/</span>
        <span class="opacity-60">ติดต่อเรา</span>
        <span>/</span>
        <span class="text-[#00C864] dark:text-[#00FF88] font-bold">ติดต่อสอบถามหรือ ขอคำปรึกษา</span>
      </nav>

      <!-- Page Header Banner -->
      <div class="mb-12">
        <div class="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-mono uppercase tracking-wider bg-[#00C864]/10 text-[#00A854] dark:text-[#00FF88] border border-[#00C864]/20 mb-4 font-bold">
          <Headphones class="w-3.5 h-3.5" />
          <span>CONSULTATION & INQUIRY // ติดต่อสอบถาม</span>
        </div>
        <h1 class="font-display font-extrabold text-3xl sm:text-5xl tracking-tight leading-tight uppercase">
          ติดต่อสอบถามหรือ <span class="text-[#00C864] dark:text-[#00FF88]">ขอคำปรึกษา</span>
        </h1>
        <p class="text-sm sm:text-base opacity-75 mt-3 max-w-3xl leading-relaxed">
          ยินดีให้คำปรึกษาด้านการวางระบบสารสนเทศระดับองค์กร การพัฒนาซอฟต์แวร์ตามสั่ง และการนำเทคโนโลยีดิจิทัลมาเพิ่มประสิทธิภาพการทำงาน สามารถกรอกแบบฟอร์มด้านล่าง หรือติดต่อโดยตรงผ่านช่องทางต่าง ๆ ได้ทันที
        </p>
      </div>

      <!-- Main Layout: 2 Columns -->
      <div class="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
        
        <!-- ==========================================
             Left Column: Contact Channels & Quick Info
        =========================================== -->
        <div class="lg:col-span-5 space-y-6">
          
          <!-- Direct Contact Card -->
          <div class="p-6 sm:p-8 rounded-3xl spatial-glass border border-current/10 shadow-xl space-y-6">
            <h2 class="text-base font-bold uppercase tracking-wider flex items-center gap-2 text-[#00C864] dark:text-[#00FF88]">
              <Phone class="w-4 h-4" />
              <span>ช่องทางการติดต่อโดยตรง</span>
            </h2>

            <!-- Phone Numbers -->
            <div class="space-y-3">
              <span class="text-xs font-semibold uppercase opacity-70 block">เบอร์โทรศัพท์สำนักงาน</span>
              
              <div class="space-y-2">
                <div class="flex items-center justify-between p-3 rounded-xl bg-black/[0.03] dark:bg-white/[0.04] border border-current/10">
                  <div class="flex items-center gap-2.5">
                    <Phone class="w-4 h-4 text-[#00C864] dark:text-[#00FF88]" />
                    <span class="text-sm font-mono font-bold">0-2523-3559</span>
                    <span class="text-xs opacity-60">(ชั้น 2)</span>
                  </div>
                  <div class="flex items-center gap-2">
                    <a href="tel:025233559" class="px-2.5 py-1 rounded-lg text-xs font-bold bg-[#00C864]/15 hover:bg-[#00C864] hover:text-white text-[#00C864] dark:text-[#00FF88] transition-all">โทร</a>
                    <button
                      type="button"
                      aria-label="คัดลอกเบอร์โทร 0-2523-3559"
                      class="p-1.5 rounded-lg hover:bg-black/10 dark:hover:bg-white/10 opacity-70 hover:opacity-100 transition-all"
                      @click="copyToClipboard('025233559', 'phone')"
                    >
                      <Check v-if="copiedPhone === '025233559'" class="w-3.5 h-3.5 text-[#00C864]" />
                      <Copy v-else class="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>

                <div class="flex items-center justify-between p-3 rounded-xl bg-black/[0.03] dark:bg-white/[0.04] border border-current/10">
                  <div class="flex items-center gap-2.5">
                    <Phone class="w-4 h-4 text-[#00C864] dark:text-[#00FF88]" />
                    <span class="text-sm font-mono font-bold">0-2523-3560</span>
                    <span class="text-xs opacity-60">(ชั้น 3)</span>
                  </div>
                  <div class="flex items-center gap-2">
                    <a href="tel:025233560" class="px-2.5 py-1 rounded-lg text-xs font-bold bg-[#00C864]/15 hover:bg-[#00C864] hover:text-white text-[#00C864] dark:text-[#00FF88] transition-all">โทร</a>
                    <button
                      type="button"
                      aria-label="คัดลอกเบอร์โทร 0-2523-3560"
                      class="p-1.5 rounded-lg hover:bg-black/10 dark:hover:bg-white/10 opacity-70 hover:opacity-100 transition-all"
                      @click="copyToClipboard('025233560', 'phone')"
                    >
                      <Check v-if="copiedPhone === '025233560'" class="w-3.5 h-3.5 text-[#00C864]" />
                      <Copy v-else class="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>

                <div class="flex items-center justify-between p-3 rounded-xl bg-black/[0.03] dark:bg-white/[0.04] border border-current/10">
                  <div class="flex items-center gap-2.5">
                    <Phone class="w-4 h-4 text-[#00C864] dark:text-[#00FF88]" />
                    <span class="text-sm font-mono font-bold">06-3525-4850</span>
                    <span class="text-xs opacity-60">(สายด่วน)</span>
                  </div>
                  <div class="flex items-center gap-2">
                    <a href="tel:0635254850" class="px-2.5 py-1 rounded-lg text-xs font-bold bg-[#00C864]/15 hover:bg-[#00C864] hover:text-white text-[#00C864] dark:text-[#00FF88] transition-all">โทร</a>
                    <button
                      type="button"
                      aria-label="คัดลอกเบอร์โทร 06-3525-4850"
                      class="p-1.5 rounded-lg hover:bg-black/10 dark:hover:bg-white/10 opacity-70 hover:opacity-100 transition-all"
                      @click="copyToClipboard('0635254850', 'phone')"
                    >
                      <Check v-if="copiedPhone === '0635254850'" class="w-3.5 h-3.5 text-[#00C864]" />
                      <Copy v-else class="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </div>
            </div>

            <!-- Email -->
            <div class="space-y-2 pt-2 border-t border-current/10">
              <span class="text-xs font-semibold uppercase opacity-70 block">อีเมลสำหรับติดต่อ</span>
              <div class="flex items-center justify-between p-3 rounded-xl bg-black/[0.03] dark:bg-white/[0.04] border border-current/10">
                <div class="flex items-center gap-2.5">
                  <Mail class="w-4 h-4 text-[#00C864] dark:text-[#00FF88]" />
                  <span class="text-sm font-mono font-medium">support@igenco.co.th</span>
                </div>
                <button
                  type="button"
                  aria-label="คัดลอกอีเมล support@igenco.co.th"
                  class="p-1.5 rounded-lg hover:bg-black/10 dark:hover:bg-white/10 opacity-70 hover:opacity-100 transition-all"
                  @click="copyToClipboard('support@igenco.co.th', 'email')"
                >
                  <Check v-if="copiedEmail" class="w-3.5 h-3.5 text-[#00C864]" />
                  <Copy v-else class="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            <!-- Business Hours -->
            <div class="p-3.5 rounded-xl bg-[#00C864]/5 dark:bg-[#00FF88]/5 border border-[#00C864]/20 flex items-start gap-3">
              <Clock class="w-4 h-4 text-[#00C864] dark:text-[#00FF88] shrink-0 mt-0.5" />
              <div class="text-xs leading-relaxed">
                <span class="font-bold block">เวลาทำการสำหรับติดต่อ:</span>
                <span class="opacity-80">วันจันทร์ - วันศุกร์ เวลา 08:30 - 17:30 น. (หยุดวันเสาร์-อาทิตย์ และวันหยุดนักขัตฤกษ์)</span>
              </div>
            </div>
          </div>

          <!-- Quick Navigation to Location Page -->
          <NuxtLink
            to="/contact/location"
            class="group p-6 rounded-3xl spatial-glass border border-[#00C864]/30 hover:border-[#00C864] transition-all flex items-center justify-between shadow-lg hover:shadow-xl hover-lift block"
          >
            <div class="flex items-center gap-4">
              <div class="w-12 h-12 rounded-2xl bg-[#00C864]/15 dark:bg-[#00FF88]/15 text-[#00C864] dark:text-[#00FF88] flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform">
                <MapPin class="w-6 h-6" />
              </div>
              <div>
                <span class="text-xs font-mono uppercase text-[#00C864] dark:text-[#00FF88] font-bold block">OFFICE LOCATION</span>
                <h3 class="text-base font-bold mt-0.5 group-hover:text-[#00C864] dark:group-hover:text-[#00FF88] transition-colors">ตำแหน่งที่ตั้งและแผนที่สำนักงาน</h3>
                <p class="text-xs opacity-70 mt-0.5">อาคารจูเคี่ยวเล้ง ชั้น 3 ใกล้สนามบินดอนเมือง</p>
              </div>
            </div>
            <ArrowRight class="w-5 h-5 text-[#00C864] dark:text-[#00FF88] group-hover:translate-x-1.5 transition-transform" />
          </NuxtLink>

          <!-- Trust Badges -->
          <div class="p-5 rounded-2xl spatial-glass border border-current/10 space-y-3 text-xs">
            <div class="flex items-center gap-3">
              <ShieldCheck class="w-4 h-4 text-[#00C864] dark:text-[#00FF88]" />
              <span>มาตรฐานวิศวกรรมซอฟต์แวร์สากล <strong>ISO/IEC 29110:2011</strong></span>
            </div>
            <div class="flex items-center gap-3">
              <Award class="w-4 h-4 text-[#00C864] dark:text-[#00FF88]" />
              <span>ที่ปรึกษาขึ้นทะเบียนกระทรวงการคลัง (ประเภทนิติบุคคล 4232 ระดับ 2)</span>
            </div>
            <div class="flex items-center gap-3">
              <Sparkles class="w-4 h-4 text-[#00C864] dark:text-[#00FF88]" />
              <span>ได้รับการส่งเสริมการลงทุนจากสำนักงาน <strong>BOI</strong></span>
            </div>
          </div>

        </div>

        <!-- ==========================================
             Right Column: Interactive Consultation Form
        =========================================== -->
        <div class="lg:col-span-7">
          <div class="p-8 sm:p-12 rounded-3xl spatial-glass border border-current/10 shadow-2xl backdrop-blur-2xl">
            <div class="mb-6">
              <h2 class="text-2xl font-extrabold uppercase tracking-tight flex items-center gap-2">
                <span>กรอกแบบฟอร์มขอรับคำปรึกษา</span>
              </h2>
              <p class="text-xs opacity-75 mt-1">
                กรุณากรอกข้อมูลของท่านเพื่อให้ทีมผู้เชี่ยวชาญเตรียมข้อมูลและติดต่อกลับได้อย่างตรงจุด
              </p>
            </div>

            <form class="space-y-4" @submit.prevent="handleSubmit">
              <!-- Name -->
              <div>
                <label class="block text-xs font-semibold uppercase opacity-80 mb-1.5">ชื่อผู้ติดต่อ / หน่วยงาน *</label>
                <input
                  v-model="form.name"
                  type="text"
                  required
                  placeholder="ระบุชื่อ - นามสกุล หรือชื่อบริษัท/หน่วยงานของท่าน"
                  class="w-full px-4 py-3.5 rounded-xl bg-white/80 dark:bg-black/60 border border-current/15 text-sm focus:outline-none focus:border-[#00C864] dark:focus:border-[#00FF88] focus:ring-2 focus:ring-[#00C864]/20 transition-all text-[#0A1A12] dark:text-[#F8FAFC]"
                >
              </div>

              <!-- Email -->
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

              <!-- Phone -->
              <div>
                <label class="block text-xs font-semibold uppercase opacity-80 mb-1.5">เบอร์โทรศัพท์ติดต่อ</label>
                <input
                  v-model="form.phone"
                  type="tel"
                  placeholder="08X-XXX-XXXX หรือ 02-XXX-XXXX"
                  class="w-full px-4 py-3.5 rounded-xl bg-white/80 dark:bg-black/60 border border-current/15 text-sm focus:outline-none focus:border-[#00C864] dark:focus:border-[#00FF88] focus:ring-2 focus:ring-[#00C864]/20 transition-all text-[#0A1A12] dark:text-[#F8FAFC]"
                >
              </div>

              <!-- Solution Topic -->
              <div>
                <label class="block text-xs font-semibold uppercase opacity-80 mb-1.5">หัวข้อหรือโซลูชันที่ต้องการปรึกษา *</label>
                <div class="relative">
                  <select
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

              <!-- Message -->
              <div>
                <label class="block text-xs font-semibold uppercase opacity-80 mb-1.5">รายละเอียดเพิ่มเติม (ถ้ามี)</label>
                <textarea
                  v-model="form.message"
                  rows="4"
                  placeholder="ระบุความต้องการ จำนวนผู้ใช้งาน รูปแบบหน่วยงาน หรือเวลาที่สะดวกให้ทีมงานติดต่อกลับ..."
                  class="w-full px-4 py-3.5 rounded-xl bg-white/80 dark:bg-black/60 border border-current/15 text-sm focus:outline-none focus:border-[#00C864] dark:focus:border-[#00FF88] focus:ring-2 focus:ring-[#00C864]/20 transition-all text-[#0A1A12] dark:text-[#F8FAFC]"
                />
              </div>

              <!-- Submit Button -->
              <button
                type="submit"
                :disabled="isSubmitting"
                class="w-full py-4 rounded-xl font-bold text-sm uppercase tracking-wider bg-[#00C864] text-[#022C22] dark:bg-[#00FF88] dark:text-[#020806] hover:opacity-90 transition-all flex items-center justify-center gap-2 shadow-xl hover:shadow-[0_8px_25px_rgba(0,200,100,0.35)] disabled:opacity-50 hover:scale-[1.01] active:scale-[0.99] cursor-pointer"
              >
                <span>{{ isSubmitting ? 'กำลังส่งข้อมูล...' : 'ส่งแบบฟอร์มขอรับคำปรึกษา' }}</span>
                <Send class="w-4 h-4" />
              </button>
            </form>
          </div>
        </div>

      </div>

    </main>

    <ContactFooter />
  </div>
</template>
